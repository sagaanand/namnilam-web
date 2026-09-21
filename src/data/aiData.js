export const AI_CATEGORIES = [
  { id: 'all', name: 'All Agents', count: 10, desc: 'Complete enterprise workforce layer' },
  { id: 'sales', name: 'Sales', count: 3, desc: 'Lead qualification, multi-touch follow-up, and telecalling' },
  { id: 'customer', name: 'Customer Communication', count: 2, desc: '24/7 WhatsApp response and customer support' },
  { id: 'operations', name: 'Operations', count: 2, desc: 'Voice/chat CRM operations and daily morning briefs' },
  { id: 'intelligence', name: 'Intelligence', count: 2, desc: 'Revenue leakage detection and plain-language analytics' },
  { id: 'marketing', name: 'Marketing', count: 1, desc: 'Campaign ideas, ad copy, creative briefs, and marketing reports' }
];

export const AI_WORKFLOW_STEPS = [
  { step: '01', name: 'Lead Arrives', role: 'Inbound enquiry from ad, website, portal, or referral', agent: null, icon: 'Inbox' },
  { step: '02', name: 'AI Sales Agent', role: 'Instantly identifies intent, budget, timeline, and corridor preference', agent: 'sales-agent', icon: 'Zap' },
  { step: '03', name: 'AI WhatsApp Agent', role: 'Sends brochures, layout maps, and location pins within 5 seconds', agent: 'whatsapp-agent', icon: 'MessageSquare' },
  { step: '04', name: 'AI CRM Copilot', role: 'Logs structured requirements, tags lead score, and schedules next task', agent: 'crm-copilot', icon: 'Database' },
  { step: '05', name: 'AI Follow-Up Agent', role: 'Executes persistent 1-3-7-14 day cadence with project updates', agent: 'follow-up-agent', icon: 'Clock' },
  { step: '06', name: 'AI Calling Agent', role: 'Confirms weekend site visit time slots and reactivates dormant leads', agent: 'calling-agent', icon: 'PhoneCall' },
  { step: '07', name: 'Human Salesperson', role: 'Conducts site visits, builds relationship, negotiates, and closes', agent: null, icon: 'Users', isHuman: true },
  { step: '08', name: 'AI Intelligence', role: 'Detects pipeline leakage and summarizes executive performance', agent: 'revenue-leakage-agent', icon: 'TrendingUp' }
];

export const AI_WORKFORCE_DATA = [
  // 1. SALES AGENT
  {
    id: 'sales-agent',
    slug: 'sales-agent',
    aliases: ['ai-sales-agent', 'sales-agent'],
    agentNumber: '01',
    category: 'Sales',
    title: 'AI Sales Agent',
    badge: 'First-Line Sales Assistant',
    headline: 'Your First-Line Sales Assistant',
    tagline: 'Understands new enquiries, qualifies buyer requirements, and routes high-intent leads to your sales team.',
    questions: {
      problem: 'Sales executives waste 70% of their workday contacting invalid numbers, window-shoppers, or unqualified leads, while high-intent buyers wait hours for a reply and drift to competitors.',
      whatItDoes: 'Instantly greets new enquiries across digital channels, asks natural discovery questions regarding budget, timeline, and corridor preference, scores buyer intent, and alerts sales reps to high-priority opportunities.',
      howItWorks: 'Connects via webhook to Meta ads, websites, and property portals. When a lead submits an enquiry, the agent initiates conversational discovery within seconds via WhatsApp or SMS, extracts structured parameters, and synchronizes the record into your CRM.',
      whoItIsFor: 'Real estate developers, layout promoters, and agencies managing 50+ monthly inquiries who need faster response times without expanding junior telecalling staff.',
      humanRole: 'Your human sales executives step in when the customer is qualified and ready for an in-depth consultation, personalized pricing negotiation, or on-site layout visit.',
      metrics: 'First-response time (reduced from hours to under 30 seconds), lead-to-qualification rate, cost per qualified lead, and sales rep time saved.',
      limitations: 'The agent does not negotiate final pricing, sign booking tokens, or make subjective legal promises. It focuses purely on requirements gathering and qualification.',
      howToStart: 'Connect your primary lead source (Meta Lead Form, website form, or portal webhook), define your qualifying criteria (e.g., minimum budget ₹20L, ready to buy within 90 days), and test the conversation flow.'
    },
    whatItDoes: [
      'Understands new enquiries from websites, ads, and portals within 15 seconds',
      'Asks basic qualifying questions naturally in English or conversational Tamil',
      'Captures buyer requirements: budget, plot size, timeline, and preferred locality',
      'Identifies buyer readiness (immediate construction vs 5-year investment)',
      'Updates lead attributes and intent tags directly in your CRM',
      'Routes high-intent, ready-to-visit leads straight to designated senior sales reps'
    ],
    businessValue: 'Less manual qualification. Faster response. Better sales-team focus on real buyers.',
    ctaText: 'Deploy AI Sales Agent',
    problem: 'Sales reps waste hours calling invalid numbers or unqualified leads, while hot prospects go cold.',
    aiAction: 'Instantly engages new leads, discovers their exact property requirements, and updates your CRM in real time.',
    teamCollaboration: 'AI handles repetitive initial screening. Your sales team focuses 100% of their time on serious, qualified buyers ready for site visits.',
    workflow: ['New Lead Arrives', 'AI Instant Response', 'Requirement Discovery', 'CRM Sync & Scoring', 'Warm Handover to Sales Team'],
    relatedAgents: ['whatsapp-agent', 'follow-up-agent', 'crm-copilot'],
    relatedSolutions: ['lead-generation', 'sales-automation', 'crm'],
    relatedUseCases: ['real-estate-lead-qualification', 'real-estate-sales-automation'],
    relatedResources: ['what-is-an-ai-agent', 'ai-real-estate-sales'],
    simulation: {
      type: 'chat',
      customer: '“I need a 2-cent plot within ₹30 lakhs near Trichy Airport.”',
      aiReply: 'Vanakkam! We have DTCP-approved villa plots starting at ₹24 Lakhs (₹1,850/sq.ft) in our Airport corridor layout. Are you looking for immediate home construction or long-term investment?',
      outcome: 'Lead tagged: "High Intent / Airport Corridor / ₹25-30L" → Assigned to Senior Sales Executive.'
    }
  },

  // 2. FOLLOW-UP AGENT
  {
    id: 'follow-up-agent',
    slug: 'follow-up-agent',
    aliases: ['ai-follow-up-agent', 'follow-up-agent'],
    agentNumber: '02',
    category: 'Sales',
    title: 'AI Follow-Up Agent',
    badge: 'Zero Lead Drop-off',
    headline: 'Never Let a Good Lead Go Silent',
    tagline: 'Consistently follows up with every lead across days and weeks, without relying entirely on human memory.',
    questions: {
      problem: 'Over 60% of real estate buyers make a purchase decision between 15 to 90 days after their first enquiry. However, most sales reps abandon follow-up after just 1 or 2 unanswered attempts, leaving high-value deals on the table.',
      whatItDoes: 'Tracks pipeline activity and automatically triggers context-rich follow-ups on Day 1, Day 3, Day 7, Day 14, and Day 30, sharing helpful layout updates, drone videos, and groundwater reports.',
      howItWorks: 'Monitors lead timestamps in your CRM. When an assigned salesperson has not updated the deal stage or when a customer goes silent, the agent sends personalized, polite follow-up messages across WhatsApp or SMS.',
      whoItIsFor: 'Developers and agencies with growing pipelines where sales executives are too busy handling active weekend visits to systematically follow up with older leads.',
      humanRole: 'Sales reps are instantly notified the moment a lead responds to a follow-up message with renewed interest, allowing them to jump on the conversation immediately.',
      metrics: 'Re-engagement rate of silent leads, total follow-up touchpoints completed, and secondary site visit bookings generated from older inquiries.',
      limitations: 'The agent respects customer opt-outs immediately and does not send spam or aggressive sales pitches. Messages are paced according to compliance guidelines.',
      howToStart: 'Map your ideal follow-up timeline (e.g. 5 touches over 21 days), provide 3 approved follow-up assets (e.g., layout PDF, site video, bank loan sheet), and connect your CRM pipeline.'
    },
    whatItDoes: [
      'Identifies leads that have stalled or gone silent in your sales pipeline',
      'Triggers personalized, multi-touch follow-up sequences across days and weeks',
      'Re-engages undecided buyers with project construction milestones and video walkthroughs',
      'Monitors customer replies and emotional sentiment',
      'Alerts the assigned sales executive immediately when an inactive buyer responds'
    ],
    businessValue: 'More consistent follow-up without depending entirely on human memory.',
    ctaText: 'Deploy AI Follow-Up Agent',
    problem: 'Most real estate deals take 3 to 8 weeks, but busy sales reps stop calling after 2 tries.',
    aiAction: 'Executes consistent follow-up sequences across WhatsApp and SMS, sharing project progress and visit invitations.',
    teamCollaboration: 'Keeps leads warm automatically. When a lead replies, the assigned salesperson is alerted instantly with full background.',
    workflow: ['Lead Inactivity Detected', 'Scheduled Follow-Up Triggered', 'Value Message Sent', 'Customer Responds', 'Sales Rep Alerted'],
    relatedAgents: ['whatsapp-agent', 'calling-agent', 'crm-copilot'],
    relatedSolutions: ['sales-automation', 'whatsapp-automation', 'crm'],
    relatedUseCases: ['real-estate-lead-follow-up', 'old-lead-reactivation'],
    relatedResources: ['real-estate-lead-follow-up-automation', 'ai-real-estate-sales'],
    simulation: {
      type: 'cadence',
      cadence: [
        { day: 'Day 1', action: 'Follow-up with project layout PDF and pricing summary' },
        { day: 'Day 3', action: 'Reminder regarding weekend site visit cab slots' },
        { day: 'Day 7', action: 'Re-engagement with video walkthrough and groundwater test report' },
        { day: 'Day 14', action: 'Revival alert on limited available corner plots' }
      ]
    }
  },

  // 3. CALLING AGENT
  {
    id: 'calling-agent',
    slug: 'calling-agent',
    aliases: ['ai-calling-agent', 'calling-agent'],
    agentNumber: '03',
    category: 'Sales',
    title: 'AI Calling Agent',
    badge: 'AI Telecaller',
    headline: 'An AI Telecaller for Repetitive Outbound Calls',
    tagline: 'Handles routine qualification, visit confirmations, and old lead reactivation over phone calls.',
    questions: {
      problem: 'Hiring, training, and retaining human telecallers is costly with high employee turnover. Calling hundreds of stale leads or making repetitive visit confirmation calls exhausts team morale.',
      whatItDoes: 'Conducts polite, voice-based telephone conversations to confirm weekend site visits, screen incoming web leads, and re-check interest across old database contacts in natural Tamil and English.',
      howItWorks: 'Uses enterprise voice telephony infrastructure integrated with natural language understanding. Operates within strict caller ID and regulatory consent rules, updating CRM call logs with call summaries and recordings.',
      whoItIsFor: 'Real estate businesses with large legacy lead databases (500+ uncontacted leads) or layout developments with 20+ scheduled site visits every weekend requiring confirmation calls.',
      humanRole: 'Human managers handle complex negotiations and high-ticket customer meetings. The calling agent only conducts routine screening and appointment reminders.',
      metrics: 'Call connect rate, site visit attendance confirmation accuracy, old database reactivation yield, and cost per connected call.',
      limitations: 'All calling workflows must respect applicable regulatory guidelines (TRAI / DND / consent requirements). Calls are conducted transparently as AI-assisted service calls.',
      howToStart: 'Upload an eligible lead segment (e.g. leads who visited the site 30 days ago), define the script objective (site visit feedback or new layout launch), and review test audio recordings.'
    },
    whatItDoes: [
      'Instantly calls new web leads to confirm genuine interest and active requirements',
      'Conducts polite qualification calls across large databases without fatigue',
      'Confirms scheduled weekend site visit appointments and driver pick-up locations',
      'Sends instant SMS / WhatsApp follow-up summaries following each call',
      'Reactivates dormant leads from previous quarters for newly launched layouts',
      'Logs full call transcripts and disposition tags directly into CRM'
    ],
    businessValue: 'Scale outbound calling reach without scaling calling overhead at the same rate.',
    ctaText: 'Explore AI Calling Agent',
    problem: 'Calling hundreds of old leads manually takes weeks, with high attrition and inconsistent call scripts.',
    aiAction: 'Autonomously dials lists of leads, speaks naturally, asks qualifying questions, and logs notes instantly.',
    teamCollaboration: 'Filters out invalid numbers and disinterested inquiries, delivering confirmed site visit appointments straight to your field team.',
    workflow: ['Lead List Uploaded', 'AI Voice Outreach', 'Natural Requirement Discussion', 'CRM Call Log Updated', 'Confirmed Visits Scheduled'],
    relatedAgents: ['sales-agent', 'follow-up-agent', 'whatsapp-agent'],
    relatedSolutions: ['sales-automation', 'lead-generation', 'crm'],
    relatedUseCases: ['old-lead-reactivation', 'site-visit-follow-up'],
    relatedResources: ['ai-telecaller-vs-human-telecaller', 'what-is-an-ai-agent'],
    simulation: {
      type: 'voice_log',
      scenario: 'Reactivating 500 Dormant Inquiries',
      transcript: [
        { speaker: 'AI Calling Agent', text: '“Hello Mr. Karthik, this is Nam Nilam calling regarding your enquiry for residential plots in Trichy. Are you still actively looking for property this season?”' },
        { speaker: 'Customer', text: '“Yes, but looking for something with good Kaveri drinking water near Thiruvanaikoil.”' },
        { speaker: 'AI Calling Agent', text: '“Understood! Our Abirami Nagar layout in Thiruvanaikoil has sweet water at 20 ft with DTCP approval. Can our sales manager send the layout map on your WhatsApp?”' },
        { speaker: 'Customer', text: '“Yes, please send it to this number.”' }
      ],
      result: 'Lead marked: "Reactivated / High Interest" → Layout PDF delivered via WhatsApp.'
    }
  },

  // 4. WHATSAPP AGENT
  {
    id: 'whatsapp-agent',
    slug: 'whatsapp-agent',
    aliases: ['ai-whatsapp-agent', 'whatsapp-agent'],
    agentNumber: '04',
    category: 'Customer',
    title: 'AI WhatsApp Agent',
    badge: '24/7 WhatsApp Response',
    headline: 'Your WhatsApp Doesn’t Need to Sleep',
    tagline: 'Responds instantly to property enquiries on WhatsApp, 24 hours a day, 7 days a week.',
    questions: {
      problem: 'Buyers in Tamil Nadu expect immediate answers on WhatsApp. Enquiries arriving on Sunday afternoons or after 8 PM routinely wait 12+ hours for a human response, losing interest.',
      whatItDoes: 'Provides instant 5-second replies on WhatsApp, shares verified layout PDF maps, Google Maps directions, pricing slabs, and answers common questions about DTCP/RERA approvals.',
      howItWorks: 'Integrates with the official WhatsApp Business Cloud API. When a user sends a message or clicks a "Click to WhatsApp" ad, the AI parses their request, checks verified project facts, and delivers answers.',
      whoItIsFor: 'Any real estate promoter or broker who advertises on Meta or Google and receives 10+ WhatsApp messages daily.',
      humanRole: 'Sales executives can view the live chat thread at any time and take over the conversation seamlessly with one click when customized discussions arise.',
      metrics: 'First response latency (<10 seconds), brochure download rate, conversation completion rate, and site visit booking requests.',
      limitations: 'Does not invent pricing discounts or make guarantees outside of configured project parameters. Complex queries trigger a polite human handoff.',
      howToStart: 'Verify your Meta Business Manager, register your official WhatsApp Business phone number, and load your project FAQs and master plan documents.'
    },
    whatItDoes: [
      'Responds in 5 seconds to incoming WhatsApp chats at any hour of day or night',
      'Delivers master plan PDFs, price charts, and Google Map pins automatically',
      'Understands customer requirements in English, Tamil, and Tanglish',
      'Screens buyer readiness and timeline before scheduling site visits',
      'Sends automated site visit reminders with driver contact information',
      'Smoothly transfers high-intent conversations directly to on-duty sales managers'
    ],
    businessValue: 'Faster responses. Zero missed late-night enquiries. Elevated brand credibility.',
    ctaText: 'Deploy AI WhatsApp Agent',
    problem: 'Enquiries arriving late in the evening go unanswered until morning, causing buyers to look elsewhere.',
    aiAction: 'Answers within seconds on official WhatsApp, shares brochures, Google Maps locations, and arranges site visit cabs.',
    teamCollaboration: 'Handles repetitive greeting and basic info delivery. When a customer is ready for negotiation or site visit, smoothly loops in a sales executive.',
    workflow: ['Customer Sends WhatsApp Message', 'AI Understands Query Instantly', 'Project Details & Layout Sent', 'Customer Need Qualified', 'Salesperson Alerted'],
    relatedAgents: ['sales-agent', 'customer-support-agent', 'follow-up-agent'],
    relatedSolutions: ['whatsapp-automation', 'crm', 'sales-automation'],
    relatedUseCases: ['real-estate-whatsapp-automation', 'real-estate-lead-qualification'],
    relatedResources: ['real-estate-whatsapp-automation', 'what-is-an-ai-agent'],
    simulation: {
      type: 'chat',
      customer: '“Trichy la 30 lakhs budget-ku plot iruka?”',
      aiReply: 'Vanakkam! Yes, we have DTCP-approved villa plots starting from ₹18 Lakhs in Jai Nagar (Airport Corridor) and ₹22 Lakhs in Abirami Nagar (Thiruvanaikoil). Would you like to see the master layout plan and pricing sheet for these?',
      outcome: 'Buyer receives immediate PDF layout and directions; sales manager notified.'
    }
  },

  // 5. CUSTOMER SUPPORT AGENT
  {
    id: 'customer-support-agent',
    slug: 'customer-support-agent',
    aliases: ['ai-customer-support-agent', 'customer-support-agent'],
    agentNumber: '05',
    category: 'Customer',
    title: 'AI Customer Support Agent',
    badge: 'Everyday Question Desk',
    headline: 'Answer the Questions Your Team Answers Every Day',
    tagline: 'Handles routine customer queries about location, approvals, pricing, and documents with verified accuracy.',
    questions: {
      problem: 'Front-desk staff and sales managers spend over 2 hours daily repeating the same factual information: approval numbers, road widths, distance to schools, and registration procedures.',
      whatItDoes: 'Maintains an institutional knowledge repository of project facts, providing accurate answers to prospect and buyer questions without hesitation or misinformation.',
      howItWorks: 'Trained on your official DTCP sanction orders, TN-RERA registration certificates, parent deed summaries, water lab tests, and landmark distances.',
      whoItIsFor: 'Real estate businesses wanting consistent, accurate messaging across all channels without training every new receptionist from scratch.',
      humanRole: 'Escalations regarding payment adjustments, customized payment plans, or legal dispute inquiries are routed directly to management.',
      metrics: 'Query resolution rate, reduction in incoming support calls to sales reps, and customer satisfaction score.',
      limitations: 'Restricted strictly to documented project facts; will not speculate or make unauthorized promises.',
      howToStart: 'Upload your project approval certificates, master brochure, and standard FAQ list into your Nam Nilam knowledge base.'
    },
    whatItDoes: [
      'Answers questions on exact landmark distances, airport connectivity, and transit routes',
      'Provides verified DTCP layout sanction numbers and TN-RERA registration details',
      'Explains square foot rates, corner plot premiums, and guideline values clearly',
      'Guides buyers on the step-by-step registration and sub-division patta transfer process',
      'Shares approved bank loan lists (SBI, HDFC, Indian Bank) and loan coordinator details',
      'Facilitates office appointment bookings and site visit cab scheduling'
    ],
    businessValue: 'Reduce repetitive customer-support workload while ensuring 100% factual accuracy.',
    ctaText: 'Deploy AI Support Agent',
    problem: 'Sales teams spend valuable hours every day answering the same repetitive 15 factual questions.',
    aiAction: 'Provides instant, accurate responses based on verified project documentation.',
    teamCollaboration: 'Filters out routine repetitive questions. Complex legal or specialized discussions are immediately escalated.',
    workflow: ['Buyer Asks Question', 'AI Checks Project Facts', 'Accurate Answer Delivered Instantly', 'Complex Issues Escalated to Human'],
    relatedAgents: ['whatsapp-agent', 'sales-agent', 'crm-copilot'],
    relatedSolutions: ['crm', 'whatsapp-automation', 'digital-transformation'],
    relatedUseCases: ['real-estate-whatsapp-automation', 'site-visit-follow-up'],
    relatedResources: ['what-is-an-ai-agent', 'ai-for-real-estate'],
    simulation: {
      type: 'chat',
      customer: '“Is DTCP approval and RERA registration available for this layout?”',
      aiReply: 'Yes. The layout is 100% DTCP Approved (No. 0512/2024) and registered under TN-RERA (TN/16/Layout/0512/2024). Individual subdivision patta transfer is ready immediately upon registration.',
      outcome: 'Clear, reassuring factual response provided with zero delay.'
    }
  },

  // 6. CRM COPILOT
  {
    id: 'crm-copilot',
    slug: 'crm-copilot',
    aliases: ['ai-crm-copilot', 'crm-copilot'],
    agentNumber: '06',
    category: 'Operations',
    title: 'AI CRM Copilot',
    badge: 'Conversational CRM',
    headline: 'Talk to Your CRM Instead of Searching Through It',
    tagline: 'Use voice or simple text messages to look up leads, log notes, and update statuses without typing into clunky software.',
    questions: {
      problem: 'Sales executives dislike updating complex CRM forms at the end of a long day on the field. Records remain incomplete, customer notes are lost, and leadership has zero pipeline visibility.',
      whatItDoes: 'Allows sales reps to speak or type in plain language to search leads, record site visit feedback, reschedule tasks, and change deal stages in seconds.',
      howItWorks: 'Acts as an intelligent conversational layer over your CRM database (Zoho, HubSpot, or Nam Nilam CRM). Uses speech-to-text and entity extraction to parse notes and update records.',
      whoItIsFor: 'Real estate companies whose sales reps spend hours in the field and need friction-free tools to log customer interactions instantly.',
      humanRole: 'Sales reps simply send a 15-second WhatsApp voice note after finishing a site visit; the copilot does the clerical heavy lifting.',
      metrics: 'CRM compliance rate (percentage of visits logged within 1 hour), completeness of lead notes, and pipeline accuracy.',
      limitations: 'Requires clear audio or text input. Does not override administrator-enforced security permissions or deal approvals.',
      howToStart: 'Connect your existing CRM API keys or activate Nam Nilam Cloud CRM, and set up your team\'s WhatsApp voice interface.'
    },
    whatItDoes: [
      'Understands voice notes from sales reps: "Met Mr. Suresh at the site. He likes plot 12 and will confirm Friday"',
      'Automatically finds the customer record, logs the note, and sets a follow-up task for Friday',
      'Answers executive questions: "Which high-budget leads in Samayapuram have not been contacted this week?"',
      'Updates deal stages, lost reasons, and budget adjustments without typing into web forms',
      'Generates automated reminders to reps before their scheduled buyer callback appointments'
    ],
    businessValue: 'Less CRM friction. 100% pipeline visibility. Zero lost customer meeting notes.',
    ctaText: 'Deploy AI CRM Copilot',
    problem: 'Salespeople dislike clunky software, leading to outdated records and zero management visibility.',
    aiAction: 'Allows sales reps to send quick voice notes or chat messages to update lead stages, notes, and tasks.',
    teamCollaboration: 'Removes the administrative burden from sales executives while giving business owners real-time pipeline visibility.',
    workflow: ['Sales Rep Sends Voice Note', 'AI Extracts Key Details', 'CRM Automatically Updated', 'Reminder Scheduled', 'Confirmation Sent to Rep'],
    relatedAgents: ['sales-agent', 'morning-brief', 'revenue-leakage-agent'],
    relatedSolutions: ['crm', 'sales-automation', 'business-intelligence'],
    relatedUseCases: ['real-estate-sales-automation', 'real-estate-lead-follow-up'],
    relatedResources: ['what-is-an-ai-agent', 'ai-real-estate-sales'],
    simulation: {
      type: 'crm_action',
      repInput: '“Show me leads with budget above 30 Lakhs who haven\'t been called this week.”',
      crmOutput: 'Found 6 high-value leads with no activity for 7+ days. 1. Mr. Rajesh (₹35L), 2. Dr. Meena (₹42L), 3. Mr. Anand (₹30L)... Reminders generated.'
    }
  },

  // 7. MORNING BRIEF
  {
    id: 'morning-brief',
    slug: 'morning-brief',
    aliases: ['ai-morning-brief', 'morning-brief'],
    agentNumber: '07',
    category: 'Operations',
    title: 'AI Morning Brief',
    badge: 'Daily Executive Snapshot',
    headline: 'Know What Happened Before Your First Meeting',
    tagline: 'Every morning, receive a clear business summary showing yesterday’s performance and today’s top priorities.',
    questions: {
      problem: 'Business owners and sales directors spend the first hour of every workday calling team leads to find out yesterday\'s lead counts, site visit outcomes, and follow-up backlogs.',
      whatItDoes: 'Synthesizes sales and marketing data overnight and delivers an executive summary directly to WhatsApp at 8:00 AM, listing key metrics and the 5 top priorities needing leadership focus.',
      howItWorks: 'Aggregates data from lead channels, call logs, WhatsApp conversations, and CRM deal stages between midnight and 6 AM, applying business rules to isolate outliers and key opportunities.',
      whoItIsFor: 'Founders, managing directors, and sales heads who need clear daily visibility without pulling spreadsheets or waiting for manual team reports.',
      humanRole: 'Leadership uses the brief to guide the morning sales huddle, addressing identified bottlenecks and celebrating confirmed bookings.',
      metrics: 'Reduction in internal reporting meeting times, speed of addressing stalled deals, and overall executive decision speed.',
      limitations: 'Calculates metrics strictly based on system-logged activities. Non-logged offline events cannot be reported.',
      howToStart: 'Define your key metrics (e.g. new leads, qualified count, visits done, pending callbacks) and target WhatsApp delivery time.'
    },
    whatItDoes: [
      'Summarizes yesterday\'s total new enquiries and lead sources across Meta, Google, and portals',
      'Highlights how many leads met qualification thresholds (budget, timeline)',
      'Reports completed and scheduled layout site visits with customer feedback',
      'Flags uncontacted leads older than 24 hours and pending sales rep tasks',
      'Pinpoints high-intent opportunities poised for token booking closure',
      'Delivers a crisp "Top 5 Action Items for Today" brief directly to leadership WhatsApp'
    ],
    businessValue: 'Less time collecting information. More time making timely business decisions.',
    ctaText: 'Deploy AI Morning Brief',
    problem: 'Founders spend an hour every morning asking managers what happened yesterday.',
    aiAction: 'Collects figures from marketing, calls, WhatsApp, and CRM overnight, sending a concise morning brief at 8:00 AM.',
    teamCollaboration: 'Keeps management informed without distracting team members with manual daily report preparation.',
    workflow: ['Overnight Data Collection', 'Activity & Pipeline Synthesis', 'Key Priorities Extracted', '8:00 AM Briefing Delivered'],
    relatedAgents: ['crm-copilot', 'revenue-leakage-agent', 'business-intelligence-agent'],
    relatedSolutions: ['business-intelligence', 'crm', 'digital-transformation'],
    relatedUseCases: ['real-estate-sales-automation', 'site-visit-follow-up'],
    relatedResources: ['what-is-an-ai-agent', 'ai-for-real-estate'],
    simulation: {
      type: 'brief',
      date: 'Today • 8:00 AM Executive Briefing',
      report: [
        '📊 Yesterday: 42 new enquiries across Meta and Website',
        '✅ 17 qualified buyers identified (average budget ₹28 Lakhs)',
        '🚗 6 site visits completed; 8 scheduled for this weekend',
        '⚠️ 4 high-intent prospects have not received a callback in 24 hours',
        '🎯 Top 5 Action Items prepared for today\'s morning sales review'
      ]
    }
  },

  // 8. REVENUE LEAKAGE AGENT
  {
    id: 'revenue-leakage-agent',
    slug: 'revenue-leakage-agent',
    aliases: ['ai-revenue-leakage-agent', 'revenue-leakage-agent'],
    agentNumber: '08',
    category: 'Intelligence',
    title: 'AI Revenue Leakage Agent',
    badge: 'Opportunity Protection',
    headline: 'Find Where Your Business Is Losing Opportunities',
    tagline: 'Helps identify potential revenue leakage by finding neglected leads, missed follow-ups, and stuck deals before they are lost.',
    questions: {
      problem: 'Real estate companies spend lakhs on marketing, but lose up to 30% of viable sales because hot leads sit unassigned, post-visit follow-ups are delayed, or deals stall in silence.',
      whatItDoes: 'Continuously scans your entire customer pipeline to pinpoint operational cracks—uncontacted inquiries, missed promises, and stalled high-value buyers—alerting sales heads in real time.',
      howItWorks: 'Runs automated risk heuristics across CRM timestamps, conversation logs, and visit schedules to detect pipeline stagnation patterns before customer interest expires.',
      whoItIsFor: 'Developers and marketing directors who invest heavily in customer acquisition and want to maximize conversion from every marketing rupee spent.',
      humanRole: 'Sales heads review flagged leakage cases and reassign neglected leads to proactive team members or trigger automated revival campaigns.',
      metrics: 'Uncontacted lead rate (targeted to <2%), average post-site-visit follow-up time, and rescued deal value.',
      limitations: 'Identifies operational risks and vulnerabilities; does not guarantee revenue recovery without human follow-through and market alignment.',
      howToStart: 'Connect your CRM database, configure your SLA thresholds (e.g. leads uncontacted for 4 hours, visits with no follow-up in 48 hours), and set alert recipients.'
    },
    whatItDoes: [
      'Identifies new enquiries that remain uncontacted past target SLA thresholds',
      'Flags site visits completed without an official post-visit follow-up within 48 hours',
      'Spots high-value opportunities stuck in negotiation stage without activity for 7+ days',
      'Detects sudden drops in sales executive follow-up activity across territories',
      'Identifies gaps where CRM records lack contact numbers, budget notes, or stage updates',
      'Proactively alerts sales directors with estimated pipeline value at risk'
    ],
    businessValue: 'Helps identify potential revenue leakage before interested buyers turn to competitors.',
    ctaText: 'Deploy Revenue Leakage Agent',
    problem: 'Companies spend heavily on ads, but lose sales when hot leads are neglected or follow-ups forgotten.',
    aiAction: 'Continuously monitors pipeline health and alerts management whenever leads risk falling through the cracks.',
    teamCollaboration: 'Acts as a safety net for sales management, ensuring no paid enquiry is neglected or forgotten.',
    workflow: ['Continuous Pipeline Scan', 'Leakage Pattern Detected', 'Risk Impact Assessed', 'Alert Sent to Sales Head'],
    relatedAgents: ['morning-brief', 'business-intelligence-agent', 'follow-up-agent'],
    relatedSolutions: ['business-intelligence', 'sales-automation', 'crm'],
    relatedUseCases: ['real-estate-lead-follow-up', 'site-visit-follow-up'],
    relatedResources: ['what-is-an-ai-agent', 'real-estate-lead-follow-up-automation'],
    simulation: {
      type: 'leakage_alert',
      alert: '⚠️ Revenue Leakage Alert',
      details: '12 high-intent leads (estimated pipeline value ₹2.8 Cr) attended site visits last weekend but have not received a follow-up in 5 days.',
      recommendation: 'Trigger automated WhatsApp check-in and alert sales manager to assign urgent direct calls.'
    }
  },

  // 9. BUSINESS INTELLIGENCE AGENT
  {
    id: 'business-intelligence-agent',
    slug: 'business-intelligence-agent',
    aliases: ['ai-business-intelligence-agent', 'business-intelligence-agent'],
    agentNumber: '09',
    category: 'Intelligence',
    title: 'AI Business Intelligence Agent',
    badge: 'Plain-Language Analytics',
    headline: 'Ask Your Business Questions in Plain Language',
    tagline: 'Get clear, data-backed answers to your sales and marketing questions without building complicated spreadsheets.',
    questions: {
      problem: 'Mid-sized real estate firms do not employ full-time data analysts. When sales slow down or marketing costs rise, owners must guess the cause or wait days for manual reports.',
      whatItDoes: 'Enables business owners to type or ask plain-language questions like "Which campaign generated the most qualified buyers?" and receive instant, plain-English root-cause explanations.',
      howItWorks: 'Connects to your ad platforms, CRM, and call records, running correlation analyses across customer acquisition costs, conversion velocities, and sales rep performance.',
      whoItIsFor: 'Real estate promoters, developers, and agency owners seeking immediate strategic clarity without manipulating Excel pivot tables.',
      humanRole: 'Leadership uses the generated diagnostic insights to adjust ad spend, realign sales territories, and improve team incentive structures.',
      metrics: 'Time to diagnostic insight, marketing spend efficiency (CPL vs CPV), and sales rep conversion variance.',
      limitations: 'Insights depend on data integrity in connected ad accounts and CRM records. Clear data input ensures high diagnostic accuracy.',
      howToStart: 'Connect your Meta ad account, Google Ads, and CRM data sources, then test your first 3 strategic business questions.'
    },
    whatItDoes: [
      'Answers executive questions: "Why are website enquiries up 30% but site visits are down?"',
      'Correlates marketing spend by corridor against actual registered sales agreements',
      'Identifies the top-performing advertising creatives, keywords, and audience segments',
      'Compares sales rep closing rates, visit-to-booking ratios, and follow-up discipline',
      'Explains funnel bottlenecks in plain business language without technical jargon'
    ],
    businessValue: 'Turn scattered operational numbers into actionable business decisions.',
    ctaText: 'Deploy BI Agent',
    problem: 'Developers lack full-time data teams and struggle to diagnose fluctuating sales numbers.',
    aiAction: 'Connects sales and ad records, allowing owners to ask questions conversationally and receive plain-language summaries.',
    teamCollaboration: 'Gives promoters and directors clear business visibility without having to wait days for manual reports.',
    workflow: ['Ask Plain Question', 'Cross-System Data Analysis', 'Root Cause Discovered', 'Clear Business Explanation Provided'],
    relatedAgents: ['revenue-leakage-agent', 'morning-brief', 'marketing-agent'],
    relatedSolutions: ['business-intelligence', 'digital-marketing', 'digital-transformation'],
    relatedUseCases: ['real-estate-sales-automation', 'real-estate-lead-qualification'],
    relatedResources: ['ai-for-real-estate', 'what-is-an-ai-agent'],
    simulation: {
      type: 'bi_query',
      query: '“Why are leads increasing but site visits are falling?”',
      aiAnalysis: 'Enquiries grew 35% from a new digital campaign, but average first response time increased from 15 minutes to 3.5 hours. 60% of buyers contacted were no longer available by phone.',
      actionPlan: 'Enable instant WhatsApp qualification on incoming leads to engage buyers within 60 seconds.'
    }
  },

  // 10. MARKETING AGENT
  {
    id: 'marketing-agent',
    slug: 'marketing-agent',
    aliases: ['ai-marketing-agent', 'marketing-agent'],
    agentNumber: '10',
    category: 'Marketing',
    title: 'AI Marketing Agent',
    badge: 'Marketing Workforce',
    headline: 'Your AI Marketing Assistant',
    tagline: 'Helps your marketing team plan, execute, and analyse repetitive marketing work across campaigns and channels.',
    questions: {
      problem: 'Real estate marketing teams and local agencies frequently suffer from creative fatigue, delayed ad copy approvals, repetitive brochure drafting, and slow performance reporting.',
      whatItDoes: 'Acts as an AI marketing workforce that drafts high-converting ad copy angles, designs creative briefs for video editors, plans weekly content calendars, and prepares weekly campaign audits.',
      howItWorks: 'Configured with property specifications (guideline value, water table, approval numbers, connectivity) to produce audience-tailored marketing assets for NRI, investor, and end-user personas.',
      whoItIsFor: 'Real estate developers with in-house marketing personnel or agencies managing multiple property layouts simultaneously.',
      humanRole: 'Marketing managers review and approve the creative angles, direct video shoots, and supervise strategic positioning.',
      metrics: 'Creative production speed, ad CTR (click-through rate), cost per qualified lead, and content publishing consistency.',
      limitations: 'Does not physically shoot video or replace creative brand directors; it provides high-speed structured drafting, ideation, and campaign analysis.',
      howToStart: 'Provide your project positioning document, primary buyer personas (e.g. Trichy NRIs, BHEL/IT employees), and brand tone guidelines.'
    },
    whatItDoes: [
      'Generates audience-specific campaign hooks tailored to distinct layout USPs (water table, highway access, DTCP)',
      'Drafts Meta and Google ad headlines, primary texts, and call-to-action variants',
      'Prepares detailed creative briefs for storyboard artists, drone videographers, and graphic designers',
      'Builds structured social media and educational content calendars',
      'Analyzes weekly ad performance and suggests creative refreshes for decaying ads'
    ],
    businessValue: 'Produce more high-impact marketing output without expanding manual agency overhead.',
    ctaText: 'Deploy Marketing Agent',
    problem: 'Marketing teams get bogged down in repetitive copy variations and slow creative turnaround.',
    aiAction: 'Assists marketing teams by generating audience-focused messaging, ad copy drafts, and performance reviews in minutes.',
    teamCollaboration: 'Empowers marketing directors to focus on high-level strategy while AI handles drafting and routine analysis.',
    workflow: ['Property Details Provided', 'Audience Angles Formulated', 'Ad Copies & Briefs Generated', 'Campaign Monitored & Analyzed'],
    relatedAgents: ['business-intelligence-agent', 'sales-agent', 'whatsapp-agent'],
    relatedSolutions: ['digital-marketing', 'lead-generation', 'digital-transformation'],
    relatedUseCases: ['real-estate-lead-qualification', 'real-estate-whatsapp-automation'],
    relatedResources: ['ai-for-real-estate', 'what-is-an-ai-agent'],
    simulation: {
      type: 'marketing_brief',
      campaign: 'Jai Nagar (Trichy Airport Corridor) Campaign Brief',
      angles: [
        { angle: 'Location & Connectivity', headline: '“Just 5 Minutes to Trichy International Airport — Prime DTCP Villa Plots”' },
        { angle: 'Water & Living Security', headline: '“Pure Sweet Drinking Groundwater at 25 Feet with Immediate Sub-division Patta”' },
        { angle: 'Investment Growth', headline: '“High-Growth Airport Corridor with Rapid Infrastructure Expansion and High Appreciation”' }
      ]
    }
  }
];

export const AI_USE_CASES = [
  {
    id: 'real-estate-lead-qualification',
    slug: 'real-estate-lead-qualification',
    title: 'Real Estate Lead Qualification',
    badge: 'Sales Acceleration',
    headline: 'Screen and Qualify Property Buyers Within 30 Seconds',
    summary: 'Automate initial buyer discovery, budget verification, timeline readiness, and location preferences before routing leads to your sales reps.',
    problem: 'Property developers lose up to 75% of productive sales hours calling unqualified portal leads, wrong numbers, and curious window-shoppers. Meanwhile, high-budget buyers who submit forms in the evening wait 12+ hours for a callback, by which time they have already contacted a competitor.',
    howAiWorks: 'When a new lead arrives from Meta Ads, Google Ads, or your website, the AI Sales Agent immediately initiates a conversational discovery session via WhatsApp or SMS. It asks 3 to 4 natural questions to identify budget range, intended usage (self-construction vs investment), timeline (immediate vs 6 months), and preferred corridor. It validates phone number responsiveness, tags the lead score in your CRM, and instantly notifies the senior sales executive when a high-priority buyer is ready.',
    workflow: [
      { step: 1, title: 'Inbound Lead Arrives', desc: 'Prospective buyer submits an enquiry form on Meta Ads or website.' },
      { step: 2, title: 'Instant 10-Second Engagement', desc: 'AI initiates friendly WhatsApp/SMS greeting with layout details.' },
      { step: 3, title: 'Natural Qualification Dialogue', desc: 'Captures budget, plot size preference, and construction timeline.' },
      { step: 4, title: 'CRM Scoring & Tagging', desc: 'Record enriched with intent tags and assigned to designated sales rep.' },
      { step: 5, title: 'Warm Sales Rep Handover', desc: 'Sales rep calls an already qualified, primed buyer with complete context.' }
    ],
    humanHandover: 'The AI does not negotiate pricing or push closing terms. The moment a prospect is confirmed as qualified (e.g. Budget ₹25L+, buying within 60 days) or requests a custom phone conversation, the assigned sales manager is alerted via WhatsApp with the buyer’s full profile summary.',
    businessMetrics: [
      { label: 'First Response Time', before: '4 to 12 Hours', after: '< 30 Seconds' },
      { label: 'Sales Rep Productive Hours', before: '25% on qualified buyers', after: '80% on qualified buyers' },
      { label: 'Cost Per Qualified Lead', before: 'High (due to wasted calls)', after: '35% to 50% Lower' }
    ],
    faqs: [
      {
        question: 'Does the AI speak or text in Tamil as well as English?',
        answer: 'Yes. The qualification flow understands and communicates seamlessly in English, Tamil, and colloquial Tanglish, making buyers across Tamil Nadu feel comfortable.'
      },
      {
        question: 'Can we customize the qualification questions for our specific layout?',
        answer: 'Absolutely. You define the exact qualifying thresholds—such as minimum budget, plot size preference (e.g. 1,200 sq.ft vs 2,400 sq.ft), and bank loan requirement.'
      },
      {
        question: 'What happens if a buyer enters an invalid phone number?',
        answer: 'The system flags the lead as uncontactable in your CRM and excludes it from sales rep task queues, saving your team from dialing dead ends.'
      }
    ],
    relatedAgents: ['sales-agent', 'whatsapp-agent', 'crm-copilot'],
    ctaText: 'Implement Lead Qualification AI'
  },
  {
    id: 'real-estate-whatsapp-automation',
    slug: 'real-estate-whatsapp-automation',
    title: 'Real Estate WhatsApp Automation',
    badge: 'Customer Communication',
    headline: 'Turn WhatsApp Into an Instant 24/7 Property Sales Desk',
    summary: 'Deliver layout plans, brochures, pricing slabs, and location pins within 5 seconds on official WhatsApp Business APIs.',
    problem: 'Over 85% of real estate inquiries in Tamil Nadu prefer communicating on WhatsApp. However, when sales teams manage WhatsApp manually from personal phones, brochures are delayed, customer numbers are lost, and conversations go unanswered after 7 PM or on weekends.',
    howAiWorks: 'Built on the official Meta WhatsApp Business Cloud API, our WhatsApp Agent responds within 5 seconds to incoming chats. It delivers high-resolution master layout plans, DTCP sanction certificates, video walkthroughs, and Google Maps pins automatically based on the customer\'s specific query. It qualifies buyer requirements conversationally and allows human reps to step into the conversation at any moment.',
    workflow: [
      { step: 1, title: 'Click-to-WhatsApp Ad Click', desc: 'Buyer clicks a WhatsApp button from a Facebook ad or website.' },
      { step: 2, title: '5-Second Automated Welcome', desc: 'Delivers project overview and interactive options (Layout, Price, Map).' },
      { step: 3, title: 'Collateral Delivery', desc: 'Sends verified layout PDF and Google Maps live location pin.' },
      { step: 4, title: 'Intent Qualification', desc: 'Asks if customer would like a free site visit cab this weekend.' },
      { step: 5, title: 'Live Team Notification', desc: 'If customer requests a call or site visit, sales rep takes over.' }
    ],
    humanHandover: 'Your sales executives can view the live chat dashboard or WhatsApp web interface at any time. When a human sends a message, the AI automatically pauses its workflow, ensuring a smooth, natural transition without message collision.',
    businessMetrics: [
      { label: 'Brochure Delivery Speed', before: '1 to 6 Hours', after: '< 5 Seconds' },
      { label: 'Weekend Inquiry Capture', before: '40% lost to delay', after: '100% Captured Instantly' },
      { label: 'Customer Satisfaction Rate', before: 'Average', after: 'Over 92% Positive' }
    ],
    faqs: [
      {
        question: 'Is this using the official WhatsApp Business API or unauthorized tools?',
        answer: 'It uses 100% official Meta WhatsApp Cloud APIs with official Green Tick verification readiness, ensuring your phone numbers never risk being banned.'
      },
      {
        question: 'Can buyers ask questions about bank loans and DTCP approvals?',
        answer: 'Yes. The agent is loaded with your verified project facts and answers questions about approved banks (SBI, HDFC, etc.) and registration procedures accurately.'
      },
      {
        question: 'Can sales reps still text customers manually from the same number?',
        answer: 'Yes. The unified inbox allows multiple sales executives to view and participate in chats simultaneously with full conversation history.'
      }
    ],
    relatedAgents: ['whatsapp-agent', 'sales-agent', 'customer-support-agent'],
    ctaText: 'Set Up WhatsApp Automation'
  },
  {
    id: 'real-estate-lead-follow-up',
    slug: 'real-estate-lead-follow-up',
    title: 'Real Estate Lead Follow-Up Automation',
    badge: 'Pipeline Retention',
    headline: 'Systematic 30-Day Multi-Touch Follow-Up Without Staff Burnout',
    summary: 'Prevent lead drop-offs by executing structured, friendly follow-up cadences with video walkthroughs, price updates, and site visit invites.',
    problem: 'The average property purchase cycle in Tamil Nadu spans 3 to 10 weeks. Yet industry studies show 72% of sales executives stop following up after just 2 attempts. Promoters spend lakhs generating leads only to let them freeze due to human follow-up fatigue.',
    howAiWorks: 'The AI Follow-Up Agent orchestrates a respectful, automated 30-day follow-up rhythm across WhatsApp and SMS. Instead of sending generic "Are you interested?" spam, it provides genuine ongoing value: Day 1 layout details, Day 3 groundwater test report, Day 7 drone infrastructure video, Day 14 bank approval notice, and Day 21 corner plot availability update. When the buyer replies, the assigned salesperson is alerted immediately.',
    workflow: [
      { step: 1, title: 'Inactivity Triggered', desc: 'No customer contact or CRM stage change recorded for 48 hours.' },
      { step: 2, title: 'Value Touchpoint 1 (Day 3)', desc: 'Sends drone video walkthrough showing blacktop road construction.' },
      { step: 3, title: 'Value Touchpoint 2 (Day 7)', desc: 'Shares sweet drinking groundwater lab test and aquifer depth facts.' },
      { step: 4, title: 'Value Touchpoint 3 (Day 14)', desc: 'Invites customer to weekend site visit with complimentary cab.' },
      { step: 5, title: 'Reactivation Alert', desc: 'Buyer responds; assigned executive notified to conduct direct callback.' }
    ],
    humanHandover: 'The AI follow-up sequence is paused the instant the customer responds or when a sales rep logs a call. The rep receives the complete context of which messages the buyer read and clicked.',
    businessMetrics: [
      { label: 'Follow-Up Adherence', before: 'Less than 30%', after: '100% Guaranteed Cadence' },
      { label: 'Old Lead Re-engagement', before: '< 5%', after: '18% to 26% Revived' },
      { label: 'Sales Rep Time Saved', before: '15 hrs/week in manual follow-up', after: 'Saved for on-site visits' }
    ],
    faqs: [
      {
        question: 'Will the messages feel like annoying automated spam?',
        answer: 'No. Every message is designed as a short, respectful, value-driven update with high-quality media (e.g. photos of newly tarred roads, bank sanction updates) rather than pushy sales slogans.'
      },
      {
        question: 'What if the customer asks to stop receiving messages?',
        answer: 'The system recognizes opt-out requests ("Not interested", "Stop", "Purchased elsewhere") immediately and updates CRM suppression lists automatically.'
      },
      {
        question: 'Does this integrate with our current CRM?',
        answer: 'Yes, it works seamlessly with Zoho, HubSpot, Salesforce, or Nam Nilam Cloud CRM via simple webhook triggers.'
      }
    ],
    relatedAgents: ['follow-up-agent', 'sales-agent', 'calling-agent'],
    ctaText: 'Activate Automated Follow-Up'
  },
  {
    id: 'old-lead-reactivation',
    slug: 'old-lead-reactivation',
    title: 'Dormant & Old Lead Reactivation',
    badge: 'Database Monetization',
    headline: 'Unlock Hidden Sales From 1,000+ Dormant Leads Already in Your Database',
    summary: 'Re-engage older property inquiries from past quarters through conversational voice and WhatsApp campaigns for new project launches.',
    problem: 'Real estate companies accumulate thousands of past leads from earlier campaigns that sit completely dormant in spreadsheets. Hiring human telecallers to call 1,000 past leads takes weeks, costs thousands in salary, and produces inconsistent results.',
    howAiWorks: 'The AI Calling Agent and WhatsApp Agent execute structured reactivation campaigns across historical lead lists. They reach out conversationally with news of a new layout launch, special price revision, or new DTCP approval milestone. The AI identifies prospects who are actively looking to buy property right now, passing warm, interested prospects directly to your sales team.',
    workflow: [
      { step: 1, title: 'Dormant Segment Uploaded', desc: 'Upload 500 to 2,000 historical leads from previous campaigns.' },
      { step: 2, title: 'Contextual Multi-Channel Ping', desc: 'AI sends WhatsApp update announcing newly launched phase or road connectivity.' },
      { step: 3, title: 'AI Voice Verification', desc: 'AI telecaller places friendly discovery calls to non-responsive contacts.' },
      { step: 4, title: 'Interest Screening', desc: 'Categorizes contacts into "Actively Looking", "Bought Elsewhere", or "Invalid".' },
      { step: 5, title: 'Fresh Sales Opportunity', desc: 'Delivers warm, verified buyers directly into the active sales pipeline.' }
    ],
    humanHandover: 'Sales reps receive a curated list of reactivated buyers who have explicitly confirmed current interest, complete with updated budget and corridor preferences.',
    businessMetrics: [
      { label: 'Reactivation Yield', before: '1-2% manual yield', after: '8% to 15% Qualified Pipeline' },
      { label: 'Reactivation Cost', before: '₹120+ per contact attempt', after: 'Over 70% Cheaper' },
      { label: 'Time to Process 1,000 Leads', before: '3 to 4 Weeks', after: '48 to 72 Hours' }
    ],
    faqs: [
      {
        question: 'Can we run this for a newly launched layout in Trichy?',
        answer: 'Yes, this is ideal when launching a new layout corridor (e.g. Airport or Samayapuram), re-engaging past inquiries who were looking in nearby micro-markets.'
      },
      {
        question: 'How do you handle DND and regulatory compliance?',
        answer: 'Historical lists are pre-screened against regulatory requirements, and all communication provides clear opt-out options in accordance with telecommunications standards.'
      }
    ],
    relatedAgents: ['calling-agent', 'whatsapp-agent', 'sales-agent'],
    ctaText: 'Reactivate Dormant Leads'
  },
  {
    id: 'real-estate-sales-automation',
    slug: 'real-estate-sales-automation',
    title: 'End-to-End Real Estate Sales Automation',
    badge: 'Full Operational Stack',
    headline: 'Systemize Your Sales Pipeline From First Inquiry to Registry Day',
    summary: 'Unify lead capture, round-robin assignment, automatic task scheduling, and executive performance tracking into one synchronized system.',
    problem: 'Sales teams operate with paper diaries, disconnected WhatsApp chats, and forgotten follow-up promises. Promoters have no visibility on sales rep conversion ratios, and deals fall through the cracks without warning.',
    howAiWorks: 'Synchronizes your entire sales operations: incoming inquiries are automatically distributed to sales reps via round-robin or territory logic; automated tasks and WhatsApp calendar reminders are sent for every site visit; price quotes and payment schedules are generated automatically; and executive dashboards report real-time booking conversion rates.',
    workflow: [
      { step: 1, title: 'Unified Lead Capture', desc: 'Inquiries from all channels aggregated in real time.' },
      { step: 2, title: 'Smart Distribution', desc: 'Leads assigned to executive based on availability and performance.' },
      { step: 3, title: 'Automated Sales Tasks', desc: 'Follow-up schedules and site visit tasks generated automatically.' },
      { step: 4, title: 'Document & Quote Engine', desc: 'Instant calculation of plot cost, guideline value, and stamp duty.' },
      { step: 5, title: 'Executive BI Visibility', desc: 'Promoter tracks cost-per-lead, visit conversion, and cash collections.' }
    ],
    humanHandover: 'Humans focus entirely on building relationships, showing plots on-site, answering legal questions, and closing deals. Technology handles documentation, scheduling, and tracking.',
    businessMetrics: [
      { label: 'Average Sales Cycle Time', before: '45 Days', after: '24 Days (45% Faster)' },
      { label: 'Lead Leakage Rate', before: 'Up to 30%', after: 'Near Zero (< 3%)' },
      { label: 'Executive Accountability', before: 'Low visibility', after: '100% Real-Time Pipeline Tracking' }
    ],
    faqs: [
      {
        question: 'Does this require replacing our existing sales executives?',
        answer: 'Not at all. This system empowers your existing team by eliminating tedious clerical work and letting them focus on what humans do best: building trust and closing transactions.'
      },
      {
        question: 'How long does implementation take for a 20-acre layout?',
        answer: 'Our standard deployment takes between 7 to 14 business days, including CRM customization, WhatsApp workflow testing, and team training.'
      }
    ],
    relatedAgents: ['crm-copilot', 'morning-brief', 'revenue-leakage-agent'],
    ctaText: 'Deploy Sales Automation'
  },
  {
    id: 'site-visit-follow-up',
    slug: 'site-visit-follow-up',
    title: 'Site Visit Follow-Up & Booking Acceleration',
    badge: 'Conversion Booster',
    headline: 'Turn Completed Site Visits Into Registered Buyers',
    summary: 'Automate post-visit feedback, document delivery, bank loan verification, and booking token follow-ups within 24 hours of on-site inspection.',
    problem: 'A buyer attends a site visit on Sunday, likes a specific corner plot, but hears nothing from the sales rep on Monday because the rep is exhausted or busy. By Wednesday, the buyer\'s excitement cools down or family members raise unanswered doubts.',
    howAiWorks: 'The moment a site visit is marked completed in the CRM, the AI triggers an immediate post-visit protocol. It thanks the customer, delivers the specific plot layout dimensions, sends the parent deed legal verification summary, shares the pre-approved bank loan options, and invites the buyer for a token confirmation meeting. It monitors buyer responses and alerts the sales manager if a post-visit buyer is left uncontacted for more than 24 hours.',
    workflow: [
      { step: 1, title: 'Visit Marked Complete', desc: 'Executive marks site visit done on mobile CRM with shortlisted plot number.' },
      { step: 2, title: 'Instant Post-Visit Package', desc: 'Delivers high-res plot survey sketch, road width details, and pricing via WhatsApp.' },
      { step: 3, title: 'Legal & Bank Sanction Dossier', desc: 'Sends DTCP approval copy and SBI / HDFC loan sanction checklist.' },
      { step: 4, title: '24-Hour Feedback Check', desc: 'Politely checks if buyer has questions regarding registration or token advance.' },
      { step: 5, title: 'Closing Meeting Scheduled', desc: 'Sales head steps in to finalize booking token and registry schedule.' }
    ],
    humanHandover: 'The senior sales manager or promoter is alerted immediately to schedule the final in-office discussion or advance payment token collection.',
    businessMetrics: [
      { label: 'Visit-to-Booking Ratio', before: '1 in 8 visits', after: '1 in 4 to 5 visits' },
      { label: 'Post-Visit Follow-Up Latency', before: '48 to 72 Hours', after: '< 2 Hours' },
      { label: 'Customer Trust Rating', before: 'Variable', after: 'Consistently Superior' }
    ],
    faqs: [
      {
        question: 'Can this send customized price breakdowns including stamp duty and registration?',
        answer: 'Yes. The system automatically computes the complete on-road cost including 9% Tamil Nadu stamp duty and sub-registrar registration charges.'
      },
      {
        question: 'What if the buyer wants to change the plot selection?',
        answer: 'The system allows easy reassignment to an alternate plot number and regenerates the customized plot layout dossier in seconds.'
      }
    ],
    relatedAgents: ['follow-up-agent', 'whatsapp-agent', 'crm-copilot'],
    ctaText: 'Accelerate Site Visit Conversions'
  }
];
