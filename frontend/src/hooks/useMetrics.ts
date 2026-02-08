import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Metrics } from '../services/api';

export function useMetrics(refreshInterval: number = 1000) {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await apiService.getMetrics();
                setMetrics(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { metrics, error, loading };
}
