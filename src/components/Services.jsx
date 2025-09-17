// src/components/Services.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircuitBoard, PlugZap, LifeBuoy, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const PALETTES = [
  { from: "from-sky-500",    to: "to-cyan-400",    glow: "rgba(56,189,248,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(56,189,248,0.55)]" },
  { from: "from-violet-500", to: "to-fuchsia-400", glow: "rgba(139,92,246,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(139,92,246,0.55)]" },
  { from: "from-emerald-500",to: "to-lime-400",    glow: "rgba(16,185,129,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(16,185,129,0.55)]" },
];

export default function Services() {
  const { t } = useLanguage();

  // --------- KARTU LAYANAN (pakai i18n) ----------
  const cards = useMemo(() => ([
    {
      t: t("services.cards.consult.title", "Konsultasi & Arsitektur"),
      d: t("services.cards.consult.desc",  "Audit kebutuhan, perancangan pipeline, dan PoC cepat."),
      icon: CircuitBoard
    },
    {
      t: t("services.cards.sdk.title",     "Integrasi & SDK"),
      d: t("services.cards.sdk.desc",      "Integrasi kamera, CCTV, VMS, dan SDK untuk aplikasi Anda."),
      icon: PlugZap
    },
    {
      t: t("services.cards.support.title", "Operasional & Support"),
      d: t("services.cards.support.desc",  "Monitoring, pelatihan, dan SLA sesuai kebutuhan."),
      icon: LifeBuoy
    },
  ]), [t]);

  return (
    <section id="layanan" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
      <div className="md:text-2xl text-sm uppercase tracking-widest text-slate-200 font-semibold text-center p-4">
        {t("services.title", "LAYANAN KAMI")}
      </div>

      {/* Grid Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card, i) => (
          <ServiceCard key={card.t} card={card} index={i} />
        ))}
      </div>

      {/* --- SLIDE INTERAKTIF (MOSAIC) di bawah card --- */}
      <MosaicSlider className="mt-10 lg:mt-14" />
    </section>
  );
}

function ServiceCard({ card, index }) {
  const ref = useRef(null);
  const palette = PALETTES[index % PALETTES.length];
  const Icon = card.icon;

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={[
        "group relative overflow-hidden rounded-2xl border text-white",
        "border-white/10 bg-white/10 backdrop-blur p-6 shadow-sm",
        "transition-all duration-300",
      ].join(" ")}
      style={{
        background: `radial-gradient(600px circle at var(--mx, -100px) var(--my, -100px), rgba(255,255,255,0.08) 0%, transparent 60%)`,
        backgroundBlendMode: "screen",
      }}
    >
      {/* Soft outer glow */}
      <div
        className={[
          "pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300",
          "group-hover:opacity-100",
          (PALETTES[index % PALETTES.length].ring),
        ].join(" ")}
      />

      <div className="flex items-center gap-3">
        {/* Icon capsule gradient */}
        <div
          className={[
            "relative h-12 w-12 rounded-2xl p-[2px]",
            "bg-gradient-to-br",
            PALETTES[index % PALETTES.length].from,
            PALETTES[index % PALETTES.length].to,
            "transition-transform duration-300",
            "group-hover:scale-105 group-hover:rotate-1",
          ].join(" ")}
        >
          <div className="grid h-full w-full place-items-center rounded-2xl bg-white">
            <Icon className="h-6 w-6 text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:text-slate-900" />
          </div>
          <div
            className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
            style={{ background: `radial-gradient(120px circle at 50% 50%, ${PALETTES[index % PALETTES.length].glow} 0%, transparent 70%)` }}
          />
        </div>

        <h3 className="font-semibold">{card.t}</h3>
      </div>

      <p className="mt-2 text-sm">{card.d}</p>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: "rgba(255,255,255,0.25)" }}
      />
    </motion.div>
  );
}

/* ===========================================================
   MOSAIC SLIDER: 3 slide sesuai tema kartu Layanan
   Gambar: /public/slide/layanan1nti.png, layanan2nti.png, layanan3nti.png
   I18n: services.slider.title, .captions.consult/.sdk/.support, .prev/.next
=========================================================== */
function MosaicSlider({ className = "" }) {
  const { t } = useLanguage();

  // Daftar slide: konsisten dengan 3 kartu
  const SLIDES = useMemo(() => ([
    {
      id: "consult",
      src: "/slide/layanan1nti.png",
      title: t("services.cards.consult.title", "Konsultasi & Arsitektur"),
      caption: t("services.slider.captions.consult",
        "Konsultasi & Arsitektur — Audit kebutuhan, rancang arsitektur, dan PoC cepat bersama tim ahli."
      ),
    },
    {
      id: "sdk",
      src: "/slide/layanan2nti.png",
      title: t("services.cards.sdk.title", "Integrasi & SDK"),
      caption: t("services.slider.captions.sdk",
        "Integrasi & SDK — Integrasi kamera, CCTV/VMS, dan SDK lintas platform yang ringan."
      ),
    },
    {
      id: "support",
      src: "/slide/layanan3nti.png",
      title: t("services.cards.support.title", "Operasional & Support"),
      caption: t("services.slider.captions.support",
        "Operasional & Support — Monitoring, pelatihan, dan SLA fleksibel sesuai kebutuhan."
      ),
    },
  ]), [t]);

  // Pengaturan mosaic
  const ROWS = 8;
  const COLS = 14;
  const DURATION = 0.6;
  const STAGGER = 0.012;
  const AUTO_MS = 3500;

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => setIdx((i) => (i + 1) % SLIDES.length), [SLIDES.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length), [SLIDES.length]);

  useEffect(() => {
    if (paused || SLIDES.length <= 1) return;
    timerRef.current = setInterval(next, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, next, SLIDES.length]);

  const center = { r: (ROWS - 1) / 2, c: (COLS - 1) / 2 };

  return (
    <div className={["group", className].join(" ")}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-white/90">
          {t("services.slider.title", "Konsultasi • Integrasi • Operasional")}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-full bg-white/60 hover:bg-white/90 text-slate-800 p-2 transition shadow"
            aria-label={t("services.slider.prev", "Sebelumnya")}
            title={t("services.slider.prev", "Sebelumnya")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-white/60 hover:bg-white/90 text-slate-800 p-2 transition shadow"
            aria-label={t("services.slider.next", "Berikutnya")}
            title={t("services.slider.next", "Berikutnya")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 backdrop-blur"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/9] w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={SLIDES[idx].id}
              className="absolute inset-0"
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <div className="absolute inset-0 grid" style={{
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              }}>
                {Array.from({ length: ROWS }).map((_, r) =>
                  Array.from({ length: COLS }).map((__, c) => {
                    const dist = Math.hypot(r - center.r, c - center.c);
                    const delay = dist * STAGGER;
                    const bgPosX = (c / (COLS - 1)) * 100;
                    const bgPosY = (r / (ROWS - 1)) * 100;

                    return (
                      <motion.div
                        key={`${r}-${c}`}
                        variants={{
                          hidden: { opacity: 0, scale: 0.9, rotate: -2 },
                          show: {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            transition: { duration: DURATION, delay },
                          },
                        }}
                        style={{
                          backgroundImage: `url(${SLIDES[idx].src})`,
                          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                        }}
                        className="relative"
                      />
                    );
                  })
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Overlay judul + caption slide aktif */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 bg-gradient-to-t from-black/55 to-transparent">
            <div className="text-white text-sm sm:text-base font-semibold">{SLIDES[idx].title}</div>
            <div className="text-white/90 text-xs sm:text-sm mt-1">{SLIDES[idx].caption}</div>
          </div>

          {/* Controls saat hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={prev}
              className="pointer-events-auto m-2 rounded-full bg-black/35 hover:bg-black/55 text-white p-2"
              aria-label={t("services.slider.prev", "Sebelumnya")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="pointer-events-auto m-2 rounded-full bg-black/35 hover:bg-black/55 text-white p-2"
              aria-label={t("services.slider.next", "Berikutnya")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 py-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIdx(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === idx ? "bg-white" : "bg-white/50 hover:bg-white/80",
              ].join(" ")}
              aria-label={`${t("about.gotoSlide", "Ke slide")} ${i + 1}`}
              title={`${t("about.slide", "Slide")} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
