import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Split, 
  Compass, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Building2, 
  Zap,
  Droplets,
  Calendar,
  Sparkles
} from 'lucide-react';
import { 
  HISTORICAL_PRICE_TRENDS, 
  MICRO_MARKET_BENCHMARKS, 
  INFRASTRUCTURE_RADAR 
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export const IntelligenceHub = ({ 
  lang, 
  onRequestReport 
}) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState('price-trends');
  const [selectedCorridor, setSelectedCorridor] = useState('guduvanchery');
  
  // Location comparison state
  const [marketA, setMarketA] = useState(0); // Guduvanchery
  const [marketB, setMarketB] = useState(1); // Oragadam

  // Lead magnet form state
  const [leadArea, setLeadArea] = useState('Guduvanchery');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');

  const currentMarket = HISTORICAL_PRICE_TRENDS.markets.find(m => m.id === selectedCorridor) || HISTORICAL_PRICE_TRENDS.markets[0];
  const maxPrice = 6500; // max scale for bar charts

  const handleLeadMagnetSubmit = (e) => {
    e.preventDefault();
    if (!leadPhone) {
      alert('Please enter your WhatsApp phone number.');
      return;
    }
    onRequestReport({
      name: leadName,
      phone: leadPhone,
      area: leadArea,
      intent: 'Intelligence Report Download'
    });
    setLeadName('');
    setLeadPhone('');
  };

  return (
    <section id="intelligence" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <BarChart3 size={14} />
            <span>{t.intelligenceHubTitle}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ta' 
              ? "தரவு சார்ந்த ரியல் எஸ்டேட் நுண்ணறிவு" 
              : "Buy Land With Data. Grounded In Market Reality."}
          </h2>
          <p className="section-subtitle">
            {t.intelligenceHubSubtitle}
          </p>
        </div>

        {/* Intelligence Category Tabs */}
        <div className="intel-grid-tabs">
          <button 
            onClick={() => setActiveTab('price-trends')}
            className={`intel-tab-btn ${activeTab === 'price-trends' ? 'active' : ''}`}
          >
            <TrendingUp size={16} />
            <span>{lang === 'ta' ? "விலை உயர்வு வரைபடம்" : "Land Price Trends"}</span>
          </button>
          <button 
            onClick={() => setActiveTab('comparator')}
            className={`intel-tab-btn ${activeTab === 'comparator' ? 'active' : ''}`}
          >
            <Split size={16} />
            <span>{lang === 'ta' ? "பகுதிகள் நேரடி ஒப்பீடு" : "Micro-Market Comparison"}</span>
          </button>
          <button 
            onClick={() => setActiveTab('infra')}
            className={`intel-tab-btn ${activeTab === 'infra' ? 'active' : ''}`}
          >
            <Zap size={16} />
            <span>{lang === 'ta' ? "மெகா உள்கட்டமைப்பு" : "Infrastructure Radar"}</span>
          </button>
        </div>

        {/* Tab 1: Price Trends & Appreciation Radar */}
        {activeTab === 'price-trends' && (
          <div className="chart-container-card">
            <div className="chart-header">
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '4px' }}>
                  {lang === 'ta' ? "5-ஆண்டு நில விலை உயர்வு வளர்ச்சி குறியீடு" : "5-Year Land Appreciation Trajectory (₹ / sq.ft)"}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                  Aggregated from Sub-Registrar transactions and verified layout launches across Tamil Nadu.
                </p>
              </div>

              {/* Corridor selection pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {HISTORICAL_PRICE_TRENDS.markets.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedCorridor(m.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: selectedCorridor === m.id ? m.color : 'var(--color-canvas)',
                      color: selectedCorridor === m.id ? '#FFFFFF' : 'var(--color-ink-muted)',
                      border: `1px solid ${selectedCorridor === m.id ? m.color : 'var(--color-border)'}`
                    }}
                  >
                    {lang === 'ta' ? m.nameTa : m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Corridor Insight Banner */}
            <div style={{
              backgroundColor: 'var(--color-canvas)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: `4px solid ${currentMarket.color}`,
              marginBottom: '24px'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>
                  Primary Growth Catalyst:
                </span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-ink)' }}>
                  {currentMarket.keyDriver}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>5-Yr CAGR</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: currentMarket.color, fontFamily: 'var(--font-mono)' }}>
                  {currentMarket.cagr}
                </span>
              </div>
            </div>

            {/* Custom SVG / Bar Chart Representation */}
            <div className="chart-bars-wrapper">
              {HISTORICAL_PRICE_TRENDS.years.map((year, idx) => {
                const currentPrice = currentMarket.prices[idx];
                const heightPercent = Math.round((currentPrice / maxPrice) * 100);

                return (
                  <div key={year} className="year-column">
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: currentMarket.color }}>
                      ₹{currentPrice.toLocaleString('en-IN')}
                    </span>
                    <div className="bars-cluster" style={{ justifyContent: 'center' }}>
                      <div 
                        className="bar-pill" 
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: currentMarket.color,
                          maxWidth: '48px'
                        }}
                        data-val={`₹${currentPrice}/sq.ft`}
                      />
                    </div>
                    <span className="year-label">{year}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748B' }}>
              <span>* Data source: Nam Nilam Intelligence Engine & TN Registration Department Sales Deeds</span>
              <span>2026 values represent institutional consensus estimates</span>
            </div>
          </div>
        )}

        {/* Tab 2: Micro-Market Comparison Tool */}
        {activeTab === 'comparator' && (
          <div className="comparison-table-wrapper">
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-brand-deep)' }}>
                  {lang === 'ta' ? "இரு பகுதிகளை ஒப்பிடுங்கள்" : "Side-by-Side Micro-Market Benchmark"}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                  Compare real-world ground metrics before finalizing your land acquisition corridor.
                </p>
              </div>

              {/* Selector Controls */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <select 
                  value={marketA} 
                  onChange={(e) => setMarketA(Number(e.target.value))}
                  className="filter-select"
                  style={{ border: '2px solid var(--color-brand)' }}
                >
                  {MICRO_MARKET_BENCHMARKS.map((m, i) => (
                    <option key={i} value={i}>{m.name}</option>
                  ))}
                </select>

                <span style={{ fontWeight: 800, color: 'var(--color-gold)' }}>VS</span>

                <select 
                  value={marketB} 
                  onChange={(e) => setMarketB(Number(e.target.value))}
                  className="filter-select"
                  style={{ border: '2px solid var(--color-brand-accent)' }}
                >
                  {MICRO_MARKET_BENCHMARKS.map((m, i) => (
                    <option key={i} value={i}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Decision Metric</th>
                  <th style={{ width: '35%', color: 'var(--color-brand)' }}>
                    {MICRO_MARKET_BENCHMARKS[marketA].name}
                  </th>
                  <th style={{ width: '35%', color: '#059669' }}>
                    {MICRO_MARKET_BENCHMARKS[marketB].name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Average Price / Sq.ft</strong></td>
                  <td style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-brand)' }}>
                    {MICRO_MARKET_BENCHMARKS[marketA].avgPriceSqft}
                  </td>
                  <td style={{ fontWeight: 700, fontSize: '1.05rem', color: '#059669' }}>
                    {MICRO_MARKET_BENCHMARKS[marketB].avgPriceSqft}
                  </td>
                </tr>
                <tr>
                  <td><strong>Projected 3-Year CAGR</strong></td>
                  <td><span className="badge badge-green">{MICRO_MARKET_BENCHMARKS[marketA].threeYrCagr}</span></td>
                  <td><span className="badge badge-green">{MICRO_MARKET_BENCHMARKS[marketB].threeYrCagr}</span></td>
                </tr>
                <tr>
                  <td><strong>Groundwater Depth</strong></td>
                  <td>{MICRO_MARKET_BENCHMARKS[marketA].waterTableDepth}</td>
                  <td>{MICRO_MARKET_BENCHMARKS[marketB].waterTableDepth}</td>
                </tr>
                <tr>
                  <td><strong>Rental & Leasing Yield</strong></td>
                  <td>{MICRO_MARKET_BENCHMARKS[marketA].rentalYield}</td>
                  <td>{MICRO_MARKET_BENCHMARKS[marketB].rentalYield}</td>
                </tr>
                <tr>
                  <td><strong>Market to Guideline Ratio</strong></td>
                  <td>{MICRO_MARKET_BENCHMARKS[marketA].guidelineRatio}</td>
                  <td>{MICRO_MARKET_BENCHMARKS[marketB].guidelineRatio}</td>
                </tr>
                <tr>
                  <td><strong>Resale Liquidity Score</strong></td>
                  <td>
                    <strong style={{ color: 'var(--color-brand)' }}>{MICRO_MARKET_BENCHMARKS[marketA].liquidityScore}</strong>
                  </td>
                  <td>
                    <strong style={{ color: '#059669' }}>{MICRO_MARKET_BENCHMARKS[marketB].liquidityScore}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Infrastructure Radar */}
        {activeTab === 'infra' && (
          <div className="infra-grid">
            {INFRASTRUCTURE_RADAR.map((item) => (
              <div key={item.id} className="infra-card">
                <div className="infra-header">
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: '6px' }}>{item.tag}</span>
                    <h4>{lang === 'ta' ? item.titleTa : item.title}</h4>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                    {item.investment}
                  </span>
                </div>

                <div className="infra-metrics-row">
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Impact Corridors</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)' }}>
                      {lang === 'ta' ? item.areaImpactedTa : item.areaImpacted}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Status & Timeline</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-brand)' }}>
                      {item.timeline}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginTop: '10px' }}>
                  <strong style={{ color: '#0A3622' }}>Value Projection: </strong> 
                  {item.priceImpact}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* High-Converting Lead Magnet: Area Intelligence Report */}
        <div className="lead-magnet-card">
          <div className="lead-magnet-text">
            <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
              <Sparkles size={12} />
              Instant Intelligence Dossier
            </span>
            <h3>
              {lang === 'ta' 
                ? "உங்கள் பகுதி நில அறிக்கை மற்றும் விலை நிலவரத்தை இலவசமாகப் பெறுங்கள்" 
                : "Get Tamil Nadu Land Intelligence Report Delivered to WhatsApp"}
            </h3>
            <p>
              Includes 30-year guideline history, upcoming infrastructure impact, and 45-point legal due diligence checklist.
            </p>

            <div className="lead-features-list">
              <div className="lead-feature-item">
                <CheckCircle2 size={16} color="#34D399" />
                <span>Verified Sub-Registrar sales deed comps</span>
              </div>
              <div className="lead-feature-item">
                <CheckCircle2 size={16} color="#34D399" />
                <span>Groundwater yield & soil survey ratings</span>
              </div>
              <div className="lead-feature-item">
                <CheckCircle2 size={16} color="#34D399" />
                <span>Upcoming Parandur Airport / CPRR / Metro radius impact</span>
              </div>
            </div>
          </div>

          {/* Mini Lead Form */}
          <form onSubmit={handleLeadMagnetSubmit} className="lead-form-mini">
            <h4>Download Free Area Report</h4>

            <div className="form-field">
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '4px' }}>
                Select Growth Corridor
              </label>
              <select 
                value={leadArea} 
                onChange={(e) => setLeadArea(e.target.value)}
              >
                <option value="Guduvanchery">Guduvanchery - GST Road (Chennai)</option>
                <option value="Oragadam">Oragadam - Parandur Airport Belt</option>
                <option value="Saravanampatti">Saravanampatti IT Hub (Coimbatore)</option>
                <option value="Hosur">Hosur - Bagalur Road Tech Corridor</option>
                <option value="Poonamallee">Poonamallee - Thiruvallur Link</option>
                <option value="Pollachi">Pollachi Agro Corridor</option>
              </select>
            </div>

            <div className="form-field">
              <input 
                type="text" 
                placeholder="Your Full Name"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <input 
                type="tel" 
                placeholder="WhatsApp Number (e.g., 98401XXXXX)"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', marginTop: '8px' }}>
              <Download size={16} />
              <span>Get Instant WhatsApp Dossier</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
