import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HashRouter } from "react-router-dom"; // 👈 import HashRouter

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HashRouter> {/* 👈 wrap App with HashRouter */}
      <App />
    </HashRouter>
  </ThemeProvider>
);
