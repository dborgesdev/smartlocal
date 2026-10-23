import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/refinements-v2.css";

const root = document.getElementById("root")!;
const path = window.location.pathname.replace(/\/$/, "") || "/";
if (root.hasChildNodes() && root.dataset.route === path)
  hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
