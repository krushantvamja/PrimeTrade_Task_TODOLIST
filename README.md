# Prime Task - Full Stack App

Scalable full-stack web application with JWT authentication and dashboard task management.

## Stack

- Frontend: React (Vite), TailwindCSS, React Router DOM, Axios, Context API, React Hook Form, Yup
- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, dotenv, CORS, express-validator

## Project Structure

```text
/client
/server
```

Backend layout:

```text
server/
  config/
  controllers/
  middleware/
  models/
  routes/
  utils/
  server.js
```

Frontend layout:

```text
client/src/
  api/
  components/
  pages/
  context/
  hooks/
  layouts/
  utils/
  App.jsx
```

## Features

- JWT auth: register, login, protected profile
- Password hashing with bcryptjs
- Task CRUD with per-user ownership
- Protected dashboard route
- Task create/edit/delete/toggle complete
- Search + filter (all/completed/pending)
- Axios interceptor with bearer token
- Client and server validation

## Run Locally

1. Server setup:

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

2. Client setup:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

3. Open `http://localhost:5173`

## API Docs

- See `docs/API.md`
- Postman collection: `docs/PrimeTask.postman_collection.json`

## Production Scaling Notes

1. Frontend:
- Build static assets and host on CDN (Cloudflare/Netlify/Vercel).
- Use environment-based API URLs and cache policies.
- Add route-level code splitting and query caching (React Query) for larger dashboards.

2. Backend:
- Run behind reverse proxy/load balancer (Nginx/ALB).
- Horizontal scaling with stateless JWT auth.
- Add Redis for rate limits, cache, and token revocation strategy (if needed).
- Use background job queue (BullMQ/SQS) for async tasks.

3. Database:
- Add MongoDB indexes on `{ user: 1, createdAt: -1 }`, `{ user: 1, status: 1 }`.
- Use managed MongoDB cluster with replica sets and backups.
- Add pagination for tasks API.

4. Security/Operations:
- Strict CORS per environment.
- Request throttling and helmet hardening.
- Centralized logging/monitoring (Winston + ELK/OpenTelemetry).
- CI/CD with lint, test, build, vulnerability scans.
