/**
 * Ilustração vetorial: equipe em acesso por cordas num tanque industrial.
 * SVG puro → nítida em qualquer resolução (celular, 4K) e animável peça por peça.
 * viewBox 1600×1000 com preserveAspectRatio "slice" — o foco (escaladores) fica
 * no centro, então os cortes em telas verticais preservam o essencial.
 */

const SUIT = '#f26b1d'
const SUIT_DARK = '#c24f0f'
const STRAP = '#16161a'
const REFLECT = '#e4e4e7'

// Tanque: centro e raio na horizontal
const CX = 820
const R = 400
const L = CX - R
const RR = CX + R

// Costuras verticais das chapas (mais juntas nas bordas, como num cilindro)
const plateSeams = [-72, -54, -36, -18, 0, 18, 36, 54, 72].map((deg) => CX + R * Math.sin((deg * Math.PI) / 180))
// Costuras horizontais (anéis de chapa vistos de baixo)
const rings = [150, 270, 400, 545, 700, 865]

const ropes = [
  { x: 690, dx: -40 },
  { x: 985, dx: 30 },
  { x: 770, dx: -10 },
  { x: 930, dx: 15 },
  { x: 560, dx: -35 },
  { x: 1090, dx: 20 },
]
const ropeX = (rope, y) => rope.x + (rope.dx * (y - 88)) / 912

// Escaladores: corda, altura e escala (mais alto = mais longe = menor)
const climbers = [
  { rope: 0, y: 265, s: 0.78, tool: 'brush' },
  { rope: 1, y: 215, s: 0.72, tool: 'none' },
  { rope: 2, y: 560, s: 1.12, tool: 'roller' },
  { rope: 3, y: 655, s: 1.3, tool: 'gauge' },
]

const Climber = ({ tool }) => (
  <g>
    {/* sombra no costado */}
    <ellipse cx="26" cy="6" rx="36" ry="78" fill="#000" opacity="0.28" filter="url(#ra-soft)" />

    {/* bolsa de ferramentas */}
    <path d="M0 10 L0 20" stroke={STRAP} strokeWidth="2" />
    <rect x="-11" y="20" width="22" height="26" rx="4" fill="#2a2a31" />
    <rect x="-11" y="20" width="22" height="6" rx="3" fill="#3a3a43" />

    {/* pernas apoiadas na parede */}
    <path d="M-8 6 L-26 40 L-20 76" fill="none" stroke={SUIT_DARK} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 6 L24 36 L30 72" fill="none" stroke={SUIT} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M-23 52 L-19 62" stroke={REFLECT} strokeWidth="3" opacity="0.8" />
    <path d="M27 50 L28 60" stroke={REFLECT} strokeWidth="3" opacity="0.8" />
    <path d="M-20 76 L-13 85" stroke={STRAP} strokeWidth="14" strokeLinecap="round" />
    <path d="M30 72 L39 78" stroke={STRAP} strokeWidth="14" strokeLinecap="round" />

    {/* tronco */}
    <path d="M-17 -40 Q0 -47 17 -40 L15 8 Q0 15 -15 8 Z" fill="url(#ra-suit)" />
    <path d="M-16 -16 L16 -16" stroke={REFLECT} strokeWidth="3.5" opacity="0.85" />

    {/* cadeirinha / talabarte */}
    <g stroke={STRAP} strokeWidth="4" fill="none" strokeLinecap="round">
      <path d="M-15 -1 L15 -1" />
      <path d="M-12 -38 L8 -1" />
      <path d="M12 -38 L-8 -1" />
      <path d="M-14 6 Q-8 15 -2 8" />
      <path d="M14 6 Q8 15 2 8" />
    </g>
    <rect x="-4" y="-16" width="8" height="14" rx="2" fill="#a1a1aa" />
    <circle cx="0" cy="-1" r="4" fill="none" stroke="#d4d4d8" strokeWidth="2.5" />

    {/* braço que segura a corda */}
    <path d="M12 -34 L19 -58 L4 -78" fill="none" stroke={SUIT} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="3" cy="-80" r="6.5" fill="#d4d4d8" />

    {/* braço de trabalho + ferramenta */}
    <path d="M-12 -34 L-31 -21 L-42 -33" fill="none" stroke={SUIT_DARK} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="-43" cy="-34" r="6" fill="#d4d4d8" />
    {tool === 'roller' && (
      <g>
        <path d="M-45 -36 L-62 -54" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />
        <rect x="-80" y="-66" width="30" height="11" rx="5" transform="rotate(-42 -65 -60)" fill={SUIT} />
      </g>
    )}
    {tool === 'brush' && (
      <g>
        <path d="M-45 -36 L-60 -50" stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
        <path d="M-60 -50 L-70 -60" stroke="#e4e4e7" strokeWidth="9" strokeLinecap="butt" />
      </g>
    )}
    {tool === 'gauge' && (
      <g>
        <rect x="-60" y="-50" width="20" height="14" rx="3" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
        <rect x="-56" y="-47" width="12" height="6" rx="1" fill="#22d3ee" opacity="0.8" />
      </g>
    )}

    {/* cabeça e capacete */}
    <circle cx="0" cy="-50" r="10" fill="#2a2a31" />
    <path d="M-15 -54 Q-15 -73 0 -73 Q15 -73 15 -54 Z" fill="url(#ra-helmet)" />
    <path d="M-18 -54 L18 -54" stroke="#8f1014" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M-9 -66 Q-3 -70 4 -70" stroke="#ff9a9d" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
  </g>
)

const RopeAccessArt = ({ className = '', ...rest }) => (
  <svg
    viewBox="0 0 1600 1000"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    role="img"
    aria-label="Ilustração de equipe em acesso por cordas realizando inspeção e pintura em um tanque industrial"
    {...rest}
  >
    <defs>
      <linearGradient id="ra-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b0b0d" />
        <stop offset="0.55" stopColor="#1d1d22" />
        <stop offset="1" stopColor="#3a0a0c" />
      </linearGradient>
      <radialGradient id="ra-sun" cx="0.82" cy="0.12" r="0.45">
        <stop offset="0" stopColor="#ff7a7e" stopOpacity="0.85" />
        <stop offset="0.25" stopColor="#e31e24" stopOpacity="0.45" />
        <stop offset="1" stopColor="#e31e24" stopOpacity="0" />
      </radialGradient>
      {/* sombreamento cilíndrico do tanque */}
      <linearGradient id="ra-tank" x1={L} y1="0" x2={RR} y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0e0e11" />
        <stop offset="0.18" stopColor="#2a2a31" />
        <stop offset="0.4" stopColor="#5b5b66" />
        <stop offset="0.5" stopColor="#6e6e7a" />
        <stop offset="0.62" stopColor="#4a4a54" />
        <stop offset="0.85" stopColor="#1d1d22" />
        <stop offset="1" stopColor="#0b0b0d" />
      </linearGradient>
      {/* luz vermelha de recorte na borda direita */}
      <linearGradient id="ra-rim" x1={L} y1="0" x2={RR} y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0.86" stopColor="#e31e24" stopOpacity="0" />
        <stop offset="0.97" stopColor="#f2393f" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ff7a7e" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="ra-rust" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7c2d12" stopOpacity="0" />
        <stop offset="0.3" stopColor="#9a3412" stopOpacity="0.35" />
        <stop offset="1" stopColor="#7c2d12" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ra-pipe" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0b0b0d" />
        <stop offset="0.35" stopColor="#52525b" />
        <stop offset="0.55" stopColor="#3f3f46" />
        <stop offset="1" stopColor="#0b0b0d" />
      </linearGradient>
      <linearGradient id="ra-suit" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ff8a3d" />
        <stop offset="1" stopColor={SUIT_DARK} />
      </linearGradient>
      <linearGradient id="ra-helmet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f2393f" />
        <stop offset="1" stopColor="#c3161c" />
      </linearGradient>
      <clipPath id="ra-tank-clip">
        <rect x={L} y="60" width={R * 2} height="960" />
      </clipPath>
      <filter id="ra-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.09" />
        </feComponentTransfer>
      </filter>
      <filter id="ra-soft" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <pattern id="ra-grid" width="64" height="64" patternUnits="userSpaceOnUse">
        <path d="M64 0H0V64" fill="none" stroke="#fff" strokeOpacity="0.05" />
      </pattern>
    </defs>

    {/* Céu */}
    <rect width="1600" height="1000" fill="url(#ra-sky)" />
    <rect width="1600" height="1000" fill="url(#ra-grid)" />
    <rect width="1600" height="1000" fill="url(#ra-sun)" />

    {/* Estruturas ao fundo (direita) */}
    <g fill="#16161a">
      <rect x="1290" y="180" width="26" height="820" />
      <rect x="1420" y="120" width="18" height="880" />
      <path d="M1290 300 L1438 220 L1438 236 L1290 316 Z" />
      <path d="M1290 520 L1438 440 L1438 456 L1290 536 Z" />
      <path d="M1290 740 L1438 660 L1438 676 L1290 756 Z" />
    </g>
    <rect x="1505" y="0" width="46" height="1000" fill="url(#ra-pipe)" />
    <rect x="1505" y="340" width="46" height="22" fill="#e31e24" />
    <rect x="1505" y="368" width="46" height="6" fill="#e4e4e7" opacity="0.7" />

    {/* Tanque */}
    <g>
      <rect x={L} y="60" width={R * 2} height="960" fill="url(#ra-tank)" />
      <g clipPath="url(#ra-tank-clip)">
        {/* manchas de ferrugem escorrendo */}
        {[520, 610, 735, 905, 1010, 1100].map((x, i) => (
          <rect key={x} x={x} y={150 + (i % 3) * 120} width={18 + (i % 2) * 14} height={260 + (i % 3) * 80} fill="url(#ra-rust)" />
        ))}
        {/* costuras verticais */}
        {plateSeams.map((x) => (
          <path key={x} d={`M${x} 60 V1000`} stroke="#000" strokeOpacity="0.35" strokeWidth="2" />
        ))}
        {plateSeams.map((x) => (
          <path key={`h${x}`} d={`M${x + 2} 60 V1000`} stroke="#fff" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        {/* anéis horizontais */}
        {rings.map((y) => (
          <g key={y}>
            <path d={`M${L} ${y} Q${CX} ${y + 46} ${RR} ${y}`} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="3" />
            <path d={`M${L} ${y + 3} Q${CX} ${y + 49} ${RR} ${y + 3}`} fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="1.5" />
          </g>
        ))}
        <rect x={L} y="60" width={R * 2} height="960" filter="url(#ra-grain)" />
      </g>
      <rect x={L} y="60" width={R * 2} height="960" fill="url(#ra-rim)" />

      {/* topo do tanque e guarda-corpo */}
      <path d={`M${L - 6} 92 Q${CX} 130 ${RR + 6} 92 L${RR + 6} 80 Q${CX} 118 ${L - 6} 80 Z`} fill="#3a3a43" />
      <path d={`M${L} 58 Q${CX} 92 ${RR} 58`} fill="none" stroke="#71717a" strokeWidth="4" />
      <path d={`M${L} 40 Q${CX} 74 ${RR} 40`} fill="none" stroke="#52525b" strokeWidth="3" />
      {[0.05, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95].map((t) => {
        const x = L + t * R * 2
        const sag = 34 * (1 - Math.pow(2 * t - 1, 2))
        return <path key={t} d={`M${x} ${40 + sag} V${86 + sag}`} stroke="#52525b" strokeWidth="3" />
      })}
    </g>

    {/* Escada marinheiro na lateral esquerda do tanque */}
    <g stroke="#3f3f46" strokeWidth="5">
      <path d={`M${L + 46} 90 V1000`} />
      <path d={`M${L + 84} 90 V1000`} />
    </g>
    <g stroke="#3f3f46" strokeWidth="3">
      {Array.from({ length: 30 }, (_, i) => 110 + i * 31).map((y) => (
        <path key={y} d={`M${L + 46} ${y} H${L + 84}`} />
      ))}
    </g>

    {/* Cordas */}
    <g stroke="#e7e2d6" strokeWidth="2.4" opacity="0.9">
      {ropes.map((r) => (
        <path key={r.x} d={`M${r.x} 88 L${r.x + r.dx} 1000`} />
      ))}
    </g>
    <g fill="#d4d4d8">
      {ropes.map((r) => (
        <rect key={r.x} x={r.x - 5} y="84" width="10" height="9" rx="2" />
      ))}
    </g>

    {/* Escaladores */}
    {climbers.map((c, i) => {
      const rope = ropes[c.rope]
      return (
        <g key={i} data-climber>
          <g transform={`translate(${ropeX(rope, c.y)} ${c.y}) scale(${c.s})`}>
            <Climber tool={c.tool} />
          </g>
        </g>
      )
    })}

    {/* Primeiro plano: tubulações e estrutura (esquerda) */}
    <g>
      <path d="M-40 1000 L330 -20 L372 -20 L2 1000 Z" fill="#111114" />
      <path d="M330 -20 L372 -20" stroke="#3a3a43" strokeWidth="2" />
      <path d="M-40 760 L250 -20 L276 -20 L-14 760 Z" fill="#16161a" />
      <path d="M0 640 L300 640 L300 662 L0 662 Z" fill="#16161a" />
      <path d="M0 320 L250 320 L250 338 L0 338 Z" fill="#16161a" />
      <rect x="48" y="0" width="40" height="1000" fill="url(#ra-pipe)" />
      <rect x="104" y="0" width="28" height="1000" fill="url(#ra-pipe)" />
      <rect x="148" y="0" width="34" height="1000" fill="url(#ra-pipe)" />
      <rect x="48" y="210" width="40" height="20" fill="#e31e24" />
      <rect x="48" y="236" width="40" height="5" fill="#e4e4e7" opacity="0.7" />
      <rect x="148" y="560" width="34" height="18" fill="#e31e24" />
      <rect x="104" y="420" width="28" height="14" fill="#e4e4e7" opacity="0.55" />
    </g>

    {/* Anotação técnica */}
    <g data-annot fontFamily="JetBrains Mono, ui-monospace, monospace" fill="#a1a1aa">
      <circle cx="942" cy="640" r="125" fill="none" stroke="#e31e24" strokeOpacity="0.55" strokeDasharray="6 8" />
      <path d="M1067 640 H1110" stroke="#e31e24" strokeOpacity="0.55" />
      <circle cx="1110" cy="640" r="4" fill="#e31e24" />
      <text x="1122" y="636" fontSize="15" letterSpacing="3" fill="#e4e4e7">ACESSO POR CORDAS</text>
      <text x="1122" y="660" fontSize="12" letterSpacing="2.5">INSPEÇÃO · PINTURA</text>
    </g>
  </svg>
)

export default RopeAccessArt
