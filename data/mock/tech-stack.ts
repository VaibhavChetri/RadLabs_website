import { TechCategory } from '@/types';

export const MOCK_TECH_STACK: readonly TechCategory[] = [
    {
        id: 'tch_001', slug: 'ai-ml', category: 'AI & Foundation Models',
        technologies: [
            { id: 'tech_001', name: 'OpenAI GPT-4', slug: 'openai', logoUrl: null, websiteUrl: 'https://openai.com' },
            { id: 'tech_002', name: 'Anthropic Claude', slug: 'anthropic', logoUrl: null, websiteUrl: 'https://anthropic.com' },
            { id: 'tech_003', name: 'Open Source LLMs', slug: 'os-llms', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_004', name: 'Hugging Face', slug: 'hugging-face', logoUrl: null, websiteUrl: 'https://huggingface.co' },
            { id: 'tech_005', name: 'Computer Vision', slug: 'computer-vision', logoUrl: null, websiteUrl: '#' },
        ],
        displayOrder: 1, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'tch_002', slug: 'cloud-infrastructure', category: 'Cloud Infrastructure',
        technologies: [
            { id: 'tech_010', name: 'Amazon Web Services', slug: 'aws', logoUrl: null, websiteUrl: 'https://aws.amazon.com' },
            { id: 'tech_011', name: 'Google Cloud Platform', slug: 'gcp', logoUrl: null, websiteUrl: 'https://cloud.google.com' },
            { id: 'tech_012', name: 'Microsoft Azure', slug: 'azure', logoUrl: null, websiteUrl: 'https://azure.microsoft.com' },
            { id: 'tech_013', name: 'Serverless Cloud', slug: 'serverless', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_014', name: 'Containerization', slug: 'containers', logoUrl: null, websiteUrl: '#' },
        ],
        displayOrder: 2, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'tch_003', slug: 'data-analytics', category: 'Data & Analytics',
        technologies: [
            { id: 'tech_017', name: 'Snowflake', slug: 'snowflake', logoUrl: null, websiteUrl: 'https://snowflake.com' },
            { id: 'tech_018', name: 'Cloud Data Warehouses', slug: 'warehouses', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_019', name: 'Data Lakes', slug: 'data-lakes', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_020', name: 'Real-time Streaming', slug: 'streaming', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_021', name: 'Vector Databases', slug: 'vector-dbs', logoUrl: null, websiteUrl: '#' },
        ],
        displayOrder: 3, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'tch_004', slug: 'advanced-ml-ops', category: 'Machine Learning Ops',
        technologies: [
            { id: 'tech_025', name: 'Predictive Analytics', slug: 'predictive-analytics', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_026', name: 'Model Training', slug: 'model-training', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_027', name: 'Automated ML (AutoML)', slug: 'automl', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_028', name: 'A/B Testing', slug: 'ab-testing', logoUrl: null, websiteUrl: '#' },
        ],
        displayOrder: 4, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'tch_005', slug: 'web-backend', category: 'Bespoke Architecture',
        technologies: [
            { id: 'tech_031', name: 'Secure APIs', slug: 'secure-apis', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_032', name: 'Microservices', slug: 'microservices', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_033', name: 'Scalable Backends', slug: 'scalable-backends', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_034', name: 'High-Performance Web', slug: 'web', logoUrl: null, websiteUrl: '#' },
        ],
        displayOrder: 5, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
    {
        id: 'tch_006', slug: 'observability-governance', category: 'Security & Governance',
        technologies: [
            { id: 'tech_038', name: 'Compliance Automation', slug: 'compliance', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_039', name: 'System Monitoring', slug: 'monitoring', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_040', name: 'Data Privacy Rails', slug: 'privacy', logoUrl: null, websiteUrl: '#' },
            { id: 'tech_041', name: 'Cost Optimization', slug: 'cost', logoUrl: null, websiteUrl: '#' },
        ],
        displayOrder: 6, isActive: true,
        createdAt: '2026-01-15T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z',
    },
] as const;
