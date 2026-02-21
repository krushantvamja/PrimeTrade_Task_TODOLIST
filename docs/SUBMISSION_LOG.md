# Submission Log

Project: Prime Task (Full-Stack Authentication + Dashboard)  
Prepared for: HR Submission  
Date: 2026-02-21

## Candidate Summary

- Built a full-stack web application with JWT authentication and protected dashboard.
- Implemented backend APIs with secure user auth and task CRUD.
- Implemented frontend with validated forms, protected routes, task management UI, and token-based session handling.

## Stack Used

- Frontend: React (Vite), TailwindCSS, React Router DOM, Axios, Context API, React Hook Form, Yup
- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, dotenv, CORS, express-validator

## Folder Structure Delivered

- `client/` (frontend)
- `server/` (backend)
- `docs/` (API docs, Postman collection, submission log)

## Feature Completion Log

1. Authentication
- Register API: `POST /api/auth/register`
- Login API: `POST /api/auth/login`
- Profile API (protected): `GET /api/auth/profile`
- Profile Update API (protected): `PUT /api/auth/profile`
- Password hashing via bcryptjs
- JWT generation and verification with 1-day expiry

2. Task Module (Protected, user-scoped)
- Create: `POST /api/tasks`
- Read: `GET /api/tasks`
- Update: `PUT /api/tasks/:id`
- Delete: `DELETE /api/tasks/:id`
- Ownership enforced: users can only access their own tasks

3. Frontend Dashboard
- Register and Login forms with validation
- Protected routing for dashboard
- Logout flow
- User profile display
- Task create/edit/delete/toggle-complete
- Search and filter (All / Completed / Pending)
- Axios interceptor for Bearer token

4. Validation and Error Handling
- Client-side validation via Yup + React Hook Form
- Server-side validation via express-validator
- Centralized error middleware and API error responses

## Environment Setup

Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secure_random_secret>
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## Verification Log

- `npm install` completed for `server/`
- `npm install` completed for `client/`
- Frontend production build succeeded: `cd client && npm run build`
- Backend syntax check passed: `cd server && node --check server.js`

## Submission Artifacts

- Source code repository (client + server)
- API documentation: `docs/API.md`
- Postman collection: `docs/PrimeTask.postman_collection.json`
- Project setup and scaling note: `README.md`
- This log file: `docs/SUBMISSION_LOG.md`

## Production Scalability Note (Summary)

- Stateless backend with JWT suitable for horizontal scaling
- CORS and env-based API URLs for multi-environment deployment
- Recommended next steps: load balancer, rate-limiting, Redis cache, DB indexing, centralized logs/monitoring
