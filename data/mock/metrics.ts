import { MetricItem } from '@/types';

export const MOCK_METRICS: readonly MetricItem[] = [
    {
        id: 'mtr_001', slug: 'time-to-market',
        value: '40%', numericValue: 40, suffix: '%',
        label: 'Faster Time-to-Market',
        description: 'Accelerated delivery through modern engineering practices and reusable architectures. Our clients ship features in weeks, not quarters.',
        displayOrder: 1, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'mtr_002', slug: 'operational-efficiency',
        value: '3x', numericValue: 3, suffix: 'x',
        label: 'Operational Efficiency',
        description: 'Intelligent automation reduces manual effort and unlocks team capacity for high-value work. Less firefighting, more building.',
        displayOrder: 2, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'mtr_003', slug: 'production-ready',
        value: '100%', numericValue: 100, suffix: '%',
        label: 'Production-Ready Delivery',
        description: 'Every system we ship is built to bespoke standards — secure, governed, and maintainable. No prototypes that become production.',
        displayOrder: 3, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
] as const;

export const MOCK_COMMITMENT_TEXT =
    "Our commitment: We don't consider an engagement complete until your team can operate, extend, and defend what we built together.";
