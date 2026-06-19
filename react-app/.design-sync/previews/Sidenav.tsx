// @dsCard group="Navigation" order=20 viewport="1440x700" cardMode="single"
import { Sidenav } from 'silver-creek-valley-estates'

// position:fixed cần relative trong preview, backdrop dùng position:absolute
const overlayOverride = `
  .sidenav { position: relative !important; transform: none !important; width: 320px !important; }
  .backdrop { position: absolute !important; }
`

export const Open = () => (
  <>
    <style>{overlayOverride}</style>
    <div style={{ position: 'relative', height: '700px', background: 'rgba(0,0,0,0.3)' }}>
      <Sidenav isOpen={true} onClose={() => {}} />
    </div>
  </>
)

export const Closed = () => (
  <>
    <style>{overlayOverride}</style>
    <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', padding: '0 24px', color: '#102537', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}>
      Sidenav closed — click hamburger to open
    </div>
  </>
)
