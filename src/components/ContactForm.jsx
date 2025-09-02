import React from 'react';
import { ChevronRight } from 'lucide-react';


export default function ContactForm(){
return (
<section id="kontak" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 pb-20">
<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
<h2 className="text-xl md:text-2xl font-bold">Hubungi Kami</h2>
<p className="mt-2 text-slate-600">Butuh demo atau konsultasi implementasi? Tinggalkan pesan Anda.</p>
<form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(e)=>e.preventDefault()}>
<input className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-4 ring-slate-100" placeholder="Nama" />
<input className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-4 ring-slate-100" placeholder="Email" />
<input className="sm:col-span-2 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-4 ring-slate-100" placeholder="Subjek" />
<textarea rows={4} className="sm:col-span-2 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-4 ring-slate-100" placeholder="Pesan" />
<div className="sm:col-span-2">
<button type="submit" className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm hover:bg-slate-800">Kirim Pesan <ChevronRight className="h-4 w-4"/></button>
</div>
</form>
</div>
</section>
);
}