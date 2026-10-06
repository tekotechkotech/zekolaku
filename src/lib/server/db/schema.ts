import { mysqlTable, varchar, text, int, boolean, timestamp, json } from 'drizzle-orm/mysql-core';
import type { ThemeConfig, SectionBgStyle } from '$lib/types';

export const users = mysqlTable('users', {
	id: varchar('id', { length: 36 }).primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	role: varchar('role', { length: 50 }).notNull().default('admin'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const sessions = mysqlTable('sessions', {
	id: varchar('id', { length: 128 }).primaryKey(),
	userId: varchar('user_id', { length: 36 })
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const schoolProfile = mysqlTable('school_profile', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	shortName: varchar('short_name', { length: 100 }).notNull(),
	type: varchar('type', { length: 255 }).notNull(),
	tagline: text('tagline').notNull(),
	npsn: varchar('npsn', { length: 50 }).notNull(),
	nsm: varchar('nsm', { length: 50 }).notNull(),
	accreditation: varchar('accreditation', { length: 100 }).notNull(),
	establishedYear: int('established_year').notNull(),
	vision: text('vision').notNull(),
	missions: json('missions').$type<string[]>().notNull(),
	values: json('values').$type<{ title: string; description: string }[]>().notNull(),
	historySummary: text('history_summary').notNull(),
	milestones: json('milestones').$type<{ year: number; title: string; description: string }[]>().notNull(),
	principalName: varchar('principal_name', { length: 255 }).notNull(),
	principalTitle: varchar('principal_title', { length: 255 }).notNull(),
	principalGreeting: text('principal_greeting').notNull(),
	principalPhoto: text('principal_photo').notNull(),
	stats: json('stats').$type<{ value: string; label: string; description?: string }[]>().notNull(),
	pillars: json('pillars').$type<{ id: string; title: string; description: string; iconName: string; highlight: string }[]>().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const programs = mysqlTable('programs', {
	id: varchar('id', { length: 100 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	category: varchar('category', { length: 100 }).notNull(),
	badge: varchar('badge', { length: 100 }).notNull(),
	description: text('description').notNull(),
	competencies: json('competencies').$type<string[]>().notNull(),
	prospects: json('prospects').$type<string[]>().notNull(),
	facilities: json('facilities').$type<string[]>().notNull(),
	image: text('image').notNull(),
	featured: boolean('featured').default(false).notNull(),
	sortOrder: int('sort_order').default(0).notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const facilities = mysqlTable('facilities', {
	id: varchar('id', { length: 100 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	category: varchar('category', { length: 100 }).notNull(),
	description: text('description').notNull(),
	image: text('image').notNull(),
	specs: json('specs').$type<string[]>().notNull(),
	highlight: text('highlight'),
	featured: boolean('featured').default(false).notNull(),
	sortOrder: int('sort_order').default(0).notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const achievements = mysqlTable('achievements', {
	id: varchar('id', { length: 100 }).primaryKey(),
	title: text('title').notNull(),
	winner: varchar('winner', { length: 255 }).notNull(),
	role: varchar('role', { length: 50 }).notNull(),
	scope: varchar('scope', { length: 50 }).notNull(),
	category: varchar('category', { length: 100 }).notNull(),
	level: varchar('level', { length: 50 }).notNull(),
	year: int('year').notNull(),
	organizer: text('organizer').notNull(),
	description: text('description'),
	badgeVariant: varchar('badge_variant', { length: 50 }).default('emerald').notNull(),
	image: text('image'),
	featured: boolean('featured').default(false).notNull(),
	sortOrder: int('sort_order').default(0).notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const activities = mysqlTable('activities', {
	id: varchar('id', { length: 100 }).primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	category: varchar('category', { length: 100 }).notNull(),
	description: text('description').notNull(),
	schedule: varchar('schedule', { length: 255 }).notNull(),
	image: text('image').notNull(),
	featured: boolean('featured').default(false).notNull(),
	sortOrder: int('sort_order').default(0).notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const activityGallery = mysqlTable('activity_gallery', {
	id: varchar('id', { length: 100 }).primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	category: varchar('category', { length: 100 }).notNull(),
	date: varchar('date', { length: 100 }).notNull(),
	image: text('image').notNull(),
	description: text('description').notNull(),
	sortOrder: int('sort_order').default(0).notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const news = mysqlTable('news', {
	id: varchar('id', { length: 100 }).primaryKey(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	title: varchar('title', { length: 255 }).notNull(),
	date: varchar('date', { length: 100 }).notNull(),
	category: varchar('category', { length: 100 }).notNull(),
	summary: text('summary').notNull(),
	content: json('content').$type<string[]>().notNull(),
	image: text('image').notNull(),
	readTime: varchar('read_time', { length: 50 }).notNull(),
	authorName: varchar('author_name', { length: 255 }).notNull(),
	authorRole: varchar('author_role', { length: 255 }).notNull(),
	authorAvatar: text('author_avatar'),
	featured: boolean('featured').default(false).notNull(),
	tags: json('tags').$type<string[]>().notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const ppdb = mysqlTable('ppdb', {
	id: varchar('id', { length: 36 }).primaryKey(),
	status: varchar('status', { length: 50 }).notNull(),
	academicYear: varchar('academic_year', { length: 50 }).notNull(),
	currentWave: varchar('current_wave', { length: 100 }).notNull(),
	deadline: varchar('deadline', { length: 100 }).notNull(),
	consultationWa: varchar('consultation_wa', { length: 50 }).notNull(),
	whatsappUrl: text('whatsapp_url').notNull(),
	registrationUrl: text('registration_url').notNull(),
	quotaTotal: int('quota_total').notNull(),
	description: text('description'),
	waves: json('waves').$type<{ name: string; period: string; status: 'Dibuka' | 'Segera Dibuka' | 'Ditutup'; description: string }[]>().notNull(),
	requirements: json('requirements').$type<{ category: string; icon: string; items: string[] }[] | string[]>().notNull(),
	steps: json('steps').$type<{ number: string; title: string; desc: string }[]>().notNull(),
	fees: json('fees').$type<{ name: string; amount: string; type: 'Pangkal' | 'Bulanan' | 'Tahunan' | 'Opsional'; description: string }[]>().notNull(),
	faq: json('faq').$type<{ q: string; a: string }[]>().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const siteSettings = mysqlTable('site_settings', {
	id: varchar('id', { length: 36 }).primaryKey(),
	address: text('address').notNull(),
	city: varchar('city', { length: 100 }).notNull(),
	province: varchar('province', { length: 100 }).notNull(),
	postalCode: varchar('postal_code', { length: 20 }).notNull(),
	phone: varchar('phone', { length: 50 }).notNull(),
	whatsapp: varchar('whatsapp', { length: 50 }).notNull(),
	whatsappUrl: text('whatsapp_url').notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	hours: varchar('hours', { length: 255 }).notNull(),
	googleMapsEmbedUrl: text('google_maps_embed_url').notNull(),
	googleMapsUrl: text('google_maps_url').notNull(),
	instagram: text('instagram').notNull(),
	youtube: text('youtube').notNull(),
	facebook: text('facebook').notNull(),
	tiktok: text('tiktok').notNull(),
	themeConfig: json('theme_config').$type<ThemeConfig>(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const landingSections = mysqlTable('landing_sections', {
	id: varchar('id', { length: 50 }).primaryKey(),
	sectionKey: varchar('section_key', { length: 50 }).notNull(),
	name: varchar('name', { length: 100 }).notNull(),
	template: varchar('template', { length: 50 }).notNull(),
	isEnabled: boolean('is_enabled').default(true).notNull(),
	sortOrder: int('sort_order').notNull(),
	customTitle: text('custom_title'),
	customSubtitle: text('custom_subtitle'),
	badgeText: varchar('badge_text', { length: 100 }),
	bgStyle: varchar('bg_style', { length: 50 }).$type<SectionBgStyle>().default('default').notNull(),
	itemCount: int('item_count').default(4).notNull(),
	config: json('config').$type<Record<string, any>>(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const testimonials = mysqlTable('testimonials', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	role: varchar('role', { length: 100 }).notNull(),
	relation: varchar('relation', { length: 100 }).notNull(),
	content: text('content').notNull(),
	avatar: text('avatar'),
	rating: int('rating').default(5).notNull(),
	year: varchar('year', { length: 20 }).notNull(),
	sortOrder: int('sort_order').default(1).notNull(),
	featured: boolean('featured').default(true).notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});

export const heroSlides = mysqlTable('hero_slides', {
	id: varchar('id', { length: 100 }).primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	subtitle: text('subtitle').notNull(),
	badgeText: varchar('badge_text', { length: 100 }),
	image: text('image').notNull(),
	primaryCtaText: varchar('primary_cta_text', { length: 100 }).default('Daftar Santri Baru').notNull(),
	primaryCtaLink: varchar('primary_cta_link', { length: 255 }).default('/ppdb').notNull(),
	secondaryCtaText: varchar('secondary_cta_text', { length: 100 }),
	secondaryCtaLink: varchar('secondary_cta_link', { length: 255 }),
	sortOrder: int('sort_order').default(1).notNull(),
	status: varchar('status', { length: 20 }).default('published').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull()
});
