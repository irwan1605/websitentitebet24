import React from 'react';
export default function Footer(){
return (
<footer className="border-t border-slate-200 bg-white/60">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3">
<p>© {new Date().getFullYear()} Naya Technological Indonesia. All rights reserved.</p>
<div className="flex items-center gap-4">
<a className="hover:text-slate-900" href="#tentang">Tentang</a>
<a className="hover:text-slate-900" href="#privacy">Privasi</a>
<a className="hover:text-slate-900" href="#terms">Syarat</a>
</div>
</div>
</footer>
);
}