import type { FacilityDetail } from '$lib/types';

export const facilitiesData: FacilityDetail[] = [
	{
		id: 'masjid',
		name: 'Masjid Jami’ Madani Al-Fath',
		category: 'Pusat Ibadah',
		description:
			'Jantung spiritual kampus yang menampung 1.500 jamaah. Dilengkapi sistem pendingin ruangan terpusat, tata akustik profesional, serta area halaqah Al-Qur’an bertingkat yang nyaman dan hening.',
		image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
		highlight: 'Kapasitas 1.500 Jamaah',
		specs: ['Ruang Utama Berkarpet Tebal', 'Sistem Audio Digital', 'Area Halaqah Putra & Putri Terpisah'],
		featured: true
	},
	{
		id: 'lab-sains',
		name: 'Laboratorium Sains & Riset Terpadu',
		category: 'Sarana Akademik',
		description:
			'Fasilitas eksperimen Fisika, Kimia, dan Biologi modern dengan mikroskop digital binokuler, fume hood keselamatan, instrumen analitik, dan alat peraga sains berstandar laboratorium perguruan tinggi.',
		image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
		highlight: 'Standar Laboratorium Riset',
		specs: ['Mikroskop Digital LCD', 'Almari Asam Bersertifikasi', 'Stasiun Eksperimen Mandiri Siswa'],
		featured: true
	},
	{
		id: 'perpustakaan',
		name: 'Digital Library & Kutub Khana Turats',
		category: 'Sarana Akademik',
		description:
			'Pusat sumber belajar yang menggabungkan koleksi ribuan jilid kitab turats klasik Islam dengan ribuan judul sains modern, dilengkapi workstation komputer dan akses ribuan e-journal internasional.',
		image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
		highlight: '15.000+ Judul Buku & E-Journal',
		specs: ['Ruang Baca Senyap (Quiet Zone)', 'Workstation PC iMac & Windows', 'Katalog Digital OPAC'],
		featured: true
	},
	{
		id: 'asrama',
		name: 'Gedung Asrama Santri Sehat & Asri',
		category: 'Sarana Kehidupan',
		description:
			'Kamar santri dengan sirkulasi udara alami dan pencahayaan optimal di perbukitan Bandung. Dilengkapi ranjang ergonomis, loker personal, kamar mandi bersih rasio 1:4, dan pengawasan musyrif 24 jam.',
		image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
		highlight: 'Pendampingan Musyrif 24 Jam',
		specs: ['Kasur Springbed Ergonomis', 'Loker Kunci Pribadi', 'Ruang Sosialisasi & Belajar Lantai'],
		featured: true
	},
	{
		id: 'lab-komputer',
		name: 'Pusat Komputasi, Robotika & Studio AI',
		category: 'Sarana Akademik',
		description:
			'Ruang komputer berspesifikasi tinggi dengan jaringan internet fiber optik khusus pembelajaran coding, riset Internet of Things (IoT), simulasi mikrokontroler Arduino/Raspberry Pi, dan kecerdasan buatan.',
		image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
		highlight: 'High-Spec PC & IoT Kits',
		specs: ['36 Workstation Core i7 & GPU', 'Kit Sensor Elektronika Lengkap', 'Printer 3D Prototyping'],
		featured: true
	},
	{
		id: 'olahraga',
		name: 'Kompleks Olahraga & Arena Panahan Sunnah',
		category: 'Olahraga & Kesehatan',
		description:
			'Fasilitas olahraga terpadu yang mencakup lapangan futsal sintetis, lapangan basket standar perbasi, lapangan bulu tangkis indoor, dan arena panahan standar Perpani dengan target busur berjarak 30-50 meter.',
		image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
		highlight: 'Standar Standar Olahraga Nasional',
		specs: ['Lapangan Futsal & Basket', 'Arena Panahan 50 Meter', 'Ruang Latihan Silat & Bela Diri'],
		featured: true
	},
	{
		id: 'dining-hall',
		name: 'Dining Hall & Dapur Higienis Berstandar Halal',
		category: 'Sarana Kehidupan',
		description:
			'Ruang makan luas bernuansa kafetaria modern dengan sistem penyajian higienis 3 kali sehari. Menu makanan dikurasi oleh ahli gizi bersertifikat halal MUI untuk menjaga stamina santri tetap prima.',
		image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
		highlight: 'Gizi Seimbang Terverifikasi Ahli',
		specs: ['Sertifikasi Dapur Halal MUI', 'Kapasitas 800 Santri Sekali Sesi', 'Air Minum Reverse Osmosis'],
		featured: false
	},
	{
		id: 'poskestren',
		name: 'Klinik Pos Kesehatan Pesantren (Poskestren)',
		category: 'Layanan Medis',
		description:
			'Fasilitas pertolongan pertama dan rawat jalan dengan tenaga medis perawat siaga 24 jam serta visit dokter umum 3 kali sepekan. Terhubung langsung dengan rumah sakit rujukan utama di Bandung.',
		image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
		highlight: 'Layanan Siaga Medis 24 Jam',
		specs: ['Ruang Observasi & Isolasi Pasien', 'Stok Obat Standar Lengkap', 'Ambulans Darurat Siaga'],
		featured: false
	},
	{
		id: 'auditorium',
		name: 'Auditorium Graha Madani Hall',
		category: 'Sarana Umum',
		description:
			'Gedung pertemuan serbaguna dengan panggung teater, sistem tata suara line-array akustik, dan layar videotron LED besar untuk acara wisuda, seminar internasional, dan perlombaan akbar santri.',
		image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
		highlight: 'Kapasitas 1.000 Audiens',
		specs: ['Videotron P3 Indoor 6x3m', 'Line-Array Surround Audio', 'Panggung Multifungsi'],
		featured: false
	},
	{
		id: 'lab-bahasa',
		name: 'Multimedia Language Laboratory',
		category: 'Sarana Akademik',
		description:
			'Studio pembelajaran bahasa modern dengan perangkat lunak interaktif listening comprehension, recording booth untuk latihan aksen Arab & Inggris, dan fasilitas simulasi tes IELTS & TOAFL.',
		image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
		highlight: 'Headset Noise-Cancelling & Software Interaktif',
		specs: ['40 Unit Bilik Latihan Bahasa', 'Software Master Audio Control', 'Simulasi Ujian Digital'],
		featured: false
	},
	{
		id: 'greenhouse',
		name: 'Eco-Greenhouse & Kebun Hidroponik',
		category: 'Sarana Lingkungan & Sains',
		description:
			'Laboratorium terbuka ramah lingkungan untuk pengamatan botani, bioteknologi tanaman, serta budidaya sayuran organik hidroponik sebagai bagian dari edukasi kemandirian pangan dan eco-pesantren.',
		image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
		highlight: 'Pendidikan Pertanian Ramah Lingkungan',
		specs: ['Instalasi NFT Hidroponik', 'Sensor Suhu & Kelembaban Otomatis', 'Kebun Tanaman Herbal'],
		featured: false
	},
	{
		id: 'konseling',
		name: 'Pusat Bimbingan Karir & Konseling Santri',
		category: 'Layanan Santri',
		description:
			'Ruangan konsultasi yang privat dan tenang untuk asesmen bakat minat, bimbingan psikologi remaja, serta konsultasi pemilihan jurusan perguruan tinggi negeri maupun beasiswa luar negeri.',
		image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
		highlight: 'Psikolog & Konselor Pendidikan Berpengalaman',
		specs: ['Ruang Konseling Privat Nyaman', 'Bank Data Informasi Kampus Top', 'Layanan Tes Minat Bakat'],
		featured: false
	}
];
