# Workforce Hub — Employee Management System

A production-style full-stack employee management platform built with React, Express, PostgreSQL, JWT authentication and role-based access control. It covers employee directories, department statistics, attendance, leave workflows, payroll, performance reviews, document metadata and notifications.

## Folder structure

```text
frontend/                 React + Vite responsive dashboard
  src/main.jsx            routes, views, authentication and UI
backend/                  Express REST API
  src/server.js           routes, RBAC middleware integration and uploads
  src/seed.js             realistic demo data
database/schema.sql       PostgreSQL normalized schema, constraints and indexes
docker-compose.yml        PostgreSQL + API container setup
```

## Quick start (local)

1. Create a PostgreSQL database named `workforce_hub`.
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` and a long `JWT_SECRET`.
3. Run the schema: `psql -U workforce -d workforce_hub -f database/schema.sql`
4. Install dependencies: `npm install && npm run install:all`
5. Seed realistic data: `npm run seed`
6. Start both services: `npm run dev`
7. Open `http://localhost:5173`.

For a containerized database/API, run `docker compose up --build`; use a local frontend with `npm run dev --prefix frontend`.

## Demo logins

All seed accounts use password `Demo@123`.

| Role | Email |
|---|---|
| Admin | ava.sharma@workforcehub.in |
| HR | priya.nair@workforcehub.in |
| Manager | arjun.kapoor@workforcehub.in |
| Employee | aarav.singh@workforcehub.in |

## API reference

Authentication: `POST /api/auth/login`, `POST /api/auth/register` (Admin), `POST /api/auth/change-password`.

Protected resource endpoints: `GET/POST /api/employees`, `GET/PUT/DELETE /api/employees/:id`, `GET/POST /api/departments`, `GET/POST /api/attendance`, `GET/POST /api/leaves`, `PUT /api/leaves/:id/approve`, `PUT /api/leaves/:id/reject`, `GET/POST /api/payroll`, `GET/POST /api/performance`, `POST /api/documents`, `GET /api/notifications`, and `GET /api/reports/employees`.

Pass `Authorization: Bearer <token>` for protected endpoints. Admin and HR manage workforce data; Managers can create performance reviews and action leaves; Employees see only their own attendance, leave, payroll and performance records.

## Architecture

The frontend uses a small Axios API client with a JWT interceptor and protected client routes. Express owns REST endpoints and returns consistent JSON errors. PostgreSQL enforces foreign keys, uniqueness, checks, timestamps and indexes. Passwords are bcrypt hashes, JWTs expire after eight hours, Helmet/CORS protect the API, and Multer stores employee document uploads outside public database fields. The schema is deliberately relational: employees link to a user account and department; operational records link to employees.

