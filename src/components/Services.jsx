// src/components/Services.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircuitBoard, PlugZap, LifeBuoy, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const PALETTES = [
  {
    from: "from-sky-500",
    to: "to-cyan-400",
    glow: "rgba(56,189,248,0.35)",
    ring: "shadow-[0_0_50px_-15px_rgba(56,189,248,0.55)]",
  },
  {
    from: "from-violet-500",
    to: "to-fuchsia-400",
    glow: "rgba(139,92,246,0.35)",
    ring: "shadow-[0_0_50px_-15px_rgba(139,92,246,0.55)]",
  },
  {
    from: "from-emerald-500",
    to: "to-lime-400",
    glow: "rgba(16,185,129,0.35)",
    ring: "shadow-[0_0_50px_-15px_rgba(16,185,129,0.55)]",
  },
];

export default function Services() {
  const { t } = useLanguage();

  // Susun isi card dari kamus i18n (dua bahasa)
  const CARDS = useMemo(
    () => [
      {
        key: "consult",
        icon: CircuitBoard,
        title: t("services.cards.consult.title", "Konsultasi & Arsitektur"),
        desc: t(
          "services.cards.consult.desc",
          "Audit kebutuhan, perancangan pipeline, dan PoC cepat."
        ),
      },
      {
        key: "sdk",
        icon: PlugZap,
        title: t("services.cards.sdk.title", "Integrasi & SDK"),
        desc: t(
          "services.cards.sdk.desc",
          "Integrasi kamera, CCTV, VMS, dan SDK untuk aplikasi Anda."
        ),
      },
      {
        key: "support",
        icon: LifeBuoy,
        title: t("services.cards.support.title", "Operasional & Support"),
        desc: t(
          "services.cards.support.desc",
          "Monitoring, pelatihan, dan SLA sesuai kebutuhan."
        ),
      },
    ],
    [t]
  );

  // Modal state
  const [openKey, setOpenKey] = useState(null);
  const current = CARDS.find((c) => c.key === openKey) || null;

  // Tutup modal via ESC
  const onEsc = useCallback((e) => {
    if (e.key === "Escape") setOpenKey(null);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  // Focus trap + lock scroll ketika modal terbuka
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

  return (
    <section
      id="layanan"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16"
    >
      <div className="md:text-2xl text-sm uppercase tracking-widest text-slate-200 font-semibold text-center p-4">
        {t("services.title", "LAYANAN KAMI")}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <ServiceCard
            key={card.key}
            card={card}
            index={i}
            onOpen={() => setOpenKey(card.key)}
          />
        ))}
      </div>

      {/* Modal detail layanan */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
            onClick={() => setOpenKey(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* card */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/90 to-slate-800/90 text-slate-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-center gap-3 p-5 border-b border-white/10">
                <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center ring-1 ring-white/10 shadow-inner">
                  <current.icon className="h-6 w-6 text-white/90" />
                </div>
                <h3 id="service-title" className="text-lg font-semibold">
                  {current.title}
                </h3>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                  aria-label={t("common.close", "Tutup")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* body */}
              <div className="p-5">
                <p className="leading-relaxed text-slate-200/90">
                  {current.desc}
                </p>
              </div>

              {/* garis putih tipis di atas tombol */}
              <div className="h-px w-full bg-white/10" />

              {/* actions */}
              <div className="p-5 pt-4 flex items-center justify-end gap-3">
                <a
                  href="#kontak"
                  onClick={() => setOpenKey(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-white/5 px-4 py-2 text-sm text-sky-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  {t("contact.contactUs", "Hubungi Kami")}
                </a>
                <button
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 text-white px-4 py-2 text-sm hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  {t("common.close", "Tutup")}
                </button>
              </div>

              {/* glow frame */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 shadow-[0_0_60px_rgba(56,189,248,0.2)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCard({ card, index, onOpen }) {
  const palette = PALETTES[index % PALETTES.length];
  const ref = useRef(null);
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
    <motion.button
      type="button"
      onClick={onOpen}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={[
        "text-left group relative overflow-hidden rounded-2xl border text-white",
        "border-white/10 bg-white/10 backdrop-blur p-6 shadow-sm",
        "transition-all duration-300 w-full",
      ].join(" ")}
      style={{
        background: `radial-gradient(600px circle at var(--mx, -100px) var(--my, -100px), ${palette.glow} 0%, transparent 60%)`,
        backgroundBlendMode: "screen",
      }}
      aria-label={card.title}
    >
      {/* Soft outer glow */}
      <div
        className={[
          "pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300",
          "group-hover:opacity-100",
          palette.ring,
        ].join(" ")}
      />

      <div className="flex items-center gap-3">
        {/* Icon capsule gradient */}
        <div
          className={[
            "relative h-12 w-12 rounded-2xl p-[2px]",
            "bg-gradient-to-br",
            palette.from,
            palette.to,
            "transition-transform duration-300",
            "group-hover:scale-105 group-hover:rotate-1",
          ].join(" ")}
        >
          <div className="grid h-full w-full place-items-center rounded-2xl bg-white">
            <Icon className="h-6 w-6 text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:text-slate-900" />
          </div>
          <div
            className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
            style={{
              background: `radial-gradient(120px circle at 50% 50%, ${palette.glow} 0%, transparent 70%)`,
            }}
          />
        </div>

        <h3 className="font-semibold">{card.title}</h3>
      </div>

      <p className="mt-2 text-sm">{card.desc}</p>

      {/* Border highlight tipis saat hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: "rgba(255,255,255,0.25)" }}
      />
    </motion.button>
  );
}
