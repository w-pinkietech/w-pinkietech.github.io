import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import './index.css'
import Home from './pages/Home'

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <Home locale="en" />
  </StrictMode>,
)
