import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio("https://res.cloudinary.com/dcp7o3atw/video/upload/v1770141236/Zambolino_-_Machine_freetouse.com_d7wmra.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsMusicPlaying(!isMusicPlaying);
        }
    };

    const playStartSound = () => {
        const audio = new Audio("https://res.cloudinary.com/dcp7o3atw/video/upload/v1770141523/ESM_Activate_Robotic_Sentry_Gun_Sci_Fi_Robotic_Glitch_Morph_Mechanism_Texture_rsi2ps.wav");
        audio.volume = 0.5;
        audio.play();
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover -z-10"
                aria-hidden="true"
            >
                <source src="https://res.cloudinary.com/dcp7o3atw/video/upload/v1770143089/render_1_lkgpm4.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />

            <div className="absolute top-4 right-4 z-20">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 border border-white/10">
                    <button
                        onClick={toggleMusic}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 group"
                        title={isMusicPlaying ? "Pausar música" : "Reproducir música"}
                    >
                        {isMusicPlaying ? (
                            <svg className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    <div className="flex items-center gap-2 min-w-[120px] sm:min-w-[180px]">
                        <svg className="w-4 h-4 text-slate-400 hidden sm:block" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) =>  (parseInt(e.target.value))}
                            className="flex-1 h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, rgba(71, 85, 105, 0.5) ${volume}%, rgba(71, 85, 105, 0.5) 100%)`
                            }}
                        />
                        <span className="text-slate-300 font-mono text-xs font-bold min-w-[2ch]">{volume}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-md w-full relative z-10 mx-auto text-center">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-1 shadow-2xl border border-white/10">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10">
                        <div className="mb-8">
                            <img
                                src="https://res.cloudinary.com/dcp7o3atw/image/upload/v1770108420/pngtree-blue-iron-robot-png-image_15455466-removebg-preview_onalh5.png"
                                alt="Robot jugable del juego"
                                className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 drop-shadow-2xl animate-float"
                                width={112}
                                height={112}
                                loading="eager"
                            />
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                Emilio el robot
                            </h1>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                ¡Controla tu robot!
                            </h2>
                            <p className="text-lg text-slate-200 leading-relaxed max-w-lg mx-auto mb-8">
                                Maneja un robot en un tablero 5x5. Colócalo, muévelo, hazlo girar y usa paredes estratégicamente.
                            </p>
                        </div>

                        <div className="mb-10 space-y-3">
                            {[
                                "Tablero 5x5 interactivo",
                                "Movimientos y rotaciones",
                                "Paredes y obstáculos",
                                "Reporte de posición"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                                    <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm md:text-base text-slate-200 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link to="/game" className="block w-full" onClick={playStartSound}>
                            <button className="group relative w-full max-w-sm mx-auto px-8 py-4 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(251,146,60,0.6)] hover:shadow-[0_0_50px_rgba(251,146,60,0.8)] transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-300 hover:via-orange-400 hover:to-pink-400 border-2 border-orange-300/50">
                                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 text-slate-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Comenzar Juego</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <p className="mt-10 text-sm text-slate-400 font-medium tracking-wide">
                    Desarrollado por Alex Nechita
                </p>
            </div>
        </div>
    )
}
