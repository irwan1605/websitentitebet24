// src/App.jsx (contoh)
import React from "react";
import Home from "./pages/Home.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );
}
