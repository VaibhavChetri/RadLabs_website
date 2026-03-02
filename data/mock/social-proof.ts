import { SocialProofItem } from '@/types';

export const MOCK_SOCIAL_PROOF: readonly SocialProofItem[] = [
    { id: 'spr_001', text: '98% Client Retention', displayOrder: 1 },
    { id: 'spr_002', text: '3x Faster to Market', displayOrder: 2 },
    { id: 'spr_003', text: 'Zero Vendor Lock-in', displayOrder: 3 },
    { id: 'spr_004', text: '24/7 System Monitoring', displayOrder: 4 },
] as const;
