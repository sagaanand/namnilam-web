import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Car, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Droplets,
  Building,
  Phone
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TRICHY_PROJECTS, BRAND_INFO } from '../data/ecosystemData';
import { getProjects } from '../services/api';

export const ProjectsPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();
  const [projectList, setProjectList] = useState(TRICHY_PROJECTS);

  useEffect(() => {
    const load = async () => {
      const data = await getProjects();
      if (Array.isArray(data) && data.length > 0) {
        setProjectList(data);
      }
    };
    load();
  }, []);

  // If specific project slug is provided
  const project = slug ? (projectList.find(p => p.slug === slug) || TRICHY_PROJECTS.find(p => p.slug === slug)) : null;

  if (slug && project) {
    return (
      <div>
        <Breadcrumbs items={[
          { label: 'Projects (Trichy)', path: '/projects' },
          { label: project.title }
        ]} />

        {/* Project Detail Hero */}
        <section className="page-hero">
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">
                <MapPin size={12} />
                {project.location}
              </span>
              <span className="badge badge-green">
                <ShieldCheck size={12} />
                {project.approvalNo}
              </span>
              <span className="badge badge-dark">
                RERA: {project.reraNumber}
              </span>
            </div>

            <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '12px' }}>
              {project.title}
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-ink-muted)', maxWidth: '780px', lineHeight: 1.65 }}>
              {project.overview}
            </p>

            {/* Price & Action Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '28px', flexWrap: 'wrap' }}>
              <div style={{ padding: '10px 20px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Base Rate</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', fontFamily: 'var(--font-mono)' }}>
                  {project.rateSqft} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>/ sq.ft</span>
                </strong>
              </div>

              <button 
                onClick={() => onOpenEnquiry(`Book Free Site Visit: ${project.title}`)}
                className="btn btn-primary btn-lg"
              >
                <Car size={18} />
                <span>Book Free Site Visit Cab</span>
              </button>

              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I would like to schedule a site visit and enquire about ${project.title} in Trichy.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="section">
          <div className="container">
            <div className="service-overview-grid">
              {/* Left Column: Image, Highlights, Connectivity */}
              <div>
                <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '36px', boxShadow: 'var(--shadow-lg)' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '420px', objectFit: 'cover' }} 
                  />
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Project Highlights</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {project.highlights.map((hl, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem' }}>
                        <CheckCircle2 size={18} color="var(--color-gold-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connectivity */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Location Connectivity & Proximity</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    {project.connectivity.map((conn, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        backgroundColor: 'var(--color-canvas)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)'
                      }}>
                        <div style={{ fontSize: '0.82rem', color: '#64748B' }}>{conn.time} ({conn.distance})</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-brand-deep)' }}>{conn.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Specifications Card */}
              <div>
                <div className="deliverables-box" style={{ marginBottom: '24px' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Layout Facts</span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Property Specifications</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Location:</span>
                      <strong>{project.location}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Plot Dimensions:</span>
                      <strong>{project.plotSizes}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Groundwater Level:</span>
                      <strong style={{ color: '#059669' }}>{project.waterTable}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Govt Guideline:</span>
                      <strong>{project.guidelineValue}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Projected 3-Yr CAGR:</span>
                      <strong style={{ color: 'var(--color-gold-dark)' }}>{project.cagr}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Availability:</span>
                      <strong>{project.availablePlots} of {project.totalPlots} Plots Left</strong>
                    </div>
                  </div>

                  <button 
                    onClick={() => onOpenEnquiry(`Site Visit: ${project.title}`)}
                    className="btn btn-primary btn-md"
                    style={{ width: '100%', marginTop: '24px' }}
                  >
                    <span>Book Free Site Visit Cab</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Office Contact Help */}
                <div style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-brand-deep)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '8px' }}>
                    Need Layout Documents?
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '14px', lineHeight: 1.5 }}>
                    Our sales advisory team in Melachinthamani, Trichy can share the certified DTCP layout approval, FMB sketch, and Patta verification records.
                  </p>
                  <a 
                    href={`tel:${BRAND_INFO.phone}`}
                    style={{ color: '#DFBA73', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Phone size={15} />
                    <span>Call {BRAND_INFO.phoneFormatted}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Projects Overview (Strictly Trichy)
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Projects (Trichy)' }]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <MapPin size={14} />
            <span>Tiruchirappalli (Trichy) Developments</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Projects by Nam Nilam in Trichy
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Nam Nilam's direct development projects are focused specifically in Tiruchirappalli across major arterial corridors: Samayapuram (NH-45), Airport-Mathur, and Dindigul Highway.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trichy-projects-grid">
            {projectList.map((proj) => {
              const pTitle = proj.title || proj.name;
              const pRate = proj.price_per_sqft || proj.rateSqft || 1500;
              const pImg = proj.image_url || proj.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';
              const pOverview = proj.overview || proj.description || 'Verified residential plots in high-growth corridor of Tiruchirappalli with immediate registration readiness.';
              const pWater = proj.waterTable ? proj.waterTable.split(' ')[0] : 'Potable';

              return (
                <div key={proj.slug || proj.id} className="project-card">
                  <div className="project-img-wrapper">
                    <img src={pImg} alt={pTitle} className="project-img" />
                    <span className="project-tag">{proj.status || 'Ready to Register'}</span>
                    <span className="project-rate-pill">₹{pRate} / sq.ft</span>
                  </div>

                  <div className="project-body">
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                      <MapPin size={13} />
                      <span>{proj.location}</span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                      {pTitle}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '18px', lineHeight: 1.55 }}>
                      {pOverview.slice(0, 115)}...
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      padding: '12px',
                      backgroundColor: 'var(--color-canvas)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      marginBottom: '20px'
                    }}>
                      <div>
                        <span style={{ color: '#64748B', display: 'block' }}>Approval</span>
                        <strong>{proj.approval || 'DTCP Approved'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block' }}>Water Table</span>
                        <strong style={{ color: '#059669' }}>{pWater}</strong>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                      <Link to={`/projects/${proj.slug}`} className="btn btn-dark btn-sm" style={{ flex: 1 }}>
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </Link>
                      <button 
                        onClick={() => onOpenEnquiry(`Book Site Visit: ${pTitle}`)}
                        className="btn btn-primary btn-sm"
                        title="Book Site Visit"
                      >
                        <Car size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scope Transparency Notice */}
          <div style={{
            marginTop: '56px',
            padding: '28px 32px',
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <ShieldCheck size={28} color="var(--color-gold-dark)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
              <strong>Scope Notice: </strong>
              Nam Nilam does not fabricate statewide property listings. All projects above are authentic, physically inspected developments in Tiruchirappalli. If you are looking for advisory in other Tamil Nadu regions, please explore our <Link to="/services/real-estate-advisory" style={{ color: 'var(--color-gold-dark)', textDecoration: 'underline' }}>Real Estate Advisory Services</Link>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
