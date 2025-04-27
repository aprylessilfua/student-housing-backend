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

End-User Guide (for Students & Admins)
1.1 Student Instructions
1.1.1 Browse as a Guest
Home (index.html):

See Hostels (left column) with nested Rooms (right column).

Each Room card shows name, description, price, occupancy, and has two buttons:

Apply → start an application (prompts login if needed)

View → opens photo in a modal

1.1.2 Register & Login
Click Register in the top-right nav.

Fill in Username, Email, Phone, Password, plus new fields:

Room Preference (e.g. Single/Double)

Personal Details (textarea)

Submit → you’ll be auto-logged in.

To return, click Login, enter Email & Password.

1.1.3 Student Dashboard (dashboard.html)
Profile: name & email

Stats: Total / Pending / Accepted / Rejected applications

Available Hostels: same as on Home, with Apply/View

Assigned Rooms: list of approved rooms

Notifications: messages from Admins

1.1.4 Apply for a Room
Must be logged in.

Click Apply on a room → you get a confirmation alert.

Check Applications page to view status.

1.1.5 Logout
Click Logout in the nav → clears your session and returns to Home.

1.2 Admin Instructions
1.2.1 Admin Login (admin-login.html)
Click Admin Portal link on Home → takes you to Admin Login.

Enter your Admin Email & Password → you land on admin.html.

1.2.2 Admin Home (admin.html)
Quick links to each section: Hostels, Rooms, Students, Applications, Notifications.

1.2.3 Manage Hostels (admin-hostels.html)
+ New Hostel → opens modal to Create.

Each row: Edit → pre-populates modal, Delete → confirmation.

1.2.4 Manage Rooms (admin-rooms.html)
+ New Room → modal for Create (Name, Description, Price, Occupancy, Hostel dropdown, Photo URL).

Edit/Delete per row.

1.2.5 Manage Students (admin-students.html)
Lists all registered students.

Delete to remove a student.

1.2.6 Manage Applications (admin-applications.html)
Lists all applications (ID, User, Room, Status, Date).

Approve / Reject buttons to update status.

1.2.7 Manage Notifications (admin-notifications.html)
Form to Send a notification (User ID, Role, Type, Message).

Table of all notifications with Mark Read action.

1.2.8 Admin Logout
Click Logout → clears only the admin session and returns to Admin Login.