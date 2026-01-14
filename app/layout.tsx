import "./globals.css";
import Pixel from "@/components/Pixel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PYRO WEAR — Doudoune Essential",
  description: "Livraison 24–72h au Maroc • Paiement à la livraison (COD). Commande rapide via WhatsApp.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "PYRO WEAR — Doudoune Essential",
    description: "COD Maroc • Livraison 24–72h",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Pixel />
        {children}
      </body>
    </html>
  );
}
