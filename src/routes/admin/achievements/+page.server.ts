import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { db, schema } from '$lib/server/db';
import { achievementsData } from '$lib/data/achievements';
import { desc, asc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const load: PageServerLoad = async () => {
	try {
		const items = await db
			.select()
			.from(schema.achievements)
			.orderBy(desc(schema.achievements.year), asc(schema.achievements.sortOrder));
		if (items.length > 0) {
			return { achievements: items };
		}
	} catch (err) {
		console.error('Error loading achievements from DB:', err);
	}

	return {
		achievements: achievementsData.map((a, idx) => ({
			id: a.id,
			title: a.title,
			winner: a.winner,
			role: a.role,
			scope: a.scope,
			category: a.category,
			level: a.level,
			year: a.year,
			organizer: a.organizer,
			description: a.description || '',
			badgeVariant: a.badgeVariant || 'emerald',
			image: (a as any).image || '',
			featured: a.featured ?? false,
			sortOrder: idx + 1,
			status: 'published'
		}))
	};
};

const saveAchievement = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const title = formData.get('title')?.toString().trim() || '';
	const winner = formData.get('winner')?.toString().trim() || '';
	const role = formData.get('role')?.toString().trim() || 'Siswa';
	const scope = formData.get('scope')?.toString().trim() || 'Akademik';
	const category = formData.get('category')?.toString().trim() || 'Sains';
	const level = formData.get('level')?.toString().trim() || 'Nasional';
	const year = parseInt(formData.get('year')?.toString() || new Date().getFullYear().toString(), 10);
	const organizer = formData.get('organizer')?.toString().trim() || '';
	const description = formData.get('description')?.toString().trim() || '';
	const badgeVariant = formData.get('badgeVariant')?.toString().trim() || 'emerald';
	const image = formData.get('image')?.toString().trim() || '';
	const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';
	const sortOrder = parseInt(formData.get('sortOrder')?.toString() || '0', 10);
	const status = formData.get('status')?.toString().trim() || 'published';

	if (!title || !winner) {
		return fail(400, { error: 'Judul prestasi dan nama pemenang/penerima wajib diisi.' });
	}

	try {
		const itemId = id || crypto.randomUUID();
		const [existing] = await db
			.select()
			.from(schema.achievements)
			.where(eq(schema.achievements.id, itemId))
			.limit(1);

		if (existing) {
			await db
				.update(schema.achievements)
				.set({
					title,
					winner,
					role,
					scope,
					category,
					level,
					year,
					organizer,
					description,
					badgeVariant,
					image,
					featured,
					sortOrder,
					status,
					updatedAt: new Date()
				})
				.where(eq(schema.achievements.id, itemId));
		} else {
			await db.insert(schema.achievements).values({
				id: itemId,
				title,
				winner,
				role,
				scope,
				category,
				level,
				year,
				organizer,
				description,
				badgeVariant,
				image,
				featured,
				sortOrder,
				status
			});
		}

		return { success: true, message: `Prestasi "${title}" berhasil disimpan.` };
	} catch (err: any) {
		console.error('Error saving achievement:', err);
		return fail(500, { error: 'Gagal menyimpan prestasi: ' + err.message });
	}
};

const deleteAchievement = async ({ request }: RequestEvent) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();

	if (!id) {
		return fail(400, { error: 'ID prestasi tidak ditemukan.' });
	}

	try {
		await db.delete(schema.achievements).where(eq(schema.achievements.id, id));
		return { success: true, message: 'Data prestasi berhasil dihapus.' };
	} catch (err: any) {
		console.error('Error deleting achievement:', err);
		return fail(500, { error: 'Gagal menghapus prestasi: ' + err.message });
	}
};

export const actions: Actions = {
	create: saveAchievement,
	update: saveAchievement,
	save: saveAchievement,
	delete: deleteAchievement
};
