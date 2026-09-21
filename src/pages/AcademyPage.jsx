import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  Sparkles,
  MessageSquare,
  Award
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { ACADEMY_SUBPAGES, ACADEMY_PROGRAMS, ACADEMY_FLAGSHIP_OFFERINGS, BRAND_INFO } from '../data/ecosystemData';

export const AcademyPage = ({ onOpenEnquiry }) => {
  const { subpage } = useParams();

  const subpageObj = ACADEMY_SUBPAGES.find(s => s.slug === subpage) || { label: 'Academy Overview' };

  // Filter programs based on subpage
  const filteredPrograms = ACADEMY_PROGRAMS.filter(p => {
    if (!subpage || subpage === '' || subpage === 'overview') return true;
    if (subpage === 'courses') return p.subpage === 'courses';
    if (subpage === 'workshops') return p.subpage === 'workshops';
    if (subpage === 'certified-courses') return p.category === 'certified-courses';
    if (subpage === 'practical-courses') return p.category === 'practical-courses';
    return p.category === subpage || p.subpage === subpage;
  });

  const pageTitle = subpage ? `${subpageObj.label} | Nam Nilam Academy` : 'Learn Real Estate. Learn by Doing | Nam Nilam Academy';
  const pageDesc = 'Practical real estate courses, certified 2-month training, document verification masterclasses, and digital marketing training for buyers, investors, and professionals across Tamil Nadu.';

  return (
    <div>
      <SeoHead 
        title={pageTitle}
        description={pageDesc}
        canonical={subpage ? `/academy/${subpage}` : '/academy'}
        breadcrumbs={[
          { label: 'Academy', path: '/academy' },
          ...(subpage ? [{ label: subpageObj.label }] : [])
        ]}
      />

      <Breadcrumbs items={[
        { label: 'Academy', path: '/academy' },
        ...(subpage ? [{ label: subpageObj.label }] : [])
      ]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <GraduationCap size={14} />
            <span>Nam Nilam Academy • Real Estate Education</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Learn Real Estate. Learn by Doing.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px', lineHeight: 1.65 }}>
            Practical real-estate education grounded in Tamil Nadu land records, legal due diligence, sub-registrar protocols, and modern business growth.
          </p>

          {/* Subpage Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
            <Link 
              to="/academy" 
              className={`btn btn-sm ${!subpage ? 'btn-primary' : 'btn-outline'}`}
            >
              All Academy
            </Link>
            <Link 
              to="/academy/certified-courses" 
              className={`btn btn-sm ${subpage === 'certified-courses' ? 'btn-primary' : 'btn-outline'}`}
            >
              Certified 2-Month Course
            </Link>
            <Link 
              to="/academy/practical-courses" 
              className={`btn btn-sm ${subpage === 'practical-courses' ? 'btn-primary' : 'btn-outline'}`}
            >
              Practical Short Courses
            </Link>
            <Link 
              to="/academy/courses" 
              className={`btn btn-sm ${subpage === 'courses' ? 'btn-primary' : 'btn-outline'}`}
            >
              Master Courses
            </Link>
            <Link 
              to="/academy/workshops" 
              className={`btn btn-sm ${subpage === 'workshops' ? 'btn-primary' : 'btn-outline'}`}
            >
              Live Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Flagship Certified 2-Month Program Showcase */}
      {(!subpage || subpage === 'certified-courses') && (
        <section className="section" style={{ backgroundColor: 'var(--color-canvas)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container">
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--color-gold-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                    <Award size={13} />
                    {ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.badge}
                  </span>
                  <h2 style={{ fontSize: '2rem', color: 'var(--color-brand-deep)' }}>
                    {ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.title}
                  </h2>
                  <div style={{ fontSize: '1rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginTop: '4px' }}>
                    {ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.positioning}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <div style={{ padding: '12px 20px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Offline (Trichy)</span>
                    <strong style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)' }}>₹9,999</strong>
                  </div>
                  <div style={{ padding: '12px 20px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Online Mode</span>
                    <strong style={{ fontSize: '1.4rem', color: '#059669' }}>₹6,999</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', margin: '28px 0', borderTop: '1px solid var(--color-border)', paddingTop: '28px' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>Who It Is For:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.whoItsFor.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} color="#059669" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>What You'll Learn:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.whatYoullLearn.slice(0, 4).map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} color="var(--color-gold-dark)" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>Practical Components:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.practicalComponents.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--color-ink)' }}>
                        <Sparkles size={14} color="var(--color-gold)" style={{ marginTop: '4px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '10px 14px', backgroundColor: 'rgba(223, 186, 115, 0.12)', border: '1px solid rgba(223, 186, 115, 0.3)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#7A5B1C', fontWeight: 600 }}>
                    🎓 {ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.certification}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => onOpenEnquiry('Enrolment: Certified 2-Month Course')}
                  className="btn btn-primary btn-lg"
                >
                  <span>{ACADEMY_FLAGSHIP_OFFERINGS.certifiedCourse.enrolCta}</span>
                  <ArrowRight size={16} />
                </button>
                <a 
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam Academy, I want to enrol in the Certified 2-Month Course (Offline ₹9,999 / Online ₹6,999).')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  <MessageSquare size={16} />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Courses & Workshops Listing */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <BookOpen size={14} />
              <span>Structured Curriculum</span>
            </div>
            <h2 className="section-title">
              {subpage ? subpageObj.label : 'Curated Masterclasses & Practical Workshops'}
            </h2>
            <p className="section-subtitle">
              Designed for individual buyers, NRIs, and real estate professionals seeking uncompromised clarity and practical execution skills.
            </p>
          </div>

          <div className="cards-grid-2">
            {filteredPrograms.map((prog) => (
              <div key={prog.slug} style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Course image */}
                {prog.image && (
                  <div style={{ height: '180px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={prog.image}
                      alt={prog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                )}

                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="badge badge-gold">{prog.level}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {prog.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--color-brand-deep)' }}>
                    {prog.title}
                  </h3>

                  {prog.priceTag && (
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-brand-deep)', backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-border)', padding: '3px 10px', borderRadius: 'var(--radius-pill)', display: 'inline-block' }}>
                        Fee: {prog.priceTag}
                      </span>
                    </div>
                  )}

                  <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', marginBottom: '20px', lineHeight: 1.65 }}>
                    {prog.desc}
                  </p>

                  {/* Syllabus Modules */}
                  <div style={{ marginBottom: '20px', flexGrow: 1 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-brand-deep)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                      Curriculum Highlights:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {prog.syllabus.map((mod, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--color-ink)' }}>
                          <CheckCircle2 size={16} color="var(--color-gold-dark)" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {prog.deliverables && (
                    <div style={{
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-canvas)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      color: 'var(--color-ink-muted)',
                      marginBottom: '20px',
                      border: '1px solid var(--color-border)'
                    }}>
                      <strong>Deliverables: </strong>{prog.deliverables}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => onOpenEnquiry(`Academy Enrolment: ${prog.title}`)}
                      className="btn btn-primary"
                    >
                      <span>Enrol / Request Details</span>
                      <ArrowRight size={14} />
                    </button>
                    <a 
                      href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam Academy, I would like more information on ${prog.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
