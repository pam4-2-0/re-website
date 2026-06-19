import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <main className="l-main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '80px', color: 'var(--black)', marginBottom: '16px' }}>404</h1>
          <p style={{ marginBottom: '24px', color: 'var(--gray-text)' }}>Page not found</p>
          <Link to="/" className="cta-link" style={{ display: 'inline-block' }}>&#8592; Return Home</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
