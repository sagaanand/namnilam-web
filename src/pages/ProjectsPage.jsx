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
  Phone,
  CreditCard,
  Compass,
  Info
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
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
  const seedProject = TRICHY_PROJECTS.find(p => p.slug === slug);
  const matchedProject = slug ? (projectList.find(p => p.slug === slug) || seedProject) : null;
  const project = matchedProject ? { ...seedProject, ...matchedProject } : null;

  if (slug && project) {
    const pTitle = project.title || project.name || 'Project Details';
    const pLocation = project.location || 'Trichy';
    const rawRate = project.rateSqft || project.price_per_sqft || 850;
    const pRate = typeof rawRate === 'string' && rawRate.startsWith('₹') ? rawRate : `₹${rawRate}`;
    const pPrefix = project.ratePrefix || '';
    const pImage = project.image || project.image_url || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';
    const pOverview = project.overview || project.description || 'Master-planned approved residential layout in high-growth corridor of Tiruchirappalli.';
    const pWater = project.waterTable || '20 ft (Sweet Ground Water)';
    const pGuideline = project.guidelineValue || 'Fair Market Indexed';
    const pGuidelineNote = project.guidelineNote;
    const pEmiAvailable = project.emiAvailable;
    const pEmiNote = project.emiNote;
    const pCorridor = project.corridor;
    const pCagr = project.cagr || '+16.5%';
    const pAvailable = project.availablePlots || project.available_units || 12;
    const pTotal = project.totalPlots || project.total_units || 45;
    const pApproval = project.approvalNo || project.approval || 'DTCP Approved';
    const pRera = project.reraNumber || 'TN-RERA Sanctioned';
    const pPlotSizes = project.plotSizes || '1,200 – 2,400 sq.ft';

    const pHighlights = Array.isArray(project.highlights) && project.highlights.length > 0
      ? project.highlights
      : (project.amenities
          ? (typeof project.amenities === 'string' ? project.amenities.split(',').map(s => s.trim()) : project.amenities)
          : [
              '100% Clear Parent Documents and Encumbrance-Free Title',
              'Immediate Individual Sub-Division Patta Transfer',
              'Wide Blacktop Roads with Avenue Plantation',
              'Bank Loan Approved by Nationalized Banks'
            ]);

    const pConnectivity = Array.isArray(project.connectivity) && project.connectivity.length > 0
      ? project.connectivity
      : [
          { name: 'Trichy International Airport', distance: '8 km', time: '12 mins' },
          { name: 'Trichy Central Bus Stand', distance: '12 km', time: '18 mins' },
          { name: 'Railway Junction', distance: '14 km', time: '20 mins' },
          { name: 'Nearest National Highway', distance: '1.5 km', time: '3 mins' }
        ];

    return (
      <div>
        <SeoHead 
          title={`${pTitle} - Plots in ${pLocation} Trichy | Nam Nilam`}
          description={`${pTitle} in ${pLocation}, Trichy. ${pApproval}, ${pRera}. ${pPrefix}${pRate} per sq.ft. Clear documents and immediate patta transfer.`}
          canonical={`/projects/${project.slug || slug}`}
          schemaType="LocalBusiness"
          schemaData={{
            name: pTitle,
            description: pOverview,
            address: `${pLocation}, Tiruchirappalli, Tamil Nadu, India`,
            priceRange: `${pPrefix}${pRate} / sq.ft`
          }}
        />
        <Breadcrumbs items={[
          { label: 'Projects (Trichy)', path: '/projects' },
          { label: pTitle }
        ]} />

        {/* Project Detail Hero */}
        <section className="page-hero">
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="badge badge-gold">
                <MapPin size={12} />
                {pLocation}
              </span>
              {pCorridor && (
                <span className="badge badge-dark">
                  <Compass size={12} />
                  {pCorridor}
                </span>
              )}
              <span className="badge badge-green">
                <ShieldCheck size={12} />
                {pApproval}
              </span>
              <span className="badge badge-dark">
                RERA: {pRera}
              </span>
              {pEmiAvailable && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-pill)'
                }}>
                  <CreditCard size={12} />
                  <span>EMI Available</span>
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '12px' }}>
              {pTitle}
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-ink-muted)', maxWidth: '780px', lineHeight: 1.65 }}>
              {pOverview}
            </p>

            {/* Price & Action Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '28px', flexWrap: 'wrap' }}>
              <div style={{ padding: '10px 20px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Base Rate</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', fontFamily: 'var(--font-mono)' }}>
                  {pPrefix}{pRate} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>/ sq.ft</span>
                </strong>
              </div>

              <button 
                onClick={() => onOpenEnquiry(`Book Free Site Visit: ${pTitle}`)}
                className="btn btn-primary btn-lg"
              >
                <Car size={18} />
                <span>Book Free Site Visit Cab</span>
              </button>

              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I would like to schedule a site visit and enquire about ${pTitle} in Trichy.`)}`}
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
                    src={pImage} 
                    alt={pTitle} 
                    style={{ width: '100%', height: '420px', objectFit: 'cover' }} 
                  />
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Project Highlights</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {pHighlights.map((hl, i) => (
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
                    {pConnectivity.map((conn, i) => (
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
                <div style={{
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  marginBottom: '24px'
                }}>
                  <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Layout Facts</span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Property Specifications</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Location:</span>
                      <strong>{pLocation}</strong>
                    </div>
                    {pCorridor && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                        <span style={{ color: 'var(--color-ink-muted)' }}>Corridor:</span>
                        <strong>{pCorridor}</strong>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Plot Dimensions:</span>
                      <strong>{pPlotSizes}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Groundwater Level:</span>
                      <strong style={{ color: '#059669' }}>{pWater}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Govt Guideline:</span>
                      <strong>{pGuideline}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Projected 3-Yr CAGR:</span>
                      <strong style={{ color: 'var(--color-gold-dark)' }}>{pCagr}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Availability:</span>
                      <strong>{pAvailable} of {pTotal} Plots Left</strong>
                    </div>
                  </div>

                  {/* Guideline Disclosure Note */}
                  {pGuidelineNote && (
                    <div style={{
                      padding: '12px 14px',
                      backgroundColor: 'var(--color-canvas)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.82rem',
                      color: 'var(--color-ink-muted)',
                      lineHeight: 1.5,
                      marginTop: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-brand-deep)', fontWeight: 700, marginBottom: '4px' }}>
                        <Info size={14} color="var(--color-gold-dark)" />
                        <span>Guideline vs Market Note:</span>
                      </div>
                      {pGuidelineNote}
                    </div>
                  )}

                  {/* EMI Note */}
                  {pEmiAvailable && pEmiNote && (
                    <div style={{
                      padding: '12px 14px',
                      backgroundColor: 'rgba(5, 150, 105, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(5, 150, 105, 0.25)',
                      fontSize: '0.82rem',
                      color: '#065F46',
                      lineHeight: 1.5,
                      marginTop: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '2px' }}>
                        <CreditCard size={14} />
                        <span>EMI Facility:</span>
                      </div>
                      {pEmiNote}
                    </div>
                  )}

                  <button 
                    onClick={() => onOpenEnquiry(`Site Visit: ${pTitle}`)}
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

  if (slug && !project) {
    return (
      <div>
        <Breadcrumbs items={[
          { label: 'Projects (Trichy)', path: '/projects' },
          { label: 'Project Not Found' }
        ]} />
        <section className="section" style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-brand-deep)' }}>Project Not Found</h2>
          <p style={{ color: 'var(--color-ink-muted)', margin: '0 auto 24px', maxWidth: '500px' }}>
            The requested project layout could not be found or has been updated. Explore all available Trichy projects below.
          </p>
          <Link to="/projects" className="btn btn-primary">
            Explore All Trichy Projects
          </Link>
        </section>
      </div>
    );
  }

  // Projects Overview (Strictly Trichy)
  return (
    <div>
      <SeoHead 
        title="Verified Real Estate Projects in Trichy | DTCP & RERA Approved Plots | Nam Nilam"
        description="Explore 5 verified residential plot projects by Nam Nilam in Tiruchirappalli (Trichy): Jai Nagar, Abirami Nagar, Farm Land, Santha City, and Kasi Nath Nagar."
        canonical="/projects"
        schemaType="LocalBusiness"
        schemaData={{
          name: "Nam Nilam Trichy Property Projects",
          description: "Verified residential plots and approved layouts in Tiruchirappalli (Trichy), Tamil Nadu.",
          address: "Tiruchirappalli, Tamil Nadu, India"
        }}
      />
      <Breadcrumbs items={[{ label: 'Projects (Trichy)' }]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <MapPin size={14} />
            <span>Tiruchirappalli (Trichy) Commercial Projects</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Verified Projects by Nam Nilam in Trichy
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Nam Nilam's direct development projects are focused specifically in Tiruchirappalli across major arterial corridors: Chennai NH (NH-45), Thirupattur, and Kariyamanickam.
          </p>

          {/* Trichy cityscape hero image */}
          <div style={{ marginTop: '32px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', maxHeight: '340px' }}>
            <img
              src="/trichy-cityscape.jpg"
              alt="Tiruchirappalli city — Rock Fort and Cauvery river at golden hour"
              style={{ width: '100%', height: '340px', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trichy-projects-grid">
            {projectList.map((proj) => {
              const pTitle = proj.title || proj.name;
              const rawRate = proj.rateSqft || proj.price_per_sqft || 850;
              const pRate = typeof rawRate === 'string' && rawRate.startsWith('₹') ? rawRate : `₹${rawRate}`;
              const pPrefix = proj.ratePrefix || '';
              const pImg = proj.image_url || proj.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';
              const pOverview = proj.overview || proj.description || 'Verified residential plots in high-growth corridor of Tiruchirappalli with immediate registration readiness.';
              const pWater = proj.waterTable ? proj.waterTable.split(' ')[0] : 'Potable';

              return (
                <div key={proj.slug || proj.id} className="project-card">
                  <div className="project-img-wrapper" style={{ position: 'relative' }}>
                    <img src={pImg} alt={pTitle} className="project-img" />
                    <span className="project-tag">{proj.status || 'Ready to Register'}</span>
                    <span className="project-rate-pill">{pPrefix}{pRate} / sq.ft</span>

                    {/* EMI Available Badge */}
                    {proj.emiAvailable && (
                      <span style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        backgroundColor: '#059669',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                        letterSpacing: '0.04em'
                      }}>
                        EMI Available
                      </span>
                    )}
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
              Nam Nilam does not fabricate statewide property listings. All 5 projects above are authentic, physically inspected developments in Tiruchirappalli. If you are looking for advisory or legal due diligence in other Tamil Nadu regions, please explore our <Link to="/services/online-legal-opinion" style={{ color: 'var(--color-gold-dark)', textDecoration: 'underline' }}>Online Legal Opinion</Link> or <Link to="/services/real-estate-advisory" style={{ color: 'var(--color-gold-dark)', textDecoration: 'underline' }}>Real Estate Advisory Services</Link>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
