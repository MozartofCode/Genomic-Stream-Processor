export default function Widgets() {
    return (
        <>
            {/* Ingestion Rate Widget */}
            <div className="bg-surface-dark border border-border-dark p-4 rounded-xl flex flex-col justify-between group hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ingestion Rate</p>
                        <p className="text-2xl font-bold text-white mt-1">1.28 <span className="text-primary text-sm">GB/s</span></p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-primary text-lg">speed</span>
                    </div>
                </div>
                <div className="mt-4 h-12 flex items-end gap-1">
                    <div className="w-full h-full flex items-end space-x-1">
                        <div className="bg-primary/20 hover:bg-primary transition-all rounded-t-sm flex-1 h-[40%]"></div>
                        <div className="bg-primary/20 hover:bg-primary transition-all rounded-t-sm flex-1 h-[60%]"></div>
                        <div className="bg-primary/20 hover:bg-primary transition-all rounded-t-sm flex-1 h-[55%]"></div>
                        <div className="bg-primary/20 hover:bg-primary transition-all rounded-t-sm flex-1 h-[80%]"></div>
                        <div className="bg-primary/20 hover:bg-primary transition-all rounded-t-sm flex-1 h-[70%]"></div>
                        <div className="bg-primary/20 hover:bg-primary transition-all rounded-t-sm flex-1 h-[90%]"></div>
                        <div className="bg-primary/40 hover:bg-primary transition-all rounded-t-sm flex-1 h-[95%]"></div>
                        <div className="bg-primary hover:bg-primary transition-all rounded-t-sm flex-1 h-[100%] shadow-[0_0_10px_rgba(13,242,242,0.4)]"></div>
                    </div>
                </div>
            </div>

            {/* System Pressure Widget */}
            <div className="bg-surface-dark border border-border-dark p-4 rounded-xl flex items-center gap-6 group hover:border-primary/50 transition-colors">
                <div className="relative size-20 flex items-center justify-center">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        <circle className="stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                        <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="68, 100" strokeLinecap="round" strokeWidth="3"></circle>
                    </svg>
                    <span className="absolute text-lg font-bold text-white">68%</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Pressure</p>
                    <p className="text-lg font-medium text-white mt-1">Buffer Optimal</p>
                    <div className="flex items-center gap-1 text-primary text-xs mt-1">
                        <span className="material-symbols-outlined text-xs">trending_up</span>
                        <span>+2.4% vs last hour</span>
                    </div>
                </div>
            </div>

            {/* Mutation Detected Widget */}
            <div className="bg-surface-dark border border-border-dark p-4 rounded-xl flex flex-col justify-between group hover:border-mutation-orange/50 transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mutations Detected</p>
                        <p className="text-3xl font-bold text-mutation-orange glow-orange mt-1">42,091</p>
                    </div>
                    <div className="p-2 bg-mutation-orange/10 rounded-lg">
                        <span className="material-symbols-outlined text-mutation-orange text-lg">biotech</span>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-auto">Real-time scan active: Chromosome 17</p>
            </div>
        </>
    )
}
