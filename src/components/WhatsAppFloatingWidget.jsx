import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Car, 
  FileText, 
  Compass, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const WhatsAppFloatingWidget = ({ onQuickAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const prompts = [
    {
      title: "Looking for DTCP plots in Chennai (GST / OMR)",
      text: "Hello Nam Nilam Team, I am looking for verified DTCP plots in Chennai under ₹35 Lakhs. Please share available layout options."
    },
    {
      title: "Book Free Chauffeur Site Visit",
      text: "Hello Nam Nilam Advisor, I would like to schedule a free site visit to your verified layout this weekend."
    },
    {
      title: "Download Tamil Nadu Land Price Intelligence Report",
      text: "Hello, please send me the latest 2026 Land Price Appreciation and Infrastructure Report for Tamil Nadu corridors."
    },
    {
      title: "Consult Chief Real Estate Advisor",
      text: "Hello, I need legal title and valuation advice for a property before paying an advance token."
    }
  ];

  const handlePromptClick = (promptText) => {
    const url = `https://wa.me/919840992211?text=${encodeURIComponent(promptText)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="floating-whatsapp">
      {isOpen && (
        <div className="whatsapp-bubble-popup">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#25D366' }}></div>
              <strong style={{ fontSize: '0.88rem', color: 'var(--color-brand-deep)' }}>
                Nam Nilam WhatsApp Desk
              </strong>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: '#64748B' }}>
              <X size={16} />
            </button>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', marginBottom: '12px' }}>
            Instant direct access to our verified land analysts. Choose a topic:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(p.text)}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{p.title}</span>
                <ArrowRight size={12} color="#10B981" />
              </button>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-trigger-btn"
        aria-label="Chat on WhatsApp"
        title="Chat with Nam Nilam Land Advisor"
      >
        <MessageSquare size={28} />
      </button>
    </div>
  );
};
