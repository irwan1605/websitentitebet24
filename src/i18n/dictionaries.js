// src/i18n/dictionaries.js
// Kamus lengkap EN/ID untuk semua kunci yang dipakai komponen.
// Gunakan via: const { t } = useLanguage(); t("path.to.key")

export const dictionaries = {
  
  id: {

    search: {
      placeholder: "Cari apa saja di situs ini…",
      empty: "Ketik untuk mulai mencari…",
      noResults: "Tidak ada hasil yang cocok.",
      none: "Tidak ada hasil. Coba kata kunci lain.", // ⬅️ ditambahkan
      ctaSearch: "Cari",
    },

    brand: "NAYA TECHNOLOGICAL INDONESIA",

    nav: {
      home: "Beranda",
      about: "Tentang",
      features: "Fitur",
      services: "Layanan",
      contact: "Kontak",
    },

    // ---- HERO ----
    hero: {
      kicker: "Technology Fingerprint dan Iris • NAYA TECHNOLOGICAL INDONESIA",
      welcome: "Selamat Datang di",
      body:
        "Kami Perusahaan yang bergerak di bidang teknologi software dan hardware secara global adalah bisnis yang merancang, memproduksi, dan menjual solusi terpadu—perangkat (device/sensor/board) beserta perangkat lunak (firmware, aplikasi, cloud/API)—serta mengoperasikan R&D, manufaktur, distribusi, pemasaran, dan dukungan purna jual Domestik dan lintas negara.",
      ctaConsult: "Konsultasi Gratis",
      ctaFeatures: "Lihat Fitur",
      implementLine: "Implementasi di perusahaan & institusi publik.",
      scan: {
        heading: "Scanning TECHNOLOGICAL",
        fingerprint: {
          label: "Fingerprint",
          modalTitle: "Teknologi Fingerprint",
          desc:
            "Fingerprint mengenali pola minutiae (ridge ending & bifurcation) pada sidik jari. Banyak dipakai untuk absensi, akses kontrol, hingga perbankan karena cepat dan ekonomis.",
        },
        iris: {
          label: "Iris",
          modalTitle: "Teknologi Iris",
          desc:
            "Iris recognition membaca tekstur unik pada iris menggunakan cahaya NIR. Akurasinya sangat tinggi, cocok untuk skenario keamanan kritikal dan identifikasi massal.",
        },
      },
      verified: "Fitur terverifikasi oleh NAYA Technological Indonesia",
    },

    // ---- ABOUT ----
    about: {
      title: "TENTANG KAMI",
      companyTitle: "PT. NAYA TECHNOLOGICAL INDONESIA",
      body:
        "Kami Perusahaan yang bergerak di bidang teknologi software dan hardware secara global adalah bisnis yang merancang, memproduksi, dan menjual solusi terpadu—perangkat (device/sensor/board) beserta perangkat lunak (firmware, aplikasi, cloud/API)—serta mengoperasikan R&D, manufaktur, distribusi, pemasaran, dan dukungan purna jual lintas Domestik dan negara. “Menuju internasional” berarti menyiapkan produk dan operasional agar siap dipasarkan di banyak negara: lokalisasi bahasa/mata uang, arsitektur multi-zona waktu, jaringan mitra/distributor, rantai pasok regional, serta kepatuhan sertifikasi (mis. CE/FCC/RoHS) dan regulasi data (mis. GDPR/PDPA). Model bisnisnya umumnya menggabungkan penjualan perangkat dengan langganan layanan software/SaaS dan pembaruan OTA, sehingga dapat menskalakan pendapatan dan layanan secara konsisten di pasar global",
      galleryAria: "Galeri foto perusahaan",
      slide: "Slide",
      prev: "Sebelumnya",
      next: "Berikutnya",
      gotoSlide: "Ke slide",
    },

    // ---- FEATURES ----
    features: {
      title: "FITUR KAMI",
      items: {
        camera: {
          title: "Perangkat (device/sensor/board) ",
          desc: "Pengadaan perangkat lunak (firmware, aplikasi, cloud/API).",
          modalTitle: "Perangkat & Modul Siap Produksi",
          detail:
            "Rangkaian perangkat keras dan modul siap produksi dengan dukungan konektivitas standar industri, sertifikasi, serta pembaruan OTA.",
          bullets: {
            1: "Sensor kamera, modul fingerprint/iris, board MCU/SoC siap produksi.",
            2: "Konektivitas USB/Serial/Ethernet/Wi-Fi; protokol RTSP/ONVIF/MQTT.",
            3: "Sertifikasi CE/FCC/RoHS; panduan instalasi & keselamatan.",
            4: "Pembaruan firmware OTA & manajemen perangkat terpusat.",
          },
        },
        monitorsmartphone: {
          title: "mengoperasikan R&D dan Manufaktur ",
          desc: "SDK ringan untuk desktop & mobile.",
          modalTitle: "Operasi R&D & Manufaktur",
          detail:
            "Alur R&D cepat dari PoC ke produksi, dokumentasi teknis lengkap, serta praktik manufaktur terbaik untuk kualitas yang konsisten.",
          bullets: {
            1: "Riset & prototyping cepat (PoC → pilot → produksi).",
            2: "Desain manufaktur (DFM/DFA), SOP QC, dan jig pengujian.",
            3: "Dokumentasi teknis: skematik, BOM, gerber, dan datasheet.",
            4: "Pelacakan versi & jejak unit (serial number / lot).",
          },
        },
        linechart: {
          title: "Distribusi dan Pemasaran",
          desc: "Pencarian individu dari arsip media.",
          modalTitle: "Distribusi & Pemasaran",
          detail:
            "Ekspansi pasar melalui jaringan mitra, aset pemasaran yang kuat, serta dukungan layanan purna jual nasional.",
          bullets: {
            1: "Jaringan distribusi nasional & mitra global.",
            2: "Aset pemasaran: brand kit, brosur, video, dan demo app.",
            3: "Skema garansi, proses RMA, dan pusat layanan.",
            4: "Laporan penjualan & analitik kanal.",
          },
        },
        security: {
          title: "Keamanan & Privasi",
          desc: "Enkripsi & kontrol akses berjenjang.",
          modalTitle: "Keamanan & Privasi",
          detail:
            "Perlindungan data komprehensif dengan enkripsi menyeluruh, kontrol akses ketat, serta audit trail yang transparan.",
          bullets: {
            1: "Enkripsi at-rest & in-transit (AES-256/TLS).",
            2: "RBAC, SSO/OIDC, dan rotasi kredensial/secret.",
            3: "Audit log, tamper detection, dan alerting.",
            4: "Kepatuhan GDPR/PDPA; opsi on-prem.",
          },
        },
        accuracy: {
          title: "Akurasi Terverifikasi",
          desc: "Metrik FMR/TPR transparan.",
          modalTitle: "Akurasi Terverifikasi",
          detail:
            "Akurasi tinggi yang divalidasi dengan metodologi terbuka, dataset beragam, dan laporan benchmark berkala.",
          bullets: {
            1: "Uji FMR/TPR/ROC transparan di dataset beragam.",
            2: "Kalibrasi perangkat & normalisasi pencahayaan.",
            3: "Anti-spoof/liveness untuk cegah penipuan.",
            4: "Benchmark berkala & laporan akurasi.",
          },
        },
        speed: {
          title: "Optimasi Edge",
          desc: "Cepat & hemat daya di edge devices.",
          modalTitle: "Optimasi Kinerja di Edge",
          detail:
            "Arsitektur yang dioptimalkan untuk perangkat edge: latensi rendah, hemat daya, namun tetap presisi.",
          bullets: {
            1: "Optimasi SIMD/NEON, offload GPU/NPU bila tersedia.",
            2: "Kuantisasi INT8, pruning, dan caching fitur.",
            3: "Latensi <50 ms untuk verifikasi real-time.",
            4: "Profiling ujung-ke-ujung & fallback mulus.",
          },
        },
      },
    },

    // ---- SERVICES (Cards + slider + modal) ----
    services: {
      title: "LAYANAN KAMI",
      sliderTitle: "Showcase Layanan",
      cards: {
        consult: {
          title: "Konsultasi & Arsitektur",
          desc: "Audit kebutuhan, perancangan pipeline, dan PoC cepat.",
        },
        bullets: {
          1: "Optimasi SIMD/NEON, offload GPU/NPU bila tersedia.",
          2: "Kuantisasi INT8, pruning, dan caching fitur.",
          3: "Latensi <50 ms untuk verifikasi real-time.",
          4: "Profiling ujung-ke-ujung & fallback mulus.",
        },
        sdk: {
          title: "Integrasi & SDK",
          desc: "Integrasi kamera, CCTV, VMS, dan SDK untuk aplikasi Anda.",
        },
        support: {
          title: "Operasional & Support",
          desc: "Monitoring, pelatihan, dan SLA sesuai kebutuhan.",
        },
      },
      modal: {
        header: "Detail Layanan",
        consult: {
          title: "Konsultasi & Arsitektur",
          body:
            "Kami membantu memetakan kebutuhan, menyusun arsitektur solusi end-to-end, menyiapkan PoC, serta memberikan rekomendasi teknologi yang tepat sasaran.",
        },
        sdk: {
          title: "Integrasi & SDK",
          body:
            "Integrasikan kamera, CCTV, VMS, dan SDK biometrik kami ke aplikasi Anda dengan cepat. Kami sediakan panduan, contoh kode, dan dukungan teknis.",
        },
        support: {
          title: "Operasional & Support",
          body:
            "Layanan pemantauan, pelatihan operator, dan SLA fleksibel. Kami pastikan sistem tetap andal dan terukur di lingkungan produksi.",
        },
      },
    },

    contact: {
      title: "KONTAK KAMI",
      heading: "Hubungi Kami",
      contactUs: "Hubungi Kami",
      ariaSection: "Kontak Perusahaan",
      addressLabel: "Alamat",
      phoneLabel: "Telepon",
      openMapTitle: "Buka lokasi di Google Maps",
      openGmailAria: "Buka Gmail",
      openGmailTitle: "Buka Gmail",
      openMapAriaPrefix: "Buka lokasi",
      onGoogleMaps: "di Google Maps",
      clickToOpenMap: "Klik untuk membuka Google Maps",
      mapPreviewTitle: "Google Maps Preview",
      locationLabel: "Lokasi",
      viewInMaps: "Lihat di Maps",
      sendEmailBtn: "Kirim Email",
    },

    contactForm: {
      waHeader: "Halo PT. Naya Technological Indonesia",
      nameLabel: "Nama",
      namePh: "Nama lengkap",
      emailLabel: "Email",
      emailPh: "email@domain.com",
      subjectLabel: "Perihal",
      subjectPh: "Topik pesan",
      messageLabel: "Pesan",
      messagePh: "Tulis pesan Anda di sini…",
      sendBtn: "Kirim Pesan",
      sendViaWAAria: "Kirim pesan via WhatsApp",
      sendViaWATitle: "Kirim pesan via WhatsApp",
    },

    // ---- FOOTER ----
    footer: {
      rights: "Seluruh hak dilindungi.",
      links: {
        about: "Tentang",
        privacy: "Privasi",
        terms: "Syarat",
      },
    },

    // ---- COMMON ----
    common: {
      close: "Tutup",
    },
  },

  // =====================================================================

  en: {

    search: {
      placeholder: "Search anything on this site…",
      empty: "Type to start searching…",
      noResults: "No matching results.",
      none: "No results. Try another keyword.", // ⬅️ ditambahkan
      ctaSearch: "Search",
    },

    brand: "NAYA TECHNOLOGICAL INDONESIA",

    nav: {
      home: "Home",
      about: "About",
      features: "Features",
      services: "Services",
      contact: "Contact",
    },

    // ---- HERO ----
    hero: {
      kicker: "Biometric Technology • NAYA TECHNOLOGICAL INDONESIA",
      welcome: "Welcome to",
      body:
        "We operate globally across software and hardware: designing, manufacturing, and delivering integrated solutions—devices (sensors/boards) together with software (firmware, apps, cloud/APIs)—while running R&D, manufacturing, distribution, marketing, and after-sales support across countries.",
      ctaConsult: "Free Consultation",
      ctaFeatures: "See Features",
      implementLine: "Deployed in enterprises & public institutions.",
      scan: {
        heading: "TECHNOLOGICAL Scanning",
        fingerprint: {
          label: "Fingerprint",
          modalTitle: "Fingerprint Technology",
          desc:
            "Fingerprint recognizes minutiae patterns (ridge endings & bifurcations). Popular for attendance, access control, and banking thanks to its speed and cost-efficiency.",
        },
        iris: {
          label: "Iris",
          modalTitle: "Iris Technology",
          desc:
            "Iris recognition reads the unique iris texture using NIR illumination. Extremely accurate, ideal for critical security and large-scale identification.",
        },
      },
      verified: "Feature verified by NAYA Technological Indonesia",
    },

    // ---- ABOUT ----
    about: {
      title: "ABOUT US",
      companyTitle: "PT. NAYA TECHNOLOGICAL INDONESIA",
      body:
        "We operate globally in software and hardware—designing, producing, and delivering integrated solutions (devices with software) while running R&D, manufacturing, distribution, marketing, and after-sales across countries. Going international means preparing products and operations for multi-country markets: localization, multi-timezone architecture, partner/distributor networks, regional supply chains, and compliance with certifications (e.g., CE/FCC/RoHS) and data regulations (e.g., GDPR/PDPA). The model typically combines device sales with software/SaaS subscriptions and OTA updates to scale revenue worldwide.",
      galleryAria: "Company photo gallery",
      slide: "Slide",
      prev: "Previous",
      next: "Next",
      gotoSlide: "Go to slide",
    },

     // ---- FEATURES ----
     features: {
      title: "OUR FEATURES",
      items: {
        camera: {
          title: "Devices (device/sensor/board)",
          desc: "Software procurement (firmware, apps, cloud/API).",
          modalTitle: "Devices & Modules Ready for Production",
          detail:
            "Comprehensive hardware modules with industry-standard connectivity, certifications, and OTA update support.",
          bullets: {
            1: "Camera sensors, fingerprint/iris modules, MCU/SoC boards ready for production.",
            2: "USB/Serial/Ethernet/Wi-Fi connectivity; RTSP/ONVIF/MQTT protocols.",
            3: "CE/FCC/RoHS compliance; installation & safety guides.",
            4: "OTA firmware updates & centralized device management.",
          },
        },
        monitorsmartphone: {
          title: "Operating R&D and Manufacturing",
          desc: "Lightweight SDK for desktop & mobile.",
          modalTitle: "R&D Operations & Manufacturing",
          detail:
            "Fast R&D cycle from PoC to production, complete technical docs, and best practices for consistent quality.",
          bullets: {
            1: "Rapid R&D (PoC → pilot → production).",
            2: "Manufacturing design (DFM/DFA), QC SOPs, and test jigs.",
            3: "Technical docs: schematics, BOM, gerbers, and datasheets.",
            4: "Versioning & unit traceability (serial number / lot).",
          },
        },
        linechart: {
          title: "Distribution and Marketing",
          desc: "Individual search from media archives.",
          modalTitle: "Distribution & Marketing",
          detail:
            "Market expansion via partner networks, strong marketing assets, and nationwide after-sales support.",
          bullets: {
            1: "Nationwide distribution and global partners.",
            2: "Marketing assets: brand kit, brochures, videos, and demo apps.",
            3: "Warranty, RMA workflows, and service centers.",
            4: "Sales reporting and channel analytics.",
          },
        },
        security: {
          title: "Security & Privacy",
          desc: "Encryption & layered access control.",
          modalTitle: "Security & Privacy",
          detail:
            "Comprehensive data protection with end-to-end encryption, strict access control, and transparent audit trails.",
          bullets: {
            1: "Encryption at rest & in transit (AES-256/TLS).",
            2: "RBAC, SSO/OIDC, and secret rotation.",
            3: "Audit logs, tamper detection, and alerting.",
            4: "GDPR/PDPA compliance; on-prem option.",
          },
        },
        accuracy: {
          title: "Verified Accuracy",
          desc: "Transparent FMR/TPR metrics.",
          modalTitle: "Verified Accuracy",
          detail:
            "High accuracy validated with open methodology, diverse datasets, and regular benchmark reports.",
          bullets: {
            1: "Transparent FMR/TPR/ROC tests on diverse datasets.",
            2: "Device calibration & illumination normalization.",
            3: "Anti-spoof/liveness to prevent fraud.",
            4: "Regular benchmarks & accuracy reports.",
          },
        },
        speed: {
          title: "Edge Optimization",
          desc: "Fast & power-efficient on edge devices.",
          modalTitle: "Edge Performance Optimization",
          detail:
            "Architecture optimized for edge devices: low latency and power-efficient while maintaining precision.",
          bullets: {
            1: "SIMD/NEON optimizations and GPU/NPU offload when available.",
            2: "INT8 quantization, pruning, and feature caching.",
            3: "<50 ms latency for real-time verification.",
            4: "End-to-end profiling and graceful fallbacks.",
          },
        },
      },
    },

    // ---- SERVICES ----
    services: {
      title: "OUR SERVICES",
      sliderTitle: "Services Showcase",
      cards: {
        consult: {
          title: "Consulting & Architecture",
          desc: "Needs assessment, pipeline design, and rapid PoC.",
        },
        sdk: {
          title: "Integration & SDK",
          desc: "Integrate cameras, CCTV, VMS, and SDKs for your applications.",
        },
        support: {
          title: "Operations & Support",
          desc: "Monitoring, training, and SLAs tailored to your needs.",
        },
      },
      modal: {
        header: "Service Details",
        consult: {
          title: "Consulting & Architecture",
          body:
            "We help map requirements, design end-to-end solution architecture, prepare PoCs, and recommend the right technology stack.",
        },
        sdk: {
          title: "Integration & SDK",
          body:
            "Quickly integrate cameras, CCTV, VMS, and our biometric SDKs into your apps. We provide guides, code samples, and technical support.",
        },
        support: {
          title: "Operations & Support",
          body:
            "Monitoring services, operator training, and flexible SLAs. We ensure reliability and scalability in production environments.",
        },
      },
    },

    contact: {
      title: "CONTACT US",
      heading: "Contact Us",
      contactUs: "Contact Us",
      ariaSection: "Company Contact",
      addressLabel: "Address",
      phoneLabel: "Phone",
      openMapTitle: "Open location on Google Maps",
      openGmailAria: "Open Gmail",
      openGmailTitle: "Open Gmail",
      openMapAriaPrefix: "Open location of",
      onGoogleMaps: "on Google Maps",
      clickToOpenMap: "Click to open Google Maps",
      mapPreviewTitle: "Google Maps Preview",
      locationLabel: "Location",
      viewInMaps: "View on Maps",
      sendEmailBtn: "Send Email",
    },

    contactForm: {
      waHeader: "Hello PT. Naya Technological Indonesia",
      nameLabel: "Name",
      namePh: "Full name",
      emailLabel: "Email",
      emailPh: "email@domain.com",
      subjectLabel: "Subject",
      subjectPh: "Message topic",
      messageLabel: "Message",
      messagePh: "Write your message here…",
      sendBtn: "Send Message",
      sendViaWAAria: "Send message via WhatsApp",
      sendViaWATitle: "Send message via WhatsApp",
    },

    // ---- FOOTER ----
    footer: {
      rights: "All rights reserved.",
      links: {
        about: "About",
        privacy: "Privacy",
        terms: "Terms",
      },
    },

    // ---- COMMON ----
    common: {
      close: "Close",
    },
  },
};
