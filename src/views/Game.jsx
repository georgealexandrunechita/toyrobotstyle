import { useState } from "react";
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
                }
                break;
            
            case "PLACE_WALL":
                const [wRow, wCol] = args.map(Number);
                if ( wRow >= 1 && wRow <= 5 && wCol >= 1 && wCol <= 5 && (!robot || robot.row !== wRow || robot.col !== wCol) && !walls.some((w) => w.row === wRow && w.col === wCol)) {
                    setWalls([...walls, {row: wRow, col: wCol }]);
                }
                break;

            case "MOVE":
                if (!robot) return;
                let { row: mr, col: mc, facing: mf } = robot;
                let newRow = mr;
                let newCol = mc;
        }
    }
}

