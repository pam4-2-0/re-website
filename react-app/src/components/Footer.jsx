import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="l-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-brand">
            <img src="/img/logo-primary.png" alt="Silver Creek Valley Estates" style={{ height: '80px', width: 'auto' }} />
            <p className="footer-tagline">Legacy in Nature<br />Home in Harmony</p>
          </div>
        </div>
        <div className="footer-center">
          <span>100 Spectrum Center Drive, Suite 900, Irvine, CA 92618</span>
        </div>
        <div className="footer-right">
          <span>+1 (714) 555-0192 | hello@silvercreekvalleyestates.com</span>
          <div className="copyright">
            <span>Copyright &copy; 2026 | </span>
            <Link to="/contact">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
