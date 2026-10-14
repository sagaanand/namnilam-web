/**
 * Nam Nilam SSG Pre-renderer
 * Generates static, crawlable HTML files for all indexable public pages
 * with unique title, meta description, canonical, Open Graph, Twitter cards,
 * Schema.org JSON-LD, and pre-rendered semantic HTML inside <div id="root">.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

import { 
  SITE_CONFIG, 
  STATIC_ROUTES_METADATA, 
  getPropertyMetadata, 
  getProjectMetadata,
  getOrganizationSchema,
  getWebSiteSchema,
  getBreadcrumbSchema
} from '../src/data/seoMetadata.js';

import { VERIFIED_PROPERTIES } from '../src/data/propertiesData.js';
import { TRICHY_PROJECTS, BRAND_INFO } from '../src/data/ecosystemData.js';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generate semantic HTML body for crawlers and initial paint
 */
function renderSemanticContent(route, meta, data = null) {
  const brand = BRAND_INFO;

  // Header Nav
  let body = `
  <header style="background:#0f172a;border-bottom:1px solid #1e293b;padding:16px 24px;color:#fff;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:12px;">
      <a href="/" style="color:#fff;text-decoration:none;font-weight:bold;font-size:1.25rem;">Nam Nilam</a>
      <span style="color:#10b981;font-size:0.75rem;border:1px solid #059669;padding:2px 8px;border-radius:9999px;">Trichy Property Intelligence</span>
    </div>
    <nav style="display:flex;gap:16px;font-size:0.875rem;">
      <a href="/" style="color:#94a3b8;text-decoration:none;">Home</a>
      <a href="/properties" style="color:#10b981;text-decoration:none;font-weight:600;">Verified Plots</a>
      <a href="/projects" style="color:#94a3b8;text-decoration:none;">Layout Projects</a>
      <a href="/services" style="color:#94a3b8;text-decoration:none;">Services</a>
      <a href="/about" style="color:#94a3b8;text-decoration:none;">About</a>
      <a href="/contact" style="color:#94a3b8;text-decoration:none;">Contact</a>
    </nav>
  </header>
  `;

  // Main Container
  body += `<main style="max-width:1200px;margin:0 auto;padding:40px 20px;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;">`;

  // Breadcrumbs
  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    body += `<nav aria-label="Breadcrumb" style="margin-bottom:24px;font-size:0.85rem;color:#94a3b8;">`;
    body += `<ol style="display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0;">`;
    meta.breadcrumbs.forEach((b, idx) => {
      const isLast = idx === meta.breadcrumbs.length - 1;
      body += `<li>`;
      if (!isLast) {
        body += `<a href="${escapeHtml(b.url)}" style="color:#94a3b8;text-decoration:none;">${escapeHtml(b.name)}</a> <span style="margin-left:4px;">›</span>`;
      } else {
        body += `<span style="color:#10b981;font-weight:600;">${escapeHtml(b.name)}</span>`;
      }
      body += `</li>`;
    });
    body += `</ol></nav>`;
  }

  // Route-specific Content
  if (route.startsWith('/properties/') && data) {
    const prop = data;
    body += `
      <article>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
          <span style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:4px 10px;border-radius:6px;font-size:0.75rem;font-weight:600;">${escapeHtml(prop.approval_status)}</span>
          <span style="background:#1e293b;color:#e2e8f0;padding:4px 10px;border-radius:6px;font-size:0.75rem;">${escapeHtml(prop.property_type)}</span>
          ${prop.rera_id ? `<span style="background:rgba(168,85,247,0.15);color:#c084fc;padding:4px 10px;border-radius:6px;font-size:0.75rem;">RERA: ${escapeHtml(prop.rera_id)}</span>` : ''}
        </div>
        <h1 style="font-size:2.25rem;font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 16px 0;">${escapeHtml(prop.title)}</h1>
        <p style="color:#94a3b8;font-size:1rem;margin-bottom:24px;">📍 <strong>${escapeHtml(prop.locality)}</strong>, Tiruchirappalli, Tamil Nadu • Landmark: ${escapeHtml(prop.landmark || 'Trichy Growth Corridor')}</p>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;background:#1e293b;padding:24px;border-radius:12px;margin-bottom:32px;border:1px solid #334155;">
          <div><div style="color:#94a3b8;font-size:0.8rem;">Asking Price</div><div style="font-size:1.5rem;font-weight:800;color:#10b981;">${escapeHtml(prop.price_label)}</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Plot Extent</div><div style="font-size:1.25rem;font-weight:700;color:#fff;">${escapeHtml(prop.plot_area)} ${escapeHtml(prop.plot_area_unit)}</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Rate per Sq.Ft</div><div style="font-size:1.25rem;font-weight:700;color:#38bdf8;">₹${escapeHtml(prop.price_per_sqft)}</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Guideline Value</div><div style="font-size:1.1rem;font-weight:600;color:#fff;">${escapeHtml(prop.guideline_value)}</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Groundwater Level</div><div style="font-size:1.1rem;font-weight:600;color:#60a5fa;">25-30 ft (Sweet Kaveri)</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Facing Available</div><div style="font-size:1.1rem;font-weight:600;color:#fff;">${escapeHtml(prop.facing || 'East/North')}</div></div>
        </div>

        <section style="margin-bottom:32px;">
          <h2 style="font-size:1.4rem;font-weight:700;color:#fff;margin-bottom:12px;">Property Description & Verification Summary</h2>
          <p style="color:#cbd5e1;line-height:1.7;font-size:1rem;">${escapeHtml(prop.description)}</p>
        </section>

        ${prop.features ? `
        <section style="margin-bottom:32px;">
          <h2 style="font-size:1.4rem;font-weight:700;color:#fff;margin-bottom:12px;">Verified Amenities & Legal Safeguards</h2>
          <ul style="color:#cbd5e1;line-height:1.8;padding-left:20px;">
            ${prop.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
          </ul>
        </section>` : ''}

        <div style="background:linear-gradient(135deg,#0f172a,#064e3b);border:1px solid #059669;padding:24px;border-radius:12px;margin-top:32px;">
          <h3 style="font-size:1.2rem;color:#fff;margin:0 0 8px 0;">Schedule a Verified Site Visit</h3>
          <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:16px;">Speak directly with our Trichy field advisory team. 100% legal title verification, zero brokerage.</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(`Hi Nam Nilam, I want to inspect verified plot: ${prop.title}`)}" style="background:#10b981;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;">Chat on WhatsApp (+91 97876 00006)</a>
            <a href="tel:${brand.phone.replace(/\s+/g,'')}" style="background:#1e293b;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;border:1px solid #334155;">Call Advisory Office: ${brand.phone}</a>
          </div>
        </div>
      </article>
    `;
  } else if (route === '/properties') {
    body += `
      <section>
        <span style="color:#10b981;font-weight:600;font-size:0.85rem;text-transform:uppercase;">100% Verified Inventory</span>
        <h1 style="font-size:2.25rem;font-weight:800;color:#ffffff;margin:8px 0 16px 0;">Verified Plots & Properties for Sale in Trichy</h1>
        <p style="color:#94a3b8;max-width:800px;font-size:1.05rem;line-height:1.6;margin-bottom:32px;">
          Browse DTCP and RERA approved residential layouts and individual plots across Siruganur, Thirupattur, Somarasampettai, Pirattiyur, and Trichy growth corridors. Each listing is verified with guideline values, legal document audits, and sweet Kaveri groundwater depth surveys.
        </p>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;">
          ${VERIFIED_PROPERTIES.map(p => `
            <article style="background:#1e293b;border:1px solid #334155;border-radius:12px;overflow:hidden;padding:20px;">
              <span style="color:#10b981;font-size:0.75rem;font-weight:600;">${escapeHtml(p.approval_status)}</span>
              <h2 style="font-size:1.15rem;font-weight:700;margin:6px 0 10px 0;"><a href="/properties/${escapeHtml(p.slug)}" style="color:#fff;text-decoration:none;">${escapeHtml(p.title)}</a></h2>
              <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:14px;">📍 ${escapeHtml(p.locality)}, Trichy • ${escapeHtml(p.landmark || '')}</p>
              <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #334155;padding-top:12px;margin-top:12px;">
                <div>
                  <div style="font-size:1.25rem;font-weight:800;color:#10b981;">${escapeHtml(p.price_label)}</div>
                  <div style="font-size:0.75rem;color:#94a3b8;">₹${escapeHtml(p.price_per_sqft)}/sq.ft</div>
                </div>
                <a href="/properties/${escapeHtml(p.slug)}" style="background:#fff;color:#0f172a;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:600;font-size:0.85rem;">View Plot Details →</a>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  } else if (route.startsWith('/projects/') && data) {
    const proj = data;
    body += `
      <article>
        <span style="color:#10b981;font-size:0.8rem;font-weight:600;">${escapeHtml(proj.type)}</span>
        <h1 style="font-size:2.25rem;font-weight:800;color:#ffffff;margin:8px 0 16px 0;">${escapeHtml(proj.title)}</h1>
        <p style="color:#94a3b8;font-size:1rem;margin-bottom:24px;">📍 ${escapeHtml(proj.location)} • ${escapeHtml(proj.corridor || 'Trichy Growth Corridor')}</p>
        
        <div style="background:#1e293b;padding:20px;border-radius:12px;border:1px solid #334155;margin-bottom:24px;">
          <p style="color:#cbd5e1;line-height:1.7;font-size:1rem;">${escapeHtml(proj.overview)}</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;background:#0f172a;padding:20px;border-radius:12px;border:1px solid #1e293b;margin-bottom:24px;">
          <div><div style="color:#94a3b8;font-size:0.8rem;">Price Range</div><div style="font-weight:700;color:#10b981;font-size:1.1rem;">${escapeHtml(proj.priceRange)}</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Rate / Sq.Ft</div><div style="font-weight:700;color:#fff;font-size:1.1rem;">${escapeHtml(proj.rateSqft)}</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Total / Available</div><div style="font-weight:700;color:#38bdf8;font-size:1.1rem;">${escapeHtml(proj.availablePlots)} of ${escapeHtml(proj.totalPlots)} plots</div></div>
          <div><div style="color:#94a3b8;font-size:0.8rem;">Approval</div><div style="font-weight:700;color:#fff;font-size:1.1rem;">${escapeHtml(proj.approvalNo)}</div></div>
        </div>
      </article>
    `;
  } else if (route === '/projects') {
    body += `
      <section>
        <h1 style="font-size:2.25rem;font-weight:800;color:#ffffff;margin-bottom:16px;">Featured Residential Layout Projects in Trichy</h1>
        <p style="color:#94a3b8;max-width:800px;font-size:1rem;line-height:1.6;margin-bottom:32px;">
          Master-planned residential layouts in Siruganur, Thirupattur, Somarasampettai, Pirattiyur, and Manikandam growth corridors. DTCP approved with 40ft blacktop roads, sweet groundwater, and immediate registration.
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;">
          ${TRICHY_PROJECTS.map(p => `
            <article style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;">
              <h2 style="font-size:1.25rem;font-weight:700;margin:0 0 8px 0;"><a href="/projects/${escapeHtml(p.slug)}" style="color:#fff;text-decoration:none;">${escapeHtml(p.title)}</a></h2>
              <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:12px;">📍 ${escapeHtml(p.location)}</p>
              <div style="color:#10b981;font-weight:700;font-size:1.1rem;margin-bottom:12px;">${escapeHtml(p.priceRange)} (${escapeHtml(p.rateSqft)}/sq.ft)</div>
              <a href="/projects/${escapeHtml(p.slug)}" style="display:inline-block;background:#fff;color:#0f172a;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:600;font-size:0.85rem;">View Layout Master Plan →</a>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  } else {
    // Standard Pages (Home, About, Services, etc.)
    body += `
      <section>
        <h1 style="font-size:2.25rem;font-weight:800;color:#ffffff;margin-bottom:16px;">${escapeHtml(meta.title.split('|')[0].trim())}</h1>
        <p style="color:#cbd5e1;max-width:800px;font-size:1.1rem;line-height:1.7;margin-bottom:24px;">
          ${escapeHtml(meta.description)}
        </p>
        <div style="background:#1e293b;border:1px solid #334155;padding:24px;border-radius:12px;margin-top:24px;">
          <h2 style="font-size:1.25rem;color:#10b981;margin-bottom:12px;">Nam Nilam Real Estate Intelligence</h2>
          <p style="color:#94a3b8;font-size:0.95rem;line-height:1.6;">
            Providing institutional property advisory, legal due diligence, guideline value audits, and verified plot discovery across Tiruchirappalli and Tamil Nadu.
          </p>
          <div style="margin-top:16px;">
            <a href="/properties" style="display:inline-block;background:#10b981;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;margin-right:12px;">Browse Verified Plots</a>
            <a href="/contact" style="display:inline-block;background:#334155;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;">Contact Trichy Office</a>
          </div>
        </div>
      </section>
    `;
  }

  // Footer
  body += `
    <footer style="margin-top:60px;padding-top:32px;border-top:1px solid #1e293b;font-size:0.85rem;color:#64748b;">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px;">
        <div>
          <div style="font-weight:bold;color:#cbd5e1;font-size:1rem;margin-bottom:4px;">${escapeHtml(brand.name)}</div>
          <div>${escapeHtml(brand.legalEntity)}</div>
          <div>${escapeHtml(brand.address)}</div>
        </div>
        <div>
          <div><strong>Phone:</strong> ${escapeHtml(brand.phone)}</div>
          <div><strong>Email:</strong> ${escapeHtml(brand.email)}</div>
          <div><strong>Hours:</strong> ${escapeHtml(brand.hours)}</div>
        </div>
      </div>
      <div style="margin-top:20px;text-align:center;color:#475569;">
        © ${new Date().getFullYear()} Nam Nilam Infra Private Limited. All rights reserved.
      </div>
    </footer>
  </main>
  `;

  return body;
}

/**
 * Generate complete HTML for a route by injecting tags into index.html template
 */
function buildHtmlForRoute(templateHtml, route, meta, data = null) {
  let html = templateHtml;

  // Strip pre-existing generic head tags to prevent duplicate meta tags
  html = html.replace(/<title>[\s\S]*?<\/title>/gi, '');
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/gi, '');
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
  html = html.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '');
  html = html.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');
  html = html.replace(/<meta\s+name=["']robots["'][^>]*>/gi, '');
  html = html.replace(/<script\s+id=["']schema-jsonld-page["'][\s\S]*?<\/script>/gi, '');

  // 1. Title Tag
  const titleTag = `<title>${escapeHtml(meta.title)}</title>`;

  // 2. Prepare head injection elements
  const headElements = [];
  headElements.push(titleTag);

  // Meta description
  headElements.push(`<meta name="description" content="${escapeHtml(meta.description)}">`);

  // Canonical
  headElements.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}">`);

  // Robots
  if (meta.noindex) {
    headElements.push(`<meta name="robots" content="noindex, nofollow">`);
  } else {
    headElements.push(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`);
  }

  // Open Graph
  const ogTitle = meta.title;
  const ogDesc = meta.description;
  const ogUrl = meta.canonical;
  const ogImage = meta.image || SITE_CONFIG.defaultImage;
  const ogType = meta.type || 'website';

  headElements.push(`<meta property="og:title" content="${escapeHtml(ogTitle)}">`);
  headElements.push(`<meta property="og:description" content="${escapeHtml(ogDesc)}">`);
  headElements.push(`<meta property="og:url" content="${escapeHtml(ogUrl)}">`);
  headElements.push(`<meta property="og:image" content="${escapeHtml(ogImage)}">`);
  headElements.push(`<meta property="og:type" content="${escapeHtml(ogType)}">`);
  headElements.push(`<meta property="og:site_name" content="${escapeHtml(SITE_CONFIG.name)}">`);
  headElements.push(`<meta property="og:locale" content="en_IN">`);

  // Twitter Card
  headElements.push(`<meta name="twitter:card" content="summary_large_image">`);
  headElements.push(`<meta name="twitter:title" content="${escapeHtml(ogTitle)}">`);
  headElements.push(`<meta name="twitter:description" content="${escapeHtml(ogDesc)}">`);
  headElements.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}">`);

  // Schema.org Structured Data
  const schemas = [getOrganizationSchema(), getWebSiteSchema()];
  if (meta.schema) {
    schemas.push(meta.schema);
  }
  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    schemas.push(getBreadcrumbSchema(meta.breadcrumbs));
  }

  const jsonLdScript = `<script id="schema-jsonld-page" type="application/ld+json">${JSON.stringify(schemas)}</script>`;
  headElements.push(jsonLdScript);

  // Inject before </head>
  const injectedHead = headElements.join('\n    ');
  html = html.replace('</head>', `    ${injectedHead}\n  </head>`);

  // 3. Inject semantic content inside <div id="root">
  const semanticContent = renderSemanticContent(route, meta, data);
  html = html.replace('<div id="root"></div>', `<div id="root">${semanticContent}</div>`);

  return html;
}

/**
 * Main SSG build process
 */
export function prerenderAllRoutes() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`dist/index.html not found. Run "vite build" first!`);
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf8');
  let renderedCount = 0;

  // 1. Pre-render Static Core Routes
  for (const [routePath, meta] of Object.entries(STATIC_ROUTES_METADATA)) {
    if (meta.noindex) continue; // Exclude /admin from public pre-rendering

    const html = buildHtmlForRoute(baseTemplate, routePath, meta);

    if (routePath === '/') {
      fs.writeFileSync(indexHtmlPath, html, 'utf8');
      renderedCount++;
      console.log(`  ✓ Pre-rendered / (dist/index.html)`);
    } else {
      const outDir = path.join(DIST_DIR, routePath.replace(/^\//, ''));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
      renderedCount++;
      console.log(`  ✓ Pre-rendered ${routePath} -> dist/${routePath.replace(/^\//, '')}/index.html`);
    }
  }

  // 2. Pre-render Featured Projects
  for (const proj of TRICHY_PROJECTS) {
    const meta = getProjectMetadata(proj);
    const routePath = `/projects/${proj.slug}`;
    const html = buildHtmlForRoute(baseTemplate, routePath, meta, proj);

    const outDir = path.join(DIST_DIR, 'projects', proj.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    renderedCount++;
    console.log(`  ✓ Pre-rendered project ${proj.slug} -> dist/projects/${proj.slug}/index.html`);
  }

  // 3. Pre-render Verified Property Listings
  for (const prop of VERIFIED_PROPERTIES) {
    if (prop.status !== 'published') continue;

    const meta = getPropertyMetadata(prop);
    const routePath = `/properties/${prop.slug}`;
    const html = buildHtmlForRoute(baseTemplate, routePath, meta, prop);

    const outDir = path.join(DIST_DIR, 'properties', prop.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    renderedCount++;
    console.log(`  ✓ Pre-rendered property ${prop.slug} -> dist/properties/${prop.slug}/index.html`);
  }

  console.log(`\n========================================`);
  console.log(`PRE-RENDERING COMPLETE: ${renderedCount} routes pre-rendered`);
  console.log(`========================================\n`);
  return renderedCount;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerenderAllRoutes();
}
