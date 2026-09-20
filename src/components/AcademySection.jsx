import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Clock, 
  FileText,
  Video,
  Sparkles
} from 'lucide-react';
import { ACADEMY_LESSONS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export const AcademySection = ({ lang, onOpenResource }) => {
  const t = TRANSLATIONS[lang];
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <section id="academy" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <GraduationCap size={14} />
            <span>{t.academyTitle}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ta' 
              ? "தமிழ்நாட்டின் முதல் இலவச ரியல் எஸ்டேட் கல்வி மையம்" 
              : "Plain-Language Land Education & Buyer Protection"}
          </h2>
          <p className="section-subtitle">
            {t.academySubtitle}
          </p>
        </div>

        {/* Academy Lessons Grid */}
        <div className="academy-grid">
          {ACADEMY_LESSONS.map((lesson) => (
            <div key={lesson.id} className="academy-card">
              <div className="academy-top">
                <span className="badge badge-green">
                  {lesson.badge}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  {lesson.readTime} read
                </span>
              </div>

              <h3>{lang === 'ta' ? lesson.titleTa : lesson.title}</h3>
              
              <p>{lang === 'ta' ? lesson.summaryTa : lesson.summary}</p>

              <div style={{
                backgroundColor: 'var(--color-canvas)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                border: '1px solid var(--color-border)'
              }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                  Key Checkpoints Covered:
                </strong>
                <ul className="academy-bullets">
                  {lesson.keyPoints.map((pt, i) => (
                    <li key={i}>
                      <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0 }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => onOpenResource(lesson)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <BookOpen size={14} />
                  <span>{lang === 'ta' ? "முழு பாடம் படிக்க" : "Read Full Guide"}</span>
                </button>

                <button 
                  onClick={() => onOpenResource({ ...lesson, download: true })}
                  className="btn btn-outline btn-sm"
                  title="Download PDF Checklist"
                >
                  <Download size={14} />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free Masterclass Callout */}
        <div style={{
          marginTop: '48px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-gold">
                <Sparkles size={12} />
                Live Weekend Workshop
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Every Saturday @ 6:00 PM</span>
            </div>
            <h4 style={{ fontSize: '1.35rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
              {lang === 'ta' 
                ? "நிலம் வாங்கும் போது தவிர்க்க வேண்டிய 7 தவறுகள் - நேரலை வெபினார்" 
                : "Free Land Due Diligence Masterclass in Tamil & English"}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)' }}>
              Conducted by High Court Senior Property Advocates and Land Survey Specialists. 100% Free.
            </p>
          </div>

          <button 
            onClick={() => onOpenResource({ title: "Live Weekend Land Masterclass", isWorkshop: true })}
            className="btn btn-whatsapp btn-lg"
          >
            <span>Register via WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
