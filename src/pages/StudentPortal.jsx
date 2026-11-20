import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  FlaskConical,
  Gamepad2,
  ClipboardCheck,
  Lock,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  LogOut,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Compass,
  LayoutDashboard
} from 'lucide-react';
import { PHYSICS_TOPICS, LEVEL_RANKS } from '../data/physicsCurriculum';
import FluidCanvasSim from '../simulations/FluidCanvasSim';
import OtherTopicsCanvasSim from '../simulations/OtherTopicsCanvasSim';
import PhysicsGameArena from '../games/PhysicsGameArena';
import TeacherGuidanceModal from '../components/TeacherGuidanceModal';
import StudentDashboardHome from '../components/StudentDashboardHome';
import TopicOpeningIntro from '../components/TopicOpeningIntro';
import InteractiveMateriView from '../components/InteractiveMateriView';
import IntroOrientationModule from '../components/IntroOrientationModule';

export default function StudentPortal({
  user,
  progress,
  demoUnlockAll,
  onUpdateStage,
  onResetProgress,
  onLogout,
  previewMode = false
}) {
  // Default setelah login = 'dashboard' (TIDAK langsung dilempar ke materi/rumus!)
  const [studentScreen, setStudentScreen] = useState('dashboard'); // 'dashboard' | 'topic'
  const [introDone, setIntroDone] = useState(Boolean(user?.introDone));
  const effectiveIntroDone = Boolean(introDone || user?.introDone || demoUnlockAll || progress.fluida?.materiDone);
  // Pop-up pengenalan otomatis muncul begitu siswa masuk jika belum selesai pengenalan!
  const [showIntroPopup, setShowIntroPopup] = useState(!effectiveIntroDone);
  const [activeTopicId, setActiveTopicId] = useState('fluida');
  const [activeStage, setActiveStage] = useState('pembuka'); // 'pembuka' | 'materi' | 'simulasi' | 'game' | 'evaluasi'
  const [openingDoneMap, setOpeningDoneMap] = useState({});
  const openingDoneFor = (id) => Boolean(openingDoneMap[id] || progress[id]?.openingDone);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [guidanceModal, setGuidanceModal] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lowPower, setLowPower] = useState(() => {
    try {
      return localStorage.getItem('fisikalab_low_power') === '1';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.body.classList.toggle('data-saver', lowPower);
    try {
      localStorage.setItem('fisikalab_low_power', lowPower ? '1' : '0');
    } catch {}
  }, [lowPower]);

  const handleCompleteIntro = () => {
    setIntroDone(true);
    setShowIntroPopup(false);
    onUpdateStage({ topicId: 'fluida', stage: 'intro', detail: 'Menyelesaikan Modul 00 Pengenalan' });
    showToast('🔓 Pengenalan Selesai! Kini Bab 01 (Fluida) telah terbuka dan siap kamu jelajahi di Dashboard!');
  };

  // Evaluation Quiz State
  const [curQIdx, setCurQIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizDoubts, setQuizDoubts] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [reflectionText, setReflectionText] = useState('');

  const currentTopic = PHYSICS_TOPICS.find((t) => t.id === activeTopicId) || PHYSICS_TOPICS[0];
  const topicProg = progress[activeTopicId] || {
    isTopicUnlocked: activeTopicId === 'fluida',
    materiDone: false,
    simulasiDone: false,
    gameDone: false,
    evalDone: false,
    gameScore: 0,
    evalScore: 0,
    reflection: ''
  };

  const currentRank = LEVEL_RANKS.find((r) => r.level === (user?.level || 1)) || LEVEL_RANKS[0];
  const nextRank = LEVEL_RANKS.find((r) => r.level === (user?.level || 1) + 1) || currentRank;
  const xpProgressPct = Math.min(
    100,
    Math.round((((user?.xp || 0) - currentRank.minXp) / Math.max(1, nextRank.maxXp - currentRank.minXp)) * 100)
  );

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4200);
  };

  // Hentikan narasi otomatis saat siswa pindah layar, bab, tahap, atau unit (Temporal Contiguity)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [studentScreen, activeTopicId, activeStage, activeUnitIdx]);

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  // Narasi suara opsional (memilih voice id-ID paling natural & kontekstual mengikuti tahap aktif)
  const toggleNarration = (customText) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const stageNarration =
      studentScreen === 'dashboard'
        ? `Halo ${user?.name || 'Sobat Fisika'}. Pilih bab yang terbuka untuk mulai belajar pelan-pelan dari kejadian sehari-hari.`
        : activeStage === 'materi'
        ? `${currentUnit.title}. ${currentUnit.explanation}`
        : currentTopic.narrationText;
    const text = customText || stageNarration;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'id-ID';
    utter.rate = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const bestId =
      voices.find((v) => v.lang.toLowerCase().startsWith('id') && /google|natural/i.test(v.name)) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('id'));
    if (bestId) utter.voice = bestId;
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
  };

  // Check if a Topic (Bab 1..6) is unlocked
  const isTopicOpen = (topicId, idx) => {
    if (demoUnlockAll || idx === 0) return true;
    const p = progress[topicId];
    return Boolean(p?.isTopicUnlocked);
  };

  // Handle clicking a Topic Card from Dashboard or Topic Switcher
  const handleSelectTopic = (topic, idx) => {
    if (!effectiveIntroDone) {
      setGuidanceModal({
        targetTitle: `${topic.number}: ${topic.title}`,
        message: `Sebelum masuk ke bab pertama, yuk mampir sebentar 20 detik ke sapaan awal! Biar kita kenalan dulu dan kamu bisa pilih ritme belajar yang paling nyaman.`,
        prerequisiteLabel: `Menyelesaikan Sapaan & Kenalan Singkat`,
        actionLabel: `Buka Sapaan Awal Sekarang`,
        onGo: () => {
          setShowIntroPopup(true);
        }
      });
      return;
    }

    if (!isTopicOpen(topic.id, idx)) {
      const prevTopic = PHYSICS_TOPICS[idx - 1];
      setGuidanceModal({
        targetTitle: `${topic.number}: ${topic.title}`,
        message: `Agar pemahaman fisikamu tersusun rapi dan kamu tidak pusing dengan konsep lanjutan, yuk tuntaskan terlebih dahulu rangkaian belajar dan Evaluasi pada ${prevTopic.number} (${prevTopic.shortTitle}). Begitu selesai evaluasi bab tersebut, gembok ${topic.number} akan langsung terbuka otomatis!`,
        prerequisiteLabel: `Menyelesaikan Evaluasi pada ${prevTopic.number}: ${prevTopic.title}`,
        actionLabel: `Ke ${prevTopic.number} (${prevTopic.shortTitle}) Sekarang`,
        onGo: () => {
          setActiveTopicId(prevTopic.id);
          setStudentScreen('topic');
          setActiveStage(progress[prevTopic.id]?.materiDone ? 'materi' : 'pembuka');
          setActiveUnitIdx(0);
        }
      });
      return;
    }

    setActiveTopicId(topic.id);
    setStudentScreen('topic');
    // Selalu masuk ke 'pembuka' (Apersepsi Lingkungan Sekitar) terlebih dahulu jika materi belum dituntaskan!
    setActiveStage(progress[topic.id]?.materiDone ? 'materi' : 'pembuka');
    setActiveUnitIdx(0);
    setCurQIdx(0);
    setQuizAnswers({});
    setQuizDoubts({});
    setQuizResult(null);
    setReflectionText(progress[topic.id]?.reflection || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if a Stage inside the active Topic is unlocked
  const isStageOpen = (stageId) => {
    if (demoUnlockAll) return true;
    if (stageId === 'pembuka') return true;
    if (stageId === 'materi') return Boolean(openingDoneFor(activeTopicId) || topicProg.materiDone);
    if (stageId === 'simulasi') return Boolean(topicProg.materiDone);
    if (stageId === 'game') return Boolean(topicProg.simulasiDone);
    if (stageId === 'evaluasi') return Boolean(topicProg.gameDone);
    return false;
  };

  // Handle clicking a Stage Tab
  const handleSelectStage = (stageId) => {
    if (!isStageOpen(stageId)) {
      if (stageId === 'materi') {
        setGuidanceModal({
          targetTitle: `Tahap 1: Materi Inti (${currentTopic.shortTitle})`,
          message: `Jangan terburu-buru langsung melihat rumus ya, ${user?.name || 'Nak'}! Yuk kita lihat dulu fenomena sehari-hari dan coba tebak santai di bagian Pembuka (Sekitar Kita) supaya kamu punya gambaran nyata sebelum masuk ke materi inti.`,
          prerequisiteLabel: `Menyelesaikan Pemanasan Tebak Santai di Tahap 0: Pembuka (Sekitar Kita)`,
          actionLabel: 'Yuk, Lihat Fenomena Sekitar Dulu',
          onGo: () => setActiveStage('pembuka')
        });
      } else if (stageId === 'simulasi') {
        setGuidanceModal({
          targetTitle: `Tahap 2: Laboratorium Simulasi (${currentTopic.shortTitle})`,
          message: `Sebelum mengutak-atik variabel eksperimen di laboratorium virtual, Bapak sarankan kamu menuntaskan bacaan konsep di Tahap 1 (Materi Inti) terlebih dahulu. Dengan begitu, kamu akan langsung paham mengapa benda di simulasi bergerak demikian!`,
          prerequisiteLabel: `Menyelesaikan bacaan konsep pada Tahap 1: Materi Inti ${currentTopic.shortTitle}`,
          actionLabel: openingDoneFor(activeTopicId) || topicProg.materiDone ? 'Ke Tahap 1: Materi Inti' : 'Ke Pembuka Sekitar Kita',
          onGo: () => setActiveStage(openingDoneFor(activeTopicId) || topicProg.materiDone ? 'materi' : 'pembuka')
        });
      } else if (stageId === 'game') {
        setGuidanceModal({
          targetTitle: `Tahap 3: Arena Game & Tantangan (${currentTopic.shortTitle})`,
          message: `Wah, kamu sudah tidak sabar ingin bermain misi game ya! Tapi agar kamu bisa memenangkan tantangan levelnya dengan mudah tanpa menebak-nebak, yuk lakukan percobaan terlebih dahulu di Tahap 2 (Simulasi Lab) untuk melihat pembuktian fisisnya.`,
          prerequisiteLabel: !topicProg.materiDone
            ? `Selesaikan Tahap 1 (Materi Inti) → Tahap 2 (Simulasi Lab)`
            : `Melakukan eksperimen variabel di Tahap 2: Simulasi Lab`,
          actionLabel: !topicProg.materiDone ? 'Ke Tahap 1: Materi Inti' : 'Ke Tahap 2: Simulasi Lab',
          onGo: () => setActiveStage(!topicProg.materiDone ? (openingDoneFor(activeTopicId) ? 'materi' : 'pembuka') : 'simulasi')
        });
      } else if (stageId === 'evaluasi') {
        setGuidanceModal({
          targetTitle: `Tahap 4: Kuis Evaluasi Mandiri (${currentTopic.shortTitle})`,
          message: `Kuis Evaluasi adalah gerbang terakhir untuk membuka Bab Fisika berikutnya. Agar nilaimu maksimal, yuk selesaikan minimal 1 misi tantangan pada Tahap 3 (Arena Game & Latihan) sebagai pemanasan terlebih dahulu!`,
          prerequisiteLabel: !topicProg.materiDone
            ? 'Selesaikan Tahap 1 (Materi) → Tahap 2 (Simulasi) → Tahap 3 (Game)'
            : !topicProg.simulasiDone
            ? 'Selesaikan Tahap 2 (Simulasi Lab) → Tahap 3 (Arena Game)'
            : 'Menaklukkan minimal 1 Misi Level di Tahap 3: Arena Game',
          actionLabel: !topicProg.materiDone
            ? 'Ke Tahap 1: Materi'
            : !topicProg.simulasiDone
            ? 'Ke Tahap 2: Simulasi'
            : 'Ke Tahap 3: Arena Game',
          onGo: () =>
            setActiveStage(
              !topicProg.materiDone
                ? openingDoneFor(activeTopicId)
                  ? 'materi'
                  : 'pembuka'
                : !topicProg.simulasiDone
                ? 'simulasi'
                : 'game'
            )
        });
      }
      return;
    }

    setActiveStage(stageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transisi dari Pembuka (Apersepsi Lingkungan Sekitar) -> Materi Inti
  const handleEnterCoreMateri = () => {
    setOpeningDoneMap((prev) => ({ ...prev, [activeTopicId]: true }));
    onUpdateStage({ topicId: activeTopicId, stage: 'pembuka', detail: `Selesai Pembuka Bab: ${currentTopic.shortTitle}` });
    setActiveStage('materi');
    setActiveUnitIdx(0);
    showToast(`✨ Keren! Gambaran awalnya sudah dapat—yuk masuk ke Materi Inti ${currentTopic.shortTitle}!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Stage 1 (Materi)
  const handleCompleteMateri = async () => {
    await onUpdateStage({
      topicId: activeTopicId,
      stage: 'materi',
      detail: `Menuntaskan seluruh unit Materi Konsep ${currentTopic.title}`
    });
    showToast('🎉 Materi Selesai (+50 XP)! Gembok Simulasi Lab Telah Terbuka!');
    setActiveStage('simulasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Stage 2 (Simulasi)
  const handleCompleteSimulasi = async (detailMsg) => {
    const wasDone = topicProg.simulasiDone;
    await onUpdateStage({
      topicId: activeTopicId,
      stage: 'simulasi',
      detail: detailMsg || `Menyelesaikan eksperimen Simulasi ${currentTopic.title}`
    });
    if (!wasDone) {
      showToast('🔬 Eksperimen Lab Tercatat (+75 XP)! Gembok Arena Game Terbuka!');
    }
  };

  // Complete Stage 3 (Game)
  const handleCompleteGame = async (gameScore, detailMsg) => {
    const wasDone = topicProg.gameDone;
    await onUpdateStage({
      topicId: activeTopicId,
      stage: 'game',
      score: gameScore,
      detail: detailMsg || `Menaklukkan Arena Game ${currentTopic.title}`
    });
    if (!wasDone) {
      showToast('🏆 Misi Game Tuntas (+100 XP)! Gembok Evaluasi Bab Terbuka!');
    }
  };

  // Submit Stage 4 (Evaluasi Quiz) — KKM 70
  const BLOOM_BY_IDX = ['C2', 'C2', 'C3', 'C4', 'C5'];
  const handleSubmitEvaluation = async () => {
    const questions = currentTopic.questions;
    let correctCount = 0;
    const answers = questions.map((q, idx) => {
      const ok = quizAnswers[idx] === q.correct;
      if (ok) correctCount++;
      return { q: idx, answer: quizAnswers[idx] ? quizAnswers[idx].charCodeAt(0) - 64 : null, correct: ok, bloom: q.bloom || BLOOM_BY_IDX[Math.min(idx, 4)] };
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= 70;
    setQuizResult({ score: finalScore, correctCount, total: questions.length, passed });

    const res = await onUpdateStage({
      topicId: activeTopicId,
      stage: 'evaluasi',
      score: finalScore,
      reflection: reflectionText,
      answers,
      detail: `Evaluasi ${currentTopic.title}: nilai ${finalScore}/100 (${passed ? 'tuntas' : 'belum tuntas'})`
    });

    if (!passed) {
      showToast(`💪 Nilai ${finalScore}/100. Sedikit lagi! Tinjau simulasi lalu coba kuis lagi ya.`);
    } else if (res?.unlockedNextTopic) {
      const nextT = PHYSICS_TOPICS.find((t) => t.id === res.unlockedNextTopic);
      showToast(`🚀 Selamat! Nilai ${finalScore}/100. ${nextT?.number} (${nextT?.shortTitle}) kini terbuka!`);
    } else {
      showToast(`✅ Evaluasi tuntas dengan nilai ${finalScore}/100!`);
    }
  };

  const handleRetryQuiz = () => {
    setQuizResult(null);
    setQuizAnswers({});
    setQuizDoubts({});
    setCurQIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const currentUnit = currentTopic.units[activeUnitIdx] || currentTopic.units[0];
  const currentQuestion = currentTopic.questions[curQIdx] || currentTopic.questions[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs sm:text-sm font-extrabold"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Portal Siswa: Profil, Dashboard Button, Level, XP Bar & Aksi */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Info Siswa */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStudentScreen('dashboard')}
              className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-sm hover:bg-blue-700 transition"
              title="Kembali ke Dashboard Siswa"
            >
              {user?.avatar || '🧑‍🚀'}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-sm sm:text-base">
                  {user?.name || 'Siswa Fisika'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-extrabold text-[11px]">
                  {user?.class_name || 'XI MIPA 1'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>
                  {currentRank.badge} Level {user?.level || 1}: <strong>{currentRank.title}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl min-w-[210px]">
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-[11px] font-extrabold mb-1">
                <span className="text-slate-700">{user?.xp || 0} XP</span>
                <span className="text-blue-600">
                  Target Lv.{(user?.level || 1) + 1}: {nextRank.maxXp} XP
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tombol Utilitas (ringkas di HP: menu titik tiga) */}
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              onClick={() => setStudentScreen('dashboard')}
              className={`min-h-[44px] px-3.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition ${
                studentScreen === 'dashboard'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setLowPower((v) => !v)}
              aria-pressed={lowPower}
              className={`min-h-[44px] px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                lowPower
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Mode Hemat Daya: animasi 30 FPS & efek partikel dikurangi"
            >
              <span aria-hidden>🔋</span>
              <span className="hidden sm:inline">{lowPower ? 'Hemat Daya: ON' : 'Hemat Daya'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Menu lainnya"
              className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-lg transition"
            >
              ⋯
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-40 space-y-1"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    toggleNarration();
                  }}
                  className="w-full min-h-[44px] px-3 rounded-xl hover:bg-slate-50 text-left text-sm font-bold text-slate-700 flex items-center gap-2"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  {isSpeaking ? 'Matikan Suara' : 'Bacakan Narasi'}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    if (!window.confirm('Reset progres, Modul 00, dan gembok ke kondisi awal?')) return;
                    setIntroDone(false);
                    setOpeningDoneMap({});
                    onResetProgress();
                    setStudentScreen('dashboard');
                    setShowIntroPopup(true);
                    showToast('🔒 Progres, Modul 00 & gembok telah direset ke kondisi awal!');
                  }}
                  className="w-full min-h-[44px] px-3 rounded-xl hover:bg-amber-50 text-left text-sm font-bold text-amber-800 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Gembok
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full min-h-[44px] px-3 rounded-xl hover:bg-rose-50 text-left text-sm font-bold text-rose-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> {previewMode ? 'Tutup Pratinjau' : 'Keluar'}
                </button>
              </div>
            )}
          </div>
        </div>
        {previewMode && (
          <div className="bg-indigo-600 text-white text-xs font-bold text-center py-1.5 px-3">
            Mode Pratinjau Guru: data hanya lokal, tidak mengubah progres siswa mana pun.
          </div>
        )}
      </header>

      {/* ==========================================================================
          SCREEN A: DASHBOARD UTAMA SISWA (TAMPIL PERTAMA KALI SETELAH LOGIN!)
          ========================================================================== */}
      {studentScreen === 'dashboard' ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-7">
          <StudentDashboardHome
            user={user}
            progress={progress}
            demoUnlockAll={demoUnlockAll}
            introDone={effectiveIntroDone}
            onOpenIntroModule={() => setShowIntroPopup(true)}
            onSelectTopicCard={handleSelectTopic}
          />
        </main>
      ) : (
        /* ==========================================================================
           SCREEN B: RUANG BELAJAR BAB (TAKSONOMI BLOOM: C1 -> C2 -> C3 -> C4 -> C5-C6)
           ========================================================================== */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Tombol Kembali ke Dashboard + Pindah Bab Cepat */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStudentScreen('dashboard')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Dashboard Siswa</span>
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {PHYSICS_TOPICS.map((t, idx) => {
                const open = isTopicOpen(t.id, idx) && effectiveIntroDone;
                const isCur = t.id === activeTopicId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTopic(t, idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border inline-flex items-center gap-1.5 whitespace-nowrap transition ${
                      isCur
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : open
                        ? 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                        : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.number}</span>
                    {!open && <Lock className="w-3 h-3 text-amber-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner Judul Bab & Stepper 5 Tahap Taksonomi Bloom */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-1">
                  <span>{currentTopic.number}</span>
                  <span>•</span>
                  <span>⏱️ {currentTopic.estimatedTime}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {currentTopic.icon} {currentTopic.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{currentTopic.subtitle}</p>
              </div>
            </div>

            {/* Stepper 5 Tahap Belajar Berurutan (Bahasa Siswa, bersih dari label teori) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100">
              {[
                {
                  id: 'pembuka',
                  step: 'Tahap 1',
                  label: 'Amati Sekitar',
                  icon: Compass,
                  done: Boolean(openingDoneFor(activeTopicId) || topicProg.materiDone),
                  xp: 'Pembuka'
                },
                {
                  id: 'materi',
                  step: 'Tahap 2',
                  label: 'Pahami Konsep',
                  icon: BookOpen,
                  done: topicProg.materiDone,
                  xp: '+50 XP'
                },
                {
                  id: 'simulasi',
                  step: 'Tahap 3',
                  label: 'Coba di Lab',
                  icon: FlaskConical,
                  done: topicProg.simulasiDone,
                  xp: '+75 XP'
                },
                {
                  id: 'game',
                  step: 'Tahap 4',
                  label: 'Tantangan',
                  icon: Gamepad2,
                  done: topicProg.gameDone,
                  xp: '+100 XP'
                },
                {
                  id: 'evaluasi',
                  step: 'Tahap 5',
                  label: 'Cek Paham',
                  icon: ClipboardCheck,
                  done: topicProg.evalDone,
                  xp: '+150 XP'
                }
              ].map((st) => {
                const unlocked = isStageOpen(st.id);
                const isCurrent = activeStage === st.id;
                const IconComp = st.icon;

                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectStage(st.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : unlocked
                        ? 'bg-slate-50 hover:bg-blue-50/70 text-slate-800 border-slate-200'
                        : 'bg-slate-100/70 hover:bg-amber-50/70 text-slate-400 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? 'bg-blue-600 text-white'
                            : st.done
                            ? 'bg-emerald-100 text-emerald-700'
                            : unlocked
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {unlocked ? (
                          <IconComp className="w-4 h-4" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-amber-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-75 truncate">
                          {st.step} • {st.xp}
                        </div>
                        <div className="text-xs font-extrabold truncate">{st.label}</div>
                      </div>
                    </div>

                    {st.done && (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isCurrent ? 'text-emerald-400' : 'text-emerald-600'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= TAHAP 0: PEMBUKA KONTEKSTUAL & TRANSISI ================= */}
          {activeStage === 'pembuka' && (
            <TopicOpeningIntro
              topic={currentTopic}
              studentName={user?.name}
              onEnterCoreMateri={handleEnterCoreMateri}
            />
          )}

          {/* ================= TAHAP 1: MATERI INTI (SIMPLIFIKASI BERTAHAP & INTERAKTIF) ================= */}
          {activeStage === 'materi' && (
            <InteractiveMateriView
              topic={currentTopic}
              activeUnitIdx={activeUnitIdx}
              onChangeUnitIdx={(idx) => setActiveUnitIdx(idx)}
              onBackToOpening={() => setActiveStage('pembuka')}
              onCompleteMateri={handleCompleteMateri}
            />
          )}

          {/* ================= TAHAP 2: SIMULASI LAB 60FPS ================= */}
          {activeStage === 'simulasi' && (
            <div className="space-y-6">
              {activeTopicId === 'fluida' ? (
                <FluidCanvasSim
                  onComplete={handleCompleteSimulasi}
                  isCompleted={topicProg.simulasiDone}
                />
              ) : (
                <OtherTopicsCanvasSim
                  topicId={activeTopicId}
                  onComplete={handleCompleteSimulasi}
                  isCompleted={topicProg.simulasiDone}
                />
              )}

              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs sm:text-sm font-bold text-slate-700">
                  {topicProg.simulasiDone
                    ? '✓ Eksperimen berhasil! Sekarang kamu siap menaklukkan Arena Game & Tantangan.'
                    : '💡 Tebak dan uji ketiga benda (kayu, telur, batu) pada simulasi di atas untuk membuka Arena Game!'}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!topicProg.simulasiDone) {
                      handleCompleteSimulasi(`Menyelesaikan observasi simulasi ${currentTopic.title}`);
                    }
                    setActiveStage('game');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow flex items-center gap-2 transition"
                >
                  <span>Lanjut ke Tahap 3: Arena Game</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= TAHAP 3: ARENA GAME ================= */}
          {activeStage === 'game' && (
            <PhysicsGameArena
              topicId={activeTopicId}
              onComplete={handleCompleteGame}
              isCompleted={topicProg.gameDone}
              onProceedToEval={() => {
                setActiveStage('evaluasi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* ================= TAHAP 4: EVALUASI & REFLEKSI ================= */}
          {activeStage === 'evaluasi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-5">
                {!quizResult ? (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-extrabold text-xs">
                          Soal {curQIdx + 1} / {currentTopic.questions.length}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
                          {currentQuestion.topic}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        Lulus KKM 70: +150 XP & buka bab berikutnya
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                      {currentQuestion.stem}
                    </h3>

                    <div className="space-y-2.5">
                      {currentQuestion.options.map((opt) => {
                        const isPicked = quizAnswers[curQIdx] === opt.key;
                        return (
                          <label
                            key={opt.key}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [curQIdx]: opt.key })}
                            className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                              isPicked
                                ? 'bg-blue-50/80 border-blue-600 text-blue-950'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q_${curQIdx}`}
                              checked={isPicked}
                              onChange={() => {}}
                              className="mt-1"
                            />
                            <span className="font-black text-sm">{opt.key}.</span>
                            <span className="text-sm font-medium leading-relaxed">{opt.text}</span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={curQIdx === 0}
                        onClick={() => setCurQIdx(Math.max(0, curQIdx - 1))}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs sm:text-sm"
                      >
                        &larr; Soal Sebelumnya
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setQuizDoubts({ ...quizDoubts, [curQIdx]: !quizDoubts[curQIdx] })
                        }
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border flex items-center gap-1.5 transition ${
                          quizDoubts[curQIdx]
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{quizDoubts[curQIdx] ? 'Ragu-ragu (Aktif)' : 'Tandai Ragu-ragu'}</span>
                      </button>

                      {curQIdx + 1 < currentTopic.questions.length ? (
                        <button
                          type="button"
                          onClick={() => setCurQIdx(curQIdx + 1)}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm"
                        >
                          Soal Berikutnya &rarr;
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmitEvaluation}
                          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md"
                        >
                          ✓ Kumpulkan Jawaban Evaluasi
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-20 h-20 rounded-full text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 ${quizResult.passed ? 'bg-emerald-400' : 'bg-amber-300'}`}>
                          {quizResult.score}
                        </div>
                        <div>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400">
                            HASIL EVALUASI {currentTopic.number}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black">
                            {quizResult.passed
                              ? 'Selamat! Kompetensi Bab Tuntas 🎉'
                              : 'Hebat sudah berjuang! Yuk perkuat sedikit lagi'}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 mt-1">
                            Benar {quizResult.correctCount} dari {quizResult.total} soal ({quizResult.score}/100). {quizResult.passed ? 'Bab berikutnya sudah terbuka di Dashboard!' : 'KKM 70. Kamu belum terlalu jauh — tinjau lagi simulasinya sebentar, lalu coba kuis ini lagi. Tidak ada hukuman!'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {!quizResult.passed && (
                          <>
                            <button type="button" onClick={() => { handleRetryQuiz(); setActiveStage('simulasi'); }} className="min-h-[44px] px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs">Kembali ke Simulasi</button>
                            <button type="button" onClick={handleRetryQuiz} className="min-h-[44px] px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs">Ulangi Kuis</button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => setStudentScreen('dashboard')}
                          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs"
                        >
                          Kembali ke Dashboard
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-base">
                        Umpan Balik &amp; Pembahasan Konsep
                      </h4>
                      {currentTopic.questions.map((q, idx) => {
                        const ans = quizAnswers[idx];
                        const isRight = ans === q.correct;
                        return (
                          <div
                            key={q.id}
                            className={`p-4 rounded-xl border ${
                              isRight
                                ? 'bg-emerald-50/70 border-emerald-200'
                                : 'bg-rose-50/70 border-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-extrabold mb-1">
                              <span>
                                Soal {idx + 1}: {q.topic}
                              </span>
                              <span className={isRight ? 'text-emerald-700' : 'text-rose-700'}>
                                {isRight
                                  ? `✓ Benar (${ans})`
                                  : (quizResult.passed ? `✗ Jawabanmu: ${ans || '-'} (Kunci: ${q.correct})` : `✗ Jawabanmu: ${ans || '-'} (coba pikirkan lagi)`)}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {isRight || quizResult.passed ? q.explanation : 'Petunjuk: tinjau kembali simulasi dan materi bab ini, lalu coba lagi.'}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                      <h4 className="font-extrabold text-slate-900 text-base">
                        Catatan Refleksi Mandiri (Terkirim ke Dashboard Guru)
                      </h4>
                      <textarea
                        rows={3}
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                        placeholder="Tuliskan kesimpulan konsep yang kamu pahami setelah melakukan simulasi dan evaluasi bab ini..."
                        className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          await onUpdateStage({
                            topicId: activeTopicId,
                            stage: 'reflection',
                            reflection: reflectionText,
                            detail: `Menulis refleksi mandiri pada ${currentTopic.title}`
                          });
                          showToast('✓ Catatan refleksimu sudah tersimpan!');
                        }}
                        className="min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm"
                      >
                        Simpan Refleksi
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    PALET NOMOR SOAL
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {currentTopic.questions.length} Soal
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {currentTopic.questions.map((q, idx) => {
                    const isCur = curQIdx === idx;
                    const isDoubt = quizDoubts[idx];
                    const isAns = Boolean(quizAnswers[idx]);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setQuizResult(null);
                          setCurQIdx(idx);
                        }}
                        className={`aspect-square min-h-[44px] rounded-xl font-extrabold text-sm border transition ${
                          isCur
                            ? 'bg-blue-600 text-white border-blue-600 shadow'
                            : isDoubt
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : isAns
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    );
                  })}
                </div>

                {!quizResult && (
                  <button
                    type="button"
                    onClick={handleSubmitEvaluation}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow transition"
                  >
                    Kumpulkan Jawaban Sekarang
                  </button>
                )}
              </aside>
            </div>
          )}
        </main>
      )}

      {/* Pop-up Modul 00: Pengenalan & Orientasi (Muncul Otomatis Sebelum Bab 01–06 Bisa Diakses) */}
      <IntroOrientationModule
        isOpen={showIntroPopup}
        studentName={user?.name}
        isDone={effectiveIntroDone}
        onClose={() => setShowIntroPopup(false)}
        onCompleteIntro={handleCompleteIntro}
      />

      {/* Modal "Arahan Guru yang Lembut" Saat Klik Item Terkunci */}
      <TeacherGuidanceModal
        guidance={guidanceModal}
        studentName={user?.name}
        onClose={() => setGuidanceModal(null)}
        onGoToPrerequisite={() => {
          if (guidanceModal?.onGo) guidanceModal.onGo();
        }}
      />
    </div>
  );
}
