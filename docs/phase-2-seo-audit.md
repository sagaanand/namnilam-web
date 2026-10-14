# Nam Nilam — Phase 2 Technical SEO & Pre-rendering Audit

**Audit Date:** October 13, 2026  
**Auditor:** Senior Technical SEO & Full-Stack Architect  
**Target:** Nam Nilam Platform (`namnilam.com`)  
**Deployment Target:** Hostinger Shared Hosting (Apache + PHP 8.x + MySQL)  

---

## 1. Discovered Architecture & Baseline State

### 1.1 Frontend Stack & Routing
* **Framework:** React 19 + Vite 8.
* **Routing:** `react-router-dom` v7 with `BrowserRouter` in [src/App.jsx](file:///Users/apple/Desktop/nn-website/namnilam-web/src/App.jsx).
* **Rendering Paradigm:** 100% Client-Side Rendered (CSR) Single Page Application (SPA).
* **Entry Point:** [index.html](file:///Users/apple/Desktop/nn-website/namnilam-web/index.html) with `<div id="root"></div>` and client bootstrap `<script type="module" src="/src/main.jsx">`.

### 1.2 Web Server & Deployment Structure
* **Web Server:** Apache with `mod_rewrite`, `mod_headers`, and FastCGI PHP 8.x.
* **Hosting Model:** Hostinger Git deployment maps the repository root directly to `public_html/`. Both root files (`index.html`, `assets/`, `api/`) and `dist/` exist in the repository.
* **Apache Directory Conflict on `/projects`:** 
  * A physical directory `projects/` exists at the root containing project photographs (`jai-nagar.jpg`, etc.).
  * Apache's `mod_dir` automatically appends a trailing slash to directory requests (`/projects` -> `/projects/`).
  * A temporary client redirect file [projects/index.html](file:///Users/apple/Desktop/nn-website/namnilam-web/projects/index.html) was previously added (`<script>window.location.replace('/projects');</script>`), causing redirect hops and poor crawler accessibility.
* **Rewrite Rules:** [.htaccess](file:///Users/apple/Desktop/nn-website/namnilam-web/.htaccess) routes all non-file requests to `index.html`. Phase 1 security rules forward `HTTP_AUTHORIZATION` and block access to `.env`, `.sql`, `.sqlite`, `.log`.

### 1.3 Database & API Architecture
* **Database Tables:** `leads`, `projects`, `admins` in MySQL ([sql/hostinger_schema.sql](file:///Users/apple/Desktop/nn-website/namnilam-web/sql/hostinger_schema.sql)).
* **Missing Data Model:** There is currently **no dedicated `properties` table** for individual plot/villa/farmland listings. Only macro layout projects exist.
* **API Endpoints:**
  * `api/auth.php` (Admin JWT issuance & rate limiting)
  * `api/leads.php` (Public enquiry capture, protected lead management)
  * `api/projects.php` (Public catalog listing, protected CRUD)
* **Phase 1 Security Status:** All endpoints are protected with HMAC-SHA256 JWT tokens, constant-time verification, and input sanitization. These protections must be strictly preserved.

---

## 2. Identified Search Engine & Discovery Deficiencies

1. **Empty Shell HTML for Search Engine Crawlers:**
   * Direct HTTP requests to any route (e.g. `https://namnilam.com/projects/jai-nagar`, `https://namnilam.com/services`) return the generic root [index.html](file:///Users/apple/Desktop/nn-website/namnilam-web/index.html).
   * The server-rendered HTML contains:
     * Hardcoded homepage title: `Nam Nilam | Real Estate Intelligence & Advisory`
     * Hardcoded homepage meta description
     * Hardcoded homepage canonical URL: `<link rel="canonical" href="https://namnilam.com/" />`
     * An empty `<div id="root"></div>`
   * Crawlers that do not execute JavaScript (or evaluate meta tags before JS runs) see identical homepage metadata and zero content for every URL.
2. **Missing Individual Property Listing Pages:**
   * While 5 project layouts exist (`jai-nagar`, `abirami-nagar`, `farm-land`, `sentha-city`, `kasinath-nagar`), there is no dedicated `/properties` catalog or individual property detail pages for specific plots/survey numbers.
3. **Canonical Mismatch & Self-Referential Canonical Risk:**
   * Because `index.html` serves `<link rel="canonical" href="https://namnilam.com/" />` statically, search engines risk canonicalizing all subpages back to the homepage.
4. **Static Sitemap Incomplete & Outdated:**
   * [public/sitemap.xml](file:///Users/apple/Desktop/nn-website/namnilam-web/public/sitemap.xml) is a hardcoded static XML file missing property listings and lastmod timestamps.
5. **No Robots Directive Disallow for Admin:**
   * [public/robots.txt](file:///Users/apple/Desktop/nn-website/namnilam-web/public/robots.txt) allows all crawlers unconditionally without disallowing `/admin` or `/api/`.
6. **No Structured Data in Initial Server Response:**
   * JSON-LD is only injected on the client side via [src/components/common/SeoHead.jsx](file:///Users/apple/Desktop/nn-website/namnilam-web/src/components/common/SeoHead.jsx) after JavaScript execution.

---

## 3. Implementation Plan

### Step 1: Property Listing Data Model & Versioned Migration
* Create `sql/v2_properties_schema.sql` defining a robust `properties` table supporting:
  * `id`, `slug`, `title`, `property_type`, `locality`, `city`, `district`, `state`, `country`, `landmark`, `plot_area`, `plot_area_unit`, `asking_price`, `price_label`, `price_per_sqft`, `currency`, `description`, `images`, `featured_image`, `status`, `availability`, `approval_status`, `rera_id`, `project_id`, `display_order`, `created_at`, `updated_at`.
* Seed verified plot inventory linked to Trichy projects.
* Provide rollback SQL instructions (`DROP TABLE IF EXISTS properties;`).

### Step 2: Backend Property API ([api/properties.php](file:///Users/apple/Desktop/nn-website/namnilam-web/api/properties.php))
* Implement public `GET` endpoint for listing published properties and fetching single properties by `?slug=`.
* Implement protected `POST` endpoint for property CRUD guarded by `requireAdminAuth()`.
* Mirror across `api/`, `public/api/`, and `dist/api/`.

### Step 3: Frontend Property Pages & Navigation
* Create [src/pages/PropertyDetailPage.jsx](file:///Users/apple/Desktop/nn-website/namnilam-web/src/pages/PropertyDetailPage.jsx) supporting rich plot specifications, verified approvals, image galleries, breadcrumbs, internal links, and WhatsApp enquiry CTAs.
* Add routes in [src/App.jsx](file:///Users/apple/Desktop/nn-website/namnilam-web/src/App.jsx):
  * `/properties` (Properties catalog)
  * `/properties/:slug` (Property detail page)

### Step 4: Centralized Route Metadata & JSON-LD System
* Create `src/data/seoMetadata.js` defining unique, canonical metadata and Schema.org structured data for every indexable route:
  * Homepage, About (and subpages), Services (and subpages), Academy (and subpages), Business (and subpages), AI (and subpages), Projects (and project slugs), Properties (and property slugs), Resources, Contact.
* Update `SeoHead.jsx` to consume verified metadata without conflicting tags.

### Step 5: Build-Time Pre-rendering (SSG for Hostinger)
* Create `scripts/prerender.mjs`:
  * Takes Vite's compiled bundle and pre-renders static HTML files for every public route into `dist/[route]/index.html`.
  * Injects exact `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, Twitter Cards, Schema.org JSON-LD, and pre-rendered semantic HTML inside `<div id="root">`.
  * Syncs pre-rendered route directories to the project root for Hostinger Apache direct static file delivery.
  * Resolves Apache `/projects` directory conflict cleanly.

### Step 6: Dynamic XML Sitemap & Robots.txt Generation
* Build dynamic sitemap generator in `scripts/generate_sitemap.mjs` and PHP fallback [api/sitemap.php](file:///Users/apple/Desktop/nn-website/namnilam-web/api/sitemap.php).
* Update `robots.txt` to permit search crawlers (Googlebot, Bingbot, OAI-SearchBot) and disallow `/admin` and private endpoints.

### Step 7: Technical SEO Validation & Regression Testing
* Validate metadata, canonical URLs, XML sitemap protocol compliance, JSON-LD schema validity, and Phase 1 security regression (all 60 Phase 1 tests must pass).

---

## 4. Expected Files to Change or Create

* `docs/phase-2-seo-audit.md` *(This file)*
* `sql/v2_properties_schema.sql` *(New SQL migration)*
* `api/properties.php` *(New backend API)*
* `public/api/properties.php` & `dist/api/properties.php` *(Mirrored APIs)*
* `src/data/seoMetadata.js` *(New metadata dictionary)*
* `src/data/propertiesData.js` *(Seed & fallback property listings)*
* `src/pages/PropertyDetailPage.jsx` *(New property detail page component)*
* `src/pages/PropertiesPage.jsx` *(New property catalog page component)*
* `src/services/api.js` *(Updated with getProperties API)*
* `src/App.jsx` *(Added /properties and /properties/:slug routes)*
* `scripts/prerender.mjs` *(Build-time pre-renderer script)*
* `public/robots.txt` & `.htaccess` *(Updated rules)*
* `public/sitemap.xml` & `dist/sitemap.xml` *(Updated sitemaps)*
* `tests/seo_phase2.test.mjs` *(Automated Phase 2 SEO test suite)*
* `docs/phase-2-implementation-report.md`
* `docs/phase-2-deployment-guide.md`
