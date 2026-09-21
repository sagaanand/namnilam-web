import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Send, 
  Compass, 
  ShieldCheck, 
  Cpu, 
  GraduationCap
} from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { BRAND_INFO } from '../data/ecosystemData';
import { submitLead } from '../services/api';

export const CareersPage = ({ onOpenEnquiry }) => {
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '1-3 years',
    portfolio: '',
    coverNote: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    { id: 'all', label: 'All Roles' },
    { id: 'advisory', label: 'Advisory & Legal' },
    { id: 'tech', label: 'AI & Engineering' },
    { id: 'research', label: 'Market Intelligence' },
    { id: 'media', label: 'Media & Academy' }
  ];

  const jobs = [
    {
      id: 'legal-due-diligence',
      title: 'Senior Real Estate Legal Due Diligence Analyst',
      dept: 'advisory',
      deptLabel: 'Advisory & Legal',
      location: 'Trichy / Chennai',
      type: 'Full-Time',
      experience: '3 - 7 Years',
      overview: 'Lead 45-point parent document title investigations, revenue records verification (Patta/Chitta/TSLR), DTCP/RERA approvals, and encumbrance certifications for private clients and syndicate investors.',
      requirements: [
        'Degree in Law (LL.B / B.A. LL.B) with active bar enrollment preferred.',
        'Hands-on experience verifying Tamil Nadu revenue records, parent deeds from 1980s, and guideline values.',
        'Strong drafting skills in both English and Tamil.',
        'Passion for investor protection and transparent real estate governance.'
      ],
      benefits: ['Competitive compensation', 'Performance bonuses on advisory mandates', 'Direct executive leadership collaboration']
    },
    {
      id: 'ai-automation-engineer',
      title: 'AI & Automation Engineer (WhatsApp / LLMs)',
      dept: 'tech',
      deptLabel: 'AI & Engineering',
      location: 'Trichy / Hybrid',
      type: 'Full-Time',
      experience: '2 - 5 Years',
      overview: 'Architect and deploy Nam Nilam’s autonomous conversational agents, real-time WhatsApp bots for lead qualification, CRM copilots, and revenue leakage detection engines for real estate developers.',
      requirements: [
        'Demonstrated expertise with Python, Node.js, and Modern Web Frameworks (React).',
        'Experience integrating WhatsApp Business Cloud API and conversational workflows.',
        'Familiarity with LLM orchestration (OpenAI, Gemini, LangChain) and vector embeddings.',
        'Knowledge of real estate CRM pipelines is a strong advantage.'
      ],
      benefits: ['High autonomy engineering environment', 'Modern tech stack', 'Fast-track product leadership path']
    },
    {
      id: 'gis-market-analyst',
      title: 'GIS Land Surveyor & Micro-Market Field Analyst',
      dept: 'research',
      deptLabel: 'Market Intelligence',
      location: 'Tiruchirappalli (Field + HQ)',
      type: 'Full-Time',
      experience: '1 - 4 Years',
      overview: 'Conduct on-site boundary measurements, FMB sketch cross-checks, groundwater table assessments, corridor infrastructure tracking, and price trend indexing across Tier-2/Tier-3 growth corridors.',
      requirements: [
        'Diploma / Degree in Civil Engineering, Geoinformatics, or Surveying.',
        'Proficiency in GIS tools, Google Earth mapping, and physical land perimeter instruments.',
        'Valid two-wheeler license and deep familiarity with Trichy and Central TN districts.',
        'High integrity and eye for ground-level spatial realities.'
      ],
      benefits: ['Field allowances & travel coverage', 'Cutting-edge geospatial technology access', 'Comprehensive health cover']
    },
    {
      id: 'advisory-relationship-lead',
      title: 'Real Estate Advisory Associate / Relationship Lead',
      dept: 'advisory',
      deptLabel: 'Advisory & Legal',
      location: 'Trichy (Melachinthamani Office)',
      type: 'Full-Time',
      experience: '2 - 6 Years',
      overview: 'Act as the trusted primary advisor for NRI investors and Tamil land buyers. Guide clients through verified DTCP layout dossiers, comparative valuation reports, and site visit schedules.',
      requirements: [
        'Proven track record in high-value consultative real estate or wealth advisory.',
        'Exceptional Tamil and English spoken and written communication skills.',
        'Fiduciary mindset: zero high-pressure sales tactics, purely intelligence-backed recommendations.',
        'High comfort with CRM workflows and structured follow-up cadences.'
      ],
      benefits: ['Attractive fixed salary + deal incentives', 'NRI investor portfolio management', 'Professional executive training']
    },
    {
      id: 'media-content-specialist',
      title: 'Tamil Real Estate Content & Academy Producer',
      dept: 'media',
      deptLabel: 'Media & Academy',
      location: 'Trichy / Remote',
      type: 'Full-Time / Part-Time',
      experience: '1 - 3 Years',
      overview: 'Produce educational videos, infographics, and written breakdown guides on land purchase laws, guideline valuation checks, and smart investment frameworks for Tamil Land Buyer Academy.',
      requirements: [
        'Native fluency in Tamil with ability to explain complex legal/financial concepts clearly.',
        'Video production and short-form storytelling skills (YouTube, Reels, LinkedIn).',
        'Basic understanding of Tamil Nadu property purchase workflows is a huge plus.',
        'Curious and enthusiastic mindset.'
      ],
      benefits: ['Creative freedom', 'Impactful educational reach across 50,000+ viewers', 'Equipment & software stipend']
    }
  ];

  const filteredJobs = selectedDept === 'all' 
    ? jobs 
    : jobs.filter(j => j.dept === selectedDept);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    const el = document.getElementById('career-form-section');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      form_type: 'Career Application',
      intent_purpose: selectedJob ? selectedJob.title : 'General Application',
      location: selectedJob ? selectedJob.location : 'Trichy',
      notes: `Experience: ${formState.experience} | Portfolio: ${formState.portfolio} | Message: ${formState.coverNote}`
    };

    try {
      await submitLead(payload);
    } catch (err) {
      console.warn('Backend logging fallback active:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="careers-page">
      <SeoHead
        title="Careers at Nam Nilam | Real Estate Intelligence & Advisory"
        description="Join Nam Nilam Infra Private Limited. Build data-driven legal intelligence, AI workforce agents, and ethical land advisory for Tamil Nadu."
        canonical="/careers"
      />

      {/* Hero Section */}
      <section className="page-hero" style={{ backgroundColor: 'var(--color-brand-deep)', color: '#FFFFFF', padding: '70px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '50px', backgroundColor: 'rgba(223, 186, 115, 0.15)', border: '1px solid rgba(223, 186, 115, 0.3)', color: '#DFBA73', fontSize: '0.85rem', fontWeight: 700, marginBottom: '20px' }}>
            <Briefcase size={15} />
            <span>WE ARE EXPANDING IN TAMIL NADU</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.02em' }}>
            Build the Future of <span style={{ color: '#DFBA73' }}>Real Estate Intelligence</span>
          </h1>

          <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#CBD5E1', marginBottom: '32px' }}>
            At Nam Nilam, we are eliminating guesswork, fraud, and opacity from land purchases. We combine rigorous legal due diligence, micro-market data, and autonomous AI agents to empower buyers and developers.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '0.9rem', color: '#DFBA73', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} />
              <span>Zero-Fraud Fiduciary Mandate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} />
              <span>Cutting-Edge AI & GIS Workflows</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} />
              <span>Headquartered in Tiruchirappalli</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-dark)' }}>
              Why Work With Us
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-brand-deep)', marginTop: '8px' }}>
              A Mission That Truly Matters
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--color-canvas)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '10px', backgroundColor: 'rgba(223, 186, 115, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-gold-dark)' }}>
                <Compass size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-brand-deep)', marginBottom: '10px' }}>
                Intellectual Integrity
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                We never push a property just to make a fee. If a land parcel has legal ambiguity or unfavorable appreciation curves, we report it bluntly.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-canvas)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#10B981' }}>
                <Cpu size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-brand-deep)', marginBottom: '10px' }}>
                Autonomous AI Systems
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                You work alongside modern digital tools — autonomous conversational agents, real-time valuation radar, and automated lead intelligence pipelines.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-canvas)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#3B82F6' }}>
                <GraduationCap size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-brand-deep)', marginBottom: '10px' }}>
                Continuous Learning
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                From masterclasses on TN Land Reforms and TSLR records to modern AI engineering, you develop rare, high-value domain expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '35px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-dark)' }}>
                Current Openings
              </span>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--color-brand-deep)', marginTop: '6px' }}>
                Join the Core Team
              </h2>
            </div>

            {/* Department Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {departments.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDept(d.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: selectedDept === d.id ? 'var(--color-brand-deep)' : 'var(--color-border)',
                    backgroundColor: selectedDept === d.id ? 'var(--color-brand-deep)' : 'var(--color-canvas)',
                    color: selectedDept === d.id ? '#FFFFFF' : 'var(--color-ink-light)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredJobs.map(job => (
              <div 
                key={job.id}
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', backgroundColor: 'rgba(223, 186, 115, 0.18)', color: 'var(--color-gold-dark)' }}>
                        {job.deptLabel}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} /> {job.location}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> {job.type} ({job.experience})
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-brand-deep)' }}>
                      {job.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleApplyClick(job)}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                  >
                    <span>Apply for Role</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {job.overview}
                </p>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.85rem' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <strong style={{ color: 'var(--color-brand-deep)', display: 'block', marginBottom: '6px' }}>Key Expectations:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {job.requirements.map((req, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '6px', color: 'var(--color-ink-muted)', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--color-gold-dark)' }}>•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ flex: '1 1 240px' }}>
                    <strong style={{ color: 'var(--color-brand-deep)', display: 'block', marginBottom: '6px' }}>What We Offer:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {job.benefits.map((ben, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-ink-muted)', marginBottom: '4px' }}>
                          <CheckCircle2 size={13} color="#10B981" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="career-form-section" style={{ padding: '60px 0 90px', backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-xl)', padding: '36px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-dark)' }}>
                Direct Recruitment Desk
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-brand-deep)', marginTop: '6px' }}>
                {selectedJob ? `Apply: ${selectedJob.title}` : 'Submit Your Profile to Nam Nilam'}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginTop: '6px' }}>
                We review every application thoroughly. Our team will contact shortlisted candidates within 48 hours.
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                  Application Received!
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                  Thank you for your interest in joining Nam Nilam. Our talent acquisition desk has received your details and will get in touch with you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSelectedJob(null); }}
                  className="btn btn-primary btn-sm"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-canvas)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98400 12345"
                      value={formState.phone}
                      onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-canvas)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@domain.com"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-canvas)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                      Total Experience
                    </label>
                    <select
                      value={formState.experience}
                      onChange={e => setFormState({ ...formState, experience: e.target.value })}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-canvas)' }}
                    >
                      <option value="Fresher / < 1 year">Fresher / Under 1 Year</option>
                      <option value="1-3 years">1 – 3 Years</option>
                      <option value="3-5 years">3 – 5 Years</option>
                      <option value="5+ years">5+ Years (Senior Lead)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    LinkedIn Profile or Portfolio / Resume Link
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://linkedin.com/in/yourprofile or Google Drive resume link"
                    value={formState.portfolio}
                    onChange={e => setFormState({ ...formState, portfolio: e.target.value })}
                    style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-canvas)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Why are you interested in joining Nam Nilam?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share a brief overview of your background, key achievements, or specific interests..."
                    value={formState.coverNote}
                    onChange={e => setFormState({ ...formState, coverNote: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-canvas)' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                    Direct Hiring: <a href="mailto:advisory@namnilam.com" style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>advisory@namnilam.com</a>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-md"
                    style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Application'}
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
