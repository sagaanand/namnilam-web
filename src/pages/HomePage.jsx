import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  GraduationCap, 
  Cpu, 
  MapPin, 
  Building2, 
  FileText, 
  MessageSquare, 
  Compass, 
  Calculator, 
  Sparkles,
  CheckCircle2,
  Phone,
  Bot
} from 'lucide-react';
import { BRAND_INFO, TRICHY_PROJECTS, SERVICES_CATALOG, INTELLIGENCE_ARTICLES } from '../data/ecosystemData';

export const HomePage = ({ onOpenEnquiry }) => {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="section-eyebrow">
                <ShieldCheck size={14} />
                <span>Tamil Nadu Real Estate Intelligence & Advisory</span>
              </div>

              <h1 className="hero-headline">
                Real Estate Decisions, <br />
                <span className="text-gold">Backed by Intelligence.</span>
              </h1>

              <p className="hero-subhead">
                {BRAND_INFO.subTagline} We help buyers, investors, and real-estate businesses make informed, legally sound, and profitable moves.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => onOpenEnquiry('Expert Consultation')}
                  className="btn btn-primary btn-lg"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight size={16} />
                </button>
                <Link to="/services" className="btn btn-outline btn-lg">
                  Explore Our Services
                </Link>
              </div>

              {/* Direct Office Desk Badge */}
              <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#059669', display: 'inline-block' }}></span>
                <span>Direct Advisory Desk: <strong>{BRAND_INFO.phoneFormatted}</strong> • Registered Office: Melachinthamani, Trichy</span>
              </div>
            </div>

            {/* Right Visual Emblem Card */}
            <div className="hero-right">
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '40px',
                boxShadow: 'var(--shadow-xl)',
                textAlign: 'center',
                position: 'relative'
              }}>
                <img 
                  src="/nam-nilam-logo.png" 
                  alt="Nam Nilam Emblem" 
                  style={{ width: '160px', height: '160px', margin: '0 auto 24px auto', display: 'block', objectFit: 'contain' }}
                />

                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                  The Nam Nilam Standard
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '24px' }}>
                  A multi-disciplinary real estate firm providing independent advisory, market research, professional education, and business transformation.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '20px',
                  textAlign: 'left'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Primary Hub</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-brand-deep)' }}>Trichy, Tamil Nadu</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Services Reach</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-brand-deep)' }}>Across Tamil Nadu</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR JOURNEY (AUDIENCE SELECTOR) */}
      <section style={{ position: 'relative', marginTop: '-36px', zIndex: 10 }}>
        <div className="container">
          <div className="journey-selector-card">
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <span className="badge badge-gold" style={{ marginBottom: '6px' }}>Choose Your Path</span>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-brand-deep)' }}>
                What are you looking for today?
              </h2>
            </div>

            <div className="journey-grid">
              {/* Option 1 */}
              <Link to="/projects" className="journey-box">
                <div className="journey-icon">
                  <MapPin size={24} />
                </div>
                <h3>I want to Buy / Invest</h3>
                <p>Explore verified layout developments and plot investment corridors in Trichy.</p>
                <span className="journey-link">
                  <span>View Trichy Projects</span>
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Option 2 */}
              <Link to="/services/real-estate-advisory" className="journey-box">
                <div className="journey-icon">
                  <ShieldCheck size={24} />
                </div>
                <h3>I need Property Advice</h3>
                <p>Objective guidance on land valuation, legal due diligence, and buying decisions.</p>
                <span className="journey-link">
                  <span>Explore Advisory</span>
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Option 3 */}
              <Link to="/ai" className="journey-box">
                <div className="journey-icon">
                  <Bot size={24} />
                </div>
                <h3>Nam Nilam AI Workforce</h3>
                <p>Deploy AI agents for lead qualification, 24/7 WhatsApp, telecalling, and revenue leakage detection.</p>
                <span className="journey-link">
                  <span>Explore AI Workforce</span>
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Option 4 */}
              <Link to="/academy" className="journey-box">
                <div className="journey-icon">
                  <GraduationCap size={24} />
                </div>
                <h3>I want to Learn Real Estate</h3>
                <p>Structured courses, masterclasses, and practical guides on land buying and due diligence.</p>
                <span className="journey-link">
                  <span>Explore Academy</span>
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT NAM NILAM DOES (4 HIGH-LEVEL PILLARS) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Compass size={14} />
              <span>Core Ecosystem</span>
            </div>
            <h2 className="section-title">
              Four Specialized Pillars. One Uncompromising Standard.
            </h2>
            <p className="section-subtitle">
              We bridge the gap between on-ground real estate realities and institutional-grade intelligence.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="journey-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Real Estate Advisory</h3>
              <p>Make better property and investment decisions with independent evaluation and valuation support.</p>
              <Link to="/services" className="journey-link" style={{ marginTop: 'auto' }}>
                <span>Learn More</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="journey-icon">
                <TrendingUp size={24} />
              </div>
              <h3>Real Estate Intelligence</h3>
              <p>Understand micro-markets, infrastructure corridors, and historical land price trajectories.</p>
              <Link to="/intelligence" className="journey-link" style={{ marginTop: 'auto' }}>
                <span>Explore Data</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="journey-icon">
                <GraduationCap size={24} />
              </div>
              <h3>Real Estate Education</h3>
              <p>Empower yourself through structured courses, document verification tutorials, and workshops.</p>
              <Link to="/academy" className="journey-link" style={{ marginTop: 'auto' }}>
                <span>View Courses</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="journey-icon">
                <Bot size={24} />
              </div>
              <h3>AI Workforce for Real Estate</h3>
              <p>Turn repetitive sales, telecalling, WhatsApp, and CRM tasks into an intelligent autonomous workforce.</p>
              <Link to="/ai" className="journey-link" style={{ marginTop: 'auto' }}>
                <span>Deploy AI Workforce</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL ESTATE INTELLIGENCE HIGHLIGHT */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="section-eyebrow">
                <TrendingUp size={14} />
                <span>Market Intelligence</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--color-brand-deep)' }}>
                Understand the Market Before You Make the Move.
              </h2>
            </div>
            <Link to="/intelligence" className="btn btn-outline">
              <span>View All Market Intelligence</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="cards-grid-4">
            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Market Insight</span>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Tamil Nadu Growth Corridors</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                Macro economic factors driving suburban land appreciation in Central and Southern TN.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Location Insight</span>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Trichy Expansion Zones</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                Detailed zoning, transit links, and groundwater suitability across Trichy's arterial roads.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Price Insight</span>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Guideline vs Market Value</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                Realistic price spreads and stamp duty calculations to avoid costly registration surprises.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Infrastructure</span>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Semi-Ring Road Impact</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                Analysis of road and transit connectivity unlocking logistics and residential parcels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NAM NILAM AI WORKFORCE HIGHLIGHT */}
      <section className="section section-dark">
        <div className="container">
          <div className="business-highlight-grid">
            <div>
              <div className="section-eyebrow">
                <Bot size={14} />
                <span>Nam Nilam AI • Enterprise Real Estate Workforce</span>
              </div>
              <h2 className="section-title">
                Your Next Employee Doesn't Need a Desk. <br />
                <span className="text-gold">It Needs a Workflow.</span>
              </h2>
              <p className="section-subtitle">
                Turn repetitive sales, marketing, customer communication, and business intelligence tasks into intelligent workflows that work alongside your team.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '32px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#DFBA73" />
                  <span style={{ fontSize: '0.92rem' }}>AI Sales &amp; Qualification</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#DFBA73" />
                  <span style={{ fontSize: '0.92rem' }}>24/7 WhatsApp API Agent</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#DFBA73" />
                  <span style={{ fontSize: '0.92rem' }}>AI Outbound Telecalling</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#DFBA73" />
                  <span style={{ fontSize: '0.92rem' }}>Revenue Leakage Auditing</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/ai" className="btn btn-primary btn-lg">
                  <span>Explore 10 AI Agents</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/ai" className="btn btn-outline-white btn-lg">
                  Find Your AI Employee
                </Link>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(223, 186, 115, 0.25)',
              padding: '36px',
              borderRadius: 'var(--radius-xl)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>
                  5 Functional Departments
                </h3>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>Ready to Deploy</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#CBD5E1' }}>
                <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <strong style={{ color: '#DFBA73' }}>01. Sales Workforce:</strong> Instant qualification under 10s, Day 0–30 follow-up, and automated outbound calling.
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <strong style={{ color: '#DFBA73' }}>02. Customer Communication:</strong> 24/7 WhatsApp API booking, brochures, and layout document support.
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <strong style={{ color: '#DFBA73' }}>03. Operations:</strong> Conversational CRM copilot by voice and 8:00 AM daily executive morning brief.
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <strong style={{ color: '#DFBA73' }}>04. Decision Intelligence:</strong> Spot uncalled leads, pipeline bottlenecks, and leaking sales revenue.
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <strong style={{ color: '#DFBA73' }}>05. Marketing Workforce:</strong> High-converting property ad angles and real estate campaign architecture.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR PROJECTS IN TRICHY (STRICTLY TRICHY) */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="section-eyebrow">
                <MapPin size={14} />
                <span>Featured Developments</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--color-brand-deep)' }}>
                Our Projects in Trichy
              </h2>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
                Curated DTCP-approved gated layouts in high-growth arterial corridors of Tiruchirappalli.
              </p>
            </div>
            <Link to="/projects" className="btn btn-outline">
              <span>View All Trichy Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="trichy-projects-grid">
            {TRICHY_PROJECTS.map((proj) => (
              <div key={proj.slug} className="project-card">
                <div className="project-img-wrapper">
                  <img src={proj.image} alt={proj.title} className="project-img" />
                  <span className="project-tag">{proj.status}</span>
                  <span className="project-rate-pill">{proj.rateSqft} / sq.ft</span>
                </div>

                <div className="project-body">
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <MapPin size={13} />
                    <span>{proj.location}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '16px', lineHeight: 1.55 }}>
                    {proj.overview.slice(0, 110)}...
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    padding: '10px',
                    backgroundColor: 'var(--color-canvas)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    marginBottom: '18px'
                  }}>
                    <div>
                      <span style={{ color: '#64748B', display: 'block' }}>Approval</span>
                      <strong>DTCP Approved</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block' }}>Water Table</span>
                      <strong style={{ color: '#059669' }}>{proj.waterTable.split(' ')[0]}</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <Link to={`/projects/${proj.slug}`} className="btn btn-dark btn-sm" style={{ flex: 1 }}>
                      <span>View Project</span>
                      <ArrowRight size={14} />
                    </Link>
                    <a 
                      href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello, I am interested in ${proj.title} in Trichy.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY NAM NILAM (THE METHODOLOGY) */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <ShieldCheck size={14} />
              <span>Operating Philosophy</span>
            </div>
            <h2 className="section-title">
              Understand → Analyse → Advise → Execute
            </h2>
            <p className="section-subtitle">
              How we approach every real estate consultation, investment decision, and client relationship.
            </p>
          </div>

          <div className="cards-grid-4">
            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>01</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Understand</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)' }}>
                We understand the buyer's objective, budget constraints, holding horizon, and true risk tolerance.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>02</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Analyse</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)' }}>
                We scrutinize sub-registrar registries, guideline records, 30-year ECs, groundwater, and infrastructure catalysts.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>03</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Advise</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)' }}>
                We deliver objective recommendations, fair price ranges, and red-flag checklists with complete independence.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>04</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Execute</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)' }}>
                Where applicable, we guide seamless implementation: site visits, fair negotiations, and title transfers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CONVERSION CTA */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--color-brand-deep)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '56px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
            border: '1px solid rgba(223, 186, 115, 0.3)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '14px', background: 'rgba(223, 186, 115, 0.15)', color: '#FFFFFF' }}>
                <Sparkles size={12} color="#DFBA73" />
                Direct Real Estate Guidance
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '12px' }}>
                Have a Real Estate Question?
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                Tell us what you're trying to achieve. Whether you are buying land in Trichy, need valuation clarity, or want to grow your real estate business, we're here to help.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '240px' }}>
              <button 
                onClick={() => onOpenEnquiry('General Consultation')}
                className="btn btn-primary btn-lg"
              >
                <span>Talk to Nam Nilam</span>
                <ArrowRight size={16} />
              </button>

              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam, I have a property query.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Us ({BRAND_INFO.phoneFormatted})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
