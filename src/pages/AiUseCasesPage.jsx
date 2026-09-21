import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  MessageSquare, 
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  PhoneCall,
  Database
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AI_USE_CASES, BRAND_INFO } from '../data/ecosystemData';

export const AiUseCasesPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();

  // Find single use case if slug is present
  const useCase = slug ? AI_USE_CASES.find(u => u.slug === slug || u.id === slug) : null;

  if (slug && useCase) {
    return (
      <div>
        <SeoHead 
          title={`${useCase.title} for Real Estate Businesses`}
          description={useCase.summary}
          canonical={`/ai/use-cases/${useCase.slug}`}
          breadcrumbs={[
            { label: 'AI Workforce', path: '/ai' },
            { label: 'Use Cases', path: '/ai/use-cases/real-estate-lead-qualification' },
            { label: useCase.title }
          ]}
          faqs={useCase.faqs.map(f => ({ question: f.question, answer: f.answer }))}
        />

        <Breadcrumbs items={[
          { label: 'AI Workforce', path: '/ai' },
          { label: 'Use Cases', path: '/ai/use-cases/real-estate-lead-qualification' },
          { label: useCase.title }
        ]} />

        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">
                <Workflow size={12} />
                Real Estate AI Use Case
              </span>
              <span className="badge badge-dark">
                {useCase.badge}
              </span>
            </div>

            <h1 style={{ fontSize: '2.7rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              {useCase.headline}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '820px', lineHeight: 1.65 }}>
              {useCase.summary}
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenEnquiry(`AI Use Case: ${useCase.title}`)}
                className="btn btn-primary btn-lg"
              >
                <span>{useCase.ctaText || 'Deploy This Solution'}</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I want to learn more about ${useCase.title} for my real estate business.`)}`}
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

        {/* Detailed Breakdown */}
        <section className="section">
          <div className="container">
            <div className="service-overview-grid">
              <div>
                {/* 1. Problem */}
                <div style={{ marginBottom: '44px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', marginBottom: '10px' }}>
                    <AlertTriangle size={18} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>The Business Bottleneck</span>
                  </div>
                  <h2 style={{ fontSize: '1.7rem', marginBottom: '14px' }}>
                    Why Real Estate Businesses Struggle with This Today
                  </h2>
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderLeft: '4px solid #DC2626',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1.02rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.7
                  }}>
                    {useCase.problem}
                  </div>
                </div>

                {/* 2. How AI Works */}
                <div style={{ marginBottom: '44px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-dark)', marginBottom: '10px' }}>
                    <Zap size={18} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>The Engineered Solution</span>
                  </div>
                  <h2 style={{ fontSize: '1.7rem', marginBottom: '14px' }}>
                    How Nam Nilam AI Automates the Process
                  </h2>
                  <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)', lineHeight: 1.75 }}>
                    {useCase.howAiWorks}
                  </p>
                </div>

                {/* 3. Step-by-Step Workflow Diagram */}
                <div style={{ marginBottom: '44px' }}>
                  <h2 style={{ fontSize: '1.7rem', marginBottom: '20px' }}>
                    Step-by-Step Operating Workflow
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {useCase.workflow.map((item) => (
                      <div key={item.step} style={{
                        display: 'flex',
                        gap: '20px',
                        padding: '20px 24px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        alignItems: 'flex-start'
                      }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-brand-deep)',
                          color: '#DFBA73',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          flexShrink: 0
                        }}>
                          {item.step}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--color-brand-deep)' }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', margin: 0, lineHeight: 1.6 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Human Handover Protocol */}
                <div style={{ marginBottom: '44px' }}>
                  <div style={{
                    padding: '28px',
                    backgroundColor: 'rgba(5, 150, 105, 0.05)',
                    border: '1px solid rgba(5, 150, 105, 0.2)',
                    borderRadius: 'var(--radius-xl)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', marginBottom: '10px' }}>
                      <Users size={20} />
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)', margin: 0 }}>
                        Human Handover: Where Your Team Takes Over
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '14px' }}>
                      {useCase.humanHandover}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--color-brand-deep)', fontWeight: 600 }}>
                      <span>✓ Zero conversation overlap</span>
                      <span>✓ Instant human alert on high intent</span>
                      <span>✓ Full context sync to mobile CRM</span>
                    </div>
                  </div>
                </div>

                {/* 5. Measurable Business Metrics */}
                <div style={{ marginBottom: '44px' }}>
                  <h2 style={{ fontSize: '1.7rem', marginBottom: '18px' }}>
                    Expected Business Impact & Operational Metrics
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    {useCase.businessMetrics.map((m, idx) => (
                      <div key={idx} style={{
                        padding: '20px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)'
                      }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                          {m.label}
                        </span>
                        <div style={{ fontSize: '0.85rem', color: '#DC2626', marginBottom: '4px' }}>
                          Before: <del>{m.before}</del>
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>
                          With AI: {m.after}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Crawlable AEO FAQ Section */}
                <div style={{ marginBottom: '44px' }}>
                  <h2 style={{ fontSize: '1.7rem', marginBottom: '18px' }}>
                    Frequently Asked Questions (AEO)
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {useCase.faqs.map((faq, i) => (
                      <div key={i} style={{
                        padding: '24px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)'
                      }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                          {faq.question}
                        </h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.65, margin: 0 }}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Contextual CTAs and Cross Links */}
              <div>
                <div style={{
                  padding: '32px',
                  backgroundColor: 'var(--color-brand-deep)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: '28px'
                }}>
                  <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
                    Ready to Deploy
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '12px' }}>
                    Deploy {useCase.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '24px', lineHeight: 1.6 }}>
                    Nam Nilam engineers turnkey real estate AI workflows configured specifically for your project layouts, CRM, and WhatsApp.
                  </p>

                  <button 
                    onClick={() => onOpenEnquiry(`Use Case Consultation: ${useCase.title}`)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
                  >
                    <span>Request Setup Consultation</span>
                  </button>

                  <a 
                    href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I want to talk to an AI solutions specialist about ${useCase.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Direct: {BRAND_INFO.phoneFormatted}</span>
                  </a>
                </div>

                {/* Related AI Agents */}
                <div style={{
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: '28px'
                }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                    Related AI Agents
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {useCase.relatedAgents.map((agSlug) => (
                      <Link
                        key={agSlug}
                        to={`/ai/${agSlug}`}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--color-canvas)',
                          border: '1px solid var(--color-border)',
                          textDecoration: 'none',
                          color: 'var(--color-brand-deep)',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>{agSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                        <ArrowRight size={14} color="var(--color-gold-dark)" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* All Other Use Cases */}
                <div style={{
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                    All AI Use Cases
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {AI_USE_CASES.map((uc) => (
                      <Link
                        key={uc.slug}
                        to={`/ai/use-cases/${uc.slug}`}
                        style={{
                          fontSize: '0.88rem',
                          color: uc.slug === useCase.slug ? 'var(--color-gold-dark)' : 'var(--color-ink-muted)',
                          fontWeight: uc.slug === useCase.slug ? 700 : 500,
                          textDecoration: 'none',
                          padding: '6px 0',
                          borderBottom: '1px solid #F1F5F9',
                          display: 'block'
                        }}
                      >
                        {uc.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Use Case Directory View (if no slug or fallback)
  return (
    <div>
      <SeoHead 
        title="AI Use Cases for Real Estate | Nam Nilam AI"
        description="Discover proven real-world use cases for real estate AI agents in Tamil Nadu: lead qualification, WhatsApp automation, 30-day follow-up, and site visit acceleration."
        canonical="/ai/use-cases/real-estate-lead-qualification"
        breadcrumbs={[
          { label: 'AI Workforce', path: '/ai' },
          { label: 'Use Cases' }
        ]}
      />

      <Breadcrumbs items={[
        { label: 'AI Workforce', path: '/ai' },
        { label: 'Use Cases' }
      ]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <Workflow size={14} />
            <span>Operational Solutions</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Real Estate AI Use Cases
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Explore practical real-world workflows where AI agents take over repetitive sales, follow-ups, and communication for real estate businesses across Tamil Nadu.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid-2">
            {AI_USE_CASES.map((uc) => (
              <div key={uc.slug} style={{
                padding: '36px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-gold">{uc.badge}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> Ready in 7–14 Days
                  </span>
                </div>

                <h3 style={{ fontSize: '1.45rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                  {uc.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: 1.65, flexGrow: 1 }}>
                  {uc.summary}
                </p>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <Link to={`/ai/use-cases/${uc.slug}`} className="btn btn-outline btn-sm">
                    <span>Explore Workflow</span>
                    <ArrowRight size={14} />
                  </Link>
                  <button 
                    onClick={() => onOpenEnquiry(`Use Case: ${uc.title}`)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Deploy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
