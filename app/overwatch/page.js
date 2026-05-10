'use client'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

export default function OverwatchGuide() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <section style={{ padding: '80px 5% 60px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Link href="/guides" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#3a5a6a', textDecoration: 'none', textTransform: 'uppercase' }}>← Guides</Link>
              <span style={{ color: '#2a4a5a' }}>/</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#fa9c1e', textTransform: 'uppercase' }}>Overwatch 2</span>
            </div>
            <span className="section-tag">// GUIDE COMPÉTITIF OVERWATCH 2</span>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.05, marginBottom: '1.2rem' }}>
              Comment sortir de Bronze<br /><span style={{ color: '#fa9c1e' }}>et atteindre Diamond</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#5a8a9a', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2rem' }}>Ultimate economy, positionnement selon ton rôle et lecture du teamfight. Le guide complet pour climb dans chaque rôle.</p>
          </div>
        </section>

        <section style={{ padding: '0 5% 100px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { num: '01', title: 'Ultimate Economy — La ressource la plus précieuse', color: '#fa9c1e', content: "Les ultimates gagnent des teamfights. Savoir quand les utiliser, comment les combo, et quand les conserver est la compétence qui sépare les joueurs Bronze des Platinum.\n\nRègle fondamentale : n'utilise jamais ton ultimate seul si tu peux attendre 10 secondes pour le combiner avec celui d'un coéquipier. Un Nano Boost + Blade vaut 3× plus qu'un Blade seul.\n\nUltimate tracking : essaie de mémoriser quels ultimates ennemis ont été utilisés récemment. Si le Rein adverse vient d'utiliser son Earth Shatter, c'est le moment idéal pour engager." },
              { num: '02', title: 'Positionnement par Rôle — La base de la survie', color: '#00f5ff', content: "Tank : tu es le bouclier de ton équipe. Avance en prenant espace, mais ne laisse jamais ton équipe derrière toi. Ton positionnement dicte celui de toute ton équipe.\n\nDPS : joue derrière ta tank line. Utilise les flanks stratégiquement, pas impulsivement. Ne meurt pas pour un kill si ça laisse ton équipe en 4v5.\n\nSupport : reste derrière ta tank, soigne en priorité, mais ne te laisse pas harasser par des DPS ennemis qui te flanquent. Si tu es mort, ton équipe n'a pas de soins." },
              { num: '03', title: 'Lecture du Teamfight — Quand engager, quand se retirer', color: '#00ff88', content: "Le moment d'engagement est crucial en OW2. Engager trop tôt contre des ultimates = wipe. Attendre trop longtemps = perdre l'objectif.\n\nRègle : engager quand tu as l'avantage en ultimates OU quand l'ennemi vient de les utiliser. Ne jamais engager à la même santé qu'avant.\n\nDésengager sans honte : si le fight est perdu, retreat et regroup. Mourir pour essayer de sauver un fight perdu ne fait que donner de l'ult charge aux ennemis." },
              { num: '04', title: 'Communication & Appels — Coordonner sans voix', color: '#fa9c1e', content: "En solo queue, la communication voice est souvent difficile. Utilise les pings et le chat groupe de manière efficace.\n\nAnnoncer tes ultimates : un simple 'j'ai nano' dans le chat voice change la dynamique de l'équipe. Les DPS vont naturellement jouer plus agressivement.\n\nPing les ultimates ennemis dangereux : 'Rein a Earthshatter' dans le chat prévient toute l'équipe de rester groupée et de ne pas sauter." },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '2.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: `${s.color}80`, flexShrink: 0, paddingTop: '4px' }}>{s.num}</span>
                  <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 700, color: '#fff' }}>{s.title}</h2>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#5a8a9a', lineHeight: 1.75 }}>
                  {s.content.split('\n\n').map((p, j) => <p key={j} style={{ marginBottom: '1rem' }}>{p}</p>)}
                </div>
              </div>
            ))}

            <div style={{ background: 'var(--dark3)', border: '1px solid rgba(0,245,255,0.2)', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--cyan)' }} />
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>Analyse ta replay OW2</div>
              <p style={{ fontSize: '0.92rem', color: '#5a8a9a', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>L'IA analyse ton positionnement, tes ultimates et tes décisions de teamfight pour créer ton plan personnalisé.</p>
              <Link href="/dashboard" className="btn-primary">Analyser ma replay OW2</Link>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-logo">MVP<span>.</span>COACHING</div>
        <ul className="footer-links">{['Confidentialité','CGU','Contact','Discord'].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
        <div className="footer-copy">© 2025 MVP.COACHING — ALL SYSTEMS ONLINE</div>
      </footer>
    </>
  )
}
