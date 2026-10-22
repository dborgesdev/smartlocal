import { BrowserRouter } from "react-router-dom";
import Site from "./Site";
export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Site />
    </BrowserRouter>
  );
}
