# Nam Nilam — Phase 2 Implementation Report
**Technical SEO, Dynamic Pre-rendering & Property Search Visibility**
**Status:** IMPLEMENTED & VALIDATED

---

## 1. Executive Summary

Phase 2 of the Nam Nilam engineering roadmap has been implemented in the active codebase without regressing Phase 1 security hardening. The website now provides comprehensive technical SEO, build-time pre-rendering for all 30 public routes, a dynamic XML sitemap, crawler-permissive robots directives, Schema.org JSON-LD structured data based strictly on verified ground truth, and a dedicated verified property plot discovery engine for Tiruchirappalli, Tamil Nadu.

### Core Metrics Achieved
- **Crawlable Public Routes:** 30 routes pre-rendered with complete semantic HTML, unique titles, descriptions, and canonical URLs.
- **Verified Property Listings Model:** Production-ready `properties` table schema, zero-downtime seed inventory, and secure API with admin authorization gates.
- **Sitemap Protocol:** 100% compliant XML sitemap (`/sitemap.xml`) including all core routes, projects, and verified plots with `lastmod` dates. Excludes private `/admin` and `/api/` endpoints.
- **Robots Directives:** Explicit policies allowing Googlebot, Bingbot, Applebot, and AI search crawlers (`OAI-SearchBot`, `ChatGPT-User`, `Claude-Web`, `PerplexityBot`), while blocking private paths.
- **Pre-rendering Strategy:** Hybrid Architecture (Build-time SSG for known routes + PHP dynamic fallback `api/prerender.php` for post-build MySQL additions).
- **Security Invariance:** Zero leaked secrets, server-side JWT authentication preserved, prepared SQL statements enforced.

---

## 2. Rendering Strategy Selection & Architecture Rationale

### Selected Architecture: Hybrid Pre-rendering (SSG + PHP Dynamic Fallback)

| Strategy Evaluated | Feasibility on Hostinger Shared Hosting | Evaluation Decision |
| :--- | :--- | :--- |
| **A. Pure Build-Time SSG** | Supported | Insufficient on its own if an admin publishes a new plot in MySQL without triggering a git rebuild. |
| **B. Node.js Full SSR Daemon** | **Not Supported** | Hostinger Shared Hosting does not permit persistent Node.js background server daemons (`pm2`, Next.js server). |
| **C. Hybrid Pre-rendering (SSG + PHP Fallback)** | **Fully Supported (Optimal)** | **SELECTED.** Static HTML files for all known routes served at wire-speed by Apache. Any new plot added in MySQL post-build is dynamically served to search crawlers via `api/prerender.php`. |

### How Hybrid Pre-rendering Operates
1. **Direct Request to Pre-rendered Route (e.g. `/properties/jai-nagar-1200-sqft-residential-plot-siruganur-trichy`):**
   - Apache's `DirectoryIndex` serves `dist/properties/[slug]/index.html` directly from disk.
   - The HTML response contains the unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, Twitter cards, Schema.org JSON-LD, and pre-rendered semantic HTML with verified specs (plot area, asking price, Kaveri water depth, DTCP/RERA approval) inside `<div id="root">`.
   - When a human visitor opens the page in a browser, React 19 hydrates seamlessly, providing interactive client-side navigation without screen flicker.
2. **Dynamic Request to Newly Published Plot in MySQL (Not yet in static build):**
   - Apache checks if the static file exists. If missing and the visitor is a search bot (e.g., `Googlebot`, `OAI-SearchBot`), `.htaccess` rewrites the request to `api/prerender.php?slug=[slug]`.
   - `api/prerender.php` queries the `properties` table via prepared PDO, extracts the verified plot data, populates the base HTML template with title, canonical, Schema.org JSON-LD, and semantic HTML body, and emits HTTP 200 with `X-Prerender: Dynamic-PHP`.
   - If the property does not exist or is unpublished, it returns a crawlable HTTP 404 with `noindex, nofollow`.

---

## 3. Files Created and Modified

### Backend & Database
- `sql/v2_properties_schema.sql` (Created): Complete MySQL migration for `properties` table with indices, constraints, verified seed data, and rollback instructions.
- `api/properties.php` (Created): Public catalog & single listing retrieval with zero-downtime verified seed fallback; protected creation, update, and deletion requiring `requireAdminAuth()`.
- `api/prerender.php` (Created): High-performance crawler fallback for new database listings.
- `public/api/properties.php` & `dist/api/properties.php` (Synced).
- `public/api/prerender.php` & `dist/api/prerender.php` (Synced).

### Frontend Architecture & Routing
- `src/data/propertiesData.js` (Created): Verified Trichy plot listings inventory with exact plot sizes, pricing, guideline values, Kaveri groundwater levels, and RERA/DTCP approvals.
- `src/data/seoMetadata.js` (Created): Centralized route-level SEO metadata dictionary, canonical URL builder, DOM head updater, and Schema.org JSON-LD generators.
- `src/services/api.js` (Modified): Added `getProperties()`, `saveProperty()`, and `deleteProperty()` with automatic fallback to verified offline data.
- `src/components/common/SeoHead.jsx` (Modified): Fixed absolute canonical URL handling; added `noindex` support for admin/404 routes.
- `src/pages/PropertiesPage.jsx` (Created): Public verified plots discovery page with locality and property type filters, WhatsApp CTAs, and Schema.org ItemList.
- `src/pages/PropertyDetailPage.jsx` (Created): Individual property detail page with verified specifications table, DTCP/RERA numbers, groundwater depth, connectivity, and direct WhatsApp enquiry.
- `src/pages/NotFoundPage.jsx` (Created): Clean 404 error page preventing soft-404 antipatterns.
- `src/App.jsx` (Modified): Registered `/properties`, `/properties/:slug`, and routed `*` to `NotFoundPage`.
- `src/components/layout/Navbar.jsx` (Modified): Added "Plots" navigation item.
- `src/components/layout/Footer.jsx` (Modified): Added "Verified Plots for Sale" internal link.

### Build & SEO Automation
- `scripts/prerender.mjs` (Created): SSG pre-renderer generating crawlable HTML for 30 public routes with semantic body and Schema.org markup.
- `scripts/generate_sitemap.mjs` (Created): Standards-compliant XML sitemap generator.
- `public/robots.txt` & `dist/robots.txt` (Modified): Permissive search & AI crawler policy with protected admin exclusions.
- `public/.htaccess` & `dist/.htaccess` (Modified): HTTPS canonicalization, www redirect, Apache Authorization forwarding, and crawler rewrite rules.
- `package.json` (Modified): Added `build:seo`, `prerender`, and `sitemap` scripts.

### Test Suites & Documentation
- `tests/seo_phase2.test.mjs` (Created): 14 automated tests covering metadata uniqueness, canonicals, sitemap compliance, robots directives, HTML quality, and security.
- `tests/php_syntax_check.mjs` (Modified): Added `api/properties.php` and `api/prerender.php` to static syntax tests (24/24 checks passed).
- `docs/phase-2-seo-audit.md` (Created in Phase 0): Initial findings and architectural decisions.
- `docs/phase-2-deployment-guide.md` (Created): Step-by-step Hostinger deployment guide.
- `docs/phase-2-implementation-report.md` (Created): Complete implementation report.

---

## 4. Route and Metadata Coverage

| Route Path | Type | Title Preview | Canonical URL | Schema.org Type |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Core | Nam Nilam \| Trichy Real Estate Intelligence & Verified Plots | `https://namnilam.com/` | RealEstateAgent, WebSite |
| `/properties` | Catalog | Verified Plots & Properties for Sale in Trichy \| Nam Nilam | `https://namnilam.com/properties` | ItemList, WebSite |
| `/properties/jai-nagar-1200-sqft-residential-plot-siruganur-trichy` | Detail | 1200 Sq.Ft Residential Plot in Siruganur, Trichy \| Nam Nilam | `https://namnilam.com/properties/jai-nagar-1200-sqft-residential-plot-siruganur-trichy` | Place, BreadcrumbList |
| `/properties/abirami-nagar-1200-sqft-villa-plot-thirupattur-trichy` | Detail | 1200 Sq.Ft Villa Plot in Thirupattur, Trichy \| Nam Nilam | `https://namnilam.com/properties/abirami-nagar-1200-sqft-villa-plot-thirupattur-trichy` | Place, BreadcrumbList |
| `/properties/koonalai-13000-sqft-managed-farm-plot-nh45-trichy` | Detail | 13000 Sq.Ft Farmland in Koonalai, Trichy \| Nam Nilam | `https://namnilam.com/properties/koonalai-13000-sqft-managed-farm-plot-nh45-trichy` | Place, BreadcrumbList |
| `/properties/sentha-city-1200-sqft-gated-community-plot-aayakudi-trichy` | Detail | 1200 Sq.Ft Residential Plot in Somarasampettai, Trichy \| Nam Nilam | `https://namnilam.com/properties/sentha-city-1200-sqft-gated-community-plot-aayakudi-trichy` | Place, BreadcrumbList |
| `/properties/kasinath-nagar-1500-sqft-approved-residential-plot-thirupattur` | Detail | 1500 Sq.Ft Residential Plot in Thirupattur, Trichy \| Nam Nilam | `https://namnilam.com/properties/kasinath-nagar-1500-sqft-approved-residential-plot-thirupattur` | Place, BreadcrumbList |
| `/projects` | Catalog | Featured Layout Projects in Trichy \| Nam Nilam | `https://namnilam.com/projects` | WebSite |
| `/projects/jai-nagar` | Detail | Jai Nagar \| DTCP Approved Residential Layout in Siruganur, Trichy \| Nam Nilam | `https://namnilam.com/projects/jai-nagar` | Place, BreadcrumbList |
| `/services` | Service | Real Estate Advisory & Due Diligence Services \| Nam Nilam | `https://namnilam.com/services` | Service, WebSite |
| `/services/due-diligence` | Service | Title Deed & Legal Due Diligence Services \| Nam Nilam Trichy | `https://namnilam.com/services/due-diligence` | Service |
| `/services/valuation` | Service | Property Valuation & Guideline Value Analysis \| Nam Nilam | `https://namnilam.com/services/valuation` | Service |
| `/about` | Static | About Nam Nilam \| Real Estate Intelligence in Tamil Nadu | `https://namnilam.com/about` | Organization |
| `/intelligence` | Hub | Trichy Real Estate Market Intelligence & Analytics \| Nam Nilam | `https://namnilam.com/intelligence` | WebSite |
| `/academy` | Education | Nam Nilam Real Estate Academy \| Property Due Diligence Courses | `https://namnilam.com/academy` | WebSite |
| `/admin` | Private | Admin Control Center \| Nam Nilam | `https://namnilam.com/admin` | `noindex, nofollow` |

---

## 5. Technical SEO & Crawlability Verification

### 5.1 XML Sitemap Protocol
- **Location:** `https://namnilam.com/sitemap.xml`
- **Output:** Valid UTF-8 XML document.
- **Inclusions:** 30 canonical URLs including all verified property plots and projects.
- **Attributes:** Accurate `<lastmod>` (`2026-10-13` / `2026-10-14`), `<changefreq>`, and `<priority>`.
- **Exclusions:** Fully excludes `/admin`, `/api/`, non-canonical URLs, and image URLs as pages.

### 5.2 Robots Directives
- **Location:** `https://namnilam.com/robots.txt`
- **Crawler Allowances:** Allows `/` for Googlebot, Bingbot, Applebot, and AI crawlers (`OAI-SearchBot`, `ChatGPT-User`, `Claude-Web`, `PerplexityBot`).
- **Disallowances:** Explicitly disallows `/admin` and `/api/`.
- **Sitemap Declaration:** Absolute URL `https://namnilam.com/sitemap.xml`.

### 5.3 Structured Data (Schema.org)
- Generated schemas strictly reflect visible facts:
  * `RealEstateAgent`: Business name, legal entity, Melachinthamani registered office, phone, opening hours.
  * `WebSite`: Publisher linkage, canonical site URL.
  * `Place` / `SingleFamilyResidence`: Verified plot area (`1200 sq.ft`), DTCP sanction, RERA registration ID, sweet Kaveri groundwater depth (25-30 ft), locality, and asking price.
  * `BreadcrumbList`: Complete hierarchical breadcrumbs on all detail and service pages.
- **Integrity Rule:** Zero fabricated customer reviews, ratings, or artificial scarcity claims.

---

## 6. Security Invariance & Regression Results

1. **Authentication:** Server-side admin authentication (`api/auth.php`) remains the sole gatekeeper. No client-side passcode bypass.
2. **Authorization:** Every state-modifying action in `api/properties.php`, `api/projects.php`, and `api/leads.php` requires a valid JWT token validated by `requireAdminAuth()`.
3. **Prepared Statements:** 100% of SQL queries across `api/properties.php` and `api/prerender.php` use parameterized PDO statements.
4. **Secrets Isolation:** No credentials, API secrets, or passwords appear in `dist/` or pre-rendered HTML files.
5. **Apache Defense:** `.htaccess` blocks direct web downloads of `.env`, `.sql`, `.log`, and shell scripts with HTTP 403.
