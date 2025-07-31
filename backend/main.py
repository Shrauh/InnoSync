from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers from the routes module
from routes.auth import router as signup_router
from routes.login import router as login_router
from routes.profile import router as profile_router
from routes.collab import router as collab_router
from routes.user import router as user_router
from routes.faculty import router as faculty_router  # Adjusted import for clarity
from routes.students import router as students_router  # Import the students router

app = FastAPI()

# Enable CORS - Allowing requests from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can restrict this for security)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers with prefixes and tags for better organization
app.include_router(signup_router, prefix="/auth", tags=["auth"])  # Signup routes
app.include_router(login_router, prefix="/auth", tags=["auth"])   # Login routes
app.include_router(user_router, prefix="/api", tags=["user"])     # User-related routes
app.include_router(profile_router, prefix="/api", tags=["profile"])  # Profile routes
app.include_router(collab_router, prefix="/api", tags=["collaboration"])  # Collaboration routes
app.include_router(faculty_router, prefix="/api", tags=["faculty"])  # Faculty routes
app.include_router(students_router, prefix="/api", tags=["students"])  # Students routes

# Root endpoint - Health check to verify the backend is working
@app.get("/")
def read_root():
    return {"message": "Backend is working successfully!"}
