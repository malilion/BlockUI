import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import "@malilion/block-ui-react/styles.css";
import "./global.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
