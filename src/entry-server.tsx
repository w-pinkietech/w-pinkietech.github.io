import { renderToString } from 'react-dom/server'

import Company from './pages/Company'
import Home from './pages/Home'

export function render(pathname: string) {
  switch (pathname) {
    case '/':
      return renderToString(<Home locale="ja" />)
    case '/company/':
      return renderToString(<Company locale="ja" />)
    case '/en/':
      return renderToString(<Home locale="en" />)
    case '/en/company/':
      return renderToString(<Company locale="en" />)
    default:
      throw new Error(`No static route configured for ${pathname}`)
  }
}
