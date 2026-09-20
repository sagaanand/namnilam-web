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
  MessageSquare
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ACADEMY_COURSES, BRAND_INFO } from '../data/ecosystemData';

export const AcademyPage = ({ onOpenEnquiry }) => {
  const { subpage } = useParams();

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Academy', path: '/academy' },
        ...(subpage ? [{ label: subpage.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }] : [])
      ]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <GraduationCap size={14} />
            <span>Nam Nilam Academy</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Learn Real Estate. Make Better Decisions.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Practical real-estate education. Master document verification, understand investment economics, and avoid common legal traps.
          </p>

          {/* Subpage Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
            <Link to="/academy" className={`btn btn-sm ${!subpage ? 'btn-primary' : 'btn-outline'}`}>
              Overview
            </Link>
            <Link to="/academy/courses" className={`btn btn-sm ${subpage === 'courses' ? 'btn-primary' : 'btn-outline'}`}>
              Courses
            </Link>
            <Link to="/academy/workshops" className={`btn btn-sm ${subpage === 'workshops' ? 'btn-primary' : 'btn-outline'}`}>
              Live Workshops
            </Link>
            <Link to="/academy/property-buying" className={`btn btn-sm ${subpage === 'property-buying' ? 'btn-primary' : 'btn-outline'}`}>
              Buyer Education
            </Link>
            <Link to="/academy/real-estate-business" className={`btn btn-sm ${subpage === 'real-estate-business' ? 'btn-primary' : 'btn-outline'}`}>
              Business & Marketing
            </Link>
          </div>
        </div>
      </section>

      {/* Courses & Workshops */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <BookOpen size={14} />
              <span>Structured Curriculum</span>
            </div>
            <h2 className="section-title">
              Masterclasses & Practical Training
            </h2>
            <p className="section-subtitle">
              Designed for individual buyers, NRIs, and real estate professionals seeking uncompromised clarity.
            </p>
          </div>

          <div className="cards-grid-2">
            {ACADEMY_COURSES.map((course) => (
              <div key={course.slug} style={{
                padding: '36px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-gold">{course.level}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {course.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.45rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                  {course.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                  {course.desc}
                </p>

                <div style={{
                  backgroundColor: 'var(--color-canvas)',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '24px'
                }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--color-brand-deep)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    Course Modules:
                  </strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {course.syllabus.map((mod, i) => (
                      <div key={i} style={{ fontSize: '0.85rem', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={14} color="#059669" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => onOpenEnquiry(`Academy Enrollment: ${course.title}`)}
                    className="btn btn-primary btn-md"
                    style={{ flex: 1 }}
                  >
                    <span>Enroll / Join Waitlist</span>
                    <ArrowRight size={14} />
                  </button>
                  <a 
                    href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, I would like to register for: ${course.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-md"
                  >
                    <MessageSquare size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Live Weekend Workshop Callout */}
          <div style={{
            marginTop: '56px',
            backgroundColor: 'var(--color-brand-deep)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            border: '1px solid rgba(223, 186, 115, 0.3)'
          }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px', background: 'rgba(223, 186, 115, 0.2)', color: '#FFFFFF' }}>
                <Sparkles size={12} color="#DFBA73" />
                Live Interactive Webinar
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '8px' }}>
                7 Critical Mistakes to Avoid When Buying Land in Tamil Nadu
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>
                Every Saturday @ 6:00 PM IST on Zoom. Free registration.
              </p>
            </div>

            <button 
              onClick={() => onOpenEnquiry('Free Saturday Land Masterclass')}
              className="btn btn-primary btn-lg"
            >
              Register for Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
