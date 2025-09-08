// src/components/ContactForm.jsx
import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

export default function ContactForm({ waNumber = "081460870870" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Format nomor ke 62xxxxxxxxxxx (WA requirement)
  const formatWhatsAppNumber = (num) => {
    const digits = (num || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("0")) return "62" + digits.slice(1);
    if (digits.startsWith("62")) return digits;
    if (digits.startsWith("8")) return "62" + digits; // ex: 822...
    return digits.replace(/^\+/, ""); // fallback: hilangkan '+'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const to = formatWhatsAppNumber(waNumber);
    if (!to) return;

    const lines = [
      "*Halo PT. Naya Technological Indonesia*",
      form.name ? `Nama: ${form.name}` : null,
      form.email ? `Email: ${form.email}` : null,
      form.subject ? `Perihal: ${form.subject}` : null,
      form.message ? `Pesan:\n${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/${to}?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl border border-white/10
        bg-white/70 dark:bg-slate-900/60
        backdrop-blur-md shadow-lg
        p-6 md:p-8
        text-slate-800 dark:text-slate-100
        space-y-4
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium">Nama</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Nama lengkap"
            className="mt-1 w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="email@domain.com"
            className="mt-1 w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">Perihal</span>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={onChange}
          placeholder="Topik pesan"
          className="mt-1 w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Pesan</span>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Tulis pesan Anda di sini…"
          rows={5}
          required
          className="mt-1 w-full rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          className="
            inline-flex items-center gap-2 rounded-2xl
            bg-emerald-500 hover:bg-emerald-400
            px-5 py-3 text-white text-sm font-semibold
            shadow-lg shadow-emerald-500/25 transition
          "
          aria-label="Kirim pesan via WhatsApp"
          title="Kirim pesan via WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          Kirim Pesan
        </button>

        {/* Tombol alternatif (mailto) jika ingin, bisa dihapus */}
        {/* <a
          href={`mailto:contact@nayatechnologi.id?subject=${encodeURIComponent(form.subject || "")}&body=${encodeURIComponent(form.message || "")}`}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 hover:bg-sky-400 px-5 py-3 text-white text-sm font-semibold transition"
        >
          <Send className="h-5 w-5" />
          Kirim via Email
        </a> */}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400"></p>
    </form>
  );
}
