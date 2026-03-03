import { CompanyInfo, ContactInfo, ValueProposition } from '@/types';

export const MOCK_COMPANY_INFO: CompanyInfo = {
    name: 'Radlabs Technologies',
    tagline: 'AI Partners. Limitless Vision.',
    extendedTagline: 'Inspiring Creativity',
    mission: 'Blending creativity, engineering & innovation to build intelligent solutions that accelerate modern business growth.',
    website: 'radlabs.tech',
    email: 'sales@radlabs.tech',
    phones: ['+91 690-126-1005', '+91 863-870-2710'],
    headquarters: 'Available Globally',
    socialLinks: [
        { id: 'soc_001', platform: 'LinkedIn', url: 'https://linkedin.com/company/radlabs', icon: 'linkedin' },
        { id: 'soc_002', platform: 'Twitter', url: 'https://twitter.com/radlabs_tech', icon: 'twitter' },
        { id: 'soc_003', platform: 'Instagram', url: 'https://instagram.com/radlabs', icon: 'instagram' },
    ],
    copyright: '© 2026 Radlabs Technologies. All rights reserved.',
};

export const MOCK_CONTACT_ITEMS: readonly ContactInfo[] = [
    { id: 'cnt_002', type: 'email', label: 'Email', value: 'sales@radlabs.tech', href: 'mailto:sales@radlabs.tech', displayOrder: 2 },
    { id: 'cnt_003', type: 'phone', label: 'Phone', value: '+91 690-126-1005', href: 'tel:+916901261005', displayOrder: 3 },
    { id: 'cnt_004', type: 'phone', label: 'Phone', value: '+91 863-870-2710', href: 'tel:+918638702710', displayOrder: 4 },
    { id: 'cnt_005', type: 'address', label: 'Headquarters', value: 'Available Globally', href: '#', displayOrder: 5 },
] as const;

export const MOCK_VALUE_PROPS: readonly ValueProposition[] = [
    {
        id: 'val_001', slug: 'creativity-meets-engineering',
        title: 'Creativity Meets Engineering',
        description: 'We balance aesthetic design thinking with rigorous technical execution so solutions are both beautiful and robust. Our teams include designers who code and engineers who design.',
        icon: 'palette', displayOrder: 1, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'val_002', slug: 'business-first-mindset',
        title: 'Business-First Mindset',
        description: 'Technology decisions are always grounded in your business goals. We measure success in outcomes, not outputs. Every feature we build ties back to a metric you care about.',
        icon: 'target', displayOrder: 2, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'val_003', slug: 'end-to-end-ownership',
        title: 'End-to-End Ownership',
        description: 'From strategy to deployment, we own the full delivery lifecycle giving you a single accountable partner. No handoffs between agencies, no finger-pointing — just one team, fully invested.',
        icon: 'check-circle', displayOrder: 3, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
] as const;
