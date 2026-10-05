import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db, schema } from '$lib/server/db';
import { eq, desc, ne, and } from 'drizzle-orm';
import { newsArticles } from '$lib/data/news';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	try {
		const [dbArticle] = await db
			.select()
			.from(schema.news)
			.where(eq(schema.news.slug, slug))
			.limit(1);

		if (dbArticle) {
			const formattedArticle = {
				...dbArticle,
				author: {
					name: dbArticle.authorName,
					role: dbArticle.authorRole,
					avatar: dbArticle.authorAvatar || undefined
				}
			};

			const related = await db
				.select()
				.from(schema.news)
				.where(and(eq(schema.news.status, 'published'), ne(schema.news.slug, slug)))
				.orderBy(desc(schema.news.createdAt))
				.limit(3);

			const formattedRelated = related.map((r) => ({
				...r,
				author: {
					name: r.authorName,
					role: r.authorRole,
					avatar: r.authorAvatar || undefined
				}
			}));

			return {
				article: formattedArticle,
				relatedArticles: formattedRelated
			};
		}
	} catch (err) {
		console.error('Error fetching article from DB:', err);
	}

	// Fallback to static news data
	const staticArticle = newsArticles.find((a) => a.slug === slug);
	if (!staticArticle) {
		throw error(404, `Artikel berita "${slug}" tidak ditemukan.`);
	}

	const relatedArticles = newsArticles
		.filter((a) => a.slug !== slug)
		.slice(0, 3);

	return {
		article: staticArticle,
		relatedArticles
	};
};
