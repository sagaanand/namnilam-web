import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Workflow, 
  BarChart3, 
  MessageSquare, 
  PhoneCall, 
  Clock, 
  Database, 
  ShieldAlert, 
  SunMedium, 
  Zap, 
  Target, 
  Send,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AI_WORKFORCE_DATA, AI_CATEGORIES, BRAND_INFO } from '../data/ecosystemData';

const categoryIcons = {
  Sales: Zap,
  Customer: MessageSquare,
  Operations: Database,
  Intelligence: TrendingUp,
  Marketing: Target
};

export const AiWorkforcePage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSimulator, setActiveSimulator] = useState('whatsapp');
  const [wizardPainPoint, setWizardPainPoint] = useState('response_time');

  // Single Agent View if slug is present
  const singleAgent = slug ? AI_WORKFORCE_DATA.find(a => a.slug === slug) : null;

  if (slug && singleAgent) {
    const CatIcon = categoryIcons[singleAgent.category] || Bot;

    return (
      <div>
        <Breadcrumbs items={[
          { label: 'AI Workforce', path: '/ai' },
          { label: singleAgent.title }
        ]} />

        {/* Single Agent Hero */}
        <section className="page-hero">
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">
                <CatIcon size={12} />
                {singleAgent.category} Department
              </span>
              <span className="badge badge-dark">
                {singleAgent.badge}
              </span>
            </div>

            <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
              {singleAgent.title}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginBottom: '12px' }}>
              {singleAgent.headline}
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-muted)', maxWidth: '780px', lineHeight: 1.65 }}>
              {singleAgent.tagline}
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onOpenEnquiry(`Deploy ${singleAgent.title}`)}
                className="btn btn-primary btn-lg"
              >
                <span>Deploy This AI Agent</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam AI, I would like to see a live demo of ${singleAgent.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={16} />
                <span>Talk to AI Solutions Architect</span>
              </a>
              <Link to="/ai" className="btn btn-outline btn-lg">
                View All 10 AI Agents
              </Link>
            </div>
          </div>
        </section>

        {/* The 5 Business Questions Deep Dive */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '48px', alignItems: 'flex-start' }} className="service-overview-grid">
              <div>
                {/* 1. What problem does it solve? */}
                <div style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626', marginBottom: '12px' }}>
                    <AlertCircle size={20} />
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)' }}>1. What Problem Does It Solve?</h3>
                  </div>
                  <p style={{ fontSize: '0.98rem', color: 'var(--color-ink)', lineHeight: 1.7 }}>
                    {singleAgent.problem}
                  </p>
                </div>

                {/* 2. What does the AI actually do? */}
                <div style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-gold-dark)', marginBottom: '12px' }}>
                    <Bot size={20} />
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)' }}>2. What Does the AI Actually Do?</h3>
                  </div>
                  <p style={{ fontSize: '0.98rem', color: 'var(--color-ink)', lineHeight: 1.7 }}>
                    {singleAgent.aiAction}
                  </p>
                </div>

                {/* 3. How does it work with your existing team? */}
                <div style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', marginBottom: '12px' }}>
                    <Users size={20} />
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)' }}>3. How Does It Work With Your Team?</h3>
                  </div>
                  <p style={{ fontSize: '0.98rem', color: 'var(--color-ink)', lineHeight: 1.7 }}>
                    {singleAgent.teamCollaboration}
                  </p>
                </div>

                {/* 4. What business process does it automate? */}
                <div style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-brand-deep)', marginBottom: '16px' }}>
                    <Workflow size={20} />
                    <h3 style={{ fontSize: '1.25rem' }}>4. What Business Process Does It Automate?</h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {singleAgent.workflow.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--gradient-gold)', color: '#0B1118', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {idx + 1}
                        </div>
                        <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-brand-deep)' }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Measurable Metrics & Live Simulation */}
              <div>
                {/* 5. Measurable Outcomes & ROI */}
                <div style={{
                  padding: '32px',
                  backgroundColor: 'var(--color-brand-deep)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: '32px',
                  border: '1px solid rgba(223, 186, 115, 0.3)',
                  boxShadow: 'var(--shadow-xl)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <BarChart3 size={22} color="#DFBA73" />
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>5. Measurable Outcomes to Track</h3>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {singleAgent.metrics.map((metric, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                        <CheckCircle2 size={16} color="#DFBA73" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => onOpenEnquiry(`Deploy ${singleAgent.title}`)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Request Deployment Plan</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Workflow Simulation Box */}
                <div style={{
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <Sparkles size={16} color="var(--color-gold-dark)" />
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-brand-deep)' }}>Live Workflow Simulation</h4>
                  </div>

                  {singleAgent.simulation.type === 'chat' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                      <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-canvas)', borderRadius: '14px 14px 14px 2px', border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}>
                        <strong style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '4px' }}>Buyer:</strong>
                        "{singleAgent.simulation.customer}"
                      </div>
                      <div style={{ padding: '12px 16px', backgroundColor: 'rgba(197, 160, 89, 0.12)', border: '1px solid var(--color-gold-border)', borderRadius: '14px 14px 2px 14px', color: 'var(--color-brand-deep)' }}>
                        <strong style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gold-dark)', marginBottom: '4px', fontWeight: 700 }}>{singleAgent.title}:</strong>
                        "{singleAgent.simulation.aiReply}"
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, padding: '8px', backgroundColor: '#DCFCE7', borderRadius: 'var(--radius-sm)' }}>
                        ✓ {singleAgent.simulation.outcome}
                      </div>
                    </div>
                  )}

                  {singleAgent.simulation.type === 'cadence' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                      {singleAgent.simulation.cadence.map((c, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                          <strong style={{ color: 'var(--color-gold-dark)', width: '60px', flexShrink: 0 }}>{c.day}:</strong>
                          <span>{c.action}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {singleAgent.simulation.type === 'voice_log' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Scenario: {singleAgent.simulation.scenario}</div>
                      {singleAgent.simulation.transcript.map((t, i) => (
                        <div key={i} style={{ padding: '8px 12px', backgroundColor: t.speaker === 'AI Agent' ? 'rgba(197, 160, 89, 0.1)' : 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                          <strong>{t.speaker}:</strong> "{t.text}"
                        </div>
                      ))}
                      <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginTop: '4px' }}>
                        ✓ {singleAgent.simulation.result}
                      </div>
                    </div>
                  )}

                  {singleAgent.simulation.type === 'brief' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>{singleAgent.simulation.date}</div>
                      {singleAgent.simulation.report.map((r, i) => (
                        <div key={i} style={{ padding: '8px 10px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                          {r}
                        </div>
                      ))}
                    </div>
                  )}

                  {singleAgent.simulation.type === 'leakage_alert' && (
                    <div style={{ fontSize: '0.85rem' }}>
                      <div style={{ padding: '10px 12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#B91C1C', fontWeight: 700, borderRadius: 'var(--radius-sm)', marginBottom: '8px' }}>
                        {singleAgent.simulation.alert}
                      </div>
                      <p style={{ color: 'var(--color-ink-muted)', marginBottom: '10px', lineHeight: 1.5 }}>
                        {singleAgent.simulation.details}
                      </p>
                      <div style={{ padding: '8px 10px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)', color: 'var(--color-brand-deep)', fontWeight: 600 }}>
                        Action: {singleAgent.simulation.recommendation}
                      </div>
                    </div>
                  )}

                  {singleAgent.simulation.type === 'bi_query' && (
                    <div style={{ fontSize: '0.85rem' }}>
                      <div style={{ padding: '8px 12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)', marginBottom: '10px' }}>
                        <strong>Question:</strong> "{singleAgent.simulation.query}"
                      </div>
                      <div style={{ padding: '10px 12px', backgroundColor: 'rgba(197, 160, 89, 0.1)', borderRadius: 'var(--radius-sm)', marginBottom: '10px', lineHeight: 1.5 }}>
                        <strong>AI Diagnosis:</strong> {singleAgent.simulation.aiAnalysis}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
                        Recommendation: {singleAgent.simulation.actionPlan}
                      </div>
                    </div>
                  )}

                  {singleAgent.simulation.type === 'marketing_brief' && (
                    <div style={{ fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                        {singleAgent.simulation.campaign}
                      </div>
                      {singleAgent.simulation.angles.map((a, i) => (
                        <div key={i} style={{ padding: '8px 10px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)', marginBottom: '6px' }}>
                          <strong style={{ color: 'var(--color-gold-dark)' }}>{a.angle}:</strong> {a.headline}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Filtered List of Agents for Overview
  const filteredAgents = selectedCategory === 'all' 
    ? AI_WORKFORCE_DATA 
    : AI_WORKFORCE_DATA.filter(a => a.category.toLowerCase() === selectedCategory);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'AI Workforce' }]} />

      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="section-eyebrow">
                <Bot size={14} />
                <span>Nam Nilam AI • Enterprise Workforce</span>
              </div>

              <h1 className="hero-headline">
                Your Next Employee <br />
                <span className="text-gold">Doesn't Need a Desk.</span> <br />
                It Needs a Workflow.
              </h1>

              <p className="hero-subhead">
                <strong>Nam Nilam AI: AI Workforce for Modern Real Estate Businesses.</strong> Turn repetitive sales, marketing, customer communication, and business intelligence tasks into intelligent workflows that work alongside your team.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="#workforce-catalog" className="btn btn-primary btn-lg">
                  <span>Explore AI Workforce (10 Agents)</span>
                  <ArrowRight size={16} />
                </a>
                <button 
                  onClick={() => onOpenEnquiry('AI Workforce Strategy Consultation')}
                  className="btn btn-outline btn-lg"
                >
                  Talk to Nam Nilam AI
                </button>
              </div>

              {/* Value Metrics Pills */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '36px', flexWrap: 'wrap' }}>
                <div style={{ padding: '10px 16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Response Time</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-brand-deep)' }}>Under 10s</strong>
                </div>
                <div style={{ padding: '10px 16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Follow-up Rate</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-brand-deep)' }}>100% Cadence</strong>
                </div>
                <div style={{ padding: '10px 16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Site Visits</span>
                  <strong style={{ fontSize: '1.1rem', color: '#059669' }}>+35% Lift</strong>
                </div>
                <div style={{ padding: '10px 16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Desk Space</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-gold-dark)' }}>Zero Overhead</strong>
                </div>
              </div>
            </div>

            {/* Right Visual Architecture Card */}
            <div className="hero-right">
              <div style={{
                backgroundColor: 'var(--color-brand-deep)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '36px',
                border: '1px solid rgba(223, 186, 115, 0.3)',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Cpu size={18} color="#DFBA73" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#DFBA73', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      AI Workforce Architecture
                    </span>
                  </div>
                  <span className="badge badge-gold" style={{ background: 'rgba(223, 186, 115, 0.15)', color: '#DFBA73' }}>
                    5 Core Departments
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#FFFFFF', display: 'block' }}>1. SALES WORKFORCE</strong>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>AI Sales Agent • AI Follow-Up Agent • AI Calling Agent</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>3 Agents</span>
                  </div>

                  <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#FFFFFF', display: 'block' }}>2. CUSTOMER COMMUNICATION</strong>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>AI WhatsApp Agent • AI Customer Support Agent</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>2 Agents</span>
                  </div>

                  <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#FFFFFF', display: 'block' }}>3. OPERATIONS & CRM</strong>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>AI CRM Copilot • AI Morning Business Brief</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>2 Agents</span>
                  </div>

                  <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#FFFFFF', display: 'block' }}>4. DECISION INTELLIGENCE</strong>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>AI Revenue Leakage Agent • AI Business Intelligence</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>2 Agents</span>
                  </div>

                  <div style={{ padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#FFFFFF', display: 'block' }}>5. MARKETING WORKFORCE</strong>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>AI Marketing Workforce &amp; Ad Angle Engine</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>1 Agent</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', fontSize: '0.82rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Custom engineered for Indian Real Estate Promoters &amp; Agencies.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIND YOUR FIRST AI EMPLOYEE (RECOMMENDATION WIZARD) */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Target size={14} />
              <span>Operational Bottleneck Matcher</span>
            </div>
            <h2 className="section-title">
              Find Your First AI Employee
            </h2>
            <p className="section-subtitle">
              Select your company’s biggest operational hurdle right now to find the exact AI agent built to solve it.
            </p>
          </div>

          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }} className="cards-grid-3">
              <button 
                onClick={() => setWizardPainPoint('response_time')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: wizardPainPoint === 'response_time' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: wizardPainPoint === 'response_time' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--color-brand-deep)' }}>
                  ⚡ Slow First Response
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                  Leads wait hours before a salesperson calls or messages.
                </div>
              </button>

              <button 
                onClick={() => setWizardPainPoint('whatsapp_247')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: wizardPainPoint === 'whatsapp_247' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: wizardPainPoint === 'whatsapp_247' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--color-brand-deep)' }}>
                  💬 WhatsApp Night/Weekend Drop
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                  Night &amp; Sunday queries sit unanswered until Monday morning.
                </div>
              </button>

              <button 
                onClick={() => setWizardPainPoint('missed_followups')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: wizardPainPoint === 'missed_followups' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: wizardPainPoint === 'missed_followups' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--color-brand-deep)' }}>
                  🔁 Broken Follow-Up Cadence
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                  Sales team stops following up after 1-2 attempts.
                </div>
              </button>

              <button 
                onClick={() => setWizardPainPoint('cold_database')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: wizardPainPoint === 'cold_database' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: wizardPainPoint === 'cold_database' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--color-brand-deep)' }}>
                  📞 500+ Dormant Leads Uncalled
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                  Huge lead database sitting idle because telecallers are overwhelmed.
                </div>
              </button>

              <button 
                onClick={() => setWizardPainPoint('revenue_leakage')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: wizardPainPoint === 'revenue_leakage' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: wizardPainPoint === 'revenue_leakage' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--color-brand-deep)' }}>
                  🚨 Ad Spend High, Deals Flat
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                  Spending lakhs on ads but leads get lost inside the sales funnel.
                </div>
              </button>

              <button 
                onClick={() => setWizardPainPoint('morning_blind')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: wizardPainPoint === 'morning_blind' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: wizardPainPoint === 'morning_blind' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--color-brand-deep)' }}>
                  ☕ Promoter Starts Day Blind
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                  Must call multiple managers just to see yesterday’s numbers.
                </div>
              </button>
            </div>

            {/* Recommendation Result Card */}
            <div style={{
              padding: '28px',
              backgroundColor: 'var(--color-canvas)',
              border: '2px solid var(--color-gold)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Recommended AI Employee</span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '6px' }}>
                  {wizardPainPoint === 'response_time' && 'AI Sales Agent'}
                  {wizardPainPoint === 'whatsapp_247' && 'AI WhatsApp Agent'}
                  {wizardPainPoint === 'missed_followups' && 'AI Follow-Up Agent'}
                  {wizardPainPoint === 'cold_database' && 'AI Outbound Calling Agent (AI Telecaller)'}
                  {wizardPainPoint === 'revenue_leakage' && 'AI Revenue Leakage Agent'}
                  {wizardPainPoint === 'morning_blind' && 'AI Morning Business Brief'}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', maxWidth: '540px' }}>
                  {wizardPainPoint === 'response_time' && 'Instantly qualifies leads under 10 seconds, collects budget & location, and routes hot buyers directly to your top sales rep.'}
                  {wizardPainPoint === 'whatsapp_247' && 'Answers project questions, delivers layout brochures, and books site visits 24/7 on official WhatsApp without human delays.'}
                  {wizardPainPoint === 'missed_followups' && 'Executes Day 0 to Day 30 persistent value follow-ups across WhatsApp until the buyer is ready to visit or buy.'}
                  {wizardPainPoint === 'cold_database' && 'Calls up to 1,000 dormant leads an hour with natural voice discovery, qualifying interested buyers and updating CRM automatically.'}
                  {wizardPainPoint === 'revenue_leakage' && 'Monitors your pipeline 24/7 to flag ignored leads, unclosed site visits, and SLA breaches before revenue is lost.'}
                  {wizardPainPoint === 'morning_blind' && 'Sends an actionable 8:00 AM WhatsApp briefing directly to the promoter summarizing yesterday’s leads, site visits, and top risks.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link 
                  to={`/ai/${
                    wizardPainPoint === 'response_time' ? 'ai-sales-agent' :
                    wizardPainPoint === 'whatsapp_247' ? 'ai-whatsapp-agent' :
                    wizardPainPoint === 'missed_followups' ? 'ai-follow-up-agent' :
                    wizardPainPoint === 'cold_database' ? 'ai-calling-agent' :
                    wizardPainPoint === 'revenue_leakage' ? 'ai-revenue-leakage-agent' : 'ai-morning-brief'
                  }`}
                  className="btn btn-primary btn-md"
                >
                  <span>See How It Works</span>
                  <ArrowRight size={14} />
                </Link>
                <button 
                  onClick={() => onOpenEnquiry('Deploy AI Employee Recommendation')}
                  className="btn btn-outline btn-md"
                >
                  Deploy This Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE AI WORKFLOW SIMULATOR */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Sparkles size={14} />
              <span>Interactive Demonstrator</span>
            </div>
            <h2 className="section-title">
              Experience the AI Workforce in Action
            </h2>
            <p className="section-subtitle">
              See realistic simulations of how Nam Nilam AI agents communicate with buyers, leadership, and CRM pipelines.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            {/* Simulator Switcher Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setActiveSimulator('whatsapp')}
                className={`btn btn-sm ${activeSimulator === 'whatsapp' ? 'btn-primary' : 'btn-outline'}`}
              >
                <MessageSquare size={14} />
                <span>AI WhatsApp Agent</span>
              </button>

              <button 
                onClick={() => setActiveSimulator('morning_brief')}
                className={`btn btn-sm ${activeSimulator === 'morning_brief' ? 'btn-primary' : 'btn-outline'}`}
              >
                <SunMedium size={14} />
                <span>AI Morning Brief</span>
              </button>

              <button 
                onClick={() => setActiveSimulator('calling')}
                className={`btn btn-sm ${activeSimulator === 'calling' ? 'btn-primary' : 'btn-outline'}`}
              >
                <PhoneCall size={14} />
                <span>AI Outbound Calling Log</span>
              </button>

              <button 
                onClick={() => setActiveSimulator('crm')}
                className={`btn btn-sm ${activeSimulator === 'crm' ? 'btn-primary' : 'btn-outline'}`}
              >
                <Database size={14} />
                <span>AI CRM Copilot</span>
              </button>
            </div>

            {/* Simulator Display Screen */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)'
            }}>
              {/* Terminal Window Header */}
              <div style={{
                padding: '14px 20px',
                backgroundColor: 'var(--color-brand-deep)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }}></div>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', marginLeft: '8px', fontFamily: 'var(--font-mono)' }}>
                    {activeSimulator === 'whatsapp' && 'whatsapp-agent.namnilam.ai'}
                    {activeSimulator === 'morning_brief' && 'executive-brief.namnilam.ai'}
                    {activeSimulator === 'calling' && 'telecaller-voice-engine.namnilam.ai'}
                    {activeSimulator === 'crm' && 'crm-copilot.namnilam.ai'}
                  </span>
                </div>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>Live Sandbox</span>
              </div>

              {/* Terminal Content */}
              <div style={{ padding: '32px' }}>
                {activeSimulator === 'whatsapp' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: '14px 18px', backgroundColor: 'var(--color-canvas)', borderRadius: '18px 18px 18px 2px', border: '1px solid var(--color-border)', fontSize: '0.92rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginBottom: '4px' }}>Customer (via WhatsApp Ad):</span>
                      "2 cent plot iruka? 30 lakhs budget la Samayapuram pakkam?"
                    </div>

                    <div style={{ alignSelf: 'flex-end', maxWidth: '85%', padding: '14px 18px', backgroundColor: 'rgba(197, 160, 89, 0.12)', border: '1px solid var(--color-gold-border)', borderRadius: '18px 18px 2px 18px', fontSize: '0.92rem', color: 'var(--color-brand-deep)' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>Nam Nilam AI WhatsApp Agent:</span>
                      Hello! Yes, we have verified DTCP-approved villa plots at <strong>Cauvery Green City</strong> (Samayapuram Tollway corridor). 
                      <br /><br />
                      Plots start from <strong>1,200 sq.ft (approx 2.75 cents) at ₹17.4 Lakhs</strong>, which fits well within your ₹30 Lakhs budget. Water is sweet Cauvery basin yield at 22 feet.
                      <br /><br />
                      Would you like me to send the master layout map and bank approval list right here?
                    </div>

                    <div style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: '14px 18px', backgroundColor: 'var(--color-canvas)', borderRadius: '18px 18px 18px 2px', border: '1px solid var(--color-border)', fontSize: '0.92rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginBottom: '4px' }}>Customer:</span>
                      "Yes please send. Also can we visit this Saturday morning?"
                    </div>

                    <div style={{ alignSelf: 'flex-end', maxWidth: '85%', padding: '14px 18px', backgroundColor: 'rgba(197, 160, 89, 0.12)', border: '1px solid var(--color-gold-border)', borderRadius: '18px 18px 2px 18px', fontSize: '0.92rem', color: 'var(--color-brand-deep)' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>Nam Nilam AI WhatsApp Agent:</span>
                      Layout plan sent! 📄 <em>(Cauvery_Green_City_DTCP_Layout.pdf)</em>
                      <br /><br />
                      I have reserved a <strong>Free Site Visit Cab for Saturday at 10:30 AM</strong>. Our project advisor Mr. Senthil will call to confirm your pickup point in Trichy. Have a great day!
                    </div>

                    <div style={{ padding: '12px 16px', backgroundColor: '#DCFCE7', borderRadius: 'var(--radius-md)', color: '#166534', fontSize: '0.85rem', fontWeight: 600 }}>
                      ⚡ CRM Action: Lead created → Tagged "High Intent / Saturday Site Visit / ₹30L Budget" → Pick-up task added for Sales Team.
                    </div>
                  </div>
                )}

                {activeSimulator === 'morning_brief' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-brand-deep)' }}>
                        ☀️ Daily Operational Briefing for Director
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Delivered to WhatsApp @ 8:00 AM</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="cards-grid-3">
                      <div style={{ padding: '12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Yesterday Leads</span>
                        <strong style={{ fontSize: '1.2rem', color: 'var(--color-brand-deep)' }}>42 Leads</strong>
                      </div>
                      <div style={{ padding: '12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Qualified High-Intent</span>
                        <strong style={{ fontSize: '1.2rem', color: '#059669' }}>17 Leads (40%)</strong>
                      </div>
                      <div style={{ padding: '12px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Site Visits Planned</span>
                        <strong style={{ fontSize: '1.2rem', color: 'var(--color-gold-dark)' }}>8 Visits Today</strong>
                      </div>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: 'rgba(239, 68, 68, 0.06)', borderLeft: '4px solid #DC2626', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
                      <strong style={{ color: '#DC2626', display: 'block', marginBottom: '4px' }}>⚠️ What Needs Your Attention Today:</strong>
                      4 hot leads with budgets &gt;₹35 Lakhs have had no callback from the sales team for over 28 hours. Escalation sent to Sales Head.
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)' }}>
                      💡 <strong>Recommended Executive Focus:</strong> Focus your morning sales huddle on closing the 3 pending token agreements for Airport Tech Vista.
                    </div>
                  </div>
                )}

                {activeSimulator === 'calling' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-brand-deep)' }}>
                        📞 Outbound Telecaller Audio Transcript Log
                      </strong>
                      <span className="badge badge-green">Call Connected (1m 18s)</span>
                    </div>

                    <div style={{ fontSize: '0.88rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ padding: '10px 14px', backgroundColor: 'rgba(197, 160, 89, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                        <strong>[AI Telecaller]:</strong> "Good afternoon Mr. Raman, this is Nam Nilam calling on behalf of Cauvery Green City in Trichy. We noticed you enquired about residential plots earlier this year. Are you still looking to buy a plot in Trichy?"
                      </div>
                      <div style={{ padding: '10px 14px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                        <strong>[Customer]:</strong> "Yes, but I was waiting for bank approval letters. Have SBI and HDFC approved the project?"
                      </div>
                      <div style={{ padding: '10px 14px', backgroundColor: 'rgba(197, 160, 89, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                        <strong>[AI Telecaller]:</strong> "Yes, both SBI and Indian Bank have formally sanctioned the layout with 80% financing. Would you like our senior loan advisor to send the pre-approval checklist to your WhatsApp?"
                      </div>
                      <div style={{ padding: '10px 14px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)' }}>
                        <strong>[Customer]:</strong> "Yes, please WhatsApp me. I will review tonight."
                      </div>
                    </div>

                    <div style={{ padding: '12px 14px', backgroundColor: '#DCFCE7', borderRadius: 'var(--radius-sm)', color: '#166534', fontSize: '0.82rem', fontWeight: 600 }}>
                      ✓ Call Result: "Dormant Lead Revived / Loan Ready" → WhatsApp brochure dispatched automatically → Reminder set for tomorrow 11 AM.
                    </div>
                  </div>
                )}

                {activeSimulator === 'crm' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-brand-deep)' }}>
                        💬 AI CRM Copilot: Voice &amp; Chat Operations
                      </strong>
                    </div>

                    <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginBottom: '4px' }}>Sales Executive (Audio Voice Note / WhatsApp):</span>
                      "Met with Dr. Praveen at site today. He loved Corner Plot 12 at Airport Tech Vista. Ready to pay 1 Lakh advance next Tuesday after consulting his auditor. Tag as hot deal."
                    </div>

                    <div style={{ padding: '16px', backgroundColor: 'rgba(197, 160, 89, 0.12)', border: '1px solid var(--color-gold-border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                      <strong style={{ color: 'var(--color-gold-dark)', display: 'block', marginBottom: '8px' }}>⚡ AI CRM Copilot Processed Action in 2 Seconds:</strong>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div>• <strong>Lead Name:</strong> Dr. Praveen</div>
                        <div>• <strong>Project:</strong> Airport Tech Vista</div>
                        <div>• <strong>Selected Plot:</strong> Corner Plot 12</div>
                        <div>• <strong>Pipeline Stage:</strong> Token Advance Expected</div>
                        <div>• <strong>Expected Close:</strong> Next Tuesday</div>
                        <div>• <strong>Auto-Task Created:</strong> Advance Follow-up Call (Tuesday 10 AM)</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
                      ✓ Zero manual forms filled. Sales rep saved 15 minutes of evening administration.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 10 SPECIALIZED AI AGENTS (ORGANIZED BY FUNCTION) */}
      <section className="section" id="workforce-catalog">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Bot size={14} />
              <span>Full Enterprise Catalog</span>
            </div>
            <h2 className="section-title">
              10 Specialized AI Agents. 5 Core Functions.
            </h2>
            <p className="section-subtitle">
              Every agent is purpose-built to eliminate manual bottlenecks, multiply team velocity, and stop revenue leakage.
            </p>
          </div>

          {/* Department Filter Chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '44px', flexWrap: 'wrap' }}>
            {AI_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  backgroundColor: selectedCategory === cat.id ? 'var(--color-brand-deep)' : '#FFFFFF',
                  color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--color-ink-muted)',
                  border: '1.5px solid',
                  borderColor: selectedCategory === cat.id ? 'var(--color-brand-deep)' : 'var(--color-border)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Agents Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="cards-grid-2">
            {filteredAgents.map((agent) => {
              const CatIcon = categoryIcons[agent.category] || Bot;
              return (
                <div key={agent.slug} style={{
                  padding: '36px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--transition-smooth)'
                }}>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-gold">
                        <CatIcon size={12} />
                        {agent.category}
                      </span>
                    </div>
                    <span className="badge badge-dark" style={{ fontSize: '0.72rem' }}>
                      {agent.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', marginBottom: '6px', color: 'var(--color-brand-deep)' }}>
                    {agent.title}
                  </h3>

                  <p style={{ fontSize: '0.95rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '14px' }}>
                    {agent.headline}
                  </p>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
                    {agent.tagline}
                  </p>

                  {/* 5 Questions Snapshot Box */}
                  <div style={{
                    backgroundColor: 'var(--color-canvas)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px',
                    marginBottom: '24px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div>
                      <strong style={{ color: '#DC2626', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                        The Problem It Solves:
                      </strong>
                      <span style={{ color: 'var(--color-ink)' }}>{agent.problem.slice(0, 130)}...</span>
                    </div>

                    <div>
                      <strong style={{ color: 'var(--color-gold-dark)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                        What AI Does:
                      </strong>
                      <span style={{ color: 'var(--color-ink)' }}>{agent.aiAction.slice(0, 140)}...</span>
                    </div>

                    <div>
                      <strong style={{ color: '#059669', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                        Key Measurable Metric:
                      </strong>
                      <span style={{ color: 'var(--color-brand-deep)', fontWeight: 600 }}>{agent.metrics[0]}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link to={`/ai/${agent.slug}`} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                      <span>View 5-Question Details</span>
                      <ArrowRight size={14} />
                    </Link>
                    <button 
                      onClick={() => onOpenEnquiry(`Deploy ${agent.title}`)}
                      className="btn btn-outline btn-sm"
                    >
                      Deploy Agent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FINAL CONVERSION BANNER */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--color-brand-deep)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '60px 48px',
            border: '1px solid rgba(223, 186, 115, 0.3)',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '36px'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '14px', background: 'rgba(223, 186, 115, 0.15)', color: '#DFBA73' }}>
                <Sparkles size={12} color="#DFBA73" />
                Custom AI Workforce Deployment
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '14px', lineHeight: 1.2 }}>
                Ready to Upgrade Your Real Estate Operations?
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.65 }}>
                We don't just hand you software. We design the workflows, integrate with your CRM, configure your WhatsApp API, and train the agents on your specific layout documents.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '260px' }}>
              <button 
                onClick={() => onOpenEnquiry('Deploy AI Workforce')}
                className="btn btn-primary btn-lg"
              >
                <span>Talk to Nam Nilam AI</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam AI, I want to discuss deploying an AI Workforce for my real estate company.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Solutions Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
