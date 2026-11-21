# Sprint Planning Report: Sprint 3

*Copy this file into `scrum/planning/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:** 11/20/26

**Scrum Master:** Liam Irwin

**Attendees:** Liam, Jack, Jonah, Mark

**Absent:** Devon

---

## 2. Sprint Goal

*One or two sentences describing a playable outcome, not a list of tickets. e.g., "A player can create a character and enter the first dungeon."*

The goal of this sprint is to make a more visually appealing with art for the player and the environment. Engaging in combat with different weapons with a basic inventory for now is also a priority.

---

## 3. Capacity and Velocity

**Sprint dates:** 11/20 - 12/06

**Velocity last sprint (points completed):** _ (18 points)* 

**Average velocity so far:** 16.5

**Known absences or reduced availability this sprint:** Mark not in class today

**Points committed this sprint:** 41

**Why this commitment is realistic:** *(Compare it to your velocity and capacity. If you are committing more than last sprint's velocity, explain why.)*

I think this is a realistic goal because this sprint is longer than the other sprints as we get extra days over Thanksgiving break. Several members of the team said that they were willing to work some over break. I also believe that there would be less conflicts this sprint, so each individual can be more productive. We are also feeling the pressure of getting this game done because we only have one more sprint after this.

---

## 4. Committed Backlog Items

*Every item listed here must meet the Definition of Ready in your constitution. Items should be taken from the top of the product backlog in priority order. If you skipped a higher-priority item, explain why under "Notes".*

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
|#5   | Death Report Screen  |  3 |  Devon | [ X]    |
| #20 |  Fighting Monsters      |  8   |   Liam    | [ X]    |
|  #18 |    Inventory    |  8   |  Jonah     | [X ]    |
|  #4 |  Player Loot  |   5    |  Liam  | [X ]    |
|  #52  |   Items   |   5   |   Jonah + Mark   | [X ]    |
|  #53  |   Player and Enemy Sprites  |   5   |    Jack  | [X ]    |
|  #54  |   Dungeon Environment Sprites  |   5   |  Jack   | [X ]    |
|  #19  |   Player Stats  |   1   |  Mark    | [X ]    |
|  #3  |   Health Bar  |   1  | Devon     | [X ]    |

**Total points:** 41

**Notes:** _Hopefully its not too much but I believe in us. We have extra time over break. We also still need to talk to Mark to see exactly what he wants to work on in addition to finishing up player stats.

---

## 5. Task Breakdown

*Break each story into tasks. Include tasks for writing tests and reviewing PRs, not only coding.*

### Issue #5: *(Death Report Screen)*

- [Write Code to go to death report screen when player health hits 0 (1 hour) ]
- [Write code to return to title screen (1 hour)]
- [Create layout of the death report screen (0.5 hours) ]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #20: *(Fighting Monsters)*

- [Write code to enter player into fight (1 hours) ]
- [Code to Shift camera (0.5 hours)]
- [Code to Freeze Movement (0.5 hours)]
- [Code to Implement Turn based attacks (1 hours)]
- [Delete Enemy after Victory (0.5 hour) ]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #3: *(Health Bar)*

- [Create visuals for health/mana bar (1 hour)]
- [Write code for bar to update w health/mana variables (2 hours)]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #18: *(Inventory)*

- [Write Code to create the UI for an inventory menu (2 hours)]
- [Write code to access an item in inventory  (2 hours)]
- [Write code to move an item in inventory  (2 hours)]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #52: *(Items)*

- [Create unique items (2 hours)]
- [Generate random names for weapons (1 hours)]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #53: *(Player and Enemy Sprites)*

- [Create art (2 hours)]
- [Implement the art in the game (1 hours)]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #54: *(Dungeon Environment Sprites)*

- [Create art (2 hours)]
- [Implement the art in the game (1 hours)]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #4: *(Player Loot)*

- [ Code to drop loot from defeated enemies (2 hours)]
- [ Code to take items from chests (1 hours)]
- [ Review and give feedback on the PRs (0.5 hours) ]

### Issue #19: *(Player stats)*

- [Write Code to see HP, Mana, defense, and speed (3 hours)]
- [ Review and give feedback on the PRs (0.5 hours) ]


*(Repeat for each committed story.)*

---

## 6. Work Distribution

| Member | Stories owned | Points |
|--------|---------------|--------|
|  Devon |    health bar |   3    |
|  Liam  |   Enemies     |   5    |
|  Jack  | Dungeon generation| 8  |
| Mark   |      Stats    |   5    |
| Jonah  |  Save/load    |  5     |

*If the work is not balanced, explain why:*

_If something is completed early that team member can help another to offset the increased workload to this sprint

---

## 7. Stories Split or Deferred

*Did you split any stories that were too large for one sprint, or move stories back to the backlog? List them and say why.*

_N/A

---

## 8. Retrospective Follow-Through

*Which action items from last sprint's retrospective are part of this sprint's plan, and how? (Sprint 1: write "n/a")*

| Action item | How it shows up in this sprint |
|-------------|--------------------------------|
| communicating changes to not lose progress | Telling people in discord when they completed a task and explain how they implemented it |
| keeping up with changes to not lose progress | Each individual must make sure that they are not writting code that someone else has already written |
| better planning on tasks/not doing things that weren't planned | More careful consideration of which stories that are put onto this sprint |

---

## 9. Risks and Dependencies

*What might stop the team from meeting the sprint goal? Which stories depend on others being finished first?*

One thing that our team has struggled with in the past is the challenge of fixing the merge conflicts. Therefore, it is a concern that people do not understand their exact responsibilities, so there might be duplicate code for things like picking up items. For example, the player loot story requires that the fighting monsters story is completed, so that the enemy drops loot when it is defeated.

---

## 10. Checklist

- [X] Sprint goal written
- [X] Every committed story meets the Definition of Ready
- [X] Every story has an owner
- [X] Board updated: committed stories in the sprint, tasks created
- [X] Commitment compared to velocity
- [X] Report committed to `scrum/planning/` via pull request
