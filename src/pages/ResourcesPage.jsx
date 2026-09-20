import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileCheck2, 
  Download, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { INTELLIGENCE_ARTICLES, BRAND_INFO } from '../data/ecosystemData';

export const ResourcesPage = ({ onOpenEnquiry }) => {
  const { slug } = useParams();

  const resources = [
    {
      slug: "tamil-nadu-land-buying-checklist",
      title: "The Comprehensive 45-Point Land Buying Due Diligence Checklist",
      type: "Checklist",
      desc: "A printable 45-point checklist covering Parent Deed tracing (30 years), Encumbrance Certificate scrutiny, Revenue Patta validity, and DTCP approval inspection.",
      format: "Downloadable PDF / Guide",
      downloads: "1,420+ Downloads"
    },
    {
      slug: "how-to-verify-patta-chitta-online",
      title: "How to Verify Patta, Chitta & FMB on Tamil Nadu Revenue Portal",
      type: "Educational Guide",
      desc: "Detailed visual instructions on using eservices.tn.gov.in to verify sub-division patta and cross-reference survey boundary measurements.",
      format: "Web Article + Screenshot Guide",
      downloads: "Read in 8 Mins"
    },
    {
      slug: "guideline-value-vs-market-price",
      title: "Guideline Value vs Market Value: 2024-2026 Land Cost Guide",
      type: "Financial Model",
      desc: "Understand how the 9% stamp duty and registration charges are computed, and how guideline value revisions affect your total on-road land cost.",
      format: "Guide + Calculator",
      downloads: "Read in 6 Mins"
    },
    {
      slug: "dtcp-vs-panchayat-approval-risks",
      title: "Why Unapproved Panchayat Plots Are Legally Invalid in Tamil Nadu",
      type: "Legal Whitepaper",
      desc: "Analysis of the Section 47A provisions and Madras High Court rulings prohibiting building approval and bank loans on unapproved panchayat plots.",
      format: "Legal Dossier",
      downloads: "Read in 7 Mins"
    }
  ];

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Resources', path: '/resources' },
        ...(slug ? [{ label: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }] : [])
      ]} />

      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow">
            <BookOpen size={14} />
            <span>Knowledge Hub & Tools</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-brand-deep)', marginBottom: '14px' }}>
            Real Estate Resources & Checklists
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-ink-muted)', maxWidth: '780px' }}>
            Actionable buyer checklists, document verification tutorials, and downloadable legal whitepapers to protect your hard-earned capital.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid-2">
            {resources.map((res) => (
              <div key={res.slug} style={{
                padding: '32px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-gold">{res.type}</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{res.downloads}</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--color-brand-deep)' }}>
                  {res.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                  {res.desc}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => onOpenEnquiry(`Download Resource: ${res.title}`)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Download size={14} />
                    <span>Download Free PDF</span>
                  </button>
                  <a 
                    href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Nam Nilam, please share the resource: ${res.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Due Diligence Checklist Snippet */}
          <div style={{
            marginTop: '56px',
            padding: '36px',
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-deep)', marginBottom: '16px' }}>
              Essential 5-Point Quick Check Before Paying Any Advance Token:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong>1. 30-Year EC</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                  Ensure Nil encumbrance spanning at least 30 full years.
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong>2. Sub-division Patta</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                  Verify owner name in online 'A' Register on e-services.
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong>3. DTCP / CMDA Order</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                  Check sanctioned layout drawing with public order number.
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong>4. FMB Sketch</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                  Match physical survey boundary stones on ground.
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong>5. OSR Handover</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                  Confirm park/road gift deed was executed to local body.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
