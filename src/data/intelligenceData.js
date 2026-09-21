export const INTELLIGENCE_SUBPAGES = [
  { id: 'all', slug: '', label: 'All Intelligence' },
  { id: 'market-insights', slug: 'market-insights', label: 'Market Insights' },
  { id: 'location-insights', slug: 'location-insights', label: 'Location Insights' },
  { id: 'price-insights', slug: 'price-insights', label: 'Price Insights' },
  { id: 'infrastructure', slug: 'infrastructure', label: 'Infrastructure' },
  { id: 'reports', slug: 'reports', label: 'Research Reports' },
  { id: 'guides', slug: 'guides', label: 'Practical Guides' }
];

export const INTELLIGENCE_PRODUCTS = [
  {
    slug: 'property-valuation',
    title: 'Property Valuation',
    tagline: 'Know the true market baseline before making an offer.',
    positioning: 'Know the Market Before You Decide.',
    price: 'Request Valuation',
    priceTag: 'Custom Scope / On Request',
    ctaText: 'Request Valuation',
    desc: 'Independent, data-led property valuation comparing recent registered sub-registrar deeds, guideline values, and micro-market growth factors across Tamil Nadu.',
    highlights: [
      'Comparative registered transaction comps in the exact revenue village / ward',
      'Adjustment for road frontage, access width, groundwater table, and shape',
      'Realistic negotiation price range to avoid overpaying broker markups'
    ]
  },
  {
    slug: 'market-data-intelligence-report',
    title: 'Market Data Intelligence Report',
    tagline: 'Instant micro-market intelligence report delivered to your inbox.',
    positioning: 'Know the Market Before You Decide.',
    price: '₹199',
    priceTag: '₹199 Instant Report',
    ctaText: 'Download Report for ₹199',
    desc: 'Concise, data-rich intelligence report detailing current transaction price bands, 3-year historical appreciation trajectory, infrastructure catalysts, and guideline value spreads for your chosen corridor.',
    highlights: [
      'Actual sub-registrar registered transaction price spreads',
      'Corridor growth trajectory and upcoming infrastructure developments',
      'Guideline value vs realistic market transaction price index'
    ]
  },
  {
    slug: 'onsite-infrastructure-valuation',
    title: 'On-site Infrastructure Valuation',
    tagline: 'Physical on-ground technical inspection and feasibility audit.',
    positioning: 'Know the Market Before You Decide.',
    price: '₹3,999',
    priceTag: '₹3,999 On-Site Audit',
    ctaText: 'Book On-site Valuation',
    desc: 'On-site physical inspection by real estate technical specialists evaluating groundwater depth, soil bearing capability, road approach width, electric grid/utility access, and flood vulnerability.',
    highlights: [
      'Physical inspection of survey stones, approach road width, and layout contours',
      'Groundwater aquifer depth and potable water verification',
      'Utility connection feasibility (TNEB, stormwater, sewage drainage)',
      'Signed 5-page Technical Infrastructure Audit Dossier'
    ]
  }
];

export const TN_REGIONAL_HIERARCHY = {
  state: 'Tamil Nadu',
  districts: [
    {
      name: 'Tiruchirappalli (Trichy)',
      cities: [
        {
          name: 'Trichy City & Corridors',
          localities: [
            'Airport Road / Mathur Corridor',
            'Thiruvanaikoil / Srirangam Belt',
            'Samayapuram / NH-45 Belt',
            'Kallanai Road / Grand Anicut',
            'Panchapur Integrated Bus Terminus',
            'Thillai Nagar & Cantonment',
            'KK Nagar & Crawford'
          ]
        }
      ]
    },
    {
      name: 'Chennai Metropolitan Region',
      cities: [
        {
          name: 'Chennai Suburbs & Outer Corridors',
          localities: ['Guduvanchery & GST Road', 'Oragadam & Sriperumbudur', 'Poonamallee & Thirumazhisai', 'Kilambakkam KCBT Hub']
        }
      ]
    },
    {
      name: 'Coimbatore',
      cities: [
        {
          name: 'Coimbatore Urban Area',
          localities: ['Avinashi Road Corridor', 'Saravanampatti Tech Zone', 'Pollachi Road', 'Kovaipudur']
        }
      ]
    },
    {
      name: 'Madurai',
      cities: [
        {
          name: 'Madurai Region',
          localities: ['Ring Road Corridor', 'Kappalur SEZ Belt', 'Othakadai', 'Airport Corridor']
        }
      ]
    }
  ]
};

export const DETAILED_INTELLIGENCE_RECORDS = [
  {
    slug: 'trichy-semi-ring-road-impact',
    subpage: 'infrastructure',
    category: 'Infrastructure',
    title: 'Trichy Semi-Ring Road: Micro-Market Real Estate Impact Analysis',
    region: 'Trichy • Airport & Panchapur Corridors',
    date: 'March 2026',
    readTime: '6 mins',
    summary: 'How the newly commissioned Semi-Ring Road linking Mathur, Panchapur Bus Terminus, and Jeeyapuram is reshaping industrial logistics and residential land valuations in Tiruchirappalli.',
    keyPoints: [
      'Seamless arterial link bypassing heavy city traffic between Chennai (NH-45), Dindigul, and Pudukkottai highways',
      'Panchapur Integrated Bus Terminus unlocks massive commercial logistics and rental demand',
      'Historical 3-year transaction comp shows 15% to 22% annualized land value appreciation along arterial feeder links'
    ],
    fullArticle: 'The completion of the Trichy Semi-Ring Road is fundamentally altering traffic flows and micro-market economics in Tiruchirappalli. By connecting the Pudukkottai Highway (NH-336) near the International Airport directly to the Madurai Highway (NH-83) at Panchapur and onward to Jeeyapuram on the Karur Highway, heavy freight bypasses the congested central city. Consequently, land parcels in Mathur, Mandaiyur, and adjacent revenue villages are experiencing institutional interest for warehousing, light engineering, and planned DTCP residential layouts with sweet Kaveri-aquifer groundwater.'
  },
  {
    slug: 'patta-chitta-online-verification',
    subpage: 'guides',
    category: 'Guides',
    title: 'Step-by-Step Guide: How to Verify Patta, Chitta & FMB on Tamil Nadu e-Services',
    region: 'Tamil Nadu Wide',
    date: 'February 2026',
    readTime: '8 mins',
    summary: 'A practical walkthrough on using eservices.tn.gov.in to verify sub-division patta, checking revenue owner names, matching survey numbers, and detecting joint patta anomalies.',
    keyPoints: [
      'Understanding the difference between Individual Patta and Joint Patta (Kootu Patta)',
      'Checking FMB sketch boundaries against physical ground survey marker stones',
      'Identifying unregularized subdivisions under Section 47A of the Stamp Act'
    ],
    fullArticle: 'Verifying revenue records is the foundational step of land acquisition in Tamil Nadu. The Registration Department registers deeds presented to it, but only the Revenue Department maintains definitive possession records. When inspecting a prospective property on eservices.tn.gov.in, buyers must ensure that the Patta owner name matches the current vendor on the Sale Deed chain, that sub-divisions have received individual sub-division orders, and that the FMB (Field Measurement Book) sketch accurately matches the physical boundaries on the ground.'
  },
  {
    slug: 'guideline-value-vs-market-price-trichy',
    subpage: 'price-insights',
    category: 'Price Insights',
    title: 'Guideline Value vs Real Transaction Prices in Trichy & Central TN',
    region: 'Tiruchirappalli Micro-Markets',
    date: 'January 2026',
    readTime: '5 mins',
    summary: 'Comprehensive breakdown of government guideline revisions across key Trichy wards: Thillai Nagar, KK Nagar, Samayapuram, and Airport Road.',
    keyPoints: [
      'Computation of effective 9% government registration and stamp duty impact on total on-road budget',
      'Understanding guideline-to-market ratios for bank loan sanctions from nationalized lenders',
      'Why relying on informal unreceipted cash premiums without legal scrutiny exposes buyers to severe risks'
    ],
    fullArticle: 'Government Guideline Values serve as the statutory floor for calculating stamp duty and registration fees in Tamil Nadu. However, across high-growth corridors like the Trichy Airport belt and Samayapuram highway, fair market transaction values frequently trade at an economically justified premium driven by infrastructure connectivity, groundwater sweet-water depth, and commercial demand. Understanding the delta between guideline values and registered sub-registrar transaction values is critical for bank loan approvals and legal liquidity.'
  },
  {
    slug: 'dtcp-vs-cmda-vs-panchayat-approval',
    subpage: 'market-insights',
    category: 'Market Insights',
    title: 'Why Panchayat Layout Approvals are Legally Invalid in Tamil Nadu',
    region: 'Tamil Nadu State-wide',
    date: 'January 2026',
    readTime: '7 mins',
    summary: 'Detailed legal analysis explaining the 2016 Madras High Court verdict prohibiting unauthorized layout registration without DTCP or CMDA sanction.',
    keyPoints: [
      'Panchayat presidents have zero statutory authority to sanction layout subdivisions',
      'OSR (Open Space Reservation) gifted park deed compliance mandatory under DTCP norms',
      'Building permits and nationalized bank loans are strictly prohibited for unapproved layouts'
    ],
    fullArticle: 'Under the landmark 2016 Madras High Court rulings and subsequent statutory amendments, sub-registrars across Tamil Nadu are strictly barred from registering plots in layouts that lack approval from the Directorate of Town and Country Planning (DTCP) or the Chennai Metropolitan Development Authority (CMDA). Unsuspecting buyers purchasing plots approved only by a local Village Panchayat find themselves unable to obtain building permits, electricity connections, or bank loans without going through complex and expensive regularisation schemes.'
  },
  {
    slug: 'trichy-airport-expansion-report',
    subpage: 'reports',
    category: 'Research Reports',
    title: 'Trichy International Airport Expansion: 5-Year Land Valuation Outlook',
    region: 'Airport & South Trichy Corridors',
    date: 'February 2026',
    readTime: '9 mins',
    summary: 'A deep-dive research report analyzing passenger traffic expansion, cargo terminal commissioning, and residential land appreciation along the Airport-Mathur corridor.',
    keyPoints: [
      'New international terminal handling 4.5+ million passengers annually driving hospitality and business hubs',
      'Proposed runway extension unlocking direct wide-body long-haul flights',
      '5-year predictive land value index projecting 16% to 20% compound annual capital appreciation'
    ],
    fullArticle: 'The inauguration of Trichy International Airport’s state-of-the-art new passenger terminal has established Tiruchirappalli as the fastest-growing aviation hub in central and southern Tamil Nadu. With enhanced international connectivity to Singapore, Malaysia, and the Gulf, real estate demand along the Airport Road and Mathur corridor has transitioned from speculative buying to end-user residential layouts and logistics infrastructure.'
  },
  {
    slug: 'thiruvanaikoil-srirangam-corridor-guide',
    subpage: 'location-insights',
    category: 'Location Insights',
    title: 'Thiruvanaikoil & Srirangam Residential Belt: Livability & Aquifer Audit',
    region: 'North Trichy / River Basin',
    date: 'January 2026',
    readTime: '6 mins',
    summary: 'Evaluating groundwater table depths, cultural heritage heritage buffers, and plot availability in the Kaveri and Kollidam river belt.',
    keyPoints: [
      'Sweet drinking groundwater accessible at depths of 15 to 22 feet year-round',
      'Strict adherence to heritage conservation buffer norms around Srirangam and Jambukeswarar temples',
      'Ideal micro-market for retirement homes, independent villas, and family residences'
    ],
    fullArticle: 'Nestled between the Kaveri and Kollidam rivers, the Thiruvanaikoil and Srirangam corridor remains the most culturally prestigious and environmentally serene residential address in Tiruchirappalli. The perennial Kaveri aquifer provides abundant sweet drinking groundwater within 20 feet. For buyers seeking a peaceful living environment with immediate connectivity to Chathiram Bus Stand and No.1 Tollgate, verified DTCP layouts in this corridor offer unmatched livability.'
  }
];
