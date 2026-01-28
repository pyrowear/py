import Link from "next/link";

export default function CTA() {
  return (
    <div className="card" style={{padding:22}}>
      <div className="badge"><span className="badgeDot" /> Réponse rapide • Devis clair • Livraison dans les délais</div>
      <div className="hr" />
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:14, flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:20, fontWeight:900, letterSpacing:"-.2px"}}>Parlons de votre projet</div>
          <div className="small" style={{marginTop:6}}>Vidéo institutionnelle, publicité, reportage, contenu digital… on s’occupe de tout.</div>
        </div>
        <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          <Link className="btn" href="/contact">Demander un devis</Link>
          <a className="btn secondary" href="mailto:contact@nafricatvprod.com?subject=Demande%20de%20devis%20-%20NAFRICA%20TV%20PROD">Email direct</a>
        </div>
      </div>
    </div>
  );
}
