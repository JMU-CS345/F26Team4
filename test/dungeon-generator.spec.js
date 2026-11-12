describe("DungeonGenorator", function () {
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
