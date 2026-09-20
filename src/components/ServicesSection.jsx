import React from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  Clock,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

const iconMap = {
  Calculator: Calculator,
  ShieldCheck: ShieldCheck,
  TrendingUp: TrendingUp,
  Building2: Building2
};

export const ServicesSection = ({ lang, onRequestService }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <ShieldCheck size={14} />
            <span>{t.servicesTitle}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ta' 
              ? "நிலம் வாங்குவோர் & முதலீட்டாளர்களுக்கான சிறப்பு சேவைகள்" 
              : "Institutional Advisory & Due Diligence Services"}
          </h2>
          <p className="section-subtitle">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="services-grid">
          {SERVICES_LIST.map((service) => {
            const Icon = iconMap[service.icon] || ShieldCheck;
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrap">
                  <Icon size={24} />
                </div>

                <h3>{lang === 'ta' ? service.titleTa : service.title}</h3>
                
                <p>{lang === 'ta' ? service.descriptionTa : service.description}</p>

                <div style={{
                  backgroundColor: 'var(--color-canvas)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  color: 'var(--color-ink)',
                  marginBottom: '16px',
                  border: '1px solid var(--color-border)'
                }}>
                  <strong style={{ color: 'var(--color-brand)', display: 'block', marginBottom: '2px' }}>
                    Deliverable:
                  </strong>
                  {service.deliverable}
                </div>

                <div className="service-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={13} />
                  <span>{service.timeframe}</span>
                </div>

                <button 
                  onClick={() => onRequestService(service)}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '16px', width: '100%' }}
                >
                  <span>Request Service</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
