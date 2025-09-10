// src/components/Header.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

// i18n + constants builder
import { useLanguage } from "../context/LanguageContext.jsx";
import { getNav } from "../lib/constants.js";

export default function Header() {
  const { lang, setLang, t } = useLanguage();   // >>> bahasa global
  const NAV = getNav(t);                         // >>> label nav dari kamus

  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => setOpen((v) => !v), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  // Tutup dengan ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  // Tutup saat resize ke md ke atas (biar gak nyangkut)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/20 backdrop-blur-md shadow-md">
      <div className="mx-auto max-w-7xl h-20 px-2 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo + Teks */}
        <a href="#beranda" className="flex items-center gap-4 sm:gap-6 font-semibold">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain border-2 border-sky-400 shadow-md rounded-lg"
          />
          <h1 className="font-brand uppercase tracking-wider md:text-1xl font-extrabold text-blue-400 animate-glow animate-shimmer whitespace-nowrap">
            {t("brand")}
          </h1>
        </a>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="
                font-sans font-semibold tracking-wide
                text-white/90
                drop-shadow-[0_0_6px_rgba(56,189,248,0.65)]
                hover:text-sky-400 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.95)]
                transition-colors duration-300
              "
            >
              {n.label}
            </a>
          ))}

          {/* Divider */}
          <div className="h-5 w-px bg-white/40" />

          {/* Language switch (pakai context) */}
          <button
            onClick={() => setLang("id")}
            className={`font-sans tracking-wide transition-colors duration-300 ${
              lang === "id"
                ? "text-sky-400 font-bold drop-shadow-[0_0_12px_rgba(56,189,248,1)]"
                : "text-white/90 font-semibold drop-shadow-[0_0_6px_rgba(56,189,248,0.65)] hover:text-sky-400 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.95)]"
            }`}
            aria-label="Bahasa Indonesia"
          >
            ID
          </button>
          <span className="text-white/60">|</span>
          <button
            onClick={() => setLang("en")}
            className={`font-sans tracking-wide transition-colors duration-300 ${
              lang === "en"
                ? "text-sky-400 font-bold drop-shadow-[0_0_12px_rgba(56,189,248,1)]"
                : "text-white/90 font-semibold drop-shadow-[0_0_6px_rgba(56,189,248,0.65)] hover:text-sky-400 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.95)]"
            }`}
            aria-label="English"
          >
            EN
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg border border-slate-200 bg-white/40 backdrop-blur-sm"
          aria-label="menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
          aria-hidden="true"
        />
      )}

      {/* Slide-over Mobile Panel */}
      <aside
        id="mobile-menu"
        className={`
          fixed z-50 top-0 right-0 h-full w-80 max-w-[85%]
          bg-slate-900/95 text-white shadow-2xl backdrop-blur
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 object-contain rounded-md border border-sky-400/80"
            />
            <span className="font-brand text-sky-400 text-sm tracking-wider">
              {t("brand")}
            </span>
          </div>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-6 w-6 text-white/90" />
          </button>
        </div>

        <nav className="px-4 py-4 space-y-2">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={closeMenu}
              className="
                block rounded-xl px-4 py-3
                font-sans font-semibold tracking-wide
                text-white/90
                drop-shadow-[0_0_6px_rgba(56,189,248,0.65)]
                hover:text-sky-400 hover:bg-white/5
                hover:drop-shadow-[5_0_12px_rgba(56,189,248,0.95)]
                transition-colors
              "
            >
              {n.label}
            </a>
          ))}

          <div className="my-3 h-px bg-white/10" />

          {/* Language switch (Mobile) */}
          <div className="flex items-center gap-3 px-2">
            <button
              onClick={() => {
                setLang("id");
                closeMenu();
              }}
              className={`rounded-lg px-3 py-2 transition ${
                lang === "id"
                  ? "bg-sky-500/20 text-sky-300 font-bold drop-shadow-[0_0_12px_rgba(56,189,248,1)]"
                  : "text-white/90 font-semibold hover:bg-white/5 hover:text-sky-300"
              }`}
              aria-label="Bahasa Indonesia"
            >
              ID
            </button>
            <span className="text-white/50">|</span>
            <button
              onClick={() => {
                setLang("en");
                closeMenu();
              }}
              className={`rounded-lg px-3 py-2 transition ${
                lang === "en"
                  ? "bg-sky-500/20 text-sky-300 font-bold drop-shadow-[0_0_12px_rgba(56,189,248,1)]"
                  : "text-white/90 font-semibold hover:bg-white/5 hover:text-sky-300"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </nav>
      </aside>
    </header>
  );
}
