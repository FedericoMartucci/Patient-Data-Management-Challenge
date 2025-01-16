import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { SnackBarProvider } from "./components/SnackBarProvider/SnackBarProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackBarProvider>
      <App />
    </SnackBarProvider>
  </StrictMode>
);
