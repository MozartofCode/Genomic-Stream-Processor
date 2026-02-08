import { useMetrics } from '../hooks/useMetrics';

export default function Widgets() {
    const { metrics, loading, error } = useMetrics(1000);

    if (loading && !metrics) {
        return (
            <div className="col-span-3 flex items-center justify-center p-8">
                <p className="text-slate-400">Loading metrics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="col-span-3 flex items-center justify-center p-8">
                <p className="text-red-400">Error: {error}</p>
            </div>
        );
    }

    const ingestionRate = metrics?.ingestion_rate || 0;
    const systemPressure = metrics?.system_pressure || 0;
    const processingCount = metrics?.processing_count || 0;

    return (
        <>
            {/* Ingestion Rate Widget */}
            <div className="bg-surface-dark border border-border-dark p-4 rounded-xl flex flex-col justify-between group hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ingestion Rate</p>
                        <p className="text-2xl font-bold text-white mt-1">{ingestionRate.toFixed(2)} <span className="text-primary text-sm">seq/s</span></p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-primary text-lg">speed</span>
                    </div>
                </div>
                <div className="mt-4 h-12 flex items-end gap-1">
                    <div className="w-full h-full flex items-end space-x-1">
                        {[40, 60, 55, 80, 70, 90, 95, 100].map((height, i) => (
                            <div
                                key={i}
                                className={`${i === 7 ? 'bg-primary shadow-[0_0_10px_rgba(13,242,242,0.4)]' : i === 6 ? 'bg-primary/40' : 'bg-primary/20'} hover:bg-primary transition-all rounded-t-sm flex-1`}
                                style={{ height: `${height}%` }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Pressure Widget */}
            <div className="bg-surface-dark border border-border-dark p-4 rounded-xl flex items-center gap-6 group hover:border-primary/50 transition-colors">
                <div className="relative size-20 flex items-center justify-center">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        <circle className="stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                        <circle
                            className="stroke-primary"
                            cx="18"
                            cy="18"
                            fill="none"
                            r="16"
                            strokeDasharray={`${systemPressure}, 100`}
                            strokeLinecap="round"
                            strokeWidth="3"
                        ></circle>
                    </svg>
                    <span className="absolute text-lg font-bold text-white">{systemPressure}%</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Pressure</p>
                    <p className="text-lg font-medium text-white mt-1">
                        {systemPressure < 50 ? 'Buffer Optimal' : systemPressure < 80 ? 'Moderate Load' : 'High Pressure'}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-xs mt-1">
                        <span className="material-symbols-outlined text-xs">
                            {systemPressure > 50 ? 'trending_up' : 'trending_down'}
                        </span>
                        <span>Queue: {metrics?.queue_size || 0}</span>
                    </div>
                </div>
            </div>

            {/* Mutation Detected Widget */}
            <div className="bg-surface-dark border border-border-dark p-4 rounded-xl flex flex-col justify-between group hover:border-mutation-orange/50 transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sequences Processed</p>
                        <p className="text-3xl font-bold text-mutation-orange glow-orange mt-1">{processingCount.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-mutation-orange/10 rounded-lg">
                        <span className="material-symbols-outlined text-mutation-orange text-lg">biotech</span>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-auto">
                    Real-time processing: {metrics?.is_throttled ? 'Throttled' : 'Active'}
                </p>
            </div>
        </>
    )
}

