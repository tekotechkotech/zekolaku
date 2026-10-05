import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { asc, desc, eq } from 'drizzle-orm';
import {
	activitiesData,
	activityGallery,
	dailySchedule,
	extracurriculars
} from '$lib/data/activities';

type ActivityItem = typeof schema.activities.$inferSelect;
type GalleryItem = typeof schema.activityGallery.$inferSelect;

export const load: PageServerLoad = async () => {
	let acts: ActivityItem[] = [];
	let gallery: GalleryItem[] = [];

	try {
		acts = await db
			.select()
			.from(schema.activities)
			.where(eq(schema.activities.status, 'published'))
			.orderBy(asc(schema.activities.sortOrder), desc(schema.activities.createdAt));

		gallery = await db
			.select()
			.from(schema.activityGallery)
			.where(eq(schema.activityGallery.status, 'published'))
			.orderBy(asc(schema.activityGallery.sortOrder), desc(schema.activityGallery.createdAt));
	} catch (error) {
		console.error('Error fetching activities/gallery from DB:', error);
	}

	return {
		activities: acts.length > 0 ? acts : activitiesData,
		activitiesData: acts.length > 0 ? acts : activitiesData,
		gallery: gallery.length > 0 ? gallery : activityGallery,
		activityGallery: gallery.length > 0 ? gallery : activityGallery,
		dailySchedule,
		extracurriculars
	};
};
