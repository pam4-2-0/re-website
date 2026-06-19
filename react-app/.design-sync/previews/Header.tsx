// @dsCard group="Navigation" order=10 viewport="1440x160"
import { Header } from 'silver-creek-valley-estates'

const relativeBase = `.l-header { position: relative !important; }`

export const Default = () => (
  <>
    <style>{relativeBase}</style>
    <Header onMenuClick={() => {}} />
  </>
)

// Scrolled state: thêm class .scrolled trực tiếp vào header DOM sau mount
export const Scrolled = () => {
  const ref = (el: HTMLDivElement | null) => {
    if (el) {
      const header = el.querySelector('.l-header')
      if (header) header.classList.add('scrolled')
    }
  }
  return (
    <>
      <style>{relativeBase}</style>
      <div ref={ref}><Header onMenuClick={() => {}} /></div>
    </>
  )
}
