from fastapi import APIRouter, Request
from Database import users_collection
from pydantic import BaseModel
from typing import List

router = APIRouter()

# ========== Models ==========
class MentorshipRequest(BaseModel):
    student_email: str
    faculty_email: str

class MentorshipResponse(BaseModel):
    student_email: str
    faculty_email: str
    accepted: bool

# ========== Send mentorship request ==========
@router.post("/mentorship/request")
async def send_mentorship_request(data: MentorshipRequest):
    faculty = users_collection.find_one({"email": data.faculty_email, "role": "faculty"})
    student = users_collection.find_one({"email": data.student_email, "role": "student"})

    if not faculty or not student:
        return {"error": "Invalid student or faculty"}

    users_collection.update_one(
        {"email": data.faculty_email},
        {"$addToSet": {"mentorship_requests": data.student_email}}
    )

    return {"message": "Request sent to faculty"}

# ========== View mentorship requests ==========
@router.get("/mentorship/requests")
async def get_mentorship_requests(faculty_email: str):
    faculty = users_collection.find_one({"email": faculty_email})
    if not faculty or faculty.get("role") != "faculty":
        return []

    student_emails = faculty.get("mentorship_requests", [])
    students = list(users_collection.find({"email": {"$in": student_emails}}))
    for s in students:
        s["_id"] = str(s["_id"])
    return students

# ========== Accept/Reject mentorship ==========
@router.post("/mentorship/respond")
async def respond_to_mentorship(data: MentorshipResponse):
    student = users_collection.find_one({"email": data.student_email})
    faculty = users_collection.find_one({"email": data.faculty_email})

    if not student or not faculty:
        return {"error": "Invalid request"}

    users_collection.update_one(
        {"email": data.faculty_email},
        {"$pull": {"mentorship_requests": data.student_email}}
    )

    if data.accepted:
        users_collection.update_one(
            {"email": data.faculty_email},
            {"$addToSet": {"students": {
                "email": student["email"],
                "name": student["name"],
                "current_project": student.get("past_project", "")
            }}}
        )

        users_collection.update_one(
            {"email": data.student_email},
            {"$set": {"mentor": {
                "email": faculty["email"],
                "name": faculty["name"]
            }}}
        )

    return {"message": "Mentorship response recorded"}

# ========== Explore students with shared interest/project ==========
@router.get("/students/shared-interest")
async def get_students_by_interest(faculty_email: str):
    faculty = users_collection.find_one({"email": faculty_email})
    if not faculty or faculty.get("role") != "faculty":
        return []

    faculty_interests = faculty.get("interests", [])
    students = list(users_collection.find({
        "role": "student",
        "$or": [
            {"interests": {"$in": faculty_interests}},
            {"past_project": {"$exists": True, "$ne": ""}}
        ]
    }))

    for s in students:
        s["_id"] = str(s["_id"])
    return students
