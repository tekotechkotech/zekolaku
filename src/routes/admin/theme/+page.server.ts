import type { Actions, PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { defaultTheme, THEME_PRESETS, generateShades } from '$lib/theme';
import type { ThemeConfig } from '$lib/types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const [settings] = await db.select().from(schema.siteSettings).limit(1);

	const themeConfig: ThemeConfig = settings?.themeConfig || defaultTheme;

	return {
		themeConfig,
		presets: THEME_PRESETS
	};
};

export const actions: Actions = {
	saveTheme: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Sesi anda telah berakhir. Silakan login kembali.' });
		}

		const formData = await request.formData();
		const preset = (formData.get('preset') as string) || 'emerald';
		const primaryName = (formData.get('primaryName') as string) || 'Custom Theme';
		const primaryHex = (formData.get('primaryHex') as string) || '#059669';
		const shadesRaw = formData.get('primaryShades') as string;

		let primaryShades;
		if (shadesRaw) {
			try {
				primaryShades = JSON.parse(shadesRaw);
			} catch {
				primaryShades = generateShades(primaryHex);
			}
		} else {
			const foundPreset = THEME_PRESETS.find((p) => p.id === preset);
			primaryShades = foundPreset ? foundPreset.shades : generateShades(primaryHex);
		}

		const themeConfig: ThemeConfig = {
			preset: preset as any,
			primaryName,
			primaryHex,
			primaryShades,
			updatedAt: new Date().toISOString()
		};

		try {
			await db
				.update(schema.siteSettings)
				.set({
					themeConfig,
					updatedAt: new Date()
				})
				.where(eq(schema.siteSettings.id, 'default'));

			return {
				success: true,
				message: `Palet warna '${primaryName}' berhasil disimpan dan diterapkan pada seluruh situs!`
			};
		} catch (error) {
			console.error('Error saving theme config:', error);
			return fail(500, { error: 'Gagal menyimpan pengaturan tema ke basis data.' });
		}
	},

	resetTheme: async ({ locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Sesi anda telah berakhir. Silakan login kembali.' });
		}

		try {
			await db
				.update(schema.siteSettings)
				.set({
					themeConfig: defaultTheme,
					updatedAt: new Date()
				})
				.where(eq(schema.siteSettings.id, 'default'));

			return {
				success: true,
				message: 'Tema berhasil direset ke standar Emerald (Hijau Pesantren)!'
			};
		} catch (error) {
			console.error('Error resetting theme config:', error);
			return fail(500, { error: 'Gagal mereset tema ke basis data.' });
		}
	}
};
