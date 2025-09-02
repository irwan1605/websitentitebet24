import { Camera, MonitorSmartphone, LineChart, ShieldCheck, BadgeCheck, Cpu } from 'lucide-react';


export const NAV = [
{ id: 'beranda', label: 'Beranda' },
{ id: 'tentang', label: 'Tentang' },
{ id: 'fitur', label: 'Fitur' },
{ id: 'layanan', label: 'Layanan' },
{ id: 'kontak', label: 'Kontak' },
];


export const FEATURES = [
{ icon: Camera, title: 'Pengenalan Wajah CCTV', desc: 'Identifikasi wajah real‑time dari feed CCTV.' },
{ icon: MonitorSmartphone, title: 'Integrasi Webcam & Mobile', desc: 'SDK ringan untuk desktop & mobile.' },
{ icon: LineChart, title: 'Pencarian Foto/Video', desc: 'Pencarian individu dari arsip media.' },
{ icon: ShieldCheck, title: 'Keamanan & Privasi', desc: 'Enkripsi & kontrol akses berjenjang.' },
{ icon: BadgeCheck, title: 'Akurasi Terverifikasi', desc: 'Metrik FMR/TPR transparan.' },
{ icon: Cpu, title: 'Optimasi Edge', desc: 'Cepat & hemat daya di edge devices.' },
];