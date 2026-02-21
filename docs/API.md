# API Documentation

Base URL: `http://localhost:5000/api`

## Auth

1. `POST /auth/register`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

2. `POST /auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

3. `GET /auth/profile` (Protected)
- Header: `Authorization: Bearer <token>`

4. `PUT /auth/profile` (Protected)
- Header: `Authorization: Bearer <token>`
- Body (partial allowed):
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

## Tasks (Protected)

1. `POST /tasks`
- Body:
```json
{
  "title": "Finish project",
  "description": "Complete API integration",
  "status": "pending"
}
```

2. `GET /tasks`

3. `PUT /tasks/:id`
- Body (partial allowed):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

4. `DELETE /tasks/:id`

## Validation & Errors

- Validation errors return HTTP `400` with:
```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Valid email is required" }
  ]
}
```

- Auth errors return `401`.
- Not found returns `404`.
