import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Droplets, 
  Compass, 
  Phone, 
  MessageSquare, 
  Filter, 
  Sparkles,
  Building
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { BRAND_INFO } from '../data/ecosystemData';
import { VERIFIED_PROPERTIES } from '../data/propertiesData';
import { getProperties } from '../services/api';

export const PropertiesPage = ({ onOpenEnquiry }) => {
  const [properties, setProperties] = useState(VERIFIED_PROPERTIES);
  const [selectedLocality, setSelectedLocality] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const load = async () => {
      const data = await getProperties();
      if (Array.isArray(data) && data.length > 0) {
        setProperties(data);
      }
    };
    load();
  }, []);

  const localities = ['all', ...new Set(properties.map(p => p.locality))];
  const types = ['all', ...new Set(properties.map(p => p.property_type))];

  const filteredProperties = properties.filter(prop => {
    const matchLocality = selectedLocality === 'all' || prop.locality === selectedLocality;
    const matchType = selectedType === 'all' || prop.property_type === selectedType;
    return matchLocality && matchType;
  });

  const propertyListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredProperties.map((prop, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: prop.title,
      url: `https://namnilam.com/properties/${prop.slug}`
    }))
  };

  return (
    <div className="properties-page bg-[#0b0f19] text-white min-h-screen">
      <SeoHead 
        title="Verified Plots & Properties for Sale in Trichy"
        description="Browse 100% verified residential plots, villa plots, and farmland for sale in Trichy. DTCP & RERA approved with guideline values, clear titles, and Kaveri groundwater."
        canonical="https://namnilam.com/properties"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Properties', path: '/properties' }
        ]}
        schemaData={propertyListSchema}
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 border-b border-gray-800 bg-gradient-to-b from-[#111827] to-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Properties', path: '/properties' }
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" /> 100% Verified Ground Truth
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Verified Plots & Properties in <span className="text-emerald-400">Trichy</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Every plot listed on Nam Nilam has undergone our rigorous 6-point title deed audit, DTCP layout sanction verification, guideline index valuation, and on-ground Kaveri water depth test.
            </p>
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-8 p-4 rounded-xl bg-gray-900/80 border border-gray-800 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" /> Locality:
              </div>
              <div className="flex flex-wrap gap-2">
                {localities.map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocality(loc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedLocality === loc 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {loc === 'all' ? 'All Localities' : loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" /> Type:
              </div>
              <div className="flex flex-wrap gap-2">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedType === t 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {t === 'all' ? 'All Types' : t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listing Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-400">
            Showing <span className="font-semibold text-white">{filteredProperties.length}</span> verified property listings
          </p>
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Direct developer rates • Zero buyer brokerage
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(prop => {
            const detailUrl = `/properties/${prop.slug}`;
            const imgUrl = prop.featured_image || prop.images?.[0] || '/projects/jai-nagar.jpg';
            const waMsg = encodeURIComponent(`Hi Nam Nilam, I am interested in verified listing "${prop.title}" (${detailUrl}). Please share full document details.`);

            return (
              <article 
                key={prop.id} 
                className="bg-gray-900/60 rounded-2xl border border-gray-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col group shadow-lg"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-950">
                  <img 
                    src={imgUrl} 
                    alt={prop.title}
                    width="600"
                    height="375"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                      {prop.approval_status}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-gray-900/80 text-gray-200 border border-gray-700 backdrop-blur-sm">
                      {prop.property_type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 rounded-md text-xs font-bold text-white border border-white/10 backdrop-blur-sm">
                    {prop.plot_area} {prop.plot_area_unit}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{prop.locality}, Trichy</span>
                      {prop.landmark && (
                        <span className="truncate text-gray-400">• {prop.landmark}</span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-400 transition">
                      <Link to={detailUrl}>
                        {prop.title}
                      </Link>
                    </h2>

                    <p className="mt-2.5 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Specification Badges */}
                    <div className="mt-4 pt-4 border-t border-gray-800/80 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <Droplets className="w-3.5 h-3.5 text-blue-400" />
                        <span>Kaveri Water: 25-30 ft</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span>Facing: {prop.facing || 'East/North'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="text-xl font-extrabold text-white">
                        {prop.price_label}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        ₹{prop.price_per_sqft}/sq.ft • Guideline: {prop.guideline_value}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${waMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition"
                        title="Enquire on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      <Link
                        to={detailUrl}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-gray-950 text-xs font-semibold hover:bg-gray-200 transition shadow-sm"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Discovery Bottom Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-900 to-emerald-950/30 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white">Looking for Custom Plot Sizes or Specific Corridors?</h2>
            <p className="mt-2 text-sm text-gray-400">
              Our ground advisory team surveys layouts across the Chennai NH-45, Dindigul Highway, Madurai Ring Road, and Thanjavur Corridors weekly. Get independent legal verification before paying any advance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry('Property Advisory')}
              className="px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/30"
            >
              Request Plot Advisory
            </button>
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent("Hi Nam Nilam, I am looking for a verified residential plot in Trichy.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 text-sm font-semibold hover:bg-gray-700 transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
