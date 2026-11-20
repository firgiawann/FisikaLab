import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Trophy,
  Flame,
  Lock,
  CheckCircle2,
  ArrowRight,
  Gamepad2,
  FlaskConical,
  BookOpen,
  Award,
  Compass
} from 'lucide-react';
import { PHYSICS_TOPICS, LEVEL_RANKS } from '../data/physicsCurriculum';

/**
 * Dashboard Utama Siswa (Tampil Pertama Kali Setelah Login!)
 * Mengajak siswa belajar santai tanpa langsung dilempar rumus/materi berat.
 */

export default function StudentDashboardHome({
  user,
  progress,
  demoUnlockAll,
  introDone,
  onOpenIntroModule,
  onSelectTopicCard
}) {
  const currentRank = LEVEL_RANKS.find((r) => r.level === (user?.level || 1)) || LEVEL_RANKS[0];
  const nextRank = LEVEL_RANKS.find((r) => r.level === (user?.level || 1) + 1) || currentRank;
  const xpPct = Math.min(
    100,
    Math.round((((user?.xp || 0) - currentRank.minXp) / Math.max(1, nextRank.maxXp - currentRank.minXp)) * 100)
  );

  // Hitung statistik progres keseluruhan
  let totalDoneStages = 0;
  let completedTopicsCount = 0;
  let recommendedTopic = PHYSICS_TOPICS[0];

  PHYSICS_TOPICS.forEach((t, idx) => {
    const p = progress[t.id];
    const unlocked = demoUnlockAll || idx === 0 || Boolean(p?.isTopicUnlocked);
    if (p) {
      totalDoneStages +=
        (p.materiDone ? 1 : 0) +
        (p.simulasiDone ? 1 : 0) +
        (p.gameDone ? 1 : 0) +
        (p.evalDone ? 1 : 0);
      if (p.evalDone) completedTopicsCount++;
    }
  });

  // Rekomendasi: bab terbuka paling awal yang belum tuntas evaluasi
  const firstOpenUnfinished = PHYSICS_TOPICS.find((t, idx) => {
    const p = progress[t.id];
    const unlocked = demoUnlockAll || idx === 0 || Boolean(p?.isTopicUnlocked);
    return unlocked && !p?.evalDone;
  });
  if (firstOpenUnfinished) recommendedTopic = firstOpenUnfinished;

  const overallPct = Math.round((totalDoneStages / (PHYSICS_TOPICS.length * 4)) * 100);

  // Lencana Pencapaian Siswa
  const badges = [
    {
      id: 'b1',
      icon: '🌱',
      name: 'Langkah Pertama',
      desc: 'Masuk ke FisikaLab XI',
      earned: true
    },
    {
      id: 'b2',
      icon: '💧',
      name: 'Peneliti Fluida',
      desc: 'Uji Lab Riak Air & Apung',
      earned: Boolean(progress.fluida?.simulasiDone)
    },
    {
      id: 'b3',
      icon: '🎮',
      name: 'Juara Misi Game',
      desc: 'Taklukkan 1 Arena Game',
      earned: Object.values(progress).some((p) => p?.gameDone)
    },
    {
      id: 'b4',
      icon: '🏆',
      name: 'Penakluk Bab',
      desc: 'Lulus Evaluasi 1 Bab',
      earned: completedTopicsCount >= 1
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Hero Banner Sapaan Hangat & Status Petualangan */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white p-6 sm:p-8 shadow-xl shadow-blue-600/15 relative overflow-hidden"
      >
        {/* Dekorasi lembut latar belakang */}
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-20 -bottom-16 w-44 h-44 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 text-xs font-extrabold text-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dashboard Petualangan Fisika • Santai &amp; Anti-Pusing</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black leading-tight">
              Halo, {user?.name || 'Petualang Fisika'}! 👋
            </h1>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
              Nggak usah buru-buru menghafal rumus! Di sini kamu cukup pilih bab yang menarik, amati fenomena di sekitarmu dulu, mainkan simulasi &amp; game serunya, lalu kumpulkan XP untuk naik tingkatan!
            </p>

            {/* Tombol Lanjutkan Cepat */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!introDone && !demoUnlockAll) {
                    onOpenIntroModule();
                  } else {
                    const idx = PHYSICS_TOPICS.findIndex((t) => t.id === recommendedTopic.id);
                    onSelectTopicCard(recommendedTopic, idx);
                  }
                }}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2 transition"
              >
                <Compass className="w-4 h-4" />
                <span>
                  {!introDone && !demoUnlockAll
                    ? 'Mulai dari Sapaan Awal'
                    : `Lanjutkan: ${recommendedTopic.number} (${recommendedTopic.shortTitle})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur border border-white/20 text-xs font-bold">
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Streak Belajar: {user?.streak || 1} Hari</span>
              </div>
            </div>
          </div>

          {/* Kartu Ringkasan Level & XP Siswa */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
                  {currentRank.badge}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                    Tingkatan Saat Ini
                  </div>
                  <div className="text-base font-black text-white">
                    Level {user?.level || 1} • {currentRank.title}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-amber-300">{user?.xp || 0}</div>
                <div className="text-[10px] font-bold text-blue-200 uppercase">Total XP</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-blue-100">Progres Menuju Level {(user?.level || 1) + 1}</span>
                <span className="text-amber-300">{xpPct}%</span>
              </div>
              <div className="h-2.5 bg-slate-950/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-300 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${xpPct}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-slate-950/20 rounded-xl p-2">
                <div className="text-lg font-black">{overallPct}%</div>
                <div className="text-[10px] text-blue-200 font-semibold">Total Progres</div>
              </div>
              <div className="bg-slate-950/20 rounded-xl p-2">
                <div className="text-lg font-black">{completedTopicsCount}/6</div>
                <div className="text-[10px] text-blue-200 font-semibold">Bab Tuntas</div>
              </div>
              <div className="bg-slate-950/20 rounded-xl p-2">
                <div className="text-lg font-black">
                  {badges.filter((b) => b.earned).length}/4
                </div>
                <div className="text-[10px] text-blue-200 font-semibold">Lencana</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 1.5 MODUL 00: MODUL PENGENALAN & ORIENTASI (GERBANG PERTAMA SEBELUM BAB 01–06) */}
      <motion.section
        whileHover={{ y: -2 }}
        onClick={onOpenIntroModule}
        className={`cursor-pointer rounded-3xl border-2 p-5 sm:p-6 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${
          introDone
            ? 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-300'
            : 'bg-gradient-to-r from-amber-50 via-white to-sky-50 border-amber-300 hover:border-blue-400 shadow-md'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center text-3xl shrink-0 shadow">
            🧭
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-extrabold">
                Langkah Pertama
              </span>
              {introDone && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                  <CheckCircle2 className="w-3 h-3" /> Sudah Selesai
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Sapaan &amp; Kenalan Singkat FisikaLab
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Ngobrol sebentar sekitar 20 detik sebelum mulai — biar tahu cara main di sini dan nggak langsung kaget ketemu rumus.
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`w-full md:w-auto px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shrink-0 flex items-center justify-center gap-2 transition ${
            introDone
              ? 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
          }`}
        >
          <span>{introDone ? 'Buka Ulang Pengenalan' : 'Mulai Pengenalan (+50 XP)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.section>

      {/* 2. Bento Grid Pemilihan 6 Materi Fisika Kelas XI */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              PILIH PETUALANGAN BELAJARMU
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              6 Modul Fisika Kelas XI (Kurikulum Merdeka)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Bab terbuka secara bertahap. Coba klik bab berikon 🔒 untuk melihat arahan lembut dari Pak Guru!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PHYSICS_TOPICS.map((topic, idx) => {
            const tp = progress[topic.id] || {};
            const unlocked = demoUnlockAll || (introDone && (idx === 0 || Boolean(tp.isTopicUnlocked)));
            const doneCount =
              (tp.materiDone ? 1 : 0) +
              (tp.simulasiDone ? 1 : 0) +
              (tp.gameDone ? 1 : 0) +
              (tp.evalDone ? 1 : 0);
            const topicPct = Math.round((doneCount / 4) * 100);

            return (
              <motion.article
                key={topic.id}
                whileHover={{ y: -4 }}
                onClick={() => onSelectTopicCard(topic, idx)}
                className={`cursor-pointer rounded-2xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                  unlocked
                    ? 'bg-white border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-lg'
                    : 'bg-slate-100/80 border-slate-200/90 hover:border-amber-300 opacity-90'
                }`}
              >
                <div>
                  {/* Header Kartu */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                        unlocked ? 'bg-blue-50 border border-blue-100' : 'bg-slate-200/80 grayscale'
                      }`}
                    >
                      {topic.icon}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                        {topic.number}
                      </span>
                      {tp.evalDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Tuntas
                        </span>
                      ) : unlocked ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs">
                          Siap Jelajahi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">
                          <Lock className="w-3 h-3" /> Terkunci
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Judul & Pertanyaan Penasaran */}
                  <h3 className="text-lg font-black text-slate-900 leading-snug mb-1.5">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    “{topic.teaser}”
                  </p>
                </div>

                {/* Progres Mini 4 Tahap & CTA */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <div className="flex items-center gap-1.5">
                      <span
                        title="Materi Konsep"
                        className={`w-2.5 h-2.5 rounded-full ${
                          tp.materiDone ? 'bg-emerald-500' : unlocked ? 'bg-blue-200' : 'bg-slate-300'
                        }`}
                      />
                      <span
                        title="Simulasi Lab"
                        className={`w-2.5 h-2.5 rounded-full ${
                          tp.simulasiDone ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                      />
                      <span
                        title="Arena Game"
                        className={`w-2.5 h-2.5 rounded-full ${
                          tp.gameDone ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                      />
                      <span
                        title="Evaluasi Bab"
                        className={`w-2.5 h-2.5 rounded-full ${
                          tp.evalDone ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                      />
                      <span className="text-slate-400 ml-1">{doneCount}/4 Tahap</span>
                    </div>
                    <span className={unlocked ? 'text-blue-600' : 'text-amber-700'}>
                      {topicPct}%
                    </span>
                  </div>

                  <div
                    className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-between transition ${
                      unlocked
                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <span>
                      {unlocked
                        ? doneCount > 0
                          ? 'Lanjutkan Eksplorasi Bab'
                          : 'Mulai dari Fenomena Sekitar'
                        : 'Klik untuk Arahan Pak Guru'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3. Baris Bawah: Koleksi Lencana & Alur Belajar Santai */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Koleksi Lencana */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Koleksi Lencana Petualanganmu</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">
              {badges.filter((b) => b.earned).length} dari {badges.length} Diraih
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3 rounded-xl border text-center transition ${
                  b.earned
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-slate-50 border-slate-200 opacity-55 grayscale'
                }`}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-extrabold text-slate-900">{b.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alur Belajar Anti-Pusing */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-black text-base flex items-center gap-2 text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>Cara Seru Belajar di FisikaLab XI</span>
          </h3>
          <ol className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 text-[10px]">0</span>
              <span><strong>Amati Sekitar:</strong> Kenali dulu fenomena sehari-hari &amp; tebak santai tanpa takut salah.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
              <span><strong>Pahami Konsep:</strong> Baca santai lewat gambar &amp; analogi (+50 XP).</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
              <span><strong>Main Simulasi 60FPS:</strong> Jatuhkan kayu, telur, batu &amp; lihat riak airnya (+75 XP).</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 text-[10px]">3</span>
              <span><strong>Taklukkan Game &amp; Evaluasi:</strong> Kumpulkan XP &amp; buka bab berikutnya!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
