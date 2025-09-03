import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FEATURES } from "../lib/constants";

const PALETTES = [
  { from: "from-sky-500",    to: "to-cyan-400",    glow: "rgba(56,189,248,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(56,189,248,0.6)]" },
  { from: "from-violet-500", to: "to-fuchsia-400", glow: "rgba(139,92,246,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(139,92,246,0.6)]" },
  { from: "from-emerald-500",to: "to-lime-400",    glow: "rgba(16,185,129,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(16,185,129,0.55)]" },
  { from: "from-amber-500",  to: "to-orange-400",  glow: "rgba(245,158,11,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(245,158,11,0.55)]" },
  { from: "from-rose-500",   to: "to-pink-400",    glow: "rgba(244,63,94,0.35)",   ring: "shadow-[0_0_50px_-15px_rgba(244,63,94,0.55)]" },
  { from: "from-indigo-500", to: "to-purple-400",  glow: "rgba(99,102,241,0.35)",  ring: "shadow-[0_0_50px_-15px_rgba(99,102,241,0.55)]" },
];

export default function FeatureGrid() {
  return (
    <section id="fitur" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
        <div className="md:text-2xl text-sm uppercase tracking-widest text-slate-200 font-semibold text-center p-4">
        FITUR KAMI
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature: f, index }) {
  const palette = PALETTES[index % PALETTES.length];
  const ref = useRef(null);

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={[
        "group relative overflow-hidden rounded-2xl border text-white",
        "border-white/10 bg-white/10 backdrop-blur p-5 shadow-sm",
        "transition-all duration-300",
      ].join(" ")}
      style={{
        background: `radial-gradient(600px circle at var(--mx, -100px) var(--my, -100px), ${palette.glow} 0%, transparent 60%)`,
        backgroundBlendMode: "screen",
      }}
    >
      {/* Glow ring lembut saat hover */}
      <div
        className={[
          "pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300",
          "group-hover:opacity-100",
          palette.ring,
        ].join(" ")}
      />

      <div className="flex items-center gap-3">
        {/* Icon capsule */}
        <div
          className={[
            "relative h-12 w-12 rounded-2xl p-[2px]",
            "bg-gradient-to-br", palette.from, palette.to,
            "transition-transform duration-300",
            "group-hover:scale-105 group-hover:rotate-1",
          ].join(" ")}
        >
          <div className="grid h-full w-full place-items-center rounded-2xl bg-white">
            {/* Biarkan ikon gelap agar kontras di dasar putih */}
            <f.icon className="h-6 w-6 text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:text-slate-900" />
          </div>
          <div
            className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
            style={{ background: `radial-gradient(120px circle at 50% 50%, ${palette.glow} 0%, transparent 70%)` }}
          />
        </div>

        <h3 className="font-semibold">{f.title}</h3>
      </div>

      <p className="mt-3 text-sm">{f.desc}</p>

      {/* Border highlight tipis saat hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: "rgba(255,255,255,0.25)" }}
      />
    </motion.div>
  );
}
