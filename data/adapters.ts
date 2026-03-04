import {
    ServiceItem,
    CapabilityItem,
    TechCategory,
    MetricItem,
    ProcessStep,
    ValueProposition,
    SocialProofItem
} from '@/types';
import { ApiResponse } from '@/types/api';

import {
    MOCK_SERVICES,
    MOCK_CAPABILITIES,
    MOCK_TECH_STACK,
    MOCK_METRICS,
    MOCK_PROCESS_STEPS,
    MOCK_VALUE_PROPS,
    MOCK_SOCIAL_PROOF
} from './mock';

// ---- Adapters: API Response -> Component Ready Data ---- //

export function adaptServices(response: ApiResponse<readonly ServiceItem[]>): ServiceItem[] {
    return [...response.data]
        .filter((s) => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function adaptCapabilities(response: ApiResponse<readonly CapabilityItem[]>): CapabilityItem[] {
    return [...response.data]
        .filter((c) => c.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function adaptProcessSteps(response: ApiResponse<readonly ProcessStep[]>): ProcessStep[] {
    return [...response.data]
        .filter((p) => p.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function adaptValueProps(response: ApiResponse<readonly ValueProposition[]>): ValueProposition[] {
    return [...response.data]
        .filter((v) => v.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
}


export function adaptTechStack(response: ApiResponse<readonly TechCategory[]>): TechCategory[] {
    return [...response.data]
        .filter((t) => t.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function adaptMetrics(response: ApiResponse<readonly MetricItem[]>): MetricItem[] {
    return [...response.data]
        .filter((m) => m.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function adaptSocialProof(response: ApiResponse<readonly SocialProofItem[]>): SocialProofItem[] {
    return [...response.data].sort((a, b) => a.displayOrder - b.displayOrder);
}

// ---- Mock Fetchers (to be replaced with actual API calls) ---- //

function createMockResponse<T>(data: T): ApiResponse<T> {
    return {
        data,
        meta: {
            total: Array.isArray(data) ? data.length : 1,
            page: 1,
            perPage: 100,
            timestamp: new Date().toISOString(),
        },
        status: 'success',
    };
}

export async function getMockServices(): Promise<ApiResponse<readonly ServiceItem[]>> {
    return createMockResponse(MOCK_SERVICES);
}

export async function getMockCapabilities(): Promise<ApiResponse<readonly CapabilityItem[]>> {
    return createMockResponse(MOCK_CAPABILITIES);
}

export async function getMockProcessSteps(): Promise<ApiResponse<readonly ProcessStep[]>> {
    return createMockResponse(MOCK_PROCESS_STEPS);
}

export async function getMockValueProps(): Promise<ApiResponse<readonly ValueProposition[]>> {
    return createMockResponse(MOCK_VALUE_PROPS);
}


export async function getMockTechStack(): Promise<ApiResponse<readonly TechCategory[]>> {
    return createMockResponse(MOCK_TECH_STACK);
}

export async function getMockMetrics(): Promise<ApiResponse<readonly MetricItem[]>> {
    return createMockResponse(MOCK_METRICS);
}

export async function getMockSocialProof(): Promise<ApiResponse<readonly SocialProofItem[]>> {
    return createMockResponse(MOCK_SOCIAL_PROOF);
}
