import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const projects = [
  { id: 1, name: 'RIVERSIDE HEIGHTS', location: 'Orange County, California', status: 'FOR SALE', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fit=crop' },
  { id: 2, name: 'OAK VALLEY ESTATES', location: 'San Diego County, California', status: 'UNDER CONSTRUCTION', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop' },
  { id: 3, name: 'MAPLE RIDGE', location: 'Los Angeles County, California', status: 'COMPLETED', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fit=crop' },
  { id: 4, name: 'CEDAR GROVE', location: 'Riverside County, California', status: 'FOR SALE', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80&fit=crop' },
  { id: 5, name: 'PINE CREST VILLAS', location: 'Santa Barbara County, California', status: 'UNDER CONSTRUCTION', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop' },
  { id: 6, name: 'HARBOR VIEW RESIDENCES', location: 'Ventura County, California', status: 'FOR SALE', img: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80&fit=crop' },
]

export default function Projects() {
  const navigate = useNavigate()
  useScrollReveal()

  useEffect(() => {
    document.title = 'Portfolio | Silver Creek Valley Estates'
  }, [])

  return (
    <>
      <main className="l-main">
        <section className="s-page-hero">
          <div className="container hero-content">
            <span className="hero-label">PORTFOLIO</span>
            <h1 className="hero-title">OUR PROJECTS</h1>
            <p className="hero-subtext">Premium homesites in a legacy community surrounded by nature.</p>
          </div>
        </section>

        <section className="s-invest-cta">
          <div className="container invest-inner">
            <span className="invest-text">INTERESTED IN INVESTING WITH US?</span>
            <Link to="/contact" className="invest-btn">LEARN MORE &#8594;</Link>
          </div>
        </section>

        <section className="s-invest-feature">
          <div className="container">
            <div className="invest-row">
              <div className="invest-content">
                <span className="section-label">INVEST</span>
                <p>For private equity groups and private lenders. Why you should invest. Silver Creek Valley Estates works with different forms of capital — crowdfunding for individual investors, and partnerships with larger institutional funds and lenders.</p>
                <Link to="/contact" className="cta-link">Contact Us &#8594;</Link>
              </div>
              <div className="invest-img rounded">
                <img className="rounded" src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80&fit=crop" alt="Silver Creek Valley Estates investment property exterior" loading="lazy" width="800" height="600" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="s-all-properties">
          <div className="container">
            <span className="section-label">ALL PROPERTIES</span>
            <div className="project-grid">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="project-card rounded"
                  onClick={() => navigate(`/projects/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-image rounded" style={{ backgroundImage: `url('${p.img}')` }}></div>
                  <div className="card-body">
                    <span className={`status-badge${p.status === 'COMPLETED' ? ' completed' : ''}`}>{p.status}</span>
                    <h3 className="project-name">{p.name}</h3>
                    <p className="project-location">{p.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
