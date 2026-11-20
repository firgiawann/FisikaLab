import React, { useEffect, useState } from 'react';
import {
  Users,
  BarChart3,
  Award,
  Unlock,
  Lock,
  Download,
  Search,
  LogOut,
  Eye,
  CheckCircle2,
  Clock,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { PHYSICS_TOPICS } from '../data/physicsCurriculum';

export default function TeacherDashboard({ teacherUser, authFetch, onLogout, onSwitchToStudent }) {
  const formatWita = (s) => {
    if (!s) return '';
    const d = new Date(String(s).replace(' ', 'T') + 'Z');
    return isNaN(d) ? s : d.toLocaleString('id-ID', { timeZone: 'Asia/Makassar', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' WITA';
  };
  const [dashboardData, setDashboardData] = useState({
    students: [],
    logs: [],
    misconceptions: [],
    demoUnlockAll: false
  });
  const [filterClass, setFilterClass] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/teacher/dashboard');
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setDashboardData(data);
          setLoading(false);
          return;
        }
      }
      throw new Error('API dashboard tidak merespons');
    } catch {
      // Fallback Data Pratinjau Guru (GitHub Pages / Standalone Offline)
      setDashboardData({
        students: [
          { id: 1, name: 'Andi Pratama', identifier: '1101', class_name: 'XI MIPA 1', avatar: '🧑‍🚀', xp: 240, level: 2, completed_topics: 1, last_active: '2026-11-20 12:00:00' },
          { id: 2, name: 'Nurul Fadhilah', identifier: '1102', class_name: 'XI MIPA 1', avatar: '👩‍🔬', xp: 180, level: 1, completed_topics: 1, last_active: '2026-11-20 11:30:00' },
          { id: 3, name: 'Rahmat Hidayat', identifier: '1103', class_name: 'XI MIPA 2', avatar: '🧑‍🎓', xp: 90, level: 1, completed_topics: 0, last_active: '2026-11-20 10:15:00' }
        ],
        logs: [
          { id: 1, name: 'Andi Pratama', identifier: '1101', class_name: 'XI MIPA 1', action: 'evaluasi', details: 'Menyelesaikan Evaluasi Bab 01 Fluida (Skor 85)', created_at: '2026-11-20 12:00:00' }
        ],
        misconceptions: [
          { unit_id: 'u2', misconception_key: 'h_vs_depth', count: 2 }
        ],
        demoUnlockAll: false
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
    const timer = setInterval(fetchDashboard, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleGlobalUnlock = async () => {
    const nextVal = !dashboardData.demoUnlockAll;
    try {
      const res = await authFetch('/api/teacher/toggle-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unlockAll: nextVal })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setDashboardData((prev) => ({ ...prev, demoUnlockAll: data.demoUnlockAll }));
          return;
        }
      }
    } catch {}
    // Fallback lokal jika offline
    setDashboardData((prev) => ({ ...prev, demoUnlockAll: nextVal }));
  };

  const filteredStudents = dashboardData.students.filter((st) => {
    const matchClass = filterClass === 'ALL' || st.class_name === filterClass;
    const matchSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(st.identifier).includes(searchQuery);
    return matchClass && matchSearch;
  });

  const avgClassCompletion = filteredStudents.length
    ? Math.round(
        filteredStudents.reduce((acc, s) => acc + (s.completionPct || 0), 0) / filteredStudents.length
      )
    : 0;

  const avgClassScore = filteredStudents.length
    ? Math.round(
        filteredStudents.reduce((acc, s) => acc + (s.avgScore || 0), 0) / filteredStudents.length
      )
    : 0;

  const handleExportCSV = () => {
    const headers = [
      'Nama Siswa',
      'NISN',
      'Kelas',
      'Level',
      'Total XP',
      'Progres Total (%)',
      'Rata-rata Evaluasi',
      ...PHYSICS_TOPICS.map((t) => `${t.shortTitle} (Skor)`)
    ];
    const rows = filteredStudents.map((st) => [
      `"${st.name}"`,
      `"${st.identifier}"`,
      `"${st.class_name}"`,
      st.level,
      st.xp,
      st.completionPct,
      st.avgScore,
      ...PHYSICS_TOPICS.map((t) => st.topics?.[t.id]?.evalScore || 0)
    ]);

    const csvText = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', 'Laporan_Perkembangan_Siswa_Fisika_XI.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Dashboard Guru */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl shadow">
              👨‍🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base sm:text-lg">
                  Dashboard Guru &amp; Tenaga Pendidik
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                  SQLite Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {teacherUser?.name || 'Firgiawan Listianto, S.Pd.'} • SMAN 3 Jeneponto (Fisika Kelas XI Fase F)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchDashboard}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Segarkan Data</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToStudent}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition"
            >
              Lihat Tampilan Siswa
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition"
              title="Keluar ke Halaman Utama"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 1. Kartu KPI Kelas & Kontrol Gembok Bertahap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-extrabold uppercase">Total Siswa Aktif</span>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{filteredStudents.length} Siswa</div>
            <div className="text-xs text-slate-500 mt-1">Kelas XI MIPA 1, 2 &amp; 3</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-extrabold uppercase">Rata-Rata Ketuntasan Modul</span>
              <BarChart3 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{avgClassCompletion}%</div>
            <div className="text-xs text-slate-500 mt-1">Dari 6 Bab Fisika Kelas XI</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-extrabold uppercase">Rata-Rata Skor Evaluasi</span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">{avgClassScore} / 100</div>
            <div className="text-xs text-slate-500 mt-1">KKM Kurikulum Merdeka: 70</div>
          </div>

          {/* Kontrol Mode Gembok Bertahap vs Buka Semua */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold text-amber-300 uppercase mb-1">
                <span>Mode Kunci Pembelajaran</span>
                {dashboardData.demoUnlockAll ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {dashboardData.demoUnlockAll
                  ? 'Semua Bab & Simulasi dibuka untuk demonstrasi proyektor kelas.'
                  : 'Mode Bertahap Aktif: Siswa wajib menyelesaikan tahap secara berurutan.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleGlobalUnlock}
              className={`mt-3 w-full py-2 px-3 rounded-xl font-extrabold text-xs transition ${
                dashboardData.demoUnlockAll
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {dashboardData.demoUnlockAll
                ? '🔒 Aktifkan Kembali Gembok Bertahap'
                : '🔓 Buka Kunci Semua Modul (Mode Kelas)'}
            </button>
          </div>
        </div>

        {/* 2. Matriks Ketuntasan 6 Bab Fisika Kelas XI */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Penguasaan Siswa per Modul Fisika (6 Bab Fase F)
              </h2>
              <p className="text-xs text-slate-500">
                Persentase siswa yang telah menuntaskan Materi, Simulasi, Game, dan Evaluasi pada masing-masing bab
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {PHYSICS_TOPICS.map((topic) => {
              const totalSt = dashboardData.students.length || 1;
              const doneCount = dashboardData.students.filter(
                (s) => s.topics?.[topic.id]?.evalDone
              ).length;
              const pct = Math.round((doneCount / totalSt) * 100);

              return (
                <div
                  key={topic.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{topic.icon}</span>
                    <span className="text-xs font-black text-blue-600">{pct}%</span>
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 truncate">
                    {topic.number}: {topic.shortTitle}
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {doneCount} dari {totalSt} siswa tuntas
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Tabel Perkembangan Siswa & Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Daftar Perkembangan Individu Siswa
              </h2>
              <p className="text-xs text-slate-500">
                Klik tombol <strong>Detail Progres</strong> untuk melihat tahapan belajar, skor game, dan catatan refleksi siswa
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama / NISN..."
                  className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Filter Kelas */}
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                <option value="ALL">Semua Kelas</option>
                <option value="XI MIPA 1">XI MIPA 1</option>
                <option value="XI MIPA 2">XI MIPA 2</option>
                <option value="XI MIPA 3">XI MIPA 3</option>
              </select>

              {/* Export CSV */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
                  <th className="py-3.5 px-4">Siswa</th>
                  <th className="py-3.5 px-4">Kelas</th>
                  <th className="py-3.5 px-4">Level &amp; XP</th>
                  <th className="py-3.5 px-4">Progres 6 Bab</th>
                  <th className="py-3.5 px-4">Status per Bab (01–06)</th>
                  <th className="py-3.5 px-4">Rata-rata Skor</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-blue-50/30 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{st.avatar || '🧑‍🎓'}</span>
                        <div>
                          <div className="font-extrabold text-slate-900">{st.name}</div>
                          <div className="text-xs text-slate-400">NISN: {st.identifier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                        {st.class_name}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-blue-600">Level {st.level}</div>
                      <div className="text-xs text-slate-500">{st.xp} XP</div>
                    </td>
                    <td className="py-3.5 px-4 w-44">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>{st.completionPct}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${st.completionPct}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1">
                        {PHYSICS_TOPICS.map((t, idx) => {
                          const tp = st.topics?.[t.id];
                          const done = tp?.evalDone;
                          const active = tp?.materiDone || tp?.simulasiDone || tp?.gameDone;
                          return (
                            <span
                              key={t.id}
                              title={`${t.number} ${t.shortTitle}: ${
                                done ? `Tuntas (${tp.evalScore})` : active ? 'Sedang Dipelajari' : 'Terkunci'
                              }`}
                              className={`w-6 h-6 rounded-lg text-[10px] font-extrabold flex items-center justify-center border ${
                                done
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : active
                                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                                  : 'bg-slate-100 text-slate-400 border-slate-200'
                              }`}
                            >
                              0{idx + 1}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg font-extrabold text-xs ${
                          st.avgScore >= 75
                            ? 'bg-emerald-100 text-emerald-800'
                            : st.avgScore > 0
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {st.avgScore > 0 ? `${st.avgScore} / 100` : 'Belum Ujian'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(st)}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs inline-flex items-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail Progres</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3b. Radar Miskonsepsi Kelas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-rose-600" />
            <span>Radar Miskonsepsi: Butir Soal Paling Sering Salah</span>
          </h3>
          {(dashboardData.misconceptions || []).length === 0 ? (
            <p className="text-sm text-slate-500">
              Belum ada data jawaban kuis. Data muncul setelah siswa mengerjakan evaluasi bab.
            </p>
          ) : (
            <div className="space-y-2.5">
              {dashboardData.misconceptions.map((m) => {
                const topic = PHYSICS_TOPICS.find((t) => t.id === m.topic_id);
                return (
                  <div key={`${m.topic_id}-${m.q_index}`} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>
                        {topic?.shortTitle || m.topic_id} • Soal {m.q_index + 1}
                        {m.bloom ? ` (${m.bloom})` : ''}
                      </span>
                      <span className={m.wrongPct >= 50 ? 'text-rose-600' : 'text-amber-600'}>
                        {m.wrongPct}% keliru ({m.wrong}/{m.total})
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.wrongPct >= 50 ? 'bg-rose-500' : 'bg-amber-400'}`}
                        style={{ width: `${m.wrongPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Log Aktivitas Real-Time Siswa */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Log Aktivitas Belajar &amp; Eksperimen Siswa Terbaru</span>
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {dashboardData.logs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-extrabold">
                    {log.student_name} ({log.class_name})
                  </span>
                  <span className="font-semibold text-slate-700">{log.detail}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{formatWita(log.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal Detail Perkembangan Individu Siswa */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedStudent.avatar}</span>
                <div>
                  <h3 className="text-xl font-black">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-300">
                    NISN: {selectedStudent.identifier} • {selectedStudent.class_name} • Level {selectedStudent.level} ({selectedStudent.xp} XP)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {PHYSICS_TOPICS.map((topic) => {
                const tp = selectedStudent.topics?.[topic.id] || {};
                return (
                  <div
                    key={topic.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <span>{topic.icon}</span>
                        <span>{topic.number}: {topic.title}</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                          tp.evalDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : tp.isTopicUnlocked
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {tp.evalDone
                          ? `Tuntas • Nilai Evaluasi: ${tp.evalScore}/100`
                          : tp.isTopicUnlocked
                          ? 'Sedang Dipelajari'
                          : 'Masih Terkunci'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className={`p-2 rounded-lg border font-bold ${tp.materiDone ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-200 text-slate-400'}`}>
                        1. Materi: {tp.materiDone ? '✓ Selesai' : 'Belum'}
                      </div>
                      <div className={`p-2 rounded-lg border font-bold ${tp.simulasiDone ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-200 text-slate-400'}`}>
                        2. Simulasi: {tp.simulasiDone ? '✓ Selesai' : 'Belum'}
                      </div>
                      <div className={`p-2 rounded-lg border font-bold ${tp.gameDone ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-200 text-slate-400'}`}>
                        3. Game: {tp.gameDone ? `✓ (${tp.gameScore} Poin)` : 'Belum'}
                      </div>
                      <div className={`p-2 rounded-lg border font-bold ${tp.evalDone ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-200 text-slate-400'}`}>
                        4. Evaluasi: {tp.evalDone ? `✓ (${tp.evalScore}/100)` : 'Belum'}
                      </div>
                    </div>

                    {tp.reflection && (
                      <div className="text-xs bg-white p-3 rounded-xl border border-slate-200 text-slate-700">
                        <strong className="text-slate-900">Catatan Refleksi Siswa:</strong> “{tp.reflection}”
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

