import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { db, schema } from '$lib/server/db';
import { asc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { slides: [] };
	}

	try {
		const slides = await db
			.select()
			.from(schema.heroSlides)
			.orderBy(asc(schema.heroSlides.sortOrder));

		return { slides };
	} catch (err) {
		console.error('Error fetching hero slides from DB:', err);
		return { slides: [] };
	}
};

const saveSlide = async ({ request, locals }: RequestEvent) => {
	if (!locals.user) {
		return fail(401, { error: 'Sesi anda telah berakhir. Silakan login kembali.' });
	}

	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const title = formData.get('title')?.toString().trim() || '';
	const subtitle = formData.get('subtitle')?.toString().trim() || '';
	const badgeText = formData.get('badgeText')?.toString().trim() || null;
	const image = formData.get('image')?.toString().trim() || '';
	const primaryCtaText = formData.get('primaryCtaText')?.toString().trim() || 'Daftar Santri Baru';
	const primaryCtaLink = formData.get('primaryCtaLink')?.toString().trim() || '/ppdb';
	const secondaryCtaText = formData.get('secondaryCtaText')?.toString().trim() || null;
	const secondaryCtaLink = formData.get('secondaryCtaLink')?.toString().trim() || null;
	const sortOrder = parseInt(formData.get('sortOrder')?.toString() || '1', 10);
	const status = formData.get('status')?.toString().trim() || 'published';

	if (!title) {
		return fail(400, { error: 'Judul slide wajib diisi.' });
	}
	if (!subtitle) {
		return fail(400, { error: 'Deskripsi / subjudul slide wajib diisi.' });
	}
	if (!image) {
		return fail(400, { error: 'Foto latar belakang slide wajib diisi.' });
	}

	try {
		if (id) {
			await db
				.update(schema.heroSlides)
				.set({
					title,
					subtitle,
					badgeText,
					image,
					primaryCtaText,
					primaryCtaLink,
					secondaryCtaText,
					secondaryCtaLink,
					sortOrder,
					status
				})
				.where(eq(schema.heroSlides.id, id));

			return { success: true, message: 'Slide hero berhasil diperbarui!' };
		} else {
			const newId = `slide-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
			await db.insert(schema.heroSlides).values({
				id: newId,
				title,
				subtitle,
				badgeText,
				image,
				primaryCtaText,
				primaryCtaLink,
				secondaryCtaText,
				secondaryCtaLink,
				sortOrder,
				status
			});

			return { success: true, message: 'Slide hero baru berhasil ditambahkan!' };
		}
	} catch (err: any) {
		console.error('Error saving hero slide:', err);
		return fail(500, { error: `Gagal menyimpan slide: ${err.message}` });
	}
};

const deleteSlide = async ({ request, locals }: RequestEvent) => {
	if (!locals.user) {
		return fail(401, { error: 'Sesi anda telah berakhir.' });
	}

	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();

	if (!id) {
		return fail(400, { error: 'ID slide tidak ditemukan.' });
	}

	try {
		await db.delete(schema.heroSlides).where(eq(schema.heroSlides.id, id));
		return { success: true, message: 'Slide hero berhasil dihapus.' };
	} catch (err: any) {
		console.error('Error deleting hero slide:', err);
		return fail(500, { error: `Gagal menghapus slide: ${err.message}` });
	}
};

const toggleStatus = async ({ request, locals }: RequestEvent) => {
	if (!locals.user) {
		return fail(401, { error: 'Sesi anda telah berakhir.' });
	}

	const formData = await request.formData();
	const id = formData.get('id')?.toString().trim();
	const currentStatus = formData.get('currentStatus')?.toString().trim();

	if (!id) {
		return fail(400, { error: 'ID slide tidak ditemukan.' });
	}

	const newStatus = currentStatus === 'published' ? 'draft' : 'published';

	try {
		await db
			.update(schema.heroSlides)
			.set({ status: newStatus })
			.where(eq(schema.heroSlides.id, id));

		return { success: true, message: `Status slide diubah menjadi ${newStatus}.` };
	} catch (err: any) {
		console.error('Error toggling status:', err);
		return fail(500, { error: `Gagal mengubah status: ${err.message}` });
	}
};

export const actions: Actions = {
	save: saveSlide,
	delete: deleteSlide,
	toggleStatus
};
