import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Droplets, ArrowUp, ArrowDown, Sparkles, Gauge, Volume2, VolumeX } from 'lucide-react';

/**
 * Simulasi Fisika Fluida 60 FPS dengan Animasi Realistis:
 * - Kayu: Jatuh dari atas -> mencemplung masuk agak dalam (hampir melayang) -> terdorong balik ke atas oleh Gaya Apung (daya dorong) -> terapung berayun dengan riak air.
 * - Telur: Jatuh dari atas -> mencemplung + riak air -> tertahan dan melayang halus di tengah kedalaman cairan.
 * - Batu: Jatuh dari atas -> cemplung kuat + cipratan air + gelembung udara -> tenggelam sampai ke dasar bejana.
 */

const OBJECT_PRESETS = {
  kayu: {
    id: 'kayu',
    name: 'Balok Kayu',
    emoji: '🪵',
    density: 450,
    fluidDensity: 1000,
    fluidName: 'Air Tawar (1.000 kg/m³)',
    fluidColor: 'rgba(56, 189, 248, 0.42)',
    fluidStroke: '#0284c7',
    stateLabel: 'Terapung (ρ_benda < ρ_air)',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'Kayu jatuh dari atas, sempat masuk cukup dalam karena momentum jatuh, lalu Daya Dorong Gaya Apung (Fa > W) yang kuat melontarkannya kembali ke permukaan hingga terapung stabil!'
  },
  telur: {
    id: 'telur',
    name: 'Telur (Air Garam)',
    emoji: '🥚',
    density: 1030,
    fluidDensity: 1030,
    fluidName: 'Air Garam (1.030 kg/m³)',
    fluidColor: 'rgba(45, 212, 191, 0.42)',
    fluidStroke: '#0d9488',
    stateLabel: 'Melayang (ρ_benda = ρ_cairan)',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'Telur jatuh dari atas, menembus permukaan air dan diredam oleh fluida, lalu melayang seimbang di tengah-tengah kedalaman karena Gaya Dorong Air sama persis dengan Berat Telur (Fa = W)!'
  },
  batu: {
    id: 'batu',
    name: 'Batu Granit',
    emoji: '🪨',
    density: 2400,
    fluidDensity: 1000,
    fluidName: 'Air Tawar (1.000 kg/m³)',
    fluidColor: 'rgba(56, 189, 248, 0.42)',
    fluidStroke: '#0284c7',
    stateLabel: 'Tenggelam (ρ_benda > ρ_air)',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'Batu meluncur dari atas, mencemplung dengan cipratan air dan gelembung udara, lalu langsung tenggelam ke dasar wadah karena Gaya Berat batu jauh melebihi Gaya Dorong air (W > Fa)!'
  }
};

export default function FluidCanvasSim({ onComplete, isCompleted }) {
  const [subMode, setSubMode] = useState('archimedes'); // 'archimedes' | 'hydro'
  const [selectedKey, setSelectedKey] = useState('kayu');
  const [customObjDensity, setCustomObjDensity] = useState(450);
  const [customFluidDensity, setCustomFluidDensity] = useState(1000);
  const [testedObjects, setTestedObjects] = useState({ kayu: false, telur: false, batu: false });
  const [predictFor, setPredictFor] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [phaseStatus, setPhaseStatus] = useState('Mencemplung & Daya Dorong Apung...');
  const phaseRef = useRef('');
  // Hanya memicu re-render React jika teks fase benar-benar berubah (hemat baterai HP)
  const updatePhase = (text) => {
    if (phaseRef.current !== text) {
      phaseRef.current = text;
      setPhaseStatus(text);
    }
  };

  // Kontrol laju pengamatan siswa (Jeda & Gerak Lambat 0.5x) + Audio singkat opsional
  const [isPaused, setIsPaused] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const pausedRef = useRef(false);
  const slowRef = useRef(false);
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { slowRef.current = slowMotion; }, [slowMotion]);
  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  // Hydrostatic Tank state
  const [probeDepth, setProbeDepth] = useState(1.2);
  const [tankFluidRho, setTankFluidRho] = useState(1000);
  const [vesselShape, setVesselShape] = useState('lebar'); // 'lebar' | 'sempit' | 'kerucut'

  const canvasRef = useRef(null);
  const simRef = useRef(null);

  // Trigger drop animation in Canvas
  const triggerDrop = (presetKey, objRhoOverride, fluidRhoOverride) => {
    const preset = OBJECT_PRESETS[presetKey] || OBJECT_PRESETS.kayu;
    const objRho = objRhoOverride ?? preset.density;
    const flRho = fluidRhoOverride ?? preset.fluidDensity;

    // Create 80 wave nodes across tank width (x from 60 to 540)
    const numNodes = 75;
    const waveNodes = Array.from({ length: numNodes }, () => ({ y: 0, vy: 0 }));

    simRef.current = {
      key: presetKey,
      emoji: preset.emoji,
      name: preset.name,
      objDensity: objRho,
      fluidDensity: flRho,
      // Physics coordinates (Tank top=20, Water surface=130, Tank bottom=325)
      x: 300,
      y: 26, // Start high above water!
      vy: 1.5,
      size: 62,
      hasHitWater: false,
      plungeBoostActive: false,
      timeInWater: 0,
      waveNodes,
      splashes: [],
      bubbles: [],
      thrustRings: [],
      currentFa: 0,
      currentW: Math.round((objRho / 1000) * 100)
    };
  };

  const dropAndMark = (key) => {
    const preset = OBJECT_PRESETS[key];
    setSelectedKey(key);
    setCustomObjDensity(preset.density);
    setCustomFluidDensity(preset.fluidDensity);
    const nextTested = { ...testedObjects, [key]: true };
    setTestedObjects(nextTested);
    triggerDrop(key, preset.density, preset.fluidDensity);
    const count = Object.values(nextTested).filter(Boolean).length;
    if (count >= 3 && onComplete) {
      onComplete('Menguji kayu, telur, dan batu dengan prediksi (Predict-Observe-Explain) pada Lab Fluida');
    }
  };

  // Predict-Observe-Explain: benda yang belum diuji meminta tebakan dulu
  const handleSelectObject = (key) => {
    setPredictionResult(null);
    if (testedObjects[key]) {
      dropAndMark(key);
      setPredictFor(null);
    } else {
      setPredictFor(key);
      setSelectedKey(key);
    }
  };

  const handlePredict = (choice) => {
    const key = predictFor;
    if (!key) return;
    const preset = OBJECT_PRESETS[key];
    const ratio = preset.density / preset.fluidDensity;
    const actual = ratio < 0.92 ? 'terapung' : Math.abs(ratio - 1) <= 0.08 ? 'melayang' : 'tenggelam';
    const reason =
      actual === 'terapung'
        ? 'massa jenis benda lebih kecil dari cairan, jadi gaya apung lebih besar dari berat.'
        : actual === 'melayang'
        ? 'massa jenis benda sama dengan cairan, jadi gaya apung sama dengan berat.'
        : 'massa jenis benda lebih besar dari cairan, jadi berat lebih besar dari gaya apung.';
    setPredictionResult(
      choice === actual
        ? `🎯 Tebakanmu tepat! ${preset.name} ${actual}, karena ${reason}`
        : `Menarik! Hasilnya ${actual}, bukan ${choice}. Alasannya: ${reason} Tidak apa-apa, justru begini kita belajar!`
    );
    setPredictFor(null);
    dropAndMark(key);
  };

  useEffect(() => {
    triggerDrop('kayu', 450, 1000);
  }, []);

  // Main 60FPS Animation Loop
  useEffect(() => {
    if (subMode !== 'archimedes') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // High-DPI: tajam di layar HP Retina/OLED
    const LOGICAL_W = 600;
    const LOGICAL_H = 360;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = LOGICAL_W * dpr;
    canvas.height = LOGICAL_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const TANK_LEFT = 55;
    const TANK_RIGHT = 545;
    const TANK_TOP = 30;
    const TANK_BOTTOM = 330;
    const WATER_Y = 135;
    const TANK_WIDTH = TANK_RIGHT - TANK_LEFT;

    const createSplash = (cx, intensity) => {
      const s = simRef.current;
      if (!s) return;
      // Disturb wave nodes near center
      const centerIdx = Math.floor(((cx - TANK_LEFT) / TANK_WIDTH) * s.waveNodes.length);
      for (let i = -5; i <= 5; i++) {
        const idx = centerIdx + i;
        if (idx >= 0 && idx < s.waveNodes.length) {
          const falloff = Math.cos((i / 6) * (Math.PI / 2));
          s.waveNodes[idx].vy += intensity * falloff;
        }
      }
      // Droplets
      const dropCount = Math.min(24, Math.floor(Math.abs(intensity) * 1.4));
      for (let i = 0; i < dropCount; i++) {
        const angle = -Math.PI * (0.15 + Math.random() * 0.7);
        const speed = 2.5 + Math.random() * (Math.abs(intensity) * 0.45);
        s.splashes.push({
          x: cx + (Math.random() - 0.5) * 44,
          y: WATER_Y - 2,
          vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? 1 : -1),
          vy: Math.sin(angle) * speed - 1.5,
          r: 2 + Math.random() * 3.2,
          alpha: 0.95
        });
      }
    };

    const spawnBubble = (bx, by) => {
      const s = simRef.current;
      if (!s) return;
      if (document.body.classList.contains('data-saver') && s.bubbles.length > 6) return;
      s.bubbles.push({
        x: bx + (Math.random() - 0.5) * 38,
        y: by + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(1.2 + Math.random() * 1.6),
        r: 2.5 + Math.random() * 3.5,
        alpha: 0.85
      });
    };

    const stepPhysics = () => {
      const s = simRef.current;
      if (!s) return;

      const objHalf = s.size / 2;
      const objBottom = s.y + objHalf;
      const objTop = s.y - objHalf;

      // 1. Update 1D Water Surface Waves (Spring + Neighbor Coupling)
      const nodes = s.waveNodes;
      const kSpring = 0.045;
      const damping = 0.955;
      const spread = 0.18;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.vy += -kSpring * n.y;
        n.vy *= damping;
        n.y += n.vy;
      }
      // Propagate left & right
      const leftDeltas = new Array(nodes.length).fill(0);
      const rightDeltas = new Array(nodes.length).fill(0);
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < nodes.length; i++) {
          if (i > 0) {
            leftDeltas[i] = spread * (nodes[i].y - nodes[i - 1].y);
            nodes[i - 1].vy += leftDeltas[i];
          }
          if (i < nodes.length - 1) {
            rightDeltas[i] = spread * (nodes[i].y - nodes[i + 1].y);
            nodes[i + 1].vy += rightDeltas[i];
          }
        }
        for (let i = 0; i < nodes.length; i++) {
          if (i > 0) nodes[i - 1].y += leftDeltas[i];
          if (i < nodes.length - 1) nodes[i + 1].y += rightDeltas[i];
        }
      }

      // 2. Object Rigid-Body Buoyancy & Hydrodynamic Motion
      const ratio = s.objDensity / s.fluidDensity; // <1 float, ==1 neutral, >1 sink

      // Detect initial water entry (Splash!)
      if (!s.hasHitWater && objBottom >= WATER_Y) {
        s.hasHitWater = true;
        const splashPower = ratio > 1.2 ? 16 : ratio < 0.8 ? 12 : 10;
        createSplash(s.x, splashPower);

        // Give Kayu enough downward entry momentum so it visibly dips deep into the water first ("hampir melayang") before buoyancy pushes it back up!
        if (ratio < 0.92) {
          s.vy = Math.max(s.vy, 7.2);
          s.plungeBoostActive = true;
        } else if (Math.abs(ratio - 1) <= 0.08) {
          s.vy = Math.max(s.vy, 5.4);
        } else {
          s.vy = Math.max(s.vy, 6.8);
        }
      }

      if (objBottom < WATER_Y) {
        // In Air: Free fall under gravity
        s.vy += 0.42;
        s.currentFa = 0;
        updatePhase('Jatuh Bebas dari Atas...');
      } else {
        // Inside Fluid!
        s.timeInWater += 1;

        // Calculate submerged fraction (0 to 1)
        const submergedHeight = Math.max(0, Math.min(s.size, objBottom - WATER_Y));
        const subFraction = submergedHeight / s.size;

        if (ratio < 0.92) {
          // === KAYU (TERAPUNG): Plunges deep first, then strong upward buoyancy thrust pushes it back to surface! ===
          // Equilibrium center y: submerged fraction = ratio -> objBottom = WATER_Y + ratio * size
          const eqY = WATER_Y + ratio * s.size - objHalf;
          const displacement = s.y - eqY; // positive when deeper than equilibrium

          // Spring-like buoyancy restoring force
          const buoyancyAccel = -0.055 * displacement;
          s.vy += buoyancyAccel;
          // Water viscosity damping
          s.vy *= 0.915;

          // Spawn upward thrust rings when pushed up from deep plunge
          if (s.y > WATER_Y + 25 && s.vy < -0.5 && s.timeInWater % 6 === 0) {
            s.thrustRings.push({ x: s.x, y: s.y + objHalf, width: 32, alpha: 0.85 });
          }

          // Continuous gentle surface ripple coupling while bobbing
          if (Math.abs(s.vy) > 0.35 && s.timeInWater % 4 === 0) {
            const cIdx = Math.floor(((s.x - TANK_LEFT) / TANK_WIDTH) * nodes.length);
            if (nodes[cIdx]) nodes[cIdx].vy += s.vy * 0.28;
          }

          s.currentFa = Math.round((s.fluidDensity / 10) * subFraction); // Fa = ρ_cair·g·V_celup (g=10, V=0,01 m³)
          if (s.y > eqY + 22) {
            updatePhase('Terdorong Daya Apung Air ke Atas! (Fa > W)');
          } else {
            updatePhase('Terapung Stabil di Permukaan (Fa = W)');
          }
        } else if (Math.abs(ratio - 1) <= 0.08) {
          // === TELUR (MELAYANG): Sinks into middle of water, then hovers & gently bobs in mid-depth ===
          const midTankY = WATER_Y + (TANK_BOTTOM - WATER_Y) * 0.48;
          const gentleBob = Math.sin(s.timeInWater * 0.045) * 4.5;
          const targetY = midTankY + gentleBob;

          const dy = targetY - s.y;
          s.vy += dy * 0.035;
          s.vy *= 0.86;

          if (s.timeInWater < 30 && s.timeInWater % 4 === 0) {
            spawnBubble(s.x, s.y);
          }

          s.currentFa = s.currentW;
          updatePhase('Melayang Seimbang di Tengah Fluida (Fa = W)');
        } else {
          // === BATU (TENGGELAM): Plunges down with bubbles & settles on bottom floor ===
          const floorY = TANK_BOTTOM - objHalf - 6;
          // Net downward acceleration in water (Gravity - Buoyancy)
          const netSinkAccel = 0.26 * Math.min(2.2, ratio - 0.85);
          s.vy += netSinkAccel;
          // Water drag
          s.vy *= 0.94;

          // Spawn trail of rising air bubbles while sinking
          if (s.y < floorY - 5 && s.timeInWater % 2 === 0) {
            spawnBubble(s.x, s.y - 10);
          }

          if (s.y + s.vy >= floorY) {
            s.y = floorY;
            if (Math.abs(s.vy) > 1.2) {
              // Subtle floor impact bubble burst & surface tremor
              for (let b = 0; b < 6; b++) spawnBubble(s.x, floorY);
              createSplash(s.x, 3.5);
              s.vy = -s.vy * 0.18;
            } else {
              s.vy = 0;
            }
            updatePhase('Tenggelam di Dasar Wadah (W > Fa)');
          } else {
            updatePhase('Mencemplung & Tenggelam ke Dasar (W > Fa)...');
          }

          s.currentFa = Math.round((s.fluidDensity / s.objDensity) * s.currentW);
        }
      }

      s.y += s.vy;

      // 3. Update Splash Droplets
      for (let i = s.splashes.length - 1; i >= 0; i--) {
        const p = s.splashes[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.32; // gravity
        p.alpha -= 0.018;
        if (p.y > WATER_Y + 8 || p.alpha <= 0) {
          s.splashes.splice(i, 1);
        }
      }

      // 4. Update Underwater Air Bubbles
      for (let i = s.bubbles.length - 1; i >= 0; i--) {
        const b = s.bubbles[i];
        b.x += b.vx + Math.sin(b.y * 0.12) * 0.35;
        b.y += b.vy;
        b.alpha -= 0.012;
        if (b.y <= WATER_Y || b.alpha <= 0) {
          s.bubbles.splice(i, 1);
        }
      }

      // 5. Update Upward Buoyancy Thrust Rings
      for (let i = s.thrustRings.length - 1; i >= 0; i--) {
        const r = s.thrustRings[i];
        r.y -= 1.2;
        r.width += 1.6;
        r.alpha -= 0.035;
        if (r.alpha <= 0) s.thrustRings.splice(i, 1);
      }
    };

    const drawScene = () => {
      const s = simRef.current;
      if (!s) return;
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      // Background subtle lab grid
      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let gx = 60; gx < LOGICAL_W; gx += 30) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, LOGICAL_H);
        ctx.stroke();
      }
      for (let gy = 30; gy < LOGICAL_H; gy += 30) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(LOGICAL_W, gy);
        ctx.stroke();
      }
      ctx.restore();

      // Depth ruler ticks on left wall
      ctx.save();
      ctx.fillStyle = '#64748b';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillText('0 m (Permukaan)', 68, WATER_Y - 10);
      ctx.fillText('0.5 m', 68, WATER_Y + 95);
      ctx.fillText('1.0 m (Dasar)', 68, TANK_BOTTOM - 10);
      ctx.restore();

      // Draw Upward Buoyancy Thrust Rings (Daya Dorong Effect!)
      s.thrustRings.forEach(ring => {
        ctx.save();
        ctx.strokeStyle = `rgba(2, 132, 199, ${ring.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(ring.x, ring.y, ring.width, 8, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // Draw Object (Kayu / Telur / Batu)
      const objHalf = s.size / 2;
      ctx.save();
      ctx.translate(s.x, s.y);

      if (s.key === 'kayu') {
        // Wood block with realistic grain
        ctx.fillStyle = '#d97706';
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(-objHalf, -objHalf, s.size, s.size * 0.85, 10);
        ctx.fill();
        ctx.stroke();

        // Wood grain lines
        ctx.strokeStyle = 'rgba(120, 53, 15, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-objHalf + 8, -8);
        ctx.quadraticCurveTo(0, -14, objHalf - 8, -6);
        ctx.moveTo(-objHalf + 8, 6);
        ctx.quadraticCurveTo(0, 12, objHalf - 8, 4);
        ctx.stroke();
      } else if (s.key === 'telur') {
        // Realistic Egg shape
        ctx.fillStyle = '#fef3c7';
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, objHalf * 0.78, objHalf * 0.96, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        // Realistic Granite Rock polygon
        ctx.fillStyle = '#64748b';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-objHalf * 0.8, -objHalf * 0.5);
        ctx.lineTo(-objHalf * 0.2, -objHalf * 0.88);
        ctx.lineTo(objHalf * 0.7, -objHalf * 0.65);
        ctx.lineTo(objHalf * 0.92, objHalf * 0.2);
        ctx.lineTo(objHalf * 0.5, objHalf * 0.82);
        ctx.lineTo(-objHalf * 0.65, objHalf * 0.82);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Label on object
      ctx.fillStyle = s.key === 'telur' ? '#78350f' : '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.name, 0, 4);
      ctx.restore();

      // Draw Dynamic Water Body with 1D Wave Surface!
      const preset = OBJECT_PRESETS[s.key] || OBJECT_PRESETS.kayu;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(TANK_LEFT, TANK_BOTTOM);
      ctx.lineTo(TANK_LEFT, WATER_Y + s.waveNodes[0].y);

      const stepX = TANK_WIDTH / (s.waveNodes.length - 1);
      for (let i = 0; i < s.waveNodes.length - 1; i++) {
        const x1 = TANK_LEFT + i * stepX;
        const y1 = WATER_Y + s.waveNodes[i].y;
        const x2 = TANK_LEFT + (i + 1) * stepX;
        const y2 = WATER_Y + s.waveNodes[i + 1].y;
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        ctx.quadraticCurveTo(x1, y1, cx, cy);
      }

      ctx.lineTo(TANK_RIGHT, TANK_BOTTOM);
      ctx.closePath();

      // Gradient fill for fluid
      const grad = ctx.createLinearGradient(0, WATER_Y, 0, TANK_BOTTOM);
      if (s.fluidDensity >= 1300) {
        grad.addColorStop(0, 'rgba(245, 158, 11, 0.48)');
        grad.addColorStop(1, 'rgba(217, 119, 6, 0.68)');
      } else if (s.fluidDensity > 1010) {
        grad.addColorStop(0, 'rgba(45, 212, 191, 0.40)');
        grad.addColorStop(1, 'rgba(13, 148, 136, 0.60)');
      } else if (s.fluidDensity < 900) {
        grad.addColorStop(0, 'rgba(250, 204, 21, 0.38)');
        grad.addColorStop(1, 'rgba(202, 138, 4, 0.55)');
      } else {
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.40)');
        grad.addColorStop(1, 'rgba(2, 132, 199, 0.62)');
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw shimmering wave crest line
      ctx.beginPath();
      for (let i = 0; i < s.waveNodes.length; i++) {
        const wx = TANK_LEFT + i * stepX;
        const wy = WATER_Y + s.waveNodes[i].y;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = preset.fluidStroke;
      ctx.lineWidth = 3.2;
      ctx.stroke();
      ctx.restore();

      // Draw Underwater Air Bubbles
      s.bubbles.forEach(b => {
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.7})`;
        ctx.strokeStyle = `rgba(2, 132, 199, ${b.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Draw Water Splash Droplets
      s.splashes.forEach(p => {
        ctx.save();
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Force Vectors (Spatial & Temporal Contiguity Mayer)
      // 1. Upward Buoyancy Force Arrow (Fa)
      if (s.currentFa > 0) {
        const faLen = Math.min(72, Math.max(24, (s.currentFa / 120) * 45));
        drawVectorArrow(
          ctx,
          s.x - 48,
          s.y + 10,
          s.x - 48,
          s.y + 10 - faLen,
          '#0284c7',
          `↑ Fa (${s.currentFa} N)`
        );
      }

      // 2. Downward Weight Force Arrow (W)
      const wLen = Math.min(72, Math.max(24, (s.currentW / 120) * 45));
      drawVectorArrow(
        ctx,
        s.x + 48,
        s.y - 10,
        s.x + 48,
        s.y - 10 + wLen,
        '#dc2626',
        `↓ W (${s.currentW} N)`
      );

      // Draw Glass Tank Walls
      ctx.save();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(TANK_LEFT, TANK_TOP);
      ctx.lineTo(TANK_LEFT, TANK_BOTTOM);
      ctx.lineTo(TANK_RIGHT, TANK_BOTTOM);
      ctx.lineTo(TANK_RIGHT, TANK_TOP);
      ctx.stroke();
      ctx.restore();
    };

    const drawVectorArrow = (ctx, x1, y1, x2, y2, color, label) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 9 * Math.cos(angle - Math.PI / 6), y2 - 9 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - 9 * Math.cos(angle + Math.PI / 6), y2 - 9 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      // Pill label
      ctx.font = 'bold 11px Inter, sans-serif';
      const textWidth = ctx.measureText(label).width;
      const lx = x2 < simRef.current.x ? x2 - textWidth - 14 : x2 + 10;
      const ly = y2;
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.beginPath();
      ctx.roundRect(lx - 4, ly - 10, textWidth + 8, 18, 4);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.fillText(label, lx, ly + 3);
      ctx.restore();
    };

    let lastTs = 0;
    let frameSkip = 0;
    const loop = (ts) => {
      animId = requestAnimationFrame(loop);
      if (document.hidden) return; // jeda saat tab tidak terlihat
      const saver = document.body.classList.contains('data-saver');
      if (saver && ts - lastTs < 33) return; // mode hemat daya: ~30 FPS
      lastTs = ts;
      if (!pausedRef.current) {
        if (slowRef.current) {
          frameSkip = (frameSkip + 1) % 2;
          if (frameSkip === 0) stepPhysics();
        } else {
          stepPhysics();
          if (saver) stepPhysics();
        }
      }
      drawScene();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [subMode]);

  const currentPreset = OBJECT_PRESETS[selectedKey];
  const calcHydroPressure = Math.round(tankFluidRho * 10 * probeDepth);

  // Kondisi fisis dinamis (selalu koheren dengan slider kustom maupun preset)
  const liveRatio = customObjDensity / Math.max(1, customFluidDensity);
  const liveCondition =
    liveRatio < 0.92
      ? {
          label: 'Terapung (ρ_benda < ρ_cairan)',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          faLabel: 'Lebih Kuat ↑',
          wLabel: 'Lebih Ringan',
          desc: `Dengan massa jenis benda ${customObjDensity} kg/m³ yang lebih kecil dari cairan ${customFluidDensity} kg/m³, gaya dorong air (Fa) melontarkan benda kembali ke permukaan hingga terapung stabil.`
        }
      : Math.abs(liveRatio - 1) <= 0.08
      ? {
          label: 'Melayang (ρ_benda ≈ ρ_cairan)',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          faLabel: 'Seimbang =',
          wLabel: 'Seimbang =',
          desc: `Massa jenis benda (${customObjDensity} kg/m³) hampir sama dengan cairan (${customFluidDensity} kg/m³). Gaya dorong air (Fa) sama kuat dengan berat benda (W), sehingga benda melayang tenang di tengah.`
        }
      : {
          label: 'Tenggelam (ρ_benda > ρ_cairan)',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
          faLabel: 'Lebih Kecil',
          wLabel: 'Lebih Berat ↓',
          desc: `Massa jenis benda (${customObjDensity} kg/m³) lebih besar dari cairan (${customFluidDensity} kg/m³). Berat benda (W) mengalahkan daya dorong air (Fa), sehingga benda turun ke dasar wadah.`
        };

  const toggleAudioExplanation = () => {
    if (!('speechSynthesis' in window)) return;
    if (isAudioOn) {
      window.speechSynthesis.cancel();
      setIsAudioOn(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(liveCondition.desc);
    utter.lang = 'id-ID';
    utter.rate = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const bestId = voices.find((v) => v.lang.toLowerCase().startsWith('id') && /google|natural/i.test(v.name))
      || voices.find((v) => v.lang.toLowerCase().startsWith('id'));
    if (bestId) utter.voice = bestId;
    utter.onend = () => setIsAudioOn(false);
    utter.onerror = () => setIsAudioOn(false);
    window.speechSynthesis.speak(utter);
    setIsAudioOn(true);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Lab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubMode('archimedes')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              subMode === 'archimedes'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Droplets className="w-4 h-4" />
            Lab 1: Animasi Apung, Riak Air &amp; Daya Dorong (Kayu, Telur, Batu)
          </button>
          <button
            type="button"
            onClick={() => {
              setSubMode('hydro');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              subMode === 'hydro'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Gauge className="w-4 h-4" />
            Lab 2: Sensor Tekanan Hidrostatis &amp; Bukti Bentuk Wadah
          </button>
        </div>

        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" /> Eksperimen Lab Tuntas (+75 XP)
          </span>
        )}
      </div>

      {subMode === 'archimedes' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* KIRI: Canvas 60FPS Interaktif */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <span>💧 Wadah Eksperimen Fluida Real-Time</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Klik benda di bawah untuk melihat animasi jatuh, mencemplung, riak gelombang air, dan daya dorong gaya apung!
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${liveCondition.badgeClass}`}>
                {liveCondition.label}
              </span>
            </div>

            {/* 3 Tombol Preset Utama: Kayu, Telur, Batu */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Object.values(OBJECT_PRESETS).map((item) => {
                const isActive = selectedKey === item.id;
                const isDone = testedObjects[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectObject(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.01]'
                        : 'bg-slate-50 hover:bg-blue-50/60 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">{item.emoji}</span>
                      {isDone && (
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          ✓ Diuji
                        </span>
                      )}
                    </div>
                    <div className="font-extrabold text-sm">{item.name}</div>
                    <div className={`text-[11px] ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                      ρ = {item.density} kg/m³
                    </div>
                  </button>
                );
              })}
            </div>

            {predictFor && (
              <div className="mb-4 p-4 rounded-xl bg-violet-50 border border-violet-200 space-y-3" role="group" aria-label="Prediksi">
                <p className="text-sm font-extrabold text-violet-900">
                  🤔 Tebak dulu ya: menurutmu {OBJECT_PRESETS[predictFor].name} akan bagaimana di dalam {OBJECT_PRESETS[predictFor].fluidName}?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['terapung', 'melayang', 'tenggelam'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handlePredict(opt)}
                      className="min-h-[48px] rounded-xl bg-white hover:bg-violet-100 border border-violet-300 text-violet-900 font-extrabold text-sm capitalize transition"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-violet-700">Tidak ada jawaban salah di sini — tebakanmu akan dibuktikan lewat simulasi.</p>
              </div>
            )}
            {predictionResult && (
              <div role="status" aria-live="polite" className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-900">
                {predictionResult}
              </div>
            )}

            {/* Kanvas Fisika Air & Riak Gelombang */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <canvas
                ref={canvasRef}
                width={600}
                height={360}
                className="w-full h-auto block cursor-pointer"
                onClick={() => triggerDrop(selectedKey, customObjDensity, customFluidDensity)}
                role="img"
                aria-label={`Simulasi ${currentPreset.name} di dalam ${currentPreset.fluidName}. ${phaseStatus}`}
                title="Klik kanvas untuk menjatuhkan ulang benda dari atas!"
              />
              <div role="status" aria-live="polite" className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                <span>Status Fisika: {phaseStatus}</span>
              </div>
              <button
                type="button"
                onClick={() => triggerDrop(selectedKey, customObjDensity, customFluidDensity)}
                className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Jatuhkan Ulang
              </button>
            </div>

            {/* Toolbar Kontrol Laju & Audio + Strip Gaya (Dekat dengan Kanvas agar tidak bolak-balik scroll di HP) */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused((v) => !v)}
                className={`min-h-[44px] px-3.5 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 transition ${
                  isPaused
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? 'Lanjutkan' : 'Jeda'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSlowMotion((v) => !v)}
                aria-pressed={slowMotion}
                className={`min-h-[44px] px-3.5 rounded-xl text-xs font-extrabold border transition ${
                  slowMotion
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {slowMotion ? 'Gerak Lambat 0.5× (Aktif)' : 'Gerak Lambat 0.5×'}
              </button>
              <button
                type="button"
                onClick={toggleAudioExplanation}
                className={`min-h-[44px] px-3.5 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 transition ${
                  isAudioOn
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {isAudioOn ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isAudioOn ? 'Hentikan Audio' : 'Dengarkan Penjelasan'}</span>
              </button>
            </div>

            {/* Strip Perbandingan Gaya menempel langsung di bawah kanvas */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <ArrowUp className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Gaya Apung (Fa)</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-sky-700">{liveCondition.faLabel}</span>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <ArrowDown className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Berat Benda (W)</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-orange-700">{liveCondition.wLabel}</span>
              </div>
            </div>
          </div>

          {/* KANAN: Panel Kontrol Kustom & Analisis Gaya Mayer */}
          <div className="lg:col-span-5 space-y-4">
            {/* Kontrol Slider Massa Jenis */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h4 className="font-extrabold text-slate-900 text-base mb-1">
                Uji Kustomisasi Variabel Massa Jenis
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Geser slider di bawah untuk mengubah kerapatan benda atau cairan dan amati langsung respon daya apungnya!
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">1. Massa Jenis Benda (ρ_benda)</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {customObjDensity} kg/m³
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="2500"
                    step="50"
                    value={customObjDensity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomObjDensity(val);
                    }}
                    onPointerUp={() => triggerDrop(selectedKey, customObjDensity, customFluidDensity)}
                    onKeyUp={() => triggerDrop(selectedKey, customObjDensity, customFluidDensity)}
                    aria-label="Massa jenis benda"
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                    <span>300 (Gabus/Kayu)</span>
                    <span>1000 (Telur)</span>
                    <span>2500 (Batu)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">2. Massa Jenis Cairan (ρ_fluida)</span>
                    <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      {customFluidDensity} kg/m³
                    </span>
                  </div>
                  <input
                    type="range"
                    min="800"
                    max="1450"
                    step="10"
                    value={customFluidDensity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomFluidDensity(val);
                    }}
                    onPointerUp={() => triggerDrop(selectedKey, customObjDensity, customFluidDensity)}
                    onKeyUp={() => triggerDrop(selectedKey, customObjDensity, customFluidDensity)}
                    aria-label="Massa jenis cairan"
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                    <span>800 (Minyak)</span>
                    <span>1000 (Air)</span>
                    <span>1450 (Madu)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Penjelasan Dinamis Koheren dengan Slider & Preset */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Yang Sedang Terjadi
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {liveCondition.desc}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* LAB 2: TANGKI TEKANAN HIDROSTATIS & BUKTI BENTUK WADAH */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Sensor Kedalaman &amp; Eksperimen Bentuk Bejana
                </h3>
                <p className="text-xs text-slate-500">
                  Ubah bentuk wadah di bawah untuk membuktikan apakah bentuk wadah mempengaruhi tekanan hidrostatis!
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs">
                P = {calcHydroPressure.toLocaleString('id-ID')} Pa
              </span>
            </div>

            {/* Pilihan Bentuk Wadah (Membuktikan Tips Anti-Pusing Mayer!) */}
            <div className="flex gap-2 mb-4">
              {[
                { id: 'lebar', label: '1. Kolam Lebar' },
                { id: 'sempit', label: '2. Pipa Sempit' },
                { id: 'kerucut', label: '3. Bejana Miring' }
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVesselShape(v.id)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                    vesselShape === v.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Visualisasi SVG Tangki & Sensor Probe */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <svg viewBox="0 0 500 270" className="w-full h-auto">
                {/* Bentuk Wadah Dinamis */}
                {vesselShape === 'lebar' && (
                  <>
                    <rect x="70" y="30" width="360" height="220" rx="8" fill="#ffffff" stroke="#334155" strokeWidth="4" />
                    <rect x="72" y="55" width="356" height="193" fill="rgba(56, 189, 248, 0.45)" />
                  </>
                )}
                {vesselShape === 'sempit' && (
                  <>
                    <rect x="180" y="30" width="140" height="220" rx="8" fill="#ffffff" stroke="#334155" strokeWidth="4" />
                    <rect x="182" y="55" width="136" height="193" fill="rgba(56, 189, 248, 0.45)" />
                  </>
                )}
                {vesselShape === 'kerucut' && (
                  <>
                    <polygon points="140,30 360,30 410,250 90,250" fill="#ffffff" stroke="#334155" strokeWidth="4" />
                    <polygon points="145,55 355,55 408,248 92,248" fill="rgba(56, 189, 248, 0.45)" />
                  </>
                )}

                {/* Garis Permukaan Air (h = 0) */}
                <line x1="60" y1="55" x2="440" y2="55" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="6 4" />
                <text x="65" y="46" fill="#0369a1" fontSize="12" fontWeight="bold">Permukaan Air (h = 0 m)</text>

                {/* Posisi Probe Sensor */}
                {(() => {
                  const py = 55 + (probeDepth / 2.0) * 185;
                  return (
                    <g>
                      <line x1="250" y1="55" x2="250" y2={py} stroke="#ea580c" strokeWidth="2.5" strokeDasharray="4 4" />
                      <circle cx="250" cy={py} r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="4" />
                      <text x="272" y={py + 4} fill="#c2410c" fontSize="13" fontWeight="800">
                        h = {probeDepth.toFixed(1)} m → P = {calcHydroPressure.toLocaleString('id-ID')} Pa
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h4 className="font-extrabold text-slate-900">Kontrol Sensor Kedalaman (h)</h4>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Kedalaman Sensor (h)</span>
                <span className="text-orange-600">{probeDepth.toFixed(1)} meter</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={probeDepth}
                onChange={(e) => setProbeDepth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Zat Cair (ρ)</label>
              <select
                value={tankFluidRho}
                onChange={(e) => setTankFluidRho(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold"
              >
                <option value={800}>Minyak Kelapa (800 kg/m³)</option>
                <option value={1000}>Air Tawar (1.000 kg/m³)</option>
                <option value={1030}>Air Laut (1.030 kg/m³)</option>
                <option value={1420}>Madu Kental (1.420 kg/m³)</option>
              </select>
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Bacaan Manometer Digital</div>
              <div className="text-3xl font-black text-sky-400 my-1">
                {calcHydroPressure.toLocaleString('id-ID')} Pa
              </div>
              <div className="text-xs text-slate-300 font-mono">
                P = {tankFluidRho} × 10 × {probeDepth.toFixed(1)}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900">
              <strong>Bukti Ilmiah:</strong> Coba ganti bentuk wadah antara <em>Kolam Lebar</em>, <em>Pipa Sempit</em>, dan <em>Bejana Miring</em>. Pada kedalaman <strong>h = {probeDepth.toFixed(1)} m</strong>, tekanannya tetap <strong>{calcHydroPressure.toLocaleString('id-ID')} Pa</strong>!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
