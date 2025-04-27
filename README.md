# student-housing-backend
🛠️ Technical Reference
2.1 Architecture Overview
 Frontend: static HTML/CSS/JS served via GitHub Pages.
 Backend: Node.js + Express on Render, connected to PostgreSQL (also on Render).
 Auth: JWT (1h expiry) in Authorization: Bearer <token> header.
 Data flow: JS fetch() calls to /api/... endpoints exposed by server.js.
2.2 Key Files & Structure
bash
CopyEdit
frontend/
├─ index.html
├─ hostels.html
├─ rooms.html
├─ applications.html
├─ dashboard.html
├─ login.html
├─ register.html
└─ app.js # single entrypoint, dispatches per-page 
loader/render
backend/
├─ server.js # Express setup, mounts /api routes
├─ db/db.js # pg Pool reading process.env.DATABASE_URL
├─ controllers/
│ ├─ usersController.js
│ ├─ authController.js
│ ├─ dashboardController.js
│ └─ ... 
├─ routes/
│ ├─ users.js
│ ├─ auth.js
│ └─ dashboard.js
└─ .env # (via Render env vars) JWT_SECRET, DATABASE_URL
2.3 Environment Variables
 DATABASE_URL: your Render Postgres DSN
 JWT_SECRET: your HMAC secret for signing tokens
 PORT: server port (Render auto-sets)
2.4 API Endpoints
Method Path Description Auth 
required
GET /api/hostels List all hostels No
Method Path Description Auth 
required
GET /api/rooms List all rooms No
POST /api/applications Apply for housing (body: user_id, 
room_id, status)
No (frontend 
checks)
POST /api/auth/login Login (body: email, password) → 
{token} No
POST /api/users Register new student No
GET /api/dashboard Student dashboard data 
(profile/stats/hostels/activities)
Bearer 
JWT
(Admin CRUD routes 
under /api/hostels, 
/api/rooms, 
/api/users, etc.)
2.5 How to Run Locally
1. Clone both repos (frontend, backend).
2. In backend:
bash
CopyEdit
npm install
export DATABASE_URL=postgres://... 
export JWT_SECRET=your-secret
node server.js
3. In frontend: open index.html in your browser (or serve via npx http-server).
2.6 Deployment Steps
1. Push backend to GitHub → link to new Render service.
2. Set Render env vars (DATABASE_URL, JWT_SECRET).
3. Push frontend to GitHub Pages → ensure app.js points at the new backend URL.