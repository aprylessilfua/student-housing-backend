Got it — you want a **README.md** file for your project based on the technical reference you shared.  
Here’s a clean and professional draft for you:

---

# Campus Hostel Management Platform

## 🏛️ Project Overview
A full-stack web application for managing campus hostel allocations, allowing students to view hostels, apply for rooms, and monitor their application status.

- **Frontend:** Static HTML/CSS/JS served via **GitHub Pages**.
- **Backend:** **Node.js** with **Express**, deployed on **Render** with a **PostgreSQL** database.
- **Authentication:** JWT (1-hour expiry) via Authorization headers.

---

## 🛠️ Architecture Overview

### Frontend
- Static pages (`index.html`, `hostels.html`, `rooms.html`, `applications.html`, `dashboard.html`, `login.html`, `register.html`)
- Single JavaScript entrypoint: `app.js` (handles per-page rendering and API calls)

### Backend
- `server.js`: Sets up Express and mounts `/api` routes
- `db/db.js`: Connects to PostgreSQL via connection string
- `controllers/`: Business logic for users, auth, dashboard
- `routes/`: Express routers (`users.js`, `auth.js`, `dashboard.js`, etc.)

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `PORT`: Server port (automatically set by Render)

---

## 🌐 API Endpoints

| Method | Path                  | Description                                | Auth Required |
|------- |---------------------- |------------------------------------------- |---------------|
| GET    | `/api/hostels`         | List all hostels                          | No            |
| GET    | `/api/rooms`           | List all rooms                            | No            |
| POST   | `/api/applications`    | Apply for housing (user_id, room_id, status) | No (frontend validation) |
| POST   | `/api/auth/login`      | User login (returns `{ token }`)           | No            |
| POST   | `/api/users`           | Register a new student                    | No            |
| GET    | `/api/dashboard`       | Get student dashboard data (profile, stats, hostels, activities) | Yes (Bearer JWT) |

> Admin CRUD routes are available under `/api/hostels`, `/api/rooms`, `/api/users`, etc.

---

## 🚀 Local Development

### 1. Clone Repositories
```bash
git clone <frontend-repo-url>
git clone <backend-repo-url>
```

### 2. Setup Backend
```bash
cd backend/
npm install
export DATABASE_URL=postgres://your-postgres-dsn
export JWT_SECRET=your-secret
node server.js
```

### 3. Setup Frontend
- Open `index.html` directly in your browser **or** serve it using:
```bash
npx http-server
```

Make sure `app.js` points to your local backend URL if needed.

---

## 🌍 Deployment Guide

### Backend
1. Push your backend repo to GitHub.
2. Link it to a new **Render** service.
3. Set up environment variables (`DATABASE_URL`, `JWT_SECRET`) in Render.
4. Deploy.

### Frontend
1. Push your frontend repo to GitHub.
2. Deploy via **GitHub Pages**.
3. Ensure `app.js` fetch calls point to the deployed backend URL.

---

## 📂 Project Structure

```
frontend/
├── index.html
├── hostels.html
├── rooms.html
├── applications.html
├── dashboard.html
├── login.html
├── register.html
└── app.js

backend/
├── server.js
├── db/
│   └── db.js
├── controllers/
│   ├── usersController.js
│   ├── authController.js
│   └── dashboardController.js
├── routes/
│   ├── users.js
│   ├── auth.js
│   └── dashboard.js
└── .env (environment variables)
```

---

## 📋 Notes
- **JWT Tokens** expire after 1 hour. Users must re-login after expiry.
- Frontend-side validation is done for application submissions.
- Admin routes are protected and require valid JWT tokens with admin rights (implementation-specific).

---

Would you like me to also create a **shorter** or a **more detailed** version (e.g., with screenshots section, tech stack badges, quick links)? 🚀  
If yes, just tell me!