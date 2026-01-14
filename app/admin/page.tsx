'use client';
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Order = { id: string; createdAt: string; name: string; phone: string; city: string; address: string; size: string; price: number };

export default function Admin(){
  const pin = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";
  const [ok, setOk] = useState(false);
  const [ask, setAsk] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!ok) return;
    try {
      const raw = localStorage.getItem("pyro_orders") || "[]";
      setOrders(JSON.parse(raw));
    } catch {
      setOrders([]);
    }
  }, [ok]);

  const csv = useMemo(() => {
    const header = ["createdAt","name","phone","city","address","size","price"].join(",");
    const rows = orders.map(o => [
      o.createdAt, o.name, o.phone, o.city, o.address.replaceAll(",", " "), o.size, String(o.price)
    ].map(v => `"${String(v).replaceAll('"','""')}"`).join(","));
    return [header, ...rows].join("\n");
  }, [orders]);

  const download = () => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pyro-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clear = () => {
    if (!confirm("Supprimer toutes les commandes locales ?")) return;
    localStorage.setItem("pyro_orders", "[]");
    setOrders([]);
  };

  if (!ok) {
    return (
      <div style={{minHeight:'100vh', display:'grid', placeItems:'center'}}>
        <div className="container">
          <div className="card" style={{padding:24, maxWidth:520, margin:'0 auto'}}>
            <Image src="/pyro-logo-header.png" alt="PYRO WEAR" width={160} height={60} style={{height:44, width:'auto'}} />
            <h1 className="h2" style={{marginTop:14}}>Dashboard commandes</h1>
<p style={{marginTop:8}}><a href="/admin/media" style={{padding:"10px 12px",borderRadius:10,background:"#2E3A54",color:"#fff",textDecoration:"none",fontWeight:800}}>Media Manager</a></p>
            <p className="muted" style={{marginTop:6}}>Entre le PIN admin pour voir les commandes.</p>
            <input className="input" placeholder="PIN" value={ask} onChange={(e)=>setAsk(e.target.value)} style={{marginTop:12}} />
            <button className="btn" style={{marginTop:12}} onClick={()=> setOk(ask === pin)}>Accéder</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop:24, paddingBottom:80}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <Image src="/pyro-logo-header.png" alt="PYRO WEAR" width={160} height={60} style={{height:44, width:'auto'}} />
          <span className="badge">Total: {orders.length}</span>
        </div>
        <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
          <button className="btn-outline" style={{borderRadius:999, padding:'10px 14px', fontWeight:900}} onClick={()=>navigator.clipboard.writeText(csv)}>Copier CSV</button>
          <button className="btn" style={{padding:'10px 14px'}} onClick={download}>Télécharger CSV</button>
          <button className="btn-outline" style={{borderRadius:999, padding:'10px 14px', fontWeight:900}} onClick={clear}>Vider</button>
        </div>
      </div>

      <div className="card" style={{padding:16, marginTop:14, overflowX:'auto'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
          <thead>
            <tr style={{textAlign:'left'}}>
              {["Date","Nom","Tel","Ville","Adresse","Taille","Prix"].map(h => (
                <th key={h} style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.08)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.06)'}}>{new Date(o.createdAt).toLocaleString()}</td>
                <td style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.06)'}}>{o.name}</td>
                <td style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.06)'}}>{o.phone}</td>
                <td style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.06)'}}>{o.city}</td>
                <td style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.06)'}}>{o.address}</td>
                <td style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.06)'}}>{o.size}</td>
                <td style={{padding:'10px 8px', borderBottom:'1px solid rgba(11,12,14,.06)'}}>{o.price} DH</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={7} className="muted" style={{padding:'14px 8px'}}>Aucune commande enregistrée sur cet appareil.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="muted" style={{fontSize:12, marginTop:10}}>
        Note: ce dashboard est local (sur cet appareil). Pour centraliser les commandes, on peut le brancher sur Google Sheets.
      </p>
    </div>
  )
}
