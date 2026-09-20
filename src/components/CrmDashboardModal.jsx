import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Download, 
  Search, 
  MessageSquare, 
  Car, 
  FileText, 
  Crown, 
  PhoneCall, 
  CheckCircle,
  Clock
} from 'lucide-react';

export const CrmDashboardModal = ({ 
  isOpen, 
  onClose, 
  leads = [] 
}) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState('');
  const [filterIntent, setFilterIntent] = useState('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm) ||
      (lead.property || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIntent = filterIntent === 'all' || lead.intent === filterIntent;
    return matchesSearch && matchesIntent;
  });

  // Export to CSV function
  const handleExportCsv = () => {
    if (leads.length === 0) {
      alert('No leads available to export yet.');
      return;
    }

    const headers = ['ID', 'Date & Time', 'Full Name', 'Phone', 'Email', 'Intent', 'Property / Area', 'Preferred Date', 'Status'];
    const rows = leads.map(l => [
      l.id,
      `"${l.dateFormatted || l.timestamp}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.intent}"`,
      `"${l.property}"`,
      `"${l.preferredDate || ''}"`,
      `"${l.status || 'New'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nam_nilam_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDirectWhatsApp = (lead) => {
    const url = `https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20the%20Nam%20Nilam%20Advisory%20Team%20regarding%20your%20enquiry%20for%20${encodeURIComponent(lead.property)}.`;
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-large" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-gold">
                <Users size={12} />
                Internal Operator Desk
              </span>
              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>
                ● Live Local CRM Sync
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-brand-deep)' }}>
              Nam Nilam Inbound Lead Tracker
            </h2>
          </div>

          <button 
            onClick={handleExportCsv}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={15} />
            <span>Export CSV ({leads.length} Leads)</span>
          </button>
        </div>

        {/* Dashboard Body */}
        <div style={{ padding: '32px' }}>
          {/* Quick Metrics Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '28px'
          }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Total Inbound Leads</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-brand)', fontFamily: 'var(--font-mono)' }}>
                {leads.length}
              </span>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Site Visits Booked</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284C7', fontFamily: 'var(--font-mono)' }}>
                {leads.filter(l => l.intent === 'site-visit').length}
              </span>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Dossier Downloads</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#166534', fontFamily: 'var(--font-mono)' }}>
                {leads.filter(l => l.intent === 'report' || l.intent?.includes('Dossier')).length}
              </span>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', display: 'block' }}>Club Applications</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-mono)' }}>
                {leads.filter(l => l.intent === 'club').length}
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input 
                type="text" 
                placeholder="Search leads by name, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', height: '44px', paddingLeft: '38px', borderRadius: 'var(--radius-md)' }}
              />
            </div>

            <select 
              value={filterIntent} 
              onChange={(e) => setFilterIntent(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Enquiry Types</option>
              <option value="site-visit">Site Visit Bookings</option>
              <option value="report">Intelligence Report Downloads</option>
              <option value="club">Club Syndicate Applications</option>
              <option value="valuation">Valuation Requests</option>
            </select>
          </div>

          {/* Table of Leads */}
          {filteredLeads.length > 0 ? (
            <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '12px 16px' }}>Date / Time</th>
                    <th style={{ padding: '12px 16px' }}>Visitor Name</th>
                    <th style={{ padding: '12px 16px' }}>Phone (WhatsApp)</th>
                    <th style={{ padding: '12px 16px' }}>Intent / Purpose</th>
                    <th style={{ padding: '12px 16px' }}>Target Property / Corridor</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 16px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        {lead.dateFormatted}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-ink)' }}>
                        {lead.name}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)' }}>
                        {lead.phone}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                          {lead.intent}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-ink-muted)' }}>
                        {lead.property}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <button 
                          onClick={() => openDirectWhatsApp(lead)}
                          className="btn btn-whatsapp btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          <MessageSquare size={12} />
                          <span>Chat</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--color-ink-muted)' }}>
              <p style={{ fontSize: '1rem', marginBottom: '8px' }}>No inbound leads matching filter.</p>
              <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Test any "Book Site Visit", "Download Report", or "Request Service" form to see live leads appear here instantly!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
