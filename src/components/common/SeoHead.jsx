import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BRAND_INFO } from '../../data/ecosystemData';

export const SeoHead = ({
  title,
  description,
  canonical,
  type = 'website',
  image = '/nam-nilam-logo.png',
  schemaData = null,
  breadcrumbs = null,
  faqs = null
}) => {
  const location = useLocation();
  const siteUrl = 'https://namnilam.com';
  const currentPath = canonical || location.pathname;
  const fullUrl = `${siteUrl}${currentPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const defaultDescription = 'Nam Nilam — Real Estate Intelligence, Advisory, Education and Digital Transformation for the real estate ecosystem across Tamil Nadu.';
  const finalTitle = title ? `${title} | Nam Nilam` : 'Nam Nilam | Real Estate Decisions, Backed by Intelligence';
  const finalDescription = description || defaultDescription;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Set standard meta tags
    setMeta('description', finalDescription);
    setMeta('robots', 'index, follow');

    // 4. Set Open Graph tags
    setMeta('og:title', finalTitle, true);
    setMeta('og:description', finalDescription, true);
    setMeta('og:url', fullUrl, true);
    setMeta('og:type', type, true);
    setMeta('og:image', fullImageUrl, true);
    setMeta('og:site_name', 'Nam Nilam', true);
    setMeta('og:locale', 'en_IN', true);

    // 5. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDescription);
    setMeta('twitter:image', fullImageUrl);

    // 6. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullUrl);

    // 7. Inject JSON-LD Structured Data
    const scriptId = 'nam-nilam-jsonld';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND_INFO.name,
      legalName: BRAND_INFO.legalEntity,
      url: siteUrl,
      logo: `${siteUrl}/nam-nilam-logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: BRAND_INFO.phone,
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil']
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 24/4, Old Karur Road, Melachinthamani',
        addressLocality: 'Tiruchirappalli',
        addressRegion: 'Tamil Nadu',
        postalCode: '620002',
        addressCountry: 'IN'
      }
    };

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Nam Nilam Real Estate Intelligence & Advisory',
      image: `${siteUrl}/nam-nilam-logo.png`,
      telephone: BRAND_INFO.phone,
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 24/4, Old Karur Road, Melachinthamani',
        addressLocality: 'Tiruchirappalli',
        addressRegion: 'Tamil Nadu',
        postalCode: '620002',
        addressCountry: 'IN'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00'
      }
    };

    const allSchemas = [orgSchema, localBusinessSchema];

    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      allSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((bc, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: bc.label || bc.name,
          item: bc.path ? `${siteUrl}${bc.path}` : fullUrl
        }))
      });
    }

    if (faqs && Array.isArray(faqs) && faqs.length > 0) {
      allSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q || f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a || f.answer
          }
        }))
      });
    }

    if (schemaData) {
      allSchemas.push(schemaData);
    }

    scriptEl.textContent = JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas);
  }, [finalTitle, finalDescription, fullUrl, fullImageUrl, type, schemaData, breadcrumbs, faqs]);

  return null;
};
