# Database Connection Pooling (Serverless)

This project uses Prisma with PostgreSQL. In serverless environments, sudden traffic spikes can exhaust DB connections if each instance opens its own direct connections.

## Current app safeguards

- `lib/prisma.ts` uses a global Prisma singleton to prevent duplicate clients during hot reload/runtime reuse.
- A production warning is logged if `DATABASE_URL` does not look pooled.

## Required production setup

Use one of these for `DATABASE_URL`:

1. PgBouncer transaction pooler URL (recommended for self-hosted Postgres)
2. Neon pooled endpoint (`...-pooler...` host)
3. Prisma Accelerate endpoint (`prisma-data.net`)

Example:

```env
DATABASE_URL="postgresql://user:password@your-pooler-host/dbname?sslmode=require"
```

Optional for migrations (direct DB URL):

```env
DIRECT_URL="postgresql://user:password@your-direct-host:5432/dbname?sslmode=require"
```

## Deployment checklist

- Set pooled `DATABASE_URL` in production environment variables.
- Keep Prisma client singleton import path consistent: `import { prisma } from '@/lib/prisma'`.
- Avoid creating `new PrismaClient()` inside route handlers, server actions, or request-scoped utilities.
- Monitor database connection count during load tests.

## Notes

- If using Prisma Accelerate, configure `DATABASE_URL` with your Accelerate URL.
- If using PgBouncer, ensure transaction pooling mode is enabled and compatible with your provider guidance.
