/**
 * Texto que "rola" no hover do link/botão pai (efeito de troca vertical).
 * A cópia de baixo é desenhada via text-shadow, sem duplicar o texto no DOM.
 */
const Roll = ({ children }) => (
  <span className="roll">
    <span className="roll-inner">{children}</span>
  </span>
)

export default Roll
