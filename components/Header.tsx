import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="nav">
      <div className="container">
        <div className="navinner">
          <Link className="brand" href="/" aria-label="NAFRICA TV PROD">
            <Image src="/logo.png" alt="Logo NAFRICA TV PROD" width={40} height={40} priority />
            <div>
              <div className="name">NAFRICA TV PROD</div>
              <div className="tag">Production • Media • Communication</div>
            </div>
          </Link>

          <nav className="menu" aria-label="Navigation principale">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="btn" href="/contact">Demander un devis</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
