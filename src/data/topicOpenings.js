/**
 * Data Pembuka Kontekstual (Apersepsi Lingkungan Sekitar & Transisi Masuk Materi)
 * Menghubungkan kehidupan sehari-hari siswa dengan konsep Fisika sebelum masuk ke materi inti.
 */

export const TOPIC_OPENINGS = {
  fluida: {
    greeting: 'Yuk, lihat sekeliling kita dulu sebelum kenal rumus!',
    headline: 'Air & Udara Ada di Mana-Mana — Pernah Menyadari Keajaibannya?',
    introStory:
      'Sebelum kita masuk ke pembahasan Fisika, coba bayangkan aktivitas yang sering kamu lakukan atau lihat di sekitar kita—mulai dari berenang, melihat perahu nelayan di pantai, sampai mencuci kendaraan di bengkel.',
    dailyScenes: [
      {
        emoji: '🏊‍♂️',
        title: 'Menyelam di Kolam / Pantai',
        story:
          'Saat kamu menyelam makin dalam, telinga tiba-tiba terasa pengap dan tertekan. Padahal airnya diam saja, kok bisa mendorong telingamu ya?'
      },
      {
        emoji: '⛵',
        title: 'Perahu Nelayan & Kapal Pinisi',
        story:
          'Perahu kayu dan kapal besi yang beratnya berton-ton bisa mengapung gagah di atas ombak laut, padahal batu kerikil kecil langsung mencemplung ke dasar!'
      },
      {
        emoji: '🚗',
        title: 'Dongkrak di Tempat Cuci Mobil',
        story:
          'Cukup menekan tuas kecil atau tombol pompa hidrolik, mobil seberat 1,5 ton bisa terangkat tinggi ke udara dengan sangat ringan!'
      }
    ],
    iceBreaker: {
      question: 'Tebak Santai (Tanpa Nilai, Bebas Jawab!): Kalau kamu melempar balok kayu dan batu kecil ke dalam kolam air, kenapa kayu membal balik ke atas sedangkan batu langsung tenggelam?',
      options: [
        {
          id: 'a',
          label: 'Karena air memberikan daya dorong ke atas yang lebih kuat dari berat kayu, tapi kalah kuat melawan berat batu!',
          response: 'Wih, insting fisikamu tajam banget! Betul sekali—air punya "daya dorong" ke atas yang bergantung pada kerapatan (massa jenis) dan volume benda.'
        },
        {
          id: 'b',
          label: 'Karena batu bentuknya keras, sedangkan kayu lebih empuk.',
          response: 'Tebakan yang menarik! Sebenarnya bukan soal keras atau empuknya lho—kapal baja yang super keras saja bisa mengapung! Penasaran rahasianya?'
        },
        {
          id: 'c',
          label: 'Belum yakin nih, pengen lihat buktinya langsung!',
          response: 'Nggak masalah sama sekali! Justru rasa penasaran itulah awal terbaik belajar fisika. Sebentar lagi kamu bakal lihat buktinya langsung lewat animasi air!'
        }
      ]
    },
    bridgeTitle: 'Nah, Semua Fenomena Tadi Dibahas di Bab Fluida!',
    bridgeText:
      'Semua zat yang bisa mengalir (air, minyak, madu, hingga udara) dalam Fisika disebut FLUIDA. Di materi inti berikut ini, kita nggak akan disuruh menghafal rumus kaku—melainkan membongkar rahasia di balik 3 keajaiban tadi secara santai!',
    previewPoints: [
      'Kenapa makin dalam menyelam, tekanan air makin kuat',
      'Rahasia daya dorong air yang bikin kayu terapung, telur melayang & batu tenggelam',
      'Cara kerja dongkrak hidrolik yang melipatgandakan tenaga tangan'
    ],
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu!)',
      text: 'Bayangkan kamu menumpuk 10 bantal di atas tanganmu dibanding cuma 2 bantal. Makin tinggi tumpukannya, makin berat dorongannya, kan? Nah, air di kolam itu persis seperti tumpukan bantal tak kasatmata! Makin dalam kamu menyelam, makin banyak tumpukan air di atasmu yang mendorong dari segala arah.'
    },
    mythVsFact: [
      {
        myth: '“Di danau yang luas banget, tekanan air di kedalaman 2 meter pasti jauh lebih besar daripada di kolam sempit kedalaman 2 meter.”',
        verdict: 'MITOS! ❌',
        fact: 'Tekanan air cuma peduli seberapa DALAM posisimu dan jenis cairannya—sama sekali nggak peduli wadahnya sempit atau seluas samudera!'
      },
      {
        myth: '“Batu yang tenggelam ke dasar kolam tetap mendapat gaya dorong ke atas dari air.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Air tetap mendorong batu ke atas, cuma dorongan airnya kalah kuat dibanding berat batu sehingga batu tetap turun ke dasar.'
      }
    ],
    miniSlider: {
      label: 'Coba Geser Kedalaman Menyelammu:',
      unit: 'meter',
      min: 0,
      max: 10,
      effectText: (v) =>
        v === 0
          ? 'Di permukaan air — telinga masih santai banget!'
          : v <= 3
          ? `Kedalaman ${v} m — mulai terasa dorongan halus di gendang telinga.`
          : v <= 7
          ? `Kedalaman ${v} m — tumpukan air di atasmu makin berat, tekanan terasa kuat!`
          : `Kedalaman ${v} m — tekanan sangat kuat! Penyelam profesional perlu teknik ekualisasi telinga.`
    }
  },

  rotasi: {
    greeting: 'Coba perhatikan pintu kamar dan kunci bengkel di rumahmu!',
    headline: 'Kenapa Gagang Pintu Selalu Dipasang Jauh dari Engsel?',
    introStory:
      'Setiap hari kamu membuka pintu, mengayuh sepeda, atau mungkin pernah main jungkat-jungkit. Tanpa sadar, tubuhmu sebenarnya sudah mempraktikkan prinsip Dinamika Rotasi setiap saat!',
    dailyScenes: [
      {
        emoji: '🚪',
        title: 'Mendorong Pintu Rumah',
        story:
          'Coba dorong pintu tepat di dekat engselnya—pasti terasa sangat berat! Tapi begitu didorong dari gagang pintu di ujung, satu jari saja cukup!'
      },
      {
        emoji: '🔧',
        title: 'Montir Membuka Baut Ban',
        story:
          'Saat baut ban motor macet, montir sering menyambung gagang kunci pas pakai pipa besi panjang supaya bautnya gampang diputar.'
      },
      {
        emoji: '⚖️',
        title: 'Bermain Jungkat-Jungkit',
        story:
          'Anak kecil yang ringan ternyata bisa mengangkat orang dewasa di jungkat-jungkit asalkan posisi duduknya diatur dengan pas!'
      }
    ],
    iceBreaker: {
      question: 'Tebak Santai: Supaya anak kecil (25 kg) bisa menyeimbangkan orang dewasa (50 kg) di jungkat-jungkit, di mana orang dewasa harus duduk?',
      options: [
        {
          id: 'a',
          label: 'Orang dewasa duduk lebih DEKAT ke titik tumpu tengah.',
          response: 'Tepat banget! Makin berat bebannya, makin dekat ia harus duduk ke poros tengah agar efek putarnya seimbang!'
        },
        {
          id: 'b',
          label: 'Orang dewasa duduk di ujung paling jauh dari tengah.',
          response: 'Wah, kalau duduk di ujung paling jauh, si anak kecil pasti langsung melambung ke atas terus tuh! 😄 Yuk kita lihat rahasia keseimbangannya di materi!'
        }
      ]
    },
    bridgeTitle: 'Inilah Dunia Dinamika Rotasi & Kesetimbangan!',
    bridgeText:
      'Kemampuan gaya untuk memutar benda (seperti pintu dan baut tadi) disebut Momen Gaya atau Torsi. Di bab ini kita akan melihat bagaimana jarak lengan dan gaya bekerja sama menjaga keseimbangan bangunan, jembatan, hingga jungkat-jungkit!',
    previewPoints: [
      'Rahasia Momen Gaya (Torsi) pada gagang pintu dan kunci bengkel',
      'Trik menyeimbangkan beban berat dan ringan di jungkat-jungkit',
      'Eksperimen langsung menggeser beban di simulasi papan torsi'
    ],
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu!)',
      text: 'Anggap engsel pintu adalah poros putar. Makin jauh jarak tanganmu dari engsel saat mendorong, makin sedikit tenaga yang kamu butuhkan untuk memutarnya. Itu sebabnya kunci bengkel dibuat panjang!'
    },
    mythVsFact: [
      {
        myth: '“Kalau kamu mendorong pintu sekuat tenaga tepat di engselnya, pintu akan terbuka lebih cepat.”',
        verdict: 'MITOS! ❌',
        fact: 'Jarak dari engsel = 0, jadi nggak ada daya putar (torsi = 0) sama sekali! Pintu nggak akan bergeming.'
      },
      {
        myth: '“Anak kecil bisa menyeimbangkan orang dewasa di jungkat-jungkit.”',
        verdict: 'FAKTA! ✅',
        fact: 'Bisa banget! Asalkan orang dewasa duduk lebih dekat ke titik tumpu tengah, sementara anak kecil duduk di ujung luar.'
      }
    ],
    miniSlider: {
      label: 'Geser Jarak Tanganmu dari Engsel Pintu:',
      unit: 'cm',
      min: 0,
      max: 80,
      effectText: (v) =>
        v <= 10
          ? 'Terlalu dekat engsel — berat banget, pintu hampir nggak mau berputar!'
          : v <= 45
          ? `Jarak ${v} cm — mulai terasa lebih ringan untuk didorong.`
          : `Jarak ${v} cm (dekat gagang) — super enteng, satu jari saja cukup memutar pintu!`
    }
  },

  elastisitas: {
    greeting: 'Pernah melewati jalan berlubang naik motor?',
    headline: 'Kenapa Shockbreaker Motor Bisa Bikin Perjalanan Tetap Empuk?',
    introStory:
      'Coba ingat benda-benda lentur di sekitarmu: karet gelang, kasur pegas, ketapel, hingga per shockbreaker motor. Semuanya punya kemampuan ajaib untuk melar lalu kembali ke bentuk semula!',
    dailyScenes: [
      {
        emoji: '🏍️',
        title: 'Shockbreaker Motor di Jalan Berlubang',
        story:
          'Saat roda menghantam lubang, per shockbreaker memendek menyerap hentakan lalu membal balik sehingga badanmu nggak ikut terlempar.'
      },
      {
        emoji: '🎯',
        title: 'Menarik Karet Ketapel',
        story:
          'Makin jauh karet ketapel kamu tarik ke belakang, makin kencang juga lontaran kerikilnya saat dilepaskan.'
      },
      {
        emoji: '🛏️',
        title: 'Kasur Springbed di Kamar',
        story:
          'Kenapa kasur menggunakan puluhan pegas yang dipasang berjajar (paralel), bukan cuma satu pegas besar di tengah?'
      }
    ],
    iceBreaker: {
      question: 'Tebak Santai: Menurutmu, mana yang lebih kaku dan kuat menahan beban berat—dua pegas yang disambung memanjang (seri) atau dipasang berdampingan (paralel)?',
      options: [
        {
          id: 'a',
          label: 'Dipasang berdampingan (Paralel), karena bebannya dibagi berdua!',
          response: 'Cerdas! Seperti dua orang mengangkat meja bersama-sama, pegas paralel jauh lebih kokoh dan kaku!'
        },
        {
          id: 'b',
          label: 'Disambung memanjang (Seri).',
          response: 'Uniknya, kalau disambung memanjang (seri) pegas justru makin lembek dan makin panjang melarnya lho! Yuk kita buktikan di materi & simulasi!'
        }
      ]
    },
    bridgeTitle: 'Selamat Datang di Konsep Elastisitas & Hukum Hooke!',
    bridgeText:
      'Sifat benda yang bisa kembali ke bentuk semula inilah yang dipelajari dalam Elastisitas. Kita akan kenalan secara santai dengan Hukum Hooke dan menguji langsung osilasi pegas yang membal secara halus!',
    previewPoints: [
      'Hubungan gaya beban dengan pertambahan panjang pegas',
      'Energi lontaran yang tersimpan pada ketapel & pegas',
      'Bedanya pegas seri dan paralel di dunia otomotif'
    ],
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu!)',
      text: 'Pegas itu seperti karet super kuat yang punya "memori bentuk". Makin berat benda yang kamu gantungkan, makin panjang ia melar—dan begitu beban dilepas, ia membal kembali sambil melepaskan tenaga simpanannya!'
    },
    mythVsFact: [
      {
        myth: '“Semua pegas pasti selalu kembali ke bentuk awal meskipun ditarik sekuat mungkin.”',
        verdict: 'MITOS! ❌',
        fact: 'Setiap bahan punya batas elastis. Kalau ditarik kelewatan, pegas akan melar permanen (plastis) atau bahkan putus!'
      },
      {
        myth: '“Menarik ketapel 2 kali lebih jauh menyimpan tenaga lontaran 4 kali lipat.”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul banget! Energi simpanan pegas sebanding dengan kuadrat tarikannya, makanya tarikan dikit lebih jauh lontarannya jauh lebih kencang.'
      }
    ],
    miniSlider: {
      label: 'Coba Tarik Karet Ketapelmu:',
      unit: 'cm',
      min: 0,
      max: 25,
      effectText: (v) =>
        v === 0
          ? 'Ketapel masih kendor — belum ada tenaga lontaran tersimpan.'
          : v <= 12
          ? `Tarikan ${v} cm — mulai terasa kencang, lontaran sedang.`
          : `Tarikan ${v} cm — energi potensial pegas melonjak tinggi, siap melesat jauh!`
    }
  },

  gelombang: {
    greeting: 'Dengarkan musik favoritmu atau lempar kerikil ke kolam!',
    headline: 'Bagaimana Suara Gitar & Riak Air Bisa Sampai ke Kita?',
    introStory:
      'Saat kamu mendengar lagu dari speaker atau melihat ombak pantai bergulung menuju daratan, ada satu hal menakjubkan yang sedang bekerja: energi sedang berpindah melalui getaran!',
    dailyScenes: [
      {
        emoji: '🪨',
        title: 'Riak Air di Kolam Tenang',
        story:
          'Lempar satu batu kecil ke kolam, maka lingkaran riak air menyebar ke tepi—tapi daun yang mengapung di atasnya cuma naik-turun di tempat!'
      },
      {
        emoji: '🎸',
        title: 'Petikan Senar Gitar',
        story:
          'Senar yang tipis bergetar sangat cepat menghasilkan nada tinggi, sedangkan senar tebal bergetar lebih lambat menghasilkan suara bass.'
      },
      {
        emoji: '🚑',
        title: 'Suara Sirine yang Melintas',
        story:
          'Pernah sadar suara sirine ambulans terdengar makin melengking saat mendekat, lalu langsung melandai rendah begitu lewat di depanmu?'
      }
    ],
    iceBreaker: {
      question: 'Tebak Santai: Ketika ombak kecil lewat di bawah perahu bebek di kolam, apakah air kolamnya ikut lari ke pinggir bersama ombak?',
      options: [
        {
          id: 'a',
          label: 'Nggak! Air dan perahunya cuma naik-turun, yang merambat itu energinya.',
          response: 'Keren banget! Itulah kunci paling penting dari gelombang mekanik—gelombang memindahkan energi, bukan memindahkan airnya.'
        },
        {
          id: 'b',
          label: 'Iya, airnya ikut mengalir deras ke pinggir.',
          response: 'Banyak orang mengira begitu lho! Tapi sebentar lagi di simulasi tali gelombang, kamu bisa lihat sendiri titik-titik medium cuma bergerak naik-turun di tempat!'
        }
      ]
    },
    bridgeTitle: 'Mari Mengenal Getaran, Gelombang & Bunyi!',
    bridgeText:
      'Dari riak kolam sampai musik yang kamu dengar lewat earphone, semuanya diatur oleh Amplitudo, Frekuensi, dan Panjang Gelombang. Yuk kita kupas secara visual tanpa pusing!',
    previewPoints: [
      'Kenapa partikel medium hanya naik-turun sementara gelombang maju',
      'Bedanya Amplitudo (keras suara) dan Frekuensi (tinggi nada)',
      'Simulasi gelombang berjalan 60 FPS secara real-time'
    ],
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu!)',
      text: 'Bayangkan penonton di stadion sepak bola melakukan "Mexican Wave" (gelombang penonton). Gelombangnya melaju keliling stadion, tapi orang-orangnya sendiri nggak pindah kursi—cuma berdiri lalu duduk lagi di tempat!'
    },
    mythVsFact: [
      {
        myth: '“Makin tinggi frekuensi suara gitar, makin keras volume suaranya.”',
        verdict: 'MITOS! ❌',
        fact: 'Frekuensi mengatur tinggi-rendahnya NADA (bass vs melengking), sedangkan keras-lemahnya volume diatur oleh AMPLITUDO!'
      },
      {
        myth: '“Gelombang memindahkan energi tanpa memindahkan partikel mediumnya.”',
        verdict: 'FAKTA! ✅',
        fact: 'Persis seperti ombak di kolam: riaknya menjalar ke tepi, sedangkan daun di permukaan cuma naik-turun di tempat.'
      }
    ],
    miniSlider: {
      label: 'Ubah Frekuensi Getaran Senar:',
      unit: 'Hz',
      min: 1,
      max: 10,
      effectText: (v) =>
        v <= 3
          ? `Frekuensi ${v} Hz — getaran pelan, menghasilkan nada rendah (bass).`
          : v <= 7
          ? `Frekuensi ${v} Hz — getaran sedang, nada menengah yang merdu.`
          : `Frekuensi ${v} Hz — getaran super cepat, menghasilkan nada tinggi yang nyaring!`
    }
  },

  kalor: {
    greeting: 'Pernah merasa udara di dalam ban motor terasa keras saat siang terik?',
    headline: 'Apa yang Terjadi di Dalam Benda Saat Suhunya Memanas?',
    introStory:
      'Saat kita memasak air di dapur atau memarkir sepeda di bawah sinar matahari terik, ada jutaan partikel super kecil tak kasatmata yang sedang bergerak liar di dalamnya!',
    dailyScenes: [
      {
        emoji: '🚲',
        title: 'Ban Sepeda di Terik Matahari',
        story:
          'Ban yang dipompa terlalu penuh bisa tiba-tiba meletus saat dijemur lama di siang hari. Padahal nggak ada yang nambah angin ke dalamnya!'
      },
      {
        emoji: '🫖',
        title: 'Memasak Air & Termos Panas',
        story:
          'Air butuh waktu lama untuk mendidih, dan begitu panas ia juga lama dinginnya—itu sebabnya air dipakai sebagai pendingin radiator mesin!'
      },
      {
        emoji: '🎈',
        title: 'Balon Udara Panas',
        story:
          'Dengan menyalakan pembakar api di bawah balon, udara di dalamnya memuai dan mengangkat balon raksasa terbang ke langit!'
      }
    ],
    iceBreaker: {
      question: 'Tebak Santai: Menurutmu, kenapa ban yang dipanaskan matahari tekanannya jadi naik padahal jumlah anginnya tetap?',
      options: [
        {
          id: 'a',
          label: 'Karena partikel udara di dalamnya jadi bergerak makin kencang dan menabrak dinding ban lebih keras!',
          response: 'Spot on! Di mata Fisika, "panas" itu artinya partikel penyusun benda sedang berlarian makin cepat!'
        },
        {
          id: 'b',
          label: 'Karena ukuran satu partikel udara membesar jadi raksasa.',
          response: 'Tebakan yang kreatif! Ukurannya tetap sama, tapi kecepatan geraknya yang melonjak drastis sehingga tumbukannya makin kuat. Yuk kita lihat di simulasi partikel!'
        }
      ]
    },
    bridgeTitle: 'Yuk Intip Dunia Mikroskopis Kalor & Gas Ideal!',
    bridgeText:
      'Di bab ini kita akan melihat langsung simulasi partikel-partikel gas yang memantul ketika suhu dipanaskan dan ruang volumenya dipersempit. Dijamin bikin kamu langsung "ngeh" tanpa menghafal!',
    previewPoints: [
      'Makna suhu sebagai laju gerak partikel mikroskopis',
      'Hubungan Suhu, Volume, dan Tekanan Gas (PV = nRT)',
      'Simulasi tumbukan partikel gas secara langsung'
    ],
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu!)',
      text: 'Bayangkan sebuah ruangan penuh bola pingpong yang memantul ke dinding. Kalau ruangan dipanaskan, bola-bola itu jadi berlari super kencang dan menabrak dinding makin keras—nah, tabrakan kencang itulah yang membuat tekanan gas naik!'
    },
    mythVsFact: [
      {
        myth: '“Ban motor mengeras di siang hari karena jumlah angin di dalamnya tiba-tiba bertambah sendiri.”',
        verdict: 'MITOS! ❌',
        fact: 'Jumlah partikel udaranya tetap sama, tapi karena kepanasan mereka bergerak makin kencang sehingga menumbuk dinding ban lebih keras!'
      },
      {
        myth: '“Suhu suatu benda sebenarnya menunjukkan seberapa cepat partikel di dalamnya bergerak.”',
        verdict: 'FAKTA! ✅',
        fact: 'Tepat sekali! Benda dingin = partikel bergerak lambat; benda panas = partikel berlarian super kencang.'
      }
    ],
    miniSlider: {
      label: 'Naikkan Suhu Ruang Gas:',
      unit: '°C',
      min: 20,
      max: 100,
      effectText: (v) =>
        v <= 40
          ? `Suhu ${v}°C — partikel udara bergerak santai, tekanan normal.`
          : v <= 75
          ? `Suhu ${v}°C — partikel mulai berlarian cepat, tumbukan ke dinding makin kuat!`
          : `Suhu ${v}°C — partikel bergerak liar berenergi tinggi, tekanan melonjak drastis!`
    }
  },

  termodinamika: {
    greeting: 'Bagaimana bensin cair bisa bikin motor melaju kencang?',
    headline: 'Rahasia Mengubah Energi Panas Menjadi Gerak Mesin!',
    introStory:
      'Setiap kali kamu menyalakan mesin motor, melihat uap panci mendorong tutup panci naik-turun, atau merasakan sejuknya AC ruangan, hukum Termodinamika sedang bekerja!',
    dailyScenes: [
      {
        emoji: '🍲',
        title: 'Tutup Panci yang Bergoyang Saat Air Mendidih',
        story:
          'Saat air di panci mendidih, uap panas mendorong tutup panci terangkat dan bergetar—energi panas berubah menjadi gerak dorong!'
      },
      {
        emoji: '🛵',
        title: 'Piston di Dalam Mesin Motor',
        story:
          'Ledakan panas pembakaran bensin memuaikan gas di dalam silinder sehingga mendorong piston bergerak memutar roda motor!'
      },
      {
        emoji: '❄️',
        title: 'Kulkas & AC Ruangan',
        story:
          'Kebalikan dari mesin motor: energi listrik dipakai untuk memindahkan panas keluar dari ruangan agar udara di dalam jadi sejuk.'
      }
    ],
    iceBreaker: {
      question: 'Tebak Santai: Ketika gas di dalam silinder mesin diberi panas (kalor), ke mana saja perginya energi panas tersebut?',
      options: [
        {
          id: 'a',
          label: 'Sebagian menaikkan suhu gas, sebagian lagi dipakai mendorong piston bergerak (Usaha)!',
          response: 'Brilian! Itulah inti dari Hukum I Termodinamika: tidak ada energi yang hilang, semuanya terbagi menjadi energi dalam dan usaha mekanik.'
        },
        {
          id: 'b',
          label: 'Semuanya langsung hilang menguap begitu saja.',
          response: 'Energi di alam semesta tidak pernah hilang begitu saja lho, ia hanya berubah bentuk! Yuk kita lihat cara kerjanya di materi dan simulasi piston!'
        }
      ]
    },
    bridgeTitle: 'Inilah Puncak Petualanganmu: Termodinamika!',
    bridgeText:
      'Kamu akan melihat bagaimana kalor (Q), energi dalam (ΔU), dan usaha dorong piston (W) saling bekerja sama di balik teknologi mesin modern!',
    previewPoints: [
      'Hukum I Termodinamika (Q = ΔU + W) secara visual',
      'Bagaimana pemuaian gas menghasilkan usaha dorong piston',
      'Simulasi silinder piston interaktif real-time'
    ],
    simpleAnalogy: {
      title: 'Bahasa Santainya (Tanpa Rumus Dulu!)',
      text: 'Anggap energi panas seperti uang jajan yang masuk ke gas. Uang itu cuma bisa dipakai untuk dua hal: ditabung di dalam gas (bikin gas makin panas) ATAU dibelanjakan untuk kerja fisik (mendorong piston mesin bergerak)!'
    },
    mythVsFact: [
      {
        myth: '“Energi panas di dalam mesin bisa diubah 100% seluruhnya menjadi gerak tanpa ada panas yang terbuang.”',
        verdict: 'MITOS! ❌',
        fact: 'Menurut Hukum II Termodinamika, selalu ada sebagian panas yang terbuang ke lingkungan—itulah kenapa knalpot mesin motor selalu panas!'
      },
      {
        myth: '“Jika volume tabung terkunci rapat tidak bisa memuai, maka gas tidak melakukan usaha mekanik (W = 0).”',
        verdict: 'FAKTA! ✅',
        fact: 'Betul! Karena nggak ada piston yang terdorong bergeser, seluruh panas yang masuk dipakai menaikkan suhu gas.'
      }
    ],
    miniSlider: {
      label: 'Atur Suplai Panas ke Silinder Mesin:',
      unit: 'Joule',
      min: 100,
      max: 1000,
      effectText: (v) =>
        v <= 300
          ? `Kalor ${v} J — gas baru hangat, piston mulai bergerak perlahan.`
          : v <= 700
          ? `Kalor ${v} J — gas memuai kuat, piston terdorong maju melakukan usaha!`
          : `Kalor ${v} J — dorongan piston maksimal! Energi panas berubah menjadi kerja mekanik besar.`
    }
  }
};
