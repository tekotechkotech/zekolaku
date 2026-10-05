import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { asc, eq } from 'drizzle-orm';
import { facilitiesData } from '$lib/data/facilities';

export const load: PageServerLoad = async () => {
	try {
		const items = await db
			.select()
			.from(schema.facilities)
			.where(eq(schema.facilities.status, 'published'))
			.orderBy(asc(schema.facilities.sortOrder));

		if (items.length > 0) {
			return {
				facilities: items,
				facilitiesData: items
			};
		}
	} catch (error) {
		console.error('Error fetching facilities from DB:', error);
	}

	return {
		facilities: facilitiesData,
		facilitiesData
	};
};
