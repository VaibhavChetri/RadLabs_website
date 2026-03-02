import { IndustryItem } from '@/types';

export const MOCK_INDUSTRIES: readonly IndustryItem[] = [
    {
        id: 'ind_001', slug: 'finance',
        title: 'Finance',
        description: 'AI-driven analytics, compliance automation, and intelligent customer experiences. We help financial institutions detect fraud in real-time, automate regulatory reporting, and personalize advisory services at scale.',
        icon: 'dollar-sign',
        imageUrl: '/images/industries/finance.webp',
        imageAlt: 'Financial analytics dashboard with real-time market data visualization',
        displayOrder: 1, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'ind_002', slug: 'healthcare-life-sciences',
        title: 'Healthcare & Life Sciences',
        description: 'Intelligent diagnostics support, workflow automation, and secure data platforms. Our HIPAA-compliant solutions help healthcare providers reduce administrative burden, accelerate diagnosis, and improve patient outcomes.',
        icon: 'activity',
        imageUrl: '/images/industries/healthcare.webp',
        imageAlt: 'Medical professional reviewing AI-assisted diagnostic results',
        displayOrder: 2, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'ind_003', slug: 'retail-ecommerce',
        title: 'Retail & E-Commerce',
        description: 'Personalization engines, inventory intelligence, and seamless digital storefronts. We build recommendation systems that increase AOV, demand forecasting that reduces waste, and checkout flows that convert.',
        icon: 'shopping-cart',
        imageUrl: '/images/industries/retail.webp',
        imageAlt: 'Modern e-commerce storefront with AI-powered product recommendations',
        displayOrder: 3, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'ind_004', slug: 'startups-scaleups',
        title: 'Startups & Scale-ups',
        description: 'Rapid MVP development, technical architecture, and growth-ready infrastructure. We are the engineering team that ambitious founders call when they need to ship fast without accumulating technical debt.',
        icon: 'rocket',
        imageUrl: '/images/industries/startups.webp',
        imageAlt: 'Startup team collaborating on product development with modern tools',
        displayOrder: 4, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
] as const;
