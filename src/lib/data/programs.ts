import type { ProgramDetail } from '$lib/types';

export const programsData: ProgramDetail[] = [
	{
		id: 'sains-teknologi',
		name: 'Peminatan Sains Terpadu & Teknologi Modern (STEM)',
		category: 'Akademik & STEM',
		badge: 'Unggulan Sains',
		description:
			'Program pendidikan intensif yang memadukan kurikulum MIPA nasional, penalaran riset saintifik, logika pemrograman komputer, dan integrasi nilai ketauhidan dalam mengamati fenomena alam semesta.',
		competencies: [
			'Penguasaan mendalam bidang Matematika, Fisika, Kimia, dan Biologi berstandar olimpiade',
			'Kecakapan metodologi riset ilmiah, eksperimen laboratorium digital, dan statistik data',
			'Kemampuan dasar algoritma pemrograman, coding Python/C++, dan sistem robotika IoT',
			'Penyusunan Karya Tulis Ilmiah Santri (KTIS) yang siap dipublikasikan pada jurnal remaja'
		],
		prospects: [
			'Fakultas Kedokteran & Ilmu Kesehatan (UI, UNAIR, UGM, UNPAD)',
			'Fakultas Teknik, STEI & FTI (ITB, ITS, NTU Singapura)',
			'Program Studi Ilmu Komputer & Artificial Intelligence (DN & LN)',
			'Riset & Sains Murni (Kimia, Fisika Nuklir, Bioteknologi Terapan)'
		],
		facilities: [
			'Laboratorium Terpadu Fisika, Kimia & Biologi berstandar analitik',
			'Laboratorium Komputasi & Studio Robotika',
			'Observatorium Mini Astronomi & Teropong Bintang',
			'Greenhouse Hidroponik & Kebun Botani Biologi'
		],
		image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
		featured: true
	},
	{
		id: 'tahfidz-dirasah',
		name: 'Program Khusus Tahfidzul Qur’an & Dirasah Islamiyah',
		category: 'Keislaman & Al-Qur’an',
		badge: 'Takhassus Sanad',
		description:
			'Program unggulan pembinaan hafalan Al-Qur’an 30 juz mutqin dengan bimbingan asatidz hafizh pemegang sanad qira’ah muttashil. Diperkaya dengan kajian kitab turats, tajwid tahsin mendalam, serta tadabbur amaliyah.',
		competencies: [
			'Hafalan Al-Qur’an mutqin 10 hingga 30 juz dengan kaidah makharijul huruf tartil',
			'Penguasaan matan Jazariyyah dan Tuhfatul Athfal dalam ilmu tajwid',
			'Pemahaman dasar ilmu syar’i (Aqidah Wasithiyah, Fiqh Sunnah, Ushul Fiqh, Hadits Arbain)',
			'Kemampuan imamah shalat jahr, khutbah Jumat, dan ta’lim keagamaan di masyarakat'
		],
		prospects: [
			'Universitas Al-Azhar Kairo (Fakultas Ushuluddin, Syariah & Dirasat Islamiyah)',
			'Islamic University of Madinah & King Saud University Saudi Arabia',
			'UIN Syarif Hidayatullah, UIN Sunan Kalijaga, LIPIA Jakarta',
			'Duta Da’i Internasional, Asatidz Pengasuh Pondok, dan Ulama Cendekiawan'
		],
		facilities: [
			'Masjid Jami’ Madani seluas 1.500 jamaah berpendingin ruangan',
			'Ruang Halaqah Tahfidz Khusus berakustik senyap',
			'Perpustakaan Kutub Turats & Manuskrip Islam',
			'Studio Rekaman Murottal & Audio Tahsin Santri'
		],
		image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80',
		featured: true
	},
	{
		id: 'bilingual-cambridge',
		name: 'International Bilingual & Cambridge Pathway',
		category: 'Bahasa & Wawasan Global',
		badge: 'Cambridge Curricula',
		description:
			'Program yang dirancang khusus mempersiapkan santri menembus perguruan tinggi top global. Menitikberatkan pada penguasaan aktif Bahasa Arab dan Bahasa Inggris akademis serta adopsi modul kurikulum Cambridge.',
		competencies: [
			'Komunikasi aktif formal dwi-bahasa (Arab & Inggris) dalam percakapan serta debat',
			'Skor persiapan IELTS minimal 6.5 - 7.5 dan sertifikasi TOAFL Timur Tengah',
			'Penguasaan Cambridge IGCSE / AS-A Level untuk mata pelajaran Mathematics & English',
			'Kecakapan diplomasi santri, pemahaman lintas budaya, dan etika kepemimpinan internasional'
		],
		prospects: [
			'Universitas Terkemuka Dunia (Turki, Malaysia, UK, Australia, Timur Tengah)',
			'Hubungan Internasional & Diplomasi Luar Negeri',
			'Kelas Internasional IUP di PTN Ternama (UGM IUP, ITB International, UI KKI)',
			'Lembaga Multinasional & Organisasi Kemanusiaan Global'
		],
		facilities: [
			'Multimedia Language Laboratory dengan workstation audio interaktif',
			'Student Council & Global Discussion Hall',
			'Pojok Baca Buku Bahasa Asing & Literatur Cambridge',
			'Akses E-Library & Jurnal Riset Bahasa Internasional'
		],
		image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
		featured: true
	},
	{
		id: 'sosial-humaniora',
		name: 'Peminatan Sosial Humaniora & Diplomasi Madani (SosHum)',
		category: 'Sosial & Kepemimpinan',
		badge: 'Karakter Pemimpin',
		description:
			'Program pengembangan wawasan sosial, ekonomi syariah, sosiologi keumatan, dan hukum tata negara. Membentuk santri berjiwa negarawan yang cerdas menganalisis masalah kebangsaan dan memiliki solusi berkeadilan.',
		competencies: [
			'Analisis kritis dinamika sosiologis, kebijakan publik, dan sejarah peradaban Islam',
			'Penguasaan prinsip Ekonomi Syariah, literasi keuangan digital, dan social entrepreneurship',
			'Keterampilan retorika persuasif, kepenulisan esai kritis opini, dan advokasi sosial',
			'Manajemen keorganisasian, kepemimpinan publik, dan manajemen konflik musyawarah'
		],
		prospects: [
			'Fakultas Hukum & Hukum Tata Negara (UI, UGM, UNDIP)',
			'Ilmu Ekonomi, Akuntansi & Manajemen Bisnis Syariah',
			'Ilmu Komunikasi, Hubungan Internasional & Kebijakan Publik',
			'Pendidikan Sosiologi, Sejarah Kebudayaan & Jurnalistik Investigatif'
		],
		facilities: [
			'Mini Moot Court (Ruang Simulasi Peradilan & Diplomasi Sidang)',
			'Bilik Podcast & Media Center Santri Madani',
			'Pusat Inkubasi Bisnis & Koperasi Syariah Santri',
			'Ruang Seminar Graha Madani'
		],
		image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
		featured: false
	}
];
