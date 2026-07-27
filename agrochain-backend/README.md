# AgroChain Backend (Spring Boot)

AgroChain is a platform where **farmers** directly sell agricultural products to **buyers** without middlemen.

## Tech

- Java 21
- Spring Boot (Web, Security, Validation, Data JPA)
- **Local H2 file database** (no MySQL/Oracle install required)
- JWT auth (Bearer tokens)

## Quick start

From the repo root:

```bash
npm run backend
```

Or from this folder:

```bash
mvn spring-boot:run
```

API base URL: `http://localhost:8080/api`

## Seeded accounts (first startup only)

| Role   | Email                    | Password      |
|--------|--------------------------|---------------|
| Admin  | `admin@agrochain.local`  | `Admin@12345` |
| Farmer | `farmer@agrochain.local` | `Farmer@12345`|
| Buyer  | `buyer@agrochain.local`  | `Buyer@12345` |

## Viewing the database (admin only)

1. Start the backend.
2. Open **H2 Console**: [http://localhost:8080/api/h2-console](http://localhost:8080/api/h2-console)
3. Sign in with HTTP Basic when prompted:
   - **Username:** `admin@agrochain.local`
   - **Password:** `Admin@12345`
4. Use JDBC URL: `jdbc:h2:file:./data/agrochain` (user `sa`, empty password)

Data is stored in `agrochain-backend/data/agrochain.mv.db`.

## Admin dashboard (recommended)

1. Start backend: `npm run backend`
2. Start frontend: `npm run dev` (from repo root)
3. Log in as admin at `/login` — you are redirected to `/admin`
4. Only users with `ROLE_ADMIN` can access admin API routes and the admin page

## Auth

Use `Authorization: Bearer <accessToken>` on protected endpoints.

## API overview

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/admin/users` (ADMIN)
- `GET /api/v1/admin/orders` (ADMIN)
- `GET /api/v1/admin/activity` (ADMIN)
