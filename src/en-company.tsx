import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import './index.css'
import Company from './pages/Company'

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <Company locale="en" />
  </StrictMode>,
)
