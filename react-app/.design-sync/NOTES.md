# Silver Creek Valley Estates DS — Sync Notes

## Repo-specific gotchas

- **Playwright chromium**: Needs `npx playwright install chromium` on fresh clone — the `playwright` devDep in package.json pins the version but doesn't auto-install the browser binary.
- **Logo + brand images**: Components load images from `/img/` (absolute path). In headless preview, these show as broken img placeholders — expected, not a bug. Layout, fonts, and colors are all correct.
- **RouterProvider**: Exported from the bundle (`src/components/RouterProvider.jsx` wraps react-router-dom BrowserRouter) but excluded from component docs (`componentSrcMap: {RouterProvider: null}`). It IS available as `window.SilverCreekDS.RouterProvider`.
- **dist/ must be built first**: `npm run build:lib` (= `vite build --mode lib`) produces `dist/index.es.js`. The driver uses this as `--entry`. If components changed, rebuild dist before running the driver.
- **Font serving**: Montserrat and Cormorant Garamond are served at runtime (not shipped with the bundle). `runtimeFontPrefixes` suppresses `[FONT_MISSING]`. In the preview environment, fonts fall back to browser defaults; the design system assumes the host page provides them.
- **`_ds_sync.json` anchor**: This is a package-shape sync, no Storybook. The re-sync anchor is from the uploaded project's `_ds_sync.json` — always `--remote .design-sync/.cache/remote-sync.json` on re-sync.

## Known render warns

- Footer/Header: logo image broken in headless (local `/img/` not served) — intentional, layout correct.
- Sidenav Closed: thin by design — no visible panel when closed.

## Re-sync risks

- **Inline contact data in components**: Address, phone, email are hardcoded in `Footer.jsx` and `Sidenav.jsx`. If contact info changes in components, re-sync to update the bundle.
- **`conventions.md` class/token refs**: The conventions header names specific CSS classes (`.heading-large-serif`, `.section-label`, `.cta-link`, etc.) and CSS vars. If classes are renamed or removed in `ds-flat.css`, update `conventions.md` and rebuild.
- **`cfg.provider` assumes RouterProvider exists**: If RouterProvider is refactored out of the DS, update or remove `cfg.provider` — previews will fail with "useNavigate outside Router".
- **Partially verified**: `.d.ts` parse was skipped (typescript not in devDeps of .ds-sync). Props interfaces show `[key: string]: unknown` — correct for these components since they have no complex generics.
