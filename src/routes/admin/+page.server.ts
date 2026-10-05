import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db, schema } from '$lib/server/db';
import { count, desc, eq } from 'drizzle-orm';
import { invalidateSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/admin/login');
	}

	try {
		// News stats
		const [totalNewsResult] = await db.select({ value: count() }).from(schema.news);
		const [publishedNewsResult] = await db
			.select({ value: count() })
			.from(schema.news)
			.where(eq(schema.news.status, 'published'));
		const [draftNewsResult] = await db
			.select({ value: count() })
			.from(schema.news)
			.where(eq(schema.news.status, 'draft'));

		// Activities, achievements, programs, facilities count
		const [activitiesCount] = await db.select({ value: count() }).from(schema.activities);
		const [galleryCount] = await db.select({ value: count() }).from(schema.activityGallery);
		const [achievementsCount] = await db.select({ value: count() }).from(schema.achievements);
		const [programsCount] = await db.select({ value: count() }).from(schema.programs);
		const [facilitiesCount] = await db.select({ value: count() }).from(schema.facilities);

		// PPDB info
		const [ppdbSettings] = await db.select().from(schema.ppdb).limit(1);

		// Recent 5 news articles
		const recentNews = await db
			.select()
			.from(schema.news)
			.orderBy(desc(schema.news.createdAt))
			.limit(5);

		// Recent 5 activities
		const recentActivities = await db
			.select()
			.from(schema.activities)
			.orderBy(desc(schema.activities.createdAt))
			.limit(5);

		const totalNews = Number(totalNewsResult?.value ?? 0);
		const publishedNews = Number(publishedNewsResult?.value ?? 0);
		const draftNews = Number(draftNewsResult?.value ?? 0);
		const totalActivities = Number(activitiesCount?.value ?? 0) + Number(galleryCount?.value ?? 0);
		const totalAchievements = Number(achievementsCount?.value ?? 0);
		const totalPrograms = Number(programsCount?.value ?? 0);
		const totalFacilities = Number(facilitiesCount?.value ?? 0);
		const ppdbStatus = ppdbSettings?.status || 'Dibuka';
		const academicYear = ppdbSettings?.academicYear || '2026/2027';

		return {
			user: locals.user,
			metrics: {
				totalNews,
				publishedNews,
				draftNews,
				totalActivities,
				totalAchievements,
				totalPrograms,
				totalFacilities,
				ppdbStatus,
				academicYear
			},
			stats: {
				totalNews,
				publishedNews,
				draftNews,
				totalActivities,
				totalAchievements,
				totalPrograms,
				totalFacilities,
				ppdbStatus,
				academicYear
			},
			recentNews,
			recentActivities
		};
	} catch (error) {
		console.error('Admin dashboard load error:', error);
		return {
			user: locals.user,
			metrics: {
				totalNews: 0,
				publishedNews: 0,
				draftNews: 0,
				totalActivities: 0,
				totalAchievements: 0,
				totalPrograms: 0,
				totalFacilities: 0,
				ppdbStatus: 'Dibuka',
				academicYear: '2026/2027'
			},
			stats: {
				totalNews: 0,
				publishedNews: 0,
				draftNews: 0,
				totalActivities: 0,
				totalAchievements: 0,
				totalPrograms: 0,
				totalFacilities: 0,
				ppdbStatus: 'Dibuka',
				academicYear: '2026/2027'
			},
			recentNews: [],
			recentActivities: []
		};
	}
};

export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		const sessionId = cookies.get('session_id');
		if (sessionId) {
			await invalidateSession(sessionId);
			cookies.delete('session_id', { path: '/' });
		}
		locals.user = null;
		locals.session = null;
		throw redirect(303, '/admin/login');
	}
};
