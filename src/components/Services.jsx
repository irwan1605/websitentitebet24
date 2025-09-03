// src/components/Services.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CircuitBoard, PlugZap, LifeBuoy } from "lucide-react";

const CARDS = [
  { t: "Konsultasi & Arsitektur", d: "Audit kebutuhan, perancangan pipeline, dan PoC cepat.", icon: CircuitBoard },
  { t: "Integrasi & SDK",        d: "Integrasi kamera, CCTV, VMS, dan SDK untuk aplikasi Anda.", icon: PlugZap },
  { t: "Operasional & Support",  d: "Monitoring, pelatihan, dan SLA sesuai kebutuhan.", icon: LifeBuoy },
];

const PALETTES = [
  { from: "from-sky-500",    to: "to-cyan-400",    glow: "rgba(56,189,248,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(56,189,248,0.55)]" },
  { from: "from-violet-500", to: "to-fuchsia-400", glow: "rgba(139,92,246,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(139,92,246,0.55)]" },
  { from: "from-emerald-500",to: "to-lime-400",    glow: "rgba(16,185,129,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(16,185,129,0.55)]" },
];

export default function Services() {
  return (
    <section id="layanan" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
     <div className="md:text-2xl text-sm uppercase tracking-widest text-slate-200 font-semibold text-center p-4">LAYANAN KAMI</div>
      <div className="grid gap-6 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <ServiceCard key={card.t} card={card} index={i} />
        ))}
      </div>
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
        background: `radial-gradient(600px circle at var(--mx, -100px) var(--my, -100px), ${palette.glow} 0%, transparent 60%)`,
        backgroundBlendMode: "screen",
      }}
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
            "bg-gradient-to-br", palette.from, palette.to,
            "transition-transform duration-300",
            "group-hover:scale-105 group-hover:rotate-1",
          ].join(" ")}
        >
          <div className="grid h-full w-full place-items-center rounded-2xl bg-white">
            {/* ikon gelap agar kontras di dasar putih */}
            <Icon className="h-6 w-6 text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:text-slate-900" />
          </div>
          <div
            className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
            style={{ background: `radial-gradient(120px circle at 50% 50%, ${palette.glow} 0%, transparent 70%)` }}
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
