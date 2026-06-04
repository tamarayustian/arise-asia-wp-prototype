# wp-test

Headless WordPress setup — WordPress serves as the content backend, and an Astro site serves the frontend.

## Local Development

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) >= 22.12.0
- [pnpm](https://pnpm.io/installation)

### 1. Start WordPress

```bash
cd cms && docker compose up -d
```

Wait 30 seconds for MySQL to initialize. Visit http://localhost:8080 and complete the WordPress install wizard.

**Credentials (POC only):**
- WordPress admin: `admin` / `admin123`
- Database: `wpdb` / `wpuser` / `wppass`

### 2. Configure WordPress

1. Go to **Plugins** → install **Yoast SEO** and **Advanced Custom Fields (ACF)**
2. In **Custom Fields** → create a field group → add fields (e.g. `subtitle`) → set **Show in REST API** → **Yes**
3. Create 2–3 sample posts with titles and content, fill in any ACF fields

### 3. Start the frontend

```bash
cd frontend && pnpm install   # first time only
cd frontend && pnpm dev
```

Visit http://localhost:4321 — your WordPress posts will be listed. Click any post to read it.

## Railway Deployment

The project is deployed as 3 services on Railway:

| Service | Source | Builder |
|---|---|---|
| **MySQL** | Railway Database plugin (Add MySQL) | Managed |
| **WordPress** | GitHub repo → `cms/` | Dockerfile |
| **Astro** | GitHub repo → `frontend/` | Dockerfile |

### Deploy steps

1. Push the repo to GitHub
2. On Railway → **New Project** → **Empty Project**
3. Add **MySQL**: **New** → **Database** → **Add MySQL**
4. Add **WordPress**: **New** → **GitHub Repo** → select repo → set **Root Directory** to `cms/` → set **Builder** to Dockerfile
5. Add **Astro**: **New** → **GitHub Repo** → select repo → set **Root Directory** to `frontend/` → set **Builder** to Dockerfile

### Environment variables

**WordPress service:**

| Variable | Value |
|---|---|
| `WORDPRESS_DB_HOST` | `${{MYSQL_HOST}}` |
| `WORDPRESS_DB_USER` | `${{MYSQL_USER}}` |
| `WORDPRESS_DB_PASSWORD` | `${{MYSQL_PASSWORD}}` |
| `WORDPRESS_DB_NAME` | `${{MYSQL_DATABASE}}` |
| `FRONTEND_URL` | `https://your-astro-url.up.railway.app` |

**Astro service:**

| Variable | Value |
|---|---|
| `WP_API_URL` | `https://your-wordpress-url.up.railway.app` |

## Project Structure

```
cms/
├── docker-compose.yml          # Local WordPress + MySQL
├── Dockerfile                  # Railway image (extends wordpress)
├── run.sh                      # Fixes MPM, starts WordPress entrypoint
├── railway.toml                # Forces Docker builder on Railway
└── wp-content/
    ├── mu-plugins/
    │   └── headless-redirect.php   # Redirects visitors to Astro frontend
    ├── plugins/
    └── themes/

frontend/
├── Dockerfile                  # Railway image (builds Astro SSR)
├── astro.config.mjs            # SSR with @astrojs/node
├── package.json
└── src/
    ├── lib/
    │   └── wordpress.ts        # WP REST API client
    └── pages/
        ├── index.astro         # Post list
        └── posts/[slug].astro  # Single post (supports ACF fields)
```

## ACF (Advanced Custom Fields)

ACF fields are exposed via the WordPress REST API as a top-level `acf` object on each post. Add new fields to `[slug].astro` by referencing them as `acf.your_field_name`.

## Stopping

```bash
cd cms && docker compose down
```

To also remove the database data:

```bash
cd cms && docker compose down -v
```
