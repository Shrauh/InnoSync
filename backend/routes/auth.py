from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from Database import users_collection  # Ensure this is correctly pointing to your DB setup
from dependencies import hash_password  # Ensure this is correctly hashing passwords
import shutil
import os

router = APIRouter()

@router.post("/signup")  # This should be /auth/signup in total
async def signup(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    department: str = Form(...),
    role: str = Form(...),
    skills: str = Form(...),
    interest: str = Form(...),
    linkedin: str = Form(None),
    achievements: str = Form(None),
    past_projects: str = Form(None),
    profile_pic: UploadFile = File(None),
):
    # Check if user already exists
    if users_collection.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password before storing
    hashed_pw = hash_password(password)

    # Handle profile picture upload
    profile_pic_path = None
    if profile_pic:
        pic_dir = "uploads"
        os.makedirs(pic_dir, exist_ok=True)
        profile_pic_path = f"{pic_dir}/{profile_pic.filename}"
        with open(profile_pic_path, "wb") as buffer:
            shutil.copyfileobj(profile_pic.file, buffer)

    # Create user data for DB insertion
    user = {
        "name": name,
        "email": email,
        "password": hashed_pw,
        "department": department,
        "role": role,
        "skills": [s.strip() for s in skills.split(",") if s.strip()],
        "interests": [i.strip() for i in interest.split(",") if i.strip()],
        "linkedin": linkedin,
        "achievements": achievements,
        "past_projects": past_projects,
        "profile_pic_path": profile_pic_path,
    }

    # Insert user into the database
    users_collection.insert_one(user)

    # Return success message with redirect
    redirect_page = "profile1" if role == "faculty" else "profile"
    return {"message": "Signup successful", "redirect": redirect_page}
