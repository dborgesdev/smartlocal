import { useRef } from "react";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { navigation } from "@/data/navigation";
import MobileDrawer from "./MobileDrawer";
import ScrollProgress from "./ScrollProgress";
import BrandLogo from "./BrandLogo";
export default function Header() {
  const drawer = useRef<HTMLDialogElement>(null);
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Smart Local — início">
        <BrandLogo />
      </Link>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <Link key={item.label} to={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <span className="header-caption">DESIGN + CÓDIGO + INTENÇÃO</span>
      <button
        className="menu-trigger"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={() => drawer.current?.showModal()}
      >
        <MoreVertical size={25} />
      </button>
      <MobileDrawer dialogRef={drawer} />
      <ScrollProgress />
    </header>
  );
}
