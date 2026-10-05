import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { db, schema } from '$lib/server/db';
import { facilitiesData } from '$lib/data/facilities';
import { asc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const load: PageServerLoad = async () => {
	try {
		const items = await db.select().from(schema.facilities).orderBy(asc(schema.facilities.sortOrder));
		if (items.length > 0) {
			return { facilities: items };
		}
	} catch (err) {
		console.error('Error fetching facilities from DB:', err);
	}

	return {
		facilities: facilitiesData.map((f, idx) => ({
			id: f.id,
			slug: f.id,
			name: f.name,
			category: f.category,
			description: f.description,
			image: f.image,
			specs: f.specs || [],
			highlight: f.highlight || null,
			featured: f.featured ?? false,
			sortOrder: idx + 1,
			status: 'published'
		}))
	};
};

const saveFacility = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const name = formData.get('name')?.toString().trim() || '';
	const slug = formData.get('slug')?.toString().trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	const category = formData.get('category')?.toString().trim() || 'Fasilitas';
	const description = formData.get('description')?.toString().trim() || '';
	const image = formData.get('image')?.toString().trim() || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200';
	const highlight = formData.get('highlight')?.toString().trim() || null;
	const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';
	const sortOrder = parseInt(formData.get('sortOrder')?.toString() || '0', 10);
	const status = formData.get('status')?.toString().trim() || 'published';

	const specsRaw = formData.get('specs')?.toString() || '[]';
	let specs: string[] = [];
	try {
		specs = JSON.parse(specsRaw);
	} catch (e) {
		console.error('JSON parse specs error:', e);
	}

	if (!name) {
		return fail(400, { error: 'Nama fasilitas wajib diisi.' });
	}

	try {
		const itemId = id || slug || crypto.randomUUID();
		const [existing] = await db
			.select()
			.from(schema.facilities)
			.where(eq(schema.facilities.id, itemId))
			.limit(1);

		if (existing) {
			await db
				.update(schema.facilities)
				.set({
					name,
					slug,
					category,
					description,
					image,
					specs,
					highlight,
					featured,
					sortOrder,
					status,
					updatedAt: new Date()
				})
				.where(eq(schema.facilities.id, itemId));
		} else {
			await db.insert(schema.facilities).values({
				id: itemId,
				name,
				slug,
				category,
				description,
				image,
				specs,
				highlight,
				featured,
				sortOrder,
				status
			});
		}

		return { success: true, message: `Fasilitas "${name}" berhasil disimpan.` };
	} catch (err: any) {
		console.error('Error saving facility:', err);
		return fail(500, { error: 'Gagal menyimpan fasilitas: ' + err.message });
	}
};

const deleteFacility = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();

	if (!id) {
		return fail(400, { error: 'ID fasilitas tidak ditemukan.' });
	}

	try {
		await db.delete(schema.facilities).where(eq(schema.facilities.id, id));
		return { success: true, message: 'Fasilitas berhasil dihapus.' };
	} catch (err: any) {
		console.error('Error deleting facility:', err);
		return fail(500, { error: 'Gagal menghapus fasilitas: ' + err.message });
	}
};

export const actions: Actions = {
	create: saveFacility,
	update: saveFacility,
	save: saveFacility,
	delete: deleteFacility
};
