import { readdir, readFile } from 'fs/promises'
import { join, extname } from 'path'

const ROOTS = ['app', 'components', 'lib', 'scripts', 'netlify.toml', 'next.config.js']
const TEXT_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.md', '.toml', '.json', '.yml', '.yaml', '.css'])
const FORBIDDEN = [
  { name: 'localhost', regex: /localhost/i },
  { name: '127.0.0.1', regex: /127\.0\.0\.1/ },
  { name: '0.0.0.0', regex: /http:\/\/0\.0\.0\.0/ },
  { name: 'OpenAI-like secret (sk-)', regex: /sk-[A-Za-z0-9]{10,}/ },
]

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', '.next', 'out', '.git', '.netlify', 'public'].includes(e.name)) continue
      yield* walk(p)
    } else {
      yield p
    }
  }
}

async function scanFile(path) {
  // ignore this scanner file itself
  if (path.endsWith('scripts/ci/forbidden-scan.mjs')) return []
  const ext = extname(path)
  if (ext && !TEXT_EXTS.has(ext)) return []
  const content = await readFile(path, 'utf8')
  const lines = content.split(/\r?\n/)
  const hits = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (const rule of FORBIDDEN) {
      if (rule.regex.test(line)) {
        hits.push({ path, line: i + 1, rule: rule.name, text: line.trim() })
      }
    }
  }
  return hits
}

async function main() {
  let findings = []
  for (const root of ROOTS) {
    try {
      for await (const file of walk(root)) {
        const hits = await scanFile(file)
        findings = findings.concat(hits)
      }
    } catch {}
  }

  if (findings.length) {
    console.error('Forbidden patterns found:')
    for (const f of findings) {
      console.error(`- [${f.rule}] ${f.path}:${f.line} -> ${f.text}`)
    }
    process.exit(1)
  } else {
    console.log('No forbidden patterns found.')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

