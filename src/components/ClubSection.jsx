import React from 'react';
import { 
  Crown, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  Users2 
} from 'lucide-react';
import { CLUB_BENEFITS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export const ClubSection = ({ lang, onJoinClub }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="club" className="section">
      <div className="container">
        <div className="club-banner">
          <div className="club-header">
            <span className="badge badge-gold" style={{ marginBottom: '16px', background: 'rgba(212, 163, 115, 0.2)', color: '#F8FAF7' }}>
              <Crown size={13} color="#E7C28D" />
              Private Investor Syndicate
            </span>

            <h2>
              {lang === 'ta' 
                ? "நம் நிலம் இன்வெஸ்டர் கிளப் - பிரத்யேக நில முதலீட்டு தளம்" 
                : "Nam Nilam Club: The Land Syndicate for High-Intent Investors"}
            </h2>

            <p>
              {lang === 'ta'
                ? "பொது சந்தையில் விற்பனைக்கு வரும் முன்பே, குறைந்த முதலீட்டாளர் விலையில் தமிழ்நாட்டின் அதிவேக வளர்ச்சி காரிடார்களில் முதலீடு செய்யும் பிரத்யேக கிளப்."
                : "Gain institutional advantage. Access pre-launch DTCP layouts 15-30 days before public announcement, join co-investment syndicates, and receive macro intelligence briefings."}
            </p>
          </div>

          {/* Perks Grid */}
          <div className="club-perks-grid">
            {CLUB_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="club-perk-box">
                <h4>{lang === 'ta' ? benefit.titleTa : benefit.title}</h4>
                <p>{lang === 'ta' ? benefit.descTa : benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 163, 115, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lock size={20} color="#E7C28D" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.95rem' }}>
                  By Invitation & Scrutiny Only
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                  Restricted to 250 verified land investors per cohort.
                </div>
              </div>
            </div>

            <button 
              onClick={onJoinClub}
              className="btn btn-accent btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Apply for Club Membership</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
