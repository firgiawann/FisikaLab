/**
 * Fisika XI — Multimedia Pembelajaran Interaktif Fluida
 * Sesuai Model MDLC & 12 Prinsip Pembelajaran Multimedia Mayer (2021)
 * Implementasi Wireframe Gambar 3.5, 3.6, 3.7, dan 3.8
 */

const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

const STORAGE_KEY = 'fisika_xi_state_v3';

/* Bank 10 Soal Evaluasi Mandiri (Gambar 8 & Kurikulum Merdeka Fase F) */
const EVAL_QUESTIONS = [
  {
    id: 1,
    topic: "Tekanan Hidrostatis • Konsep Dasar",
    category: "hydro",
    stem: "Seorang penyelam menyelam dari kedalaman 2 meter menuju ke kedalaman 6 meter di bawah permukaan laut. Mengapa tekanan yang dirasakan pada gendang telinganya bertambah kuat?",
    hasIllustration: false,
    options: [
      { key: "A", text: "Karena suhu air di tempat dalam semakin panas sehingga molekul bergerak liar." },
      { key: "B", text: "Karena massa jenis air laut di kedalaman 6 meter berubah menjadi dua kali lipat." },
      { key: "C", text: "Karena volume dan berat kolom air di atas tubuh penyelam semakin bertumpuk banyak (P = ρ·g·h)." },
      { key: "D", text: "Karena gaya gravitasi bumi di dasar laut bertambah besar secara mendadak." }
    ],
    correct: "C",
    explanation: "Tekanan hidrostatis berbanding lurus dengan kedalaman (h). Semakin dalam posisi penyelam, semakin tebal tumpukan kolom zat cair di atasnya, sehingga tekanan hidrostatis P = ρ·g·h meningkat sebanding."
  },
  {
    id: 2,
    topic: "Tekanan Hidrostatis • Pengaruh Bentuk Wadah",
    category: "hydro",
    stem: "Dua buah wadah A dan B diisi air tawar dengan jenis yang sama. Wadah A berbentuk silinder sempit dan wadah B berbentuk corong raksasa yang menampung 500 liter air. Jika titik ukur pada kedua wadah berada pada kedalaman yang sama (h = 1,5 meter), bagaimana besar tekanannya?",
    hasIllustration: false,
    options: [
      { key: "A", text: "Tekanan di wadah B jauh lebih besar karena jumlah total liternya jauh lebih melimpah." },
      { key: "B", text: "Tekanan di wadah A lebih besar karena dinding silinder yang sempit menghimpit zat cair." },
      { key: "C", text: "Tekanan pada kedua wadah sama persis, karena tekanan hidrostatis tidak dipengaruhi oleh bentuk wadah maupun volume total air." },
      { key: "D", text: "Tekanan tidak dapat ditentukan tanpa mengetahui luas alas kedua wadah tersebut." }
    ],
    correct: "C",
    explanation: "Sesuai rumus P = ρ·g·h, tekanan hidrostatis hanya dipengaruhi oleh massa jenis zat cair (ρ), percepatan gravitasi (g), dan kedalaman (h). Bentuk wadah dan volume total air tidak mempengaruhi tekanan pada titik kedalaman tersebut."
  },
  {
    id: 3,
    topic: "Tekanan Hidrostatis • Variasi Massa Jenis Fluida",
    category: "hydro",
    stem: "Dua bejana identik berisi zat cair berbeda setinggi 80 cm. Bejana 1 berisi minyak kelapa (ρ = 800 kg/m³), sedangkan Bejana 2 berisi air tawar (ρ = 1.000 kg/m³). Pernyataan perbandingan tekanan pada dasar kedua bejana yang benar adalah...",
    hasIllustration: false,
    options: [
      { key: "A", text: "Tekanan di dasar bejana minyak lebih besar daripada bejana air." },
      { key: "B", text: "Tekanan di dasar bejana air lebih besar daripada bejana minyak karena air lebih padat/rapat." },
      { key: "C", text: "Tekanan kedua bejana sama persis karena ketinggian permukaan cairannya sama-sama 80 cm." },
      { key: "D", text: "Minyak tidak memiliki tekanan hidrostatis karena sifatnya licin." }
    ],
    correct: "B",
    explanation: "Karena kedalaman h dan gravitasi g bernilai sama, maka P berbanding lurus dengan massa jenis (ρ). Karena ρ_air (1.000 kg/m³) > ρ_minyak (800 kg/m³), maka tekanan di dasar bejana air lebih besar."
  },
  {
    id: 4,
    topic: "Hukum Pascal • Transmisi Tekanan",
    category: "pascal",
    stem: "Ketika pengemudi mobil menginjak pedal rem hidrolik secara perlahan, kampas rem di keempat roda dapat mencengkeram cakram roda dengan sangat kuat sehingga mobil berhenti seketika. Prinsip fisika apakah yang mendasari fenomena ini?",
    hasIllustration: false,
    options: [
      { key: "A", text: "Hukum Boyle mengenai pemuaian gas bertekanan tinggi." },
      { key: "B", text: "Hukum Pascal: tekanan yang diberikan pada minyak rem dalam ruang tertutup diteruskan ke segala arah sama besar." },
      { key: "C", text: "Hukum Archimedes mengenai gaya angkat fluida minyak rem." },
      { key: "D", text: "Hukum Kekekalan Energi Mekanik yang menghapuskan gaya gesek." }
    ],
    correct: "B",
    explanation: "Sistem rem hidrolik bekerja berdasarkan Hukum Pascal. Tekanan kecil dari pedal rem diteruskan melalui fluida minyak rem tertutup secara merata ke piston yang lebih luas di roda, menghasilkan gaya pengereman berlipat ganda."
  },
  {
    id: 5,
    topic: "Hukum Archimedes • Benda Terapung di Air",
    category: "archimedes",
    stem: "Mengapa kapal yang terbuat dari baja tebal dan sangat berat bisa terapung di permukaan laut, sedangkan jarum kecil yang dijatuhkan langsung tenggelam?",
    hasIllustration: true,
    options: [
      { key: "A", text: "Massa total kapal baja sebenarnya lebih ringan daripada massa sebuah jarum kecil." },
      { key: "B", text: "Bentuk rongga kapal memindahkan volume air sangat besar, sehingga gaya apung ke atas melebihi berat totalnya." },
      { key: "C", text: "Air laut memiliki kandungan garam khusus yang hanya mampu menahan benda berukuran raksasa." },
      { key: "D", text: "Jarum tenggelam karena tegangan permukaan air laut tidak dapat menahan logam tajam." }
    ],
    correct: "B",
    explanation: "Kapal dibuat dengan lambung berongga udara yang sangat lapang. Rongga ini membuat volume zat cair yang dipindahkan (V_celup) sangat besar, sehingga menghasilkan gaya apung (F_a = ρ·g·V_celup) yang cukup besar untuk menopang berat kapal baja beserta seluruh muatannya."
  },
  {
    id: 6,
    topic: "Hukum Archimedes • Syarat Benda Melayang",
    category: "archimedes",
    stem: "Sebuah benda berbentuk kubus berada di dalam wadah berisi cairan. Benda tersebut tidak mengapung di permukaan dan tidak pula menyentuh dasar wadah, melainkan melayang diam di tengah cairan. Kondisi fisis yang terjadi pada benda tersebut adalah...",
    hasIllustration: false,
    options: [
      { key: "A", text: "Massa jenis rata-rata benda sama persis dengan massa jenis cairan (ρ_benda = ρ_cairan)." },
      { key: "B", text: "Gaya angkat fluida bernilai nol karena benda tidak berada di permukaan." },
      { key: "C", text: "Massa jenis benda lebih besar dari cairan sehingga benda akan segera tenggelam." },
      { key: "D", text: "Tekanan hidrostatis di atas benda lebih besar daripada di bawah benda." }
    ],
    correct: "A",
    explanation: "Benda melayang terjadi ketika massa jenis benda sama persis dengan massa jenis zat cair (ρ_benda = ρ_cairan). Akibatnya, gaya angkat F_a seimbang sempurna dengan berat benda W di sembarang kedalaman."
  },
  {
    id: 7,
    topic: "Hukum Archimedes • Fenomena Telur & Air Garam",
    category: "archimedes",
    stem: "Seorang siswa memasukkan sebutir telur mentah ke dalam gelas berisi air murni, dan telur tersebut langsung tenggelam di dasar gelas. Ketika siswa melarutkan beberapa sendok garam dapur dan mengaduknya, telur perlahan terangkat dan mengapung. Mengapa hal ini bisa terjadi?",
    hasIllustration: false,
    options: [
      { key: "A", text: "Garam bereaksi kimia mengurangi massa telur sehingga telur menjadi sangat ringan." },
      { key: "B", text: "Garam meningkatkan massa jenis air larutan (ρ_cairan bertambah), sehingga gaya apung fluida menjadi lebih besar dari berat telur." },
      { key: "C", text: "Garam menghasilkan gelembung gas hidrogen yang menarik telur ke atas." },
      { key: "D", text: "Suhu air meningkat drastis akibat garam sehingga telur terdorong ke atas." }
    ],
    correct: "B",
    explanation: "Menambahkan garam ke dalam air meningkatkan massa jenis larutan (ρ_fluida). Karena F_a = ρ_fluida · g · V_celup, peningkatan massa jenis zat cair memperbesar gaya angkat ke atas hingga melebihi gaya berat telur, menyebabkannya mengapung."
  },
  {
    id: 8,
    topic: "Hukum Archimedes • Besarnya Gaya Apung",
    category: "archimedes",
    stem: "Sebuah balok logam dengan volume 0,002 m³ dicelupkan seluruhnya ke dalam air tawar (ρ = 1.000 kg/m³, g = 10 m/s²). Berapakah besar gaya apung (Fa) yang dialami balok logam tersebut?",
    hasIllustration: false,
    options: [
      { key: "A", text: "2 Newton" },
      { key: "B", text: "20 Newton" },
      { key: "C", text: "200 Newton" },
      { key: "D", text: "2.000 Newton" }
    ],
    correct: "B",
    explanation: "Gaya apung dihitung dengan formula F_a = ρ · g · V_celup = 1.000 kg/m³ × 10 m/s² × 0,002 m³ = 20 Newton."
  },
  {
    id: 9,
    topic: "Hukum Pascal • Perhitungan Rasio Dongkrak",
    category: "pascal",
    stem: "Sebuah dongkrak hidrolik memiliki rasio luas penampang piston A₁ : A₂ = 1 : 25. Jika mekanik memberikan gaya dorong sebesar 200 N pada piston kecil, berapakah beban maksimum yang dapat diangkat pada piston besar?",
    hasIllustration: false,
    options: [
      { key: "A", text: "8 Newton" },
      { key: "B", text: "2.000 Newton" },
      { key: "C", text: "5.000 Newton" },
      { key: "D", text: "10.000 Newton" }
    ],
    correct: "C",
    explanation: "Berdasarkan Hukum Pascal: F₂ = (A₂ / A₁) × F₁ = 25 × 200 N = 5.000 Newton."
  },
  {
    id: 10,
    topic: "Aplikasi Fluida • Teknologi Maritim",
    category: "archimedes",
    stem: "Kapal selam dapat menyelam ke kedalaman laut dan muncul kembali ke permukaan dengan aman. Bagaimanakah cara kapal selam mengatur posisinya di dalam air?",
    hasIllustration: false,
    options: [
      { key: "A", text: "Mengubah panjang badan kapal selam agar gaya gesek air berubah." },
      { key: "B", text: "Mengisi dan mengosongkan tangki pemberat (ballast tank) dengan air dan udara bertekanan untuk mengatur massa jenis total kapal." },
      { key: "C", text: "Memanaskan air di sekitar kapal selam agar air mendidih dan mengangkat kapal." },
      { key: "D", text: "Mengganti jenis baling-baling kapal setiap kali akan menyelam." }
    ],
    correct: "B",
    explanation: "Kapal selam dilengkapi tangki pemberat (ballast tank). Untuk menyelam, tangki diisi air sehingga massa jenis kapal bertambah besar (tenggelam). Untuk naik ke permukaan, air dipompa keluar dan digantikan udara bertekanan sehingga massa jenis kapal berkurang (mengapung)."
  }
];

const DEFAULT_STATE = {
  activeTab: 'beranda',
  activeSubmateri: 'sub1',
  activeUnitStep: 1,
  labMode: 'archimedes',
  archimedes: {
    objectMass: 1, // 1: Ringan (Kayu), 2: Sedang (Telur), 3: Berat (Batu)
    fluidType: 2   // 1: Minyak (800), 2: Air (1000), 3: Madu (1420)
  },
  hydro: {
    depth: 1.0,
    density: 1000,
    gravity: 10
  },
  observations: [],
  pascalAnswer: null,
  pascalSolved: false,
  quiz2Solved: false,
  evalAnswers: {},
  evalDoubts: {},
  currentQIndex: 4, // Mulai dari Soal 5 (sesuai Gambar 8 Wireframe)
  quizSubmitted: false,
  quizScore: 0,
  timeLeft: 18 * 60 + 39, // 18:39 sesuai Gambar 8
  reflection: '',
  progressPercent: 25,
  dataSaver: false
};

let state = loadState();
let timerInterval = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }
  updateUIProgress();
}

function formatNumber(num, fractionDigits = 0) {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits
  }).format(num);
}

/* ==========================================================================
   1. Navigasi Tab Utama & Submateri
   ========================================================================== */
function switchTab(tabId) {
  state.activeTab = tabId;
  saveState();

  $$('.nav-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  $$('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${tabId}`);
  });

  window.scrollTo({ top: 0, behavior: state.dataSaver ? 'auto' : 'smooth' });

  if (tabId === 'simulasi') {
    updateArchimedesSim();
    updateHydroSim();
  }
  if (tabId === 'evaluasi') {
    renderQuizQuestion(state.currentQIndex);
    startQuizTimer();
  }
}
window.switchTab = switchTab;

$$('.nav-pill').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

function selectSubmateri(subId) {
  state.activeSubmateri = subId;
  saveState();

  // Switch Tab Materi if not on it
  if (state.activeTab !== 'materi') {
    switchTab('materi');
  }

  // Update button tabs
  $('#tabSub1Btn').classList.toggle('active', subId === 'sub1');
  $('#tabSub2Btn').classList.toggle('active', subId === 'sub2');
  $('#tabSub3Btn').classList.toggle('active', subId === 'sub3');

  // Update panels
  $('#panelSub1').classList.toggle('active', subId === 'sub1');
  $('#panelSub2').classList.toggle('active', subId === 'sub2');
  $('#panelSub3').classList.toggle('active', subId === 'sub3');

  // Update breadcrumb and headings
  const crumbSub = $('#breadcrumbSubmateri');
  const crumbTopic = $('#breadcrumbTopic');
  const mainTitle = $('#materiHeading');
  const bottomStatus = $('#bottomStatusText');

  if (subId === 'sub1') {
    crumbSub.textContent = 'Submateri 01';
    crumbTopic.textContent = 'Tekanan Hidrostatis';
    mainTitle.textContent = 'Memahami Tekanan Hidrostatis (Tekanan Dalam Zat Cair)';
    bottomStatus.textContent = 'Materi 1 selesai dipelajari';
  } else if (subId === 'sub2') {
    crumbSub.textContent = 'Submateri 02';
    crumbTopic.textContent = 'Hukum Pascal';
    mainTitle.textContent = 'Hukum Pascal & Sistem Pengganda Gaya Hidrolik';
    bottomStatus.textContent = 'Materi 2 selesai dipelajari';
  } else if (subId === 'sub3') {
    crumbSub.textContent = 'Submateri 03';
    crumbTopic.textContent = 'Hukum Archimedes';
    mainTitle.textContent = 'Hukum Archimedes: Mengapa Benda Terapung & Melayang?';
    bottomStatus.textContent = 'Materi 3 selesai dipelajari';
  }
}
window.selectSubmateri = selectSubmateri;

function selectUnitStep(stepNum) {
  state.activeUnitStep = stepNum;
  saveState();
  $('#unitCounterText').textContent = `Unit ${stepNum} / 4`;
  
  $$('.unit-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === stepNum - 1);
  });
}
window.selectUnitStep = selectUnitStep;

function showVarDetail(varType) {
  const messages = {
    rho: 'Massa Jenis (ρ): Ukuran kerapatan partikel fluida (kg/m³). Semakin rapat cairannya (misal madu), semakin besar beban cairan yang menekan ke bawah.',
    g: 'Percepatan Gravitasi (g): Tarikan bumi menarik kolom zat cair ke bawah. Di permukaan bumi bernilai sekitar 9,8 atau 10 m/s².',
    h: 'Kedalaman (h): Jarak vertikal dari permukaan zat cair ke titik yang diukur (meter). Semakin dalam, tekanan semakin besar.'
  };
  alert(messages[varType] || 'Variabel fluida');
}
window.showVarDetail = showVarDetail;

/* ==========================================================================
   2. Voice Assistant & Narasi Audio (Prinsip Voice & Modality Mayer)
   ========================================================================== */
let isSpeaking = false;

function toggleSpeechNarration() {
  if (!('speechSynthesis' in window)) {
    alert('Browser ini tidak mendukung Web Speech API bawaan.');
    return;
  }

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    $('#voiceNarrateBtn').classList.remove('active');
    return;
  }

  let textToRead = "";
  if (state.activeTab === 'beranda') {
    textToRead = "Selamat datang di Fisika XI Media Pembelajaran Interaktif. Pahami konsep fluida lewat simulasi interaktif dan visualisasi nyata tanpa perlu pusing menghafal rumus.";
  } else if (state.activeTab === 'materi') {
    if (state.activeSubmateri === 'sub1') {
      textToRead = "Tekanan hidrostatis adalah tekanan zat cair yang diam akibat berat kolom fluida di atasnya. Rumus utamanya: P sama dengan rho dikali g dikali h.";
    } else if (state.activeSubmateri === 'sub2') {
      textToRead = "Hukum Pascal menyatakan bahwa tekanan yang diberikan pada zat cair dalam ruang tertutup diteruskan ke segala arah sama besar.";
    } else {
      textToRead = "Hukum Archimedes menyatakan bahwa gaya apung ke atas sebanding dengan berat fluida yang dipindahkan oleh volume celup benda.";
    }
  } else if (state.activeTab === 'simulasi') {
    textToRead = "Di laboratorium virtual ini, kamu bisa memanipulasi berat benda dan jenis cairan untuk mengamati gaya angkat dan gaya berat secara real time.";
  } else {
    textToRead = "Uji pemahamanmu secara mandiri melalui latihan soal dan kuis evaluasi 10 soal.";
  }

  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = 'id-ID';
  utterance.rate = 1.0;
  utterance.onend = () => {
    isSpeaking = false;
    $('#voiceNarrateBtn').classList.remove('active');
  };
  utterance.onerror = () => {
    isSpeaking = false;
    $('#voiceNarrateBtn').classList.remove('active');
  };

  window.speechSynthesis.speak(utterance);
  isSpeaking = true;
  $('#voiceNarrateBtn').classList.add('active');
}

$('#voiceNarrateBtn').addEventListener('click', toggleSpeechNarration);
const readAloudMateriBtn = $('#btnReadAloudMateri');
if (readAloudMateriBtn) {
  readAloudMateriBtn.addEventListener('click', toggleSpeechNarration);
}

/* Modal Capaian Pembelajaran & ATP */
$('#btnOpenCpModal').addEventListener('click', () => {
  $('#modalCp').style.display = 'flex';
});
$('#btnCloseCpModal').addEventListener('click', () => {
  $('#modalCp').style.display = 'none';
});
$('#modalCp').addEventListener('click', e => {
  if (e.target === $('#modalCp')) $('#modalCp').style.display = 'none';
});

/* ==========================================================================
   3. Mode Lab Virtual: Archimedes (Gambar 6) & Tekanan Tangki
   ========================================================================== */
function setLabMode(mode) {
  state.labMode = mode;
  saveState();

  $('#btnModeArchimedes').classList.toggle('active', mode === 'archimedes');
  $('#btnModeHydro').classList.toggle('active', mode === 'hydro');

  $('#labArchimedesWrap').classList.toggle('active', mode === 'archimedes');
  $('#labHydroWrap').classList.toggle('active', mode === 'hydro');
}
window.setLabMode = setLabMode;

/* Lab 1: Eksperimen Benda Terapung & Tenggelam (Archimedes - Gambar 6) */
const sliderObjectMass = $('#sliderObjectMass');
const sliderFluidType = $('#sliderFluidType');

function applyObjectPreset(presetName) {
  if (presetName === 'kayu') {
    state.archimedes.objectMass = 1; // Ringan
    state.archimedes.fluidType = 2;  // Air
  } else if (presetName === 'telur') {
    state.archimedes.objectMass = 2; // Sedang
    state.archimedes.fluidType = 2;  // Air garam / sedang
  } else if (presetName === 'batu') {
    state.archimedes.objectMass = 3; // Berat
    state.archimedes.fluidType = 2;  // Air
  }
  
  sliderObjectMass.value = state.archimedes.objectMass;
  sliderFluidType.value = state.archimedes.fluidType;
  updateArchimedesSim();
}
window.applyObjectPreset = applyObjectPreset;

function updateArchimedesSim() {
  const m = Number(sliderObjectMass.value);
  const f = Number(sliderFluidType.value);
  state.archimedes.objectMass = m;
  state.archimedes.fluidType = f;
  saveState();

  // Labels
  const massLabels = { 1: 'Ringan (Kayu)', 2: 'Sedang (Telur)', 3: 'Berat (Batu)' };
  const massNames = { 1: 'Kayu', 2: 'Telur', 3: 'Batu' };
  const massIcons = { 1: '🪵', 2: '🥚', 3: '🪨' };
  const fluidLabels = { 1: 'Minyak (Ringan)', 2: 'Air Biasa', 3: 'Madu (Kental)' };
  const fluidColors = { 1: '#fef08a', 2: '#dbeafe', 3: '#fed7aa' };

  $('#labelBeratBenda').textContent = massLabels[m];
  $('#labelJenisCairan').textContent = fluidLabels[f];
  $('#bejanaFluidLabel').textContent = `Cairan: ${fluidLabels[f]}`;

  // Update SVG Liquid color
  const liquidBody = $('#liquidBody');
  if (liquidBody) liquidBody.setAttribute('fill', fluidColors[f]);

  // Update Balok Text
  $('#blockIconText').textContent = massIcons[m];
  $('#blockNameText').textContent = massNames[m];
  $('#blockMassText').textContent = `Massa: ${m === 1 ? 'Ringan' : m === 2 ? 'Sedang' : 'Berat'}`;

  // Update Preset button active highlights
  $('#btnPresetKayu').classList.toggle('active', m === 1 && f === 2);
  $('#btnPresetTelur').classList.toggle('active', m === 2 && f === 2);
  $('#btnPresetBatu').classList.toggle('active', m === 3 && f === 2);

  // Fisika Komparasi: m vs f
  // m < f => Terapung
  // m === f => Melayang
  // m > f => Tenggelam
  const badgeState = $('#badgeBalokState');
  const forceUp = $('#forceUpStatus');
  const forceDown = $('#forceDownStatus');
  const conclusionText = $('#conclusionText');
  const checkIcon = $('#conclusionCheckIcon');
  const blockGroup = $('#floatingBlockGroup');

  let blockY = 80; // Surface y=90, default top 80
  let arrowUpY2 = -45;
  let arrowDownY2 = 115;

  if (m < f) {
    // TERAPUNG
    badgeState.textContent = 'Balok Terapung!';
    badgeState.className = 'badge-state-green';
    forceUp.textContent = 'Lebih Kuat';
    forceUp.className = 'force-status-big text-blue';
    forceDown.textContent = 'Lebih Ringan';
    forceDown.className = 'force-status-big text-orange';
    
    conclusionText.innerHTML = `<strong>Balok Terapung!</strong> Karena balok lebih ringan dari ${fluidLabels[f].toLowerCase()}, gaya angkat cairan berhasil mendorong balok tetap mengapung di permukaan.`;
    checkIcon.textContent = '✓';
    checkIcon.style.background = '#16a34a';

    blockY = 65; // Terapung menonjol di atas permukaan
    arrowUpY2 = -55;
    arrowDownY2 = 100;
  } else if (m === f) {
    // MELAYANG
    badgeState.textContent = 'Balok Melayang!';
    badgeState.className = 'badge-state-orange';
    forceUp.textContent = 'Seimbang';
    forceUp.className = 'force-status-big text-blue';
    forceDown.textContent = 'Seimbang';
    forceDown.className = 'force-status-big text-orange';

    conclusionText.innerHTML = `<strong>Balok Melayang!</strong> Massa jenis balok setara dengan cairan, gaya angkat air dan gaya berat benda seimbang sempurna di tengah fluida.`;
    checkIcon.textContent = '≈';
    checkIcon.style.background = '#ea580c';

    blockY = 140; // Di tengah-tengah cairan
    arrowUpY2 = -40;
    arrowDownY2 = 110;
  } else {
    // TENGGELAM
    badgeState.textContent = 'Balok Tenggelam!';
    badgeState.className = 'badge-state-red';
    forceUp.textContent = 'Lebih Lemah';
    forceUp.className = 'force-status-big text-blue';
    forceDown.textContent = 'Lebih Berat';
    forceDown.className = 'force-status-big text-orange';

    conclusionText.innerHTML = `<strong>Balok Tenggelam!</strong> Karena balok lebih padat/berat dari cairan, gaya angkat zat cair tidak cukup menahan beratnya sehingga balok jatuh ke dasar.`;
    checkIcon.textContent = '✕';
    checkIcon.style.background = '#dc2626';

    blockY = 195; // Tenggelam di dasar
    arrowUpY2 = -30;
    arrowDownY2 = 125;
  }

  if (blockGroup) {
    blockGroup.setAttribute('transform', `translate(190, ${blockY})`);
    const lineUp = $('#arrowUpGroup line');
    const lineDown = $('#arrowDownGroup line');
    if (lineUp) lineUp.setAttribute('y2', arrowUpY2);
    if (lineDown) lineDown.setAttribute('y2', arrowDownY2);
  }
}

sliderObjectMass.addEventListener('input', updateArchimedesSim);
sliderFluidType.addEventListener('input', updateArchimedesSim);

$('#btnResetArchimedes').addEventListener('click', () => {
  applyObjectPreset('kayu');
});

/* Lab 2: Tangki Tekanan Hidrostatis (Sensor & Grafik P-h) */
const inputDepth = $('#inputDepth');
const selectDensity = $('#selectDensity');
const inputGravity = $('#inputGravity');

function updateHydroSim() {
  const h = Number(inputDepth.value);
  const rho = Number(selectDensity.value);
  const g = Number(inputGravity.value);
  const p = rho * g * h;

  state.hydro = { depth: h, density: rho, gravity: g };

  $('#outDepthVal').textContent = `${formatNumber(h, 1)} m`;
  $('#outDensityVal').textContent = `${formatNumber(rho)} kg/m³`;
  $('#outGravityVal').textContent = `${formatNumber(g, 1)} m/s²`;
  $('#outPressureNumber').textContent = `${formatNumber(p)} Pa`;
  $('#outFormulaBreakdown').textContent = `P = ${formatNumber(rho)} × ${formatNumber(g, 1)} × ${formatNumber(h, 1)}`;

  const surfaceY = 65;
  const probeY = surfaceY + (h / 2.0) * 212;

  const probeCircle = $('#simProbeCircle');
  const depthLine = $('#simDepthLine');
  const signalLine = $('#simSignalLine');
  const depthLabel = $('#simDepthLabel');

  if (probeCircle) probeCircle.setAttribute('cy', probeY);
  if (depthLine) depthLine.setAttribute('y2', probeY);
  if (signalLine) {
    signalLine.setAttribute('y1', probeY);
    signalLine.setAttribute('y2', probeY);
  }
  if (depthLabel) {
    depthLabel.setAttribute('y', (surfaceY + probeY) / 2);
    depthLabel.textContent = `h = ${formatNumber(h, 1)} m`;
  }

  const maxP = (rho * g * 2.0) || 1;
  const graphX = 50 + (h / 2.0) * 330;
  const graphY = 160 - (p / maxP) * 135;

  const graphDot = $('#graphCoordinateDot');
  if (graphDot) {
    graphDot.setAttribute('cx', graphX);
    graphDot.setAttribute('cy', graphY);
  }

  const slope = rho * g;
  $('#graphSlopeSummary').textContent = `Kemiringan garis (gradien) ditentukan oleh nilai ρ × g = ${formatNumber(slope)} Pa/m.`;

  return { h, rho, g, p };
}

[inputDepth, selectDensity, inputGravity].forEach(el => {
  if (el) {
    el.addEventListener('input', updateHydroSim);
    el.addEventListener('change', updateHydroSim);
  }
});

$$('.btn-nudge').forEach(btn => {
  btn.addEventListener('click', () => {
    const delta = Number(btn.dataset.val);
    const curr = Number(inputDepth.value);
    const min = Number(inputDepth.min);
    const max = Number(inputDepth.max);
    const next = Math.min(max, Math.max(min, curr + delta));
    inputDepth.value = next.toFixed(1);
    updateHydroSim();
  });
});

$('#btnRecordObs').addEventListener('click', () => {
  const current = updateHydroSim();
  const exists = state.observations.some(obs => 
    Math.abs(obs.h - current.h) < 0.01 && 
    obs.rho === current.rho && 
    Math.abs(obs.g - current.g) < 0.01
  );

  if (!exists) {
    state.observations.push(current);
    if (state.observations.length > 8) state.observations.shift();
    saveState();
    renderObservations();
  }
});

function renderObservations() {
  const tbody = $('#obsTableBody');
  if (!state.observations.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="empty-cell">Belum ada data. Geser slider dan tekan tombol "Catat ke Tabel Pengamatan".</td></tr>';
    $('#btnProceedToPractice').disabled = true;
    return;
  }

  tbody.innerHTML = state.observations.map(item => `
    <tr>
      <td><strong>${formatNumber(item.h, 1)} m</strong></td>
      <td>${formatNumber(item.rho)} kg/m³</td>
      <td><strong>${formatNumber(item.p)} Pa</strong></td>
    </tr>
  `).join('');

  const distinctH = new Set(state.observations.map(x => x.h)).size;
  const notice = $('#obsCountNotice');
  const btnNext = $('#btnProceedToPractice');

  if (distinctH >= 2) {
    notice.textContent = `✓ Telah mencatat ${distinctH} kedalaman berbeda. Bukti empiris siap diuji!`;
    notice.style.color = 'var(--accent-green)';
    btnNext.disabled = false;
    if (state.progressPercent < 50) state.progressPercent = 50;
    saveState();
  } else {
    notice.textContent = `Catat minimal 1 kedalaman lain untuk membandingkan hubungan variabel.`;
    notice.style.color = 'var(--text-muted)';
    btnNext.disabled = true;
  }
}

/* ==========================================================================
   4. Latihan Formatif & Diagnostik: Dongkrak Hidrolik (Gambar 7)
   ========================================================================== */
$('#formPascalQuiz').addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const ans = formData.get('pascalAns');
  const feedbackCard = $('#feedbackPascalCard');

  if (!ans) {
    alert('Pilih salah satu pilihan jawaban (A, B, C, atau D) terlebih dahulu.');
    return;
  }

  state.pascalAnswer = ans;

  if (ans === 'B') {
    state.pascalSolved = true;
    feedbackCard.style.display = 'block';
    if (state.progressPercent < 60) state.progressPercent = 60;
    saveState();
  } else {
    feedbackCard.style.display = 'none';
    alert('Jawaban belum tepat. Ingat perbandingan luas penampang: A₂ = 200 cm² adalah 20 kali lebih besar dari A₁ = 10 cm². Maka gaya dorong F₂ juga terlipat ganda 20 kali lipat!');
  }
});

$('#btnResetPascalQuiz').addEventListener('click', () => {
  const radios = $$('input[name="pascalAns"]');
  radios.forEach(r => r.checked = false);
  $('#feedbackPascalCard').style.display = 'none';
});

// Soal Tambahan Numerik
$('#formQuizNumeric').addEventListener('submit', e => {
  e.preventDefault();
  const raw = $('#inputNumAnswer').value.trim().replace(',', '.');
  const val = Number(raw);
  const unit = $('#selectUnitAnswer').value;
  const alertEl = $('#feedbackQ2');

  if (!raw || !Number.isFinite(val)) {
    showAlert(alertEl, 'Ketikkan angka jawaban yang valid (misalnya 8000 atau 8).', 'bad');
    return;
  }

  if (unit === 'N' || unit === 'kg') {
    showAlert(alertEl, `Satuan ${unit} keliru! Newton (N) adalah gaya, sedangkan kilogram (kg) adalah massa. Satuan tekanan fluida adalah Pascal (Pa) atau kiloPascal (kPa).`, 'bad');
    return;
  }

  const valueInPa = unit === 'kPa' ? val * 1000 : val;
  if (Math.abs(valueInPa - 8000) <= 10) {
    state.quiz2Solved = true;
    showAlert(alertEl, '✓ Perhitunganmu tepat! P = 1000 kg/m³ × 10 m/s² × 0,8 m = 8.000 Pa (atau 8 kPa). Nilai besaran dan satuanmu sinkron.', 'good');
    if (state.progressPercent < 75) state.progressPercent = 75;
    saveState();
  } else {
    showAlert(alertEl, '✗ Hasil perhitungan belum tepat. Gunakan formula P = ρ · g · h. Kalikan: 1000 × 10 × 0,8.', 'bad');
  }
});

function showAlert(el, text, type) {
  el.textContent = text;
  el.className = `feedback-alert show ${type}`;
}

/* ==========================================================================
   5. Evaluasi Kuis 10 Soal (Gambar 8 / 3.8)
   ========================================================================== */
function renderQuizQuestion(qIdx) {
  state.currentQIndex = qIdx;
  saveState();

  const q = EVAL_QUESTIONS[qIdx];
  if (!q) return;

  // Header badges
  $('#qNumberBadge').textContent = `Soal ${qIdx + 1}`;
  $('#qTopicBadge').textContent = q.topic;
  $('#quizProgressNum').textContent = `Soal ${qIdx + 1} / 10`;

  // Question Text
  $('#qQuestionText').textContent = q.stem;

  // Illustration Box (Only show for Q5 or questions that specify illustration)
  const illustWrap = $('#qIllustrationWrap');
  if (q.hasIllustration) {
    illustWrap.style.display = 'block';
  } else {
    illustWrap.style.display = 'none';
  }

  // Options List
  const optionsList = $('#qOptionsList');
  const userAns = state.evalAnswers[qIdx];

  optionsList.innerHTML = q.options.map(opt => `
    <label class="eval-option-label ${userAns === opt.key ? 'selected' : ''}">
      <input type="radio" name="evalChoice" value="${opt.key}" class="eval-option-radio" ${userAns === opt.key ? 'checked' : ''} onchange="handleAnswerSelect(${qIdx}, '${opt.key}')">
      <span class="eval-option-letter">${opt.key}</span>
      <span class="eval-option-text">${opt.text}</span>
    </label>
  `).join('');

  // Doubt button state
  const isDoubt = !!state.evalDoubts[qIdx];
  const btnDoubt = $('#btnToggleDoubt');
  btnDoubt.classList.toggle('active', isDoubt);
  $('#doubtBtnText').textContent = isDoubt ? 'Ragu-ragu (Aktif)' : 'Ragu-ragu';

  // Navigation button states
  $('#btnPrevQuestion').disabled = (qIdx === 0);
  $('#btnNextQuestion').textContent = (qIdx === EVAL_QUESTIONS.length - 1) ? 'Selesai & Kumpulkan' : 'Soal Berikutnya →';

  renderQuestionPalette();
}

function handleAnswerSelect(qIdx, selectedKey) {
  state.evalAnswers[qIdx] = selectedKey;
  saveState();
  renderQuizQuestion(qIdx);
}
window.handleAnswerSelect = handleAnswerSelect;

function toggleCurrentDoubt() {
  const qIdx = state.currentQIndex;
  state.evalDoubts[qIdx] = !state.evalDoubts[qIdx];
  saveState();
  renderQuizQuestion(qIdx);
}
window.toggleCurrentDoubt = toggleCurrentDoubt;

function navigateQuestion(step) {
  const nextIdx = state.currentQIndex + step;
  if (nextIdx >= 0 && nextIdx < EVAL_QUESTIONS.length) {
    renderQuizQuestion(nextIdx);
  } else if (nextIdx >= EVAL_QUESTIONS.length) {
    confirmSubmitQuiz();
  }
}
window.navigateQuestion = navigateQuestion;

function renderQuestionPalette() {
  const palette = $('#quizNumberPalette');
  if (!palette) return;

  palette.innerHTML = EVAL_QUESTIONS.map((_, i) => {
    const isCur = (i === state.currentQIndex);
    const isAns = (state.evalAnswers[i] !== undefined);
    const isDoubt = !!state.evalDoubts[i];

    let cls = 'palette-btn';
    if (isCur) {
      cls += ' active';
    } else if (isDoubt) {
      cls += ' doubt';
    } else if (isAns) {
      cls += ' answered';
    }

    const numStr = (i + 1 < 10) ? `0${i + 1}` : `${i + 1}`;
    return `<button type="button" class="${cls}" onclick="renderQuizQuestion(${i})" title="Lompat ke Soal ${i + 1}">${numStr}</button>`;
  }).join('');
}

function startQuizTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (state.timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      submitQuizResults();
      return;
    }
    state.timeLeft--;
    const mins = Math.floor(state.timeLeft / 60);
    const secs = state.timeLeft % 60;
    const str = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    const display = $('#quizTimerDisplay');
    if (display) display.textContent = str;
  }, 1000);
}

function confirmSubmitQuiz() {
  const answeredCount = Object.keys(state.evalAnswers).length;
  const doubtCount = Object.values(state.evalDoubts).filter(Boolean).length;
  const unansweredCount = 10 - answeredCount;

  let msg = `Kamu telah menjawab ${answeredCount} dari 10 soal.`;
  if (doubtCount > 0) msg += `\nMasih ada ${doubtCount} soal dengan status ragu-ragu.`;
  if (unansweredCount > 0) msg += `\nMasih ada ${unansweredCount} soal yang belum dijawab.`;
  msg += `\n\nApakah kamu yakin ingin mengumpulkan lembar jawaban sekarang?`;

  if (confirm(msg)) {
    submitQuizResults();
  }
}
window.confirmSubmitQuiz = confirmSubmitQuiz;

function submitQuizResults() {
  let score = 0;
  let hydroCorrect = 0;
  let pascalCorrect = 0;
  let archimedesCorrect = 0;

  EVAL_QUESTIONS.forEach((q, idx) => {
    const userAns = state.evalAnswers[idx];
    if (userAns === q.correct) {
      score += 10;
      if (q.category === 'hydro') hydroCorrect++;
      if (q.category === 'pascal') pascalCorrect++;
      if (q.category === 'archimedes') archimedesCorrect++;
    }
  });

  state.quizSubmitted = true;
  state.quizScore = score;
  state.progressPercent = 100;
  saveState();

  // Tampilkan View Hasil
  $('.eval-main-grid').style.display = 'none';
  const resultWrap = $('#evalResultModal');
  resultWrap.style.display = 'block';

  $('#finalScoreVal').textContent = score;
  $('#scoreCompHydro').textContent = `${hydroCorrect} / 4 Benar`;
  $('#barCompHydro').style.width = `${(hydroCorrect / 4) * 100}%`;
  $('#scoreCompPascal').textContent = `${pascalCorrect} / 3 Benar`;
  $('#barCompPascal').style.width = `${(pascalCorrect / 3) * 100}%`;
  $('#scoreCompArchimedes').textContent = `${archimedesCorrect} / 3 Benar`;
  $('#barCompArchimedes').style.width = `${(archimedesCorrect / 3) * 100}%`;

  const descEl = $('#finalScoreDesc');
  const remediationEl = $('#remediationText');

  if (score >= 80) {
    descEl.textContent = 'Luar biasa! Kamu telah menguasai konsep Tekanan Hidrostatis, Hukum Pascal, dan Hukum Archimedes dengan sangat baik.';
    remediationEl.textContent = 'Pemahaman fisikamu sangat matang! Pertahankan dan diskusikan penerapan fluida pada kapal selam bersama teman sekelas.';
  } else if (score >= 60) {
    descEl.textContent = 'Bagus! Kamu sudah memahami konsep dasar fluida, namun masih ada beberapa miskonsepsi yang perlu diasah.';
    remediationEl.textContent = 'Periksa kembali modul rumus P = ρgh dan hubungan luas penampang pada dongkrak hidrolik Pascal untuk memperkuat pemahamanmu.';
  } else {
    descEl.textContent = 'Perlu latihan lagi. Jangan berkecil hati, mari ulangi eksperimen di laboratorium virtual untuk melihat pembuktian langsung.';
    remediationEl.textContent = 'Cobalah buka kembali Tab Simulasi dan ubah slider benda terapung/tenggelam agar hubungan gaya fisis lebih mudah dipahami.';
  }
}

// Exit Ticket Refleksi
$('#btnSaveReflection').addEventListener('click', () => {
  const text = $('#textReflection').value.trim();
  const alertEl = $('#feedbackReflection');

  if (text.length < 15) {
    showAlert(alertEl, 'Tuliskan refleksi minimal 1 kalimat lengkap mengenai hubungan konsep fluida dan hasil pengamatanmu.', 'bad');
    return;
  }

  state.reflection = text;
  saveState();
  showAlert(alertEl, '✓ Refleksi berhasil disimpan di penyimpanan perangkat! Terima kasih atas refleksi belajarmu.', 'good');
});

$('#btnResetAll').addEventListener('click', () => {
  if (confirm('Apakah kamu yakin ingin mereset seluruh progres pembelajaran, hasil kuis evaluasi, dan catatan simulasi pada perangkat ini?')) {
    localStorage.removeItem(STORAGE_KEY);
    state = { ...DEFAULT_STATE };
    location.reload();
  }
});

/* ==========================================================================
   6. Mode Hemat Data & Update Progres UI
   ========================================================================== */
$('#dataSaverBtn').addEventListener('click', () => {
  state.dataSaver = !state.dataSaver;
  applyDataSaver();
  saveState();
});

function applyDataSaver() {
  document.body.classList.toggle('data-saver', state.dataSaver);
  const btn = $('#dataSaverBtn');
  btn.setAttribute('aria-pressed', String(state.dataSaver));
  const dot = btn.querySelector('.status-indicator');
  if (dot) dot.style.background = state.dataSaver ? '#22c55e' : '#94a3b8';
}

function updateUIProgress() {
  const pct = `${state.progressPercent}%`;
  const bar = $('#sidebarProgressBar');
  const txt = $('#sidebarProgressText');

  if (bar) bar.style.width = pct;
  if (txt) txt.textContent = pct;
}

/* Inisialisasi awal */
function init() {
  applyDataSaver();
  selectSubmateri(state.activeSubmateri || 'sub1');
  selectUnitStep(state.activeUnitStep || 1);
  setLabMode(state.labMode || 'archimedes');
  updateArchimedesSim();
  updateHydroSim();
  renderObservations();
  updateUIProgress();

  if (state.pascalSolved) {
    $('#feedbackPascalCard').style.display = 'block';
    const r = $(`input[name="pascalAns"][value="${state.pascalAnswer || 'B'}"]`);
    if (r) r.checked = true;
  }

  if (state.reflection) {
    $('#textReflection').value = state.reflection;
  }

  renderQuizQuestion(state.currentQIndex || 0);

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

init();
