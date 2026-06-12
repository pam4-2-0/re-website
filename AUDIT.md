# WEB AUDIT SOP — Legacy Development Group RE Website

> **Mục đích:** Checklist audit chuẩn, có thể chạy lại định kỳ, mapping theo 3 role (Developer / Tester / End-user).
> **Scope:** Static site — 5 HTML + 2 CSS + 1 JS, no framework, no own backend.
> **Cập nhật lần cuối:** 2026-06-12

---

## 0. STACK CONTEXT (quyết định mọi N/A)

| Yếu tố | Thực trạng |
| --- | --- |
| Build system | ❌ Không có bundler / Node / npm |
| Backend riêng | ❌ Không có — chỉ static hosting |
| Database | ❌ Không có |
| Third-party services | ✅ EmailJS (contact form), Unsplash (ảnh), Google Fonts |
| Auth / session | ❌ Không có |
| Ngôn ngữ | 1 (English) — không i18n |

> **Quy tắc N/A:** Framework gốc là enterprise SaaS audit. Với static brochure site, ~40% mục là N/A. File này giữ cấu trúc 4 pillar nhưng đánh dấu rõ cái gì **thực sự áp dụng**, và **bổ sung** các check mà framework generic bỏ sót (container consistency, gold contrast, sidenav a11y, EmailJS supply-chain).

---

## 0.1 CALIBRATION RESULT — Step 0 (2026-06-12)

> Trả lời 4 câu context (xem [AUDIT-METHODOLOGY.md](AUDIT-METHODOLOGY.md) §Step 0). Kết quả: **chỉ OVERRIDE màu gold; mọi chuẩn chức năng giữ ENFORCE mức cao.**

| Chuẩn khách quan | Trạng thái | Lý do |
| --- | --- | --- |
| Contrast — gold trên trắng | 🟢 **OVERRIDE** | Gold (#c9a060) là chủ ý thiết kế, chấp nhận 2.42:1. KHÔNG flag gold contrast. |
| Contrast — màu khác (gray-text…) | 🔵 **ENFORCE** | Chỉ gold được miễn. Token màu khác vẫn theo 4.5:1. |
| Responsive | 🔵 **ENFORCE (cao nhất)** | Chạy mọi thiết bị + nhiều browser. Verify cả 4 breakpoint + cross-browser. |
| Keyboard / A11y | 🔵 **ENFORCE (đầy đủ)** | Full WCAG keyboard: Escape, focus trap, tab order, focus visible, alt text. |
| Performance — cơ bản | 🔵 **ENFORCE** | Lazy load + width/height ảnh (chống CLS). Làm ngay. |
| Performance — sâu | 🟠 **DEFER (Phase 2)** | WebP/AVIF + preload hero → cải tiến sau, chưa tính FAIL bây giờ. |
| Security (SRI/CSP/HTTPS) | 🔵 **ENFORCE** | Cross-browser + form gửi email thật → giữ. |

---

## 1. ĐỊNH NGHĨA ROLE

| Role | Audit cái gì | Công cụ |
| --- | --- | --- |
| 🔵 **Developer** | Code-level: CSS/HTML/JS implementation, design tokens, semantic markup | Grep, code review, DevTools |
| 🟡 **Tester** | Behavior: render thực tế, responsive, keyboard, cross-page consistency | Browser, Lighthouse, manual QA |
| 🟢 **End-user** | Perceived: tốc độ cảm nhận, dễ dùng, đọc được, không lỗi mặt | Heuristic, real-device test |

> Một item có thể thuộc nhiều role. Container lệch = Dev fix code + Tester verify render + User cảm nhận lệch.

---

## 2. AUDIT MATRIX — 4 PILLAR

Ký hiệu: `[✓]` pass · `[✗]` fail (cần fix) · `[ ]` chưa kiểm tra · `[N/A]` không áp dụng · `[DEPLOY]` chỉ check khi deploy.

---

### PILLAR 1 — PERFORMANCE & SPEED

#### UI/UX Layer
- `[ ]` 🟡🟢 **LCP < 2.5s** — hero render nhanh. ⚠️ Unsplash có redirect, chưa có `<link rel="preload">` cho hero image.
- `[✓]` 🟡 **INP scroll** — scroll handler đã set `{ passive: true }` (scripts.js:10).
- `[ ]` 🟡🟢 **INP sidenav** — mở/đóng drawer chưa đo.
- `[ ]` 🔵🟡 **CLS < 0.1** — `<img>` thiếu `width`/`height`. Background-image không gây CLS.
- `[N/A]` Skeleton screens — không có data fetch.

#### Frontend Code Layer
- `[N/A]` Tree-shaking / code-splitting / bundle — no bundler.
- `[✗]` 🔵 **Lazy loading** — `<img>` projects.html:118 thiếu `loading="lazy"`.
- `[✗]` 🔵 **Image format/dimension** — toàn bộ Unsplash URL, chưa có WebP/AVIF hint, chưa có width/height.
- `[✗]` 🔵 **Script defer** — tất cả `<script src="scripts.js">` không có `defer`. EmailJS CDN (contact.html:18) cũng không defer.
- `[N/A]` Rendering strategy (SSR/SSG/CSR) — static HTML.

#### Backend / Infra Layer
- `[DEPLOY]` 🔵 Browser caching headers (Cache-Control, ETag).
- `[DEPLOY]` 🔵 CDN cho static assets.
- `[DEPLOY]` 🔵 Brotli/Gzip compression.
- `[N/A]` DB query / Redis / N+1.

---

### PILLAR 2 — SECURITY, RELIABILITY & TRUST

#### UI/UX Layer
- `[✗]` 🔵🟡🟢 **404 page** — chưa có `404.html`. User gõ sai URL → trang trống của host.
- `[ ]` 🔵🟡🟢 **Form feedback** — contact form có state `.btn-sending` (contact.html:142) nhưng chưa verify success/error UI hiển thị đúng.
- `[ ]` 🔵🟢 **Trust indicator** — chưa có privacy note gần contact form.

#### Frontend Code Layer
- `[ ]` 🔵🟡 **Form input handling** — gửi qua EmailJS client-side. Cần verify sanitization phía nhận.
- `[✗]` 🔵 **Stale comment / mixed integration** — contact.html:124 ghi `Formspree honeypot` nhưng thực tế dùng **EmailJS** (contact.html:18-19). Comment sai → maintainer hiểu nhầm.
- `[✗]` 🔵 **Third-party SRI** — EmailJS load từ jsdelivr CDN **không có `integrity` hash** → supply-chain risk nếu CDN bị compromise.
- `[ ]` 🔵 **EmailJS key abuse** — public key `cFCpU6...` (client-side, đúng thiết kế) nhưng cần bật **domain allowlist** trong EmailJS dashboard, nếu không ai cũng dùng key để spam.
- `[N/A]` JWT / token storage — no auth.
- `[N/A]` npm audit — no npm. (Nhưng EmailJS version cần pin thủ công.)

#### Backend / Infra Layer
- `[DEPLOY]` 🔵 HTTPS + TLS 1.3.
- `[DEPLOY]` 🔵 CSP headers (đặc biệt cho phép jsdelivr + unsplash + fonts).
- `[N/A]` WAF / rate limiting / DB encryption.

---

### PILLAR 3 — MAINTAINABILITY & SCALABILITY

#### UI/UX Layer
- `[✗]` 🔵🟡 **Container consistency** — 2 offender:
  - `index.html / .slider_cont` (components.css:35) — `position:absolute; left:0; padding:20px 80px` → lệch nav trên viewport > 1400px.
  - `about.html / .hero-left` (components.css:1432) — `padding:60px 80px` full-width panel → cùng lỗi.
  - ✅ projects / project-detail / contact dùng `.container` đúng.
- `[✗]` 🔵 **Inline style** — index.html:126 có `style="font-family...font-size:28px"` hardcode trong markup.
- `[ ]` 🟡🟢 **CTA/Button behavior** đồng nhất cross-page.

#### Frontend Code Layer
- `[✓]` 🔵 **Color design tokens** — `--gold --black --white --off-white --footer-bg --gray-text` (styles.css:1-7).
- `[ ]` 🔵 **Spacing chưa tokenized** — `80px / 40px / 120px` rải rác, chỉ color dùng var. Magic numbers.
- `[ ]` 🔵 **CSS trùng lặp** — kiểm tra overlap giữa components.css ↔ styles.css.
- `[N/A]` ESLint / Prettier / test coverage — no pipeline.
- `[N/A]` Atomic Design / component framework — static HTML.

#### Backend / Infra Layer
- `[ ]` 🔵 **Git commit convention** — history mixed (`feat/` `refactor:` `pam -` `claude-ai |`). Chuẩn hóa Conventional Commits.
- `[N/A]` API versioning / REST/GraphQL.

---

### PILLAR 4 — ACCESSIBILITY & CROSS-PLATFORM

#### UI/UX Layer
- `[ ]` 🟡🟢 **Responsive** — breakpoints 1024/991/768/576px tồn tại, chưa verify render thực tế.
- `[~]` 🔵🟡🟢 **WCAG contrast** — đo thực tế (gold = OVERRIDE theo §0.1):
  | Cặp màu | Ratio | Chuẩn | Kết quả |
  | --- | --- | --- | --- |
  | `--gold #c9a060` trên trắng | **~2.42:1** | 3:1 (large) / 4.5:1 (normal) | 🟢 OVERRIDE — chủ ý thiết kế, không fix |
  | `--gray-text #848484` trên trắng | **~3.74:1** | 4.5:1 (normal) | ✗ FAIL nếu dùng cho body text (ENFORCE) |
  | `--gold` trên `--black` | **~8:1** | — | ✓ PASS (hero ok) |
  | `--black` trên trắng | ~19:1 | — | ✓ PASS |
- `[ ]` 🟡🟢 **Touch targets ≥ 44×44px** — hamburger, nav link, CTA.

#### Frontend Code Layer
- `[✓]` 🔵 **Semantic HTML5** — `<header><nav><main><footer><section>` dùng đúng.
- `[✓]` 🔵 **Hamburger aria-label** — có `aria-label="Menu"`.
- `[✗]` 🔵 **Generic alt** — projects.html:119 `alt="invest"` quá chung chung, không mô tả.
- `[✗]` 🔵🟡 **Keyboard: Escape đóng sidenav** — scripts.js chỉ handle `click`, không có `keydown` Escape.
- `[ ]` 🔵🟡 **Focus trap** trong sidenav khi mở.
- `[ ]` 🔵🟡 **Visible focus states** trên interactive elements.

#### Backend / Infra Layer
- `[N/A]` i18n schema / Geo-routing / localization middleware — single language.

---

## 3. CURRENT FINDINGS — Snapshot 2026-06-12 v2 (post-fix run: =audit)

### ✅ FIXED — tất cả 12 FAIL từ snapshot v1
| # | Item | File:line |
| --- | --- | --- |
| 1 | Container `.slider_cont` — `left: max(80px, calc(...))` | components.css:38 |
| 2 | Container `.hero-left` — `padding: 60px 80px 60px max(...)` | components.css:1435 |
| 3 | Sidenav Escape key — keydown handler | scripts.js:34-35 |
| 4 | alt text mô tả đầy đủ | projects.html:118 |
| 5 | EmailJS SRI `sha384-SALc35...` | contact.html:18 |
| 6 | Comment honeypot — đúng "Formspree spam honeypot" | contact.html:126 |
| 7 | 404.html tạo mới | 404.html |
| 8 | `<img>` lazy + width/height | projects.html:118 |
| 9 | Inline font-size:28px | index.html — removed |
| 10 | Inline font-size:25px | index.html — removed |
| 11 | `<script>` defer | 5/5 pages |
| 12 | Breadcrumb inline style → `.breadcrumb-link` | project-detail.html:85 |

### 🟡 TO-VERIFY IN BROWSER (không tự động hóa được)
- Responsive render — 4 breakpoint (1024/991/768/576) × Chrome/Firefox/Safari
- Touch targets ≥ 44×44px — hamburger, nav links, CTA buttons
- Visible focus states — mọi interactive element
- Sidenav: Escape đóng + focus trap khi mở
- Tab order hợp lý
- `--gray-text #848484` (3.74:1) — xác nhận context: body text → FAIL; label/placeholder → chấp nhận

### 🟡 ACCEPTED AS-IS (chủ ý giữ lại)
- `404.html:90-93` — 4 inline styles (font-size, margin) — file mới, ít thay đổi, chấp nhận
- `projects.html:121` — `style="width:100%;height:100%;object-fit:cover"` trên img — functional layout

### 🟢 ACCEPTED OVERRIDE — không tính FAIL
- Gold `#c9a060` contrast 2.42:1 — chủ ý thiết kế (Calibration §0.1)
- contact.html dual submission (Formspree primary + EmailJS secondary) — working as designed

### ⚠️ SUSPECT — chưa verify container wrapper
| Item | File:line |
|---|---|
| `.quote-white-block { padding: 100px 80px }` | components.css:354 |
| Row item `{ padding: 45px 80px }` | components.css:569 |

### 🟠 DEFERRED — Phase 2
- Ảnh WebP/AVIF self-host
- Preload hero image cho LCP

### ✅ PASS (confirmed by grep)
- Color design tokens (styles.css:1-7)
- Semantic HTML5 (`<header><nav><main><footer><section>`)
- Hamburger `aria-label="Menu"`
- Scroll handler `passive:true` (scripts.js:10)
- Tất cả `.container` usage đúng — 5/5 pages

---

## 4. WORKFLOW — cách chạy lại audit

```
[B1: UI/UX Scan] → [B2: Code Trace] → [B3: Deploy Check] → [B4: Report]
```

1. **B1 — UI/UX Scan (Tester + End-user):** Lighthouse + manual heuristic. Log lỗi mặt, lệch layout, contrast.
2. **B2 — Code Trace (Developer):** map mỗi lỗi visual về file:line. Grep pattern (xem §5).
3. **B3 — Deploy Check (Developer):** chỉ chạy items `[DEPLOY]` khi lên hosting — headers, HTTPS, CSP, compression.
4. **B4 — Report:** update §3 snapshot với ngày mới, đánh dấu lại FAIL/PASS.

---

## 5. GREP PATTERNS — automated re-check

```bash
# Container consistency — section nào thiếu .container
Select-String *.html -Pattern 'class="container'

# Hardcoded padding trùng container value
Select-String *.css -Pattern 'padding.*80px'

# Inline styles trong markup
Select-String *.html -Pattern 'style="'

# Missing lazy loading
Select-String *.html -Pattern '<img'   # → check thiếu loading=

# Alt text chất lượng
Select-String *.html -Pattern 'alt='

# Third-party CDN không SRI
Select-String *.html -Pattern '<script src="https'   # → check thiếu integrity=

# Keyboard handler
Select-String scripts.js -Pattern 'keydown|Escape'   # → nếu rỗng = thiếu
```

> ⚠️ **Giới hạn của grep:** chỉ bắt được lỗi structural. Contrast, responsive render, INP, focus order **phải test trong browser** — automated tool không thay được.
