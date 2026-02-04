# Task Manager- Dashboard

## Overview
Task Manager- Dashboard

## Features
- User registration and login (JWT auth)
- Task CRUD (create, read, update, delete)
- Protected routes
- Responsive UI

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

## Setup

### Backend
1. Install dependencies:
	- cd backend
	- npm install
2. Create a .env file in backend:
	- MONGO_URI=mongodb://localhost:27017/taskflow
	- JWT_SECRET=replace_with_strong_random_secret
3. Start the API:
	- node index.js

The API runs on http://localhost:5000.

### Frontend
1. Install dependencies:
	- cd Client_Side
	- npm install
2. Start the dev server:
	- npm run dev

Open http://localhost:5173 in your browser.

## Notes
- The frontend expects the API at http://localhost:5000/api.
- JWTs are stored in localStorage after login/registration.
```
