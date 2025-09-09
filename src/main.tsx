import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './landing/Landing'
import Facilities from './facilities/Facilities'
import "./index.css"
import Contact from './contact/Contact'
import Rooms from './rooms/Rooms'
import About from './about/About'
import DigitalCard from './card/DigitalCard'
import Gallery from './gallery/Gallery'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/facility" element={<Facilities />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/card" element={<DigitalCard />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
