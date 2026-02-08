import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Mutation } from '../services/api';

export function useMutations(refreshInterval: number = 3000) {
    const [mutations, setMutations] = useState<Mutation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMutations = async () => {
            try {
                const data = await apiService.getRecentMutations(10);
                setMutations(data.mutations);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch mutations');
            } finally {
                setLoading(false);
            }
        };

        fetchMutations();
        const interval = setInterval(fetchMutations, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { mutations, error, loading };
}
