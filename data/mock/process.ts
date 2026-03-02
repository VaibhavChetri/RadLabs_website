import { ProcessStep } from '@/types';

export const MOCK_PROCESS_STEPS: readonly ProcessStep[] = [
    {
        id: 'prc_001', slug: 'discover', phase: '01',
        title: 'Discover',
        description: 'Audit systems, map opportunities, and define goals before writing code.',
        displayOrder: 1, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'prc_002', slug: 'design', phase: '02',
        title: 'Design',
        description: 'Architect scalable, modular solutions built for evolving business needs.',
        displayOrder: 2, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'prc_003', slug: 'build', phase: '03',
        title: 'Build',
        description: 'Engineer tested, production-ready code with modern CI/CD pipelines.',
        displayOrder: 3, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'prc_004', slug: 'deliver', phase: '04',
        title: 'Deliver',
        description: 'Deploy with baked-in observability. Measure, iterate, and exceed goals.',
        displayOrder: 4, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
] as const;
