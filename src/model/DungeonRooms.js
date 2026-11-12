const DUNGEON_ROOM_SIZE = 600;
const ROOM_GRID_SIZE = 12;
const ROOM_GRID_CELL_SIZE = DUNGEON_ROOM_SIZE / ROOM_GRID_SIZE;
const DUNGEON_ROOM_WALL_THICKNESS = ROOM_GRID_CELL_SIZE;
const ROOM_ASCII_LEGEND = Object.freeze({
    o: "wall",
    "-": "floor",
    b: "barrel spawn point",
    N: "north tunnel cell",
    E: "east tunnel cell",
    S: "south tunnel cell",
    W: "west tunnel cell",
    e: "enemy spawn point",
    s: "special spawn point",
    c: "chest spawn"
});

const DungeonRoomSides = Object.freeze(["north", "east", "south", "west"]);

const TunnelPreset = Object.freeze({
    width: 100,
    length: 150,
    alignment: "center"
});

const StartRoom = Object.freeze({
    name: "start",
    type: "start",
    width: 300,
    height: 300,
    tunnelSides: Object.freeze(["east"]),
    requiredFirstRoomType: "enemy"
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

const ChestRoom = Object.freeze({
    name: "c1",
    type: "chest",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const ChestRoom2 = Object.freeze({
    name: "c2",
    type: "chest",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const MinibossRoom = Object.freeze({
    name: "mb",
    type: "miniboss",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const SpecialRoom = Object.freeze({
    name: "s",
    type: "special",
    width: DUNGEON_ROOM_SIZE,
    height: DUNGEON_ROOM_SIZE
});

const DUNGEON_ROOM_LAYOUTS = Object.freeze({
    StartRoom,
    EnemyRoom1,
    EnemyRoom2,
    EnemyRoom3,
    EnemyRoom4,
    ChestRoom,
    ChestRoom2,
    MinibossRoom,
    SpecialRoom
});

const ROOM_ASCII_LAYOUTS = Object.freeze({
    start: Object.freeze([
        "oooooo",
        "o----o",
        "o----E",
        "o----E",
        "o----o",
        "oooooo"
    ]),
    e1: Object.freeze([
        "oooooNNooooo",
        "ob-------bbo",
        "o--oo------o",
        "o--oo------o",
        "o----------o",
        "W----------E",
        "W----------E",
        "o----------o",
        "o------oob-o",
        "o--e---oo--o",
        "o----------o",
        "oooooSSooooo"
    ]),
    e2: Object.freeze([
        "oooooNNooooo",
        "obbo----oooo",
        "o-eo----oooo",
        "o--o----oooo",
        "o-------oooo",
        "W----------E",
        "W----------E",
        "oooo-------o",
        "oooo--e-oooo",
        "oooo----oooo",
        "oooo----oooo",
        "oooooSSooooo"
    ]),
    e3: Object.freeze([
        "oooooNNooooo",
        "o----------o",
        "o---------eo",
        "o------ooooo",
        "o---------bo",
        "W----------E",
        "W----------E",
        "oooooo----oo",
        "ooooobbooooo",
        "o--------ooo",
        "oe---------o",
        "oooooSSooooo"
    ]),
    e4: Object.freeze([
        "oooooNNooooo",
        "o----------o",
        "o---e------o",
        "o----------o",
        "oooo-------o",
        "W----------E",
        "W----------E",
        "o---------oo",
        "o--bb-----oo",
        "o--b-------o",
        "o---------eo",
        "oooooSSooooo"
    ]),
    c1: Object.freeze([
        "oooooNNooooo",
        "o----------o",
        "o----------o",
        "o--o--e-oooo",
        "o--o----o--o",
        "W--o-c--o--E",
        "W--o----o--E",
        "o--o-e--o--o",
        "oooo-------o",
        "o----------o",
        "o----------o",
        "oooooSSooooo"
    ]),
    c2: Object.freeze([
        "oooooNNooooo",
        "o----------o",
        "o----------o",
        "o----------o",
        "o----c-----o",
        "W----------E",
        "W----------E",
        "o----------o",
        "o----------o",
        "o----------o",
        "o----------o",
        "oooooSSooooo"
    ]),
    s: Object.freeze([
        "oooooNNooooo",
        "o----------o",
        "o----------o",
        "o----------o",
        "o----------o",
        "W----s-----E",
        "W----------E",
        "o----------o",
        "o----------o",
        "o----------o",
        "o----------o",
        "oooooSSooooo"
    ]),
    mb: Object.freeze([
        "oooooNNooooo",
        "o----------o",
        "o----------o",
        "o----------o",
        "o----------o",
        "W----------E",
        "W----------E",
        "o----------o",
        "o----------o",
        "o----------o",
        "o----------o",
        "oooooSSooooo"
    ])
});

function getTunnelSideAt(gridX, gridY, token, gridWidth, gridHeight, cellSize) {
    const openingWidth = TunnelPreset.width / cellSize;
    const horizontalOpeningStart = (gridWidth - openingWidth) / 2;
    const horizontalOpeningEnd = horizontalOpeningStart + openingWidth;
    const verticalOpeningStart = (gridHeight - openingWidth) / 2;
    const verticalOpeningEnd = verticalOpeningStart + openingWidth;
    if (gridY === 0 && token === "N" &&
        gridX >= horizontalOpeningStart && gridX < horizontalOpeningEnd) {
        return "north";
    }
    if (gridX === gridWidth - 1 && token === "E" &&
        gridY >= verticalOpeningStart && gridY < verticalOpeningEnd) {
        return "east";
    }
    if (gridY === gridHeight - 1 && token === "S" &&
        gridX >= horizontalOpeningStart && gridX < horizontalOpeningEnd) {
        return "south";
    }
    if (gridX === 0 && token === "W" &&
        gridY >= verticalOpeningStart && gridY < verticalOpeningEnd) {
        return "west";
    }
    return null;
}

function parseRoomAscii(layout, tunnelSides) {
    const asciiRows = ROOM_ASCII_LAYOUTS[layout.name];
    if (!asciiRows || asciiRows.length === 0) {
        throw new RangeError(`Room layout ${layout.name} must define an ASCII grid`);
    }

    const grid = asciiRows.map((row) => [...row]);
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
    const tunnelMarkerCounts = new Map();
    const validTokens = new Set(["o", "b", "-", "N", "E", "S", "W", "e", "s", "c"]);

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

            if (token === "N" || token === "E" || token === "S" || token === "W") {
                throw new RangeError(`Tunnel marker "${token}" is on the wrong side in layout ${layout.name}`);
            }
            if (gridY === 0 || gridY === gridHeight - 1 ||
                gridX === 0 || gridX === gridWidth - 1) {
                if (token !== "o") {
                    throw new RangeError(`Room layout ${layout.name} must have walls or tunnel markers along its edges`);
                }
            }

            const x = gridX * cellSize;
            const y = gridY * cellSize;
            if (token === "o") {
                walls.push(new Wall(x, y, cellSize, cellSize));
            } else if (token === "b") {
                barrelSpawnPoints.push(Object.freeze({
                    x: x + cellSize / 2,
                    y: y + cellSize / 2
                }));
            } else if (token === "e") {
                enemySpawnPoints.push(Object.freeze({
                    x: x + cellSize / 2,
                    y: y + cellSize / 2
                }));
            } else if (token === "s") {
                specialSpawnPoints.push(Object.freeze({
                    x: layout.width / 2,
                    y: layout.height / 2
                }));
            } else if (token === "c") {
                if (chestSpawnPoint) {
                    throw new RangeError(`Room layout ${layout.name} can only define one chest spawn point`);
                }
                chestSpawnPoint = Object.freeze({
                    x: x + cellSize / 2,
                    y: y + cellSize / 2
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
    if (layout.type === "enemy" &&
        (enemySpawnPoints.length < 1 || enemySpawnPoints.length > 2)) {
        throw new RangeError(`Enemy room layout ${layout.name} must define one or two enemy spawn points`);
    }
    if (layout.type === "chest" && !chestSpawnPoint) {
        throw new RangeError(`Chest room layout ${layout.name} must define a chest spawn point`);
    }
    if (layout.type === "special" && specialSpawnPoints.length !== 1) {
        throw new RangeError(`Special room layout ${layout.name} must define exactly one special spawn point`);
    }

    return {
        walls,
        enemySpawnPoints,
        barrelSpawnPoints,
        specialSpawnPoints,
        chestSpawnPoint,
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

function createRoom(layout, tunnelSides) {
    const knownLayouts = Object.values(DUNGEON_ROOM_LAYOUTS);
    const roomLayout = typeof layout === "string"
        ? DUNGEON_ROOM_LAYOUTS[layout] ||
            knownLayouts.find((candidate) => candidate.name === layout)
        : layout;
    if (!knownLayouts.includes(roomLayout)) {
        throw new RangeError("Unknown dungeon room layout");
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
    if (roomLayout === StartRoom && (sides.length !== 1 || sides[0] !== "east")) {
        throw new RangeError("StartRoom has a fixed east tunnel");
    }

    const roomGeometry = parseRoomAscii(roomLayout, sides);
    return {
        ...roomLayout,
        ...roomGeometry,
        ascii: ROOM_ASCII_LAYOUTS[roomLayout.name],
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
    asciiLegend: ROOM_ASCII_LEGEND,
    asciiLayouts: ROOM_ASCII_LAYOUTS,
    layouts: DUNGEON_ROOM_LAYOUTS,
    createRoom
});
