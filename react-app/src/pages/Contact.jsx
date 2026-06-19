import { useState, useEffect } from 'react'
import Footer from '../components/Footer'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    document.title = 'Contact | Silver Creek Valley Estates'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch('https://formspree.io/f/maqzqpjw', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <main className="l-main">
        <section className="s-contact-hero">
          <div className="banner-left">
            <div>
              <h1>CONTACT</h1>
              <p className="intro-text">Premium homesites in a legacy community surrounded by nature. Where nature, privacy, and timeless living come together.</p>
            </div>
            <div className="company-meta">
              <p className="company-name">Silver Creek Valley Estates</p>
              <p className="contact-detail">Phone: +1 (714) 555-0192</p>
              <p className="contact-detail">Email: hello@silvercreekvalleyestates.com</p>
            </div>
          </div>
          <div className="banner-right"></div>
        </section>

        <section className="s-contact-form">
          <div className="container form-layout">
            <div className="form-left">
              <div className="circular-img"></div>
              <address>
                <strong>Silver Creek Valley Estates Headquarters</strong><br />
                100 Spectrum Center Drive, Suite 900,<br />
                Irvine, CA 92618
              </address>
            </div>

            <div className="form-right">
              {status === 'success' ? (
                <div className="form-thankyou">
                  <div className="thankyou-line"></div>
                  <p className="thankyou-label">INQUIRY RECEIVED</p>
                  <h3 className="thankyou-heading">Thank You</h3>
                  <p className="thankyou-body">A member of our team will be in touch within 24 hours.<br />We look forward to speaking with you.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                  <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input type="text" id="name" name="name" required placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" name="email" required placeholder="Your email address" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="How can our consulting team assist you?" />
                  </div>
                  <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Submit →'}
                  </button>
                  {status === 'error' && (
                    <p style={{ color: 'red', marginTop: '8px' }}>Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
