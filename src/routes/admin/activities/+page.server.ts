import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { db, schema } from '$lib/server/db';
import { activitiesData, activityGallery } from '$lib/data/activities';
import { desc, eq, asc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const load: PageServerLoad = async () => {
	let acts: any[] = [];
	let gallery: any[] = [];

	try {
		acts = await db.select().from(schema.activities).orderBy(asc(schema.activities.sortOrder), desc(schema.activities.createdAt));
	} catch (err) {
		console.error('Error fetching activities:', err);
	}

	try {
		gallery = await db.select().from(schema.activityGallery).orderBy(asc(schema.activityGallery.sortOrder), desc(schema.activityGallery.createdAt));
	} catch (err) {
		console.error('Error fetching gallery:', err);
	}

	return {
		activities: acts.length > 0 ? acts : activitiesData.map((a, idx) => ({
			id: a.id,
			title: a.title,
			slug: a.id,
			category: a.category,
			description: a.description,
			schedule: a.schedule,
			image: a.image,
			featured: a.featured ?? false,
			sortOrder: idx + 1,
			status: 'published'
		})),
		gallery: gallery.length > 0 ? gallery : activityGallery.map((g, idx) => ({
			id: g.id,
			title: g.title,
			category: g.category,
			date: g.date,
			image: g.image,
			description: g.description,
			sortOrder: idx + 1,
			status: 'published'
		}))
	};
};

const saveActivity = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const title = formData.get('title')?.toString().trim() || '';
	const slug = formData.get('slug')?.toString().trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	const category = formData.get('category')?.toString().trim() || 'Kegiatan';
	const schedule = formData.get('schedule')?.toString().trim() || 'Rutin';
	const description = formData.get('description')?.toString().trim() || '';
	const image = formData.get('image')?.toString().trim() || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200';
	const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';
	const sortOrder = parseInt(formData.get('sortOrder')?.toString() || '0', 10);
	const status = formData.get('status')?.toString().trim() || 'published';

	if (!title) {
		return fail(400, { error: 'Judul kegiatan wajib diisi.' });
	}

	try {
		const itemId = id || slug || crypto.randomUUID();
		const [existing] = await db
			.select()
			.from(schema.activities)
			.where(eq(schema.activities.id, itemId))
			.limit(1);

		if (existing) {
			await db
				.update(schema.activities)
				.set({
					title,
					slug,
					category,
					schedule,
					description,
					image,
					featured,
					sortOrder,
					status,
					updatedAt: new Date()
				})
				.where(eq(schema.activities.id, itemId));
		} else {
			await db.insert(schema.activities).values({
				id: itemId,
				title,
				slug,
				category,
				schedule,
				description,
				image,
				featured,
				sortOrder,
				status
			});
		}

		return { success: true, message: `Kegiatan "${title}" berhasil disimpan.` };
	} catch (err: any) {
		console.error('Error saving activity:', err);
		return fail(500, { error: 'Gagal menyimpan kegiatan: ' + err.message });
	}
};

const deleteActivity = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();

	if (!id) return fail(400, { error: 'ID kegiatan tidak ditemukan.' });

	try {
		await db.delete(schema.activities).where(eq(schema.activities.id, id));
		return { success: true, message: 'Kegiatan berhasil dihapus.' };
	} catch (err: any) {
		console.error('Error deleting activity:', err);
		return fail(500, { error: 'Gagal menghapus kegiatan: ' + err.message });
	}
};

const saveGallery = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const title = formData.get('title')?.toString().trim() || '';
	const category = formData.get('category')?.toString().trim() || 'Dokumentasi';
	const date = formData.get('date')?.toString().trim() || new Date().toISOString().split('T')[0];
	const image = formData.get('image')?.toString().trim() || 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200';
	const description = formData.get('description')?.toString().trim() || '';
	const sortOrder = parseInt(formData.get('sortOrder')?.toString() || '0', 10);
	const status = formData.get('status')?.toString().trim() || 'published';

	if (!title || !image) {
		return fail(400, { error: 'Judul dan URL foto galeri wajib diisi.' });
	}

	try {
		const itemId = id || crypto.randomUUID();
		const [existing] = await db
			.select()
			.from(schema.activityGallery)
			.where(eq(schema.activityGallery.id, itemId))
			.limit(1);

		if (existing) {
			await db
				.update(schema.activityGallery)
				.set({
					title,
					category,
					date,
					image,
					description,
					sortOrder,
					status,
					updatedAt: new Date()
				})
				.where(eq(schema.activityGallery.id, itemId));
		} else {
			await db.insert(schema.activityGallery).values({
				id: itemId,
				title,
				category,
				date,
				image,
				description,
				sortOrder,
				status
			});
		}

		return { success: true, message: `Foto galeri "${title}" berhasil disimpan.` };
	} catch (err: any) {
		console.error('Error saving gallery item:', err);
		return fail(500, { error: 'Gagal menyimpan foto galeri: ' + err.message });
	}
};

const deleteGallery = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();

	if (!id) return fail(400, { error: 'ID foto galeri tidak ditemukan.' });

	try {
		await db.delete(schema.activityGallery).where(eq(schema.activityGallery.id, id));
		return { success: true, message: 'Foto galeri berhasil dihapus.' };
	} catch (err: any) {
		console.error('Error deleting gallery item:', err);
		return fail(500, { error: 'Gagal menghapus foto galeri: ' + err.message });
	}
};

export const actions: Actions = {
	createActivity: saveActivity,
	updateActivity: saveActivity,
	saveActivity,
	deleteActivity,
	createGallery: saveGallery,
	updateGallery: saveGallery,
	saveGallery,
	deleteGallery
};
