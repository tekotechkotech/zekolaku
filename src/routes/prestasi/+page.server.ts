import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { desc, asc, eq } from 'drizzle-orm';
import { achievementsData } from '$lib/data/achievements';

export const load: PageServerLoad = async () => {
	try {
		const items = await db
			.select()
			.from(schema.achievements)
			.where(eq(schema.achievements.status, 'published'))
			.orderBy(desc(schema.achievements.year), asc(schema.achievements.sortOrder));

		if (items.length > 0) {
			return {
				achievements: items,
				achievementsData: items
			};
		}
	} catch (error) {
		console.error('Error fetching achievements from DB:', error);
	}

	return {
		achievements: achievementsData,
		achievementsData
	};
};
