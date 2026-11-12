# Sprint Planning Report: Sprint _

*Copy this file into `scrum/planning/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:** _11/11/26

**Scrum Master:** _ Devon Hurley

**Attendees:** _ Devon, Liam, Jack, Jonah, Mark

**Absent:** _ N/A

---

## 2. Sprint Goal

*One or two sentences describing a playable outcome, not a list of tickets. e.g., "A player can create a character and enter the first dungeon."*

_ When you start the game, you enter the first procedurally generated dungeon with enemies that send you to a turn based rpg style combat sequence that will not be fully implemented yet. There will also be stat visuals/templates in the GUI and a save/load mechanic.

---

## 3. Capacity and Velocity

**Sprint dates:** _11/11 to _11/18

**Velocity last sprint (points completed):** _ (15 points)* 

**Average velocity so far:** _ 15 pps

**Known absences or reduced availability this sprint:** _

**Points committed this sprint:** _ 26

**Why this commitment is realistic:** *(Compare it to your velocity and capacity. If you are committing more than last sprint's velocity, explain why.)*

_We didn't have any problems with meeting last sprint's workload, and now we have a framework to build off of and more knowledge on github and p5.js.

---

## 4. Committed Backlog Items

*Every item listed here must meet the Definition of Ready in your constitution. Items should be taken from the top of the product backlog in priority order. If you skipped a higher-priority item, explain why under "Notes".*

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
|#2   |  dungeon generation |  8  | Jack  | [ X]    |
| #12 |   enemies      |  5   |   Liam    | [ X]    |
|  #3 |   Health bar     |  3   |    Devon   | [X ]    |
|  #19 |  player stats  |   5    |  Mark   | [X ]    |
|  #16  |   save/load    |   5   |   Jonah   | [X ]    |

**Total points:** _26

**Notes:** _Hopefully its not too much but I believe in us.

---

## 5. Task Breakdown

*Break each story into tasks. Include tasks for writing tests and reviewing PRs, not only coding.*

### Issue #_: *(Dungeon Generation)*

- [Write Code for multiple rooms (1.5 hours) ]
- [Write code for enemy spawn locations (1 hour)]
- [Write code for procedural generation (3 hours) ]

### Issue #_: *(Enemies)*

- [Write code to enter player into fight (2 hours) ]
- [Create button to end fight (real fight to be implemented further, 1 hour)]
- [Implement enemy with dungeon generation (1 hour) ]

### Issue #_: *(Health Bar)*

- [Create visuals for health/mana bar (1 hour)]
- [Write code for bar to update w health/mana variables (2 hours)]

### Issue #_: *(Save/Load)*

- [Write Code to save locally (2 hours)]
- [Write code to load saves (2 hours)]

### Issue #_: *(Player stats)*

- [Write Code for updating stat menu (3 hours)]
- [Create GUI for menu (1.5 hours)]

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
|stats/stat visuals|   gui and variables added |
|  base stats for mages  | each mage type w start w different stats |

---

## 9. Risks and Dependencies

*What might stop the team from meeting the sprint goal? Which stories depend on others being finished first?*

_Enemies developer needs to work with the procedural generation dev and vice-versa, we're doing a larger workload as well.

---

## 10. Checklist

- [X] Sprint goal written
- [X] Every committed story meets the Definition of Ready
- [X] Every story has an owner
- [X] Board updated: committed stories in the sprint, tasks created
- [X] Commitment compared to velocity
- [X] Report committed to `scrum/planning/` via pull request
