import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const galleryImages = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?w=800&q=80&fit=crop',
]

const specs = [
  ['Type', 'Mixed-Use Development'],
  ['Total area', '45 ha'],
  ['Number of lots', '320 lots'],
  ['Lot size', 'From 80 m²'],
  ['Legal status', 'Individual title deed'],
  ['Progress', 'Under Construction'],
  ['Price', 'Contact us'],
]

const highlights = [
  'Premium location at the gateway of key infrastructure projects',
  'Custom landscaping featuring native flora and active water parks',
  'Cutting-edge thermal insulation and smart-grid power systems',
  'Pedestrian-centric paths designed to optimize neighborhood connectivity',
]

const related = [
  { num: '02', name: 'BETA TOWNSHIP', loc: 'San Diego County, California', type: 'Premium land lots' },
  { num: '03', name: 'GAMMA RESIDENTIAL', loc: 'Los Angeles County, California', type: 'Townhouse community' },
  { num: '04', name: 'DELTA URBAN DISTRICT', loc: 'Riverside County, California', type: 'Villa & estate lots' },
]

export default function ProjectDetail() {
  const [lightbox, setLightbox] = useState(null)
  useScrollReveal()

  useEffect(() => {
    document.title = 'Project Detail | Silver Creek Valley Estates'
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <main className="l-main">
        <section className="s-detail-hero">
          <div className="hero-detail-overlay"></div>
          <div className="hero-detail-content">
            <p className="breadcrumb">
              <Link to="/projects" className="breadcrumb-link">&#8592; Projects</Link> / Alpha Urban Development
            </p>
            <h1>ALPHA URBAN DEVELOPMENT</h1>
            <p className="location">Orange County, California · Master-planned community</p>
          </div>
        </section>

        <section className="s-gallery">
          <div className="container gallery-grid">
            <div className="gallery-left">
              <div className="tall-img rounded" onClick={() => setLightbox('Photo 1')} style={{ cursor: 'pointer' }}>
                <span>Photo 1</span>
              </div>
            </div>
            <div className="gallery-right">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="grid-img rounded"
                  onClick={() => setLightbox(`Photo ${i + 2}`)}
                  style={{ background: `url('${img}') center center / cover no-repeat`, cursor: 'pointer' }}
                >
                  <span>Photo {i + 2}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {lightbox && (
          <div className="lightbox" style={{ display: 'flex' }} onClick={() => setLightbox(null)}>
            <span className="lightbox-close" onClick={() => setLightbox(null)}>&times;</span>
            <div className="lightbox-content">{lightbox}</div>
          </div>
        )}

        <section className="s-project-info">
          <div className="container info-inner">
            <div className="info-left">
              <h6>PROJECT OVERVIEW ——</h6>
              <p>Alpha Urban Development represents a premier lifestyle destination designed to blend contemporary architecture with thriving green space. Developed as an integrated ecosystem, the master plan coordinates residential blocks with recreational facilities and commercial lanes.</p>
              <p>Our design team prioritized structural durability and natural light infiltration, engineering standard-setting elevations that optimize airflow and local ecological resources.</p>
              <p>Through rigorous material sourcing and site planning, Alpha Urban Development establishes a visual and functional landmark that enhances local values while delivering commercial vitality to Province A.</p>
              <div className="info-highlights">
                {highlights.map((item, i) => (
                  <div key={i} className="highlight-item">
                    <span>&#8594;</span><span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="info-right">
              <div className="specs-block">
                <h6>PROJECT SPECS</h6>
                {specs.map(([label, value]) => (
                  <div key={label} className="spec-row">
                    <span className="spec-label">{label}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
                <a href="#contact">register for consultation &#8594;</a>
              </div>
            </div>
          </div>
        </section>

        <section className="s-location">
          <div className="container">
            <h6>PROJECT LOCATION ——</h6>
            <div className="map-placeholder"><span>Interactive Location Map Overview</span></div>
            <div className="location-points">
              <div className="location-point"><strong>&#8594; Direct Airport Access</strong><br />Located within a 15-minute highway connection to the primary international travel terminal.</div>
              <div className="location-point"><strong>&#8594; Civic Infrastructure</strong><br />Directly adjacent to major commercial shopping districts, hospitals, and national schools.</div>
              <div className="location-point"><strong>&#8594; High Growth Corridor</strong><br />Positioned in the heart of Province A's primary urban expansion plan, guaranteeing long-term appreciation.</div>
            </div>
          </div>
        </section>

        <section className="s-contact-inline" id="contact">
          <div className="container">
            <h2>Register for Free Consultation</h2>
            <div className="contact-layout">
              <div className="contact-info">
                <p>Contact our project consultant directly to review available land lots, townhouse configurations, customized payment plans, and site viewing schedules.</p>
                <p><strong>Phone:</strong> +1 (714) 555-0192<br /><strong>Email:</strong> hello@silvercreekvalleyestates.com<br /><strong>Headquarters:</strong> 100 Spectrum Center Drive, Suite 900, Irvine, CA 92618</p>
              </div>
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Form submitted successfully.') }}>
                <div className="form-group">
                  <label htmlFor="pd-name">Name*</label>
                  <input type="text" id="pd-name" required placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="pd-email">Email*</label>
                  <input type="email" id="pd-email" required placeholder="Your email address" />
                </div>
                <div className="form-group">
                  <label htmlFor="pd-message">Message</label>
                  <textarea id="pd-message" placeholder="How can our consulting team assist you?"></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit &#8594;</button>
              </form>
            </div>
          </div>
        </section>

        <section className="s-related">
          <div className="container">
            <h4>Related Projects</h4>
            <div className="related-rows">
              {related.map(({ num, name, loc, type }) => (
                <div key={num} className="project-row">
                  <div className="project-row-left">
                    <span className="number">{num}</span>
                    <span className="name">{name}</span>
                  </div>
                  <div className="project-row-center">
                    <span className="bold">{loc}</span> · {type}
                  </div>
                  <div className="project-row-right">
                    <Link to="/projects/1">view details &#8594;</Link>
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
