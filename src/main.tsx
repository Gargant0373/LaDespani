import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Landing from './landing/Landing'
import Facilities from './facilities/Facilities'
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/facility" element={<Facilities />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
