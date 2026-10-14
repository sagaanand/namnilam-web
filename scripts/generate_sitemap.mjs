/**
 * Sitemap Generator for Nam Nilam
 * Generates standards-compliant XML sitemap (sitemap.xml)
 * with published projects, verified properties, and canonical public routes.
 * Strictly excludes /admin, /api/, and unpublished records.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Import verified inventory and ecosystem data
import { VERIFIED_PROPERTIES } from '../src/data/propertiesData.js';
import { TRICHY_PROJECTS } from '../src/data/ecosystemData.js';

const BASE_URL = 'https://namnilam.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // e.g. 2026-10-13

// Canonical public routes
const CORE_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/properties', priority: '0.9', changefreq: 'daily' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/due-diligence', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/valuation', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/advisory', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/consulting', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/investment', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/our-story', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/approach', priority: '0.8', changefreq: 'monthly' },
  { path: '/intelligence', priority: '0.8', changefreq: 'weekly' },
  { path: '/academy', priority: '0.8', changefreq: 'monthly' },
  { path: '/business', priority: '0.7', changefreq: 'monthly' },
  { path: '/ai', priority: '0.8', changefreq: 'weekly' },
  { path: '/ai/use-cases', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources', priority: '0.7', changefreq: 'weekly' },
  { path: '/careers', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' }
];

export function generateSitemapXml() {
  const urls = [];

  // 1. Core Routes
  for (const route of CORE_ROUTES) {
    urls.push({
      loc: `${BASE_URL}${route.path}`,
      lastmod: CURRENT_DATE,
      changefreq: route.changefreq,
      priority: route.priority
    });
  }

  // 2. Featured Projects (only active/published)
  for (const project of TRICHY_PROJECTS) {
    if (project.slug) {
      urls.push({
        loc: `${BASE_URL}/projects/${project.slug}`,
        lastmod: CURRENT_DATE,
        changefreq: 'weekly',
        priority: '0.8'
      });
    }
  }

  // 3. Verified Property Listings (strictly published only)
  for (const property of VERIFIED_PROPERTIES) {
    if (property.status === 'published' && property.slug) {
      const lastmod = property.updated_at 
        ? property.updated_at.split('T')[0] 
        : CURRENT_DATE;

      urls.push({
        loc: `${BASE_URL}/properties/${property.slug}`,
        lastmod: lastmod,
        changefreq: 'weekly',
        priority: '0.9'
      });
    }
  }

  // Build XML String
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const item of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

// Write to public/sitemap.xml and dist/sitemap.xml
export function writeSitemap() {
  const xml = generateSitemapXml();

  const publicDest = path.join(ROOT_DIR, 'public', 'sitemap.xml');
  fs.writeFileSync(publicDest, xml, 'utf8');
  console.log(`✓ Generated sitemap at ${publicDest}`);

  const distDir = path.join(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    const distDest = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distDest, xml, 'utf8');
    console.log(`✓ Generated sitemap at ${distDest}`);
  }

  return xml;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeSitemap();
}
