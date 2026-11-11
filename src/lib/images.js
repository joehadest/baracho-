import manifest from '../data/image-manifest.json'

/**
 * Props responsivas para <img>: o navegador escolhe a versão WebP com a largura
 * certa para a tela (gerada por `npm run images`). Fotos sem versão otimizada
 * continuam funcionando com o arquivo original.
 *
 *   <img {...responsive(project.image, '(min-width: 1024px) 25vw, 50vw')} alt="…" />
 */
export const responsive = (src, sizes = '100vw') => {
  const variants = manifest[decodeURI(src)]
  if (!variants) return { src }
  return {
    src: variants.at(-1)[1],
    srcSet: variants.map(([w, url]) => `${url} ${w}w`).join(', '),
    sizes,
  }
}

/** Tamanhos de exibição (CSS) usados em cada lugar do site */
export const SIZES = {
  hero: '100vw',
  featured: '(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 90vw', // +zoom do parallax (scale 1.22)
  grid: '(min-width: 1280px) 24vw, (min-width: 1024px) 32vw, 50vw',
  about: '(min-width: 1024px) 44vw, 100vw',
  lightbox: '(min-width: 1024px) 60vw, 100vw',
}
