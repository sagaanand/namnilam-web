import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Droplets, 
  TrendingUp, 
  ShieldCheck, 
  Car, 
  FileSpreadsheet, 
  MessageSquare, 
  Check, 
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const PropertyMarketplace = ({ 
  properties, 
  lang, 
  onViewProperty, 
  onBookSiteVisit, 
  onDownloadReport,
  onWhatsAppEnquire,
  searchFilters
}) => {
  const t = TRANSLATIONS[lang];
  const [activeLocation, setActiveLocation] = useState(searchFilters?.location || 'all');
  const [budgetFilter, setBudgetFilter] = useState(searchFilters?.budget || 'all');
  const [typeFilter, setTypeFilter] = useState(searchFilters?.type || 'all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter & sort logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Location check
      if (activeLocation !== 'all') {
        if (activeLocation === 'Chennai' && prop.city !== 'Chennai') return false;
        if (activeLocation === 'Oragadam' && !prop.location.toLowerCase().includes('oragadam')) return false;
        if (activeLocation === 'Coimbatore' && prop.city !== 'Coimbatore') return false;
        if (activeLocation === 'Hosur' && prop.city !== 'Hosur') return false;
        if (activeLocation === 'Pollachi' && prop.city !== 'Pollachi') return false;
      }

      // Budget check
      if (budgetFilter === 'under25' && prop.priceRaw > 2500000) return false;
      if (budgetFilter === '25to50' && (prop.priceRaw < 2500000 || prop.priceRaw > 5000000)) return false;
      if (budgetFilter === 'above50' && prop.priceRaw < 5000000) return false;

      // Type check
      if (typeFilter === 'residential' && !prop.type.toLowerCase().includes('residential')) return false;
      if (typeFilter === 'villa' && !prop.type.toLowerCase().includes('villa')) return false;
      if (typeFilter === 'farmland' && !prop.type.toLowerCase().includes('farmland')) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceRaw - b.priceRaw;
      if (sortBy === 'price-high') return b.priceRaw - a.priceRaw;
      if (sortBy === 'cagr') return parseFloat(b.cagr) - parseFloat(a.cagr);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, activeLocation, budgetFilter, typeFilter, sortBy]);

  return (
    <section id="properties" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <ShieldCheck size={14} />
            <span>{t.featuredPropertiesTitle}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ta' 
              ? "சரிபார்க்கப்பட்ட நிலங்கள் & லேஅவுட்கள்" 
              : "Institutional-Grade Verified Layouts"}
          </h2>
          <p className="section-subtitle">
            {t.featuredPropertiesSubtitle}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="filter-toolbar">
          <div className="location-pills">
            <button 
              onClick={() => setActiveLocation('all')}
              className={`filter-pill ${activeLocation === 'all' ? 'active' : ''}`}
            >
              {t.filterAll} ({properties.length})
            </button>
            <button 
              onClick={() => setActiveLocation('Chennai')}
              className={`filter-pill ${activeLocation === 'Chennai' ? 'active' : ''}`}
            >
              {lang === 'ta' ? "சென்னை காரிடார்கள்" : "Chennai (GST & OMR)"}
            </button>
            <button 
              onClick={() => setActiveLocation('Oragadam')}
              className={`filter-pill ${activeLocation === 'Oragadam' ? 'active' : ''}`}
            >
              {lang === 'ta' ? "ஒரகடம் (பரந்தூர்)" : "Oragadam (Airport Belt)"}
            </button>
            <button 
              onClick={() => setActiveLocation('Coimbatore')}
              className={`filter-pill ${activeLocation === 'Coimbatore' ? 'active' : ''}`}
            >
              {lang === 'ta' ? "கோயம்புத்தூர்" : "Coimbatore (Saravanampatti)"}
            </button>
            <button 
              onClick={() => setActiveLocation('Hosur')}
              className={`filter-pill ${activeLocation === 'Hosur' ? 'active' : ''}`}
            >
              {lang === 'ta' ? "ஓசூர் (EV ஹப்)" : "Hosur (EV Corridor)"}
            </button>
            <button 
              onClick={() => setActiveLocation('Pollachi')}
              className={`filter-pill ${activeLocation === 'Pollachi' ? 'active' : ''}`}
            >
              {lang === 'ta' ? "பொள்ளாச்சி பண்ணை" : "Pollachi Farmland"}
            </button>
          </div>

          <div className="secondary-filters">
            <select 
              value={budgetFilter} 
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Budget: All</option>
              <option value="under25">&lt; ₹25 Lakhs</option>
              <option value="25to50">₹25 - ₹50 Lakhs</option>
              <option value="above50">&gt; ₹50 Lakhs</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="cagr">Highest 3-Yr CAGR</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>
            Showing <strong>{filteredProperties.length}</strong> verified properties matching criteria
          </span>
          <span style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <Check size={14} /> 100% On-Ground Legal Records Scrutinized
          </span>
        </div>

        {/* Cards Grid */}
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              {/* Image & Badges */}
              <div className="property-img-wrapper">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="property-img" 
                  loading="lazy"
                />

                <div className="property-top-badge">
                  <span className="badge badge-green">
                    <ShieldCheck size={12} />
                    {property.approvalBadge}
                  </span>
                </div>

                <div className="property-tag-badge">
                  {lang === 'ta' ? property.tagTa : property.tag}
                </div>

                <div className="property-cagr-overlay">
                  <TrendingUp size={13} />
                  <span>{property.cagr} {t.cagrBadge}</span>
                </div>
              </div>

              {/* Content */}
              <div className="property-content">
                <div className="property-header">
                  <div className="property-location">
                    <MapPin size={13} color="#10B981" />
                    <span>{lang === 'ta' ? property.locationTa : property.location}</span>
                  </div>
                  <h3 className="property-title">
                    {lang === 'ta' ? property.nameTa : property.name}
                  </h3>
                </div>

                {/* Pricing row */}
                <div className="property-pricing">
                  <div>
                    <span className="price-main">{property.price}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Starting Price</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="price-sqft">{property.rateSqft}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>per sq.ft</span>
                  </div>
                </div>

                {/* Technical Land Chips */}
                <div className="property-data-chips">
                  <div className="data-chip">
                    <span className="chip-label">{t.waterTableBadge}</span>
                    <span className="chip-val">
                      <Droplets size={12} color="#0284C7" />
                      {property.waterTable.split(' ')[0]} {property.waterTable.split(' ')[1]}
                    </span>
                  </div>
                  <div className="data-chip">
                    <span className="chip-label">{t.roadWidthBadge}</span>
                    <span className="chip-val">{property.roadWidth}</span>
                  </div>
                  <div className="data-chip">
                    <span className="chip-label">Available Plots</span>
                    <span className="chip-val" style={{ color: '#166534' }}>
                      {property.availablePlots} of {property.totalPlots} Left
                    </span>
                  </div>
                  <div className="data-chip">
                    <span className="chip-label">Govt Guideline</span>
                    <span className="chip-val" style={{ color: '#854D0E' }}>
                      {property.guidelineValue}
                    </span>
                  </div>
                </div>

                {/* Highlights preview */}
                <div style={{ marginBottom: '20px' }}>
                  {(lang === 'ta' ? property.highlightsTa : property.highlights).slice(0, 2).map((hl, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.82rem', color: 'var(--color-ink-muted)', marginBottom: '4px' }}>
                      <Check size={12} color="#10B981" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="property-actions">
                  <button 
                    onClick={() => onViewProperty(property)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>{t.viewDetails}</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button 
                    onClick={() => onWhatsAppEnquire(property)}
                    className="btn btn-whatsapp btn-sm"
                    title="Direct WhatsApp enquiry with pre-filled property details"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </button>
                </div>

                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => onBookSiteVisit(property)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, fontSize: '0.78rem', padding: '6px 8px' }}
                  >
                    <Car size={13} />
                    <span>{t.bookSiteVisit}</span>
                  </button>
                  <button 
                    onClick={() => onDownloadReport(property)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, fontSize: '0.78rem', padding: '6px 8px' }}
                  >
                    <FileSpreadsheet size={13} />
                    <span>{t.downloadReport}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
