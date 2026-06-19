import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Sidenav({ isOpen, onClose }) {
  const location = useLocation()

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const active = (path) =>
    location.pathname === path ? 'sidenav-link active' : 'sidenav-link'

  return (
    <>
      <div className={`backdrop${isOpen ? ' active' : ''}`} onClick={onClose}></div>
      <nav className={`sidenav${isOpen ? ' open' : ''}`}>
        <div className="sidenav-close" onClick={onClose}>&times;</div>
        <div>
          <div className="sidenav-label">NAVIGATE</div>
          <div className="sidenav-links">
            <Link to="/" className={active('/')} onClick={onClose}>
              <span className="arrow">&#8594;</span><span>Home</span>
            </Link>
            <Link to="/about" className={active('/about')} onClick={onClose}>
              <span className="arrow">&#8594;</span><span>About</span>
            </Link>
            <Link to="/projects" className={active('/projects')} onClick={onClose}>
              <span className="arrow">&#8594;</span><span>Portfolio</span>
            </Link>
            <Link to="/contact" className={active('/contact')} onClick={onClose}>
              <span className="arrow">&#8594;</span><span>Contact</span>
            </Link>
          </div>
        </div>
        <div className="sidenav-footer">
          <div className="sidenav-phone">+1 (714) 555-0192</div>
          <div className="sidenav-email">hello@silvercreekvalleyestates.com</div>
        </div>
      </nav>
    </>
  )
}
