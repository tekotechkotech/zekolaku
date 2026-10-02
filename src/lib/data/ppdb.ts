import type { PPDBData } from '$lib/types';

export const ppdbData: PPDBData = {
	status: 'Dibuka',
	academicYear: '2026/2027',
	currentWave: 'Gelombang 1 (Jalur Beasiswa & Prestasi/Reguler)',
	deadline: '31 Oktober 2026',
	consultationWa: '+62 812-3456-7890',
	whatsappUrl: 'https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20Madani%20Global,%20saya%20ingin%20berkonsultasi%20pendaftaran%20santri%20baru',
	registrationUrl: '/ppdb',
	quotaTotal: 180,
	waves: [
		{
			name: 'Gelombang 1 (Early Bird & Beasiswa)',
			period: '1 September – 31 Oktober 2026',
			status: 'Dibuka',
			description: 'Khusus jalur Beasiswa Tahfidz 15–30 Juz, Jalur Prestasi Sains OSN, serta kuota reguler awal dengan potongan infaq pembangunan.'
		},
		{
			name: 'Gelombang 2 (Reguler & Peminatan)',
			period: '1 November 2026 – 15 Januari 2027',
			status: 'Segera Dibuka',
			description: 'Pendaftaran reguler peminatan STEM Sains, Cambridge Bilingual, dan Humaniora berasrama.'
		},
		{
			name: 'Gelombang 3 (Jalur Kuota Sisa)',
			period: '1 Februari – 31 Maret 2027',
			status: 'Ditutup',
			description: 'Hanya dibuka jika kuota 180 santri belum terpenuhi pada gelombang 1 dan 2.'
		}
	],
	requirements: [
		'Lulusan SMP/MTs/sederajat atau siswa kelas 9 yang akan lulus pada tahun ajaran 2025/2026.',
		'Mengisi formulir registrasi online biodata santri dan orang tua secara lengkap dan valid.',
		'Mengunggah scan rapor SMP/MTs semester 1 s.d. 5 yang dilegalisir kepala madrasah/sekolah.',
		'Mengunggah scan Kartu Keluarga (KK), Akta Kelahiran, dan Nomor Induk Siswa Nasional (NISN).',
		'Surat keterangan sehat jasmani, bebas narkoba, dan bebas penyakit menular dari dokter/rumah sakit.',
		'Surat pernyataan kesediaan santri untuk mematuhi tata tertib asrama serta tinggal di pondok.',
		'Bagi pendaftar jalur beasiswa: sertifikat/syahadah tahfidz atau piagam juara kejuaraan sains resmi.'
	],
	steps: [
		{
			number: '01',
			title: 'Pendaftaran Online',
			desc: 'Wali santri mengisi formulir identitas dan mengunggah berkas administrasi via portal PPDB.'
		},
		{
			number: '02',
			title: 'Verifikasi & Pengambilan Kartu',
			desc: 'Panitia memeriksa keabsahan dokumen dan menerbitkan Kartu Ujian Seleksi Terpadu.'
		},
		{
			number: '03',
			title: 'Ujian Seleksi & Wawancara',
			desc: 'Mengikuti tes potensi akademik, observasi tahsin/hafalan Al-Qur’an, serta wawancara orang tua.'
		},
		{
			number: '04',
			title: 'Pengumuman & Daftar Ulang',
			desc: 'Melihat hasil seleksi di portal resmi, penyelesaian daftar ulang, serta pengukuran seragam santri.'
		}
	],
	fees: [
		{
			name: 'Biaya Pendaftaran & Seleksi',
			amount: 'Rp 450.000',
			type: 'Pangkal',
			description: 'Biaya administrasi ujian seleksi terpadu, tes psikologi minat bakat, dan konsumsi saat observasi.'
		},
		{
			name: 'Uang Pangkal / Infaq Sarana',
			amount: 'Rp 22.500.000',
			type: 'Pangkal',
			description: 'Dibayarkan satu kali selama 3 tahun jenjang SMA untuk pemeliharaan fasilitas modern, lab, dan asrama.'
		},
		{
			name: 'Perlengkapan & Seragam Lengkap',
			amount: 'Rp 3.250.000',
			type: 'Pangkal',
			description: 'Mencakup 5 stel seragam resmi sekolah, seragam olahraga, jubah/gamis ibadah, sprei asrama, dan tas sekolah.'
		},
		{
			name: 'SPP & Biaya Asrama Bulanan',
			amount: 'Rp 2.450.000 / bulan',
			type: 'Bulanan',
			description: 'Mencakup biaya pendidikan akademik, bimbingan tahfidz, makan gizi 3x sehari, laundry seragam, dan layanan klinik 24 jam.'
		}
	],
	scholarships: [
		{
			title: 'Beasiswa Tahfidzul Qur’an Penuh (100% Free)',
			badge: 'Bebas Biaya Total',
			description: 'Bebas 100% uang pangkal sarana dan SPP bulanan selama 3 tahun penuh bagi santri yang hafal mutqin minimal 15 Juz Al-Qur’an dan lulus tes tasmi’.'
		},
		{
			title: 'Beasiswa Juara Sains & Riset (OSN/KSM)',
			badge: 'Potongan Infaq 50% - 100%',
			description: 'Bantuan pembiayaan pendidikan bagi santri berprestasi peraih medali emas/perak/perunggu dalam Olimpiade Sains Nasional atau kompetisi riset internasional.'
		},
		{
			title: 'Beasiswa Kader Umat & Dhuafa Berprestasi',
			badge: 'Bantuan Wakaf Pendidikan',
			description: 'Kerjasama dengan Badan Wakaf Madani untuk calon santri berprestasi akademik tinggi dari keluarga prasejahtera yang berkomitmen mengabdi pada umat.'
		}
	],
	faqs: [
		{
			q: 'Apakah ada tes khusus bahasa bagi calon santri yang belum mahir Bahasa Arab atau Inggris?',
			a: 'Tidak ada prasyarat harus mahir sebelum masuk. Santri baru akan mengikuti Program Matrikulasi Bahasa intensif selama 3 bulan pertama untuk membangun fondasi percakapan dan kosakata harian secara natural.'
		},
		{
			q: 'Bagaimana sistem perizinan keluar kampus dan kepulangan ke rumah?',
			a: 'Santri mendapatkan jadwal kunjungan orang tua (sambangan) setiap 2 pekan sekali pada hari Ahad. Kepulangan ke rumah dijadwalkan pada libur tengah semester dan libur akhir semester kalender akademik.'
		},
		{
			q: 'Apakah santri diperbolehkan membawa laptop atau smartphone?',
			a: 'Smartphone pribadi tidak diperkenankan. Untuk laptop, santri peminatan sains dan coding diperbolehkan menggunakannya hanya pada sesi praktikum di laboratorium komputasi di bawah pengawasan instruktur.'
		},
		{
			q: 'Bagaimana pola pendampingan santri yang sakit di asrama?',
			a: 'Klinik Poskestren siaga 24 jam dengan perawat medis profesional. Jika santri membutuhkan observasi medis lanjutan, pihak pesantren akan segera merujuk ke rumah sakit mitra di Bandung dan mengabari orang tua.'
		},
		{
			q: 'Apakah ijazah lulusan SMA Madani Global diakui untuk seleksi SNBP, SNBT, dan kuliah ke luar negeri?',
			a: 'Tentu saja. SMA Madani Global berstatus Akreditasi A Unggul resmi dari BAN-S/M Kemendikbudristek RI dan Kemenag RI, sehingga memiliki kuota SNBP optimal serta sertifikat ijazah yang legal untuk universitas dalam maupun luar negeri.'
		}
	]
};
