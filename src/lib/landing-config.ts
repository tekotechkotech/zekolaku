import type { LandingSection, SectionBgStyle } from '$lib/types';

export interface SectionDefinition {
	key: string;
	name: string;
	description: string;
	defaultBgStyle: SectionBgStyle;
	defaultItemCount: number;
	defaultTemplate: string;
	templates: {
		id: string;
		name: string;
		description: string;
		iconType: 'split' | 'centered' | 'cards' | 'bento' | 'timeline' | 'accordion' | 'banner' | 'quote';
	}[];
}

export const SECTION_DEFINITIONS: Record<string, SectionDefinition> = {
	hero: {
		key: 'hero',
		name: 'Hero Banner Utama',
		description: 'Bagian pembuka paling atas halaman beranda, memuat judul besar, tagline sekolah, dan tombol PPDB.',
		defaultBgStyle: 'navy',
		defaultItemCount: 1,
		defaultTemplate: 'split',
		templates: [
			{
				id: 'split',
				name: 'Split Media 2-Kolom',
				description: 'Teks & tombol aksi di sisi kiri, foto sampul dengan lencana PPDB di sisi kanan.',
				iconType: 'split'
			},
			{
				id: 'centered',
				name: 'Centered Minimalist',
				description: 'Teks simetris di tengah dengan latar belakang luas dan tombol CTA sejajar.',
				iconType: 'centered'
			},
			{
				id: 'card-float',
				name: 'Bento Card Showcase',
				description: 'Headline utama di kiri, kartu highlight keunggulan & akreditasi melayang di kanan.',
				iconType: 'bento'
			}
		]
	},
	greeting: {
		key: 'greeting',
		name: 'Sambutan Kepala Sekolah',
		description: 'Kutipan resmi pimpinan/mudir pesantren, visi kepemimpinan, dan sambutan hangat kepada calon wali santri.',
		defaultBgStyle: 'white',
		defaultItemCount: 1,
		defaultTemplate: 'split-photo',
		templates: [
			{
				id: 'split-photo',
				name: 'Foto & Sambutan Lengkap',
				description: 'Foto pimpinan di sisi kiri, kutipan dan sambutan lengkap di sisi kanan.',
				iconType: 'split'
			},
			{
				id: 'quote-clean',
				name: 'Quote Card Elegan',
				description: 'Kotak kutipan terpusat dengan tanda kutip besar islami dan profil pimpinan di bawah.',
				iconType: 'quote'
			}
		]
	},
	stats: {
		key: 'stats',
		name: 'Statistik & Angka Kunci',
		description: 'Metrik pencapaian (jumlah santri, rasio pengajar, persentase PTN, hafalan Al-Qur\'an).',
		defaultBgStyle: 'default',
		defaultItemCount: 4,
		defaultTemplate: 'cards',
		templates: [
			{
				id: 'cards',
				name: 'Floating Cards Grid',
				description: '4 kartu statistik individual dengan ikon membulat dan efek bayangan lembut.',
				iconType: 'cards'
			},
			{
				id: 'ribbon',
				name: 'Clean Inline Ribbon',
				description: 'Bar statistik horizontal ramping tanpa kotak terpisah, sangat minimalis.',
				iconType: 'split'
			},
			{
				id: 'dark-counter',
				name: 'Dark Accent Counter',
				description: 'Latar gelap kontras dengan angka neon aksen yang menyala dan menonjol.',
				iconType: 'banner'
			}
		]
	},
	pillars: {
		key: 'pillars',
		name: 'Pilar & Nilai Unggulan',
		description: 'Fondasi nilai kepesantrenan (Adab & Karakter, Tahfidz Bersanad, Sains Modern, Wawasan Global).',
		defaultBgStyle: 'slate',
		defaultItemCount: 4,
		defaultTemplate: 'grid',
		templates: [
			{
				id: 'grid',
				name: 'Grid 4-Kolom Ikonik',
				description: 'Tata letak 4 kolom kartu dengan ikon warna-warni dan deskripsi ringkas.',
				iconType: 'cards'
			},
			{
				id: 'interactive-list',
				name: 'Tab Interaktif Berjenjang',
				description: 'Daftar nama pilar yang dapat diklik untuk menampilkan penjelasan dan sorotan.',
				iconType: 'bento'
			},
			{
				id: 'compact-row',
				name: '2x2 Bento Minimal',
				description: 'Susunan padat 2x2 dengan nomor pilar besar dan badge keunggulan.',
				iconType: 'split'
			}
		]
	},
	programs: {
		key: 'programs',
		name: 'Program Pendidikan Unggulan',
		description: 'Pilihan program studi kurikulum terpadu (Tahfidz Sains, Bahasa Internasional, dll).',
		defaultBgStyle: 'white',
		defaultItemCount: 4,
		defaultTemplate: 'grid',
		templates: [
			{
				id: 'grid',
				name: 'Card Grid Gambar Sampul',
				description: 'Kartu modern dengan gambar sampul, badge label, dan daftar kompetensi santri.',
				iconType: 'cards'
			},
			{
				id: 'bento',
				name: 'Bento Program Showcase',
				description: 'Satu program utama berukuran besar di kiri, didampingi 3 program lain di kanan.',
				iconType: 'bento'
			},
			{
				id: 'minimal-list',
				name: 'Daftar Horizontal Ramping',
				description: 'List baris elegan dengan ikon, kategori, dan tombol rincian program.',
				iconType: 'split'
			}
		]
	},
	achievements: {
		key: 'achievements',
		name: 'Prestasi & Juara Santri',
		description: 'Daftar rekam jejak juara olimpiade sains, tahfidz, dan kompetisi internasional.',
		defaultBgStyle: 'slate',
		defaultItemCount: 4,
		defaultTemplate: 'trophy-cards',
		templates: [
			{
				id: 'trophy-cards',
				name: 'Showcase Grid Piala Emas',
				description: 'Grid kartu dengan badge medali, nama peraih, dan tingkat kejuaraan.',
				iconType: 'cards'
			},
			{
				id: 'timeline',
				name: 'Garis Waktu Prestasi',
				description: 'Tata letak timeline kronologis vertikal menandai pencapaian dari tahun ke tahun.',
				iconType: 'timeline'
			},
			{
				id: 'compact-grid',
				name: 'Galeri Medali Ringkas',
				description: 'Tampilan 3-kolom padat dengan fokus kuat pada nama santri dan event lomba.',
				iconType: 'bento'
			}
		]
	},
	facilities: {
		key: 'facilities',
		name: 'Fasilitas Kampus & Asrama',
		description: 'Sarana prasarana modern (laboratorium sains, masjid kampus, asrama ber-AC, perpustakaan).',
		defaultBgStyle: 'white',
		defaultItemCount: 6,
		defaultTemplate: 'grid-specs',
		templates: [
			{
				id: 'grid-specs',
				name: 'Foto Grid dengan Tag Fasilitas',
				description: 'Foto fasilitas dengan label kategori, deskripsi, dan tag sarana pendukung.',
				iconType: 'cards'
			},
			{
				id: 'bento-gallery',
				name: 'Bento Kampus Visual',
				description: 'Susunan bento asimetris dinamis menampilkan foto-foto fasilitas utama.',
				iconType: 'bento'
			},
			{
				id: 'minimal-cards',
				name: 'Clean Lapang & Rapi',
				description: 'Grid minimalis dengan thumbnail jernih dan teks penjelasan ringkas.',
				iconType: 'split'
			}
		]
	},
	activities: {
		key: 'activities',
		name: 'Agenda & Dokumentasi Kegiatan',
		description: 'Kalender agenda santri terdekat serta potret dokumentasi kegiatan rutin harian.',
		defaultBgStyle: 'slate',
		defaultItemCount: 4,
		defaultTemplate: 'dual-grid',
		templates: [
			{
				id: 'dual-grid',
				name: 'Dual Column Agenda & Galeri',
				description: 'Kolom agenda terstruktur di kiri dan feed foto dokumentasi di kanan.',
				iconType: 'split'
			},
			{
				id: 'calendar-list',
				name: 'Kalender Agenda Fokus',
				description: 'Daftar agenda lengkap dengan tanggal, jam, dan deskripsi kegiatan santri.',
				iconType: 'timeline'
			},
			{
				id: 'gallery-masonry',
				name: 'Galeri Foto Visual',
				description: 'Grid foto kegiatan interaktif yang menonjolkan suasana kehidupan santri.',
				iconType: 'cards'
			}
		]
	},
	testimonials: {
		key: 'testimonials',
		name: 'Testimoni Santri & Wali Santri',
		description: 'Ulasan dan kisah sukses nyata dari para orang tua santri dan alumni yang telah berkuliah.',
		defaultBgStyle: 'white',
		defaultItemCount: 3,
		defaultTemplate: 'cards-grid',
		templates: [
			{
				id: 'cards-grid',
				name: 'Grid 3-Kolom Rating Bintang',
				description: 'Kartu testimoni memuat foto avatar, rating 5 bintang, nama wali, dan ulasan.',
				iconType: 'cards'
			},
			{
				id: 'quote-highlight',
				name: 'Sorotan Kutipan Utama',
				description: 'Satu ulasan paling berkesan ditampilkan besar di tengah dengan avatar pendamping.',
				iconType: 'quote'
			},
			{
				id: 'minimal-columns',
				name: 'Kolom Ulasan Bersih',
				description: 'Daftar ulasan minimalis dengan border halus dan tipografi elegan.',
				iconType: 'split'
			}
		]
	},
	faq: {
		key: 'faq',
		name: 'Tanya Jawab Populer (FAQ)',
		description: 'Jawaban atas pertanyaan yang paling sering diajukan orang tua terkait asrama dan seleksi.',
		defaultBgStyle: 'slate',
		defaultItemCount: 6,
		defaultTemplate: 'accordion-2col',
		templates: [
			{
				id: 'accordion-2col',
				name: 'Accordion Interaktif 2-Kolom',
				description: 'Daftar pertanyaan dalam 2 kolom yang dapat diklik buka-tutup dengan mulus.',
				iconType: 'accordion'
			},
			{
				id: 'card-grid',
				name: 'Kartu Pertanyaan Terbuka',
				description: 'Grid kotak pertanyaan dan jawaban yang langsung dapat dibaca tanpa diklik.',
				iconType: 'cards'
			}
		]
	},
	ppdb_cta: {
		key: 'ppdb_cta',
		name: 'Banner Ajakan PPDB Online',
		description: 'Penutup halaman beranda dengan ajakan bergabung, kuota santri, dan kontak konsultasi.',
		defaultBgStyle: 'navy',
		defaultItemCount: 1,
		defaultTemplate: 'fullwidth-banner',
		templates: [
			{
				id: 'fullwidth-banner',
				name: 'Fullwidth Banner Kontras',
				description: 'Banner penuh warna gelap navy dengan tombol WhatsApp dan pendaftaran langsung.',
				iconType: 'banner'
			},
			{
				id: 'split-countdown',
				name: 'Split Info Gelombang & Kuota',
				description: 'Teks ajakan di kiri, kartu status gelombang dan sisa kuota di kanan.',
				iconType: 'split'
			},
			{
				id: 'floating-card',
				name: 'Floating Gradient Box',
				description: 'Kotak melayang dengan aksen gradien halus dan tombol aksi ganda.',
				iconType: 'cards'
			}
		]
	}
};

export const DEFAULT_LANDING_SECTIONS: LandingSection[] = [
	{
		id: 'hero',
		sectionKey: 'hero',
		name: 'Hero Banner Utama',
		template: 'split',
		isEnabled: true,
		sortOrder: 1,
		bgStyle: 'navy',
		itemCount: 1
	},
	{
		id: 'greeting',
		sectionKey: 'greeting',
		name: 'Sambutan Kepala Sekolah',
		template: 'split-photo',
		isEnabled: true,
		sortOrder: 2,
		bgStyle: 'white',
		itemCount: 1
	},
	{
		id: 'stats',
		sectionKey: 'stats',
		name: 'Statistik & Angka Kunci',
		template: 'cards',
		isEnabled: true,
		sortOrder: 3,
		bgStyle: 'default',
		itemCount: 4
	},
	{
		id: 'pillars',
		sectionKey: 'pillars',
		name: 'Pilar & Nilai Unggulan',
		template: 'grid',
		isEnabled: true,
		sortOrder: 4,
		bgStyle: 'slate',
		itemCount: 4
	},
	{
		id: 'programs',
		sectionKey: 'programs',
		name: 'Program Pendidikan Unggulan',
		template: 'grid',
		isEnabled: true,
		sortOrder: 5,
		bgStyle: 'white',
		itemCount: 4
	},
	{
		id: 'achievements',
		sectionKey: 'achievements',
		name: 'Prestasi & Juara Santri',
		template: 'trophy-cards',
		isEnabled: true,
		sortOrder: 6,
		bgStyle: 'slate',
		itemCount: 4
	},
	{
		id: 'facilities',
		sectionKey: 'facilities',
		name: 'Fasilitas Kampus & Asrama',
		template: 'grid-specs',
		isEnabled: true,
		sortOrder: 7,
		bgStyle: 'white',
		itemCount: 6
	},
	{
		id: 'activities',
		sectionKey: 'activities',
		name: 'Agenda & Dokumentasi Kegiatan',
		template: 'dual-grid',
		isEnabled: true,
		sortOrder: 8,
		bgStyle: 'slate',
		itemCount: 4
	},
	{
		id: 'testimonials',
		sectionKey: 'testimonials',
		name: 'Testimoni Santri & Wali Santri',
		template: 'cards-grid',
		isEnabled: true,
		sortOrder: 9,
		bgStyle: 'white',
		itemCount: 3
	},
	{
		id: 'faq',
		sectionKey: 'faq',
		name: 'Tanya Jawab Populer (FAQ)',
		template: 'accordion-2col',
		isEnabled: true,
		sortOrder: 10,
		bgStyle: 'slate',
		itemCount: 6
	},
	{
		id: 'ppdb_cta',
		sectionKey: 'ppdb_cta',
		name: 'Banner Ajakan PPDB Online',
		template: 'fullwidth-banner',
		isEnabled: true,
		sortOrder: 11,
		bgStyle: 'navy',
		itemCount: 1
	}
];
