import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { companyBusiness, companyFacts } from '../content/company'

export default function Company() {
  return (
    <div className="site-shell company-page">
      <a className="skip-link" href="#main-content">
        本文へ移動
      </a>

      <SiteHeader current="company" />

      <main id="main-content">
        <section className="company-hero" aria-labelledby="company-title">
          <img
            className="company-hero-mark"
            src="/brand/pinkietech-mark.svg"
            alt=""
            width="296"
            height="297"
            aria-hidden="true"
          />
          <div className="container company-hero-grid">
            <p className="section-index">Company / 会社概要</p>
            <div>
              <h1 id="company-title">
                <span>人と技術をつなぐ、</span>
                <span>現場のエンジニアリング会社。</span>
              </h1>
              <p className="company-lead">
                PinkieTech株式会社は、働く人の困りごとから始め、技術を使い続けられる改善へ変えていく会社です。
              </p>
            </div>
          </div>
        </section>

        <section className="company-overview section" aria-labelledby="overview-title">
          <div className="container company-section-grid">
            <p className="section-index">01 / 企業情報</p>
            <div>
              <h2 id="overview-title">企業情報</h2>
              <dl className="company-facts">
                {companyFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="company-business section" aria-labelledby="business-title">
          <div className="container">
            <div className="section-intro">
              <p className="section-index">02 / 事業内容</p>
              <div>
                <h2 id="business-title">技術からではなく、課題から始めます。</h2>
                <p>AI・IoT・OSSを手段として組み合わせ、実際の仕事に合う改善を設計・実装します。</p>
              </div>
            </div>
            <div className="company-business-list">
              {companyBusiness.map((business) => (
                <article className="company-business-row" key={business.number}>
                  <span>{business.number}</span>
                  <h3>{business.title}</h3>
                  <p>{business.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="company-stance section" aria-labelledby="stance-title">
          <div className="container company-section-grid">
            <p className="section-index">03 / 私たちの姿勢</p>
            <div>
              <h2 id="stance-title">話しかけやすく、誠実に。</h2>
              <p>
                できることとできないことを分かる言葉で伝え、仕事をする人と同じ方向を見ながら、小さな改善を積み重ねます。
              </p>
              <div className="company-actions">
                <a className="button button-primary" href="/#contact">
                  現場の課題を相談する
                  <span aria-hidden="true">→</span>
                </a>
                <a className="text-link" href="/">
                  PinkieTechの考え方を見る
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
