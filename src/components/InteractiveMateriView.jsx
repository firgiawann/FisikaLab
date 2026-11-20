import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  FlipHorizontal,
  Lightbulb
} from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { TOPIC_OPENINGS } from '../data/topicOpenings';
import ConceptDiagram from './ConceptDiagram';

function Tex({ latex, fallback }) {
  if (!latex) return <span>{fallback}</span>;
  const html = katex.renderToString(latex, { throwOnError: false, displayMode: false });
  return <span aria-label={fallback} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Tampilan Materi Konsep (Aliran Baca Satu Kolom yang Lega)
 * Disusun bertahap agar nyaman bagi siswa pemula maupun yang cepat paham:
 * 1. Analogi sehari-hari (tanpa rumus dulu)
 * 2. Diagram visual interaktif berlabel langsung (opsional disentuh)
 * 3. Mini-slider "Coba Rasakan Sendiri" & Kartu Mitos vs Fakta
 * 4. Rumus singkat baru muncul saat siswa siap (KaTeX)
 * 5. Cek Pemahaman kilat tanpa hukuman
 */

export default function InteractiveMateriView({
  topic,
  activeUnitIdx,
  onChangeUnitIdx,
  onBackToOpening,
  onCompleteMateri
}) {
  const opening = TOPIC_OPENINGS[topic.id] || TOPIC_OPENINGS.fluida;
  const currentUnit = topic.units[activeUnitIdx] || topic.units[0];

  const analogy = currentUnit.simpleAnalogy || (activeUnitIdx === 0 ? opening.simpleAnalogy : null);
  const miniSlider = currentUnit.miniSlider || (activeUnitIdx === 0 ? opening.miniSlider : null);
  const mythVsFact = currentUnit.mythVsFact || (activeUnitIdx === 0 ? opening.mythVsFact : null);
  const check = currentUnit.check || null;

  const [miniVal, setMiniVal] = useState(
    Math.round(((miniSlider?.min || 0) + (miniSlider?.max || 10)) / 2)
  );
  const [flippedCards, setFlippedCards] = useState({});
  const [showFormula, setShowFormula] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [checkPick, setCheckPick] = useState(null);
  const checkPassed = !check || checkPick === check.correct;

  useEffect(() => {
    setShowFormula(false);
    setShowExample(false);
    setFlippedCards({});
    setCheckPick(null);
    if (miniSlider) {
      setMiniVal(Math.round((miniSlider.min + miniSlider.max) / 2));
    }
  }, [topic.id, activeUnitIdx]);

  const toggleFlip = (idx) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const sliderPct = miniSlider
    ? Math.round(((miniVal - miniSlider.min) / Math.max(1, miniSlider.max - miniSlider.min)) * 100)
    : 50;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Switcher Sub-Unit */}
      {topic.units.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {topic.units.map((u, idx) => (
            <button
              key={u.id}
              type="button"
              onClick={() => onChangeUnitIdx(idx)}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold border transition ${
                activeUnitIdx === idx
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {u.title}
            </button>
          ))}
        </div>
      )}

      {/* Aliran Baca Utama */}
      <motion.article
        key={`${topic.id}-${activeUnitIdx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-6"
      >
        {/* Header Unit */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-blue-600" />
            <h2 className="text-lg sm:text-2xl font-black text-slate-900">
              {currentUnit.title}
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Bagian {activeUnitIdx + 1} dari {topic.units.length}
          </span>
        </div>

        {/* 1. Analogi Bahasa Santai */}
        {analogy && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>{analogy.title}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              {analogy.text}
            </p>
          </div>
        )}

        {/* 2. Pertanyaan Kunci & Penjelasan Inti */}
        <div className="space-y-3.5">
          <div className="bg-emerald-50/80 border-l-4 border-emerald-500 rounded-r-xl p-4">
            <p className="text-sm sm:text-base font-bold text-emerald-950 leading-relaxed">
              “{currentUnit.dailyQuestion}”
            </p>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {currentUnit.explanation}
          </p>
        </div>

        {/* 3. Diagram Konsep Interaktif Berlabel Langsung */}
        <ConceptDiagram unitId={currentUnit.id} />

        {/* 4. Mini-Slider "Coba Rasakan Sendiri" */}
        {miniSlider && (
          <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-5 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-sky-900">
                <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                <span>Coba Geser &amp; Rasakan Sendiri</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white border border-sky-200 text-sky-700 font-black text-xs">
                {miniVal} {miniSlider.unit}
              </span>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                {miniSlider.label}
              </label>
              <input
                type="range"
                min={miniSlider.min}
                max={miniSlider.max}
                aria-label={miniSlider.label}
                value={miniVal}
                onChange={(e) => setMiniVal(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="h-2.5 bg-white rounded-full border border-sky-200 overflow-hidden p-0.5">
                <motion.div
                  animate={{ width: `${Math.max(6, sliderPct)}%` }}
                  className={`h-full rounded-full ${
                    sliderPct > 70
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500'
                      : sliderPct > 35
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600'
                      : 'bg-emerald-500'
                  }`}
                />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 bg-white px-3.5 py-2.5 rounded-xl border border-sky-100">
                {miniSlider.effectText(miniVal)}
              </p>
            </div>
          </div>
        )}

        {/* 5. Kartu Balik Mitos vs Fakta */}
        {mythVsFact && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-violet-700 flex items-center gap-1.5">
                <FlipHorizontal className="w-4 h-4" />
                <span>Mitos atau Fakta? Ketuk kartunya</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mythVsFact.map((card, idx) => {
                const isFlipped = Boolean(flippedCards[idx]);
                return (
                  <motion.button
                    key={idx}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleFlip(idx)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all min-h-[120px] flex flex-col justify-between ${
                      isFlipped
                        ? 'bg-violet-50 border-violet-400 shadow-sm'
                        : 'bg-slate-50 hover:bg-violet-50/40 border-slate-200 hover:border-violet-300'
                    }`}
                  >
                    {!isFlipped ? (
                      <>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                          {card.myth}
                        </p>
                        <span className="text-xs font-extrabold text-violet-600 mt-3">
                          Ketuk untuk lihat jawabannya →
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-black text-violet-900">
                          {card.verdict}
                        </span>
                        <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed my-1.5">
                          {card.fact}
                        </p>
                        <span className="text-[11px] font-semibold text-slate-400">
                          Ketuk lagi untuk menutup
                        </span>
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. Progressive Formula Reveal (Siswa yang mengatur kapan membuka rumus) */}
        {currentUnit.formula && (
          <div className="pt-1">
            {!showFormula ? (
              <div className="bg-slate-50 border-2 border-dashed border-blue-300 rounded-2xl p-5 text-center space-y-3">
                <p className="text-sm font-bold text-slate-700">
                  Sudah mulai kebayang ceritanya? Kalau siap, yuk lihat cara singkat menuliskannya dalam rumus.
                </p>
                <button
                  type="button"
                  onClick={() => setShowFormula(true)}
                  className="min-h-[48px] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow inline-flex items-center gap-2 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>Tampilkan Rumus Singkatnya</span>
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-50 border border-blue-200 rounded-2xl p-5 space-y-4"
              >
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-blue-700">
                    Cara baca cepat ({currentUnit.formula.unit}):
                  </span>
                  <div className="text-sm font-semibold text-slate-700">
                    {currentUnit.formula.readAs}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-700 py-2 overflow-x-auto">
                    <Tex latex={currentUnit.formula.latex} fallback={currentUnit.formula.code} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentUnit.formula.variables.map((v) => (
                    <div
                      key={v.symbol}
                      className="bg-white border border-slate-200 rounded-xl p-3.5"
                    >
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-900 text-white font-extrabold text-xs mb-1.5">
                        {v.symbol}
                      </span>
                      <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {v.name}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Contoh Hitungan Ringan Opsional (Expand 1-Klik) */}
                {currentUnit.workedExample && (
                  <div className="pt-2 border-t border-blue-200/70">
                    <button
                      type="button"
                      onClick={() => setShowExample((v) => !v)}
                      className="min-h-[44px] w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-blue-50 border border-blue-300 text-blue-800 font-extrabold text-xs sm:text-sm transition"
                    >
                      {showExample ? 'Sembunyikan Contoh Hitungan' : '📝 Lihat Contoh Hitungan Singkat (Opsional)'}
                    </button>

                    {showExample && (
                      <div className="mt-3 bg-white border border-blue-200 rounded-2xl p-4 space-y-2.5 text-xs sm:text-sm">
                        <p className="font-bold text-slate-900 leading-relaxed">
                          {currentUnit.workedExample.question}
                        </p>
                        <div className="text-slate-600 bg-slate-50 rounded-xl px-3 py-2">
                          <span className="font-extrabold text-slate-700">Diketahui: </span>
                          {currentUnit.workedExample.known}
                        </div>
                        <ol className="list-decimal list-inside space-y-1 text-slate-700">
                          {currentUnit.workedExample.steps.map((st, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {st}
                            </li>
                          ))}
                        </ol>
                        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 font-extrabold text-emerald-900">
                          Hasil: {currentUnit.workedExample.answer}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Tips Ingat Singkat */}
        {currentUnit.mayerTips && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentUnit.mayerTips.map((tip, i) => (
              <div
                key={i}
                className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex gap-3"
              >
                <span className="text-xl shrink-0">{tip.icon}</span>
                <div>
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    {tip.title}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. Cek Pemahaman Kilat (Tanpa Hukuman) */}
        {check && (
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50/60 p-5 space-y-3">
            <span className="inline-block text-xs font-extrabold text-violet-800">
              Cek Pemahaman Sebentar (Santai, boleh coba ulang)
            </span>
            <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
              {check.question}
            </p>
            <div className="space-y-2">
              {check.options.map((o) => {
                const picked = checkPick === o.key;
                const right = picked && o.key === check.correct;
                return (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setCheckPick(o.key)}
                    className={`w-full min-h-[48px] text-left px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition ${
                      picked
                        ? right
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-amber-50 border-amber-400 text-amber-950'
                        : 'bg-white border-slate-200 hover:bg-violet-50 text-slate-800'
                    }`}
                  >
                    <span className="font-black mr-2">{o.key}.</span>
                    {o.text}
                  </button>
                );
              })}
            </div>
            {checkPick && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm font-bold rounded-xl px-3.5 py-2.5 ${
                  checkPick === check.correct
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {checkPick === check.correct ? '✓ ' + check.right : check.wrong + ' Coba pilih lagi ya!'}
              </p>
            )}
          </div>
        )}

        {/* Navigasi Bawah */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToOpening}
            className="min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            &larr; Kembali ke Pembuka
          </button>

          {activeUnitIdx + 1 < topic.units.length ? (
            <button
              type="button"
              onClick={() => checkPassed && onChangeUnitIdx(activeUnitIdx + 1)}
              disabled={!checkPassed}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow flex items-center gap-2 transition"
            >
              <span>Lanjut ke Bagian Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => checkPassed && onCompleteMateri()}
              disabled={!checkPassed}
              className="flex-1 sm:flex-initial min-h-[48px] py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Lanjut ke Simulasi Lab →</span>
            </button>
          )}
        </div>
      </motion.article>
    </div>
  );
}
