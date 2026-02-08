import { useMetrics } from '../hooks/useMetrics';

export default function Footer() {
    const { metrics } = useMetrics(1000);

    const formatUptime = (seconds: number) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${days}d ${hours}h ${minutes}m`;
    };

    const bufferPercentage = metrics ? Math.min(100, (metrics.queue_size / 500) * 100) : 0;

    return (
        <footer className="h-8 bg-surface-dark border-t border-border-dark px-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        System Health: {metrics?.is_throttled ? 'Throttled' : 'Nominal'}
                    </span>
                </div>
                <div className="flex items-center gap-2 border-l border-border-dark pl-6">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Buffer:</span>
                    <div className="w-24 h-1 bg-slate-800 rounded-full">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${bufferPercentage}%` }}
                        ></div>
                    </div>
                    <span className="text-[10px] font-mono text-primary">{Math.round(bufferPercentage)}%</span>
                </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-mono">
                <span>Uptime: {metrics ? formatUptime(metrics.uptime_seconds) : '0d 0h 0m'}</span>
                <span>Queue: {metrics?.queue_size || 0}</span>
                <span className="text-primary/50">Node: HELIX-ALPHA-01</span>
            </div>
        </footer>
    )
}

