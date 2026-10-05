import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { db, schema } from '$lib/server/db';
import { programsData } from '$lib/data/programs';
import { asc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const load: PageServerLoad = async () => {
	try {
		const items = await db.select().from(schema.programs).orderBy(asc(schema.programs.sortOrder));
		if (items.length > 0) {
			return { programs: items };
		}
	} catch (err) {
		console.error('Error fetching programs from DB:', err);
	}

	return {
		programs: programsData.map((p, idx) => ({
			id: p.id,
			slug: p.id,
			name: p.name,
			category: p.category,
			badge: p.badge,
			description: p.description,
			competencies: p.competencies,
			prospects: p.prospects,
			facilities: p.facilities,
			image: p.image,
			featured: p.featured ?? false,
			sortOrder: idx + 1,
			status: 'published'
		}))
	};
};

const saveProgram = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const name = formData.get('name')?.toString().trim() || '';
	const slug = formData.get('slug')?.toString().trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	const category = formData.get('category')?.toString().trim() || 'Reguler';
	const badge = formData.get('badge')?.toString().trim() || 'Unggulan';
	const description = formData.get('description')?.toString().trim() || '';
	const image = formData.get('image')?.toString().trim() || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200';
	const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';
	const sortOrder = parseInt(formData.get('sortOrder')?.toString() || '0', 10);
	const status = formData.get('status')?.toString().trim() || 'published';

	const competenciesRaw = formData.get('competencies')?.toString() || '[]';
	const prospectsRaw = formData.get('prospects')?.toString() || '[]';
	const facilitiesRaw = formData.get('facilities')?.toString() || '[]';

	let competencies: string[] = [];
	let prospects: string[] = [];
	let facilities: string[] = [];
	try {
		competencies = JSON.parse(competenciesRaw);
		prospects = JSON.parse(prospectsRaw);
		facilities = JSON.parse(facilitiesRaw);
	} catch (e) {
		console.error('JSON parse error:', e);
	}

	if (!name) {
		return fail(400, { error: 'Nama program wajib diisi.' });
	}

	try {
		const itemId = id || slug || crypto.randomUUID();
		const [existing] = await db
			.select()
			.from(schema.programs)
			.where(eq(schema.programs.id, itemId))
			.limit(1);

		if (existing) {
			await db
				.update(schema.programs)
				.set({
					name,
					slug,
					category,
					badge,
					description,
					image,
					featured,
					sortOrder,
					status,
					competencies,
					prospects,
					facilities,
					updatedAt: new Date()
				})
				.where(eq(schema.programs.id, itemId));
		} else {
			await db.insert(schema.programs).values({
				id: itemId,
				name,
				slug,
				category,
				badge,
				description,
				image,
				featured,
				sortOrder,
				status,
				competencies,
				prospects,
				facilities
			});
		}

		return { success: true, message: `Program "${name}" berhasil disimpan.` };
	} catch (err: any) {
		console.error('Error saving program:', err);
		return fail(500, { error: 'Gagal menyimpan program: ' + err.message });
	}
};

const deleteProgram = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();

	if (!id) {
		return fail(400, { error: 'ID program tidak ditemukan.' });
	}

	try {
		await db.delete(schema.programs).where(eq(schema.programs.id, id));
		return { success: true, message: 'Program berhasil dihapus.' };
	} catch (err: any) {
		console.error('Error deleting program:', err);
		return fail(500, { error: 'Gagal menghapus program: ' + err.message });
	}
};

export const actions: Actions = {
	create: saveProgram,
	update: saveProgram,
	save: saveProgram,
	delete: deleteProgram
};
