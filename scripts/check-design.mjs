import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const rootUrl = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, rootUrl))
const readText = async (path) => (await read(path)).toString('utf8')
// The canonical brand manifest is generated with LF line endings. Normalize
// Windows checkouts before hashing so the content contract remains portable.
const digest = (content) =>
  createHash('sha256').update(content.toString('utf8').replace(/\r\n/g, '\n')).digest('hex')

const files = {
  companyProfile: await readText('COMPANY.md'),
  design: await readText('DESIGN.md'),
  home: await readText('src/pages/Home.tsx'),
  company: await readText('src/pages/Company.tsx'),
  companyContent: await readText('src/content/company.ts'),
  locales: await readText('src/content/locales.ts'),
  logo: await readText('src/components/BrandLogo.tsx'),
  header: await readText('src/components/SiteHeader.tsx'),
  footer: await readText('src/components/SiteFooter.tsx'),
  css: await readText('src/index.css'),
  html: await readText('index.html'),
  companyHtml: await readText('company/index.html'),
  enHtml: await readText('en/index.html'),
  enCompanyHtml: await readText('en/company/index.html'),
  vite: await readText('vite.config.ts'),
  package: JSON.parse(await readText('package.json')),
  prerender: await readText('scripts/prerender.mjs'),
  serverEntry: await readText('src/entry-server.tsx'),
  robots: await readText('public/robots.txt'),
  sitemap: await readText('public/sitemap.xml'),
  llms: await readText('public/llms.txt'),
  ogImage: await read('public/og.png'),
  readme: await readText('README.md'),
  tokens: JSON.parse(await readText('public/brand/pinkietech.tokens.json')),
  manifest: JSON.parse(await readText('public/brand/brand-bundle.json')),
}

const siteSource = [files.home, files.company, files.header, files.footer, files.locales].join('\n')
const htmlFiles = [files.html, files.companyHtml, files.enHtml, files.enCompanyHtml]
const structuredData = htmlFiles.flatMap((html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  ),
)

const bundleResults = await Promise.all(
  Object.entries(files.manifest.files).map(async ([target, metadata]) => {
    const content = await read(target)
    return {
      target,
      matches: digest(content) === metadata.sha256,
      content: content.toString('utf8').toLowerCase(),
    }
  }),
)

const cssRuleHasMinHeight = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = files.css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))
  if (!match) return false
  const value = match[1].match(/min-height:\s*([\d.]+)(rem|px)/)
  if (!value) return false
  return value[2] === 'rem' ? Number(value[1]) * 16 >= 44 : Number(value[1]) >= 44
}

const interactiveSelectors = [
  '.brand-link',
  '.site-nav a',
  '.mobile-menu summary',
  '.mobile-menu nav a',
  '.button',
  '.text-link',
  '.copy-email',
  '.footer-links a',
]

const forbiddenPublicMarkers = [
  'profile.local',
  'name_ja',
  'name_romaji',
  'qr_url',
  'business-card/local',
]

const checks = [
  {
    name: 'DESIGN.md declares the canonical brand source',
    pass:
      files.design.includes('website-design-system.md') &&
      files.design.includes('ブランド管理リポジトリ') &&
      files.design.includes('public/brand/pinkietech-logo-reverse.svg'),
  },
  {
    name: 'The brand bundle is versioned and hash-verified',
    pass:
      files.manifest.schemaVersion === 1 &&
      /^[0-9a-f]{40}$/.test(files.manifest.sourceCommit) &&
      files.manifest.sourceVersion === files.tokens.meta.version &&
      bundleResults.length === 6 &&
      bundleResults.every((result) => result.matches),
  },
  {
    name: 'The official reverse logo asset is used',
    pass: files.logo.includes('/brand/pinkietech-logo-reverse.svg'),
  },
  {
    name: 'The canonical messages stay synchronized',
    pass:
      [files.locales, files.html, files.readme].every((file) =>
        file.includes('現場の力を、技術で引き出す。'),
      ) &&
      files.locales.includes('Empowering people where work happens.') &&
      files.enHtml.includes('Empowering people where work happens.') &&
      files.html.includes('働く人の困りごとから始め、技術を使い続けられる改善へ変えていく。'),
  },
  {
    name: 'The broad meaning of field appears near the hero',
    pass:
      files.locales.includes('仕事が実際に行われる状況') &&
      files.locales.includes('オフィス、遠隔、デジタル') &&
      files.locales.includes('offices, remote operations, and digital workflows'),
  },
  {
    name: 'Website colors consume canonical semantic tokens',
    pass:
      files.css.includes("@import url('/brand/pinkietech.css')") &&
      files.css.includes('var(--pt-semantic-surface-inverse-deep)') &&
      files.css.includes('var(--pt-semantic-text-inverse-subtle)') &&
      !/#[0-9a-f]{6}/i.test(files.css),
  },
  {
    name: 'Japanese typography and deliberate hero lines are present',
    pass:
      files.css.includes('line-break: strict') &&
      files.css.includes('"palt" 1') &&
      files.css.includes('letter-spacing: -0.015em') &&
      files.home.includes('<span>{copy.heroTitle[0]}</span>') &&
      files.home.includes('<span>{copy.heroTitle[1]}</span>'),
  },
  {
    name: 'Visible interactive selectors preserve the 44px minimum',
    pass: interactiveSelectors.every(cssRuleHasMinHeight),
  },
  {
    name: 'Mobile navigation remains available',
    pass:
      files.header.includes('className="mobile-menu"') &&
      files.css.includes('.mobile-menu {') &&
      files.css.includes('display: block;'),
  },
  {
    name: 'Mobile navigation has complete dismissal behavior',
    pass:
      files.header.includes("document.addEventListener('pointerdown'") &&
      files.header.includes("event.key === 'Escape'") &&
      files.header.includes("menu.querySelector('summary')?.focus()") &&
      files.header.includes('onClick={closeMobileMenu}'),
  },
  {
    name: 'Contact journey has an in-page destination and email fallback',
    pass:
      files.header.includes('${homePrefix}#contact') &&
      files.footer.includes('${homePath}#contact') &&
      files.home.includes('id="contact"') &&
      files.home.includes('navigator.clipboard.writeText(contactEmail)') &&
      files.home.includes('className="button button-primary copy-email"') &&
      files.locales.includes('メールアドレスをコピー') &&
      files.locales.includes('Copy email address') &&
      files.locales.includes('メールアプリを開く') &&
      files.locales.includes('Open your email app'),
  },
  {
    name: 'The page avoids generic card components',
    pass: !/className=["'][^"']*\bcard\b/.test(siteSource),
  },
  {
    name: 'Company profile is a dedicated, canonical and reachable page',
    pass:
      /<link rel="canonical" href="https:\/\/pinkie-tech\.jp\/company\/" \/>/.test(
        files.companyHtml,
      ) &&
      files.companyHtml.includes('/src/company.tsx') &&
      files.header.includes("const companyPath = locale === 'ja' ? '/company/' : '/en/company/'") &&
      files.footer.includes("const companyPath = locale === 'ja' ? '/company/' : '/en/company/'") &&
      files.company.includes('localeFacts.map') &&
      files.company.includes('localeBusiness.map'),
  },
  {
    name: 'Verified company facts stay synchronized with the brand source',
    pass: [
      'PinkieTech株式会社',
      'PinkieTech Co., Ltd.',
      '渡部健太',
      '2025年1月17日',
      '5,000,000円',
      '福岡県北九州市八幡西区塔野1-14-22',
      '現場の課題整理と継続的な改善支援',
      'AI・IoTを活用したソフトウェアと仕組みの設計・実装',
      'OSSの開発、活用、知識共有、コミュニティへの還元',
    ].every(
      (fact) => files.companyProfile.includes(fact) && files.companyContent.includes(fact),
    ),
  },
  {
    name: 'Official company names are consistent across English public surfaces',
    pass:
      files.enCompanyHtml.includes('PinkieTech Co., Ltd.') &&
      files.companyContent.includes("['Company name', 'PinkieTech Co., Ltd.']") &&
      files.footer.includes("locale === 'ja' ? 'PinkieTech株式会社' : 'PinkieTech Co., Ltd.'") &&
      files.readme.includes('英語で`PinkieTech Co., Ltd.`'),
  },
  {
    name: 'Verifiable public work is linked without invented metrics',
    pass:
      /href="https:\/\/github\.com\/w-pinkietech"/.test(files.home) &&
      files.locales.includes('成果を実績らしく飾るより') &&
      !/\d+%|導入実績|顧客数/.test(siteSource),
  },
  {
    name: 'The public brand bundle excludes personal-card markers',
    pass: bundleResults.every((result) =>
      forbiddenPublicMarkers.every((marker) => !result.content.includes(marker)),
    ),
  },
  {
    name: 'Japanese and English routes are static build entries',
    pass:
      files.vite.includes("path.resolve(__dirname, 'en/index.html')") &&
      files.vite.includes("path.resolve(__dirname, 'en/company/index.html')") &&
      files.enHtml.includes('<html lang="en">') &&
      files.enCompanyHtml.includes('<html lang="en">') &&
      files.html.includes('<html lang="ja">') &&
      files.companyHtml.includes('<html lang="ja">'),
  },
  {
    name: 'Every public route is prerendered for no-JavaScript readers',
    pass:
      files.package.scripts.build.endsWith('node scripts/prerender.mjs') &&
      ['/', '/company/', '/en/', '/en/company/'].every(
        (route) => files.prerender.includes(`['${route}',`) && files.serverEntry.includes(`case '${route}':`),
      ),
  },
  {
    name: 'Language switchers map equivalent pages without forced redirects',
    pass:
      files.header.includes('const alternatePath =') &&
      files.header.includes("'/en/'") &&
      files.header.includes("'/en/company/'") &&
      files.header.includes('hrefLang=') &&
      !siteSource.includes('navigator.language') &&
      !siteSource.includes('window.location.replace'),
  },
  {
    name: 'Canonical and hreflang metadata is reciprocal across all pages',
    pass:
      htmlFiles.every(
        (html) =>
          html.includes('rel="canonical"') &&
          html.includes('hreflang="ja"') &&
          html.includes('hreflang="en"') &&
          html.includes('hreflang="x-default"'),
      ),
  },
  {
    name: 'Social previews use the approved bilingual-safe brand card',
    pass:
      files.ogImage.subarray(1, 4).toString('ascii') === 'PNG' &&
      files.ogImage.readUInt32BE(16) === 1730 &&
      files.ogImage.readUInt32BE(20) === 909 &&
      htmlFiles.every(
        (html) =>
          html.includes('property="og:image" content="https://pinkie-tech.jp/og.png"') &&
          html.includes('name="twitter:card" content="summary_large_image"'),
      ),
  },
  {
    name: 'Machine-readable organization data is valid and evidence-based',
    pass:
      structuredData.length === 4 &&
      structuredData.every((item) => item['@context'] === 'https://schema.org') &&
      structuredData.some(
        (item) =>
          item['@type'] === 'Organization' &&
          item.legalName === 'PinkieTech株式会社' &&
          item.alternateName === 'PinkieTech Co., Ltd.' &&
          item.email === 'contact@pinkie-tech.jp' &&
          item.foundingDate === '2025-01-17',
      ) &&
      !htmlFiles.join('\n').match(/導入実績|顧客数|customer count|adoption rate/i),
  },
  {
    name: 'AI discovery files separate search access from model training',
    pass:
      files.robots.includes('User-agent: OAI-SearchBot\nAllow: /') &&
      files.robots.includes('User-agent: GPTBot\nDisallow: /') &&
      files.robots.includes('Sitemap: https://pinkie-tech.jp/sitemap.xml') &&
      files.llms.startsWith('# PinkieTech') &&
      files.llms.includes('Official English company name: PinkieTech Co., Ltd.') &&
      files.llms.includes('Japanese is the source language') &&
      files.llms.includes('does not claim unlisted customer results'),
  },
  {
    name: 'The sitemap lists reciprocal Japanese and English page pairs',
    pass:
      [
        'https://pinkie-tech.jp/',
        'https://pinkie-tech.jp/en/',
        'https://pinkie-tech.jp/company/',
        'https://pinkie-tech.jp/en/company/',
      ].every((url) => files.sitemap.includes(`<loc>${url}</loc>`)) &&
      (files.sitemap.match(/hreflang="en"/g) ?? []).length === 4 &&
      (files.sitemap.match(/hreflang="ja"/g) ?? []).length === 4,
  },
]

const failures = checks.filter((check) => !check.pass)

for (const check of checks) {
  console.log(`${check.pass ? 'PASS' : 'FAIL'}  ${check.name}`)
}

if (failures.length > 0) {
  console.error(`\n${failures.length} design contract check(s) failed.`)
  process.exitCode = 1
} else {
  console.log(`\nAll ${checks.length} design contract checks passed.`)
}
