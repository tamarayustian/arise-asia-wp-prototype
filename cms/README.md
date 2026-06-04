# CMS (WordPress)

## Quick Start

```bash
docker compose up -d
```

Then open http://localhost:8080 and complete the WordPress setup wizard.

## Credentials (POC only)

- **WordPress admin**: `admin` / `admin123`
- **Database**: `wpdb` / `wpuser` / `wppass`

## After Setup

1. Complete the WordPress install wizard at http://localhost:8080
2. Go to **Plugins** → install **Yoast SEO**
3. Create 2-3 sample posts with titles and content

## Mu-Plugins

The `wp-content/mu-plugins/` directory contains must-use plugins that auto-load:
- `headless-redirect.php` — redirects non-logged-in frontend visitors back to the Astro frontend

## Stopping

```bash
docker compose down
```

To also remove the database data:

```bash
docker compose down -v
```

## Troubleshooting

**WordPress stuck on "Error establishing database connection":**
```bash
docker compose down && docker compose up -d
```
Wait 30 seconds for MySQL to initialize.

**Can't access wp-admin after redirect:**
The mu-plugin only redirects non-logged-in visitors. Logged-in users can access the admin normally.
