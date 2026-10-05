import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { db, schema } from '$lib/server/db';
import { newsArticles } from '$lib/data/news';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const load: PageServerLoad = async () => {
	try {
		const items = await db.select().from(schema.news).orderBy(desc(schema.news.createdAt));
		if (items.length > 0) {
			return { news: items };
		}
	} catch (err) {
		console.error('Error loading news from DB:', err);
	}

	return {
		news: newsArticles.map((n, idx) => ({
			id: n.slug || `news-${idx}`,
			slug: n.slug,
			title: n.title,
			date: n.date,
			category: n.category,
			summary: n.summary,
			content: n.content,
			image: n.image,
			readTime: n.readTime,
			authorName: n.author.name,
			authorRole: n.author.role,
			authorAvatar: n.author.avatar || null,
			featured: n.featured ?? false,
			tags: n.tags || [],
			status: 'published'
		}))
	};
};

const saveNews = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const title = formData.get('title')?.toString().trim() || '';
	let slug = formData.get('slug')?.toString().trim() || '';
	if (!slug) {
		slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	}
	const category = formData.get('category')?.toString().trim() || 'Akademik';
	const date = formData.get('date')?.toString().trim() || new Date().toISOString().split('T')[0];
	const authorName = formData.get('authorName')?.toString().trim() || 'Redaksi Madani';
	const authorRole = formData.get('authorRole')?.toString().trim() || 'Tim Humas & Media';
	const authorAvatar = formData.get('authorAvatar')?.toString().trim() || '';
	const readTime = formData.get('readTime')?.toString().trim() || '3 menit';
	const image = formData.get('image')?.toString().trim() || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200';
	const summary = formData.get('summary')?.toString().trim() || '';
	const status = formData.get('status')?.toString().trim() || 'published';
	const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';

	// Content can be submitted as raw textarea lines or JSON string
	const rawContent = formData.get('content')?.toString() || '';
	let content: string[] = [];
	try {
		if (rawContent.startsWith('[')) {
			content = JSON.parse(rawContent);
		} else {
			content = rawContent.split('\n\n').map((p) => p.trim()).filter(Boolean);
		}
	} catch {
		content = [rawContent];
	}

	// Tags
	const rawTags = formData.get('tags')?.toString() || '[]';
	let tags: string[] = [];
	try {
		tags = JSON.parse(rawTags);
	} catch {
		tags = rawTags.split(',').map((t) => t.trim()).filter(Boolean);
	}

	if (!title) {
		return fail(400, { error: 'Judul berita wajib diisi.' });
	}

	try {
		const itemId = id || slug || crypto.randomUUID();
		const [existing] = await db
			.select()
			.from(schema.news)
			.where(eq(schema.news.id, itemId))
			.limit(1);

		if (existing) {
			await db
				.update(schema.news)
				.set({
					title,
					slug,
					category,
					date,
					authorName,
					authorRole,
					authorAvatar,
					readTime,
					image,
					summary,
					content,
					tags,
					status,
					featured,
					updatedAt: new Date()
				})
				.where(eq(schema.news.id, itemId));
		} else {
			await db.insert(schema.news).values({
				id: itemId,
				title,
				slug,
				category,
				date,
				authorName,
				authorRole,
				authorAvatar,
				readTime,
				image,
				summary,
				content,
				tags,
				status,
				featured
			});
		}

		return { success: true, message: `Artikel "${title}" berhasil disimpan.` };
	} catch (err: any) {
		console.error('Error saving news:', err);
		return fail(500, { error: 'Gagal menyimpan artikel: ' + err.message });
	}
};

const toggleStatusAction = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();
	const currentStatus = formData.get('currentStatus')?.toString();

	if (!id) return fail(400, { error: 'ID artikel tidak ditemukan.' });

	const newStatus = currentStatus === 'published' ? 'draft' : 'published';

	try {
		await db
			.update(schema.news)
			.set({ status: newStatus, updatedAt: new Date() })
			.where(eq(schema.news.id, id));

		return {
			success: true,
			message: `Status artikel diubah menjadi ${newStatus === 'published' ? 'Terbit (Published)' : 'Draft'}.`
		};
	} catch (err: any) {
		console.error('Error toggling status:', err);
		return fail(500, { error: 'Gagal mengubah status artikel.' });
	}
};

const deleteNews = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();

	if (!id) return fail(400, { error: 'ID artikel tidak ditemukan.' });

	try {
		await db.delete(schema.news).where(eq(schema.news.id, id));
		return { success: true, message: 'Artikel berhasil dihapus.' };
	} catch (err: any) {
		console.error('Error deleting news:', err);
		return fail(500, { error: 'Gagal menghapus artikel: ' + err.message });
	}
};

export const actions: Actions = {
	create: saveNews,
	update: saveNews,
	save: saveNews,
	toggleStatus: toggleStatusAction,
	delete: deleteNews
};
