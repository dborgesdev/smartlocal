import { useParams } from "react-router-dom";
import { projects } from "@/data/projects";
import { projectMessage, whatsappUrl } from "@/lib/whatsapp";
export default function WhatsAppFloat() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl(project ? projectMessage(project.title) : undefined)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Smart Local no WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        width="27"
        height="27"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 3A13 13 0 0 0 4.8 22.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.5a10.5 10.5 0 0 1-5.4-1.5l-.4-.2-3.9 1 1.1-3.8-.3-.4A10.5 10.5 0 1 1 16 26.5Zm5.8-7.8c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-4.2-3.7c-.3-.5.3-.5.9-1.7.1-.2 0-.5 0-.7l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4a3.5 3.5 0 0 0-1.1 2.6c0 1.5 1.1 3 1.3 3.2s2.3 3.6 5.6 5c2.1.9 2.9 1 3.9.8.6-.1 1.8-.7 2-1.4s.3-1.3.2-1.4-.3-.2-1-.5Z" />
      </svg>
    </a>
  );
}
