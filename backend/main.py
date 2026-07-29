from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

# Import routers from the routes module
from routes.auth import router as signup_router
from routes.login import router as login_router
from routes.profile import router as profile_router
from routes.collab import router as collab_router
from routes.user import router as user_router
from routes.faculty import router as faculty_router
from routes.students import router as students_router
from routes.mentorship import router as mentorship_router
from routes.match import router as match_router

app = FastAPI(
    title="InnoSync API",
    description="Student Collaboration Platform - Connect, Match, Build",
    version="1.0.0",
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files (profile pictures, etc.)
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Include all routers with prefixes and tags for better organization
app.include_router(signup_router, prefix="/auth", tags=["Authentication"])
app.include_router(login_router, prefix="/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/api", tags=["User"])
app.include_router(profile_router, prefix="/api", tags=["Profile"])
app.include_router(collab_router, prefix="/api", tags=["Collaboration"])
app.include_router(faculty_router, prefix="/api", tags=["Faculty"])
app.include_router(students_router, prefix="/api", tags=["Students"])
app.include_router(mentorship_router, prefix="/api", tags=["Mentorship"])
app.include_router(match_router, prefix="/api", tags=["Matching"])

# Root endpoint - Health check
@app.get("/", tags=["Health"])
def read_root():
    return {"message": "InnoSync Backend is running", "version": "1.0.0"}

# Health check with DB connectivity
@app.get("/health", tags=["Health"])
def health_check():
    from Database import get_db
    try:
        db = get_db()
        db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
