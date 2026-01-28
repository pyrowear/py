import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "NAFRICA TV PROD est une société basée à Rabat spécialisée en production audiovisuelle, media, communication et TV. Notre mission : créer des contenus à fort impact.",
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1" style={{fontSize:34}}>À propos de NAFRICA TV PROD</h1>
        <p className="lead">
          Basée à Rabat, NAFRICA TV PROD accompagne les entreprises et institutions dans la création de contenus audiovisuels modernes et professionnels.
        </p>

        <div className="split" style={{marginTop:18}}>
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>Notre mission</h2>
            <p className="small">
              Produire des contenus vidéo et media de qualité qui renforcent l’image et l’impact des messages de nos clients.
            </p>
            <div className="hr" />
            <h2 style={{margin:"0 0 10px"}}>Notre vision</h2>
            <p className="small">
              Devenir un acteur de référence en production audiovisuelle et communication au Maroc, avec une ouverture sur l’Afrique.
            </p>
          </div>

          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>Nos valeurs</h2>
            <ul className="list">
              <li>Qualité & exigence</li>
              <li>Créativité</li>
              <li>Transparence</li>
              <li>Engagement</li>
              <li>Innovation</li>
            </ul>
            <p className="small" style={{marginTop:12}}>
              Notre approche est simple : comprendre votre objectif, construire le bon message, produire proprement et livrer efficacement.
            </p>
          </div>
        </div>

        <div style={{marginTop:18}}>
          <CTA />
        </div>
      </div>
    </section>
  );
}
