export interface ServiceDetail {
  slug: string;
  title: string;
  name?: string;
  heroTitle: string;
  heroSubtitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  overviewTitle: string;
  overviewSubtitle: string;
  keyBenefits: string[];
  capabilities: {
    title: string;
    description: string;
  }[];
  statBoxes: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  featuredCaseStudies: {
    title: string;
    slug: string;
    category: string;
    summary: string;
    image: string;
    metrics: string;
  }[];
}

export const servicesDetailMap: Record<string, ServiceDetail> = {
  'web-development': {
    slug: 'web-development',
    title: 'Web Development Services',
    heroTitle: 'Top End-to-End Web Development Services for Enterprise Scaling',
    heroSubtitle:
      'Engineered for speed, security, and sub-second rendering. Build custom SaaS portals, modern React/Next.js web applications, and enterprise digital solutions with top 1% nearshore engineers.',
    metaDescription:
      'Hire top 1% web development team from OpnixLabs. Specialized in Next.js, React, Node.js, Python, cloud architectures, and enterprise web applications.',
    keywords: [
      'Web Development Services',
      'Custom Web Application Development',
      'Hire Next.js Developers',
      'Enterprise Web Software Agency',
      'OpnixLabs Web Solutions',
    ],
    category: 'Software Development & Design',
    overviewTitle: 'Scale Product Velocity with High-Performance Web Architecture',
    overviewSubtitle:
      'Modern web applications require more than just clean UI — they demand zero layout shift, sub-100ms API response times, and resilient cloud backends.',
    keyBenefits: [
      'Sub-24 to 48 hour engineer onboarding into your existing sprint workflows.',
      'Top 1% pre-vetted senior front-end and full-stack software architects.',
      'Zero layout shifts, sub-100ms load speeds, and 95+ Google Lighthouse SLA.',
      'Strict adherence to TypeScript, automated testing, and CI/CD pipelines.',
    ],
    capabilities: [
      {
        title: 'Single Page & Progressive Web Apps (SPAs & PWAs)',
        description: 'Interactive, lightning-fast web applications built with React, Next.js, and offline service worker caching.',
      },
      {
        title: 'Custom Enterprise SaaS Platforms',
        description: 'Multi-tenant cloud architectures featuring subscription billing, RBAC security, and automated database sharding.',
      },
      {
        title: 'Headless CMS & Commerce Integration',
        description: 'Decoupled content platforms integrating Shopify, Contentful, Strapi, and Next.js for high conversion rate performance.',
      },
      {
        title: 'API Engineering & Microservices',
        description: 'Stateless GraphQL and RESTful backend APIs designed for high concurrency with zero downtime deployments.',
      },
      {
        title: 'Legacy Monolith Modernization',
        description: 'Refactoring slow, monolithic codebases into agile micro-frontends with 100% test coverage.',
      },
      {
        title: 'Web Security & Compliance Audits',
        description: 'Hardening web apps with OAuth2 authentication, rate limiting, encryption at rest/transit, and SOC2 compliance.',
      },
    ],
    statBoxes: [
      { label: 'Client Retention Rate', value: '98.5%' },
      { label: 'Lighthouse Performance SLA', value: '95+' },
      { label: 'Vetted Senior Engineers', value: 'Top 1%' },
      { label: 'Uptime SLA Delivered', value: '99.99%' },
    ],
    techStack: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'],
    testimonial: {
      quote:
        'OpnixLabs overhauled our web portal architecture, taking our load speeds from 3.2 seconds down to 400ms while scaling our user capacity 5x.',
      author: 'David Reynolds',
      role: 'VP of Engineering',
      company: 'SaaS Platform',
    },
    faqs: [
      {
        question: 'What engagement models do you offer for web development?',
        answer:
          'We offer flexible Staff Augmentation (adding senior developers to your sprint), Dedicated Agile Squads (managed end-to-end team), and Turnkey Project Delivery.',
      },
      {
        question: 'How quickly can your web developers join our project?',
        answer:
          'We provide pre-screened senior developer profiles within 24 to 48 hours, allowing technical interviews and sprint onboarding to start immediately.',
      },
      {
        question: 'Do your web apps comply with SEO and Core Web Vitals best practices?',
        answer:
          'Yes! Every web application engineered by OpnixLabs passes strict Core Web Vitals benchmarks with server-side rendering (SSR), dynamic ISR, and Schema.org structured data.',
      },
    ],
    featuredCaseStudies: [
      {
        title: 'Blackboard Enterprise LMS Scaling',
        slug: 'blackboard',
        category: 'EdTech & Learning',
        summary: 'Built high-availability backend integrations connecting Salesforce CRM, ServiceNow, and LMS platforms.',
        image: '/images/project1.jpg',
        metrics: '99.99% Uptime SLA',
      },
      {
        title: 'ConsumerAffairs High-Traffic Web Portal',
        slug: 'consumeraffairs',
        category: 'Consumer Media',
        summary: 'Architected sub-second review publishing system handling millions of monthly visits.',
        image: '/images/project2.jpg',
        metrics: '38% Conversion Lift',
      },
      {
        title: 'Azlo Digital Banking Portal',
        slug: 'azlo',
        category: 'FinTech Software',
        summary: 'Engineered secure financial dashboard with real-time transaction telemetry.',
        image: '/images/project3.jpg',
        metrics: '<50ms API Latency',
      },
    ],
  },

  'ai-development': {
    slug: 'ai-development',
    title: 'AI Development Services',
    name: 'AI Development Services',
    heroTitle: 'Enterprise Artificial Intelligence & ML Engineering Services',
    heroSubtitle:
      'Integrate Large Language Models (LLMs), custom machine learning pipelines, generative AI agents, and predictive data systems into your core software products.',
    metaDescription:
      'Hire top AI & Machine Learning engineers from OpnixLabs. Custom LLM fine-tuning, RAG vector search, PyTorch, OpenAI API, and automated AI agents.',
    keywords: [
      'AI Development Services',
      'Hire Artificial Intelligence Engineers',
      'Machine Learning Consulting',
      'Custom LLM Fine-Tuning',
      'OpnixLabs AI Solutions',
    ],
    category: 'Cloud, AI & Advanced Technologies',
    overviewTitle: 'Transform Operations with Enterprise Generative AI & Automation',
    overviewSubtitle:
      'Unlock proprietary data insights with custom Retrieval-Augmented Generation (RAG), fine-tuned LLM agents, and real-time computer vision models.',
    keyBenefits: [
      'Custom RAG architectures indexing private company knowledge bases securely.',
      'Integration with OpenAI, Anthropic Claude, Llama 3, and Hugging Face models.',
      'Production-ready MLOps deployment on AWS SageMaker and GCP Vertex AI.',
      'Strict data privacy compliance preventing proprietary leaks.',
    ],
    capabilities: [
      {
        title: 'Custom LLM & RAG Vector Search',
        description: 'Build enterprise search systems querying internal PDFs, docs, and databases using Pinecone and PgVector.',
      },
      {
        title: 'Autonomous AI Agents & Workflows',
        description: 'Deploy multi-agent task execution engines automating customer support, document parsing, and code synthesis.',
      },
      {
        title: 'Predictive Analytics & Forecasting',
        description: 'Train custom Scikit-learn and PyTorch models predicting user churn, financial risk, and supply chain demand.',
      },
      {
        title: 'Computer Vision & Document OCR',
        description: 'Automate invoice scanning, ID verification, and visual quality control using OpenCV and custom CNNs.',
      },
      {
        title: 'MLOps & Model Monitoring',
        description: 'Continuous model retraining pipelines, drift detection, and low-latency API serving.',
      },
      {
        title: 'AI Conversational Assistants',
        description: 'Embed intelligent bi-directional voice and text AI agents directly into your web and mobile applications.',
      },
    ],
    statBoxes: [
      { label: 'Data Accuracy Benchmark', value: '99.2%' },
      { label: 'Operational Efficiency Boost', value: '3.5x' },
      { label: 'Senior AI Engineers', value: 'Top 1%' },
      { label: 'Models Deployed', value: '80+' },
    ],
    techStack: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Pinecone', 'FastAPI', 'AWS SageMaker', 'Docker'],
    testimonial: {
      quote:
        'OpnixLabs AI engineers built a custom RAG solution over our 10-year enterprise knowledge base. Response time for complex compliance queries fell from hours to 3 seconds.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'Enterprise FinTech',
    },
    faqs: [
      {
        question: 'How do you keep our company data private during AI model training?',
        answer:
          'We use private VPC endpoints, self-hosted open-source LLMs (like Llama 3), or enterprise API agreements ensuring zero data is used for public model training.',
      },
      {
        question: 'Can your AI team integrate with our existing backend software?',
        answer:
          'Yes! We wrap AI models in clean RESTful or gRPC APIs that plug seamlessly into Node.js, Python, Java, or .NET applications.',
      },
    ],
    featuredCaseStudies: [
      {
        title: 'Blackboard Automated Intelligence Sync',
        slug: 'blackboard',
        category: 'EdTech & AI',
        summary: 'Integrated automated content tagging and search indexing across enterprise LMS assets.',
        image: '/images/project1.jpg',
        metrics: '4x Search Speed',
      },
      {
        title: 'ConsumerAffairs Automated Review Moderation',
        slug: 'consumeraffairs',
        category: 'NLP & AI',
        summary: 'Deployed sentiment analysis and spam filtering LLM pipeline processing 50k daily reviews.',
        image: '/images/project2.jpg',
        metrics: '99.4% Moderation Accuracy',
      },
    ],
  },
};

export function getServiceDataBySlug(slug: string): ServiceDetail {
  const normalized = slug.toLowerCase().trim();
  if (servicesDetailMap[normalized]) {
    return servicesDetailMap[normalized];
  }

  // Format title from slug (e.g. 'mobile-app-development' -> 'Mobile App Development')
  const readableTitle = normalized
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    slug: normalized,
    title: `${readableTitle} Services`,
    heroTitle: `Top End-to-End ${readableTitle} Services for Enterprise Growth`,
    heroSubtitle: `Accelerate your product delivery with pre-vetted top 1% ${readableTitle} software engineers. Dedicated agile squads, staff augmentation, and turnkey solutions.`,
    metaDescription: `Hire expert ${readableTitle} developers from OpnixLabs. Senior software engineers specializing in scalable enterprise solutions, modern architectures, and cloud backends.`,
    keywords: [
      `${readableTitle} Services`,
      `Hire ${readableTitle} Engineers`,
      `OpnixLabs ${readableTitle}`,
      'Enterprise Software Staffing',
    ],
    category: 'Software Engineering Services',
    overviewTitle: `Accelerate Product Roadmap with Senior ${readableTitle} Experts`,
    overviewSubtitle: `OpnixLabs delivers dedicated nearshore software engineers trained in industry best practices, modern code standards, and seamless sprint integration.`,
    keyBenefits: [
      `Pre-vetted senior ${readableTitle} architects with 5+ years domain experience.`,
      'Sub-24 to 48 hour developer onboarding into active sprint cycles.',
      'Timezone-aligned dedicated squads operating directly within your workflow.',
      'Zero layout shifts, automated CI/CD testing, and 99.99% uptime guarantees.',
    ],
    capabilities: [
      {
        title: `Custom ${readableTitle} Architecture`,
        description: `Designing and executing scalable, maintainable ${readableTitle} systems built for enterprise concurrency.`,
      },
      {
        title: 'API Engineering & Cloud Integration',
        description: 'Connecting third-party platforms, custom RESTful/gRPC APIs, and automated cloud infrastructure.',
      },
      {
        title: 'Legacy System Modernization',
        description: 'Upgrading existing software codebases to modern frameworks with complete unit and integration test coverage.',
      },
      {
        title: 'Continuous QA & Automated Testing',
        description: 'Enforcing TDD workflows, regression testing suites, and performance load testing.',
      },
      {
        title: '24/7 Monitoring & Maintenance',
        description: 'Proactive server health telemetry, security updates, and incident response SLAs.',
      },
      {
        title: 'UX/UI & Accessibility Optimization',
        description: 'Designing intuitive, accessible user interfaces following WCAG 2.1 compliance standards.',
      },
    ],
    statBoxes: [
      { label: 'Client Satisfaction SLA', value: '98.5%' },
      { label: 'Avg Seniority Level', value: '6+ Yrs' },
      { label: 'Vetted Engineers', value: 'Top 1%' },
      { label: 'Uptime SLA Guarantee', value: '99.99%' },
    ],
    techStack: [readableTitle, 'TypeScript', 'Node.js', 'Python', 'React', 'Docker', 'PostgreSQL', 'AWS'],
    testimonial: {
      quote: `The ${readableTitle} engineering team provided by OpnixLabs integrated into our active sprint cycles effortlessly and accelerated our feature delivery by 40%.`,
      author: 'Technical Lead',
      role: 'VP of Software Engineering',
      company: 'Global Enterprise Partner',
    },
    faqs: [
      {
        question: `How quickly can we assemble a ${readableTitle} developer squad?`,
        answer: `We present pre-vetted senior developer candidate profiles within 24 to 48 hours. Once approved, onboarding starts immediately.`,
      },
      {
        question: `What hiring models do you offer for ${readableTitle}?`,
        answer: `We support Software Staff Augmentation, Dedicated Agile Engineering Squads, and End-to-End Turnkey Deliverables.`,
      },
    ],
    featuredCaseStudies: [
      {
        title: 'Blackboard Enterprise Software Platform',
        slug: 'blackboard',
        category: 'EdTech & Enterprise',
        summary: 'Architected high-availability integrations connecting Salesforce CRM, ServiceNow, and LMS engines.',
        image: '/images/project1.jpg',
        metrics: '99.99% Uptime SLA',
      },
      {
        title: 'ConsumerAffairs Review Engine',
        slug: 'consumeraffairs',
        category: 'High-Traffic Web',
        summary: 'Engineered sub-second review publishing pipeline serving millions of monthly visitors.',
        image: '/images/project2.jpg',
        metrics: '38% Conversion Lift',
      },
    ],
  };
}
