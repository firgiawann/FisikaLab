import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, RotateCcw, Flame, Sparkles } from 'lucide-react';

/**
 * Mesin Simulasi 60 FPS untuk 5 Bab Fisika Kelas XI Lainnya:
 * - rotasi: Jungkat-Jungkit Torsi & Momen Gaya
 * - elastisitas: Osilasi Pegas Hukum Hooke
 * - gelombang: Gelombang Berjalan Transversal
 * - kalor: Partikel Teori Kinetik Gas Ideal
 * - termodinamika: Silinder Piston & Usaha Gas P-V
 */

export default function OtherTopicsCanvasSim({ topicId, onComplete, isCompleted }) {
  // 1. State Dinamika Rotasi
  const [m1, setM1] = useState(20);
  const [r1, setR1] = useState(1.5);
  const [m2, setM2] = useState(30);
  const [r2, setR2] = useState(1.0);

  // 2. State Elastisitas Hooke (Tunggal / Paralel / Seri)
  const [springK, setSpringK] = useState(150);
  const [springMass, setSpringMass] = useState(3.0);
  const [springMode, setSpringMode] = useState('tunggal'); // 'tunggal' | 'paralel' | 'seri'

  // 3. State Gelombang
  const [waveAmp, setWaveAmp] = useState(45);
  const [waveFreq, setWaveFreq] = useState(2.0);

  // 4. State Kalor & Gas Ideal
  const [gasTemp, setGasTemp] = useState(350);
  const [gasVolume, setGasVolume] = useState(100);

  // 5. State Termodinamika
  const [thermoHeat, setThermoHeat] = useState(800);
  const [thermoPressure, setThermoPressure] = useState(2000);

  const canvasRef = useRef(null);
  const animStateRef = useRef({
    angle: 0,
    omega: 0,
    springY: 140,
    springVy: 0,
    phase: 0,
    particles: Array.from({ length: 32 }, () => ({
      x: 100 + Math.random() * 240,
      y: 90 + Math.random() * 170,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4
    })),
    pistonY: 160
  });

  // Laporkan ke server hanya SEKALI (setelah 3 interaksi atau tombol selesai), bukan tiap geseran slider
  const reportedRef = useRef(false);
  const touchRef = useRef(0);
  useEffect(() => {
    reportedRef.current = false;
    touchRef.current = 0;
  }, [topicId]);
  const markInteracted = (desc, force = false) => {
    touchRef.current += 1;
    if (reportedRef.current) return;
    if (force || touchRef.current >= 3) {
      reportedRef.current = true;
      if (onComplete) onComplete(desc);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // High-DPI agar tajam di layar HP
    const W = 600;
    const H = 330;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let lastTs = 0;
    const renderLoop = (ts) => {
      animId = requestAnimationFrame(renderLoop);
      if (document.hidden) return;
      if (document.body.classList.contains('data-saver') && ts - lastTs < 33) return; // Hemat Daya ~30 FPS
      lastTs = ts;
      const st = animStateRef.current;
      ctx.clearRect(0, 0, W, H);

      // Subtle grid background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, W, H);

      if (topicId === 'rotasi') {
        // === SIMULASI JUNGKAT-JUNGKIT TORSI ===
        const tauLeft = m1 * 10 * r1;
        const tauRight = m2 * 10 * r2;
        const netTau = tauRight - tauLeft;
        const targetAngle = Math.max(-0.42, Math.min(0.42, netTau / 450));

        // Smooth angular spring-damper
        const alpha = (targetAngle - st.angle) * 0.08;
        st.omega = (st.omega + alpha) * 0.88;
        st.angle += st.omega;

        const cx = 300;
        const cy = 215;

        // Ground & Fulcrum Triangle
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(40, 290, 520, 8);
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - 32, 290);
        ctx.lineTo(cx + 32, 290);
        ctx.closePath();
        ctx.fill();

        // Rotating Beam
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(st.angle);

        ctx.fillStyle = '#4f46e5';
        ctx.beginPath();
        ctx.roundRect(-230, -8, 460, 16, 6);
        ctx.fill();

        // Distance markers on beam
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2].forEach(m => {
          const px = m * 100;
          ctx.fillRect(px - 1, -8, 2, 6);
        });

        // Left Weight (m1 at -r1*100)
        const x1 = -r1 * 100;
        const s1 = 26 + m1 * 0.45;
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(x1 - s1 / 2, -8 - s1, s1, s1, 6);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(`${m1}kg`, x1, -8 - s1 / 2 + 4);

        // Right Weight (m2 at +r2*100)
        const x2 = r2 * 100;
        const s2 = 26 + m2 * 0.45;
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.roundRect(x2 - s2 / 2, -8 - s2, s2, s2, 6);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${m2}kg`, x2, -8 - s2 / 2 + 4);

        ctx.restore();

        // Status Banner
        const isBalanced = Math.abs(netTau) < 5;
        ctx.fillStyle = isBalanced ? '#16a34a' : '#1e293b';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText(
          isBalanced
            ? '✓ SEIMBANG SEMPURNA! (Στ = 0 N·m)'
            : `Torsi Kiri = ${tauLeft.toFixed(0)} N·m  |  Torsi Kanan = ${tauRight.toFixed(0)} N·m`,
          24,
          34
        );
      } else if (topicId === 'elastisitas') {
        // === SIMULASI OSILASI PEGAS HUKUM HOOKE (TUNGGAL / PARALEL / SERI) ===
        const kEff = springMode === 'paralel' ? springK * 2 : springMode === 'seri' ? springK * 0.5 : springK;
        const forceG = springMass * 10;
        const deltaX = forceG / kEff; // meters
        const targetY = 105 + Math.min(165, deltaX * 220);

        const accel = ((targetY - st.springY) * (kEff / 800)) / Math.max(1, springMass * 0.4);
        st.springVy = (st.springVy + accel) * 0.91;
        st.springY += st.springVy;

        // Top Ceiling Bracket
        ctx.fillStyle = '#334155';
        ctx.fillRect(190, 20, 220, 12);

        const startY = 32;
        const endY = Math.min(272, Math.max(70, st.springY));
        const drawSpringCoil = (cx, y0, y1, coilsCount) => {
          const step = (y1 - y0) / coilsCount;
          ctx.beginPath();
          ctx.moveTo(cx, y0);
          for (let i = 0; i < coilsCount; i++) {
            const yMid = y0 + (i + 0.5) * step;
            const yNext = y0 + (i + 1) * step;
            const xOffset = i % 2 === 0 ? 18 : -18;
            ctx.lineTo(cx + xOffset, yMid);
            ctx.lineTo(cx, yNext);
          }
          ctx.stroke();
        };

        ctx.strokeStyle = springMode === 'paralel' ? '#059669' : springMode === 'seri' ? '#2563eb' : '#0f766e';
        ctx.lineWidth = 3.5;
        ctx.lineJoin = 'round';
        if (springMode === 'paralel') {
          drawSpringCoil(268, startY, endY, 10);
          drawSpringCoil(332, startY, endY, 10);
          ctx.fillStyle = '#334155';
          ctx.fillRect(252, endY - 4, 96, 6);
        } else {
          drawSpringCoil(300, startY, endY, springMode === 'seri' ? 18 : 11);
        }

        // Hanging Mass Block
        const boxSize = 44 + springMass * 2.5;
        ctx.fillStyle = '#0f766e';
        ctx.beginPath();
        ctx.roundRect(300 - boxSize / 2, endY, boxSize, boxSize, 10);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${springMass.toFixed(1)} kg`, 300, endY + boxSize / 2 + 5);

        // Reference line for initial length
        ctx.strokeStyle = '#94a3b8';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(140, 105);
        ctx.lineTo(460, 105);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#64748b';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Posisi Awal (Δx = 0)', 48, 109);

        const modeLabel = springMode === 'paralel' ? 'Paralel (2k)' : springMode === 'seri' ? 'Seri (½k)' : 'Tunggal (k)';
        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 12.5px Inter, sans-serif';
        ctx.fillText(`${modeLabel}: k_total = ${kEff.toFixed(0)} N/m  |  Δx = ${(deltaX * 100).toFixed(1)} cm  |  F = ${forceG.toFixed(0)} N`, 24, 52);
      } else if (topicId === 'gelombang') {
        // === SIMULASI GELOMBANG BERJALAN (MEDIUM SAMA → v TETAP, f NAIK → λ MEMENDEK) ===
        const waveV = 3.6; // m/s konstan pada medium tali yang sama
        const lambdaMeters = waveV / waveFreq;
        const pxPerMeter = 110;
        const lambdaPx = lambdaMeters * pxPerMeter;
        const kWave = (2 * Math.PI) / lambdaPx;
        st.phase += 0.055 * waveFreq;

        const midY = 175;
        ctx.strokeStyle = '#cbd5e1';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(40, midY);
        ctx.lineTo(560, midY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw traveling wave curve
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = 50; x <= 550; x += 3) {
          const y = midY + Math.sin(kWave * (x - 50) - st.phase) * waveAmp;
          if (x === 50) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Highlight individual oscillating medium particles (hanya naik-turun di tempat)
        for (let x = 50; x <= 550; x += 45) {
          const y = midY + Math.sin(kWave * (x - 50) - st.phase) * waveAmp;
          ctx.fillStyle = '#ea580c';
          ctx.beginPath();
          ctx.arc(x, y, 6.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.fillStyle = '#5b21b6';
        ctx.font = 'bold 12.5px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(
          `Medium Sama → v = ${waveV.toFixed(1)} m/s (Tetap)  |  f = ${waveFreq.toFixed(1)} Hz  |  λ = ${lambdaMeters.toFixed(2)} m`,
          24,
          34
        );
        ctx.fillStyle = '#64748b';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.fillText('Perhatikan: naikkan f → gelombang makin rapat (λ memendek), titik oranye hanya naik-turun!', 24, 54);
      } else if (topicId === 'kalor') {
        // === SIMULASI PARTIKEL TEORI KINETIK GAS ===
        const speedMult = (gasTemp / 300) * 1.45;
        const leftWall = 120;
        const rightWall = 120 + (gasVolume / 100) * 320;
        const topWall = 60;
        const bottomWall = 275;

        // Chamber box
        ctx.fillStyle = '#fffbeb';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.fillRect(leftWall, topWall, rightWall - leftWall, bottomWall - topWall);
        ctx.strokeRect(leftWall, topWall, rightWall - leftWall, bottomWall - topWall);

        // Update & draw gas molecules
        const particleColor = gasTemp > 450 ? '#dc2626' : gasTemp > 320 ? '#ea580c' : '#0284c7';
        st.particles.forEach(p => {
          p.x += p.vx * speedMult;
          p.y += p.vy * speedMult;

          if (p.x < leftWall + 8) { p.x = leftWall + 8; p.vx = Math.abs(p.vx); }
          if (p.x > rightWall - 8) { p.x = rightWall - 8; p.vx = -Math.abs(p.vx); }
          if (p.y < topWall + 8) { p.y = topWall + 8; p.vy = Math.abs(p.vy); }
          if (p.y > bottomWall - 8) { p.y = bottomWall - 8; p.vy = -Math.abs(p.vy); }

          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        const calcP = Math.round((gasTemp * 100) / gasVolume);
        ctx.fillStyle = '#9a3412';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText(`Suhu T = ${gasTemp} K  |  Volume V = ${gasVolume}%  |  P ∝ T/V ≈ ${calcP} (satuan relatif)`, 24, 34);
      } else if (topicId === 'termodinamika') {
        // === SIMULASI PISTON & DIAGRAM USAHA TERMODINAMIKA ===
        const deltaV = (thermoHeat / 1000) * 0.5;
        const workW = Math.round(thermoPressure * deltaV);
        const deltaU = Math.round(thermoHeat - workW); // ΔU = Q − W
        const targetPistonX = 180 + deltaV * 240;

        st.pistonY += (targetPistonX - st.pistonY) * 0.1;

        // Horizontal Cylinder & Moving Piston
        ctx.fillStyle = '#ffe4e6';
        ctx.fillRect(100, 100, st.pistonY - 100, 130);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(420, 100);
        ctx.lineTo(100, 100);
        ctx.lineTo(100, 230);
        ctx.lineTo(420, 230);
        ctx.stroke();

        // Piston Head & Rod
        ctx.fillStyle = '#475569';
        ctx.fillRect(st.pistonY, 103, 18, 124);
        ctx.fillRect(st.pistonY + 18, 155, 110, 20);

        ctx.fillStyle = '#be123c';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText(
          `Q = ${thermoHeat} J  |  W = ${workW} J  |  ΔU = Q − W = ${deltaU} J`,
          24,
          38
        );

        // Diagram P–V mini (usaha W = luas persegi panjang)
        const ox = 70;
        const oy = 318;
        const dw = 200;
        const dh = 62;
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ox, oy - dh - 6);
        ctx.lineTo(ox, oy);
        ctx.lineTo(ox + dw, oy);
        ctx.stroke();
        const rw = Math.max(4, (deltaV / 0.5) * (dw - 20));
        const rh = (thermoPressure / 3000) * dh;
        ctx.fillStyle = 'rgba(190, 18, 60, 0.25)';
        ctx.fillRect(ox + 8, oy - rh, rw, rh);
        ctx.strokeStyle = '#be123c';
        ctx.strokeRect(ox + 8, oy - rh, rw, rh);
        ctx.fillStyle = '#475569';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('P', ox - 14, oy - dh);
        ctx.fillText('V', ox + dw + 4, oy + 4);
        ctx.fillText('Diagram P–V: luas = usaha W', ox + 8, oy - dh - 8);
      }
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [topicId, m1, r1, m2, r2, springK, springMass, springMode, waveAmp, waveFreq, gasTemp, gasVolume, thermoHeat, thermoPressure]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* KIRI: Kanvas Animasi 60FPS */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-extrabold text-slate-900">
            Laboratorium Interaktif Real-Time (60 FPS)
          </h3>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Lab Selesai
            </span>
          )}
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <canvas ref={canvasRef} width={600} height={330} className="w-full h-auto block" role="img" aria-label={`Simulasi interaktif bab ${topicId}`} />
        </div>
      </div>

      {/* KANAN: Kontrol Variabel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h4 className="font-extrabold text-slate-900 text-base">Manipulasi Variabel Bebas</h4>

        {topicId === 'rotasi' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Massa Kiri (m₁)</span>
                <span className="text-sky-600">{m1} kg</span>
              </div>
              <input type="range" min="10" max="50" step="5" value={m1} onChange={e => { setM1(Number(e.target.value)); markInteracted('Menguji keseimbangan torsi rotasi'); }} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Jarak Lengan Kiri (r₁)</span>
                <span className="text-sky-600">{r1} m</span>
              </div>
              <input type="range" min="0.5" max="2.0" step="0.25" value={r1} onChange={e => { setR1(Number(e.target.value)); markInteracted('Menguji lengan momen r1'); }} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Massa Kanan (m₂)</span>
                <span className="text-orange-600">{m2} kg</span>
              </div>
              <input type="range" min="10" max="50" step="5" value={m2} onChange={e => { setM2(Number(e.target.value)); markInteracted('Menguji massa beban m2'); }} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Jarak Lengan Kanan (r₂)</span>
                <span className="text-orange-600">{r2} m</span>
              </div>
              <input type="range" min="0.5" max="2.0" step="0.25" value={r2} onChange={e => { setR2(Number(e.target.value)); markInteracted('Menguji lengan momen r2'); }} className="w-full" />
            </div>
          </div>
        )}

        {topicId === 'elastisitas' && (
          <div className="space-y-3">
            <div>
              <span className="block text-xs font-bold text-slate-700 mb-1.5">Susunan Pegas (Bandingkan Kekakuannya!)</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'tunggal', label: 'Tunggal (k)' },
                  { id: 'paralel', label: 'Paralel (2k)' },
                  { id: 'seri', label: 'Seri (½k)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSpringMode(m.id);
                      markInteracted(`Menguji susunan pegas ${m.id}`);
                    }}
                    className={`min-h-[44px] px-2 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                      springMode === m.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Konstanta 1 Pegas (k)</span>
                <span className="text-emerald-700">{springK} N/m</span>
              </div>
              <input type="range" min="80" max="300" step="10" value={springK} onChange={e => { setSpringK(Number(e.target.value)); markInteracted('Menguji konstanta pegas Hooke'); }} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Massa Beban Gantung (m)</span>
                <span className="text-emerald-700">{springMass} kg</span>
              </div>
              <input type="range" min="1" max="8" step="0.5" value={springMass} onChange={e => { setSpringMass(Number(e.target.value)); markInteracted('Menguji osilasi beban pegas'); }} className="w-full" />
            </div>
          </div>
        )}

        {topicId === 'gelombang' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Amplitudo Gelombang (A)</span>
                <span className="text-violet-700">{waveAmp} cm</span>
              </div>
              <input type="range" min="15" max="80" step="5" value={waveAmp} onChange={e => { setWaveAmp(Number(e.target.value)); markInteracted('Mengubah amplitudo gelombang'); }} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Frekuensi Getaran (f)</span>
                <span className="text-violet-700">{waveFreq.toFixed(1)} Hz</span>
              </div>
              <input type="range" min="0.5" max="4.0" step="0.5" value={waveFreq} onChange={e => { setWaveFreq(Number(e.target.value)); markInteracted('Mengubah frekuensi gelombang'); }} className="w-full" />
            </div>
          </div>
        )}

        {topicId === 'kalor' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Suhu Pemanas Gas (T)</span>
                <span className="text-amber-700">{gasTemp} Kelvin</span>
              </div>
              <input type="range" min="200" max="600" step="20" value={gasTemp} onChange={e => { setGasTemp(Number(e.target.value)); markInteracted('Memanaskan partikel gas ideal'); }} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Volume Ruang Silinder (V)</span>
                <span className="text-amber-700">{gasVolume}%</span>
              </div>
              <input type="range" min="50" max="100" step="5" value={gasVolume} onChange={e => { setGasVolume(Number(e.target.value)); markInteracted('Mengompresi volume gas ideal'); }} className="w-full" />
            </div>
          </div>
        )}

        {topicId === 'termodinamika' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Kalor Masuk ke Silinder (Q)</span>
                <span className="text-rose-700">{thermoHeat} Joule</span>
              </div>
              <input type="range" min="200" max="1500" step="100" value={thermoHeat} onChange={e => { setThermoHeat(Number(e.target.value)); markInteracted('Mengatur kalor ekspansi piston'); }} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Tekanan Gas Isobarik (P)</span>
                <span className="text-rose-700">{thermoPressure} Pa</span>
              </div>
              <input type="range" min="1000" max="3000" step="200" value={thermoPressure} onChange={e => { setThermoPressure(Number(e.target.value)); markInteracted('Mengatur tekanan piston'); }} className="w-full" />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => markInteracted(`Menyelesaikan pengamatan simulasi ${topicId}`, true)}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Catat Bukti Eksperimen &amp; Buka Tantangan Game
        </button>
      </div>
    </div>
  );
}
