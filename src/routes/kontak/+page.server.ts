import type { PageServerLoad } from './$types';
import { db, schema } from '$lib/server/db';
import { contactData } from '$lib/data/contact';

export const load: PageServerLoad = async () => {
	try {
		const [settings] = await db.select().from(schema.siteSettings).limit(1);

		if (settings) {
			const formattedContact = {
				...contactData,
				address: settings.address,
				city: settings.city,
				province: settings.province,
				postalCode: settings.postalCode,
				fullAddress: `${settings.address}, ${settings.city}, ${settings.province} ${settings.postalCode}`,
				phone: settings.phone,
				whatsapp: settings.whatsapp,
				whatsappUrl: settings.whatsappUrl,
				email: settings.email,
				officeHours: settings.hours,
				googleMapsEmbedUrl: settings.googleMapsEmbedUrl,
				googleMapsUrl: settings.googleMapsUrl,
				socials: {
					instagram: settings.instagram,
					youtube: settings.youtube,
					facebook: settings.facebook,
					tiktok: settings.tiktok
				}
			};

			return {
				contact: formattedContact,
				contactData: formattedContact,
				siteSettings: settings
			};
		}
	} catch (error) {
		console.error('Error fetching contact settings from DB:', error);
	}

	return {
		contact: contactData,
		contactData,
		siteSettings: null
	};
};
