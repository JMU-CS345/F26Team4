# Team Constitution

*This document records how our team works together on Mage Quest. Fill in every field. Replace the italic guidance with your team's decisions. Changes to this document go through a pull request like any other change.*

---

## 1. Team and Roles

### Team Number

### Team Name

_

### Members

| Name | GitHub username | Preferred contact | Usual availability |
|------|-----------------|-------------------|--------------------|
|Jonah Parker      |parke5js                 |Discord                   |Anytime after 4                    |
|Devon Hurley      |spyepic222                 |Discord                   |8:30 pm onward                    |
|Liam Irwin      |liam278123                 |Discord                   |Evenings and night                    |
|Mark Fortune     |markf135                 |Discord                   |                    |
|Jack Moore     |nojohns137                 |Discord                   |                    |

### Scrum Master

**Sprint 1 Scrum Master:** Jonah Parker

**Does the role rotate?** Rotates each sprint

_

### Product Owner

Devon Hurley

_

### Other Responsibilities

Who is responsible for maintaining the project board / backlog in good order? Current Scrum Master

Who is responsible for deploying the main branch to production to update GitHub pages? Liam Irwin

### Decision Making

*(How do we decide things: consensus, majority vote, Scrum Master decides? What happens if we are deadlocked?)* Come to a group consensus, if that doesn't work majority, if that doesn't work Scrum Master

_

---

## 2. Scrum Process

### Sprint Length and Dates

| Sprint | Start | End | Review / Retro date |
|--------|-------|-----|---------------------|
| 1 | 11/2 | 11/8 | 11/9 |
| 2 | 11/9 | 11/15 | 11/16 |
| 3 | 11/16 | 11/29 | 11/30 |
| 4 | 11/30 | 12/6 | 12/7 |
| 5 | 12/7 | presentation day | presentation day | 

### Meetings

| Meeting | When |
|---------|------|
| Daily standup | Wed/Fri |
| Sprint planning | Mon |
| Sprint review | Mon |
| Sprint retrospective | Mon |


_

### Definition of Ready

*A backlog item may be pulled into a sprint only when:*

- [ ] it is written as a user story
- [ ] it has acceptance criteria
- [ ] it has an estimate

### Definition of Done

*An item is done only when:*

- [ ] code is reviewed and approved by at least one teammate
- [ ] all tests pass in CI
- [ ] merged to `main`
- [ ] works in the deployed build
- [ ] the issue is closed
- [ ]

### Estimation

**Method:** Story points

**Scale:** Scale of 1, 2, 3, 5, 8, 13, ? (? means unsure)

_

### Backlog and Board

**Where the backlog lives:** GitHub issues

**Board columns:** To Do → In Progress → In Review → Done

_

---

## 3. Communication

### Primary Channel

**Channel:** Discord

**Expected response time:** Within 12 hours on weekdays

### What Goes Where

Chat channel is general things, GitHub issues channel for issue discussion

_

### Reporting Blockers or Falling Behind

*(How and how early does a member tell the team they are stuck or behind?)*
After an hour of being stuck

_

### Absences

*(How much notice is required? How is the absent member's work covered?)*
A days notice, split their work between everyone
_

---

## 4. Git and GitHub Workflow

### Branch Naming

**Format:** `type/issue-short-description`

**Allowed types:** `feature`, `fix`, `docs`, `refactor`, `test`, `chore`

**Examples:**
feature/health-bar
fix/volume-control
-
-

### Branch Protection on `main`

- [ ] No direct pushes to `main`
- [ ] Required approvals before merge: _
- [ ] CI must pass before merge
- [ ] Same protection on `production`

### Commit Messages

Short clear description of what the commit does
_

### Pull Requests

**Maximum size:** aim for under 300 changed lines

**Description template:** What / Why / How to test / Screenshot

**Linking issues:** every PR includes `Closes #N`

_

### Code Review

**Review turnaround:** within 24 hours of being requested

**Who reviews what:** any teammate

_

### Merging

**Merge style:** squash and merge

**Who merges:** the author after approval

**After merge:** delete the branch

_

---

## 5. Code Conventions

### Naming

| Kind | Convention | Example |
|------|------------|---------|
| Variables and functions |Camel Case |healthBar |
| Classes |Upper Camel Case |RunePuzzle |
| Constants |All Upper Case |MULTIPLIER |
| Files |Upper Camel Case |Attack.js |
| Test files |Upper Camel Case + Test |AttackTest.js |

### Formatting

**Indentation:** tabs

**Semicolons:** always

**Quotes:** double, single for one character

**Maximum line length:** 80

**Tools:** Not sure

_

### Project Structure

*(Where does each kind of file live?)*

```
src/
  model/        (e.g., game logic, no p5 drawing calls)
  view/         (e.g., drawing code)
  controller/   (e.g., input handling)
assets/
spec/
```

### Architecture Rules

*(e.g., game logic never calls p5 drawing functions directly, so it can be unit tested)*

-
-

### Comments and Documentation

*(When are comments or JSDoc required?)*
Comment anything that is convenient to have a quick understanding of something
JSDoc for a complicated method

_

### Assets

**File naming:** all lowercase, hyphens, no spaces, category of asset first

**Licensing and attribution:** *(Where do we record the source and license of art, sound, and fonts we did not make?)*

_

---

## 6. Testing and Quality

**Test framework:** Jasmine

**Where tests live:** _ Not sure

**What must have tests:** all model code; every bug fix gets a test that reproduces it; combat and puzzle rules

_

**Coverage expectations:** 90+%

**Continuous integration:** (What does GitHub Actions run on each PR?)

_

**Rule for failing CI:** Manually go through and merge

_

**Manual playtesting:** Can find anyone to test, bugs reported in discord channel

_

---

## 7. Deployment

**Where the game is deployed:** GitHub Pages, URL here

**What triggers a deploy:** a release PR from `main` into `production`, opened by the Scrum Master after each sprint review

**Who checks the deployed build, and when:** _ We'll decide at that time

---

## 8. AI Tool Usage

**Allowed tools:** _ Copilot

**Allowed uses:** review, explanation, frameworks, simple logic

_

**Not allowed:** _ AI art/music

**Disclosure:** note AI assistance in the PR description

_

**Responsibility:** whoever submits AI-generated code must understand it and is accountable for it

_

---

## 9. Working Agreements and Conflict

### Expected Effort

3 hours per person per week

_

### Fair Contribution

If you can finish majority what is assigned during meetings

_

### Conflict Resolution

*(What steps do we follow when there is a disagreement or a problem with a teammate?)*

1. talk to the person directly
2. raise it at the retrospective
3. Scrum Master mediates
4. escalate to the instructor

### Missed Commitments

*(What happens when a member repeatedly misses commitments?)*
Talk to them and instructor if needed

_

### Amending This Constitution

Discuss it all together to decide any changes

_

---

## 10. Sign-Off

*By signing, each member agrees to follow this constitution.*

| GitHub name | Signature (type your name) | Date |
|------|----------------------------|------|
|parke5js      |Jonah Parker                            |10/28/26      |
|spyepic222      |Devin Hurley                            |10/28/26       |
|liam278123      |Liam Irwin                            |10/28/26       |
|markf135      |Mark Fortune                            |10/28/26       |
|nojohns137    |Jack Moore                            |10/28/26       |
