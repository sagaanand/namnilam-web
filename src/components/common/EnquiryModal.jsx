import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../../data/ecosystemData';
import { submitLead } from '../../services/api';

export const EnquiryModal = ({ isOpen, onClose, initialIntent = 'General Advisory' }) => {
  if (!isOpen) return null;

  const [intent, setIntent] = useState(initialIntent);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Trichy');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  const intents = [
    'Buy / Invest in Trichy',
    'Property Advisory',
    'Property Valuation',
    'Due Diligence Support',
    'Investment Advisory',
    'Real Estate Business Solutions',
    'Academy / Workshop',
    'General Enquiry'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid WhatsApp phone number.');
      return;
    }

    // Submit to Hostinger Backend with full attribution tracking
    submitLead({
      name,
      phone,
      email: email || 'Not provided',
      form_type: 'Advisory Desk (Enquiry Modal)',
      source_page: window.location.pathname,
      intent_purpose: intent,
      category: 'Advisory Consultation',
      location,
      message
    });

    // Build structured WhatsApp message for official desk
    let text = `Hello Nam Nilam Advisory Team,%0A%0A`;
    text += `*New Consultation Request:*%0A`;
    text += `*Name:* ${encodeURIComponent(name)}%0A`;
    text += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    text += `*Purpose:* ${encodeURIComponent(intent)}%0A`;
    text += `*Location:* ${encodeURIComponent(location)}%0A`;
    if (message) {
      text += `*Details:* ${encodeURIComponent(message)}%0A`;
    }
    text += `%0APlease share relevant advisory details and schedule next steps.`;

    const targetUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${text}`;
    setWaUrl(targetUrl);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div style={{ padding: '28px 32px 18px 32px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-gold">
              <ShieldCheck size={12} />
              Nam Nilam Official Advisory Desk
            </span>
          </div>
          <h3 style={{ fontSize: '1.45rem', color: 'var(--color-brand-deep)', lineHeight: 1.25 }}>
            Talk to Nam Nilam
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
            Office: {BRAND_INFO.address.split(',')[0]}, {BRAND_INFO.address.split(',')[1]} • Phone: {BRAND_INFO.phoneFormatted}
          </p>
        </div>

        <div style={{ padding: '32px' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  What do you need help with?
                </label>
                <select 
                  value={intent} 
                  onChange={(e) => setIntent(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                >
                  {intents.map((item, idx) => (
                    <option key={idx} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Senthil Nathan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    WhatsApp Number *
                  </label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="e.g. 97876 00006"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Your Location / City
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Trichy / Chennai / NRI"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Email (Optional)
                  </label>
                  <input 
                    type="email" 
                    placeholder="e.g. senthil@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  Requirement Details / Property Query
                </label>
                <textarea 
                  rows="2"
                  placeholder="Tell us what you are trying to achieve (e.g. Looking for residential plot near Trichy Airport or Need title check)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Send size={16} />
                <span>Submit & Connect on WhatsApp</span>
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-soft)',
                color: 'var(--color-gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1px solid var(--color-gold-border)'
              }}>
                <CheckCircle2 size={32} />
              </div>

              <h4 style={{ fontSize: '1.35rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                Consultation Request Logged!
              </h4>

              <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.6 }}>
                Thank you, {name}. Our advisory team at {BRAND_INFO.phoneFormatted} is ready to assist you. Click below to continue directly on WhatsApp.
              </p>

              <a 
                href={waUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <MessageSquare size={18} />
                <span>Continue on WhatsApp (+91 97876 00006)</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
