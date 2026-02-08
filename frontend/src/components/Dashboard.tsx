import Widgets from './Widgets'
import SequenceStream from './SequenceStream'

export default function Dashboard() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-surface-dark/20">
                <Widgets />
            </div>
            <div className="flex-1 p-6 flex flex-col min-h-0">
                <SequenceStream />
            </div>
        </>
    )
}
