import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Services NAFRICA TV PROD : production audiovisuelle, media & TV, communication, post‑production, formation audiovisuelle, location et vente de matériel.",
};

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1" style={{fontSize:34}}>Nos services</h1>
        <p className="lead">
          Une offre complète pour produire, diffuser et valoriser votre image : TV, vidéo, communication et digital.
        </p>

        <div className="split">
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>🎬 Production audiovisuelle</h2>
            <ul className="list">
              <li>Films institutionnels & corporate</li>
              <li>Publicités (TV & réseaux sociaux)</li>
              <li>Documentaires</li>
              <li>Captation événementielle</li>
              <li>Fiction / téléfilms (selon besoin)</li>
            </ul>
          </div>
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>📺 Media & TV</h2>
            <ul className="list">
              <li>Reportages & interviews</li>
              <li>Programmes / formats TV</li>
              <li>Web TV & contenus digitaux</li>
              <li>Habillage & packaging</li>
              <li>Livraison multi‑formats</li>
            </ul>
          </div>
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>📢 Communication</h2>
            <ul className="list">
              <li>Communication institutionnelle</li>
              <li>Branding & identité visuelle</li>
              <li>Vidéos de présentation</li>
              <li>Campagnes audiovisuelles</li>
              <li>Conseil & stratégie</li>
            </ul>
          </div>
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>💻 Post‑production & digital</h2>
            <ul className="list">
              <li>Montage vidéo professionnel</li>
              <li>Motion design</li>
              <li>Infographie & 3D</li>
              <li>Sous‑titres, versions multi‑langues</li>
              <li>Création de sites web (vitrine)</li>
            </ul>
          </div>
        </div>

        <div style={{marginTop:18}} className="split">
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>🎓 Formation audiovisuelle</h2>
            <p className="small">
              Formations pratiques adaptées aux débutants et aux équipes internes.
            </p>
            <ul className="list">
              <li>Techniques de tournage</li>
              <li>Montage & post‑production</li>
              <li>Production & organisation de projet</li>
              <li>Communication digitale</li>
            </ul>
          </div>
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>📦 Location & vente de matériel</h2>
            <p className="small">
              Solutions matériel selon vos besoins (caméra, son, lumière).
            </p>
            <ul className="list">
              <li>Caméras & accessoires</li>
              <li>Éclairage</li>
              <li>Sonorisation</li>
              <li>Solutions studio</li>
            </ul>
          </div>
        </div>

        <div style={{marginTop:18}}>
          <CTA />
        </div>
      </div>
    </section>
  );
}
