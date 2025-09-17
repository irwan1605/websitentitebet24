// src/pages/HomeDevInternal.jsx
import React from "react";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import AboutDevInternal from "../components/AboutDevInternal.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import NAYAAnimatedBiometricBackground from "../components/NAYAAnimatedBiometricBackground.jsx";

export default function HomeDevInternal() {
  return (
    <div className="relative min-h-screen text-slate-900">
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
      <AboutDevInternal />
      <FeatureGrid />
      {/* HANYA BAGIAN INI YANG BERUBAH */}
      
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
