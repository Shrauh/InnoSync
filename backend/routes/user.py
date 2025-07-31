from fastapi import APIRouter
from Database import get_users_collection

router = APIRouter()

@router.get("/user")
async def get_user(email: str):
    # Fetch user from the users collection based on the email
    user_collection = get_users_collection()
    user = user_collection.find_one({"email": email})
    
    if not user:
        return {"error": "User not found"}

    # Ensure interests is always a list, even if it's empty or None
    interests = user.get("interests", [])
    if not isinstance(interests, list):
        interests = [interests]  # Convert to list if it's not already a list

    return {
        "name": user.get("name"),
        "email": user.get("email"),
        "department": user.get("department"),
        "role": user.get("role"),
        "profile_img": user.get("profile_img", ""),
        "mentor": user.get("mentor", ""),
        "skills": user.get("skills", []),
        "interests": user.get("interests", [])
    }
