import './globals.css'

export const metadata = {
  title: 'MVP.coaching — IA Coach Esport',
  description: 'Analyse tes replays avec l\'IA.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className="grid-bg" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  )
}