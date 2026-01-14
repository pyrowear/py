# PYRO WEAR — Media Upload (Vercel-friendly)

⚠️ On Vercel you **cannot upload and save images into the project folder** at runtime.
So we provide a real solution: upload to **Cloudinary** (or paste image URLs), then the landing uses them automatically.

## 1) Use the Media Manager
- Open: `/admin/media`
- Login with your PIN
- Option A: paste image URLs (from Instagram/CDN/Drive public links)
- Option B: upload images to Cloudinary (recommended)

## 2) Cloudinary setup (recommended)
- Create a Cloudinary account
- In Settings / Upload:
  - Create an **Unsigned upload preset**
  - Name it e.g. `pyrowear_unsigned`

### Add env vars on Vercel
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your cloud name
- NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET = pyrowear_unsigned

Redeploy and upload images from `/admin/media`.

## 3) Size guide picture
- Upload a size guide image and click "Set as Size Guide"
- On the landing, "Guide des tailles" will show it.


## Optimization
- Uploads are **compressed to JPG** before sending.
- Cloudinary URLs are displayed with **auto-crop + auto-quality** so all images look premium and consistent.
