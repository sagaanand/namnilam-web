/**
 * Nam Nilam Unified API Client Service
 * Connects frontend forms and Admin dashboard to Hostinger PHP backend
 * with automatic attribution capture, resilience for local dev, and local fallback cache.
 */

import { TRICHY_PROJECTS } from '../data/ecosystemData';

const API_BASE = '/api';

/**
 * Safe JSON fetch helper
 * Handles environments where backend is unreachable or local dev servers serve raw PHP files
 */
const safeJsonFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    const text = await res.text();
    const trimmed = text.trim();
    // If response is raw PHP code or HTML, it is not a running JSON backend API (e.g. Vite dev server serving raw files)
    if (trimmed.startsWith('<?php') || trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html') || trimmed.startsWith('<')) {
      return null;
    }
    return JSON.parse(text);
  } catch {
    return null;
  }
};

/**
 * Capture full attribution metadata for any lead
 */
export const submitLead = async (leadData) => {
  const payload = {
    name: leadData.name || 'Prospective Client',
    phone: leadData.phone || '',
    email: leadData.email || '',
    form_type: leadData.form_type || 'Website Enquiry',
    source_page: leadData.source_page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
    referrer_url: leadData.referrer_url || (typeof window !== 'undefined' ? window.location.href : ''),
    intent_purpose: leadData.intent_purpose || leadData.intent || 'General Advisory',
    category: leadData.category || 'Real Estate Advisory',
    location: leadData.location || 'Trichy',
    message: leadData.message || leadData.notes || '',
    timestamp: new Date().toISOString()
  };

  // Always save a local copy in browser cache for offline reliability
  try {
    const existing = JSON.parse(localStorage.getItem('nam_nilam_leads') || '[]');
    const localLead = {
      id: 'lead_' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'new',
      ...payload
    };
    localStorage.setItem('nam_nilam_leads', JSON.stringify([localLead, ...existing]));
  } catch (e) {
    console.warn('Local lead cache error', e);
  }

  // Submit to Hostinger backend
  try {
    const result = await safeJsonFetch(`${API_BASE}/leads.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (result && result.success) {
      return result;
    }
  } catch (err) {
    // Silently proceed with local cache
  }

  return { success: true, localOnly: true, data: payload };
};

/**
 * Fetch all leads for Admin Dashboard with optional filters
 */
export const getLeads = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.form_type && filters.form_type !== 'all') params.append('form_type', filters.form_type);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const data = await safeJsonFetch(`${API_BASE}/leads.php?${params.toString()}`);
    if (data && data.success && data.leads) {
      return data;
    }
  } catch (err) {
    // Proceed to fallback
  }

  // Fallback to local storage
  const localLeads = JSON.parse(localStorage.getItem('nam_nilam_leads') || '[]');
  return {
    success: true,
    localOnly: true,
    metrics: {
      total_leads: localLeads.length,
      new_leads: localLeads.filter(l => l.status === 'new').length,
      by_form: {},
      by_source_page: {}
    },
    leads: localLeads
  };
};

/**
 * Update lead status in backend and local cache
 */
export const updateLeadStatus = async (id, status, admin_notes = '') => {
  try {
    const resData = await safeJsonFetch(`${API_BASE}/leads.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_status', id, status, admin_notes })
    });
    if (resData && resData.success) return resData;
  } catch (err) {
    // Proceed to fallback
  }

  // Fallback update local storage
  try {
    const existing = JSON.parse(localStorage.getItem('nam_nilam_leads') || '[]');
    const updated = existing.map(l => l.id === id ? { ...l, status, admin_notes } : l);
    localStorage.setItem('nam_nilam_leads', JSON.stringify(updated));
  } catch (e) {
    console.warn(e);
  }

  return { success: true };
};

/**
 * Delete a lead
 */
export const deleteLead = async (id) => {
  try {
    const resData = await safeJsonFetch(`${API_BASE}/leads.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
    if (resData && resData.success) return resData;
  } catch (err) {
    // Proceed to fallback
  }

  try {
    const existing = JSON.parse(localStorage.getItem('nam_nilam_leads') || '[]');
    const filtered = existing.filter(l => l.id !== id);
    localStorage.setItem('nam_nilam_leads', JSON.stringify(filtered));
  } catch (e) {
    console.warn(e);
  }

  return { success: true };
};

/**
 * Fetch projects from backend (with default static fallback)
 */
export const getProjects = async (slug = '') => {
  try {
    const url = slug ? `${API_BASE}/projects.php?slug=${encodeURIComponent(slug)}` : `${API_BASE}/projects.php`;
    const data = await safeJsonFetch(url);
    if (data) {
      if (slug && data.project) return data.project;
      if (data.projects && data.projects.length > 0) return data.projects;
    }
  } catch (err) {
    // Fallback to cache
  }

  // Fallback to local storage or ecosystem seed data
  const localProjects = JSON.parse(localStorage.getItem('nam_nilam_custom_projects') || 'null');
  if (localProjects && localProjects.length > 0) {
    if (slug) return localProjects.find(p => p.slug === slug) || null;
    return localProjects;
  }

  if (slug) return TRICHY_PROJECTS.find(p => p.slug === slug) || null;
  return TRICHY_PROJECTS;
};

/**
 * Create a new project
 */
export const createProject = async (projectData) => {
  try {
    const resData = await safeJsonFetch(`${API_BASE}/projects.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    if (resData && resData.success) return resData;
  } catch (err) {
    // Fallback to local storage
  }

  // Save to local storage
  const existing = JSON.parse(localStorage.getItem('nam_nilam_custom_projects') || '[]');
  const newProject = {
    id: 'proj_' + Date.now(),
    ...projectData,
    slug: projectData.slug || projectData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  };
  localStorage.setItem('nam_nilam_custom_projects', JSON.stringify([newProject, ...existing]));
  return { success: true, localOnly: true, project: newProject };
};

/**
 * Update an existing project
 */
export const updateProject = async (id, projectData) => {
  try {
    const resData = await safeJsonFetch(`${API_BASE}/projects.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', id, ...projectData })
    });
    if (resData && resData.success) return resData;
  } catch (err) {
    // Fallback to local storage
  }

  const existing = JSON.parse(localStorage.getItem('nam_nilam_custom_projects') || '[]');
  const updated = existing.map(p => p.id === id ? { ...p, ...projectData } : p);
  localStorage.setItem('nam_nilam_custom_projects', JSON.stringify(updated));
  return { success: true, localOnly: true };
};

/**
 * Delete a project
 */
export const deleteProject = async (id) => {
  try {
    const resData = await safeJsonFetch(`${API_BASE}/projects.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
    if (resData && resData.success) return resData;
  } catch (err) {
    // Fallback to local storage
  }

  const existing = JSON.parse(localStorage.getItem('nam_nilam_custom_projects') || '[]');
  const filtered = existing.filter(p => p.id !== id);
  localStorage.setItem('nam_nilam_custom_projects', JSON.stringify(filtered));
  return { success: true, localOnly: true };
};

/**
 * Verify Admin Passcode
 */
export const loginAdmin = async (passcode) => {
  try {
    const data = await safeJsonFetch(`${API_BASE}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode })
    });
    if (data && data.success && data.token) {
      sessionStorage.setItem('nam_nilam_admin_token', data.token);
      return data;
    }
  } catch (err) {
    // Fallback to local pin check
  }

  // Local PIN check fallback: '97876' or 'namnilam@2026' or 'admin123'
  if (passcode === '97876' || passcode === 'namnilam@2026' || passcode === 'admin123') {
    const token = 'nn_adm_local_' + Date.now();
    sessionStorage.setItem('nam_nilam_admin_token', token);
    return {
      success: true,
      token,
      user: { username: 'admin', role: 'Super Administrator' }
    };
  }

  return { success: false, error: 'Invalid passcode' };
};
