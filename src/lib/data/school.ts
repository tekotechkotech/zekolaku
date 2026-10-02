import type {
	SchoolProfile,
	NavItem,
	Pillar,
	StatItem,
	PPDBInfo
} from '$lib/types';

export const schoolData: SchoolProfile = {
	name: 'SMA & Pesantren Terpadu Madani Global',
	shortName: 'Madani Global',
	type: 'Sekolah Menengah Atas Terpadu Berasrama',
	tagline: 'Integrasi Iman, Adab, dan Sains Modern Menuju Pemimpin Masa Depan',
	npsn: '69987210',
	nsm: '131232010045',
	accreditation: 'A (Unggul) - BAN-S/M',
	establishedYear: 2012,
	contact: {
		address: 'Jl. Peradaban Madani No. 99, Cimenyan',
		city: 'Kab. Bandung',
		province: 'Jawa Barat',
		postalCode: '40197',
		phone: '(022) 8765-4321',
		whatsapp: '+62 812-3456-7890',
		whatsappUrl: 'https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20Madani%20Global,%20saya%20ingin%20berkonsultasi',
		email: 'info@madaniglobal.sch.id',
		hours: 'Senin - Sabtu: 07.30 - 16.00 WIB',
		googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862234!2d107.5731165!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e215b5!2sBandung!5e0!3m2!1sid!2sid!4v1600000000000',
		googleMapsUrl: 'https://maps.google.com'
	},
	socials: {
		instagram: 'https://instagram.com/madaniglobal',
		youtube: 'https://youtube.com/@madaniglobal',
		facebook: 'https://facebook.com/madaniglobalschool',
		tiktok: 'https://tiktok.com/@madaniglobal'
	},
	vision:
		'Menjadi lembaga pendidikan terpadu teladan bertaraf global yang melahirkan generasi muttaqin, beradab luhur, mandiri, dan unggul dalam penguasaan sains dan teknologi modern.',
	missions: [
		'Menanamkan aqidah shahihah, pembiasaan ibadah shahihah, serta akhlakul karimah berbasis Al-Qur’an dan As-Sunnah.',
		'Menyelenggarakan kurikulum terpadu yang menyinergikan Kurikulum Nasional, Cambridge International, dan Dirasah Islamiyah.',
		'Membina program Tahfidzul Qur’an mutqin dengan metodologi tartil dan pemahaman tadabbur.',
		'Menumbuhkan budaya riset, penguasaan sains terapan, kecakapan digital, dan literasi multibahasa (Arab & Inggris).',
		'Mewujudkan iklim asrama yang aman, sehat, humanis, serta berwawasan lingkungan hijau (Eco-Pesantren).'
	],
	values: [
		{
			title: 'Integritas & Adab',
			description: 'Mendahulukan adab sebelum ilmu dan senantiasa jujur serta bertanggung jawab dalam setiap amanah.'
		},
		{
			title: 'Spirit Qur’ani',
			description: 'Menjadikan kalam Ilahi sebagai inspirasi berpikir, beribadah, dan berinteraksi sehari-hari.'
		},
		{
			title: 'Keunggulan Akademik',
			description: 'Daya juang ilmiah tinggi, berpikir kritis, serta berani berinovasi memecahkan masalah nyata.'
		},
		{
			title: 'Kemandirian & Disiplin',
			description: 'Tangguh dalam mengelola waktu, emosi, kesehatan diri, serta siap hidup berdampingan di asrama.'
		},
		{
			title: 'Wawasan Global',
			description: 'Cakap berkomunikasi internasional dengan identitas kebangsaan yang kokoh.'
		}
	],
	history: {
		summary:
			'SMA & Pesantren Terpadu Madani Global didirikan pada tahun 2012 oleh Yayasan Bina Peradaban Madani atas inisiasi para akademisi, ulama, dan praktisi pendidikan sains di Jawa Barat. Berawal dari 60 santri perintis di kawasan sejuk Cimenyan Bandung, kini Madani Global telah berkembang menjadi institusi terpadu rujukan nasional dengan lebih dari 1.250 santri dari berbagai pelosok nusantara.',
		milestones: [
			{
				year: 2012,
				title: 'Peletakan Batu Pertama & Angkatan Perintis',
				description:
					'Pendirian kampus terpadu seluas 4,5 hektar di Cimenyan Bandung dengan 60 santri angkatan pertama dan 12 asatidz pembina.'
			},
			{
				year: 2015,
				title: 'Kelulusan Angkatan Pertama & Akreditasi A',
				description:
					'Seluruh lulusan perdana berhasil diterima di PTN favorit dan ma’had internasional di Timur Tengah serta meraih Akreditasi A BAN-S/M.'
			},
			{
				year: 2018,
				title: 'Pembangunan Kampus Sains & Gedung Graha Madani',
				description:
					'Peresmian laboratorium sains digital berstandar riset, studio robotika modern, dan perpustakaan digital terintegrasi.'
			},
			{
				year: 2021,
				title: 'Adopsi Kurikulum Cambridge & Program Eco-Pesantren',
				description:
					'Pengembangan kurikulum internasional bilingual Cambridge dan penghargaan Eco-Pesantren ramah lingkungan dari Kementerian LHK.'
			},
			{
				year: 2024,
				title: 'Akreditasi Ulang A Unggul & Prestasi Internasional',
				description:
					'Meraih status Akreditasi Unggul BAN-S/M dengan skor 98 dan capaian juara musabaqah tilawah serta inovasi sains tingkat dunia.'
			}
		]
	},
	principal: {
		name: 'Dr. H. Ahmad Fathoni, M.A., Ph.D.',
		title: 'Kepala Sekolah & Mudir Pesantren',
		greeting:
			'Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMA & Pesantren Terpadu Madani Global. Kami meyakini bahwa pendidikan sejati adalah pendidikan yang menyatukan kecerdasan spiritual, kemuliaan adab, dan keunggulan rasional. Mari bersama-sama menghantarkan putra-putri kita menjadi mercusuar peradaban masa depan.',
		photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
	}
};

export const navItems: NavItem[] = [
	{ label: 'Beranda', href: '/' },
	{ label: 'Tentang', href: '/tentang' },
	{ label: 'Program', href: '/program' },
	{ label: 'Fasilitas', href: '/fasilitas' },
	{ label: 'Prestasi', href: '/prestasi' },
	{ label: 'Kegiatan', href: '/kegiatan' },
	{ label: 'Berita', href: '/berita' },
	{ label: 'PPDB', href: '/ppdb', badge: 'Buka' },
	{ label: 'Kontak', href: '/kontak' }
];

export const schoolPillars: Pillar[] = [
	{
		id: 'adab-tahfidz',
		title: 'Adab & Tahfidz Al-Qur’an',
		description:
			'Program pembinaan karakter islami terpadu dan tahfidz bersanad dengan target mutqin 5 - 30 Juz didampingi asatidz hafizh.',
		iconName: 'BookOpen',
		highlight: 'Target 5-30 Juz Mutqin'
	},
	{
		id: 'sains-riset',
		title: 'Sains & Riset Modern',
		description:
			'Kurikulum pembelajaran berstandar tinggi dengan laboratorium sains digital, coding, robotik, dan pembimbingan olimpiade sains.',
		iconName: 'Microscope',
		highlight: 'Laboratorium & Coding Lab'
	},
	{
		id: 'bilingual-global',
		title: 'Bilingual & Kepemimpinan Global',
		description:
			'Lingkungan interaksi dwi-bahasa (Arab & Inggris) aktif serta pembekalan kepemimpinan untuk melanjutkan ke kampus top dunia.',
		iconName: 'Globe',
		highlight: 'Daily English & Arabic'
	}
];

export const schoolStats: StatItem[] = [
	{
		value: '1.250+',
		label: 'Santri Aktif',
		description: 'Berasal dari 28 provinsi di Indonesia'
	},
	{
		value: '85+',
		label: 'Pendidik & Asatidz',
		description: 'Lulusan perguruan tinggi ternama DN & LN'
	},
	{
		value: '140+',
		label: 'Hafizh Qur’an',
		description: 'Santri menyelesaikan hafalan 30 juz mutqin'
	},
	{
		value: '98.5%',
		label: 'Lulusan ke PTN & LN',
		description: 'Diterima di UI, ITB, UGM, Al-Azhar, Timur Tengah, dll'
	}
];

export const ppdbSummary: PPDBInfo = {
	status: 'Dibuka',
	academicYear: '2026/2027',
	currentWave: 'Gelombang 1 (Jalur Prestasi & Reguler)',
	deadline: '31 Oktober 2026',
	consultationWa: '+62 812-3456-7890',
	registrationUrl: '/ppdb',
	quotaTotal: 180
};
