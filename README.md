# Todo Application Backend

This project is a simple todo application backend built with TypeScript, Express, Prisma, and Zod. It provides a robust, type-safe API for managing todo items.

## Technologies Used

- **TypeScript**: For static typing and improved developer experience.
- **Express**: Web application framework for Node.js.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **Zod**: TypeScript-first schema declaration and validation library.
- **PostgreSQL**: Open-source relational database.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/awaiskhan21/todo-backend.git
   cd todo-backend
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/todo_db?schema=public"
   JWT_SECRET="your-secret-key"
   ```

   Replace the database URL with your actual PostgreSQL connection string.

4. Set up the database:

   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Authentication

This API uses JWT for authentication. Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer your-token-here
```

## Input Validation

Input validation is handled by Zod. Each endpoint has its own schema for validating incoming data.

## Database Schema

The database schema is defined in `prisma/schema.prisma`. It includes two main models:

- `User`: Represents a user of the application.
- `Todos`: Represents a todo item, associated with a user.
