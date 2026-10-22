import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";
import BrandLogo from "./BrandLogo";
export default function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <div>
          <Link to="/" className="brand" aria-label="Smart Local — início">
            <BrandLogo />
          </Link>
          <p>Desenvolvimento web e experiências digitais.</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          {navigation.map((item) => (
            <Link to={item.href} key={item.label}>
              {item.label}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Smart Local</span>
        <a
          href="https://smartlocal.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Desenvolvido por Douglas Borges - Smart Local
        </a>
        <span>BEYOND THE ORDINARY ↗</span>
      </div>
    </footer>
  );
}
