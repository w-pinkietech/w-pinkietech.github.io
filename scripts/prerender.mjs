import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const routes = new Map([
  ['/', { file: 'dist/index.html', expected: '現場の力を、' }],
  ['/company/', { file: 'dist/company/index.html', expected: '会社概要' }],
  ['/en/', { file: 'dist/en/index.html', expected: 'Empowering people' }],
  ['/en/company/', { file: 'dist/en/company/index.html', expected: 'Company information' }],
])

const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

  for (const [pathname, { file: relativeFile, expected }] of routes) {
    const target = path.join(root, relativeFile)
    const template = await readFile(target, 'utf8')
    const appHtml = render(pathname)

    if (!appHtml.includes('id="main-content"') || !appHtml.includes(expected)) {
      throw new Error(`${pathname} did not render its expected static content`)
    }

    if (!template.includes('<div id="root"></div>')) {
      throw new Error(`${relativeFile} is missing the empty root placeholder`)
    }

    const output = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    await writeFile(target, output)
    console.log(`Prerendered ${pathname} -> ${relativeFile}`)
  }
} finally {
  await vite.close()
}
