'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type MediaState = { images: string[]; sizeGuideUrl: string };
const DEFAULT_MEDIA: MediaState = { images: ["/product/front.jpg","/product/model.jpg","/product/side.jpg","/product/back.jpg"], sizeGuideUrl: "/size-guide.png" };
function readMedia(): MediaState {
  if (typeof window === "undefined") return DEFAULT_MEDIA;
  try {
    const raw = localStorage.getItem("pyro_media_v1");
    if (!raw) return DEFAULT_MEDIA;
    const parsed = JSON.parse(raw);
    return {
      images: Array.isArray(parsed?.images) && parsed.images.length ? parsed.images : DEFAULT_MEDIA.images,
      sizeGuideUrl: typeof parsed?.sizeGuideUrl === "string" && parsed.sizeGuideUrl ? parsed.sizeGuideUrl : DEFAULT_MEDIA.sizeGuideUrl,
    };
  } catch { return DEFAULT_MEDIA; }

function isCloudinary(url: string) {
  return /res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url);
}
function transformCloudinary(url: string, kind: "main" | "thumb" | "size") {
  if (!isCloudinary(url)) return url;
  const parts = url.split("/upload/");
  if (parts.length < 2) return url;
  const t =
    kind === "thumb"
      ? "f_auto,q_auto,c_fill,g_auto,w_220,h_220"
      : kind === "size"
      ? "f_auto,q_auto,c_fit,w_1200"
      : "f_auto,q_auto,c_fill,g_auto,w_1400,h_1400";
  if (parts[1].startsWith("f_auto") || parts[1].startsWith("q_auto") || parts[1].startsWith("c_")) return url;
  return `${parts[0]}/upload/${t}/${parts[1]}`;
}

}


const PRICE = 449;
const OLD_PRICE = 700;

const t = {
  topTitle: "منتج حصري",
  menu: { home: "Home", contact: "Contact us", collections: "Collections" },
  title: "Veste Puffer Noir — PYRO WEAR",
  rating: "(Ratings) 0",
  color: "Couleur",
  size: "Taille",
  qty: "Quantity",
  formTitle: "للطلب يرجى ملء هذا النموذج سنتصل بكم في أقرب وقت ممكن",
  name: "الاسم",
  phone: "رقم الهاتف",
  city: "المدينة",
  address: "العنوان بالتفصيل",
  buyNow: "اشترِ الآن",
};

type Size = "S" | "M" | "L" | "XL";
const SIZES: Size[] = ["S", "M", "L", "XL"];

const CITIES = [
  'Casablanca','Rabat','Salé','Tanger','Marrakech','Fès','Agadir','Meknès','Oujda','Tétouan','Kénitra','Mohammedia','El Jadida','Béni Mellal','Nador','Safi','Khouribga','Larache','Settat','Ksar El Kebir','Taza','Errachidia','Ouarzazate','Dakhla','Laâyoune'
];

function isMoroccoPhone(v: string){
  const s = v.replace(/\s+/g,'');
  return /^(\+?212|0)([5-7])\d{8}$/.test(s);
}


export default function Page() {
  useEffect(() => {
    const m = readMedia();
    setMedia(m);
    setActiveImg(m.images[0] || "/product/front.jpg");
    setSizeGuideUrl(m.sizeGuideUrl || "/size-guide.png");
  }, []);

  const [media, setMedia] = useState<MediaState>(DEFAULT_MEDIA);
  const [activeImg, setActiveImg] = useState("/product/front.jpg");
  const [sizeGuideUrl, setSizeGuideUrl] = useState("/size-guide.png");

  const [size, setSize] = useState<Size>("M");
  const [qty, setQty] = useState(1);

  const [stock, setStock] = useState<number>(() => 24);
  useEffect(() => {
    const d = new Date();
    const seed = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
    const base = 19 + (seed % 15);
    setStock(base);
    const id = setInterval(() => setStock(s => (s>7 && Math.random()<0.32) ? s-1 : s), 9000);
    return () => clearInterval(id);
  }, []);

  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212669727973";

  const waMsg = useMemo(() => {
    const lines = [
      "🔥 PYRO WEAR — طلب جديد",
      `المنتج: Veste Puffer Noir`,
      `الثمن: ${PRICE} DH`,
      `الكمية: ${qty}`,
      `المقاس: ${size}`,
      `الاسم: ${name}`,
      `الهاتف: ${phone}`,
      `المدينة: ${city}`,
      `العنوان: ${address}`,
      `الدفع: عند الاستلام (COD)`,
    ];
    return lines.join("\n");
  }, [name, phone, city, address, size, qty]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !city || !address) { alert('عَمّر جميع الخانات'); return; }
    if (!isMoroccoPhone(phone)) { alert('رقم الهاتف غير صحيح. مثال: 06xxxxxxxx أو +2126xxxxxxxx'); return; }

    // Save locally for /admin dashboard
    try{
      const key = "pyro_orders";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const order = {
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        name, phone, city, address,
        size,
        price: PRICE,
      };
      localStorage.setItem(key, JSON.stringify([order, ...existing]));
    }catch{}

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;
    try{ (window as any).fbq && (window as any).fbq('track', 'Lead'); }catch{}
    window.open(url, "_blank", "noopener,noreferrer");
    window.location.href = "/merci";
  };

  return (
    <div dir="rtl">
      <div className="topbar">{t.topTitle}</div>

      <div className="nav">
        <div className="container nav-inner">
          <div style={{ display: "flex", gap: 8 }}>
            <button className="iconbtn" aria-label="search">🔍</button>
            <button className="iconbtn" aria-label="cart">🛒</button>
          </div>

          <div className="nav-links">
            <a href="#">{t.menu.collections}</a>
            <a href="#">{t.menu.contact}</a>
            <a href="#">{t.menu.home}</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/pyro-logo-header.png" alt="PYRO WEAR" width={160} height={60} style={{ height: 44, width: "auto" }} priority />
          </div>
        </div>
      </div>

      <main className="container">
        <div className="pdp">
          <div>
            <h1 className="h1" style={{ marginTop: 6 }}>{t.title}</h1>

            <div className="price-row" style={{ marginTop: 10 }}>
              <span className="badge-sale">خصم محدود</span>
              <span className="price">{PRICE} د.م</span>
              <span className="strike">{OLD_PRICE} د.م</span>
            </div>

            <div className="muted" style={{ marginTop: 10, fontWeight: 700 }}>{t.rating} ★★★★★</div>

            <div style={{display:"flex", gap:10, flexWrap:"wrap", marginTop:12}}>
              <span className="badge-sale" style={{background:"#10B981"}}>الدفع عند الاستلام</span>
              <span className="badge-sale" style={{background:"#2E3A54"}}>توصيل 24–72h</span>
              <span className="badge-sale" style={{background:"#F59E0B", color:"#111"}}>تبديل 48h*</span>
              <span className="badge-sale" style={{background:"rgba(17,24,39,.06)", color:"#111827", border:"1px solid rgba(17,24,39,.10)"}}>الكمية المتبقية: {stock}</span>
            </div>

            <div style={{marginTop:14, border:"1px solid rgba(17,24,39,.12)", borderRadius:12, padding:12}}>
              <div style={{fontWeight:900, marginBottom:8}}>آراء الزبناء</div>
              <div className="muted" style={{lineHeight:1.6}}>
                <div style={{display:"flex", justifyContent:"space-between"}}><strong>Yassine • Casablanca</strong><span>★★★★★</span></div>
                <div>جودة ممتازة والتوصيل سريع.</div>
                <hr style={{margin:"10px 0"}} />
                <div style={{display:"flex", justifyContent:"space-between"}}><strong>Imane • Rabat</strong><span>★★★★★</span></div>
                <div>ستايل فخم وكيحمي من البرد.</div>
              </div>
            </div>


            <div style={{ marginTop: 16, fontWeight: 900 }}>{t.color}</div>
            <div className="swatches">
              {(media.images.slice(0,3).length?media.images.slice(0,3):["/product/front.jpg","/product/model.jpg","/product/side.jpg"]).map((src) => (
                <div key={src} className="thumb" onClick={() => setActiveImg(src)}>
                  <Image src={src} alt="thumb" width={100} height={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, fontWeight: 900, display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
  <span>{t.size}</span>
  <button type="button" className="iconbtn" onClick={()=>setShowSizeGuide(true)} style={{fontWeight:900}}>
    دليل المقاسات
  </button>
</div>
            <div className="sizecol">
              {SIZES.map((s) => (
                <button key={s} className={"sizebtn" + (s === size ? " active" : "")} onClick={() => setSize(s)} type="button">
                  <span>{s}</span>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: s === size ? "var(--accent)" : "rgba(17,24,39,.18)" }} />
                </button>
              ))}
            </div>

            <div style={{ marginTop: 16, fontWeight: 900 }}>{t.qty}</div>
            <div className="qty">
              <button className="qtybtn" type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <div className="qtyval">{qty}</div>
              <button className="qtybtn" type="button" onClick={() => setQty((q) => Math.min(9, q + 1))}>+</button>
            </div>

            <div className="formbox" id="order">
              <div style={{ fontWeight: 900, marginBottom: 6 }}>{t.formTitle}</div>
              <form onSubmit={submit}>
                <input className="input" placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} />
                <input className="input" placeholder={t.phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
                <select className="input" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">{t.city}</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
                <input className="input" placeholder={t.address} value={address} onChange={(e) => setAddress(e.target.value)} />
                <button className="btn-main" type="submit">{t.buyNow}</button>
              </form>
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 12 }}>
              <Image src={transformCloudinary(activeImg, "main")} alt="product" width={1200} height={1200} style={{ width: "100%", height: "auto", borderRadius: 12 }} priority />
              <div style={{ display: "flex", gap: 10, marginTop: 12, overflowX: "auto" }}>
                {(media.images.length?media.images:["/product/model.jpg","/product/front.jpg","/product/side.jpg","/product/back.jpg"]).map((src) => (
                  <div key={src} className="thumb" style={{ flex: "0 0 auto" }} onClick={() => setActiveImg(src)}>
                    <Image src={transformCloudinary(src, "thumb")} alt="thumb2" width={120} height={120} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky bottom CTA */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:40, background:"rgba(255,255,255,.92)", backdropFilter:"blur(10px)", borderTop:"1px solid rgba(17,24,39,.12)" }}>
        <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, paddingTop:12, paddingBottom:12 }}>
          <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
            <strong style={{ fontSize:14 }}>PYRO WEAR</strong>
            <span className="muted" style={{ fontSize:12 }}>COD • {PRICE} DH • Stock {stock}</span>
          </div>
          <a href="#order" className="btn-main" style={{ width:"auto", padding:"12px 14px", borderRadius:10, textDecoration:"none", whiteSpace:"nowrap" }}>
            اشترِ الآن
          </a>
        </div>
      </div>



{showSizeGuide && (
  <div
    onClick={()=>setShowSizeGuide(false)}
    style={{
      position:"fixed",
      inset:0,
      background:"rgba(0,0,0,.45)",
      display:"grid",
      placeItems:"center",
      padding:16,
      zIndex:50
    }}
  >
    <div
      className="card"
      onClick={(e)=>e.stopPropagation()}
      style={{maxWidth: "920px", width:"100%", padding:14}}
    >
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
        <div style={{fontWeight:900}}>Guide des tailles</div>
        <button className="iconbtn" type="button" onClick={()=>setShowSizeGuide(false)}>✕</button>
      </div>
      <div style={{marginTop:12}}>
        <Image src="/size-guide.png" alt="Guide des tailles" width={1200} height={800} style={{width:"100%", height:"auto", borderRadius:12}} />
      </div>
    </div>
  </div>
)}

      <div className="footer">
        <div className="container">
          <div className="footergrid">
            <div>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Terms and conditions</div>
              <div><a href="#">Terms & Conditions</a></div>
              <div><a href="#">Return Policy</a></div>
              <div><a href="#">Privacy Policy</a></div>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Contact-us</div>
              <div><a href="#">Contact us</a></div>
              <div><a href="#">FAQ</a></div>
              <div><a href="#">Shipping & Delivery</a></div>
            </div>
            <div>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>About the store</div>
              <div style={{ color: "rgba(255,255,255,.75)" }}>PYRO WEAR — الدفع عند الاستلام • توصيل لجميع المدن</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 18, color: "rgba(255,255,255,.75)", fontSize: 12 }}>
            All rights reserved © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
