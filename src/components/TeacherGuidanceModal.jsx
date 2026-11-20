import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, BookOpen, HeartHandshake, X } from 'lucide-react';

/**
 * Modal "Arahan Guru yang Lembut" (Gentle Teacher Guidance)
 * Muncul ketika siswa mencoba menekan materi, simulasi, game, atau evaluasi yang masih terkunci.
 */

export default function TeacherGuidanceModal({ guidance, studentName, onClose, onGoToPrerequisite }) {
  useEffect(() => {
    if (!guidance) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [guidance, onClose]);

  if (!guidance) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Arahan Guru Pembimbing"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-blue-100 overflow-hidden"
        >
          {/* Header Guru Pembimbing yang Ramah */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-4xl shadow-inner shrink-0">
                👨‍🏫
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-300 text-slate-900 text-[11px] font-extrabold mb-1">
                  <HeartHandshake className="w-3.5 h-3.5" /> Arahan Lembut Guru Pembimbing
                </span>
                <h3 className="text-lg font-black leading-snug">
                  Pak Firgiawan, S.Pd.
                </h3>
                <p className="text-xs text-blue-100">
                  Guru Pendamping Fisika Kelas XI • SMAN 3 Jeneponto
                </p>
              </div>
            </div>
          </div>

          {/* Isi Pesan Arahan yang Lembut & Memotivasi */}
          <div className="p-6 space-y-4">
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 relative">
              <div className="text-sm text-slate-800 leading-relaxed space-y-2">
                <p className="font-bold text-blue-950">
                  “Halo {studentName || 'Nak'}! Bapak senang sekali melihat semangat belajarmu yang tinggi untuk membuka bagian <span className="underline decoration-blue-400">{guidance.targetTitle}</span> 😊”
                </p>
                <p className="text-slate-700">
                  {guidance.message}
                </p>
              </div>
            </div>

            {/* Langkah Prasyarat yang Perlu Diselesaikan */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-amber-900 block">
                  Langkah yang Perlu Kamu Tuntaskan Lebih Dulu:
                </span>
                <span className="text-amber-800 font-medium">
                  {guidance.prerequisiteLabel}
                </span>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (onGoToPrerequisite) onGoToPrerequisite();
                  onClose();
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>{guidance.actionLabel || 'Yuk, Ke Tahap Sebelumnya Dulu'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
              >
                Siap, Pak Guru!
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
