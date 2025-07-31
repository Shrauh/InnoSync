from pymongo import MongoClient
from app.config import MONGO_URI
from backend.models.user import User
from typing import List

client = MongoClient(MONGO_URI)
db = client.get_database()
users_collection = db.users

def create_user(user: User):
    user_dict = user.dict()  # Convert User object to dictionary
    # Check if the username or email already exists
    if users_collection.find_one({"username": user.username}):
        raise ValueError("Username already exists.")
    if users_collection.find_one({"email": user.email}):
        raise ValueError("Email already registered.")
    users_collection.insert_one(user_dict)  # Insert into MongoDB
    return user
