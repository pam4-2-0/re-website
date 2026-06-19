# Silver Creek Valley Estates — Component Conventions

## Provider / Setup

`Header` and `Sidenav` call `useLocation()` from react-router-dom. Wrap any render tree containing them in `RouterProvider`:

```jsx
import { RouterProvider, Header, Sidenav, Footer } from 'silver-creek-valley-estates'

const [navOpen, setNavOpen] = React.useState(false)

<RouterProvider>
  <Header onMenuClick={() => setNavOpen(true)} />
  <Sidenav isOpen={navOpen} onClose={() => setNavOpen(false)} />
  {/* page sections */}
  <Footer />
</RouterProvider>
```

`BrandStatement` and `Footer` work without a router context.

## Component props

| Component | Props |
|---|---|
| `Header` | `onMenuClick: () => void` — required; triggers the hamburger |
| `Sidenav` | `isOpen: boolean`, `onClose: () => void` — controls overlay open state |
| `BrandStatement` | none — self-contained section |
| `Footer` | none — self-contained section |

## Styling idiom — CSS variables + utility classes

This DS does **not** use Tailwind or inline styles. Style layout glue with CSS variables and these utility classes (all defined in `styles.css` → `_ds_bundle.css`):

**CSS variables** (from `:root` in `styles.css`):
- `var(--black)` — navy #102537 (body text, headings on light bg)
- `var(--gold)` — #C7A158 (accents, hover, decorative eyebrows only — not body text on light bg)
- `var(--off-white)` / `var(--ivory)` — #F2EDE3 (section backgrounds)
- `var(--sage)` — #6B8D6F (secondary accent)
- `var(--gray-text)` — #8C8B8F (captions, meta)
- `var(--font-serif)` — Cormorant Garamond (display headings)
- `var(--font-sans)` — Montserrat (body, UI)

**Typography utilities**:
- `.section-label` — 20px Montserrat uppercase, navy, letter-spacing 0.15em
- `.heading-large-serif` — 40px Cormorant Garamond, gold, weight 400
- `.heading-medium-garamond` — 28px serif, navy, weight 500
- `.cta-link` — 13.8px uppercase link, gold on hover
- `.body-text` — Montserrat weight 300

**Layout**: `.container` — max-width 1400px centered, 80px side padding (40px tablet, 20px mobile).

Do **not** use raw `h1`/`h2`/`h3` without a utility class applied.

## Where the truth lives

- `styles.css` (and its `@import "./_ds_bundle.css"` closure) — all tokens, fonts, and component styles
- `<Name>.d.ts` — each component's props interface
- `<Name>.prompt.md` — usage reference per component

## Idiomatic page section

```jsx
import { RouterProvider, Header, BrandStatement, Footer } from 'silver-creek-valley-estates'

const SamplePage = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <RouterProvider>
      <Header onMenuClick={() => setOpen(true)} />
      <section style={{ padding: '120px 0', backgroundColor: 'var(--off-white)' }}>
        <div className="container">
          <span className="section-label">Our Vision</span>
          <h2 className="heading-large-serif">Legacy in Nature</h2>
          <p className="body-text" style={{ maxWidth: '600px', marginTop: '24px' }}>
            Premier residential community rooted in heritage.
          </p>
        </div>
      </section>
      <BrandStatement />
      <Footer />
    </RouterProvider>
  )
}
```
