// src/components/About.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  // Letak file: public/slide/<nama file>
  "slide1.jpg",
  "slide2.jpg",
  "slide3.jpg",
  "slide4.jpg",
];

export default function About() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % SLIDES.length);
  }, []);
  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || SLIDES.length <= 1) return;
    timerRef.current = setInterval(next, 2000); // 2 detik
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  return (
    <section
      id="tentang"
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-16"
    >
      <div className="md:text-2xl text-sm uppercase tracking-widest text-slate-200 font-semibold text-center p-4">
        TENTANG KAMI
      </div>

      {/* Slider */}
     

      {/* Card deskripsi */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-sky-50 p-6 lg:p-10">
        <h2 className="text-xl md:text-2xl text-center font-bold">
          PT. NAYA TECHNOLOGICAL INDONESIA
        </h2>
        <p className="mx-auto p-4 mt-2 text-slate-800 leading-relaxed max-w-3xl">
          Kami Perusahaan yang bergerak di bidang teknologi software dan
          hardware secara global adalah bisnis yang merancang, memproduksi, dan
          menjual solusi terpadu—perangkat (device/sensor/board) beserta
          perangkat lunak (firmware, aplikasi, cloud/API)—serta mengoperasikan
          R&amp;D, manufaktur, distribusi, pemasaran, dan dukungan purna jual lintas
          Domestik dan negara. “Menuju internasional” berarti menyiapkan produk
          dan operasional agar siap dipasarkan di banyak negara: lokalisasi
          bahasa/mata uang, arsitektur multi-zona waktu, jaringan
          mitra/distributor, rantai pasok regional, serta kepatuhan sertifikasi
          (mis. CE/FCC/RoHS) dan regulasi data (mis. GDPR/PDPA). Model bisnisnya
          umumnya menggabungkan penjualan perangkat dengan langganan layanan
          software/SaaS dan pembaruan OTA, sehingga dapat menskalakan pendapatan
          dan layanan secara konsisten di pasar global
        </p>

        <div
        className="group relative mb-6 p-4 overflow-hidden rounded-3xl border border-white/10 bg-black/10 backdrop-blur"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Galeri foto perusahaan"
      >
        {/* Track images */}
        <div className="relative h-[220px] sm:h-[300px] lg:h-[380px]">
          {SLIDES.map((file, i) => (
            <img
              key={file}
              src={`/slide/${file}`}
              alt={`Slide ${i + 1}`}
              className={[
                "absolute inset-0 h-full w-full object-cover",
                "transition-opacity duration-700 ease-out",
                i === idx ? "opacity-100" : "opacity-0",
              ].join(" ")}
              onError={(e) => {
                // kalau gambar belum ada, biar gak jelek
                e.currentTarget.style.opacity = 0.2;
              }}
            />
          ))}

          {/* overlay gradient untuk kontras */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>

        {/* Controls kiri/kanan (muncul saat hover) */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-800 shadow hover:bg-white transition opacity-0 group-hover:opacity-100"
          aria-label="Sebelumnya"
          title="Sebelumnya"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-800 shadow hover:bg-white transition opacity-0 group-hover:opacity-100"
          aria-label="Berikutnya"
          title="Berikutnya"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === idx ? "bg-white" : "bg-white/50 hover:bg-white/80",
              ].join(" ")}
              aria-label={`Ke slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
