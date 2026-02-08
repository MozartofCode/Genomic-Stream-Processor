export default function Footer() {
    return (
        <footer className="h-8 bg-surface-dark border-t border-border-dark px-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">System Health: Nominal</span>
                </div>
                <div className="flex items-center gap-2 border-l border-border-dark pl-6">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Buffer:</span>
                    <div className="w-24 h-1 bg-slate-800 rounded-full">
                        <div className="h-full bg-primary w-[12%]"></div>
                    </div>
                    <span className="text-[10px] font-mono text-primary">12%</span>
                </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-mono">
                <span>Uptime: 242d 12h 04m</span>
                <span>Latency: 4ms</span>
                <span className="text-primary/50">Node: ALPHA-CENTAURI-04</span>
            </div>
        </footer>
    )
}
