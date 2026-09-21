import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileCheck2, 
  Download, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  FileSpreadsheet,
  MessageSquare,
  Sparkles,
  Bot,
  Layers,
  Calendar,
  User,
  ShieldCheck
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { EDUCATIONAL_RESOURCES, BRAND_INFO } from '../data/ecosystemData';

export const ResourcesPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();
  const [activeFilter, setActiveFilter] = useState('All');

  const resource = slug ? EDUCATIONAL_RESOURCES.find(r => r.slug === slug) : null;

  // If viewing a single resource article
  if (slug && resource) {
    const articleFaqs = [];
    (resource.sections || []).forEach(sec => {
      if (sec.faqs && Array.isArray(sec.faqs)) {
        sec.faqs.forEach(f => articleFaqs.push({ question: f.q, answer: f.a }));
      }
    });

    return (
      <div>
        <SeoHead 
          title={`${resource.title} | Nam Nilam Resources`}
          description={resource.summary}
          canonical={`/resources/${resource.slug}`}
          type="article"
          breadcrumbs={[
            { label: 'Resources', path: '/resources' },
            { label: resource.title }
          ]}
          faqs={articleFaqs.length > 0 ? articleFaqs : null}
        />

        <Breadcrumbs items={[
          { label: 'Resources', path: '/resources' },
          { label: resource.title }
        ]} />

        {/* Article Hero */}
        <section className="page-hero">
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">
                <BookOpen size={12} />
                {resource.category}
              </span>
              <span className="badge badge-dark">
                <Clock size={12} />
                {resource.readTime}
              </span>
            </div>

            <h1 style={{ fontSize: '2.6rem', color: 'var(--color-brand-deep)', marginBottom: '16px', lineHeight: 1.25 }}>
              {resource.title}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '820px', lineHeight: 1.65, marginBottom: '20px' }}>
              {resource.summary}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.85rem', color: '#64748B' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} /> {resource.author || 'Nam Nilam Knowledge Desk'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} /> {resource.date || 'Updated 2026'}
              </span>
            </div>
          </div>
        </section>

        {/* Article Body & Sidebar */}
        <section className="section">
          <div className="container">
            <div className="service-overview-grid">
              {/* Left Column: Full Content */}
              <div>
                {(resource.sections || []).map((sec, idx) => (
                  <div key={idx} style={{ marginBottom: '44px' }}>
                    <h2 style={{ fontSize: '1.65rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                      {sec.heading}
                    </h2>

                    {sec.content && (
                      <div style={{
                        fontSize: '1.02rem',
                        color: 'var(--color-ink)',
                        lineHeight: 1.75,
                        whiteSpace: 'pre-line'
                      }}>
                        {sec.content}
                      </div>
                    )}

                    {/* Comparison Table (e.g. AI Telecaller vs Human Telecaller) */}
                    {sec.comparisonTable && (
                      <div style={{ overflowX: 'auto', marginTop: '20px', marginBottom: '20px' }}>
                        <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          backgroundColor: '#FFFFFF',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          <thead>
                            <tr style={{ backgroundColor: 'var(--color-brand-deep)', color: '#FFFFFF', textAlign: 'left', fontSize: '0.9rem' }}>
                              <th style={{ padding: '14px 18px' }}>Capability / Parameter</th>
                              <th style={{ padding: '14px 18px', color: '#94A3B8' }}>Human Telecaller</th>
                              <th style={{ padding: '14px 18px', color: '#DFBA73' }}>Nam Nilam AI Telecaller</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sec.comparisonTable.map((row, rIdx) => (
                              <tr key={rIdx} style={{ borderBottom: '1px solid var(--color-border)', fontSize: '0.92rem' }}>
                                <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--color-brand-deep)' }}>{row.attribute}</td>
                                <td style={{ padding: '14px 18px', color: 'var(--color-ink-muted)' }}>{row.human}</td>
                                <td style={{ padding: '14px 18px', fontWeight: 600, color: '#059669' }}>{row.ai}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Section FAQs if any */}
                    {sec.faqs && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                        {sec.faqs.map((f, fIdx) => (
                          <div key={fIdx} style={{
                            padding: '20px',
                            backgroundColor: 'var(--color-canvas)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)'
                          }}>
                            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                              {f.q}
                            </h3>
                            <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', margin: 0, lineHeight: 1.6 }}>
                              {f.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Final Callout in Article */}
                <div style={{
                  padding: '28px',
                  backgroundColor: 'rgba(197, 160, 89, 0.08)',
                  border: '1px solid var(--color-gold-border)',
                  borderRadius: 'var(--radius-lg)',
                  marginTop: '40px'
                }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-brand-deep)', marginBottom: '10px' }}>
                    Have Specific Questions Regarding This Guide?
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-muted)', lineHeight: 1.6, marginBottom: '18px' }}>
                    Connect directly with our advisory and automation specialists in Tiruchirappalli for tailored evaluation.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => onOpenEnquiry(`Question on Guide: ${resource.title}`)}
                      className="btn btn-primary"
                    >
                      <span>Talk to an Expert</span>
                    </button>
                    <a 
                      href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I have a question about: ${resource.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp Advisory Desk</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Contextual Cross-Links */}
              <div>
                {/* Related Agents */}
                {resource.relatedAgents && resource.relatedAgents.length > 0 && (
                  <div style={{
                    padding: '28px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    marginBottom: '28px'
                  }}>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                      Applicable AI Agents
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {resource.relatedAgents.map(agSlug => (
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
                            fontSize: '0.88rem',
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
                )}

                {/* Related Use Cases */}
                {resource.relatedUseCases && resource.relatedUseCases.length > 0 && (
                  <div style={{
                    padding: '28px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    marginBottom: '28px'
                  }}>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                      Related Workflows
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {resource.relatedUseCases.map(ucSlug => (
                        <Link
                          key={ucSlug}
                          to={`/ai/use-cases/${ucSlug}`}
                          style={{
                            fontSize: '0.88rem',
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
                )}

                {/* Other Resources */}
                <div style={{
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>
                    More Guides & Checklists
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {EDUCATIONAL_RESOURCES.filter(r => r.slug !== resource.slug).slice(0, 6).map(r => (
                      <Link
                        key={r.slug}
                        to={`/resources/${r.slug}`}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-ink-muted)',
                          textDecoration: 'none',
                          padding: '6px 0',
                          borderBottom: '1px solid #F1F5F9',
                          display: 'block',
                          lineHeight: 1.4
                        }}
                      >
                        {r.title}
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

  // Directory View
  const categories = ['All', 'AI Education', 'AI Strategy', 'Sales Automation', 'Buyer Guide', 'Legal Guide'];

  const filteredResources = EDUCATIONAL_RESOURCES.filter(r => {
    if (activeFilter === 'All') return true;
    return r.category === activeFilter;
  });

  return (
    <div>
      <SeoHead 
        title="Real Estate Resources, Checklists & AI Guides | Nam Nilam"
        description="Comprehensive real estate educational guides, downloadable due diligence checklists, WhatsApp automation tutorials, and AI agent frameworks for Tamil Nadu."
        canonical="/resources"
        breadcrumbs={[{ label: 'Resources' }]}
      />

      <Breadcrumbs items={[{ label: 'Resources' }]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <BookOpen size={14} />
            <span>Knowledge Hub & Tools</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Real Estate Resources & Checklists
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Actionable buyer checklists, document verification tutorials, and downloadable educational guides to protect your hard-earned capital and scale your real-estate business.
          </p>

          {/* Filter Chips */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: activeFilter === cat ? 'var(--color-brand-deep)' : 'var(--color-canvas)',
                  color: activeFilter === cat ? '#FFFFFF' : 'var(--color-ink-muted)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid-2">
            {filteredResources.map((res) => (
              <div key={res.slug} style={{
                padding: '32px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-gold">{res.category}</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{res.readTime || '5 mins read'}</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                  {res.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: 1.6, flexGrow: 1 }}>
                  {res.summary}
                </p>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <Link 
                    to={`/resources/${res.slug}`}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight size={14} />
                  </Link>
                  <button 
                    onClick={() => onOpenEnquiry(`Resource Inquiry: ${res.title}`)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Request Template</span>
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
