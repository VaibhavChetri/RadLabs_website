import { NavLink, HeroContent } from '@/types';

export const MOCK_NAVIGATION: readonly NavLink[] = [
    { id: 'nav_001', label: 'Services', href: '#services', displayOrder: 1, isActive: true },
    { id: 'nav_002', label: 'Capabilities', href: '#capabilities', displayOrder: 2, isActive: true },
    { id: 'nav_003', label: 'Approach', href: '#process', displayOrder: 3, isActive: true },
    { id: 'nav_004', label: 'Industries', href: '#industries', displayOrder: 4, isActive: true },
    { id: 'nav_005', label: 'Tech Stack', href: '#tech-stack', displayOrder: 5, isActive: true },
    { id: 'nav_006', label: 'Results', href: '#results', displayOrder: 6, isActive: true },
] as const;

export const MOCK_HERO_CONTENT: HeroContent = {
    preHeadline: '[ AI PARTNERS. LIMITLESS VISION. ]',
    headline: 'Blending creativity,\nengineering & innovation\nto build intelligent AI solutions.',
    highlightWords: ['creativity', 'engineering', 'innovation'],
    pills: [
        'Evolve Faster',
        'Operate Smarter',
        'Stay Competitive',
        'Built for Tomorrow',
    ],
    primaryCta: {
        id: 'cta_001',
        label: "Let's Build Something Remarkable",
        href: '#contact',
        variant: 'primary',
    },
    secondaryCta: {
        id: 'cta_002',
        label: 'See Our Work \u2193',
        href: '#services',
        variant: 'ghost',
    },
};
