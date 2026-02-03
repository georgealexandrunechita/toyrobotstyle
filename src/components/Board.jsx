export default function Board({ robot, walls }) {
    const size = 5;
    const cells = [];

    for (let r = size; r >= 1; r--) {
        for (let c = 1; c <= size; c++) {
            const isRobot = robot && robot.row === r && robot.col === c;
            const isWall = walls.some((w) => w.row === r && w.col === c);

            let style = { background: 'rgba(255,255,255,0.02)' };

            if (isRobot) {
                style = { background: 'rgba(255,255,255,0.03)' };
            } else if (isWall) {
                style = { background: 'rgba(255,255,255,0.02)' };
            }

            cells.push(
                <div
                    key={`${r}-${c}`}
                    className={`w-20 h-20 flex items-center justify-center font-bold text-2xl cursor-default transition-all`}
                    style={{ ...style, border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}
                >
                    {isRobot ? (
                        <div className="flex items-center justify-center w-full h-full">
                                <img 
                                src="https://res.cloudinary.com/dcp7o3atw/image/upload/v1770110998/3558860_gfpcer.png" 
                                alt="Robot"
                                className="w-12 h-12 object-contain drop-shadow-lg"
                                style={{
                                    transform: robot.facing === "NORTH" ? "rotate(0deg)" :
                                        robot.facing === "SOUTH" ? "rotate(180deg)" :
                                            robot.facing === "EAST" ? "rotate(90deg)" :
                                                "rotate(-90deg)"
                                }}
                            />
                        </div>
                    ) : isWall ? (
                        <img
                            src="https://res.cloudinary.com/dcp7o3atw/image/upload/v1770111400/4976730_pstnjk.png"
                            alt="Wall"
                            className="w-20 h-20 object-contain"
                        />
                    ) : (
                        ""
                    )}
                </div>
            );
        }
    }

    return (
        <div className="flex justify-center my-4">
            <div className="inline-block shadow-2xl rounded-lg overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                <div className="grid grid-cols-5 gap-0">
                    {cells}
                </div>
            </div>
        </div>
    );
}
