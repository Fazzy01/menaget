# Task Management API

A RESTful API for managing tasks with real-time updates using Ably.
the live hosted server is `https://menaget.onrender.com`

## Features

- CRUD operations for tasks
- Filtering and searching tasks
- Real-time updates using Ably
- Scheduled job to mark old tasks as complete
- Comprehensive API documentation with Postman and Swagger
- Database migrations with Knex.js
- Dependency injection with Awilix

## Technologies

- Express.js with TypeScript
- PostgreSQL
- Knex.js for database queries and migrations
- Awilix for dependency injection
- Ably for real-time updates
- Swagger for API documentation
- Winston for logging
- Node-cron for job scheduling

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a PostgreSQL database
4. Copy `.env.example` to `.env` and update the values
5. Start the server: `npm start-dev`
# For production
Run `npm install --omit=dev && npm run build`
Start the server: `npm run serve`

# Note the migration and seeder automatically create after starting server
-But to manually run them
-Run migrations: `npm run migrate:local` for local deployment or `npm run migrate` for production
-Seed the database: `npm run seed`


## API Documentation

Swagger UI is available at `/api-docs` when the server is running.
postman url: https://www.postman.com/interstellar-resonance-431128/personalprojects/collection/4c6eykc/menaget?action=share&creator=23245512


## Design Patterns Used

1. **Dependency Injection**:
   - Awilix manages dependencies and their lifetimes

2. **Repository Pattern**:
   - Abstracts data access behind a simple collection-like interface

3. **Strategy Pattern**:
   - Different validation strategies can be applied to requests

4. **Observer Pattern**:
   - Ably implements the observer pattern for real-time updates



## Real-time Updates

To test real-time updates:

1. Subscribe to the `task-updates` channel using the Ably SDK
2. Perform CRUD operations on tasks
3. Observe the events in your client

Example client code:

```javascript
// See the client-side JavaScript example in the client.html
