import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const rootUrl = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, rootUrl))
const readText = async (path) => (await read(path)).toString('utf8')
const digest = (content) => createHash('sha256').update(content).digest('hex')

const files = {
  design: await readText('DESIGN.md'),
  home: await readText('src/pages/Home.tsx'),
  css: await readText('src/index.css'),
  html: await readText('index.html'),
  readme: await readText('README.md'),
  tokens: JSON.parse(await readText('public/brand/pinkietech.tokens.json')),
  manifest: JSON.parse(await readText('public/brand/brand-bundle.json')),
}

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
      bundleResults.length === 5 &&
      bundleResults.every((result) => result.matches),
  },
  {
    name: 'The official reverse logo asset is used',
    pass: files.home.includes('/brand/pinkietech-logo-reverse.svg'),
  },
  {
    name: 'The canonical messages stay synchronized',
    pass:
      [files.home, files.html, files.readme].every((file) =>
        file.includes('現場の力を、技術で引き出す。'),
      ) &&
      files.html.includes('働く人の困りごとから始め、技術を使い続けられる改善へ変えていく。'),
  },
  {
    name: 'The broad meaning of field appears near the hero',
    pass:
      files.home.includes('仕事が実際に行われる状況') &&
      files.home.includes('オフィス、遠隔、デジタル'),
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
      files.home.includes('<span>現場の力を、</span>') &&
      files.home.includes('<span>技術で引き出す。</span>'),
  },
  {
    name: 'Visible interactive selectors preserve the 44px minimum',
    pass: interactiveSelectors.every(cssRuleHasMinHeight),
  },
  {
    name: 'Mobile navigation remains available',
    pass:
      files.home.includes('className="mobile-menu"') &&
      files.css.includes('.mobile-menu {') &&
      files.css.includes('display: block;'),
  },
  {
    name: 'Mobile navigation has complete dismissal behavior',
    pass:
      files.home.includes("document.addEventListener('pointerdown'") &&
      files.home.includes("event.key === 'Escape'") &&
      files.home.includes("menu.querySelector('summary')?.focus()") &&
      files.home.includes('onClick={closeMobileMenu}'),
  },
  {
    name: 'Contact journey has an in-page destination and email fallback',
    pass:
      (files.home.match(/href="#contact"/g) ?? []).length >= 3 &&
      files.home.includes('id="contact"') &&
      files.home.includes('navigator.clipboard.writeText(contactEmail)') &&
      files.home.includes('アドレスをコピー'),
  },
  {
    name: 'The page avoids generic card components',
    pass: !/className=["'][^"']*\bcard\b/.test(files.home),
  },
  {
    name: 'Verifiable public work is linked without invented metrics',
    pass:
      /href="https:\/\/github\.com\/w-pinkietech"/.test(files.home) &&
      files.home.includes('成果を実績らしく飾るより') &&
      !/\d+%|導入実績|顧客数/.test(files.home),
  },
  {
    name: 'The public brand bundle excludes personal-card markers',
    pass: bundleResults.every((result) =>
      forbiddenPublicMarkers.every((marker) => !result.content.includes(marker)),
    ),
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
