"""
Collaboration routes — send/respond to requests, notifications, my-team, analytics.
"""
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from Database import collaboration_requests_collection, users_collection
from datetime import datetime

router = APIRouter()


class CollabRequest(BaseModel):
    sender_email: str
    receiver_email: str
    sender_name: str
    sender_profile_image: str = ""
    receiver_name: str
    receiver_profile_image: str = ""


class RespondRequest(BaseModel):
    sender_email: str
    receiver_email: str
    status: str  # "accepted" or "rejected"


# ==================== SEND REQUEST ====================
@router.post("/send-collab-request")
async def send_request(data: CollabRequest):
    """Send a collaboration request to another user."""
    if data.sender_email == data.receiver_email:
        raise HTTPException(status_code=400, detail="Cannot send request to yourself")

    existing = collaboration_requests_collection.find_one({
        "sender_email": data.sender_email,
        "receiver_email": data.receiver_email,
        "status": "pending"
    })
    if existing:
        raise HTTPException(status_code=400, detail="Request already sent")

    # Check if already in team
    sender = users_collection.find_one({"email": data.sender_email})
    if sender and data.receiver_email in (sender.get("team") or []):
        raise HTTPException(status_code=400, detail="Already in your team")

    request = data.dict()
    request["status"] = "pending"
    request["created_at"] = datetime.utcnow().isoformat()
    collaboration_requests_collection.insert_one(request)
    return {"message": "Request sent successfully"}


# ==================== NOTIFICATIONS ====================
@router.get("/notifications")
async def get_notifications(email: str = Query(...)):
    """Get pending collaboration requests for a user."""
    requests = list(collaboration_requests_collection.find(
        {"receiver_email": email, "status": "pending"}
    ))
    result = []
    for req in requests:
        req["_id"] = str(req["_id"])
        result.append({
            "sender_email": req["sender_email"],
            "sender_name": req.get("sender_name", req["sender_email"]),
            "sender_profile_image": req.get("sender_profile_image", ""),
            "status": req["status"],
            "created_at": req.get("created_at", ""),
        })
    return result


# ==================== RESPOND TO REQUEST ====================
@router.post("/respond-request")
async def respond_request(data: RespondRequest):
    """Accept or reject a collaboration request."""
    if data.status == "accepted":
        # Add each user to the other's team
        users_collection.update_one(
            {"email": data.receiver_email},
            {"$addToSet": {"team": data.sender_email}},
            upsert=True
        )
        users_collection.update_one(
            {"email": data.sender_email},
            {"$addToSet": {"team": data.receiver_email}},
            upsert=True
        )

    collaboration_requests_collection.update_one(
        {"sender_email": data.sender_email, "receiver_email": data.receiver_email, "status": "pending"},
        {"$set": {"status": data.status, "responded_at": datetime.utcnow().isoformat()}}
    )
    return {"message": f"Request {data.status}"}


# ==================== MY TEAM ====================
@router.get("/my-team")
async def get_my_team(email: str = Query(...)):
    """Get the user's accepted collaborators (team members)."""
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    team_emails = user.get("team", [])
    if not team_emails:
        return []

    team_members = list(users_collection.find({"email": {"$in": team_emails}}))
    result = []
    for member in team_members:
        result.append({
            "name": member.get("name", "Unknown"),
            "email": member.get("email"),
            "department": member.get("department", ""),
            "skills": member.get("skills", []),
            "interests": member.get("interests", []),
            "profile_pic_path": member.get("profile_pic_path", ""),
            "linkedin": member.get("linkedin", ""),
        })
    return result


# ==================== ANALYTICS ====================
@router.get("/analytics")
async def get_platform_analytics():
    """Platform-wide analytics for dashboards."""
    total_students = users_collection.count_documents({"role": "student"})
    total_faculty = users_collection.count_documents({"role": "faculty"})
    total_requests = collaboration_requests_collection.count_documents({})
    accepted_requests = collaboration_requests_collection.count_documents({"status": "accepted"})
    pending_requests = collaboration_requests_collection.count_documents({"status": "pending"})

    # Top skills across platform
    all_students = list(users_collection.find({"role": "student"}))
    skill_count = {}
    for u in all_students:
        for s in (u.get("skills") or []):
            clean = s.strip()
            if clean:
                skill_count[clean] = skill_count.get(clean, 0) + 1
    top_skills = sorted(skill_count.items(), key=lambda x: x[1], reverse=True)[:10]

    return {
        "total_students": total_students,
        "total_faculty": total_faculty,
        "total_requests": total_requests,
        "accepted_requests": accepted_requests,
        "pending_requests": pending_requests,
        "acceptance_rate": round((accepted_requests / total_requests * 100) if total_requests > 0 else 0),
        "top_skills": [{"skill": s, "count": c} for s, c in top_skills],
    }
