import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { asc, eq } from 'drizzle-orm';
import { programsData } from '$lib/data/programs';

export const load: PageServerLoad = async () => {
	try {
		const items = await db
			.select()
			.from(schema.programs)
			.where(eq(schema.programs.status, 'published'))
			.orderBy(asc(schema.programs.sortOrder));

		if (items.length > 0) {
			return {
				programs: items,
				programsData: items
			};
		}
	} catch (error) {
		console.error('Error fetching programs from DB:', error);
	}

	return {
		programs: programsData,
		programsData
	};
};
