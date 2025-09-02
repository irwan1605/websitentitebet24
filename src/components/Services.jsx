import React from 'react';
export default function Services(){
return (
<section id="layanan" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
<div className="grid gap-6 lg:grid-cols-3">
{[{
t:'Konsultasi & Arsitektur', d:'Audit kebutuhan, perancangan pipeline, dan PoC cepat.'
},{
t:'Integrasi & SDK', d:'Integrasi kamera, CCTV, VMS, dan SDK untuk aplikasi Anda.'
},{
t:'Operasional & Support', d:'Monitoring, pelatihan, dan SLA sesuai kebutuhan.'
}].map(card=> (
<div key={card.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
<h3 className="font-semibold">{card.t}</h3>
<p className="mt-2 text-sm text-slate-600">{card.d}</p>
</div>
))}
</div>
</section>
);
}