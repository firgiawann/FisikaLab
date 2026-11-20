# Analisis Proposal dan Rancangan Tim Multimedia Pembelajaran

## Status keputusan

**REVISE MAYOR — layak dilanjutkan setelah revisi, belum layak masuk produksi penuh.**

Proposal kuat pada konteks masalah, pemilihan MDLC, pembatasan satu materi, posisi media sebagai pendamping guru, dan kebutuhan responsif. Namun materi final, hasil elisitasi, indikator TP, peta miskonsepsi, asesmen, keterampilan proses, aksesibilitas, serta penerapan lengkap 12 prinsip Mayer belum operasional.

Topik **Fluida** digunakan sebagai baseline karena paling rinci dalam proposal. Ini bukan klaim bahwa hasil elisitasi telah memilih Fluida.

## Temuan utama tim

1. Beberapa dugaan awal ditulis sebagai fakta: literasi digital tinggi, Android sebagai perangkat utama, kejenuhan, distraksi, dan internet bukan kendala. Ubah menjadi variabel elisitasi sampai ada data.
2. CP/TP masih terlalu umum. Jika Fluida dipilih, rancangan harus mencakup pemahaman konsep, keterampilan proses, dan karya penerapan hukum fluida.
3. Asesmen baru berupa latihan dan skor akhir. Dibutuhkan diagnostik prasyarat/miskonsepsi, formatif per segmen, sumatif per TP, rubrik penyelidikan/karya, remediasi, dan pengayaan.
4. Simulasi eksplorasi bebas berisiko menjadi aktivitas menggeser slider. Gunakan Predict–Observe–Explain dan kontrol satu variabel pada mode terbimbing.
5. Proposal baru menyebut coherence, signaling, segmenting, spatial contiguity. Tambahkan redundancy, temporal contiguity, pre-training, modality, multimedia, personalization, voice, dan image.
6. Klaim “gaya belajar visual/verbal/kinestetik” sebaiknya diganti dengan kebutuhan representasi dan akses beragam. Media dipilih berdasarkan fungsi konsep, bukan label gaya belajar.
7. Daftar pustaka entri [2] rusak/duplikat. Acuan CP 2022 juga harus diperbarui terhadap dokumen resmi yang berlaku saat finalisasi.

## Bentuk produk yang disepakati

Web statis interaktif mobile-first/PWA tanpa akun pada MVP. Mode utama: belajar mandiri di ponsel, pembelajaran terbimbing guru, demonstrasi proyektor, dan kelompok kecil saat perangkat terbatas.

Alur belajar: **Phenomenon → Predict → Explore → Explain → Practice → Reflect → Evaluate**.

Arsitektur produk penuh:

1. Beranda dan peta belajar.
2. Diagnostik prasyarat.
3. Fluida dan massa jenis.
4. Tekanan hidrostatis.
5. Hukum Pascal.
6. Hukum Archimedes.
7. Debit dan kontinuitas.
8. Bernoulli beserta batas model ideal.
9. Proyek/karya sederhana.
10. Evaluasi per TP, hasil, dan remediasi.

Fitur yang ditunda: akun, basis data nilai, dasbor guru, leaderboard, forum, video panjang, dan personalisasi AI.

## Material Collecting baseline

### Prasyarat

Satuan SI dan konversi; massa vs berat; gaya; luas/volume; aljabar; perbandingan; grafik; energi mekanik sebelum Bernoulli.

### Urutan konsep

Sifat fluida → massa jenis → tekanan → tekanan hidrostatis → Pascal → Archimedes → debit → kontinuitas → Bernoulli → aplikasi/karya.

### Konteks calon

- Tandon rumah/sekolah: tekanan hidrostatis dan debit.
- Dongkrak/rem hidrolik: Pascal dan pertukaran gaya–perpindahan.
- Telur dalam air garam: massa jenis dan gaya apung.
- Kapal pinisi: Archimedes dan volume terdesak, dengan catatan stabilitas kapal tidak boleh direduksi menjadi satu hukum.
- Saluran air/irigasi: debit dan kontinuitas, tanpa mereduksi Subak menjadi persoalan teknis semata.

### Miskonsepsi prioritas

Tekanan = gaya; tekanan bergantung bentuk wadah; tekanan hanya ke bawah; benda tenggelam karena massanya besar; gaya apung hanya pada benda terapung; gaya apung selalu sama dengan berat; gaya apung benda tercelup penuh bertambah dengan kedalaman; mesin hidrolik menciptakan energi; pipa sempit selalu memperkecil debit; “lebih cepat selalu lebih rendah tekanannya”; Bernoulli berlaku tepat untuk semua aliran nyata.

### Aset yang dibuat sendiri

SVG diagram tekanan, simulasi hidrostatik/Pascal/Archimedes/kontinuitas, grafik, bank soal, naskah, feedback, caption/transkrip, peta konsep, serta test vector perhitungan.

### Aset eksternal

Foto/video pinisi, Subak, dan data konteks harus memiliki pencipta, URL langsung, tanggal akses, lisensi, atribusi, dan catatan adaptasi. Jangan mengambil dari hasil pencarian tanpa verifikasi lisensi.

## Penerapan 12 prinsip Mayer

1. **Multimedia:** kata + visual yang menjelaskan hubungan.
2. **Coherence:** hilangkan musik/dekorasi/animasi tanpa fungsi.
3. **Signaling:** sorot titik, vektor, variabel, dan perubahan grafik.
4. **Redundancy:** hindari paragraf yang identik dengan narasi dan visual.
5. **Spatial contiguity:** label dekat objek/grafik terkait.
6. **Temporal contiguity:** perubahan visual dan penjelasan tampil bersamaan.
7. **Segmenting:** satu gagasan inti per segmen; pengguna mengendalikan lanjut/ulang.
8. **Pre-training:** kenalkan simbol, satuan, komponen, dan kontrol sebelum simulasi.
9. **Modality:** narasi opsional untuk visual kompleks; teks tetap tersedia untuk aksesibilitas.
10. **Personalization:** bahasa percakapan akademik yang lugas.
11. **Voice:** jika ada audio, gunakan suara manusia yang jelas setelah uji pengguna.
12. **Image:** wajah/Avatar tidak ditambahkan jika tidak membantu belajar.

## Kriteria penerimaan

- Materi, soal, jawaban, feedback, dan model fisika disahkan guru/ahli.
- Setiap TP memiliki aktivitas serta minimal dua bukti asesmen.
- Alur inti dapat digunakan tanpa mouse dan tanpa audio.
- Fallback tetap memungkinkan belajar bila simulasi/video gagal.
- Progres tidak hilang saat reload pada perangkat sama.
- Perhitungan lulus nilai batas dan kasus normal.
- Android kelas bawah dan jaringan lambat diuji nyata.
- Uji formatif melibatkan 5–8 siswa sasaran dan minimal satu guru sebelum assembly penuh.

## Sumber awal yang perlu dipakai saat finalisasi

- BSKAP Kemendikdasmen, *Panduan Mata Pelajaran Fisika Fase F SMA/MA* (2025): https://repositori.kemendikdasmen.go.id/33601/
- Keputusan Kepala BSKAP tentang CP yang berlaku saat finalisasi (cek versi mutakhir; hasil penelusuran menemukan Nomor 046/H/AN/2025 yang mencabut Nomor 032/H/KR/2024).
- Mayer, R. E. (2021), *Multimedia Learning*, edisi ketiga.
- Modul Fluida Statis Kemendikbud (2020): http://repositori.kemdikbud.go.id/id/eprint/22209
- Modul Fluida Dinamis Kemendikbud (2020): http://repositori.kemdikbud.go.id/id/eprint/22208
- PhET *Fluid Pressure and Flow* sebagai referensi desain simulasi, bukan aset otomatis: https://phet.colorado.edu/en/simulation/fluid-pressure-and-flow

## Gerbang MDLC berikutnya

1. Validasi topik dan ATP dengan guru.
2. Jalankan wawancara, angket, observasi, dan audit perangkat/jaringan.
3. Uji vertical slice ini kepada siswa dan guru.
4. Revisi bahasa, kontrol, feedback, dan performa.
5. Baru kumpulkan/produksi seluruh aset dan rakit modul penuh.
