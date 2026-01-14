'use client';
import Link from "next/link";
import Image from "next/image";

export default function Merci(){
  return (
    <div style={{minHeight:'100vh', display:'grid', placeItems:'center'}}>
      <div className="container">
        <div className="card" style={{padding:24, textAlign:'center'}}>
          <Image src="/pyro-logo-header.png" alt="PYRO WEAR" width={160} height={60} style={{height:44, width:'auto', margin:'0 auto'}} />
          <h1 className="h1" style={{marginTop:14}}>Merci !</h1>
          <p className="muted" style={{marginTop:8}}>
            On a bien reçu ta commande. On te contacte rapidement sur WhatsApp pour confirmer.
          </p>
          <div style={{display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginTop:16}}>
            <Link className="btn" href="/" style={{textDecoration:'none'}}>Retour à la page</Link>
            <Link className="btn-outline" href="/admin" style={{textDecoration:'none', borderRadius:999, padding:'12px 18px', fontWeight:900}}>Dashboard</Link>
          </div>
          <p className="muted" style={{fontSize:12, marginTop:14}}>
            PYRO WEAR • Livraison partout au Maroc • COD
          </p>
        </div>
      </div>
    </div>
  )
}
