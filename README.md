# PYRO WEAR — Landing Page Maroc (COD + WhatsApp) — Vercel

## Installation
```bash
npm install
npm run dev
```
Ouvre http://localhost:3000

## Configuration (.env)
Copie `.env.example` → `.env` puis remplis :
- NEXT_PUBLIC_WHATSAPP_NUMBER (ex: 212669727973)
- Pixels Meta / TikTok / GA4 (optionnel)

## Déploiement Vercel
1) Push sur GitHub
2) Import sur Vercel
3) Ajoute les variables d’environnement sur Vercel (Settings → Environment Variables)
4) Deploy

## Images
Remplace `public/puffer/1.jpg..6.jpg` par tes photos.


## Pages ajoutées
- /merci : page de remerciement après l'envoi WhatsApp
- /admin : dashboard simple (PIN via NEXT_PUBLIC_ADMIN_PIN)
