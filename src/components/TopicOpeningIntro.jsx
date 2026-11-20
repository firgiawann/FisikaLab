import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Compass,
  MessageCircleHeart,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  FlaskConical,
  Gamepad2,
  ClipboardCheck
} from 'lucide-react';
import { TOPIC_OPENINGS } from '../data/topicOpenings';

/**
 * Tahap 0: Pembuka Kontekstual (Aliran Baca Satu Kolom yang Lega)
 * Menghubungkan fenomena sehari-hari siswa -> obrolan tebak santai 2 arah -> transisi halus ke materi inti.
 * Bebas dari jargon perencanaan guru (CP formal / label Bloom).
 */

const FIVE_STEPS = [
  { num: '1', title: 'Amati Sekitar', icon: Compass, color: 'bg-sky-100 text-sky-700' },
  { num: '2', title: 'Pahami Konsep', icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
  { num: '3', title: 'Coba di Lab', icon: FlaskConical, color: 'bg-teal-100 text-teal-700' },
  { num: '4', title: 'Tantangan', icon: Gamepad2, color: 'bg-violet-100 text-violet-700' },
  { num: '5', title: 'Cek Paham', icon: ClipboardCheck, color: 'bg-emerald-100 text-emerald-700' }
];

export default function TopicOpeningIntro({ topic, studentName, onEnterCoreMateri }) {
  const opening = TOPIC_OPENINGS[topic.id] || TOPIC_OPENINGS.fluida;
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [showBridgeDirectly, setShowBridgeDirectly] = useState(false);

  const chosenOption = opening.iceBreaker.options.find((o) => o.id === selectedGuess);
  const bridgeVisible = Boolean(selectedGuess || showBridgeDirectly);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* 1. Pembuka Cerita Sehari-hari */}
      <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-white rounded-3xl border border-blue-200/80 p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-extrabold">
            <Compass className="w-3.5 h-3.5" />
            <span>Amati Lingkungan Sekitar</span>
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Santai, belum ada rumus di sini
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold text-blue-700">
            Halo {studentName || 'Sobat Fisika'}, {opening.greeting}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {opening.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {opening.introStory}
          </p>
        </div>

        {/* 3 Fenomena Dekat dengan Keseharian */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {opening.dailyScenes.map((scene, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                {scene.emoji}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">{scene.title}</h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{scene.story}</p>
            </div>
          ))}
        </div>

        {/* Ringkasan Singkat: Yang akan dicari tahu + Alur 5 Langkah (konsisten 1:1 dengan stepper) */}
        <div className="pt-2 border-t border-blue-200/60 space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Alur singkat bab {topic.shortTitle}:
          </div>
          <div className="flex flex-wrap gap-2">
            {FIVE_STEPS.map((st) => {
              const IconComp = st.icon;
              return (
                <div
                  key={st.num}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700"
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center ${st.color}`}>
                    <IconComp className="w-3 h-3" />
                  </span>
                  <span>
                    {st.num}. {st.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Obrolan Tebak Santai 2 Arah (Tanpa Nilai) */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </span>
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-amber-700 block">
                Tebak Santai (Bebas Jawab, Tanpa Nilai)
              </span>
              <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug">
                {opening.iceBreaker.question}
              </h3>
            </div>
          </div>

          {!bridgeVisible && (
            <button
              type="button"
              onClick={() => setShowBridgeDirectly(true)}
              className="min-h-[40px] px-2 text-xs font-bold text-slate-400 hover:text-blue-600 underline shrink-0"
            >
              Langsung ke materi →
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {opening.iceBreaker.options.map((opt) => {
            const isSelected = selectedGuess === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedGuess(opt.id)}
                className={`w-full min-h-[52px] p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-950 shadow-sm'
                    : 'bg-slate-50 hover:bg-blue-50/40 border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-sm font-semibold leading-relaxed">{opt.label}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {chosenOption && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              aria-live="polite"
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3"
            >
              <MessageCircleHeart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-emerald-950 leading-relaxed">
                {chosenOption.response}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. Jembatan Transisi Halus Masuk ke Materi */}
      <AnimatePresence>
        {bridgeVisible && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5" /> Siap Masuk ke {topic.number}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {opening.bridgeTitle}
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                {opening.bridgeText}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-blue-200">Di bab ini kamu akan menemukan:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {opening.previewPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 border border-white/15 rounded-xl p-3 flex items-start gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-blue-50 leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-blue-200">
                Kita mulai dari bahasa santai dulu sebelum melihat rumusnya ya.
              </span>
              <button
                type="button"
                onClick={onEnterCoreMateri}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>Masuk ke Penjelasan Konsep</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
