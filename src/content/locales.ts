export type Locale = 'ja' | 'en'

export const siteCopy = {
  ja: {
    skip: '本文へ移動',
    homeLabel: 'PinkieTech ホーム',
    navLabel: 'メインナビゲーション',
    mobileNavLabel: 'モバイルナビゲーション',
    menu: 'メニュー',
    problems: 'できること',
    approach: '進め方',
    about: '私たちについて',
    company: '会社概要',
    contact: '課題を相談する',
    language: 'English',
    languageLabel: '英語版を表示',
    tagline: '現場の力を、技術で引き出す。',
    newTab: '（新しいタブで開く）',
  },
  en: {
    skip: 'Skip to main content',
    homeLabel: 'PinkieTech home',
    navLabel: 'Main navigation',
    mobileNavLabel: 'Mobile navigation',
    menu: 'Menu',
    problems: 'What we help with',
    approach: 'How we work',
    about: 'About us',
    company: 'Company',
    contact: 'Talk to us',
    language: '日本語',
    languageLabel: 'View the Japanese site',
    tagline: 'Empowering people where work happens.',
    newTab: '(opens in a new tab)',
  },
} as const

export const homeCopy = {
  ja: {
    kicker: '現場伴走型エンジニアリング',
    heroTitle: ['現場の力を、', '技術で引き出す。'],
    heroLead:
      '働く人の困りごとから始め、AI・IoT・OSSを必要な形で使いながら、改善を続けられる仕組みを一緒につくります。',
    heroDefinition:
      '私たちがいう「現場」は、仕事が実際に行われる状況のこと。物理的な場所だけでなく、オフィス、遠隔、デジタルの仕事も含みます。',
    primaryAction: '現場の課題を相談する',
    secondaryAction: '私たちにできること',
    processLabel: '理解、試作、改善の3段階',
    manifesto: {
      index: '01 / 考え方',
      title: ['技術は目的ではありません。', '人を支えるための手段です。'],
      text: '新しい技術を入れることより、仕事をする人の負担が減り、判断しやすくなり、自分たちで次の改善を続けられることを大切にします。',
    },
    problemsSection: {
      index: '02 / 取り組む課題',
      title: '課題の近くから、始めます。',
      text: '決まった製品を当てはめるのではなく、今の仕事と困りごとを理解して、必要な支援を組み立てます。',
    },
    approachSection: {
      index: '03 / 進め方',
      title: '一度で完璧を目指さない。',
      text: '小さくつくり、確かめ、学ぶ。その積み重ねを、実際に使われ続ける変化へつなげます。',
    },
    proof: {
      index: '04 / 公開しているもの',
      title: 'つくったものを、確かめられる形に。',
      text: '公開できるコードや知識はGitHubで共有します。成果を実績らしく飾るより、判断の前提と実装を見られる形にすることを大切にします。',
      link: '公開リポジトリを見る',
    },
    valuesSection: {
      index: '05 / 私たちらしさ',
      title: '話しかけやすい、プロフェッショナル。',
      text: '技術を難しく見せるのではなく、分かる言葉で誠実に話す。好奇心と技術力を持ちながら、泥臭い改善も楽しむ。それが私たちのスタイルです。',
    },
    story: {
      index: '06 / Pinkieの由来',
      title: '小さな支えが、大きな力になる。',
      paragraphs: [
        '小指は、手の中で一番小さな指です。けれど、小指が支えることで、手はしっかりと握り、本来の力を発揮できます。',
        '現場の改善も同じです。派手な仕組みだけでなく、日々の仕事に合った小さな改善が、人の負担を減らし、判断を助け、現場全体を強くします。',
      ],
    },
    contact: {
      index: '07 / ご相談',
      title: 'まず、困っていることを聞かせてください。',
      text: '技術や要件が決まっていなくても構いません。仕事と課題の整理から、一緒に始められます。',
      emailLabel: 'メールアドレス',
      copy: 'メールアドレスをコピー',
      copied: 'コピーしました',
      failed: 'コピーできませんでした',
      openEmail: 'メールアプリを開く',
      openX: 'Xで相談する',
      note: '「メールアプリを開く」は端末の設定によって動作しない場合があります。その場合はメールアドレスをコピーしてご利用ください。',
    },
  },
  en: {
    kicker: 'Engineering alongside the people doing the work',
    heroTitle: ['Empowering people', 'where work happens.'],
    heroLead:
      'We start with the problems people face at work, then use AI, IoT, and open source where they genuinely help. Together, we build improvements that can keep evolving.',
    heroDefinition:
      'By “where work happens,” we mean the real conditions in which work gets done—not only physical sites, but also offices, remote operations, and digital workflows.',
    primaryAction: 'Talk about your challenge',
    secondaryAction: 'See what we help with',
    processLabel: 'Understand, test, and improve',
    manifesto: {
      index: '01 / Our belief',
      title: ['Technology is not the goal.', 'It is a means to support people.'],
      text: 'What matters is not adopting something new for its own sake. It is reducing burdens, making decisions easier, and enabling people to continue improving their own work.',
    },
    problemsSection: {
      index: '02 / Challenges we address',
      title: 'Start close to the problem.',
      text: 'We do not force a predetermined product into place. We understand the work as it is today, then shape the support that is actually needed.',
    },
    approachSection: {
      index: '03 / How we work',
      title: 'Do not wait for perfect.',
      text: 'Build something small, test it, and learn. We turn that cycle into change people can keep using.',
    },
    proof: {
      index: '04 / Work in the open',
      title: 'Make the work inspectable.',
      text: 'We share code and knowledge on GitHub when we can. Instead of decorating outcomes as claims, we prefer to make the assumptions and implementation available to inspect.',
      link: 'Explore our public repositories',
    },
    valuesSection: {
      index: '05 / What we are like',
      title: 'Approachable professionals.',
      text: 'We explain technology in plain language and speak honestly. We bring curiosity and technical depth while staying willing to do the practical, unglamorous work of improvement.',
    },
    story: {
      index: '06 / Why Pinkie',
      title: 'Small support can unlock greater strength.',
      paragraphs: [
        'The pinkie is the smallest finger, but its support helps the hand form a strong grip and use its full strength.',
        'Improvement works the same way. Small changes that fit everyday work can reduce burdens, support decisions, and make the whole way of working stronger.',
      ],
    },
    contact: {
      index: '07 / Start a conversation',
      title: 'Tell us what is getting in the way.',
      text: 'You do not need a finished technical plan. We can begin by understanding the work and clarifying the problem together.',
      emailLabel: 'Email',
      copy: 'Copy email address',
      copied: 'Copied',
      failed: 'Could not copy',
      openEmail: 'Open your email app',
      openX: 'Talk to us on X',
      note: 'If your email app does not open, copy the address and use it in your preferred email service.',
    },
  },
} as const

export const problems = {
  ja: [
    ['01', '作業の負担を減らす', '転記、確認、繰り返し作業、探す時間。日々積み重なる小さな負担から見直します。', '業務整理 / 自動化 / AI活用'],
    ['02', '判断しやすくする', '散らばった情報を、必要な人が必要なときに見られる形へつなぎます。', '可視化 / データ連携 / 判断支援'],
    ['03', '情報の途切れをなくす', '人、設備、システムの間にある分断を理解し、無理なく続く流れをつくります。', 'IoT / センサー / システム連携'],
    ['04', '変化に早く気づく', 'いつもと違う状態を捉え、問題が大きくなる前に動ける仕組みを一緒に考えます。', '計測 / 通知 / 異常把握'],
  ],
  en: [
    ['01', 'Reduce the burden of routine work', 'We examine the small costs that accumulate every day: re-entering data, repeated checks, repetitive tasks, and time spent searching.', 'Workflow design / Automation / Applied AI'],
    ['02', 'Make decisions easier', 'We connect scattered information so the right people can see what they need when they need it.', 'Visualization / Data integration / Decision support'],
    ['03', 'Keep information moving', 'We understand the gaps between people, equipment, and systems, then create a flow that can be sustained.', 'IoT / Sensors / System integration'],
    ['04', 'Notice change earlier', 'We help create ways to spot unusual conditions and act before a small issue becomes a larger problem.', 'Measurement / Alerts / Anomaly awareness'],
  ],
} as const

export const approach = {
  ja: [
    ['01', '仕事を理解する', '資料だけで判断せず、実際の仕事、道具、データ、制約、使う人の声を確かめます。'],
    ['02', '小さく試す', '大きく作り込む前に、価値とリスクを確かめられる最小の形をつくります。'],
    ['03', '改善を続けられる形にする', '使って分かったことを次へつなぎ、知識と判断が現場に残る状態を目指します。'],
  ],
  en: [
    ['01', 'Understand the work', 'We look beyond documents to the actual work, tools, data, constraints, and the voices of the people who use them.'],
    ['02', 'Test something small', 'Before building at scale, we make the smallest useful version that can test value and risk.'],
    ['03', 'Make improvement sustainable', 'We carry what people learn into the next step, leaving knowledge and decision-making capability with the team.'],
  ],
} as const

export const values = {
  ja: [
    ['人を第一に', '技術の都合より、使う人の判断と仕事を優先する。'],
    ['現場から始める', '物理的な場所に限らず、仕事が実際に行われる状況を知る。'],
    ['開いて、分かち合う', 'OSSと共有できる知識を活かし、囲い込みに頼らない。'],
    ['わかりやすく、誠実に', 'できることとできないことを、専門外の人にも伝わる言葉で話す。'],
  ],
  en: [
    ['People first', 'Put people’s judgment and work ahead of technological convenience.'],
    ['Start where work happens', 'Understand the real conditions of work, whether physical, remote, office-based, or digital.'],
    ['Open and share', 'Use open source and shareable knowledge instead of relying on lock-in.'],
    ['Clear and honest', 'Explain what is and is not possible in language that works beyond technical teams.'],
  ],
} as const
