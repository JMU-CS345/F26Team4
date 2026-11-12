const DEFAULT_DUNGEON_ROOM_COUNT = 10;
const GENERATED_ROOM_TYPES = Object.freeze(["enemy", "chest", "special"]);
const GENERATED_ROOM_TYPE_COUNTS = Object.freeze({
    enemy: 4,
    chest: 2,
    special: 2
});
const NON_ADJACENT_ROOM_TYPES = new Set(["chest", "special"]);
const OPPOSITE_ROOM_SIDE = Object.freeze({
    north: "south",
    east: "west",
    south: "north",
    west: "east"
});

function createSeededRandom(seed) {
    const seedText = String(seed);
    let state = 2166136261;
    for (let index = 0; index < seedText.length; index += 1) {
        state ^= seedText.charCodeAt(index);
        state = Math.imul(state, 16777619);
    }

    return function nextRandom() {
        state += 0x6D2B79F5;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffleWithSeededRandom(values, random) {
    const shuffled = [...values];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
}

function createRoomTypes(random) {
    const generatedTypes = GENERATED_ROOM_TYPES.flatMap((type) =>
        Array(GENERATED_ROOM_TYPE_COUNTS[type]).fill(type)
    );
    return ["start", ...shuffleWithSeededRandom(generatedTypes, random), "miniboss"];
}

function getRoomPositionFromConnection(parent, parentPosition, child, parentSide) {
    const parentTunnel = parent.tunnels.find((tunnel) => tunnel.side === parentSide);
    const childSide = OPPOSITE_ROOM_SIDE[parentSide];
    const childTunnel = child.tunnels.find((tunnel) => tunnel.side === childSide);
    if (!parentTunnel || !childTunnel ||
        parentTunnel.width !== childTunnel.width ||
        parentTunnel.height !== childTunnel.height) {
        return null;
    }

    if (parentSide === "east") {
        return {
            x: parentPosition.x + parent.width + parentTunnel.length + childTunnel.length,
            y: parentPosition.y + parentTunnel.y - childTunnel.y
        };
    }
    if (parentSide === "west") {
        return {
            x: parentPosition.x - child.width - parentTunnel.length - childTunnel.length,
            y: parentPosition.y + parentTunnel.y - childTunnel.y
        };
    }
    if (parentSide === "south") {
        return {
            x: parentPosition.x + parentTunnel.x - childTunnel.x,
            y: parentPosition.y + parent.height + parentTunnel.length + childTunnel.length
        };
    }
    return {
        x: parentPosition.x + parentTunnel.x - childTunnel.x,
        y: parentPosition.y - child.height - parentTunnel.length - childTunnel.length
    };
}

function rectanglesOverlap(first, second) {
    return first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y;
}

function getCorridorBounds(parent, parentPosition, child, childPosition, side) {
    const parentTunnel = parent.tunnels.find((tunnel) => tunnel.side === side);
    const childTunnel = child.tunnels.find((tunnel) =>
        tunnel.side === OPPOSITE_ROOM_SIDE[side]
    );
    if (!parentTunnel || !childTunnel) {
        return null;
    }

    if (side === "east") {
        return {
            x: parentPosition.x + parent.width,
            y: parentPosition.y + parentTunnel.y,
            width: parentTunnel.length + childTunnel.length,
            height: parentTunnel.height
        };
    }
    if (side === "west") {
        return {
            x: childPosition.x + child.width,
            y: parentPosition.y + parentTunnel.y,
            width: parentTunnel.length + childTunnel.length,
            height: parentTunnel.height
        };
    }
    if (side === "south") {
        return {
            x: parentPosition.x + parentTunnel.x,
            y: parentPosition.y + parent.height,
            width: parentTunnel.width,
            height: parentTunnel.length + childTunnel.length
        };
    }
    return {
        x: parentPosition.x + parentTunnel.x,
        y: childPosition.y + child.height,
        width: parentTunnel.width,
        height: parentTunnel.length + childTunnel.length
    };
}

function samePosition(first, second) {
    return first.x === second.x && first.y === second.y;
}

function canConnectRoomTypes(firstType, secondType) {
    return !(NON_ADJACENT_ROOM_TYPES.has(firstType) &&
        NON_ADJACENT_ROOM_TYPES.has(secondType));
}

function hasOnlyOppositeConnections(sides) {
    const [firstSide, secondSide] = sides;
    return sides.length === 2 && OPPOSITE_ROOM_SIDE[firstSide] === secondSide;
}

function tryCreateDungeon(seed, roomTypes, templatesByType, random) {
    const rooms = [];
    const positions = [];
    const connections = [];
    const usedTunnels = [];
    const roomSides = DungeonRooms.sides;
    const connectedSides = new Map();
    const enemyRoomRotations = new Map();

    for (let index = 0; index < roomTypes.length; index += 1) {
        const type = roomTypes[index];
        const templates = templatesByType[type];
        if (!templates || templates.length === 0) {
            throw new RangeError(`No room templates are available for required type "${type}"`);
        }
        const layout = templates[Math.floor(random() * templates.length)];
        let rotation = 0;
        if (type === "enemy") {
            const usedRotations = enemyRoomRotations.get(layout.name) || new Set();
            const availableRotations = [0, 1, 2, 3].filter((value) =>
                !usedRotations.has(value)
            );
            rotation = availableRotations[
                Math.floor(random() * availableRotations.length)
            ];
            usedRotations.add(rotation);
            enemyRoomRotations.set(layout.name, usedRotations);
        } else if (type === "chest" || type === "special") {
            rotation = Math.floor(random() * 4);
        }
        const optionalBarrelCount = DungeonRooms.asciiLayouts[layout.name]
            .join("")
            .split("b").length - 1;
        const optionalEnemyCount = DungeonRooms.asciiLayouts[layout.name]
            .join("")
            .split("e").length - 1;
        const optionalWallCount = DungeonRooms.asciiLayouts[layout.name]
            .join("")
            .split("o").length - 1;
        const barrelSpawnRolls = Array.from(
            { length: optionalBarrelCount },
            () => random() < 1 / 3
        );
        const enemySpawnRolls = Array.from(
            { length: optionalEnemyCount },
            () => random() < 1 / 3
        );
        const wallSpawnRolls = Array.from(
            { length: optionalWallCount },
            () => random() < 1 / 3
        );
        const id = index === 0 ? "start" : `room-${index}`;
        if (index === 0) {
            const startRoom = DungeonLayout.createRoomInstance({
                id,
                layout,
                gridX: 0,
                gridY: 0,
                barrelSpawnRolls,
                enemySpawnRolls,
                wallSpawnRolls
            });
            rooms.push(startRoom);
            positions.push({ x: 0, y: 0 });
            connectedSides.set(id, new Set());
            continue;
        }

        const isMiniboss = type === "miniboss";
        const candidateRoom = DungeonLayout.createRoomInstance({
            id,
            layout,
            gridX: 0,
            gridY: 0,
            tunnelSides: roomSides,
            rotation,
            barrelSpawnRolls,
            enemySpawnRolls,
            wallSpawnRolls
        });
        const placements = [];

        for (let parentIndex = 0; parentIndex < rooms.length; parentIndex += 1) {
            const parent = rooms[parentIndex];
            if (parent.type === "miniboss" ||
                !canConnectRoomTypes(parent.type, type)) {
                continue;
            }
            const freeSides = roomSides.filter((side) =>
                !connectedSides.get(parent.id).has(side)
            );
            for (const parentSide of shuffleWithSeededRandom(freeSides, random)) {
                const candidatePosition = getRoomPositionFromConnection(
                    parent, positions[parentIndex], candidateRoom, parentSide
                );
                if (!candidatePosition) {
                    continue;
                }

                const candidateBounds = {
                    ...candidatePosition,
                    width: candidateRoom.width,
                    height: candidateRoom.height
                };
                const roomCollision = positions.some((position, roomIndex) =>
                    rectanglesOverlap(candidateBounds, {
                        ...position,
                        width: rooms[roomIndex].width,
                        height: rooms[roomIndex].height
                    })
                ) || usedTunnels.some((tunnel) =>
                    rectanglesOverlap(candidateBounds, tunnel)
                );
                if (roomCollision) {
                    continue;
                }

                const corridor = getCorridorBounds(
                    parent, positions[parentIndex], candidateRoom, candidatePosition, parentSide
                );
                if (!corridor ||
                    usedTunnels.some((tunnel) => rectanglesOverlap(corridor, tunnel)) ||
                    positions.some((position, roomIndex) =>
                        roomIndex !== parentIndex && rectanglesOverlap(corridor, {
                            ...position,
                            width: rooms[roomIndex].width,
                            height: rooms[roomIndex].height
                        })
                    )) {
                    continue;
                }

                const extraConnections = [];
                if (!isMiniboss) {
                    for (let neighborIndex = 0; neighborIndex < rooms.length; neighborIndex += 1) {
                        if (neighborIndex === parentIndex) {
                            continue;
                        }
                        const neighbor = rooms[neighborIndex];
                        if (!canConnectRoomTypes(neighbor.type, type)) {
                            continue;
                        }
                        for (const neighborSide of roomSides) {
                            const candidateSide = OPPOSITE_ROOM_SIDE[neighborSide];
                            if (connectedSides.get(neighbor.id).has(neighborSide) ||
                                candidateSide === OPPOSITE_ROOM_SIDE[parentSide] ||
                                extraConnections.some((connection) =>
                                    connection.toSide === candidateSide
                                )) {
                                continue;
                            }
                            const expectedPosition = getRoomPositionFromConnection(
                                neighbor,
                                positions[neighborIndex],
                                candidateRoom,
                                neighborSide
                            );
                            if (!expectedPosition ||
                                !samePosition(expectedPosition, candidatePosition)) {
                                continue;
                            }

                            const extraCorridor = getCorridorBounds(
                                neighbor,
                                positions[neighborIndex],
                                candidateRoom,
                                candidatePosition,
                                neighborSide
                            );
                            const extraCorridorHitsRoom = positions.some((position, roomIndex) =>
                                roomIndex !== neighborIndex && rectanglesOverlap(extraCorridor, {
                                    ...position,
                                    width: rooms[roomIndex].width,
                                    height: rooms[roomIndex].height
                                })
                            );
                            if (extraCorridorHitsRoom || usedTunnels.some((tunnel) =>
                                rectanglesOverlap(extraCorridor, tunnel)
                            ) || rectanglesOverlap(extraCorridor, corridor) ||
                                extraConnections.some((connection) =>
                                    rectanglesOverlap(extraCorridor, connection.corridor)
                                )) {
                                continue;
                            }
                            extraConnections.push({
                                fromRoom: neighbor,
                                fromSide: neighborSide,
                                toSide: candidateSide,
                                corridor: extraCorridor
                            });
                            break;
                        }
                    }
                }

                if (hasOnlyOppositeConnections([
                    ...connectedSides.get(parent.id),
                    parentSide
                ])) {
                    continue;
                }

                const candidateSides = new Set([
                    OPPOSITE_ROOM_SIDE[parentSide]
                ]);
                const validExtraConnections = [];
                for (const connection of extraConnections) {
                    const neighborSides = [
                        ...connectedSides.get(connection.fromRoom.id),
                        connection.fromSide
                    ];
                    const proposedCandidateSides = new Set(candidateSides);
                    proposedCandidateSides.add(connection.toSide);
                    if (hasOnlyOppositeConnections(neighborSides) ||
                        hasOnlyOppositeConnections([...proposedCandidateSides])) {
                        continue;
                    }
                    candidateSides.add(connection.toSide);
                    validExtraConnections.push(connection);
                }
                if (hasOnlyOppositeConnections([...candidateSides])) {
                    continue;
                }

                placements.push({
                    parent,
                    parentSide,
                    candidatePosition,
                    corridor,
                    extraConnections: validExtraConnections
                });
            }
        }

        if (placements.length === 0) {
            return null;
        }
        const bestConnectionCount = Math.max(...placements.map((placement) =>
            placement.extraConnections.length
        ));
        const bestPlacements = placements.filter((placement) =>
            placement.extraConnections.length === bestConnectionCount
        );
        const placement = bestPlacements[Math.floor(random() * bestPlacements.length)];
        const newConnections = [{
            fromRoom: placement.parent,
            fromSide: placement.parentSide,
            toSide: OPPOSITE_ROOM_SIDE[placement.parentSide],
            corridor: placement.corridor
        }, ...placement.extraConnections];
        connectedSides.set(id, new Set());
        for (const connection of newConnections) {
            connectedSides.get(connection.fromRoom.id).add(connection.fromSide);
            connectedSides.get(id).add(connection.toSide);
            usedTunnels.push(connection.corridor);
            connections.push({
                fromRoomId: connection.fromRoom.id,
                fromSide: connection.fromSide,
                toRoomId: id,
                toSide: connection.toSide
            });
        }

        const placedRoom = DungeonLayout.createRoomInstance({
            id,
            layout,
            gridX: placement.candidatePosition.x / DungeonRooms.gridCellSize,
            gridY: placement.candidatePosition.y / DungeonRooms.gridCellSize,
            tunnelSides: roomSides,
            rotation: candidateRoom.rotation,
            barrelSpawnRolls: candidateRoom.barrelSpawnRolls,
            enemySpawnRolls: candidateRoom.enemySpawnRolls,
            wallSpawnRolls: candidateRoom.wallSpawnRolls
        });
        rooms.push(placedRoom);
        positions.push(placement.candidatePosition);
    }

    if (connections.length < rooms.length) {
        return null;
    }

    const minX = Math.min(...positions.map((position) => position.x));
    const minY = Math.min(...positions.map((position) => position.y));
    const finalizedRooms = rooms.map((room, index) => {
        const layout = Object.values(DungeonRooms.layouts).find((candidate) =>
            candidate.name === room.template
        );
        return DungeonLayout.createRoomInstance({
            id: room.id,
            layout,
            gridX: (positions[index].x - minX) / DungeonRooms.gridCellSize,
            gridY: (positions[index].y - minY) / DungeonRooms.gridCellSize,
            rotation: room.rotation,
            tunnelSides: [...connectedSides.get(room.id)],
            barrelSpawnRolls: room.barrelSpawnRolls,
            enemySpawnRolls: room.enemySpawnRolls,
            wallSpawnRolls: room.wallSpawnRolls
        });
    });
    return DungeonLayout.create({ seed, rooms: finalizedRooms, connections });
}

function generateDungeon({
    seed,
    roomCount = DEFAULT_DUNGEON_ROOM_COUNT,
    requiredRoomTypes = []
} = {}) {
    const validSeed = (typeof seed === "string" && seed.length > 0) ||
        (typeof seed === "number" && Number.isFinite(seed));
    if (!validSeed) {
        throw new TypeError("Dungeon generation requires a string or finite numeric seed");
    }
    if (roomCount !== DEFAULT_DUNGEON_ROOM_COUNT) {
        throw new RangeError(`Dungeon roomCount is fixed at ${DEFAULT_DUNGEON_ROOM_COUNT}`);
    }
    if (!Array.isArray(requiredRoomTypes) ||
        requiredRoomTypes.some((type) =>
            type !== "miniboss" && !GENERATED_ROOM_TYPES.includes(type)
        )) {
        throw new TypeError(`requiredRoomTypes must contain only: ${[...GENERATED_ROOM_TYPES, "miniboss"].join(", ")}`);
    }
    const requestedTypeCounts = requiredRoomTypes.reduce((counts, type) => {
        counts[type] = (counts[type] || 0) + 1;
        return counts;
    }, {});
    for (const [type, count] of Object.entries(requestedTypeCounts)) {
        const availableCount = type === "miniboss" ? 1 : GENERATED_ROOM_TYPE_COUNTS[type];
        if (count > availableCount) {
            throw new RangeError(`requiredRoomTypes requests more ${type} rooms than the fixed dungeon composition allows`);
        }
    }

    const random = createSeededRandom(seed);
    const roomTypes = createRoomTypes(random);
    const templatesByType = Object.values(DungeonRooms.layouts).reduce((templates, layout) => {
        if (layout.type === "start" || layout.type === "miniboss" ||
            GENERATED_ROOM_TYPES.includes(layout.type)) {
            templates[layout.type].push(layout);
        }
        return templates;
    }, Object.fromEntries(["start", ...GENERATED_ROOM_TYPES, "miniboss"].map((type) => [type, []])));

    for (let attempt = 0; attempt < 500; attempt += 1) {
        const dungeon = tryCreateDungeon(seed, roomTypes, templatesByType, random);
        if (dungeon) {
            const roomTypeCounts = dungeon.rooms.reduce((counts, room) => {
                counts[room.type] = (counts[room.type] || 0) + 1;
                return counts;
            }, {});
            if (roomTypeCounts.start !== 1 || roomTypeCounts.miniboss !== 1 ||
                GENERATED_ROOM_TYPES.some((type) =>
                    roomTypeCounts[type] !== GENERATED_ROOM_TYPE_COUNTS[type]
                )) {
                throw new RangeError("Generated dungeon must contain one start, one miniboss, four enemy, two chest, and two special rooms");
            }
            const miniboss = dungeon.rooms.find((room) => room.type === "miniboss");
            const minibossConnections = dungeon.connections.filter((connection) =>
                connection.fromRoomId === miniboss.id || connection.toRoomId === miniboss.id
            );
            if (minibossConnections.length !== 1) {
                throw new RangeError("Generated dungeon must have one miniboss room with one connection");
            }
            return dungeon;
        }
    }
    throw new RangeError("Could not generate an interconnected ten-room dungeon");
}

const DungeonGenorator = Object.freeze({
    generate: generateDungeon
});
