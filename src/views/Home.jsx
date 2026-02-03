import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
            <iframe
                title="Background video"
                src="https://player.cloudinary.com/embed/?cloud_name=dcp7o3atw&public_id=8879031-uhd_3840_2160_30fps_jxgm9v&autoplay=true&muted=true&loop=true&controls=false"
                className="absolute"
                style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '120%', transform: 'translate(-50%, -50%)', border: 0, zIndex: 0, pointerEvents: 'none' }}
                allow="autoplay; fullscreen"
            />
            <div className="absolute inset-0 bg-slate-900/55" aria-hidden="true" style={{ zIndex: 1 }}></div>
            <div className="max-w-lg w-full relative z-10">
                <div className="rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
                    <div className="py-8 flex items-center justify-center" style={{ background: 'transparent' }}>
                        <div className="text-center">
                            <img 
                                src="https://res.cloudinary.com/dcp7o3atw/image/upload/v1770108420/pngtree-blue-iron-robot-png-image_15455466-removebg-preview_onalh5.png" 
                                alt="Robot" 
                                className="w-24 h-24 object-contain drop-shadow-2xl mx-auto mb-2"
                                style={{ width: "100px", height: "100px" }}
                            />
                            <h1 className="text-3xl font-bold" style={{ color: '#ffffff' }}>Juego del Robot</h1>
                        </div>
                    </div>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>Bienvenido al Juego</h2>
                        
                        <p className="text-center mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                            Controla un robot en un tablero 5x5. Colócalo, muévelo en diferentes direcciones, hazlo girar y coloca paredes estratégicamente.
                        </p>
                        <div className="rounded-lg p-4 mb-8 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>
                            <div className="flex items-center gap-3">
                                <span className="text-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>•</span>
                                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>Tablero interactivo 5x5</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>•</span>
                                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>Coloca y mueve el robot</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>•</span>
                                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>Sistema de paredes y obstáculos</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>•</span>
                                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>Reporte de posición del robot</span>
                            </div>
                        </div>
                        <Link to="/game" className="block">
                            <button className="w-full px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(2px)' }}>
                                Comenzar Juego
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="text-center mt-8 text-gray-400">
                    <p className="text-sm opacity-75">ALEX NECHITA</p>
                </div>
            </div>
        </div>
    )
}
