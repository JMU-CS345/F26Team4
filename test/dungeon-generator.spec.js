describe("DungeonGenorator", function () {
    it("creates the same dungeon when given the same seed", function () {
        const seed = "repeatable-dungeon-seed";
        const firstDungeon = DungeonGenorator.generate({ seed });
        const secondDungeon = DungeonGenorator.generate({ seed });

        expect(secondDungeon).toEqual(firstDungeon);
    });
});
