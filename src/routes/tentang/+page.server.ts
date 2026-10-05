import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { schoolData, schoolPillars, schoolStats } from '$lib/data/school';

export const load: PageServerLoad = async () => {
	try {
		const [profile] = await db.select().from(schema.schoolProfile).limit(1);

		if (profile) {
			const formattedProfile = {
				...schoolData,
				...profile,
				history: {
					summary: profile.historySummary,
					milestones: profile.milestones || schoolData.history.milestones
				},
				principal: {
					name: profile.principalName,
					title: profile.principalTitle,
					greeting: profile.principalGreeting,
					photo: profile.principalPhoto
				},
				stats: profile.stats || schoolStats,
				pillars: profile.pillars || schoolPillars
			};

			return {
				profile: formattedProfile,
				schoolProfile: formattedProfile,
				schoolData: formattedProfile
			};
		}
	} catch (error) {
		console.error('Error fetching profile from DB:', error);
	}

	return {
		profile: schoolData,
		schoolProfile: schoolData,
		schoolData
	};
};
