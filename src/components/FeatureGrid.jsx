import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../lib/constants';


export default function FeatureGrid(){
return (
<section id="fitur" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
{FEATURES.map((f,i)=>(
<motion.div key={f.title} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.05*i,duration:0.3}} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 grid place-items-center">
<f.icon className="h-5 w-5"/>
</div>
<h3 className="font-semibold">{f.title}</h3>
</div>
<p className="mt-3 text-sm text-slate-600">{f.desc}</p>
</motion.div>
))}
</div>
</section>
);
}