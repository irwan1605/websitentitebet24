import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Globe2, CheckCircle, X } from "lucide-react";
import NAYAAnimatedBiometricBackground from "./NAYAAnimatedBiometricBackground.jsx"; // sesuaikan path

export default function Hero() {
  const scanItems = [
    // {
    //   key: "biometric",
    //   label: "Biometric",
    //   img: "/icons/biometric.svg",
    //   desc:
    //     "Biometric adalah autentikasi berbasis ciri unik manusia (wajah, sidik jari, iris, suara). Keunggulan: sulit dipalsukan, cepat, dan nyaman tanpa perlu mengingat kata sandi.",
    // },
    {
      key: "fingerprint",
      label: "Fingerprint",
      img: "/icons/fingerprint.svg",
      desc: "Fingerprint mengenali pola minutiae (ridge ending & bifurcation) pada sidik jari. Banyak dipakai untuk absensi, akses kontrol, hingga perbankan karena cepat dan ekonomis.",
    },
    {
      key: "iris",
      label: "Iris",
      img: "/icons/iris.svg",
      desc: "Iris recognition membaca tekstur unik pada iris menggunakan cahaya NIR. Akurasinya sangat tinggi, cocok untuk skenario keamanan kritikal dan identifikasi massal.",
    },
  ];

  const [openKey, setOpenKey] = useState(null);
  const current = scanItems.find((s) => s.key === openKey) || null;

  // --- A11y: ESC untuk tutup
  const onEsc = useCallback((e) => {
    if (e.key === "Escape") setOpenKey(null);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  // --- A11y: Focus trap & kunci scroll saat modal terbuka
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!current) return;

    // Lock scroll body
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus ke tombol close
    const to = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

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
      id="beranda"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14"
    >
      {/* Hapus komponen ini jika background sudah dipasang global di layout/Home */}
      <NAYAAnimatedBiometricBackground
        imageUrl="/bg/fingeriris1.png"
        primary="#38bdf8"
        secondary="#a78bfa"
        density={1}
        speed={1}
        overlayOpacity={0.55}
      />

      <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Kiri: headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm uppercase tracking-widest text-slate-200 font-semibold">
            Technology Biometric • NAYA TECHNOLOGICAL INDONESIA
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Selamat Datang di
            <span className="block text-sky-400">
              NAYA TECHNOLOGICAL INDONESIA
            </span>
          </h1>
          <p className="mt-3 text-slate-200 leading-relaxed max-w-xl">
            Kami Perusahaan yang bergerak di bidang teknologi software dan
            hardware secara global adalah bisnis yang merancang, memproduksi,
            dan menjual solusi terpadu—perangkat (device/sensor/board) beserta
            perangkat lunak (firmware, aplikasi, cloud/API)—serta mengoperasikan
            R&D, manufaktur, distribusi, pemasaran, dan dukungan purna jual Domestik dan 
            lintas negara.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 text-white px-5 py-3 text-sm hover:bg-slate-800/90 backdrop-blur-sm"
            >
              Konsultasi Gratis <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#fitur"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/40 bg-white/80 backdrop-blur-sm px-5 py-3 text-sm hover:bg-slate-50/90"
            >
              Lihat Fitur <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-200">
            <Globe2 className="h-4 w-4" />
            <span>Implementasi di perusahaan & institusi publik.</span>
          </div>
        </motion.div>

        {/* Kanan: kartu dengan grid 2 kolom; mobile-friendly (tanpa hidden) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="rounded-3xl border border-slate-200/30 bg-white/80 shadow-sm overflow-hidden backdrop-blur-sm"
        >
          <div className="aspect-[16] grid md:grid-cols-2">
            {/* Panel kiri: GRID 2 kolom, mobile visible */}
            <div className="block bg-gradient-to-b from-slate-900 to-slate-700 text-slate-100 p-6">
              <div className="text-xs uppercase tracking-widest opacity-80">
                Scanning TECHNOLOGICAL
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 md:gap-16">
                {scanItems.map((it) => (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => setOpenKey(it.key)}
                    className="group relative h-20 md:h-24 w-full rounded-xl border border-slate-500/40 bg-white/5 overflow-hidden transition focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                  >
                    {/* Gambar */}
                    <img
                      src={it.img}
                      alt={it.label}
                      className="absolute inset-0 h-full w-full object-contain p-3 opacity-90 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                      onError={(e) => (e.currentTarget.style.opacity = 0.2)}
                    />

                    {/* Overlay gradient + glow saat hover */}
                    <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80 group-hover:from-emerald-500/25 group-hover:via-emerald-500/10" />

                    {/* Ring + shadow glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition-all group-hover:ring-2 group-hover:ring-emerald-400/60 group-hover:shadow-[0_0_36px_rgba(16,185,129,0.45)]" />

                    {/* Label + ceklist di dalam kotak */}
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

            {/* Panel kanan: gambar/brand */}
            <div className="relative bg-slate-100/70 flex items-center justify-center py-10">
  <img
    src="/bg/logotansparannti.png"
    alt="Logo NTI"
    className="w-[80%] h-auto object-contain"
  />
</div>
          </div>
        </motion.div>
      </div>

      {/* Modal/Card detail dengan fade-in/out lembut + focus trap */}
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
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* card */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.33, ease: "easeOut" }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/90 to-slate-800/90 text-slate-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-5 border-b border-white/10">
                <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center ring-1 ring-white/10 shadow-inner">
                  <img
                    src={current.img}
                    alt={current.label}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <h3 id="tech-title" className="text-lg font-semibold">
                  {current.label} Technology
                </h3>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5">
                <p id="tech-desc" className="leading-relaxed text-slate-200/90">
                  {current.desc}
                </p>

                <div className="mt-5 flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">
                    Verified feature by NAYA Technological Indonesia
                  </span>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 text-white px-4 py-2 text-sm hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  Tutup
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
