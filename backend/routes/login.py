"""
Login route — authenticate users and return profile data.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Database import users_collection
from dependencies import verify_password

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
async def login_user(data: LoginRequest):
    """Authenticate user with email + password, return user info."""
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "department": user.get("department", ""),
        }
    }