import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import Generate from './Route.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Generate />
  </StrictMode>,
)
