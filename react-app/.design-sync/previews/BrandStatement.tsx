// @dsCard group="Content" order=10 viewport="1440x400"
import { BrandStatement } from 'silver-creek-valley-estates'

// Force reveal visible — IntersectionObserver không chạy trong headless render
const revealOverride = '.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }'

export const Default = () => (
  <>
    <style>{revealOverride}</style>
    <BrandStatement />
  </>
)
