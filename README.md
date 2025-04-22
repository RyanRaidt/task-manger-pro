# Task Manager Pro

A full-stack task management application built with Node.js, Express, MongoDB, and React.

## Features

- User authentication (register/login)
- Create, read, update, and delete tasks
- Task prioritization (low, medium, high)
- Task status tracking (pending, in-progress, completed)
- Modern, responsive UI with Chakra UI
- Real-time task management
- Secure API endpoints
- Toast notifications for user feedback

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

### Frontend

- React
- Chakra UI
- React Router
- Axios for API calls
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/task-manager-pro.git
cd task-manager-pro
```

2. Install backend dependencies:

```bash
npm install
```

3. Install frontend dependencies:

```bash
cd client
npm install
```

4. Create a .env file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Create a .env file in the client directory:

```env
VITE_API_URL=http://localhost:3000/api
```

### Running the Application

1. Start the backend server:

```bash
npm start
```

2. Start the frontend development server:

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Endpoints

### Authentication

- POST /api/users/register - Register a new user
- POST /api/users/login - Login user

### Tasks

- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Deployment

The application can be deployed using:

- Backend: Heroku, Render, or any Node.js hosting service
- Frontend: Vercel, Netlify, or any static site hosting service
- Database: MongoDB Atlas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Contact

Ryan Raidt - ryanraidt1026@gmail.com
Project Link: https://github.com/RyanRaidt/task-manger-pro
