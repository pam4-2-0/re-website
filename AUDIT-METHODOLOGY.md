# WEB AUDIT METHODOLOGY — Reusable Template

> **Mục đích:** File chuẩn về *cách* audit 1 website. Portable — copy sang dự án mới.
> **Khác với `AUDIT.md`:** file kia là findings cụ thể của 1 dự án. File này là *phương pháp*.

---

## NGUYÊN TẮC CỐT LÕI

> **"Audit chuẩn" KHÔNG có 1 nguồn chân lý duy nhất.** Sai lầm phổ biến: lấy 1 trang "đẹp nhất" làm chuẩn rồi so mọi thứ với nó → logic vòng tròn nếu trang đó cũng có lỗi.

Chuẩn đến từ **3 tầng độc lập**, mỗi tầng có nguồn authority khác nhau:

| Tầng | Tên | Authority đến từ | Có dựa vào file HTML nào không? | % khối lượng |
| --- | --- | --- | --- | --- |
| **1** | Khách quan (Objective) | External spec: WCAG, Core Web Vitals, security standard | ❌ KHÔNG — đo bằng toán/spec | ~70% |
| **2** | Nhất quán (Consistency) | CSS design system: tokens + layout classes | ❌ KHÔNG dựa HTML — dựa **CSS contract** | ~25% |
| **3** | Thẩm mỹ (Aesthetic) | Golden reference page | ✅ CÓ — nhưng chỉ sau khi trang đó pass tầng 1+2 | ~5% |

**Hệ quả quan trọng:** một trang chỉ được làm "golden reference" (tầng 3) **sau khi** nó tự pass tầng 1 và 2. Trang còn lỗi mà làm chuẩn = đóng băng bug thành "đúng".

---

## STEP 0 — CALIBRATION (làm TRƯỚC mọi audit)

> Tầng 1 (khách quan) **không áp dụng mù quáng**. Với dự án cá nhân / design đã chốt, nhiều "chuẩn" là chủ ý → phải OVERRIDE, không tính là bug.

**Trước khi audit, trả lời 4 câu để biết chuẩn nào ENFORCE / OVERRIDE:**

| # | Câu hỏi context | Quyết định chuẩn nào |
| --- | --- | --- |
| 1 | Ai thực sự dùng site? (public / chỉ mình / portfolio) | Toàn bộ baseline tầng 1 |
| 2 | Màu + typography đã chốt chưa? | Contrast / design-token audit |
| 3 | Chạy trên thiết bị nào? (desktop / +mobile / mọi nơi) | Responsive audit |
| 4 | Cần keyboard/screen-reader không? | Functional a11y audit |

**Output Step 0** = bảng ENFORCE/OVERRIDE, ghi rõ **lý do** mỗi override:

```
| Chuẩn          | Trạng thái | Lý do                                    |
| Contrast 4.5:1 | OVERRIDE   | Gold là chủ ý thiết kế, chấp nhận 2.4:1  |
| Responsive     | ENFORCE    | Khách xem trên điện thoại                 |
| Keyboard a11y  | OVERRIDE   | Cá nhân dùng chuột                        |
```

> ⚠️ OVERRIDE phải **có chủ đích + ghi lý do**. Không ghi lý do = không phải override, là bỏ sót.

---

## TẦNG 1 — OBJECTIVE (reference thresholds)

Đo được, không cần file tham chiếu:

| Nhóm | Chuẩn | Ngưỡng |
| --- | --- | --- |
| Contrast | WCAG 2.1 AA | Normal text ≥ **4.5:1** · Large (≥24px / ≥18.66px bold) ≥ **3:1** |
| Performance | Core Web Vitals | LCP < **2.5s** · INP < **200ms** · CLS < **0.1** |
| Touch | WCAG | Target ≥ **44×44px** |
| Semantic | WHATWG HTML5 | `<header><nav><main><footer><section>` đúng vai trò |
| Security | SRI / CSP / TLS | Third-party script có `integrity=` · HTTPS · CSP headers |

---

## TẦNG 2 — CONSISTENCY (baseline = CSS, KHÔNG phải HTML)

"Lệch" chỉ có nghĩa khi so với 1 mốc. Mốc đó là **CSS system**, không phải trang nào:

- **Layout contract** = class layout dùng chung (vd `.container { max-width; padding }`). HTML phải tuân thủ class này. Trang nào tự hardcode `padding` khác = vi phạm.
- **Color/spacing contract** = CSS custom properties (`--gold`, `--space-*`). Giá trị hardcode trong markup/CSS = vi phạm token.

**Cách tìm contract:** grep định nghĩa `.container`, `:root`, các class layout dùng nhiều lần → đó là hợp đồng. Rồi grep xem trang nào KHÔNG dùng / hardcode đè.

---

## TẦNG 3 — AESTHETIC (golden reference)

Phần spec + CSS không bắt được: visual hierarchy, "thở", cảm giác cao cấp. Cần 1 trang mẫu.

**Điều kiện bắt buộc:** trang mẫu phải pass tầng 1+2 trước (0 violation). Sau đó các trang khác so visual với nó cho phần chủ quan.

---

## ROLE MAPPING — ai bắt được lỗi gì

| Role | Audit layer | Công cụ | Bắt được |
| --- | --- | --- | --- |
| 🔵 **Developer** | Code implementation | Grep, code review, DevTools | Structural: container, token, semantic, SRI, lazy |
| 🟡 **Tester** | Runtime behavior | Browser, Lighthouse, manual | Render: contrast thực, responsive, INP, focus order |
| 🟢 **End-user** | Perceived | Heuristic, real-device | Cảm nhận: chậm, khó đọc, lỗi mặt, khó dùng |

---

## WORKFLOW

```
[Step 0 Calibration] → [B1 Scan] → [B2 Trace] → [B3 Deploy] → [B4 Report]
```

1. **Step 0** — Calibration: trả lời 4 câu context → bảng ENFORCE/OVERRIDE.
2. **B1 Scan** (🟡🟢): Lighthouse + manual heuristic. Log lỗi render/perceived.
3. **B2 Trace** (🔵): map mỗi lỗi → `file:line`. Chạy grep patterns.
4. **B3 Deploy** (🔵): chỉ khi lên hosting — headers, HTTPS, CSP, compression.
5. **B4 Report**: snapshot có ngày, đánh dấu FAIL/PASS, FAIL theo priority.

---

## GREP PATTERNS (generic)

```bash
# Tầng 2 — Layout contract: trang nào thiếu container chung
Select-String *.html -Pattern 'class="container'

# Tầng 2 — Hardcode đè token (đổi 80px theo giá trị contract của bạn)
Select-String *.css -Pattern 'padding.*80px'
Select-String *.html -Pattern 'style="'        # inline style = vi phạm

# Tầng 1 — Perf
Select-String *.html -Pattern '<img'           # check thiếu loading= / width/height

# Tầng 1 — A11y
Select-String *.html -Pattern 'alt='            # check alt rỗng/generic
Select-String scripts.js -Pattern 'keydown|Escape'   # rỗng = thiếu keyboard

# Tầng 1 — Security
Select-String *.html -Pattern '<script src="https'   # check thiếu integrity=
```

---

## CAVEATS — giới hạn

- **Grep chỉ bắt structural.** Contrast, responsive render, INP, focus order → **bắt buộc browser**. Không tool tĩnh nào thay được.
- **Không trang HTML nào là "chuẩn" mặc định.** Mốc consistency là CSS contract, không phải trang đẹp nhất.
- **OVERRIDE ≠ bỏ qua.** Override hợp lệ phải ghi lý do ở Step 0. Không ghi = bỏ sót.
- **Re-run định kỳ:** mỗi lần đổi design system (token, container) → chạy lại từ Step 0.
```
