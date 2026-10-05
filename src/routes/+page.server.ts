import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { desc, eq, asc } from 'drizzle-orm';
import { programsData } from '$lib/data/programs';
import { facilitiesData } from '$lib/data/facilities';
import { achievementsData } from '$lib/data/achievements';
import { activitiesData } from '$lib/data/activities';
import { newsArticles } from '$lib/data/news';
import { ppdbData } from '$lib/data/ppdb';
import { schoolStats, schoolPillars } from '$lib/data/school';
import { DEFAULT_LANDING_SECTIONS } from '$lib/landing-config';

export const load: PageServerLoad = async () => {
	try {
		const [profile] = await db.select().from(schema.schoolProfile).limit(1);
		const [ppdb] = await db.select().from(schema.ppdb).limit(1);

		// Landing sections sorted by sortOrder
		const rawSections = await db
			.select()
			.from(schema.landingSections)
			.where(eq(schema.landingSections.isEnabled, true))
			.orderBy(asc(schema.landingSections.sortOrder));

		const landingSections =
			rawSections.length > 0
				? rawSections
				: DEFAULT_LANDING_SECTIONS.filter((s) => s.isEnabled);

		// Testimonials
		const rawTestimonials = await db
			.select()
			.from(schema.testimonials)
			.where(eq(schema.testimonials.status, 'published'))
			.orderBy(asc(schema.testimonials.sortOrder));

		const programs = await db
			.select()
			.from(schema.programs)
			.where(eq(schema.programs.status, 'published'))
			.orderBy(asc(schema.programs.sortOrder));

		const facilities = await db
			.select()
			.from(schema.facilities)
			.where(eq(schema.facilities.status, 'published'))
			.orderBy(asc(schema.facilities.sortOrder));

		const achievements = await db
			.select()
			.from(schema.achievements)
			.where(eq(schema.achievements.status, 'published'))
			.orderBy(desc(schema.achievements.year), asc(schema.achievements.sortOrder));

		const activities = await db
			.select()
			.from(schema.activities)
			.where(eq(schema.activities.status, 'published'))
			.orderBy(asc(schema.activities.sortOrder), desc(schema.activities.createdAt));

		const news = await db
			.select()
			.from(schema.news)
			.where(eq(schema.news.status, 'published'))
			.orderBy(desc(schema.news.createdAt))
			.limit(6);

		const featuredPrograms =
			programs.filter((p) => p.featured).length > 0
				? programs.filter((p) => p.featured)
				: programs.slice(0, 4);

		const featuredFacilities =
			facilities.filter((f) => f.featured).length > 0
				? facilities.filter((f) => f.featured)
				: facilities.slice(0, 4);

		const featuredAchievements =
			achievements.filter((a) => a.featured).length > 0
				? achievements.filter((a) => a.featured)
				: achievements.slice(0, 4);

		const recentActivities = activities.slice(0, 4);

		return {
			landingSections,
			testimonials: rawTestimonials,
			stats: profile?.stats || schoolStats,
			pillars: profile?.pillars || schoolPillars,
			ppdb: ppdb ? { ...ppdb, faqs: ppdb.faq || [] } : ppdbData,
			programs: programs.length > 0 ? programs : programsData,
			featuredPrograms: featuredPrograms.length > 0 ? featuredPrograms : programsData.filter((p) => p.featured),
			facilities: facilities.length > 0 ? facilities : facilitiesData,
			featuredFacilities: featuredFacilities.length > 0 ? featuredFacilities : facilitiesData.filter((f) => f.featured),
			achievements: achievements.length > 0 ? achievements : achievementsData,
			featuredAchievements: featuredAchievements.length > 0 ? featuredAchievements : achievementsData.filter((a) => a.featured),
			activities: activities.length > 0 ? activities : activitiesData,
			recentActivities: recentActivities.length > 0 ? recentActivities : activitiesData.slice(0, 4),
			news: news.length > 0 ? news : newsArticles.slice(0, 6)
		};
	} catch (error) {
		console.error('Error in home page load:', error);
		return {
			landingSections: DEFAULT_LANDING_SECTIONS.filter((s) => s.isEnabled),
			testimonials: [],
			stats: schoolStats,
			pillars: schoolPillars,
			ppdb: ppdbData,
			programs: programsData,
			featuredPrograms: programsData.filter((p) => p.featured),
			facilities: facilitiesData,
			featuredFacilities: facilitiesData.filter((f) => f.featured),
			achievements: achievementsData,
			featuredAchievements: achievementsData.filter((a) => a.featured),
			activities: activitiesData,
			recentActivities: activitiesData.slice(0, 4),
			news: newsArticles.slice(0, 6)
		};
	}
};
