'use client';

import { useEffect, useMemo, useState } from "react";

type MediaState = {
  images: string[]; // product gallery URLs
  sizeGuideUrl: string; // size guide image URL
};

const DEFAULT_MEDIA: MediaState = {
  images: [
    "/product/front.jpg",
    "/product/model.jpg",
    "/product/side.jpg",
    "/product/back.jpg",
  ],
  sizeGuideUrl: "/size-guide.png",
};

function isCloudinary(url: string) {
  return /res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url);
}

// Insert Cloudinary transformations for consistent crop + quality
function transformCloudinary(url: string, kind: "main" | "thumb" | "size") {
  if (!isCloudinary(url)) return url;
  const parts = url.split("/upload/");
  if (parts.length < 2) return url;
  const t =
    kind === "thumb"
      ? "f_auto,q_auto,c_fill,g_auto,w_240,h_240"
      : kind === "size"
      ? "f_auto,q_auto,c_fit,w_1200"
      : "f_auto,q_auto,c_fill,g_auto,w_1400,h_1400";
  // avoid double-transform
  if (parts[1].startsWith("f_auto") || parts[1].startsWith("q_auto") || parts[1].startsWith("c_")) return url;
  return `${parts[0]}/upload/${t}/${parts[1]}`;
}

// Client-side resize + compress before upload (fast, saves data)
async function compressImage(file: File, maxSide = 1800, quality = 0.86): Promise<Blob> {
  const img = document.createElement("img");
  const url = URL.createObjectURL(file);
  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = url;
    });

    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    const scale = Math.min(1, maxSide / Math.max(w, h));
    const tw = Math.round(w * scale);
    const th = Math.round(h * scale);

    const canvas = document.createElement("canvas");
    canvas.width = tw;
    canvas.height = th;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    // Better quality downscale
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, tw, th);

    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b || file), "image/jpeg", quality)
    );
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}


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
  } catch {
    return DEFAULT_MEDIA;
  }
}

function saveMedia(s: MediaState) {
  localStorage.setItem("pyro_media_v1", JSON.stringify(s));
}

export default function MediaAdmin() {
  const [pin, setPin] = useState("");
  const [ok, setOk] = useState(false);

  const [cloudName, setCloudName] = useState(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "");
  const [uploadPreset, setUploadPreset] = useState(process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET || "");

  const [media, setMedia] = useState<MediaState>(DEFAULT_MEDIA);
  const [newUrl, setNewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const adminPin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN_PIN || "1234", []);

  useEffect(() => {
    const stored = sessionStorage.getItem("pyro_admin_ok") === "1";
    if (stored) setOk(true);
    setMedia(readMedia());
  }, []);

  const login = () => {
    if (pin === adminPin) {
      setOk(true);
      sessionStorage.setItem("pyro_admin_ok", "1");
    } else {
      alert("PIN incorrect");
    }
  };

  const addUrl = () => {
    const url = newUrl.trim();
    if (!url) return;
    const next = { ...media, images: [url, ...media.images].slice(0, 8) };
    setMedia(next);
    saveMedia(next);
    setNewUrl("");
  };

  const removeAt = (idx: number) => {
    const nextImgs = media.images.filter((_, i) => i !== idx);
    const next = { ...media, images: nextImgs.length ? nextImgs : DEFAULT_MEDIA.images };
    setMedia(next);
    saveMedia(next);
  };

  const setSizeGuide = () => {
    const url = newUrl.trim();
    if (!url) return;
    const next = { ...media, sizeGuideUrl: url };
    setMedia(next);
    saveMedia(next);
    setNewUrl("");
  };

  const uploadToCloudinary = async (file: File) => {
    if (!cloudName || !uploadPreset) {
      alert("Configure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET on Vercel.");
      return null;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", uploadPreset);
      // optional folder
      fd.append("folder", "pyrowear");
      // Auto-crop & optimize for product pages
      fd.append("transformation", "f_auto,q_auto,c_fill,g_auto,w_1400,h_1400");
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Upload failed");
      return data.secure_url as string;
    } catch (e:any) {
      alert(e?.message || "Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  if (!ok) {
    return (
      <div style={{ maxWidth: 520, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
        <h1 style={{ marginBottom: 8 }}>Admin — Media</h1>
        <p style={{ opacity: 0.7, marginTop: 0 }}>Enter PIN to manage images.</p>
        <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
        <button onClick={login} style={{ width: "100%", marginTop: 10, padding: 12, borderRadius: 10, border: "none", background: "#2E3A54", color: "#fff", fontWeight: 800 }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 980, margin: "24px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 6 }}>Media Manager</h1>
      <p style={{ opacity: 0.7, marginTop: 0 }}>
        Option A: paste image URLs. Option B: upload images (Cloudinary). Your landing will use these images automatically.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 14 }}>
          <h2 style={{ marginTop: 0, fontSize: 16 }}>Add by URL</h2>
          <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://... image url" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            <button onClick={addUrl} style={{ padding: "10px 12px", borderRadius: 10, border: "none", background: "#2E3A54", color: "#fff", fontWeight: 800 }}>Add to Gallery</button>
            <button onClick={setSizeGuide} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2E3A54", background: "#fff", color: "#2E3A54", fontWeight: 800 }}>Set as Size Guide</button>
          </div>
        </div>

        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 14 }}>
          <h2 style={{ marginTop: 0, fontSize: 16 }}>Upload (Cloudinary)</h2>
          <div style={{ display: "grid", gap: 10 }}>
            <input value={cloudName} onChange={(e) => setCloudName(e.target.value)} placeholder="Cloudinary cloud name (optional)" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
            <input value={uploadPreset} onChange={(e) => setUploadPreset(e.target.value)} placeholder="Unsigned upload preset (optional)" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd" }} />
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const blob = await compressImage(f);
                const optimizedFile = new File([blob], f.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
                const url = await uploadToCloudinary(optimizedFile);
                if (url) {
                  const next = { ...media, images: [url, ...media.images].slice(0, 8) };
                  setMedia(next);
                  saveMedia(next);
                }
                e.currentTarget.value = "";
              }}
              disabled={uploading}
            />
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Tip: best size 1600×1600 (square) or 1200×1500 (portrait).
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: 18, fontSize: 16 }}>Current Gallery (max 8)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        {media.images.map((src, idx) => (
          <div key={src + idx} style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="media" style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <div style={{ padding: 10, display: "flex", justifyContent: "space-between", gap: 10 }}>
              <button onClick={() => removeAt(idx)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ef4444", background: "#fff", color: "#ef4444", fontWeight: 800 }}>
                Remove
              </button>
              <button onClick={() => {
                const next = { ...media, images: [src, ...media.images.filter((_, i) => i !== idx)] };
                setMedia(next);
                saveMedia(next);
              }} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #2E3A54", background: "#fff", color: "#2E3A54", fontWeight: 800 }}>
                Set First
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 18, fontSize: 16 }}>Size Guide</h2>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", maxWidth: 520 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.sizeGuideUrl} alt="size guide" style={{ width: "100%", height: "auto" }} />
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a href="/" style={{ padding: "10px 12px", borderRadius: 10, background: "#2E3A54", color: "#fff", textDecoration: "none", fontWeight: 800 }}>Open Landing</a>
        <a href="/admin" style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2E3A54", color: "#2E3A54", textDecoration: "none", fontWeight: 800 }}>Open Orders Admin</a>
        <button onClick={() => { localStorage.removeItem("pyro_media_v1"); setMedia(DEFAULT_MEDIA); }} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #111827", background: "#fff", color: "#111827", fontWeight: 800 }}>
          Reset to default
        </button>
      </div>
    </div>
  );
}
