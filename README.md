# CampusConnect

CampusConnect is a collaborative platform that connects students, enabling them to ask questions, share knowledge, and engage with peers to solve academic and real-world problems.

## Features
- **User Authentication:** Sign up and login securely with JWT.
- **Ask & Answer:** Post questions and receive answers from classmates.
- **Voting System:** Upvote and downvote answers to highlight the best solutions.
- **Personal Dashboard:** Track and manage the questions you've asked.

## Tech Stack
- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS.
- **Backend:** Node.js, Express.js, MongoDB + Mongoose.

## How to Run locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- MongoDB installed and running locally, OR you can replace the URI in the `.env` file with a MongoDB Atlas cloud URI.

### 2. Run the Backend
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
npm install
```
Rename the `.env.example` file to `.env` to configure your environment variables (the defaults work out of the box for local MongoDB).
```bash
npm run dev
```

### 3. Run the Frontend
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The console will outline the local address (e.g. `http://localhost:5173`) where you can view the application in your browser!