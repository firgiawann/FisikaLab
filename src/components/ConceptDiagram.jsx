import React, { useState } from 'react';

/**
 * Diagram Konsep SVG Interaktif Berlabel Langsung (Spatial Contiguity + Multimedia)
 * Siswa bisa mengetuk bagian pada diagram untuk melihat peran bagian tersebut dalam 1 kalimat santai.
 * Bersifat opsional (tidak memaksa siswa yang sudah paham untuk mengklik semua bagian).
 */

const DIAGRAMS = {
  /* ===== BAB 01 FLUIDA (5 DIAGRAM LENGKAP) ===== */
  u1: {
    title: 'Lihat Cara Kerja Tekanan Air',
    hint: 'Ketuk bagian pada gambar untuk melihat maknanya:',
    parts: [
      { id: 'surface', label: 'Permukaan Air (h = 0)', note: 'Kedalaman (h) selalu dihitung dari permukaan atas air ke bawah, bukan dari dasar kolam.' },
      { id: 'column', label: 'Tumpukan Air (ρ·g·h)', note: 'Makin dalam posisimu, makin berat tumpukan air di atasmu yang menekan ke segala arah.' },
      { id: 'deep', label: 'Titik Lebih Dalam', note: 'Tekanan di titik ini lebih kuat daripada di atasnya — bentuk wadah lebar atau sempit tidak mengubah hasilnya.' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 210" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram tekanan hidrostatis dalam bejana air">
        <rect x="65" y="25" width="330" height="165" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3.5" />
        <rect x="68" y="55" width="324" height="132" rx="6" fill="rgba(56, 189, 248, 0.35)" />
        <line x1="68" y1="55" x2="392" y2="55" stroke="#0284c7" strokeWidth="3" />
        <g onClick={() => onSelect('surface')} className="cursor-pointer">
          <rect x="78" y="32" width="142" height="22" rx="6" fill={activeId === 'surface' ? '#0284c7' : '#ffffff'} stroke="#0284c7" strokeWidth="1.5" />
          <text x="149" y="47" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeId === 'surface' ? '#ffffff' : '#0369a1'}>
            Permukaan (h = 0)
          </text>
        </g>
        <g onClick={() => onSelect('column')} className="cursor-pointer">
          <line x1="165" y1="58" x2="165" y2="145" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="5 3" />
          <polygon points="165,152 159,140 171,140" fill="#0f172a" />
          <rect x="174" y="88" width="128" height="24" rx="6" fill={activeId === 'column' ? '#0f172a' : '#ffffff'} stroke="#334155" strokeWidth="1.5" />
          <text x="238" y="104" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeId === 'column' ? '#ffffff' : '#0f172a'}>
            Kedalaman h (makin besar)
          </text>
        </g>
        <g onClick={() => onSelect('deep')} className="cursor-pointer">
          <circle cx="165" cy="158" r="10" fill={activeId === 'deep' ? '#dc2626' : '#ef4444'} stroke="#ffffff" strokeWidth="2.5" />
          <rect x="184" y="146" width="186" height="24" rx="6" fill={activeId === 'deep' ? '#dc2626' : '#fef2f2'} stroke="#ef4444" strokeWidth="1.5" />
          <text x="277" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeId === 'deep' ? '#ffffff' : '#b91c1c'}>
            Tekanan P paling kuat di sini
          </text>
        </g>
      </svg>
    )
  },

  u2: {
    title: 'Cara Dongkrak Melipatgandakan Gaya (Hukum Pascal)',
    hint: 'Ketuk piston kecil, cairan, atau piston besar:',
    parts: [
      { id: 'p1', label: 'Piston Kecil (F₁, A₁)', note: 'Cukup ditekan dengan tenaga ringan. Namun jarak dorongnya harus lebih panjang.' },
      { id: 'fluid', label: 'Zat Cair Tertutup', note: 'Cairan meneruskan tekanan sama besar ke segala arah (P₁ = P₂) tanpa berkurang.' },
      { id: 'p2', label: 'Piston Besar (F₂, A₂)', note: 'Karena luas penampangnya jauh lebih lebar, tekanan yang sama berubah menjadi gaya angkat besar!' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 190" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram dongkrak hidrolik Pipa-U Pascal">
        <path
          d="M 105 40 L 105 140 Q 105 155 120 155 L 330 155 Q 345 155 345 140 L 345 40 L 405 40 L 405 148 Q 405 175 355 175 L 115 175 Q 75 175 75 148 L 75 40 Z"
          fill="#e2e8f0"
          stroke="#64748b"
          strokeWidth="2.5"
        />
        <g onClick={() => onSelect('fluid')} className="cursor-pointer">
          <path
            d="M 105 88 L 105 140 Q 105 155 120 155 L 330 155 Q 345 155 345 140 L 345 88 L 405 88 L 405 148 Q 405 175 355 175 L 115 175 Q 75 175 75 148 L 75 88 Z"
            fill={activeId === 'fluid' ? '#0284c7' : '#60a5fa'}
            opacity="0.78"
          />
          <text x="225" y="169" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
            Tekanan diteruskan sama besar (P₁ = P₂)
          </text>
        </g>
        <g onClick={() => onSelect('p1')} className="cursor-pointer">
          <rect x="78" y="76" width="24" height="14" rx="3" fill={activeId === 'p1' ? '#dc2626' : '#334155'} />
          <text x="90" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">↓ F₁ kecil</text>
          <text x="45" y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">A₁</text>
        </g>
        <g onClick={() => onSelect('p2')} className="cursor-pointer">
          <rect x="348" y="76" width="54" height="14" rx="3" fill={activeId === 'p2' ? '#16a34a' : '#334155'} />
          <rect x="352" y="45" width="46" height="24" rx="5" fill="#2563eb" />
          <text x="375" y="61" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">MOBIL</text>
          <text x="375" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#16a34a">↑ F₂ besar</text>
          <text x="424" y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">A₂</text>
        </g>
      </svg>
    )
  },

  u3: {
    title: 'Dua Gaya yang Saling Tarik-Ulur di Air (Hukum Archimedes)',
    hint: 'Ketuk panah atau balok untuk melihat perannya:',
    parts: [
      { id: 'fa', label: 'Gaya Apung (Fa ↑)', note: 'Dorongan air ke atas sebesar berat cairan yang terdesak. Begitu benda tercelup penuh, Fa tidak bertambah lagi meski makin dalam.' },
      { id: 'w', label: 'Gaya Berat (W ↓)', note: 'Tarikan gravitasi bumi ke bawah sesuai massa benda.' },
      { id: 'obj', label: 'Benda Tercelup', note: 'Yang menentukan terapung, melayang, atau tenggelam adalah perbandingan massa jenis rata-rata benda vs cairan.' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 210" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram gaya apung ke atas dan gaya berat ke bawah">
        <rect x="65" y="25" width="330" height="165" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3.5" />
        <rect x="68" y="88" width="324" height="99" rx="6" fill="rgba(56, 189, 248, 0.35)" />
        <line x1="68" y1="88" x2="392" y2="88" stroke="#0284c7" strokeWidth="3" />
        <g onClick={() => onSelect('obj')} className="cursor-pointer">
          <rect x="195" y="70" width="70" height="54" rx="8" fill={activeId === 'obj' ? '#b45309' : '#d97706'} stroke="#78350f" strokeWidth="2.5" />
          <text x="230" y="101" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">Benda</text>
        </g>
        <g onClick={() => onSelect('fa')} className="cursor-pointer">
          <line x1="170" y1="128" x2="170" y2="62" stroke="#0284c7" strokeWidth="4" />
          <polygon points="170,52 162,66 178,66" fill="#0284c7" />
          <rect x="78" y="54" width="82" height="24" rx="6" fill={activeId === 'fa' ? '#0284c7' : '#ffffff'} stroke="#0284c7" strokeWidth="1.5" />
          <text x="119" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeId === 'fa' ? '#ffffff' : '#0369a1'}>
            ↑ Fa (Apung)
          </text>
        </g>
        <g onClick={() => onSelect('w')} className="cursor-pointer">
          <line x1="290" y1="76" x2="290" y2="144" stroke="#dc2626" strokeWidth="4" />
          <polygon points="290,154 282,140 298,140" fill="#dc2626" />
          <rect x="300" y="128" width="84" height="24" rx="6" fill={activeId === 'w' ? '#dc2626' : '#ffffff'} stroke="#dc2626" strokeWidth="1.5" />
          <text x="342" y="144" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeId === 'w' ? '#ffffff' : '#b91c1c'}>
            ↓ W (Berat)
          </text>
        </g>
      </svg>
    )
  },

  u4: {
    title: 'Tegangan Permukaan & Kapilaritas pada Pipa Sempit',
    hint: 'Ketuk lapisan permukaan, pipa sempit, atau pipa lebar:',
    parts: [
      { id: 'skin', label: 'Lapisan Permukaan', note: 'Molekul air di permukaan saling tarik kuat sehingga membentuk seperti "selaput tipis elastis" yang sanggup menahan serangga kecil.' },
      { id: 'thin', label: 'Pipa Kapiler Sempit', note: 'Gaya tarik air ke dinding kaca (adhesi) lebih kuat dari tarikan antar-air (kohesi), sehingga air memanjat jauh lebih tinggi di pipa sempit!' },
      { id: 'wide', label: 'Pipa Lebih Lebar', note: 'Pada pipa yang lebih lebar, beban kolom air lebih berat sehingga kenaikan airnya lebih rendah dibanding pipa sempit.' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 210" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram tegangan permukaan dan kapilaritas pada pipa sempit dibanding pipa lebar">
        {/* Wadah air */}
        <rect x="45" y="110" width="370" height="80" rx="8" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
        <rect x="48" y="132" width="364" height="55" rx="5" fill="rgba(56, 189, 248, 0.35)" />
        {/* Lapisan tegangan permukaan + serangga kecil di kiri */}
        <g onClick={() => onSelect('skin')} className="cursor-pointer">
          <path d="M 48 132 Q 95 132 110 137 Q 125 132 168 132" fill="none" stroke={activeId === 'skin' ? '#0369a1' : '#0284c7'} strokeWidth="3.5" />
          <ellipse cx="110" cy="127" rx="14" ry="5" fill="#1e293b" />
          <line x1="98" y1="128" x2="88" y2="134" stroke="#1e293b" strokeWidth="1.8" />
          <line x1="122" y1="128" x2="132" y2="134" stroke="#1e293b" strokeWidth="1.8" />
          <rect x="56" y="88" width="114" height="22" rx="6" fill={activeId === 'skin' ? '#0284c7' : '#ffffff'} stroke="#0284c7" strokeWidth="1.5" />
          <text x="113" y="103" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'skin' ? '#ffffff' : '#0369a1'}>
            Tegangan Permukaan
          </text>
        </g>
        {/* Pipa kapiler sempit (air naik tinggi) */}
        <g onClick={() => onSelect('thin')} className="cursor-pointer">
          <rect x="225" y="34" width="18" height="135" fill="#ffffff" stroke={activeId === 'thin' ? '#0284c7' : '#475569'} strokeWidth="2.5" />
          <rect x="227" y="62" width="14" height="106" fill="rgba(14, 165, 233, 0.65)" />
          <path d="M 227 62 Q 234 68 241 62" fill="none" stroke="#0369a1" strokeWidth="2" />
          <rect x="180" y="14" width="108" height="20" rx="6" fill={activeId === 'thin' ? '#0284c7' : '#ffffff'} stroke="#0284c7" strokeWidth="1.5" />
          <text x="234" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'thin' ? '#ffffff' : '#0369a1'}>
            Pipa Sempit: Naik Tinggi
          </text>
        </g>
        {/* Pipa lebih lebar (air naik lebih rendah) */}
        <g onClick={() => onSelect('wide')} className="cursor-pointer">
          <rect x="318" y="54" width="42" height="115" fill="#ffffff" stroke={activeId === 'wide' ? '#0d9488' : '#475569'} strokeWidth="2.5" />
          <rect x="320" y="106" width="38" height="62" fill="rgba(45, 212, 191, 0.55)" />
          <path d="M 320 106 Q 339 112 358 106" fill="none" stroke="#0f766e" strokeWidth="2" />
          <rect x="296" y="34" width="96" height="20" rx="6" fill={activeId === 'wide' ? '#0d9488' : '#ffffff'} stroke="#0d9488" strokeWidth="1.5" />
          <text x="344" y="48" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'wide' ? '#ffffff' : '#0f766e'}>
            Pipa Lebar: Rendah
          </text>
        </g>
      </svg>
    )
  },

  u5: {
    title: 'Pipa Menyempit: Aliran Makin Cepat, Tekanan Justru Turun (Bernoulli)',
    hint: 'Ketuk bagian pipa lebar, bagian sempit, atau tabung ukur tekanan:',
    parts: [
      { id: 'wide', label: 'Pipa Lebar (v₁ lambat, P₁ tinggi)', note: 'Di bagian pipa yang lebar, aliran air lebih santai (v₁ kecil) sehingga tekanan ke dinding pipa lebih tinggi — kolom air ukur naik tinggi.' },
      { id: 'narrow', label: 'Pipa Sempit (v₂ cepat, P₂ rendah)', note: 'Karena debit tetap (A₁v₁ = A₂v₂), air harus ngebut di bagian sempit (v₂ besar). Menurut Asas Bernoulli, kelajuan tinggi membuat tekanan P₂ justru lebih rendah!' },
      { id: 'gauge', label: 'Kolom Ukur Tekanan', note: 'Perhatikan tinggi air di tabung atas! Di bagian sempit kolomnya lebih pendek — bukti nyata bahwa tekanan di sana lebih kecil.' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 205" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram pipa venturi menunjukkan aliran cepat dan tekanan rendah di bagian sempit">
        {/* Pipa Venturi */}
        <path
          d="M 30 112 L 155 112 L 195 130 L 265 130 L 305 112 L 430 112 L 430 178 L 305 178 L 265 160 L 195 160 L 155 178 L 30 178 Z"
          fill="rgba(56, 189, 248, 0.35)"
          stroke="#334155"
          strokeWidth="3"
        />
        {/* Tabung ukur tekanan P1 (tinggi) & P2 (pendek) */}
        <g onClick={() => onSelect('gauge')} className="cursor-pointer">
          <rect x="92" y="28" width="18" height="84" fill="#ffffff" stroke="#334155" strokeWidth="2" />
          <rect x="94" y="42" width="14" height="70" fill={activeId === 'gauge' ? '#0284c7' : '#38bdf8'} />
          <text x="101" y="21" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">P₁ Tinggi</text>

          <rect x="221" y="46" width="18" height="84" fill="#ffffff" stroke="#334155" strokeWidth="2" />
          <rect x="223" y="92" width="14" height="38" fill={activeId === 'gauge' ? '#dc2626' : '#fb7185'} />
          <text x="230" y="39" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c">P₂ Rendah</text>
        </g>
        {/* Area pipa lebar */}
        <g onClick={() => onSelect('wide')} className="cursor-pointer">
          <line x1="52" y1="145" x2="112" y2="145" stroke="#0369a1" strokeWidth="3" />
          <polygon points="118,145 108,139 108,151" fill="#0369a1" />
          <rect x="44" y="182" width="114" height="20" rx="5" fill={activeId === 'wide' ? '#0284c7' : '#ffffff'} stroke="#0284c7" strokeWidth="1.2" />
          <text x="101" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'wide' ? '#ffffff' : '#0369a1'}>
            A₁ Lebar → v₁ Lambat
          </text>
        </g>
        {/* Area pipa sempit */}
        <g onClick={() => onSelect('narrow')} className="cursor-pointer">
          <line x1="196" y1="145" x2="262" y2="145" stroke="#dc2626" strokeWidth="3.5" />
          <polygon points="270,145 258,138 258,152" fill="#dc2626" />
          <rect x="174" y="182" width="116" height="20" rx="5" fill={activeId === 'narrow' ? '#dc2626' : '#ffffff'} stroke="#dc2626" strokeWidth="1.2" />
          <text x="232" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'narrow' ? '#ffffff' : '#b91c1c'}>
            A₂ Sempit → v₂ Cepat!
          </text>
        </g>
      </svg>
    )
  },

  /* ===== BAB 02 ROTASI: LENGAN TORSI & SUDUT ===== */
  r1: {
    title: 'Cara Kerja Torsi pada Kunci Pas (τ = r · F · sin θ)',
    hint: 'Ketuk baut poros, lengan gagang, atau panah gaya:',
    parts: [
      { id: 'pivot', label: 'Poros Putar (r = 0)', note: 'Baut adalah titik poros. Mendorong tepat di poros (r = 0) menghasilkan torsi nol sehingga baut tidak berputar.' },
      { id: 'arm', label: 'Lengan Momen (r)', note: 'Makin jauh peganganmu dari baut, makin panjang lengan r → gaya kecil sudah cukup menghasilkan putaran besar.' },
      { id: 'force', label: 'Arah Gaya (θ = 90°)', note: 'Dorongan tegak lurus gagang (sin 90° = 1) memberi torsi paling besar. Dorongan sejajar gagang (sin 0° = 0) tidak memutar baut.' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 195" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram kunci pas memutar baut menunjukkan poros, lengan r, dan gaya tegak lurus F">
        {/* Gagang kunci pas */}
        <g onClick={() => onSelect('arm')} className="cursor-pointer">
          <rect x="95" y="90" width="275" height="22" rx="10" fill={activeId === 'arm' ? '#4f46e5' : '#94a3b8'} stroke="#334155" strokeWidth="2.5" />
          <line x1="100" y1="130" x2="345" y2="130" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 3" />
          <rect x="172" y="138" width="108" height="22" rx="6" fill={activeId === 'arm' ? '#4f46e5' : '#ffffff'} stroke="#4f46e5" strokeWidth="1.5" />
          <text x="226" y="153" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeId === 'arm' ? '#ffffff' : '#3730a3'}>
            Lengan Momen (r)
          </text>
        </g>
        {/* Baut poros */}
        <g onClick={() => onSelect('pivot')} className="cursor-pointer">
          <circle cx="95" cy="101" r="24" fill={activeId === 'pivot' ? '#0f172a' : '#475569'} stroke="#1e293b" strokeWidth="2.5" />
          <polygon points="95,87 107,94 107,108 95,115 83,108 83,94" fill="#e2e8f0" />
          <rect x="44" y="42" width="104" height="22" rx="6" fill={activeId === 'pivot' ? '#0f172a' : '#ffffff'} stroke="#334155" strokeWidth="1.5" />
          <text x="96" y="57" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'pivot' ? '#ffffff' : '#0f172a'}>
            Poros Baut (r = 0)
          </text>
        </g>
        {/* Gaya tegak lurus F */}
        <g onClick={() => onSelect('force')} className="cursor-pointer">
          <line x1="345" y1="26" x2="345" y2="82" stroke="#dc2626" strokeWidth="4" />
          <polygon points="345,90 337,76 353,76" fill="#dc2626" />
          <rect x="333" y="78" width="12" height="12" fill="none" stroke="#dc2626" strokeWidth="1.5" />
          <rect x="276" y="16" width="142" height="24" rx="6" fill={activeId === 'force' ? '#dc2626' : '#fef2f2'} stroke="#dc2626" strokeWidth="1.5" />
          <text x="347" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'force' ? '#ffffff' : '#b91c1c'}>
            ↓ Gaya F (θ = 90°, maksimal)
          </text>
        </g>
      </svg>
    )
  },

  /* ===== BAB 03 ELASTISITAS: SUSUNAN PEGAS SERI VS PARALEL ===== */
  e3: {
    title: 'Perbandingan Susunan Pegas: Paralel (Kaku) vs Seri (Lentur)',
    hint: 'Ketuk susunan paralel atau seri untuk melihat bedanya:',
    parts: [
      { id: 'paralel', label: 'Susunan Paralel (k_p = k₁ + k₂)', note: 'Dua pegas berdampingan membagi beban yang sama → sistem jadi lebih KAKU dan pertambahan panjangnya kecil (contoh: shockbreaker ganda motor).' },
      { id: 'seri', label: 'Susunan Seri (1/k_s = 1/k₁ + 1/k₂)', note: 'Dua pegas disambung memanjang merasakan gaya penuh masing-masing → sistem jadi lebih LENTUR dan melar lebih jauh!' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 205" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Perbandingan pegas paralel berdampingan dan pegas seri memanjang">
        {/* Kiri: Paralel */}
        <g onClick={() => onSelect('paralel')} className="cursor-pointer">
          <rect x="24" y="16" width="192" height="176" rx="12" fill={activeId === 'paralel' ? '#ecfdf5' : '#ffffff'} stroke={activeId === 'paralel' ? '#059669' : '#cbd5e1'} strokeWidth="2" />
          <rect x="65" y="34" width="110" height="8" rx="3" fill="#334155" />
          {/* 2 pegas berdampingan */}
          <path d="M 92 42 L 82 52 L 102 62 L 82 72 L 102 82 L 92 92" fill="none" stroke="#059669" strokeWidth="3" />
          <path d="M 148 42 L 138 52 L 158 62 L 138 72 L 158 82 L 148 92" fill="none" stroke="#059669" strokeWidth="3" />
          <rect x="78" y="92" width="84" height="8" rx="3" fill="#334155" />
          <rect x="100" y="100" width="40" height="28" rx="6" fill="#0f766e" />
          <text x="120" y="118" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">W</text>
          <text x="120" y="152" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">PARALEL (Lebih Kaku)</text>
          <text x="120" y="168" textAnchor="middle" fontSize="10" fill="#047857">k_p = k₁ + k₂ (Δx kecil)</text>
        </g>
        {/* Kanan: Seri */}
        <g onClick={() => onSelect('seri')} className="cursor-pointer">
          <rect x="244" y="16" width="192" height="176" rx="12" fill={activeId === 'seri' ? '#eff6ff' : '#ffffff'} stroke={activeId === 'seri' ? '#2563eb' : '#cbd5e1'} strokeWidth="2" />
          <rect x="290" y="34" width="100" height="8" rx="3" fill="#334155" />
          <path d="M 340 42 L 328 52 L 352 62 L 328 72 L 352 82 L 340 90 L 328 100 L 352 110 L 328 120 L 352 130 L 340 138" fill="none" stroke="#2563eb" strokeWidth="3" />
          <rect x="320" y="138" width="40" height="24" rx="6" fill="#1d4ed8" />
          <text x="340" y="154" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">W</text>
          <text x="340" y="177" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">SERI (Lebih Lentur)</text>
          <text x="340" y="190" textAnchor="middle" fontSize="10" fill="#1d4ed8">1/k_s = 1/k₁ + 1/k₂</text>
        </g>
      </svg>
    )
  },

  /* ===== BAB 04 GELOMBANG: ANATOMI GELOMBANG TRANSVERSAL ===== */
  g1: {
    title: 'Anatomi Gelombang Mekanik (Yang Berpindah Adalah Energi!)',
    hint: 'Ketuk panjang gelombang λ, amplitudo A, atau titik partikel:',
    parts: [
      { id: 'lambda', label: '1 Panjang Gelombang (λ)', note: 'Jarak 1 bukit + 1 lembah penuh. Pada medium yang sama (v tetap), jika frekuensi f naik, jarak λ ini memendek!' },
      { id: 'amp', label: 'Amplitudo (A)', note: 'Simpangan maksimum dari garis tengah. Makin besar A, makin besar energi atau makin keras bunyinya.' },
      { id: 'dot', label: 'Partikel Medium (Naik–Turun)', note: 'Titik tali atau gabus di air hanya bergetar naik-turun di tempat — tidak ikut hanyut bersama gelombang.' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 190" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram gelombang transversal menunjukkan panjang gelombang lambda, amplitudo A, dan partikel medium">
        {/* Garis setimbang */}
        <line x1="30" y1="100" x2="430" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
        {/* Kurva gelombang (2 gelombang penuh: 40..220 dan 220..400) */}
        <path d="M 40 100 Q 85 28 130 100 T 220 100 T 310 100 T 400 100" fill="none" stroke="#7c3aed" strokeWidth="4" />
        {/* Amplitudo A */}
        <g onClick={() => onSelect('amp')} className="cursor-pointer">
          <line x1="85" y1="100" x2="85" y2="64" stroke="#0284c7" strokeWidth="3" />
          <polygon points="85,56 79,68 91,68" fill="#0284c7" />
          <rect x="44" y="20" width="82" height="22" rx="6" fill={activeId === 'amp' ? '#0284c7' : '#ffffff'} stroke="#0284c7" strokeWidth="1.5" />
          <text x="85" y="35" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'amp' ? '#ffffff' : '#0369a1'}>
            Amplitudo (A)
          </text>
        </g>
        {/* Panjang gelombang λ */}
        <g onClick={() => onSelect('lambda')} className="cursor-pointer">
          <line x1="40" y1="158" x2="220" y2="158" stroke="#7c3aed" strokeWidth="2.5" />
          <line x1="40" y1="148" x2="40" y2="168" stroke="#7c3aed" strokeWidth="2" />
          <line x1="220" y1="148" x2="220" y2="168" stroke="#7c3aed" strokeWidth="2" />
          <rect x="78" y="164" width="104" height="22" rx="6" fill={activeId === 'lambda' ? '#7c3aed' : '#ffffff'} stroke="#7c3aed" strokeWidth="1.5" />
          <text x="130" y="179" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'lambda' ? '#ffffff' : '#5b21b6'}>
            1 Gelombang (λ)
          </text>
        </g>
        {/* Partikel medium naik-turun */}
        <g onClick={() => onSelect('dot')} className="cursor-pointer">
          <line x1="310" y1="42" x2="310" y2="132" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="310" cy="64" r="9" fill={activeId === 'dot' ? '#c2410c' : '#ea580c'} stroke="#ffffff" strokeWidth="2.5" />
          <rect x="260" y="16" width="146" height="22" rx="6" fill={activeId === 'dot' ? '#ea580c' : '#fff7ed'} stroke="#ea580c" strokeWidth="1.5" />
          <text x="333" y="31" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'dot' ? '#ffffff' : '#9a3412'}>
            Partikel (↕ di tempat saja)
          </text>
        </g>
      </svg>
    )
  },

  /* ===== BAB 05 KALOR: KONDUKSI, KONVEKSI (ANGIN LAUT) & RADIASI ===== */
  k2: {
    title: '3 Cara Kalor Berpindah di Sekitar Kita',
    hint: 'Ketuk Radiasi Matahari, Konveksi Angin Laut, atau Konduksi Logam:',
    parts: [
      { id: 'radiasi', label: 'Radiasi (Pancaran)', note: 'Panas matahari sampai ke bumi melewati ruang hampa tanpa butuh medium perantara.' },
      { id: 'konveksi', label: 'Konveksi (Angin Laut Pesisir)', note: 'Siang hari daratan Jeneponto lebih cepat panas daripada laut → udara hangat darat naik, udara sejuk dari laut mengalir ke darat (angin laut)!' },
      { id: 'konduksi', label: 'Konduksi (Hantaran Logam)', note: 'Kalor merambat lewat getaran partikel zat padat tanpa partikelnya berpindah. Sendok logam terasa dingin karena cepat menyerap panas tangan kita.' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 195" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Diagram radiasi matahari, konveksi angin laut pesisir, dan konduksi logam">
        {/* Radiasi Matahari */}
        <g onClick={() => onSelect('radiasi')} className="cursor-pointer">
          <circle cx="72" cy="44" r="22" fill={activeId === 'radiasi' ? '#ea580c' : '#f59e0b'} />
          <line x1="98" y1="54" x2="145" y2="80" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />
          <rect x="108" y="24" width="112" height="22" rx="6" fill={activeId === 'radiasi' ? '#ea580c' : '#fffbeb'} stroke="#f59e0b" strokeWidth="1.5" />
          <text x="164" y="39" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'radiasi' ? '#ffffff' : '#9a3412'}>
            Radiasi (Tanpa Medium)
          </text>
        </g>
        {/* Konveksi Angin Laut */}
        <g onClick={() => onSelect('konveksi')} className="cursor-pointer">
          <rect x="24" y="138" width="136" height="40" rx="6" fill="#38bdf8" opacity="0.6" />
          <text x="92" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Laut (Lebih Sejuk)</text>
          <rect x="160" y="138" width="136" height="40" rx="6" fill="#fde68a" />
          <text x="228" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">Darat (Cepat Panas)</text>
          {/* Siklus udara */}
          <path d="M 105 126 L 210 126" stroke="#0284c7" strokeWidth="3" />
          <polygon points="218,126 206,120 206,132" fill="#0284c7" />
          <path d="M 230 120 L 230 78" stroke="#dc2626" strokeWidth="3" />
          <polygon points="230,70 224,82 236,82" fill="#dc2626" />
          <rect x="92" y="88" width="128" height="22" rx="6" fill={activeId === 'konveksi' ? '#0284c7' : '#ffffff'} stroke="#0284c7" strokeWidth="1.5" />
          <text x="156" y="103" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeId === 'konveksi' ? '#ffffff' : '#0369a1'}>
            Konveksi (Angin Laut)
          </text>
        </g>
        {/* Konduksi Batang Logam */}
        <g onClick={() => onSelect('konduksi')} className="cursor-pointer">
          <rect x="318" y="28" width="122" height="150" rx="12" fill={activeId === 'konduksi' ? '#fff1f2' : '#ffffff'} stroke={activeId === 'konduksi' ? '#e11d48' : '#cbd5e1'} strokeWidth="2" />
          <rect x="338" y="96" width="84" height="14" rx="4" fill="url(#condGrad)" />
          <defs>
            <linearGradient id="condGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <text x="348" y="88" fontSize="10" fontWeight="bold" fill="#dc2626">🔥 Panas</text>
          <text x="380" y="132" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">Konduksi Logam</text>
          <text x="380" y="148" textAnchor="middle" fontSize="9.5" fill="#64748b">Kalor merambat →</text>
          <text x="380" y="162" textAnchor="middle" fontSize="9.5" fill="#64748b">partikel diam di tempat</text>
        </g>
      </svg>
    )
  },

  /* ===== BAB 06 TERMODINAMIKA: GRAFIK 4 PROSES P-V ===== */
  t2: {
    title: 'Membaca 4 Proses Termodinamika pada Grafik P–V',
    hint: 'Ketuk tiap garis proses untuk tahu ciri khasnya:',
    parts: [
      { id: 'isobarik', label: 'Isobarik (P tetap)', note: 'Garis mendatar. Tekanan konstan sehingga usaha piston mudah dihitung: W = P · ΔV.' },
      { id: 'isokhorik', label: 'Isokhorik (V tetap)', note: 'Garis tegak lurus. Volume tidak berubah (ΔV = 0), jadi usaha W = 0 dan seluruh kalor menaikkan energi dalam (Q = ΔU).' },
      { id: 'isotermal', label: 'Isotermal (T tetap)', note: 'Kurva melengkung landai. Suhu tetap (ΔU = 0), sehingga kalor masuk seluruhnya dipakai untuk usaha (Q = W).' },
      { id: 'adiabatik', label: 'Adiabatik (Q = 0)', note: 'Kurva lebih curam! Tidak ada kalor keluar-masuk (Q = 0), TETAPI suhu tetap berubah karena usaha mengubah energi dalam (ΔU = −W).' }
    ],
    renderSvg: (activeId, onSelect) => (
      <svg viewBox="0 0 460 205" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Grafik P-V menunjukkan proses isobarik, isokhorik, isotermal, dan adiabatik">
        {/* Sumbu P dan V */}
        <line x1="65" y1="22" x2="65" y2="172" stroke="#334155" strokeWidth="2.5" />
        <line x1="65" y1="172" x2="415" y2="172" stroke="#334155" strokeWidth="2.5" />
        <text x="50" y="28" fontSize="12" fontWeight="bold" fill="#0f172a">P</text>
        <text x="418" y="176" fontSize="12" fontWeight="bold" fill="#0f172a">V</text>
        {/* Titik awal */}
        <circle cx="135" cy="58" r="5" fill="#0f172a" />
        {/* Isobarik (mendatar) */}
        <g onClick={() => onSelect('isobarik')} className="cursor-pointer">
          <line x1="135" y1="58" x2="310" y2="58" stroke="#0284c7" strokeWidth={activeId === 'isobarik' ? 5 : 3.5} />
          <text x="318" y="62" fontSize="10.5" fontWeight="bold" fill="#0369a1">Isobarik (P tetap)</text>
        </g>
        {/* Isotermal (melengkung landai) */}
        <g onClick={() => onSelect('isotermal')} className="cursor-pointer">
          <path d="M 135 58 Q 210 96 310 112" fill="none" stroke="#059669" strokeWidth={activeId === 'isotermal' ? 5 : 3.5} />
          <text x="316" y="116" fontSize="10.5" fontWeight="bold" fill="#047857">Isotermal (T tetap)</text>
        </g>
        {/* Adiabatik (lebih curam) */}
        <g onClick={() => onSelect('adiabatik')} className="cursor-pointer">
          <path d="M 135 58 Q 185 118 265 152" fill="none" stroke="#dc2626" strokeWidth={activeId === 'adiabatik' ? 5 : 3.5} />
          <text x="272" y="156" fontSize="10.5" fontWeight="bold" fill="#b91c1c">Adiabatik (Q = 0)</text>
        </g>
        {/* Isokhorik (tegak) */}
        <g onClick={() => onSelect('isokhorik')} className="cursor-pointer">
          <line x1="135" y1="58" x2="135" y2="152" stroke="#7c3aed" strokeWidth={activeId === 'isokhorik' ? 5 : 3.5} />
          <text x="74" y="156" fontSize="10" fontWeight="bold" fill="#5b21b6">Isokhorik</text>
          <text x="74" y="168" fontSize="9.5" fill="#6d28d9">(V tetap)</text>
        </g>
      </svg>
    )
  }
};

export default function ConceptDiagram({ unitId }) {
  const diagram = DIAGRAMS[unitId];
  const [activeId, setActiveId] = useState(null);

  if (!diagram) return null;

  const activePart = diagram.parts.find((p) => p.id === activeId);

  return (
    <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-extrabold text-slate-800">{diagram.title}</span>
        <span className="text-xs text-slate-500">{diagram.hint}</span>
      </div>

      {diagram.renderSvg(activeId, (id) => setActiveId((prev) => (prev === id ? null : id)))}

      <div className="flex flex-wrap gap-2 justify-center">
        {diagram.parts.map((part) => (
          <button
            key={part.id}
            type="button"
            onClick={() => setActiveId((prev) => (prev === part.id ? null : part.id))}
            className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              activeId === part.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
            }`}
          >
            {part.label}
          </button>
        ))}
      </div>

      {activePart && (
        <p
          role="status"
          aria-live="polite"
          className="text-xs sm:text-sm font-medium text-blue-950 bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2.5 leading-relaxed"
        >
          <strong>{activePart.label}:</strong> {activePart.note}
        </p>
      )}
    </div>
  );
}
