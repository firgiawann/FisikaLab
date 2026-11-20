/**
 * Konten tambahan per-UNIT materi (Bloom C1–C3):
 * - simpleAnalogy : bahasa santai tanpa rumus
 * - miniSlider    : "coba rasakan sendiri"
 * - mythVsFact    : kartu mitos vs fakta
 * - check         : 1 cek pemahaman C2 sebelum lanjut (tidak ada hukuman)
 * - latex         : rumus untuk KaTeX
 * Digabung ke PHYSICS_TOPICS di physicsCurriculum.js.
 */

export const UNIT_EXTRAS = {
  /* ===== BAB 1 FLUIDA (5 UNIT LENGKAP — BASELINE UTAMA) ===== */
  u1: {
    latex: 'P_h = \\rho \\, g \\, h \\quad ; \\quad P_{\\text{total}} = P_0 + \\rho \\, g \\, h',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Bayangkan kamu menumpuk 10 bantal di atas tanganmu dibanding cuma 2 bantal. Makin tinggi tumpukannya, makin berat dorongannya, kan? Air di kolam atau laut juga persis begitu: makin dalam kamu menyelam, makin tebal tumpukan air di atasmu yang menekan ke segala arah.'
    },
    miniSlider: {
      label: 'Coba geser kedalaman menyelammu:',
      unit: 'meter',
      min: 0,
      max: 10,
      effectText: (v) =>
        v === 0
          ? 'Di permukaan air (h = 0) — telinga hanya merasakan tekanan udara luar.'
          : v <= 3
          ? `Kedalaman ${v} m — mulai terasa dorongan halus di gendang telinga.`
          : v <= 7
          ? `Kedalaman ${v} m — tumpukan air di atasmu makin berat, tekanan hidrostatis makin kuat!`
          : `Kedalaman ${v} m — tekanan sangat kuat! Penyelam perlu menyeimbangkan tekanan telinga (ekualisasi).`
    },
    mythVsFact: [
      {
        myth: '“Di laut yang luas banget, tekanan air pada kedalaman 2 meter jauh lebih besar daripada di bak sempit kedalaman 2 meter.”',
        verdict: 'MITOS! ❌',
        fact: 'Tekanan hidrostatis hanya bergantung pada jenis cairan (ρ), gravitasi (g), dan kedalaman (h) — tidak peduli wadahnya sempit atau seluas lautan.'
      },
      {
        myth: '“Kedalaman h dihitung dari permukaan atas air ke bawah, bukan dari dasar kolam.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Karena tekanan berasal dari berat kolom air yang berada di ATAS titik tersebut.'
      }
    ],
    workedExample: {
      question: 'Seorang penyelam berada di kedalaman 4 meter di kolam air tawar (ρ = 1.000 kg/m³, g = 10 m/s²). Berapakah tekanan hidrostatis yang dialami penyelam?',
      known: 'ρ = 1.000 kg/m³, g = 10 m/s², h = 4 m',
      steps: [
        'Gunakan rumus tekanan hidrostatis: Ph = ρ × g × h',
        'Masukkan nilainya: Ph = 1.000 × 10 × 4',
        'Hitung hasilnya: Ph = 40.000 Pa (atau 40 kPa)'
      ],
      answer: '40.000 Pa (40 kPa)'
    },
    check: {
      question: 'Penyelam turun dari kedalaman 2 m ke 6 m di air yang sama. Apa yang terjadi pada tekanan hidrostatis di tubuhnya?',
      options: [
        { key: 'A', text: 'Tetap sama' },
        { key: 'B', text: 'Menjadi 3 kali lebih besar, karena h naik 3 kali lipat' },
        { key: 'C', text: 'Berkurang, karena air di tempat dalam lebih dingin' }
      ],
      correct: 'B',
      right: 'Tepat! Tekanan hidrostatis berbanding lurus dengan kedalaman (h).',
      wrong: 'Hampir. Ingat tumpukan air di atasmu: kedalaman naik dari 2 m ke 6 m (3× lipat), maka tekanannya ikut naik 3× lipat.'
    }
  },
  u2: {
    latex: 'P_1 = P_2 \\;\\Rightarrow\\; \\frac{F_1}{A_1} = \\frac{F_2}{A_2}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Pernah memencet pasta gigi atau kantong air yang tertutup rapat? Saat kamu tekan di satu ujung, tekanannya langsung terasa sama rata di seluruh isi kantong. Di bengkel cuci mobil, sifat inilah yang dipakai dongkrak hidrolik untuk mengubah dorongan tangan kecil jadi tenaga pengangkat mobil.'
    },
    miniSlider: {
      label: 'Atur luas piston besar (berapa kali lipat dari piston kecil):',
      unit: '× lipat luas',
      min: 1,
      max: 25,
      effectText: (v) =>
        v === 1
          ? 'Luas kedua piston sama — gaya angkat sama persis dengan gaya dorong tangan (belum berlipat).'
          : v <= 10
          ? `Luas piston besar ${v}× lipat — dorongan tangan 100 N sudah jadi ${v * 100} N!`
          : `Luas piston besar ${v}× lipat — dorongan 100 N terlipat jadi ${v * 100} N (cukup mengangkat beban sangat berat!).`
    },
    mythVsFact: [
      {
        myth: '“Dongkrak hidrolik menciptakan energi gratis karena tenaga kecil bisa mengangkat mobil.”',
        verdict: 'MITOS! ❌',
        fact: 'Dongkrak hanya melipatgandakan gaya, bukan energi. Piston kecil harus ditekan dengan jarak yang jauh lebih panjang dibanding naiknya mobil.'
      },
      {
        myth: '“Tekanan di dalam cairan ruang tertutup diteruskan sama besar ke segala arah.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Itulah inti Hukum Pascal (P₁ = P₂) yang juga bekerja pada sistem rem hidrolik motor dan mobil.'
      }
    ],
    workedExample: {
      question: 'Piston kecil dongkrak luasnya A₁ = 10 cm² dan piston besar A₂ = 200 cm². Jika piston kecil ditekan gaya F₁ = 150 N, berapa gaya angkat F₂ di piston besar?',
      known: 'A₁ = 10 cm², A₂ = 200 cm², F₁ = 150 N (satuan luas sudah sama, tidak perlu diubah ke m²)',
      steps: [
        'Gunakan perbandingan Hukum Pascal: F₂ / A₂ = F₁ / A₁',
        'Cari rasio luasnya: A₂ / A₁ = 200 / 10 = 20',
        'Kalikan dengan gaya awal: F₂ = 20 × 150 N = 3.000 N'
      ],
      answer: '3.000 N'
    },
    check: {
      question: 'Piston besar dongkrak luasnya 15 kali piston kecil. Jika piston kecil ditekan 100 N, gaya di piston besar menjadi…',
      options: [
        { key: 'A', text: '1.500 N' },
        { key: 'B', text: '100 N (tetap sama)' },
        { key: 'C', text: '15 N' }
      ],
      correct: 'A',
      right: 'Tepat! F₂ = (A₂/A₁) × F₁ = 15 × 100 N = 1.500 N.',
      wrong: 'Hampir. Karena tekanannya sama di kedua piston, piston yang luasnya 15× lebih besar menghasilkan gaya 15× lebih besar.'
    }
  },
  u3: {
    latex: 'F_A = \\rho_{f} \\, g \\, V_{c}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Saat kamu menekan bola plastik ke dalam ember air, tanganmu terasa "didorong balik" ke atas. Dorongan itu makin kuat kalau makin banyak bagian bola yang tercelup, atau kalau airnya makin pekat (seperti air garam di tambak pesisir Jeneponto). Itulah gaya apung.'
    },
    miniSlider: {
      label: 'Geser seberapa banyak bagian balok yang tercelup ke dalam air:',
      unit: '% tercelup',
      min: 0,
      max: 100,
      effectText: (v) =>
        v === 0
          ? 'Balok baru menyentuh permukaan air — gaya apung belum bekerja.'
          : v < 50
          ? `Tercelup ${v}% — air yang tergeser masih sedikit, dorongan ke atas mulai terasa.`
          : v < 100
          ? `Tercelup ${v}% — volume air terdesak makin besar, dorongan ke atas makin kuat!`
          : 'Tercelup 100% (penuh) — gaya apung mencapai nilai maksimumnya; turun lebih dalam lagi tidak menambah Fa.'
    },
    mythVsFact: [
      {
        myth: '“Benda yang berat pasti tenggelam, benda ringan pasti terapung.”',
        verdict: 'MITOS! ❌',
        fact: 'Yang menentukan adalah massa jenis rata-rata (ρ), bukan berat semata. Kapal Pinisi dan kapal baja raksasa tetap terapung karena lambungnya berongga udara.'
      },
      {
        myth: '“Begitu batu sudah tercelup penuh di dalam air, gaya apung (Fa) tidak bertambah lagi walau batu makin dalam.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Karena volume air yang didesak batu (Vc) sudah tetap 100%, jadi Fa = ρ·g·Vc tetap konstan.'
      }
    ],
    workedExample: {
      question: 'Sebuah balok dengan volume tercelup Vc = 0,02 m³ berada di dalam air tawar (ρ = 1.000 kg/m³, g = 10 m/s²). Berapakah gaya apung (Fa) yang bekerja pada balok?',
      known: 'ρ_f = 1.000 kg/m³, g = 10 m/s², Vc = 0,02 m³',
      steps: [
        'Gunakan rumus Hukum Archimedes: Fa = ρ_f × g × Vc',
        'Masukkan nilainya: Fa = 1.000 × 10 × 0,02',
        'Hitung hasilnya: Fa = 200 N'
      ],
      answer: '200 N ke arah atas'
    },
    check: {
      question: 'Sebuah telur tenggelam di air tawar, lalu melayang saat air diberi banyak garam. Mengapa hal itu terjadi?',
      options: [
        { key: 'A', text: 'Garam membuat massa telur berkurang drastis' },
        { key: 'B', text: 'Garam menaikkan massa jenis air sehingga gaya apung meningkat hingga seimbang dengan berat telur' },
        { key: 'C', text: 'Garam menghilangkan tarikan gravitasi di dalam gelas' }
      ],
      correct: 'B',
      right: 'Betul! Menambah garam menaikkan ρ_fluida sehingga gaya apung (Fa = ρ_f·g·Vc) meningkat sampai sama dengan berat telur.',
      wrong: 'Belum pas. Berat telurnya tetap; yang berubah adalah airnya jadi lebih rapat (ρ naik) sehingga daya dorong air meningkat.'
    }
  },
  u4: {
    latex: '\\gamma = \\frac{F}{L} \\quad (\\text{pengenalan konsep permukaan})',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Rumit)',
      text: 'Pernah lihat serangga kecil berjalan santai di atas permukaan air tenang, atau ujung tisu yang langsung basah merambat ke atas saat disentuhkan ke air? Air punya "kulit tipis tak kasatmata" (tegangan permukaan) dan suka memanjat celah sempit (kapilaritas). Selain itu, tiap cairan punya kekentalan (viskositas) berbeda — air mengalir lancar, sedangkan madu atau oli mengalir pelan.'
    },
    miniSlider: {
      label: 'Bandingkan tingkat kekentalan (viskositas) cairan saat dituang:',
      unit: 'skala kental',
      min: 1,
      max: 10,
      effectText: (v) =>
        v <= 3
          ? `Skala ${v} (seperti air) — gesekan antar-lapisan kecil, cairan mengalir sangat cepat dan lancar.`
          : v <= 7
          ? `Skala ${v} (seperti minyak goreng / oli) — mulai terasa kental, aliran melambat karena gesekan dalam lebih besar.`
          : `Skala ${v} (seperti madu pekat) — viskositas tinggi! Gesekan internal besar sehingga cairan mengalir sangat lambat.`
    },
    mythVsFact: [
      {
        myth: '“Serangga anggang-anggang bisa berjalan di atas air karena gaya apung Archimedes seperti kapal.”',
        verdict: 'MITOS! ❌',
        fact: 'Kaki serangga yang sangat ringan tidak menembus air melainkan ditahan oleh tegangan permukaan (tarikan antar-molekul di permukaan air).'
      },
      {
        myth: '“Air bisa naik dari akar hingga daun tumbuhan salah satunya dibantu gejala kapilaritas pada pembuluh sempit.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Makin sempit pipa kapiler (seperti pembuluh xilem), makin tinggi air dapat memanjat.'
      }
    ],
    workedExample: {
      question: 'Sebuah kawat tipis sepanjang 0,1 m ditarik ke atas dari permukaan air dengan gaya tegangan permukaan F = 0,014 N (2 sisi permukaan, L = 2 × 0,1 m = 0,2 m). Berapa tegangan permukaan air tersebut?',
      known: 'F = 0,014 N, panjang efektif 2 sisi permukaan = 0,2 m',
      steps: [
        'Gunakan rumus dasar tegangan permukaan: γ = F / (2 × l)',
        'Masukkan nilainya: γ = 0,014 / 0,2',
        'Hitung hasilnya: γ = 0,07 N/m'
      ],
      answer: '0,07 N/m'
    },
    check: {
      question: 'Dua pipa kaca kosong dicelupkan ke air: Pipa A sangat sempit, Pipa B cukup lebar. Di pipa mana permukaan air naik lebih tinggi?',
      options: [
        { key: 'A', text: 'Pipa A (yang lebih sempit)' },
        { key: 'B', text: 'Pipa B (yang lebih lebar)' },
        { key: 'C', text: 'Sama tinggi di kedua pipa' }
      ],
      correct: 'A',
      right: 'Tepat! Gejala kapilaritas membuat air naik lebih tinggi pada pipa berdiameter lebih sempit.',
      wrong: 'Belum pas. Ingat tisu atau pembuluh tanaman yang pori-porinya sangat halus: makin sempit pipanya, makin tinggi air merambat naik.'
    }
  },
  u5: {
    latex: 'Q = A v \\;\\Rightarrow\\; A_1 v_1 = A_2 v_2 \\quad ; \\quad P + \\tfrac{1}{2}\\rho v^2 + \\rho g h = \\text{konstan}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Saat menyiram tanaman lalu menutup sebagian ujung selang dengan jempol, air langsung menyembur jauh lebih kencang! Karena air yang masuk dan keluar per detik harus sama banyak (kontinuitas), jalan yang menyempit memaksa air "ngebut". Uniknya, menurut Asas Bernoulli pada aliran ideal, di bagian yang alirannya makin cepat itu tekanannya justru lebih rendah!'
    },
    miniSlider: {
      label: 'Sempitkan penampang ujung selang (% tertutup jempol):',
      unit: '% tertutup',
      min: 0,
      max: 80,
      effectText: (v) =>
        v < 25
          ? `Tertutup ${v}% — lubang masih lebar, aliran air santai dan tekanan di dalam pipa masih tinggi.`
          : v < 60
          ? `Tertutup ${v}% — luas mengecil, kecepatan semburan meningkat agar debit air (Q = A·v) tetap!`
          : `Tertutup ${v}% — luas sangat sempit → air meluncur sangat kencang, dan tekanan statis di leher sempit turun (Asas Bernoulli).`
    },
    mythVsFact: [
      {
        myth: '“Di bagian pipa yang menyempit, air mengalir lebih cepat sekaligus tekanannya ikut menjadi lebih besar.”',
        verdict: 'MITOS! ❌',
        fact: 'Sebaliknya! Menurut Asas Bernoulli (pada fluida ideal), di tempat yang kelajuannya lebih tinggi justru tekanannya lebih RENDAH.'
      },
      {
        myth: '“Pada sayap pesawat, aliran udara di sisi atas bergerak lebih cepat daripada sisi bawah sehingga tekanan di atas lebih rendah dan timbul gaya angkat.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Perbedaan kelajuan aliran udara di permukaan atas dan bawah sayap menghasilkan beda tekanan (P_bawah > P_atas) yang mendorong sayap ke atas.'
      }
    ],
    workedExample: {
      question: 'Air mengalir melalui pipa lebar berluas A₁ = 20 cm² dengan kelajuan v₁ = 2 m/s, lalu masuk ke pipa sempit berluas A₂ = 5 cm². Berapa kelajuan air v₂ di pipa sempit?',
      known: 'A₁ = 20 cm², v₁ = 2 m/s, A₂ = 5 cm²',
      steps: [
        'Gunakan Persamaan Kontinuitas: A₁ × v₁ = A₂ × v₂',
        'Masukkan nilainya: 20 × 2 = 5 × v₂  →  40 = 5 × v₂',
        'Bagi kedua ruas dengan 5: v₂ = 40 / 5 = 8 m/s'
      ],
      answer: '8 m/s (luas mengecil 4× lipat, kelajuan naik 4× lipat)'
    },
    check: {
      question: 'Air ideal mengalir dari pipa lebar menuju bagian pipa yang menyempit pada ketinggian yang sama. Bagaimana kelajuan dan tekanan di bagian sempit?',
      options: [
        { key: 'A', text: 'Kelajuan makin besar dan tekanan makin besar' },
        { key: 'B', text: 'Kelajuan makin besar, tetapi tekanannya justru lebih rendah' },
        { key: 'C', text: 'Kelajuan melambat dan tekanan tetap' }
      ],
      correct: 'B',
      right: 'Tepat sekali! Kontinuitas membuat kelajuan naik (v₂ > v₁), dan Asas Bernoulli membuat tekanan turun (P₂ < P₁).',
      wrong: 'Hati-hati dengan jebakan umum ini! Pipa sempit memang bikin aliran lebih cepat, tapi menurut Bernoulli kecepatan tinggi justru menurunkan tekanan.'
    }
  },

  /* ===== BAB 2 ROTASI ===== */
  /* ===== BAB 2 DINAMIKA ROTASI (3 UNIT LENGKAP) ===== */
  r1: {
    latex: '\\tau = r \\, F \\sin\\theta',
    simpleAnalogy: {
      title: 'Bahasa Santainya (+ Pengingat Singkat Gaya & Sudut)',
      text: 'Mendorong pintu dekat engsel terasa berat, tapi mendorong di gagang ujung cukup pakai satu jari! Itu karena putaran (torsi) butuh jarak lengan (r) dari poros. Pengingat cepat sebelum menghitung: gaya berat benda F = m × g (g ≈ 10 m/s²), dan untuk sudut dorong: tegak lurus berarti sin 90° = 1 (maksimal), miring 30° berarti sin 30° = 0,5, sejajar batang berarti sin 0° = 0.'
    },
    miniSlider: {
      label: 'Geser panjang gagang kunci pas yang dipakai montir:',
      unit: 'cm',
      min: 10,
      max: 60,
      effectText: (v) =>
        v <= 20
          ? `Panjang ${v} cm — lengan terlalu pendek, baut ban terasa sangat keras diputar.`
          : v <= 40
          ? `Panjang ${v} cm — lengan makin panjang, torsi membesar sehingga baut mulai ringan.`
          : `Panjang ${v} cm — lengan ekstra panjang! Gaya dorong sama menghasilkan torsi jauh lebih besar.`
    },
    mythVsFact: [
      {
        myth: '“Makin besar gaya dorongmu pada pintu, pintu pasti berputar — tidak peduli di mana kamu mendorongnya.”',
        verdict: 'MITOS! ❌',
        fact: 'Jika kamu mendorong tepat di engsel (r = 0) atau searah daun pintu (θ = 0°), torsinya nol sehingga pintu tidak akan berputar.'
      },
      {
        myth: '“Menyambung gagang kunci pas pakai pipa besi membantu memutar baut karena memperpanjang lengan momen (r).”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Memperpanjang r melipatgandakan torsi (τ = r · F) meski tenaga tanganmu sama.'
      }
    ],
    workedExample: {
      question: 'Montir menekan ujung kunci pas sepanjang r = 0,4 m secara tegak lurus (90°) dengan gaya F = 50 N. Berapakah torsi yang bekerja pada baut?',
      known: 'r = 0,4 m, F = 50 N, θ = 90° (sin 90° = 1)',
      steps: [
        'Gunakan rumus torsi: τ = r × F × sin θ',
        'Masukkan nilainya: τ = 0,4 × 50 × 1',
        'Hitung hasilnya: τ = 20 N·m'
      ],
      answer: '20 N·m'
    },
    check: {
      question: 'Agar baut roda motor paling mudah diputar dengan tenaga tangan yang sama, kamu sebaiknya…',
      options: [
        { key: 'A', text: 'Memegang kunci lebih dekat ke baut dan mendorong miring' },
        { key: 'B', text: 'Memegang di ujung gagang kunci paling jauh dan mendorong tegak lurus (90°)' },
        { key: 'C', text: 'Mendorong tepat sejajar sepanjang batang kunci' }
      ],
      correct: 'B',
      right: 'Betul! Lengan r paling panjang dan sudut 90° (sin 90° = 1) menghasilkan torsi paling besar.',
      wrong: 'Belum pas. Ingat pintu rumah: pegangan terjauh (r besar) dan dorongan tegak lurus (90°) membuat putaran paling ringan.'
    }
  },
  r2: {
    latex: '\\Sigma \\tau = 0 \\;\\Rightarrow\\; m_1 g r_1 = m_2 g r_2',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Di taman, anak kecil bisa menyeimbangkan kakaknya yang jauh lebih berat di jungkat-jungkit! Caranya sederhana: yang lebih berat duduk dekat titik tengah, sedangkan yang ringan duduk jauh di ujung. Papan seimbang ketika "tarikan putar ke kiri" sama kuat dengan "tarikan putar ke kanan".'
    },
    miniSlider: {
      label: 'Geser jarak duduk anak 20 kg di sisi kanan (kiri: 40 kg pada jarak 1 m):',
      unit: '× 0,1 meter',
      min: 5,
      max: 30,
      effectText: (v) => {
        const m = (v / 10).toFixed(1);
        return v === 20
          ? `Jarak ${m} m → Torsi kanan (20×2,0 = 40) = Torsi kiri (40×1,0 = 40). SEIMBANG SEMPURNA!`
          : v < 20
          ? `Jarak ${m} m — terlalu dekat ke tengah, papan miring jatuh ke sisi kiri.`
          : `Jarak ${m} m — terlalu jauh ke ujung, papan miring jatuh ke sisi kanan.`;
      }
    },
    mythVsFact: [
      {
        myth: '“Supaya jungkat-jungkit seimbang, berat orang di kiri dan kanan harus selalu sama persis.”',
        verdict: 'MITOS! ❌',
        fact: 'Yang harus sama adalah TORSINYA (m × r), bukan massanya! Orang ringan tetap bisa menyeimbangkan orang berat dengan duduk lebih jauh.'
      },
      {
        myth: '“Saat beban berat digeser mendekati titik tumpu, torsi yang ditimbulkannya mengecil.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Karena lengan r mengecil, hasil kali m·g·r ikut mengecil.'
      }
    ],
    workedExample: {
      question: 'Beban kiri m₁ = 20 kg berada pada jarak r₁ = 1,5 m dari tumpuan. Di mana beban kanan m₂ = 30 kg harus diletakkan agar seimbang?',
      known: 'm₁ = 20 kg, r₁ = 1,5 m, m₂ = 30 kg',
      steps: [
        'Syarat seimbang (g saling meniadakan): m₁ × r₁ = m₂ × r₂',
        'Masukkan angka: 20 × 1,5 = 30 × r₂  →  30 = 30 × r₂',
        'Hitung r₂: r₂ = 30 / 30 = 1,0 m'
      ],
      answer: '1,0 meter di kanan titik tumpu'
    },
    check: {
      question: 'Anak 40 kg duduk 1 m di kiri poros. Anak 20 kg harus duduk berapa meter di kanan agar seimbang?',
      options: [
        { key: 'A', text: '1 m' },
        { key: 'B', text: '2 m' },
        { key: 'C', text: '0,5 m' }
      ],
      correct: 'B',
      right: 'Tepat! 40 × 1 = 20 × r₂ → r₂ = 2 m.',
      wrong: 'Coba hitung momen kiri: 40 × 1 = 40. Momen kanan harus sama: 20 × r₂ = 40, maka r₂ = 2 m.'
    }
  },
  r3: {
    latex: 'I = m R^2 \\quad (\\text{partikel}) \\quad ; \\quad L = I \\omega = \\text{konstan}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Rumit)',
      text: 'Pernah lihat penari akrobat atau peseluncur es yang berputar makin cepat begitu merapatkan kedua tangannya ke dada? Itu karena Momen Inersia (ukuran "malas berputar") bukan cuma bergantung pada berat badan, tapi juga seberapa jauh massa tersebar dari poros! Selain itu, perahu dan truk juga menaruh muatan berat di bagian bawah agar titik beratnya rendah dan tidak mudah terguling.'
    },
    miniSlider: {
      label: 'Ubah posisi rentangan tangan penari yang sedang berputar (jarak R):',
      unit: 'cm dari badan',
      min: 10,
      max: 70,
      effectText: (v) =>
        v <= 25
          ? `Tangan rapat (${v} cm) — momen inersia I mengecil → putaran badan makin CEPAT!`
          : v <= 45
          ? `Tangan setengah terbuka (${v} cm) — laju putaran sedang.`
          : `Tangan terentang lebar (${v} cm) — massa jauh dari poros → momen inersia I besar → putaran MELAMBAT.`
    },
    mythVsFact: [
      {
        myth: '“Momen inersia suatu benda hanya ditentukan oleh massanya saja, tidak peduli bentuk atau sebaran massanya.”',
        verdict: 'MITOS! ❌',
        fact: 'Dua roda bermassa sama bisa punya momen inersia berbeda: cincin berongga (massa di pinggir) jauh lebih sulit diputar daripada cakram pejal.'
      },
      {
        myth: '“Titik berat benda berbentuk cincin atau mangkuk berongga bisa berada di ruang kosong di luar badan bendanya.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Titik berat adalah pusat keseimbangan distribusi massa, sehingga pada benda berongga/melengkung letaknya bisa di luar materi fisiknya.'
      }
    ],
    workedExample: {
      question: 'Sebuah bola kecil bermassa m = 2 kg diputar dengan tali sepanjang R = 0,5 m terhadap poros. Berapakah momen inersia bola tersebut?',
      known: 'm = 2 kg, R = 0,5 m',
      steps: [
        'Gunakan rumus momen inersia partikel: I = m × R²',
        'Masukkan nilainya: I = 2 × (0,5)² = 2 × 0,25',
        'Hitung hasilnya: I = 0,5 kg·m²'
      ],
      answer: '0,5 kg·m²'
    },
    check: {
      question: 'Seorang peseluncur es sedang berputar dengan tangan terentang, lalu ia merapatkan kedua tangannya ke dada. Apa yang terjadi pada putarannya?',
      options: [
        { key: 'A', text: 'Putarannya melambat karena massanya berkurang' },
        { key: 'B', text: 'Putarannya makin cepat karena momen inersianya (I) mengecil' },
        { key: 'C', text: 'Putarannya langsung berhenti' }
      ],
      correct: 'B',
      right: 'Tepat! Merapatkan tangan memperkecil R sehingga momen inersia I mengecil dan kecepatan sudut ω meningkat.',
      wrong: 'Ingat efek R²: merapatkan tangan membuat jarak massa dari poros mengecil → momen inersia turun → putaran jadi lebih cepat.'
    }
  },

  /* ===== BAB 3 ELASTISITAS & HUKUM HOOKE (3 UNIT LENGKAP) ===== */
  e1: {
    latex: 'F = k \\, \\Delta x \\quad ; \\quad E_p = \\tfrac{1}{2} k (\\Delta x)^2',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Bayangkan kamu menarik karet ketapel atau menekan per shockbreaker motor. Makin kuat kamu menariknya, makin panjang karet itu melar — dan makin banyak energi lontar yang tersimpan di dalamnya. Tapi hati-hati, kalau ditarik kelewat batas (batas elastis), karet atau per bisa rusak/melar permanen.'
    },
    miniSlider: {
      label: 'Gantungkan beban pada pegas (konstanta k = 100 N/m):',
      unit: 'Newton',
      min: 0,
      max: 50,
      effectText: (v) =>
        v === 0
          ? 'Belum ada beban — pegas berada pada panjang awalnya (Δx = 0 cm).'
          : `Gaya ${v} N → pegas bertambah panjang Δx = ${v} cm (sebanding lurus dengan gaya!).`
    },
    mythVsFact: [
      {
        myth: '“Jika tarikan ketapel (Δx) digandakan 2 kali lipat, energi lontarnya (Ep) ikut naik 2 kali lipat juga.”',
        verdict: 'MITOS! ❌',
        fact: 'Karena Ep = ½·k·(Δx)² berbentuk kuadrat, menggandakan tarikan 2× membuat energi tersimpan melonjak 2² = 4 kali lipat!'
      },
      {
        myth: '“Semua bahan elastis punya batas elastisitas; jika dilewati, benda tidak bisa kembali ke bentuk semula.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Setelah melewati batas elastis, bahan memasuki daerah plastis (berubah bentuk permanen) hingga akhirnya putus.'
      }
    ],
    workedExample: {
      question: 'Pegas berkonstanta k = 200 N/m ditarik gaya F = 40 N. Berapa pertambahan panjang Δx dan energi potensialnya?',
      known: 'k = 200 N/m, F = 40 N',
      steps: [
        'Cari Δx dari F = k × Δx → Δx = 40 / 200 = 0,2 m (20 cm)',
        'Hitung energi potensial: Ep = ½ × k × (Δx)² = ½ × 200 × (0,2)²',
        'Ep = 100 × 0,04 = 4 Joule'
      ],
      answer: 'Δx = 0,2 m (20 cm) dan Ep = 4 Joule'
    },
    check: {
      question: 'Jika beban pada pegas dijadikan dua kali lipat (masih dalam batas elastis), pertambahan panjangnya menjadi…',
      options: [
        { key: 'A', text: 'Dua kali lipat' },
        { key: 'B', text: 'Setengahnya' },
        { key: 'C', text: 'Tetap sama' }
      ],
      correct: 'A',
      right: 'Betul! Menurut Hukum Hooke (F = k·Δx), Δx berbanding lurus dengan gaya.',
      wrong: 'Belum pas. Karena F = k·Δx, gaya dua kali lipat membuat pertambahan panjang dua kali lipat juga.'
    }
  },
  e2: {
    latex: '\\sigma = \\frac{F}{A} \\quad ; \\quad e = \\frac{\\Delta L}{L_0} \\quad ; \\quad E = \\frac{\\sigma}{e}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Kenapa kabel jembatan gantung dibuat dari baja tebal, bukan benang nilon tipis? Karena untuk gaya tarik yang sama, kawat tebal membagi bebannya ke luas penampang lebih besar (tegangannya kecil), dan bahan baja punya kekakuan alami (Modulus Young) yang sangat tinggi dibanding karet.'
    },
    miniSlider: {
      label: 'Ubah luas penampang kawat (A) saat menahan beban tetap 1.000 N:',
      unit: 'mm²',
      min: 2,
      max: 20,
      effectText: (v) =>
        v <= 5
          ? `Luas ${v} mm² (sangat tipis) — tegangan σ sangat besar! Kawat rawan putus.`
          : v <= 12
          ? `Luas ${v} mm² — tegangan σ makin aman dan terkendali.`
          : `Luas ${v} mm² (tebal) — beban terbagi merata, tegangan σ jauh lebih kecil dan aman.`
    },
    mythVsFact: [
      {
        myth: '“Karet gelang lebih elastis daripada baja sehingga Modulus Young karet lebih besar dari baja.”',
        verdict: 'MITOS! ❌',
        fact: 'Modulus Young (E) mengukur KEKAKUAN bahan (hambatan terhadap perubahan panjang). Baja jauh lebih kaku sehingga nilai E baja jutaan kali lebih besar dari karet.'
      },
      {
        myth: '“Regangan (e = ΔL/L₀) tidak memiliki satuan.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Karena regangan adalah hasil bagi dua besaran panjang (meter dibagi meter).'
      }
    ],
    workedExample: {
      question: 'Kawat sepanjang L₀ = 2 m bertambah panjang ΔL = 0,004 m saat ditarik. Berapakah regangan (e) kawat tersebut?',
      known: 'L₀ = 2 m, ΔL = 0,004 m',
      steps: [
        'Gunakan rumus regangan: e = ΔL / L₀',
        'Masukkan nilainya: e = 0,004 / 2 = 0,002'
      ],
      answer: 'e = 0,002 (atau 2 × 10⁻³, tanpa satuan)'
    },
    check: {
      question: 'Kawat A dan B terbuat dari bahan sama dan ditarik gaya sama. Kawat A lebih tebal daripada Kawat B. Mana yang mengalami tegangan (σ) lebih besar?',
      options: [
        { key: 'A', text: 'Kawat A (lebih tebal)' },
        { key: 'B', text: 'Kawat B (lebih tipis)' },
        { key: 'C', text: 'Sama besar' }
      ],
      correct: 'B',
      right: 'Betul! σ = F/A — luas penampang lebih kecil membuat tegangan yang dialami kawat tipis lebih besar.',
      wrong: 'Belum pas. Ingat σ = F/A: jika gaya sama, luas A yang lebih kecil menghasilkan tegangan σ yang lebih besar.'
    }
  },
  e3: {
    latex: 'k_p = k_1 + k_2 \\quad ; \\quad \\frac{1}{k_s} = \\frac{1}{k_1} + \\frac{1}{k_2}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Lihat bagian belakang sepeda motor: ada dua per shockbreaker dipasang berdampingan (paralel) supaya kuat menahan dua orang penumpang tanpa amblas! Sebaliknya, kalau dua per disambung memanjang dari ujung ke ujung (seri), per gabungan jadi panjang dan makin empuk/lentur.'
    },
    miniSlider: {
      label: 'Pilih jumlah pegas identik (k = 100 N/m) yang dipasang PARALEL berdampingan:',
      unit: 'pegas paralel',
      min: 1,
      max: 4,
      effectText: (v) =>
        `Terpasang ${v} pegas paralel → kekakuan total k_p = ${v * 100} N/m (${v}× lebih kokoh menahan beban!).`
    },
    mythVsFact: [
      {
        myth: '“Rumus konstanta pegas seri sama persis dengan rumus hambatan listrik seri (langsung dijumlahkan).”',
        verdict: 'MITOS! ❌',
        fact: 'Hati-hati! Rumus pegas justru KEBALIKAN dari resistor listrik: pegas PARALEL yang dijumlahkan (k_p = k₁ + k₂), sedangkan pegas SERI pakai seper (1/k_s = 1/k₁ + 1/k₂).'
      },
      {
        myth: '“Dua pegas identik disusun seri akan lebih lentur daripada satu pegas tunggal.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Konstanta gabungannya turun jadi setengah (½k), sehingga lebih mudah memanjang.'
      }
    ],
    workedExample: {
      question: 'Dua pegas identik masing-masing k = 200 N/m. Hitung konstanta gabungan jika disusun (a) paralel dan (b) seri!',
      known: 'k₁ = 200 N/m, k₂ = 200 N/m',
      steps: [
        'Paralel: k_p = k₁ + k₂ = 200 + 200 = 400 N/m (lebih kaku)',
        'Seri: 1/k_s = 1/200 + 1/200 = 2/200 → k_s = 200 / 2 = 100 N/m (lebih lentur)'
      ],
      answer: 'Paralel = 400 N/m; Seri = 100 N/m'
    },
    check: {
      question: 'Dua pegas identik masing-masing k = 150 N/m dipasang PARALEL berdampingan. Berapakah konstanta gabungan sistem tersebut?',
      options: [
        { key: 'A', text: '75 N/m' },
        { key: 'B', text: '150 N/m' },
        { key: 'C', text: '300 N/m' }
      ],
      correct: 'C',
      right: 'Tepat! Paralel dijumlahkan langsung: k_p = 150 + 150 = 300 N/m.',
      wrong: 'Ingat kebalikan resistor: untuk pegas, susunan paralel dijumlahkan langsung (k_p = k₁ + k₂ = 300 N/m).'
    }
  },

  /* ===== BAB 4 GELOMBANG & BUNYI (3 UNIT SEIMBANG) ===== */
  g1: {
    latex: 'v = \\lambda \\, f \\quad ; \\quad f = \\frac{1}{T}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Saat kamu menjatuhkan batu ke kolam atau melihat perahu di ombak laut, perahunya cuma naik-turun di tempat meski riaknya merambat sampai ke tepi. Artinya gelombang hanya memindahkan ENERGI, bukan menghanyutkan airnya! Dan pada tali/medium yang sama, kecepatan rambatnya (v) sudah tetap — jadi makin cepat kamu menggetarkannya (f naik), jarak bukit ke bukit (λ) makin rapat.'
    },
    miniSlider: {
      label: 'Naikkan frekuensi getaran (f) pada tali yang sama (v tetap = 6 m/s):',
      unit: 'Hz',
      min: 1,
      max: 6,
      effectText: (v) =>
        `Frekuensi ${v} Hz pada medium sama (v = 6 m/s) → panjang gelombang menyusut jadi λ = ${(6 / v).toFixed(2)} m (makin rapat!).`
    },
    mythVsFact: [
      {
        myth: '“Menaikkan frekuensi getaran tali akan membuat gelombang merambat makin cepat di tali yang sama.”',
        verdict: 'MITOS! ❌',
        fact: 'Pada medium yang sama (ketegangan & jenis tali sama), cepat rambat v KONSTAN! Menaikkan frekuensi f justru memperpendek panjang gelombang λ.'
      },
      {
        myth: '“Gelombang mekanik merambatkan energi tanpa memindahkan partikel medium secara permanen.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Partikel medium hanya bergetar bolak-balik di sekitar titik setimbangnya.'
      }
    ],
    workedExample: {
      question: 'Gelombang merambat pada tali dengan cepat rambat v = 6 m/s. Jika frekuensi sumbernya f = 4 Hz, berapakah panjang gelombangnya (λ)?',
      known: 'v = 6 m/s, f = 4 Hz',
      steps: [
        'Gunakan hubungan cepat rambat gelombang: v = λ × f',
        'Cari λ: λ = v / f = 6 / 4',
        'Hitung hasilnya: λ = 1,5 meter'
      ],
      answer: 'λ = 1,5 meter'
    },
    check: {
      question: 'Gelombang merambat pada tali yang sama (medium tetap). Jika frekuensi getarannya dinaikkan 2 kali lipat, apa yang terjadi pada panjang gelombang (λ) dan cepat rambatnya (v)?',
      options: [
        { key: 'A', text: 'Cepat rambat v tetap, panjang gelombang λ menjadi setengahnya' },
        { key: 'B', text: 'Cepat rambat v menjadi 2 kali lipat, panjang gelombang λ tetap' },
        { key: 'C', text: 'Keduanya menjadi 2 kali lipat' }
      ],
      correct: 'A',
      right: 'Tepat sekali! Pada medium yang sama, cepat rambat v konstan — sehingga menaikkan frekuensi membuat gelombang lebih rapat (λ memendek).',
      wrong: 'Hati-hati! Pada medium yang sama, cepat rambat (v) selalu tetap. Agar v = λ·f tetap sama saat f naik 2×, maka λ harus menyusut jadi setengahnya.'
    }
  },
  g2: {
    latex: 'f_n = \\frac{n \\, v}{2 L} \\quad (\\text{nada ke-}n\\text{ pada dawai})',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Rumit)',
      text: 'Saat memetik senar gitar yang kedua ujungnya terikat, gelombang berjalan maju lalu memantul balik dan bertemu lagi — membentuk pola tetap yang disebut Gelombang Stasioner (ada titik diam bernama Simpul dan titik getar maksimal bernama Perut). Saat jarimu menekan fret agar senar makin pendek, nada yang terdengar langsung lebih tinggi!'
    },
    miniSlider: {
      label: 'Tekan fret gitar untuk memperpendek panjang senar yang bergetar (L):',
      unit: 'cm',
      min: 20,
      max: 60,
      effectText: (v) =>
        v >= 50
          ? `Senar panjang (${v} cm) — panjang gelombang besar, nada terdengar rendah (bass).`
          : v >= 35
          ? `Senar sedang (${v} cm) — frekuensi naik, nada terdengar menengah.`
          : `Senar pendek (${v} cm) — getaran makin cepat, nada terdengar tinggi dan nyaring!`
    },
    mythVsFact: [
      {
        myth: '“Pada gelombang stasioner (senar gitar), semua titik sepanjang senar bergetar dengan amplitudo yang sama besar.”',
        verdict: 'MITOS! ❌',
        fact: 'Berbeda dengan gelombang berjalan, pada gelombang stasioner ada titik yang diam (Simpul, A = 0) dan titik yang bergetar paling lebar (Perut).'
      },
      {
        myth: '“Memperpendek panjang senar gitar yang bergetar akan menaikkan frekuensi nadanya.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Frekuensi nada berbanding terbalik dengan panjang senar (L makin pendek → f makin tinggi).'
      }
    ],
    workedExample: {
      question: 'Sebuah senar gitar sepanjang L = 0,5 m bergetar pada nada dasar (n = 1) dengan cepat rambat gelombang di senar v = 200 m/s. Berapa frekuensi nada dasarnya?',
      known: 'L = 0,5 m, n = 1, v = 200 m/s',
      steps: [
        'Pada nada dasar dawai, panjang senar L = ½λ → λ = 2L = 1,0 m',
        'Hitung frekuensi: f = v / λ = 200 / 1,0 = 200 Hz'
      ],
      answer: '200 Hz'
    },
    check: {
      question: 'Mengapa menekan fret gitar mendekati lubang suara (memperpendek bagian senar yang bergetar) membuat bunyinya terdengar lebih tinggi?',
      options: [
        { key: 'A', text: 'Karena panjang gelombang λ memendek sehingga frekuensi nadanya meningkat' },
        { key: 'B', text: 'Karena amplitudo getarannya menjadi nol' },
        { key: 'C', text: 'Karena senar tidak lagi bergetar' }
      ],
      correct: 'A',
      right: 'Tepat! Senar lebih pendek → λ lebih kecil → frekuensi f lebih tinggi (nada nyaring).',
      wrong: 'Ingat hubungan nada senar: makin pendek senar yang bergetar, makin kecil λ-nya dan makin tinggi frekuensinya.'
    }
  },
  g3: {
    latex: 'f_p = \\frac{v \\pm v_p}{v \\pm v_s} \\, f_s',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Pernah mendengar sirine ambulans yang melaju kencang melewatimu? Saat mendekat nadanya terasa makin tinggi (nyaring), lalu begitu lewat dan menjauh nadanya mendadak turun lebih rendah! Padahal suara asli sirine tidak berubah — muka gelombang bunyinya saja yang terdesak rapat saat mendekat dan merenggang saat menjauh (Efek Doppler).'
    },
    miniSlider: {
      label: 'Amati posisi gerak ambulans terhadapmu (- mendekat, 0 diam, + menjauh):',
      unit: 'm/s',
      min: -30,
      max: 30,
      effectText: (v) =>
        v < 0
          ? `Ambulans MENDEKAT (${Math.abs(v)} m/s) — gelombang bunyi terdesak rapat → nada terdengar LEBIH TINGGI!`
          : v === 0
          ? 'Ambulans DIAM (0 m/s) — nada yang kamu dengar sama persis dengan frekuensi aslinya.'
          : `Ambulans MENJAUH (${v} m/s) — gelombang bunyi merenggang → nada terdengar LEBIH RENDAH.`
    },
    mythVsFact: [
      {
        myth: '“Nada sirine ambulans terdengar makin tinggi saat mendekat karena volume pengeras suaranya dibesarkan sopir.”',
        verdict: 'MITOS! ❌',
        fact: 'Volume (keras-lemah) berkaitan dengan jarak/amplitudo, sedangkan perubahan NADA (tinggi-rendah) disebabkan perubahan frekuensi akibat Efek Doppler.'
      },
      {
        myth: '“Di ruang angkasa yang hampa udara, ledakan besar tidak akan terdengar bunyinya.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Bunyi adalah gelombang mekanik longitudinal yang wajib membutuhkan medium (udara, air, atau zat padat) untuk merambat.'
      }
    ],
    workedExample: {
      question: 'Ambulans bergerak mendekati pendengar diam dengan kecepatan vs = 20 m/s sambil membunyikan sirine fs = 640 Hz (cepat rambat bunyi v = 340 m/s). Berapa frekuensi yang didengar?',
      known: 'v = 340 m/s, vp = 0, vs = 20 m/s (mendekat → tanda minus di penyebut), fs = 640 Hz',
      steps: [
        'Gunakan rumus Efek Doppler (sumber mendekat): fp = (v / (v − vs)) × fs',
        'Masukkan angka: fp = (340 / (340 − 20)) × 640 = (340 / 320) × 640',
        'Sederhanakan 640 / 320 = 2 → fp = 340 × 2 = 680 Hz'
      ],
      answer: '680 Hz (lebih tinggi dari 640 Hz)'
    },
    check: {
      question: 'Sebuah ambulans melaju kencang MENJAUH darimu sambil membunyikan sirine. Nada yang kamu dengar dibanding nada aslinya adalah…',
      options: [
        { key: 'A', text: 'Lebih tinggi' },
        { key: 'B', text: 'Lebih rendah' },
        { key: 'C', text: 'Sama persis' }
      ],
      correct: 'B',
      right: 'Tepat! Saat sumber bunyi menjauh, gelombang bunyi merenggang sehingga frekuensi terdengar lebih rendah.',
      wrong: 'Hampir. Saat mendekat nadanya lebih tinggi, sedangkan saat MENJAUH gelombangnya merenggang sehingga nadanya lebih rendah.'
    }
  },

  /* ===== BAB 5 SUHU, KALOR & GAS IDEAL (3 UNIT LENGKAP) ===== */
  k1: {
    latex: 'Q = m \\, c \\, \\Delta T \\quad ; \\quad Q_{\\text{lepas}} = Q_{\\text{terima}}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Suhu dan kalor itu berbeda! Suhu adalah "tingkat panasnya" (diukur termometer), sedangkan kalor adalah "energi panas yang berpindah". Saat kamu mencampur teh panas dengan air dingin, panas tidak pindah sampai habis — panas berpindah sampai keduanya mencapai suhu setimbang yang sama (hangat). Selain itu, benda yang dipanaskan juga memuai, makanya sambungan rel dan jembatan diberi celah kecil.'
    },
    miniSlider: {
      label: 'Campurkan air dingin 20°C ke segelas teh panas 80°C (porsi air dingin):',
      unit: '% air dingin',
      min: 0,
      max: 100,
      effectText: (v) => {
        const tMix = Math.round(80 - (v / 100) * 60);
        return `Porsi air dingin ${v}% → suhu akhir setimbang sekitar ${tMix}°C (kalor dilepas teh panas = kalor diterima air dingin).`;
      }
    },
    mythVsFact: [
      {
        myth: '“Suhu dan kalor adalah hal yang sama: benda bersuhu tinggi pasti menyimpan kalor lebih besar dari benda bersuhu lebih rendah.”',
        verdict: 'MITOS! ❌',
        fact: 'Percikan kembang api suhunya ratusan derajat tapi kalornya sangat kecil karena massanya mini; sebaliknya seember air hangat menyimpan kalor jauh lebih besar.'
      },
      {
        myth: '“Saat es sedang mencair di suhu 0°C, kalor yang diserap dipakai mengubah wujud (kalor laten), bukan menaikkan suhunya.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Selama proses melebur berlangsung, suhu campuran es–air bertahan di 0°C hingga semua es mencair.'
      }
    ],
    workedExample: {
      question: 'Air bermassa m = 0,5 kg (kalor jenis c = 4.200 J/kg°C) dipanaskan dari 30°C hingga 50°C. Berapakah kalor (Q) yang dibutuhkan?',
      known: 'm = 0,5 kg, c = 4.200 J/kg°C, ΔT = 50 − 30 = 20°C',
      steps: [
        'Gunakan rumus kalor: Q = m × c × ΔT',
        'Masukkan angka: Q = 0,5 × 4.200 × 20',
        'Hitung: 0,5 × 20 = 10 → Q = 10 × 4.200 = 42.000 J (42 kJ)'
      ],
      answer: '42.000 Joule (42 kJ)'
    },
    check: {
      question: 'Air panas dicampur air dingin di dalam termos tertutup (terisolasi). Kapan perpindahan kalor bersih di antara keduanya berhenti?',
      options: [
        { key: 'A', text: 'Ketika seluruh kalor air panas habis sampai 0°C' },
        { key: 'B', text: 'Ketika kedua air mencapai suhu akhir yang sama (kesetimbangan termal)' },
        { key: 'C', text: 'Kalor tidak pernah berhenti berpindah' }
      ],
      correct: 'B',
      right: 'Betul! Kalor mengalir dari suhu tinggi ke rendah hingga tercapai kesetimbangan termal (Q_lepas = Q_terima).',
      wrong: 'Belum pas. Panas tidak berpindah sampai habis, melainkan berhenti saat suhu campuran sudah sama rata (setimbang).'
    }
  },
  k2: {
    latex: 'H = \\frac{Q}{t} = k \\, A \\, \\frac{\\Delta T}{L} \\quad (\\text{laju konduksi})',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Rumit)',
      text: 'Kalor berpindah lewat 3 cara: (1) Konduksi pada zat padat (ujung sendok logam ikut panas saat mengaduk kuah), (2) Konveksi lewat aliran fluida — inilah penyebab Angin Laut di pesisir Jeneponto pada siang hari saat daratan lebih cepat panas dari laut!, dan (3) Radiasi pancaran sinar matahari tanpa perlu udara.'
    },
    miniSlider: {
      label: 'Sentuh bahan di ruangan 27°C (kiri = isolator kayu, kanan = konduktor logam):',
      unit: 'daya hantar',
      min: 1,
      max: 10,
      effectText: (v) =>
        v <= 3
          ? `Isolator seperti kayu/plastik (${v}/10) — lambat menyerap panas tangan (36°C), jadi terasa hangat/biasa saja.`
          : v <= 7
          ? `Penghantar sedang seperti keramik/kaca (${v}/10) — mulai terasa agak sejuk di kulit.`
          : `Konduktor kuat seperti besi/aluminium (${v}/10) — SANGAT CEPAT menyerap panas dari tanganmu, makanya terasa dingin meski suhunya sama-sama 27°C!`
    },
    mythVsFact: [
      {
        myth: '“Sendok logam di ruangan terasa lebih dingin daripada sendok kayu karena logam menghasilkan hawa dingin.”',
        verdict: 'MITOS! ❌',
        fact: 'Suhu keduanya sama-sama suhu ruangan! Logam terasa dingin karena laju konduksinya tinggi sehingga sangat cepat menyerap panas dari kulit tanganmu.'
      },
      {
        myth: '“Angin laut yang bertiup dari laut ke darat pada siang hari terjadi karena perpindahan kalor secara konveksi.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Daratan lebih cepat panas dibanding air laut → udara di atas darat naik, lalu udara sejuk dari laut mengalir mengisi tempatnya.'
      }
    ],
    workedExample: {
      question: 'Mengapa bagian dalam dinding termos air panas dibuat berlapis kaca mengilap (perak) dan ruang hampa (vakum)?',
      known: '3 jalur kehilangan panas: konduksi, konveksi, dan radiasi',
      steps: [
        'Ruang hampa (vakum) mencegah hilangnya kalor secara konduksi dan konveksi (karena tidak ada molekul udara).',
        'Lapisan dinding mengilap memantulkan kembali gelombang panas sehingga meminimalkan radiasi.',
        'Hasilnya suhu air panas bertahan lama di dalam termos.'
      ],
      answer: 'Menghambat ketiga cara perpindahan kalor sekaligus (konduksi, konveksi, radiasi)'
    },
    check: {
      question: 'Sebuah sendok besi dan sendok kayu diletakkan lama di meja kamar bersuhu 28°C. Saat disentuh, sendok besi terasa lebih dingin. Mengapa demikian?',
      options: [
        { key: 'A', text: 'Karena suhu sendok besi lebih rendah 10°C dari sendok kayu' },
        { key: 'B', text: 'Karena besi adalah konduktor yang menyerap panas dari tangan kita jauh lebih cepat daripada kayu' },
        { key: 'C', text: 'Karena besi memancarkan radiasi dingin' }
      ],
      correct: 'B',
      right: 'Tepat sekali! Keduanya bersuhu sama (28°C), hanya saja laju konduksi besi jauh lebih tinggi sehingga panas tanganmu cepat tersedot keluar.',
      wrong: 'Jangan terkecoh intuisi! Di ruangan yang sama suhu keduanya sama; sensasi dingin muncul karena besi cepat sekali menghantarkan panas keluar dari tanganmu.'
    }
  },
  k3: {
    latex: 'P V = n R T \\quad ; \\quad \\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Di dalam ban motor ada miliaran partikel udara yang terus melesat dan memantul ke dinding ban. Saat ban terjemur terik matahari siang (suhu T naik), partikel udara bergerak jauh lebih ngebut dan menabrak dinding ban lebih keras — itulah kenapa tekanan ban naik dan terasa makin keras!'
    },
    miniSlider: {
      label: 'Panaskan tabung gas tertutup (volume tetap) dari 300 K ke 600 K:',
      unit: 'Kelvin',
      min: 300,
      max: 600,
      effectText: (v) =>
        `Suhu ${v} K → gerak partikel makin cepat, tekanan gas naik menjadi ${(v / 300).toFixed(2)}× tekanan awal!`
    },
    mythVsFact: [
      {
        myth: '“Ketika gas dipanaskan, ukuran tiap molekul gasnya ikut membengkak jadi lebih besar.”',
        verdict: 'MITOS! ❌',
        fact: 'Ukuran molekulnya tetap! Yang bertambah adalah KECEPATAN geraknya (energi kinetik rata-rata) sehingga tumbukan ke dinding makin kuat.'
      },
      {
        myth: '“Dalam perhitungan persamaan gas ideal (PV = nRT), suhu harus diubah dulu ke satuan Kelvin (K = °C + 273).”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Menggunakan °C langsung akan membuat rasio suhu salah (misal 27°C = 300 K; jika suhu Kelvin naik 2× jadi 600 K, tekanan naik 2×).'
      }
    ],
    workedExample: {
      question: 'Gas dalam tabung tertutup (volume tetap) bersuhu T₁ = 300 K memiliki tekanan P₁ = 100 kPa. Jika dipanaskan hingga T₂ = 600 K, berapa tekanan akhirnya (P₂)?',
      known: 'V tetap, T₁ = 300 K, P₁ = 100 kPa, T₂ = 600 K',
      steps: [
        'Pada volume tetap berlaku: P₁ / T₁ = P₂ / T₂',
        'Masukkan angka: 100 / 300 = P₂ / 600',
        'Karena suhu mutlak naik 2× lipat, maka P₂ = 2 × 100 = 200 kPa'
      ],
      answer: '200 kPa'
    },
    check: {
      question: 'Gas dalam wadah tertutup (volume tetap) dipanaskan sehingga suhu mutlaknya naik. Apa yang terjadi pada partikel dan tekanannya?',
      options: [
        { key: 'A', text: 'Partikel bergerak makin cepat sehingga menumbuk dinding lebih kuat dan tekanan naik' },
        { key: 'B', text: 'Partikel melambat dan tekanan turun' },
        { key: 'C', text: 'Tekanan tetap tidak berubah' }
      ],
      correct: 'A',
      right: 'Betul! Suhu naik → energi kinetik partikel naik → tumbukan ke dinding makin sering & kuat → tekanan naik.',
      wrong: 'Belum pas. Suhu mutlak berbanding lurus dengan kecepatan gerak partikel, jadi pemanasan menaikkan tekanan gas.'
    }
  },

  /* ===== BAB 6 TERMODINAMIKA (3 UNIT LENGKAP) ===== */
  t1: {
    latex: 'Q = \\Delta U + W \\quad ; \\quad W = P \\, \\Delta V',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Saat air di panci direbus sampai mendidih, uap panasnya sanggup menggoyangkan tutup panci! Energi panas (Q) yang masuk tidak hilang sia-sia: sebagian dipakai menaikkan suhu/energi dalam gas (ΔU), sisanya dipakai untuk usaha mendorong tutup panci atau piston motor (W). Jika gas memuai mendorong keluar, W bertanda positif (+); jika gas ditekan dari luar, W bertanda negatif (−).'
    },
    miniSlider: {
      label: 'Dari kalor masuk Q = 1.000 J, atur berapa Joule yang dipakai mendorong piston (W):',
      unit: 'Joule (W)',
      min: 0,
      max: 1000,
      effectText: (v) =>
        `Kalor Q = 1.000 J → Usaha piston W = ${v} J, maka sisa yang menaikkan energi dalam ΔU = ${1000 - v} J (kekekalan energi!).`
    },
    mythVsFact: [
      {
        myth: '“Usaha (W) pada gas selalu bernilai positif, baik saat gas memuai maupun saat gas ditekan.”',
        verdict: 'MITOS! ❌',
        fact: 'Usaha bernilai POSITIF (+W) saat gas memuai melakukan kerja (ΔV > 0), dan bernilai NEGATIF (−W) saat gas ditekan/dikompresi dari luar (ΔV < 0).'
      },
      {
        myth: '“Luas daerah di bawah garis pada grafik Tekanan–Volume (P–V) sama dengan besarnya usaha (W).”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Untuk tekanan konstan (isobarik), luas persegi panjang P × ΔV adalah usaha piston.'
      }
    ],
    workedExample: {
      question: 'Gas dalam silinder menyerap kalor Q = 1.000 J dan memuai pada tekanan tetap P = 2.000 Pa sebesar ΔV = 0,2 m³. Hitung usaha (W) dan perubahan energi dalam (ΔU)!',
      known: 'Q = +1.000 J, P = 2.000 Pa, ΔV = +0,2 m³',
      steps: [
        'Hitung usaha pemuaian: W = P × ΔV = 2.000 × 0,2 = +400 J',
        'Gunakan Hukum I Termodinamika: ΔU = Q − W',
        'Masukkan angka: ΔU = 1.000 − 400 = +600 J'
      ],
      answer: 'W = 400 J dan ΔU = +600 J (suhu gas naik)'
    },
    check: {
      question: 'Suatu gas menerima kalor 500 J dan melakukan usaha memuai sebesar 200 J. Berapakah perubahan energi dalamnya (ΔU)?',
      options: [
        { key: 'A', text: '+700 J' },
        { key: 'B', text: '+300 J' },
        { key: 'C', text: '−300 J' }
      ],
      correct: 'B',
      right: 'Tepat! ΔU = Q − W = 500 − 200 = +300 J.',
      wrong: 'Hampir. Gunakan Hukum I Termodinamika: ΔU = Q − W = 500 − 200 = 300 J.'
    }
  },
  t2: {
    latex: '\\text{Isokhorik: } W=0 \\; | \\; \\text{Isotermal: } \\Delta U=0 \\; | \\; \\text{Adiabatik: } Q=0',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Rumit)',
      text: 'Ada 4 cara khas gas berubah keadaan: Isobarik (tekanan tetap), Isokhorik (wadah terkunci mati, volume tetap → piston diam sehingga W = 0), Isotermal (suhu dijaga tetap → ΔU = 0), dan Adiabatik (terjadi super cepat tanpa sempat tukar kalor, Q = 0 — misalnya saat kamu memompa ban sepeda cepat-cepat, tabung pompanya langsung hangat walau tidak dibakar api!).'
    },
    miniSlider: {
      label: 'Pilih 1 dari 4 proses termodinamika untuk melihat ciri kuncinya:',
      unit: 'proses ke-',
      min: 1,
      max: 4,
      effectText: (v) =>
        v === 1
          ? '1. Isobarik (P tetap): grafik datar, usaha W = P·ΔV.'
          : v === 2
          ? '2. Isokhorik (V tetap): grafik tegak, ΔV = 0 → W = 0, jadi Q = ΔU.'
          : v === 3
          ? '3. Isotermal (T tetap): kurva landai, ΔU = 0 → Q = W.'
          : '4. Adiabatik (Q = 0): kurva curam! Walau Q = 0, suhu tetap berubah drastis karena ΔU = −W.'
    },
    mythVsFact: [
      {
        myth: '“Pada proses adiabatik (tidak ada kalor masuk atau keluar, Q = 0), suhu gas pasti selalu tetap konstan.”',
        verdict: 'MITOS! ❌',
        fact: 'Jebakan paling sering! Walau Q = 0, usaha pemuaian atau kompresi langsung mengubah energi dalam (ΔU = −W), sehingga suhu gas justru naik saat ditekan cepat dan turun saat memuai cepat.'
      },
      {
        myth: '“Jika gas dipanaskan dalam tabung baja tertutup rapat (volume tetap), seluruh kalor dipakai menaikkan energi dalam gas.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Karena ΔV = 0 maka W = 0 (isokhorik), sehingga Q = ΔU.'
      }
    ],
    workedExample: {
      question: 'Gas dikompresi secara sangat cepat (adiabatik, Q = 0) dengan usaha dari luar sebesar W = −300 J. Berapa perubahan energi dalam (ΔU) dan apa yang terjadi pada suhunya?',
      known: 'Q = 0 (adiabatik), W = −300 J (ditekan dari luar)',
      steps: [
        'Gunakan Hukum I: ΔU = Q − W',
        'Masukkan angka: ΔU = 0 − (−300) = +300 J',
        'Karena ΔU positif, suhu gas meningkat (terasa panas seperti pompa ban!)'
      ],
      answer: 'ΔU = +300 J (suhu gas naik)'
    },
    check: {
      question: 'Pada proses adiabatik (Q = 0), gas ditekan dengan sangat cepat di dalam tabung pompa sepeda. Apa yang terjadi pada suhu gas?',
      options: [
        { key: 'A', text: 'Suhu gas tetap konstan karena Q = 0' },
        { key: 'B', text: 'Suhu gas naik karena usaha kompresi diubah menjadi kenaikan energi dalam (ΔU = −W)' },
        { key: 'C', text: 'Suhu gas turun menjadi 0 K' }
      ],
      correct: 'B',
      right: 'Tepat sekali! Inilah alasan pompa sepeda terasa hangat saat ditekan cepat meski tidak ada api.',
      wrong: 'Hati-hati dengan miskonsepsi ini! Q = 0 bukan berarti suhu tetap; kerja tekan dari luar langsung menaikkan energi dalam (suhu naik).'
    }
  },
  t3: {
    latex: '\\eta = \\left(1 - \\frac{T_r}{T_t}\\right) \\times 100\\%',
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu)',
      text: 'Kenapa mesin dan knalpot motor selalu terasa panas setelah dipakai? Karena menurut Hukum II Termodinamika, tidak ada mesin kalor yang bisa mengubah 100% panas bahan bakar jadi gerak — sebagian panas pasti terbuang ke lingkungan! Memahami efisiensi mesin juga membantu kita menghemat energi dan mengurangi emisi panas/karbon yang memicu perubahan iklim.'
    },
    miniSlider: {
      label: 'Naikkan suhu reservoir panas mesin Carnot (Tt), dengan suhu dingin Tr = 300 K:',
      unit: 'Kelvin (Tt)',
      min: 400,
      max: 1200,
      effectText: (v) =>
        `Tt = ${v} K, Tr = 300 K → efisiensi ideal Carnot η = ${Math.round((1 - 300 / v) * 100)}% (makin besar beda suhu, makin efisien — tapi tak pernah 100%).`
    },
    mythVsFact: [
      {
        myth: '“Dengan teknologi super canggih, suatu hari manusia bisa membuat mesin kalor dengan efisiensi tepat 100% tanpa membuang panas.”',
        verdict: 'MITOS! ❌',
        fact: 'Hukum II Termodinamika melarang efisiensi 100% pada mesin kalor siklis — selalu ada kalor buang ke reservoir dingin (Tr > 0 K).'
      },
      {
        myth: '“Meningkatkan efisiensi mesin kendaraan dan beralih ke energi bersih membantu menekan pemanasan global.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Efisiensi lebih tinggi berarti bahan bakar yang terbuang sebagai panas dan emisi gas rumah kaca jauh lebih sedikit.'
      }
    ],
    workedExample: {
      question: 'Sebuah mesin Carnot bekerja antara reservoir panas Tt = 600 K dan reservoir dingin Tr = 300 K. Berapa efisiensi idealnya?',
      known: 'Tt = 600 K, Tr = 300 K (sudah dalam Kelvin)',
      steps: [
        'Gunakan rumus efisiensi Carnot: η = (1 − Tr / Tt) × 100%',
        'Masukkan angka: η = (1 − 300 / 600) × 100% = (1 − 0,5) × 100%',
        'Hitung hasilnya: η = 50%'
      ],
      answer: '50% (separuh kalor jadi usaha, separuhnya terbuang ke lingkungan)'
    },
    check: {
      question: 'Mesin Carnot bekerja pada suhu reservoir dingin tetap Tr = 300 K. Agar efisiensinya makin besar, apa yang harus dilakukan?',
      options: [
        { key: 'A', text: 'Menaikkan suhu reservoir panas (Tt) agar selisih suhunya makin besar' },
        { key: 'B', text: 'Menurunkan suhu reservoir panas hingga sama dengan 300 K' },
        { key: 'C', text: 'Menaikkan suhu reservoir dingin mendekati Tt' }
      ],
      correct: 'A',
      right: 'Tepat! Makin besar selisih Tt dan Tr, makin kecil rasio Tr/Tt sehingga efisiensi naik.',
      wrong: 'Hampir. Lihat η = 1 − Tr/Tt: menaikkan Tt memperkecil pecahan Tr/Tt, sehingga efisiensinya meningkat.'
    }
  }
};

// Seluruh unit kini didefinisikan langsung secara terurut di physicsCurriculum.js
export const EXTRA_UNITS = {};
