import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import { newsArticles } from '$lib/data/news';

export const load: PageServerLoad = async () => {
	try {
		const items = await db
			.select()
			.from(schema.news)
			.where(eq(schema.news.status, 'published'))
			.orderBy(desc(schema.news.createdAt));

		if (items.length > 0) {
			const formattedArticles = items.map((item) => ({
				...item,
				author: {
					name: item.authorName,
					role: item.authorRole,
					avatar: item.authorAvatar || undefined
				}
			}));

			return {
				articles: formattedArticles,
				newsArticles: formattedArticles
			};
		}
	} catch (error) {
		console.error('Error loading berita from DB:', error);
	}

	return {
		articles: newsArticles,
		newsArticles: newsArticles
	};
};
