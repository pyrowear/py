import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Réalisations et projets NAFRICA TV PROD : productions audiovisuelles, contenus TV, communication et digital.",
};

const items = [
  { title: "Film institutionnel", tag: "Institution • Corporate" },
  { title: "Spot publicitaire", tag: "Publicité • Réseaux sociaux" },
  { title: "Reportage / Interview", tag: "Media • TV" },
  { title: "Aftermovie événement", tag: "Événementiel" },
  { title: "Motion design", tag: "Post‑production" },
  { title: "Contenu digital", tag: "Web • Social" },
];

export default function PortfolioPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1" style={{fontSize:34}}>Portfolio</h1>
        <p className="lead">
          Cette page peut être remplie rapidement avec vos prochaines réalisations. Pour l’instant, voici une structure pro prête à publier.
        </p>

        <div className="grid3" style={{marginTop:18}}>
          {items.map((it) => (
            <div key={it.title} className="card" style={{padding:18}}>
              <div className="badge"><span className="badgeDot" /> {it.tag}</div>
              <h3 style={{margin:"12px 0 6px"}}>{it.title}</h3>
              <p className="small">Ajoutez ici : photo/miniature + description + client + année + lien vidéo.</p>
            </div>
          ))}
        </div>

        <div style={{marginTop:18}}>
          <CTA />
        </div>
      </div>
    </section>
  );
}
