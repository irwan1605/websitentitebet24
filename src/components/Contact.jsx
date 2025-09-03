// src/components/Contact.jsx
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import ContactForm from "./ContactForm";

export default function Contact({
  imageSrc = "/company/nti-company.png",
  companyName = "PT. Naya Technological Indonesia",
  address = "JL. TEBET RAYA NO.24, SOUTH JAKARTA",
  mapUrl = "https://maps.google.com/?q=JL.TEBET RAYA NO.24, SOUTH JAKARTA",
  email = "contact@nayatechnologi.id",
  phone = "+62 21-XXXX-XXXX",
}) {
  const [glow, setGlow] = useState(false);

  const toggleGlow = useCallback(() => setGlow((v) => !v), []);
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleGlow();
      }
    },
    [toggleGlow]
  );

  return (
    <section
      id="kontak"
      aria-label="Kontak Perusahaan"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      {/* Grid: Info card & Image */}
      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md p-6 md:p-8 text-white shadow-lg">
        {/* --- Kartu info perusahaan --- */}
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md p-6 md:p-8 text-white shadow-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold">Hubungi Kami</h2>
          <p className="mt-2 text-slate-200/90">{companyName}</p>

          <div className="mt-6 space-y-4 text-slate-200/90">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-sky-400 shrink-0" />
              <div>
                <div className="font-medium">Alamat</div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  {address}
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-sky-400 shrink-0" />
              <div>
                <div className="font-medium">Email</div>
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-sky-400 shrink-0" />
              <div>
                <div className="font-medium">Telepon</div>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                  {phone}
                </a>
                <div className="text-xs opacity-70">
                  *Ganti dengan nomor operasional
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
          <a
              href="https://mail.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 text-white px-5 py-3 text-sm hover:bg-sky-400 transition"
              aria-label="Buka Gmail"
              title="Buka Gmail"
            >
              Kirim Email
            </a>

            {/*
              Jika ingin langsung ke jendela COMPOSE dengan penerima:
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 text-white px-5 py-3 text-sm hover:bg-sky-400 transition"
              >
                Kirim Email
              </a>
            */}
          </div>
        </div>

        {/* --- Gambar: klik = glow/shadow --- */}
        <motion.figure
          role="button"
          aria-label="Gambar perusahaan, klik untuk efek cahaya"
          tabIndex={0}
          onClick={toggleGlow}
          onKeyDown={handleKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative rounded-3xl overflow-hidden cursor-pointer select-none"
        >
        </motion.figure>
      </div>

      {/* --- FORM di bawah grid --- */}
      <div className="mt-10 lg:mt-14">
        <ContactForm />
      </div>
    </section>
  );
}
