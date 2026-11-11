// Faces usadas na primeira dobra e no resto do site (ver @font-face no index.html).
const FACES = [
  '400 1em Barlow',
  '500 1em Barlow',
  '600 1em Barlow',
  '700 1em "Barlow Condensed"',
  '800 1em "Barlow Condensed"',
  '400 1em "JetBrains Mono"',
  '500 1em "JetBrains Mono"',
]

let promise = null

/**
 * Resolve quando as fontes principais chegaram (ou após `timeout` ms, para não
 * prender o site numa conexão ruim). Montar a página só depois disso evita que
 * cada fonte, ao chegar, obrigue o navegador a refazer o layout inteiro.
 */
export const fontsReady = (timeout = 2500) => {
  if (!promise) {
    const load = document.fonts
      ? Promise.all(FACES.map((f) => document.fonts.load(f))).catch(() => {})
      : Promise.resolve()
    promise = Promise.race([load, new Promise((r) => setTimeout(r, timeout))])
  }
  return promise
}
