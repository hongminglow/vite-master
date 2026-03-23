import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import { AppProviders } from '@/app/providers'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)

// ── Hide splash screen after React mounts ──────────────────────────
const splash = document.getElementById('splash')
if (splash) {
  splash.classList.add('hide')
  splash.addEventListener('transitionend', () => splash.remove(), { once: true })
}

