// Shared character-collection logic for the font pipeline.
//
// Both the subset generator (scripts/subset-fonts.mjs) and the design-contract
// drift check (scripts/check-design.mjs) must agree, byte for byte, on which
// characters the site renders. Keeping that logic here guarantees they can never
// drift apart. Written with readdir (not fs/promises `glob`) so it runs on the
// Node 20 used by CI as well as newer local toolchains.

import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'

// Directories whose files contribute rendered text. Scanning source (rather than
// the prerendered HTML) also captures strings shown only after interaction, e.g.
// the copy-button success/failure messages in locales.ts.
const SOURCE_DIRS = [
  { dir: 'src/content', ext: /\.ts$/ },
  { dir: 'src/components', ext: /\.tsx$/ },
  { dir: 'src/pages', ext: /\.tsx$/ },
  { dir: 'src', ext: /\.tsx$/ }, // top-level entries only (readdir is not recursive)
]

const SOURCE_FILES = [
  'index.html',
  'company/index.html',
  'en/index.html',
  'en/company/index.html',
]

export async function collectSourceFiles(rootUrl) {
  const files = new Set(SOURCE_FILES)
  for (const { dir, ext } of SOURCE_DIRS) {
    let entries
    try {
      entries = await readdir(new URL(`${dir}/`, rootUrl), { withFileTypes: true })
    } catch {
      continue
    }
    for (const entry of entries) {
      if (entry.isFile() && ext.test(entry.name)) files.add(`${dir}/${entry.name}`)
    }
  }
  return [...files].sort()
}

export async function collectCharset(rootUrl) {
  const files = await collectSourceFiles(rootUrl)
  const chars = new Set()
  for (const rel of files) {
    let text
    try {
      text = await readFile(new URL(rel, rootUrl), 'utf8')
    } catch {
      continue
    }
    for (const ch of text) {
      const code = ch.codePointAt(0)
      // Skip control characters; keep everything else that can be rendered.
      if (code >= 0x20 || code === 0x09) chars.add(ch)
    }
  }
  // Always include the ASCII space so word gaps use the webfont metrics.
  chars.add(' ')
  return [...chars].sort()
}

// Stable fingerprint of the exact glyph set the committed subset fonts were
// built for. Embedded in src/fonts.generated.css and re-checked in CI.
export function charsetSignature(chars) {
  return createHash('sha256').update(chars.join('')).digest('hex')
}
