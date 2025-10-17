import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/i18n";

// Suppress benign ResizeObserver warning from react-resizable-panels
const originalError = console.error;
console.error = (...args) => {
  if (
    args[0] instanceof Error &&
    args[0].message?.includes("ResizeObserver loop completed with undelivered notifications")
  ) {
    return;
  }
  originalError.call(console, ...args);
};

createRoot(document.getElementById("root")!).render(<App />);
