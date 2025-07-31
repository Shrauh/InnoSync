from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    username: str
    email: str
    interests: List[str]
    password: str  # Add password validation
