// src/components/ContactForm.jsx
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// shadcn/ui (pastikan file2 ini ada di src/components/ui/)
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from "./ui/form";
  import Input from "./ui/input";
  import Textarea from "./ui/textarea";
  import Button from "./ui/button";

// ----- Validation schema (zod)
const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v.length >= 6, "Nomor terlalu pendek"),
  subject: z.string().min(4, "Subjek terlalu pendek").max(120, "Subjek terlalu panjang"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  // honeypot anti-bot (harus kosong)
  hp_field: z.string().length(0).optional(),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      hp_field: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const isValid = form.formState.isValid;

  // Ganti sesuai backend kamu (Next API/Express/dll)
  const endpoint = useMemo(() => "/api/contact", []);

  const onSubmit = async (values) => {
    // jika bot isi honeypot, hentikan
    if (values.hp_field) return;

    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success("Pesan terkirim. Kami akan menghubungi Anda secepatnya.");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim pesan. Coba lagi sesaat lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md p-6 md:p-8 text-white shadow-lg">
      <h3 className="text-xl md:text-2xl font-bold">Kirim Pesan</h3>
      <p className="mt-1 text-sm text-slate-200/80">
        Isi form di bawah ini dan tim kami akan segera merespons.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Honeypot (anti-bot) */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            {...form.register("hp_field")}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nama lengkap"
                    {...field}
                    className="bg-white/70 text-slate-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="nama@domain.com"
                    {...field}
                    className="bg-white/70 text-slate-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Telepon (opsional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+62 ..."
                    {...field}
                    className="bg-white/70 text-slate-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Subjek</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Perihal pesan"
                    {...field}
                    className="bg-white/70 text-slate-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Pesan</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Tulis pesan Anda..."
                    {...field}
                    className="bg-white/70 text-slate-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-200/70">
              Dengan mengirim, Anda menyetujui pemrosesan data sesuai kebijakan
              privasi kami.
            </p>

            <Button
              type="submit"
              disabled={!isValid || submitting}
              className="rounded-2xl bg-sky-500 hover:bg-sky-400"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Mengirim...
                </span>
              ) : (
                "Kirim Pesan"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
