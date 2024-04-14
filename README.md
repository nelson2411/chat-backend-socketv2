### Chat App Backend - Node.js, Express, Mongoose

This project provides the backend functionality for a real-time chat application, enabling users to register, login, and send messages to each other. It utilizes the following technologies:

    Node.js: JavaScript runtime environment for server-side development.
    Express.js: Web framework for building robust Node.js applications.
    express-validator: Middleware for validating and sanitizing user input.
    Mongoose: ODM (Object Data Modeling) library for interacting with MongoDB.
    MongoDB: NoSQL database for storing chat data and user information.
    jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT) for secure authentication.

#### Getting Started

**Prerequisites:**

Node.js and npm (or yarn) installed on your system (https://nodejs.org/)

1. Clone the repository:

```bash
git clone https://github.com/nelson2411/chat-backend-socketv2
```

2. Install Dependencies:

```bash
cd chat-app-backend  # Replace with your project directory name
npm install  # or yarn install
```

3. Environment Variables:
   Create a .env file in the project root directory (ignore this file in version control) and define the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt_tokens
```

Replace the placeholders with your actual MongoDB connection string and a strong secret key for JWT token generation.

4. Development Server:
   Start the development server using:

```bash
npm run dev
```

This will typically start the server on port 8080 (check the code for confirmation). You can access the API endpoints once the server is running.

#### Additional Notes

- This readme provides a general guide. You might need to modify it based on your specific project structure and requirements.
- Remember to replace placeholders with your actual values.
- Secure your JWT secret key and avoid exposing it in public code.
- Consider implementing additional features like user profiles, group chats, and real-time updates using websockets or similar technologies.
