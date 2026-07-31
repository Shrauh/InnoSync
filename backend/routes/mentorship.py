"""
Mentorship routes — request mentorship, respond, view guided students.
"""
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from Database import users_collection

router = APIRouter()


class MentorshipRequest(BaseModel):
    student_email: str
    faculty_email: str


class MentorshipResponse(BaseModel):
    student_email: str
    faculty_email: str
    accepted: Optional[bool] = None
    status: Optional[str] = None  # "accepted" / "rejected" — alias for frontend


# ==================== SEND MENTORSHIP REQUEST ====================
@router.post("/mentorship/request")
async def send_mentorship_request(data: MentorshipRequest):
    """Student sends a mentorship request to faculty."""
    faculty = users_collection.find_one({"email": data.faculty_email, "role": "faculty"})
    student = users_collection.find_one({"email": data.student_email, "role": "student"})

    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Check if already requested
    existing_requests = faculty.get("mentorship_requests", [])
    if data.student_email in existing_requests:
        raise HTTPException(status_code=400, detail="Request already sent")

    # Check if already mentored
    guided = [s.get("email") for s in faculty.get("students", [])]
    if data.student_email in guided:
        raise HTTPException(status_code=400, detail="Already under your guidance")

    users_collection.update_one(
        {"email": data.faculty_email},
        {"$addToSet": {"mentorship_requests": data.student_email}}
    )
    return {"message": "Mentorship request sent"}


# ==================== VIEW MENTORSHIP REQUESTS ====================
@router.get("/mentorship/requests")
async def get_mentorship_requests_v1(faculty_email: str = Query(...)):
    """Get pending mentorship requests (original route)."""
    return _get_mentorship_requests(faculty_email)


@router.get("/mentorship-requests")
async def get_mentorship_requests_v2(email: str = Query(...)):
    """Get pending mentorship requests (frontend-compatible alias)."""
    return _get_mentorship_requests(email)


def _get_mentorship_requests(faculty_email: str):
    faculty = users_collection.find_one({"email": faculty_email})
    if not faculty or faculty.get("role") != "faculty":
        return []

    student_emails = faculty.get("mentorship_requests", [])
    if not student_emails:
        return []

    students = list(users_collection.find({"email": {"$in": student_emails}}))
    result = []
    for s in students:
        s["_id"] = str(s["_id"])
        result.append({
            "name": s.get("name", "Unknown"),
            "email": s.get("email"),
            "department": s.get("department", ""),
            "skills": s.get("skills", []),
            "interests": s.get("interests", []),
            "project": s.get("past_projects", ""),
            "profile_pic_path": s.get("profile_pic_path", ""),
        })
    return result


# ==================== RESPOND TO MENTORSHIP ====================
@router.post("/mentorship/respond")
async def respond_mentorship_v1(data: MentorshipResponse):
    """Accept/reject mentorship (original route)."""
    accepted = data.accepted if data.accepted is not None else (data.status == "accepted")
    return _respond_mentorship(data.faculty_email, data.student_email, accepted)


@router.post("/respond-mentorship")
async def respond_mentorship_v2(data: MentorshipResponse):
    """Accept/reject mentorship (frontend-compatible alias)."""
    accepted = data.accepted if data.accepted is not None else (data.status == "accepted")
    return _respond_mentorship(data.faculty_email, data.student_email, accepted)


def _respond_mentorship(faculty_email: str, student_email: str, accepted: bool):
    student = users_collection.find_one({"email": student_email})
    faculty = users_collection.find_one({"email": faculty_email})

    if not student or not faculty:
        raise HTTPException(status_code=404, detail="Invalid request")

    # Remove from pending requests
    users_collection.update_one(
        {"email": faculty_email},
        {"$pull": {"mentorship_requests": student_email}}
    )

    if accepted:
        # Add student to faculty's guided list
        users_collection.update_one(
            {"email": faculty_email},
            {"$addToSet": {"students": {
                "email": student["email"],
                "name": student.get("name", ""),
                "department": student.get("department", ""),
                "project": student.get("past_projects", ""),
            }}}
        )
        # Set faculty as student's mentor
        users_collection.update_one(
            {"email": student_email},
            {"$set": {"mentor": {
                "email": faculty["email"],
                "name": faculty.get("name", ""),
            }}}
        )

    return {"message": f"Mentorship {'accepted' if accepted else 'rejected'}"}


# ==================== UNDER GUIDANCE ====================
@router.get("/under-guidance")
async def get_under_guidance(email: str = Query(...)):
    """Get students currently under a faculty member's guidance."""
    faculty = users_collection.find_one({"email": email})
    if not faculty or faculty.get("role") != "faculty":
        return []

    guided = faculty.get("students", [])
    return guided


# ==================== FACULTY LIST ====================
@router.get("/faculty-list")
async def get_all_faculty():
    """Get all faculty members for the student-facing faculty page."""
    faculty_members = list(users_collection.find({"role": "faculty"}))
    result = []
    for f in faculty_members:
        result.append({
            "name": f.get("name", "Unknown"),
            "email": f.get("email"),
            "department": f.get("department", ""),
            "interests": f.get("interests", []),
            "skills": f.get("skills", []),
            "profile_pic_path": f.get("profile_pic_path", ""),
            "students_count": len(f.get("students", [])),
        })
    return result
