import React, { useState } from 'react';
import { 
  Compass, 
  Globe2, 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  Menu, 
  X,
  PhoneCall
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const Navbar = ({ 
  lang, 
  setLang, 
  activeSection, 
  setActiveSection, 
  onOpenCrm, 
  leadCount,
  onOpenAdvisorModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'properties', label: t.navProperties },
    { id: 'intelligence', label: t.navIntelligence },
    { id: 'services', label: t.navServices },
    { id: 'academy', label: t.navAcademy },
    { id: 'club', label: t.navClub },
    { id: 'about', label: t.navAbout }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="nav-content">
          {/* Brand Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="brand-link">
            <div className="brand-icon">
              <Compass size={24} color="#D4A373" />
            </div>
            <div className="brand-text">
              <h1>
                Nam Nilam
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#10B981' }}>நம் நிலம்</span>
              </h1>
              <span className="brand-sub">Real Estate Intelligence</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Language Switch */}
            <div className="lang-switch" title="Toggle Language (English / தமிழ்)">
              <button 
                onClick={() => setLang('en')} 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('ta')} 
                className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
              >
                தமிழ்
              </button>
            </div>

            {/* CRM Inbound Leads Button */}
            <button 
              onClick={onOpenCrm} 
              className="crm-toggle-btn"
              title="View Captured Leads Dashboard"
            >
              <Users size={14} />
              <span>CRM Leads</span>
              {leadCount > 0 && (
                <span style={{
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  padding: '1px 6px',
                  fontSize: '0.7rem'
                }}>
                  {leadCount}
                </span>
              )}
            </button>

            {/* Quick Advisor Contact */}
            <button 
              onClick={onOpenAdvisorModal}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <PhoneCall size={14} />
              <span>{t.talkToAdvisor}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '8px 0',
                  color: activeSection === item.id ? 'var(--color-brand)' : 'var(--color-ink)'
                }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px' }}>
              <button 
                onClick={onOpenCrm}
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                CRM Leads ({leadCount})
              </button>
              <button 
                onClick={onOpenAdvisorModal}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                {t.talkToAdvisor}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
