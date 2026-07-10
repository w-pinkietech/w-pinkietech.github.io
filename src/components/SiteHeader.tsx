import { useEffect, useRef } from 'react'

import { BrandLogo } from './BrandLogo'

type SiteHeaderProps = {
  current: 'home' | 'company'
}

export function SiteHeader({ current }: SiteHeaderProps) {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null)
  const homePrefix = current === 'home' ? '' : '/'

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
      <a href={`${homePrefix}#problems`}>できること</a>
      <a href={`${homePrefix}#approach`}>進め方</a>
      <a href={`${homePrefix}#about`}>私たちについて</a>
      <a href="/company/" aria-current={current === 'company' ? 'page' : undefined}>
        会社概要
      </a>
      <a className="nav-cta" href={`${homePrefix}#contact`}>
        課題を相談する
      </a>
    </>
  )

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-link" href={current === 'home' ? '#top' : '/#top'} aria-label="PinkieTech ホーム">
          <BrandLogo className="header-logo" />
        </a>
        <nav className="site-nav" aria-label="メインナビゲーション">
          {navigation}
        </nav>
        <details className="mobile-menu" ref={mobileMenuRef}>
          <summary>メニュー</summary>
          <nav aria-label="モバイルナビゲーション" onClick={closeMobileMenu}>
            {navigation}
          </nav>
        </details>
      </div>
    </header>
  )
}
