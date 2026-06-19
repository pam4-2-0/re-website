import { useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import BrandStatement from '../components/BrandStatement'

const pillars = [
  { num: '01', title: 'ACQUISITION & DILIGENCE', text: 'We identify high-value infill opportunities through a network of brokers and proprietary outreach tools. Every site undergoes rigorous feasibility analysis to assess entitlement risk, market positioning, and long-term return potential.' },
  { num: '02', title: 'CAPITAL FORMATION', text: 'We leverage a growing network of accredited investors to structure the capital stack for each project. Our transparent investor portal provides real-time updates on project milestones, financials, and distributions.' },
  { num: '03', title: 'OPERATIONS', text: 'Our operations team manages cost and timeline with precision — selecting top-tier contractors, negotiating tight contracts, and deploying digital tools that streamline vendor payments while protecting investor capital.' },
  { num: '04', title: 'SALES & LEASING', text: 'We pre-sell and pre-lease units before construction completes. High-quality 3D renderings, virtual tours, and targeted marketing campaigns minimize market exposure risk and accelerate returns for our investors.' },
]

const team = [
  { first: 'DAVID', last: 'NGUYEN', role: 'Founder & CEO', bio: "28 years in real estate development across Southeast Asia and the US West Coast. David leads the firm's vision, strategy, and investor relations.", img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&fit=crop' },
  { first: 'SARAH', last: 'CHEN', role: 'Managing Director', bio: 'Oversees acquisition, underwriting, and equity placement. Sarah brings 15 years of institutional investment experience from top-tier firms.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop' },
  { first: 'MICHAEL', last: 'TRAN', role: 'Director of Development', bio: 'Leads masterplan approvals, infrastructure delivery, and contractor coordination across all active projects.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop' },
  { first: 'LISA', last: 'PARK', role: 'Director of Sales', bio: 'Manages sales strategy, agent partnerships, and buyer relations. Lisa has closed over $400M in residential transactions.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&fit=crop' },
]

export default function About() {
  useScrollReveal()

  useEffect(() => {
    document.title = 'About | Silver Creek Valley Estates'
  }, [])

  return (
    <>
      <main className="l-main">
        <section className="s-about-hero">
          <div className="hero-left">
            <span className="hero-label">WHO WE ARE ——</span>
            <h1 className="hero-title">
              <span className="hero-title-line">THE POWER OF<br />GREAT DESIGN</span>
            </h1>
            <p className="hero-paragraph">Premium homesites in a legacy community surrounded by nature. Where nature, privacy, and timeless living come together.</p>
          </div>
          <div className="hero-right"></div>
        </section>

        <section className="s-about reveal">
          <div className="container">
            <div className="intro-content">
              <span className="section-label">ABOUT THE COMPANY</span>
              <h2 className="intro-title">WHO WE ARE</h2>
              <p className="intro-p">Silver Creek Valley Estates is a technology-driven real estate development company founded with the mission to redefine how landmark properties are built, sold, and sustained. We started with premium residential developments and have since expanded to high-density mixed-use projects across California's most dynamic urban markets.</p>
              <p className="intro-p">We manage the entire lifecycle of every project — from site acquisition and entitlements through construction, branding, and asset stabilization — ensuring best-in-class outcomes for investors, partners, and communities.</p>
            </div>
          </div>
        </section>

        <section className="s-how-we-work s-about-nature">
          <div className="container">
            <span className="section-label">HOW WE WORK</span>
            <div className="pillars-grid">
              {pillars.map(({ num, title, text }) => (
                <div key={num} className="pillar-card rounded reveal">
                  <div className="pillar-number">{num}</div>
                  <h3 className="pillar-title">{title}</h3>
                  <div className="pillar-divider"></div>
                  <p className="pillar-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s-team">
          <div className="container">
            <h2 className="team-title">LEADERSHIP</h2>
            <p className="team-subtext">Our management team brings decades of institutional real estate development, investment, and design experience across major markets.</p>
            <div className="team-grid">
              {team.map(({ first, last, role, bio, img }) => (
                <div key={first} className="team-card rounded reveal">
                  <div className="team-img rounded" style={{ backgroundImage: `url('${img}')` }}></div>
                  <div className="team-info">
                    <h3 className="team-name"><span className="bold">{first}</span> <span className="thin">{last}</span></h3>
                    <span className="team-title-label">{role}</span>
                    <div className="team-divider"></div>
                    <p className="team-bio">{bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BrandStatement />
      <Footer />
    </>
  )
}
