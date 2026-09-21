import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BRAND_INFO } from '../../data/ecosystemData';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Left Menu Items (3 Items: Home, About dropdown, Services dropdown)
  const leftLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      hasDropdown: true,
      dropdownKey: 'about',
      subLinks: [
        { name: 'About Nam Nilam', path: '/about', desc: 'Our Vision, Approach & Advisory Standards' },
        { name: 'Careers', path: '/careers', desc: 'Join our Real Estate Intelligence & AI team', badge: 'Hiring' },
        { name: 'Advisory Standards', path: '/about/approach', desc: 'Understand → Analyse → Advise → Execute' },
        { name: 'Resources', path: '/resources', desc: 'Guides, Insights & Land Forensics', badge: 'Free' },
        { name: 'Contact', path: '/contact', desc: 'Talk to Advisory Team & Trichy Office' }
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      hasDropdown: true,
      dropdownKey: 'services',
      subLinks: [
        { name: 'Real Estate Services', path: '/services', desc: 'Loan, Legal Opinion, 9% Construction & Advisory' },
        { name: 'Property Intelligence', path: '/intelligence', desc: 'Valuation, Micro-Market Reports & Infra Audits', badge: 'Intelligence' },
        { name: 'Business Solutions', path: '/business', desc: 'Diamond & Gold Packs, CRM & Automation', badge: 'Solutions' }
      ]
    }
  ];

  // Right Menu Items (3 Items: Academy, Nam Nilam AI, Projects)
  const rightLinks = [
    { name: 'Academy', path: '/academy' },
    { name: 'Nam Nilam AI', path: '/ai', isAi: true },
    { name: 'Projects', path: '/projects' }
  ];

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo(0, 0);
  };

  const isAboutActive = location.pathname.startsWith('/about') || 
    location.pathname.startsWith('/careers') ||
    location.pathname.startsWith('/resources') ||
    location.pathname === '/contact';

  const isServicesActive = location.pathname.startsWith('/services') ||
    location.pathname.startsWith('/intelligence') ||
    location.pathname.startsWith('/business');

  return (
    <header className="navbar navbar-split-header">
      <div className="container">
        <div className="nav-split-content">
          {/* Left Menu Items (Desktop: Home, About ▾, Services ▾) */}
          <nav className="nav-split-group nav-split-left desktop-only">
            {leftLinks.map((item) => {
              if (item.hasDropdown) {
                const isAbout = item.dropdownKey === 'about';
                const isOpen = isAbout ? aboutDropdownOpen : servicesDropdownOpen;
                const setOpen = isAbout ? setAboutDropdownOpen : setServicesDropdownOpen;
                const isGroupActive = isAbout ? isAboutActive : isServicesActive;

                return (
                  <div 
                    key={item.name}
                    className="nav-dropdown-container"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(!isOpen)}
                      className={`nav-item nav-dropdown-btn ${isGroupActive ? 'active' : ''}`}
                      aria-expanded={isOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={13} className={`dropdown-chevron ${isOpen ? 'rotate' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="nav-dropdown-flyout">
                        <div className="nav-dropdown-panel" style={{ minWidth: '320px' }}>
                          {item.subLinks.map((sub) => {
                            const isSubActive = location.pathname === sub.path || 
                              (sub.path !== '/' && location.pathname.startsWith(sub.path));
                            return (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => { setOpen(false); window.scrollTo(0, 0); }}
                                className={`dropdown-sub-item ${isSubActive ? 'active' : ''}`}
                              >
                                <div className="dropdown-sub-header">
                                  <span className="dropdown-sub-title">{sub.name}</span>
                                  {sub.badge && <span className="dropdown-sub-badge">{sub.badge}</span>}
                                </div>
                                <span className="dropdown-sub-desc">{sub.desc}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Centered Brand Identity — Logo Only */}
          <div className="brand-center-box">
            <Link to="/" className="brand-link-center" onClick={() => window.scrollTo(0, 0)} title="Nam Nilam">
              <img 
                src="/nam-nilam-logo.png" 
                alt="Nam Nilam — Real Estate Intelligence & Advisory" 
                className="brand-logo-img brand-logo-only"
              />
            </Link>
          </div>

          {/* Right Menu Items (Desktop: Academy, Nam Nilam AI, Projects) */}
          <nav className="nav-split-group nav-split-right desktop-only">
            {rightLinks.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));

              if (item.isAi) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`nav-item nav-item-ai ${isActive ? 'active' : ''}`}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="mobile-toggle-wrapper">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="mobile-drawer">
            <div className="mobile-drawer-links">
              {/* 1. Home */}
              <button onClick={() => handleNav('/')} className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <span>Home</span>
              </button>

              {/* 2. About Group (with Resources & Contact inside) */}
              <div className="mobile-dropdown-group">
                <button 
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)} 
                  className={`mobile-nav-item mobile-dropdown-trigger ${isAboutActive ? 'active' : ''}`}
                >
                  <span>About</span>
                  <ChevronDown size={16} className={`dropdown-chevron ${mobileAboutOpen ? 'rotate' : ''}`} />
                </button>

                {mobileAboutOpen && (
                  <div className="mobile-sub-menu">
                    <button onClick={() => handleNav('/about')} className="mobile-sub-item">
                      <span>About Nam Nilam</span>
                    </button>
                    <button onClick={() => handleNav('/careers')} className="mobile-sub-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Careers</span>
                      <span className="dropdown-sub-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>Hiring</span>
                    </button>
                    <button onClick={() => handleNav('/about/approach')} className="mobile-sub-item">
                      <span>Advisory Standards</span>
                    </button>
                    <button onClick={() => handleNav('/resources')} className="mobile-sub-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Resources & Knowledge</span>
                      <span className="dropdown-sub-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>Free</span>
                    </button>
                    <button onClick={() => handleNav('/contact')} className="mobile-sub-item">
                      <span>Contact & Office</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Services Group (with Property Intelligence & Business Solutions inside) */}
              <div className="mobile-dropdown-group">
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)} 
                  className={`mobile-nav-item mobile-dropdown-trigger ${isServicesActive ? 'active' : ''}`}
                >
                  <span>Services</span>
                  <ChevronDown size={16} className={`dropdown-chevron ${mobileServicesOpen ? 'rotate' : ''}`} />
                </button>

                {mobileServicesOpen && (
                  <div className="mobile-sub-menu">
                    <button onClick={() => handleNav('/services')} className="mobile-sub-item">
                      <span>Real Estate Services</span>
                    </button>
                    <button onClick={() => handleNav('/intelligence')} className="mobile-sub-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Property Intelligence</span>
                      <span className="dropdown-sub-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>Data</span>
                    </button>
                    <button onClick={() => handleNav('/business')} className="mobile-sub-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Business Solutions</span>
                      <span className="dropdown-sub-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>Diamond & Gold</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Academy */}
              <button onClick={() => handleNav('/academy')} className={`mobile-nav-item ${location.pathname.startsWith('/academy') ? 'active' : ''}`}>
                <span>Academy</span>
              </button>

              {/* 5. Nam Nilam AI */}
              <button onClick={() => handleNav('/ai')} className={`mobile-nav-item mobile-ai-item ${location.pathname.startsWith('/ai') ? 'active' : ''}`}>
                <span style={{ fontWeight: 800 }}>Nam Nilam AI</span>
                <span className="dropdown-sub-badge" style={{ backgroundColor: 'rgba(223, 186, 115, 0.2)', color: 'var(--color-gold-dark)', border: '1px solid rgba(223, 186, 115, 0.4)' }}>Autonomous</span>
              </button>

              {/* 6. Projects */}
              <button onClick={() => handleNav('/projects')} className={`mobile-nav-item ${location.pathname.startsWith('/projects') ? 'active' : ''}`}>
                <span>Projects</span>
              </button>
            </div>

            <div className="mobile-drawer-footer">
              <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)', marginBottom: '6px' }}>
                📍 {BRAND_INFO.address}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-brand-deep)' }}>
                Direct Phone: {BRAND_INFO.phoneFormatted}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
