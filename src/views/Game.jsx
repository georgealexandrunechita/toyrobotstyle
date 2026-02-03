import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Board from "../components/Board";
import CommandInput from "../components/CommandInput";
import RobotReport from "../components/RobotReport";

const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"]

export default function Game() {
    const [robot, setRobot] = useState(null);
    const [walls, setWalls] = useState([]);
    const [report, setReport] = useState("");

    const handleCommand = (command) => {
        const parts = command.trim().split(" ");
        const action = parts[0];
        const args = parts[1] ? parts[1].split(",") : []; 

        switch (action) {
            case "PLACE_ROBOT":
                const [row, col, facing] = args;
                const r = parseInt(row);
                const c = parseInt(col);
                if ( r >= 1 && r <= 5 && c >= 1 && c <= 5 && DIRECTIONS.includes(facing)) {
                    setRobot({ row: r, col: c, facing });
                    Swal.fire({
                        icon: 'success',
                        title: 'Robot colocado',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire('Error', 'Posición inválida', 'error');
                }
                break;
            
            case "PLACE_WALL":
                const [wRow, wCol] = args.map(Number);
                if ( wRow >= 1 && wRow <= 5 && wCol >= 1 && wCol <= 5) {
                    if (robot && robot.row === wRow && robot.col === wCol) {
                        Swal.fire('Error', 'No puedes colocar una pared donde está el robot', 'error');
                    } else if (walls.some((w) => w.row === wRow && w.col === wCol)) {
                        Swal.fire('Error', 'Ya hay una pared ahí', 'error');
                    } else {
                        setWalls([...walls, {row: wRow, col: wCol }]);
                        Swal.fire({
                            icon: 'success',
                            title: 'Pared colocada',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                } else {
                    Swal.fire('Error', 'Posición inválida', 'error');
                }
                break;

            case "MOVE":
                if (!robot) {
                    Swal.fire('Error', 'Primero coloca el robot', 'error');
                    return;
                }
                let { row: mr, col: mc, facing: mf } = robot;
                let newRow = mr;
                let newCol = mc;

                switch (mf) {
                    case "NORTH":
                        newRow = mr === 5 ? 1 : mr + 1;
                        break;
                    case "SOUTH":
                        newRow = mr === 1 ? 5 : mr - 1;
                        break;
                    case "EAST":
                        newCol = mc === 5 ? 1 : mc + 1;
                        break;
                    case "WEST":
                        newCol = mc === 1 ? 5 : mc - 1;
                        break;
                }

                if (walls.some((w) => w.row === newRow && w.col === newCol)) {
                    Swal.fire('¡Cuidado!', 'Hay una pared en el camino', 'warning');
                } else {
                    setRobot({ row: newRow, col: newCol, facing: mf });
                }
                break;

            case "LEFT":
                if (!robot) {
                    Swal.fire('Error', 'Primero coloca el robot', 'error');
                    return;
                }
                setRobot({...robot, facing: DIRECTIONS[(DIRECTIONS.indexOf(robot.facing) + 3) % 4]});
                break;

            case "RIGHT":
                if (!robot) {
                    Swal.fire('Error', 'Primero coloca el robot', 'error');
                    return;
                }
                setRobot({...robot, facing: DIRECTIONS[(DIRECTIONS.indexOf(robot.facing) + 1) % 4]});
                break;
            
            case "REPORT":
                if (robot) {
                    setReport(`${robot.row},${robot.col},${robot.facing}`);
                    Swal.fire('Reporte', `Posición: ${robot.row},${robot.col},${robot.facing}`, 'info');
                } else {
                    Swal.fire('Error', 'No hay robot en el tablero', 'error');
                }
                break;

            default:
                Swal.fire('Comando no reconocido', 'Usa: PLACE_ROBOT, PLACE_WALL, MOVE, LEFT, RIGHT, REPORT', 'warning');
        }
    };

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <Link to="/" className="text-blue-600 hover:underline">
                        ← Volver
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">
                        Juego del Robot
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Comandos: PLACE_ROBOT, PLACE_WALL, MOVE, LEFT, RIGHT, REPORT
                    </p>
                </div>

                <Board robot={robot} walls={walls} />
                <CommandInput onCommand={handleCommand} />
                <RobotReport report={report} />
            </div>
        </div>
    );
}
