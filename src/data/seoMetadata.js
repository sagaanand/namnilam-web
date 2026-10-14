/**
 * Nam Nilam SEO & Structured Data Centralized Dictionary
 * Provides route-level metadata, canonical URLs, Open Graph, Twitter Cards,
 * and Schema.org JSON-LD structured data generators.
 */

export const SITE_CONFIG = {
  name: "Nam Nilam",
  legalName: "Nam Nilam Infra Private Limited",
  url: "https://namnilam.com",
  defaultTitle: "Nam Nilam | Trichy Real Estate Intelligence & Verified Plots",
  defaultDescription: "Discover DTCP & RERA verified residential plots, layout projects, guideline values, and real estate advisory across Trichy, Tamil Nadu. Search properties with verified ground truth.",
  defaultImage: "https://namnilam.com/nam-nilam-logo.png",
  phone: "+91 97876 00006",
  phoneRaw: "+919787600006",
  whatsappNumber: "919787600006",
  email: "info@namnilam.com",
  hours: "Mo-Sa 09:30-19:00",
  address: {
    streetAddress: "No. 24/4, Old Karur Road, Melachinthamani",
    addressLocality: "Tiruchirappalli",
    postalCode: "620002",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN"
  },
  geo: {
    latitude: 10.8271,
    longitude: 78.6970
  }
};

export const STATIC_ROUTES_METADATA = {
  "/": {
    title: "Nam Nilam | Trichy Real Estate Intelligence & Verified Plots",
    description: "Explore DTCP & RERA verified residential plots, layout projects, guideline values, and property advisory across Trichy, Tamil Nadu with Nam Nilam.",
    canonical: "https://namnilam.com/",
    type: "website"
  },
  "/about": {
    title: "About Nam Nilam | Real Estate Intelligence in Tamil Nadu",
    description: "Learn about Nam Nilam, Trichy's premier real estate intelligence and advisory firm delivering transparent property advisory and verified plot discovery.",
    canonical: "https://namnilam.com/about",
    type: "article"
  },
  "/about/our-story": {
    title: "Our Story | Nam Nilam Real Estate Ecosystem",
    description: "Discover the founding mission and vision of Nam Nilam: bringing institutional rigor, legal due diligence, and verified land discovery to Tamil Nadu.",
    canonical: "https://namnilam.com/about/our-story",
    type: "article"
  },
  "/about/approach": {
    title: "Our Approach | Transparent Real Estate Due Diligence",
    description: "Our proprietary 6-stage land verification framework: parent title deed audit, guideline valuation, revenue sketch vetting, and groundwater checks.",
    canonical: "https://namnilam.com/about/approach",
    type: "article"
  },
  "/services": {
    title: "Real Estate Advisory & Due Diligence Services | Nam Nilam",
    description: "Comprehensive property advisory services in Trichy: title deed due diligence, guideline valuation, DTCP approval verification, and portfolio consulting.",
    canonical: "https://namnilam.com/services",
    type: "website"
  },
  "/services/due-diligence": {
    title: "Title Deed & Legal Due Diligence Services | Nam Nilam Trichy",
    description: "30-year encumbrance verification, patta sub-division validation, and legal document scrutiny for land purchases in Trichy.",
    canonical: "https://namnilam.com/services/due-diligence",
    type: "service"
  },
  "/services/valuation": {
    title: "Property Valuation & Guideline Value Analysis | Nam Nilam",
    description: "Scientific fair-market and government guideline valuation for plots, land parcels, and residential layouts in Tiruchirappalli.",
    canonical: "https://namnilam.com/services/valuation",
    type: "service"
  },
  "/services/advisory": {
    title: "Strategic Real Estate Advisory & Consultation | Nam Nilam",
    description: "Expert unbiased buyer advisory, NRI land portfolio management, and layout acquisition consultation across Tamil Nadu.",
    canonical: "https://namnilam.com/services/advisory",
    type: "service"
  },
  "/services/consulting": {
    title: "Developer & Layout Advisory Services | Nam Nilam Trichy",
    description: "DTCP layout planning, pricing strategy, RERA compliance, and transaction advisory for developers and land owners.",
    canonical: "https://namnilam.com/services/consulting",
    type: "service"
  },
  "/services/investment": {
    title: "Land Investment & Growth Corridor Advisory | Nam Nilam",
    description: "Identify high-appreciation highway corridors, industrial nodes, and infrastructure growth corridors in Trichy for land investment.",
    canonical: "https://namnilam.com/services/investment",
    type: "service"
  },
  "/properties": {
    title: "Verified Plots & Properties for Sale in Trichy | Nam Nilam",
    description: "Browse 100% verified residential plots, villa plots, and farmland for sale in Trichy. DTCP & RERA approved with guideline values and clear titles.",
    canonical: "https://namnilam.com/properties",
    type: "website"
  },
  "/projects": {
    title: "Featured Layout Projects in Trichy | Nam Nilam",
    description: "Discover curated DTCP approved residential layouts in Siruganur, Thirupattur, Somarasampettai, and Trichy growth corridors.",
    canonical: "https://namnilam.com/projects",
    type: "website"
  },
  "/intelligence": {
    title: "Trichy Real Estate Market Intelligence & Analytics | Nam Nilam",
    description: "Locality pricing trends, infrastructure project timelines, Kaveri groundwater surveys, and government guideline intelligence across Trichy.",
    canonical: "https://namnilam.com/intelligence",
    type: "website"
  },
  "/academy": {
    title: "Nam Nilam Real Estate Academy | Property Due Diligence Courses",
    description: "Master Tamil Nadu land laws, document vetting, patta transfers, and real estate investment strategies with Nam Nilam Academy.",
    canonical: "https://namnilam.com/academy",
    type: "website"
  },
  "/business": {
    title: "Enterprise Real Estate Solutions & Developer Services | Nam Nilam",
    description: "B2B land intelligence, developer digital marketing, site feasibility studies, and institutional portfolio management.",
    canonical: "https://namnilam.com/business",
    type: "website"
  },
  "/ai": {
    title: "AI Workforce for Real Estate Operations | Nam Nilam",
    description: "AI-assisted property intelligence, automated document OCR scanning, guideline calculation, and 24/7 lead qualification.",
    canonical: "https://namnilam.com/ai",
    type: "website"
  },
  "/ai/use-cases": {
    title: "AI Use Cases in Real Estate Intelligence | Nam Nilam",
    description: "Explore practical artificial intelligence workflows in title verification, valuation models, and automated customer advisory.",
    canonical: "https://namnilam.com/ai/use-cases",
    type: "website"
  },
  "/resources": {
    title: "Real Estate Buyer Guides, Checklists & Articles | Nam Nilam",
    description: "Download property verification checklists, read buyer guides on guideline values, DTCP vs CMDA norms, and land documentation.",
    canonical: "https://namnilam.com/resources",
    type: "website"
  },
  "/careers": {
    title: "Careers at Nam Nilam | Join the Real Estate Intelligence Team",
    description: "Explore career opportunities in real estate advisory, land valuation, legal research, and technology at Nam Nilam Trichy.",
    canonical: "https://namnilam.com/careers",
    type: "website"
  },
  "/contact": {
    title: "Contact Nam Nilam | Real Estate Advisory Office in Trichy",
    description: "Get in touch with our advisory team at Melachinthamani, Trichy. Call +91 97876 00006 or message us on WhatsApp for verified property enquiries.",
    canonical: "https://namnilam.com/contact",
    type: "website"
  },
  "/admin": {
    title: "Admin Control Center | Nam Nilam",
    description: "Administrative control portal for verified projects, properties, and customer enquiries.",
    canonical: "https://namnilam.com/admin",
    noindex: true
  }
};

/**
 * Build Schema.org Organization / RealEstateAgent payload
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_CONFIG.url}/#organization`,
    "name": SITE_CONFIG.name,
    "legalName": SITE_CONFIG.legalName,
    "url": SITE_CONFIG.url,
    "logo": SITE_CONFIG.logo,
    "image": SITE_CONFIG.logo,
    "description": SITE_CONFIG.defaultDescription,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.streetAddress,
      "addressLocality": SITE_CONFIG.address.addressLocality,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressRegion": SITE_CONFIG.address.addressRegion,
      "addressCountry": SITE_CONFIG.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE_CONFIG.geo.latitude,
      "longitude": SITE_CONFIG.geo.longitude
    },
    "openingHours": SITE_CONFIG.hours,
    "priceRange": "₹₹",
    "areaServed": [
      {
        "@type": "City",
        "name": "Tiruchirappalli",
        "sameAs": "https://en.wikipedia.org/wiki/Tiruchirappalli"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Tamil Nadu"
      }
    ]
  };
}

/**
 * Build Schema.org WebSite payload
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    "url": SITE_CONFIG.url,
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.defaultDescription,
    "publisher": {
      "@id": `${SITE_CONFIG.url}/#organization`
    },
    "inLanguage": "en-IN"
  };
}

/**
 * Build BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`
    }))
  };
}

/**
 * Build Property Schema (Schema.org Place / Product / SingleFamilyResidence)
 * Strictly strictly uses verified property facts.
 */
export function getPropertySchema(prop) {
  const pageUrl = `${SITE_CONFIG.url}/properties/${prop.slug}`;
  const imageUrl = prop.featured_image?.startsWith("http")
    ? prop.featured_image
    : `${SITE_CONFIG.url}${prop.featured_image || prop.images?.[0] || "/projects/jai-nagar.jpg"}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${pageUrl}#place`,
    "name": prop.title,
    "description": prop.description,
    "url": pageUrl,
    "image": [imageUrl],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": prop.locality,
      "addressRegion": prop.state || "Tamil Nadu",
      "addressCountry": prop.country || "IN"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Plot Area",
        "value": `${prop.plot_area} ${prop.plot_area_unit || "sq.ft"}`
      },
      {
        "@type": "PropertyValue",
        "name": "Property Type",
        "value": prop.property_type
      },
      {
        "@type": "PropertyValue",
        "name": "Approval Status",
        "value": prop.approval_status
      }
    ]
  };

  if (prop.landmark) {
    schema.additionalProperty.push({
      "@type": "PropertyValue",
      "name": "Nearby Landmark",
      "value": prop.landmark
    });
  }

  if (prop.rera_id) {
    schema.additionalProperty.push({
      "@type": "PropertyValue",
      "name": "RERA Registration Number",
      "value": prop.rera_id
    });
  }

  if (prop.guideline_value) {
    schema.additionalProperty.push({
      "@type": "PropertyValue",
      "name": "Guideline Value",
      "value": prop.guideline_value
    });
  }

  return schema;
}

/**
 * Generate metadata for individual verified property
 */
export function getPropertyMetadata(prop) {
  if (!prop) return STATIC_ROUTES_METADATA["/properties"];
  const canonical = `${SITE_CONFIG.url}/properties/${prop.slug}`;
  const title = `${prop.plot_area} Sq.Ft ${prop.property_type} in ${prop.locality}, Trichy | Nam Nilam`;
  const description = `${prop.title}. Located in ${prop.locality}, Trichy (${prop.landmark}). Asking: ${prop.price_label} (${prop.approval_status}). Verified by Nam Nilam.`;
  const image = prop.featured_image?.startsWith("http")
    ? prop.featured_image
    : `${SITE_CONFIG.url}${prop.featured_image || prop.images?.[0] || "/projects/jai-nagar.jpg"}`;

  return {
    title,
    description,
    canonical,
    image,
    type: "product",
    noindex: prop.status !== "published",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Properties", url: "/properties" },
      { name: `${prop.locality} - ${prop.plot_area} sq.ft`, url: `/properties/${prop.slug}` }
    ],
    schema: getPropertySchema(prop)
  };
}

/**
 * Generate metadata for individual project
 */
export function getProjectMetadata(proj) {
  if (!proj) return STATIC_ROUTES_METADATA["/projects"];
  const canonical = `${SITE_CONFIG.url}/projects/${proj.slug}`;
  const title = `${proj.title} | ${proj.type} in ${proj.location} | Nam Nilam`;
  const shortOverview = proj.overview ? proj.overview.slice(0, 150) : "";
  const description = `${shortOverview}... Priced at ${proj.rateSqft}/sq.ft. Total ${proj.totalPlots} plots with ${proj.availablePlots} available. ${proj.approvalNo}.`;
  const image = proj.image?.startsWith("http")
    ? proj.image
    : `${SITE_CONFIG.url}${proj.image || "/projects/jai-nagar.jpg"}`;

  return {
    title,
    description,
    canonical,
    image,
    type: "website",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: proj.title, url: `/projects/${proj.slug}` }
    ]
  };
}

/**
 * Get route metadata with fallbacks
 */
export function getMetadataForRoute(pathname) {
  // Normalize pathname (remove trailing slash except for root)
  const cleanPath = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (STATIC_ROUTES_METADATA[cleanPath]) {
    return STATIC_ROUTES_METADATA[cleanPath];
  }

  // Check prefix matches
  if (cleanPath.startsWith("/services/")) {
    const slug = cleanPath.replace("/services/", "");
    return {
      title: `${slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} Services | Nam Nilam`,
      description: `Professional ${slug.replace(/-/g, " ")} services in Trichy, Tamil Nadu by Nam Nilam real estate advisors.`,
      canonical: `${SITE_CONFIG.url}${cleanPath}`,
      type: "service"
    };
  }

  if (cleanPath.startsWith("/academy/")) {
    return {
      title: "Real Estate Academy Courses | Nam Nilam",
      description: "Learn practical real estate diligence, land documentation, and valuation in Tamil Nadu.",
      canonical: `${SITE_CONFIG.url}${cleanPath}`,
      type: "website"
    };
  }

  if (cleanPath.startsWith("/intelligence/")) {
    return {
      title: "Market Intelligence Report | Nam Nilam Trichy",
      description: "Data-driven property and land analytics for Trichy and Tamil Nadu growth corridors.",
      canonical: `${SITE_CONFIG.url}${cleanPath}`,
      type: "website"
    };
  }

  if (cleanPath.startsWith("/resources/")) {
    return {
      title: "Real Estate Guide & Resources | Nam Nilam",
      description: "Property checklists, legal guidelines, and investment guides for Tamil Nadu.",
      canonical: `${SITE_CONFIG.url}${cleanPath}`,
      type: "article"
    };
  }

  // Default fallback
  return {
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
    canonical: `${SITE_CONFIG.url}${cleanPath}`,
    type: "website"
  };
}

/**
 * Client-side DOM updater for React SPA transitions
 */
export function applyPageMetadata(meta) {
  if (typeof document === "undefined") return;

  // Title
  if (meta.title) {
    document.title = meta.title;
  }

  // Meta helper
  const setMetaTag = (attrName, attrValue, content) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  // Description
  if (meta.description) {
    setMetaTag("name", "description", meta.description);
  }

  // Canonical Link
  if (meta.canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", meta.canonical);
  }

  // Robots
  if (meta.noindex) {
    setMetaTag("name", "robots", "noindex, nofollow");
  } else {
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  }

  // Open Graph
  const ogTitle = meta.title || SITE_CONFIG.defaultTitle;
  const ogDesc = meta.description || SITE_CONFIG.defaultDescription;
  const ogUrl = meta.canonical || SITE_CONFIG.url;
  const ogImage = meta.image || SITE_CONFIG.defaultImage;

  setMetaTag("property", "og:title", ogTitle);
  setMetaTag("property", "og:description", ogDesc);
  setMetaTag("property", "og:url", ogUrl);
  setMetaTag("property", "og:type", meta.type || "website");
  setMetaTag("property", "og:image", ogImage);
  setMetaTag("property", "og:site_name", SITE_CONFIG.name);

  // Twitter
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:title", ogTitle);
  setMetaTag("name", "twitter:description", ogDesc);
  setMetaTag("name", "twitter:image", ogImage);

  // Structured Data (JSON-LD)
  let scriptEl = document.getElementById("schema-jsonld-page");
  if (!scriptEl) {
    scriptEl = document.createElement("script");
    scriptEl.id = "schema-jsonld-page";
    scriptEl.type = "application/ld+json";
    document.head.appendChild(scriptEl);
  }

  const schemas = [];
  if (meta.schema) {
    schemas.push(meta.schema);
  }
  if (meta.breadcrumbs) {
    schemas.push(getBreadcrumbSchema(meta.breadcrumbs));
  }

  if (schemas.length > 0) {
    scriptEl.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  } else {
    scriptEl.textContent = "";
  }
}
