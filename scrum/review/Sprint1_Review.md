# Sprint Review Report: Sprint _

*Copy this file into `scrum/review/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information. Due by 11:59 p.m. on the day of the review.*

---

## 1. Meeting Details

**Date:** _ 11/9/26

**Scrum Master:** _ Jonah Parker

**Attendees:** _ Jonah, Mark, Jack, Devon, Liam

**Absent:** _ n/a

**Presenter:** Liam

**Deployed build reviewed:** (https://jmu-cs345.github.io/F26Team4/)

**Release PR into `production`:** (https://github.com/JMU-CS345/F26Team4/pull/37)

---

## 2. Sprint Goal

*Tell the stakeholder whether the sprint delivered what it set out to.*

**The goal we set:** _ A player starts the game, selects their character, and can move around in an environment.

**Did we meet it?** *(Yes / Partly / No, and one sentence explaining why)*

_  Yes, we got a working title screen that leads into a mage select screen that leads into a character moving around in an environment.

---

## 3. Committed Items: Done or Not Done

*Done means the item meets every point of your Definition of Done, including "works in the deployed build." There is no "mostly done."*

*The presenter credits the members who built each story during the demo.*

| Issue # | User story | Estimate | Owner | Done? | Built by |
|---------|------------|----------|-------|-------|----------|
|    1     |    Player Movement        |    2      |   Mark    |  X     |  Liam         |
|    6     |   Title Screen         |    5      |  Jonah     |  X    |   Jonah        |
|    8     |    Mage Type        |    3      |   Devon    |  X     |    Devon       |
|    23     |    Collision with walls        |    5      |  Liam     |  X     |    Liam       |
|         |            |          |       |       |           |

---

## 4. Metrics

| | Points |
|---|---|
| Committed | 15 |
| Completed | 15 |
| Completion rate | 100% |

**Velocity history:**

| Sprint | Committed | Completed |
|--------|-----------|-----------|
| 1      |    15       |    15       |
| 2      |           |           |
| 3      |           |           |
| 4      |           |           |


**What explains the difference between committed and completed?** _


---

## 5. Demo

*For each completed story, list the acceptance criteria and show that each one passed in the deployed build.*

*Presenter: be ready to explain and answer questions about every completed story, including work you didn't build.*

### Issue #_: Player Movement

- [X] Given the game is active and the player is in a scene
When the player presses the up arrow button or the "w" key
Then the player should move up
- [X] Given the game is active and the player is in a scene
When the player presses the left arrow button or the "a" key
Then the player should move left
- [X] Given the game is active and the player is in a scene
When the player presses the right arrow button or the "d" key
Then the player should move right
- [X] Given the game is active and the player is in a scene
When the player presses the down arrow button or the "s" key
Then the player should move down

### Issue #_: Title Screen

- [X] Given the player launches the game
When the player presses start
Then the run begins
- [ ] Given the player ends their run
When the player presses start
Then the next run begins

### Issue #_: Mage Type

- [X] Given the player starts a new run,
When they are given the option between a Fire mage, Ice Mage, and Mind Mage,
The player can choose one and their sprite is updated.
- [ ] Given the player dies,
Their chosen mage is reset and they can pick a new type.

### Issue #_: Collision

- [X] Given the player is in the game
When they run into a wall
Then they cannot continue forward

---

## 6. Incomplete Work

*What happens to each item that is not done? Return it to the backlog and re-estimate it, even if the estimate stays the same. (Sprint 4: write "n/a")*

| Issue # | What remains | New estimate | Back in backlog? |
|---------|--------------|--------------|------------------|
|   6      |    When the players run ends, they are taken back to the title screen          |     n/a         | [ ]              |
|   8      |   When the player dies, they can select a new mage type           |    n/a          | [ ]              |

These are more an issue with acceptance criteria not being fully accurate, as the issues pertain more to the player dying which is a different story. The stories on their own work good.
---

## 7. Stakeholder Feedback

*Record what the instructor said: what they liked, what should change, and any new priorities. (Sprint 4: write "n/a")* 

_   They liked the wobbling title screen, they want to see differences between the mages to make it seem more like an RPG character with different hitpoints, etc.

---

## 8. Backlog Changes

*How did the backlog change in response to the feedback? (Sprint 4: write "n/a")*

**New stories added:** _ We didn't need to add more stories

**Priorities changed:** _ We now know the next step should be to focus on the character

**Stories removed:** _ We didn't need to remove any stories

**If no change was needed, why not?** _ We already have stories outlining additions to the character like the stats and health bar.

---

## 9. Quality

*Give the stakeholder an honest picture of the build's quality.*

**CI status on `production`:** Passing

**Number of specs:** _ 5

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
