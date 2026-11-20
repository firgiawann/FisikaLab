# FisikaLab XI — Platform Multimedia Pembelajaran Interaktif Fisika SMA (Full-Stack MDLC)

Platform multimedia pembelajaran interaktif berbasis web untuk **Fisika Kelas XI (Kurikulum Merdeka Fase F)** yang dikembangkan menggunakan model **Multimedia Development Life Cycle (MDLC)** dan **12 Prinsip Pembelajaran Multimedia Richard E. Mayer (2021)**, mengacu pada Proposal Penelitian **Firgiawan Listianto (SMAN 3 Jeneponto)**.

🌐 **Akses Live di GitHub Pages**: [https://firgiawann.github.io/FisikaLab/](https://firgiawann.github.io/FisikaLab/)

---

## Tech Stack & Arsitektur

- **Frontend Modular**: **React 18 + Vite** (`src/pages/`, `src/simulations/`, `src/games/`, `src/components/`, `src/data/`)
- **UI & Animasi**: **Tailwind CSS + Framer Motion + Lucide Icons + KaTeX (Formula Render)**
- **Diagram Konseptual Interaktif**: **SVG Dinamis Berbasis Prinsip Mayer** (Interaksi parameter real-time untuk 10 konsep esensial)
- **Mesin Fisika 60 FPS**: **HTML5 Canvas 2D Physics Engine** (Simulasi riak air 1D, partikel gelembung/cipratan, gaya apung Archimedes, torsi jungkat-jungkit, osilasi pegas Hooke 3 mode, gelombang sinusoidal, partikel kinetik gas ideal, dan piston termodinamika P-V)
- **Dual-Mode Deployment**:
  1. **Mode Standalone / GitHub Pages**: Berjalan 100% di browser tanpa backend (menggunakan localStorage untuk persistensi progres, level XP, dan kuis).
  2. **Mode Full-Stack Kelas**: **Node.js (v22) + Express + SQLite (`node:sqlite`)** dengan otentikasi JWT, database terpusat, dan dashboard analitik guru real-time.

---

## Fitur Utama

1. **Welcoming Hero Page & Dual-Role Login (Siswa vs Guru)**:
   - Preview visual simulasi fisika interaktif & jenjang level.
   - 2 Opsi Masuk: **Portal Petualangan Siswa** dan **Portal Guru / Tenaga Pendidik** (tersedia tombol 1-Klik Akun Demo).
2. **6 Modul Lengkap (20 Sub-Unit) Fisika Kelas XI Kurikulum Merdeka Fase F**:
   - **Bab 01 Fluida (5 Unit)**: Tekanan & Massa Jenis, Tekanan Hidrostatis (Konsep Kedalaman vs Ketinggian), Hukum Pascal (Dongkrak Hidrolik), Hukum Archimedes (Gaya Apung & Kapal Pinisi), dan Viskositas & Hukum Stokes.
   - **Bab 02 Dinamika Rotasi (3 Unit)**: Torsi & Lengan Gaya (Momen Inersia Kunci Pas), Momen Inersia & Benda Menggelinding, serta Kesetimbangan Benda Tegar.
   - **Bab 03 Elastisitas & Hukum Hooke (3 Unit)**: Tegangan, Regangan, Modulus Young; Hukum Hooke & Energi Potensial Pegas; serta Susunan Pegas Seri vs Paralel.
   - **Bab 04 Getaran, Gelombang & Bunyi (3 Unit)**: Anatomi Gelombang Transversal & Cepat Rambat ($v$ medium konstan, $f \uparrow \implies \lambda \downarrow$); Gelombang Bunyi, Resonansi & Efek Doppler; serta Gelombang Stasioner & Interferensi.
   - **Bab 05 Kalor & Teori Kinetik Gas (3 Unit)**: Kalor, Kapasitas & Asas Black; Perpindahan Kalor Konveksi (Angin Laut & Darat Jeneponto); serta Teori Kinetik Gas & Persamaan Gas Ideal.
   - **Bab 06 Termodinamika (3 Unit)**: Usaha Luar & Diagram P-V (4 Proses Termodinamika: Isobarik, Isokhorik, Isotermal, Adiabatik); Hukum I Termodinamika; serta Hukum II & Efisiensi Mesin Carnot.
3. **Diagram Konsep Interaktif & Contoh Perhitungan Bertahap**:
   - Dilengkapi diagram SVG interaktif dengan slider parameter visual.
   - Setiap unit memiliki fitur *workedExample* (Contoh Perhitungan Langkah-demi-Langkah) yang dapat dibuka/tutup untuk scaffolding kognitif siswa.
4. **Alur Pedagogis 5E Learning Cycle + POE (Predict-Observe-Explain)**:
   - Pembuka kontekstual (Engage & Predict) $\to$ Eksplorasi materi & simulasi (Explore & Observe) $\to$ Penjelasan rumus & miskonsepsi (Explain) $\to$ Arena mini-game tantangan (Elaborate) $\to$ Evaluasi diagnostik C2–C4 & refleksi metakognitif (Evaluate).
5. **Simulasi Fisika 60 FPS Canvas 2D**:
   - Simulasi bejana air dengan 3 perilaku benda nyata (Kayu terapung, Telur melayang, Batu tenggelam dengan efek gelembung dan riak air).
   - Mode pegas dinamis (Tunggal, Paralel, Seri) dan gelombang riak real-time.
6. **Sistem Gembok Bertahap (Sequential Locking) & "Arahan Guru yang Lembut"**:
   - Siswa diarahkan menyelesaikan modul prasyarat terlebih dahulu sebelum membuka unit berikutnya.
   - Tombol buka kunci darurat tersedia untuk guru/evaluator.
7. **Dashboard Analitik Guru (`TeacherDashboard.jsx`)**:
   - Pemantauan progres kelas real-time, deteksi miskonsepsi siswa, kontrol buka gembok global, dan ekspor laporan progres nilai ke CSV.

---

## Cara Menjalankan

### 1. Menjalankan di Mode Development (Lokal)
```bash
# Menjalankan Backend Express (port 3005) dan Frontend Vite (port 5173) secara bersamaan:
npm run dev
```
Buka browser di `http://localhost:5173`.

### 2. Menjalankan Mode Production Server Penuh (Node.js + SQLite)
```bash
npm run build
npm start
```
Buka browser di `http://localhost:3005`.

### 3. Build untuk Static Web / GitHub Pages
```bash
npm run build
```
Folder `dist/` siap di-hosting di GitHub Pages, Vercel, Netlify, atau web server statis manapun secara otomatis.

---

## Deployment ke GitHub Pages

Proyek ini telah dikonfigurasi dengan **GitHub Actions** (`.github/workflows/deploy.yml`):
1. Masuk ke halaman repositori di GitHub: `https://github.com/firgiawann/FisikaLab`
2. Buka menu **Settings** > **Pages**.
3. Pada bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.
4. Begitu kode di-push ke branch `main`, GitHub Actions akan otomatis melakukan build dan menerbitkan web ke `https://firgiawann.github.io/FisikaLab/`.
