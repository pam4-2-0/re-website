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
- `=commit_log` — run `git diff HEAD`, read changed files, output 1 suggested commit message (Conventional Commits format). Do NOT commit. User commits manually.
- `=prompt_anti [mô tả việc cần làm]` — generate 1 Antigravity prompt in English (scoped to RE-Website context: files, naming convention, CSS vars). Output prompt block + breakdown giải thích từng yếu tố bằng tiếng Việt. NEVER include browser verification, screenshot requests, or phrases like "Return your findings", "verify in browser", "take a screenshot" — omit entirely unless user explicitly requests.
- `=audit` — run B2 automated checks (grep patterns from AUDIT.md §5) against current codebase. Output: 3-column table: Item | Status | File:line. Then update §3 snapshot in AUDIT.md with current date. Flag what needs browser (cannot automate). Do NOT explain methodology — just results.

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

## Browser Verification Rule
- Do NOT include browser verification steps in any generated prompt by default
- If verification is needed, user will request it explicitly
- When requested: use file:// protocol — open `file:///D:/Vibe Coding/10_Projects/RE-Website/[filename].html` directly, do NOT spin up localhost

## Code Comment Rules
When writing CSS or JS, add a short comment ONLY when the WHY is non-obvious. Format:
- CSS: `/* [mô tả ngắn mục đích — không mô tả cái gì, mô tả tại sao] */`
- JS: `// [mô tả ngắn mục đích]`

Mandatory comment cases (áp dụng toàn dự án):
- Decorative pattern `::before` — ghi: `/* Decorative pattern — ẩn trên mobile, không ảnh hưởng layout */`
- Mobile hide `@media` cho decorative element — ghi: `/* Decorative patterns — ẩn trên mobile: không cần thiết cho UX, tiết kiệm render */`
- Scroll reveal CSS class — ghi: `/* Scroll reveal — class .visible được thêm bởi IntersectionObserver trong scripts.js */`
- Scroll reveal JS — ghi: `// Scroll reveal — observe .reveal elements, thêm class .visible khi vào viewport`
- opacity thấp trên pattern — ghi: `/* opacity 0.05–0.12: barely visible — luxury = subtle */`

Never comment: obvious CSS properties, standard resets, color values already in design system.

## Workflow Principle
Với mọi task có nhiều bước (research, planning, mapping, analysis):
- AI thực hiện đầy đủ TRƯỚC — không hỏi giữa chừng, không tạm dừng chờ approval
- User review output hoàn chỉnh → chốt quyết định
- Chỉ hỏi khi bị block bởi thông tin không thể tự quyết định

## Token Efficiency
- Skip project discovery — structure is above
- Skip file exploration — I will specify which file
- No verbose confirmation — just show what changed
- Batch edits on same file into single read + multiple str_replace
