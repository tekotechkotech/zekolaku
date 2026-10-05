import type { LayoutServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { schoolData, schoolPillars, schoolStats } from '$lib/data/school';
import { contactData } from '$lib/data/contact';
import { defaultTheme } from '$lib/theme';

export const load: LayoutServerLoad = async () => {
	try {
		const [profile] = await db.select().from(schema.schoolProfile).limit(1);
		const [settings] = await db.select().from(schema.siteSettings).limit(1);

		return {
			schoolProfile: profile || {
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
			},
			siteSettings: settings
				? {
						...settings,
						themeConfig: settings.themeConfig || defaultTheme
				  }
				: {
						id: 'default',
						address: contactData.address,
						city: contactData.city,
						province: contactData.province,
						postalCode: contactData.postalCode,
						phone: contactData.phone,
						whatsapp: contactData.whatsapp,
						whatsappUrl: contactData.whatsappUrl,
						email: contactData.email,
						hours: contactData.officeHours,
						googleMapsEmbedUrl: contactData.googleMapsEmbedUrl,
						googleMapsUrl: contactData.googleMapsUrl,
						instagram: contactData.socials.instagram,
						youtube: contactData.socials.youtube,
						facebook: contactData.socials.facebook,
						tiktok: contactData.socials.tiktok,
						themeConfig: defaultTheme
				  }
		};
	} catch (error) {
		console.error('Error in root layout load:', error);
		return {
			schoolProfile: {
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
			},
			siteSettings: {
				id: 'default',
				address: contactData.address,
				city: contactData.city,
				province: contactData.province,
				postalCode: contactData.postalCode,
				phone: contactData.phone,
				whatsapp: contactData.whatsapp,
				whatsappUrl: contactData.whatsappUrl,
				email: contactData.email,
				hours: contactData.officeHours,
				googleMapsEmbedUrl: contactData.googleMapsEmbedUrl,
				googleMapsUrl: contactData.googleMapsUrl,
				instagram: contactData.socials.instagram,
				youtube: contactData.socials.youtube,
				facebook: contactData.socials.facebook,
				tiktok: contactData.socials.tiktok,
				themeConfig: defaultTheme
			}
		};
	}
};
