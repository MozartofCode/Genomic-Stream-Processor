import { useMutations } from '../hooks/useMutations';

export default function Sidebar() {
    const { mutations, loading, error } = useMutations(3000);

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }) + ' UTC';
    };

    return (
        <aside className="w-80 bg-surface-dark border-l border-border-dark flex flex-col min-h-0">
            <div className="p-4 border-b border-border-dark flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">Genomic Analysis</h2>
                <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-bold">
                    {loading ? '...' : mutations.length} ACTIVE
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading && mutations.length === 0 && (
                    <div className="text-center text-slate-500 text-sm py-8">
                        Loading mutations...
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-400 text-sm py-8">
                        Error: {error}
                    </div>
                )}

                {mutations.length === 0 && !loading && !error && (
                    <div className="text-center text-slate-500 text-sm py-8">
                        No mutations detected yet
                    </div>
                )}

                {mutations.map((mutation, index) => (
                    <div
                        key={mutation.id}
                        className={`bg-background-dark border-l-4 ${index % 2 === 0 ? 'border-mutation-orange' : 'border-primary'
                            } p-3 rounded-r-lg group hover:bg-slate-800 transition-colors ${index > 2 ? 'opacity-70' : ''
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">
                                {formatTimestamp(mutation.timestamp)}
                            </span>
                            <span className={`${index % 2 === 0
                                    ? 'bg-mutation-orange/10 text-mutation-orange'
                                    : 'bg-primary/10 text-primary'
                                } text-[9px] font-bold px-1.5 py-0.5 rounded uppercase`}>
                                {index % 2 === 0 ? 'Mutation Detected' : 'High Confidence'}
                            </span>
                        </div>
                        <p className="text-xs font-bold text-slate-200 mb-1">Sequence ID: {mutation.id}</p>
                        <p className="text-[11px] text-slate-400 font-mono line-clamp-2">
                            {mutation.sequence}...
                            {index % 2 === 0 && <span className="text-mutation-orange"> (Mutation)</span>}
                        </p>
                        <div className="mt-3 flex gap-2">
                            {index < 2 ? (
                                <>
                                    <button className="flex-1 text-[10px] bg-primary/10 text-primary font-bold py-1 rounded hover:bg-primary/20 transition-colors uppercase cursor-pointer">
                                        Isolate
                                    </button>
                                    <button className="flex-1 text-[10px] border border-border-dark text-slate-400 font-bold py-1 rounded hover:text-white transition-colors uppercase cursor-pointer">
                                        Ignore
                                    </button>
                                </>
                            ) : (
                                <button className="w-full text-[10px] bg-white/5 text-white font-bold py-1 rounded hover:bg-white/10 transition-colors uppercase cursor-pointer">
                                    {index === 2 ? 'Archive Review' : 'View Details'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-border-dark bg-background-dark/50">
                <div className="flex justify-between text-[10px] mb-2 uppercase font-bold tracking-wider text-slate-400">
                    <span>Scan Coverage</span>
                    <span>84%</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full mb-4">
                    <div className="h-full bg-primary w-[84%]"></div>
                </div>
                <button className="w-full py-2 bg-surface-dark border border-border-dark rounded-lg text-xs font-bold text-primary hover:bg-primary hover:text-background-dark transition-all cursor-pointer">
                    START BULK ANALYTICS
                </button>
            </div>
        </aside>
    )
}

