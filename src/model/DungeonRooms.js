const DUNGEON_ROOM_SIZE = 600;
const ROOM_GRID_SIZE = 12;
const ROOM_GRID_CELL_SIZE = DUNGEON_ROOM_SIZE / ROOM_GRID_SIZE;
const DUNGEON_ROOM_WALL_THICKNESS = ROOM_GRID_CELL_SIZE;
const DungeonRoomSides = Object.freeze(["north", "east", "south", "west"]);

const TunnelPreset = Object.freeze({
    width: 100,
    length: 75,
    alignment: "center"
});

const StartRoom = Object.freeze({
    name: "start",
    type: "start",
    width: 300,
    height: 300,
    tunnelSides: DungeonRoomSides,
    requiredFirstRoomType: "chest"
});

const EnemyRoom1 = Object.freeze({
    name: "e1",
    type: "enemy",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const EnemyRoom2 = Object.freeze({
    name: "e2",
    type: "enemy",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const EnemyRoom3 = Object.freeze({
    name: "e3",
    type: "enemy",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const EnemyRoom4 = Object.freeze({
    name: "e4",
    type: "enemy",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const EnemyRoom5 = Object.freeze({
    name: "e5",
    type: "enemy",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const EnemyRoom6 = Object.freeze({
    name: "e6",
    type: "enemy",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const ChestRoom = Object.freeze({
    name: "c",
    type: "chest",
    width: 300,
    height: 300
});

const MinibossRoom = Object.freeze({
    name: "mb",
    type: "miniboss",
    width: 500,
    height: 500
});

const SpecialRoom = Object.freeze({
    name: "s",
    type: "special",
    width: 300,
    height: 300
});

const LargeSpecialRoom = Object.freeze({
    name: "s2",
    type: "special",
    width: 400,
    height: 400
});

const DUNGEON_ROOM_LAYOUTS = Object.freeze({
    StartRoom,
    EnemyRoom1,
    EnemyRoom2,
    EnemyRoom3,
    EnemyRoom4,
    EnemyRoom5,
    EnemyRoom6,
    ChestRoom,
    MinibossRoom,
    SpecialRoom,
    LargeSpecialRoom
});

const ROOM_ASCII_LAYOUTS = Object.freeze({
    /*
    key
    O: wall
    T: possible tunnel opening
    -: floor
    E: enemy spawn
    e: chance of enemy spawn
    B: barrel
    b: chance of barrel
    o: chance of wall (one in three)
    M: miniboss spawn point
    C: chest
    S: special
    */
    start: Object.freeze([
        "OOTTOO",
        "O----O",
        "T----T",
        "T----T",
        "O----O",
        "OOTTOO"
    ]),
    e1: Object.freeze([
        "OOOOOTTOOOOO",
        "Ob-------OOO",
        "Oe--O----bOO",
        "O--OOb----oO",
        "O---o------O",
        "T----------T",
        "T----------T",
        "O--o-------O",
        "O------OoB-O",
        "OB-E---OO--O",
        "OOo-------bO",
        "OOOOOTTOOOOO"
    ]),
    e2: Object.freeze([
        "OOOOOTTOOOOO",
        "ObbOO--BOOOO",
        "O-EO----oOOO",
        "O--o---eOOOO",
        "O------bOOOO",
        "T------b---T",
        "T----------T",
        "OOo------BOO",
        "OOOo--E-oOOO",
        "OOOo----OOOO",
        "OOOOb--bOOOO",
        "OOOOOTTOOOOO"
    ]),
    e3: Object.freeze([
        "OOOOOTTOOOOO",
        "OO-oo-----BO",
        "Obe-------EO",
        "O------OOOOO",
        "Oo---------O",
        "T----------T",
        "T----------T",
        "OooOOOb-boOO",
        "OOOOOBBOOOOO",
        "OO------bOOO",
        "OE-o------bO",
        "OOOOOTTOOOOO"
    ]),
    e4: Object.freeze([
        "OOOOOTTOOOOO",
        "OO-------OOO",
        "O---E-----oO",
        "OB---------O",
        "OOOOb------O",
        "T--o-------T",
        "T----------T",
        "O--------bOO",
        "O--Bb---oOOO",
        "O--bOo-----O",
        "O-e-------EO",
        "OOOOOTTOOOOO"
    ]),
    e5: Object.freeze([
        "OOOOOTTOOOOO",
        "OBb-O-----eO",
        "Ob--Oo-bbOOO",
        "O----------O",
        "O----------O",
        "T---O------T",
        "T---OE-----T",
        "OoOOOBb----O",
        "O----------O",
        "O---bOOOOB-O",
        "OE--------bO",
        "OOOOOTTOOOOO"
    ]),
    e6: Object.freeze([
        "OOOOOTTOOOOO",
        "OOo------OOO",
        "OO--------bO",
        "O----------O",
        "O---OBBO---O",
        "T---OE-O---T",
        "T---O-eO---T",
        "O---OBBO---O",
        "O----------O",
        "O----------O",
        "OOob------bO",
        "OOOOOTTOOOOO"
    ]),
    c: Object.freeze([
        "OOTTOO",
        "Ob--oO",
        "T-C--T",
        "T----T",
        "Ob--bO",
        "OOTTOO"
    ]),
    s: Object.freeze([
        "OOTTOO",
        "Oo--bO",
        "T-S--T",
        "T----T",
        "O---oO",
        "OOTTOO"
    ]),
    s2: Object.freeze([
        "OOOTTOOO",
        "Oob---oO",
        "O-----bO",
        "T--S---T",
        "T------T",
        "O-----bO",
        "Ob----OO",
        "OOOTTOOO"
    ]),
    mb: Object.freeze([
        "OOOOTTOOOO",
        "O--------O",
        "O--------O",
        "O--------O",
        "T---M----T",
        "T--------T",
        "O--------O",
        "O--------O",
        "O--------O",
        "OOOOTTOOOO"
    ])
});

function getTunnelSideAt(gridX, gridY, token, gridWidth, gridHeight, cellSize) {
    if (token !== "T") {
        return null;
    }
    const openingWidth = TunnelPreset.width / cellSize;
    const horizontalOpeningStart = (gridWidth - openingWidth) / 2;
    const horizontalOpeningEnd = horizontalOpeningStart + openingWidth;
    const verticalOpeningStart = (gridHeight - openingWidth) / 2;
    const verticalOpeningEnd = verticalOpeningStart + openingWidth;
    if (gridY === 0 &&
        gridX >= horizontalOpeningStart && gridX < horizontalOpeningEnd) {
        return "north";
    }
    if (gridX === gridWidth - 1 &&
        gridY >= verticalOpeningStart && gridY < verticalOpeningEnd) {
        return "east";
    }
    if (gridY === gridHeight - 1 &&
        gridX >= horizontalOpeningStart && gridX < horizontalOpeningEnd) {
        return "south";
    }
    if (gridX === 0 &&
        gridY >= verticalOpeningStart && gridY < verticalOpeningEnd) {
        return "west";
    }
    return null;
}

function rotateRoomGrid(grid, quarterTurns) {
    let rotated = grid;
    for (let turn = 0; turn < quarterTurns; turn += 1) {
        rotated = rotated[0].map((_, column) =>
            rotated.map((row) => row[column]).reverse()
        );
    }
    return rotated;
}

function parseRoomAscii(
    layout, tunnelSides, rotation, barrelSpawnRolls, enemySpawnRolls, wallSpawnRolls
) {
    const asciiRows = ROOM_ASCII_LAYOUTS[layout.name];
    if (!asciiRows || asciiRows.length === 0) {
        throw new RangeError(`Room layout ${layout.name} must define an ASCII grid`);
    }

    const grid = rotateRoomGrid(asciiRows.map((row) => [...row]), rotation);
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;
    if (gridWidth === 0 || grid.some((row) => row.length !== gridWidth)) {
        throw new RangeError(`Room layout ${layout.name} must define a rectangular ASCII grid`);
    }
    const cellWidth = layout.width / gridWidth;
    const cellHeight = layout.height / gridHeight;
    if (cellWidth !== cellHeight || TunnelPreset.width % cellWidth !== 0 ||
        (gridWidth - TunnelPreset.width / cellWidth) % 2 !== 0 ||
        (gridHeight - TunnelPreset.width / cellHeight) % 2 !== 0) {
        throw new RangeError(`Room layout ${layout.name} grid cells must be square and fit centered tunnels`);
    }
    const cellSize = cellWidth;

    const walls = [];
    const enemySpawnPoints = [];
    const barrelSpawnPoints = [];
    const specialSpawnPoints = [];
    let chestSpawnPoint = null;
    let minibossSpawnPoint = null;
    const tunnelMarkerCounts = new Map();
    const validTokens = new Set(["O", "o", "B", "b", "-", "T", "E", "e", "S", "C", "M"]);
    let optionalBarrelIndex = 0;
    let optionalEnemyIndex = 0;
    let optionalWallIndex = 0;

    for (let gridY = 0; gridY < gridHeight; gridY += 1) {
        for (let gridX = 0; gridX < gridWidth; gridX += 1) {
            const token = grid[gridY][gridX];
            if (!validTokens.has(token)) {
                throw new RangeError(`Invalid room token "${token}" in layout ${layout.name}`);
            }

            const tunnelSide = getTunnelSideAt(
                gridX, gridY, token, gridWidth, gridHeight, cellSize
            );
            if (tunnelSide) {
                tunnelMarkerCounts.set(
                    tunnelSide,
                    (tunnelMarkerCounts.get(tunnelSide) || 0) + 1
                );
                if (!tunnelSides.includes(tunnelSide)) {
                    walls.push(new Wall(
                        gridX * cellSize,
                        gridY * cellSize,
                        cellSize,
                        cellSize
                    ));
                }
                continue;
            }

            if (token === "T") {
                throw new RangeError(`Tunnel marker in layout ${layout.name} must be centered on a room edge`);
            }
            if (gridY === 0 || gridY === gridHeight - 1 ||
                gridX === 0 || gridX === gridWidth - 1) {
                if (token !== "O") {
                    throw new RangeError(`Room layout ${layout.name} must have walls or tunnel markers along its edges`);
                }
            }

            const x = gridX * cellSize;
            const y = gridY * cellSize;
            if (token === "O") {
                walls.push(new Wall(x, y, cellSize, cellSize));
            } else if (token === "o") {
                if (wallSpawnRolls[optionalWallIndex]) {
                    walls.push(new Wall(x, y, cellSize, cellSize));
                }
                optionalWallIndex += 1;
            } else if (token === "B") {
                barrelSpawnPoints.push(Object.freeze({
                    x: x + cellSize / 2,
                    y: y + cellSize / 2
                }));
            } else if (token === "b") {
                if (barrelSpawnRolls[optionalBarrelIndex]) {
                    barrelSpawnPoints.push(Object.freeze({
                        x: x + cellSize / 2,
                        y: y + cellSize / 2
                    }));
                }
                optionalBarrelIndex += 1;
            } else if (token === "E") {
                enemySpawnPoints.push(Object.freeze({
                    x: x + cellSize / 2,
                    y: y + cellSize / 2
                }));
            } else if (token === "e") {
                if (enemySpawnRolls[optionalEnemyIndex] &&
                    enemySpawnPoints.length < 2) {
                    enemySpawnPoints.push(Object.freeze({
                        x: x + cellSize / 2,
                        y: y + cellSize / 2
                    }));
                }
                optionalEnemyIndex += 1;
            } else if (token === "S") {
                specialSpawnPoints.push(Object.freeze({
                    x: layout.width / 2,
                    y: layout.height / 2
                }));
            } else if (token === "C") {
                if (chestSpawnPoint) {
                    throw new RangeError(`Room layout ${layout.name} can only define one chest spawn point`);
                }
                chestSpawnPoint = Object.freeze({
                    x: layout.width / 2,
                    y: layout.height / 2
                });
            } else if (token === "M") {
                if (layout.type !== "miniboss" || minibossSpawnPoint) {
                    throw new RangeError(`Room layout ${layout.name} can only define one miniboss spawn point`);
                }
                minibossSpawnPoint = Object.freeze({
                    x: layout.width / 2,
                    y: layout.height / 2
                });
            }
        }
    }

    for (const [side, count] of tunnelMarkerCounts) {
        if (count !== TunnelPreset.width / cellSize) {
            throw new RangeError(`Room layout ${layout.name} must define a full-width ${side} tunnel marker`);
        }
    }
    for (const side of tunnelSides) {
        if (!tunnelMarkerCounts.has(side)) {
            throw new RangeError(`Room layout ${layout.name} has no ${side} tunnel markers`);
        }
    }
    if (layout.type === "enemy" && enemySpawnPoints.length < 1) {
        throw new RangeError(`Enemy room layout ${layout.name} must define at least one enemy spawn point`);
    }
    if (layout.type === "chest" && !chestSpawnPoint) {
        throw new RangeError(`Chest room layout ${layout.name} must define a chest spawn point`);
    }
    if (layout.type === "special" && specialSpawnPoints.length !== 1) {
        throw new RangeError(`Special room layout ${layout.name} must define exactly one special spawn point`);
    }
    if (layout.type === "miniboss" && !minibossSpawnPoint) {
        throw new RangeError(`Miniboss room layout ${layout.name} must define a miniboss spawn point`);
    }

    return {
        walls,
        enemySpawnPoints,
        barrelSpawnPoints,
        specialSpawnPoints,
        chestSpawnPoint,
        minibossSpawnPoint,
        gridSize: { width: gridWidth, height: gridHeight },
        gridCellSize: cellSize
    };
}

function createRoomTunnels(layout, tunnelSides, gridCellSize) {
    const roomWidth = layout.width;
    const roomHeight = layout.height;
    const centeredX = (roomWidth - TunnelPreset.width) / 2;
    const centeredY = (roomHeight - TunnelPreset.width) / 2;

    return tunnelSides.map((side) => {
        const horizontal = side === "north" || side === "south";
        return {
            side,
            x: horizontal ? centeredX : (side === "west" ? 0 : roomWidth - gridCellSize),
            y: horizontal ? (side === "north" ? 0 : roomHeight - gridCellSize) : centeredY,
            width: horizontal ? TunnelPreset.width : gridCellSize,
            height: horizontal ? gridCellSize : TunnelPreset.width,
            length: TunnelPreset.length
        };
    });
}

function createRoom(
    layout, tunnelSides, rotation = 0, barrelSpawnRolls, enemySpawnRolls,
    wallSpawnRolls
) {
    const knownLayouts = Object.values(DUNGEON_ROOM_LAYOUTS);
    const roomLayout = typeof layout === "string"
        ? DUNGEON_ROOM_LAYOUTS[layout] ||
            knownLayouts.find((candidate) => candidate.name === layout)
        : layout;
    if (!knownLayouts.includes(roomLayout)) {
        throw new RangeError("Unknown dungeon room layout");
    }
    if (!Number.isInteger(rotation) || rotation < 0 || rotation > 3) {
        throw new RangeError("Room rotation must be a quarter-turn count from 0 to 3");
    }
    const optionalBarrelCount = ROOM_ASCII_LAYOUTS[roomLayout.name]
        .join("")
        .split("b").length - 1;
    const optionalEnemyCount = ROOM_ASCII_LAYOUTS[roomLayout.name]
        .join("")
        .split("e").length - 1;
    const optionalWallCount = ROOM_ASCII_LAYOUTS[roomLayout.name]
        .join("")
        .split("o").length - 1;
    const resolvedBarrelSpawnRolls = barrelSpawnRolls === undefined
        ? Array.from({ length: optionalBarrelCount }, () => Math.random() < 1 / 3)
        : barrelSpawnRolls;
    if (!Array.isArray(resolvedBarrelSpawnRolls) ||
        resolvedBarrelSpawnRolls.length !== optionalBarrelCount ||
        resolvedBarrelSpawnRolls.some((roll) => typeof roll !== "boolean")) {
        throw new TypeError(`Room layout ${roomLayout.name} requires one boolean barrel roll per b marker`);
    }
    const resolvedEnemySpawnRolls = enemySpawnRolls === undefined
        ? Array.from({ length: optionalEnemyCount }, () => Math.random() < 1 / 3)
        : enemySpawnRolls;
    if (!Array.isArray(resolvedEnemySpawnRolls) ||
        resolvedEnemySpawnRolls.length !== optionalEnemyCount ||
        resolvedEnemySpawnRolls.some((roll) => typeof roll !== "boolean")) {
        throw new TypeError(`Room layout ${roomLayout.name} requires one boolean enemy roll per e marker`);
    }
    const resolvedWallSpawnRolls = wallSpawnRolls === undefined
        ? Array.from({ length: optionalWallCount }, () => Math.random() < 1 / 3)
        : wallSpawnRolls;
    if (!Array.isArray(resolvedWallSpawnRolls) ||
        resolvedWallSpawnRolls.length !== optionalWallCount ||
        resolvedWallSpawnRolls.some((roll) => typeof roll !== "boolean")) {
        throw new TypeError(`Room layout ${roomLayout.name} requires one boolean wall roll per o marker`);
    }

    const sides = tunnelSides === undefined
        ? (roomLayout === StartRoom ? ["east"] : [])
        : tunnelSides;
    if (!Array.isArray(sides) ||
        sides.length > DungeonRoomSides.length ||
        sides.some((side) => !DungeonRoomSides.includes(side)) ||
        new Set(sides).size !== sides.length) {
        throw new RangeError("Room tunnel sides must be unique cardinal directions (up to four)");
    }
    if (roomLayout === StartRoom && sides.length !== 1) {
        throw new RangeError("StartRoom must have exactly one tunnel");
    }

    const roomGeometry = parseRoomAscii(
        roomLayout, sides, rotation, resolvedBarrelSpawnRolls, resolvedEnemySpawnRolls,
        resolvedWallSpawnRolls
    );
    return {
        ...roomLayout,
        ...roomGeometry,
        ascii: ROOM_ASCII_LAYOUTS[roomLayout.name],
        rotation,
        barrelSpawnRolls: [...resolvedBarrelSpawnRolls],
        enemySpawnRolls: [...resolvedEnemySpawnRolls],
        wallSpawnRolls: [...resolvedWallSpawnRolls],
        tunnelSides: [...sides],
        tunnels: createRoomTunnels(roomLayout, sides, roomGeometry.gridCellSize),
        walls: roomGeometry.walls
    };
}

const DungeonRooms = Object.freeze({
    size: DUNGEON_ROOM_SIZE,
    wallThickness: DUNGEON_ROOM_WALL_THICKNESS,
    gridSize: ROOM_GRID_SIZE,
    gridCellSize: ROOM_GRID_CELL_SIZE,
    sides: DungeonRoomSides,
    tunnelPreset: TunnelPreset,
    asciiLayouts: ROOM_ASCII_LAYOUTS,
    layouts: DUNGEON_ROOM_LAYOUTS,
    createRoom
});
