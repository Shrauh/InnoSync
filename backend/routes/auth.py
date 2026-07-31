"""
Signup route — register new users with profile picture upload.
"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from Database import users_collection
from dependencies import hash_password
import shutil
import os
import uuid

router = APIRouter()


@router.post("/signup")
async def signup(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    department: str = Form(...),
    role: str = Form("student"),
    skills: str = Form(""),
    interest: str = Form(""),
    linkedin: str = Form(None),
    achievements: str = Form(None),
    past_projects: str = Form(None),
    profile_pic: UploadFile = File(None),
):
    """Register a new user (student or faculty)."""
    # Check if user already exists
    if users_collection.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password
    hashed_pw = hash_password(password)

    # Handle profile picture upload with unique filename
    profile_pic_path = None
    if profile_pic and profile_pic.filename:
        pic_dir = "uploads"
        os.makedirs(pic_dir, exist_ok=True)
        ext = os.path.splitext(profile_pic.filename)[1] or ".jpg"
        unique_name = f"{uuid.uuid4().hex[:8]}_{email.split('@')[0]}{ext}"
        profile_pic_path = f"{pic_dir}/{unique_name}"
        with open(profile_pic_path, "wb") as buffer:
            shutil.copyfileobj(profile_pic.file, buffer)

    # Build user document
    user = {
        "name": name.strip(),
        "email": email.strip().lower(),
        "password": hashed_pw,
        "department": department.strip(),
        "role": role.strip().lower(),
        "skills": [s.strip() for s in skills.split(",") if s.strip()],
        "interests": [i.strip() for i in interest.split(",") if i.strip()],
        "linkedin": linkedin or "",
        "achievements": achievements or "",
        "past_projects": past_projects or "",
        "profile_pic_path": profile_pic_path,
        "team": [],
        "mentorship_requests": [],
    }

    users_collection.insert_one(user)

    redirect_page = "profile1" if role == "faculty" else "profile"
    return {"message": "Signup successful", "redirect": redirect_page}
