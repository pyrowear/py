import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nafricatvprod.com"),
  title: {
    default: "NAFRICA TV PROD – Production audiovisuelle, media & communication à Rabat",
    template: "%s | NAFRICA TV PROD"
  },
  description:
    "NAFRICA TV PROD est une société marocaine basée à Rabat spécialisée en production audiovisuelle, TV, media, communication institutionnelle, post‑production et contenus digitaux.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "NAFRICA TV PROD",
    description:
      "Production audiovisuelle • Media • Communication • TV – Rabat, Maroc",
    url: "https://nafricatvprod.com",
    siteName: "NAFRICA TV PROD",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NAFRICA TV PROD" }],
    locale: "fr_MA",
    type: "website",
  },
  robots: { index: True, follow: True },
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
