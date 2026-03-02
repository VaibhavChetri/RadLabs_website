import { CapabilityItem, FeatureBadge } from '@/types';

export const MOCK_CAPABILITIES: readonly CapabilityItem[] = [
    {
        id: 'cap_001', slug: 'data-pipelines',
        title: 'Data Pipelines',
        description: 'Seamless flow of the right data, at the right time. We architect data pipelines that ingest, transform, and deliver information across your entire stack — reliably and at scale.',
        icon: 'database', displayOrder: 1, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'cap_002', slug: 'logic-layers',
        title: 'Logic Layers',
        description: 'Intelligent decision-making at every step. Our logic layers combine rule engines, ML predictions, and business context to make the right call — automatically.',
        icon: 'cpu', displayOrder: 2, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'cap_003', slug: 'execution-mechanisms',
        title: 'Execution Mechanisms',
        description: 'Automated actions that drive real outcomes. From triggering workflows to updating downstream systems, our execution layer turns decisions into measurable business impact.',
        icon: 'zap', displayOrder: 3, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'cap_004', slug: 'governance-controls',
        title: 'Governance Controls',
        description: 'Responsible AI with full oversight & control. Every model we deploy includes audit trails, bias monitoring, explainability dashboards, and human-in-the-loop safeguards.',
        icon: 'shield', displayOrder: 4, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
] as const;

export const MOCK_FEATURE_BADGES: readonly FeatureBadge[] = [
    { id: 'feat_001', label: 'Custom AI Architecture', icon: 'layers', displayOrder: 1 },
    { id: 'feat_002', label: 'LLM Integration & RAG Systems', icon: 'message-square', displayOrder: 2 },
    { id: 'feat_003', label: 'Agentic Workflow Automation', icon: 'bot', displayOrder: 3 },
    { id: 'feat_004', label: 'AI Governance & Observability', icon: 'eye', displayOrder: 4 },
] as const;
