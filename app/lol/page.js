'use client'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

export default function LolGuide() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>
        <section style={{ padding: '80px 5% 60px', position: 'relative' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Link href="/guides" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#3a5a6a', textDecoration: 'none', textTransform: 'uppercase' }}>← Guides</Link>
              <span style={{ color: '#2a4a5a' }}>/</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#c89b3c', textTransform: 'uppercase' }}>League of Legends</span>
            </div>
            <span className="section-tag">// GUIDE COMPÉTITIF LOL</span>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.05, marginBottom: '1.2rem' }}>
              Comment sortir de Bronze<br /><span style={{ color: '#c89b3c' }}>et atteindre Platine</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#5a8a9a', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2rem' }}>Le guide complet pour maîtriser la macro, le wave management et la vision. Les fondamentaux qui font la différence en solo queue.</p>
          </div>
        </section>

        <section style={{ padding: '0 5% 100px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>

            {[
              {
                num: '01', title: 'Wave Management — La compétence la plus ignorée', color: '#c89b3c',
                content: [
                  { type: 'p', text: "Le wave management est la compétence qui sépare les joueurs Gold des joueurs Platine et Diamond. Savoir freeze, slow push et crash correctement te donne des avantages économiques et de map qui composent sur toute la partie." },
                  { type: 'rule', title: 'Les 3 états d\'une wave', text: "Freeze (2-3 minions devant toi), Slow Push (accumulation progressive), Fast Push (clear rapide pour roam ou back). Chaque état a un objectif précis — utilise le mauvais et tu perds de l'or ou des opportunités de roam." },
                  { type: 'list', items: ['Freeze quand tu veux priver l\'ennemi de farm sans le tuer', 'Slow push avant de roam — ta wave arrivera sur tower pendant ton absence', 'Fast push avant de reculer au base pour éviter de perdre des minions', 'Ne jamais laisser une wave freeze contre ta tower sans raison'] },
                  { type: 'tip', text: "Avant chaque back : vérifie où est ta wave. Si elle est au milieu de la map, attends qu\'elle soit poussée ou freeze-la. Un back au mauvais moment = 20-30 minions perdus = 400-600 or offert à l'ennemi." },
                ]
              },
              {
                num: '02', title: 'Vision Control — Gagner sans combattre', color: '#00f5ff',
                content: [
                  { type: 'p', text: "En dessous de Gold, les wards sont ignorées. En Diamond+, la vision est une obsession. La différence ? Les joueurs Diamond meurent rarement de ganks surprises parce qu'ils contrôlent l'information." },
                  { type: 'rule', title: 'La règle des 3 wards', text: "Tu dois toujours avoir 3 wards actives sur la map : une sur ta jungle, une en river, une vers l'objectif prochain. Si tu n'as pas de wards, tu joues à l'aveugle dans un jeu d'information." },
                  { type: 'list', items: ['Achète une pink ward à chaque back — c\'est 75 or pour potentiellement sauver ta vie', 'Ward offensif quand tu domines, défensif quand tu es derrière', 'Déni de vision = déni d\'information pour l\'ennemi', 'Utilise ton trinket toutes les 90 secondes — c\'est gratuit'] },
                ]
              },
              {
                num: '03', title: 'Macro Game — Convertir les avantages en victoire', color: '#00ff88',
                content: [
                  { type: 'p', text: "Tu peux avoir le meilleur KDA de la partie et perdre quand même. La macro game, c'est l'art de convertir tes avantages en objectifs : tour, dragon, Baron, victoire." },
                  { type: 'list', items: ['Après un kill : push la wave, prends la tour, prends le dragon/Baron si disponible', 'Ne jamais aller base avec peu de vie quand un objectif spawn dans 30 secondes', 'Grouper pour les objectifs majeurs — ne jamais essayer de solo Baron', 'Ping constamment ta présence sur la map pour coordonner ton équipe', 'Quand tu es ahead : joue safe et convertis en objectifs, ne cherche pas les kills'] },
                  { type: 'tip', text: "La règle d'or : chaque kill vaut environ 300 or. Une tour vaut 150-350 or pour toute l'équipe. Drague âme vaut une victoire probable. Apprends à prioriser les objectifs sur les kills." },
                ]
              },
              {
                num: '04', title: 'Champion Pool — La discipline des 2-3 champions', color: '#c89b3c',
                content: [
                  { type: 'p', text: "Jouer 15 champions différents est la meilleure façon de stagger en Silver. Maîtriser 2-3 champions te permet de te concentrer sur les fondamentaux plutôt que sur les mécaniques." },
                  { type: 'rule', title: 'La structure idéale', text: "1 champion carry (ton main, tu joues sans réfléchir), 1 champion safe (fort en toutes situations), 1 contre-pick (pour les matchups difficiles). Pas plus." },
                  { type: 'list', items: ['Joue ton main jusqu\'à 50+ games avant d\'en apprendre un nouveau', 'Choisis des champions avec un kit simple — les mécaniques complexes se maîtrisent en Diamond, pas en Silver', 'Priorise les champions qui sont forts en solo queue (mobilité, 1v9 potential)', 'Évite les champions trop team-dépendants en solo queue (Sona, Zilean, etc.)'] },
                ]
              },
            ].map((section, i) => (
              <div key={i} style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '2.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${section.color}, transparent)` }} />
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.14em', color: `${section.color}80`, flexShrink: 0, paddingTop: '4px' }}>{section.num}</span>
                  <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 700, color: '#fff' }}>{section.title}</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.9rem', color: '#5a8a9a', lineHeight: 1.7 }}>
                  {section.content.map((block, j) => {
                    if (block.type === 'p') return <p key={j}>{block.text}</p>
                    if (block.type === 'rule') return (
                      <div key={j} style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.12)', borderLeft: '3px solid var(--cyan)', padding: '1.2rem 1.4rem' }}>
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>// RÈGLE</div>
                        <div style={{ fontWeight: 600, color: '#c8dde8', marginBottom: '0.4rem', fontSize: '0.88rem' }}>{block.title}</div>
                        <div style={{ fontSize: '0.86rem' }}>{block.text}</div>
                      </div>
                    )
                    if (block.type === 'list') return (
                      <ul key={j} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {block.items.map((item, k) => (
                          <li key={k} style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>▸</span><span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                    if (block.type === 'tip') return (
                      <div key={j} style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)', borderLeft: '3px solid var(--gold)', padding: '1.2rem 1.4rem' }}>
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--gold)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>// CONSEIL PRO</div>
                        <div style={{ fontSize: '0.86rem', color: '#7a8a6a' }}>{block.text}</div>
                      </div>
                    )
                    return null
                  })}
                </div>
              </div>
            ))}

            <div style={{ background: 'var(--dark3)', border: '1px solid rgba(0,245,255,0.2)', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--cyan)' }} />
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>Identifie ta vraie faiblesse</div>
              <p style={{ fontSize: '0.92rem', color: '#5a8a9a', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>Upload ta replay LoL — l'IA analyse ta macro, ton wave management et ta vision pour te dire exactement ce qui te bloque.</p>
              <Link href="/dashboard" className="btn-primary">Analyser ma replay LoL</Link>
              <div style={{ marginTop: '0.8rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#2a4a5a', letterSpacing: '0.1em' }}>Gratuit · Sans inscription · 2-3 minutes</div>
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
