/**
 * Nam Nilam Unified API Client Service
 * Connects frontend forms and Admin dashboard to Hostinger PHP backend
 * with server-side authentication, rate limiting, and secure authorization headers.
 */

import { TRICHY_PROJECTS } from '../data/ecosystemData';
import { VERIFIED_PROPERTIES } from '../data/propertiesData';

const API_BASE = '/api';

/**
 * Administrative Token Helpers (sessionStorage only)
 */
export const getAdminToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem('nam_nilam_admin_token') || null;
  } catch {
    return null;
  }
};

export const setAdminToken = (token) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('nam_nilam_admin_token', token);
  } catch {
    //
  }
};

export const clearAdminToken = () => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem('nam_nilam_admin_token');
  } catch {
    //
  }
};

const getAuthHeaders = () => {
  const token = getAdminToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Safe JSON fetch helper
 * Handles environments where backend is unreachable, unauthorized, or local dev servers serve raw PHP files
 */
const safeJsonFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    const trimmed = text.trim();

    // If response is raw PHP code or HTML (e.g. Vite dev server serving raw files or HTML error)
    if (trimmed.startsWith('<?php') || trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html') || trimmed.startsWith('<')) {
      return null;
    }

    let parsed = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      return null;
    }

    if (res.status === 401 || res.status === 403) {
      return { ...parsed, unauthorized: true, status: res.status };
    }

    return parsed;
  } catch {
    return null;
  }
};

/**
 * Capture public customer enquiry lead
 * Preserves public submissions without requiring authentication
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
    if (result && result.error) {
      return result;
    }
  } catch {
    // Proceed to graceful response
  }

  // Graceful response if backend is offline/unreachable
  return { success: true, localOnly: true, data: payload };
};

/**
 * Fetch all leads for Admin Dashboard with optional filters
 * Strictly requires server authorization; unauthenticated callers are rejected
 */
export const getLeads = async (filters = {}) => {
  const token = getAdminToken();
  if (!token) {
    return {
      success: false,
      unauthorized: true,
      error: 'Authentication required. Please sign in to the Admin Dashboard.'
    };
  }

  try {
    const params = new URLSearchParams();
    if (filters.form_type && filters.form_type !== 'all') params.append('form_type', filters.form_type);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const data = await safeJsonFetch(`${API_BASE}/leads.php?${params.toString()}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (data && data.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired. Please log in again.' };
    }

    if (data && data.success && data.leads) {
      return data;
    }
  } catch {
    //
  }

  return {
    success: false,
    error: 'Failed to retrieve leads from server.'
  };
};

/**
 * Update lead status in backend
 * Requires admin authorization
 */
export const updateLeadStatus = async (id, status, admin_notes = '') => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, unauthorized: true, error: 'Authentication required.' };
  }

  try {
    const resData = await safeJsonFetch(`${API_BASE}/leads.php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'update_status', id, status, admin_notes })
    });
    if (resData && resData.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired.' };
    }
    if (resData && resData.success) return resData;
    if (resData && resData.error) return resData;
  } catch {
    //
  }

  return { success: false, error: 'Failed to update lead status.' };
};

/**
 * Delete a lead
 * Requires admin authorization
 */
export const deleteLead = async (id) => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, unauthorized: true, error: 'Authentication required.' };
  }

  try {
    const resData = await safeJsonFetch(`${API_BASE}/leads.php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'delete', id })
    });
    if (resData && resData.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired.' };
    }
    if (resData && resData.success) return resData;
    if (resData && resData.error) return resData;
  } catch {
    //
  }

  return { success: false, error: 'Failed to delete lead.' };
};

/**
 * Fetch projects from backend (Public endpoint)
 */
export const getProjects = async (slug = '') => {
  try {
    const url = slug ? `${API_BASE}/projects.php?slug=${encodeURIComponent(slug)}` : `${API_BASE}/projects.php`;
    const data = await safeJsonFetch(url);
    if (data) {
      if (slug && data.project) return data.project;
      if (data.projects && data.projects.length > 0) return data.projects;
    }
  } catch {
    // Fallback to static seed data
  }

  if (slug) return TRICHY_PROJECTS.find(p => p.slug === slug) || null;
  return TRICHY_PROJECTS;
};

/**
 * Create a new project
 * Requires admin authorization
 */
export const createProject = async (projectData) => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, unauthorized: true, error: 'Authentication required.' };
  }

  try {
    const resData = await safeJsonFetch(`${API_BASE}/projects.php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    if (resData && resData.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired.' };
    }
    if (resData && resData.success) return resData;
    if (resData && resData.error) return resData;
  } catch {
    //
  }

  return { success: false, error: 'Failed to create project.' };
};

/**
 * Update an existing project
 * Requires admin authorization
 */
export const updateProject = async (idOrData, projectData = {}) => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, unauthorized: true, error: 'Authentication required.' };
  }

  const payload = typeof idOrData === 'object' ? { ...idOrData, ...projectData } : { id: idOrData, ...projectData };

  try {
    const resData = await safeJsonFetch(`${API_BASE}/projects.php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'update', ...payload })
    });
    if (resData && resData.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired.' };
    }
    if (resData && resData.success) return resData;
    if (resData && resData.error) return resData;
  } catch {
    //
  }

  return { success: false, error: 'Failed to update project.' };
};

/**
 * Delete a project
 * Requires admin authorization
 */
export const deleteProject = async (id) => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, unauthorized: true, error: 'Authentication required.' };
  }

  try {
    const resData = await safeJsonFetch(`${API_BASE}/projects.php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'delete', id })
    });
    if (resData && resData.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired.' };
    }
    if (resData && resData.success) return resData;
    if (resData && resData.error) return resData;
  } catch {
    //
  }

  return { success: false, error: 'Failed to delete project.' };
};

/**
 * Fetch verified properties from backend (Public endpoint)
 * Gracefully falls back to VERIFIED_PROPERTIES on static/offline/dev
 */
export const getProperties = async (slug = '', filters = {}) => {
  try {
    let url = `${API_BASE}/properties.php`;
    const params = new URLSearchParams();
    if (slug) params.append('slug', slug);
    if (filters.locality) params.append('locality', filters.locality);
    if (filters.property_type) params.append('property_type', filters.property_type);
    if (filters.project_id) params.append('project_id', filters.project_id);

    const qs = params.toString();
    if (qs) url += `?${qs}`;

    const data = await safeJsonFetch(url);
    if (data) {
      if (slug && data.property) return data.property;
      if (data.properties && Array.isArray(data.properties) && data.properties.length > 0) {
        return data.properties;
      }
    }
  } catch {
    // Fallback to static verified inventory
  }

  if (slug) {
    return VERIFIED_PROPERTIES.find(p => p.slug === slug) || null;
  }

  let list = [...VERIFIED_PROPERTIES];
  if (filters.locality) {
    list = list.filter(p => p.locality.toLowerCase().includes(filters.locality.toLowerCase()));
  }
  if (filters.property_type) {
    list = list.filter(p => p.property_type.toLowerCase() === filters.property_type.toLowerCase());
  }
  if (filters.project_id) {
    list = list.filter(p => p.project_id === filters.project_id || p.project_slug === filters.project_id);
  }
  return list;
};

/**
 * Save / Create / Update property listing
 * Requires admin authorization
 */
export const saveProperty = async (propertyData) => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, unauthorized: true, error: 'Authentication required.' };
  }

  try {
    const resData = await safeJsonFetch(`${API_BASE}/properties.php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(propertyData)
    });
    if (resData && resData.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired.' };
    }
    if (resData && resData.success) return resData;
    if (resData && resData.error) return resData;
  } catch {
    //
  }

  return { success: false, error: 'Failed to save property listing.' };
};

/**
 * Delete a property listing
 * Requires admin authorization
 */
export const deleteProperty = async (id) => {
  const token = getAdminToken();
  if (!token) {
    return { success: false, unauthorized: true, error: 'Authentication required.' };
  }

  try {
    const resData = await safeJsonFetch(`${API_BASE}/properties.php`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'delete', id })
    });
    if (resData && resData.unauthorized) {
      clearAdminToken();
      return { success: false, unauthorized: true, error: 'Session expired.' };
    }
    if (resData && resData.success) return resData;
    if (resData && resData.error) return resData;
  } catch {
    //
  }

  return { success: false, error: 'Failed to delete property listing.' };
};

/**
 * Authenticate Admin with Server
 * Authorization decisions are exclusively made by server-side /api/auth.php
 * No client-side PIN hardcoding or bypass fallback
 */
export const loginAdmin = async (passcode) => {
  if (!passcode || !passcode.trim()) {
    return { success: false, error: 'Passcode is required.' };
  }

  try {
    const data = await safeJsonFetch(`${API_BASE}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: passcode.trim() })
    });

    if (data && data.success && data.token) {
      setAdminToken(data.token);
      return data;
    }

    if (data && data.error) {
      return { success: false, error: data.error };
    }
  } catch {
    //
  }

  return {
    success: false,
    error: 'Authentication failed. Please verify network connectivity and administrative credentials.'
  };
};
