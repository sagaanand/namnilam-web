import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  Target, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  Compass,
  FileCheck2,
  Phone
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BRAND_INFO } from '../data/ecosystemData';

export const AboutPage = ({ onOpenEnquiry }) => {
  const location = useLocation();

  const isStory = location.pathname.includes('our-story');
  const isApproach = location.pathname.includes('approach');

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'About', path: '/about' },
        ...(isStory ? [{ label: 'Our Story' }] : isApproach ? [{ label: 'Our Approach' }] : [])
      ]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <Compass size={14} />
            <span>About Nam Nilam</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            {isStory ? "Our Story & Purpose" : isApproach ? "The Nam Nilam Methodology" : "Real Estate Intelligence & Advisory"}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            {BRAND_INFO.subTagline} Rooted in Tiruchirappalli with advisory services extending across Tamil Nadu.
          </p>

          {/* Subpage Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '28px' }}>
            <Link 
              to="/about" 
              className={`btn btn-sm ${location.pathname === '/about' ? 'btn-primary' : 'btn-outline'}`}
            >
              Overview
            </Link>
            <Link 
              to="/about/our-story" 
              className={`btn btn-sm ${isStory ? 'btn-primary' : 'btn-outline'}`}
            >
              Our Story
            </Link>
            <Link 
              to="/about/approach" 
              className={`btn btn-sm ${isApproach ? 'btn-primary' : 'btn-outline'}`}
            >
              Our Approach (Methodology)
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section">
        <div className="container">
          {isApproach ? (
            /* Dedicated Methodology Page */
            <div>
              <div className="section-header text-left">
                <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
                  The 4-Step Advisory Framework
                </h2>
                <p style={{ color: 'var(--color-ink-muted)', fontSize: '1.05rem' }}>
                  Every real estate engagement follows a disciplined, data-first sequence to prevent costly errors.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div className="process-step" style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                  <div className="process-number">01</div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Understand</h3>
                    <p style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
                      We begin by deeply understanding the buyer, investor, or business objective. Is the purchase for self-construction, a 5-year investment horizon, or agricultural holding? We clarify financial boundaries, liquidity requirements, and risk appetite before assessing any property.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-brand-deep)' }}>
                      <span>✓ Purpose Identification</span>
                      <span>✓ Horizon & Liquidity Needs</span>
                      <span>✓ Budget & Registration Overhead</span>
                    </div>
                  </div>
                </div>

                <div className="process-step" style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                  <div className="process-number">02</div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Analyse</h3>
                    <p style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
                      We study on-ground evidence: recent sub-registrar registered transaction values in the exact ward, 30-year encumbrance certificates (EC), revenue patta records, FMB sketch measurements, groundwater yield, and upcoming infrastructure corridors (such as ring roads and transit hubs).
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-brand-deep)' }}>
                      <span>✓ 30-Year Encumbrance Audit</span>
                      <span>✓ Guideline vs Market Ratio</span>
                      <span>✓ Water Table & Soil Quality</span>
                    </div>
                  </div>
                </div>

                <div className="process-step" style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                  <div className="process-number">03</div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Advise</h3>
                    <p style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
                      We synthesize our findings into an actionable advisory report. We present a realistic fair value range, an uncompromised red-flag checklist, and negotiation benchmarks. We tell you clearly when to proceed and when to walk away.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-brand-deep)' }}>
                      <span>✓ Fair Value Price Bracket</span>
                      <span>✓ Red-Flag Legal Checkpoints</span>
                      <span>✓ Objective Buy / Pass Recommendation</span>
                    </div>
                  </div>
                </div>

                <div className="process-step" style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                  <div className="process-number">04</div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Execute</h3>
                    <p style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
                      Where requested, we support implementation. For individual buyers, we assist with site visits, transparent price negotiation, and sub-registrar documentation. For businesses, we build the marketing campaigns, CRM pipelines, and WhatsApp automation systems.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-brand-deep)' }}>
                      <span>✓ Document Verification Assistance</span>
                      <span>✓ Sub-Registrar Process Support</span>
                      <span>✓ Digital Transformation Deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isStory ? (
            /* Dedicated Our Story Page */
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>
                Why We Built Nam Nilam
              </h2>
              <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-ink-muted)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p>
                  For decades, real estate in Tamil Nadu has operated in an environment characterized by information asymmetry. Buyers and investors frequently encounter inflated price quotations, vague claims regarding approvals, and high-pressure sales tactics that prioritize immediate brokerage over long-term security.
                </p>
                <p>
                  Land buyers often discover critical legal issues — such as unapproved layouts lacking building permission, undisclosed encumbrances, or non-transferable revenue records — only after paying non-refundable advances.
                </p>
                <p>
                  <strong>Nam Nilam</strong> was established to provide an institutional counterweight. Headquartered in Tiruchirappalli, we operate as an independent advisory, research, education, and digital transformation company.
                </p>
                <p>
                  We are not an open listing portal advertising unverified properties. Instead, we combine rigorous on-ground due diligence with modern technology, educational programs, and business transformation solutions for developers.
                </p>
              </div>

              <div style={{ marginTop: '40px', padding: '32px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Registered Office:</h4>
                <p style={{ color: 'var(--color-ink)' }}>{BRAND_INFO.address}</p>
                <p style={{ marginTop: '6px', color: 'var(--color-gold-dark)', fontWeight: 700 }}>
                  Contact: {BRAND_INFO.phoneFormatted} • {BRAND_INFO.email}
                </p>
              </div>
            </div>
          ) : (
            /* General About Overview */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
                <div>
                  <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
                    Helping People Make Better Real-Estate Decisions.
                  </h2>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-ink-muted)', marginBottom: '18px' }}>
                    Nam Nilam brings structure, transparency, and data to the real estate sector. Our multi-disciplinary team brings together property analysts, legal advisors, and technology specialists to support buyers and businesses.
                  </p>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-ink-muted)' }}>
                    While our direct project developments are strictly located in Trichy, our advisory, intelligence, educational masterclasses, and digital business solutions serve clients across Tamil Nadu.
                  </p>
                </div>

                <div style={{
                  padding: '36px',
                  backgroundColor: 'var(--color-brand-deep)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(223, 186, 115, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Award size={24} color="#DFBA73" />
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>Our Guiding Principles</h3>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="#DFBA73" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span><strong>Truth Over Transaction:</strong> We prioritize factual clarity and buyer protection above closing deals.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="#DFBA73" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span><strong>Data-Backed Clarity:</strong> Every recommendation is supported by revenue records, sales comps, and ground reality.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="#DFBA73" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span><strong>No Speculative Claims:</strong> We never promise artificial returns or promote unapproved layouts.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <div style={{ marginTop: '48px', borderTop: '1px solid var(--color-border)', paddingTop: '48px' }}>
                <div className="section-header">
                  <h3 style={{ fontSize: '1.8rem' }}>Frequently Asked Questions</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Is Nam Nilam a broker or property listing portal?</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)' }}>
                      No. We are an independent intelligence and advisory firm. We do not operate open broker listings. We offer professional consultation, property valuation support, due diligence, and digital transformation services.
                    </p>
                  </div>
                  <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Where are your projects located?</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)' }}>
                      Our direct project developments are strictly located in Tiruchirappalli (Trichy). Advisory, education, and digital solutions serve clients across Tamil Nadu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
