"""
AI-Powered Smart Matching Engine for InnoSync
Matches students based on shared interests, skills, and department proximity.
Uses a weighted scoring algorithm to rank potential collaborators.
"""

from fastapi import APIRouter, HTTPException, Query
from Database import users_collection
from typing import List, Optional

router = APIRouter()


def calculate_match_score(user_a: dict, user_b: dict) -> dict:
    """
    AI-powered matching algorithm that computes a compatibility score
    between two users based on multiple weighted factors.
    
    Factors:
    - Interest overlap (40% weight)
    - Skill complementarity (30% weight) 
    - Department proximity (15% weight)
    - Role compatibility (15% weight)
    """
    score = 0.0
    breakdown = {}

    # --- Interest Overlap (40%) ---
    interests_a = set(i.strip().lower() for i in (user_a.get("interests") or []) if i)
    interests_b = set(i.strip().lower() for i in (user_b.get("interests") or []) if i)
    
    if interests_a and interests_b:
        shared_interests = interests_a & interests_b
        all_interests = interests_a | interests_b
        interest_score = len(shared_interests) / len(all_interests) if all_interests else 0
        breakdown["shared_interests"] = list(shared_interests)
        breakdown["interest_score"] = round(interest_score * 100)
    else:
        interest_score = 0
        breakdown["shared_interests"] = []
        breakdown["interest_score"] = 0

    # --- Skill Complementarity (30%) ---
    skills_a = set(s.strip().lower() for s in (user_a.get("skills") or []) if s)
    skills_b = set(s.strip().lower() for s in (user_b.get("skills") or []) if s)
    
    if skills_a and skills_b:
        shared_skills = skills_a & skills_b
        complementary_skills = skills_b - skills_a  # Skills B has that A doesn't
        all_skills = skills_a | skills_b
        # Reward both overlap AND complementarity
        skill_score = (len(shared_skills) * 0.4 + len(complementary_skills) * 0.6) / max(len(all_skills), 1)
        skill_score = min(skill_score, 1.0)
        breakdown["shared_skills"] = list(shared_skills)
        breakdown["complementary_skills"] = list(complementary_skills)
        breakdown["skill_score"] = round(skill_score * 100)
    else:
        skill_score = 0
        breakdown["shared_skills"] = []
        breakdown["complementary_skills"] = []
        breakdown["skill_score"] = 0

    # --- Department Proximity (15%) ---
    dept_a = (user_a.get("department") or "").strip().lower()
    dept_b = (user_b.get("department") or "").strip().lower()
    
    if dept_a and dept_b:
        if dept_a == dept_b:
            dept_score = 1.0
        elif _are_related_departments(dept_a, dept_b):
            dept_score = 0.6
        else:
            dept_score = 0.2  # Cross-department collaboration still has value
    else:
        dept_score = 0.5
    breakdown["department_match"] = dept_a == dept_b
    breakdown["dept_score"] = round(dept_score * 100)

    # --- Role Compatibility (15%) ---
    role_a = (user_a.get("role") or "").lower()
    role_b = (user_b.get("role") or "").lower()
    
    if role_a == "student" and role_b == "student":
        role_score = 1.0
    elif role_a == "student" and role_b == "faculty":
        role_score = 0.7  # Mentorship potential
    elif role_a == "faculty" and role_b == "student":
        role_score = 0.7
    else:
        role_score = 0.5
    breakdown["role_score"] = round(role_score * 100)

    # --- Weighted Final Score ---
    score = (
        interest_score * 0.40 +
        skill_score * 0.30 +
        dept_score * 0.15 +
        role_score * 0.15
    )

    breakdown["total_score"] = round(score * 100)
    breakdown["match_level"] = _get_match_level(score)

    return breakdown


def _are_related_departments(dept_a: str, dept_b: str) -> bool:
    """Check if two departments are in related fields."""
    related_groups = [
        {"cse", "it", "computer engineering", "computer science", "ai & ds", "ai", "data science"},
        {"ece", "ee", "electrical engineering", "electronics"},
        {"me", "mechanical engineering", "civil", "civil engineering"},
    ]
    for group in related_groups:
        if dept_a in group and dept_b in group:
            return True
    return False


def _get_match_level(score: float) -> str:
    """Classify match quality into human-readable levels."""
    if score >= 0.8:
        return "Excellent Match 🔥"
    elif score >= 0.6:
        return "Great Match ⭐"
    elif score >= 0.4:
        return "Good Match 👍"
    elif score >= 0.2:
        return "Fair Match 🤝"
    else:
        return "Low Match"


@router.get("/match")
async def get_smart_matches(
    email: str = Query(..., description="Email of the user to find matches for"),
    limit: int = Query(20, description="Maximum number of matches to return"),
    min_score: int = Query(10, description="Minimum match score (0-100)")
):
    """
    AI-powered endpoint that finds the best collaborator matches for a user.
    Returns scored and ranked potential collaborators.
    """
    # Get current user
    current_user = users_collection.find_one({"email": email})
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get all other users (excluding current)
    all_users = list(users_collection.find({
        "email": {"$ne": email},
        "role": "student"
    }))

    matches = []
    for user in all_users:
        score_data = calculate_match_score(current_user, user)
        
        if score_data["total_score"] >= min_score:
            matches.append({
                "name": user.get("name", "Unknown"),
                "email": user.get("email"),
                "department": user.get("department"),
                "skills": user.get("skills", []),
                "interests": user.get("interests", []),
                "profile_pic_path": user.get("profile_pic_path"),
                "linkedin": user.get("linkedin"),
                "match_score": score_data["total_score"],
                "match_level": score_data["match_level"],
                "shared_interests": score_data["shared_interests"],
                "shared_skills": score_data["shared_skills"],
                "complementary_skills": score_data["complementary_skills"],
                "breakdown": {
                    "interest": score_data["interest_score"],
                    "skill": score_data["skill_score"],
                    "department": score_data["dept_score"],
                    "role": score_data["role_score"],
                }
            })

    # Sort by score descending
    matches.sort(key=lambda x: x["match_score"], reverse=True)

    return {
        "user": current_user.get("name"),
        "total_matches": len(matches[:limit]),
        "matches": matches[:limit]
    }


@router.get("/skill-recommendations")
async def get_skill_recommendations(email: str = Query(...)):
    """
    AI-powered skill gap analysis. Recommends skills based on
    what successful collaborators in similar interests have.
    """
    current_user = users_collection.find_one({"email": email})
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")

    user_interests = set(i.strip().lower() for i in (current_user.get("interests") or []))
    user_skills = set(s.strip().lower() for s in (current_user.get("skills") or []))

    # Find users with overlapping interests
    similar_users = list(users_collection.find({
        "email": {"$ne": email},
        "interests": {"$in": list(current_user.get("interests", []))}
    }))

    # Aggregate skills from similar users
    skill_frequency = {}
    for user in similar_users:
        for skill in (user.get("skills") or []):
            skill_lower = skill.strip().lower()
            if skill_lower and skill_lower not in user_skills:
                skill_frequency[skill_lower] = skill_frequency.get(skill_lower, 0) + 1

    # Sort by frequency and return top recommendations
    recommended = sorted(skill_frequency.items(), key=lambda x: x[1], reverse=True)

    return {
        "user": current_user.get("name"),
        "current_skills": list(user_skills),
        "recommended_skills": [
            {"skill": skill, "popularity": count, "reason": f"{count} collaborators with similar interests have this skill"}
            for skill, count in recommended[:10]
        ]
    }


@router.get("/trending-interests")
async def get_trending_interests():
    """
    Returns trending interests across the platform,
    useful for discovery and exploration.
    """
    all_users = list(users_collection.find({"role": "student"}))
    
    interest_count = {}
    for user in all_users:
        for interest in (user.get("interests") or []):
            clean = interest.strip()
            if clean:
                interest_count[clean] = interest_count.get(clean, 0) + 1

    trending = sorted(interest_count.items(), key=lambda x: x[1], reverse=True)

    return {
        "total_students": len(all_users),
        "trending": [
            {"interest": interest, "count": count}
            for interest, count in trending[:15]
        ]
    }
