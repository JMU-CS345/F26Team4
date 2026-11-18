# Sprint Review Report: Sprint _

*Copy this file into `scrum/review/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information. Due by 11:59 p.m. on the day of the review.*

---

## 1. Meeting Details

**Date:** _ 11/9/26

**Scrum Master:** _ Devon

**Attendees:** _ Jonah, Mark, Jack, Liam

**Absent:** _ Devon

**Presenter:** Jonah

**Deployed build reviewed:** (https://jmu-cs345.github.io/F26Team4/)

**Release PR into `production`:** https://github.com/JMU-CS345/F26Team4/pull/50

---

## 2. Sprint Goal

*Tell the stakeholder whether the sprint delivered what it set out to.*

**The goal we set:** _ When you start the game, you enter the first procedurally generated dungeon with enemies that send you to a turn based rpg style combat sequence that will not be fully implemented yet. There will also be stat visuals/templates in the GUI and a save/load mechanic.

**Did we meet it?** Partly

_  We got procedurally generated dungeons with enemies that follow the player, and there is a saving and loading mechanic with three save files. We did not complete the sequence into turn based combat and the stat GUI and health bar.

---

## 3. Committed Items: Done or Not Done

*Done means the item meets every point of your Definition of Done, including "works in the deployed build." There is no "mostly done."*

*The presenter credits the members who built each story during the demo.*

| Issue # | User story | Estimate | Owner | Done? | Built by |
|---------|------------|----------|-------|-------|----------|
|    2     |    Dungeon Generation  |    8      |   Jack    |  X     |  Jack         |
|    12     |   Enemies         |    5      |  Liam     |  X    |   Liam        |
|    3     |    Health Bar        |    3      |   Devon    |       |    Devon       |
|    19     |    Player Stats        |    5      |  Mark     |       |    Mark       |
|    16     |     Save/Load       |     5     |  Jonah     |   X    |   Jonah        |
|    41     |    Dynamic Camera  |    n/a      |   Jack    |  X     |  Jack         |

---

## 4. Metrics

| | Points |
|---|---|
| Committed | 26 |
| Completed | 18 |
| Completion rate | 69% |

**Velocity history:**

| Sprint | Committed | Completed |
|--------|-----------|-----------|
| 1      |    15       |    15       |
| 2      |    26       |    18       |
| 3      |           |           |
| 4      |           |           |


**What explains the difference between committed and completed?** _
We were not prepared for the merge conflicts when trying to merge the stats and main, we should get everything ready at least a day in advance in the future.

---

## 5. Demo

*For each completed story, list the acceptance criteria and show that each one passed in the deployed build.*

*Presenter: be ready to explain and answer questions about every completed story, including work you didn't build.*

### Issue #2: Dungeon Generation

- [X] Given a player is in the town (or the game is started)
when they enter the door to the next dungeon,
Then, there is a transition to a new scene with a procedurally
generated dungeon.
- [X] Given a new run is started
When the dungeon is randomized
The generation has random enemies, rooms, and loot drops.

### Issue #12: Enemies

- [X] Given the player moves into different rooms, as they enter a new room, enemies will spawn to attack them.

### Issue #3: Health Bar

- [] Given the player is in a run
When they consume a healing item
Then the health bar increases by the amount of health gained
- [ ] Given the player is in combat
When they are attacked by an enemy
Then the health bar decreases by the damage they took

### Issue #19: Player Stats

- [X] Given the player starts a run,
They are given a base stat in HP, Mana, Defense, and Speed.
- [] Given the player finds a rare stat increasing loot,
Their respective stat is permanently raised.
- [X] Given the player selects a different mage type, when they start the game, then their base stats are unique.

### Issue #16: Save/Load

- [X] Given the player has beaten a dungeon,
When the player goes to the settings and clicks "Save Game"
The game saves to local storage.
- [X] Given the player is in the menu and clicks "Load Game"
When the player clicks on their save/inputs a code,
The saved file loads and the player continues the file.

### Issue #41: Dynamic Camera

- [X] camera responds to player position
        camera switches between rooms

---

## 6. Incomplete Work

*What happens to each item that is not done? Return it to the backlog and re-estimate it, even if the estimate stays the same. (Sprint 4: write "n/a")*

| Issue # | What remains | New estimate | Back in backlog? |
|---------|--------------|--------------|------------------|
|   3      |  Visible health bar       |     3         | [X]              |
|   19      |  Stats screen, increase stats with loot       |    5     | [X]              |


---

## 7. Stakeholder Feedback

*Record what the instructor said: what they liked, what should change, and any new priorities. (Sprint 4: write "n/a")* 

_   They liked the dungeon generation, they wanted the player stats to show and mage type to change appearance, and better graphics for the game.

---

## 8. Backlog Changes

*How did the backlog change in response to the feedback? (Sprint 4: write "n/a")*

**New stories added:** _ Graphics

**Priorities changed:** _ Focus on the overall appearance of the game.

**Stories removed:** _ We didn't need to remove any stories

**If no change was needed, why not?** _ Mostly no change because we need to move health bar and stats stories back to the backlog to finish them up.

---

## 9. Quality

*Give the stakeholder an honest picture of the build's quality.*

**CI status on `production`:** Passing

**Number of specs:** _ 1

**Known bugs in the deployed build:** _ 0

---

## 10. Checklist

- [X] Demo given from the deployed GitHub Pages build
- [X] Demo given by one presenter, crediting the members who built each story
- [X] Release PR merged before the review begins
- [X] Every committed item marked Done or Not Done
- [X] Every item marked Done has all its acceptance criteria checked in section 5
- [X] Metrics filled in, with the committed/completed difference explained
- [X] Stakeholder feedback recorded (Sprint 4: n/a)
- [X] Backlog updated, or the reason no change was needed explained (Sprint 4: n/a)
- [X] Report committed to `scrum/review/` via pull request by 11:59 p.m. on the day of the review
