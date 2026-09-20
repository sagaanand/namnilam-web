import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Target, 
  HeartHandshake, 
  Award, 
  MapPinned 
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const AboutSection = ({ lang, onScheduleConsult }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="manifesto-grid">
          {/* Left Text */}
          <div className="manifesto-text">
            <div className="section-eyebrow">
              <Compass size={14} />
              <span>{t.aboutTitle}</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: 'var(--color-brand-deep)', marginBottom: '18px', lineHeight: 1.25 }}>
              {lang === 'ta' ? (
                <>
                  “தகவல், நுண்ணறிவு மற்றும் நம்பகமான பரிவர்த்தனைகள் மூலம் மக்கள் <span style={{ color: 'var(--color-brand-accent)' }}>சிறந்த ரியல் எஸ்டேட் முடிவுகளை</span> எடுக்க உதவுகிறோம்.”
                </>
              ) : (
                <>
                  “Helping people make better real-estate decisions with <span style={{ color: 'var(--color-brand-accent)' }}>information, intelligence and trusted transactions</span>.”
                </>
              )}
            </h2>

            <p>
              {lang === 'ta'
                ? "பாரம்பரிய ரியல் எஸ்டேட் சந்தையில் நிலம் வாங்குவது என்பது பெரும்பாலும் அச்சம், குழப்பம் மற்றும் நம்பகமற்ற இடைத்தரகர்களின் அழுத்தத்தால் நிறைந்த ஒன்றாகவே இருந்துள்ளது. வரைபடங்களை திரிப்பது, பஞ்சாயத்து மனைகளை அங்கீகரிக்கப்பட்டவை என்று விற்பது, நிலத்தடி நீர் மற்றும் உண்மை விலையை மறைப்பது போன்ற நடைமுறைகளால் சாமானிய மக்கள் பாதிக்கப்படுகிறார்கள்."
                : "For decades, purchasing land in Tamil Nadu has been clouded by opacity, high-pressure broker syndicates, and deceptive marketing. Unapproved layouts disguised as legal investments, undisclosed encumbrances, and inflated resale valuations have caused countless families unnecessary anxiety."}
            </p>

            <p>
              {lang === 'ta'
                ? "நம் நிலம் (Nam Nilam) இதையெல்லாம் மாற்றி அமைக்கிறது. நாங்கள் ஒரு சாதாரண புரோக்கரேஜ் நிறுவனம் அல்ல; நாங்கள் தரவுகள் மற்றும் சட்ட பாதுகாப்பிற்கு முக்கியத்துவம் அளிக்கும் ஒரு நிறுவன தளம்."
                : "Nam Nilam was founded to transform this reality. We are neither a generic sales broker nor an aggressive marketing agency. We are an intelligence-led advisory platform that places institutional verification, revenue audits, and transparent financial models at your fingertips."}
            </p>

            <div className="manifesto-pillars">
              <div className="pillar-box">
                <h5>100% Ground Truth</h5>
                <p>Real groundwater depths, soil quality, and accurate road widths verified on-site.</p>
              </div>
              <div className="pillar-box">
                <h5>Zero Panchayat Plots</h5>
                <p>Strictly DTCP, CMDA, and RERA sanctioned projects with public order numbers.</p>
              </div>
              <div className="pillar-box">
                <h5>Complete Cost Clarity</h5>
                <p>Full stamp duty, registration, and documentation costs calculated transparently upfront.</p>
              </div>
              <div className="pillar-box">
                <h5>Advisory, Not Pushy Sales</h5>
                <p>Zero spam calls. Dedicated technical advisors focused on your capital protection.</p>
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <button onClick={onScheduleConsult} className="btn btn-primary btn-lg">
                <span>Talk With Our Senior Land Advisor</span>
              </button>
            </div>
          </div>

          {/* Right Visual Badge Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: 'var(--color-brand-deep)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid rgba(212, 163, 115, 0.3)'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '16px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <Award size={32} color="#10B981" />
              </div>

              <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '14px' }}>
                The Nam Nilam Promise
              </h3>

              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Every single plot listed on this platform must pass our comprehensive 45-point revenue and title verification audit before appearing in the marketplace.
              </p>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  <ShieldCheck size={18} color="#34D399" />
                  <span>30-Year Encumbrance (EC) Clear Title Warranty</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  <ShieldCheck size={18} color="#34D399" />
                  <span>Verified Mother Deed & Revenue Patta Chain</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  <ShieldCheck size={18} color="#34D399" />
                  <span>Individual Sub-Division Patta Delivery Assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
