import React, { useState } from "react";
import { Menu } from "lucide-react";
import logo from "../assets/logo.png"; // ganti path logo sesuai project

// Definisi menu dalam dua bahasa
const NAV = {
  id: [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "fitur", label: "Fitur" },
    { id: "layanan", label: "Layanan" },
    { id: "kontak", label: "Kontak" },
  ],
  en: [
    { id: "beranda", label: "Home" },
    { id: "tentang", label: "About" },
    { id: "fitur", label: "Features" },
    { id: "layanan", label: "Services" },
    { id: "kontak", label: "Contact" },
  ],
};

export default function Header() {
  const [lang, setLang] = useState("id"); // default bahasa Indonesia

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-md">
      <div className="mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo + Teks */}
        <a href="#beranda" className="flex items-center gap-4 sm:gap-6 font-semibold">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain border-2 border-sky-400 shadow-md rounded-lg"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-sky-800 animate-glow animate-shimmer whitespace-nowrap">
            {lang === "id"
              ? "NAYA TECHNOLOGICAL INDONESIA"
              : "NAYA TECHNOLOGICAL INDONESIA"}
          </h1>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm">
          {NAV[lang].map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="hover:text-sky-600 text-slate-700 transition-colors"
            >
              {n.label}
            </a>
          ))}
          {/* Divider */}
          <div className="h-5 w-px bg-slate-300" />
          <button
            onClick={() => setLang("id")}
            className={`${
              lang === "id" ? "text-sky-600 font-bold" : "text-slate-700"
            } hover:text-sky-600 transition-colors`}
          >
            ID
          </button>
          <span className="text-slate-400">|</span>
          <button
            onClick={() => setLang("en")}
            className={`${
              lang === "en" ? "text-sky-600 font-bold" : "text-slate-700"
            } hover:text-sky-600 transition-colors`}
          >
            EN
          </button>
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-2 rounded-lg border border-slate-200 bg-white/40 backdrop-blur-sm"
          aria-label="menu"
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>
      </div>
    </header>
  );
}
