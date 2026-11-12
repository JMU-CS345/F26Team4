describe("DungeonGenorator", function () {
    it("includes a larger special room template", function () {
        const room = DungeonRooms.createRoom("s2", ["north", "east"], 1, [false], [], [false]);

        expect(room.width).toBe(400);
        expect(room.height).toBe(400);
        expect(room.specialSpawnPoints.length).toBe(1);
        expect(room.tunnels.map((tunnel) => tunnel.side)).toEqual(["north", "east"]);
    });

    it("can select the larger special room during generation", function () {
        const dungeon = DungeonGenorator.generate({ seed: "special-1" });

        expect(dungeon.rooms.some((room) => room.template === "s2")).toBeTrue();
    });

    it("allows the start room to have one opening on any side", function () {
        for (const side of DungeonRooms.sides) {
            const room = DungeonRooms.createRoom("start", [side]);

            expect(room.tunnelSides).toEqual([side]);
            expect(room.tunnels.length).toBe(1);
        }

        expect(() => DungeonRooms.createRoom("start", [])).toThrowError(RangeError);
        expect(() => DungeonRooms.createRoom("start", ["north", "south"])).toThrowError(RangeError);
    });

    it("can generate a start opening that is not on the east", function () {
        const dungeon = DungeonGenorator.generate({ seed: "start-0" });

        expect(dungeon.rooms[0].tunnelSides).toEqual(["north"]);
    });

    it("places a chest room directly outside the start room", function () {
        const dungeon = DungeonGenorator.generate({ seed: "chest-outside-start" });
        const firstRoom = dungeon.rooms.find((room) => room.id === "room-1");
        const startConnection = dungeon.connections.find((connection) =>
            connection.fromRoomId === "start" || connection.toRoomId === "start"
        );

        expect(firstRoom.type).toBe("chest");
        expect(startConnection.fromRoomId === firstRoom.id ||
            startConnection.toRoomId === firstRoom.id).toBeTrue();
    });

    it("retries with a new reproducible seed if generation fails", function () {
        const dungeon = DungeonGenorator.generate({ seed: "seed-7" });
        const repeatedDungeon = DungeonGenorator.generate({ seed: "seed-7" });
        const replayedDungeon = DungeonGenorator.generate({ seed: dungeon.seed });

        expect(dungeon.seed).toBe("seed-7");
        expect(repeatedDungeon).toEqual(dungeon);
        expect(replayedDungeon).toEqual(dungeon);
    });

    it("creates the same dungeon when given the same seed despite a global shuffle", function () {
        const seed = "repeatable-dungeon-seed";
        const originalShuffle = window.shuffle;
        let shuffleCalls = 0;
        window.shuffle = function (values) {
            shuffleCalls += 1;
            return shuffleCalls % 2 === 0 ? [...values].reverse() : [...values];
        };

        try {
            const firstDungeon = DungeonGenorator.generate({ seed });
            const secondDungeon = DungeonGenorator.generate({ seed });

            expect(secondDungeon).toEqual(firstDungeon);
            expect(shuffleCalls).toBe(0);
        } finally {
            window.shuffle = originalShuffle;
        }
    });
});
