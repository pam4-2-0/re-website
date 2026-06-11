# Project Rules

## Files
- HTML: index.html, about.html, projects.html, project-detail.html, contact.html (1000-2000 lines each)
- components.css: layout/components (~1500 lines)
- styles.css: typography/colors (~500 lines)
- scripts.js: interactions

## Prompt Format
- `=fix [file] [selector] => [action]` — edit immediately, no explanation
- `=ask [scope] [question]` — explain only, no edits
- `/fix_bug` — use surgical edit skill
- Batch: `=fix [file]: 1. ... 2. ... 3. ...`

## Edit Rules
- CSS lookup order: component.css FIRST, style.css SECOND
- Do NOT read HTML unless prompt specifies or DOM check needed
- Use str_replace ONLY — never rewrite full file
- No explanation unless =ask
- No !important unless requested
- Max 1 response per prompt — no follow-up questions

## Manual Edit Policy
- When I say "đã sửa tay" / "edited manually" / "đã edit" → re-read file before next edit
- NEVER use cached file content from previous turns — always read latest version before editing
- NEVER rewrite entire file — only str_replace the requested part

## Compact Reminders
- After 5 consecutive edits → remind: "⚡ 5 edits done — consider /compact"
- When switching to a different file group → remind: "⚡ switching files — consider /compact"
- When task type changes (CSS→JS, fix→refactor) → remind: "⚡ task switch — consider /compact"
- After any SCAN→PLAN phase completes → remind: "⚡ plan ready — /compact before executing"

## Token Efficiency
- Skip project discovery — structure is above
- Skip file exploration — I will specify which file
- No verbose confirmation — just show what changed
- Batch edits on same file into single read + multiple str_replace
