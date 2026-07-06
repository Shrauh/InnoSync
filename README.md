InnoSync

Student Collaboration Web — a lightweight platform for students, faculty, and mentors to connect, request collaborations, and manage profiles. The backend is built with FastAPI (Python) and uses MongoDB for storage; the frontend is a Vite-based app in the `dbms/` folder.

## Key features
- User signup & login (auth)
- User profiles
- Collaboration requests (send / accept / reject)
- Mentorship requests and faculty/student endpoints
- REST API implemented with FastAPI + Pydantic
- MongoDB persistence (pymongo)

## Tech stack
- Language: Python (backend), JavaScript (frontend assets)
- Backend: FastAPI, Pydantic
- Database: MongoDB (pymongo)
- Frontend: Vite (in `dbms/`)
- Env config: python-dotenv

## Repository layout
```
backend/                # FastAPI backend
  main.py               # Application entry — mounts routers under /auth and /api
  Database.py           # MongoDB client and collections
  Schemas.py            # Pydantic request/response schemas
  crud.py               # Database helper functions
  data.py               # Seed / helper data utilities
  dependencies.py       # Dependency helpers for endpoints
  models/               # Pydantic models
    collab.py
    user.py
  routes/               # API routes grouped by area
    auth.py
    login.py
    profile.py
    collab.py
    collaboration_requests.py
    faculty.py
    students.py
    mentorship.py
    user.py
  uploads/               # Uploaded files (runtime)
  venv/                  # Virtualenv (should be removed from repo)
dbms/                   # Frontend (Vite) app
  package.json
  vite.config.js
  index.html
  src/                   # Frontend source
  public/                # Static assets
README.md               # This file
```

## Quickstart — backend
1. Install Python and create a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt  # or install below packages manually
```

2. (If no requirements.txt) install main dependencies:
```bash
pip install fastapi uvicorn pymongo python-dotenv pydantic
```

3. Provide environment variables
- Create `backend/.env` or set environment variables in your shell.
Example `.env`:
```
MONGO_URL=mongodb://127.0.0.1:27017
# Add any other env vars your deployment needs
```
If `MONGO_URL` is not provided, `backend/Database.py` defaults to `mongodb://127.0.0.1:27017`.

4. Run the app:
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Health check:
```bash
curl http://localhost:8000/
# => {"message":"Backend is working successfully!"}
```

## Quickstart — frontend (dbms)
```bash
cd dbms
npm install
npm run dev     # or check package.json for exact scripts
```
The frontend expects the backend API under the `/api` and `/auth` paths (adjust proxy/URLs if needed).

## Important environment variables
- MONGO_URL — MongoDB connection string (default: mongodb://127.0.0.1:27017)

## API surface (high level)
Routes are implemented under `backend/routes/*.py`. Notable route prefixes mounted in `backend/main.py`:
- /auth — signup & login routes (routes/auth.py, routes/login.py)
- /api/user — user-related endpoints (routes/user.py)
- /api/profile — profile endpoints (routes/profile.py)
- /api/collaboration — collaboration endpoints (routes/collab.py)
- /api/collaboration-requests — collaboration request handlers (routes/collaboration_requests.py)
- /api/mentorship — mentorship endpoints (routes/mentorship.py)
- /api/faculty — faculty endpoints (routes/faculty.py)
- /api/students — student endpoints (routes/students.py)

Tip: inspect each file in `backend/routes/` for exact paths, request bodies, and response shapes.

## Development notes & suggestions
- The repo currently contains a `backend/venv/` directory — remove it from the repository and add `venv/` to `.gitignore`.
- Add a `requirements.txt` or `pyproject.toml` for reproducible Python installs.
- Consider adding a `docker-compose.yml` that starts MongoDB, the backend, and a simple static build of the frontend for easy local dev.
- Add tests (pytest) for critical endpoints (auth, collaboration flow).

## Contributing
1. Fork and create a feature branch.
2. Run tests and linters locally.
3. Open a PR with a clear description of the change.

