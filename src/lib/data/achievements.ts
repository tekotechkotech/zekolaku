import type { AchievementDetail } from '$lib/types';

export const achievementsData: AchievementDetail[] = [
	// Prestasi Siswa - Internasional & Nasional - Akademik & Non-Akademik
	{
		id: 'mhq-dubai-2026',
		title: 'Juara 1 Musabaqah Hifdzil Qur’an (MHQ) 30 Juz Tingkat Internasional',
		winner: 'Muhammad Hafizh Al-Ghifari (Santri Kelas XII)',
		role: 'Siswa',
		scope: 'Non-Akademik',
		category: 'Tahfidz & Al-Qur’an',
		level: 'Internasional',
		year: 2026,
		organizer: 'Dubai International Holy Quran Award (DIHQA), Uni Emirat Arab',
		description:
			'Meraih peringkat pertama dalam hafalan 30 juz mutqin dengan nilai fashahah dan tajwid sempurna 99.4, bersaing dengan hafizh muda dari 65 negara.',
		badgeVariant: 'amber',
		featured: true
	},
	{
		id: 'osn-fisika-2025',
		title: 'Medali Emas Olimpiade Sains Nasional (OSN) Bidang Fisika',
		winner: 'Faris Raihan An-Nafi (Santri Kelas XI)',
		role: 'Siswa',
		scope: 'Akademik',
		category: 'Sains & MIPA',
		level: 'Nasional',
		year: 2025,
		organizer: 'Balai Pengembangan Talenta Indonesia (BPTI) - Kemendikbudristek RI',
		description:
			'Menyabet medali emas dan penghargaan Best Theory dalam pemecahan soal mekanika analitik dan elektrodinamika tingkat SMA sederajat.',
		badgeVariant: 'emerald',
		featured: true
	},
	{
		id: 'isif-iot-2025',
		title: 'Silver Medal & Special Award International Science and Invention Fair (ISIF)',
		winner: 'Tim Robotika Madani (Ahmad Zaky, Ilham Fauzi & Rayhan Kamil)',
		role: 'Siswa',
		scope: 'Akademik',
		category: 'Robotika & Rekayasa Sains',
		level: 'Internasional',
		year: 2025,
		organizer: 'Indonesian Young Scientist Association (IYSA) & Universitas Udayana',
		description:
			'Inovasi sistem pemantau kualitas air wudhu berbasis IoT dan sensor mikrokontroler dengan efisiensi filtrasi otomatis.',
		badgeVariant: 'amber',
		featured: true
	},
	{
		id: 'debat-arab-2025',
		title: 'Juara 1 Debat Bahasa Arab Nasional Tingkat SMA/MA',
		winner: 'Tim Bahasa Arab Madani (Zahra Nurul Izzah, Nabila Syifa, Wildan R.)',
		role: 'Siswa',
		scope: 'Akademik',
		category: 'Bahasa & Diplomasi',
		level: 'Nasional',
		year: 2025,
		organizer: 'Festival Timur Tengah Universitas Indonesia (FASST UI)',
		description:
			'Menumbangkan 32 tim perwakilan SMA unggulan se-Indonesia dalam topik geopolitik Islam kontemporer dan diplomasi kemanusiaan.',
		badgeVariant: 'navy',
		featured: true
	},
	{
		id: 'silat-kejurnas-2025',
		title: 'Juara 1 Tanding Kelas C Putra Kejurnas Pencak Silat Tapak Suci',
		winner: 'Ihsan Maulana (Santri Kelas XI)',
		role: 'Siswa',
		scope: 'Non-Akademik',
		category: 'Olahraga & Seni Bela Diri',
		level: 'Nasional',
		year: 2025,
		organizer: 'Pengurus Besar Tapak Suci Putera Muhammadiyah & Kemenpora',
		description:
			'Meraih medali emas setelah 5 kali kemenangan berturut-turut pada babak penyisihan hingga partai final kelas tanding tarung bebas putra.',
		badgeVariant: 'navy',
		featured: false
	},
	{
		id: 'lkti-kemenag-2024',
		title: 'Juara Umum 1 Lomba Karya Tulis Ilmiah Remaja Madrasah/SMA Nasional',
		winner: 'Aisyah Putri & Nadira Safira (Santriwati Kelas XI)',
		role: 'Siswa',
		scope: 'Akademik',
		category: 'Riset Sosial Humaniora',
		level: 'Nasional',
		year: 2024,
		organizer: 'Direktorat KSKK Madrasah Kementerian Agama RI',
		description:
			'Penelitian lapangan tentang efektivitas metode halaqah peer-tutoring santri dalam meningkatkan literasi keuangan syariah generasi Z.',
		badgeVariant: 'emerald',
		featured: false
	},
	{
		id: 'panahan-provinsi-2025',
		title: 'Medali Emas Divisi Barebow 30 Meter Kejurda Panahan Pelajar',
		winner: 'Khalid Abdullah (Santri Kelas X)',
		role: 'Siswa',
		scope: 'Non-Akademik',
		category: 'Olahraga Sunnah',
		level: 'Provinsi',
		year: 2025,
		organizer: 'Pengprov PERPANI Jawa Barat',
		description:
			'Mencatatkan skor tertinggi 348 poin dari total 360 poin seri tembakan busur panahan tradisional pelajar Jawa Barat.',
		badgeVariant: 'blue',
		featured: false
	},
	{
		id: 'kaligrafi-jabar-2024',
		title: 'Juara 1 Musabaqah Khattil Qur’an (Kaligrafi) Golongan Hiasan Mushaf',
		winner: 'Fatimah Az-Zahra (Santriwati Kelas XII)',
		role: 'Siswa',
		scope: 'Non-Akademik',
		category: 'Seni & Kaligrafi Islam',
		level: 'Provinsi',
		year: 2024,
		organizer: 'Lembaga Pengembangan Tilawatil Qur’an (LPTQ) Jawa Barat',
		description:
			'Karya ornamen iluminasi mushaf Al-Qur’an dengan ketepatan kaidah khat Tsuluts dan keindahan estetika warna floral alami.',
		badgeVariant: 'blue',
		featured: false
	},

	// Prestasi Guru & Pembina
	{
		id: 'guru-inspiratif-2025',
		title: 'Penghargaan Pendidik Inspiratif Inovasi Pembelajaran Sains Berbasis IT',
		winner: 'Ust. Hendra Gunawan, M.Si. (Guru Fisika & Pembina Riset)',
		role: 'Guru',
		scope: 'Akademik',
		category: 'Inovasi Pendidikan Guru',
		level: 'Nasional',
		year: 2025,
		organizer: 'Direktorat Guru dan Tenaga Kependidikan Kemendikbudristek RI',
		description:
			'Pencipta media simulator laboratorium virtual fisika terpadu yang telah diadopsi oleh puluhan madrasah dan SMA di Indonesia.',
		badgeVariant: 'emerald',
		featured: true
	},
	{
		id: 'guru-sanad-tahfidz-2025',
		title: 'Pemegang Sanad Qira’ah ‘Asyrah Shughra Muttashil ke Rasulullah SAW',
		winner: 'Ust. H. Syahrul Ramadhan, Al-Hafizh, Lc., M.Ag. (Koordinator Tahfidz)',
		role: 'Guru',
		scope: 'Non-Akademik',
		category: 'Keagamaan & Sanad Al-Qur’an',
		level: 'Internasional',
		year: 2025,
		organizer: 'Lajnah Ilmiyah Markaz Al-Imam Al-Jazariy, Madinah Munawwarah',
		description:
			'Penganugerahan sanad resmi pembacaan 10 imam qira’ah dengan jalur periwayatan yang bersambung langsung tanpa terputus.',
		badgeVariant: 'amber',
		featured: true
	},
	{
		id: 'guru-karya-ilmiah-2024',
		title: 'Best Paper Award Konferensi Internasional Pendidikan Islam Terpadu',
		winner: 'Dr. Hj. Siti Maryam, M.Pd. (Guru Bahasa Arab & Kurikulum)',
		role: 'Guru',
		scope: 'Akademik',
		category: 'Riset Pendidikan Internasional',
		level: 'Internasional',
		year: 2024,
		organizer: 'International Consortium on Islamic Boarding School Studies (ICIBS)',
		description:
			'Publikasi ilmiah mengenai integrasi kurikulum Cambridge dan kurikulum pesantren salaf dalam penguatan karakter santri.',
		badgeVariant: 'navy',
		featured: false
	},
	{
		id: 'guru-pembina-robotik-2024',
		title: 'Outstanding STEM Coach of The Year Bidang Robotika Pelajar',
		winner: 'Ust. Rian Aditya, S.T., M.Kom. (Pembina Ekstrakurikuler Robotika)',
		role: 'Guru',
		scope: 'Akademik',
		category: 'STEM & Robotika',
		level: 'Nasional',
		year: 2024,
		organizer: 'Komunitas Pendidik Sains dan Teknologi Indonesia (KPSTI)',
		description:
			'Dedikasi membimbing tim santri menembus panggung kompetisi sains global secara konsisten selama 4 tahun berturut-turut.',
		badgeVariant: 'emerald',
		featured: false
	}
];
