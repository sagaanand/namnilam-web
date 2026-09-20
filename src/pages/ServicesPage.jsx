import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Calculator, 
  FileCheck2, 
  TrendingUp, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Clock
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SERVICES_CATALOG, BRAND_INFO } from '../data/ecosystemData';

const iconMap = {
  'real-estate-advisory': ShieldCheck,
  'property-valuation': Calculator,
  'due-diligence': FileCheck2,
  'investment-advisory': TrendingUp,
  'real-estate-consulting': Building2
};

export const ServicesPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();

  // If slug is provided, render the specific service deep-dive
  const service = slug ? SERVICES_CATALOG.find(s => s.slug === slug) : null;

  if (slug && service) {
    const Icon = iconMap[service.slug] || ShieldCheck;

    return (
      <div>
        <Breadcrumbs items={[
          { label: 'Services', path: '/services' },
          { label: service.title }
        ]} />

        {/* Service Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="section-eyebrow">
              <Icon size={14} />
              <span>{service.title}</span>
            </div>
            <h1 style={{ fontSize: '2.6rem', color: 'var(--color-brand-deep)', marginBottom: '16px' }}>
              {service.headline}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px', lineHeight: 1.65 }}>
              {service.desc}
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenEnquiry(service.title)}
                className="btn btn-primary btn-lg"
              >
                <span>Request {service.title}</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I need information regarding ${service.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={16} />
                <span>Talk on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Detailed Service Content */}
        <section className="section">
          <div className="container">
            <div className="service-overview-grid">
              {/* Left Column: Who it is for, Problems, Solution */}
              <div>
                {/* Who It Is For */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Who Is This Service For?</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {service.targetAudience.map((aud, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem' }}>
                        <CheckCircle2 size={18} color="var(--color-gold-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{aud}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Problems Solved */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Common Pitfalls We Protect You From</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {service.commonProblems.map((prob, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        backgroundColor: 'var(--color-canvas)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '4px solid #DC2626',
                        fontSize: '0.9rem',
                        color: 'var(--color-ink)'
                      }}>
                        {prob}
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Nam Nilam Helps With */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Our Comprehensive Advisory Scope</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {service.whatWeHelpWith.map((help, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <CheckCircle2 size={18} color="#059669" />
                        <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{help}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Deliverable Card & Disclaimer */}
              <div>
                <div className="deliverables-box" style={{ marginBottom: '24px' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Tangible Deliverable</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>What You Receive</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-ink)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {service.deliverables}
                  </p>

                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', fontSize: '0.82rem', color: 'var(--color-ink-muted)' }}>
                    ⏱ Typical turnaround: <strong>2 – 4 Business Days</strong> following document receipt.
                  </div>

                  <button 
                    onClick={() => onOpenEnquiry(service.title)}
                    className="btn btn-primary btn-md"
                    style={{ width: '100%', marginTop: '20px' }}
                  >
                    <span>Schedule Consultation</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Regulatory Disclaimer Box */}
                <div style={{
                  padding: '20px',
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  color: '#92400E'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                    <AlertCircle size={15} />
                    <span>Advisory Notice</span>
                  </div>
                  {service.slug === 'property-valuation' ? (
                    <p>
                      Valuation reports provided represent indicative market comp assessments for transaction decision-support. They do not substitute statutory valuations prepared for court filings or statutory tax clearances.
                    </p>
                  ) : service.slug === 'due-diligence' ? (
                    <p>
                      Due diligence assistance provides preliminary document inspection and identification of visible discrepancies. Official legal title certifications should always be executed by certified high court legal counsel.
                    </p>
                  ) : (
                    <p>
                      Our advisory is independent and objective. We do not guarantee future speculative financial returns on real estate assets.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, render the Services Hub Overview
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Services' }]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <ShieldCheck size={14} />
            <span>Advisory & Practice Areas</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Real Estate Services, Grounded in Institutional Rigor.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            From independent property consultation and market valuation to developer digital transformation. We serve buyers, investors, and businesses across Tamil Nadu.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {SERVICES_CATALOG.map((item) => {
              const Icon = iconMap[item.slug] || ShieldCheck;
              return (
                <div key={item.slug} className="service-card-item" style={{
                  padding: '36px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span className="badge badge-gold">
                        <Icon size={12} />
                        {item.title}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                      {item.headline}
                    </h2>

                    <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <Link to={`/services/${item.slug}`} className="btn btn-primary btn-sm">
                        <span>View Service Details</span>
                        <ArrowRight size={14} />
                      </Link>

                      <button 
                        onClick={() => onOpenEnquiry(item.title)}
                        className="btn btn-outline btn-sm"
                      >
                        Request Consultation
                      </button>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--color-canvas)',
                    padding: '24px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)'
                  }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Key Deliverable:
                    </strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-ink)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {item.deliverables}
                    </p>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      ✓ Independent • Confidential • Written Report
                    </div>
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
