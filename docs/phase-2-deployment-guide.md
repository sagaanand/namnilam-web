# Nam Nilam — Phase 2 Production Deployment & Operations Guide
**Focus:** Technical SEO, Hybrid Dynamic Pre-rendering, Property Listings & Hostinger Deployment

---

## 1. Document-Root & Hostinger Hosting Topology

Nam Nilam is hosted on **Hostinger Shared Web Hosting** running:
- **Web Server:** Apache 2.4+ with `mod_rewrite`, `mod_headers`, `mod_dir`
- **PHP Version:** PHP 8.1 / 8.2 with PDO MySQL, OpenSSL, and JSON extensions
- **Database:** MySQL 8.0+ / MariaDB 10.x
- **Frontend Stack:** React 19 + Vite (Pre-rendered SSG with Client-Side Hydration)

### Production Directory Hierarchy

On Hostinger Shared Hosting, the public web root is standardly located at:
`/home/uXXXXXXXXX/domains/namnilam.com/public_html`

```
public_html/
├── .env                           <-- Stored ONE LEVEL ABOVE public_html if possible, or protected by .htaccess
├── .htaccess                      <-- Apache configuration: HTTPS canonicalization, security headers, FastCGI auth, crawler routing
├── index.html                     <-- Pre-rendered Homepage HTML with React entry
├── favicon.svg                    <-- Favicon & brand emblems
├── nam-nilam-logo.png             <-- Official Schema.org & Open Graph brand image
├── robots.txt                     <-- Search engine & AI crawler access policies
├── sitemap.xml                    <-- Auto-generated XML sitemap (routes + properties + projects)
├── assets/                        <-- Production JS/CSS code-split bundles
│   ├── vendor-react-*.js
│   ├── vendor-ui-*.js
│   ├── main-*.css
│   └── ...
├── api/                           <-- Backend PHP Micro-services
│   ├── config.php                 <-- Safe environment & secret loader
│   ├── db.php                     <-- Persistent PDO connection with retry
│   ├── auth.php                   <-- Server-side admin authentication
│   ├── auth_helper.php            <-- JWT & timing-safe authorization validator
│   ├── leads.php                  <-- Protected leads management & public enquiry
│   ├── projects.php               <-- Public projects catalog & admin mutations
│   ├── properties.php             <-- Public verified plots catalog & admin mutations
│   └── prerender.php              <-- Dynamic crawler fallback for post-build MySQL listings
├── properties/                    <-- Static Pre-rendered Properties
│   ├── index.html                 <-- Discovery catalog
│   ├── [property-slug-1]/
│   │   └── index.html             <-- Crawlable property detail HTML + Schema.org JSON-LD
│   └── ...
├── projects/                      <-- Static Pre-rendered Layout Projects
│   ├── index.html                 <-- Projects discovery
│   ├── [project-slug-1]/
│   │   └── index.html             <-- Crawlable project layout HTML
│   └── ...
├── services/                      <-- Pre-rendered Service Pages
├── about/                         <-- Pre-rendered About Pages
└── ...
```

---

## 2. Database Migration Steps (MySQL)

Phase 2 introduces the `properties` table for individual plot listings without altering or dropping existing tables.

### Step 2.1: Backup Existing Database
Before applying migrations, create a database snapshot in Hostinger hPanel -> Databases -> phpMyAdmin -> Export, or via CLI:
```bash
mysqldump -u <DB_USER> -p <DB_NAME> > backup_namnilam_pre_phase2.sql
```

### Step 2.2: Apply Phase 2 Schema
Open phpMyAdmin in Hostinger hPanel, select your Nam Nilam database, and execute the SQL file:
`sql/v2_properties_schema.sql`

This script safely executes:
1. `CREATE TABLE IF NOT EXISTS properties (...)` with utf8mb4 collation.
2. Creates performance indices on `slug`, `locality`, `status`, `price`, and `project_id`.
3. Inserts verified seed plot records for Jai Nagar, Abirami Nagar, Sentha City, Kasinath Nagar, and Koonalai Farmland.

### Step 2.3: Rollback Procedure (If Required)
If you need to rollback the property listing table without affecting leads or projects:
```sql
DROP TABLE IF EXISTS properties;
```

---

## 3. Local Build & SSG Pre-rendering Pipeline

Execute the comprehensive SEO build pipeline on your local machine before uploading to Hostinger:

```bash
# 1. Build frontend with code splitting
npm run build

# 2. Pre-render all 30 public routes into static HTML files
npm run prerender

# 3. Generate XML sitemap with all routes and verified properties
npm run sitemap

# Alternatively, run the single unified command:
npm run build:seo
```

### Build Output Verification
Confirm the following files exist in `dist/`:
- `dist/index.html` (has pre-rendered content inside `<div id="root">`)
- `dist/sitemap.xml` (contains all routes with `lastmod`)
- `dist/robots.txt` (defines crawler allowances)
- `dist/properties/index.html` and `dist/properties/[slug]/index.html`
- `dist/projects/index.html` and `dist/projects/[slug]/index.html`
- `dist/api/properties.php` and `dist/api/prerender.php`

---

## 4. Hostinger Upload & Deployment Instructions

### Method A: Hostinger File Manager (Recommended)
1. Zip the contents of the local `dist/` directory:
   ```bash
   cd dist && zip -r ../namnilam_phase2_deploy.zip . && cd ..
   ```
2. Log into Hostinger hPanel -> Websites -> `namnilam.com` -> **File Manager**.
3. Navigate to `public_html/`.
4. Upload `namnilam_phase2_deploy.zip` and extract directly into `public_html/`.
5. Ensure `.htaccess` is present and permissions are set:
   - Directories: `755`
   - Files: `644`
   - `.env`: `600` (or placed one directory above `public_html`)

### Method B: Git / SSH Deployment
If SSH access is enabled in Hostinger hPanel:
```bash
ssh uXXXXXXXXX@your-hostinger-ip -p 65002
cd domains/namnilam.com/public_html
git pull origin main
./node_modules/.bin/vite build
node scripts/prerender.mjs
node scripts/generate_sitemap.mjs
```

---

## 5. Post-Deployment Verification Smoke Tests

Run these checks immediately following deployment:

### 1. Sitemap Verification
- Request: `https://namnilam.com/sitemap.xml`
- Expected: HTTP 200, valid XML, contains `/properties` and individual `/properties/[slug]` links.
- Check: Verify `/admin` is NOT present.

### 2. Robots Directives
- Request: `https://namnilam.com/robots.txt`
- Expected: HTTP 200, `Allow: /`, `Disallow: /admin`, `Disallow: /api/`, `Sitemap: https://namnilam.com/sitemap.xml`.

### 3. Pre-rendered Property Page Crawlability (cURL Test)
Run a curl command simulating a search crawler:
```bash
curl -A "Googlebot" -s https://namnilam.com/properties/jai-nagar-1200-sqft-residential-plot-siruganur-trichy | grep -E "(<title>|canonical|schema-jsonld|Sweet Kaveri)"
```
Expected output:
- Unique `<title>` containing "1200 Sq.Ft Residential Plot in Siruganur, Trichy | Nam Nilam"
- Canonical pointing to exact property URL
- Schema.org JSON-LD script present
- Verified ground truth data ("Sweet Kaveri", asking price, plot extent) visible in raw HTML.

### 4. Direct Nested URL Access & Apache Directory Traversal
- Request in browser: `https://namnilam.com/projects`
- Expected: Displays layout projects page without 403 Forbidden or directory index listing.
- Request in browser: `https://namnilam.com/properties`
- Expected: Displays verified plot discovery grid with locality filters.

### 5. Dynamic Fallback for Post-Build Listings
- If a listing is added in MySQL via Admin:
- Request with crawler user-agent:
  ```bash
  curl -A "OAI-SearchBot" -s https://namnilam.com/properties/new-plot-slug
  ```
- Expected: HTTP 200 with `X-Prerender: Dynamic-PHP` header and full crawlable HTML.

### 6. Security Invariance
- Request: `https://namnilam.com/.env`
- Expected: HTTP 403 Forbidden.
- POST to `/api/properties.php` without token:
- Expected: HTTP 401 Unauthorized (`{"success":false,"unauthorized":true}`).

---

## 6. How New Listings Trigger Search Discoverability

1. **Immediate Discovery:** When an admin adds a new listing via `/admin`, it is stored in the MySQL database. `api/prerender.php` immediately handles crawler requests via Apache `.htaccess` rewrite rules, rendering full semantic HTML, JSON-LD, and metadata.
2. **Periodic Static Regeneration:** On the next scheduled deployment or build cycle, running `npm run build:seo` bakes all newly published database listings into static HTML files in `dist/properties/[slug]/index.html` and updates `dist/sitemap.xml`.
