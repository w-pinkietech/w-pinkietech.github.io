const supportAreas = [
  {
    number: '01',
    title: '課題を一緒に整理する',
    description:
      '話を聞き、仕事の流れや困りごとを見える形にします。技術ありきではなく、まず何を良くしたいのかを揃えます。',
    tags: ['業務整理', '技術相談', '小さな検証'],
  },
  {
    number: '02',
    title: '使える仕組みをつくる',
    description:
      'AI・IoT・OSSを必要な分だけ組み合わせ、日々の仕事に馴染む仕組みを設計・実装します。',
    tags: ['AI活用', 'IoT連携', 'ソフトウェア開発'],
  },
  {
    number: '03',
    title: '一緒に育てていく',
    description:
      '導入して終わりにはしません。使って分かったことを次の改善につなげ、知識が現場に残る形を目指します。',
    tags: ['継続改善', '運用支援', 'OSS'],
  },
]

const approach = [
  {
    step: 'Listen',
    title: '理解する',
    text: '現場の声と仕事の流れを知る。対面・遠隔を問わず、実際の状況から始めます。',
  },
  {
    step: 'Build',
    title: '小さく試す',
    text: '大きく作り込む前に、価値を確かめられる最小の形をつくります。',
  },
  {
    step: 'Improve',
    title: '改善を続ける',
    text: '利用する人の反応と変化を確かめ、次の一手を一緒に考えます。',
  },
]

function BrandLockup() {
  return (
    <span className="brand-lockup">
      <img src="/brand/pinkietech-mark.svg" alt="" width="42" height="42" />
      <span>PinkieTech</span>
    </span>
  )
}

function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        本文へ移動
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-link" href="#top" aria-label="PinkieTech ホーム">
            <BrandLockup />
          </a>
          <nav className="site-nav" aria-label="メインナビゲーション">
            <a href="#support">できること</a>
            <a href="#approach">進め方</a>
            <a href="#about">私たちについて</a>
            <a className="nav-contact" href="mailto:contact@pinkie-tech.jp">
              相談する
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">People first. Technology that works.</p>
              <h1 id="hero-title">
                現場に寄り添い、
                <br />
                人と技術をつなぐ。
              </h1>
              <p className="hero-lead">
                PinkieTechは、仕事をする人のそばで課題を理解し、
                AI・IoT・OSSを使って、一緒に改善を進めるエンジニア集団です。
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="mailto:contact@pinkie-tech.jp">
                  課題を相談する <span aria-hidden="true">→</span>
                </a>
                <a className="button button-secondary" href="#support">
                  できることを見る
                </a>
              </div>
              <p className="hero-note">まだ要件が決まっていない段階でも構いません。</p>
            </div>

            <div className="hero-visual" aria-label="理解し、つくり、改善するPinkieTechの進め方">
              <div className="workbench-label">
                <span>FIELD NOTES</span>
                <span>PT–001</span>
              </div>
              <div className="workbench-flow">
                <div className="flow-node flow-node-active">
                  <span className="flow-index">01</span>
                  <strong>理解する</strong>
                  <small>LISTEN</small>
                </div>
                <span className="flow-line" aria-hidden="true" />
                <div className="flow-node">
                  <span className="flow-index">02</span>
                  <strong>小さく試す</strong>
                  <small>BUILD</small>
                </div>
                <span className="flow-line" aria-hidden="true" />
                <div className="flow-node">
                  <span className="flow-index">03</span>
                  <strong>改善する</strong>
                  <small>IMPROVE</small>
                </div>
              </div>
              <div className="workbench-footer">
                <span className="status-dot" aria-hidden="true" />
                <span>人を中心に、技術を組み立てる</span>
              </div>
            </div>
          </div>
        </section>

        <section className="promise-band" aria-label="ブランドプロミス">
          <div className="container promise-inner">
            <p>技術は目的ではありません。</p>
            <p>人を支えるための手段です。</p>
          </div>
        </section>

        <section className="section" id="support" aria-labelledby="support-title">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">What we do</p>
              <h2 id="support-title">課題の近くから、はじめます。</h2>
              <p>
                決まった製品を当てはめるのではなく、状況に合わせて必要な支援を組み立てます。
              </p>
            </div>

            <div className="support-grid">
              {supportAreas.map((area) => (
                <article className="support-card" key={area.number}>
                  <span className="card-number">{area.number}</span>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <ul className="tag-list" aria-label={`${area.title}の領域`}>
                    {area.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section approach-section" id="approach" aria-labelledby="approach-title">
          <div className="container approach-layout">
            <div className="section-heading approach-heading">
              <p className="section-kicker">How we work</p>
              <h2 id="approach-title">一度で完璧を目指さない。</h2>
              <p>
                小さな改善を積み重ね、仕事をする人にとって本当に役立つ変化へつなげます。
              </p>
            </div>

            <ol className="approach-list">
              {approach.map((item, index) => (
                <li key={item.step}>
                  <span className="approach-number">0{index + 1}</span>
                  <div>
                    <span className="approach-step">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section values-section" aria-labelledby="values-title">
          <div className="container values-grid">
            <div className="values-mark" aria-hidden="true">
              <img src="/brand/pinkietech-mark.svg" alt="" width="180" height="180" />
            </div>
            <div className="values-copy">
              <p className="section-kicker">Our values</p>
              <h2 id="values-title">話しかけやすい、プロフェッショナル。</h2>
              <p>
                難しい言葉で技術をひけらかすのではなく、分かる言葉で誠実に話す。
                好奇心と技術力を持ちながら、泥臭い改善も楽しむ。それが私たちのスタイルです。
              </p>
              <div className="value-chips" aria-label="PinkieTechの価値観">
                <span>人を第一に</span>
                <span>現場主義</span>
                <span>オープンソース</span>
                <span>改善を楽しむ</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section story-section" id="about" aria-labelledby="story-title">
          <div className="container story-grid">
            <div>
              <p className="section-kicker">Why Pinkie?</p>
              <h2 id="story-title">小さな改善が、現場の大きな力になる。</h2>
            </div>
            <div className="story-copy">
              <p>
                小指は、手の中で一番小さな指です。しかし、小指があることで握る力が増し、手は本来の力を発揮できます。
              </p>
              <p>
                PinkieTechも、人と技術をつなぎ、仕事に足りない最後のピースになります。技術を作ることではなく、働く人を支え、より良い状態を一緒につくることが私たちの使命です。
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <div>
              <p className="section-kicker">Start a conversation</p>
              <h2 id="contact-title">まず、困っていることを聞かせてください。</h2>
              <p>技術や要件が固まっていなくても、課題の整理から一緒に始められます。</p>
            </div>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:contact@pinkie-tech.jp">
                contact@pinkie-tech.jp <span aria-hidden="true">→</span>
              </a>
              <a
                className="text-link text-link-light"
                href="https://x.com/pinkietech"
                target="_blank"
                rel="noreferrer"
              >
                Xで相談する <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <BrandLockup />
            <p>現場に寄り添い、人と技術をつなぐ。</p>
          </div>
          <div className="footer-links">
            <a href="mailto:contact@pinkie-tech.jp">Email</a>
            <a href="https://x.com/pinkietech" target="_blank" rel="noreferrer">
              X <span className="sr-only">（新しいタブで開く）</span>
            </a>
            <a href="https://github.com/w-pinkietech" target="_blank" rel="noreferrer">
              GitHub <span className="sr-only">（新しいタブで開く）</span>
            </a>
          </div>
          <p className="copyright">© 2026 PinkieTech株式会社</p>
        </div>
      </footer>
    </>
  )
}

export default Home
