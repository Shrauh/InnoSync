"""
User routes — re-exports from profile.py for backwards compatibility.
The main user endpoints are now in profile.py.
"""
from fastapi import APIRouter

router = APIRouter()

# All user endpoints are handled by profile.py
# This module kept for import compatibility in main.py
