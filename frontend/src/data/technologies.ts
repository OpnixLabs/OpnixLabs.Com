export interface TechnologyData {
  slug: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'AI & Data' | 'Enterprise' | 'Mobile';
  iconName?: string;
  heroTitle: string;
  heroSubtitle: string;
  metaDescription: string;
  keywords: string[];
  overviewTitle: string;
  overviewText: string;
  keyBenefits: string[];
  testimonialQuote: {
    quote: string;
    author: string;
    role: string;
  };
  statBoxes: { label: string; value: string }[];
  capabilities: { title: string; desc: string }[];
  popularFrameworks: string[];
  faqs: { question: string; answer: string }[];
  featuredCaseStudySlug?: string;
}

export interface TechItemSummary {
  name: string;
  slug: string;
  category: string;
  badgeText?: string;
}

// Complete A-Z Technology Directory matching BairesDev screenshot
export const allAZTechnologies: TechItemSummary[] = [
  // A
  { name: 'AI', slug: 'ai', category: 'AI & Data' },
  { name: 'Android', slug: 'kotlin', category: 'Mobile' },
  { name: 'Angular', slug: 'angular', category: 'Frontend' },
  { name: 'Apache Kafka', slug: 'node-js', category: 'Backend' },
  { name: 'API Development', slug: 'node-js', category: 'Backend' },
  { name: 'AWS', slug: 'aws', category: 'Cloud & DevOps' },
  { name: 'Azure', slug: 'azure', category: 'Cloud & DevOps' },

  // B
  { name: 'BigQuery', slug: 'gcp', category: 'AI & Data' },
  { name: 'Bootstrap', slug: 'react', category: 'Frontend' },

  // C
  { name: 'C#', slug: 'csharp', category: 'Backend' },
  { name: 'C++', slug: 'cpp', category: 'Backend' },
  { name: 'Cassandra', slug: 'python', category: 'AI & Data' },
  { name: 'Clojure', slug: 'java', category: 'Backend' },
  { name: 'ColdFusion', slug: 'java', category: 'Backend' },
  { name: 'CouchDB', slug: 'node-js', category: 'Backend' },

  // D
  { name: 'Django', slug: 'django', category: 'Backend' },
  { name: 'Docker', slug: 'aws', category: 'Cloud & DevOps' },
  { name: '.NET Core', slug: 'dotnet', category: 'Backend' },
  { name: 'DynamoDB', slug: 'aws', category: 'Cloud & DevOps' },

  // E
  { name: 'Elasticsearch', slug: 'python', category: 'AI & Data' },
  { name: 'Express.js', slug: 'node-js', category: 'Backend' },

  // F
  { name: 'FastAPI', slug: 'python', category: 'Backend' },
  { name: 'Flutter', slug: 'kotlin', category: 'Mobile' },

  // G
  { name: 'Golang', slug: 'golang', category: 'Backend' },
  { name: 'Google Cloud (GCP)', slug: 'gcp', category: 'Cloud & DevOps' },
  { name: 'GraphQL', slug: 'react', category: 'Frontend' },

  // H
  { name: 'Hadoop', slug: 'python', category: 'AI & Data' },
  { name: 'HTML5 / CSS3', slug: 'react', category: 'Frontend' },

  // I
  { name: 'iOS Development', slug: 'kotlin', category: 'Mobile' },
  { name: 'Ionic', slug: 'react', category: 'Mobile' },

  // J
  { name: 'Java', slug: 'java', category: 'Backend' },
  { name: 'JavaScript', slug: 'javascript', category: 'Frontend' },
  { name: 'Jest', slug: 'react', category: 'Frontend' },

  // K
  { name: 'Kotlin', slug: 'kotlin', category: 'Mobile' },
  { name: 'Kubernetes', slug: 'aws', category: 'Cloud & DevOps' },

  // L
  { name: 'Laravel', slug: 'php', category: 'Backend' },
  { name: 'LLM & LangChain', slug: 'python', category: 'AI & Data' },

  // M
  { name: 'Machine Learning', slug: 'machine-learning', category: 'AI & Data' },
  { name: 'MongoDB', slug: 'node-js', category: 'Backend' },
  { name: 'MySQL', slug: 'python', category: 'Backend' },

  // N
  { name: 'Next.js', slug: 'react', category: 'Frontend' },
  { name: 'Node.js', slug: 'node-js', category: 'Backend' },
  { name: 'Nuxt.js', slug: 'vue-js', category: 'Frontend' },

  // P
  { name: 'PHP', slug: 'php', category: 'Backend' },
  { name: 'PostgreSQL', slug: 'python', category: 'Backend' },
  { name: 'Power BI', slug: 'power-bi', category: 'AI & Data' },
  { name: 'Python', slug: 'python', category: 'Backend' },

  // R
  { name: 'React.js', slug: 'react', category: 'Frontend' },
  { name: 'React Native', slug: 'react', category: 'Mobile' },
  { name: 'Redis', slug: 'golang', category: 'Backend' },
  { name: 'Ruby on Rails', slug: 'ruby', category: 'Backend' },

  // S
  { name: 'Salesforce', slug: 'salesforce', category: 'Enterprise' },
  { name: 'Selenium', slug: 'python', category: 'Backend' },
  { name: 'Spring Boot', slug: 'java', category: 'Backend' },
  { name: 'Swift', slug: 'kotlin', category: 'Mobile' },

  // T
  { name: 'Tailwind CSS', slug: 'react', category: 'Frontend' },
  { name: 'TensorFlow / PyTorch', slug: 'python', category: 'AI & Data' },
  { name: 'Terraform', slug: 'aws', category: 'Cloud & DevOps' },
  { name: 'TypeScript', slug: 'typescript', category: 'Frontend' },

  // V
  { name: 'Vue.js', slug: 'vue-js', category: 'Frontend' },

  // X
  { name: 'Xamarin', slug: 'xamarin', category: 'Mobile' },
];

export const popularTechnologies = [
  { name: '.NET', slug: 'dotnet', category: 'Backend' },
  { name: 'AWS', slug: 'aws', category: 'Cloud & DevOps' },
  { name: 'Django', slug: 'django', category: 'Backend' },
  { name: 'Java', slug: 'java', category: 'Backend' },
  { name: 'Machine Learning', slug: 'machine-learning', category: 'AI & Data' },
  { name: 'PHP', slug: 'php', category: 'Backend' },
  { name: 'React', slug: 'react', category: 'Frontend' },
  { name: 'TypeScript', slug: 'typescript', category: 'Frontend' },
  { name: 'AI', slug: 'ai', category: 'AI & Data' },
  { name: 'C#', slug: 'csharp', category: 'Backend' },
  { name: 'Golang', slug: 'golang', category: 'Backend' },
  { name: 'JavaScript', slug: 'javascript', category: 'Frontend' },
  { name: 'Microsoft Azure', slug: 'azure', category: 'Cloud & DevOps' },
  { name: 'Power BI', slug: 'power-bi', category: 'AI & Data' },
  { name: 'Ruby', slug: 'ruby', category: 'Backend' },
  { name: 'Vue.js', slug: 'vue-js', category: 'Frontend' },
  { name: 'Angular', slug: 'angular', category: 'Frontend' },
  { name: 'C++', slug: 'cpp', category: 'Backend' },
  { name: 'Google Cloud', slug: 'gcp', category: 'Cloud & DevOps' },
  { name: 'Kotlin', slug: 'kotlin', category: 'Backend' },
  { name: 'Node.js', slug: 'node-js', category: 'Backend' },
  { name: 'Python', slug: 'python', category: 'Backend' },
  { name: 'Salesforce', slug: 'salesforce', category: 'Enterprise' },
  { name: 'Xamarin', slug: 'xamarin', category: 'Frontend' },
];

export const technologiesData: Record<string, TechnologyData> = {
  react: {
    slug: 'react',
    name: 'React.js',
    category: 'Frontend',
    heroTitle: "Hire Senior React.js Developers Trusted by the World's Leading Brands",
    heroSubtitle:
      'Scale your engineering team with top 1% nearshore React developers. Build sub-second Web Apps, Next.js portals, and enterprise SaaS platforms effortlessly.',
    metaDescription:
      'Hire top 1% React.js software developers from OpnixLabs. Senior front-end engineers specializing in Next.js, Redux, Tailwind, and scalable web apps.',
    keywords: [
      'Hire React Developers',
      'React.js Software Engineers',
      'Hire Next.js Developers',
      'Front-End Staff Augmentation',
      'OpnixLabs React Engineering',
    ],
    overviewTitle: 'Accelerate Product Velocity with Senior React Specialists',
    overviewText:
      'React.js is the backbone of modern web applications. At OpnixLabs, our senior React.js engineers craft high-throughput, component-driven user interfaces optimized for zero layout shifts and sub-100ms load times.',
    keyBenefits: [
      'Top 1% vetted React & Next.js engineers with 5+ years experience.',
      'Sub-24 hour candidate matching & rapid onboarding.',
      'Timezone-aligned dedicated teams operating within your workflow.',
      'Strict adherence to TypeScript, automated testing, and CI/CD pipelines.',
    ],
    testimonialQuote: {
      quote:
        'The OpnixLabs React engineering team integrated into our sprint cycles seamlessly. They overhauled our web app UI and boosted conversion rates by 38%.',
      author: 'David Reynolds',
      role: 'VP of Engineering, SaaS Platform',
    },
    statBoxes: [
      { label: 'Client Retention Rate', value: '98.5%' },
      { label: 'Avg Seniority Level', value: '6+ Yrs' },
      { label: 'Timezone Coverage', value: '24/7' },
      { label: 'Lighthouse Score SLA', value: '95+' },
    ],
    capabilities: [
      {
        title: 'Single Page Applications (SPAs)',
        desc: 'Custom React SPAs engineered with client-side routing, state management, and optimized bundle sizes.',
      },
      {
        title: 'Next.js & Server Side Rendering (SSR)',
        desc: 'Production-ready Next.js App Router implementations with static generation and ISR revalidation.',
      },
      {
        title: 'Design System & Component Libraries',
        desc: 'Reusable, accessible UI component libraries using Tailwind CSS, Storybook, and Radix UI.',
      },
      {
        title: 'Micro-Frontend Architectures',
        desc: 'Decoupled frontend systems allowing autonomous teams to deploy independent UI features.',
      },
    ],
    popularFrameworks: ['Next.js', 'Redux Toolkit', 'Tailwind CSS', 'TypeScript', 'Jest', 'Zustand'],
    faqs: [
      {
        question: 'How quickly can I hire senior React developers from OpnixLabs?',
        answer:
          'We provide pre-screened senior React developer profiles within 24 to 48 hours, allowing you to start interviews immediately.',
      },
      {
        question: 'What engagement models do you support for React projects?',
        answer:
          'We offer flexible software staff augmentation, dedicated agile engineering squads, and end-to-end project deliverables.',
      },
      {
        question: 'Do your React developers write unit and integration tests?',
        answer:
          'Yes. All OpnixLabs React engineers practice test-driven development (TDD) using Jest, React Testing Library, and Cypress.',
      },
    ],
    featuredCaseStudySlug: 'consumeraffairs',
  },

  python: {
    slug: 'python',
    name: 'Python',
    category: 'Backend',
    heroTitle: "Hire Senior Python Developers Trusted by Global Enterprises",
    heroSubtitle:
      'Engineers skilled in Django, Fast API, AI/ML pipelines, and cloud microservices. Access top 1% Python talent ready to accelerate your tech roadmap.',
    metaDescription:
      'Hire expert Python software engineers from OpnixLabs. Specialized in Django, FastAPI, Data Engineering, Machine Learning, and Enterprise APIs.',
    keywords: [
      'Hire Python Developers',
      'Python Software Engineers',
      'Django Developers for Hire',
      'FastAPI Engineers',
      'OpnixLabs Python Solutions',
    ],
    overviewTitle: 'High-Performance Python Architectures for Modern SaaS',
    overviewText:
      'Python powers complex data systems, backend APIs, and artificial intelligence models. Our senior Python developers build resilient microservices and automated workflows tailored to enterprise compliance standards.',
    keyBenefits: [
      'Expertise in Django, FastAPI, Flask, and AsyncIO backend architectures.',
      'Seamless integration with AWS, Azure, PostgreSQL, and Redis databases.',
      'AI/ML integration using PyTorch, TensorFlow, and OpenAI APIs.',
      'Zero risk 14-day trial period for staff augmentation roles.',
    ],
    testimonialQuote: {
      quote:
        'OpnixLabs Python engineers redesigned our data processing backend, reducing API latency from 450ms down to sub-50ms.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer',
    },
    statBoxes: [
      { label: 'API Uptime SLA', value: '99.99%' },
      { label: 'Average Latency', value: '<50ms' },
      { label: 'Vetted Candidates', value: 'Top 1%' },
      { label: 'Projects Shipped', value: '120+' },
    ],
    capabilities: [
      {
        title: 'RESTful & GraphQL API Engineering',
        desc: 'Stateless FastAPI and Django REST microservices handling millions of incoming requests daily.',
      },
      {
        title: 'Data Pipelines & Web Scraping',
        desc: 'Scalable data collection, ETL pipelines, Celery background queues, and analytics processing.',
      },
      {
        title: 'AI & Machine Learning Integration',
        desc: 'Custom LLM fine-tuning, predictive modeling, and vector database search implementations.',
      },
      {
        title: 'Legacy Python Codebase Refactoring',
        desc: 'Upgrading legacy Python 2/3 codebases to modern async frameworks with complete test coverage.',
      },
    ],
    popularFrameworks: ['Django', 'FastAPI', 'Flask', 'Celery', 'PyTorch', 'Pandas', 'PostgreSQL'],
    faqs: [
      {
        question: 'What Python frameworks do your engineers specialize in?',
        answer:
          'Our senior engineers specialize in Django, FastAPI, Flask, Celery asynchronous workers, and SQLAlchemy ORM.',
      },
      {
        question: 'Can your Python developers help with AI and Data Science projects?',
        answer:
          'Yes! We have dedicated Python AI/ML engineers experienced in PyTorch, Scikit-learn, LangChain, and OpenAI API integrations.',
      },
    ],
    featuredCaseStudySlug: 'consumeraffairs',
  },
};

export function getTechnologyDataBySlug(slug: string): TechnologyData | null {
  const normalized = slug.toLowerCase().trim();
  if (technologiesData[normalized]) {
    return technologiesData[normalized];
  }

  const match = allAZTechnologies.find((t) => t.slug === normalized) || popularTechnologies.find((t) => t.slug === normalized);
  if (match) {
    return {
      slug: match.slug,
      name: match.name,
      category: match.category as any,
      heroTitle: `Hire Senior ${match.name} Developers Trusted by World's Leading Brands`,
      heroSubtitle: `Scale your software engineering team with top 1% ${match.name} developers. Access pre-screened senior talent ready to join your agile sprints immediately.`,
      metaDescription: `Hire senior ${match.name} software developers from OpnixLabs. Dedicated developers, staff augmentation, and enterprise digital solutions.`,
      keywords: [`Hire ${match.name} Developers`, `${match.name} Engineers for Hire`, `OpnixLabs ${match.name} Team`],
      overviewTitle: `Accelerate Innovation with Senior ${match.name} Engineers`,
      overviewText: `OpnixLabs provides top 1% nearshore ${match.name} developers tailored to your enterprise tech stack. Our engineers undergo rigorous technical and soft-skill vetting.`,
      keyBenefits: [
        `Pre-vetted senior ${match.name} engineers with 5+ years experience.`,
        'Rapid onboarding within 24 to 48 hours.',
        'Timezone aligned to fit into your active sprint workflows.',
        'Strict test coverage and modern architectural principles.',
      ],
      testimonialQuote: {
        quote: `The ${match.name} developers provided by OpnixLabs fit seamlessly into our core engineering squad and accelerated our product delivery timeline.`,
        author: 'Enterprise Technical Lead',
        role: 'Software Partner',
      },
      statBoxes: [
        { label: 'Client Satisfaction', value: '98.5%' },
        { label: 'Avg Seniority', value: '6+ Yrs' },
        { label: 'Talent Acceptance', value: 'Top 1%' },
        { label: 'Uptime SLA', value: '99.99%' },
      ],
      capabilities: [
        {
          title: `Custom ${match.name} Software Development`,
          desc: `End-to-end architecture and implementation of scalable ${match.name} web applications and services.`,
        },
        {
          title: 'System Modernization & Refactoring',
          desc: 'Upgrading legacy infrastructure to clean, maintainable modular architectures.',
        },
        {
          title: 'Staff Augmentation & Dedicated Squads',
          desc: 'Flexible hiring models giving you immediate access to senior engineers.',
        },
      ],
      popularFrameworks: [match.name, 'TypeScript', 'Docker', 'PostgreSQL', 'AWS'],
      faqs: [
        {
          question: `How quickly can we start working with ${match.name} developers?`,
          answer: `We introduce candidate profiles within 24-48 hours. Once selected, developers integrate into your team immediately.`,
        },
      ],
      featuredCaseStudySlug: 'blackboard',
    };
  }

  return null;
}
