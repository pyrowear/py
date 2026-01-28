import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Production audiovisuelle, media & communication au Maroc",
  description:
    "Société de production audiovisuelle à Rabat : films institutionnels, publicité, documentaire, captation événementielle, TV, post‑production et communication.",
};

const services = [
  { icon: "🎬", title: "Production audiovisuelle", desc: "Films institutionnels, publicité, documentaire, captation et contenus corporate." },
  { icon: "📺", title: "Media & TV", desc: "Reportages, programmes, web TV, interviews et contenus multi‑plateformes." },
  { icon: "📢", title: "Communication", desc: "Stratégie, branding, vidéo corporate et communication institutionnelle." },
  { icon: "💻", title: "Post‑production & digital", desc: "Montage, motion design, 3D et contenus digitaux." },
  { icon: "🎓", title: "Formation", desc: "Formations pratiques : tournage, montage, production et communication digitale." },
  { icon: "📦", title: "Matériel", desc: "Location & vente : caméra, son, lumière, accessoires et solutions studio." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="heroGrid">
            <div>
              <div className="kicker">Rabat • Maroc</div>
              <h1 className="h1">Production audiovisuelle, media & communication professionnelle</h1>
              <p className="lead">
                NAFRICA TV PROD accompagne entreprises et institutions dans la création de contenus TV, vidéo et digitaux à fort impact.
              </p>
              <div className="heroActions">
                <a className="btn" href="/contact">Demander un devis</a>
                <a className="btn secondary" href="/services">Voir les services</a>
              </div>

              <div style={{marginTop:18, display:"flex", gap:10, flexWrap:"wrap"}}>
                <span className="badge"><span className="badgeDot" /> Qualité studio</span>
                <span className="badge"><span className="badgeDot" /> Délais maîtrisés</span>
                <span className="badge"><span className="badgeDot" /> Accompagnement complet</span>
              </div>
            </div>

            <div className="card heroCard">
              <div className="badge"><span className="badgeDot" /> Ce que nous livrons</div>
              <div className="hr" />
              <div className="miniGrid">
                <div className="mini">
                  <h3>Vidéo institutionnelle</h3>
                  <p>Message clair, image premium, format adapté.</p>
                </div>
                <div className="mini">
                  <h3>Publicité & campagne</h3>
                  <p>Création, tournage, montage, versions réseaux.</p>
                </div>
                <div className="mini">
                  <h3>Reportage / TV</h3>
                  <p>Captation, interviews, habillage graphique.</p>
                </div>
                <div className="mini">
                  <h3>Post‑production</h3>
                  <p>Montage, motion, 3D, sous‑titres.</p>
                </div>
              </div>
              <div className="hr" />
              <p className="small">
                Besoin d’un devis rapide ? Envoyez votre brief et recevez une proposition claire.
              </p>
              <div style={{marginTop:12, display:"flex", gap:10, flexWrap:"wrap"}}>
                <a className="btn" href="/contact">Nous contacter</a>
                <a className="btn secondary" href="mailto:contact@nafricatvprod.com?subject=Brief%20projet%20-%20NAFRICA%20TV%20PROD">Envoyer un brief</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Nos services</h2>
          <p>Une offre complète : production, media, communication et digital.</p>

          <div className="grid3">
            {services.map((s) => (
              <div key={s.title} className="card service">
                <div className="icon" aria-hidden>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Pourquoi choisir NAFRICA TV PROD ?</h2>
          <div className="split">
            <div className="card" style={{padding:18}}>
              <h3 style={{margin:"0 0 8px"}}>Approche orientée résultats</h3>
              <p className="small">
                On construit votre message pour qu’il soit compréhensible, mémorable et adapté à votre audience (institutionnelle, corporate ou grand public).
              </p>
              <ul className="list">
                <li>Brief & scénario (script) clairs</li>
                <li>Tournage & réalisation pro</li>
                <li>Montage rapide + versions réseaux</li>
                <li>Habillage graphique & sous‑titres</li>
              </ul>
            </div>
            <div className="card" style={{padding:18}}>
              <h3 style={{margin:"0 0 8px"}}>Qualité + délais maîtrisés</h3>
              <p className="small">
                Un process simple : on valide les étapes, on livre dans les délais, et on vous donne une qualité premium.
              </p>
              <ul className="list">
                <li>Planning et jalons validés</li>
                <li>Validation par étapes</li>
                <li>Transparence sur le budget</li>
                <li>Support après livraison</li>
              </ul>
            </div>
          </div>

          <div style={{marginTop:18}}>
            <CTA />
          </div>
        </div>
      </section>
    </>
  );
}
