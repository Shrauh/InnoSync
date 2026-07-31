# ⚡ InnoSync — AI-Powered Student Collaboration Platform

> Connect with the right collaborators. Build amazing projects together.

InnoSync is a full-stack web platform that helps students find ideal project partners using an **AI-powered matching algorithm**. It scores compatibility based on shared interests, complementary skills, department proximity, and role — so you spend less time searching and more time building.

---

## 🧠 Key Features

| Feature | Description |
|---|---|
| **AI Smart Matching** | Weighted algorithm (interests 40%, skills 30%, dept 15%, role 15%) ranks collaborators with a compatibility score |
| **Skill Recommendations** | AI analyzes what successful collaborators with similar interests know — suggests skills you should learn |
| **Trending Interests** | See what's hot on campus in real-time |
| **Collaboration Requests** | Send, accept, or reject partnership requests |
| **Team Management** | View your accepted collaborators in one place |
| **Faculty Mentorship** | Browse faculty by research area, request mentorship |
| **Role-based Dashboards** | Separate views for students and faculty |
| **Profile Management** | Skills, interests, profile pictures, LinkedIn |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite |
| **Backend** | Python FastAPI |
| **Database** | MongoDB (via PyMongo) |
| **Auth** | JWT + Session-based |
| **Styling** | Custom CSS (Dark Glassmorphism) |
| **Font** | Inter (Google Fonts) |

---

## 📁 Project Structure

```
InnoSync/
├── backend/                  # FastAPI backend
│   ├── main.py               # App entry point, routing
│   ├── Database.py            # MongoDB connection
│   ├── routes/
│   │   ├── auth.py            # Signup endpoint
│   │   ├── login.py           # Login endpoint
│   │   ├── profile.py         # Profile CRUD
│   │   ├── user.py            # User data
│   │   ├── students.py        # Interest-based student list
│   │   ├── match.py           # 🧠 AI matching engine
│   │   ├── collab.py          # Collaboration requests
│   │   ├── faculty.py         # Faculty endpoints
│   │   └── mentorship.py      # Mentorship system
│   ├── uploads/               # Profile pictures
│   ├── requirements.txt       # Python dependencies
│   └── .env.example           # Environment template
│
├── dbms/                      # React frontend
│   ├── src/
│   │   ├── App.jsx            # Routes + Navbar
│   │   ├── App.css            # Design system
│   │   ├── components/
│   │   │   └── Navbar.jsx     # Sticky navigation
│   │   └── pages/
│   │       ├── Home1.jsx      # Landing page
│   │       ├── Login.jsx      # Sign in
│   │       ├── Signup.jsx     # Registration
│   │       ├── Profile.jsx    # Student profile
│   │       ├── SmartMatch.jsx # 🧠 AI match page
│   │       ├── Collaboration.jsx # Browse students
│   │       ├── Notifications.jsx # Collab requests
│   │       ├── Myteam.jsx     # Team view
│   │       └── Faculty.jsx    # Faculty directory
│   ├── vite.config.js         # Dev proxy config
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 How to Run

### Prerequisites

- **Python 3.10+** → [Download](https://www.python.org/downloads/)
- **Node.js 18+** → [Download](https://nodejs.org/)
- **MongoDB** → [Download Community Server](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)

> ⚠️ Make sure MongoDB is **running** before starting the backend.

---

### Step 1: Clone the repo

```bash
git clone https://github.com/Shrauh/InnoSync.git
cd InnoSync
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
.\venv\Scripts\activate.bat
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
copy .env.example .env
# (Edit .env if your MongoDB is not on default localhost:27017)

# Start the backend server
uvicorn main:app --reload --port 8000
```

✅ Backend runs at: **http://localhost:8000**  
✅ API docs at: **http://localhost:8000/docs** (Swagger UI)

### Step 3: Setup Frontend

```bash
# Open a NEW terminal, navigate to frontend
cd dbms

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend runs at: **http://localhost:5173**

---

## 🧪 How to Test / Verify

### 1. Check Backend Health
Open in browser:
```
http://localhost:8000/
→ Should return: {"message": "InnoSync Backend is running", "version": "1.0.0"}

http://localhost:8000/health
→ Should return: {"status": "healthy", "database": "connected"}
```

### 2. Explore the API (Swagger)
```
http://localhost:8000/docs
```
All endpoints are documented here with "Try it out" buttons.

### 3. Test the Full App

1. Open **http://localhost:5173** → You'll see the landing page
2. Click **"Get Started Free"** → Sign up with:
   - Name, email, password
   - Department (e.g., `CSE`)
   - Skills (e.g., `React, Python, ML`)
   - Interests (e.g., `AI, Web Dev, Blockchain`)
3. Log in with your credentials
4. **Profile** → See your profile with skill/interest tags
5. **AI Match** → See AI-ranked collaborators with match scores
6. **Collaborate** → Browse and search all students
7. **Notifications** → Accept/reject incoming requests
8. **My Team** → View your accepted collaborators

> 💡 **Tip:** Create 2-3 accounts with overlapping interests to see the AI matching in action!

---

## 🧠 AI Matching Algorithm

The matching engine in `backend/routes/match.py` uses a **weighted multi-factor scoring system**:

```
Final Score = (Interest Overlap × 0.40) 
            + (Skill Complementarity × 0.30) 
            + (Department Proximity × 0.15) 
            + (Role Compatibility × 0.15)
```

| Factor | Weight | What it measures |
|---|---|---|
| Interest Overlap | 40% | Jaccard similarity of interest sets |
| Skill Complementarity | 30% | Rewards both shared skills AND unique skills the other person brings |
| Department Proximity | 15% | Same dept = 100%, related dept = 60%, cross-dept = 20% |
| Role Compatibility | 15% | Student-Student = 100%, Student-Faculty = 70% |

Match levels: 🔥 Excellent (80%+) → ⭐ Great (60%+) → 👍 Good (40%+) → 🤝 Fair (20%+)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/signup` | Register new user |
| `POST` | `/auth/login` | Login |
| `GET` | `/api/user?email=` | Get user profile |
| `GET` | `/api/students` | List all students |
| `GET` | `/api/match?email=` | 🧠 AI smart matches |
| `GET` | `/api/skill-recommendations?email=` | 🧠 Skill gap analysis |
| `GET` | `/api/trending-interests` | 🧠 Campus trends |
| `POST` | `/api/send-collab-request` | Send collaboration request |
| `GET` | `/api/notifications?email=` | Get pending requests |
| `POST` | `/api/respond-request` | Accept/reject request |
| `GET` | `/api/my-team?email=` | Get accepted collaborators |
| `GET` | `/health` | Backend + DB health check |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for students, by students<br/>
  <strong>⚡ InnoSync — Find Your Perfect Collaborator</strong>
</p>
