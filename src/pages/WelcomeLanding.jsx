import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  GraduationCap,
  Users,
  Gamepad2,
  FlaskConical,
  Trophy,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Layers
} from 'lucide-react';
import { PHYSICS_TOPICS, LEVEL_RANKS } from '../data/physicsCurriculum';

export default function WelcomeLanding({ onLoginSuccess, loginError }) {
  const [pinInput, setPinInput] = useState('');
  const [serverOnline, setServerOnline] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => alive && setServerOnline(Boolean(d.ok)))
      .catch(() => alive && setServerOnline(false));
    return () => {
      alive = false;
    };
  }, []);
  const showDemo = import.meta.env.DEV || serverOnline === false;
  const [selectedRole, setSelectedRole] = useState(null); // 'student' | 'teacher'
  const [nameInput, setNameInput] = useState('');
  const [idInput, setIdInput] = useState('');
  const [classInput, setClassInput] = useState('XI MIPA 1');
  const [avatarInput, setAvatarInput] = useState('🧑‍🚀');
  const [loading, setLoading] = useState(false);

  const handleOpenRole = (role) => {
    setSelectedRole(role);
    setPinInput('');
    if (role === 'student') {
      setNameInput(showDemo ? 'Andi Pratama' : '');
      setIdInput(showDemo ? '1101' : '');
      setClassInput('XI MIPA 1');
      setAvatarInput('🧑‍🚀');
    } else {
      setNameInput(showDemo ? 'Firgiawan Listianto, S.Pd.' : '');
      setIdInput(showDemo ? '240209501100' : '');
    }
  };

  const handleQuickLogin = async (presetUser) => {
    setLoading(true);
    await onLoginSuccess(presetUser);
    setLoading(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onLoginSuccess({
      name: nameInput.trim() || (selectedRole === 'teacher' ? 'Guru Fisika' : 'Siswa Kelas XI'),
      identifier: idInput.trim() || (selectedRole === 'teacher' ? '240209501100' : '1101'),
      role: selectedRole,
      pin: pinInput,
      className: classInput,
      avatar: selectedRole === 'teacher' ? '👨‍🏫' : avatarInput
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-mesh flex flex-col">
      {/* Topbar Welcoming */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
              Φ
            </div>
            <div>
              <span className="font-black text-lg text-slate-900 tracking-tight block leading-none">
                FisikaLab <span className="text-blue-600">XI</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                SMAN 3 Jeneponto • Kurikulum Merdeka Fase F
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleOpenRole('student')}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm transition"
            >
              Portal Siswa
            </button>
            <button
              type="button"
              onClick={() => handleOpenRole('teacher')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition"
            >
              Portal Pendidik / Guru
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section Utama */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Kolom Kiri: Headline & Ajakan Anti-Pusing */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-blue-700 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multimedia Pembelajaran Interaktif • Model MDLC &amp; 12 Prinsip Mayer</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Belajar Fisika <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Tanpa Takut Pusing</span> Lewat Simulasi &amp; Game!
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Rasakan serunya melihat langsung balok kayu terdorong gaya apung disertai riak air, menyeimbangkan torsi jungkat-jungkit, hingga menaklukkan misi game bertingkat pada <strong>6 Materi Fisika Kelas XI</strong>. Setiap langkah dibimbing secara bertahap dan ramah!
            </p>

            {/* Poin Keunggulan */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/90 border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                <FlaskConical className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">6 Lab Animasi 60FPS</span>
              </div>
              <div className="bg-white/90 border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                <Gamepad2 className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Level XP &amp; Mini-Games</span>
              </div>
              <div className="bg-white/90 border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5 shadow-sm col-span-2 sm:col-span-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Bimbingan Guru Lembut</span>
              </div>
            </div>

            {/* 2 Kartu Pilihan Portal Masuk (Siswa vs Guru) */}
            <div className="pt-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                PILIH PORTAL MASUK UNTUK MEMULAI:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opsi 1: Portal Siswa */}
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => handleOpenRole('student')}
                  className="cursor-pointer group bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-xl shadow-blue-600/20 border border-blue-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                        🧑‍🚀
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-300 text-slate-900 text-[11px] font-black">
                        Mode Petualangan &amp; Game
                      </span>
                    </div>
                    <h2 className="text-xl font-black mb-1">Masuk Sebagai Siswa</h2>
                    <p className="text-xs text-blue-100 leading-relaxed mb-4">
                      Jelajahi 6 bab fisika secara bertahap, mainkan simulasi riak air &amp; pegas, kumpulkan XP, dan naikkan levelmu!
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs font-extrabold">
                    <span>Mulai Petualangan Belajar</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

                {/* Opsi 2: Portal Guru / Tenaga Pendidik */}
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => handleOpenRole('teacher')}
                  className="cursor-pointer group bg-white hover:border-slate-400 text-slate-900 rounded-2xl p-5 shadow-lg border-2 border-slate-200 flex flex-col justify-between transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                        👨‍🏫
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold">
                        Monitoring &amp; Analitik
                      </span>
                    </div>
                    <h2 className="text-xl font-black mb-1">Guru / Tenaga Pendidik</h2>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Pantau progres belajar siswa kelas XI secara real-time, cek skor kuis &amp; refleksi, buka kunci modul kelas, dan unduh laporan nilai.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-extrabold text-blue-600">
                    <span>Buka Dashboard Pendidik</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Visual Interaktif Preview Simulasi & Level */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                  PREVIEW VISUAL SIMULASI &amp; LEVEL
                </span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${serverOnline === false ? 'text-amber-800 bg-amber-50 border-amber-300' : serverOnline ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-600 bg-slate-50 border-slate-200'}`}>
                  <span className={`w-2 h-2 rounded-full ${serverOnline === false ? 'bg-amber-500' : serverOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  {serverOnline === false ? 'Mode Mandiri (Offline / Static Web)' : serverOnline ? 'Database Terhubung' : 'Memeriksa…'}
                </span>
              </div>

              {/* Ilustrasi Animasi Bejana Air & 3 Kondisi Benda */}
              <div className="bg-gradient-to-b from-sky-50 to-blue-100/70 rounded-2xl border border-sky-200 p-4">
                <svg viewBox="0 0 380 190" className="w-full h-auto">
                  {/* Bejana */}
                  <rect x="20" y="15" width="340" height="160" rx="12" fill="#ffffff" stroke="#334155" strokeWidth="3.5" />
                  {/* Air Beriak */}
                  <path
                    d="M 22 75 Q 65 67, 110 75 T 195 75 T 280 75 T 358 75 L 358 173 L 22 173 Z"
                    fill="rgba(56, 189, 248, 0.45)"
                  />
                  <path
                    d="M 22 75 Q 65 67, 110 75 T 195 75 T 280 75 T 358 75"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />

                  {/* 1. Kayu Terapung */}
                  <g className="animate-float-slow">
                    <rect x="55" y="52" width="52" height="38" rx="6" fill="#d97706" stroke="#78350f" strokeWidth="2" />
                    <text x="81" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🪵 Kayu</text>
                    <text x="81" y="42" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">↑ Terapung</text>
                  </g>

                  {/* 2. Telur Melayang */}
                  <g className="animate-pulse-soft">
                    <ellipse cx="190" cy="118" rx="20" ry="25" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                    <text x="190" y="122" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">🥚 Telur</text>
                    <text x="190" y="156" textAnchor="middle" fill="#0f766e" fontSize="10" fontWeight="bold">≈ Melayang</text>
                  </g>

                  {/* 3. Batu Tenggelam */}
                  <g>
                    <polygon points="280,145 298,132 325,138 332,168 275,168" fill="#64748b" stroke="#334155" strokeWidth="2" />
                    <text x="303" y="158" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🪨 Batu</text>
                    <circle cx="305" cy="115" r="3" fill="#fff" stroke="#0284c7" strokeWidth="1.5" />
                    <circle cx="296" cy="98" r="4" fill="#fff" stroke="#0284c7" strokeWidth="1.5" />
                    <text x="303" y="125" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">↓ Cemplung</text>
                  </g>
                </svg>
              </div>

              {/* 5 Jenjang Tingkatan Level Siswa */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-700 flex items-center justify-between">
                  <span>5 Tingkatan Gelar Petualangan Siswa:</span>
                  <span className="text-blue-600">Sistem XP Bertahap</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {LEVEL_RANKS.map((rk) => (
                    <div
                      key={rk.level}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-center"
                    >
                      <div className="text-lg">{rk.badge}</div>
                      <div className="text-[10px] font-black text-slate-800">Lv.{rk.level}</div>
                      <div className="text-[9px] text-slate-500 truncate">{rk.title.split(' ')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Preview 6 Modul Fisika Kelas XI */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                KURIKULUM MERDEKA FASE F • KELAS XI SMA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                6 Modul Pembelajaran Fisika Interaktif
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Setiap bab dilengkapi Materi Visual Mayer, Lab Simulasi 60FPS, Mini-Game Bertingkat &amp; Evaluasi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PHYSICS_TOPICS.map((topic, idx) => (
              <div
                key={topic.id}
                onClick={() => handleOpenRole('student')}
                className="cursor-pointer group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{topic.icon}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                        {topic.number}
                      </span>
                      {idx === 0 ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                          Terbuka Awal
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs">
                          🔒 Bertahap
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {topic.teaser}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{topic.badgeText}</span>
                  <span>Mulai Belajar &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Login 2 Peran (Siswa / Guru) */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className={`p-6 text-white ${
              selectedRole === 'student'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700'
                : 'bg-gradient-to-r from-slate-800 to-slate-950'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider opacity-85">
                  {selectedRole === 'student' ? 'PORTAL PETUALANGAN SISWA' : 'PORTAL GURU & TENAGA PENDIDIK'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-white/80 hover:text-white text-sm font-bold"
                >
                  ✕ Tutup
                </button>
              </div>
              <h3 className="text-2xl font-black">
                {selectedRole === 'student' ? 'Masuk ke Ruang Belajar Siswa' : 'Masuk ke Dashboard Guru'}
              </h3>
              <p className="text-xs opacity-90 mt-1">
                {selectedRole === 'student'
                  ? 'Progres level, eksperimen simulasi, dan skor gamemu tersimpan otomatis di database SQLite.'
                  : 'Pantau perkembangan seluruh siswa kelas XI SMAN 3 Jeneponto secara real-time.'}
              </p>
            </div>

            <div className="p-6 space-y-5">
              {/* Tombol Akun Demo Cepat (hanya mode development) */}
              {showDemo && (<div className="space-y-2">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  MASUK CEPAT (1-KLIK AKUN DEMO):
                </span>
                {selectedRole === 'student' ? (
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleQuickLogin({
                          name: 'Andi Pratama',
                          identifier: '1101',
                          role: 'student',
                          className: 'XI MIPA 1',
                          avatar: '🧑‍🚀'
                        })
                      }
                      className="w-full p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🧑‍🚀</span>
                        <div>
                          <div className="text-xs font-extrabold text-blue-950">
                            Andi Pratama (Siswa Baru - Uji Gembok Bertahap)
                          </div>
                          <div className="text-[11px] text-blue-700">
                            Kelas XI MIPA 1 • NISN: 1101 • Level 1
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleQuickLogin({
                          name: 'Siti Nurhaliza',
                          identifier: '1102',
                          role: 'student',
                          className: 'XI MIPA 1',
                          avatar: '👩‍🔬'
                        })
                      }
                      className="w-full p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👩‍🔬</span>
                        <div>
                          <div className="text-xs font-extrabold text-emerald-950">
                            Siti Nurhaliza (Siswa Lanjutan - 4 Bab Terbuka)
                          </div>
                          <div className="text-[11px] text-emerald-700">
                            Kelas XI MIPA 1 • NISN: 1102 • Level 4
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      handleQuickLogin({
                        name: 'Firgiawan Listianto, S.Pd.',
                        identifier: '240209501100',
                        pin: 'guru123',
                        role: 'teacher',
                        className: 'Guru Fisika XI',
                        avatar: '👨‍🏫'
                      })
                    }
                    className="w-full p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-left flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👨‍🏫</span>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          Firgiawan Listianto, S.Pd. (Guru Fisika XI)
                        </div>
                        <div className="text-[11px] text-slate-600">
                          NIM/NIP: 240209501100 • SMAN 3 Jeneponto
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-800" />
                  </button>
                )}
              </div>)}

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400">
                  ATAU ISI IDENTITAS MANUAL
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {selectedRole === 'student' ? 'Nama Lengkap Siswa' : 'Nama Guru / Pendidik'}
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-base sm:text-sm font-semibold focus:outline-none focus:border-blue-600"
                    placeholder="Masukkan nama..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {selectedRole === 'student' ? 'NISN / Kode Siswa' : 'NIP / NIM Pendidik'}
                    </label>
                    <input
                      type="text"
                      required
                      value={idInput}
                      onChange={(e) => setIdInput(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-base sm:text-sm font-semibold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  {selectedRole === 'student' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kelas</label>
                      <select
                        value={classInput}
                        onChange={(e) => setClassInput(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                      >
                        <option value="XI MIPA 1">XI MIPA 1</option>
                        <option value="XI MIPA 2">XI MIPA 2</option>
                        <option value="XI MIPA 3">XI MIPA 3</option>
                      </select>
                    </div>
                  )}
                </div>

                {selectedRole === 'teacher' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PIN Guru</label>
                    <input
                      type="password"
                      required
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      autoComplete="current-password"
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-blue-600"
                      placeholder="Masukkan PIN"
                    />
                  </div>
                )}
                {selectedRole === 'student' && idInput && (
                  <p className={`text-xs font-bold ${/^\d{4,16}$/.test(idInput.trim()) ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {/^\d{4,16}$/.test(idInput.trim()) ? '✓ NISN sudah sesuai format' : 'NISN berupa angka saja ya (contoh: 0071234567)'}
                  </p>
                )}
                {loginError && (
                  <p role="alert" className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">{loginError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-extrabold text-sm text-white shadow-lg transition ${
                    selectedRole === 'student'
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {loading ? 'Menghubungkan...' : 'Masuk Sekarang →'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

