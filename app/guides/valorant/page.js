'use client'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

export default function ValorantGuide() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '70px', position: 'relative', zIndex: 2 }}>

        {/* Hero */}
        <section style={{ padding: '80px 5% 60px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse at top, rgba(255,70,85,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Link href="/guides" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#3a5a6a', textDecoration: 'none', textTransform: 'uppercase' }}>← Guides</Link>
              <span style={{ color: '#2a4a5a' }}>/</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#ff4655', textTransform: 'uppercase' }}>Valorant</span>
            </div>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ff4655', display: 'block', marginBottom: '1rem' }}>// GUIDE COMPÉTITIF VALORANT</span>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.05, marginBottom: '1.2rem' }}>
              Comment sortir de Silver<br /><span style={{ color: '#ff4655' }}>et atteindre Diamond</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#5a8a9a', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2rem' }}>
              Guide complet rédigé à partir de l'analyse de milliers de replays. Chaque section cible une compétence précise avec des exercices concrets et mesurables.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['Silver → Gold', 'Gold → Platinum', 'Platinum → Diamond'].map((r, i) => (
                <span key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.1em', padding: '5px 14px', background: 'rgba(255,70,85,0.08)', border: '1px solid rgba(255,70,85,0.2)', color: '#ff4655', textTransform: 'uppercase' }}>{r}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '0 5% 100px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>

            {/* Section 1 */}
            <GuideSection number="01" title="Crosshair Placement — La base de tout" color="#ff4655">
              <p>Le crosshair placement est <strong style={{color:'#c8dde8'}}>l'erreur numéro 1</strong> des joueurs bloqués en Silver et Gold. 80% de tes morts évitables viennent d'un crosshair qui regarde le sol ou les murs plutôt que les angles ennemis.</p>
              <GuideRule title="La règle fondamentale">
                Ton crosshair doit toujours être <strong style={{color:'#c8dde8'}}>à hauteur de tête</strong> et <strong style={{color:'#c8dde8'}}>à l'angle que tu t'apprêtes à pré-viser</strong>. Pas besoin de réflexes surhumains — juste une anticipation constante.
              </GuideRule>
              <GuideList items={[
                "En marchant vers un angle, place ton crosshair sur l'endroit exact où une tête apparaîtrait",
                "Ne baisse jamais le crosshair en bougeant — garde-le à hauteur de tête en permanence",
                "Pré-vise chaque corner avant de l'approcher, même si tu penses que personne n'est là",
                "En Deathmatch, impose-toi la règle : chaque kill doit se faire sans ajustement vertical",
              ]} />
              <GuideTip>
                <strong>Exercice quotidien :</strong> 10 minutes de Deathmatch en te concentrant uniquement sur le crosshair placement. Ignore ton KDA — concentre-toi sur ne jamais baisser le crosshair. Fais ça pendant 7 jours et tu verras la différence.
              </GuideTip>
            </GuideSection>

            {/* Section 2 */}
            <GuideSection number="02" title="Économie — Jouer les bons rounds" color="#ffd700">
              <p>L'économie est la compétence la plus sous-estimée en dessous de Platinum. Des joueurs qui ont un bon aim perdent des rounds entiers parce qu'ils <strong style={{color:'#c8dde8'}}>force-buy au mauvais moment</strong> ou abandonnent des eco rounds qui pouvaient être gagnés.</p>
              <GuideRule title="Les règles d'économie de base">
                Après avoir perdu un pistol round, tu as 2 choix : full eco (save tout) ou eco partiel (acheter des pistolets améliorés). <strong style={{color:'#c8dde8'}}>Ne jamais semi-forcer</strong> avec 2400 crédits — tu finiras avec un fusil et ton équipe en Spectre.
              </GuideRule>
              <GuideList items={[
                "Full buy : Vandal/Phantom + armure lourde + utilitaires = minimum 3900 crédits",
                "Eco round : save tout, prends le couteau si nécessaire, objectif = survivre et récupérer une arme",
                "Force buy : uniquement si tu es à 1-4 ou 4-1 et que le round est critique",
                "Communique ton économie en début de round — 'j'ai 1800, je save' évite les malentendus",
                "Achète pour tes coéquipiers si tu es riche et qu'eux sont pauvres",
              ]} />
              <GuideTip>
                <strong>Erreur classique à éviter :</strong> Acheter un Vandal à 2900 sans armure. Tu mourras en un clip de pistolet et tu donneras ton Vandal à l'ennemi. Priorité : armure légère d'abord, puis arme avec le budget restant.
              </GuideTip>
            </GuideSection>

            {/* Section 3 */}
            <GuideSection number="03" title="Prise de décision — Quand peekar, quand hold" color="#00f5ff">
              <p>La majorité des morts en Silver viennent de <strong style={{color:'#c8dde8'}}>peeks inutiles sans information</strong>. Les joueurs s'ennuient, ils sortent d'un angle safe, et ils meurent. C'est la source numéro 1 de rounds perdus à ce niveau.</p>
              <GuideRule title="La règle du peek informé">
                Ne peek jamais un angle sans avoir au moins UNE information : son de pas, flash alliée, callout équipier, ou intel de la minimap. Un peek sans info est un suicide déguisé en agressivité.
              </GuideRule>
              <GuideList items={[
                "Avant de peekar : demande-toi 'qu'est-ce que je sais sur la position ennemie ?'",
                "Utilise le jiggle peek pour récupérer des infos sans t'exposer complètement",
                "Si tu prends des dégâts dans un duel, ne re-peek pas immédiatement — repositionne-toi",
                "En défense : hold ton angle et laisse l'attaque venir à toi, sauf si tu as une raison de sortir",
                "Utilise tes utilitaires pour créer de l'information avant de peekar (flash, drone, etc.)",
              ]} />
              <GuideTip>
                <strong>Le test du re-peek :</strong> Après chaque mort en replay, demande-toi : 'Est-ce que j'avais une information qui justifiait ce peek ?' Si la réponse est non, c'est une mort évitable. Note le pattern sur 10 parties — tu seras surpris du nombre de morts identiques.
              </GuideTip>
            </GuideSection>

            {/* Section 4 */}
            <GuideSection number="04" title="Positionnement — Dominer la map sans combattre" color="#00ff88">
              <p>Le positionnement te permet de <strong style={{color:'#c8dde8'}}>gagner des duels avant qu'ils commencent</strong>. Un angle off-angle que l'ennemi ne pré-vise pas vaut mille heures d'aim training.</p>
              <GuideList items={[
                "Joue des off-angles — évite les positions par défaut que tout le monde connaît",
                "Ne te positionne jamais à portée de flash ou de smoke si tu peux l'éviter",
                "En défense : joue plus loin des entrées pour avoir plus de temps de réaction",
                "Varie tes positions chaque round — si tu joues le même corner 3 fois, l'ennemi va l'anticiper",
                "Après un kill, bouge immédiatement — l'ennemi sait où tu étais",
                "Joue toujours avec une couverture derrière toi pour te repositionner si nécessaire",
              ]} />
              <GuideRule title="Le principe de l'angle unique">
                Tu ne dois jamais être exposé à plus d'un angle à la fois. Si deux ennemis peuvent te voir en même temps depuis deux positions différentes, tu vas mourir même avec le meilleur aim du monde.
              </GuideRule>
            </GuideSection>

            {/* Section 5 */}
            <GuideSection number="05" title="Communication — L'arme secrète du solo queue" color="#ffd700">
              <p>La communication en solo queue ne veut pas dire parler constamment. Ça veut dire transmettre les <strong style={{color:'#c8dde8'}}>informations critiques au bon moment</strong> pour que ton équipe puisse prendre de meilleures décisions.</p>
              <GuideList items={[
                "Callout immédiat après un contact : 'A long, 1 low', 'Mid window, 2 full'",
                "Signal tes ultimates disponibles en debut de round pour coordonner",
                "Confirme les kills de tes coéquipiers pour qu'ils sachent l'état de la map",
                "Dis 'save' ou 'force' clairement pour synchroniser l'économie de l'équipe",
                "Annonce tes rotations : 'Je roam mid' évite que ton équipe compte sur toi pour défendre A",
              ]} />
              <GuideTip>
                <strong>La règle d'or :</strong> Une information non partagée = un avantage perdu pour toute l'équipe. Si tu vois un ennemi flanker, dis-le immédiatement. Ne garde pas l'information pour toi en espérant faire un beau clutch.
              </GuideTip>
            </GuideSection>

            {/* Plan progression */}
            <div style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '2.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--cyan)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// PLAN D'ENTRAÎNEMENT — 4 SEMAINES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {[
                  { week: 'Semaine 1', focus: 'Crosshair Placement', tasks: ['10 min Deathmatch focus crosshair/jour', 'Regarder 1 replay en notant chaque mort évitable', 'Objectif : 0 mort avec crosshair qui vise le sol'] },
                  { week: 'Semaine 2', focus: 'Économie & Utilitaires', tasks: ['Mémoriser les prix de toutes les armes', 'Apprendre 2 lineups par map', 'Ne jamais semi-forcer — full buy ou full eco'] },
                  { week: 'Semaine 3', focus: 'Positionnement', tasks: ['Jouer 1 off-angle par round minimum', 'Ne jamais se re-positionner au même endroit', 'Analyser ses morts : combien viennent d\'une mauvaise position ?'] },
                  { week: 'Semaine 4', focus: 'Prise de décision', tasks: ['Avant chaque peek : vérifier l\'info disponible', 'Utiliser MVP.coaching pour analyser les replays', 'Identifier son erreur récurrente et créer un exercice ciblé'] },
                ].map((w, i) => (
                  <div key={i} style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.08)', padding: '1.4rem' }}>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(0,245,255,0.4)', marginBottom: '4px', textTransform: 'uppercase' }}>{w.week}</div>
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{w.focus}</div>
                    {w.tasks.map((t, j) => (
                      <div key={j} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: '#5a8a9a', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>▸</span>{t}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--dark3)', border: '1px solid rgba(0,245,255,0.2)', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--cyan)' }} />
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>Mets ce guide en pratique</div>
              <p style={{ fontSize: '0.92rem', color: '#5a8a9a', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>Upload ta replay Valorant — l'IA identifie exactement laquelle de ces 5 compétences te bloque le plus et crée un plan personnalisé.</p>
              <Link href="/dashboard" className="btn-primary">Analyser ma replay Valorant</Link>
              <div style={{ marginTop: '0.8rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#2a4a5a', letterSpacing: '0.1em' }}>Gratuit · Sans inscription · 2-3 minutes</div>
            </div>

          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">MVP<span>.</span>COACHING</div>
        <ul className="footer-links">
          {['Confidentialité', 'CGU', 'Contact', 'Discord'].map(l => <li key={l}><a href="#">{l}</a></li>)}
        </ul>
        <div className="footer-copy">© 2025 MVP.COACHING — ALL SYSTEMS ONLINE</div>
      </footer>
    </>
  )
}

function GuideSection({ number, title, color, children }) {
  return (
    <div style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '2.5rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.14em', color: `${color}80`, flexShrink: 0, paddingTop: '4px' }}>{number}</span>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.9rem', color: '#5a8a9a', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

function GuideRule({ title, children }) {
  return (
    <div style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.12)', borderLeft: '3px solid var(--cyan)', padding: '1.2rem 1.4rem' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>// RÈGLE</div>
      <div style={{ fontWeight: 600, color: '#c8dde8', marginBottom: '0.4rem', fontSize: '0.88rem' }}>{title}</div>
      <div style={{ fontSize: '0.86rem', color: '#5a8a9a', lineHeight: 1.65 }}>{children}</div>
    </div>
  )
}

function GuideList({ items }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '2px' }}>▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function GuideTip({ children }) {
  return (
    <div style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)', borderLeft: '3px solid var(--gold)', padding: '1.2rem 1.4rem' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--gold)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>// CONSEIL PRO</div>
      <div style={{ fontSize: '0.86rem', color: '#7a8a6a', lineHeight: 1.65 }}>{children}</div>
    </div>
  )
}
