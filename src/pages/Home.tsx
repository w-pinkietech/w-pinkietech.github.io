import { useEffect, useRef, useState } from 'react'

const contactEmail = 'contact@pinkie-tech.jp'

const problems = [
  {
    number: '01',
    title: '作業の負担を減らす',
    text: '転記、確認、繰り返し作業、探す時間。日々積み重なる小さな負担から見直します。',
    detail: '業務整理 / 自動化 / AI活用',
  },
  {
    number: '02',
    title: '判断しやすくする',
    text: '散らばった情報を、必要な人が必要なときに見られる形へつなぎます。',
    detail: '可視化 / データ連携 / 判断支援',
  },
  {
    number: '03',
    title: '情報の途切れをなくす',
    text: '人、設備、システムの間にある分断を理解し、無理なく続く流れをつくります。',
    detail: 'IoT / センサー / システム連携',
  },
  {
    number: '04',
    title: '変化に早く気づく',
    text: 'いつもと違う状態を捉え、問題が大きくなる前に動ける仕組みを一緒に考えます。',
    detail: '計測 / 通知 / 異常把握',
  },
]

const approach = [
  {
    number: '01',
    title: '仕事を理解する',
    text: '資料だけで判断せず、実際の仕事、道具、データ、制約、使う人の声を確かめます。',
  },
  {
    number: '02',
    title: '小さく試す',
    text: '大きく作り込む前に、価値とリスクを確かめられる最小の形をつくります。',
  },
  {
    number: '03',
    title: '改善を続けられる形にする',
    text: '使って分かったことを次へつなぎ、知識と判断が現場に残る状態を目指します。',
  },
]

const values = [
  ['人を第一に', '技術の都合より、使う人の判断と仕事を優先する。'],
  ['現場から始める', '物理的な場所に限らず、仕事が実際に行われる状況を知る。'],
  ['開いて、分かち合う', 'OSSと共有できる知識を活かし、囲い込みに頼らない。'],
  ['わかりやすく、誠実に', 'できることとできないことを、専門外の人にも伝わる言葉で話す。'],
]

function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <img
      className={className}
      src="/brand/pinkietech-logo-reverse.svg"
      alt="PinkieTech"
      width="1408"
      height="297"
    />
  )
}

function Home() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

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
        本文へ移動
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-link" href="#top" aria-label="PinkieTech ホーム">
            <BrandLogo className="header-logo" />
          </a>
          <nav className="site-nav" aria-label="メインナビゲーション">
            <a href="#problems">できること</a>
            <a href="#approach">進め方</a>
            <a href="#about">私たちについて</a>
            <a className="nav-cta" href="#contact">
              課題を相談する
            </a>
          </nav>
          <details className="mobile-menu" ref={mobileMenuRef}>
            <summary>メニュー</summary>
            <nav aria-label="モバイルナビゲーション" onClick={closeMobileMenu}>
              <a href="#problems">できること</a>
              <a href="#approach">進め方</a>
              <a href="#about">私たちについて</a>
              <a href="#contact">課題を相談する</a>
            </nav>
          </details>
        </div>
      </header>

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
              <p className="kicker">現場伴走型エンジニアリング</p>
              <h1 id="hero-title">
                <span>現場の力を、</span>
                <span>技術で引き出す。</span>
              </h1>
              <p className="hero-lead">
                働く人の困りごとから始め、AI・IoT・OSSを必要な形で使いながら、
                改善を続けられる仕組みを一緒につくります。
              </p>
              <p className="hero-definition">
                私たちがいう「現場」は、仕事が実際に行われる状況のこと。
                物理的な場所だけでなく、オフィス、遠隔、デジタルの仕事も含みます。
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  現場の課題を相談する
                  <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href="#problems">
                  私たちにできること
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="hero-process" aria-label="理解、試作、改善の3段階">
              {approach.map((item) => (
                <div className="hero-process-item" key={item.number}>
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="container manifesto-grid">
            <p className="section-index">01 / 考え方</p>
            <div>
              <h2 id="manifesto-title">
                技術は目的ではありません。
                <br />
                人を支えるための手段です。
              </h2>
              <p>
                新しい技術を入れることより、仕事をする人の負担が減り、判断しやすくなり、
                自分たちで次の改善を続けられることを大切にします。
              </p>
            </div>
          </div>
        </section>

        <section className="problems section" id="problems" aria-labelledby="problems-title">
          <div className="container">
            <div className="section-intro">
              <p className="section-index">02 / 取り組む課題</p>
              <div>
                <h2 id="problems-title">課題の近くから、始めます。</h2>
                <p>
                  決まった製品を当てはめるのではなく、今の仕事と困りごとを理解して、
                  必要な支援を組み立てます。
                </p>
              </div>
            </div>

            <div className="problem-list">
              {problems.map((problem) => (
                <article className="problem-row" key={problem.number}>
                  <span className="row-number">{problem.number}</span>
                  <h3>{problem.title}</h3>
                  <p>{problem.text}</p>
                  <p className="row-detail">{problem.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="approach section" id="approach" aria-labelledby="approach-title">
          <div className="container approach-grid">
            <div className="approach-intro">
              <p className="section-index">03 / 進め方</p>
              <h2 id="approach-title">一度で完璧を目指さない。</h2>
              <p>
                小さくつくり、確かめ、学ぶ。その積み重ねを、実際に使われ続ける変化へつなげます。
              </p>
            </div>

            <ol className="approach-list">
              {approach.map((item) => (
                <li key={item.number}>
                  <span className="approach-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="proof section" aria-labelledby="proof-title">
          <div className="container proof-grid">
            <p className="section-index">04 / 公開しているもの</p>
            <div>
              <h2 id="proof-title">つくったものを、確かめられる形に。</h2>
              <p>
                公開できるコードや知識はGitHubで共有します。成果を実績らしく飾るより、
                判断の前提と実装を見られる形にすることを大切にします。
              </p>
              <a
                className="text-link"
                href="https://github.com/w-pinkietech"
                target="_blank"
                rel="noreferrer"
              >
                公開リポジトリを見る
                <span aria-hidden="true">↗</span>
                <span className="sr-only">（新しいタブで開く）</span>
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
              <p className="section-index">05 / 私たちらしさ</p>
              <div>
                <h2 id="values-title">話しかけやすい、プロフェッショナル。</h2>
                <p>
                  技術を難しく見せるのではなく、分かる言葉で誠実に話す。
                  好奇心と技術力を持ちながら、泥臭い改善も楽しむ。それが私たちのスタイルです。
                </p>
              </div>
            </div>

            <dl className="value-list">
              {values.map(([title, description]) => (
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
            <p className="section-index">06 / Pinkieの由来</p>
            <div>
              <h2 id="story-title">小さな支えが、大きな力になる。</h2>
              <div className="story-columns">
                <p>
                  小指は、手の中で一番小さな指です。けれど、小指が支えることで、手はしっかりと握り、本来の力を発揮できます。
                </p>
                <p>
                  現場の改善も同じです。派手な仕組みだけでなく、日々の仕事に合った小さな改善が、人の負担を減らし、判断を助け、現場全体を強くします。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <p className="section-index">07 / ご相談</p>
            <div>
              <h2 id="contact-title">まず、困っていることを聞かせてください。</h2>
              <p>
                技術や要件が決まっていなくても構いません。仕事と課題の整理から、一緒に始められます。
              </p>
              <div className="contact-address">
                <span>メールアドレス</span>
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
                      ? 'コピーしました'
                      : copyStatus === 'failed'
                        ? 'コピーできませんでした'
                        : 'メールアドレスをコピー'}
                  </span>
                  <span aria-hidden="true">{copyStatus === 'copied' ? '✓' : '⧉'}</span>
                </button>
                <a className="text-link" href={`mailto:${contactEmail}`}>
                  メールアプリを開く
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  className="text-link"
                  href="https://x.com/pinkietech"
                  target="_blank"
                  rel="noreferrer"
                >
                  Xで相談する
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              </div>
              <p className="contact-note">
                「メールアプリを開く」は端末の設定によって動作しない場合があります。その場合はメールアドレスをコピーしてご利用ください。
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <BrandLogo className="footer-logo" />
            <p>現場の力を、技術で引き出す。</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${contactEmail}`}>Email</a>
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
    </div>
  )
}

export default Home
