import { useEffect } from 'react'

// Scroll reveal — observe .reveal elements, thêm class .visible khi vào viewport
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        e.isIntersecting
          ? e.target.classList.add('visible')
          : e.target.classList.remove('visible')
      }),
      { threshold: 0.15 }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}
