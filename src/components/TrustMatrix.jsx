import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  BadgePercent,
  Search,
  Eye,
  Car,
  Award
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const TrustMatrix = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const pillars = [
    {
      icon: ShieldCheck,
      title: t.badge1Title,
      desc: t.badge1Desc,
      tag: "Zero Risk"
    },
    {
      icon: FileText,
      title: t.badge2Title,
      desc: t.badge2Desc,
      tag: "30-Year Trace"
    },
    {
      icon: TrendingUp,
      title: t.badge3Title,
      desc: t.badge3Desc,
      tag: "Data Driven"
    },
    {
      icon: BadgePercent,
      title: t.badge4Title,
      desc: t.badge4Desc,
      tag: "Direct Price"
    }
  ];

  const steps = [
    {
      step: "01",
      icon: Search,
      title: lang === 'ta' ? "தேடுங்கள் & ஒப்பிடுங்கள்" : "Search & Benchmark",
      desc: lang === 'ta' 
        ? "தமிழ்நாட்டின் முக்கிய வளர்ச்சி காரிடார்களில் சதுர அடி விலை, நிலத்தடி நீர் மற்றும் CAGR தரவுகளை ஒப்பிடுங்கள்."
        : "Filter micro-markets using real-world metrics: sq.ft price, water table depth, and projected 3-year CAGR."
    },
    {
      step: "02",
      icon: Eye,
      title: lang === 'ta' ? "முழு ஆவண ஆய்வு" : "Inspect Digital Dossier",
      desc: lang === 'ta'
        ? "DTCP அனுமதி ஆணை, TN-RERA எண், 30 ஆண்டு வில்லங்கம் மற்றும் பட்டா நிலவரத்தை ஆன்லைனில் சரிபார்க்கவும்."
        : "Review verified DTCP sanction permits, RERA registrations, parent deed chains, and clear EC records."
    },
    {
      step: "03",
      icon: Car,
      title: lang === 'ta' ? "இலவச வாகனத்தில் பார்வை" : "Free Chauffeur Site Visit",
      desc: lang === 'ta'
        ? "எங்களின் பிரத்யேக இலவச வாகனத்தில் உங்கள் குடும்பத்துடன் சென்று தளத்தையும் சுற்றுப்புற உள்கட்டமைப்பையும் நேரில் பாருங்கள்."
        : "Book a complimentary dedicated cab visit to the layout with on-ground technical land advisors."
    },
    {
      step: "04",
      icon: Award,
      title: lang === 'ta' ? "பாதுகாப்பான பத்திரப்பதிவு" : "Secure Registry & Patta",
      desc: lang === 'ta'
        ? "வெளிப்படையான வழிகாட்டி மதிப்பு கணக்கீட்டுடன் சார்பதிவாளர் அலுவலகத்தில் சுலபமாக பத்திரப்பதிவு மற்றும் பட்டா மாற்றம்."
        : "Complete Sub-Registrar registration with upfront transparent pricing and automated patta transfer assistance."
    }
  ];

  return (
    <section className="section section-alt">
      <div className="container">
        {/* Why Nam Nilam Section */}
        <div className="section-header">
          <div className="section-eyebrow">
            <ShieldCheck size={14} />
            <span>{lang === 'ta' ? "நம்பகத்தன்மையின் அடித்தளம்" : "Why Nam Nilam"}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ta' 
              ? "வழக்கமான ரியல் எஸ்டேட் இடைத்தரகர்களிடமிருந்து நாங்கள் எவ்வாறு வேறுபடுகிறோம்?" 
              : "Built For Safety. Grounded In Real Estate Intelligence."}
          </h2>
          <p className="section-subtitle">
            {lang === 'ta'
              ? "ஏமாற்று விளம்பரங்கள் மற்றும் வாய்மொழி வாக்குறுதிகளுக்கு முற்றுப்புள்ளி வைத்து, துல்லியமான தரவுகளுடன் நில முதலீட்டை எளிதாக்குகிறோம்."
              : "We eliminate opaque broker syndicates by replacing vague hype with 45 verified legal checkpoints, ground realities, and institutional analytics."}
          </p>
        </div>

        <div className="trust-cards-grid">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="trust-card">
                <div className="trust-icon-box">
                  <Icon size={26} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-green">{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* How It Works Workflow */}
        <div style={{ marginTop: '80px', paddingTop: '64px', borderTop: '1px solid var(--color-border)' }}>
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <div className="section-eyebrow">
              <span>{lang === 'ta' ? "நிலம் வாங்கும் வழிமுறை" : "The Nam Nilam Workflow"}</span>
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--color-brand-deep)' }}>
              {lang === 'ta' ? "தேர்வு முதல் பத்திரப்பதிவு வரை 4 எளிய படிகள்" : "From Discovery to Registered Patta in 4 Steps"}
            </h3>
          </div>

          <div className="trust-cards-grid">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="trust-card" style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#E2E8E4'
                  }}>
                    {step.step}
                  </div>
                  <div className="trust-icon-box" style={{ backgroundColor: 'var(--color-gold-soft)', color: 'var(--color-gold)' }}>
                    <StepIcon size={24} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
