import { newsArticles } from '$lib/data/news';
import type { RequestHandler } from './$types';

export const prerender = true;

const SITE_URL = 'https://madaniglobal.sch.id';

const staticRoutes = [
	{ path: '', changefreq: 'daily', priority: '1.0' },
	{ path: '/tentang', changefreq: 'monthly', priority: '0.8' },
	{ path: '/program', changefreq: 'weekly', priority: '0.9' },
	{ path: '/fasilitas', changefreq: 'monthly', priority: '0.8' },
	{ path: '/prestasi', changefreq: 'weekly', priority: '0.8' },
	{ path: '/kegiatan', changefreq: 'weekly', priority: '0.8' },
	{ path: '/berita', changefreq: 'daily', priority: '0.9' },
	{ path: '/ppdb', changefreq: 'daily', priority: '1.0' },
	{ path: '/kontak', changefreq: 'monthly', priority: '0.8' }
];

export const GET: RequestHandler = () => {
	const now = new Date().toISOString().split('T')[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
	.map(
		(route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
${newsArticles
	.map(
		(article) => `  <url>
    <loc>${SITE_URL}/berita/${article.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
