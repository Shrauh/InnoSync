from fastapi import APIRouter, HTTPException, Query
from Database import users_collection, mentorship_requests_collection
from bson import ObjectId

router = APIRouter()

@router.get("/faculty/mentorship-requests")
async def get_mentorship_requests(faculty_email: str = Query(...)):
    requests = list(mentorship_requests_collection.find({"faculty_email": faculty_email}))
    for req in requests:
        req["_id"] = str(req["_id"])
    return requests


@router.get("/faculty/mentees")
async def get_faculty_mentees(faculty_email: str = Query(...)):
    mentees = list(users_collection.find({
        "mentor": faculty_email, "role": "student"
    }))
    for mentee in mentees:
        mentee["_id"] = str(mentee["_id"])
    return mentees
