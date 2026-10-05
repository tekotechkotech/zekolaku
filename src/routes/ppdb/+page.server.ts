import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { ppdbData } from '$lib/data/ppdb';

export const load: PageServerLoad = async () => {
	try {
		const [entry] = await db.select().from(schema.ppdb).limit(1);

		if (entry) {
			const formattedPpdb = {
				...ppdbData,
				...entry,
				faqs: entry.faq || ppdbData.faqs,
				scholarships: ppdbData.scholarships
			};

			return {
				ppdb: formattedPpdb,
				ppdbData: formattedPpdb
			};
		}
	} catch (error) {
		console.error('Error fetching PPDB from DB:', error);
	}

	return {
		ppdb: ppdbData,
		ppdbData
	};
};
