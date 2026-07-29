from fastapi import APIRouter, Query, HTTPException
from typing import List
from Database import get_users_collection

router = APIRouter()

# Helper function to fetch the current user's data
async def get_user_by_email(email: str):
    users_collection = get_users_collection()
    user = users_collection.find_one({"email": email})
    return user

# FIX: Removed duplicate /api prefix (main.py already adds /api)
@router.get("/students", response_model=List[dict])
async def get_students_based_on_interests(email: str = Query(...)):
    """
    Fetch students with shared interests with the user identified by `email`.
    """
    # Fetch the current user's data from the database
    user = await get_user_by_email(email)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get the current user's interests
    user_interests = user.get("interests", [])

    if not user_interests:
        return []  # If no interests, return an empty list

    # Query students with shared interests, excluding the current user
    users_collection = get_users_collection()
    students = users_collection.find({
        "email": {"$ne": email},  # Exclude the current user
        "interests": {"$in": user_interests},  # Check for shared interests
    })

    result = []
    for student in students:
        result.append({
            "email": student.get("email"),
            "name": student.get("name"),
            "department": student.get("department"),
            "interests": student.get("interests"),
            "skills": student.get("skills", []),
            "profile_img": student.get("profile_img"),
            "profile_pic_path": student.get("profile_pic_path"),
        })
    
    return result
