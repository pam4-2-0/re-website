import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Sidenav from './components/Sidenav'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const [sidenavOpen, setSidenavOpen] = useState(false)

  return (
    <BrowserRouter>
      <Header onMenuClick={() => setSidenavOpen(true)} />
      <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
