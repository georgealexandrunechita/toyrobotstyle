export default function RobotReport({ report }) {
    return (
        <div className="mt-4">
            {report && (
                <div className="rounded-lg p-4 shadow-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.95)' }}>Reporte del Robot:</p>
                    <p className="text-2xl font-mono font-bold" style={{ color: 'rgba(255,255,255,0.95)' }}>{report}</p>
                </div>
            )}
        </div>
    );
}