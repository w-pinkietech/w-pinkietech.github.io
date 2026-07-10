import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Company from './pages/Company'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Company />
  </StrictMode>,
)
