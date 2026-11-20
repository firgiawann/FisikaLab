import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Rocket, CheckCircle2, RotateCcw, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

/**
 * Arena Mini-Games & Tantangan Bertingkat (Level 1, Level 2, Level 3)
 * Termasuk Tantangan Dongkrak Hidrolik Pipa-U (Gambar 7 Proposal) & Misi Kapal Selam!
 */

const TOPIC_GAMES = {
  fluida: {
    title: 'Misi Hidro-Fluida: Kapal Selam & Dongkrak Hidrolik',
    levels: [
      {
        level: 1,
        name: 'Level 1: Misi Kapal Selam Peneliti (Archimedes)',
        mission: 'Sensor penelitian berada melayang di kedalaman tengah laut yang memiliki massa jenis air laut ρ = 1.025 kg/m³. Atur pengisian tangki ballast kapal selammu agar kapal selam MELAYANG tepat sejajar dengan sensor!',
        unit: 'kg/m³',
        min: 700,
        max: 1400,
        step: 25,
        initial: 800,
        target: 1025,
        tolerance: 25,
        formulaHint: 'Syarat Melayang: ρ_kapal = ρ_fluida (1.025 kg/m³)',
        successMsg: 'Kapal selam berhasil melayang stabil di kedalaman target! Gaya apung dan gaya berat seimbang sempurna.'
      },
      {
        level: 2,
        name: 'Level 2: Tantangan Dongkrak Cuci Mobil (Hukum Pascal)',
        mission: 'Seorang mekanik ingin mengangkat mobil menggunakan dongkrak pipa-U. Luas piston kecil A₁ = 10 cm² dan piston besar A₂ = 200 cm² (20x lipat). Jika mekanik menekan dengan gaya F₁ = 150 N, atur target Gaya Angkat F₂ yang dihasilkan!',
        unit: 'Newton (N)',
        min: 500,
        max: 5000,
        step: 250,
        initial: 1500,
        target: 3000,
        tolerance: 50,
        formulaHint: 'F₂ = (A₂ / A₁) × F₁ = (200 / 10) × 150 N',
        successMsg: 'Hebat! Luas penampang 20× lebih besar menghasilkan gaya angkat 20 × 150 N = 3.000 N. Mobil terangkat dengan mulus!'
      },
      {
        level: 3,
        name: 'Level 3: Perisai Tekanan Dasar Laut (Hidrostatis)',
        mission: 'Drone bawah air menyelam hingga kedalaman h = 0,8 meter di dalam air tawar (ρ = 1.000 kg/m³, g = 10 m/s²). Setel perisai kompensasi tekanan tepat sebesar Tekanan Hidrostatis yang dialami drone!',
        unit: 'Pascal (Pa)',
        min: 2000,
        max: 14000,
        step: 1000,
        initial: 4000,
        target: 8000,
        tolerance: 100,
        formulaHint: 'P = ρ · g · h = 1.000 × 10 × 0,8',
        successMsg: 'Perisai tekanan akurat di 8.000 Pa (8 kPa)! Kamu telah menaklukkan seluruh 3 Level Misi Fluida!'
      }
    ]
  },
  rotasi: {
    title: 'Arena Keseimbangan Torsi & Derek Konstruksi',
    levels: [
      {
        level: 1,
        name: 'Level 1: Penyeimbang Jungkat-Jungkit Taman',
        mission: 'Beban kiri 20 kg berada di jarak r₁ = 1,5 m (Torsi Kiri = 300 N·m). Kamu memiliki batu penyeimbang kanan bermassa 30 kg. Geser posisi jarak r₂ agar jungkat-jungkit seimbang mendatar!',
        unit: 'meter',
        min: 0.5,
        max: 2.5,
        step: 0.25,
        initial: 2.0,
        target: 1.0,
        tolerance: 0.05,
        formulaHint: 'm₁ · r₁ = m₂ · r₂  →  20 × 1,5 = 30 × r₂',
        successMsg: 'Jungkat-jungkit seimbang sempurna pada jarak r₂ = 1,0 meter!'
      },
      {
        level: 2,
        name: 'Level 2: Kunci Torsi Baut Jembatan',
        mission: 'Untuk mengencangkan baut jembatan dibutuhkan torsi tepat τ = 40 N·m. Jika panjang gagang kunci r = 0,5 meter, berapakah gaya dorong tegak lurus (F) yang harus kamu berikan?',
        unit: 'Newton',
        min: 20,
        max: 140,
        step: 10,
        initial: 50,
        target: 80,
        tolerance: 2,
        formulaHint: 'τ = r · F  →  40 = 0,5 × F',
        successMsg: 'Tepat 80 Newton! Baut jembatan terpasang kokoh.'
      }
    ]
  },
  elastisitas: {
    title: 'Ketapel Pegas Presisi (Hooke Launcher)',
    levels: [
      {
        level: 1,
        name: 'Level 1: Kalibrasi Tarikan Pegas',
        mission: 'Pegas pelontar memiliki konstanta kekakuan k = 200 N/m. Agar menghasilkan gaya lontar tepat F = 60 N untuk mencapai sasaran, berapakah jarak tarikan Δx (dalam cm) yang dibutuhkan?',
        unit: 'cm',
        min: 10,
        max: 60,
        step: 5,
        initial: 15,
        target: 30,
        tolerance: 1,
        formulaHint: 'Δx = F / k = 60 / 200 = 0,30 m = 30 cm',
        successMsg: 'Sasaran kena tepat di tengah! Tarikan 30 cm menghasilkan gaya 60 N.'
      },
      {
        level: 2,
        name: 'Level 2: Suspensi Shockbreaker Paralel',
        mission: 'Dua pegas identik masing-masing k = 150 N/m dipasang secara PARALEL untuk menahan mesin. Berapakah konstanta pegas gabungan (k_total) sistem tersebut?',
        unit: 'N/m',
        min: 75,
        max: 450,
        step: 25,
        initial: 150,
        target: 300,
        tolerance: 5,
        formulaHint: 'k_paralel = k₁ + k₂ = 150 + 150',
        successMsg: 'Benar! Susunan paralel menggandakan kekakuan pegas menjadi 300 N/m.'
      }
    ]
  },
  gelombang: {
    title: 'Penyelaras Frekuensi & Sinyal Gelombang',
    levels: [
      {
        level: 1,
        name: 'Level 1: Sinkronisasi Cepat Rambat Sinyal',
        mission: 'Pemancar membutuhkan gelombang dengan cepat rambat v = 12 m/s. Jika panjang gelombang disetel tetap λ = 3 meter, atur frekuensi getaran (f) agar sinyal tersinkronisasi!',
        unit: 'Hertz (Hz)',
        min: 1,
        max: 8,
        step: 0.5,
        initial: 2,
        target: 4,
        tolerance: 0.1,
        formulaHint: 'v = λ · f  →  12 = 3 × f',
        successMsg: 'Sinyal gelombang beresonansi sempurna pada frekuensi 4 Hz!'
      }
    ]
  },
  kalor: {
    title: 'Kontrol Reaktor Partikel Gas Ideal',
    levels: [
      {
        level: 1,
        name: 'Level 1: Stabilisasi Tekanan Tabung Gas',
        mission: 'Pada suhu awal 300 K, tekanan gas di tabung adalah 100 kPa. Agar tekanan gas naik menjadi 2 kali lipat (200 kPa) pada volume tetap, berapakah suhu mutlak (T) yang harus diatur?',
        unit: 'Kelvin (K)',
        min: 300,
        max: 900,
        step: 50,
        initial: 400,
        target: 600,
        tolerance: 10,
        formulaHint: 'P₁/T₁ = P₂/T₂  →  Suhu mutlak harus naik 2 kali lipat dari 300 K',
        successMsg: 'Reaktor gas stabil pada 600 Kelvin!'
      }
    ]
  },
  termodinamika: {
    title: 'Simulator Mesin Piston Termodinamika',
    levels: [
      {
        level: 1,
        name: 'Level 1: Target Usaha Dorong Piston',
        mission: 'Mesin membutuhkan perubahan energi dalam ΔU = 600 Joule saat piston melakukan usaha keluar W = 400 Joule. Berapakah total Kalor (Q) yang harus disuplai ke dalam silinder?',
        unit: 'Joule (J)',
        min: 200,
        max: 1600,
        step: 100,
        initial: 600,
        target: 1000,
        tolerance: 10,
        formulaHint: 'Hukum I Termodinamika: Q = ΔU + W = 600 + 400',
        successMsg: 'Mesin bekerja optimal! Kalor 1.000 J menghasilkan 400 J usaha mekanik dan 600 J kenaikan energi dalam.'
      }
    ]
  }
};

export default function PhysicsGameArena({ topicId, onComplete, isCompleted, onProceedToEval }) {
  const gameData = TOPIC_GAMES[topicId] || TOPIC_GAMES.fluida;
  const [curLevelIdx, setCurLevelIdx] = useState(0);
  const [sliderVal, setSliderVal] = useState(gameData.levels[0].initial);
  const [feedback, setFeedback] = useState(null); // { type: 'win' | 'lose', text: '' }
  const [showHint, setShowHint] = useState(false);
  const [clearedLevels, setClearedLevels] = useState({});
  const [score, setScore] = useState(0);

  const curLevel = gameData.levels[curLevelIdx] || gameData.levels[0];

  const selectLevel = (idx) => {
    setCurLevelIdx(idx);
    setSliderVal(gameData.levels[idx].initial);
    setFeedback(null);
    setShowHint(false);
  };

  const handleLaunchCheck = () => {
    const diff = Math.abs(sliderVal - curLevel.target);
    if (diff <= curLevel.tolerance) {
      const nextCleared = { ...clearedLevels, [curLevel.level]: true };
      setClearedLevels(nextCleared);
      const nextScore = Math.max(score, Object.keys(nextCleared).length * 40);
      setScore(nextScore);
      setFeedback({
        type: 'win',
        text: curLevel.successMsg
      });
      if (onComplete) {
        onComplete(nextScore, `Menyelesaikan ${curLevel.name} dengan skor ${nextScore}`);
      }
    } else {
      const dir = sliderVal < curLevel.target ? 'terlalu kecil' : 'terlalu besar';
      setFeedback({
        type: 'lose',
        text: `Nilai ${sliderVal.toLocaleString('id-ID')} ${curLevel.unit} masih ${dir}. Coba sesuaikan lagi — atau tekan "Butuh Petunjuk?" kalau ingin melihat rumusnya.`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Arena Game */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold">
            <Trophy className="w-3.5 h-3.5" /> ARENA GAME &amp; TANTANGAN FISIKA BERTINGKAT
          </div>
          <h3 className="text-xl sm:text-2xl font-black">{gameData.title}</h3>
          <p className="text-xs sm:text-sm text-blue-200">
            Selesaikan misi tantangan level untuk mengumpulkan bintang, mendapatkan +100 XP, dan membuka gembok Evaluasi Bab!
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/15">
          <div className="text-center">
            <div className="text-[11px] text-blue-200 font-bold uppercase">Skor Misi</div>
            <div className="text-2xl font-black text-amber-300">{score} Poin</div>
          </div>
          <div className="flex gap-1">
            {gameData.levels.map((lv) => (
              <Star
                key={lv.level}
                className={`w-6 h-6 ${
                  clearedLevels[lv.level] ? 'text-amber-400 fill-amber-400' : 'text-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pilihan Level Tabs */}
      <div className="flex flex-wrap gap-2">
        {gameData.levels.map((lv, idx) => {
          const isCleared = clearedLevels[lv.level];
          const isActive = curLevelIdx === idx;
          return (
            <button
              key={lv.level}
              type="button"
              onClick={() => selectLevel(idx)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 border transition ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : isCleared
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{isCleared ? '⭐' : '🎮'}</span>
              <span>{lv.name}</span>
            </button>
          );
        })}
      </div>

      {/* Kartu Misi Interaktif */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
              MISI AKTIF • {curLevel.name}
            </span>
            <p className="text-slate-800 font-semibold text-sm sm:text-base leading-relaxed">
              {curLevel.mission}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">
            Reward: +100 XP
          </span>
        </div>

        {/* Visualisasi Dinamis Level 1 Fluida: Kapal Selam & Tangki Ballast */}
        {topicId === 'fluida' && curLevel.level === 1 && (() => {
          const subY = Math.max(42, Math.min(148, 95 + ((sliderVal - 1025) / 375) * 52));
          const isAligned = Math.abs(sliderVal - 1025) <= 25;
          return (
            <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4">
              <svg viewBox="0 0 540 190" className="w-full max-w-lg mx-auto h-auto" role="img" aria-label="Visualisasi kapal selam menyesuaikan massa jenis terhadap sensor laut">
                <rect x="20" y="25" width="500" height="150" rx="12" fill="rgba(56, 189, 248, 0.28)" stroke="#0284c7" strokeWidth="2" />
                <line x1="20" y1="95" x2="520" y2="95" stroke={isAligned ? '#16a34a' : '#94a3b8'} strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="445" cy="95" r="14" fill={isAligned ? '#16a34a' : '#f59e0b'} stroke="#ffffff" strokeWidth="3" />
                <text x="445" y="128" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Sensor Target</text>
                <text x="445" y="142" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">ρ_laut = 1.025</text>
                {/* Kapal selam */}
                <g transform={`translate(185, ${subY})`}>
                  <rect x="-46" y="-16" width="92" height="32" rx="16" fill="#1e3a8a" />
                  <rect x="-14" y="-28" width="28" height="14" rx="4" fill="#2563eb" />
                  <circle cx="-18" cy="0" r="5" fill="#bae6fd" />
                  <circle cx="0" cy="0" r="5" fill="#bae6fd" />
                  <circle cx="18" cy="0" r="5" fill="#bae6fd" />
                  <text x="0" y="30" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
                    ρ_kapal = {sliderVal} kg/m³
                  </text>
                </g>
              </svg>
            </div>
          );
        })()}

        {/* Visualisasi Khusus untuk Level 2 Fluida: Skema Dongkrak Pipa U */}
        {topicId === 'fluida' && curLevel.level === 2 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <svg viewBox="0 0 540 200" className="w-full max-w-lg mx-auto h-auto">
              <path d="M 120 35 L 120 155 Q 120 175 140 175 L 400 175 Q 420 175 420 155 L 420 35 L 460 35 L 460 165 Q 460 192 410 192 L 130 192 Q 80 192 80 165 L 80 35 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 120 85 L 120 155 Q 120 175 140 175 L 400 175 Q 420 175 420 155 L 420 85 L 460 85 L 460 165 Q 460 192 410 192 L 130 192 Q 80 192 80 165 L 80 85 Z" fill="#60a5fa" opacity="0.7" />
              <rect x="85" y="75" width="30" height="14" fill="#334155" rx="3" />
              <text x="100" y="25" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">↓ F₁ = 150 N</text>
              <text x="55" y="115" fill="#0369a1" fontSize="12" fontWeight="bold">A₁ = 10 cm²</text>

              <rect x="385" y="75" width="70" height="14" fill="#334155" rx="3" />
              <rect x="390" y="38" width="60" height="26" rx="6" fill="#2563eb" />
              <text x="420" y="55" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">MOBIL</text>
              <text x="470" y="55" fill="#16a34a" fontSize="13" fontWeight="bold">↑ F₂ = {sliderVal} N</text>
              <text x="468" y="115" fill="#0369a1" fontSize="12" fontWeight="bold">A₂ = 200 cm² (20×)</text>
            </svg>
          </div>
        )}

        {/* Visualisasi Dinamis Level 3 Fluida: Drone Bawah Air & Perisai Tekanan */}
        {topicId === 'fluida' && curLevel.level === 3 && (() => {
          const okShield = Math.abs(sliderVal - 8000) <= 100;
          return (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <svg viewBox="0 0 540 175" className="w-full max-w-lg mx-auto h-auto" role="img" aria-label="Visualisasi drone bawah air di kedalaman 0,8 meter">
                <rect x="30" y="20" width="480" height="140" rx="12" fill="rgba(14, 165, 233, 0.24)" stroke="#0369a1" strokeWidth="2" />
                <line x1="30" y1="35" x2="510" y2="35" stroke="#0284c7" strokeWidth="2.5" />
                <text x="46" y="30" fill="#0369a1" fontSize="11" fontWeight="bold">Permukaan (h = 0 m)</text>
                <line x1="120" y1="35" x2="120" y2="118" stroke="#334155" strokeWidth="2" strokeDasharray="4 3" />
                <text x="130" y="82" fill="#0f172a" fontSize="11" fontWeight="bold">h = 0,8 m</text>
                <circle cx="290" cy="115" r="36" fill="none" stroke={okShield ? '#16a34a' : '#2563eb'} strokeWidth="4" strokeDasharray={okShield ? 'none' : '6 4'} />
                <rect x="266" y="102" width="48" height="26" rx="8" fill="#1e293b" />
                <text x="290" y="119" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">DRONE</text>
                <text x="395" y="112" fill={okShield ? '#15803d' : '#1e293b'} fontSize="12" fontWeight="bold">
                  Perisai: {sliderVal.toLocaleString('id-ID')} Pa
                </text>
                <text x="395" y="128" fill="#475569" fontSize="10">Air tawar: ρ = 1.000, g = 10</text>
              </svg>
            </div>
          );
        })()}

        {/* Slider Kontrol Misi Game */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-700">
              Atur Parameter Jawabanmu:
            </span>
            <span className="text-2xl font-black text-blue-600 bg-white px-4 py-1.5 rounded-xl border border-blue-200 shadow-sm">
              {sliderVal.toLocaleString('id-ID')} {curLevel.unit}
            </span>
          </div>

          <input
            type="range"
            min={curLevel.min}
            max={curLevel.max}
            step={curLevel.step}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full h-3 rounded-lg"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
            <span>Min: {curLevel.min.toLocaleString('id-ID')} {curLevel.unit}</span>
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="min-h-[36px] px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold transition"
            >
              {showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk?'}
            </button>
            <span>Max: {curLevel.max.toLocaleString('id-ID')} {curLevel.unit}</span>
          </div>

          {showHint && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-amber-950">
              💡 Petunjuk: {curLevel.formulaHint}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={handleLaunchCheck}
              className="flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
            >
              <Rocket className="w-4 h-4" /> Uji &amp; Eksekusi Misi!
            </button>
            <button
              type="button"
              onClick={() => {
                setSliderVal(curLevel.initial);
                setFeedback(null);
              }}
              className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Kartu Umpan Balik Selebrasi (Sesuai Gambar 7 Proposal) */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-5 rounded-2xl border-2 ${
                feedback.type === 'win'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-black text-base flex items-center gap-2">
                  {feedback.type === 'win' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Hebat, Misi Berhasil Ditaklukkan! 🎉</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                      <span>Belum Tepat, Ayo Kalibrasi Lagi!</span>
                    </>
                  )}
                </div>
                {feedback.type === 'win' && (
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold">
                    +100 XP
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed mb-4">{feedback.text}</p>

              {feedback.type === 'win' && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-200">
                  <span className="text-xs font-bold text-emerald-700">
                    ✓ Gembok Tahap Evaluasi Bab Telah Terbuka!
                  </span>
                  <div className="flex gap-2">
                    {curLevelIdx + 1 < gameData.levels.length && (
                      <button
                        type="button"
                        onClick={() => selectLevel(curLevelIdx + 1)}
                        className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-extrabold text-xs hover:bg-emerald-100 transition"
                      >
                        Mainkan Level Berikutnya &rarr;
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={onProceedToEval}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow transition"
                    >
                      <span>Lanjut ke Evaluasi Bab</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
