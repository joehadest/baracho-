import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { fontsReady } from './lib/fonts'
import './index.css'

// A abertura (index.html) já está na tela; montamos o site quando as fontes
// chegarem, para que a página seja calculada uma vez só, já com a fonte final.
fontsReady().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
