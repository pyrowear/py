import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footGrid">
          <div>
            <div style={{fontWeight:900, letterSpacing:"-.2px"}}>NAFRICA TV PROD</div>
            <p className="small" style={{marginTop:8}}>
              Société de production audiovisuelle basée à Rabat, spécialisée en TV, media, communication et contenus digitaux.
            </p>
            <p className="small" style={{marginTop:10}}>
              © {year} NAFRICA TV PROD — Tous droits réservés.
            </p>
          </div>
          <div>
            <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
              <Link href="/services">Services</Link>
              <Link href="/a-propos">À propos</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <p className="small" style={{marginTop:10}}>
              Email : <a href="mailto:contact@nafricatvprod.com">contact@nafricatvprod.com</a><br/>
              WhatsApp : <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer">+212 6XX XX XX XX</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
