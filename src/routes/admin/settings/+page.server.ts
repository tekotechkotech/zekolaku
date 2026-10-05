import type { PageServerLoad, Actions } from './$types';
import { db, schema } from '$lib/server/db';
import { contactData } from '$lib/data/contact';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [settings] = await db.select().from(schema.siteSettings).limit(1);
		if (settings) {
			return { settings };
		}
	} catch (err) {
		console.error('Error fetching site settings from DB:', err);
	}

	return {
		settings: {
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
			tiktok: contactData.socials.tiktok
		}
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		try {
			const address = formData.get('address')?.toString().trim() || contactData.address;
			const city = formData.get('city')?.toString().trim() || contactData.city;
			const province = formData.get('province')?.toString().trim() || contactData.province;
			const postalCode = formData.get('postalCode')?.toString().trim() || contactData.postalCode;
			const phone = formData.get('phone')?.toString().trim() || contactData.phone;
			const whatsapp = formData.get('whatsapp')?.toString().trim() || contactData.whatsapp;
			const whatsappUrl = formData.get('whatsappUrl')?.toString().trim() || contactData.whatsappUrl;
			const email = formData.get('email')?.toString().trim() || contactData.email;
			const hours = formData.get('hours')?.toString().trim() || contactData.officeHours;
			const googleMapsEmbedUrl = formData.get('googleMapsEmbedUrl')?.toString().trim() || contactData.googleMapsEmbedUrl;
			const googleMapsUrl = formData.get('googleMapsUrl')?.toString().trim() || contactData.googleMapsUrl;
			const instagram = formData.get('instagram')?.toString().trim() || contactData.socials.instagram;
			const youtube = formData.get('youtube')?.toString().trim() || contactData.socials.youtube;
			const facebook = formData.get('facebook')?.toString().trim() || contactData.socials.facebook;
			const tiktok = formData.get('tiktok')?.toString().trim() || contactData.socials.tiktok;

			const [existing] = await db.select().from(schema.siteSettings).limit(1);

			if (existing) {
				await db.update(schema.siteSettings).set({
					address,
					city,
					province,
					postalCode,
					phone,
					whatsapp,
					whatsappUrl,
					email,
					hours,
					googleMapsEmbedUrl,
					googleMapsUrl,
					instagram,
					youtube,
					facebook,
					tiktok,
					updatedAt: new Date()
				});
			} else {
				await db.insert(schema.siteSettings).values({
					id: 'default',
					address,
					city,
					province,
					postalCode,
					phone,
					whatsapp,
					whatsappUrl,
					email,
					hours,
					googleMapsEmbedUrl,
					googleMapsUrl,
					instagram,
					youtube,
					facebook,
					tiktok
				});
			}

			return { success: true, message: 'Pengaturan website berhasil disimpan.' };
		} catch (err: any) {
			console.error('Failed to update site settings:', err);
			return fail(500, { error: 'Gagal memperbarui pengaturan: ' + err.message });
		}
	}
};
