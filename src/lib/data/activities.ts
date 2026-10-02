import type { ActivityDetail, ActivityGalleryItem } from '$lib/types';

export interface ExtracurricularItem {
	id: string;
	name: string;
	category: string;
	desc: string;
	schedule: string;
	instructor: string;
	badge: string;
}

export interface DailyScheduleItem {
	time: string;
	activity: string;
	desc: string;
	period: 'Pagi' | 'Siang' | 'Sore' | 'Malam';
}

export const dailySchedule: DailyScheduleItem[] = [
	{ time: '03.30 - 04.30', activity: 'Qiyamul Lail & Doa Sahur', desc: 'Bangun pagi, shalat tahajjud berjamaah, tilawah mandiri, dan istighfar di sepertiga malam.', period: 'Pagi' },
	{ time: '04.30 - 06.00', activity: 'Shalat Subuh & Halaqah Tahfidz Pagi', desc: 'Shalat berjamaah di masjid dilanjutkan setoran hafalan baru (ziyadah) didampingi asatidz hafizh.', period: 'Pagi' },
	{ time: '06.00 - 07.15', activity: 'Sarapan Gizi & Kerapian Diri', desc: 'Makan pagi berstandar gizi seimbang di dining hall, piket asrama, dan persiapan kelas formal.', period: 'Pagi' },
	{ time: '07.15 - 12.00', activity: 'KBM Kurikulum Terpadu & Sains', desc: 'Pembelajaran sains, matematika, bahasa asing aktif, dan pendalaman materi kurikulum nasional.', period: 'Pagi' },
	{ time: '12.00 - 13.00', activity: 'Shalat Zhuhur Berjamaah & Makan Siang', desc: 'Kultum dzuhur oleh santri bergiliran dalam 3 bahasa dan istirahat siang sehat.', period: 'Siang' },
	{ time: '13.00 - 15.00', activity: 'Praktikum Laboratorium & Kajian Kitab', desc: 'Eksperimen di lab sains terpadu, coding studio, atau dirasah islamiyah turats.', period: 'Siang' },
	{ time: '15.00 - 17.00', activity: 'Shalat Ashar & Ekstrakurikuler Minat Bakat', desc: 'Olahraga sunnah, latihan bela diri, robotika, bahasa, seni kaligrafi, dan rekreasi terarah.', period: 'Sore' },
	{ time: '17.30 - 19.30', activity: 'Shalat Maghrib & Muraja’ah Al-Qur’an', desc: 'Muraja’ah hafalan yang telah disetor, kajian tafsir singkat, dan tadabbur ayat Al-Qur’an.', period: 'Malam' },
	{ time: '19.30 - 21.30', activity: 'Shalat Isya, Makan Malam & Belajar Mandiri', desc: 'Makan malam bergizi, bimbingan belajar mandiri terarah malam hari, dan evaluasi harian asrama.', period: 'Malam' },
	{ time: '21.30 - 03.30', activity: 'Istirahat Malam (Jam Disiplin Tidur)', desc: 'Istirahat malam tertib demi kesehatan fisik prima, kesiapan mental, dan kebugaran tubuh santri.', period: 'Malam' }
];

export const extracurriculars: ExtracurricularItem[] = [
	{
		id: 'panahan',
		name: 'Panahan (Archery Sunnah)',
		category: 'Olahraga Sunnah',
		desc: 'Melatih konsentrasi, ketenangan emosi, koordinasi motorik, dan kekuatan otot punggung dengan standar PERPANI.',
		schedule: 'Selasa & Sabtu Sore',
		instructor: 'Pelatih Bersertifikat PERPANI',
		badge: 'Olahraga Prestasi'
	},
	{
		id: 'silat',
		name: 'Pencak Silat Tapak Suci',
		category: 'Bela Diri Prestasi',
		desc: 'Seni bela diri warisan bangsa yang menanamkan mental ksatria, kedisiplinan raga, dan pertahanan diri santri.',
		schedule: 'Rabu & Ahad Pagi',
		instructor: 'Pendekar Tapak Suci Jabar',
		badge: 'Juara Kejurnas'
	},
	{
		id: 'robotika',
		name: 'Robotika & Smart IoT Engineering',
		category: 'Sains & Teknologi',
		desc: 'Merakit sensor elektronika, pemrograman mikrokontroler Arduino/ESP32, dan pembuatan purwarupa inovasi sains.',
		schedule: 'Kamis & Sabtu Siang',
		instructor: 'Dosen Teknik Komputer ITB/UNIKOM',
		badge: 'Medali ISIF'
	},
	{
		id: 'coding',
		name: 'Klub Coding & Software Development',
		category: 'Sains & Teknologi',
		desc: 'Mempelajari dasar algoritma pemrograman, logika komputasi, pengembangan web modern, dan kecerdasan buatan.',
		schedule: 'Senin & Kamis Sore',
		instructor: 'Software Engineer & Praktisi Industri',
		badge: 'Full-Stack Santri'
	},
	{
		id: 'debat',
		name: 'Arabic & English Debating Society',
		category: 'Bahasa & Diplomasi',
		desc: 'Melatih teknik retorika argumentatif, berpikir kritis internasional, dan public speaking dalam forum kompetisi debat.',
		schedule: 'Rabu & Jumat Sore',
		instructor: 'Debater Nasional UI / Alumni LN',
		badge: 'Juara 1 Nasional'
	},
	{
		id: 'kir',
		name: 'Karya Ilmiah Remaja (KIR Sains & Sosial)',
		category: 'Riset Ilmiah',
		desc: 'Melakukan penelitian empiris permasalahan sosial dan sains alam serta menyusun naskah jurnal ilmiah remaja.',
		schedule: 'Jumat Siang',
		instructor: 'Tim Peneliti & Guru Pembina Riset',
		badge: 'Juara Kemenag'
	},
	{
		id: 'kaligrafi',
		name: 'Kaligrafi & Seni Khatt Al-Qur’an',
		category: 'Seni Islam',
		desc: 'Memperdalam kaidah khat Naskhi, Tsuluts, Riq’ah, dan Diwani serta iluminasi hiasan mushaf Al-Qur’an klasik.',
		schedule: 'Senin Sore',
		instructor: 'Khattat Profesional Jabar',
		badge: 'Juara MTQ'
	},
	{
		id: 'jurnalistik',
		name: 'Jurnalistik, Podcast & Media Santri',
		category: 'Literasi & Media',
		desc: 'Pelatihan teknik reportase investigatif, fotografi jurnalistik, editing podcast, dan pengelolaan publikasi dakwah kampus.',
		schedule: 'Sabtu Pagi',
		instructor: 'Jurnalis Media Nasional',
		badge: 'Redaksi Buletin'
	}
];

export const activitiesData: ActivityDetail[] = [
	{
		id: 'wisuda-tahfidz-akbar',
		title: 'Wisuda Akbar & Tasmi’ 30 Juz Bil Ghaib Sekali Duduk',
		category: 'Program Unggulan',
		description:
			'Ujian tasmi’ akbar terbuka di hadapan dewan masyaikh dan orang tua wali santri untuk menguji kemutqinan hafalan Al-Qur’an secara komprehensif.',
		schedule: 'Setiap Semester Genap',
		image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
		featured: true
	},
	{
		id: 'madani-science-expo',
		title: 'Madani Science & Innovation Fair (MSIF)',
		category: 'Akademik & STEM',
		description:
			'Pameran karya riset ilmiah santri, prototipe robot IoT, eksperimen bioteknologi ramah lingkungan, serta olimpiade sains tingkat SMP/MTs sederajat se-Jawa.',
		schedule: 'Bulan Oktober Tahunan',
		image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
		featured: true
	},
	{
		id: 'super-camp-leadership',
		title: 'Super Camp Kepemimpinan & Survival Santri di Alam Bebas',
		category: 'Karakter & Kemandirian',
		description:
			'Ekspedisi outdoor di kawasan kaki Gunung Tangkuban Parahu yang memadukan navigasi darat, qiyamul lail di tenda, tadabbur alam, dan team building kepemimpinan.',
		schedule: 'Awal Tahun Ajaran',
		image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
		featured: true
	},
	{
		id: 'international-immersion',
		title: 'International Student Immersion & Sister School Exchange',
		category: 'Wawasan Global',
		description:
			'Program pertukaran santri dan benchmarking riset ke lembaga pendidikan mitra di Malaysia, Singapura, serta studi kebudayaan Timur Tengah.',
		schedule: 'Jeda Semester Ganjil',
		image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
		featured: false
	}
];

export const activityGallery: ActivityGalleryItem[] = [
	{
		id: 'gal-tahfidz',
		title: 'Halaqah Ziyadah Shubuh Berjamaah di Masjid Jami’',
		category: 'Spiritualitas & Ibadah',
		date: 'September 2026',
		image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
		description: 'Suasana khusyuk setoran hafalan pagi santri bersama asatidz hafizh bersanad.'
	},
	{
		id: 'gal-lab-sains',
		title: 'Praktikum Analisis Spektroskopi dan Mikroskopik',
		category: 'Sains & Riset',
		date: 'September 2026',
		image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
		description: 'Santri kelas sains mengamati struktur sel hidup di laboratorium terpadu modern.'
	},
	{
		id: 'gal-robotik',
		title: 'Uji Coba Mikrokontroler IoT Proyek Tim Robotik',
		category: 'Teknologi & STEM',
		date: 'Agustus 2026',
		image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
		description: 'Perakitan sensor kualitas air otomatis oleh tim santri peminatan rekayasa teknologi.'
	},
	{
		id: 'gal-panahan',
		title: 'Latihan Fokus Memanah Barebow 30 Meter',
		category: 'Olahraga Sunnah',
		date: 'Agustus 2026',
		image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
		description: 'Pembinaan ketangkasan raga dan konsentrasi mental di arena panahan kampus.'
	},
	{
		id: 'gal-library',
		title: 'Kajian Literatur dan Diskusi Kelompok di Digital Library',
		category: 'Akademik & Literasi',
		date: 'Juli 2026',
		image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
		description: 'Pemanfaatan workstation e-journal dan kitab turats untuk bahan karya tulis ilmiah.'
	},
	{
		id: 'gal-supercamp',
		title: 'Survival & Tadabbur Alam Super Camp Madani',
		category: 'Karakter & Kemandirian',
		date: 'Juli 2026',
		image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
		description: 'Pembinaan kepemimpinan tangguh dan kebersamaan ukhuwah santri di alam terbuka.'
	}
];
