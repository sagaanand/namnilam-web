import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Droplets, 
  Compass, 
  Phone, 
  MessageSquare, 
  Calendar,
  Building,
  HelpCircle,
  FileCheck,
  CreditCard,
  Share2
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { BRAND_INFO } from '../data/ecosystemData';
import { VERIFIED_PROPERTIES } from '../data/propertiesData';
import { getPropertyMetadata, getPropertySchema } from '../data/seoMetadata';
import { getProperties } from '../services/api';

export const PropertyDetailPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProperty = async () => {
      setLoading(true);
      const data = await getProperties(slug);
      if (isMounted) {
        setProperty(data || null);
        setLoading(false);
      }
    };
    fetchProperty();
    return () => { isMounted = false; };
  }, [slug]);

  // Loading state
  if (loading && !property) {
    return (
      <div className="bg-[#0b0f19] text-white min-h-screen pt-36 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading verified property details...</p>
        </div>
      </div>
    );
  }

  // Not Found State (404)
  if (!property) {
    return (
      <div className="bg-[#0b0f19] text-white min-h-screen pt-36 pb-20">
        <SeoHead 
          title="Property Not Found | Nam Nilam"
          description="The requested property listing could not be found or has been withdrawn from verified listings."
          noindex={true}
        />
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Property Listing Not Found</h1>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
            The property listing <span className="font-mono text-gray-300">"{slug}"</span> might have been sold, unpublished, or the link may be outdated.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/properties"
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition shadow-lg"
            >
              Browse All Verified Plots
            </Link>
            <Link
              to="/projects"
              className="px-6 py-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 font-semibold text-sm hover:bg-gray-700 transition"
            >
              View Featured Layout Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const meta = getPropertyMetadata(property);
  const imgUrl = property.featured_image || property.images?.[0] || '/projects/jai-nagar.jpg';
  const waMessage = encodeURIComponent(
    `Hello Nam Nilam Advisory Team, I am interested in the verified listing: "${property.title}" (${meta.canonical}). Please send me the legal verification checklist and schedule a site visit.`
  );

  const related = VERIFIED_PROPERTIES.filter(p => p.slug !== property.slug).slice(0, 2);

  return (
    <div className="property-detail-page bg-[#0b0f19] text-white min-h-screen">
      <SeoHead 
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        image={meta.image}
        type="product"
        breadcrumbs={meta.breadcrumbs}
        schemaData={meta.schema}
        noindex={property.status !== 'published'}
      />

      {/* Breadcrumb Header */}
      <section className="pt-28 pb-6 border-b border-gray-800/80 bg-gray-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={meta.breadcrumbs.map(b => ({ label: b.name, path: b.url.replace('https://namnilam.com', '') }))} />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Cols: Title, Media, Specs, Features, Map */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title & Badges */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                  {property.approval_status}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  {property.property_type}
                </span>
                {property.rera_id && (
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    RERA: {property.rera_id}
                  </span>
                )}
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                  Ready to Register
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {property.title}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{property.locality}, Tiruchirappalli, Tamil Nadu</span>
                {property.landmark && (
                  <span className="text-gray-400">• {property.landmark}</span>
                )}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 shadow-xl">
              <img 
                src={imgUrl} 
                alt={`${property.title} in ${property.locality}, Trichy`}
                width="960"
                height="540"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Asking Price</div>
                <div className="text-2xl font-black text-emerald-400">{property.price_label}</div>
              </div>
            </div>

            {/* Core Specifications Table */}
            <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                Verified Plot Specifications
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                  <div className="text-xs text-gray-400">Plot Extent</div>
                  <div className="font-bold text-white text-base mt-0.5">{property.plot_area} {property.plot_area_unit}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                  <div className="text-xs text-gray-400">Dimensions</div>
                  <div className="font-bold text-white text-base mt-0.5">{property.plot_dimensions || 'Standard Layout'}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                  <div className="text-xs text-gray-400">Facing Direction</div>
                  <div className="font-bold text-white text-base mt-0.5">{property.facing || 'East / North'}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                  <div className="text-xs text-gray-400">Rate / Sq.Ft</div>
                  <div className="font-bold text-emerald-400 text-base mt-0.5">₹{property.price_per_sqft}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                  <div className="text-xs text-gray-400">Govt Guideline Base</div>
                  <div className="font-bold text-white text-base mt-0.5">{property.guideline_value}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/80">
                  <div className="text-xs text-gray-400">Groundwater Depth</div>
                  <div className="font-bold text-blue-400 text-base mt-0.5">25 - 30 ft (Sweet Kaveri)</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-3">Property Overview & Field Audit</h2>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features & Approvals */}
            {Array.isArray(property.features) && property.features.length > 0 && (
              <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800">
                <h2 className="text-lg font-bold text-white mb-4">Verified Layout Features & Legal Safeguards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connectivity Table */}
            {Array.isArray(property.connectivity) && property.connectivity.length > 0 && (
              <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800">
                <h2 className="text-lg font-bold text-white mb-4">Corridor Distance & Connectivity</h2>
                <div className="divide-y divide-gray-800">
                  {property.connectivity.map((conn, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                      <span className="text-gray-300">{conn.name}</span>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-gray-400">{conn.distance}</span>
                        <span className="px-2 py-0.5 rounded bg-gray-800 text-emerald-400">{conn.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Parent Project Relationship (if linked) */}
            {property.project_slug && (
              <div className="bg-gradient-to-r from-gray-900 to-emerald-950/30 rounded-2xl p-6 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Part of Master-Planned Layout</div>
                  <div className="text-base font-bold text-white mt-1">{property.project_title || 'Featured Project'}</div>
                  <p className="text-xs text-gray-400 mt-0.5">Explore full layout master plan, remaining inventory, and amenities.</p>
                </div>
                <Link
                  to={`/projects/${property.project_slug}`}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold border border-gray-700 transition shrink-0"
                >
                  View Layout Master Plan →
                </Link>
              </div>
            )}

          </div>

          {/* Right 1 Col: Price Card, CTAs, Advisory Box */}
          <div className="space-y-6">
            
            {/* Sticky Action Card */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-28 shadow-2xl">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Asking Price</div>
              <div className="text-3xl font-black text-emerald-400 mt-1">
                {property.price_label}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                ₹{property.price_per_sqft} / sq.ft • Zero Brokerage
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-900/40"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp (+91 97876 00006)
                </a>

                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry(`Property Enquiry: ${property.title}`)}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-950 font-semibold text-sm flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Schedule Verified Site Visit
                </button>
              </div>

              {/* Legal Guarantee Box */}
              <div className="mt-6 pt-6 border-t border-gray-800 space-y-3 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Year Encumbrance Certificate Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Individual Sub-division Patta Transfer Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Nationalized Bank Home Loan Approved</span>
                </div>
              </div>

              {/* Advisory Office Contacts */}
              <div className="mt-6 pt-4 border-t border-gray-800/80 text-[11px] text-gray-400">
                <div className="font-semibold text-gray-300">Nam Nilam Advisory Office</div>
                <div className="mt-0.5">{BRAND_INFO.address}</div>
                <div className="mt-1 text-emerald-400">Direct Phone: {BRAND_INFO.phone}</div>
              </div>
            </div>

            {/* Related Properties */}
            {related.length > 0 && (
              <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-white mb-3">Other Verified Plots in Trichy</h3>
                <div className="space-y-3">
                  {related.map(r => (
                    <Link
                      key={r.id}
                      to={`/properties/${r.slug}`}
                      className="block p-3 rounded-xl bg-gray-950 hover:bg-gray-900 border border-gray-800/80 transition"
                    >
                      <div className="font-semibold text-white text-xs hover:text-emerald-400">{r.title}</div>
                      <div className="text-[11px] text-emerald-400 font-bold mt-1">{r.price_label} • {r.locality}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
};
