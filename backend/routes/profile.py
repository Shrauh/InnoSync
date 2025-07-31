# routes/profile.py

from fastapi import APIRouter, HTTPException, Query
from Database import users_collection  # Adjust this import if needed

router = APIRouter()

@router.get("/user")
async def get_user(email: str = Query(...)):
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Convert MongoDB ObjectId to string and return only required fields
    user["_id"] = str(user["_id"])
    
    return {
        "name": user.get("name"),
        "email": user.get("email"),
        "department": user.get("department"),
        "role": user.get("role"),
        "profile_img": user.get("profile_img", ""),
        "skills": user.get("skills", []) if isinstance(user.get("skills", []), list) else [user.get("skills")],
    "interests": user.get("interests", []) if isinstance(user.get("interests", []), list) else [user.get("interests")],
        "mentor": user.get("mentor", "")
    }
