// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import About from "../components/About.jsx";
import AboutDevInternal from "../components/AboutDevInternal.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

// (opsional) kalau kamu pakai background global:
import NAYAAnimatedBiometricBackground from "../components/NAYAAnimatedBiometricBackground.jsx";

export default function Home() {
  const [hash, setHash] = useState(() => window.location.hash || "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    // inisialisasi juga saat mount
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isDevInternal = hash === "#dev";

  // Smooth scroll ke elemen yg sesuai hash (termasuk #devinternal)
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    // tunggu layout siap dulu
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash]);

  return (
    <div className="relative min-h-screen text-slate-900">
      {/* Background global (kalau dipakai) */}
      <NAYAAnimatedBiometricBackground
        imageUrl="/bg/fingeriris1.png"
        primary="#38bdf8"
        secondary="#a78bfa"
        density={1}
        speed={1}
        overlayOpacity={0.55}
      />

      <Header />
      <Hero />
      {isDevInternal ? <AboutDevInternal /> : <About />}
      <FeatureGrid />

      {/* ⬇️ Saat #devinternal, gantikan About dengan AboutDevInternal */}

      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
