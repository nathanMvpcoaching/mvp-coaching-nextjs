import './globals.css'
import Particles from './components/Particles'
import SuggestionModal from './components/SuggestionModal'

export const metadata = {
  title: 'MVP.coaching — IA Coach Esport',
  description: "Analyse tes replays avec l'IA.",
  icons: { icon: '/android-chrome-192x192.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=0.85" />
      </head>
      <body style={{ overflowX: 'hidden' }}>
        <div className="grid-bg" />
        <div className="scanlines" />
        <Particles />
        {children}
        <SuggestionModal />
      </body>
    </html>
  )
}