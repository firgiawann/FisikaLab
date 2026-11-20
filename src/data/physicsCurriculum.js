/**
 * Kurikulum Fisika Kelas XI (Kurikulum Merdeka Fase F)
 * Mengacu pada Proposal MDLC Firgiawan Listianto (SMAN 3 Jeneponto) & 12 Prinsip Mayer
 */

import { UNIT_EXTRAS, EXTRA_UNITS } from './unitExtras.js';

export const LEVEL_RANKS = [
  { level: 1, title: 'Penjelajah Muda Fisika', minXp: 0, maxXp: 250, badge: '🌱', color: 'from-emerald-500 to-teal-600' },
  { level: 2, title: 'Teknisi Eksperimen', minXp: 250, maxXp: 600, badge: '🔧', color: 'from-blue-500 to-indigo-600' },
  { level: 3, title: 'Ilmuwan Muda Fluida & Mekanika', minXp: 600, maxXp: 1000, badge: '🔬', color: 'from-violet-500 to-purple-600' },
  { level: 4, title: 'Master Energi & Gelombang', minXp: 1000, maxXp: 1500, badge: '⚡', color: 'from-amber-500 to-orange-600' },
  { level: 5, title: 'Profesor Fisika Kelas XI', minXp: 1500, maxXp: 3000, badge: '🏆', color: 'from-rose-500 to-red-600' }
];

export const PHYSICS_TOPICS = [
  /* ========================================================================
     BAB 1: FLUIDA STATIS & DINAMIS (BASELINE UTAMA PROPOSAL)
     ======================================================================== */
  {
    id: 'fluida',
    number: 'Bab 01',
    title: 'Fluida Statis & Dinamis',
    shortTitle: 'Fluida',
    subtitle: 'Tekanan Hidrostatis, Dongkrak Pascal, Daya Apung Archimedes & Aliran Bernoulli',
    teaser: 'Mengapa telinga kita tertekan saat menyelam? Bagaimana kapal baja raksasa mengapung, sementara batu kecil tenggelam?',
    icon: '💧',
    themeColor: 'blue',
    badgeText: 'Tekanan, Apung & Aliran',
    estimatedTime: '20 Menit',
    cp: 'Peserta didik mampu menerapkan hukum-hukum fluida statis dan dinamis dalam menjelaskan fenomena sehari-hari dan teknologi maritim.',
    tpList: [
      'Menjelaskan konsep massa jenis dan menganalisis tekanan hidrostatis (P_h = ρ·g·h).',
      'Menerapkan Hukum Pascal pada sistem pengganda gaya dongkrak hidrolik (F₁/A₁ = F₂/A₂).',
      'Menjelaskan peristiwa terapung, melayang, dan tenggelam melalui Hukum Archimedes (Fa = ρ_f·g·V_c).',
      'Mengenali gejala permukaan zat cair (tegangan permukaan, kapilaritas, dan viskositas) dalam keseharian.',
      'Menerapkan persamaan kontinuitas dan Asas Bernoulli pada fluida mengalir.'
    ],
    narrationText: 'Bab 1 Fluida. Kita akan membongkar rahasia tekanan air saat menyelam, cara dongkrak mengangkat mobil, daya apung kapal dan telur di air garam, gejala permukaan air, serta mengapa air menyembur lebih cepat di ujung selang sempit.',
    units: [
      {
        id: 'u1',
        title: '1. Massa Jenis & Tekanan Hidrostatis',
        badge: 'Fondasi',
        dailyQuestion: 'Pernahkah telingamu terasa makin tertekan saat menyelam lebih dalam di kolam renang atau pantai?',
        explanation: 'Setiap zat cair memiliki kerapatan atau massa jenis (ρ = m/V). Saat zat cair diam, berat tumpukan fluida di atas suatu titik menghasilkan Tekanan Hidrostatis (Ph) ke segala arah. Makin dalam posisimu dari permukaan (h) atau makin rapat cairannya (ρ), makin kuat tekanannya — tanpa dipengaruhi bentuk wadahnya.',
        formula: {
          code: 'Ph = ρ · g · h   &   P_total = P₀ + ρ · g · h',
          readAs: 'Tekanan Hidrostatis = Massa Jenis × Gravitasi × Kedalaman',
          unit: 'Pascal (Pa) atau N/m²',
          variables: [
            { symbol: 'ρ (Rho)', name: 'Massa Jenis Cairan', unit: 'kg/m³', desc: 'Ukuran kerapatan zat (ρ = m/V). Air tawar ≈ 1.000 kg/m³, air laut ≈ 1.025–1.030 kg/m³.' },
            { symbol: 'g', name: 'Percepatan Gravitasi', unit: 'm/s²', desc: 'Tarikan gravitasi bumi pada kolom cairan (≈ 9,8 atau dibulatkan 10 m/s²).' },
            { symbol: 'h', name: 'Kedalaman Titik', unit: 'meter (m)', desc: 'Selalu diukur dari permukaan atas cairan ke bawah (h = 0 di permukaan).' }
          ]
        },
        mayerTips: [
          { icon: '🚫', title: 'Bentuk wadah tidak memengaruhi tekanan', desc: 'Di pipa sempit atau danau luas, selama kedalaman (h) dan jenis cairannya sama, tekanannya sama persis.' },
          { icon: '🔑', title: 'Ukur h dari permukaan atas', desc: 'Jangan terkecoh jarak dari dasar kolam. Jika kolam 5 m dan benda berada 1 m dari dasar, maka h = 4 m.' }
        ]
      },
      {
        id: 'u2',
        title: '2. Hukum Pascal (Dongkrak & Rem Hidrolik)',
        badge: 'Hukum Inti',
        dailyQuestion: 'Bagaimana dorongan ringan mekanik pada dongkrak hidrolik sanggup mengangkat mobil seberat 1,5 ton?',
        explanation: 'Hukum Pascal menyatakan bahwa tekanan yang diberikan pada zat cair dalam ruang tertutup diteruskan sama besar ke segala arah (P₁ = P₂). Karena P = F/A, memperbesar luas piston keluaran (A₂) akan melipatgandakan gaya angkat (F₂) sebanding dengan rasio luasnya.',
        formula: {
          code: 'F₁ / A₁ = F₂ / A₂',
          readAs: 'Tekanan di piston kecil sama dengan tekanan di piston besar',
          unit: 'Newton (N) & m² / cm²',
          variables: [
            { symbol: 'F₁, F₂', name: 'Gaya Masuk & Gaya Angkat', unit: 'Newton (N)', desc: 'F₁ adalah gaya tekan tangan/kaki di piston kecil; F₂ adalah gaya angkat di piston besar.' },
            { symbol: 'A₁, A₂', name: 'Luas Penampang Piston', unit: 'm² atau cm²', desc: 'Satuan A₁ dan A₂ boleh sama-sama cm² selama konsisten kiri dan kanan.' },
            { symbol: 'A₂ / A₁', name: 'Faktor Pengali Gaya', unit: 'Rasio', desc: 'Jika A₂ 20× lebih luas dari A₁, maka F₂ menjadi 20× lebih besar dari F₁.' }
          ]
        },
        mayerTips: [
          { icon: '🚗', title: 'Gaya berlipat, energi tetap kekal', desc: 'Dongkrak tidak menciptakan energi gratis: piston kecil harus ditekan jauh lebih panjang agar mobil naik sedikit.' },
          { icon: '🛑', title: 'Bekerja di rem hidrolik motor', desc: 'Tarikan tuas rem oleh jarimu diteruskan minyak rem secara merata untuk menjepit cakram roda.' }
        ]
      },
      {
        id: 'u3',
        title: '3. Hukum Archimedes (Terapung, Melayang & Tenggelam)',
        badge: 'Gaya Apung',
        dailyQuestion: 'Mengapa Kapal Pinisi dan kapal baja raksasa mengapung, telur bisa melayang di air garam, sedangkan kerikil langsung tenggelam?',
        explanation: 'Setiap benda yang dicelupkan sebagian atau seluruhnya ke dalam fluida mendapat gaya dorong ke atas (Gaya Apung, Fa) yang besarnya sama dengan berat fluida yang dipindahkan. Posisi benda ditentukan perbandingan massa jenis rata-rata benda terhadap massa jenis cairan.',
        formula: {
          code: 'Fa = ρ_fluida · g · V_celup',
          readAs: 'Gaya Apung = Massa Jenis Cairan × Gravitasi × Volume Tercelup',
          unit: 'Newton (N)',
          variables: [
            { symbol: 'Fa', name: 'Gaya Apung ke Atas', unit: 'Newton (N)', desc: 'Dorongan fluida ke atas yang melawan berat benda (W).' },
            { symbol: 'ρ_f', name: 'Massa Jenis Fluida', unit: 'kg/m³', desc: 'Makin pekat cairannya (misal air laut / air garam), makin kuat daya apungnya.' },
            { symbol: 'V_celup', name: 'Volume Benda Tercelup', unit: 'm³', desc: 'Hanya bagian volume yang masuk ke dalam fluida; setelah tercelup 100%, Fa tidak bertambah lagi walau makin dalam.' }
          ]
        },
        mayerTips: [
          { icon: '⛵', title: 'Rahasia Kapal Pinisi & Kapal Baja', desc: 'Lambung berongga membuat massa jenis rata-rata kapal (besi + udara) lebih kecil dari air laut sehingga mengapung.' },
          { icon: '🥚', title: 'Trik Air Garam Pesisir', desc: 'Menambah garam menaikkan ρ air sehingga gaya apung meningkat dan sanggup menahan berat telur agar melayang.' }
        ]
      },
      {
        id: 'u4',
        title: '4. Gejala Permukaan Zat Cair (Tegangan, Kapilaritas & Viskositas)',
        badge: 'Fenomena Cairan',
        dailyQuestion: 'Mengapa serangga kecil bisa berjalan di atas air, air meresap naik di tisu, dan madu mengalir jauh lebih lambat dari air?',
        explanation: 'Di permukaan zat cair, tarikan antar-molekul membentuk Tegangan Permukaan seperti selaput tipis elastis. Pada celah/pipa sangat sempit, air memanjat naik karena Kapilaritas (adhesi air–dinding lebih kuat dari kohesi antar-air). Sementara itu, Viskositas adalah tingkat kekentalan atau gesekan dalam fluida yang menentukan cepat-lambatnya aliran.',
        formula: {
          code: 'γ = F / L',
          readAs: 'Tegangan Permukaan = Gaya Permukaan ÷ Panjang Garis Sentuh',
          unit: 'N/m',
          variables: [
            { symbol: 'γ (Gamma)', name: 'Tegangan Permukaan', unit: 'N/m', desc: 'Ukuran kekuatan "selaput" permukaan cairan. Sabun menurunkan γ agar air mudah membasahi kotoran.' },
            { symbol: 'Kapilaritas', name: 'Naik/Turun di Pipa Sempit', unit: 'Fenomena', desc: 'Makin sempit diameter pipa (seperti xilem tumbuhan atau pori tisu), makin tinggi air naik.' },
            { symbol: 'Viskositas', name: 'Kekentalan Fluida', unit: 'Pa·s', desc: 'Gesekan internal fluida. Oli/madu punya viskositas tinggi, air punya viskositas rendah.' }
          ]
        },
        mayerTips: [
          { icon: '🧼', title: 'Kenapa mencuci pakai sabun lebih bersih?', desc: 'Sabun menurunkan tegangan permukaan air sehingga air mudah masuk ke serat-serat kain yang sempit.' },
          { icon: '🌿', title: 'Kapilaritas di alam', desc: 'Naiknya air tanah lewat pori-pori halus dan pembuluh xilem tumbuhan memanfaatkan gejala kapilaritas.' }
        ]
      },
      {
        id: 'u5',
        title: '5. Fluida Dinamis: Kontinuitas & Asas Bernoulli',
        badge: 'Aplikasi Aliran',
        dailyQuestion: 'Mengapa menyempitkan ujung selang membuat air menyembur lebih kencang, dan bagaimana sayap pesawat mendapat gaya angkat?',
        explanation: 'Untuk fluida ideal (aliran tunak, tidak kental, massa jenis tetap), debit aliran (Q = A·v) selalu konstan di sepanjang pipa (Persamaan Kontinuitas: A₁·v₁ = A₂·v₂). Menurut Asas Bernoulli, pada ketinggian yang sama, bagian yang alirannya lebih cepat justru memiliki tekanan lebih rendah. Prinsip beda kelajuan dan beda tekanan inilah yang bekerja pada venturimeter, semprotan parfum, hingga gaya angkat sayap pesawat.',
        formula: {
          code: 'A₁ · v₁ = A₂ · v₂   &   P + ½·ρ·v² + ρ·g·h = konstan',
          readAs: 'Debit aliran tetap; kelajuan makin cepat membuat tekanan makin rendah',
          unit: 'm³/s & Pa',
          variables: [
            { symbol: 'Q = A·v', name: 'Debit Aliran', unit: 'm³/s', desc: 'Volume fluida yang mengalir tiap detik. Luas (A) mengecil → kelajuan (v) membesar.' },
            { symbol: 'P & v', name: 'Tekanan & Kelajuan', unit: 'Pa & m/s', desc: 'Pada aliran mendatar fluida ideal: v besar → P kecil; v kecil → P besar.' },
            { symbol: 'v = √(2gh)', name: 'Laju Pancaran (Torricelli)', unit: 'm/s', desc: 'Kelajuan air keluar dari lubang tangki bergantung pada kedalaman lubang (h) dari permukaan atas air.' }
          ]
        },
        mayerTips: [
          { icon: '⚠️', title: 'Jangan terbalik di pipa sempit!', desc: 'Di bagian pipa yang menyempit, aliran memang makin CEPAT, tetapi tekanannya justru makin RENDAH.' },
          { icon: '✈️', title: 'Gaya angkat sayap pesawat', desc: 'Bentuk dan sudut sayap membuat udara di sisi atas mengalir lebih cepat daripada sisi bawah, sehingga tekanan bawah > tekanan atas dan mendorong sayap ke atas.' }
        ]
      }
    ],
    questions: [
      {
        id: 'f1',
        bloom: 'C2',
        topic: 'Tekanan Hidrostatis • Konsep Kedalaman',
        stem: 'Seorang penyelam turun dari kedalaman 2 meter menuju kedalaman 6 meter di laut. Mengapa tekanan yang dirasakan di telinganya bertambah kuat?',
        options: [
          { key: 'A', text: 'Karena suhu air di tempat dalam semakin panas sehingga molekul bergerak liar.' },
          { key: 'B', text: 'Karena massa jenis air laut di kedalaman 6 meter berubah menjadi tiga kali lipat.' },
          { key: 'C', text: 'Karena berat kolom air yang bertumpuk di atas tubuh penyelam makin tebal (Ph = ρ·g·h).' },
          { key: 'D', text: 'Karena gravitasi bumi di dasar kolam bertambah besar mendadak.' }
        ],
        correct: 'C',
        explanation: 'Tekanan hidrostatis Ph = ρ·g·h berbanding lurus dengan kedalaman (h) dari permukaan. Semakin dalam, semakin berat tumpukan kolom air di atas penyelam.'
      },
      {
        id: 'f2',
        bloom: 'C2',
        topic: 'Tekanan Hidrostatis • Miskonsepsi Bentuk Wadah',
        stem: 'Wadah A berbentuk pipa sempit dan Wadah B berbentuk kolam lebar. Keduanya diisi air tawar yang sama. Jika sensor tekanan diletakkan tepat pada kedalaman 1,2 meter dari permukaan di kedua wadah, bagaimana hasil ukurnya?',
        options: [
          { key: 'A', text: 'Tekanan di Wadah B jauh lebih besar karena jumlah airnya jauh lebih banyak.' },
          { key: 'B', text: 'Tekanan di Wadah A lebih besar karena dinding sempit menjepit air.' },
          { key: 'C', text: 'Tekanan di kedua wadah sama persis, karena tekanan hidrostatis tidak bergantung bentuk wadah.' },
          { key: 'D', text: 'Tekanan di Wadah B setengah dari Wadah A.' }
        ],
        correct: 'C',
        explanation: 'Berdasarkan Ph = ρ·g·h, bentuk wadah dan volume total air tidak memengaruhi tekanan hidrostatis selama ρ, g, dan kedalaman h sama.'
      },
      {
        id: 'f3',
        bloom: 'C2',
        topic: 'Hukum Archimedes • Kapal Baja vs Batu',
        stem: 'Kapal Pinisi atau kapal baja yang sangat berat bisa terapung di laut, sedangkan kerikil kecil langsung tenggelam. Penyebab utamanya adalah…',
        options: [
          { key: 'A', text: 'Air laut tidak memberikan gaya apung sama sekali pada kerikil kecil.' },
          { key: 'B', text: 'Lambung kapal berongga udara sehingga massa jenis rata-ratanya lebih kecil dari air laut dan gaya apung mampu menahan berat kapal.' },
          { key: 'C', text: 'Massa total kapal lebih kecil daripada massa kerikil.' },
          { key: 'D', text: 'Bentuk kerikil memutus tegangan permukaan air.' }
        ],
        correct: 'B',
        explanation: 'Terapung atau tenggelam ditentukan perbandingan massa jenis rata-rata terhadap cairan. Rongga udara membuat massa jenis rata-rata kapal lebih kecil dari air laut.'
      },
      {
        id: 'f4',
        bloom: 'C2',
        topic: 'Asas Bernoulli • Pipa Menyempit',
        stem: 'Air ideal mengalir mendatar dari pipa lebar menuju bagian pipa yang menyempit. Bagaimana perubahan kelajuan dan tekanan air saat melewati bagian yang sempit tersebut?',
        options: [
          { key: 'A', text: 'Kelajuan makin cepat dan tekanannya ikut makin tinggi.' },
          { key: 'B', text: 'Kelajuan melambat dan tekanannya makin tinggi.' },
          { key: 'C', text: 'Kelajuan makin cepat, sedangkan tekanannya justru lebih rendah.' },
          { key: 'D', text: 'Kelajuan dan tekanan tetap sama di seluruh pipa.' }
        ],
        correct: 'C',
        explanation: 'Menurut kontinuitas (A₁v₁ = A₂v₂), pipa sempit membuat kelajuan naik. Menurut Asas Bernoulli, pada ketinggian sama kelajuan tinggi menurunkan tekanan.'
      },
      {
        id: 'f5',
        bloom: 'C3',
        topic: 'Tekanan Hidrostatis • Hitungan Ringan',
        stem: 'Sebuah sensor diletakkan pada kedalaman 3 meter di dalam kolam air tawar (ρ = 1.000 kg/m³, g = 10 m/s²). Berapakah tekanan hidrostatis yang terukur sensor?',
        options: [
          { key: 'A', text: '3.000 Pa' },
          { key: 'B', text: '30.000 Pa' },
          { key: 'C', text: '300.000 Pa' },
          { key: 'D', text: '10.000 Pa' }
        ],
        correct: 'B',
        explanation: 'Ph = ρ · g · h = 1.000 × 10 × 3 = 30.000 Pa (30 kPa).'
      },
      {
        id: 'f6',
        bloom: 'C3',
        topic: 'Hukum Pascal • Dongkrak Hidrolik',
        stem: 'Dongkrak hidrolik memiliki luas piston kecil A₁ = 10 cm² dan piston besar A₂ = 200 cm². Jika mekanik menekan piston kecil dengan gaya F₁ = 150 N, berapa gaya angkat F₂ di piston besar?',
        options: [
          { key: 'A', text: '1.500 N' },
          { key: 'B', text: '3.000 N' },
          { key: 'C', text: '750 N' },
          { key: 'D', text: '30.000 N' }
        ],
        correct: 'B',
        explanation: 'Rasio luas A₂ / A₁ = 200 / 10 = 20. Maka F₂ = 20 × 150 N = 3.000 N.'
      },
      {
        id: 'f7',
        bloom: 'C4',
        topic: 'Analisis Archimedes • Air Tawar vs Air Garam & Kedalaman',
        stem: 'Batu padat yang sama dimasukkan ke dua gelas: Gelas 1 berisi air tawar (ρ = 1.000 kg/m³) dan Gelas 2 berisi air garam pekat (ρ = 1.150 kg/m³). Di kedua gelas batu tenggelam seluruhnya. Pernyataan manakah yang tepat?',
        options: [
          { key: 'A', text: 'Gaya apung pada batu di Gelas 2 lebih besar daripada di Gelas 1, dan di dalam satu gelas Fa tidak berubah meski batu diletakkan lebih dalam.' },
          { key: 'B', text: 'Gaya apung di kedua gelas sama persis karena batunya sama-sama tenggelam.' },
          { key: 'C', text: 'Gaya apung bertambah terus setiap kali batu diturunkan lebih dalam walau sudah tercelup penuh.' },
          { key: 'D', text: 'Berat asli batu berkurang di Gelas 2 sehingga massa batu berubah.' }
        ],
        correct: 'A',
        explanation: 'Karena batu tercelup penuh (Vc sama), Fa = ρ_f·g·Vc lebih besar di air garam (ρ_f lebih besar), dan selama tercelup 100% nilainya tidak bergantung pada kedalaman.'
      },
      {
        id: 'f8',
        bloom: 'C4',
        topic: 'Analisis Kontinuitas • Perbandingan Luas Pipa',
        stem: 'Air mengalir lewat pipa A berluas penampang 24 cm² dengan kelajuan 1,5 m/s, lalu mengalir ke pipa B yang luas penampangnya 8 cm². Jika ada lubang ukur tekanan di kedua pipa (mendatar), kesimpulan yang benar adalah…',
        options: [
          { key: 'A', text: 'Kelajuan di pipa B adalah 0,5 m/s dan tekanan di pipa B lebih tinggi.' },
          { key: 'B', text: 'Kelajuan di pipa B adalah 4,5 m/s dan tekanan di pipa B lebih rendah daripada pipa A.' },
          { key: 'C', text: 'Kelajuan di pipa B adalah 4,5 m/s dan tekanan di pipa B lebih tinggi daripada pipa A.' },
          { key: 'D', text: 'Kelajuan di pipa B tetap 1,5 m/s karena jumlah air tidak berubah.' }
        ],
        correct: 'B',
        explanation: 'A₁·v₁ = A₂·v₂ → 24 × 1,5 = 8 × v₂ → v₂ = 36 / 8 = 4,5 m/s. Karena kelajuan di pipa B lebih tinggi, menurut Asas Bernoulli tekanan di pipa B lebih rendah.'
      }
    ]
  },

  /* ========================================================================
     BAB 2: DINAMIKA ROTASI & KESETIMBANGAN BENDA TEGAR (3 UNIT + 6 SOAL)
     ======================================================================== */
  {
    id: 'rotasi',
    number: 'Bab 02',
    title: 'Dinamika Rotasi & Kesetimbangan',
    shortTitle: 'Dinamika Rotasi',
    subtitle: 'Momen Gaya (Torsi), Kesetimbangan Jungkat-Jungkit, Momen Inersia & Titik Berat',
    teaser: 'Mengapa gagang pintu selalu dipasang jauh dari engsel? Bagaimana menyeimbangkan jungkat-jungkit dengan beban berbeda?',
    icon: '⚖️',
    themeColor: 'indigo',
    badgeText: 'Torsi & Keseimbangan',
    estimatedTime: '15 Menit',
    cp: 'Peserta didik mampu menganalisis gerak rotasi dan syarat kesetimbangan benda tegar dalam konstruksi sehari-hari.',
    tpList: [
      'Menghitung momen gaya (torsi τ = r · F · sin θ) terhadap poros putar.',
      'Menganalisis syarat kesetimbangan rotasi (Στ = 0) pada jungkat-jungkit dan tuas.',
      'Memahami peran momen inersia (I) dan titik berat terhadap kestabilan benda berputar.'
    ],
    narrationText: 'Bab 2 Dinamika Rotasi. Di bab ini kamu akan memahami rahasia gagang pintu, kunci pas montir, cara menyeimbangkan jungkat-jungkit, hingga mengapa penari akrobat berputar lebih cepat saat merapatkan tangannya.',
    units: [
      {
        id: 'r1',
        title: '1. Momen Gaya (Torsi) — Rahasia Kunci Pas & Pintu',
        badge: 'Fondasi',
        dailyQuestion: 'Mengapa montir menyambung gagang kunci pas dengan pipa panjang untuk membuka baut ban yang macet?',
        explanation: 'Torsi (τ) adalah ukuran keefektifan gaya untuk memutar benda terhadap porosnya. Besar torsi bergantung pada gaya dorong (F), jarak lengan dari poros (r), dan sudut dorong (θ). Pengingat cepat: gaya berat F = m·g (g ≈ 10 m/s²) dan sin 90° = 1 (maksimal).',
        formula: {
          code: 'τ = r · F · sin θ',
          readAs: 'Torsi = Lengan Gaya × Gaya Dorong × Sinus Sudut',
          unit: 'Newton meter (N·m)',
          variables: [
            { symbol: 'τ (Tau)', name: 'Momen Gaya / Torsi', unit: 'N·m', desc: 'Kemampuan gaya memutar benda terhadap poros.' },
            { symbol: 'r', name: 'Lengan Momen', unit: 'meter (m)', desc: 'Jarak dari poros ke titik gaya bekerja. Makin panjang r, torsi makin besar.' },
            { symbol: 'F & θ', name: 'Gaya & Sudut Dorong', unit: 'N & derajat', desc: 'Dorongan tegak lurus batang (θ = 90°, sin 90° = 1) memberi torsi maksimum.' }
          ]
        },
        mayerTips: [
          { icon: '🚪', title: 'Mendorong di engsel → τ = 0', desc: 'Jika r = 0, sekuat apa pun doronganmu, pintu tidak akan berputar.' },
          { icon: '📐', title: 'Dorong tegak lurus (90°)', desc: 'Mendorong miring membuat sebagian gaya terbuang dan torsi berkurang.' }
        ]
      },
      {
        id: 'r2',
        title: '2. Syarat Kesetimbangan Jungkat-Jungkit (Στ = 0)',
        badge: 'Hukum Inti',
        dailyQuestion: 'Bagaimana anak bermassa 20 kg bisa menyeimbangkan kakaknya bermassa 40 kg di atas jungkat-jungkit?',
        explanation: 'Benda tegar berada dalam kesetimbangan rotasi apabila total torsi yang memutar berlawanan jarum jam sama besar dengan total torsi searah jarum jam (Στ = 0). Beban lebih ringan cukup diletakkan lebih jauh dari titik tumpu.',
        formula: {
          code: 'Στ = 0  ⇔  m₁ · g · r₁ = m₂ · g · r₂',
          readAs: 'Momen Beban Kiri = Momen Beban Kanan',
          unit: 'Kesetimbangan Statis',
          variables: [
            { symbol: 'm₁ · r₁', name: 'Momen Kiri', unit: 'kg·m', desc: 'Beban sebelah kiri dikali jaraknya dari titik tumpu.' },
            { symbol: 'm₂ · r₂', name: 'Momen Kanan', unit: 'kg·m', desc: 'Beban sebelah kanan dikali jaraknya dari titik tumpu.' },
            { symbol: 'Στ = 0', name: 'Syarat Seimbang', unit: 'N·m', desc: 'Papan mendatar stabil jika torsi kiri dan kanan sama besar.' }
          ]
        },
        mayerTips: [
          { icon: '⚖️', title: 'Beban berat = dekat poros', desc: 'Beban 2× lebih berat cukup duduk pada jarak ½ kali dari beban ringan.' }
        ]
      },
      {
        id: 'r3',
        title: '3. Momen Inersia & Titik Berat Benda',
        badge: 'Aplikasi',
        dailyQuestion: 'Mengapa peseluncur es berputar jauh lebih cepat saat merapatkan kedua tangannya, dan mengapa muatan berat perahu ditaruh di dasar?',
        explanation: 'Momen Inersia (I) adalah ukuran kelembaman benda terhadap gerak putar — bergantung pada massa sekaligus sebaran jarak massa dari poros (I = mR² untuk partikel). Sementara itu, Titik Berat adalah titik tangkap resultan gaya berat benda; posisi titik berat yang rendah membuat kendaraan atau perahu lebih stabil.',
        formula: {
          code: 'I = m · R²   &   L = I · ω',
          readAs: 'Momen Inersia bergantung pada massa dan kuadrat jaraknya dari poros',
          unit: 'kg·m²',
          variables: [
            { symbol: 'I', name: 'Momen Inersia', unit: 'kg·m²', desc: 'Makin jauh massa tersebar dari poros (R besar), makin sulit benda diubah putarannya.' },
            { symbol: 'ω (Omega)', name: 'Kecepatan Sudut', unit: 'rad/s', desc: 'Jika I diperkecil (tangan dirapatkan), ω meningkat agar momentum sudut L = I·ω tetap.' },
            { symbol: 'Titik Berat', name: 'Pusat Keseimbangan', unit: 'Koordinat', desc: 'Pada benda berongga seperti cincin/mangkuk, titik berat bisa berada di luar fisiknya.' }
          ]
        },
        mayerTips: [
          { icon: '⛵', title: 'Kestabilan perahu & truk', desc: 'Menaruh barang berat di bagian bawah menurunkan titik berat sehingga tidak mudah terguling.' },
          { icon: '⭕', title: 'Titik berat cincin', desc: 'Terletak tepat di ruang kosong tengah lingkaran, bukan di logam pinggirannya.' }
        ]
      }
    ],
    questions: [
      {
        id: 'r_q1',
        bloom: 'C2',
        topic: 'Dinamika Rotasi • Konsep Torsi',
        stem: 'Mengapa gagang pintu selalu dipasang di tepi pintu yang paling jauh dari engsel?',
        options: [
          { key: 'A', text: 'Agar massa pintu menjadi lebih ringan saat dibuka.' },
          { key: 'B', text: 'Agar lengan momen (r) maksimum sehingga gaya kecil sudah menghasilkan torsi putar yang besar.' },
          { key: 'C', text: 'Agar gesekan udara pada daun pintu hilang.' },
          { key: 'D', text: 'Karena engsel tidak mampu menahan gaya tarik.' }
        ],
        correct: 'B',
        explanation: 'Sesuai τ = r·F·sin θ, memperbesar jarak lengan r dari engsel membuat torsi besar walaupun gaya dorong F kecil.'
      },
      {
        id: 'r_q2',
        bloom: 'C2',
        topic: 'Momen Inersia • Sebaran Massa',
        stem: 'Dua roda bermassa sama persis: Roda A berbentuk cakram pejal merata, sedangkan Roda B berbentuk cincin berongga (seluruh massanya di pinggir). Mana yang lebih sulit mulai diputar?',
        options: [
          { key: 'A', text: 'Roda B (cincin berongga), karena sebaran massanya lebih jauh dari poros sehingga momen inersianya lebih besar.' },
          { key: 'B', text: 'Roda A (cakram pejal), karena tidak berlubang di tengah.' },
          { key: 'C', text: 'Sama persis, karena momen inersia hanya bergantung pada massa.' },
          { key: 'D', text: 'Keduanya tidak punya momen inersia.' }
        ],
        correct: 'A',
        explanation: 'Momen inersia bergantung pada distribusi jarak massa dari poros (R²). Massa di tepi luar (cincin) menghasilkan momen inersia lebih besar.'
      },
      {
        id: 'r_q3',
        bloom: 'C2',
        topic: 'Titik Berat • Benda Berongga',
        stem: 'Pernyataan manakah yang benar mengenai letak titik berat suatu benda?',
        options: [
          { key: 'A', text: 'Titik berat selalu harus berada di dalam bagian padat fisik benda.' },
          { key: 'B', text: 'Pada benda berongga atau melengkung seperti cincin, titik berat bisa berada di luar badan fisiknya.' },
          { key: 'C', text: 'Titik berat hanya dimiliki benda yang sedang bergerak.' },
          { key: 'D', text: 'Titik berat yang tinggi membuat perahu lebih stabil.' }
        ],
        correct: 'B',
        explanation: 'Titik berat adalah pusat keseimbangan distribusi massa, sehingga pada cincin atau mangkuk letaknya berada di ruang kosong di tengahnya.'
      },
      {
        id: 'r_q4',
        bloom: 'C3',
        topic: 'Momen Gaya • Perhitungan Torsi',
        stem: 'Seorang mekanik mendorong ujung kunci pas sepanjang 0,4 meter secara tegak lurus (90°) dengan gaya 50 N. Berapakah besar torsi pada baut?',
        options: [
          { key: 'A', text: '10 N·m' },
          { key: 'B', text: '20 N·m' },
          { key: 'C', text: '125 N·m' },
          { key: 'D', text: '200 N·m' }
        ],
        correct: 'B',
        explanation: 'τ = r · F · sin 90° = 0,4 m × 50 N × 1 = 20 N·m.'
      },
      {
        id: 'r_q5',
        bloom: 'C3',
        topic: 'Kesetimbangan • Jungkat-Jungkit',
        stem: 'Pada papan jungkat-jungkit, beban kiri 20 kg diletakkan 1,5 meter dari titik tumpu. Agar seimbang mendatar, di mana beban kanan 30 kg harus diletakkan?',
        options: [
          { key: 'A', text: '1,0 meter di kanan titik tumpu' },
          { key: 'B', text: '1,5 meter di kanan titik tumpu' },
          { key: 'C', text: '2,0 meter di kanan titik tumpu' },
          { key: 'D', text: '3,0 meter di kanan titik tumpu' }
        ],
        correct: 'A',
        explanation: 'Syarat seimbang: m₁·r₁ = m₂·r₂ → 20 × 1,5 = 30 × r₂ → r₂ = 30 / 30 = 1,0 meter.'
      },
      {
        id: 'r_q6',
        bloom: 'C4',
        topic: 'Analisis Torsi • Perbandingan Dua Cara Memutar Baut',
        stem: 'Budi memutar baut memakai kunci 0,3 m dengan gaya 60 N tegak lurus (90°). Dika memakai kunci 0,6 m dengan gaya 50 N tetapi mendorong miring bersudut 30° (sin 30° = 0,5). Torsi siapa yang lebih besar?',
        options: [
          { key: 'A', text: 'Torsi Budi lebih besar (18 N·m vs 15 N·m).' },
          { key: 'B', text: 'Torsi Dika lebih besar (30 N·m vs 18 N·m).' },
          { key: 'C', text: 'Torsi keduanya sama besar (18 N·m).' },
          { key: 'D', text: 'Keduanya menghasilkan torsi 0 N·m.' }
        ],
        correct: 'A',
        explanation: 'Budi: τ = 0,3 × 60 × 1 = 18 N·m. Dika: τ = 0,6 × 50 × 0,5 = 15 N·m. Arah sudut 30° membuat setengah potensi gaya Dika hilang.'
      }
    ]
  },

  /* ========================================================================
     BAB 3: ELASTISITAS & HUKUM HOOKE (3 UNIT + 6 SOAL)
     ======================================================================== */
  {
    id: 'elastisitas',
    number: 'Bab 03',
    title: 'Elastisitas & Hukum Hooke',
    shortTitle: 'Elastisitas & Pegas',
    subtitle: 'Hukum Hooke, Tegangan–Regangan–Modulus Young & Susunan Pegas Seri–Paralel',
    teaser: 'Bagaimana per shockbreaker motor meredam guncangan jalan berlubang dan kenapa susunan paralel lebih kokoh?',
    icon: '🌀',
    themeColor: 'emerald',
    badgeText: 'Pegas & Hukum Hooke',
    estimatedTime: '15 Menit',
    cp: 'Peserta didik mampu menganalisis sifat elastisitas bahan dan menerapkan Hukum Hooke pada sistem pegas tunggal maupun susunan.',
    tpList: [
      'Menerapkan Hukum Hooke (F = k·Δx) dan menghitung energi potensial pegas (Ep = ½·k·Δx²).',
      'Membedakan konsep tegangan (σ), regangan (e), dan Modulus Young (E) sebagai ukuran kekakuan bahan.',
      'Menganalisis perbedaan susunan pegas seri (lebih lentur) dan paralel (lebih kaku).'
    ],
    narrationText: 'Bab 3 Elastisitas dan Hukum Hooke. Kamu akan mempelajari cara pegas menyimpan energi, alasan baja lebih kaku daripada karet, serta bedanya memasang pegas secara seri dan paralel.',
    units: [
      {
        id: 'e1',
        title: '1. Hukum Hooke & Energi Potensial Pegas',
        badge: 'Fondasi',
        dailyQuestion: 'Mengapa pegas timbangan pasar atau shockbreaker motor bertambah panjang sebanding dengan berat beban yang menindihnya?',
        explanation: 'Selama tidak melewati batas elastisnya, pertambahan panjang pegas (Δx) berbanding lurus dengan gaya tarik (F = k·Δx). Saat diregangkan, pegas menyimpan Energi Potensial Elastis (Ep = ½·k·Δx²) yang siap melontarkan kembali.',
        formula: {
          code: 'F = k · Δx   &   Ep = ½ · k · (Δx)²',
          readAs: 'Gaya Pegas = Konstanta Kekakuan × Pertambahan Panjang',
          unit: 'F dalam N, k dalam N/m, Ep dalam Joule',
          variables: [
            { symbol: 'k', name: 'Konstanta Pegas', unit: 'N/m', desc: 'Ukuran kekakuan pegas. Per motor punya k besar dibanding per pulpen.' },
            { symbol: 'Δx', name: 'Pertambahan Panjang', unit: 'meter (m)', desc: 'Selisih panjang saat ditarik dikurangi panjang awal.' },
            { symbol: 'Ep', name: 'Energi Potensial Pegas', unit: 'Joule (J)', desc: 'Berbanding lurus dengan kuadrat Δx (tarikan 2× → energi 4×).' }
          ]
        },
        mayerTips: [
          { icon: '⚠️', title: 'Batas elastis vs plastis', desc: 'Jika ditarik melewati batas elastis, pegas melar permanen dan tidak bisa kembali semula.' }
        ]
      },
      {
        id: 'e2',
        title: '2. Tegangan, Regangan & Modulus Young',
        badge: 'Sifat Bahan',
        dailyQuestion: 'Kenapa kabel jembatan dibuat dari baja tebal, sedangkan karet gelang mudah sekali ditarik memanjang?',
        explanation: 'Tegangan (σ = F/A) adalah gaya tiap satuan luas penampang kawat. Regangan (e = ΔL/L₀) adalah perbandingan pertambahan panjang terhadap panjang awal. Rasio keduanya adalah Modulus Young (E = σ/e), yang menyatakan tingkat kekakuan bahan.',
        formula: {
          code: 'σ = F / A   |   e = ΔL / L₀   |   E = σ / e',
          readAs: 'Modulus Young adalah rasio Tegangan dibagi Regangan',
          unit: 'σ & E dalam N/m² (Pa); e tanpa satuan',
          variables: [
            { symbol: 'σ (Sigma)', name: 'Tegangan', unit: 'N/m² (Pa)', desc: 'Makin kecil luas penampang kawat (tipis), makin besar tegangan yang dirasakannya.' },
            { symbol: 'e', name: 'Regangan', unit: 'tanpa satuan', desc: 'Perbandingan ΔL terhadap L₀; tidak memiliki satuan.' },
            { symbol: 'E', name: 'Modulus Young', unit: 'N/m² (Pa)', desc: 'Ukuran kekakuan bahan: baja memiliki E sangat besar, karet memiliki E kecil.' }
          ]
        },
        mayerTips: [
          { icon: '🏗️', title: 'Baja vs karet', desc: 'Baja punya Modulus Young jauh lebih besar dari karet karena sangat tahan terhadap tarikan.' }
        ]
      },
      {
        id: 'e3',
        title: '3. Susunan Pegas Seri & Paralel',
        badge: 'Aplikasi',
        dailyQuestion: 'Mengapa sepeda motor memakai dua per shockbreaker berdampingan (paralel) di roda belakang, bukan disambung memanjang (seri)?',
        explanation: 'Dua pegas yang dipasang paralel (berdampingan) membagi beban bersama sehingga sistem menjadi lebih kaku (k_p = k₁ + k₂). Sebaliknya, pegas yang disambung seri (ujung ke ujung) menghasilkan sistem yang lebih lentur (1/k_s = 1/k₁ + 1/k₂).',
        formula: {
          code: 'k_p = k₁ + k₂   &   1/k_s = 1/k₁ + 1/k₂',
          readAs: 'Paralel dijumlahkan langsung (lebih kaku); Seri pakai seper (lebih lentur)',
          unit: 'N/m',
          variables: [
            { symbol: 'k_p', name: 'Konstanta Paralel', unit: 'N/m', desc: 'Besarnya lebih besar dari masing-masing pegas → kokoh menahan beban berat.' },
            { symbol: 'k_s', name: 'Konstanta Seri', unit: 'N/m', desc: 'Besarnya lebih kecil dari pegas terkecil → empuk dan melar lebih jauh.' },
            { symbol: 'Ingat!', name: 'Kebalikan Resistor', unit: 'Tips', desc: 'Jangan tertukar dengan hambatan listrik: pada pegas justru PARALEL yang dijumlahkan!' }
          ]
        },
        mayerTips: [
          { icon: '🏍️', title: 'Shockbreaker ganda = paralel', desc: 'Memasang 2 per identik paralel menggandakan kekakuan jadi 2k agar motor tidak mudah amblas.' }
        ]
      }
    ],
    questions: [
      {
        id: 'e_q1',
        bloom: 'C2',
        topic: 'Modulus Young • Sifat Kekakuan Bahan',
        stem: 'Mengapa kawat baja memiliki nilai Modulus Young (E) jauh lebih besar daripada karet gelang?',
        options: [
          { key: 'A', text: 'Karena baja jauh lebih kaku dan memerlukan tegangan sangat besar untuk menghasilkan regangan kecil.' },
          { key: 'B', text: 'Karena baja lebih mudah ditarik panjang daripada karet.' },
          { key: 'C', text: 'Karena karet tidak memiliki luas penampang.' },
          { key: 'D', text: 'Karena Modulus Young hanya bergantung pada warna logam.' }
        ],
        correct: 'A',
        explanation: 'Modulus Young E = σ / e mengukur kekakuan bahan. Bahan kaku (baja) mengalami regangan sangat kecil walau ditarik tegangan besar.'
      },
      {
        id: 'e_q2',
        bloom: 'C2',
        topic: 'Susunan Pegas • Seri vs Paralel',
        stem: 'Dua pegas identik masing-masing berkonstanta k dipasang secara PARALEL berdampingan. Bagaimana sifat sistem pegas gabungan tersebut?',
        options: [
          { key: 'A', text: 'Dua kali lebih kaku (k_total = 2k) sehingga pertambahan panjangnya lebih kecil.' },
          { key: 'B', text: 'Dua kali lebih lentur (k_total = ½k).' },
          { key: 'C', text: 'Sama persis dengan satu pegas.' },
          { key: 'D', text: 'Kehilangan sifat elastisnya.' }
        ],
        correct: 'A',
        explanation: 'Susunan paralel menjumlahkan konstanta (k_p = k + k = 2k) karena beban terbagi ke dua pegas.'
      },
      {
        id: 'e_q3',
        bloom: 'C2',
        topic: 'Energi Potensial Pegas • Hubungan Kuadrat',
        stem: 'Jika tarikan karet ketapel (Δx) diperbesar menjadi 2 kali lipat dari semula, bagaimana perubahan Energi Potensial Elastis (Ep = ½·k·Δx²) yang tersimpan?',
        options: [
          { key: 'A', text: 'Tetap sama' },
          { key: 'B', text: 'Menjadi 2 kali lipat' },
          { key: 'C', text: 'Menjadi 4 kali lipat karena sebanding dengan kuadrat Δx' },
          { key: 'D', text: 'Menjadi setengahnya' }
        ],
        correct: 'C',
        explanation: 'Karena Ep sebanding dengan (Δx)², menggandakan Δx menjadi 2× membuat Ep naik 2² = 4 kali lipat.'
      },
      {
        id: 'e_q4',
        bloom: 'C3',
        topic: 'Hukum Hooke • Hitungan Pertambahan Panjang',
        stem: 'Sebuah pegas memiliki konstanta k = 200 N/m. Jika ujung bawahnya digantungi beban F = 40 N, berapakah pertambahan panjang pegas (Δx)?',
        options: [
          { key: 'A', text: '0,1 meter (10 cm)' },
          { key: 'B', text: '0,2 meter (20 cm)' },
          { key: 'C', text: '0,5 meter (50 cm)' },
          { key: 'D', text: '5,0 meter' }
        ],
        correct: 'B',
        explanation: 'Δx = F / k = 40 / 200 = 0,2 meter (20 cm).'
      },
      {
        id: 'e_q5',
        bloom: 'C3',
        topic: 'Susunan Pegas • Hitungan Seri',
        stem: 'Dua pegas identik masing-masing berkonstanta k = 300 N/m disusun secara SERI. Berapakah konstanta pegas gabungannya (k_s)?',
        options: [
          { key: 'A', text: '600 N/m' },
          { key: 'B', text: '300 N/m' },
          { key: 'C', text: '150 N/m' },
          { key: 'D', text: '75 N/m' }
        ],
        correct: 'C',
        explanation: '1/k_s = 1/300 + 1/300 = 2/300 → k_s = 300 / 2 = 150 N/m.'
      },
      {
        id: 'e_q6',
        bloom: 'C4',
        topic: 'Analisis Perbandingan • Seri vs Paralel dengan Beban Sama',
        stem: 'Dua pegas identik masing-masing k = 200 N/m digantungi beban sama F = 40 N. Di Rangkaian 1 pegas dipasang paralel, di Rangkaian 2 pegas dipasang seri. Berapa perbandingan pertambahan panjang Δx₁ : Δx₂?',
        options: [
          { key: 'A', text: '1 : 4 (paralel melar 10 cm, seri melar 40 cm)' },
          { key: 'B', text: '1 : 2 (paralel melar 10 cm, seri melar 20 cm)' },
          { key: 'C', text: '4 : 1 (paralel melar lebih panjang)' },
          { key: 'D', text: '1 : 1 (sama panjang)' }
        ],
        correct: 'A',
        explanation: 'Paralel: k_p = 400 N/m → Δx₁ = 40/400 = 0,1 m (10 cm). Seri: k_s = 100 N/m → Δx₂ = 40/100 = 0,4 m (40 cm). Rasio 1 : 4.'
      }
    ]
  },

  /* ========================================================================
     BAB 4: GETARAN, GELOMBANG & BUNYI (3 UNIT + 6 SOAL)
     ======================================================================== */
  {
    id: 'gelombang',
    number: 'Bab 04',
    title: 'Getaran, Gelombang & Bunyi',
    shortTitle: 'Gelombang & Bunyi',
    subtitle: 'Karakteristik Gelombang, Gelombang Berjalan & Stasioner, Bunyi & Efek Doppler',
    teaser: 'Mengapa gelombang laut sampai ke pantai tapi perahu cuma naik-turun, dan kenapa suara sirine ambulans berubah nada saat lewat?',
    icon: '🌊',
    themeColor: 'violet',
    badgeText: 'Gelombang & Bunyi',
    estimatedTime: '15 Menit',
    cp: 'Peserta didik mampu memahami gejala gelombang mekanik dan bunyi serta penerapannya dalam kehidupan sehari-hari.',
    tpList: [
      'Menjelaskan bahwa gelombang merambatkan energi dan hubungan v = λ·f pada medium tetap.',
      'Membedakan gelombang berjalan dan gelombang stasioner (simpul & perut) pada dawai.',
      'Menerapkan konsep gelombang bunyi dan Efek Doppler pada fenomena sehari-hari.'
    ],
    narrationText: 'Bab 4 Gelombang dan Bunyi. Kamu akan melihat mengapa gabus di air hanya naik-turun saat gelombang lewat, rahasia nada senar gitar, hingga kenapa nada sirine ambulans berubah saat melaju melewatimu.',
    units: [
      {
        id: 'g1',
        title: '1. Karakteristik Gelombang Mekanik (v = λ · f)',
        badge: 'Fondasi',
        dailyQuestion: 'Saat kamu mengibaskan tali naik-turun, apakah benang talinya ikut pindah ke ujung atau hanya gelombangnya yang merambat?',
        explanation: 'Gelombang mekanik merambatkan energi melalui medium, sementara partikel medium hanya bergetar di tempat. Satu panjang gelombang (λ) terdiri atas satu bukit dan satu lembah. Penting: pada medium yang sama, cepat rambat (v) selalu konstan — jadi menaikkan frekuensi (f) membuat panjang gelombang (λ) memendek.',
        formula: {
          code: 'v = λ · f   &   f = 1 / T',
          readAs: 'Cepat Rambat = Panjang Gelombang × Frekuensi (v konstan pada medium sama)',
          unit: 'v dalam m/s, λ dalam m, f dalam Hz',
          variables: [
            { symbol: 'A', name: 'Amplitudo', unit: 'meter (m)', desc: 'Simpangan maksimum; menentukan besar energi atau keras-lemahnya bunyi.' },
            { symbol: 'f & T', name: 'Frekuensi & Periode', unit: 'Hz & sekon', desc: 'f = jumlah gelombang per detik; T = waktu untuk 1 gelombang (f = 1/T).' },
            { symbol: 'λ (Lambda)', name: 'Panjang Gelombang', unit: 'meter (m)', desc: 'Jarak 1 bukit + 1 lembah. Pada medium tetap, f naik → λ memendek.' }
          ]
        },
        mayerTips: [
          { icon: '⚠️', title: 'Medium sama → v selalu tetap!', desc: 'Menggoyang tali lebih cepat (f naik) tidak menambah laju rambat v, melainkan membuat bukit gelombang lebih rapat (λ mengecil).' }
        ]
      },
      {
        id: 'g2',
        title: '2. Gelombang Berjalan & Stasioner (Senar Gitar)',
        badge: 'Pola Gelombang',
        dailyQuestion: 'Mengapa menekan fret gitar di dekat lubang suara langsung membuat nada petikan senar terdengar lebih tinggi?',
        explanation: 'Gelombang berjalan memiliki amplitudo yang sama di setiap titik yang dilewati. Sebaliknya, pada senar gitar yang terikat kedua ujungnya, gelombang maju dan gelombang pantul saling bertemu membentuk Gelombang Stasioner — dengan titik diam (Simpul) dan titik getar maksimum (Perut). Makin pendek senar (L), makin tinggi frekuensi nadanya.',
        formula: {
          code: 'f_n = (n · v) / (2 · L)',
          readAs: 'Frekuensi nada dawai berbanding terbalik dengan panjang senar (L)',
          unit: 'Hertz (Hz)',
          variables: [
            { symbol: 'Simpul', name: 'Titik Diam (A = 0)', unit: 'Pola', desc: 'Titik pada senar yang tidak ikut naik-turun (termasuk kedua ujung terikat).' },
            { symbol: 'Perut', name: 'Titik Getar Maksimal', unit: 'Pola', desc: 'Bagian senar yang berayun paling lebar.' },
            { symbol: 'L', name: 'Panjang Senar Bergetar', unit: 'meter (m)', desc: 'Menekan fret memperpendek L sehingga λ mengecil dan nada makin tinggi.' }
          ]
        },
        mayerTips: [
          { icon: '🎸', title: 'Kencang & pendek = nada tinggi', desc: 'Memutar tuning gitar memperbesar tegangan senar (v naik) dan menekan fret memperpendek L — keduanya menaikkan nada.' }
        ]
      },
      {
        id: 'g3',
        title: '3. Gelombang Bunyi, Resonansi & Efek Doppler',
        badge: 'Bunyi',
        dailyQuestion: 'Mengapa suara sirine ambulans terdengar lebih nyaring (tinggi) saat mendekat, lalu mendadak lebih rendah saat menjauh?',
        explanation: 'Bunyi adalah gelombang longitudinal yang merambat lewat medium (di udara v ≈ 340 m/s). Ketika dua benda memiliki frekuensi alami sama, timbul Resonansi (suara makin keras, seperti kotak gitar). Sedangkan Efek Doppler adalah perubahan frekuensi bunyi yang didengar akibat gerak relatif sumber atau pendengar.',
        formula: {
          code: 'fp = ((v ± vp) / (v ± vs)) · fs',
          readAs: 'Frekuensi terdengar naik saat saling mendekat dan turun saat saling menjauh',
          unit: 'Hertz (Hz)',
          variables: [
            { symbol: 'fp', name: 'Frekuensi Pendengar', unit: 'Hz', desc: 'Nada yang diterima telinga pendengar.' },
            { symbol: 'fs', name: 'Frekuensi Sumber', unit: 'Hz', desc: 'Nada asli dari sumber bunyi (misal sirine).' },
            { symbol: 'v, vp, vs', name: 'Laju Bunyi, Pendengar, Sumber', unit: 'm/s', desc: 'Sumber mendekat pakai (−vs) di penyebut agar fp makin besar; menjauh pakai (+vs).' }
          ]
        },
        mayerTips: [
          { icon: '🚑', title: 'Aturan mudah Efek Doppler', desc: 'Mendekat = frekuensi NAIK (nada tinggi). Menjauh = frekuensi TURUN (nada rendah).' }
        ]
      }
    ],
    questions: [
      {
        id: 'g_q1',
        bloom: 'C2',
        topic: 'Gelombang Mekanik • Energi vs Materi',
        stem: 'Sebuah gabus terapung di permukaan kolam saat gelombang air melintas. Gerakan yang dialami gabus adalah…',
        options: [
          { key: 'A', text: 'Ikut hanyut bergerak cepat bersama gelombang sampai ke tepi kolam.' },
          { key: 'B', text: 'Bergetar naik-turun di tempat karena gelombang merambatkan energi, bukan memindahkan air.' },
          { key: 'C', text: 'Langsung tenggelam ke dasar kolam.' },
          { key: 'D', text: 'Berputar mengelilingi sumber getaran.' }
        ],
        correct: 'B',
        explanation: 'Gelombang mekanik memindahkan energi; partikel medium dan gabus hanya bergetar naik-turun di sekitar titik setimbangnya.'
      },
      {
        id: 'g_q2',
        bloom: 'C2',
        topic: 'Miskonsepsi Cepat Rambat • Medium Sama',
        stem: 'Andi menggetarkan tali yang sama (ketegangan dan jenis tali tidak diubah), tetapi sekarang ia menggetarkannya 2 kali lebih cepat (frekuensi f menjadi 2×). Apa yang terjadi?',
        options: [
          { key: 'A', text: 'Cepat rambat v menjadi 2× lebih cepat, panjang gelombang λ tetap.' },
          { key: 'B', text: 'Cepat rambat v tetap konstan, sedangkan panjang gelombang λ menyusut menjadi setengahnya.' },
          { key: 'C', text: 'Cepat rambat v dan panjang gelombang λ sama-sama naik 2×.' },
          { key: 'D', text: 'Gelombang berhenti merambat.' }
        ],
        correct: 'B',
        explanation: 'Pada medium yang sama, cepat rambat gelombang (v) selalu konstan. Jika f naik 2×, maka λ = v/f menjadi ½ kali semula.'
      },
      {
        id: 'g_q3',
        bloom: 'C2',
        topic: 'Efek Doppler • Arah Gerak Sumber Bunyi',
        stem: 'Sebuah mobil pemadam kebakaran melaju kencang mendekatimu lalu melewatimu dan menjauh sambil membunyikan sirine konstan. Apa yang kamu dengar?',
        options: [
          { key: 'A', text: 'Nada terdengar lebih tinggi saat mendekat, lalu turun lebih rendah saat menjauh.' },
          { key: 'B', text: 'Nada terdengar lebih rendah saat mendekat, lalu naik saat menjauh.' },
          { key: 'C', text: 'Nada sama persis sepanjang waktu.' },
          { key: 'D', text: 'Bunyi hanya terdengar saat mobil berhenti.' }
        ],
        correct: 'A',
        explanation: 'Menurut Efek Doppler, sumber mendekat memadatkan muka gelombang (fp > fs) dan sumber menjauh merenggangkannya (fp < fs).'
      },
      {
        id: 'g_q4',
        bloom: 'C3',
        topic: 'Cepat Rambat Gelombang • Perhitungan',
        stem: 'Gelombang pada tali memiliki frekuensi f = 4 Hz dan panjang satu gelombangnya λ = 1,5 meter. Berapakah cepat rambat gelombang (v) pada tali tersebut?',
        options: [
          { key: 'A', text: '2,67 m/s' },
          { key: 'B', text: '5,5 m/s' },
          { key: 'C', text: '6,0 m/s' },
          { key: 'D', text: '12,0 m/s' }
        ],
        correct: 'C',
        explanation: 'v = λ · f = 1,5 m × 4 Hz = 6,0 m/s.'
      },
      {
        id: 'g_q5',
        bloom: 'C3',
        topic: 'Efek Doppler • Hitungan Ringan',
        stem: 'Ambulans bergerak mendekati pendengar diam dengan laju vs = 20 m/s sambil membunyikan sirine 640 Hz (cepat rambat bunyi di udara v = 340 m/s). Berapa frekuensi yang didengar?',
        options: [
          { key: 'A', text: '600 Hz' },
          { key: 'B', text: '640 Hz' },
          { key: 'C', text: '680 Hz' },
          { key: 'D', text: '720 Hz' }
        ],
        correct: 'C',
        explanation: 'fp = (v / (v − vs)) × fs = (340 / (340 − 20)) × 640 = (340 / 320) × 640 = 680 Hz.'
      },
      {
        id: 'g_q6',
        bloom: 'C4',
        topic: 'Analisis Senar Gitar • Panjang & Nada',
        stem: 'Senar gitar sepanjang 60 cm menghasilkan nada dasar 220 Hz. Jika pemain gitar menekan fret sehingga panjang senar yang bergetar tinggal 30 cm (tegangan senar tetap), bagaimana perubahan λ dan frekuensi nadanya?',
        options: [
          { key: 'A', text: 'Panjang gelombang λ jadi setengahnya, frekuensi naik menjadi 440 Hz (satu oktaf lebih tinggi).' },
          { key: 'B', text: 'Panjang gelombang λ tetap, frekuensi turun jadi 110 Hz.' },
          { key: 'C', text: 'Panjang gelombang λ jadi 2× lipat, frekuensi tetap 220 Hz.' },
          { key: 'D', text: 'Cepat rambat di senar berubah jadi nol.' }
        ],
        correct: 'A',
        explanation: 'Pada tegangan tetap, v tetap. Karena L jadi ½ kali, maka λ = 2L menjadi ½ kali, sehingga f = v/λ naik 2× lipat menjadi 440 Hz.'
      }
    ]
  },

  /* ========================================================================
     BAB 5: SUHU, KALOR & GAS IDEAL (3 UNIT + 6 SOAL)
     ======================================================================== */
  {
    id: 'kalor',
    number: 'Bab 05',
    title: 'Suhu, Kalor & Gas Ideal',
    shortTitle: 'Kalor & Gas Ideal',
    subtitle: 'Suhu & Pemuaian, Asas Black, Perpindahan Kalor (Angin Laut) & Gas Ideal',
    teaser: 'Kenapa sendok besi terasa lebih dingin dari sendok kayu di ruangan yang sama, dan kenapa ban motor makin keras di siang terik?',
    icon: '🔥',
    themeColor: 'amber',
    badgeText: 'Kalor & Partikel Gas',
    estimatedTime: '15 Menit',
    cp: 'Peserta didik mampu memahami konsep suhu, kalor, perpindahan kalor, dan perilaku mikroskopis gas ideal dalam kehidupan sehari-hari.',
    tpList: [
      'Membedakan suhu dan kalor serta menerapkan Q = m·c·ΔT dan Asas Black.',
      'Menjelaskan konduksi, konveksi (angin laut–darat), dan radiasi secara akurat tanpa miskonsepsi.',
      'Menerapkan hubungan tekanan, volume, dan suhu mutlak pada gas ideal (PV = nRT).'
    ],
    narrationText: 'Bab 5 Suhu, Kalor, dan Gas Ideal. Kita akan membedakan suhu dan kalor, mengenal penyebab angin laut di pesisir, alasan logam terasa dingin di tangan, serta gerak partikel gas dalam ban kendaraan.',
    units: [
      {
        id: 'k1',
        title: '1. Suhu, Pemuaian, Kalor & Asas Black',
        badge: 'Fondasi',
        dailyQuestion: 'Mengapa teh panas yang dicampur air dingin menjadi hangat setimbang, dan mengapa sambungan jembatan diberi celah kecil?',
        explanation: 'Suhu menyatakan derajat panas benda, sedangkan Kalor (Q) adalah energi yang berpindah karena beda suhu. Benda yang dipanaskan juga memuai (bertambah panjang/volume). Pada sistem terisolasi berlaku Asas Black: kalor yang dilepas zat panas sama dengan kalor yang diterima zat dingin hingga mencapai suhu setimbang.',
        formula: {
          code: 'Q = m · c · ΔT   &   Q_lepas = Q_terima',
          readAs: 'Kalor = Massa × Kalor Jenis × Perubahan Suhu',
          unit: 'Joule (J)',
          variables: [
            { symbol: 'm', name: 'Massa Zat', unit: 'kg', desc: 'Makin besar massanya, makin banyak kalor untuk menaikkan suhunya.' },
            { symbol: 'c', name: 'Kalor Jenis', unit: 'J/kg·°C', desc: 'Air punya c besar (4.200) → lambat panas & bagus untuk pendingin radiator.' },
            { symbol: 'ΔT', name: 'Perubahan Suhu', unit: '°C atau K', desc: 'Selisih suhu akhir dan awal. Saat berubah wujud (es melebur), suhu tetap konstan.' }
          ]
        },
        mayerTips: [
          { icon: '🏖️', title: 'Pasir pantai vs air laut', desc: 'Pasir cepat panas di siang hari karena kalor jenisnya kecil, sedangkan air laut lambat berubah suhu.' }
        ]
      },
      {
        id: 'k2',
        title: '2. Perpindahan Kalor (Konduksi, Konveksi & Radiasi)',
        badge: 'Perpindahan Panas',
        dailyQuestion: 'Kenapa sendok besi di meja terasa lebih dingin daripada sendok kayu di ruangan yang sama, dan bagaimana angin laut terjadi di pesisir Jeneponto?',
        explanation: 'Kalor berpindah lewat 3 mekanisme: (1) Konduksi pada zat padat tanpa partikel berpindah — laju konduksi logam tinggi sehingga cepat menyerap panas kulit tangan kita; (2) Konveksi lewat aliran fluida hangat naik & dingin turun (angin laut siang hari, angin darat malam hari); (3) Radiasi berupa gelombang elektromagnetik tanpa butuh medium.',
        formula: {
          code: 'H = Q / t = k · A · (ΔT / L)',
          readAs: 'Laju hantaran konduksi bergantung pada konduktivitas bahan (k), luas, dan beda suhu',
          unit: 'Joule/sekon (Watt)',
          variables: [
            { symbol: 'k', name: 'Konduktivitas Termal', unit: 'W/m·K', desc: 'Besar pada konduktor (besi, tembaga), kecil pada isolator (kayu, plastik).' },
            { symbol: 'Konveksi', name: 'Aliran Fluida', unit: 'Proses', desc: 'Udara hangat lebih renggang dan naik, udara sejuk mengalir menggantikannya.' },
            { symbol: 'Radiasi', name: 'Pancaran Gelombang', unit: 'Proses', desc: 'Panas matahari sampai ke bumi melewati ruang hampa tanpa perantara.' }
          ]
        },
        mayerTips: [
          { icon: '🥄', title: 'Logam tidak "memproduksi dingin"!', desc: 'Di ruangan sama, suhu logam = suhu kayu. Logam terasa dingin semata karena laju konduksinya cepat menyerap panas tanganmu.' }
        ]
      },
      {
        id: 'k3',
        title: '3. Gerak Partikel & Persamaan Gas Ideal (PV = nRT)',
        badge: 'Gas Ideal',
        dailyQuestion: 'Apa yang terjadi pada miliaran molekul udara di dalam ban motor ketika diparkir lama di bawah terik matahari siang?',
        explanation: 'Secara mikroskopis, suhu mutlak (T dalam Kelvin) sebanding dengan energi kinetik rata-rata partikel gas. Saat gas dipanaskan, partikel bergerak makin cepat dan menumbuk dinding lebih keras sehingga tekanan (P) meningkat. Jika volume ditekan pada suhu tetap (Boyle), ruang menyempit sehingga tumbukan makin rapat dan tekanan naik.',
        formula: {
          code: 'P · V = n · R · T   &   (P₁·V₁)/T₁ = (P₂·V₂)/T₂',
          readAs: 'Tekanan × Volume sebanding dengan Suhu Mutlak (Kelvin)',
          unit: 'P (Pa), V (m³), T (Kelvin)',
          variables: [
            { symbol: 'T (Kelvin)', name: 'Suhu Mutlak', unit: 'K = °C + 273', desc: 'Wajib diubah ke Kelvin saat menghitung perbandingan gas ideal.' },
            { symbol: 'P', name: 'Tekanan Gas', unit: 'Pa atau kPa', desc: 'Dihasilkan oleh tumbukan partikel gas ke dinding wadah.' },
            { symbol: 'V', name: 'Volume Ruang', unit: 'm³ atau Liter', desc: 'Pada T tetap, memperkecil V menjadi setengahnya menaikkan P menjadi 2× lipat.' }
          ]
        },
        mayerTips: [
          { icon: '🌡️', title: 'Ingat selalu satuan Kelvin!', desc: '27°C = 300 K. Jangan pernah membagi langsung dengan °C di rumus gas ideal.' }
        ]
      }
    ],
    questions: [
      {
        id: 'k_q1',
        bloom: 'C2',
        topic: 'Perpindahan Kalor • Miskonsepsi Logam vs Kayu',
        stem: 'Sendok aluminium dan sendok kayu sudah diletakkan berjam-jam di ruangan bersuhu 27°C. Saat dipegang, sendok aluminium terasa jauh lebih dingin. Penjelasan ilmiah yang tepat adalah…',
        options: [
          { key: 'A', text: 'Suhu sendok aluminium secara alami jauh lebih rendah daripada suhu ruangan.' },
          { key: 'B', text: 'Aluminium memancarkan partikel dingin ke kulit tangan.' },
          { key: 'C', text: 'Keduanya bersuhu sama (27°C), tetapi aluminium konduktor baik yang menyerap panas tangan jauh lebih cepat.' },
          { key: 'D', text: 'Kayu menghasilkan kalor sendiri dari dalam seratnya.' }
        ],
        correct: 'C',
        explanation: 'Benda yang lama berada di ruangan yang sama memiliki suhu setimbang yang sama. Sensasi dingin muncul karena laju konduksi logam cepat mengalirkan panas keluar dari tangan.'
      },
      {
        id: 'k_q2',
        bloom: 'C2',
        topic: 'Kalor Jenis • Pendingin Radiator',
        stem: 'Mengapa air sangat efektif digunakan sebagai cairan pendingin radiator mesin kendaraan?',
        options: [
          { key: 'A', text: 'Karena kalor jenis air (c) sangat besar sehingga mampu menyerap banyak panas tanpa cepat naik suhu ekstrem.' },
          { key: 'B', text: 'Karena air tidak bisa menyerap panas sama sekali.' },
          { key: 'C', text: 'Karena massa jenis air lebih besar daripada baja.' },
          { key: 'D', text: 'Karena air langsung membeku saat mesin bekerja.' }
        ],
        correct: 'A',
        explanation: 'Kalor jenis air tinggi (≈ 4.200 J/kg°C) membuat air mampu menyerap energi kalor besar dengan kenaikan suhu relatif kecil.'
      },
      {
        id: 'k_q3',
        bloom: 'C2',
        topic: 'Teori Kinetik Gas • Pengaruh Suhu',
        stem: 'Saat gas di dalam tabung tertutup (volume tetap) dipanaskan, apa yang terjadi pada partikel-partikel gas di dalamnya?',
        options: [
          { key: 'A', text: 'Ukuran fisik tiap molekul membesar 5 kali lipat.' },
          { key: 'B', text: 'Kelajuan gerak partikel meningkat sehingga tumbukan pada dinding lebih keras dan tekanan naik.' },
          { key: 'C', text: 'Partikel berhenti bergerak di dasar tabung.' },
          { key: 'D', text: 'Jumlah molekul gas berlipat ganda.' }
        ],
        correct: 'B',
        explanation: 'Suhu mutlak sebanding dengan energi kinetik rata-rata gerak partikel. Ukuran molekul tetap; kecepatannyalah yang meningkat.'
      },
      {
        id: 'k_q4',
        bloom: 'C3',
        topic: 'Kalor • Perhitungan Q = m·c·ΔT',
        stem: 'Air bermassa 0,5 kg (c = 4.200 J/kg°C) dipanaskan dari 20°C menjadi 60°C. Berapakah energi kalor (Q) yang dibutuhkan?',
        options: [
          { key: 'A', text: '42.000 J' },
          { key: 'B', text: '84.000 J' },
          { key: 'C', text: '126.000 J' },
          { key: 'D', text: '168.000 J' }
        ],
        correct: 'B',
        explanation: 'ΔT = 60 − 20 = 40°C. Q = m·c·ΔT = 0,5 × 4.200 × 40 = 84.000 Joule.'
      },
      {
        id: 'k_q5',
        bloom: 'C3',
        topic: 'Gas Ideal • Hukum Boyle',
        stem: 'Gas pada suhu tetap memiliki tekanan 120 kPa dan volume 4 liter. Jika piston ditekan sehingga volumenya menyusut menjadi 2 liter, berapa tekanan akhirnya?',
        options: [
          { key: 'A', text: '60 kPa' },
          { key: 'B', text: '120 kPa' },
          { key: 'C', text: '240 kPa' },
          { key: 'D', text: '480 kPa' }
        ],
        correct: 'C',
        explanation: 'P₁·V₁ = P₂·V₂ → 120 × 4 = P₂ × 2 → P₂ = 480 / 2 = 240 kPa.'
      },
      {
        id: 'k_q6',
        bloom: 'C4',
        topic: 'Analisis Konveksi • Angin Laut vs Angin Darat Pesisir',
        stem: 'Pada siang hari yang terik di pesisir pantai, daratan cepat sekali panas (kalor jenis tanah kecil) dibanding air laut (kalor jenis air besar). Berdasarkan prinsip konveksi, arah angin yang bertiup adalah…',
        options: [
          { key: 'A', text: 'Dari laut ke darat (angin laut), karena udara hangat di atas daratan naik dan digantikan udara sejuk dari laut.' },
          { key: 'B', text: 'Dari darat ke laut (angin darat), karena udara di atas laut naik lebih cepat.' },
          { key: 'C', text: 'Tidak ada angin karena tekanan udara selalu sama.' },
          { key: 'D', text: 'Angin hanya bertiup ke atas secara radiasi.' }
        ],
        correct: 'A',
        explanation: 'Siang hari daratan lebih panas → udara darat memuai & naik (tekanan lokal rendah) → udara lebih sejuk dari laut mengalir ke darat (angin laut).'
      }
    ]
  },

  /* ========================================================================
     BAB 6: TERMODINAMIKA & MESIN KALOR (3 UNIT + 6 SOAL)
     ======================================================================== */
  {
    id: 'termodinamika',
    number: 'Bab 06',
    title: 'Termodinamika & Mesin Kalor',
    shortTitle: 'Termodinamika',
    subtitle: 'Hukum I Termodinamika, 4 Proses Grafik P–V, Hukum II, Mesin Carnot & Efisiensi Energi',
    teaser: 'Bagaimana panas pembakaran bensin mendorong piston motor, dan kenapa mesin tidak pernah bisa 100% efisien?',
    icon: '⚙️',
    themeColor: 'rose',
    badgeText: 'Usaha Gas & Mesin Kalor',
    estimatedTime: '15 Menit',
    cp: 'Peserta didik mampu menganalisis konversi energi kalor menjadi usaha melalui Hukum I & II Termodinamika serta kaitannya dengan efisiensi energi dan lingkungan.',
    tpList: [
      'Menerapkan Hukum I Termodinamika (ΔU = Q − W) dan menghitung usaha isobarik (W = P·ΔV).',
      'Membedakan 4 proses termodinamika (isobarik, isokhorik, isotermal, adiabatik) pada grafik P–V.',
      'Menghitung efisiensi mesin Carnot (η = 1 − Tr/Tt) dan mengaitkannya dengan efisiensi energi ramah lingkungan.'
    ],
    narrationText: 'Bab 6 Termodinamika. Di bab ini kamu akan memahami bagaimana energi panas berubah menjadi usaha piston, mengenal empat proses pada grafik P-V, hingga batas efisiensi mesin dan dampaknya bagi lingkungan.',
    units: [
      {
        id: 't1',
        title: '1. Hukum I Termodinamika & Usaha Piston (W = P·ΔV)',
        badge: 'Fondasi',
        dailyQuestion: 'Ketika gas di dalam silinder dipanaskan dan memuai mendorong piston ke atas, ke mana perginya energi kalor yang masuk?',
        explanation: 'Hukum I Termodinamika adalah hukum kekekalan energi pada sistem panas: kalor masuk (Q) terbagi untuk mengubah energi dalam/suhu gas (ΔU) dan melakukan usaha mekanik (W). Saat gas memuai mendorong keluar, W positif (+); saat gas ditekan dari luar, W negatif (−).',
        formula: {
          code: 'Q = ΔU + W   dengan   W = P · ΔV',
          readAs: 'Kalor = Perubahan Energi Dalam + Usaha Piston',
          unit: 'Joule (J)',
          variables: [
            { symbol: 'Q', name: 'Kalor', unit: 'Joule (J)', desc: '+Q jika sistem menyerap kalor; −Q jika sistem melepas kalor.' },
            { symbol: 'W', name: 'Usaha Mekanik', unit: 'Joule (J)', desc: '+W saat gas memuai (ΔV > 0); −W saat gas dikompresi/ditekan (ΔV < 0).' },
            { symbol: 'ΔU', name: 'Perubahan Energi Dalam', unit: 'Joule (J)', desc: 'Berkaitan langsung dengan perubahan suhu gas (ΔU = Q − W).' }
          ]
        },
        mayerTips: [
          { icon: '📈', title: 'Luas di bawah grafik P–V = Usaha W', desc: 'Pada proses tekanan tetap (isobarik), luas persegi panjang P × ΔV adalah besar usaha gas.' }
        ]
      },
      {
        id: 't2',
        title: '2. Empat Proses Termodinamika & Grafik P–V',
        badge: 'Hukum Inti',
        dailyQuestion: 'Kenapa tabung pompa sepeda terasa hangat saat ditekan cepat-cepat padahal tidak dipanaskan api?',
        explanation: 'Empat proses utama gas: (1) Isobarik (P tetap, W = P·ΔV), (2) Isokhorik (V tetap, ΔV = 0 → W = 0, Q = ΔU), (3) Isotermal (T tetap, ΔU = 0 → Q = W), dan (4) Adiabatik (tidak ada kalor masuk/keluar, Q = 0 → ΔU = −W, sehingga suhu tetap berubah saat gas ditekan atau memuai cepat!).',
        formula: {
          code: 'Isokhorik: W = 0  |  Isotermal: ΔU = 0  |  Adiabatik: Q = 0',
          readAs: 'Kenali variabel mana yang nol pada tiap proses untuk menyederhanakan Hukum I',
          unit: 'Proses Gas Ideal',
          variables: [
            { symbol: 'Isobarik / Isokhorik', name: 'P tetap / V tetap', unit: 'Garis lurus', desc: 'Isobarik bergaris datar di grafik P–V; Isokhorik bergaris tegak lurus (W = 0).' },
            { symbol: 'Isotermal', name: 'Suhu Tetap (ΔU = 0)', unit: 'Kurva landai', desc: 'Seluruh kalor masuk diubah menjadi usaha (Q = W).' },
            { symbol: 'Adiabatik', name: 'Tanpa Kalor (Q = 0)', unit: 'Kurva curam', desc: 'Suhu TETAP berubah! Kompresi cepat (W < 0) membuat ΔU > 0 (suhu naik).' }
          ]
        },
        mayerTips: [
          { icon: '⚠️', title: 'Adiabatik (Q = 0) ≠ Suhu Tetap!', desc: 'Jangan tertukar dengan isotermal! Pada adiabatik suhu justru berubah karena usaha langsung mengubah energi dalam.' }
        ]
      },
      {
        id: 't3',
        title: '3. Hukum II Termodinamika, Mesin Carnot & Efisiensi Energi',
        badge: 'Aplikasi & Iklim',
        dailyQuestion: 'Mengapa tidak ada mesin motor atau pembangkit listrik yang bisa mengubah 100% panas bahan bakar menjadi tenaga gerak?',
        explanation: 'Hukum II Termodinamika menyatakan kalor mengalir spontan dari suhu tinggi ke rendah, dan mesin kalor yang bekerja dalam siklus pasti membuang sebagian kalor ke lingkungan dingin. Efisiensi tertinggi teoretis (Mesin Carnot) ditentukan oleh suhu Kelvin reservoir panas (Tt) dan dingin (Tr). Efisiensi tinggi penting untuk menghemat bahan bakar dan menekan emisi pemanasan global.',
        formula: {
          code: 'η = (1 − Tr / Tt) × 100%',
          readAs: 'Efisiensi Carnot bergantung pada rasio suhu dingin terhadap suhu panas (dalam Kelvin)',
          unit: 'Persen (%)',
          variables: [
            { symbol: 'η (Eta)', name: 'Efisiensi Mesin', unit: '%', desc: 'Persentase energi panas yang berhasil diubah menjadi usaha berguna (selalu < 100%).' },
            { symbol: 'Tt', name: 'Suhu Reservoir Panas', unit: 'Kelvin (K)', desc: 'Wajib dalam satuan Kelvin (K = °C + 273).' },
            { symbol: 'Tr', name: 'Suhu Reservoir Dingin', unit: 'Kelvin (K)', desc: 'Makin besar selisih Tt dan Tr, makin tinggi efisiensinya.' }
          ]
        },
        mayerTips: [
          { icon: '🌍', title: 'Efisiensi & Perubahan Iklim', desc: 'Panas buangan dan pembakaran fosil tidak efisien memperbesar emisi gas rumah kaca; teknologi kendaraan listrik & energi terbarukan membantu menekannya.' }
        ]
      }
    ],
    questions: [
      {
        id: 't_q1',
        bloom: 'C2',
        topic: 'Proses Isokhorik • Volume Tetap',
        stem: 'Gas dipanaskan di dalam tabung baja tertutup rapat sehingga volumenya sama sekali tidak bisa berubah (ΔV = 0). Bagaimana usaha luar (W) dan perubahan energi dalamnya?',
        options: [
          { key: 'A', text: 'Usaha W sangat besar tak terhingga.' },
          { key: 'B', text: 'Usaha W = 0, sehingga seluruh kalor yang masuk menaikkan energi dalam gas (Q = ΔU).' },
          { key: 'C', text: 'Usaha W bernilai negatif.' },
          { key: 'D', text: 'Energi dalam ΔU pasti nol.' }
        ],
        correct: 'B',
        explanation: 'Karena ΔV = 0 (isokhorik), W = P·ΔV = 0. Dari Q = ΔU + W, seluruh kalor menjadi kenaikan energi dalam.'
      },
      {
        id: 't_q2',
        bloom: 'C2',
        topic: 'Miskonsepsi Adiabatik • Q = 0 vs Suhu',
        stem: 'Gas dalam pompa sepeda ditekan secara sangat cepat sehingga tidak sempat bertukar kalor dengan luar (proses adiabatik, Q = 0). Pernyataan yang benar adalah…',
        options: [
          { key: 'A', text: 'Suhu gas pasti tetap konstan karena tidak ada kalor masuk.' },
          { key: 'B', text: 'Suhu gas naik karena usaha tekan dari luar (−W) diubah menjadi kenaikan energi dalam (ΔU = −W).' },
          { key: 'C', text: 'Energi dalam gas tidak berubah (ΔU = 0).' },
          { key: 'D', text: 'Usaha yang dilakukan sama dengan nol.' }
        ],
        correct: 'B',
        explanation: 'Pada adiabatik (Q = 0), ΔU = −W. Karena gas ditekan (W negatif), ΔU menjadi positif sehingga suhu gas meningkat.'
      },
      {
        id: 't_q3',
        bloom: 'C2',
        topic: 'Hukum II Termodinamika • Batas Efisiensi',
        stem: 'Menurut Hukum II Termodinamika, mengapa mesin kendaraan bermotor tidak mungkin mencapai efisiensi 100%?',
        options: [
          { key: 'A', text: 'Karena setiap mesin kalor siklis wajib membuang sebagian kalor ke lingkungan bersuhu lebih rendah.' },
          { key: 'B', text: 'Karena hukum kekekalan energi tidak berlaku di dalam mesin.' },
          { key: 'C', text: 'Karena bensin tidak mengandung energi kalor.' },
          { key: 'D', text: 'Karena suhu knalpot selalu 0 Kelvin.' }
        ],
        correct: 'A',
        explanation: 'Hukum II Termodinamika menyatakan tidak mungkin seluruh kalor dari reservoir panas diubah 100% menjadi usaha dalam suatu siklus tanpa ada kalor buang.'
      },
      {
        id: 't_q4',
        bloom: 'C3',
        topic: 'Usaha Isobarik • Perhitungan',
        stem: 'Gas dalam silinder berpiston memuai pada tekanan tetap P = 2.000 Pa sehingga volumenya bertambah ΔV = 0,3 m³. Berapakah usaha (W) yang dilakukan gas?',
        options: [
          { key: 'A', text: '300 Joule' },
          { key: 'B', text: '600 Joule' },
          { key: 'C', text: '2.300 Joule' },
          { key: 'D', text: '6.000 Joule' }
        ],
        correct: 'B',
        explanation: 'W = P · ΔV = 2.000 Pa × 0,3 m³ = 600 Joule.'
      },
      {
        id: 't_q5',
        bloom: 'C3',
        topic: 'Mesin Carnot • Hitungan Efisiensi',
        stem: 'Sebuah mesin Carnot bekerja antara reservoir panas Tt = 800 K dan reservoir dingin Tr = 400 K. Berapakah efisiensi mesin tersebut?',
        options: [
          { key: 'A', text: '25%' },
          { key: 'B', text: '50%' },
          { key: 'C', text: '75%' },
          { key: 'D', text: '100%' }
        ],
        correct: 'B',
        explanation: 'η = (1 − Tr / Tt) × 100% = (1 − 400/800) × 100% = (1 − 0,5) × 100% = 50%.'
      },
      {
        id: 't_q6',
        bloom: 'C4',
        topic: 'Analisis Hukum I • Memuai vs Ditekan',
        stem: 'Sistem gas A menyerap kalor 600 J sambil memuai melakukan usaha +400 J. Sistem gas B menyerap kalor 200 J sambil ditekan dari luar dengan usaha −300 J. Mana yang mengalami kenaikan energi dalam (ΔU) lebih besar?',
        options: [
          { key: 'A', text: 'Sistem A (ΔU = +200 J vs +500 J).' },
          { key: 'B', text: 'Sistem B (ΔU = +500 J, lebih besar daripada Sistem A yang hanya +200 J).' },
          { key: 'C', text: 'Keduanya sama persis (+200 J).' },
          { key: 'D', text: 'Sistem B mengalami penurunan suhu (ΔU = −100 J).' }
        ],
        correct: 'B',
        explanation: 'Sistem A: ΔU = 600 − 400 = +200 J. Sistem B: ΔU = 200 − (−300) = +500 J. Jadi Sistem B mengalami kenaikan energi dalam lebih besar.'
      }
    ]
  }
];

// Gabungkan unit tambahan & konten per-unit (analogi, mini-slider, mitos/fakta, cek pemahaman, LaTeX)
PHYSICS_TOPICS.forEach((topic) => {
  const extra = EXTRA_UNITS[topic.id] || [];
  extra.forEach((u) => {
    if (!topic.units.some((x) => x.id === u.id)) topic.units.push(u);
  });
  topic.units.forEach((unit) => {
    const add = UNIT_EXTRAS[unit.id];
    if (!add) return;
    const { latex, ...rest } = add;
    Object.assign(unit, rest);
    if (unit.formula && latex) unit.formula.latex = latex;
  });
});
