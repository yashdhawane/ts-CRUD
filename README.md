# Task Management API

A RESTful API for managing tasks, built with Node.js, Express, TypeScript, and MongoDB. This API allows users to create, read, update, and delete tasks with user authentication.

## Features

- User Authentication (Register/Login)
- Create, Read, Update, Delete Tasks
- Task status management
- User-specific task management
- Secure password hashing
- JWT-based authentication

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

## API Base URL
https://your-deployed-api-url.com


## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## API Endpoints

### Authentication
- `POST api/user/register` - Register a new user
- `POST api/user/login` - Login user

### Tasks
- `GET api/tasks/get` - Get all tasks for authenticated user
- `POST api/tasks/add` - Create a new task
- `PUT api/tasks/:id` - Update a task
- `DELETE api/tasks/delete/:id` - Delete a task

## Request & Response Examples

### Register User

POST api/user/register
{
"username": "john@example.com",
"password": "password123"
}


### Login User

POST api/user/login
{
"username": "john@example.com",
"password": "password123"
}

## Authentication

The API uses JWT for authentication. Include the JWT token in the Authorization header:

### Create Task

POST api/task/add
{
"title": "Complete Project",
"description": "Finish the task management API",
"status": "pending"
}

### update Task

PUT api/task/:id
{
"title": "Complete Project",
"description": "Finish the task management API",
"status": "completed"
}

### delete Task

DELETE api/tasks/delete/:id

### GET Task

GET api/tasks/get


## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details


