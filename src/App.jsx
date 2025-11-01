import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ServicesSlider from './components/ServicesSlider/ServicesSlider'
import Services from './components/Services/Services'
import About from './components/About/About'
import Stats from './components/Stats/Stats'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Header scrolled={scrolled} />
      <Hero />
      <ServicesSlider />
      <Services />
      <About />
      <Stats />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
