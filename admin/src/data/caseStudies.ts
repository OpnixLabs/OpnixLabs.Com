export interface CaseStudyData {
  slug: string;
  title: string;
  clientName: string;
  category: string;
  metaDescription: string;
  keywords: string[];
  
  // Hero section
  heroCategoryText: string;
  heroTitle: string;
  heroImage?: string;

  // Summary section
  summaryTitle: string;
  summaryText: string;
  clientBrandName: string;
  engagementLengthValue: string;
  engagementLengthUnit: string;
  engagementLengthLabel: string;
  frontEndTechTags: string[];
  engagementType: string;

  // Quote Banner (if present)
  quoteBanner?: {
    quote: string;
    author: string;
    avatarImage?: string;
  };

  // About Client banner
  aboutClientHeading: string;
  aboutClientText: string;

  // Challenge section
  challengeTitle: string;
  challengeParagraphs: string[];
  challengeCalloutQuote: string;

  // Solution section
  solutionTitle: string;
  solutionSubtitle: string;
  technologiesTitle: string;
  technologies: string[];

  // Outcome section
  outcomeTitle: string;
  outcomeSubtitle: string;
  outcomeBullets: { text: string }[];
  outcomeImage: string;

  // Navigation
  previousCaseStudy?: {
    slug: string;
    text: string;
    clientName: string;
  };
  nextCaseStudy?: {
    slug: string;
    text: string;
    clientName: string;
  };

  // CTA Section
  ctaHeading: string;
  ctaSubheading: string;
  ctaButtonText: string;
}

export const caseStudies: CaseStudyData[] = [
  {
    slug: 'blackboard',
    title: 'Blackboard Case Study - OpnixLabs',
    clientName: 'Blackboard',
    category: 'EdTech & LMS',
    metaDescription:
      'Blackboard needed to scale its LMS development. Discover how OpnixLabs provided top 1% nearshore engineers, enhanced ServiceNow processes, and integrated Salesforce.',
    keywords: [
      'Blackboard Case Study',
      'EdTech Software Engineering',
      'LMS Cloud Scalability',
      'OpnixLabs Case Studies',
      'ServiceNow Integration',
      'Salesforce Integration',
      'Staff Augmentation',
    ],
    heroCategoryText: 'CASE STUDY > BLACKBOARD',
    heroTitle: 'Building Custom Tech Solutions for an Established EdTech Brand',
    heroImage: '/images/hero.png',

    summaryTitle: 'The summary.',
    summaryText:
      'Blackboard needed to scale its Learning Management System development. We enhanced system processes through new implementations in ServiceNow, and integrated key functions between Salesforce and tracker systems to streamline support and development.',
    clientBrandName: 'Blackboard',
    engagementLengthValue: '2',
    engagementLengthUnit: 'years',
    engagementLengthLabel: 'Engagement length',
    frontEndTechTags: ['Salesforce', '.NET', 'Java'],
    engagementType: 'Staff Augmentation',

    aboutClientHeading: 'About Blackboard',
    aboutClientText:
      'Blackboard is an educational technology software company known for its learning management system, which provides software for education, higher education, enterprise, and government clients. They enable institution leaders to keep up with the fast pace of change.',

    challengeTitle: 'The challenge.',
    challengeParagraphs: [
      "Blackboard's software is complex, featuring custom solutions for university departments worldwide. Their priority was to scale their LMS development to push the boundaries of e-learning development and innovation.",
      'To maintain growth rate, they turned to OpnixLabs for staff augmentation. They were looking for top nearshore developers to work across different learning projects and internal developer tools.',
    ],
    challengeCalloutQuote:
      'Their priority was to scale their LMS to push the boundaries of e-learning development and innovation.',

    solutionTitle: 'The solution.',
    solutionSubtitle: 'Our rigorous vetting process ensured we provided the top 1% of nearshore engineers.',
    technologiesTitle: 'All technologies used.',
    technologies: ['C#', 'SQL Server', 'Salesforce', '.NET', 'Java', 'Visual Basic', 'ServiceNow'],

    outcomeTitle: 'The outcome.',
    outcomeSubtitle: 'During our engagement, we were involved with:',
    outcomeBullets: [
      { text: 'Maintenance and improvement of their solutions in managed hosting services.' },
      { text: 'Development and testing of scalable and reliable custom software applications.' },
      { text: 'New implementations and processes with ServiceNow.' },
      { text: 'Analysis and design of new processes between systems: Salesforce, tracker integration, support, and development of ServiceNow.' },
      { text: 'Resolution of incidents in ServiceNow instances.' },
    ],
    outcomeImage: '/images/project2.png',

    previousCaseStudy: {
      slug: 'azlo',
      text: 'Read how we helped Azlo.',
      clientName: 'Azlo',
    },
    nextCaseStudy: {
      slug: 'consumeraffairs',
      text: 'Read how we helped ConsumerAffairs.',
      clientName: 'ConsumerAffairs',
    },

    ctaHeading: 'Facing similar challenges to Blackboard?',
    ctaSubheading: 'See how we can help.',
    ctaButtonText: 'Schedule a Call',
  },
  {
    slug: 'consumeraffairs',
    title: 'ConsumerAffairs Case Study - OpnixLabs',
    clientName: 'ConsumerAffairs',
    category: 'MarTech & E-Commerce',
    metaDescription:
      "Improving Consumer Affairs' website UX/UI through front-end development and QA with OpnixLabs nearshore software engineering teams.",
    keywords: [
      'ConsumerAffairs Case Study',
      'UX UI Design Front-End',
      'OpnixLabs Software Engineering',
      'Python Django Development',
      'QA & Selenium Testing',
    ],
    heroCategoryText: 'CASE STUDY > CONSUMERAFFAIRS',
    heroTitle: "Improving Consumer Affairs' website UX/UI through front-end development and QA",
    heroImage: '/images/project2.png',

    summaryTitle: 'The summary.',
    summaryText:
      'Consumer Affairs needed to improve the UX/UI of their website and app. We shaped the UX/UI design to prioritize the usability and performance of their tech.',
    clientBrandName: 'ConsumerAffairs',
    engagementLengthValue: '6',
    engagementLengthUnit: 'years',
    engagementLengthLabel: 'Engagement length',
    frontEndTechTags: ['Python', 'JavaScript'],
    engagementType: 'Staff Augmentation',

    quoteBanner: {
      quote:
        'We chose to work with OpnixLabs because we wanted to have a team that felt like our internal staff and that was split into the active roles we were looking for. We had a close and fluid relationship with the nearshore team at every step of the way.',
      author: 'Vice President of Engineering, ConsumerAffairs',
    },

    aboutClientHeading: 'About Consumer Affairs',
    aboutClientText:
      'ConsumerAffairs is a customer review platform that connects buyers with verified brand reviews, purchasing guides, and buyer intent intelligence.',

    challengeTitle: 'The challenge.',
    challengeParagraphs: [
      'ConsumerAffairs was looking for support in their front-end development and UX/UI design projects. Their primary focus was on the improvement of their customer environment, looking to increase accessibility, user retention, and platform speed.',
      'To achieve their goals, they turned to OpnixLabs for software staff augmentation. They wanted a nearshore team of top developers and QA engineers.',
    ],
    challengeCalloutQuote:
      'ConsumerAffairs needed help with front-end development, UX/UI design, and QA.',

    solutionTitle: 'The solution.',
    solutionSubtitle:
      'Through our staff augmentation engagement model, we provided senior TECH talent. Our specialists undergo a rigorous vetting process that assesses not only their technical expertise, but also their soft skills.',
    technologiesTitle: 'All technologies used.',
    technologies: ['MySQL', 'Django', 'Python', 'JavaScript', 'Selenium', 'HTML5'],

    outcomeTitle: 'The outcome.',
    outcomeSubtitle: 'During our engagement, we were involved with:',
    outcomeBullets: [
      { text: 'Versatile code maintenance, infrastructure, and feature improvements for web applications.' },
      { text: 'Automated test suite execution for regression testing.' },
      { text: 'Impactful UX/UI design and front-end development to maximize conversion and site performance.' },
      { text: 'Smooth cross-functional engineering team partnership.' },
    ],
    outcomeImage: '/images/project1.png',

    previousCaseStudy: {
      slug: 'blackboard',
      text: 'Read how we helped Blackboard.',
      clientName: 'Blackboard',
    },
    nextCaseStudy: {
      slug: 'azlo',
      text: 'Read how we helped Azlo.',
      clientName: 'Azlo',
    },

    ctaHeading: 'Facing similar challenges to Consumer Affairs?',
    ctaSubheading: 'See how we can help.',
    ctaButtonText: 'Schedule a Call',
  },
  {
    slug: 'azlo',
    title: 'Azlo Digital Banking Case Study - OpnixLabs',
    clientName: 'Azlo',
    category: 'FinTech',
    metaDescription: 'Read how OpnixLabs engineered digital banking core microservices and real-time ledger APIs for Azlo.',
    keywords: ['Azlo Case Study', 'FinTech Development', 'OpnixLabs'],
    heroCategoryText: 'CASE STUDY > AZLO',
    heroTitle: 'Scaling Digital Banking Core Microservices for Azlo',
    heroImage: '/images/project1.png',

    summaryTitle: 'The summary.',
    summaryText: 'Azlo required high-throughput FinTech banking microservices and real-time ledger synchronization for 150K+ business accounts.',
    clientBrandName: 'Azlo',
    engagementLengthValue: '3',
    engagementLengthUnit: 'years',
    engagementLengthLabel: 'Engagement length',
    frontEndTechTags: ['Go', 'PostgreSQL', 'React'],
    engagementType: 'Dedicated Software Team',

    aboutClientHeading: 'About Azlo',
    aboutClientText: 'Azlo was a digital business banking platform providing small business owners with fee-free digital accounts and online invoicing.',

    challengeTitle: 'The challenge.',
    challengeParagraphs: ['High-concurrency ACH processing and real-time fraud detection pipelines required zero-latency data indexing.'],
    challengeCalloutQuote: 'Building bank-grade security and sub-100ms ledger response times for business banking.',

    solutionTitle: 'The solution.',
    solutionSubtitle: 'OpnixLabs deployed a senior squad of backend systems engineers and cloud security specialists.',
    technologiesTitle: 'All technologies used.',
    technologies: ['Go', 'PostgreSQL', 'React', 'AWS Lambda', 'Docker', 'Kubernetes'],

    outcomeTitle: 'The outcome.',
    outcomeSubtitle: 'During our engagement, we were involved with:',
    outcomeBullets: [
      { text: 'Architecting core ACH transaction ledger handling over $2B annually.' },
      { text: 'Implementing automated SOC 2 compliance logging.' },
    ],
    outcomeImage: '/images/hero.png',

    previousCaseStudy: { slug: 'consumeraffairs', text: 'Read how we helped ConsumerAffairs.', clientName: 'ConsumerAffairs' },
    nextCaseStudy: { slug: 'blackboard', text: 'Read how we helped Blackboard.', clientName: 'Blackboard' },

    ctaHeading: 'Scaling your FinTech infrastructure?',
    ctaSubheading: 'See how we can help.',
    ctaButtonText: 'Schedule a Call',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return caseStudies.find((cs) => cs.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
