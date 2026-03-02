// Generic API response wrapper
export interface ApiResponse<T> {
    data: T;
    meta: {
        total: number;
        page: number;
        perPage: number;
        timestamp: string;
    };
    status: 'success' | 'error';
}

// Single item response
export interface ApiSingleResponse<T> {
    data: T;
    status: 'success' | 'error';
}

// Error response
export interface ApiErrorResponse {
    error: {
        code: string;
        message: string;
        details?: Record<string, string[]>;
    };
    status: 'error';
}
