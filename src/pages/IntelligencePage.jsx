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
  BookOpen
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { INTELLIGENCE_ARTICLES, BRAND_INFO } from '../data/ecosystemData';

export const IntelligencePage = ({ onOpenEnquiry }) => {
  const { subpage } = useParams();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Infrastructure', 'Price Insights', 'Guide', 'Legal Insights'];

  const filteredArticles = INTELLIGENCE_ARTICLES.filter(art => {
    if (activeCategory === 'All') return true;
    return art.category === activeCategory;
  });

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Intelligence', path: '/intelligence' },
        ...(subpage ? [{ label: subpage.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }] : [])
      ]} />

      {/* Intelligence Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <TrendingUp size={14} />
            <span>Nam Nilam Intelligence</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Understand the Market Before You Make the Move.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Tamil Nadu real estate insights, infrastructure impact analyses, price trend indices, and educational guides built for clarity.
          </p>

          {/* Subpage Links Navigation Bar */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
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
              Reports & Dossiers
            </Link>
          </div>
        </div>
      </section>

      {/* Intelligence Content */}
      <section className="section">
        <div className="container">
          {/* Filter Chips */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: activeCategory === cat ? 'var(--color-brand-deep)' : 'var(--color-canvas)',
                    color: activeCategory === cat ? '#FFFFFF' : 'var(--color-ink-muted)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
              Showing <strong>{filteredArticles.length}</strong> research dossiers
            </span>
          </div>

          {/* Articles Grid */}
          <div className="cards-grid-2">
            {filteredArticles.map((art) => (
              <div key={art.id} style={{
                padding: '32px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-gold">{art.category}</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {art.readTime} • {art.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
                  {art.summary}
                </p>

                <div style={{
                  backgroundColor: 'var(--color-canvas)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '24px',
                  border: '1px solid var(--color-border)'
                }}>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Key Strategic Takeaways:
                  </strong>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {art.highlights.map((h, idx) => (
                      <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--color-ink)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <CheckCircle2 size={13} color="var(--color-gold-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => onOpenEnquiry(`Intelligence Dossier: ${art.title}`)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Download size={14} />
                    <span>Download Dossier</span>
                  </button>
                  <a 
                    href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, please share the research dossier on: ${art.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    WhatsApp Report
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Scalable Location Hierarchy Callout */}
          <div style={{
            marginTop: '56px',
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            textAlign: 'center'
          }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Scalable Architecture</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              Expanding Real Estate Intelligence Engine
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', maxWidth: '640px', margin: '0 auto 20px auto' }}>
              We are systematically indexing Tamil Nadu micro-markets from District → City → Locality → Street-Level Pricing.
            </p>
            <div style={{ display: 'inline-flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-brand-deep)', fontWeight: 700 }}>
              <span>📍 Trichy Central & Suburbs</span>
              <span>•</span>
              <span>📍 Chennai Suburban Corridors</span>
              <span>•</span>
              <span>📍 Coimbatore & Western TN</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
