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
  Clock, 
  Database, 
  Zap, 
  Target, 
  HelpCircle, 
  TrendingUp, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Compass, 
  Layers, 
  Briefcase, 
  ArrowDown,
  ShieldCheck,
  Repeat,
  Inbox,
  FileCheck,
  PhoneIncoming,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
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
  const [startSmallProblem, setStartSmallProblem] = useState('unanswered_leads');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Single Agent View if slug is present (supports both canonical slug and alias)
  const singleAgent = slug ? AI_WORKFORCE_DATA.find(a => a.slug === slug || a.id === slug || (a.aliases && a.aliases.includes(slug))) : null;

  if (slug && singleAgent) {
    const CatIcon = categoryIcons[singleAgent.category] || Bot;
    const q = singleAgent.questions || {};

    const agentFaqs = [
      { question: `What problem does ${singleAgent.title} solve?`, answer: q.problem || singleAgent.problem },
      { question: `What does ${singleAgent.title} do?`, answer: q.whatItDoes || singleAgent.tagline },
      { question: `How does ${singleAgent.title} work?`, answer: q.howItWorks || singleAgent.aiAction },
      { question: `Who is ${singleAgent.title} for?`, answer: q.whoItIsFor || 'Real estate developers and agencies in Tamil Nadu.' },
      { question: `What does the human team do with ${singleAgent.title}?`, answer: q.humanRole || singleAgent.teamCollaboration },
      { question: `What should the business measure with ${singleAgent.title}?`, answer: q.metrics || 'Faster response times and higher qualified lead conversion.' },
      { question: `What are the limitations of ${singleAgent.title}?`, answer: q.limitations || 'Does not replace human closing or legal advice.' },
      { question: `How do I get started with ${singleAgent.title}?`, answer: q.howToStart || 'Connect your primary lead source and configure project facts.' }
    ];

    return (
      <div>
        <SeoHead 
          title={`${singleAgent.title} for Real Estate Businesses | Nam Nilam AI`}
          description={singleAgent.tagline}
          canonical={`/ai/${singleAgent.slug}`}
          breadcrumbs={[
            { label: 'AI Workforce', path: '/ai' },
            { label: singleAgent.title }
          ]}
          faqs={agentFaqs}
        />

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
                Agent #{singleAgent.agentNumber}
              </span>
              <span className="badge" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669', border: '1px solid rgba(5, 150, 105, 0.25)' }}>
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
                <span>Deploy {singleAgent.title}</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam AI, I would like to see how ${singleAgent.title} works for my real estate business.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={16} />
                <span>Talk on WhatsApp</span>
              </a>
              <Link to="/ai" className="btn btn-outline btn-lg">
                View All 10 AI Agents
              </Link>
            </div>
          </div>
        </section>

        {/* The 8 Mandatory Questions & Operational Details */}
        <section className="section">
          <div className="container">
            <div className="service-overview-grid">
              {/* Left Column: The 8 Questions with Question-Based H2s for AEO */}
              <div>
                {/* 1. What problem does it solve? */}
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', marginBottom: '8px' }}>
                    <AlertTriangle size={18} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Core Challenge</span>
                  </div>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                    1. What Problem Does It Solve?
                  </h2>
                  <div style={{
                    padding: '20px 24px',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderLeft: '4px solid #DC2626',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.7
                  }}>
                    {q.problem || singleAgent.problem}
                  </div>
                </div>

                {/* 2. What does it do? */}
                <div style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '14px', color: 'var(--color-brand-deep)' }}>
                    2. What Does It Do?
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                    {q.whatItDoes || singleAgent.tagline}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(singleAgent.whatItDoes || []).map((item, idx) => (
                      <div key={idx} style={{
                        padding: '12px 16px',
                        backgroundColor: 'var(--color-canvas)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}>
                        <CheckCircle2 size={18} color="var(--color-gold-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.92rem', color: 'var(--color-ink)', lineHeight: 1.5 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. How does it work? */}
                <div style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                    3. How Does It Work?
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'var(--color-ink-muted)', lineHeight: 1.75, marginBottom: '18px' }}>
                    {q.howItWorks || singleAgent.aiAction}
                  </p>
                  {/* Workflow Steps */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(singleAgent.workflow || []).map((step, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)'
                      }}>
                        <span style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-brand-deep)',
                          color: '#FFFFFF',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-ink)' }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Who is it for? */}
                <div style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                    4. Who Is It For?
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                    {q.whoItIsFor || 'Real estate developers, layout promoters, sales teams, and brokers in Tamil Nadu managing steady customer inquiry flows.'}
                  </p>
                </div>

                {/* 5. What does the human team do? */}
                <div style={{ marginBottom: '36px' }}>
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'rgba(5, 150, 105, 0.05)',
                    border: '1px solid rgba(5, 150, 105, 0.25)',
                    borderRadius: 'var(--radius-lg)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', marginBottom: '10px' }}>
                      <Users size={20} />
                      <h2 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', margin: 0 }}>
                        5. What Does the Human Team Do?
                      </h2>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.7, margin: 0 }}>
                      {q.humanRole || singleAgent.teamCollaboration}
                    </p>
                  </div>
                </div>

                {/* 6. What should the business measure? */}
                <div style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                    6. What Should the Business Measure?
                  </h2>
                  <div style={{
                    padding: '20px 24px',
                    backgroundColor: 'var(--color-surface-soft)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)'
                  }}>
                    <p style={{ fontSize: '0.98rem', color: 'var(--color-brand-deep)', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
                      {q.metrics || 'First-response time, qualification rate, cost per site visit, and sales rep hours saved.'}
                    </p>
                  </div>
                </div>

                {/* 7. What are the limitations? */}
                <div style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                    7. What Are the Limitations?
                  </h2>
                  <p style={{ fontSize: '0.98rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                    {q.limitations || 'This agent does not negotiate final commercial contracts or make legal guarantees. Complex queries trigger immediate human handovers.'}
                  </p>
                </div>

                {/* 8. How do I get started? */}
                <div style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                    8. How Do I Get Started?
                  </h2>
                  <p style={{ fontSize: '0.98rem', color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
                    {q.howToStart || 'Connect your primary lead channel, provide your project approval facts and pricing slabs, and test the conversational flow.'}
                  </p>
                  <button 
                    onClick={() => onOpenEnquiry(`Get Started: ${singleAgent.title}`)}
                    className="btn btn-primary"
                  >
                    <span>Get Started With {singleAgent.title}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Real-World Simulation Box */}
                {singleAgent.simulation && (
                  <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '14px', color: 'var(--color-brand-deep)' }}>
                      Interactive Workflow Demonstration
                    </h3>
                    <div style={{
                      padding: '24px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      {singleAgent.simulation.customer && (
                        <div style={{
                          padding: '12px 16px',
                          backgroundColor: 'var(--color-surface-soft)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.92rem',
                          fontStyle: 'italic',
                          color: 'var(--color-brand-deep)',
                          marginBottom: '12px',
                          borderLeft: '4px solid var(--color-gold)'
                        }}>
                          Customer: {singleAgent.simulation.customer}
                        </div>
                      )}
                      {singleAgent.simulation.aiReply && (
                        <div style={{
                          padding: '12px 16px',
                          backgroundColor: 'rgba(5, 150, 105, 0.05)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.92rem',
                          color: '#065F46',
                          marginBottom: '12px',
                          borderLeft: '4px solid #059669'
                        }}>
                          AI Reply: {singleAgent.simulation.aiReply}
                        </div>
                      )}
                      {singleAgent.simulation.outcome && (
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-gold-dark)' }}>
                          Outcome: {singleAgent.simulation.outcome}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Business Value Card & Section 45 Cross-Linking */}
              <div>
                <div className="deliverables-box" style={{ marginBottom: '24px' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Operational Value</span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                    {singleAgent.businessValue}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
                    This agent does not replace your team. It handles the repetitive work so your salespeople can focus on talking to serious buyers, conducting site visits, and closing deals.
                  </p>

                  <button 
                    onClick={() => onOpenEnquiry(`Deploy ${singleAgent.title}`)}
                    className="btn btn-primary btn-md"
                    style={{ width: '100%', marginBottom: '10px' }}
                  >
                    <span>Deploy This AI Agent</span>
                    <ArrowRight size={14} />
                  </button>

                  <a 
                    href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I would like to consult on deploying ${singleAgent.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-md"
                    style={{ width: '100%' }}
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                {/* Section 45: Internal Linking - Related AI Agents */}
                <div style={{
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--color-brand-deep)' }}>
                    Connected AI Agents
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(singleAgent.relatedAgents || ['sales-agent', 'whatsapp-agent', 'crm-copilot']).map((relSlug) => (
                      <Link
                        key={relSlug}
                        to={`/ai/${relSlug}`}
                        style={{
                          fontSize: '0.88rem',
                          color: 'var(--color-brand-deep)',
                          fontWeight: 600,
                          textDecoration: 'none',
                          padding: '8px 12px',
                          backgroundColor: 'var(--color-canvas)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>{relSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                        <ArrowRight size={13} color="var(--color-gold-dark)" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Section 45: Internal Linking - Relevant Use Cases */}
                <div style={{
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--color-brand-deep)' }}>
                    Relevant Use Cases
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(singleAgent.relatedUseCases || ['real-estate-lead-qualification', 'real-estate-whatsapp-automation']).map((ucSlug) => (
                      <Link
                        key={ucSlug}
                        to={`/ai/use-cases/${ucSlug}`}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-gold-dark)',
                          fontWeight: 600,
                          textDecoration: 'none',
                          padding: '6px 0',
                          borderBottom: '1px solid #F1F5F9',
                          display: 'block'
                        }}
                      >
                        {ucSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Section 45: Internal Linking - Relevant Business Solutions */}
                <div style={{
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--color-brand-deep)' }}>
                    Related Business Solutions
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(singleAgent.relatedSolutions || ['crm', 'sales-automation', 'whatsapp-automation']).map((solSlug) => (
                      <Link
                        key={solSlug}
                        to={`/business/${solSlug}`}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-ink-muted)',
                          textDecoration: 'none',
                          padding: '4px 0',
                          display: 'block'
                        }}
                      >
                        {solSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Section 45: Internal Linking - Educational Resources */}
                <div style={{
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--color-brand-deep)' }}>
                    Educational Resources
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(singleAgent.relatedResources || ['what-is-an-ai-agent', 'ai-real-estate-sales']).map((resSlug) => (
                      <Link
                        key={resSlug}
                        to={`/resources/${resSlug}`}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-ink-muted)',
                          textDecoration: 'none',
                          padding: '4px 0',
                          display: 'block'
                        }}
                      >
                        {resSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
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


  // Filtered List of Agents for the catalog
  const filteredAgents = selectedCategory === 'all' 
    ? AI_WORKFORCE_DATA 
    : AI_WORKFORCE_DATA.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  // 10 Core FAQ Items
  const faqList = [
    {
      q: "What is an AI agent?",
      a: "An AI agent is software that can understand a task, take action and continue working based on the situation. For example, when a new customer enquiry arrives, an AI agent can read the request, ask qualifying questions, update your CRM, and notify your sales team when a human conversation is needed."
    },
    {
      q: "Will AI replace my sales team?",
      a: "No. AI is designed to work alongside your human team, not replace them. AI handles repetitive, time-consuming tasks like greeting new enquiries, sending project brochures, reminding silent leads, and logging CRM notes. Your human salespeople handle high-value tasks: building trust, conducting site visits, negotiating, and closing deals."
    },
    {
      q: "Can AI work with WhatsApp?",
      a: "Yes. Nam Nilam AI agents run directly on official WhatsApp business numbers. They can answer incoming questions in natural Tamil and English, share layout PDF brochures, send Google Maps location pins, and schedule site visit cabs 24 hours a day."
    },
    {
      q: "Can AI make phone calls?",
      a: "Yes. The AI Calling Agent can autonomously call through lists of new enquiries or dormant leads. It speaks naturally, asks qualifying questions about buyer preferences and budgets, notes interest levels, and tags outcomes directly in your CRM."
    },
    {
      q: "Can AI update our CRM?",
      a: "Yes. With the AI CRM Copilot, sales executives do not have to type lengthy updates. They can simply send a quick voice note or text message like “Met Mr. Anand at the site, he liked plot 12, wants to follow up on Friday.” The AI extracts the fields and updates the CRM record automatically."
    },
    {
      q: "Can AI work outside business hours?",
      a: "Yes. AI agents operate 24 hours a day, 7 days a week. Inquiries arriving on Sunday evenings or late at night receive instant responses within seconds, ensuring you never lose hot buyers to competitors."
    },
    {
      q: "Can I start with just one agent?",
      a: "Absolutely. Most real estate businesses start with just one agent that solves their biggest operational bottleneck—such as the AI WhatsApp Agent for instant response or the AI Follow-Up Agent for consistent lead nurturing. You can add more agents as your business expands."
    },
    {
      q: "Can multiple agents work together?",
      a: "Yes. Nam Nilam AI agents are designed to hand off information to one another seamlessly. For example, the AI Sales Agent qualifies the lead, the AI WhatsApp Agent delivers the layout, the AI CRM Copilot updates the file, and the AI Calling Agent schedules the visit."
    },
    {
      q: "Will a human be involved?",
      a: "Always. AI is programmed with clear human handover triggers. Whenever a customer asks a complex question, requests a custom price negotiation, or is ready to visit the site, the AI immediately alerts the assigned human sales executive."
    },
    {
      q: "How do we measure whether the AI is actually helping?",
      a: "You can measure clear, concrete business indicators: faster response time (reduced from hours to seconds), higher lead contact rates, more consistent follow-ups across weeks, and more time for your salespeople to conduct physical site visits."
    }
  ];

  return (
    <div>
      <SeoHead 
        title="AI Agents for Real Estate Businesses | Nam Nilam AI"
        description="AI agents for real estate businesses that automate lead qualification, WhatsApp conversations, follow-ups, calling, CRM tasks and business intelligence."
        canonical="/ai"
        breadcrumbs={[{ label: 'AI Workforce', path: '/ai' }]}
        faqs={faqList.map(f => ({ question: f.q, answer: f.a }))}
      />

      <Breadcrumbs items={[{ label: 'AI Workforce' }]} />

      {/* =========================================================================
          SECTION 1 — HERO SECTION
          ========================================================================= */}
      <section className="hero-section" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Bot size={14} />
                <span>Nam Nilam AI • AI Workforce for Real Estate Businesses</span>
              </div>

              <h1 className="hero-headline" style={{ fontSize: '3rem', lineHeight: 1.18, marginBottom: '20px' }}>
                <span style={{ fontSize: '1.1rem', display: 'block', color: 'var(--color-gold-dark)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  AI Agents for Real Estate Businesses
                </span>
                Your Team Shouldn’t Have to <br />
                <span className="text-gold">Do Everything Manually.</span>
              </h1>

              <p className="hero-subhead" style={{ fontSize: '1.18rem', lineHeight: 1.6, color: 'var(--color-ink-muted)', marginBottom: '32px' }}>
                Meet AI agents that handle repetitive sales, follow-ups, customer conversations, calling, marketing and business monitoring for your real estate business.
              </p>


              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <a href="#workforce-catalog" className="btn btn-primary btn-lg">
                  <span>Explore AI Agents</span>
                  <ArrowRight size={16} />
                </a>
                <button 
                  onClick={() => onOpenEnquiry('AI Workforce Strategy Consultation')}
                  className="btn btn-outline btn-lg"
                >
                  Talk to Nam Nilam
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#64748B', fontWeight: 500 }}>
                <ShieldCheck size={16} color="var(--color-gold-dark)" />
                <span>Built for real estate businesses. Designed to work with your existing team.</span>
              </div>
            </div>

            {/* Right Architecture Card */}
            <div className="hero-right">
              <div style={{
                backgroundColor: 'var(--color-brand-deep)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                border: '1px solid rgba(223, 186, 115, 0.3)',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Cpu size={18} color="#DFBA73" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#DFBA73', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Nam Nilam AI Workforce
                    </span>
                  </div>
                  <span className="badge badge-gold" style={{ background: 'rgba(223, 186, 115, 0.15)', color: '#DFBA73' }}>
                    10 Specialized Agents
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ padding: '10px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#FFFFFF', display: 'block' }}>Sales Workforce</strong>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AI Sales • AI Follow-Up • AI Calling</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>3 Agents</span>
                  </div>

                  <div style={{ padding: '10px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#FFFFFF', display: 'block' }}>Customer Communication</strong>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AI WhatsApp • AI Customer Support</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>2 Agents</span>
                  </div>

                  <div style={{ padding: '10px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#FFFFFF', display: 'block' }}>Operations &amp; CRM</strong>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AI CRM Copilot • AI Morning Brief</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>2 Agents</span>
                  </div>

                  <div style={{ padding: '10px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#FFFFFF', display: 'block' }}>Decision Intelligence</strong>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AI Revenue Leakage • AI Business Intelligence</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>2 Agents</span>
                  </div>

                  <div style={{ padding: '10px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#FFFFFF', display: 'block' }}>Marketing Workforce</strong>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AI Marketing Agent (Briefs &amp; Angles)</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#DFBA73', fontWeight: 700 }}>1 Agent</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '14px', fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Let AI handle repetitive work. Let your team focus on customers and revenue.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — THE PROBLEM (Losing Time in Small Tasks)
          ========================================================================= */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <AlertCircle size={14} />
              <span>The Operational Reality</span>
            </div>
            <h2 className="section-title">
              Your Business Is Losing Time in Small Tasks.
            </h2>
            <p className="section-subtitle">
              Every single day, valuable hours are consumed by repetitive manual chores that distract your best people from high-value customer conversations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Inbox size={20} color="var(--color-gold-dark)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)' }}>New lead comes in.</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
                Someone has to respond immediately before the customer inquires with another developer.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Repeat size={20} color="var(--color-gold-dark)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)' }}>Customer asks the same question again.</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
                Someone has to stop their work to re-type approval numbers, water details, and road widths.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Clock size={20} color="var(--color-gold-dark)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)' }}>Old lead needs follow-up.</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
                Someone has to remember to check back after 3 days, 7 days, or 14 days without letting it slip.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <FileCheck size={20} color="var(--color-gold-dark)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)' }}>Salesperson forgets to update CRM.</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
                Someone has to check, remind, and manually follow up with the sales rep to log call notes.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <PhoneIncoming size={20} color="var(--color-gold-dark)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)' }}>Hundreds of old leads are sitting unused.</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
                Someone has to spend days making repetitive calls to find out who is still looking to buy.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <BarChart3 size={20} color="var(--color-gold-dark)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)' }}>Owner wants to know what is happening.</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
                Someone has to collect numbers, compile figures, and prepare the daily report manually.
              </p>
            </div>
          </div>

          {/* Closing Statement Banner */}
          <div style={{
            padding: '28px 36px',
            backgroundColor: 'var(--color-brand-deep)',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            color: '#FFFFFF',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontSize: '1.35rem', color: '#DFBA73', marginBottom: '6px' }}>
              These tasks are necessary. But they don't always need a human doing them manually.
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#CBD5E1', maxWidth: '700px', margin: '0 auto' }}>
              By automating repetitive operational tasks, your team gains back the hours needed to meet customers, conduct site visits, and close sales.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — WHAT IS AN AI AGENT?
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Compass size={14} />
              <span>Simple Explanation</span>
            </div>
            <h2 className="section-title">
              So, What Exactly Is an AI Agent?
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1.2rem', color: 'var(--color-brand-deep)', fontWeight: 600 }}>
              An AI agent is software that can understand a task, take action and continue working based on the situation.
            </p>
          </div>

          {/* Visual Comparison: Instead of vs With AI */}
          <div style={{ maxWidth: '980px', margin: '0 auto 40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Instead of: Manual */}
              <div style={{
                padding: '32px',
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                borderTop: '4px solid #94A3B8'
              }}>
                <span className="badge badge-dark" style={{ marginBottom: '14px' }}>Instead of: Manual Process</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                  How Work Usually Happens
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: 'var(--color-ink-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#CBD5E1', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>1</span>
                    <span>Lead comes in</span>
                  </div>
                  <div style={{ textAlign: 'center', color: '#94A3B8' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#CBD5E1', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>2</span>
                    <span>Salesperson notices (often hours later)</span>
                  </div>
                  <div style={{ textAlign: 'center', color: '#94A3B8' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#CBD5E1', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>3</span>
                    <span>Calls customer &amp; repeats basic questions</span>
                  </div>
                  <div style={{ textAlign: 'center', color: '#94A3B8' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#CBD5E1', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>4</span>
                    <span>Manually enters notes in CRM (if remembered)</span>
                  </div>
                  <div style={{ textAlign: 'center', color: '#94A3B8' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#CBD5E1', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>5</span>
                    <span>Tries to remember to schedule follow-up</span>
                  </div>
                </div>
              </div>

              {/* An AI Agent can help */}
              <div style={{
                padding: '32px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--color-gold)',
                boxShadow: 'var(--shadow-lg)',
                borderTop: '4px solid var(--color-gold)'
              }}>
                <span className="badge badge-gold" style={{ marginBottom: '14px' }}>With Nam Nilam AI Agent</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                  How An AI Agent Helps
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: 'var(--color-ink)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>1</span>
                    <span>Lead comes in</span>
                  </div>
                  <div style={{ textAlign: 'center', color: 'var(--color-gold-dark)' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>2</span>
                    <strong>AI responds within seconds on WhatsApp</strong>
                  </div>
                  <div style={{ textAlign: 'center', color: 'var(--color-gold-dark)' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>3</span>
                    <span>Understands exact requirement &amp; budget</span>
                  </div>
                  <div style={{ textAlign: 'center', color: 'var(--color-gold-dark)' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>4</span>
                    <span>Updates CRM automatically &amp; sets reminders</span>
                  </div>
                  <div style={{ textAlign: 'center', color: 'var(--color-gold-dark)' }}>↓</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>5</span>
                    <strong style={{ color: '#059669' }}>Alerts salesperson when human attention is needed</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Principle Box */}
          <div style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: '24px 32px',
            backgroundColor: 'rgba(197, 160, 89, 0.1)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)', marginBottom: '6px' }}>
              AI does not have to replace the salesperson.
            </h4>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>
              AI handles the repetitive work. Your team handles the important conversations.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — AI WORKFORCE (10 AGENTS CATALOG)
          ========================================================================= */}
      <section id="workforce-catalog" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Bot size={14} />
              <span>Catalog of Specialized Agents</span>
            </div>
            <h2 className="section-title">
              Meet Your AI Workforce
            </h2>
            <p className="section-subtitle">
              Different agents for different parts of your business.
            </p>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '28px' }}>
              {AI_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{ borderRadius: 'var(--radius-pill)', padding: '6px 16px', fontSize: '0.85rem' }}
                >
                  <span>{cat.name}</span>
                  <span style={{
                    marginLeft: '6px',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: selectedCategory === cat.id ? 'rgba(255,255,255,0.2)' : 'var(--color-canvas)',
                    fontSize: '0.72rem'
                  }}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 10 Agents Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
            {filteredAgents.map(agent => {
              const CatIcon = categoryIcons[agent.category] || Bot;
              return (
                <div key={agent.id} className="deliverables-box" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  padding: '30px',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)'
                }}>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-canvas)',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--color-border)'
                      }}>
                        {agent.agentNumber}
                      </span>
                      <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                        <CatIcon size={11} />
                        {agent.category}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669' }}>
                      {agent.badge}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '6px' }}>
                    {agent.title}
                  </h3>
                  <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: '10px' }}>
                    {agent.headline}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '18px', lineHeight: 1.55 }}>
                    {agent.tagline}
                  </p>

                  {/* What it does */}
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      What It Does:
                    </strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(agent.whatItDoes || []).slice(0, 4).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem' }}>
                          <CheckCircle2 size={14} color="var(--color-gold-dark)" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ color: 'var(--color-ink)' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Example Highlight */}
                  {agent.businessExample && (
                    <div style={{
                      padding: '12px 14px',
                      backgroundColor: 'var(--color-canvas)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '18px',
                      fontSize: '0.82rem',
                      borderLeft: '3px solid var(--color-gold)'
                    }}>
                      <strong style={{ color: 'var(--color-brand-deep)', display: 'block', marginBottom: '2px' }}>
                        Business Example:
                      </strong>
                      <span style={{ color: 'var(--color-ink-muted)' }}>
                        {agent.businessExample.customer || agent.businessExample.headline || agent.businessExample.repVoiceNote || agent.businessExample.alert || agent.businessExample.situation || 'Handles structured business tasks smoothly.'}
                      </span>
                    </div>
                  )}

                  {/* Business Value Pill */}
                  <div style={{
                    marginTop: 'auto',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(5, 150, 105, 0.08)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#059669',
                    marginBottom: '18px'
                  }}>
                    Value: {agent.businessValue}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/ai/${agent.slug}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      <span>{agent.ctaText || 'Explore Agent'}</span>
                      <ArrowRight size={14} />
                    </Link>
                    <button 
                      onClick={() => onOpenEnquiry(`Consultation for ${agent.title}`)}
                      className="btn btn-outline btn-sm"
                      title="Enquire about this agent"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — ONE BUSINESS, MANY AI AGENTS (VISUAL WORKFLOW)
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--color-brand-deep)', color: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header" style={{ color: '#FFFFFF' }}>
            <div className="section-eyebrow" style={{ backgroundColor: 'rgba(223, 186, 115, 0.15)', color: '#DFBA73' }}>
              <Workflow size={14} />
              <span>Integrated Real Estate System</span>
            </div>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              One Business. Many AI Agents Working Together.
            </h2>
            <p className="section-subtitle" style={{ color: '#CBD5E1' }}>
              Here is how different AI agents collaborate seamlessly across the customer journey to support your sales team.
            </p>
          </div>

          {/* Visual Step-by-Step Flow */}
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            {/* Step 1: Lead Arrives */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(223, 186, 115, 0.3)',
              marginBottom: '12px'
            }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#DFBA73',
                color: 'var(--color-brand-deep)',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                1
              </span>
              <div>
                <strong style={{ fontSize: '1.1rem', color: '#FFFFFF', display: 'block' }}>LEAD ARRIVES</strong>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Enquiry comes from Facebook ad, website form, or property portal.</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#DFBA73', padding: '4px 0' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>

            {/* Step 2: AI Sales Agent */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '12px'
            }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                2
              </span>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#DFBA73', display: 'block' }}>AI Sales Agent</strong>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Understands and qualifies buyer requirements, budget, and timeframe.</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#DFBA73', padding: '4px 0' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>

            {/* Step 3: AI WhatsApp Agent */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '12px'
            }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                3
              </span>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#DFBA73', display: 'block' }}>AI WhatsApp Agent</strong>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Continues conversation, shares verified project layout PDFs, and answers questions 24/7.</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#DFBA73', padding: '4px 0' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>

            {/* Step 4: AI CRM Copilot */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '12px'
            }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                4
              </span>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#DFBA73', display: 'block' }}>AI CRM Copilot</strong>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Updates lead information, selected plots, and notes automatically without manual typing.</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#DFBA73', padding: '4px 0' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>

            {/* Step 5: AI Follow-Up Agent */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '12px'
            }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                5
              </span>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#DFBA73', display: 'block' }}>AI Follow-Up Agent</strong>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Keeps the conversation alive across days and weeks with helpful project updates.</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#DFBA73', padding: '4px 0' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>

            {/* Step 6: AI Calling Agent */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '12px'
            }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                6
              </span>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#DFBA73', display: 'block' }}>AI Calling Agent</strong>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Handles required qualification calls and confirms site visit appointments.</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#059669', padding: '4px 0' }}>
              <ArrowDown size={22} style={{ margin: '0 auto' }} />
            </div>

            {/* Step 7: Human Salesperson Takeover */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '22px 26px',
              backgroundColor: 'rgba(5, 150, 105, 0.15)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #059669',
              marginBottom: '12px'
            }}>
              <span style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#059669',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                ★
              </span>
              <div>
                <strong style={{ fontSize: '1.15rem', color: '#FFFFFF', display: 'block' }}>Human Salesperson</strong>
                <span style={{ fontSize: '0.88rem', color: '#CBD5E1' }}>
                  Takes over smoothly when the opportunity needs human attention: conducting site visits, building trust, negotiating, and closing the sale.
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#DFBA73', padding: '4px 0' }}>
              <ArrowDown size={18} style={{ margin: '0 auto' }} />
            </div>

            {/* Step 8: AI Intelligence */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(223, 186, 115, 0.3)'
            }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#DFBA73',
                color: 'var(--color-brand-deep)',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                8
              </span>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#DFBA73', display: 'block' }}>AI Intelligence</strong>
                <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Tracks what happened across the pipeline, flags any neglected leads, and alerts leadership.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — AI + HUMAN (COLLABORATION MATRIX)
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Users size={14} />
              <span>Team Synergy</span>
            </div>
            <h2 className="section-title">
              AI Doesn't Replace Your Team. It Gives Your Team More Time.
            </h2>
            <p className="section-subtitle">
              The goal is not to remove humans from the process. The goal is to remove unnecessary manual work from the human process.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1020px', margin: '0 auto 36px' }}>
            {/* AI is good at */}
            <div style={{
              padding: '36px',
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <Bot size={22} color="var(--color-gold-dark)" />
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-brand-deep)' }}>AI is good at:</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span>Repetitive tasks</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span>Fast responses (under 10 seconds)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span>Data processing &amp; organization</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span>Follow-ups that never get forgotten</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span>Routine 24/7 communication</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span>Continuous pipeline monitoring</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span>Executive morning summaries</span>
                </div>
              </div>
            </div>

            {/* Humans are good at */}
            <div style={{
              padding: '36px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--color-gold)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <UserCheck size={22} color="#059669" />
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-brand-deep)' }}>Humans are good at:</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Building trust &amp; personal rapport</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Commercial price negotiation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Complex property decisions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Long-term buyer relationships</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Conducting on-ground site visits</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Closing the sale &amp; registry</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Strategic business direction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — HOW IT WORKS (5 STEPS)
          ========================================================================= */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Layers size={14} />
              <span>Step-by-Step Overview</span>
            </div>
            <h2 className="section-title">
              From Enquiry to Action
            </h2>
            <p className="section-subtitle">
              How work flows seamlessly between your customer, the AI, and your sales team.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                01
              </span>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                Customer interacts
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Buyer sends a message on WhatsApp, fills a web form, or clicks on an advertisement.
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                02
              </span>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                AI understands
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                The agent reads the inquiry, identifies budget, preferred corridor, and readiness.
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                03
              </span>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                AI takes the next action
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Shares layout PDFs, answers approval questions, or triggers a polite qualification call.
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                04
              </span>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                Systems are updated
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                CRM lead stages, conversation notes, and follow-up schedules are logged automatically.
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-gold)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', display: 'block', marginBottom: '8px' }}>
                05
              </span>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                Human team gets involved
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Sales reps take over pre-qualified buyers to conduct physical site visits and close deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — BUSINESS BENEFITS (MEASURABLE AREAS)
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <TrendingUp size={14} />
              <span>Measurable Value</span>
            </div>
            <h2 className="section-title">
              Practical Business Impact You Can Measure
            </h2>
            <p className="section-subtitle">
              We focus on clear, real-world operational improvements rather than hypothetical claims.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                ⚡ Faster Response
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
                Reduce the delay between enquiry and first response from hours to seconds, capturing buyer attention while their interest is highest.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                🔁 More Consistent Follow-Up
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
                Reduce dependence on individual salesperson memory. Ensure every promising lead is nurtured across days and weeks systematically.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                📉 Lower Repetitive Work
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
                Automate routine tasks like answering approval questions, dialing cold lists, and typing evening CRM notes, freeing hours every week.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                🎯 Better Lead Visibility
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
                Know exactly which opportunities are warm and need urgent sales attention, rather than guessing based on scattered paper notes.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                ⭐ Better Customer Experience
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
                Provide faster, polite, and consistent communication whether an enquiry arrives on Sunday morning or late in the evening.
              </p>
            </div>

            <div style={{ padding: '28px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                📊 Better Management Visibility
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
                Understand what is happening across campaigns, site visits, and team backlogs without spending hours manually collecting reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — WHO IS THIS FOR?
          ========================================================================= */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Building2 size={14} />
              <span>Target Audience</span>
            </div>
            <h2 className="section-title">
              Who Is This For?
            </h2>
            <p className="section-subtitle">
              Engineered specifically for real estate practitioners across Tamil Nadu.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Developers</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>Real Estate Developers</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Manage large volumes of enquiries and multi-touch follow-ups across ongoing and upcoming project layouts.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Agencies</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>Real Estate Agencies</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Help sales teams manage incoming leads, automate qualification calls, and speed up customer communication.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Brokers</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>Brokers &amp; Consultants</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Automate repetitive lead qualification and follow-up tasks so you can focus entirely on high-intent buyer meetings.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Sales Teams</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>Sales Teams</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Reduce administrative evening data entry, receive warm pre-qualified prospects, and conduct more site visits.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '10px' }}>SMB Businesses</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>Growing Businesses</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                Build modern, automated operating systems before team growth creates communication bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — START SMALL (PRACTICAL ENTRY POINTS)
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Zap size={14} />
              <span>Practical Starting Point</span>
            </div>
            <h2 className="section-title">
              You Don't Need 10 AI Agents on Day One.
            </h2>
            <p className="section-subtitle">
              Start with the workflow that is costing your business the most time right now.
            </p>
          </div>

          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '28px' }}>
              <button 
                onClick={() => setStartSmallProblem('unanswered_leads')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: startSmallProblem === 'unanswered_leads' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: startSmallProblem === 'unanswered_leads' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                  💬 Too many unanswered leads?
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                  → Start with AI WhatsApp Agent
                </div>
              </button>

              <button 
                onClick={() => setStartSmallProblem('missing_followups')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: startSmallProblem === 'missing_followups' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: startSmallProblem === 'missing_followups' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                  🔁 Sales team missing follow-ups?
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                  → Start with AI Follow-Up Agent
                </div>
              </button>

              <button 
                onClick={() => setStartSmallProblem('repetitive_calls')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: startSmallProblem === 'repetitive_calls' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: startSmallProblem === 'repetitive_calls' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                  📞 Too many repetitive calls?
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                  → Start with AI Calling Agent
                </div>
              </button>

              <button 
                onClick={() => setStartSmallProblem('crm_not_updated')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: startSmallProblem === 'crm_not_updated' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: startSmallProblem === 'crm_not_updated' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                  📝 CRM is not being updated?
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                  → Start with AI CRM Copilot
                </div>
              </button>

              <button 
                onClick={() => setStartSmallProblem('leads_lost')}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: startSmallProblem === 'leads_lost' ? 'var(--color-gold)' : 'var(--color-border)',
                  backgroundColor: startSmallProblem === 'leads_lost' ? 'rgba(197, 160, 89, 0.08)' : 'var(--color-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                  🚨 Don't know where leads are lost?
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                  → Start with AI Revenue Leakage Agent
                </div>
              </button>
            </div>

            {/* Dynamic Result Card */}
            <div style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
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
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Recommended First Step</span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-brand-deep)', marginBottom: '6px' }}>
                  {startSmallProblem === 'unanswered_leads' && 'AI WhatsApp Agent'}
                  {startSmallProblem === 'missing_followups' && 'AI Follow-Up Agent'}
                  {startSmallProblem === 'repetitive_calls' && 'AI Calling Agent'}
                  {startSmallProblem === 'crm_not_updated' && 'AI CRM Copilot'}
                  {startSmallProblem === 'leads_lost' && 'AI Revenue Leakage Agent'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', maxWidth: '520px' }}>
                  {startSmallProblem === 'unanswered_leads' && 'Deploys on your official WhatsApp number to greet new prospects within seconds, answer project questions, and schedule site visits 24/7.'}
                  {startSmallProblem === 'missing_followups' && 'Maintains structured multi-touch follow-up rhythms across WhatsApp so no interested lead is ever forgotten after initial contact.'}
                  {startSmallProblem === 'repetitive_calls' && 'Handles outbound dialing, routine qualification questions, and site visit confirmations over natural voice calls.'}
                  {startSmallProblem === 'crm_not_updated' && 'Lets your salespeople update lead stages, notes, and tasks via WhatsApp voice notes without typing into clunky software.'}
                  {startSmallProblem === 'leads_lost' && 'Monitors your pipeline 24/7 to flag neglected leads and missed follow-ups before customer opportunities are lost.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link 
                  to={`/ai/${
                    startSmallProblem === 'unanswered_leads' ? 'ai-whatsapp-agent' :
                    startSmallProblem === 'missing_followups' ? 'ai-follow-up-agent' :
                    startSmallProblem === 'repetitive_calls' ? 'ai-calling-agent' :
                    startSmallProblem === 'crm_not_updated' ? 'ai-crm-copilot' : 'ai-revenue-leakage-agent'
                  }`}
                  className="btn btn-primary btn-md"
                >
                  <span>See How It Works</span>
                  <ArrowRight size={14} />
                </Link>
                <button 
                  onClick={() => onOpenEnquiry('Deploy Single AI Agent')}
                  className="btn btn-outline btn-md"
                >
                  Deploy This Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — AI WORKFORCE PACKAGE
          ========================================================================= */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Briefcase size={14} />
              <span>Modular Implementation</span>
            </div>
            <h2 className="section-title">
              Build Your Own AI Workforce
            </h2>
            <p className="section-subtitle">
              Combine agents based on your requirements. Start with essential communication and expand as your pipeline grows.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', maxWidth: '1080px', margin: '0 auto' }}>
            {/* Starter Package */}
            <div style={{
              padding: '36px 30px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span className="badge badge-dark" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>Starter</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                Starter Package
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '24px' }}>
                Essential front-line response and consistent lead nurturing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI WhatsApp Agent</strong> (24/7 instant replies)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI Follow-Up Agent</strong> (Automated nurturing)</span>
                </div>
              </div>

              <button 
                onClick={() => onOpenEnquiry('Consultation for Starter AI Package')}
                className="btn btn-outline btn-md"
                style={{ width: '100%' }}
              >
                Choose Starter Package
              </button>
            </div>

            {/* Sales Acceleration Package */}
            <div style={{
              padding: '36px 30px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--color-gold)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>Most Popular</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                Sales Acceleration Package
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '24px' }}>
                Full qualification, omni-channel follow-up, and telecalling.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI Sales Agent</strong> (Inbound qualification)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI WhatsApp Agent</strong> (24/7 conversation)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI Follow-Up Agent</strong> (Multi-touch cadence)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI Calling Agent</strong> (Outbound telecaller)</span>
                </div>
              </div>

              <button 
                onClick={() => onOpenEnquiry('Consultation for Sales Acceleration AI Package')}
                className="btn btn-primary btn-md"
                style={{ width: '100%' }}
              >
                Choose Sales Package
              </button>
            </div>

            {/* Growth & Intelligence Package */}
            <div style={{
              padding: '36px 30px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span className="badge badge-dark" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>Enterprise Growth</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                Growth &amp; Intelligence
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '24px' }}>
                Complete operational layer with intelligence and audits.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>All Sales Agents</strong> (Sales, WhatsApp, Follow-Up, Calling)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI CRM Copilot</strong> (Voice updates &amp; logging)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--color-gold-dark)" />
                  <span><strong>AI Intelligence Layer</strong> (Leakage &amp; Morning Brief)</span>
                </div>
              </div>

              <button 
                onClick={() => onOpenEnquiry('Consultation for Growth & Intelligence AI Package')}
                className="btn btn-outline btn-md"
                style={{ width: '100%' }}
              >
                Choose Growth Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 — FINAL CALL TO ACTION
          ========================================================================= */}
      <section className="section" style={{
        backgroundColor: 'var(--color-brand-deep)',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '90px 0'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-eyebrow" style={{ backgroundColor: 'rgba(223, 186, 115, 0.15)', color: '#DFBA73', margin: '0 auto 16px' }}>
            <Sparkles size={14} />
            <span>Ready to Begin?</span>
          </div>

          <h2 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.2 }}>
            Which Part of Your Business <br />
            <span style={{ color: '#DFBA73' }}>Should AI Handle First?</span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', marginBottom: '36px', lineHeight: 1.6 }}>
            Tell us where your team is spending too much time. We'll identify the exact workflow that can be automated first.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <button 
              onClick={() => onOpenEnquiry('AI Workforce Discovery')}
              className="btn btn-primary btn-lg"
            >
              <span>Talk to Nam Nilam AI</span>
              <ArrowRight size={16} />
            </button>
            <a 
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam AI, I want to discuss automating repetitive tasks for my real estate business.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#94A3B8' }}>
            Direct Real Estate Advisory Desk: <strong>{BRAND_INFO.phoneFormatted}</strong> • Melachinthamani, Trichy
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13 — FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <div className="section-eyebrow">
              <HelpCircle size={14} />
              <span>Common Questions</span>
            </div>
            <h2 className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Clear, practical answers about deploying AI agents in your real estate business.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: isOpen ? 'var(--color-gold-dark)' : 'var(--color-brand-deep)'
                    }}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--color-gold-dark)" /> : <ChevronDown size={18} color="#94A3B8" />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 22px',
                      fontSize: '0.93rem',
                      color: 'var(--color-ink-muted)',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--color-border)'
                    }}>
                      <div style={{ paddingTop: '14px' }}>
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
