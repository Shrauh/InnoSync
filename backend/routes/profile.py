"""
Profile routes — view + edit user profile, update skills/interests.
"""
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from Database import users_collection

router = APIRouter()


class ProfileUpdate(BaseModel):
    email: str
    name: Optional[str] = None
    department: Optional[str] = None
    skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    linkedin: Optional[str] = None
    achievements: Optional[str] = None
    past_projects: Optional[str] = None


@router.get("/user")
async def get_user(email: str = Query(...)):
    """Get full user profile by email."""
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])

    # Normalize skills/interests to always be lists
    skills = user.get("skills", [])
    interests = user.get("interests", [])
    if isinstance(skills, str):
        skills = [s.strip() for s in skills.split(",") if s.strip()]
    if isinstance(interests, str):
        interests = [i.strip() for i in interests.split(",") if i.strip()]

    return {
        "name": user.get("name"),
        "email": user.get("email"),
        "department": user.get("department"),
        "role": user.get("role"),
        "profile_img": user.get("profile_img", ""),
        "profile_pic_path": user.get("profile_pic_path", ""),
        "skills": skills,
        "interests": interests,
        "mentor": user.get("mentor", ""),
        "linkedin": user.get("linkedin", ""),
        "achievements": user.get("achievements", ""),
        "past_projects": user.get("past_projects", ""),
        "team": user.get("team", []),
    }


@router.put("/user/update")
async def update_profile(data: ProfileUpdate):
    """Update user profile fields (skills, interests, etc.)."""
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_fields = {}
    if data.name is not None:
        update_fields["name"] = data.name
    if data.department is not None:
        update_fields["department"] = data.department
    if data.skills is not None:
        update_fields["skills"] = data.skills
    if data.interests is not None:
        update_fields["interests"] = data.interests
    if data.linkedin is not None:
        update_fields["linkedin"] = data.linkedin
    if data.achievements is not None:
        update_fields["achievements"] = data.achievements
    if data.past_projects is not None:
        update_fields["past_projects"] = data.past_projects

    if update_fields:
        users_collection.update_one({"email": data.email}, {"$set": update_fields})

    return {"message": "Profile updated successfully"}
