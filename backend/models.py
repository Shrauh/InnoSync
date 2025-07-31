from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr
    password: str
    department: str
    role: str
    skills: str
    interest: str
    linkedin: Optional[str]
    achievements: Optional[str]
    past_projects: Optional[str]
