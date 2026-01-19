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
    <form onSubmit={handleSubmit} style= {{ textAlign: "center"}}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ingresa comando" style={{ width: "300px", padding: "5px"}}/>
    <button type="submit" style={{ marginLeft: "10px", padding: "5px 10px"}}>Ejecutar</button>
    </form>
);
};