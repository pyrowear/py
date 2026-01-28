import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez NAFRICA TV PROD (Rabat) pour une demande de devis : production audiovisuelle, TV, communication, post‑production et digital.",
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1" style={{fontSize:34}}>Contact</h1>
        <p className="lead">
          Parlez‑nous de votre besoin (type de vidéo, durée, lieu, délai). Nous répondons rapidement avec une proposition claire.
        </p>

        <div className="split" style={{marginTop:18}}>
          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>Coordonnées</h2>
            <p className="small">
              <strong>NAFRICA TV PROD</strong><br/>
              Rabat, Maroc<br/><br/>
              Email : <a href="mailto:contact@nafricatvprod.com">contact@nafricatvprod.com</a><br/>
              WhatsApp : <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer">+212 6XX XX XX XX</a>
            </p>
            <div className="hr" />
            <p className="small">
              Astuce : vous pouvez envoyer directement votre brief par email pour gagner du temps.
            </p>
            <a className="btn" style={{marginTop:12}} href="mailto:contact@nafricatvprod.com?subject=Demande%20de%20devis%20-%20NAFRICA%20TV%20PROD&body=Bonjour%2C%0A%0AJe%20souhaite%20un%20devis%20pour%20%3A%0A-%20Type%20de%20projet%20%3A%20%0A-%20Dur%C3%A9e%20souhait%C3%A9e%20%3A%20%0A-%20Lieu%20%3A%20%0A-%20Date%2Fd%C3%A9lai%20%3A%20%0A-%20Budget%20estim%C3%A9%20%3A%20%0A%0AMerci%20!">Envoyer une demande par email</a>
          </div>

          <div className="card" style={{padding:18}}>
            <h2 style={{margin:"0 0 10px"}}>Formulaire (email automatique)</h2>
            <p className="small">
              Ce formulaire ouvre votre email avec le message pré‑rempli (simple et fiable sur un site vitrine).
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const nom = encodeURIComponent(String(fd.get("nom") || ""));
                const email = encodeURIComponent(String(fd.get("email") || ""));
                const tel = encodeURIComponent(String(fd.get("tel") || ""));
                const message = encodeURIComponent(String(fd.get("message") || ""));
                const subject = encodeURIComponent("Demande via site – NAFRICA TV PROD");
                const body = encodeURIComponent(
                  `Nom: ${decodeURIComponent(nom)}\nEmail: ${decodeURIComponent(email)}\nTéléphone: ${decodeURIComponent(tel)}\n\nMessage:\n${decodeURIComponent(message)}`
                );
                window.location.href = `mailto:contact@nafricatvprod.com?subject=${subject}&body=${body}`;
              }}
            >
              <div className="formRow">
                <div>
                  <label>Nom</label>
                  <input className="input" name="nom" placeholder="Votre nom" required />
                </div>
                <div>
                  <label>Email</label>
                  <input className="input" type="email" name="email" placeholder="ex: contact@entreprise.com" required />
                </div>
              </div>

              <div className="formRow">
                <div>
                  <label>Téléphone</label>
                  <input className="input" name="tel" placeholder="+212 ..." />
                </div>
                <div>
                  <label>Objet</label>
                  <input className="input" name="objet" placeholder="Film institutionnel, publicité, reportage..." />
                </div>
              </div>

              <div>
                <label>Votre message</label>
                <textarea name="message" placeholder="Décrivez votre projet : durée, lieu, délai, budget..." required />
              </div>

              <button className="btn" type="submit" style={{marginTop:12}}>Envoyer</button>
              <div className="notice">* Le bouton ouvre votre application email avec le message pré‑rempli.</div>
            </form>
          </div>
        </div>

        <div style={{marginTop:18}}>
          <CTA />
        </div>
      </div>
    </section>
  );
}
