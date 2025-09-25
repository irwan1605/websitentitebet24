import React from "react";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

// import background animasi
import NAYAAnimatedBiometricBackground from "../components/NAYAAnimatedBiometricBackground.jsx";


export default function Home() {
  return (
    <div className="relative min-h-screen text-slate-900">
      {/* background animasi biometrik */}
      <NAYAAnimatedBiometricBackground
        imageUrl="/bg/fingeriris1.png"
        primary="#38bdf8"
        secondary="#a78bfa"
        density={1}
        speed={1}
        overlayOpacity={0.55}
      />

      {/* konten website */}
      <Header />  
      <Hero />   
      <About />
      <FeatureGrid />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
