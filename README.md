# 🎬 ProMoves

ProMoves is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to manage and display movie-related data with an intuitive user interface.

---


## 📚 Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [API Communication](#api-communication)
- [Tech Stack](#tech-stack)
- [Scripts](#scripts)
- [Notable Files](#notable-files)
- [TODO](#todo)


---

## 🗂️ Project Structure
```

promoves/
├── client/                   # React frontend
│   ├── public/               # Static files (HTML, icons)
│   └── src/                  # React source code
│       ├── assets/           # Images/icons
│       ├── components/       # Reusable UI components
│       ├── pages/            # Route-based components (Home, About, etc.)
│       ├── App.jsx           # Root component
│       ├── main.jsx          # ReactDOM render entry
│       └── index.css         # Global styles
│
├── server/                   # Express backend
│   ├── config/               # DB connection config
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Auth, error handling
│   ├── models/               # Mongoose models
│   ├── routes/               # API route definitions
│   ├── .env                  # Environment variables
│   └── server.js             # Entry point
│
├── README.md                 # Project documentation
├── package.json              # Project scripts and dependencies
└── .gitignore
```
---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/promoves.git
cd promovess
```
### 2. Backend Setup
   ```
   cd server
   npm install
```
➕ Create .env file inside /server:
```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/promoves
    JWT_SECRET=your_jwt_secret
```
Start the server:
```
npm start
Server will run on http://localhost:5000
```
### 3. Frontend Setup
```
cd ../client
npm install
```
Start the client:
```
npm run dev
Client will run on http://localhost:5173 (Vite default)
```
🔗 API Communication
To enable React to talk to Express:

In vite.config.js (client side), add prox
```
server: {
  proxy: {
    '/api': 'http://localhost:5000',
  },
}
```
Or directly use full URLs like http://localhost:5000/api/users.

🧩 Tech Stack
🔹 Frontend:
    React
    Vite
    Tailwind CSS
    Lucide React (Icons)

🔹 Backend:
    Node.js
    Express
    MongoDB with Mongoose
    JWT for authentication

📦 Scripts
  Backend

 ```
  npm start         # Starts the Express server
```
Frontend
```
npm run dev       # Starts Vite development server
```
📁 Notable Files
Client:
App.jsx – Root app logic and routing

components/ – Navbar, Sidebar, Card components

pages/ – Home, About, etc.

Server:
server.js – Initializes Express server

routes/ – All backend endpoints

models/ – Database schemas

controllers/ – Logic for route handling

✅ TODO
 Add Login / Signup flow

 User roles (admin, guest)

 Responsive layout enhancements

 Unit & integration testing

