import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, 
  Target, 
  MessageSquare, 
  Database, 
  Zap, 
  BarChart3, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BUSINESS_SOLUTIONS, BRAND_INFO } from '../data/ecosystemData';

const iconMap = {
  'digital-marketing': Target,
  'lead-generation': Zap,
  'crm': Database,
  'whatsapp-automation': MessageSquare,
  'sales-automation': Layers,
  'business-intelligence': BarChart3,
  'digital-transformation': Cpu
};

export const BusinessSolutionsPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();

  const solution = slug ? BUSINESS_SOLUTIONS.find(s => s.slug === slug) : null;

  if (slug && solution) {
    const Icon = iconMap[solution.slug] || Cpu;

    return (
      <div>
        <Breadcrumbs items={[
          { label: 'Business Solutions', path: '/business' },
          { label: solution.title }
        ]} />

        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="section-eyebrow">
              <Icon size={14} />
              <span>{solution.title}</span>
            </div>
            <h1 style={{ fontSize: '2.6rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              {solution.headline}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
              Transform your real estate sales operations with proven digital engineering, automation, and data visibility.
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenEnquiry(`Business Solution: ${solution.title}`)}
                className="btn btn-primary btn-lg"
              >
                <span>Request Custom Demo / Proposal</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I would like a consultation on ${solution.title} for my real estate business.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={16} />
                <span>Talk to Solutions Architect</span>
              </a>
            </div>
          </div>
        </section>

        {/* Problem → Solution → Process → Deliverables */}
        <section className="section">
          <div className="container">
            <div className="service-overview-grid">
              <div>
                {/* 1. Problem */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', marginBottom: '10px' }}>
                    <AlertTriangle size={18} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>The Operational Challenge</span>
                  </div>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '14px' }}>The Bottleneck Limiting Your Growth</h2>
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderLeft: '4px solid #DC2626',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.7
                  }}>
                    {solution.problem}
                  </div>
                </div>

                {/* 2. Solution */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-dark)', marginBottom: '10px' }}>
                    <Sparkles size={18} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>The Nam Nilam Solution</span>
                  </div>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '14px' }}>How We Solve This for Real Estate Developers</h2>
                  <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                    {solution.solution}
                  </p>
                </div>

                {/* 3. Process */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Implementation Process</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    {solution.process.map((step, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--color-gold-soft)', color: 'var(--color-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Deliverables & Impact */}
              <div>
                <div className="deliverables-box">
                  <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Solution Package</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Key Deliverables</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-ink)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {solution.deliverables}
                  </p>

                  <div style={{
                    padding: '16px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '20px'
                  }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Expected Business Impact:
                    </strong>
                    <div style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                      ✓ 40%+ reduction in lead response latency<br />
                      ✓ Up to 3x increase in qualified site visits<br />
                      ✓ 100% accountability on sales team follow-up
                    </div>
                  </div>

                  <button 
                    onClick={() => onOpenEnquiry(`Consultation: ${solution.title}`)}
                    className="btn btn-primary btn-md"
                    style={{ width: '100%' }}
                  >
                    <span>Request Implementation Plan</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Overview Page
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Business Solutions' }]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <Cpu size={14} />
            <span>Digital Transformation for Real Estate</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Build a Smarter Real Estate Business.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            We partner with layout developers, promoters, and marketing agencies across Tamil Nadu to implement high-converting digital marketing, CRM pipelines, and WhatsApp automation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid-3">
            {BUSINESS_SOLUTIONS.map((sol) => {
              const Icon = iconMap[sol.slug] || Cpu;
              return (
                <div key={sol.slug} style={{
                  padding: '32px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div className="journey-icon" style={{ marginBottom: '16px' }}>
                    <Icon size={24} />
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                    {sol.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '20px', lineHeight: 1.55 }}>
                    {sol.headline}
                  </p>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                    <Link to={`/business/${sol.slug}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      <span>Explore Solution</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
