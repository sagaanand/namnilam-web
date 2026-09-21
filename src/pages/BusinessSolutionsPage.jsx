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
  Sparkles,
  Crown,
  Gem,
  ShieldCheck,
  Bot,
  Check,
  Calendar,
  PhoneCall,
  Clock,
  HelpCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { 
  BUSINESS_SOLUTIONS, 
  BUSINESS_SOLUTIONS_PACKAGES, 
  BRAND_INFO 
} from '../data/ecosystemData';

const iconMap = {
  'one-time-solutions': Layers,
  'subscription-solutions': Clock,
  'ai-workforce': Bot,
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
        <SeoHead 
          title={`${solution.title} for Real Estate in Tamil Nadu | Nam Nilam`}
          description={solution.headline}
          canonical={`/business/${solution.slug}`}
          schemaType="Service"
          schemaData={{
            name: solution.title,
            description: solution.headline,
            provider: "Nam Nilam",
            areaServed: "Tamil Nadu, India"
          }}
        />
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

            {/* Pricing badge: No arbitrary numbers */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              backgroundColor: 'var(--color-gold-soft)',
              border: '1px solid var(--color-gold-border)',
              borderRadius: 'var(--radius-pill)',
              marginTop: '16px',
              fontSize: '0.92rem',
              fontWeight: 700,
              color: 'var(--color-gold-deep)'
            }}>
              <Sparkles size={16} color="var(--color-gold-dark)" />
              <span>Pricing: {solution.priceTag || 'Custom Quote / Talk to us'}</span>
            </div>

            <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenEnquiry(`Business Solution: ${solution.title}`)}
                className="btn btn-primary btn-lg"
              >
                <span>Request Custom Proposal / Demo</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I would like to enquire about ${solution.title} for my real estate business.`)}`}
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

                {/* AI integration banner if on AI solution */}
                {solution.slug === 'ai-workforce' && (
                  <div style={{
                    padding: '24px',
                    background: 'var(--gradient-gold-subtle)',
                    border: '1px solid var(--color-gold-border)',
                    borderRadius: 'var(--radius-lg)',
                    marginTop: '20px'
                  }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Bot size={20} color="var(--color-gold-dark)" />
                      Dedicated AI Workforce Showcase
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', marginBottom: '14px', lineHeight: 1.6 }}>
                      Want to test interactive voice & chat demos, inspect agent workflows, or view the 5 functional departments in detail? Visit our dedicated AI Portal.
                    </p>
                    <Link to="/ai" className="btn btn-dark btn-sm">
                      <span>Explore AI Workforce Portal</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Column: Deliverables & Impact */}
              <div>
                <div style={{
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'sticky',
                  top: '100px'
                }}>
                  <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Solution Package</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Key Deliverables</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-ink)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {solution.deliverables}
                  </p>

                  <div style={{
                    padding: '16px',
                    backgroundColor: 'var(--color-canvas)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '20px'
                  }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Expected Business Impact:
                    </strong>
                    <div style={{ fontSize: '0.88rem', color: 'var(--color-ink)', lineHeight: 1.6 }}>
                      ✓ 40%+ reduction in lead response latency<br />
                      ✓ Up to 3x increase in qualified site visits<br />
                      ✓ 100% accountability on sales team follow-up<br />
                      ✓ Zero lost leads across WhatsApp & social ads
                    </div>
                  </div>

                  <div style={{
                    padding: '14px',
                    backgroundColor: 'rgba(197, 160, 89, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--color-gold)',
                    marginBottom: '20px',
                    fontSize: '0.82rem',
                    color: 'var(--color-brand-deep)',
                    lineHeight: 1.5
                  }}>
                    <strong>Pricing Policy: </strong> No arbitrary figures. We provide custom quotations based on your layout inventory, sales team size, and tech integration needs.
                  </div>

                  <button 
                    onClick={() => onOpenEnquiry(`Consultation: ${solution.title}`)}
                    className="btn btn-primary btn-md"
                    style={{ width: '100%' }}
                  >
                    <span>Request Custom Quote</span>
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

  // Overview Page (/business)
  return (
    <div>
      <SeoHead 
        title="Real Estate Business Solutions & AI Digital Transformation | Nam Nilam"
        description="One-time solutions and subscription packages for real estate promoters and developers in Tamil Nadu. Featuring DIAMOND Pack and GOLD Pack with custom quotations."
        canonical="/business"
        schemaType="Service"
        schemaData={{
          name: "Nam Nilam Real Estate Business Solutions & Digital Transformation",
          description: "Digital marketing, lead generation, real estate CRM, WhatsApp business automation, and sales intelligence systems for builders and promoters in Tamil Nadu.",
          areaServed: "Tamil Nadu, India"
        }}
      />
      <Breadcrumbs items={[{ label: 'Business Solutions' }]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <Cpu size={14} />
            <span>Real Estate Business Solutions</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Scale Your Real Estate Sales & Operations.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px', lineHeight: 1.65 }}>
            We partner with layout developers, promoters, and marketing agencies across Tamil Nadu to implement high-converting digital infrastructure, automated CRM pipelines, and autonomous AI workforces.
          </p>

          {/* Pricing Assurance Banner */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '20px',
            padding: '12px 20px',
            backgroundColor: 'var(--color-surface-soft)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.88rem',
            color: 'var(--color-brand-deep)'
          }}>
            <ShieldCheck size={16} color="var(--color-accent-green)" />
            <span><strong>Transparent Pricing Policy:</strong> No arbitrary numbers. All solutions are quoted accurately based on your project inventory and team scope.</span>
          </div>
        </div>
      </section>

      {/* Flagship AI Workforce Spotlight */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '40px' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #0B1118 0%, #141E2B 60%, #1E293B 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 48px',
            color: '#FFFFFF',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid rgba(223, 186, 115, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, rgba(0,0,0,0) 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: 'rgba(223, 186, 115, 0.12)', border: '1px solid rgba(223, 186, 115, 0.3)', borderRadius: 'var(--radius-pill)', marginBottom: '16px' }}>
                <Bot size={15} color="#DFBA73" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#DFBA73', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Flagship Capability: Nested Inside Business Solutions
                </span>
              </div>

              <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '14px', lineHeight: 1.25 }}>
                Deploy an Autonomous Real Estate AI Workforce.
              </h2>

              <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '24px' }}>
                10 specialized AI agents working across 5 functional departments — Sales, WhatsApp triage, AI telecalling, automated site-visit dispatch, and revenue leak detection. Never let a buyer enquiry go unanswered.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/ai" className="btn btn-primary btn-md">
                  <Sparkles size={16} />
                  <span>Explore Dedicated AI Portal</span>
                  <ArrowRight size={14} />
                </Link>
                <button 
                  onClick={() => onOpenEnquiry('AI Workforce Architecture Consultation')}
                  className="btn btn-secondary btn-md"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                >
                  <MessageSquare size={16} />
                  <span>Talk to AI Solutions Architect</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIAMOND & GOLD Packages Section */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Crown size={14} />
              <span>Business Transformation Packages</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              Choose the Right Package for Your Scale
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)' }}>
              Whether you need a full enterprise engine or a focused solution to eliminate your primary sales bottleneck, we provide custom scoping and transparent engagement.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', maxWidth: '1060px', margin: '0 auto' }}>
            {BUSINESS_SOLUTIONS_PACKAGES.map((pkg) => {
              const isDiamond = pkg.id === 'diamond';

              return (
                <div 
                  key={pkg.id}
                  style={{
                    backgroundColor: isDiamond ? '#0F172A' : '#FFFFFF',
                    color: isDiamond ? '#FFFFFF' : 'var(--color-ink)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '36px 32px',
                    border: isDiamond ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                    boxShadow: isDiamond ? 'var(--shadow-xl)' : 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Top Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      backgroundColor: isDiamond ? 'rgba(223, 186, 115, 0.15)' : 'var(--color-gold-soft)',
                      border: isDiamond ? '1px solid var(--color-gold)' : '1px solid var(--color-gold-border)',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: isDiamond ? '#DFBA73' : 'var(--color-gold-deep)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {isDiamond ? <Gem size={14} /> : <Crown size={14} />}
                      <span>{pkg.badge}</span>
                    </div>

                    {isDiamond && (
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        backgroundColor: 'var(--color-gold)',
                        color: '#0B1118',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)',
                        textTransform: 'uppercase'
                      }}>
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '2rem', marginBottom: '6px', color: isDiamond ? '#FFFFFF' : 'var(--color-brand-deep)' }}>
                    {pkg.name} Pack
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: isDiamond ? '#94A3B8' : 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                    {pkg.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div style={{
                    padding: '16px 20px',
                    backgroundColor: isDiamond ? 'rgba(255,255,255,0.05)' : 'var(--color-canvas)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '28px',
                    border: isDiamond ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--color-border)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.7rem', fontWeight: 800, color: isDiamond ? '#DFBA73' : 'var(--color-brand-deep)', fontFamily: 'var(--font-mono)' }}>
                        {pkg.price}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: isDiamond ? '#CBD5E1' : 'var(--color-ink-muted)', display: 'block', marginTop: '4px' }}>
                      {pkg.priceSub}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: isDiamond ? '#E2E8F0' : 'var(--color-ink)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {pkg.description}
                  </p>

                  <div style={{ borderTop: isDiamond ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--color-border)', paddingTop: '20px', marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: isDiamond ? '#DFBA73' : 'var(--color-gold-dark)', marginBottom: '16px' }}>
                      What's Included:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {pkg.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                          <CheckCircle2 size={16} color={isDiamond ? '#DFBA73' : '#059669'} style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span style={{ color: isDiamond ? '#F1F5F9' : 'var(--color-ink)' }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <button 
                      onClick={() => onOpenEnquiry(`Business Package Enquiry: ${pkg.name} Pack`)}
                      className={isDiamond ? 'btn btn-primary btn-lg' : 'btn btn-dark btn-lg'}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>{pkg.cta}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two Delivery Models: One-Time vs Subscription */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Layers size={14} />
              <span>Two Flexible Engagement Models</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              One-Time Solutions or Ongoing Retainer?
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)' }}>
              Choose between rapid turnkey implementation or continuous partnership. Both models follow our strict transparent pricing policy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {/* Model 1: One-Time */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-dark)' }}>
                  <Layers size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-gold-dark)', textTransform: 'uppercase' }}>Model 1</span>
                  <h3 style={{ fontSize: '1.4rem' }}>One-Time Solutions</h3>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
                Ideal for promoters launching a single project, setting up their very first professional CRM, or needing official WhatsApp Business API configuration with turnkey staff handover.
              </p>

              <div style={{ backgroundColor: 'var(--color-canvas)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '0.88rem' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--color-brand-deep)' }}>Typical Engagements:</strong>
                <ul style={{ paddingLeft: '18px', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                  <li>Custom Landing Page & Ad Funnel Setup</li>
                  <li>Real Estate Cloud CRM Pipeline Onboarding</li>
                  <li>WhatsApp Business Green Tick API Setup</li>
                  <li>Digital Sales Presentation Collateral</li>
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Pricing Structure</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-brand-deep)' }}>Fixed Scope / Custom Quote</strong>
                </div>
                <Link to="/business/one-time-solutions" className="btn btn-dark btn-sm">
                  <span>Explore Scope</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Model 2: Subscriptions */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-green)' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-accent-green)', textTransform: 'uppercase' }}>Model 2</span>
                  <h3 style={{ fontSize: '1.4rem' }}>Subscription Solutions</h3>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
                Ongoing managed growth engine for active builders and developer consortiums who require continuous lead optimization, managed AI agents, and monthly revenue analytics.
              </p>

              <div style={{ backgroundColor: 'var(--color-canvas)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '0.88rem' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--color-brand-deep)' }}>Ongoing Deliverables:</strong>
                <ul style={{ paddingLeft: '18px', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                  <li>Continuous 24/7 AI Workforce Management</li>
                  <li>Weekly Ad Budget Optimization (Meta/Google)</li>
                  <li>Sales Pipeline Audit & Telecalling Logs Review</li>
                  <li>Dedicated Solutions Architect & Weekly Reviews</li>
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Pricing Structure</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-brand-deep)' }}>Monthly Retainer / Custom Quote</strong>
                </div>
                <Link to="/business/subscription-solutions" className="btn btn-dark btn-sm">
                  <span>Explore Scope</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Solutions Catalog */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Database size={14} />
              <span>Full Capabilities Directory</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              Specialized Real Estate Technology Modules
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)' }}>
              Explore individual services you can deploy independently or combine within our Diamond and Gold packages.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {BUSINESS_SOLUTIONS.map((sol) => {
              const Icon = iconMap[sol.slug] || Cpu;
              const gradientMap = {
                'one-time-solutions': 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                'subscription-solutions': 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
                'ai-workforce': 'linear-gradient(135deg, #0b1118 0%, #312e81 100%)',
                'digital-marketing': 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                'crm': 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
                'whatsapp-automation': 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)'
              };
              return (
                <div key={sol.slug} style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Image or gradient */}
                  <div style={{ height: '160px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    {sol.image ? (
                      <img
                        src={sol.image}
                        alt={sol.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: gradientMap[sol.slug] || 'linear-gradient(135deg, #0b1118 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={48} color="rgba(255,255,255,0.4)" />
                      </div>
                    )}
                    <span style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {sol.priceTag || 'Custom Quote'}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div className="journey-icon" style={{ width: 28, height: 28 }}>
                        <Icon size={14} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {sol.title}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', color: 'var(--color-brand-deep)', lineHeight: 1.4 }}>
                      {sol.headline}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginBottom: '16px', lineHeight: 1.55, flex: 1 }}>
                      {sol.solution}
                    </p>

                    <div style={{ marginTop: 'auto' }}>
                      <Link to={`/business/${sol.slug}`} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                        <span>Explore Solution Details</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Consultation Footer Banner */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            padding: '36px 40px',
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                Need a Custom Proposal for Your Project?
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                Schedule a 30-minute operational audit with our solutions engineering team. We'll evaluate your current sales funnel, CRM bottlenecks, and formulate a step-by-step proposal.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenEnquiry('Schedule Business Solutions Consultation')}
                className="btn btn-primary btn-md"
              >
                <span>Book 30-Min Audit</span>
                <ArrowRight size={14} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam, I would like to schedule an operational audit for our real estate business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-md"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Solutions</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
