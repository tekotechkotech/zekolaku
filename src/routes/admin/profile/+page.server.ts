import type { PageServerLoad, Actions } from './$types';
import { db, schema } from '$lib/server/db';
import { schoolData, schoolPillars, schoolStats } from '$lib/data/school';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [profile] = await db.select().from(schema.schoolProfile).limit(1);
		if (profile) {
			return { profile };
		}
	} catch (err) {
		console.error('Error fetching school profile from DB:', err);
	}

	// Fallback to static schoolData
	return {
		profile: {
			id: 'default',
			name: schoolData.name,
			shortName: schoolData.shortName,
			type: schoolData.type,
			tagline: schoolData.tagline,
			npsn: schoolData.npsn,
			nsm: schoolData.nsm,
			accreditation: schoolData.accreditation,
			establishedYear: schoolData.establishedYear,
			vision: schoolData.vision,
			missions: schoolData.missions,
			values: schoolData.values,
			historySummary: schoolData.history.summary,
			milestones: schoolData.history.milestones,
			principalName: schoolData.principal.name,
			principalTitle: schoolData.principal.title,
			principalGreeting: schoolData.principal.greeting,
			principalPhoto: schoolData.principal.photo,
			stats: schoolStats,
			pillars: schoolPillars
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
			const [existing] = await db.select().from(schema.schoolProfile).limit(1);

			const name = formData.get('name')?.toString() || (existing?.name ?? schoolData.name);
			const shortName = formData.get('shortName')?.toString() || (existing?.shortName ?? schoolData.shortName);
			const type = formData.get('type')?.toString() || (existing?.type ?? schoolData.type);
			const tagline = formData.get('tagline')?.toString() || (existing?.tagline ?? schoolData.tagline);
			const npsn = formData.get('npsn')?.toString() || (existing?.npsn ?? schoolData.npsn);
			const nsm = formData.get('nsm')?.toString() || (existing?.nsm ?? schoolData.nsm);
			const accreditation = formData.get('accreditation')?.toString() || (existing?.accreditation ?? schoolData.accreditation);
			const establishedYear = parseInt(
				formData.get('establishedYear')?.toString() || `${existing?.establishedYear ?? schoolData.establishedYear}`,
				10
			);

			const vision = formData.get('vision')?.toString() || (existing?.vision ?? schoolData.vision);
			const missions = safeJsonParse<string[]>(
				formData.get('missions'),
				existing?.missions ?? schoolData.missions
			);
			const values = safeJsonParse(
				formData.get('values'),
				existing?.values ?? schoolData.values
			);
			const historySummary = formData.get('historySummary')?.toString() || (existing?.historySummary ?? schoolData.history.summary);
			const milestones = safeJsonParse(
				formData.get('milestones'),
				existing?.milestones ?? schoolData.history.milestones
			);

			const principalName = formData.get('principalName')?.toString() || (existing?.principalName ?? schoolData.principal.name);
			const principalTitle = formData.get('principalTitle')?.toString() || (existing?.principalTitle ?? schoolData.principal.title);
			const principalGreeting = formData.get('principalGreeting')?.toString() || (existing?.principalGreeting ?? schoolData.principal.greeting);
			const principalPhoto = formData.get('principalPhoto')?.toString() || (existing?.principalPhoto ?? schoolData.principal.photo);

			const stats = safeJsonParse(
				formData.get('stats'),
				existing?.stats ?? schoolStats
			);
			const pillars = safeJsonParse(
				formData.get('pillars'),
				existing?.pillars ?? schoolPillars
			);

			if (existing) {
				await db.update(schema.schoolProfile).set({
					name,
					shortName,
					type,
					tagline,
					npsn,
					nsm,
					accreditation,
					establishedYear,
					vision,
					missions,
					values,
					historySummary,
					milestones,
					principalName,
					principalTitle,
					principalGreeting,
					principalPhoto,
					stats,
					pillars,
					updatedAt: new Date()
				});
			} else {
				await db.insert(schema.schoolProfile).values({
					id: 'default',
					name,
					shortName,
					type,
					tagline,
					npsn,
					nsm,
					accreditation,
					establishedYear,
					vision,
					missions,
					values,
					historySummary,
					milestones,
					principalName,
					principalTitle,
					principalGreeting,
					principalPhoto,
					stats,
					pillars
				});
			}

			return { success: true, message: 'Profil sekolah berhasil diperbarui.' };
		} catch (err: any) {
			console.error('Failed to update school profile:', err);
			return fail(500, { error: 'Gagal menyimpan perubahan profil sekolah: ' + err.message });
		}
	}
};
