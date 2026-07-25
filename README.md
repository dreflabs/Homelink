# HOMELINK 2.0

HomeLink 2.0 is an advanced, enterprise-grade property marketplace built with Next.js 16 (App Router), Prisma, and PostgreSQL. It features AI Semantic Search, a comprehensive Super Admin dashboard, automated Billing, CMS, and specialized agent portals.

## Architecture

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, Shadcn UI
- **Backend**: Next.js Server Actions & API Routes
- **Database**: PostgreSQL (with pgvector for AI semantic search) via Prisma ORM
- **Deployment**: Designed for Self-Hosted VPS (Docker / PM2)

## Getting Started (Local Development)

1. Ensure you have Docker running.
2. Start the database:
   ```bash
   docker compose up -d
   ```
3. Sync the Prisma schema:
   ```bash
   npx prisma db push
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Self-Hosted VPS Deployment

This application is strictly designed to be deployed on a standard Linux VPS (e.g., Hostinger, DigitalOcean) and does **not** rely on PaaS providers like Vercel or Supabase. 

Recommended deployment steps for production:
1. Provision a VPS with Ubuntu 22.04+ and Docker installed.
2. Clone the repository and configure `.env` with production keys.
3. Spin up PostgreSQL using Docker Compose.
4. Build the application: `npm run build`
5. Serve via PM2 or a Dockerized Node container, reverse-proxied by NGINX or Caddy with SSL enabled.
