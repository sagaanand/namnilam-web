import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Building2,
  Calendar,
  Compass,
  FileCheck2
} from 'lucide-react';
import { BRAND_INFO } from '../data/ecosystemData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { submitLead } from '../services/api';

export const ContactPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedIntent, setSelectedIntent] = useState('Land / Plot Purchase Advisory');
  const [location, setLocation] = useState('Trichy');
  const [budget, setBudget] = useState('₹20 Lakhs – ₹40 Lakhs');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  const intentOptions = [
    'Land / Plot Purchase Advisory',
    'Property Valuation & Legal Check',
    'Sell / List My Property',
    'Real Estate Business Partnership',
    'Digital Marketing / Tech Services',
    'Business Automation',
    'Training / Real Estate Academy',
    'Other Enquiry'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    // Submit to Hostinger Backend with full attribution
    submitLead({
      name,
      phone,
      email: email || 'Not provided',
      form_type: 'Contact Page Inquiry',
      source_page: '/contact',
      intent_purpose: selectedIntent,
      category: 'Contact Us',
      location,
      message: `${message}${budget ? ' | Budget: ' + budget : ''}`
    });

    // Compose official WhatsApp message
    let text = `Hello Nam Nilam Advisory Desk,%0A%0A`;
    text += `*Official Website Enquiry:*%0A`;
    text += `*Service Needed:* ${encodeURIComponent(selectedIntent)}%0A`;
    text += `*Name:* ${encodeURIComponent(name)}%0A`;
    text += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    text += `*Location:* ${encodeURIComponent(location)}%0A`;
    if (selectedIntent.includes('Buy') || selectedIntent.includes('Advisory')) {
      text += `*Budget:* ${encodeURIComponent(budget)}%0A`;
    }
    if (message) {
      text += `*Message:* ${encodeURIComponent(message)}%0A`;
    }
    text += `%0APlease review and connect on WhatsApp.`;

    const url = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${text}`;
    setWaLink(url);
    setSubmitted(true);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <Phone size={14} />
            <span>Official Contact Desk</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Talk to Nam Nilam
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Tell us what you are trying to achieve. Our advisory and technical team in Tiruchirappalli is here to guide you with clarity and data.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Intent-Based Enquiry Form */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-md)'
            }}>
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-brand-deep)', display: 'block', marginBottom: '12px' }}>
                      What do you need help with? *
                    </label>
                    <div className="intent-selector-group">
                      {intentOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setSelectedIntent(opt)}
                          className={`intent-chip ${selectedIntent === opt ? 'selected' : ''}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Anandha Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                        WhatsApp Number *
                      </label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="e.g. 97876 00006"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                        Your Location / City
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Trichy / Chennai / NRI"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        placeholder="e.g. anand@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>
                  </div>

                  {selectedIntent.includes('Buy') && (
                    <div style={{ marginBottom: '18px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                        Expected Investment Budget
                      </label>
                      <select 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)}
                        style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: 'var(--radius-md)' }}
                      >
                        <option value="Under 20 Lakhs">Under ₹20 Lakhs</option>
                        <option value="20 - 40 Lakhs">₹20 – ₹40 Lakhs</option>
                        <option value="40 - 75 Lakhs">₹40 – ₹75 Lakhs</option>
                        <option value="Above 75 Lakhs">₹75 Lakhs & Above</option>
                      </select>
                    </div>
                  )}

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                      Brief Requirement or Question
                    </label>
                    <textarea 
                      rows="3"
                      placeholder="Please mention any specific property requirements, survey questions, or business automation goals..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                  >
                    <Send size={18} />
                    <span>Submit Enquiry & Connect on WhatsApp</span>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold-soft)',
                    color: 'var(--color-gold-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    border: '1px solid var(--color-gold-border)'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 style={{ fontSize: '1.5rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                    Enquiry Registered with Nam Nilam!
                  </h3>

                  <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
                    Thank you, {name}. Your request for <strong>{selectedIntent}</strong> has been received by our Trichy advisory desk. Click below to continue directly on WhatsApp.
                  </p>

                  <a 
                    href={waLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'center' }}
                  >
                    <MessageSquare size={20} />
                    <span>Continue on WhatsApp (+91 97876 00006)</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Office Location & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{
                backgroundColor: 'var(--color-brand-deep)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '36px',
                border: '1px solid rgba(223, 186, 115, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <img src="/nam-nilam-logo.svg" alt="Nam Nilam Logo" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', lineHeight: 1.1 }}>
                      {BRAND_INFO.legalEntity}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-light)' }}>
                      Tiruchirappalli, Tamil Nadu
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: '#CBD5E1', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <MapPin size={18} color="#DFBA73" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>
                      <strong>Office Address:</strong><br />
                      {BRAND_INFO.address}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={18} color="#DFBA73" />
                    <span>
                      <strong>Direct Phone:</strong><br />
                      <a href={`tel:${BRAND_INFO.phone}`} style={{ color: '#FFFFFF', fontWeight: 700 }}>
                        {BRAND_INFO.phoneFormatted}
                      </a>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={18} color="#DFBA73" />
                    <span>
                      <strong>Email:</strong><br />
                      {BRAND_INFO.email} / {BRAND_INFO.advisoryEmail}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Clock size={18} color="#DFBA73" />
                    <span>
                      <strong>Office Hours:</strong><br />
                      {BRAND_INFO.hours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Box */}
              <div style={{
                backgroundColor: 'var(--color-canvas)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '28px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto'
                }}>
                  <MessageSquare size={24} />
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Prefer Fast WhatsApp Chat?</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '16px' }}>
                  Reach our advisory team directly on WhatsApp for instant layout documents, GPS locations, and consultation scheduling.
                </p>
                <a 
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nam Nilam, I have an urgent real estate query.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Message +91 97876 00006
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
