import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

// Ensure we only create root once
let root: ReturnType<typeof createRoot> | null = null;

const mountApp = () => {
  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

mountApp();
