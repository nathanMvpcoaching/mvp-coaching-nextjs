'use client'
import './globals.css'
import { useEffect } from 'react'

export default function RootLayout({ children }) {
  useEffect(() => {
    const canvas = document.getElementById('particles')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const particles = Array.from({length: 60}, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.4 + 0.05
    }))
    function draw() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,245,255,${p.alpha})`; ctx.fill()
        particles.forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx*dx + dy*dy)
          if (d < 120) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(0,245,255,${0.05*(1-d/120)})`; ctx.lineWidth = 0.5; ctx.stroke() }
        })
      })
      requestAnimationFrame(draw)
    }
    draw()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <html lang="fr">
      <body>
        <div className="grid-bg" />
        <div className="scanlines" />
        <canvas id="particles" style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}} />
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'MVP.coaching — IA Coach Esport',
  description: "Analyse tes replays avec l'IA.",
}