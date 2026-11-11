// Gera versões WebP responsivas das fotos usadas no site.
//
//   npm run images
//
// Para cada JPG/PNG em public/images/projects cria variantes em larguras padrão
// (sem ampliar além do original) em public/images/opt/, e escreve o mapa
// src/data/image-manifest.json usado pelo helper src/lib/images.js (srcset).
// Rode de novo sempre que adicionar ou trocar fotos.
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const SOURCE_DIRS = ['images/projects']
const OUT_DIR = 'images/opt'
const WIDTHS = [400, 640, 960, 1280, 1600]
const QUALITY = 74

const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const walk = async (dir) => {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full)
  }
  return out
}

const manifest = {}
let before = 0
let after = 0

for (const dir of SOURCE_DIRS) {
  for (const file of await walk(path.join(PUBLIC, dir))) {
    const rel = path.relative(PUBLIC, file).split(path.sep) // ['images','projects','x','y.jpg']
    const key = '/' + rel.join('/')
    const name = path.parse(rel.at(-1)).name
    const outRel = [OUT_DIR, ...rel.slice(1, -1).map(slug), slug(name)].join('/')
    await fs.mkdir(path.join(PUBLIC, path.dirname(outRel)), { recursive: true })

    const { width } = await sharp(file).metadata()
    const widths = [...WIDTHS.filter((w) => w < width * 0.95), width]
    const variants = []
    for (const w of widths) {
      const url = `/${outRel}-${w}.webp`
      const target = path.join(PUBLIC, url)
      await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 6 }).toFile(target)
      variants.push([w, url])
    }
    const largest = (await fs.stat(path.join(PUBLIC, variants.at(-1)[1]))).size
    before += (await fs.stat(file)).size
    after += largest
    manifest[key] = variants
    console.log(`${key}  →  ${widths.join(', ')}`)
  }
}

await fs.writeFile(path.join(ROOT, 'src/data/image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`\n${Object.keys(manifest).length} imagens · original ${(before / 1024).toFixed(0)} KB → maior WebP ${(after / 1024).toFixed(0)} KB`)
