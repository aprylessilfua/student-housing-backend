Technical Reference
2.1 Architecture Overview
csharp
Copy code
[GitHub Pages Frontend] ↔ [Node/Express API on Render] ↔ [Postgres on Render]
Frontend: HTML/CSS/JS (app.js + admin.js)

Backend: Express routes + controllers + JWT auth

DB: Postgres, accessed via pool configured from process.env.DATABASE_URL

2.2 Frontend File Structure
pgsql
Copy code
/frontend
├─ index.html
├─ hostels.html
├─ rooms.html
├─ applications.html
├─ dashboard.html
├─ login.html
├─ register.html
├─ admin-login.html
├─ admin.html
├─ admin-hostels.html
├─ admin-rooms.html
├─ admin-students.html
├─ admin-applications.html
├─ admin-notifications.html
├─ styles.css
├─ app.js       ← student loader + handlers
└─ admin.js     ← admin loader + handlers
2.3 Backend File Structure
bash
Copy code
/backend
├─ server.js            # Express setup + JWT middleware
├─ db/db.js             # pg Pool (uses DATABASE_URL)
├─ controllers/
│  ├─ usersController.js
│  ├─ authController.js
│  ├─ dashboardController.js
│  └─ ...  
├─ routes/
│  ├─ users.js
│  ├─ auth.js
│  ├─ dashboard.js
│  └─ admin.js          # if you separated admin routes
└─ .env (on Render)     # JWT_SECRET, DATABASE_URL
2.4 Environment Variables
DATABASE_URL → postgres://…

JWT_SECRET → your HMAC key

PORT → (auto by Render)

2.5 API Endpoints
Public (no auth)
GET /api/hostels

GET /api/rooms

POST /api/users (register)

POST /api/auth/login → { token }

Student-only (JWT)
GET /api/dashboard → profile, stats, hostels, activities

POST /api/applications → apply

Admin-only (JWT in adminToken)
Hostels

GET /api/hostels

POST/PUT/DELETE /api/hostels/:id

Rooms

GET /api/rooms

POST/PUT/DELETE /api/rooms/:id

Users

GET /api/users

DELETE /api/users/:id

Applications

GET /api/applications

PUT /api/applications/:id (status)

Notifications

GET /api/notifications

POST /api/notifications

PUT /api/notifications/:id/read

2.6 Running & Deploying
Local Backend

bash
Copy code
cd backend
npm install
export DATABASE_URL=postgres://...
export JWT_SECRET=supersecret
node server.js
Local Frontend
Serve via npx http-server or simply open index.html

Deploy

Push backend → new Render service → set env vars

Push frontend → GitHub Pages → ensure app.js & admin.js point to the new Render URL