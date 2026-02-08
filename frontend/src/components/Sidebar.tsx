export default function Sidebar() {
    return (
        <aside className="w-80 bg-surface-dark border-l border-border-dark flex flex-col min-h-0">
            <div className="p-4 border-b border-border-dark flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">Genomic Analysis</h2>
                <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-bold">12 ACTIVE</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Mutation Item 1 */}
                <div className="bg-background-dark border-l-4 border-mutation-orange p-3 rounded-r-lg group hover:bg-slate-800 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">14:02:12 UTC</span>
                        <span className="bg-mutation-orange/10 text-mutation-orange text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Mutation Detected</span>
                    </div>
                    <p className="text-xs font-bold text-slate-200 mb-1">Sequence ID: SEQ-0884-X</p>
                    <p className="text-[11px] text-slate-400 font-mono line-clamp-2">ACTG...<span className="text-mutation-orange">TAGC</span>...GCTA (Insertion at pos 428)</p>
                    <div className="mt-3 flex gap-2">
                        <button className="flex-1 text-[10px] bg-primary/10 text-primary font-bold py-1 rounded hover:bg-primary/20 transition-colors uppercase cursor-pointer">Isolate</button>
                        <button className="flex-1 text-[10px] border border-border-dark text-slate-400 font-bold py-1 rounded hover:text-white transition-colors uppercase cursor-pointer">Ignore</button>
                    </div>
                </div>

                {/* Mutation Item 2 */}
                <div className="bg-background-dark border-l-4 border-primary p-3 rounded-r-lg group hover:bg-slate-800 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">14:01:58 UTC</span>
                        <span className="bg-primary/10 text-primary text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">High Confidence</span>
                    </div>
                    <p className="text-xs font-bold text-slate-200 mb-1">Sequence ID: SEQ-0883-M</p>
                    <p className="text-[11px] text-slate-400 font-mono line-clamp-2">TTGA...CCGA (Pattern match found: Variant A)</p>
                    <div className="mt-3">
                        <button className="w-full text-[10px] bg-white/5 text-white font-bold py-1 rounded hover:bg-white/10 transition-colors uppercase cursor-pointer">View Alignment</button>
                    </div>
                </div>

                {/* Mutation Item 3 */}
                <div className="bg-background-dark border-l-4 border-mutation-orange p-3 rounded-r-lg group hover:bg-slate-800 transition-colors opacity-70">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">13:58:44 UTC</span>
                        <span className="bg-mutation-orange/10 text-mutation-orange text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Mutation Detected</span>
                    </div>
                    <p className="text-xs font-bold text-slate-200 mb-1">Sequence ID: SEQ-0879-Z</p>
                    <p className="text-[11px] text-slate-400 font-mono line-clamp-2">GCTA...AATC (Substitution at pos 1,102)</p>
                    <div className="mt-3">
                        <button className="w-full text-[10px] bg-white/5 text-white font-bold py-1 rounded hover:bg-white/10 transition-colors uppercase cursor-pointer">Archive Review</button>
                    </div>
                </div>

                {/* Processing Item */}
                <div className="bg-background-dark border-l-4 border-slate-700 p-3 rounded-r-lg group hover:bg-slate-800 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">13:56:01 UTC</span>
                        <span className="text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Processing</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 mb-1">Sequence ID: SEQ-0878-Y</p>
                    <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/40 w-3/4"></div>
                    </div>
                </div>
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
