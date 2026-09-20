import React, { useState } from 'react';
import { 
  X, 
  Car, 
  FileSpreadsheet, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { BRAND_INFO } from '../data/ecosystemData';
import { submitLead } from '../services/api';

export const LeadCaptureModal = ({ 
  isOpen, 
  onClose, 
  contextData, 
  onSaveLead 
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const isSiteVisit = contextData?.type === 'site-visit';
  const isReport = contextData?.type === 'report';
  const isClub = contextData?.type === 'club';
  const isValuation = contextData?.type === 'valuation';

  const modalTitle = isSiteVisit 
    ? `Book Free AC Cab Site Visit: ${contextData?.property?.name || 'Layout Visit'}`
    : isReport 
    ? `Download Intelligence Dossier: ${contextData?.property?.name || contextData?.area || 'Tamil Nadu Corridors'}`
    : isClub 
    ? 'Apply for Nam Nilam Investor Club Membership'
    : isValuation
    ? 'Request Algorithmic Land Valuation'
    : 'Schedule Real Estate Advisory Session';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const formTypeName = isSiteVisit 
      ? 'Site Visit Booking' 
      : isReport 
      ? 'Intelligence Dossier Download' 
      : isClub 
      ? 'Investor Club Application' 
      : isValuation 
      ? 'Algorithmic Land Valuation' 
      : 'Property Inquiry';

    // Submit to Hostinger Backend with full attribution
    submitLead({
      name: fullName,
      phone: phone,
      email: email || 'Not Provided',
      form_type: formTypeName,
      source_page: typeof window !== 'undefined' ? window.location.pathname : '/projects',
      intent_purpose: modalTitle,
      category: contextData?.property?.name ? 'Project Inquiry' : 'Advisory Service',
      location: contextData?.property?.location || 'Trichy',
      message: `${comments || ''}${preferredDate ? ' | Preferred Date: ' + preferredDate + ' (' + passengers + ' pax)' : ''}${contextData?.property?.name ? ' | Property: ' + contextData.property.name : ''}`
    });

    const leadObject = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      name: fullName,
      phone: phone,
      email: email || 'Not Provided',
      intent: contextData?.type || 'General Advisory',
      property: contextData?.property?.name || contextData?.area || 'General TN Market',
      preferredDate: preferredDate || 'Flexible',
      status: 'New Lead'
    };

    if (onSaveLead) {
      onSaveLead(leadObject);
    }

    // Build pre-composed WhatsApp message
    let msg = `Hello Nam Nilam Advisory Team,%0A%0A`;
    msg += `I am submitting an enquiry via namnilam.in:%0A`;
    msg += `*Name:* ${encodeURIComponent(fullName)}%0A`;
    msg += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    msg += `*Request:* ${encodeURIComponent(modalTitle)}%0A`;
    if (contextData?.property?.name) {
      msg += `*Property:* ${encodeURIComponent(contextData.property.name)} (${encodeURIComponent(contextData.property.location)})%0A`;
      msg += `*Rate:* ${encodeURIComponent(contextData.property.rateSqft)} / sq.ft%0A`;
    }
    if (preferredDate) {
      msg += `*Preferred Date:* ${encodeURIComponent(preferredDate)} (${passengers} passengers)%0A`;
    }
    if (comments) {
      msg += `*Notes:* ${encodeURIComponent(comments)}%0A`;
    }
    msg += `%0APlease share the verified dossier and next steps on WhatsApp. Thank you!`;

    const targetUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${msg}`;
    setWhatsAppUrl(targetUrl);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div style={{ padding: '28px 28px 16px 28px', borderBottom: '1px solid var(--color-border)' }}>
          <span className="badge badge-green" style={{ marginBottom: '8px' }}>
            <ShieldCheck size={12} />
            Verified Nam Nilam Advisory Desk
          </span>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', lineHeight: 1.3 }}>
            {modalTitle}
          </h3>
        </div>

        <div style={{ padding: '28px' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Senthil Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  WhatsApp Mobile Number *
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 98401 23456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                  We will send the layout dossier, GPS coordinates, and cab details via WhatsApp.
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  Email Address (Optional)
                </label>
                <input 
                  type="email" 
                  placeholder="e.g. senthil@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              {/* Site Visit Specific Fields */}
              {isSiteVisit && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                      Preferred Visit Date
                    </label>
                    <input 
                      type="date" 
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                      Cab Seats Required
                    </label>
                    <select 
                      value={passengers} 
                      onChange={(e) => setPassengers(e.target.value)}
                      style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                    >
                      <option value="2">2 Persons (Sedan)</option>
                      <option value="4">4 Persons (Innova)</option>
                      <option value="6">6 Persons (SUV)</option>
                    </select>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  Any specific questions / investment budget?
                </label>
                <textarea 
                  rows="2"
                  placeholder="e.g., Looking for north-facing 1500 sq.ft plot ready for construction"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <Send size={18} />
                <span>Confirm & Connect on WhatsApp</span>
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <h4 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                Request Registered Successfully!
              </h4>

              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
                Your enquiry has been securely logged into the Nam Nilam CRM. Click below to continue directly on WhatsApp with our technical land advisor.
              </p>

              <a 
                href={whatsAppUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', width: '100%' }}
              >
                <MessageSquare size={20} />
                <span>Open Direct WhatsApp Chat</span>
                <ExternalLink size={16} />
              </a>

              <button 
                onClick={onClose}
                style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-ink-muted)', textDecoration: 'underline' }}
              >
                Return to website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
