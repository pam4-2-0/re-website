import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import BrandStatement from '../components/BrandStatement'

export default function Home() {
  useScrollReveal()

  useEffect(() => {
    document.title = 'Home | Silver Creek Valley Estates'
  }, [])

  return (
    <>
      <main className="l-main">
        <section className="s-hero">
          <div className="slider_cont">
            <h1>
              LEGACY IN NATURE.
              <br />
              HOME IN HARMONY.
            </h1>
            <p className="hero-subline">Premium homesites in a legacy community surrounded by nature.</p>
            <Link to="/projects" className="cta-link">explore the community</Link>
          </div>
        </section>

        <section className="s-brand-intro">
          <div className="container four-col-layout reveal">
            <div className="prop-col">
              <div className="prop-img" style={{ backgroundImage: "url('/img/timeless-living.png')" }}></div>
              <h3 className="heading-medium-garamond">TIMELESS LIVING</h3>
            </div>
            <div className="prop-col">
              <div className="prop-img" style={{ backgroundImage: "url('/img/natural-beauty.png')" }}></div>
              <h3 className="heading-medium-garamond">NATURAL BEAUTY</h3>
            </div>
            <div className="prop-col">
              <div className="prop-img" style={{ backgroundImage: "url('/img/premium-homesites.png')" }}></div>
              <h3 className="heading-medium-garamond">PREMIUM HOMESITES</h3>
            </div>
            <div className="prop-col">
              <div className="prop-img" style={{ backgroundImage: "url('/img/rooted-in-heritage.png')" }}></div>
              <h3 className="heading-medium-garamond">ROOTED IN HERITAGE</h3>
            </div>
          </div>
        </section>

        <section className="s-mission reveal">
          <div className="container pullquote-content">
            <h1 className="heading-large-serif">
              <span>Creating places that inspire &amp;</span>
              <span className="pullquote-sub">communities that thrive</span>
            </h1>
          </div>
        </section>

        <section className="s-values reveal">
          <div className="container">
            <div className="sub-block-a reveal">
              <div className="sub-block-a-text">
                <span className="section-label">PRIME LOCATIONS WITH POTENTIAL</span>
                <p>We select locations that offer significant potential for growth and transformation. Our focus is to unlock value that benefits both investors and local users.</p>
                <span className="section-label">DEEP ROOTED VALUES</span>
                <p>Integrity, quality, and commitment define everything we do. We strive to create environments that enrich neighborhoods.</p>
                <Link to="/about" className="cta-link">About &#8594;</Link>
              </div>
              <div className="sub-block-a-img rounded"></div>
            </div>

            <div className="sub-block-b reveal">
              <div className="sub-block-b-text">
                <h3 className="heading-medium-garamond">
                  Elevating the way people LIVE, WORK AND PLAY in the 21st century
                </h3>
              </div>
            </div>

            <div className="sub-block-c reveal">
              <div className="sub-block-c-text">
                <h2 className="heading-large-serif">Discover high-caliber destinations that revitalize neighborhoods</h2>
                <h3 className="heading-medium-garamond">while earning their place on the world stage</h3>
                <span className="section-label">PERFORMANCE DRIVEN</span>
                <p>Every square meter we design reflects our rigorous dedication to build lasting architectural landmarks.</p>
                <Link to="/contact" className="cta-link">Contact Us &#8594;</Link>
              </div>
              <div className="sub-block-c-img rounded"></div>
            </div>
          </div>
        </section>
      </main>

      <BrandStatement />
      <Footer />
    </>
  )
}
