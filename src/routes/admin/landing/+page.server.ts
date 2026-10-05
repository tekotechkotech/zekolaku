import type { Actions, PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { asc, eq } from 'drizzle-orm';
import { DEFAULT_LANDING_SECTIONS, SECTION_DEFINITIONS } from '$lib/landing-config';
import type { LandingSection } from '$lib/types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		let sections = await db
			.select()
			.from(schema.landingSections)
			.orderBy(asc(schema.landingSections.sortOrder));

		if (sections.length === 0) {
			// Seed defaults if empty
			for (const sec of DEFAULT_LANDING_SECTIONS) {
				await db.insert(schema.landingSections).values({
					id: sec.id,
					sectionKey: sec.sectionKey,
					name: sec.name,
					template: sec.template,
					isEnabled: sec.isEnabled,
					sortOrder: sec.sortOrder,
					bgStyle: sec.bgStyle,
					itemCount: sec.itemCount
				});
			}

			sections = await db
				.select()
				.from(schema.landingSections)
				.orderBy(asc(schema.landingSections.sortOrder));
		}

		return {
			sections,
			sectionDefinitions: SECTION_DEFINITIONS
		};
	} catch (error) {
		console.error('Error loading landing sections:', error);
		return {
			sections: DEFAULT_LANDING_SECTIONS,
			sectionDefinitions: SECTION_DEFINITIONS
		};
	}
};

export const actions: Actions = {
	saveSections: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Sesi anda telah berakhir. Silakan login kembali.' });
		}

		const formData = await request.formData();
		const rawPayload = formData.get('sectionsData') as string;

		if (!rawPayload) {
			return fail(400, { error: 'Data tata letak tidak ditemukan.' });
		}

		try {
			const updatedSections: LandingSection[] = JSON.parse(rawPayload);

			for (const sec of updatedSections) {
				await db
					.update(schema.landingSections)
					.set({
						template: sec.template,
						isEnabled: !!sec.isEnabled,
						sortOrder: Number(sec.sortOrder),
						customTitle: sec.customTitle?.trim() || null,
						customSubtitle: sec.customSubtitle?.trim() || null,
						badgeText: sec.badgeText?.trim() || null,
						bgStyle: sec.bgStyle || 'default',
						itemCount: Number(sec.itemCount) || 4,
						updatedAt: new Date()
					})
					.where(eq(schema.landingSections.id, sec.id));
			}

			return {
				success: true,
				message: 'Tata letak beranda dan template berhasil disimpan ke database!'
			};
		} catch (error) {
			console.error('Error saving landing sections:', error);
			return fail(500, { error: 'Gagal menyimpan perubahan ke basis data.' });
		}
	},

	resetDefaults: async ({ locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Sesi anda telah berakhir. Silakan login kembali.' });
		}

		try {
			for (const sec of DEFAULT_LANDING_SECTIONS) {
				await db
					.update(schema.landingSections)
					.set({
						template: sec.template,
						isEnabled: sec.isEnabled,
						sortOrder: sec.sortOrder,
						customTitle: null,
						customSubtitle: null,
						badgeText: null,
						bgStyle: sec.bgStyle,
						itemCount: sec.itemCount,
						updatedAt: new Date()
					})
					.where(eq(schema.landingSections.id, sec.id));
			}

			return {
				success: true,
				message: 'Tata letak beranda berhasil dikembalikan ke standar awal!'
			};
		} catch (error) {
			console.error('Error resetting landing sections:', error);
			return fail(500, { error: 'Gagal mereset tata letak beranda.' });
		}
	}
};
