export interface NavItem {
	label: string;
	href: string;
	badge?: string;
	description?: string;
}

export interface SchoolContact {
	address: string;
	city: string;
	province: string;
	postalCode: string;
	phone: string;
	whatsapp: string;
	whatsappUrl: string;
	email: string;
	hours: string;
	googleMapsEmbedUrl: string;
	googleMapsUrl: string;
}

export interface SchoolSocials {
	instagram: string;
	youtube: string;
	facebook: string;
	tiktok: string;
}

export interface SchoolMilestone {
	year: number;
	title: string;
	description: string;
}

export interface SchoolProfile {
	name: string;
	shortName: string;
	type: string;
	tagline: string;
	npsn: string;
	nsm: string;
	accreditation: string;
	establishedYear: number;
	contact: SchoolContact;
	socials: SchoolSocials;
	vision: string;
	missions: string[];
	values: {
		title: string;
		description: string;
	}[];
	history: {
		summary: string;
		milestones: SchoolMilestone[];
	};
	principal: {
		name: string;
		title: string;
		greeting: string;
		photo: string;
	};
}

export interface Pillar {
	id: string;
	title: string;
	description: string;
	iconName: string;
	highlight: string;
}

export interface StatItem {
	value: string;
	label: string;
	description?: string;
	iconName?: string;
}

export interface ProgramDetail {
	id: string;
	name: string;
	category: string;
	badge: string;
	description: string;
	competencies: string[];
	prospects: string[];
	facilities: string[];
	image: string;
	featured?: boolean;
}

export interface FacilityDetail {
	id: string;
	name: string;
	category: string;
	description: string;
	image: string;
	specs?: string[];
	highlight?: string;
	featured?: boolean;
}

export interface AchievementDetail {
	id: string;
	title: string;
	winner: string;
	role: 'Siswa' | 'Guru';
	scope: 'Akademik' | 'Non-Akademik';
	category: string;
	level: 'Kabupaten/Kota' | 'Provinsi' | 'Nasional' | 'Internasional';
	year: number;
	organizer: string;
	description?: string;
	badgeVariant: 'emerald' | 'navy' | 'amber' | 'blue';
	featured?: boolean;
}

export interface ActivityDetail {
	id: string;
	title: string;
	category: string;
	description: string;
	schedule: string;
	image: string;
	featured?: boolean;
}

export interface ActivityGalleryItem {
	id: string;
	title: string;
	category: string;
	date: string;
	image: string;
	description: string;
}

export interface NewsAuthor {
	name: string;
	role: string;
	avatar?: string;
}

export interface NewsArticle {
	slug: string;
	title: string;
	date: string;
	category: string;
	summary: string;
	content: string[];
	image: string;
	readTime: string;
	author: NewsAuthor;
	featured?: boolean;
	tags?: string[];
}

export interface PPDBWave {
	name: string;
	period: string;
	status: 'Dibuka' | 'Segera Dibuka' | 'Ditutup';
	description: string;
}

export interface PPDBFeeItem {
	name: string;
	amount: string;
	type: 'Pangkal' | 'Bulanan' | 'Tahunan' | 'Opsional';
	description: string;
}

export interface PPDBStep {
	number: string;
	title: string;
	desc: string;
}

export interface PPDBFaq {
	q: string;
	a: string;
}

export interface PPDBInfo {
	status: 'Dibuka' | 'Segera Dibuka' | 'Ditutup';
	academicYear: string;
	currentWave: string;
	deadline: string;
	consultationWa: string;
	registrationUrl: string;
	quotaTotal: number;
}

export interface PPDBData {
	status: 'Dibuka' | 'Segera Dibuka' | 'Ditutup';
	academicYear: string;
	currentWave: string;
	deadline: string;
	consultationWa: string;
	whatsappUrl: string;
	registrationUrl: string;
	quotaTotal: number;
	waves: PPDBWave[];
	requirements: string[];
	steps: PPDBStep[];
	fees: PPDBFeeItem[];
	scholarships: { title: string; description: string; badge: string }[];
	faqs: PPDBFaq[];
}

export interface ContactData {
	address: string;
	district: string;
	city: string;
	province: string;
	postalCode: string;
	fullAddress: string;
	phone: string;
	whatsapp: string;
	whatsappUrl: string;
	email: string;
	officeHours: string;
	googleMapsEmbedUrl: string;
	googleMapsUrl: string;
	socials: SchoolSocials;
}
