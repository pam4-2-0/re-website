import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const active = (path) =>
    location.pathname === path ? 'desktop-nav-link active' : 'desktop-nav-link'

  return (
    <header className="l-header" ref={headerRef}>
      <div className="container header-inner">
        <Link to="/" className="logo-container">
          <img src="/img/logo-horizontal.png" alt="Silver Creek Valley Estates" style={{ height: '60px', width: 'auto' }} />
        </Link>
        <nav className="desktop-nav">
          <Link to="/" className={active('/')}>Home</Link>
          <Link to="/about" className={active('/about')}>About</Link>
          <Link to="/projects" className={active('/projects')}>Portfolio</Link>
          <Link to="/contact" className={active('/contact')}>Contact</Link>
        </nav>
        <button className="hamburger" onClick={onMenuClick} aria-label="Menu">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>
    </header>
  )
}
