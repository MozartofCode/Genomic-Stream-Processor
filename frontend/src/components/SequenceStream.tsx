export default function SequenceStream() {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Live Sequence Stream</h2>
                    <div className="flex items-center gap-2">
                        <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-mono text-primary uppercase">Syncing Node_4_Beta</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1 bg-surface-dark border border-border-dark rounded-lg text-xs hover:bg-primary/10 hover:border-primary/50 text-slate-300 transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-sm">pause</span> Pause
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 bg-surface-dark border border-border-dark rounded-lg text-xs hover:bg-primary/10 hover:border-primary/50 text-slate-300 transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-sm">filter_alt</span> Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 bg-primary text-background-dark rounded-lg text-xs font-bold hover:brightness-110 transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-sm">download</span> Export Log
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-black border border-border-dark rounded-xl overflow-hidden relative shadow-inner p-4 font-mono text-sm leading-relaxed">
                <div className="scrolling-container h-full overflow-hidden flex flex-col gap-1">
                    <div className="flex gap-2 text-slate-700 select-none">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.03</span>
                        <span>SEQ_99342_1</span>
                        <span className="flex-1 truncate">ACTGCAGTCGATCGAT<span className="text-primary font-bold glow-teal">GCTA</span>CAGCTAGCTAGCATCGATGCATCGATCGATC</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.07</span>
                        <span>SEQ_99342_2</span>
                        <span className="flex-1 truncate">CGATGCATCGATCGATCGAT<span className="text-primary font-bold glow-teal">AATC</span>CAGTCGATCGATCGATGCATCGATCGATCGAT</span>
                    </div>
                    <div className="flex gap-2 text-primary font-bold bg-primary/5 border-l-2 border-primary pl-1">
                        <span className="w-20 shrink-0 text-primary/50">00:42:01.12</span>
                        <span>SEQ_99342_3</span>
                        <span className="flex-1 truncate glow-teal">GCTACAGCTAGCTAGCATC<span className="text-mutation-orange">GATGCAT</span>CGATCGATCGATCCGTAGCTAGCTAGCT</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.18</span>
                        <span>SEQ_99342_4</span>
                        <span className="flex-1 truncate">CCAGTCGATCGATCGATGCATCGATCGATCGATC<span className="text-primary/40">GCTA</span>CAGCTAGCTAGCATC</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.25</span>
                        <span>SEQ_99342_5</span>
                        <span className="flex-1 truncate">CGATGCATCGATCGATCGAT<span className="text-primary font-bold glow-teal">TTGA</span>CAGCTAGCTAGCATCGATGCATCGATCGATC</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.32</span>
                        <span>SEQ_99343_1</span>
                        <span className="flex-1 truncate">ACTGCAGTCGATCGATCGAT<span className="text-primary/40">GCTA</span>CAGCTAGCTAGCATCGATGCATCGATCGATC</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.39</span>
                        <span>SEQ_99343_2</span>
                        <span className="flex-1 truncate">GCTACAGCTAGCTAGCATC<span className="text-primary font-bold glow-teal">GATC</span>GATCGATCGATCGATCCGTAGCTAGCTAGCT</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.44</span>
                        <span>SEQ_99343_3</span>
                        <span className="flex-1 truncate">ACTGCAGTCGATCGAT<span className="text-primary font-bold glow-teal">GCTA</span>CAGCTAGCTAGCATCGATGCATCGATCGATC</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.50</span>
                        <span>SEQ_99343_4</span>
                        <span className="flex-1 truncate">CGATGCATCGATCGATCGAT<span className="text-primary font-bold glow-teal">AATC</span>CAGTCGATCGATCGATGCATCGATCGATCGAT</span>
                    </div>
                    <div className="flex gap-2 text-primary font-bold bg-primary/5 border-l-2 border-primary pl-1">
                        <span className="w-20 shrink-0 text-primary/50">00:42:01.58</span>
                        <span>SEQ_99343_5</span>
                        <span className="flex-1 truncate glow-teal">GCTACAGCTAGCTAGCATC<span className="text-mutation-orange">GATGCAT</span>CGATCGATCGATCCGTAGCTAGCTAGCT</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.65</span>
                        <span>SEQ_99344_1</span>
                        <span className="flex-1 truncate">CCAGTCGATCGATCGATGCATCGATCGATCGATC<span className="text-primary/40">GCTA</span>CAGCTAGCTAGCATC</span>
                    </div>
                    <div className="flex gap-2 text-slate-700">
                        <span className="w-20 shrink-0 text-slate-500">00:42:01.71</span>
                        <span>SEQ_99344_2</span>
                        <span className="flex-1 truncate">CGATGCATCGATCGATCGAT<span className="text-primary font-bold glow-teal">TTGA</span>CAGCTAGCTAGCATCGATGCATCGATCGATC</span>
                    </div>
                </div>
                <div className="absolute inset-x-0 h-px bg-primary/30 shadow-[0_0_10px_#0df2f2] top-1/2 -translate-y-1/2 z-10"></div>
            </div>
        </>
    )
}
