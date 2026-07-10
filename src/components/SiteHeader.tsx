import { useEffect, useRef } from 'react'

import { siteCopy, type Locale } from '../content/locales'
import { BrandLogo } from './BrandLogo'

type SiteHeaderProps = {
  current: 'home' | 'company'
  locale?: Locale
}

export function SiteHeader({ current, locale = 'ja' }: SiteHeaderProps) {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null)
  const copy = siteCopy[locale]
  const homePath = locale === 'ja' ? '/' : '/en/'
  const companyPath = locale === 'ja' ? '/company/' : '/en/company/'
  const homePrefix = current === 'home' ? '' : homePath
  const alternatePath =
    current === 'home'
      ? locale === 'ja'
        ? '/en/'
        : '/'
      : locale === 'ja'
        ? '/en/company/'
        : '/company/'

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false
    }
  }

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const menu = mobileMenuRef.current
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const menu = mobileMenuRef.current
      if (event.key === 'Escape' && menu?.open) {
        menu.open = false
        menu.querySelector('summary')?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const navigation = (
    <>
      <a href={`${homePrefix}#problems`}>{copy.problems}</a>
      <a href={`${homePrefix}#approach`}>{copy.approach}</a>
      <a href={`${homePrefix}#about`}>{copy.about}</a>
      <a href={companyPath} aria-current={current === 'company' ? 'page' : undefined}>
        {copy.company}
      </a>
      <a className="nav-language" href={alternatePath} hrefLang={locale === 'ja' ? 'en' : 'ja'} aria-label={copy.languageLabel}>
        {copy.language}
      </a>
      <a className="nav-cta" href={`${homePrefix}#contact`}>
        {copy.contact}
      </a>
    </>
  )

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand-link"
          href={current === 'home' ? '#top' : `${homePath}#top`}
          aria-label={copy.homeLabel}
        >
          <BrandLogo className="header-logo" />
        </a>
        <nav className="site-nav" aria-label={copy.navLabel}>
          {navigation}
        </nav>
        <details className="mobile-menu" ref={mobileMenuRef}>
          <summary>{copy.menu}</summary>
          <nav aria-label={copy.mobileNavLabel} onClick={closeMobileMenu}>
            {navigation}
          </nav>
        </details>
      </div>
    </header>
  )
}
