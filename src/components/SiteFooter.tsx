import { siteCopy, type Locale } from '../content/locales'
import { BrandLogo } from './BrandLogo'

type SiteFooterProps = {
  locale?: Locale
}

export function SiteFooter({ locale = 'ja' }: SiteFooterProps) {
  const copy = siteCopy[locale]
  const homePath = locale === 'ja' ? '/' : '/en/'
  const companyPath = locale === 'ja' ? '/company/' : '/en/company/'
  const alternatePath = locale === 'ja' ? '/en/' : '/'
  const companyName = locale === 'ja' ? 'PinkieTech株式会社' : 'PinkieTech Co., Ltd.'

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <BrandLogo className="footer-logo" />
          <p>{copy.tagline}</p>
        </div>
        <div className="footer-links">
          <a href={`${homePath}#contact`}>Contact</a>
          <a href={companyPath}>{copy.company}</a>
          <a href={alternatePath} hrefLang={locale === 'ja' ? 'en' : 'ja'}>
            {copy.language}
          </a>
          <a href="https://x.com/pinkietech" target="_blank" rel="noreferrer">
            X<span className="sr-only">{copy.newTab}</span>
          </a>
          <a href="https://github.com/w-pinkietech" target="_blank" rel="noreferrer">
            GitHub<span className="sr-only">{copy.newTab}</span>
          </a>
        </div>
        <p className="copyright">© 2026 {companyName}</p>
      </div>
    </footer>
  )
}
