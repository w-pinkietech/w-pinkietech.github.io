import { BrandLogo } from './BrandLogo'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <BrandLogo className="footer-logo" />
          <p>現場の力を、技術で引き出す。</p>
        </div>
        <div className="footer-links">
          <a href="/#contact">Contact</a>
          <a href="/company/">会社概要</a>
          <a href="https://x.com/pinkietech" target="_blank" rel="noreferrer">
            X<span className="sr-only">（新しいタブで開く）</span>
          </a>
          <a href="https://github.com/w-pinkietech" target="_blank" rel="noreferrer">
            GitHub<span className="sr-only">（新しいタブで開く）</span>
          </a>
        </div>
        <p className="copyright">© 2026 PinkieTech株式会社</p>
      </div>
    </footer>
  )
}
