import "./globals.css";
import Pixel from "@/components/Pixel";

export const metadata = {
  title: 'PYRO WEAR — Veste Puffer Luxe',
  description: 'Veste Puffer Noir PYRO WEAR. Paiement à la livraison (COD) partout au Maroc. Commande rapide via WhatsApp.',
  openGraph: { title: 'PYRO WEAR — Veste Puffer Luxe', description: 'COD Maroc • Livraison 24–72h', images: ['/og.jpg'] },

  icons: { icon: '/favicon.png' },
  title: "PYRO WEAR — Doudoune Essential",
  description: "Livraison 24–48h au Maroc • Paiement à la livraison (COD).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      
      <head>
        {/* Meta Pixel (optional) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              var pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
              if(pixelId){
                fbq('init', pixelId);
                fbq('track', 'PageView');
              }
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID||""}&ev=PageView&noscript=1`} alt="" />
        </noscript>
      </head>
<body>
        <Pixel />
        {children}
      </body>
    </html>
  );
}
