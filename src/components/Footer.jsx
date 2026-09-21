import React from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const Footer = ({ lang, onOpenCrm }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div className="brand-icon">
                <Compass size={22} color="#D4A373" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', lineHeight: 1.1 }}>
                  Nam Nilam <span style={{ color: '#10B981', fontSize: '0.95rem' }}>நம் நிலம்</span>
                </h3>
                <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Real Estate Intelligence & Advisory
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '20px' }}>
              Tamil Nadu's first data-driven real estate intelligence platform. Helping home buyers and investors purchase land with verified data, legal certainty, and zero regret.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="#10B981" />
                <span>+91 98409 92211 / +91 44 2811 4300</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#10B981" />
                <span>intelligence@namnilam.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Platform</h4>
            <ul className="footer-links">
              <li><a href="#properties">Verified DTCP Layouts</a></li>
              <li><a href="#intelligence">5-Year Price Trend Radar</a></li>
              <li><a href="#intelligence">Micro-Market Benchmark</a></li>
              <li><a href="#services">45-Point Legal Due Diligence</a></li>
              <li><a href="#academy">Tamil Land Buyer Academy</a></li>
              <li><a href="#club">Nam Nilam Investor Syndicate</a></li>
            </ul>
          </div>

          {/* Hot Corridors */}
          <div>
            <h4>Growth Corridors</h4>
            <ul className="footer-links">
              <li><a href="#properties">Guduvanchery - GST Road (Chennai)</a></li>
              <li><a href="#properties">Oragadam - Parandur Airport Hub</a></li>
              <li><a href="#properties">Saravanampatti IT Belt (Coimbatore)</a></li>
              <li><a href="#properties">Hosur - Bagalur Tech Corridor</a></li>
              <li><a href="#properties">Poonamallee - Metro Phase 2 Link</a></li>
              <li><a href="#properties">Pollachi Agro Living Farmlands</a></li>
            </ul>
          </div>

          {/* Advisory Desks */}
          <div>
            <h4>Advisory Desks</h4>
            <div style={{ marginBottom: '14px', fontSize: '0.85rem' }}>
              <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '4px' }}>Chennai Operations:</strong>
              <p style={{ color: '#94A3B8' }}>
                Level 4, Olympia Technology Park, Guindy / GST Road, Chennai 600032
              </p>
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '4px' }}>Coimbatore Desk:</strong>
              <p style={{ color: '#94A3B8' }}>
                CHIL SEZ Road, Saravanampatti, Coimbatore 641035
              </p>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={onOpenCrm}
                style={{
                  fontSize: '0.75rem',
                  color: '#CBD5E1',
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                ⚙️ Internal CRM Lead Desk
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="footer-bottom">
          <p style={{ lineHeight: 1.6 }}>
            <strong>RERA & Legal Disclaimer: </strong>
            {t.footerDisclaimer}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span>© {new Date().getFullYear()} Nam Nilam (நம் நிலம்). All Rights Reserved.</span>
            <span>Crafted with institutional precision for Tamil Nadu land buyers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
