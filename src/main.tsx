import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Landing from './landing/Landing'
import Facilities from './facilities/Facilities'
import "./index.css"
import Contact from './contact/Contact'
import Rooms from './rooms/Rooms'
import About from './about/About'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/facility" element={<Facilities />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
