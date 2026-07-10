import { useState } from 'react'

import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { approach, homeCopy, problems, siteCopy, values, type Locale } from '../content/locales'
import { contactEmail } from '../content/site'

type HomeProps = {
  locale?: Locale
}

function Home({ locale = 'ja' }: HomeProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copy = homeCopy[locale]
  const localeSiteCopy = siteCopy[locale]
  const localeProblems = problems[locale]
  const localeApproach = approach[locale]
  const localeValues = values[locale]

  const copyContactEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {localeSiteCopy.skip}
      </a>

      <SiteHeader current="home" locale={locale} />

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img
            className="hero-mark"
            src="/brand/pinkietech-mark.svg"
            alt=""
            width="296"
            height="297"
            aria-hidden="true"
          />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="kicker">{copy.kicker}</p>
              <h1 id="hero-title">
                <span>{copy.heroTitle[0]}</span>
                <span>{copy.heroTitle[1]}</span>
              </h1>
              <p className="hero-lead">{copy.heroLead}</p>
              <p className="hero-definition">{copy.heroDefinition}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  {copy.primaryAction}
                  <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href="#problems">
                  {copy.secondaryAction}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="hero-process" aria-label={copy.processLabel}>
              {localeApproach.map(([number, title]) => (
                <div className="hero-process-item" key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="container manifesto-grid">
            <p className="section-index">{copy.manifesto.index}</p>
            <div>
              <h2 id="manifesto-title">
                {copy.manifesto.title[0]}
                <br />
                {copy.manifesto.title[1]}
              </h2>
              <p>{copy.manifesto.text}</p>
            </div>
          </div>
        </section>

        <section className="problems section" id="problems" aria-labelledby="problems-title">
          <div className="container">
            <div className="section-intro">
              <p className="section-index">{copy.problemsSection.index}</p>
              <div>
                <h2 id="problems-title">{copy.problemsSection.title}</h2>
                <p>{copy.problemsSection.text}</p>
              </div>
            </div>

            <div className="problem-list">
              {localeProblems.map(([number, title, text, detail]) => (
                <article className="problem-row" key={number}>
                  <span className="row-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <p className="row-detail">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="approach section" id="approach" aria-labelledby="approach-title">
          <div className="container approach-grid">
            <div className="approach-intro">
              <p className="section-index">{copy.approachSection.index}</p>
              <h2 id="approach-title">{copy.approachSection.title}</h2>
              <p>{copy.approachSection.text}</p>
            </div>

            <ol className="approach-list">
              {localeApproach.map(([number, title, text]) => (
                <li key={number}>
                  <span className="approach-number">{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="proof section" aria-labelledby="proof-title">
          <div className="container proof-grid">
            <p className="section-index">{copy.proof.index}</p>
            <div>
              <h2 id="proof-title">{copy.proof.title}</h2>
              <p>{copy.proof.text}</p>
              <a
                className="text-link"
                href="https://github.com/w-pinkietech"
                target="_blank"
                rel="noreferrer"
              >
                {copy.proof.link}
                <span aria-hidden="true">↗</span>
                <span className="sr-only">{localeSiteCopy.newTab}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="values section" id="about" aria-labelledby="values-title">
          <img
            className="values-mark"
            src="/brand/pinkietech-mark.svg"
            alt=""
            width="296"
            height="297"
            aria-hidden="true"
          />
          <div className="container values-inner">
            <div className="section-intro values-intro">
              <p className="section-index">{copy.valuesSection.index}</p>
              <div>
                <h2 id="values-title">{copy.valuesSection.title}</h2>
                <p>{copy.valuesSection.text}</p>
              </div>
            </div>

            <dl className="value-list">
              {localeValues.map(([title, description]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="story section" aria-labelledby="story-title">
          <div className="container story-grid">
            <p className="section-index">{copy.story.index}</p>
            <div>
              <h2 id="story-title">{copy.story.title}</h2>
              <div className="story-columns">
                {copy.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <p className="section-index">{copy.contact.index}</p>
            <div>
              <h2 id="contact-title">{copy.contact.title}</h2>
              <p>{copy.contact.text}</p>
              <div className="contact-address">
                <span>{copy.contact.emailLabel}</span>
                <span className="contact-email">{contactEmail}</span>
              </div>
              <div className="contact-actions">
                <button
                  className="button button-primary copy-email"
                  type="button"
                  onClick={copyContactEmail}
                >
                  <span aria-live="polite">
                    {copyStatus === 'copied'
                      ? copy.contact.copied
                      : copyStatus === 'failed'
                        ? copy.contact.failed
                        : copy.contact.copy}
                  </span>
                  <span aria-hidden="true">{copyStatus === 'copied' ? '✓' : '⧉'}</span>
                </button>
                <a className="text-link" href={`mailto:${contactEmail}`}>
                  {copy.contact.openEmail}
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  className="text-link"
                  href="https://x.com/pinkietech"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.contact.openX}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">{localeSiteCopy.newTab}</span>
                </a>
              </div>
              <p className="contact-note">{copy.contact.note}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  )
}

export default Home
