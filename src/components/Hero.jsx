// src/components/Hero.jsx
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Globe2, CheckCircle, X, Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import NAYAAnimatedBiometricBackground from "./NAYAAnimatedBiometricBackground.jsx";

export default function Hero() {
  const { t } = useLanguage();

  // ==== SEARCH BAR (top-center, glow, global search) ====
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [glowPos, setGlowPos] = useState({ x: "50%", y: "50%" });
  const searchWrapRef = useRef(null);

  const SECTION_IDS = ["beranda", "tentang", "fitur", "layanan", "kontak"];
  const titleForId = (id) => {
    switch (id) {
      case "beranda":
        return t("nav.home", "Beranda");
      case "tentang":
        return t("about.title", "TENTANG KAMI");
      case "fitur":
        return t("features.title", "FITUR KAMI");
      case "layanan":
        return t("services.title", "LAYANAN KAMI");
      case "kontak":
        return t("nav.contact", "Kontak");
      default:
        return id;
    }
  };

  const buildIndex = useCallback(() => {
    return SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      const text = (el?.innerText || "").replace(/\s+/g, " ").trim();
      return { id, title: titleForId(id), text };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const highlight = (text, q) => {
    if (!q) return text;
    try {
      const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`(${esc.split(/\s+/).join("|")})`, "ig");
      return text.replace(
        re,
        "<mark class='bg-yellow-300/70 text-slate-900 px-0.5 rounded-sm'>$1</mark>"
      );
    } catch {
      return text;
    }
  };

  const makeSnippet = (text, q) => {
    const qLower = q.toLowerCase();
    let pos = text.toLowerCase().indexOf(qLower);
    if (pos < 0) {
      const first = qLower.split(/\s+/)[0] || "";
      pos = text.toLowerCase().indexOf(first);
    }
    if (pos < 0) pos = 0;
    const start = Math.max(0, pos - 60);
    const end = Math.min(text.length, pos + q.length + 60);
    const snippet =
      (start > 0 ? "… " : "") +
      text.slice(start, end) +
      (end < text.length ? " …" : "");
    return highlight(snippet, q);
  };

  const runSearch = useCallback(
    (q) => {
      if (!q || q.trim().length < 2) {
        setResults([]);
        setActiveIdx(-1);
        return;
      }
      const index = buildIndex();
      const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      const scored = index
        .map((item) => {
          const hay = item.text.toLowerCase();
          let score = 0;
          terms.forEach((term) => {
            let i = hay.indexOf(term);
            while (i !== -1) {
              score += 1;
              i = hay.indexOf(term, i + term.length);
            }
          });
          return { ...item, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((r) => ({
          ...r,
          snippetHtml: makeSnippet(r.text, q),
        }));
      setResults(scored);
      setActiveIdx(scored.length ? 0 : -1);
    },
    [buildIndex]
  );

  useEffect(() => {
    const id = setTimeout(() => runSearch(query), 120);
    return () => clearTimeout(id);
  }, [query, runSearch]);

  const onSearchKey = (e) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIdx] || results[0];
      if (target) {
        document
          .getElementById(target.id)
          ?.scrollIntoView({ behavior: "smooth" });
        setResults([]);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setResults([]);
    }
  };

  const gotoResult = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setResults([]);
    setQuery("");
  };

  const onGlowMove = (e) => {
    const rect = searchWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: `${x}%`, y: `${y}%` });
  };

  // ==== SCAN ITEMS & MODAL ====
  const scanItems = [
    {
      key: "fingerprint",
      label: t("hero.scan.fingerprint.label"),
      img: "/icons/fingerprint.svg",
      desc: t("hero.scan.fingerprint.desc"),
      modalTitle: t("hero.scan.fingerprint.modalTitle"),
    },
    {
      key: "iris",
      label: t("hero.scan.iris.label"),
      img: "/icons/iris.svg",
      desc: t("hero.scan.iris.desc"),
      modalTitle: t("hero.scan.iris.modalTitle"),
    },
  ];

  const [openKey, setOpenKey] = useState(null);
  const current = scanItems.find((s) => s.key === openKey) || null;

  const onEsc = useCallback((e) => {
    if (e.key === "Escape") setOpenKey(null);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  // Focus trap & body scroll lock
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  useEffect(() => {
    if (!current) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const to = setTimeout(() => closeBtnRef.current?.focus(), 0);

    const handleTabTrap = (e) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTabTrap);

    return () => {
      clearTimeout(to);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleTabTrap);
    };
  }, [current]);

  // helper: ambil detail & bullets aman dari kamus
  const safe = (s) =>
    typeof s === "string" && s.startsWith("⟪missing:") ? "" : s;

  const getExtra = (key) => {
    const heading = safe(t(`hero.scan.${key}.extra.heading`));
    const detail = safe(t(`hero.scan.${key}.extra.detail`));
    const bullets = [];
    for (let i = 1; i <= 10; i++) {
      const b = safe(t(`hero.scan.${key}.extra.bullets.${i}`));
      if (b) bullets.push(b);
    }
    return { heading, detail, bullets };
  };

  return (
    <section
      id="beranda"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-10 lg:pb-16"
    >
      {/* Background biometrik */}
      <NAYAAnimatedBiometricBackground
        imageUrl="/bg/fingeriris1.png"
        primary="#38bdf8"
        secondary="#a78bfa"
        density={1}
        speed={1}
        overlayOpacity={0.55}
      />

      {/* ======= SEARCH BAR ======= */}
      <div
        ref={searchWrapRef}
        onMouseMove={onGlowMove}
        onMouseLeave={() => setGlowPos({ x: "50%", y: "50%" })}
        className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-6 sm:top-8 md:top-10 z-40 w-full max-w-2xl px-3"
        style={{
          background: `radial-gradient(200px circle at ${glowPos.x} ${glowPos.y}, rgba(56,189,248,0.18), transparent 60%)`,
          borderRadius: "1rem",
        }}
      >
        <div className="relative rounded-2xl bg-white/20 dark:bg-slate-900/70 backdrop-blur px-4 py-3 ring-1 ring-white/30 dark:ring-white/10">
          <div className="relative rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur px-3 py-2 ring-1 ring-white/30 dark:ring-white/10">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-slate-500 dark:text-slate-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKey}
                placeholder={t("search.placeholder", "Cari apa saja di halaman…")}
                aria-label={t("search.placeholder", "Cari apa saja di halaman…")}
                className="w-full bg-transparent outline-none placeholder:text-slate-800 dark:placeholder:text-slate-400 text-slate-800 dark:text-slate-100 text-sm md:text-base"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                  }}
                  className="text-xs px-2 py-1 rounded-lg bg-slate-200/70 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {t("common.close", "Tutup")}
                </button>
              )}
            </div>

            {/* results dropdown */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 rounded-2xl border border-white/20 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 max-h-[50vh] overflow-auto shadow-xl"
                >
                  {results.map((r, idx) => (
                    <li key={r.id}>
                      <button
                        onMouseEnter={() => setActiveIdx(idx)}
                        onClick={() => gotoResult(r.id)}
                        className={[
                          "w-full text-left rounded-xl px-3 py-2",
                          idx === activeIdx
                            ? "bg-sky-500/15 ring-1 ring-sky-400/30"
                            : "hover:bg-white/60 dark:hover:bg-white/10",
                        ].join(" ")}
                      >
                        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {r.title}
                        </div>
                        <div
                          className="text-sm text-slate-800 dark:text-slate-100"
                          dangerouslySetInnerHTML={{ __html: r.snippetHtml }}
                        />
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
              {query && results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 rounded-xl border border-white/20 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-3 text-sm text-slate-600 dark:text-slate-300"
                >
                  {t("search.none", "Tidak ada hasil. Coba kata kunci lain.")}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* ======= END SEARCH BAR ======= */}

      <div className="md:text-xl relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Kiri: headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm uppercase tracking-widest text-slate-200 font-semibold">
            {t("hero.kicker")}
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {t("hero.welcome")}
            <span className="block text-sky-400">{t("brand")}</span>
          </h1>
          <p className="mt-3 text-slate-200 leading-relaxed max-w-xl">
            {t("hero.body")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 text-white px-5 py-3 text-sm hover:bg-slate-800/90 backdrop-blur-sm"
            >
              {t("hero.ctaConsult")} <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#fitur"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/40 bg-white/80 backdrop-blur-sm px-5 py-3 text-sm hover:bg-slate-50/90"
            >
              {t("hero.ctaFeatures")} <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-200">
            <Globe2 className="h-4 w-4" />
            <span>{t("hero.implementLine")}</span>
          </div>
        </motion.div>

        {/* Kanan: kartu grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="rounded-3xl border border-slate-200/30 bg-white/5 shadow-sm overflow-hidden backdrop-blur-sm"
        >
          <div className="aspect-[16] grid md:grid-cols-2">
            {/* Panel kiri */}
            <div className="block bg-gradient-to-b from-slate-900 to-slate-700 text-slate-100 p-6">
              <div className="text-xs uppercase tracking-widest opacity-80">
                {t("hero.scan.heading")}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 md:gap-16">
                {scanItems.map((it) => (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => setOpenKey(it.key)}
                    className="group relative h-20 md:h-24 w-full rounded-xl border border-slate-500/40 bg-white/5 overflow-hidden transition focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                  >
                    <img
                      src={it.img}
                      alt={it.label}
                      className="absolute inset-0 h-full w-full object-contain p-3 opacity-90 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                      onError={(e) => (e.currentTarget.style.opacity = 0.2)}
                    />
                    <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80 group-hover:from-emerald-500/25 group-hover:via-emerald-500/10" />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition-all group-hover:ring-2 group-hover:ring-emerald-400/60 group-hover:shadow-[0_0_36px_rgba(16,185,129,0.45)]" />
                    <div className="absolute inset-x-2.5 md:inset-x-3 bottom-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                        <span className="text-xs md:text-sm font-medium">
                          {it.label}
                        </span>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel kanan: brand */}
            <div className="relative bg-slate-100/30 flex items-center justify-center py-10">
              <img
                src="/bg/logotansparannti.png"
                alt="Logo NTI"
                className="w-[80%] h-auto object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal detail teknologi */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tech-title"
            onClick={() => setOpenKey(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.33, ease: "easeOut" }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/90 to-slate-800/90 text-slate-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-5 border-b border-white/10">
                <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center ring-1 ring-white/10 shadow-inner">
                  <img
                    src={current.img}
                    alt={current.label}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <h3 id="tech-title" className="text-lg font-semibold">
                  {current.modalTitle}
                </h3>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                  aria-label={t("common.close")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Deskripsi singkat */}
                <p id="tech-desc" className="leading-relaxed text-slate-200/90">
                  {current.desc}
                </p>

                {/* Narasi detail + bullets (baru) */}
                {(() => {
                  const { heading, detail, bullets } = getExtra(current.key);
                  return (
                    <>
                      {(heading || detail || bullets.length > 0) && (
                        <div className="mt-3">
                          {heading && (
                            <div className="text-sm font-semibold text-sky-300 tracking-wide">
                              {heading}
                            </div>
                          )}
                          {detail && (
                            <p className="mt-1 text-slate-200/90">{detail}</p>
                          )}
                          {bullets.length > 0 && (
                            <ul className="mt-3 space-y-2">
                              {bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                                  <span className="text-slate-100/95">{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </>
                  );
                })()}

                <div className="mt-5 flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">{t("hero.verified")}</span>
                </div>
              </div>

              {/* Divider + Actions */}
              <div className="h-px w-full bg-white/10" />
              <div className="p-5 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 text-white px-4 py-2 text-sm hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  {t("common.close")}
                </button>
              </div>

              {/* Glow frame */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 shadow-[0_0_60px_rgba(56,189,248,0.2)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
