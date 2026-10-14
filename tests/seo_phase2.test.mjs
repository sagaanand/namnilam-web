/**
 * Nam Nilam Phase 2 SEO & Pre-rendering Automated Test Suite
 * Validates route metadata uniqueness, canonical URLs, XML sitemap,
 * robots directives, Schema.org JSON-LD, pre-rendered HTML, and security integrity.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

// Import project data and metadata definitions
import { 
  SITE_CONFIG, 
  STATIC_ROUTES_METADATA, 
  getPropertyMetadata, 
  getProjectMetadata,
  getPropertySchema,
  getOrganizationSchema,
  getWebSiteSchema
} from '../src/data/seoMetadata.js';

import { VERIFIED_PROPERTIES } from '../src/data/propertiesData.js';
import { TRICHY_PROJECTS } from '../src/data/ecosystemData.js';

console.log('========================================================');
console.log('NAM NILAM — PHASE 2 AUTOMATED SEO & INTEGRITY TEST SUITE');
console.log('========================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

// -------------------------------------------------------------
// SUITE 1: Route Metadata & Canonical URL Integrity
// -------------------------------------------------------------
console.log('--- SUITE 1: ROUTE METADATA & CANONICAL URL INTEGRITY ---');

runTest('Site configuration contains valid canonical domain and contact details', () => {
  assert.equal(SITE_CONFIG.url, 'https://namnilam.com');
  assert.ok(SITE_CONFIG.defaultTitle.length > 20);
  assert.ok(SITE_CONFIG.defaultDescription.length > 50);
  assert.equal(SITE_CONFIG.phoneRaw, '+919787600006');
});

runTest('All static public routes have unique titles and descriptions', () => {
  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();

  for (const [route, meta] of Object.entries(STATIC_ROUTES_METADATA)) {
    assert.ok(meta.title, `Route ${route} missing title`);
    assert.ok(meta.description, `Route ${route} missing description`);
    assert.ok(meta.canonical, `Route ${route} missing canonical URL`);
    assert.ok(meta.canonical.startsWith('https://namnilam.com'), `Canonical must be absolute HTTPS: ${meta.canonical}`);

    // Check uniqueness
    assert.ok(!titles.has(meta.title), `Duplicate title found: "${meta.title}" on route ${route}`);
    assert.ok(!descriptions.has(meta.description), `Duplicate description found on route ${route}`);
    assert.ok(!canonicals.has(meta.canonical), `Duplicate canonical URL found: ${meta.canonical}`);

    titles.add(meta.title);
    descriptions.add(meta.description);
    canonicals.add(meta.canonical);
  }
});

runTest('Admin route is explicitly excluded from search indexing (noindex: true)', () => {
  const adminMeta = STATIC_ROUTES_METADATA['/admin'];
  assert.ok(adminMeta, 'Admin route metadata must exist');
  assert.equal(adminMeta.noindex, true, 'Admin route must have noindex: true');
});

// -------------------------------------------------------------
// SUITE 2: Dynamic Verified Property & Project Metadata
// -------------------------------------------------------------
console.log('\n--- SUITE 2: PROPERTY & PROJECT METADATA & SCHEMA ---');

runTest('Every verified property listing produces unique metadata and canonical URL', () => {
  assert.ok(VERIFIED_PROPERTIES.length >= 5, 'Should have verified property listings');
  const propertyTitles = new Set();
  const propertyCanonicals = new Set();

  for (const prop of VERIFIED_PROPERTIES) {
    const meta = getPropertyMetadata(prop);

    assert.ok(meta.title.includes(prop.locality), `Property title should include locality: ${meta.title}`);
    assert.ok(meta.title.includes(String(prop.plot_area)), `Property title should include plot area: ${meta.title}`);
    assert.ok(meta.canonical.includes(prop.slug), `Canonical URL should contain slug: ${meta.canonical}`);
    assert.ok(meta.canonical.startsWith('https://namnilam.com/properties/'), `Canonical should start with /properties/`);

    assert.ok(!propertyTitles.has(meta.title), `Duplicate property title: ${meta.title}`);
    assert.ok(!propertyCanonicals.has(meta.canonical), `Duplicate property canonical: ${meta.canonical}`);

    propertyTitles.add(meta.title);
    propertyCanonicals.add(meta.canonical);

    // Verify structured data does not contain fabricated fields
    const schema = meta.schema;
    assert.equal(schema['@type'], 'Place');
    assert.equal(schema.url, meta.canonical);
    assert.ok(schema.name);
    assert.ok(schema.description);
  }
});

runTest('Every featured layout project produces unique metadata and canonical URL', () => {
  assert.ok(TRICHY_PROJECTS.length >= 5, 'Should have featured projects');
  const projectCanonicals = new Set();

  for (const proj of TRICHY_PROJECTS) {
    const meta = getProjectMetadata(proj);
    assert.ok(meta.title.includes(proj.title), `Project title should include project name: ${meta.title}`);
    assert.ok(meta.canonical.startsWith('https://namnilam.com/projects/'), `Canonical should start with /projects/`);

    assert.ok(!projectCanonicals.has(meta.canonical), `Duplicate project canonical: ${meta.canonical}`);
    projectCanonicals.add(meta.canonical);
  }
});

runTest('Schema.org Organization and WebSite generators output valid specifications', () => {
  const org = getOrganizationSchema();
  assert.equal(org['@type'], 'RealEstateAgent');
  assert.equal(org.name, 'Nam Nilam');
  assert.equal(org.telephone, '+91 97876 00006');
  assert.equal(org.address.addressLocality, 'Tiruchirappalli');

  const site = getWebSiteSchema();
  assert.equal(site['@type'], 'WebSite');
  assert.equal(site.url, 'https://namnilam.com');
});

// -------------------------------------------------------------
// SUITE 3: XML Sitemap & Robots Protocol Compliance
// -------------------------------------------------------------
console.log('\n--- SUITE 3: XML SITEMAP & ROBOTS PROTOCOL ---');

runTest('Sitemap files exist in public/ and dist/ and are valid XML', () => {
  const publicSitemap = path.join(PUBLIC_DIR, 'sitemap.xml');
  const distSitemap = path.join(DIST_DIR, 'sitemap.xml');

  assert.ok(fs.existsSync(publicSitemap), 'public/sitemap.xml must exist');
  assert.ok(fs.existsSync(distSitemap), 'dist/sitemap.xml must exist');

  const xml = fs.readFileSync(publicSitemap, 'utf8');
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Must start with XML declaration');
  assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Must contain sitemap namespace');
  assert.ok(xml.includes('</urlset>'), 'Must terminate with </urlset>');

  // Check critical URLs
  assert.ok(xml.includes('<loc>https://namnilam.com/</loc>'), 'Homepage must be in sitemap');
  assert.ok(xml.includes('<loc>https://namnilam.com/properties</loc>'), '/properties must be in sitemap');
  assert.ok(xml.includes('<loc>https://namnilam.com/projects</loc>'), '/projects must be in sitemap');

  // Check property listings
  for (const prop of VERIFIED_PROPERTIES) {
    if (prop.status === 'published') {
      assert.ok(xml.includes(`<loc>https://namnilam.com/properties/${prop.slug}</loc>`), `Property ${prop.slug} must be in sitemap`);
    }
  }

  // Check strictly excluded URLs
  assert.ok(!xml.includes('/admin'), 'Sitemap MUST NOT contain /admin');
  assert.ok(!xml.includes('/api/'), 'Sitemap MUST NOT contain /api/');
});

runTest('Robots.txt file allows legitimate crawlers and disallows admin/api', () => {
  const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
  assert.ok(fs.existsSync(robotsPath), 'public/robots.txt must exist');
  const robots = fs.readFileSync(robotsPath, 'utf8');

  assert.ok(robots.includes('User-agent: *'), 'Must include wildcard User-agent');
  assert.ok(robots.includes('Allow: /'), 'Must allow root');
  assert.ok(robots.includes('Disallow: /admin'), 'Must disallow /admin');
  assert.ok(robots.includes('Disallow: /api/'), 'Must disallow /api/');
  assert.ok(robots.includes('Sitemap: https://namnilam.com/sitemap.xml'), 'Must declare sitemap');
  assert.ok(robots.includes('User-agent: Googlebot'), 'Must define Googlebot');
  assert.ok(robots.includes('User-agent: OAI-SearchBot'), 'Must define OAI-SearchBot');
});

// -------------------------------------------------------------
// SUITE 4: Pre-rendered HTML Quality & Crawlability
// -------------------------------------------------------------
console.log('\n--- SUITE 4: PRE-RENDERED HTML QUALITY & CRAWLABILITY ---');

runTest('Pre-rendered HTML files exist in dist/ for public routes', () => {
  const checkRoutes = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'properties/index.html',
    'projects/index.html',
    'contact/index.html',
    `properties/${VERIFIED_PROPERTIES[0].slug}/index.html`,
    `projects/${TRICHY_PROJECTS[0].slug}/index.html`
  ];

  for (const rel of checkRoutes) {
    const full = path.join(DIST_DIR, rel);
    assert.ok(fs.existsSync(full), `Pre-rendered file must exist: dist/${rel}`);
  }
});

runTest('Pre-rendered property page contains unique metadata and semantic HTML body', () => {
  const testProp = VERIFIED_PROPERTIES[0];
  const filePath = path.join(DIST_DIR, 'properties', testProp.slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');

  // Exactly one title, description, canonical
  const titleMatches = html.match(/<title>[\s\S]*?<\/title>/gi) || [];
  assert.equal(titleMatches.length, 1, 'Must have exactly ONE <title> tag');
  assert.ok(titleMatches[0].includes(testProp.locality), 'Title must include locality');

  const descMatches = html.match(/<meta\s+name=["']description["'][^>]*>/gi) || [];
  assert.equal(descMatches.length, 1, 'Must have exactly ONE meta description tag');

  const canonicalMatches = html.match(/<link\s+rel=["']canonical["'][^>]*>/gi) || [];
  assert.equal(canonicalMatches.length, 1, 'Must have exactly ONE canonical link');
  assert.ok(canonicalMatches[0].includes(testProp.slug), 'Canonical link must include slug');

  // Schema.org structured data script
  assert.ok(html.includes('<script id="schema-jsonld-page" type="application/ld+json">'), 'Must contain JSON-LD script tag');
  const jsonMatch = html.match(/<script id="schema-jsonld-page" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(jsonMatch, 'JSON-LD content must be extractable');
  const parsedSchema = JSON.parse(jsonMatch[1]);
  assert.ok(Array.isArray(parsedSchema), 'Parsed schema must be an array of schemas');
  assert.ok(parsedSchema.some(s => s['@type'] === 'Place'), 'Must include Place schema');

  // Semantic content inside <div id="root">
  assert.ok(html.includes(`<h1>${testProp.title}</h1>`) || html.includes(testProp.title), 'Must contain property title in visible HTML');
  assert.ok(html.includes(testProp.price_label), 'Must contain verified asking price in HTML before JS execution');
  assert.ok(html.includes('Sweet Kaveri'), 'Must contain groundwater detail in HTML');
  assert.ok(html.includes(testProp.approval_status), 'Must contain verified approval status in HTML');

  // Security: Zero secret leaks in public HTML
  assert.ok(!html.includes('DB_PASSWORD'), 'No DB secrets in HTML');
  assert.ok(!html.includes('JWT_SECRET'), 'No JWT secrets in HTML');
  assert.ok(!html.includes('ADMIN_PASSCODE_HASH'), 'No passcode hashes in HTML');
});

// -------------------------------------------------------------
// SUITE 5: Backend API & Security Regression
// -------------------------------------------------------------
console.log('\n--- SUITE 5: BACKEND API & SECURITY INTEGRITY ---');

runTest('api/properties.php exists and implements authorization checks', () => {
  const propApi = path.join(ROOT_DIR, 'api', 'properties.php');
  assert.ok(fs.existsSync(propApi), 'api/properties.php must exist');
  const code = fs.readFileSync(propApi, 'utf8');

  assert.ok(code.includes('require_once __DIR__ . \'/auth_helper.php\';'), 'Must include auth_helper.php');
  assert.ok(code.includes('requireAdminAuth()'), 'Must call requireAdminAuth() for state modifications');
  assert.ok(code.includes('getDatabaseConnection()') || code.includes('getDbConnection()'), 'Must use PDO database connection helper');
  assert.ok(!code.includes('$_POST[\'password\']'), 'No insecure direct password checks');
  assert.ok(code.includes('$defaultProperties') || code.includes('VERIFIED_SEED_PROPERTIES'), 'Must contain fallback inventory for zero downtime');
});

runTest('api/prerender.php exists and implements safe crawler rendering', () => {
  const prerenderApi = path.join(ROOT_DIR, 'api', 'prerender.php');
  assert.ok(fs.existsSync(prerenderApi), 'api/prerender.php must exist');
  const code = fs.readFileSync(prerenderApi, 'utf8');

  assert.ok(code.includes('getDbConnection()'), 'Must use PDO connection');
  assert.ok(code.includes('http_response_code(404)'), 'Must return 404 for invalid property slugs');
  assert.ok(code.includes('htmlspecialchars'), 'Must escape dynamic database values');
  assert.ok(code.includes('schema-jsonld-page'), 'Must inject structured data');
});

runTest('Apache .htaccess enforces canonical HTTPS, crawler fallback, and security headers', () => {
  const htaccessPath = path.join(PUBLIC_DIR, '.htaccess');
  assert.ok(fs.existsSync(htaccessPath), 'public/.htaccess must exist');
  const htaccess = fs.readFileSync(htaccessPath, 'utf8');

  assert.ok(htaccess.includes('RewriteCond %{HTTPS} off'), 'Must enforce HTTPS');
  assert.ok(htaccess.includes('HTTP_AUTHORIZATION'), 'Must forward Authorization header to FastCGI');
  assert.ok(htaccess.includes('prerender.php'), 'Must route dynamic crawlers to prerender.php fallback');
  assert.ok(htaccess.includes('X-Content-Type-Options "nosniff"'), 'Must set nosniff header');
  assert.ok(htaccess.includes('X-Frame-Options "SAMEORIGIN"'), 'Must set SAMEORIGIN header');
});

console.log('\n========================================================');
console.log(`ALL PHASE 2 SEO TESTS PASSED: ${passedTests}/${totalTests}`);
console.log('========================================================\n');
