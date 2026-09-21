import React, { useState } from 'react';
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
  Clock,
  Banknote,
  Hammer,
  HardHat,
  Compass,
  FileSpreadsheet,
  Layers,
  Wrench,
  Check,
  Building,
  Info,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { SERVICES_CATALOG, BRAND_INFO } from '../data/ecosystemData';

const iconMap = {
  'loan-arrangement': Banknote,
  'online-legal-opinion': FileCheck2,
  'construction-services': Hammer,
  'property-valuation': Calculator,
  'real-estate-advisory': ShieldCheck,
  'due-diligence': FileCheck2,
  'investment-advisory': TrendingUp,
  'real-estate-consulting': Building2
};

const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

// Dedicated Deep-Dive Component for Construction Consulting & Project Management
const ConstructionConsultingView = ({ service, onOpenEnquiry }) => {
  const [budget, setBudget] = useState(3000000); // Default ₹30 Lakhs

  const fee = Math.round(budget * 0.09);
  const stage1 = Math.round(fee * 0.25);
  const stage2 = Math.round(fee * 0.30);
  const stage3 = Math.round(fee * 0.30);
  const stage4 = Math.round(fee * 0.15);

  const budgetPresets = [
    { label: '₹20 Lakhs', value: 2000000 },
    { label: '₹30 Lakhs (Standard)', value: 3000000 },
    { label: '₹45 Lakhs', value: 4500000 },
    { label: '₹60 Lakhs', value: 6000000 },
    { label: '₹1 Crore', value: 10000000 }
  ];

  return (
    <div>
      <SeoHead 
        title="Construction Consulting & Project Management | 9% Professional Fee | Nam Nilam Infra"
        description="Nam Nilam Infra Pvt Ltd provides end-to-end construction consulting and project management for residential & commercial builds in Tamil Nadu. 9% milestone fee."
        canonical="/services/construction-services"
        schemaType="Service"
        schemaData={{
          name: "Nam Nilam Construction Consulting & Project Management",
          description: "End-to-end construction consulting, engineering coordination, quality inspection, and project management.",
          provider: "Nam Nilam Infra Pvt Ltd",
          areaServed: "Tamil Nadu, India"
        }}
      />
      <Breadcrumbs items={[
        { label: 'Services', path: '/services' },
        { label: service.title }
      ]} />

      {/* Hero Header */}
      <section className="page-hero" style={{ paddingBottom: '48px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span className="badge badge-gold">
              <HardHat size={14} />
              <span>NAM NILAM INFRA PVT LTD</span>
            </span>
            <span className="badge badge-dark">
              9% Professional Fee
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Real Estate • Construction • Engineering • Project Management
            </span>
          </div>

          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '12px', lineHeight: 1.2 }}>
            Construction Consulting & Project Management
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '14px' }}>
            Professional oversight from planning to handover.
          </p>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '820px', lineHeight: 1.7 }}>
            One professional team for your entire construction journey. Nam Nilam coordinates planning, technical consultants, execution, quality, cost visibility, progress, and final handover.
          </p>

          {/* Slogan pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#0B1118',
            color: '#DFBA73',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-gold)',
            fontSize: '0.88rem',
            fontWeight: 800,
            letterSpacing: '0.08em'
          }}>
            <Compass size={16} color="#DFBA73" />
            <span>PLAN RIGHT. BUILD RIGHT. MONITOR EVERYTHING.</span>
          </div>

          {/* CTA & Fee Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '32px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '12px 24px',
              backgroundColor: 'var(--color-surface-soft)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Commercial Model</span>
              <strong style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', fontFamily: 'var(--font-mono)' }}>
                9% <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>of Approved Construction Cost</span>
              </strong>
            </div>

            <button 
              onClick={() => onOpenEnquiry('Construction Consulting & Project Management')}
              className="btn btn-primary btn-lg"
            >
              <span>Book Initial Consultation</span>
              <ArrowRight size={18} />
            </button>

            <a 
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam Infra, I would like to schedule a site feasibility and initial consultation for my construction project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageSquare size={18} />
              <span>WhatsApp Engineering Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service Overview & Strategic Role */}
      <section className="section section-alt" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Service Overview</span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
              Why Homeowners & Investors Need an Independent Management Team
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)', lineHeight: 1.8 }}>
              Nam Nilam Infra Pvt Ltd provides end-to-end construction consulting and project-management services for residential and selected commercial projects. Our role is to coordinate the technical, financial, execution, and quality aspects of construction so the client has <strong>one accountable professional team</strong> managing the project from beginning to completion.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '40px' }}>
            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', marginBottom: '10px' }}>
                <AlertCircle size={18} />
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>The Contractor Risk</strong>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                Without independent oversight, builders cut corners on reinforcement rebar spacing, concrete mix ratios, curing duration, and waterproofing coats — causing structural cracks and dampness.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', marginBottom: '10px' }}>
                <AlertCircle size={18} />
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Budget Inflation</strong>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                Contractors frequently quote artificially low upfront rates, only to hit clients with massive variations, hidden item charges, and material inflation halfway through construction.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'rgba(5, 150, 105, 0.08)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(5, 150, 105, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', marginBottom: '10px' }}>
                <CheckCircle2 size={18} />
                <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>The Nam Nilam Defense</strong>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink)', lineHeight: 1.6 }}>
                We act strictly as your professional representative: inspecting every stage, auditing all material bills and BOQs, tracking progress, and approving vendor payments only when quality passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 9 Comprehensive Management Stages */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Layers size={14} />
              <span>Full Scope of Work</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              The 9 Stages of Construction Management
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)' }}>
              From the initial soil test and feasibility study to final snag inspection and key handover — every stage is systematically managed and verified.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
            {service.stages && service.stages.map((stage) => (
              <div 
                key={stage.number}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-gold-soft)',
                    color: 'var(--color-gold-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    0{stage.number}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-brand-deep)', lineHeight: 1.3 }}>
                    {stage.title}
                  </h3>
                </div>

                {/* Subsections for Stage 4 (Execution Management) */}
                {stage.subsections ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {stage.subsections.map((sub, sIdx) => (
                      <div key={sIdx} style={{
                        padding: '14px',
                        backgroundColor: 'var(--color-canvas)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '3px solid var(--color-gold)'
                      }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--color-brand-deep)', display: 'block', marginBottom: '4px' }}>
                          {sub.name}
                        </strong>
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)', lineHeight: 1.5, margin: 0 }}>
                          {sub.details}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {stage.items.map((item, iIdx) => (
                      <div key={iIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', lineHeight: 1.55 }}>
                        <CheckCircle2 size={15} color="#059669" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: 'var(--color-ink)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Model: 9% Milestone Billing Structure */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Banknote size={14} />
              <span>Transparent Commercial Model</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              Nam Nilam Professional Fee: 9%
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)' }}>
              The professional fee is calculated on the approved construction cost and billed through <strong>four milestone-based payments</strong> aligned with construction progress.
            </p>
          </div>

          {/* Milestone Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {service.milestones && service.milestones.map((ms) => (
              <div 
                key={ms.stage}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-gold">Stage {ms.stage}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-gold-dark)', fontFamily: 'var(--font-mono)' }}>
                    {ms.allocation}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-brand-deep)', marginBottom: '12px', minHeight: '50px' }}>
                  {ms.title}
                </h4>

                <div style={{
                  padding: '10px 12px',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'var(--color-ink-muted)' }}>Effective Fee:</span>
                  <strong style={{ color: 'var(--color-brand-deep)', fontFamily: 'var(--font-mono)' }}>{ms.effectiveFee}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Fee Calculator & Official ₹30 Lakh Example */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--color-gold)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: '8px' }}>Interactive Fee Estimator</span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-brand-deep)' }}>
                  Estimate Your Project Management Fee
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
                  Standard baseline example: ₹30 Lakh approved construction cost = ₹2,70,000 total professional fee.
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Total Nam Nilam 9% Fee</span>
                <strong style={{ fontSize: '2rem', color: 'var(--color-brand-deep)', fontFamily: 'var(--font-mono)' }}>
                  {formatINR(fee)}
                </strong>
              </div>
            </div>

            {/* Quick Presets */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-brand-deep)', display: 'block', marginBottom: '8px' }}>
                Select Common Project Budgets or Drag Slider Below:
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {budgetPresets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setBudget(p.value)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      backgroundColor: budget === p.value ? 'var(--color-brand-deep)' : 'var(--color-canvas)',
                      color: budget === p.value ? '#FFFFFF' : 'var(--color-ink)',
                      border: budget === p.value ? '1px solid var(--color-brand-deep)' : '1px solid var(--color-border)'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)' }}>Approved Construction Cost:</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--color-gold-dark)', fontFamily: 'var(--font-mono)' }}>
                  {formatINR(budget)}
                </strong>
              </div>
              <input 
                type="range" 
                min="1000000" 
                max="15000000" 
                step="250000" 
                value={budget} 
                onChange={(e) => setBudget(Number(e.target.value))}
                style={{ width: '100%', height: '8px', accentColor: 'var(--color-gold-dark)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
                <span>₹10 Lakhs</span>
                <span>₹50 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹1.5 Crores</span>
              </div>
            </div>

            {/* Dynamic Milestone Allocation Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-canvas)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 16px' }}>Stage</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px' }}>Construction Milestone</th>
                    <th style={{ textAlign: 'center', padding: '12px 16px' }}>Fee Allocation</th>
                    <th style={{ textAlign: 'center', padding: '12px 16px' }}>Effective Fee</th>
                    <th style={{ textAlign: 'right', padding: '12px 16px' }}>Amount Billed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Stage 1</td>
                    <td style={{ padding: '12px 16px' }}>Planning, Design, Estimation & Foundation</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>25%</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>2.25%</td>
                    <td style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatINR(stage1)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Stage 2</td>
                    <td style={{ padding: '12px 16px' }}>Plinth & Structural Frame up to Roof Slab</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>30%</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>2.70%</td>
                    <td style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatINR(stage2)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Stage 3</td>
                    <td style={{ padding: '12px 16px' }}>Masonry, MEP, Plastering & Major Finishing</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>30%</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>2.70%</td>
                    <td style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatINR(stage3)}</td>
                  </tr>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Stage 4</td>
                    <td style={{ padding: '12px 16px' }}>Final Finishing, Inspection, Snagging & Handover</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>15%</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>1.35%</td>
                    <td style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatINR(stage4)}</td>
                  </tr>
                  <tr style={{ backgroundColor: 'var(--color-surface-soft)', fontWeight: 800 }}>
                    <td colSpan={2} style={{ padding: '14px 16px', color: 'var(--color-brand-deep)' }}>TOTAL</td>
                    <td style={{ textAlign: 'center', padding: '14px 16px' }}>100%</td>
                    <td style={{ textAlign: 'center', padding: '14px 16px' }}>9.00%</td>
                    <td style={{ textAlign: 'right', padding: '14px 16px', color: 'var(--color-brand-deep)', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>{formatINR(fee)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Clarifications Section */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Transparency & Boundaries</span>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-brand-deep)' }}>
                Commercial Clarifications
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', marginTop: '6px' }}>
                The 9% Nam Nilam professional fee is for professional construction consulting, engineering coordination, and project management services. It is separate from actual project construction expenditure unless a written proposal specifically states otherwise.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
              {service.commercialClarifications && service.commercialClarifications.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <strong style={{ fontSize: '1rem', color: 'var(--color-brand-deep)', display: 'block', marginBottom: '6px' }}>
                    {item.title}
                  </strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Slogan Banner & Final CTA */}
            <div style={{
              marginTop: '48px',
              padding: '36px 40px',
              backgroundColor: '#0B1118',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
              border: '1px solid var(--color-gold-border)',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <p style={{ fontSize: '0.85rem', color: '#DFBA73', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                NAM NILAM INFRA PVT LTD
              </p>
              <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '12px', letterSpacing: '0.04em' }}>
                PLAN RIGHT. BUILD RIGHT. MONITOR EVERYTHING.
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Speak with our chartered civil engineers and project management consultants in Trichy before pouring your foundation.
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => onOpenEnquiry('Construction Consulting & Project Management')}
                  className="btn btn-primary btn-md"
                >
                  <span>Request Project Feasibility Review</span>
                  <ArrowRight size={16} />
                </button>
                <a 
                  href={`tel:${BRAND_INFO.phone}`}
                  className="btn btn-secondary btn-md"
                  style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#FFFFFF' }}
                >
                  <span>Call {BRAND_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ServicesPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();

  // If slug is provided, render the specific service deep-dive
  const service = slug ? SERVICES_CATALOG.find(s => s.slug === slug) : null;

  if (slug && service) {
    // Specialized rich view for Construction Consulting & Project Management
    if (service.slug === 'construction-services') {
      return <ConstructionConsultingView service={service} onOpenEnquiry={onOpenEnquiry} />;
    }

    const Icon = iconMap[service.slug] || ShieldCheck;

    return (
      <div>
        <SeoHead 
          title={`${service.title} in Tamil Nadu | Nam Nilam Advisory`}
          description={service.desc}
          canonical={`/services/${service.slug}`}
          schemaType="Service"
          schemaData={{
            name: service.title,
            description: service.desc,
            provider: "Nam Nilam",
            areaServed: "Tamil Nadu, India"
          }}
        />
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

            {/* Service hero image */}
            {service.image && (
              <div style={{ marginTop: '32px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', maxHeight: '320px' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
                />
              </div>
            )}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span className="badge badge-gold">Tangible Deliverable</span>
                    {service.priceTag && (
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brand-deep)', backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-border)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                        {service.priceTag}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>What You Receive</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-ink)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {service.deliverables}
                  </p>

                  {service.pricingNote && (
                    <div style={{ padding: '12px 14px', backgroundColor: 'rgba(5, 150, 105, 0.08)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: '#065F46', marginBottom: '16px', lineHeight: 1.5 }}>
                      <strong>Pricing Terms: </strong> {service.pricingNote}
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', fontSize: '0.82rem', color: 'var(--color-ink-muted)' }}>
                    ⏱ Typical turnaround: <strong>2 – 4 Business Days</strong> following document receipt.
                  </div>

                  <button 
                    onClick={() => onOpenEnquiry(service.title)}
                    className="btn btn-primary btn-md"
                    style={{ width: '100%', marginTop: '20px' }}
                  >
                    <span>Request {service.title}</span>
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
      <SeoHead 
        title="Real Estate Advisory & Services Tamil Nadu | Nam Nilam"
        description="Independent real estate advisory, property valuation, legal due diligence verification, and construction project management across Tamil Nadu."
        canonical="/services"
        schemaType="Service"
        schemaData={{
          name: "Nam Nilam Real Estate Advisory & Valuation Services",
          description: "Independent real estate advisory, property valuation, legal due diligence verification, and construction project management across Tamil Nadu.",
          areaServed: "Tamil Nadu, India"
        }}
      />
      <Breadcrumbs items={[{ label: 'Services' }]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <ShieldCheck size={14} />
            <span>Real Estate Services & Advisory</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            From Planning to Handover.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Comprehensive institutional property services: bank loan arrangement, online legal opinion, independent market valuation, and 9% turnkey construction management across Tamil Nadu.
          </p>

          {/* Advisory hero image */}
          <div style={{ marginTop: '32px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', maxHeight: '340px' }}>
            <img
              src="/advisory-meeting.jpg"
              alt="Professional real estate advisory consultation in Tamil Nadu"
              style={{ width: '100%', height: '340px', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
            {SERVICES_CATALOG.map((item) => {
              const Icon = iconMap[item.slug] || ShieldCheck;
              return (
                <div key={item.slug} style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Service Image */}
                  {item.image && (
                    <div style={{ height: '200px', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  )}

                  {/* Card Body */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
                      <span className="badge badge-gold">
                        <Icon size={12} />
                        {item.shortTitle || item.title}
                      </span>
                      {item.priceTag && (
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-brand-deep)', backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-border)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                          {item.priceTag}
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', lineHeight: 1.4 }}>
                      {item.headline}
                    </h2>

                    <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '16px', lineHeight: 1.6, flex: 1 }}>
                      {item.desc}
                    </p>

                    <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '16px' }}>
                      <strong style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Deliverable:</strong>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-ink)', lineHeight: 1.5, margin: 0 }}>{item.deliverables}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <Link to={`/services/${item.slug}`} className="btn btn-primary btn-sm">
                        <span>View Details & Scope</span>
                        <ArrowRight size={14} />
                      </Link>
                      <button
                        onClick={() => onOpenEnquiry(item.title)}
                        className="btn btn-outline btn-sm"
                      >
                        Enquire
                      </button>
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
