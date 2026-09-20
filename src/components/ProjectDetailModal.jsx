import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  FileCheck2, 
  Car, 
  MessageSquare, 
  Droplets, 
  Compass, 
  Calculator,
  Download,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const ProjectDetailModal = ({ 
  property, 
  lang, 
  onClose, 
  onBookSiteVisit, 
  onWhatsAppEnquire,
  onDownloadReport 
}) => {
  if (!property) return null;

  // Simulated layout plot grid
  const totalSimPlots = 24;
  const bookedPlots = [2, 5, 6, 9, 12, 14, 18, 21, 23];
  const premiumPlots = [1, 8, 16, 24]; // Corner plots

  const [selectedPlot, setSelectedPlot] = useState(3);
  const [plotSize, setPlotSize] = useState(1200);

  // Transparent price calculation
  const baseRate = property.rateSqftRaw || 2400;
  const landCost = plotSize * baseRate;
  const registrationFee = Math.round(landCost * 0.09); // 9% TN Registration & Stamp duty
  const legalAndPattaFee = 15000;
  const totalEstimatedCost = landCost + registrationFee + legalAndPattaFee;

  const handlePlotClick = (plotNum) => {
    if (bookedPlots.includes(plotNum)) return;
    setSelectedPlot(plotNum);
    if (premiumPlots.includes(plotNum)) {
      setPlotSize(1800);
    } else if (plotNum % 3 === 0) {
      setPlotSize(1500);
    } else {
      setPlotSize(1200);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-large" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ padding: '32px 32px 20px 32px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-green">
              <ShieldCheck size={13} />
              {property.approvalBadge}
            </span>
            <span className="badge badge-gold">
              RERA: {property.reraNumber}
            </span>
            <span className="badge badge-dark">
              {property.cagr} {property.cagrPeriod}
            </span>
          </div>

          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-brand-deep)', marginBottom: '6px' }}>
            {lang === 'ta' ? property.nameTa : property.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-ink-muted)', fontSize: '0.9rem' }}>
            <MapPin size={15} color="#10B981" />
            <span>{lang === 'ta' ? property.locationTa : property.location}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '32px' }}>
          {/* Quick Stat Summary Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            backgroundColor: 'var(--color-canvas)',
            padding: '18px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            marginBottom: '32px'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Base Rate</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-brand)' }}>{property.rateSqft} / sq.ft</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Groundwater Level</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0284C7' }}>{property.waterTable}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Internal Road</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-ink)' }}>{property.roadWidth}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Guideline Value</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#854D0E' }}>{property.guidelineValue}</span>
            </div>
          </div>

          {/* Interactive Layout Simulator Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={18} color="#10B981" />
                <span>Interactive Master Layout Plot Selector</span>
              </h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 10, height: 10, backgroundColor: '#DCFCE7', borderRadius: 2, border: '1px solid #86EFAC' }}></span> Available
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 10, height: 10, backgroundColor: '#FEF3C7', borderRadius: 2, border: '1px solid #FDE68A' }}></span> Corner/Premium
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 10, height: 10, backgroundColor: '#F1F5F9', borderRadius: 2 }}></span> Booked
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginBottom: '12px' }}>
              Click any available plot below to simulate transparent cost calculation including 9% government registration.
            </p>

            {/* Visual plot grid */}
            <div className="layout-grid-simulator">
              {Array.from({ length: totalSimPlots }, (_, i) => i + 1).map((plotNum) => {
                const isBooked = bookedPlots.includes(plotNum);
                const isPremium = premiumPlots.includes(plotNum);
                const isSelected = selectedPlot === plotNum;

                let cls = 'sim-plot available';
                if (isBooked) cls = 'sim-plot booked';
                else if (isPremium) cls = 'sim-plot premium';
                if (isSelected) cls += ' selected';

                return (
                  <div 
                    key={plotNum}
                    className={cls}
                    onClick={() => handlePlotClick(plotNum)}
                    title={`Plot #${plotNum} - ${isBooked ? 'Sold' : isPremium ? 'Corner Premium' : 'Available'}`}
                  >
                    <span>#{plotNum}</span>
                    <span style={{ fontSize: '0.62rem', opacity: 0.85 }}>
                      {isBooked ? 'SOLD' : isPremium ? 'CORNER' : 'AVAIL'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Plot Dynamic Breakdown Calculator */}
            <div className="cost-calculator-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calculator size={18} color="#0A3622" />
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--color-brand-deep)' }}>
                    Transparent Cost Estimation for Plot #{selectedPlot} ({plotSize} sq.ft)
                  </h4>
                </div>
                <span className="badge badge-green">
                  {premiumPlots.includes(selectedPlot) ? 'North-East Corner' : 'East Facing'}
                </span>
              </div>

              <div className="calc-row">
                <span>Land Basic Cost ({plotSize} sq.ft × {property.rateSqft})</span>
                <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>₹{landCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row">
                <span>TN Stamp Duty (7%) + Registration Fee (2%) = 9%</span>
                <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>₹{registrationFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row">
                <span>Sub-Division Patta Transfer & Documentation Assistance</span>
                <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>₹{legalAndPattaFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row total">
                <span>Total All-Inclusive Estimated On-Road Land Investment</span>
                <span>₹{totalEstimatedCost.toLocaleString('en-IN')}</span>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '10px' }}>
                * No hidden developer brokerage. Transparent breakdown as per prevailing Tamil Nadu Registration Department rules.
              </p>
            </div>
          </div>

          {/* Legal Due Diligence Document Checklist */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck2 size={18} color="#10B981" />
              <span>45-Point Legal Verification Status</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {(property.documents || []).map((doc, idx) => (
                <div key={idx} style={{
                  padding: '14px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink)' }}>
                      {doc.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Date: {doc.date}
                    </div>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                    <CheckCircle2 size={11} />
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connectivity & Proximity */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-deep)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#10B981" />
              <span>Infrastructure & Commute Proximity</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {(property.connectivity || []).map((conn, idx) => (
                <div key={idx} style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-brand)' }}>
                    {conn.time}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-ink)', marginTop: '2px' }}>
                    {conn.point}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    {conn.distance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            gap: '14px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => onBookSiteVisit(property)}
              className="btn btn-primary btn-lg"
              style={{ flex: 1.2 }}
            >
              <Car size={18} />
              <span>Book Free Cab Site Visit</span>
            </button>

            <button 
              onClick={() => onWhatsAppEnquire(property, selectedPlot)}
              className="btn btn-whatsapp btn-lg"
              style={{ flex: 1 }}
            >
              <MessageSquare size={18} />
              <span>WhatsApp Advisor</span>
            </button>

            <button 
              onClick={() => onDownloadReport(property)}
              className="btn btn-outline btn-lg"
              style={{ flex: 1 }}
            >
              <Download size={18} />
              <span>Download Full Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
