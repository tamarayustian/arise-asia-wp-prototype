# wp-test

Headless WordPress setup — WordPress (Docker) serves as the content backend, and an Astro site serves the frontend.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes `docker compose`)
- [Node.js](https://nodejs.org/) >= 22.12.0
- [pnpm](https://pnpm.io/installation)

## Quick Start

### 1. Start WordPress

```bash
cd cms && docker compose up -d
```

Wait 30 seconds for MySQL to initialize. Visit http://localhost:8080 and complete the WordPress install wizard.

**Credentials (POC only):**

- WordPress admin: `admin` / `admin123`
- Database: `wpdb` / `wpuser` / `wppass`

### 2. Configure WordPress

1. Go to **Plugins** → install **Yoast SEO**
2. Create 2–3 sample posts with titles and content

### 3. Start the frontend

```bash
cd frontend && pnpm dev
```

First time only — install dependencies:
```bash
cd frontend && pnpm install
```

Visit http://localhost:4321 — your WordPress posts will be listed. Click any post to read it.

## Stopping

```bash
cd cms && docker compose down
```

To also remove the database data:

```bash
cd cms && docker compose down -v
```
