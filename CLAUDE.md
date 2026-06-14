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
- `=prompt_anti [mô tả việc cần làm]` — TRƯỚC KHI generate: đọc `styles.css` để verify utility classes và naming patterns hiện có. Không tự đặt tên HTML element hay CSS class mới khi chưa check. Sau đó generate 1 Antigravity prompt in English (scoped to RE-Website context: files, naming convention, CSS vars). Output prompt block + breakdown giải thích từng yếu tố bằng tiếng Việt. NEVER include browser verification, screenshot requests, or phrases like "Return your findings", "verify in browser", "take a screenshot" — omit entirely unless user explicitly requests. When prompt involves color/CSS: auto-include Color Contrast Constraints block (see ## Color Contrast Rules below).
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

## Color Contrast Rules
> Full research: `_meta/research/CONTRAST_SYSTEM_RESEARCH.md`

**5 rules áp dụng mọi lúc khi viết CSS màu sắc:**
1. Body text, heading, nav, label → `color: var(--black)` trên nền sáng (13.72:1 ✅)
2. Gold `#C7A158` trên nền sáng → CHỈ accent: hover, thin border, eyebrow decorative. KHÔNG body text (2.12:1 ❌)
3. Gold trên nền tối (navy) → ĐƯỢC dùng cho heading, eyebrow, CTA (6.46:1 ✅)
4. Text trên nền tối → dùng `var(--off-white)` hoặc `rgba(255,255,255,…)` (13.41:1 ✅)
5. Logo navy trên nền tối → thêm `filter: brightness(0) invert(1)` để chuyển sang trắng

**=prompt_anti Color Constraint block (auto-include khi prompt có màu/CSS):**
```
Color constraints (Silver Creek brand):
- Body text on light bg: navy #102537 (ratio 13.72:1 — always pass)
- Gold #C7A158 on light bg: accent only (hover, border, decorative eyebrow) — NOT body text
- Gold #C7A158 on navy bg: OK for heading/CTA/eyebrow (ratio 6.46:1 AA pass)
- Text on dark sections: ivory #F2EDE3 or rgba(255,255,255,x) — NOT pure white unless needed
- Logo on dark bg: CSS filter: brightness(0) invert(1)
- Do NOT hardcode hex values — use CSS vars: --black, --gold, --off-white, --sage, --gray-text
```

## Naming Convention
Áp dụng khi tạo class mới trong `=prompt_anti` hoặc `=fix`:
- Layout wrapper: `l-[name]` (l-header, l-footer, l-main)
- Section: `s-[name]` (s-hero, s-brand-intro, s-values)
- Multi-col layout: `[n]-col-layout` (three-col-layout, four-col-layout)
- Column item: `[descriptor]-col` — descriptor mô tả nội dung thực tế (prop-col, center-col)
- Image block: `[descriptor]-img` (prop-img, hero-img)
- Không dùng prefix chung chung: stat-, card-, item-, box- — phải mô tả đúng nội dung
- Không đặt tên mới khi chưa tra `components.css` để check pattern đang có

## Token Efficiency
- Skip project discovery — structure is above
- Skip file exploration — I will specify which file
- No verbose confirmation — just show what changed
- Batch edits on same file into single read + multiple str_replace
