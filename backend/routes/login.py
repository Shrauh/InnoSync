# routes/login.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Database import users_collection  # Your MongoDB connection
from dependencies import verify_password  # Your bcrypt checker

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login_user(data: LoginRequest):
    # Find the user in the database
    user = users_collection.find_one({"email": data.email})

    # If the user is not found, return a 404 error
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify the password
    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Return the user's information including role
    return {
        "message": "Login successful",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],  # Include the role in the response
        }
    }

'''from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from Database import users_collection  # Your MongoDB connection
from dependencies import verify_password  # Your bcrypt checker

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login_user(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "user": {"name": user["name"], "email": user["email"]}}
'''