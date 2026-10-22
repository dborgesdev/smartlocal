import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
const path = window.location.pathname.replace(/\/$/, "") || "/";
if (root.hasChildNodes() && root.dataset.route === path)
  hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
