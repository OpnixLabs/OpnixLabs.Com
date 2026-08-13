export interface ServiceItem {
  name: string;
  href: string;
  category: 'TOP SERVICES' | 'ENTERPRISE FOCUSED' | 'SOFTWARE DEVELOPMENT' | 'QA & TESTING' | 'CLOUD & AI';
  description?: string;
}

export const servicesData = {
  topServices: [
    { name: 'AI Development', href: '/services/ai-development' },
    { name: 'Back-end Development', href: '/services/backend-development' },
    { name: 'CMS Development', href: '/services/cms-development' },
    { name: 'Cryptocurrency & Blockchain', href: '/services/blockchain' },
    { name: 'Front-end Development', href: '/services/frontend-development' },
    { name: 'Machine Learning', href: '/services/machine-learning' },
    { name: 'QA Testing & Automation', href: '/services/qa-testing' },
    { name: 'UX/UI Design', href: '/services/ui-ux-design' },
    { name: 'Android App Development', href: '/services/android-development' },
    { name: 'Business Intelligence', href: '/services/business-intelligence' },
    { name: 'Data Engineering', href: '/services/data-engineering' },
    { name: 'eCommerce Development', href: '/services/ecommerce-development' },
    { name: 'iOS App Development', href: '/services/ios-development' },
    { name: 'Mobile App Development', href: '/services/mobile-app-development' },
    { name: 'SaaS Development', href: '/services/saas-development' },
    { name: 'Web Development', href: '/services/web-development' },
  ],
  enterpriseFocused: [
    { name: 'Backup Solutions', href: '/services/backup-solutions' },
    { name: 'Big Data', href: '/services/big-data' },
    { name: 'Cloud Applications', href: '/services/cloud-applications' },
    { name: 'CRM Systems', href: '/services/crm-systems' },
    { name: 'Cybersecurity', href: '/services/cybersecurity' },
    { name: 'DevOps', href: '/services/devops' },
    { name: 'Digital Transformation', href: '/services/digital-transformation' },
    { name: 'ERP Development', href: '/services/erp-development' },
  ],
  sidebarLinks: [
    { name: 'Staff Augmentation', href: '/services#staff-augmentation' },
    { name: 'Dedicated Teams', href: '/services#dedicated-teams' },
    { name: 'Software Outsourcing', href: '/services#outsourcing' },
    { name: 'AI Transformation', href: '/services#ai-transformation' },
  ],
};
