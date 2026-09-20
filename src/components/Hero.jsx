import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Building, 
  CheckCircle2, 
  TrendingUp, 
  Droplets, 
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const Hero = ({ 
  lang, 
  onSearch, 
  onViewProperty, 
  featuredProperty 
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      location: selectedLocation,
      budget: selectedBudget,
      type: selectedType
    });
    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-left">
            <div className="hero-badge-pill">
              <span className="live-dot"></span>
              <span>Tamil Nadu's 1st Real Estate Intelligence Platform</span>
            </div>

            <h1 className="hero-headline">
              {lang === 'ta' ? (
                <>
                  தரவுகளோடு நிலம் வாங்குங்கள். <br />
                  <span className="text-highlight">சந்தேகத்தோடு அல்ல.</span>
                </>
              ) : (
                <>
                  Buy Land With <span className="text-highlight">Data</span>. <br />
                  Not Doubt.
                </>
              )}
            </h1>

            <p className="hero-subhead">
              {t.heroSubtitle}
            </p>

            {/* Smart Search Card */}
            <div className="hero-search-box">
              <div className="search-tabs">
                <button type="button" className="search-tab-btn active">
                  Verified DTCP / CMDA Plots
                </button>
                <button type="button" className="search-tab-btn">
                  Managed Farmlands
                </button>
                <button type="button" className="search-tab-btn">
                  Investment Corridors
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="search-inputs-grid">
                <div className="search-field">
                  <label>
                    <MapPin size={13} color="#10B981" />
                    <span>Location</span>
                  </label>
                  <select 
                    value={selectedLocation} 
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="all">All TN High-Growth Corridors</option>
                    <option value="Chennai">Chennai (GST, OMR, Poonamallee)</option>
                    <option value="Oragadam">Oragadam (Parandur Airport Belt)</option>
                    <option value="Coimbatore">Coimbatore (Saravanampatti)</option>
                    <option value="Hosur">Hosur (Tech & EV Corridor)</option>
                    <option value="Pollachi">Pollachi (Anaimalai Farmland)</option>
                  </select>
                </div>

                <div className="search-field">
                  <label>
                    <IndianRupee size={13} color="#10B981" />
                    <span>Budget</span>
                  </label>
                  <select 
                    value={selectedBudget} 
                    onChange={(e) => setSelectedBudget(e.target.value)}
                  >
                    <option value="all">Any Budget</option>
                    <option value="under25">Under ₹25 Lakhs</option>
                    <option value="25to50">₹25 - ₹50 Lakhs</option>
                    <option value="above50">₹50 Lakhs & Above</option>
                  </select>
                </div>

                <div className="search-field">
                  <label>
                    <Building size={13} color="#10B981" />
                    <span>Plot Category</span>
                  </label>
                  <select 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="residential">DTCP Residential Plot</option>
                    <option value="villa">Premium Villa Plot</option>
                    <option value="farmland">Managed Farmland</option>
                  </select>
                </div>

                <button type="submit" className="search-submit-btn">
                  <Search size={18} />
                  <span>{t.searchBtn}</span>
                </button>
              </form>
            </div>

            {/* Trust Metrics Bar */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <span className="stat-num">100%</span>
                <span className="stat-desc">DTCP & CMDA Sanctioned</span>
              </div>
              <div className="trust-item">
                <span className="stat-num">45+</span>
                <span className="stat-desc">Legal Checkpoints Audited</span>
              </div>
              <div className="trust-item">
                <span className="stat-num">0%</span>
                <span className="stat-desc">Buyer Commission / Direct Price</span>
              </div>
              <div className="trust-item">
                <span className="stat-num">₹140Cr+</span>
                <span className="stat-desc">Verified Land Transacted</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="hero-right">
            <div className="hero-visual-card">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80" 
                alt="Nam Nilam Verified Layout" 
                className="hero-main-img"
              />

              <div className="hero-floating-badge">
                <div className="hero-badge-header">
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: '6px' }}>
                      <CheckCircle2 size={12} />
                      Verified Layout Dossier
                    </span>
                    <h3 className="hero-badge-title">
                      {lang === 'ta' ? featuredProperty?.nameTa : featuredProperty?.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
                      {lang === 'ta' ? featuredProperty?.locationTa : featuredProperty?.location}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                      {featuredProperty?.rateSqft}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>per sq.ft</div>
                  </div>
                </div>

                <div className="badge-data-row">
                  <div className="data-metric">
                    <span className="label">Projected CAGR</span>
                    <span className="val">{featuredProperty?.cagr}</span>
                  </div>
                  <div className="data-metric">
                    <span className="label">Groundwater</span>
                    <span className="val">{featuredProperty?.waterTable}</span>
                  </div>
                  <div className="data-metric">
                    <span className="label">RERA Status</span>
                    <span className="val" style={{ color: '#E2E8E4' }}>Registered</span>
                  </div>
                </div>

                <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => onViewProperty(featuredProperty)}
                    className="btn btn-accent btn-sm"
                    style={{ flex: 1 }}
                  >
                    <span>View Layout Plan & Docs</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
