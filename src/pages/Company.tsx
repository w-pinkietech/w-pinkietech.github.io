import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { companyBusiness, companyFacts, companyPageCopy } from '../content/company'
import { siteCopy, type Locale } from '../content/locales'

type CompanyProps = {
  locale?: Locale
}

export default function Company({ locale = 'ja' }: CompanyProps) {
  const copy = companyPageCopy[locale]
  const localeSiteCopy = siteCopy[locale]
  const localeFacts = companyFacts[locale]
  const localeBusiness = companyBusiness[locale]
  const homePath = locale === 'ja' ? '/' : '/en/'

  return (
    <div className="site-shell company-page">
      <a className="skip-link" href="#main-content">
        {localeSiteCopy.skip}
      </a>

      <SiteHeader current="company" locale={locale} />

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
            <p className="section-index">{copy.heroIndex}</p>
            <div>
              <h1 id="company-title">
                <span>{copy.title[0]}</span>
                <span>{copy.title[1]}</span>
              </h1>
              <p className="company-lead">{copy.lead}</p>
            </div>
          </div>
        </section>

        <section className="company-overview section" aria-labelledby="overview-title">
          <div className="container company-section-grid">
            <p className="section-index">{copy.factsIndex}</p>
            <div>
              <h2 id="overview-title">{copy.factsTitle}</h2>
              <dl className="company-facts">
                {localeFacts.map(([label, value]) => (
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
              <p className="section-index">{copy.businessIndex}</p>
              <div>
                <h2 id="business-title">{copy.businessTitle}</h2>
                <p>{copy.businessLead}</p>
              </div>
            </div>
            <div className="company-business-list">
              {localeBusiness.map(([number, title, text]) => (
                <article className="company-business-row" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="company-stance section" aria-labelledby="stance-title">
          <div className="container company-section-grid">
            <p className="section-index">{copy.stanceIndex}</p>
            <div>
              <h2 id="stance-title">{copy.stanceTitle}</h2>
              <p>{copy.stanceText}</p>
              <div className="company-actions">
                <a className="button button-primary" href={`${homePath}#contact`}>
                  {copy.contact}
                  <span aria-hidden="true">→</span>
                </a>
                <a className="text-link" href={homePath}>
                  {copy.philosophy}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  )
}
