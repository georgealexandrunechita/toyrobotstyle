import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Board from "../components/Board";
import RobotReport from "../components/RobotReport";

const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

export default function Game() {
    const [robot, setRobot] = useState(null);
    const [walls, setWalls] = useState([]);
    const [report, setReport] = useState("");
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

    const placeRobot = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Colocar Robot",
            html: `
        <div class="space-y-4">
          <div class="text-left">
            <label class="block text-sm font-semibold text-slate-200 mb-2">Fila (1-5)</label>
            <input id="row" type="number" min="1" max="5" 
              class="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              value="1">
          </div>
          <div class="text-left">
            <label class="block text-sm font-semibold text-slate-200 mb-2">Columna (1-5)</label>
            <input id="col" type="number" min="1" max="5" 
              class="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              value="1">
          </div>
          <div class="text-left">
            <label class="block text-sm font-semibold text-slate-200 mb-2">Dirección</label>
            <select id="facing" 
              class="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="NORTH">NORTH ⬆️</option>
              <option value="EAST">EAST ➡️</option>
              <option value="SOUTH">SOUTH ⬇️</option>
              <option value="WEST">WEST ⬅️</option>
            </select>
          </div>
        </div>
      `,
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#f1f5f9",
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Colocar Robot",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3b82f6",
            cancelButtonColor: "#64748b",
            customClass: {
                popup: "rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-xl",
                title: "text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent",
                confirmButton: "rounded-xl px-8 py-3 font-bold shadow-lg hover:shadow-xl transition-all",
                cancelButton: "rounded-xl px-8 py-3 font-bold shadow-lg hover:shadow-xl transition-all"
            },
            preConfirm: () => {
                return {
                    row: parseInt(document.getElementById("row").value),
                    col: parseInt(document.getElementById("col").value),
                    facing: document.getElementById("facing").value
                };
            }
        });

        if (formValues) {
            const { row, col, facing } = formValues;
            if (row >= 1 && row <= 5 && col >= 1 && col <= 5 && DIRECTIONS.includes(facing)) {
                setRobot({ row, col, facing });
                Swal.fire({
                    icon: "success",
                    title: "Robot colocado",
                    text: `Posición: ${row},${col},${facing}`,
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    color: "#f1f5f9",
                    confirmButtonColor: "#10b981",
                    customClass: {
                        popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Posición inválida",
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    color: "#f1f5f9",
                    confirmButtonColor: "#ef4444",
                    customClass: {
                        popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                    }
                });
            }
        }
    };

    const placeWall = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Colocar Pared",
            html: `
        <div class="space-y-4">
          <div class="text-left">
            <label class="block text-sm font-semibold text-slate-200 mb-2">Fila (1-5)</label>
            <input id="wrow" type="number" min="1" max="5" 
              class="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              value="1">
          </div>
          <div class="text-left">
            <label class="block text-sm font-semibold text-slate-200 mb-2">Columna (1-5)</label>
            <input id="wcol" type="number" min="1" max="5" 
              class="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              value="1">
          </div>
        </div>
      `,
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#f1f5f9",
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Colocar Pared",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#64748b",
            cancelButtonColor: "#475569",
            customClass: {
                popup: "rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-xl",
                title: "text-2xl font-black bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent",
                confirmButton: "rounded-xl px-8 py-3 font-bold shadow-lg hover:shadow-xl transition-all",
                cancelButton: "rounded-xl px-8 py-3 font-bold shadow-lg hover:shadow-xl transition-all"
            },
            preConfirm: () => {
                return {
                    row: parseInt(document.getElementById("wrow").value),
                    col: parseInt(document.getElementById("wcol").value)
                };
            }
        });

        if (formValues) {
            const { row, col } = formValues;
            if (row >= 1 && row <= 5 && col >= 1 && col <= 5) {
                if (robot && robot.row === row && robot.col === col) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No puedes colocar pared donde está el robot",
                        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                        color: "#f1f5f9",
                        confirmButtonColor: "#ef4444",
                        customClass: {
                            popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                        }
                    });
                    return;
                }
                if (walls.some(w => w.row === row && w.col === col)) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ya hay una pared ahí",
                        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                        color: "#f1f5f9",
                        confirmButtonColor: "#ef4444",
                        customClass: {
                            popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                        }
                    });
                    return;
                }
                setWalls([...walls, { row, col }]);
                Swal.fire({
                    icon: "success",
                    title: "Pared colocada",
                    text: `Posición: ${row},${col}`,
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    color: "#f1f5f9",
                    confirmButtonColor: "#10b981",
                    customClass: {
                        popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Posición inválida",
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    color: "#f1f5f9",
                    confirmButtonColor: "#ef4444",
                    customClass: {
                        popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                    }
                });
            }
        }
    };

    const moveRobot = () => {
        if (!robot) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Primero coloca el robot",
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                color: "#f1f5f9",
                confirmButtonColor: "#ef4444",
                customClass: {
                    popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                }
            });
            return;
        }

        let { row: mr, col: mc, facing: mf } = robot;
        let newRow = mr, newCol = mc;

        switch (mf) {
            case "NORTH": newRow = mr === 5 ? 1 : mr + 1; break;
            case "SOUTH": newRow = mr === 1 ? 5 : mr - 1; break;
            case "EAST": newCol = mc === 5 ? 1 : mc + 1; break;
            case "WEST": newCol = mc === 1 ? 5 : mc - 1; break;
        }

        if (walls.some(w => w.row === newRow && w.col === newCol)) {
            Swal.fire({
                icon: "warning",
                title: "Pared detectada",
                text: "El robot no puede pasar",
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                color: "#f1f5f9",
                confirmButtonColor: "#f59e0b",
                customClass: {
                    popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                }
            });
        } else {
            setRobot({ row: newRow, col: newCol, facing: mf });
            Swal.fire({
                icon: "success",
                title: "Robot movido",
                text: `Nueva posición: ${newRow},${newCol},${mf}`,
                timer: 1500,
                showConfirmButton: false,
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                color: "#f1f5f9",
                customClass: {
                    popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                }
            });
        }
    };

    const rotateRobot = (direction) => {
        if (!robot) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Primero coloca el robot",
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                color: "#f1f5f9",
                confirmButtonColor: "#ef4444",
                customClass: {
                    popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                }
            });
            return;
        }

        const offset = direction === "LEFT" ? 3 : 1;
        const newFacing = DIRECTIONS[(DIRECTIONS.indexOf(robot.facing) + offset) % 4];
        setRobot({ ...robot, facing: newFacing });
        Swal.fire({
            icon: "success",
            title: "Robot girado",
            text: `Nueva dirección: ${newFacing}`,
            timer: 1500,
            showConfirmButton: false,
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#f1f5f9",
            customClass: {
                popup: "rounded-3xl shadow-2xl border border-slate-700/50"
            }
        });
    };

    const generateReport = () => {
        if (robot) {
            const reportText = `${robot.row},${robot.col},${robot.facing}`;
            setReport(reportText);
            Swal.fire({
                icon: "info",
                title: "Reporte del Robot",
                html: `<div class="text-2xl font-mono font-bold text-blue-400 mt-4">${reportText}</div>`,
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                color: "#f1f5f9",
                confirmButtonColor: "#3b82f6",
                customClass: {
                    popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No hay robot en el tablero",
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                color: "#f1f5f9",
                confirmButtonColor: "#ef4444",
                customClass: {
                    popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                }
            });
        }
    };

    const clearBoard = () => {
        Swal.fire({
            title: "¿Limpiar tablero?",
            text: "Se eliminarán el robot y todas las paredes",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Limpiar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#f1f5f9",
            customClass: {
                popup: "rounded-3xl shadow-2xl border border-slate-700/50",
                confirmButton: "rounded-xl px-8 py-3 font-bold shadow-lg hover:shadow-xl transition-all",
                cancelButton: "rounded-xl px-8 py-3 font-bold shadow-lg hover:shadow-xl transition-all"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setRobot(null);
                setWalls([]);
                setReport("");
                Swal.fire({
                    icon: "success",
                    title: "Tablero limpiado",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    color: "#f1f5f9",
                    customClass: {
                        popup: "rounded-3xl shadow-2xl border border-slate-700/50"
                    }
                });
            }
        });
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center px-2 sm:px-4 py-4 overflow-hidden">
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

            <div className="w-full max-w-7xl relative z-10 mx-auto space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold transition-all duration-300 hover:translate-x-1 group text-sm"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver
                    </Link>

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
                                onChange={(e) => setVolume(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, rgba(71, 85, 105, 0.5) ${volume}%, rgba(71, 85, 105, 0.5) 100%)`
                                }}
                            />
                            <span className="text-slate-300 font-mono text-xs font-bold min-w-[2ch]">{volume}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                    <div className="xl:col-span-7">
                        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-1 shadow-2xl border border-white/10">
                            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 flex items-center justify-center min-h-[400px] lg:min-h-[550px] border border-white/10">
                                <Board robot={robot} walls={walls} />
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-5 space-y-4">
                        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-1 shadow-2xl border border-white/10">
                            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10">
                                <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4 text-center tracking-tight">
                                    Controles
                                </h2>

                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    <button
                                        onClick={placeRobot}
                                        className="group relative overflow-hidden rounded-xl p-3 sm:p-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm text-slate-200 hover:text-white active:scale-95"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <span className="relative">Colocar Robot</span>
                                    </button>

                                    <button
                                        onClick={placeWall}
                                        className="group relative overflow-hidden rounded-xl p-3 sm:p-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm text-slate-200 hover:text-white active:scale-95"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-slate-400/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <span className="relative">Colocar Pared</span>
                                    </button>

                                    <button
                                        onClick={moveRobot}
                                        className="group relative overflow-hidden rounded-xl p-3 sm:p-4 bg-gradient-to-r from-emerald-500 to-teal-600 border border-white/20 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm text-white active:scale-95"
                                    >
                                        <span className="absolute inset-0 bg-white/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <span className="relative z-10">Mover</span>
                                    </button>

                                    <button
                                        onClick={() => rotateRobot("LEFT")}
                                        className="rounded-xl p-3 sm:p-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm text-slate-200 hover:text-white active:scale-95"
                                    >
                                        ← Girar
                                    </button>

                                    <button
                                        onClick={() => rotateRobot("RIGHT")}
                                        className="rounded-xl p-3 sm:p-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm text-slate-200 hover:text-white active:scale-95"
                                    >
                                        Girar →
                                    </button>

                                    <button
                                        onClick={generateReport}
                                        className="rounded-xl p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-indigo-600 border border-white/20 hover:from-blue-600 hover:to-indigo-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm text-white active:scale-95"
                                    >
                                        Ver Reporte
                                    </button>

                                    <button
                                        onClick={clearBoard}
                                        className="rounded-xl p-3 sm:p-4 bg-gradient-to-r from-red-500 to-rose-600 border border-white/20 hover:from-red-600 hover:to-rose-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xs sm:text-sm text-white active:scale-95 col-span-2"
                                    >
                                        Limpiar Todo
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-1 shadow-lg border border-white/10">
                                <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10">
                                    <RobotReport report={report} />
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                                <h3 className="text-base font-bold text-white mb-3">Estado</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="flex justify-between">
                                        <span className="text-slate-400">Paredes:</span>
                                        <span className="font-mono text-blue-400 font-bold">{walls.length}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-slate-400">Robot:</span>
                                        <span className="font-mono text-emerald-400 font-bold text-xs sm:text-sm">
                                            {robot ? `${robot.row},${robot.col},${robot.facing}` : 'Sin colocar'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
