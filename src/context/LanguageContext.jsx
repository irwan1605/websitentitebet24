import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// Kunci localStorage
const LANG_KEY = "app.lang";
// Deteksi default dari localStorage -> navigator -> "id"
const getDefaultLang = () => {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "id" || saved === "en") return saved;
  const nav = (navigator.language || "id").toLowerCase();
  return nav.startsWith("en") ? "en" : "id";
};

const LanguageContext = createContext({
  lang: "id",
  setLang: () => {},
  t: (key, fallback) => fallback ?? key,
});

export const LanguageProvider = ({ children, dictionaries }) => {
  const [lang, setLangState] = useState(getDefaultLang());

  // simpan ke localStorage setiap berubah
  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  // setter yang aman (hanya "id" / "en")
  const setLang = (v) => setLangState(v === "en" ? "en" : "id");

  // fungsi translate sederhana: t('nav.home')
  const t = useMemo(() => {
    return (key, fallback) => {
      const dict = dictionaries?.[lang] ?? {};
      const val = key.split(".").reduce((o, k) => (o ? o[k] : undefined), dict);
      return val ?? fallback ?? key;
    };
  }, [lang, dictionaries]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
