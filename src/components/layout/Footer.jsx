import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock,
  ShieldCheck 
} from 'lucide-react';
import { BRAND_INFO, TRICHY_PROJECTS } from '../../data/ecosystemData';

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

          {/* Advisory & Intelligence */}
          <div>
            <h4>Advisory & Intelligence</h4>
            <ul className="footer-links">
              <li><Link to="/services/real-estate-advisory">Real Estate Advisory</Link></li>
              <li><Link to="/services/property-valuation">Property Valuation Support</Link></li>
              <li><Link to="/services/due-diligence">Due Diligence Guidance</Link></li>
              <li><Link to="/services/investment-advisory">Investment Advisory</Link></li>
              <li><Link to="/services/real-estate-consulting">Real Estate Consulting</Link></li>
              <li><Link to="/intelligence">Market Intelligence Hub</Link></li>
              <li><Link to="/intelligence/price-insights">Land Price Insights</Link></li>
              <li><Link to="/about/approach">Our 4-Step Methodology</Link></li>
            </ul>
          </div>

          {/* AI Workforce & Business Solutions */}
          <div>
            <h4>AI Workforce & Business</h4>
            <ul className="footer-links">
              <li><Link to="/ai">AI Workforce Overview</Link></li>
              <li><Link to="/ai/sales-agent">AI Sales Agent</Link></li>
              <li><Link to="/ai/whatsapp-agent">AI WhatsApp Agent</Link></li>
              <li><Link to="/ai/calling-agent">AI Calling Agent</Link></li>
              <li><Link to="/ai/morning-brief">AI Morning Brief</Link></li>
              <li><Link to="/ai/revenue-leakage-agent">AI Revenue Leakage Agent</Link></li>
              <li><Link to="/ai/use-cases/real-estate-whatsapp-automation">WhatsApp Automation Use Case</Link></li>
              <li><Link to="/business">Business Solutions</Link></li>
              <li><Link to="/academy">Nam Nilam Academy</Link></li>
            </ul>
          </div>

          {/* Trichy Projects & Quick Contact */}
          <div>
            <h4>Projects in Trichy</h4>
            <ul className="footer-links" style={{ marginBottom: '20px' }}>
              {TRICHY_PROJECTS.map((proj) => (
                <li key={proj.slug}>
                  <Link to={`/projects/${proj.slug}`}>{proj.title} ({proj.location.split(',')[0]})</Link>
                </li>
              ))}
              <li><Link to="/resources">Buyer Checklists & AI Guides</Link></li>
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
          <p style={{ lineHeight: 1.6, marginBottom: '12px' }}>
            <strong>Important Regulatory & Geographic Scope Notice: </strong>
            Nam Nilam (Nam Nilam Infra Private Limited) is an independent real estate intelligence, advisory, education and digital transformation company. Advisory, intelligence, academy, and business solutions serve clients across <strong>Tamil Nadu</strong>. Property development projects currently reflect specific layout initiatives in <strong>Tiruchirappalli (Trichy)</strong> only. We do not claim or imply nationwide or statewide project inventory.
          </p>
          <p style={{ lineHeight: 1.6 }}>
            Advisory and due diligence guidance are provided for objective decision support and do not constitute guaranteed investment returns or financial underwriting. All legal title scrutinies must be completed with qualified legal advocates prior to registration.
          </p>
          <div style={{ marginTop: '16px', fontSize: '0.78rem', color: '#64748B', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span>© {new Date().getFullYear()} Nam Nilam Infra Private Limited. All rights reserved.</span>
            <span>Tiruchirappalli, Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
