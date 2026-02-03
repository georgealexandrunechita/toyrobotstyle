import { useState } from "react";

export default function CommandInput({ onCommand }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onCommand(input.trim().toUpperCase());
            setInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Ej: PLACE_ROBOT 2,3,NORTH"
                    className="flex-1 px-6 py-4 rounded-lg placeholder-gray-400 focus:outline-none font-mono transition-colors text-base"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', letterSpacing: '0.05em' }}
                />
                <button 
                    type="submit"
                    className="px-8 py-4 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', letterSpacing: '0.05em' }}
                >
                    Ejecutar
                </button>
            </div>
            <div className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Presiona Enter o haz clic en Ejecutar para enviar el comando
            </div>
        </form>
    );
}