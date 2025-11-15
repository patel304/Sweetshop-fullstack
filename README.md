# 🍬 Sweet Shop Management System  
A full-stack application for managing sweets inventory, purchases, admin operations, and authentication with full Test-Driven Development (TDD), TypeScript, JWT Auth, and clean architecture.

---

## 🚀 Tech Stack

### **Backend**
- Node.js + Express.js  
- TypeScript  
- MongoDB + Mongoose  
- JWT Authentication  
- Jest + Supertest (TDD)

### **Frontend**
- React + TypeScript  
- Axios  
- Tailwind CSS  
- React Router DOM

---

## 📦 Project Structure

SweetShop-fullstack/
│
├── sweetshop-backend/ # Backend (Node + Express + Mongo + JWT + TDD)
└── sweetshop-frontend/ # Frontend (React + TS + Tailwind)


---

# 🧪 Test-Driven Development (TDD)

This project follows **Red → Green → Refactor** process:

1. Write failing tests  
2. Implement code to pass tests  
3. Clean and refactor  
4. Repeat  

All main backend features have test coverage using **Jest + Supertest**.

Run tests:

```sh
cd sweetshop-backend
npm test

🔐 Authentication & Roles
Feature	User	Admin
Register/Login	✔	✔
View sweets	✔	✔
Search sweets	✔	✔
Purchase sweets	✔	✔
Add new sweet	❌	✔
Update sweet	❌	✔
Delete sweet	❌	✔
Restock sweet	❌	✔
📌 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Sweets (Protected)
POST   /api/sweets
GET    /api/sweets
GET    /api/sweets/search?name=laddu
PUT    /api/sweets/:id
DELETE /api/sweets/:id   (admin only)

Inventory
POST /api/sweets/:id/purchase
POST /api/sweets/:id/restock   (admin only)

⚙️ Backend Setup
1. Go to backend:
cd sweetshop-backend
npm install

2. Create .env
MONGO_URI=mongodb://localhost:27017/sweetshop
MONGO_URI_TEST=mongodb://localhost:27017/sweetshop_test
JWT_SECRET=SweetShop
PORT=4000

3. Run server:
npm run dev


Backend runs at:

👉 http://localhost:4000

🖼 Frontend Setup
1. Go to frontend:
cd sweetshop-frontend
npm install

2. Run frontend:
npm run dev


Frontend runs at:

👉 http://localhost:5173

🍭 Features
⭐ User Side

View sweets list

Search sweets

Purchase sweets

JWT-protected pages

⭐ Admin Side

Add sweet

Delete sweet

Restock sweet

Update sweet

Admin-only route protection

📸 Screenshots

Add your screenshots inside this folder:

SweetShop-fullstack/screenshots/


Then attach them here:

## 📸 Screenshots

### 🔐 Login
![Login](./screenshots/login.png)

### 🏠 Dashboard
![Dashboard](./screenshots/dashboard.png)

### 🛠 Admin Panel
![Admin Panel](./screenshots/admin-panel.png)

### 🍬 Add Sweet Form
![Add Sweet](./screenshots/add-sweet.png)

🤖 My AI Usage (Required)

This project was developed with the help of AI tools to improve productivity while keeping all logic manually reviewed and validated.

Tools Used

ChatGPT

Helped with API design, debugging, and writing boilerplate code

Assisted in writing Jest test cases

Helped generate seed data and improve TypeScript typing

GitHub Copilot

Provided auto-completion

Suggested function patterns & repetitive code structure

How AI Helped

AI helped speed up development without compromising code quality.
All final decisions, architecture, and debugging were done manually.

Commit Transparency

Each commit assisted by AI includes:

Co-authored-by: ChatGPT <AI@users.noreply.github.com>

📚 Clean Code & SOLID Principles Used

Separation of concerns

Controllers, routes, middleware separation

TypeScript interfaces for strong typing

Meaningful function names

Avoided repetition & unnecessary logic

TDD before implementation

🧪 Test Report Example

After running Jest:

✔ All Authentication tests passed
✔ Sweets CRUD tests passed
✔ Inventory tests passed

Each route tested using Supertest.

🚀 Optional Deployment

You can deploy:

Platform	Usage
Vercel	Frontend
Netlify	Frontend
Railway	Backend
Render	Backend
MongoDB Atlas	Database
🎉 Final Notes

This fullstack Sweet Shop app demonstrates:

Real-world fullstack architecture

Role-based auth

Inventory management

TDD workflow

React + Tailwind UI

Fully typed TypeScript code

Professional Git and AI usage

