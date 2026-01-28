# NAFRICA TV PROD — Site vitrine (Next.js + Vercel)

## 1) Installation
```bash
npm install
npm run dev
```
Ouvrir http://localhost:3000

## 2) Modifier les infos (important)
- Téléphone WhatsApp : remplacer `+212600000000` dans :
  - `components/Footer.tsx`
  - `app/contact/page.tsx`
- Email : remplacez si besoin `contact@nafricatvprod.com`

## 3) Déploiement sur Vercel
1. Poussez le projet sur GitHub
2. Importez sur Vercel
3. Ajoutez le domaine `nafricatvprod.com`

## 4) SEO
- `app/sitemap.ts` génère automatiquement `/sitemap.xml`
- `app/robots.ts` génère automatiquement `/robots.txt`
- `app/layout.tsx` contient OpenGraph + metadata globale
