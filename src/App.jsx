import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import Manifesto from './components/Manifesto/Manifesto'
import Featured from './components/Featured/Featured'
import Services from './components/Services/Services'
import About from './components/About/About'
import Stats from './components/Stats/Stats'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import SmoothScroll from './components/motion/SmoothScroll'
import Preloader from './components/motion/Preloader'
import Cursor from './components/motion/Cursor'

function App() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <Manifesto />
        <Featured />
        <Services />
        <About />
        <Stats />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
