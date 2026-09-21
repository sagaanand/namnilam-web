import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  MapPin, 
  Layers, 
  FileText, 
  Download, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Search,
  Zap,
  BookOpen,
  Compass,
  ChevronRight,
  Building
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { 
  INTELLIGENCE_SUBPAGES, 
  TN_REGIONAL_HIERARCHY, 
  DETAILED_INTELLIGENCE_RECORDS, 
  INTELLIGENCE_PRODUCTS,
  BRAND_INFO 
} from '../data/ecosystemData';

export const IntelligencePage = ({ onOpenEnquiry }) => {
  const { subpage } = useParams();
  const [selectedDistrict, setSelectedDistrict] = useState(TN_REGIONAL_HIERARCHY.districts[0].name);

  const currentSubpage = INTELLIGENCE_SUBPAGES.find(s => s.slug === subpage) || { label: 'Market Intelligence' };

  // Filter intelligence records
  const filteredRecords = DETAILED_INTELLIGENCE_RECORDS.filter(rec => {
    if (!subpage || subpage === '' || subpage === 'overview') return true;
    return rec.subpage === subpage;
  });

  const pageTitle = subpage 
    ? `${currentSubpage.label} | Nam Nilam Intelligence`
    : 'Tamil Nadu Real Estate Market Intelligence | Nam Nilam';

  const pageDesc = 'Understand Tamil Nadu real estate micro-markets before making capital decisions. Infrastructure impact analyses, sub-registrar transaction price indices, and DTCP regulatory audits.';

  return (
    <div>
      <SeoHead 
        title={pageTitle}
        description={pageDesc}
        canonical={subpage ? `/intelligence/${subpage}` : '/intelligence'}
        breadcrumbs={[
          { label: 'Intelligence', path: '/intelligence' },
          ...(subpage ? [{ label: currentSubpage.label }] : [])
        ]}
      />

      <Breadcrumbs items={[
        { label: 'Intelligence', path: '/intelligence' },
        ...(subpage ? [{ label: currentSubpage.label }] : [])
      ]} />

      {/* Intelligence Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <TrendingUp size={14} />
            <span>Property Intelligence & Analytics</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Know the Market Before You Decide.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px', lineHeight: 1.65 }}>
            Nam Nilam’s dedicated information and decision-support layer: independent property valuations, micro-market data reports, and on-site technical audits across Tamil Nadu.
          </p>

          {/* Core Decision Products Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '36px' }}>
            {INTELLIGENCE_PRODUCTS.map((prod) => (
              <div key={prod.slug} style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>Decision Support</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-brand-deep)', backgroundColor: 'var(--color-canvas)', padding: '3px 8px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)' }}>
                    {prod.price}
                  </strong>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                  {prod.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-muted)', marginBottom: '16px', lineHeight: 1.55 }}>
                  {prod.desc}
                </p>

                <div style={{ marginBottom: '20px', flex: 1 }}>
                  {prod.highlights.map((h, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: 'var(--color-ink)', marginBottom: '6px' }}>
                      <CheckCircle2 size={14} color="#059669" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onOpenEnquiry(`Intelligence Product: ${prod.title}`)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>{prod.ctaText}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Subpage Links Navigation Bar */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '36px', flexWrap: 'wrap' }}>
            <Link to="/intelligence" className={`btn btn-sm ${!subpage ? 'btn-primary' : 'btn-outline'}`}>
              Overview
            </Link>
            <Link to="/intelligence/market-insights" className={`btn btn-sm ${subpage === 'market-insights' ? 'btn-primary' : 'btn-outline'}`}>
              Market Insights
            </Link>
            <Link to="/intelligence/location-insights" className={`btn btn-sm ${subpage === 'location-insights' ? 'btn-primary' : 'btn-outline'}`}>
              Location Insights
            </Link>
            <Link to="/intelligence/price-insights" className={`btn btn-sm ${subpage === 'price-insights' ? 'btn-primary' : 'btn-outline'}`}>
              Price Insights
            </Link>
            <Link to="/intelligence/infrastructure" className={`btn btn-sm ${subpage === 'infrastructure' ? 'btn-primary' : 'btn-outline'}`}>
              Infrastructure
            </Link>
            <Link to="/intelligence/reports" className={`btn btn-sm ${subpage === 'reports' ? 'btn-primary' : 'btn-outline'}`}>
              Research Reports
            </Link>
            <Link to="/intelligence/guides" className={`btn btn-sm ${subpage === 'guides' ? 'btn-primary' : 'btn-outline'}`}>
              Practical Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Main Intelligence Grid */}
      <section className="section">
        <div className="container">
          <div className="cards-grid-2" style={{ marginBottom: '60px' }}>
            {filteredRecords.map((item) => (
              <div key={item.slug} style={{
                padding: '36px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="badge badge-gold">{item.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {item.region} • {item.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--color-brand-deep)', lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', marginBottom: '20px', lineHeight: 1.65 }}>
                  {item.summary}
                </p>

                {/* Key Research Points */}
                <div style={{ marginBottom: '24px', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-brand-deep)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                    Key Intelligence Takeaways:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {item.keyPoints.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--color-ink)' }}>
                        <CheckCircle2 size={15} color="var(--color-gold-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  color: 'var(--color-ink-muted)',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  {item.fullArticle}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => onOpenEnquiry(`Intelligence Consultation: ${item.title}`)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Request Corridor Dossier</span>
                    <ArrowRight size={14} />
                  </button>
                  <Link to="/contact" className="btn btn-outline btn-sm">
                    Consult Advisory Desk
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Tamil Nadu Geographic Intelligence Hierarchy (Section 21 & Section 48) */}
          <div style={{
            padding: '40px',
            backgroundColor: 'var(--color-surface-soft)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <div style={{ maxWidth: '720px', marginBottom: '28px' }}>
              <span className="badge badge-dark" style={{ marginBottom: '10px' }}>
                Geographic Coverage Architecture
              </span>
              <h3 style={{ fontSize: '1.7rem', color: 'var(--color-brand-deep)', marginBottom: '10px' }}>
                Tamil Nadu Geographic Intelligence Architecture
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                Our research framework monitors property micro-markets hierarchically: <strong>State → District → City → Locality</strong>. Currently, on-ground project listings are strictly focused on Tiruchirappalli (Trichy), while our advisory and data intelligence models encompass primary growth corridors statewide.
              </p>
            </div>

            {/* District Selector Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {TN_REGIONAL_HIERARCHY.districts.map(d => (
                <button
                  key={d.name}
                  onClick={() => setSelectedDistrict(d.name)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: selectedDistrict === d.name ? 'var(--color-brand-deep)' : '#FFFFFF',
                    color: selectedDistrict === d.name ? '#FFFFFF' : 'var(--color-ink)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer'
                  }}
                >
                  {d.name}
                </button>
              ))}
            </div>

            {/* Micro-Market Localities Grid */}
            {(() => {
              const dist = TN_REGIONAL_HIERARCHY.districts.find(d => d.name === selectedDistrict);
              if (!dist) return null;
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  {dist.cities[0].localities.map((loc, idx) => (
                    <div key={idx} style={{
                      padding: '16px 20px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <MapPin size={16} color="var(--color-gold-dark)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-brand-deep)' }}>
                        {loc}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </section>
    </div>
  );
};
