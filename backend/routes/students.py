"""
Students route — fetch students with shared interests.
"""
from fastapi import APIRouter, Query, HTTPException
from Database import users_collection

router = APIRouter()


@router.get("/students")
async def get_all_students(email: str = Query(None)):
    """
    Get all students. If email is provided, returns students
    with shared interests (excluding the requesting user).
    """
    if email:
        user = users_collection.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user_interests = user.get("interests", [])
        if user_interests:
            students = list(users_collection.find({
                "email": {"$ne": email},
                "role": "student",
                "interests": {"$in": user_interests},
            }))
        else:
            students = list(users_collection.find({
                "email": {"$ne": email},
                "role": "student",
            }))
    else:
        students = list(users_collection.find({"role": "student"}))

    result = []
    for s in students:
        result.append({
            "email": s.get("email"),
            "name": s.get("name"),
            "department": s.get("department"),
            "interests": s.get("interests", []),
            "skills": s.get("skills", []),
            "profile_pic_path": s.get("profile_pic_path"),
            "linkedin": s.get("linkedin", ""),
        })
    return result
