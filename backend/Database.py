import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Connect to MongoDB using environment variable
MONGO_URL = os.getenv("MONGO_URL", "mongodb://127.0.0.1:27017")

client = MongoClient(MONGO_URL)

# Use the correct database
db = client["innosync"]

# Collections
users_collection = db["users"]
collaboration_requests_collection = db["collaboration_requests"]
teams_collection = db["teams"]  # Optional, for future team feature
mentorship_requests_collection=db["mentorship_requests_collection"]
# Export collections for import in route files
def get_db():
    return db

def get_users_collection():
    return users_collection

def get_collab_requests_collection():
    return collaboration_requests_collection

def get_teams_collection():
    return teams_collection
