import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Sequence } from '../services/api';

export function useSequences(refreshInterval: number = 2000) {
    const [sequences, setSequences] = useState<Sequence[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSequences = async () => {
            try {
                const data = await apiService.getRecentSequences(20);
                setSequences(data.sequences);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch sequences');
            } finally {
                setLoading(false);
            }
        };

        fetchSequences();
        const interval = setInterval(fetchSequences, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { sequences, error, loading };
}
