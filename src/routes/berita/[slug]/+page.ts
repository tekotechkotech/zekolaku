import { error } from '@sveltejs/kit';
import { newsArticles } from '$lib/data/news';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = newsArticles.find((a) => a.slug === params.slug);

	if (!article) {
		throw error(404, `Artikel berita "${params.slug}" tidak ditemukan.`);
	}

	const relatedArticles = newsArticles
		.filter((a) => a.slug !== params.slug)
		.slice(0, 3);

	return {
		article,
		relatedArticles
	};
};
