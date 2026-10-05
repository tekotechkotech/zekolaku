import type { PageServerLoad, Actions } from './$types';
import { db, schema } from '$lib/server/db';
import { ppdbData } from '$lib/data/ppdb';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [entry] = await db.select().from(schema.ppdb).limit(1);
		if (entry) {
			return { ppdb: entry };
		}
	} catch (err) {
		console.error('Error fetching PPDB data from DB:', err);
	}

	return {
		ppdb: {
			id: 'default',
			status: ppdbData.status || 'Dibuka',
			academicYear: ppdbData.academicYear,
			currentWave: ppdbData.currentWave,
			deadline: ppdbData.deadline,
			consultationWa: ppdbData.consultationWa,
			whatsappUrl: ppdbData.whatsappUrl,
			registrationUrl: ppdbData.registrationUrl,
			quotaTotal: ppdbData.quotaTotal,
			description: '',
			waves: ppdbData.waves,
			requirements: ppdbData.requirements,
			steps: ppdbData.steps,
			fees: ppdbData.fees,
			faq: ppdbData.faqs
		}
	};
};

function safeJsonParse<T>(val: FormDataEntryValue | null, fallback: T): T {
	if (!val) return fallback;
	try {
		return JSON.parse(val.toString());
	} catch {
		return fallback;
	}
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		try {
			const [existing] = await db.select().from(schema.ppdb).limit(1);

			const status = formData.get('status')?.toString().trim() || (existing?.status ?? ppdbData.status);
			const academicYear = formData.get('academicYear')?.toString().trim() || (existing?.academicYear ?? ppdbData.academicYear);
			const currentWave = formData.get('currentWave')?.toString().trim() || (existing?.currentWave ?? ppdbData.currentWave);
			const deadline = formData.get('deadline')?.toString().trim() || (existing?.deadline ?? ppdbData.deadline);
			const consultationWa = formData.get('consultationWa')?.toString().trim() || (existing?.consultationWa ?? ppdbData.consultationWa);
			const whatsappUrl = formData.get('whatsappUrl')?.toString().trim() || (existing?.whatsappUrl ?? ppdbData.whatsappUrl);
			const registrationUrl = formData.get('registrationUrl')?.toString().trim() || (existing?.registrationUrl ?? ppdbData.registrationUrl);
			const quotaTotal = parseInt(
				formData.get('quotaTotal')?.toString() || `${existing?.quotaTotal ?? ppdbData.quotaTotal}`,
				10
			);
			const description = formData.get('description')?.toString().trim() || (existing?.description ?? '');

			const waves = safeJsonParse(formData.get('waves'), existing?.waves ?? ppdbData.waves);
			const fees = safeJsonParse(formData.get('fees'), existing?.fees ?? ppdbData.fees);
			const faq = safeJsonParse(formData.get('faq'), existing?.faq ?? ppdbData.faqs);
			const requirements = safeJsonParse(formData.get('requirements'), existing?.requirements ?? ppdbData.requirements);
			const steps = safeJsonParse(formData.get('steps'), existing?.steps ?? ppdbData.steps);

			if (existing) {
				await db.update(schema.ppdb).set({
					status,
					academicYear,
					currentWave,
					deadline,
					consultationWa,
					whatsappUrl,
					registrationUrl,
					quotaTotal,
					description,
					waves,
					requirements,
					steps,
					fees,
					faq,
					updatedAt: new Date()
				});
			} else {
				await db.insert(schema.ppdb).values({
					id: 'default',
					status,
					academicYear,
					currentWave,
					deadline,
					consultationWa,
					whatsappUrl,
					registrationUrl,
					quotaTotal,
					description,
					waves,
					requirements,
					steps,
					fees,
					faq
				});
			}

			return { success: true, message: 'Data konfigurasi PPDB berhasil disimpan.' };
		} catch (err: any) {
			console.error('Failed to update PPDB info:', err);
			return fail(500, { error: 'Gagal memperbarui PPDB: ' + err.message });
		}
	}
};
