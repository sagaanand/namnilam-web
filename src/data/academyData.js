export const ACADEMY_SUBPAGES = [
  { id: 'all', slug: '', label: 'All Academy' },
  { id: 'certified-courses', slug: 'certified-courses', label: 'Certified 2-Month Course' },
  { id: 'practical-courses', slug: 'practical-courses', label: 'Practical Short-Term Courses' },
  { id: 'courses', slug: 'courses', label: 'Master Courses' },
  { id: 'workshops', slug: 'workshops', label: 'Live Workshops' },
  { id: 'real-estate-basics', slug: 'real-estate-basics', label: 'Real Estate Basics' },
  { id: 'property-buying', slug: 'property-buying', label: 'Property Buying' },
  { id: 'real-estate-investment', slug: 'real-estate-investment', label: 'Real Estate Investment' },
  { id: 'real-estate-business', slug: 'real-estate-business', label: 'Real Estate Business' }
];

export const ACADEMY_FLAGSHIP_OFFERINGS = {
  certifiedCourse: {
    slug: 'certified-real-estate-mastery-course',
    title: 'Certified Real Estate Practitioner & Advisory Program',
    badge: 'Flagship Certified Course',
    positioning: 'Learn Real Estate. Learn by Doing.',
    duration: '2 Months (8 Weeks Comprehensive)',
    pricing: {
      offline: { price: '₹9,999', mode: 'Offline (Trichy Classroom & On-Field)' },
      online: { price: '₹6,999', mode: 'Online (Interactive Live + Video Archive)' }
    },
    whoItsFor: [
      'Aspiring real estate consultants, advisors, and property brokers',
      'Individual plot & home buyers wanting professional-level verification skills',
      'Civil engineers, architects, and law graduates entering real estate',
      'Layout promoters and marketing professionals seeking institutional standards'
    ],
    whatYoullLearn: [
      '30-Year Parent Deed Forensics & Encumbrance Certificate (EC) Deep Dive',
      'Tamil Nadu Revenue Records: Patta, Chitta, Adangal & FMB Sketch Alignment',
      'DTCP, CMDA, RERA and Panchayat Layout Sanction Verification Rules',
      'Micro-Market Land Valuation, Sub-Registrar Comms & Stamp Duty Calculations',
      'Physical On-Ground Boundary Surveying, Marker Stones & Road Width Audits',
      'Client Negotiation, Clear Agreement Drafting & Registry Day Protocol'
    ],
    practicalComponents: [
      'Live field inspection of DTCP gated layouts in Tiruchirappalli',
      'Direct hands-on session checking TN e-Services revenue records in real time',
      'Sub-Registrar office procedural walkthrough and document docket staging',
      'Capstone real estate due-diligence report submission with faculty grading'
    ],
    certification: 'Official Nam Nilam Academy Certified Real Estate Practitioner Certificate upon capstone evaluation.',
    enrolCta: 'Enrol in 2-Month Certified Course'
  },
  shortTermCourses: [
    {
      slug: 'tn-land-records-patta-chitta-forensics',
      title: 'Practical Land Records & e-Services Verification',
      badge: 'Short-Term Course',
      duration: '4 Hours Intensive (Weekend)',
      pricing: {
        online: { price: '₹399', mode: 'Online Video + e-Services Screen Recording' },
        offline: { price: '₹999', mode: 'Offline Hands-on Workshop (Trichy)' }
      },
      whoItsFor: 'Anyone purchasing agricultural land, plots, or verifying ancestral revenue records in Tamil Nadu.',
      whatYoullLearn: [
        'How to search and verify Patta/Chitta on eservices.tn.gov.in',
        'Detecting Joint Patta (Kootu Patta) risks and individual sub-division orders',
        'Interpreting Field Measurement Book (FMB) sketches and scale dimensions',
        'Section 47A stamp duty undervaluation notices and revenue red flags'
      ],
      practicalComponents: 'Live verification of 5 real-world property survey numbers and instant dispute detection.',
      certification: 'Certificate of Practical Verification Completion',
      enrolCta: 'Enrol for ₹399 Online / ₹999 Offline'
    },
    {
      slug: 'dtcp-rera-layout-approval-masterclass',
      title: 'DTCP & RERA Layout Approvals vs Panchayat Reality',
      badge: 'Short-Term Course',
      duration: 'Half-Day Practical Workshop',
      pricing: {
        online: { price: '₹399', mode: 'Online Live Masterclass' },
        offline: { price: '₹999', mode: 'Offline Masterclass & Case Study Review' }
      },
      whoItsFor: 'Plot buyers, layout sales executives, and developers verifying plotting sanctions.',
      whatYoullLearn: [
        'Why Panchayat approvals are legally void under Madras High Court rulings',
        'Verifying DTCP layout sanction numbers on official government portals',
        'OSR (Open Space Reservation) park handover gift deed verification',
        'Checking TN-RERA registration validity and promoter compliance records'
      ],
      practicalComponents: 'Analyzing 4 real layout sanction orders to identify counterfeit or invalid approvals.',
      certification: 'Certificate of Layout Approval Compliance',
      enrolCta: 'Enrol for ₹399 Online / ₹999 Offline'
    }
  ]
};

export const ACADEMY_PROGRAMS = [
  {
    slug: 'certified-2-month-course',
    image: '/academy-education.jpg',
    category: 'certified-courses',
    subpage: 'courses',
    type: 'Flagship Certified Program',
    level: 'Beginners, Investors & Industry Professionals',
    title: 'Certified Real Estate 2-Month Mastery Course',
    priceTag: 'Offline ₹9,999 | Online ₹6,999',
    priceOffline: '₹9,999',
    priceOnline: '₹6,999',
    duration: '2 Months (8 Weeks)',
    tagline: 'Learn Real Estate. Learn by Doing.',
    desc: 'Comprehensive certified training covering document forensics, legal vetting, on-ground surveying, micro-market pricing, and field visits.',
    syllabus: [
      'Module 1: Revenue Records Hierarchy (Patta, Chitta, Adangal, FMB Sketch)',
      'Module 2: 30-Year Encumbrance Certificate (EC) Forensics & Lien Checks',
      'Module 3: DTCP vs Panchayat Approvals & OSR Park Handover Compliance',
      'Module 4: On-Ground Surveying, Marker Stones & Road Width Verification',
      'Module 5: Micro-Market Valuation, Guideline Values & Stamp Duty Protocol',
      'Module 6: Field Visits to Live Layouts & Sub-Registrar Office Walkthrough'
    ],
    deliverables: 'Official Nam Nilam Academy Certificate, 45-point field verification template, and lifetime alumni network access.'
  },
  {
    slug: 'practical-land-records-short-course',
    image: '/legal-documents.jpg',
    category: 'practical-courses',
    subpage: 'workshops',
    type: 'Practical Short-Term Course',
    level: 'All Property Buyers & Investors',
    title: 'Practical Land Records & e-Services Verification',
    priceTag: 'Online ₹399 | Offline ₹999',
    priceOnline: '₹399',
    priceOffline: '₹999',
    duration: '4 Hours (Practical Focus)',
    tagline: 'Master Patta, Chitta & FMB on Tamil Nadu e-Services in 4 hours.',
    desc: 'Learn how to inspect Revenue Patta, Chitta, A-Register, and FMB sketches directly on government portals with zero legal ambiguity.',
    syllabus: [
      'Session 1: Navigating eservices.tn.gov.in step-by-step',
      'Session 2: Individual Patta vs Kootu Patta (Joint Ownership) verification',
      'Session 3: Reading FMB sketches against ground survey marker stones',
      'Session 4: Identifying unregularized subdivisions and 47A stamp duty notices'
    ],
    deliverables: 'Step-by-step PDF portal guidebook, verification cheat sheet, and Certificate of Completion.'
  },
  {
    slug: 'dtcp-rera-verification-short-course',
    image: '/svc-due-diligence.jpg',
    category: 'practical-courses',
    subpage: 'workshops',
    type: 'Practical Short-Term Course',
    level: 'Buyers, Brokers & Layout Promoters',
    title: 'DTCP & RERA Layout Approval Verification',
    priceTag: 'Online ₹399 | Offline ₹999',
    priceOnline: '₹399',
    priceOffline: '₹999',
    duration: '4 Hours (Intensive)',
    tagline: 'Never fall for unapproved Panchayat layout promises.',
    desc: 'Understand how DTCP layout sanction numbers are issued, verify OSR park deeds, and check TN-RERA status before investing in plots.',
    syllabus: [
      'Session 1: High Court rulings on unauthorized Panchayat layout sanctions',
      'Session 2: Step-by-step verification of DTCP orders on government portals',
      'Session 3: Gift deed scrutiny for roads and OSR parks handed to local bodies',
      'Session 4: Bank loan eligibility rules for layout subdivisions'
    ],
    deliverables: 'Layout Approval Checklist, Sample DTCP Sanction Docket, and Certificate of Completion.'
  },
  {
    slug: 'real-estate-business-growth',
    image: '/svc-consulting.jpg',
    category: 'real-estate-business',
    subpage: 'courses',
    type: 'Professional Masterclass',
    level: 'Brokers, Promoters & Agencies',
    title: 'Digital Real Estate Business Growth Blueprint',
    priceTag: 'Custom / Workshop',
    duration: '2-Day Weekend Masterclass',
    desc: 'Build a modern real estate business using automated WhatsApp funnels, Meta advertising, and closed-loop CRM pipelines.',
    syllabus: [
      'Module 1: Real Estate Brand Positioning & Authority Building',
      'Module 2: Running Profitable Meta & Google Ads for Layout Projects',
      'Module 3: WhatsApp Sales Automation & 5-Second Response Funnels',
      'Module 4: Setting Up CRM Pipelines & Sales Rep Performance Dashboards'
    ],
    deliverables: 'Meta ad copy templates, WhatsApp bot dialogue scripts, and CRM setup architecture guide.'
  },
  {
    slug: 'ai-and-digital-marketing-for-realtors',
    image: '/ai-workforce.jpg',
    category: 'real-estate-business',
    subpage: 'workshops',
    type: 'Applied AI Workshop',
    level: 'Agencies & Sales Teams',
    title: 'AI & Automation for Real Estate Teams',
    priceTag: 'Workshop',
    duration: '1-Day Intensive Workshop',
    desc: 'Hands-on training on deploying AI WhatsApp agents, AI CRM copilots, and AI telecallers to handle customer conversations and follow-ups.',
    syllabus: [
      'Session 1: Setting Up Official WhatsApp Cloud APIs for Real Estate',
      'Session 2: Configuring AI Sales Agents to Qualify Inquiries Automatically',
      'Session 3: Automating 30-Day Follow-Up Sequences with Zero Manual Effort',
      'Session 4: Live Case Studies & ROI Measurement'
    ],
    deliverables: 'Working AI conversation templates and turnkey prompt libraries for real estate.'
  }
];
