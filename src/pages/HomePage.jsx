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
  Bot,
  Layers,
  Banknote,
  FileCheck2,
  Hammer
} from 'lucide-react';
import { BRAND_INFO, TRICHY_PROJECTS } from '../data/ecosystemData';
import { SeoHead } from '../components/common/SeoHead';

export const HomePage = ({ onOpenEnquiry }) => {
  return (
    <div>
      <SeoHead 
        title="Real Estate Intelligence & Advisory | Tamil Nadu"
        description="Real Estate Decisions, Backed by Intelligence. Advisory, intelligence, education and digital transformation for the real estate ecosystem across Tamil Nadu."
        canonical="/"
      />

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

            {/* Right Visual — Trichy Land Aerial Photo */}
            <div className="hero-right">
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
                border: '1px solid var(--color-border)'
              }}>
                <img
                  src="/hero-trichy-land.jpg"
                  alt="DTCP Approved Gated Layout in Trichy, Tamil Nadu"
                  style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                />
                {/* Overlay badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(11, 17, 24, 0.85)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#DFBA73', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>Featured Corridor</div>
                    <div style={{ fontSize: '0.95rem', color: '#FFFFFF', fontWeight: 700 }}>Trichy Highway Developments</div>
                  </div>
                  <span style={{ backgroundColor: '#059669', color: '#fff', borderRadius: 'var(--radius-pill)', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700 }}>DTCP Verified</span>
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
                  <span>View Projects</span>
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Option 2 */}
              <Link to="/services" className="journey-box">
                <div className="journey-icon">
                  <ShieldCheck size={24} />
                </div>
                <h3>I need Property Services</h3>
                <p>Bank loans, legal opinion vetting, and turnkey 9% construction consulting.</p>
                <span className="journey-link">
                  <span>Explore Services</span>
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Option 3 */}
              <Link to="/intelligence" className="journey-box">
                <div className="journey-icon">
                  <TrendingUp size={24} />
                </div>
                <h3>I need Market Intelligence</h3>
                <p>Independent property valuation, ₹199 market reports, and on-site infrastructure audits.</p>
                <span className="journey-link">
                  <span>Explore Intelligence</span>
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Option 4 */}
              <Link to="/academy" className="journey-box">
                <div className="journey-icon">
                  <GraduationCap size={24} />
                </div>
                <h3>I want to Learn Real Estate</h3>
                <p>2-Month Certified practitioner course and practical short-term verification masterclasses.</p>
                <span className="journey-link">
                  <span>Explore Academy</span>
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ECOSYSTEM: 4 PILLARS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Compass size={14} />
              <span>Core Business Architecture</span>
            </div>
            <h2 className="section-title">
              Everything You Need to Make a Better Real Estate Decision
            </h2>
            <p className="section-subtitle">
              Four specialized divisions delivering institutional-grade clarity, verification, education, and digital solutions for Tamil Nadu real estate.
            </p>
          </div>

          <div className="pillars-grid">
            {/* SERVICES */}
            <div className="pillar-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>01</span>
                <span className="badge badge-gold">Services</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                Real Estate Services
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '16px' }}>
                “From Planning to Execution”
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Loan Arrangement</span>
                  <strong style={{ color: 'var(--color-brand-deep)', fontSize: '0.9rem' }}>₹4,999</strong>
                </div>

                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Online Legal Opinion</span>
                  <strong style={{ color: 'var(--color-brand-deep)', fontSize: '0.9rem' }}>₹3,999</strong>
                </div>

                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block' }}>Construction Consulting & PM</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)' }}>From Planning to Handover</span>
                  </div>
                  <strong style={{ color: '#059669', fontSize: '0.9rem' }}>9% Fee</strong>
                </div>
              </div>

              <Link to="/services" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore Services</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* INTELLIGENCE */}
            <div className="pillar-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>02</span>
                <span className="badge badge-gold">Intelligence</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                Property Intelligence
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '16px' }}>
                “Know the Market Before You Decide.”
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Property Valuation</span>
                  <span style={{ color: 'var(--color-gold-dark)', fontSize: '0.82rem', fontWeight: 700 }}>Request Valuation</span>
                </div>

                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Market Data Report</span>
                  <strong style={{ color: 'var(--color-brand-deep)', fontSize: '0.9rem' }}>₹199</strong>
                </div>

                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block' }}>On-site Infra Valuation</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)' }}>Water, Soil, Grid Audit</span>
                  </div>
                  <strong style={{ color: 'var(--color-brand-deep)', fontSize: '0.9rem' }}>₹3,999</strong>
                </div>
              </div>

              <Link to="/intelligence" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore Intelligence</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* ACADEMY */}
            <div className="pillar-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>03</span>
                <span className="badge badge-gold">Academy</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                Nam Nilam Academy
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '16px' }}>
                “Learn Real Estate. Learn by Doing.”
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>Certified 2-Month Course</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                    <span>Offline: <strong style={{ color: 'var(--color-brand-deep)' }}>₹9,999</strong></span>
                    <span>Online: <strong style={{ color: 'var(--color-brand-deep)' }}>₹6,999</strong></span>
                  </div>
                </div>

                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>Practical Short Courses</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                    <span>Online: <strong style={{ color: 'var(--color-brand-deep)' }}>₹399</strong></span>
                    <span>Offline: <strong style={{ color: 'var(--color-brand-deep)' }}>₹999</strong></span>
                  </div>
                </div>
              </div>

              <Link to="/academy" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore Academy</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* BUSINESS SOLUTIONS */}
            <div className="pillar-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>04</span>
                <span className="badge badge-gold">Solutions</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                Business Solutions
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '16px' }}>
                “Scale Your Real Estate Enterprise”
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>Diamond Pack</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>All-in-One</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>Custom Quote • AI + CRM + Ads</span>
                </div>

                <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>Gold Pack</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>Focused Pack</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>Custom Quote • CRM or Automation</span>
                </div>

                <div style={{ padding: '8px 12px', backgroundColor: 'rgba(223, 186, 115, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(223, 186, 115, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>One-Time &amp; Subscriptions</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand-deep)' }}>Talk to Us</span>
                </div>
              </div>

              <Link to="/business" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore Business Solutions</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS (SEPARATE COMMERCIAL SECTION) */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="section-eyebrow">
                <MapPin size={14} />
                <span>Verified Commercial Developments</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--color-brand-deep)' }}>
                Featured Projects
              </h2>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', marginTop: '6px', maxWidth: '640px' }}>
                Authentic, data-driven residential layouts and agricultural land opportunities situated along Tiruchirappalli’s prime growth corridors.
              </p>
            </div>
            <Link to="/projects" className="btn btn-outline">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {TRICHY_PROJECTS.map((proj) => (
              <div key={proj.slug} className="project-card">
                <div className="project-img-wrapper" style={{ position: 'relative' }}>
                  <img src={proj.image} alt={proj.title} className="project-img" style={{ height: '210px', width: '100%', objectFit: 'cover' }} />
                  <span className="project-tag">{proj.status}</span>
                  <span className="project-rate-pill">{proj.rateSqft} / sq.ft</span>
                  {proj.emiAvailable && (
                    <span style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: '#059669', color: '#FFFFFF', padding: '3px 10px', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 700 }}>
                      EMI Available
                    </span>
                  )}
                </div>

                <div className="project-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    <MapPin size={13} />
                    <span>{proj.location}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginBottom: '16px', lineHeight: 1.55 }}>
                    {proj.overview.slice(0, 115)}...
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
                      <strong>{proj.approvalNo ? proj.approvalNo.split('|')[0].trim() : 'Approved Layout'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block' }}>Water Table</span>
                      <strong style={{ color: '#059669' }}>{proj.waterTable ? proj.waterTable.split(' ')[0] : 'Potable'}</strong>
                    </div>
                  </div>

                  {proj.guidelineValue && (
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-ink-muted)', marginBottom: '14px', background: 'rgba(0,0,0,0.02)', padding: '6px 10px', borderRadius: '4px' }}>
                      Govt Guideline Base: <strong>{proj.guidelineValue}</strong>
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <Link to={`/projects/${proj.slug}`} className="btn btn-dark btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
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

      {/* 5. NAM NILAM AI WORKFORCE HIGHLIGHT (SITTING INSIDE BUSINESS SOLUTIONS CAPABILITY) */}
      <section className="section section-dark">
        <div className="container">
          <div className="business-highlight-grid">
            <div>
              <div className="section-eyebrow">
                <Bot size={14} />
                <span>Flagship Capability • Enterprise AI Workforce</span>
              </div>
              <h2 className="section-title">
                Your Next Employee Doesn't Need a Desk. <br />
                <span className="text-gold">It Needs a Workflow.</span>
              </h2>
              <p className="section-subtitle">
                As part of our Business Solutions architecture, Nam Nilam deploys autonomous AI agents across 5 functional departments — handling lead qualification, 24/7 WhatsApp customer conversations, telecalling, and revenue leakage detection.
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
                  <span>Explore AI Workforce (/ai)</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/business" className="btn btn-outline-white btn-lg">
                  View Business Packages
                </Link>
              </div>
            </div>

            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid rgba(223, 186, 115, 0.25)',
              position: 'relative'
            }}>
              <img
                src="/ai-workforce.jpg"
                alt="Nam Nilam AI Workforce for Real Estate"
                style={{ width: '100%', height: '100%', minHeight: '380px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(11,17,24,0.95) 0%, transparent 100%)',
                padding: '32px 28px 28px'
              }}>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px' }}>5 Functional Departments</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Sales Workforce','Customer Comms','Operations','Decision Intel','Marketing'].map(d => (
                    <span key={d} style={{ backgroundColor: 'rgba(223,186,115,0.18)', border: '1px solid rgba(223,186,115,0.3)', color: '#DFBA73', borderRadius: 'var(--radius-pill)', padding: '3px 10px', fontSize: '0.73rem', fontWeight: 700 }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OPERATING METHODOLOGY */}
      <section className="section">
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

      {/* 7. FINAL CONVERSION CTA */}
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

export default HomePage;
