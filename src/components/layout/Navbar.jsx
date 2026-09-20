import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BRAND_INFO } from '../../data/ecosystemData';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AI Workforce', path: '/ai' },
    { name: 'Intelligence', path: '/intelligence' },
    { name: 'Academy', path: '/academy' },
    { name: 'Business Solutions', path: '/business' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="nav-content">
          {/* Brand Logo with Official PNG Logo */}
          <Link to="/" className="brand-link" onClick={() => window.scrollTo(0, 0)}>
            <img 
              src="/nam-nilam-logo.png" 
              alt="Nam Nilam Logo" 
              className="brand-logo-img"
            />
            <div className="brand-text">
              <h1>Nam Nilam</h1>
              <span className="brand-sub">Real Estate Intelligence & Advisory</span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible only on Desktop) */}
          <nav className="nav-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Hamburger Button (Visible only on Mobile/Tablet) */}
          <div className="mobile-toggle-wrapper">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="mobile-drawer">
            <div className="mobile-drawer-links">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || 
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mobile-drawer-footer">
              <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)', marginBottom: '8px' }}>
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
