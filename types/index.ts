export interface ServiceItem {
    readonly id: string;            // e.g. 'svc_001'
    readonly slug: string;          // e.g. 'artificial-intelligence'
    readonly title: string;
    readonly shortDescription: string;
    readonly fullDescription: string;
    readonly icon: string;          // Lucide icon name
    readonly tags: readonly string[];
    readonly displayOrder: number;
    readonly isActive: boolean;
    readonly metadata: {
        readonly estimatedDelivery: string;
        readonly startingPrice: number | null; // null = "Contact us"
    };
    readonly createdAt: string;     // ISO 8601
    readonly updatedAt: string;
}

export interface CapabilityItem {
    readonly id: string;            // e.g. 'cap_001'
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly icon: string;
    readonly displayOrder: number;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export interface FeatureBadge {
    readonly id: string;            // e.g. 'feat_001'
    readonly label: string;
    readonly icon: string;
    readonly displayOrder: number;
}

export interface ProcessStep {
    readonly id: string;            // e.g. 'prc_001'
    readonly slug: string;
    readonly phase: string;         // '01', '02', etc.
    readonly title: string;
    readonly description: string;
    readonly displayOrder: number;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export interface ValueProposition {
    readonly id: string;            // e.g. 'val_001'
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly icon: string;
    readonly displayOrder: number;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}


export interface TechCategory {
    readonly id: string;            // e.g. 'tch_001'
    readonly slug: string;
    readonly category: string;
    readonly technologies: readonly TechItem[];
    readonly displayOrder: number;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export interface TechItem {
    readonly id: string;            // e.g. 'tech_001'
    readonly name: string;
    readonly slug: string;
    readonly logoUrl: string | null;
    readonly websiteUrl: string;
}

export interface MetricItem {
    readonly id: string;            // e.g. 'mtr_001'
    readonly slug: string;
    readonly value: string;         // '40%', '3x', '100%'
    readonly numericValue: number;  // 40, 3, 100 — for counter animation
    readonly suffix: string;        // '%', 'x', '%'
    readonly label: string;
    readonly description: string;
    readonly displayOrder: number;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export interface SocialProofItem {
    readonly id: string;            // e.g. 'spr_001'
    readonly text: string;
    readonly displayOrder: number;
}

export interface ContactInfo {
    readonly id: string;            // e.g. 'cnt_001'
    readonly type: 'email' | 'phone' | 'website' | 'address';
    readonly label: string;
    readonly value: string;
    readonly href: string;
    readonly displayOrder: number;
}

export interface NavLink {
    readonly id: string;            // e.g. 'nav_001'
    readonly label: string;
    readonly href: string;
    readonly displayOrder: number;
    readonly isActive: boolean;
}

export interface CompanyInfo {
    readonly name: string;
    readonly tagline: string;
    readonly extendedTagline: string;
    readonly mission: string;
    readonly website: string;
    readonly email: string;
    readonly phones: readonly string[];
    readonly headquarters: string;
    readonly socialLinks: readonly SocialLink[];
    readonly copyright: string;
}

export interface SocialLink {
    readonly id: string;
    readonly platform: string;
    readonly url: string;
    readonly icon: string;
}

export interface HeroContent {
    readonly preHeadline: string;
    readonly headline: string;
    readonly highlightWords: readonly string[];
    readonly pills: readonly string[];
    readonly primaryCta: CtaButton;
    readonly secondaryCta: CtaButton;
}

export interface CtaButton {
    readonly id: string;
    readonly label: string;
    readonly href: string;
    readonly variant: 'primary' | 'secondary' | 'ghost';
}
