import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock 
} from 'lucide-react';
import { BRAND_INFO } from '../../data/ecosystemData';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info & Official Office Address */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <img 
                src="/nam-nilam-logo.png" 
                alt="Nam Nilam Emblem" 
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'contain' }}
              />
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', lineHeight: 1.1 }}>
                  Nam Nilam
                </h3>
                <span style={{ fontSize: '0.72rem', color: '#DFBA73', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  {BRAND_INFO.legalEntity}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#94A3B8', marginBottom: '20px' }}>
              {BRAND_INFO.subTagline}
            </p>

            {/* Official Registered Office Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="#DFBA73" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>
                  <strong>Registered Office:</strong><br />
                  {BRAND_INFO.address}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={15} color="#DFBA73" />
                <span><strong>Direct Desk: </strong>{BRAND_INFO.phoneFormatted}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={15} color="#DFBA73" />
                <span>{BRAND_INFO.email} / {BRAND_INFO.advisoryEmail}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={15} color="#DFBA73" />
                <span>{BRAND_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4>Advisory & Intelligence</h4>
            <ul className="footer-links">
              <li><Link to="/services/real-estate-advisory">Real Estate Advisory</Link></li>
              <li><Link to="/services/property-valuation">Property Valuation Support</Link></li>
              <li><Link to="/services/due-diligence">Due Diligence Guidance</Link></li>
              <li><Link to="/services/investment-advisory">Investment Advisory</Link></li>
              <li><Link to="/intelligence">Market Intelligence Hub</Link></li>
              <li><Link to="/intelligence/price-insights">Land Price Insights</Link></li>
            </ul>
          </div>

          {/* AI Workforce & Business */}
          <div>
            <h4>Nam Nilam AI Workforce</h4>
            <ul className="footer-links">
              <li><Link to="/ai">AI Workforce Overview</Link></li>
              <li><Link to="/ai/ai-sales-agent">AI Sales Agent</Link></li>
              <li><Link to="/ai/ai-whatsapp-agent">AI WhatsApp Agent</Link></li>
              <li><Link to="/ai/ai-calling-agent">AI Outbound Telecaller</Link></li>
              <li><Link to="/ai/ai-morning-brief">AI Morning Business Brief</Link></li>
              <li><Link to="/ai/ai-revenue-leakage-agent">AI Revenue Leakage Agent</Link></li>
              <li><Link to="/academy">Nam Nilam Academy</Link></li>
            </ul>
          </div>

          {/* Trichy Projects & Quick Contact */}
          <div>
            <h4>Trichy Projects & Contact</h4>
            <ul className="footer-links" style={{ marginBottom: '20px' }}>
              <li><Link to="/projects">Projects in Trichy</Link></li>
              <li><Link to="/projects/cauvery-green-city-samayapuram">Cauvery Green City (Samayapuram)</Link></li>
              <li><Link to="/projects/airport-tech-vista-mathur">Airport Tech Vista (Mathur)</Link></li>
              <li><Link to="/projects/royal-meadows-manikandam">Royal Meadows (Manikandam)</Link></li>
              <li><Link to="/resources">Buyer Checklists & Guides</Link></li>
              <li><Link to="/contact">Intent-Based Enquiry Desk</Link></li>
            </ul>

            <a 
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam Advisory, I have a property question.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <MessageSquare size={16} />
              <span>WhatsApp: {BRAND_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="footer-bottom">
          <p style={{ lineHeight: 1.6 }}>
            <strong>Important Regulatory Disclaimer: </strong>
            Nam Nilam (Nam Nilam Infra Private Limited) is an independent real estate intelligence, advisory, education and digital transformation company. Property advisory and due diligence guidance provided are intended for informed decision support. Legal title verification should be completed with independent qualified advocates prior to executing registration deeds. All projects listed under Projects currently reflect specific initiatives in Tiruchirappalli (Trichy).
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
            <span>© {new Date().getFullYear()} Nam Nilam Infra Private Limited. All Rights Reserved.</span>
            <span>Trichy • Tamil Nadu • India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
