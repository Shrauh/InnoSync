from fastapi import APIRouter, HTTPException, Body, Query
from pydantic import BaseModel
from Database import collaboration_requests_collection, users_collection

router = APIRouter()

class CollabRequest(BaseModel):
    sender_email: str
    receiver_email: str
    sender_name: str
    sender_profile_image: str
    receiver_name: str
    receiver_profile_image: str

class RespondRequest(BaseModel):
    sender_email: str
    receiver_email: str
    status: str

@router.post("/send-collab-request")
async def send_request(data: CollabRequest):
    existing = collaboration_requests_collection.find_one({
        "sender_email": data.sender_email,
        "receiver_email": data.receiver_email,
        "status": "pending"
    })

    if existing:
        raise HTTPException(status_code=400, detail="Request already sent")

    request = data.dict()
    request["status"] = "pending"
    collaboration_requests_collection.insert_one(request)
    return {"message": "Request sent successfully"}

@router.get("/notifications")
async def get_notifications(email: str = Query(...)):
    requests = list(collaboration_requests_collection.find({"receiver_email": email, "status": "pending"}))
    for req in requests:
        req["_id"] = str(req["_id"])
    return [{"sender_email": req["sender_email"], "status": req["status"], "sender_name": req["sender_name"]} for req in requests]

@router.post("/respond-request")
async def respond_request(data: RespondRequest):
    if data.status == "accepted":
        users_collection.update_one({"email": data.receiver_email}, {"$addToSet": {"team": data.sender_email}}, upsert=True)
        users_collection.update_one({"email": data.sender_email}, {"$addToSet": {"team": data.receiver_email}}, upsert=True)

    collaboration_requests_collection.update_one(
        {"sender_email": data.sender_email, "receiver_email": data.receiver_email},
        {"$set": {"status": data.status}}
    )
    return {"message": f"Request {data.status}"}

@router.get("/user")
async def get_user(email: str = Query(...)):
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = str(user["_id"])
    return user

@router.get("/students")
async def get_students():
    students = list(users_collection.find({"role": "student"}))
    for student in students:
        student["_id"] = str(student["_id"])
    return students
