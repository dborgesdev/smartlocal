import { useEffect, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { whatsappUrl } from "@/lib/whatsapp";
export default function MobileDrawer({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
}) {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new MutationObserver(() => {
      document.body.classList.toggle("drawer-open", dialog.open);
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.body.classList.remove("drawer-open");
    };
  }, [dialogRef]);
  return (
    <dialog
      ref={dialogRef}
      className="drawer"
      aria-labelledby="menu-title"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, textarea, [tabindex="0"]',
          ),
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !event.currentTarget.contains(document.activeElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className="drawer-content">
        <div className="flex items-center justify-between">
          <span className="eyebrow" id="menu-title">
            EXPLORE A SMART LOCAL
          </span>
          <button
            autoFocus
            className="icon-button"
            aria-label="Fechar menu"
            onClick={() => dialogRef.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Menu completo">
          {navigation.map((item, index) => (
            <Link
              onClick={() => dialogRef.current?.close()}
              key={item.label}
              to={item.href}
            >
              <small>0{index + 1}</small>
              {item.label}
              <ArrowUpRight />
            </Link>
          ))}
          <Link to="/projetos" onClick={() => dialogRef.current?.close()}>
            <small>05</small>Todos os projetos
            <ArrowUpRight />
          </Link>
        </nav>
        <a
          className="text-link"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Vamos criar algo juntos <ArrowUpRight size={18} />
        </a>
        <p className="muted">Desenvolvimento web e experiências digitais.</p>
      </div>
    </dialog>
  );
}
