import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Inbox, 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Phone, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  Sparkles, 
  Layers, 
  Tag, 
  Globe, 
  Calendar,
  Eye,
  AlertCircle,
  X,
  Save,
  RefreshCw
} from 'lucide-react';
import { 
  getLeads, 
  updateLeadStatus, 
  deleteLead, 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  loginAdmin 
} from '../services/api';
import { BRAND_INFO, TRICHY_PROJECTS } from '../data/ecosystemData';

export const AdminPage = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active View Tab: 'leads' | 'projects'
  const [activeTab, setActiveTab] = useState('leads');

  // Leads State
  const [leads, setLeads] = useState([]);
  const [leadsMetrics, setLeadsMetrics] = useState({ total_leads: 0, new_leads: 0 });
  const [leadFilterForm, setLeadFilterForm] = useState('all');
  const [leadFilterStatus, setLeadFilterStatus] = useState('all');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Projects State
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // null or project object
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Project Form State
  const initialProjectForm = {
    id: '',
    title: '',
    slug: '',
    location: 'Airport Road, Trichy',
    type: 'Residential Plots',
    price_per_sqft: 1850,
    starting_price: '₹22.2 Lakhs',
    status: 'Ready to Register',
    approval: 'DTCP & RERA Approved',
    total_units: 60,
    available_units: 18,
    amenities: 'Blacktop Roads, Street Lights, 24/7 Security, 3-Phase EB',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    featured: 1
  };
  const [projectFormData, setProjectFormData] = useState(initialProjectForm);

  // Check existing session
  useEffect(() => {
    const token = sessionStorage.getItem('nam_nilam_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data upon authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeadsData();
      fetchProjectsData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);
    const result = await loginAdmin(passcode);
    setIsLoggingIn(false);

    if (result.success) {
      setIsAuthenticated(true);
    } else {
      setAuthError(result.error || 'Invalid passcode. Enter authorized Nam Nilam Admin PIN.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nam_nilam_admin_token');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // -------------------------------------------------------------
  // LEADS OPERATIONS
  // -------------------------------------------------------------
  const fetchLeadsData = async () => {
    setIsLoadingLeads(true);
    const res = await getLeads({
      form_type: leadFilterForm,
      status: leadFilterStatus,
      search: leadSearchQuery
    });
    if (res && res.leads) {
      setLeads(res.leads);
      if (res.metrics) setLeadsMetrics(res.metrics);
    }
    setIsLoadingLeads(false);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await deleteLead(leadId);
      setLeads(prev => prev.filter(l => l.id !== leadId));
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No leads to export.');
      return;
    }

    const headers = ['Date', 'Name', 'Phone', 'Email', 'Form Type', 'Source Page', 'Purpose / Intent', 'Location', 'Message', 'Status'];
    const rows = leads.map(l => [
      `"${l.created_at || l.timestamp || ''}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.form_type || '').replace(/"/g, '""')}"`,
      `"${(l.source_page || '').replace(/"/g, '""')}"`,
      `"${(l.intent_purpose || l.intent || '').replace(/"/g, '""')}"`,
      `"${(l.location || '').replace(/"/g, '""')}"`,
      `"${(l.message || l.notes || '').replace(/"/g, '""')}"`,
      `"${l.status || 'new'}"`
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

  // -------------------------------------------------------------
  // PROJECTS OPERATIONS
  // -------------------------------------------------------------
  const fetchProjectsData = async () => {
    setIsLoadingProjects(true);
    const data = await getProjects();
    if (Array.isArray(data)) {
      setProjects(data);
    }
    setIsLoadingProjects(false);
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectFormData({
      ...initialProjectForm,
      id: 'proj_' + Date.now(),
      slug: 'project-' + Date.now().toString().slice(-4)
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectFormData({
      id: proj.id,
      title: proj.title || proj.name || '',
      slug: proj.slug || '',
      location: proj.location || '',
      type: proj.type || 'Residential Plots',
      price_per_sqft: proj.price_per_sqft || proj.rateSqft || 1500,
      starting_price: proj.starting_price || proj.priceLabel || '₹18 Lakhs',
      status: proj.status || 'Ready to Register',
      approval: proj.approval || 'DTCP Approved',
      total_units: proj.total_units || proj.totalPlots || 50,
      available_units: proj.available_units || proj.availablePlots || 15,
      amenities: typeof proj.amenities === 'string' ? proj.amenities : (proj.amenities || []).join(', '),
      description: proj.description || '',
      image_url: proj.image_url || proj.image || '',
      featured: proj.featured ? 1 : 0
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectFormData.title) {
      alert('Please provide a project title');
      return;
    }

    if (editingProject) {
      await updateProject(projectFormData);
      setProjects(prev => prev.map(p => p.id === projectFormData.id ? { ...p, ...projectFormData } : p));
    } else {
      await createProject(projectFormData);
      setProjects(prev => [projectFormData, ...prev]);
    }

    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete project: "${title}"?`)) {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesForm = leadFilterForm === 'all' || l.form_type === leadFilterForm;
    const matchesStatus = leadFilterStatus === 'all' || l.status === leadFilterStatus;
    const q = leadSearchQuery.toLowerCase();
    const matchesSearch = !q || 
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.phone && l.phone.includes(q)) ||
      (l.source_page && l.source_page.toLowerCase().includes(q)) ||
      (l.message && l.message.toLowerCase().includes(q)) ||
      (l.intent_purpose && l.intent_purpose.toLowerCase().includes(q));
    return matchesForm && matchesStatus && matchesSearch;
  });

  // Unique Form Types in current dataset
  const uniqueFormTypes = Array.from(new Set(leads.map(l => l.form_type).filter(Boolean)));

  // -------------------------------------------------------------
  // RENDER: LOGIN GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--color-border)',
          padding: '36px 32px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-gold-soft)',
            color: 'var(--color-gold-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            border: '1px solid var(--color-gold-border)'
          }}>
            <Lock size={30} />
          </div>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
            Nam Nilam Control Center
          </h2>
          <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
            Hostinger Native Admin • Lead Attribution & Project CMS
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '8px' }}>
                Admin PIN / Passcode
              </label>
              <input 
                type="password" 
                required
                autoFocus
                placeholder="Enter PIN (e.g. 97876)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '1.1rem',
                  letterSpacing: '3px',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)'
                }}
              />
            </div>

            {authError && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#DC2626',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'left'
              }}>
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={isLoggingIn}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <ShieldCheck size={18} />
              <span>{isLoggingIn ? 'Verifying...' : 'Unlock Admin Portal'}</span>
            </button>
          </form>

          <div style={{ marginTop: '24px', fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
            Authorized Staff Desk • {BRAND_INFO.phoneFormatted}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div style={{ minHeight: '90vh', backgroundColor: '#F8FAFC', paddingBottom: '80px' }}>
      {/* Top Admin Bar */}
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '8px',
              backgroundColor: 'var(--color-brand-deep)',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
            }}>
              NN
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-brand-deep)', margin: 0 }}>
                  Nam Nilam Central Desk
                </h1>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                  Hostinger MySQL
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', margin: 0 }}>
                Trichy HQ • Database: u665690797_nncpro
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`btn ${activeTab === 'leads' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '8px 16px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Inbox size={16} />
              <span>Leads Inbox</span>
              {leads.filter(l => l.status === 'new').length > 0 && (
                <span style={{
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '2px 7px',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}>
                  {leads.filter(l => l.status === 'new').length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('projects')}
              className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '8px 16px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FolderKanban size={16} />
              <span>Project Manager ({projects.length})</span>
            </button>

            <button 
              onClick={handleLogout}
              className="btn btn-outline"
              title="Logout"
              style={{ padding: '8px 14px', color: 'var(--color-ink-muted)' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '24px auto 0 auto', padding: '0 20px' }}>

        {/* ========================================================= */}
        {/* TAB 1: LEADS INBOX & ATTRIBUTION */}
        {/* ========================================================= */}
        {activeTab === 'leads' && (
          <div>
            {/* KPI Metrics Summary */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>TOTAL INQUIRIES</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-brand-deep)', marginTop: '4px' }}>
                  {leads.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#10B981', marginTop: '4px' }}>
                  Captured across all website funnels
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>NEW / UNTOUCHED LEADS</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
                  {leads.filter(l => l.status === 'new').length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                  Requires immediate WhatsApp / call follow up
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>TOP SOURCE PAGES</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-brand-deep)', marginTop: '6px' }}>
                  {leads[0]?.source_page || '/projects'}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', marginTop: '4px' }}>
                  Highest converting entry point
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>TOP FORM SUBMISSION</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-brand-deep)', marginTop: '6px' }}>
                  {leads[0]?.form_type || 'Advisory Desk'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#3B82F6', marginTop: '4px' }}>
                  Primary engagement mechanism
                </div>
              </div>
            </div>

            {/* Filter & Action Toolbar */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', flex: 1 }}>
                {/* Search Bar */}
                <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--color-ink-muted)' }} />
                  <input 
                    type="text"
                    placeholder="Search by name, phone, URL, notes..."
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    style={{ width: '100%', height: '42px', paddingLeft: '38px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>

                {/* Form Filter */}
                <select 
                  value={leadFilterForm} 
                  onChange={(e) => setLeadFilterForm(e.target.value)}
                  style={{ height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                >
                  <option value="all">All Forms ({leads.length})</option>
                  {uniqueFormTypes.map((ft, idx) => (
                    <option key={idx} value={ft}>{ft}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select 
                  value={leadFilterStatus} 
                  onChange={(e) => setLeadFilterStatus(e.target.value)}
                  style={{ height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed / Won</option>
                </select>

                <button 
                  onClick={fetchLeadsData}
                  className="btn btn-outline"
                  title="Refresh Leads"
                  style={{ height: '42px', padding: '0 14px' }}
                >
                  <RefreshCw size={16} className={isLoadingLeads ? 'spin' : ''} />
                </button>
              </div>

              {/* Export to CSV */}
              <button 
                onClick={handleExportCSV}
                className="btn btn-outline"
                style={{ height: '42px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Leads List */}
            {isLoadingLeads ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-ink-muted)' }}>
                Loading inquiries from Hostinger MySQL...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '60px 20px',
                textAlign: 'center'
              }}>
                <Inbox size={48} style={{ color: 'var(--color-ink-muted)', opacity: 0.5, margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-brand-deep)', marginBottom: '8px' }}>
                  No Inquiries Match Filter
                </h3>
                <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.88rem' }}>
                  Try resetting the search filters or submit a test enquiry from the website.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {filteredLeads.map((lead) => {
                  const isNew = lead.status === 'new';
                  const dateText = lead.created_at || lead.timestamp 
                    ? new Date(lead.created_at || lead.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                    : 'Just now';

                  return (
                    <div key={lead.id} style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-lg)',
                      border: isNew ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      padding: '20px 24px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      position: 'relative'
                    }}>
                      {/* Top Header Line */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          {/* Form Type Badge */}
                          <span style={{
                            backgroundColor: 'var(--color-brand-deep)',
                            color: '#FFFFFF',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <Layers size={12} />
                            {lead.form_type || 'Website Enquiry'}
                          </span>

                          {/* Source Page URL Badge */}
                          <span style={{
                            backgroundColor: '#F1F5F9',
                            color: 'var(--color-brand-deep)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <Globe size={12} />
                            Origin URL: {lead.source_page || '/'}
                          </span>

                          {/* Intent / Purpose */}
                          {(lead.intent_purpose || lead.intent) && (
                            <span style={{
                              backgroundColor: 'var(--color-gold-soft)',
                              color: 'var(--color-gold-dark)',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}>
                              Purpose: {lead.intent_purpose || lead.intent}
                            </span>
                          )}

                          {isNew && (
                            <span style={{
                              backgroundColor: '#FEE2E2',
                              color: '#DC2626',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 800
                            }}>
                              NEW LEAD
                            </span>
                          )}
                        </div>

                        {/* Timestamp */}
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={13} />
                          <span>{dateText}</span>
                        </div>
                      </div>

                      {/* Main Contact & Message Body */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '16px',
                        padding: '14px 16px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: 'var(--radius-md)'
                      }}>
                        {/* Customer Contact Details */}
                        <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-brand-deep)' }}>
                            {lead.name}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '0.9rem', color: 'var(--color-ink)' }}>
                            <Phone size={14} style={{ color: '#10B981' }} />
                            <a href={`tel:${lead.phone}`} style={{ fontWeight: 700, color: 'var(--color-brand-deep)' }}>
                              {lead.phone}
                            </a>
                            {lead.location && <span style={{ color: 'var(--color-ink-muted)' }}>• {lead.location}</span>}
                          </div>
                          {lead.email && lead.email !== 'Not provided' && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                              Email: {lead.email}
                            </div>
                          )}
                        </div>

                        {/* Customer Request / Requirements */}
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ink-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Customer Request & Notes
                          </div>
                          <div style={{ fontSize: '0.88rem', color: 'var(--color-ink)', lineHeight: 1.5 }}>
                            {lead.message || lead.notes || 'No custom message specified. Requested direct advisory consultation.'}
                          </div>
                        </div>
                      </div>

                      {/* Action Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '6px' }}>
                        {/* Status Updater */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>
                            Status:
                          </span>
                          <select 
                            value={lead.status || 'new'}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            style={{
                              height: '34px',
                              padding: '0 10px',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              borderColor: lead.status === 'new' ? '#EF4444' : lead.status === 'contacted' ? '#3B82F6' : '#10B981'
                            }}
                          >
                            <option value="new">New (Needs Action)</option>
                            <option value="contacted">Contacted / Call Done</option>
                            <option value="in_progress">In Discussion</option>
                            <option value="closed">Closed / Converted</option>
                          </select>
                        </div>

                        {/* Quick Contact & Delete Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {/* WhatsApp Direct */}
                          <a 
                            href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for reaching out to Nam Nilam regarding ${lead.intent_purpose || 'property advisory'}. How can we assist you today?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp"
                            style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <MessageSquare size={14} />
                            <span>WhatsApp Customer</span>
                          </a>

                          {/* Direct Call */}
                          <a 
                            href={`tel:${lead.phone}`}
                            className="btn btn-outline"
                            style={{ padding: '6px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Phone size={14} />
                            <span>Call</span>
                          </a>

                          {/* Delete Lead */}
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="btn btn-outline"
                            title="Delete inquiry"
                            style={{ padding: '6px 10px', color: '#EF4444' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PROJECTS MANAGEMENT (CRUD) */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div>
            {/* Top Toolbar */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '20px 24px',
              marginBottom: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-brand-deep)', margin: 0 }}>
                  Real Estate Projects Inventory
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)', margin: '4px 0 0 0' }}>
                  Manage verified layout plots, pricing per sq.ft, approvals, and plot availability.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={fetchProjectsData}
                  className="btn btn-outline"
                  title="Reload Projects"
                  style={{ padding: '8px 12px' }}
                >
                  <RefreshCw size={16} className={isLoadingProjects ? 'spin' : ''} />
                </button>

                <button 
                  onClick={openAddProjectModal}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                >
                  <Plus size={16} />
                  <span>Add New Project</span>
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '20px'
            }}>
              {projects.map((proj) => {
                const title = proj.title || proj.name;
                const priceSqft = proj.price_per_sqft || proj.rateSqft || 1500;
                const startingPrice = proj.starting_price || proj.priceLabel || '₹18 Lakhs';
                const image = proj.image_url || proj.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';
                const totalUnits = proj.total_units || proj.totalPlots || 50;
                const availableUnits = proj.available_units || proj.availablePlots || 15;

                return (
                  <div key={proj.id} style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Image Header */}
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img 
                        src={image} 
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {proj.status || 'Ready to Register'}
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'var(--color-gold)',
                        color: 'var(--color-brand-deep)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}>
                        ₹{priceSqft} / sq.ft
                      </div>
                    </div>

                    {/* Content Body */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '6px' }}>
                        <ShieldCheck size={14} />
                        <span>{proj.approval || 'DTCP Approved'}</span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', color: 'var(--color-brand-deep)', marginBottom: '6px', fontWeight: 800 }}>
                        {title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginBottom: '14px' }}>
                        <MapPin size={14} />
                        <span>{proj.location}</span>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        padding: '10px 14px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.82rem',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <span style={{ color: 'var(--color-ink-muted)' }}>Plots Left: </span>
                          <strong style={{ color: '#10B981' }}>{availableUnits} / {totalUnits}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--color-ink-muted)' }}>From: </span>
                          <strong style={{ color: 'var(--color-brand-deep)' }}>{startingPrice}</strong>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button 
                            onClick={() => openEditProjectModal(proj)}
                            className="btn btn-outline"
                            style={{ padding: '6px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>

                          <a 
                            href={`/projects`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                            title="View on public site"
                          >
                            <Eye size={14} />
                          </a>
                        </div>

                        <button 
                          onClick={() => handleDeleteProject(proj.id, title)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', color: '#EF4444' }}
                          title="Delete project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ========================================================= */}
      {isProjectModalOpen && (
        <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <button className="modal-close-btn" onClick={() => setIsProjectModalOpen(false)} aria-label="Close">
              <X size={20} />
            </button>

            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-brand-deep)' }}>
                {editingProject ? 'Edit Real Estate Project' : 'Add New Real Estate Project'}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                All fields save dynamically into the Hostinger MySQL database.
              </p>
            </div>

            <form onSubmit={handleSaveProject} style={{ padding: '24px 28px' }}>
              <div className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Project Title *
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Navarathna Garden"
                    value={projectFormData.title}
                    onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    URL Slug
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. navarathna-garden"
                    value={projectFormData.slug}
                    onChange={(e) => setProjectFormData({ ...projectFormData, slug: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Location / Area *
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Airport Road, Trichy"
                    value={projectFormData.location}
                    onChange={(e) => setProjectFormData({ ...projectFormData, location: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Property Type
                  </label>
                  <select 
                    value={projectFormData.type}
                    onChange={(e) => setProjectFormData({ ...projectFormData, type: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  >
                    <option value="Residential Plots">Residential Plots</option>
                    <option value="Premium Villa Plots">Premium Villa Plots</option>
                    <option value="Gated Community Plots">Gated Community Plots</option>
                    <option value="Commercial Plots">Commercial Plots</option>
                    <option value="Farmland & Agro Plots">Farmland & Agro Plots</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Rate per Sq.Ft (₹) *
                  </label>
                  <input 
                    type="number" 
                    required 
                    placeholder="1850"
                    value={projectFormData.price_per_sqft}
                    onChange={(e) => setProjectFormData({ ...projectFormData, price_per_sqft: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Starting Price Label
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹22.2 Lakhs"
                    value={projectFormData.starting_price}
                    onChange={(e) => setProjectFormData({ ...projectFormData, starting_price: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Legal Approval Status
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. DTCP & RERA Approved"
                    value={projectFormData.approval}
                    onChange={(e) => setProjectFormData({ ...projectFormData, approval: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Inventory Status
                  </label>
                  <select 
                    value={projectFormData.status}
                    onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  >
                    <option value="Ready to Register">Ready to Register</option>
                    <option value="Under Development">Under Development</option>
                    <option value="Fast Selling">Fast Selling</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Total Plots
                  </label>
                  <input 
                    type="number" 
                    value={projectFormData.total_units}
                    onChange={(e) => setProjectFormData({ ...projectFormData, total_units: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                    Available Plots
                  </label>
                  <input 
                    type="number" 
                    value={projectFormData.available_units}
                    onChange={(e) => setProjectFormData({ ...projectFormData, available_units: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  Photo / Image URL
                </label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..."
                  value={projectFormData.image_url}
                  onChange={(e) => setProjectFormData({ ...projectFormData, image_url: e.target.value })}
                  style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  Amenities (comma-separated)
                </label>
                <input 
                  type="text" 
                  placeholder="Blacktop Roads, Street Lights, 24/7 Security, 3-Phase EB"
                  value={projectFormData.amenities}
                  onChange={(e) => setProjectFormData({ ...projectFormData, amenities: e.target.value })}
                  style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-muted)', display: 'block', marginBottom: '6px' }}>
                  Project Description / Highlights
                </label>
                <textarea 
                  rows="3"
                  placeholder="Location intelligence and capital appreciation reasons..."
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsProjectModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Save size={16} />
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
