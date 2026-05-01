# CloudNotes

CloudNotes is a full-stack web application that allows users to securely create, manage, and search personal notes online. It is built using the MERN stack and implements authentication, protected routes, and a responsive user interface.

---

## Features

- User registration and login with authentication
- Secure password hashing using bcrypt
- JWT-based authorization and protected routes
- Create, read, update, and delete notes
- Search notes using keywords
- Responsive UI with dark and light mode
- Real-time updates after note operations

---

## Tech Stack

### Frontend
- React.js
- JavaScript (ES6)
- Axios
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MongoDB with Mongoose

### Authentication
- JSON Web Tokens (JWT)
- bcrypt.js

---

## Project Structure


cloudnotes/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── public/
│ └── src/
│ ├── pages/
│ ├── services/
│ └── App.js
│
└── README.md


---

## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas account

---

### 1. Clone the repository


git clone https://github.com/Anuj-Kumar0/cloudnotes.git

cd cloudnotes


---

### 2. Backend setup


cd backend
npm install


Create a `.env` file in the backend folder:


MONGO_URI=mongodb+srv://AnujKumar:mongoDB@cluster0.cu4fqng.mongodb.net/?appName=Cluster0
JWT_SECRET=cloudnotes_secret_key


Start backend server:


npm run server


---

### 3. Frontend setup


cd frontend
npm install
npm start


---

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Notes
- GET `/api/notes` - Get all notes
- POST `/api/notes` - Create note
- PUT `/api/notes/:id` - Update note
- DELETE `/api/notes/:id` - Delete note
- GET `/api/notes/search?q=keyword` - Search notes

---

## Security Implementation

- Passwords are hashed using bcrypt before storage
- JWT tokens are used for authentication
- Protected routes restrict unauthorized access
- User-specific data access is enforced

- ## Deployment

- Backend: Deployed on Render.
- Frontend: Deployed on Vercel.

CloudNotes is a full-stack web application for managing personal notes. Users can register, log in, and perform CRUD operations on their notes. The application ensures secure authentication and user-specific data access.

---

## Features

-  User authentication (Register/Login)
-  Create, read, update, and delete notes
-  Search notes
-  Secure user-specific data

---

## Tech Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Tokens (JWT)
- bcrypt.js

### Tools
- Postman
- Git & GitHub
- dotenv