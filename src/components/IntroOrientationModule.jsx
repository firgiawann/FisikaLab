import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  BookOpen,
  FlaskConical,
  Gamepad2,
  ClipboardCheck,
  X,
  MessageCircleHeart
} from 'lucide-react';

/**
 * Sapaan & Pengenalan 2 Arah (Pre-training ringan ~20 detik)
 * Dirancang ramah psikologi siswa SMA: langsung mengajak ngobrol,
 * memberi rasa aman & kendali belajar, tanpa jargon teori atau kamus kaku.
 */

const WARMUP_OPTIONS = [
  {
    id: 'air',
    label: 'Airnya punya dorongan ke atas yang kuat buat kayu, tapi kalah sama berat batu',
    reply:
      'Tebakan yang tajam! Air memang mendorong benda ke atas. Nanti di lab kamu bisa lihat langsung bagaimana dorongan itu melontarkan kayu kembali ke permukaan.'
  },
  {
    id: 'bentuk',
    label: 'Kayu lebih ringan atau berongga dibanding batu yang padat',
    reply:
      'Masuk akal banget! Kerapatan benda memang jadi kunci utamanya — bahkan kapal baja raksasa pun bisa mengapung karena rahasia ini.'
  },
  {
    id: 'penasaran',
    label: 'Belum yakin nih, pengen lihat buktinya langsung!',
    reply:
      'Santai aja, justru rasa penasaran itu awal paling seru buat belajar! Sebentar lagi kamu bisa menjatuhkan kayu, telur, dan batu langsung di lab.'
  }
];

const JOURNEY_STEPS = [
  { icon: Compass, title: 'Amati Sekitar', desc: 'Mulai dari kejadian sehari-hari, tanpa rumus dulu', tone: 'bg-sky-50 text-sky-700' },
  { icon: BookOpen, title: 'Pahami Pelan-pelan', desc: 'Bahasa santai, gambar interaktif, rumus baru muncul kalau siap', tone: 'bg-blue-50 text-blue-700' },
  { icon: FlaskConical, title: 'Coba di Lab', desc: 'Utak-atik simulasi sendiri — bisa dipelanin atau diulang', tone: 'bg-teal-50 text-teal-700' },
  { icon: Gamepad2, title: 'Tantangan Seru', desc: 'Selesaikan misi kapal selam, dongkrak, dan lainnya', tone: 'bg-violet-50 text-violet-700' },
  { icon: ClipboardCheck, title: 'Cek Paham', desc: 'Uji dirimu santai; kalau belum pas boleh ulang lagi', tone: 'bg-emerald-50 text-emerald-700' }
];

export default function IntroOrientationModule({ isOpen, studentName, isDone, onClose, onCompleteIntro }) {
  const [step, setStep] = useState(1); // 1: Ngobrol 2 arah, 2: Cara main singkat
  const [pickedWarmup, setPickedWarmup] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [step]);

  if (!isOpen) return null;

  const chosen = WARMUP_OPTIONS.find((o) => o.id === pickedWarmup);

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sapaan Awal FisikaLab"
        className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92dvh] flex flex-col"
        >
          {/* Header Hangat & Ringkas */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white p-5 sm:p-6 relative shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
              aria-label="Tutup sapaan"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Kenalan Sebentar ({step}/2)
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-snug pr-10">
              Halo {studentName || 'Sobat Fisika'}, selamat datang di FisikaLab!
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              Tenang, di sini kamu nggak bakal langsung dilempar rumus panjang. Kita mulai santai dulu ya.
            </p>
          </div>

          {/* Konten Utama (Scroll hanya di bagian tengah) */}
          <div ref={contentRef} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                    Ngobrol Dulu Sebentar
                  </p>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    Bayangkan kamu melempar balok kayu dan batu kecil ke kolam air. Menurutmu, kenapa kayu langsung membal balik ke atas sedangkan batu tenggelam?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih saja yang paling cocok menurutmu — nggak ada nilai dan nggak ada salah.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {WARMUP_OPTIONS.map((opt) => {
                    const active = pickedWarmup === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPickedWarmup(opt.id)}
                        className={`w-full min-h-[52px] p-4 rounded-2xl border-2 text-left text-sm font-semibold transition flex items-center justify-between gap-3 ${
                          active
                            ? 'bg-blue-50 border-blue-600 text-blue-950 shadow-sm'
                            : 'bg-slate-50 hover:bg-blue-50/40 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="leading-relaxed">{opt.label}</span>
                        {active && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {chosen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="status"
                      aria-live="polite"
                      className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3"
                    >
                      <MessageCircleHeart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-emerald-950 leading-relaxed">
                        {chosen.reply}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-teal-600">
                    Begini Cara Belajarmu Nanti
                  </p>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Kamu sendiri yang atur kecepatannya
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tiap bab disusun bertahap dari hal paling dekat di sekitarmu. Kalau sudah paham, kamu bisa melaju cepat; kalau mau pelan-pelan, simulasi bisa dipelanin atau diulang sesukamu.
                  </p>
                </div>

                <div className="space-y-2">
                  {JOURNEY_STEPS.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.tone}`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-slate-900">
                            {idx + 1}. {item.title}
                          </div>
                          <p className="text-xs text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="min-h-[44px] px-3 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
              >
                Lewati tebakan
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="min-h-[48px] px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm"
              >
                &larr; Kembali
              </button>
            )}

            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!pickedWarmup}
                className="min-h-[48px] px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-sm flex items-center gap-2 shadow transition"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  onCompleteIntro();
                }}
                className="min-h-[48px] px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isDone ? 'Kembali ke Dashboard' : 'Mulai Jelajahi Bab 01 →'}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
