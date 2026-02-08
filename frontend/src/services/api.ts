const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Metrics {
    ingestion_rate: number;
    ingestion_count: number;
    processing_count: number;
    queue_size: number;
    system_pressure: number;
    is_throttled: boolean;
    uptime_seconds: number;
}

export interface Sequence {
    id: string;
    sequence: string;
    mutation_detected: boolean;
    analysis: string;
    timestamp: string;
}

export interface Mutation {
    id: string;
    sequence: string;
    analysis: string;
    timestamp: string;
}

export interface Stats {
    total_sequences: number;
    total_mutations: number;
    mutation_rate: number;
}

class ApiService {
    async getMetrics(): Promise<Metrics> {
        const response = await fetch(`${API_BASE_URL}/api/metrics`);
        if (!response.ok) throw new Error('Failed to fetch metrics');
        return response.json();
    }

    async getRecentSequences(limit: number = 20): Promise<{ sequences: Sequence[] }> {
        const response = await fetch(`${API_BASE_URL}/api/sequences/recent?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch sequences');
        return response.json();
    }

    async getRecentMutations(limit: number = 10): Promise<{ mutations: Mutation[] }> {
        const response = await fetch(`${API_BASE_URL}/api/mutations/recent?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch mutations');
        return response.json();
    }

    async getStats(): Promise<Stats> {
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        return response.json();
    }

    createWebSocket(): WebSocket {
        const wsUrl = API_BASE_URL.replace('http', 'ws');
        return new WebSocket(`${wsUrl}/ws/stream`);
    }
}

export const apiService = new ApiService();
