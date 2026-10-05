import crypto from 'node:crypto';
import { db, schema } from './index';
import { hashPassword } from '../auth';
import { schoolData, schoolPillars, schoolStats } from '../../data/school';
import { programsData } from '../../data/programs';
import { facilitiesData } from '../../data/facilities';
import { achievementsData } from '../../data/achievements';
import { activitiesData, activityGallery } from '../../data/activities';
import { newsArticles } from '../../data/news';
import { ppdbData } from '../../data/ppdb';
import { contactData } from '../../data/contact';
import { eq } from 'drizzle-orm';

export async function seed() {
	console.log('🌱 Seeding database...');

	// 1. Admin User
	const adminEmail = process.env.ADMIN_EMAIL || 'admin@zekolaku.sch.id';
	const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';
	const existingAdmin = await db
		.select()
		.from(schema.users)
		.where(eq(schema.users.email, adminEmail))
		.limit(1);

	if (existingAdmin.length === 0) {
		await db.insert(schema.users).values({
			id: crypto.randomUUID(),
			email: adminEmail,
			passwordHash: hashPassword(adminPassword),
			name: 'Administrator',
			role: 'admin'
		});
		console.log(`✅ Admin user created: ${adminEmail} / ${adminPassword}`);
	}

	// 2. School Profile
	const existingProfile = await db.select().from(schema.schoolProfile).limit(1);
	if (existingProfile.length === 0) {
		await db.insert(schema.schoolProfile).values({
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
		});
		console.log('✅ School profile seeded');
	}

	// 3. Programs
	const existingPrograms = await db.select().from(schema.programs).limit(1);
	if (existingPrograms.length === 0) {
		for (let i = 0; i < programsData.length; i++) {
			const prog = programsData[i];
			await db.insert(schema.programs).values({
				id: prog.id,
				name: prog.name,
				slug: prog.id,
				category: prog.category,
				badge: prog.badge,
				description: prog.description,
				competencies: prog.competencies,
				prospects: prog.prospects,
				facilities: prog.facilities,
				image: prog.image,
				featured: prog.featured ?? false,
				sortOrder: i + 1,
				status: 'published'
			});
		}
		console.log(`✅ Seeded ${programsData.length} programs`);
	}

	// 4. Facilities
	const existingFacilities = await db.select().from(schema.facilities).limit(1);
	if (existingFacilities.length === 0) {
		for (let i = 0; i < facilitiesData.length; i++) {
			const fac = facilitiesData[i];
			await db.insert(schema.facilities).values({
				id: fac.id,
				name: fac.name,
				slug: fac.id,
				category: fac.category,
				description: fac.description,
				image: fac.image,
				specs: fac.specs ?? [],
				highlight: fac.highlight ?? null,
				featured: fac.featured ?? false,
				sortOrder: i + 1,
				status: 'published'
			});
		}
		console.log(`✅ Seeded ${facilitiesData.length} facilities`);
	}

	// 5. Achievements
	const existingAchievements = await db.select().from(schema.achievements).limit(1);
	if (existingAchievements.length === 0) {
		for (let i = 0; i < achievementsData.length; i++) {
			const ach = achievementsData[i];
			await db.insert(schema.achievements).values({
				id: ach.id,
				title: ach.title,
				winner: ach.winner,
				role: ach.role,
				scope: ach.scope,
				category: ach.category,
				level: ach.level,
				year: ach.year,
				organizer: ach.organizer,
				description: ach.description ?? null,
				badgeVariant: ach.badgeVariant,
				image: null,
				featured: ach.featured ?? false,
				sortOrder: i + 1,
				status: 'published'
			});
		}
		console.log(`✅ Seeded ${achievementsData.length} achievements`);
	}

	// 6. Activities
	const existingActivities = await db.select().from(schema.activities).limit(1);
	if (existingActivities.length === 0) {
		for (let i = 0; i < activitiesData.length; i++) {
			const act = activitiesData[i];
			await db.insert(schema.activities).values({
				id: act.id,
				title: act.title,
				slug: act.id,
				category: act.category,
				description: act.description,
				schedule: act.schedule,
				image: act.image,
				featured: act.featured ?? false,
				sortOrder: i + 1,
				status: 'published'
			});
		}
		console.log(`✅ Seeded ${activitiesData.length} activities`);
	}

	// 7. Activity Gallery
	const existingGallery = await db.select().from(schema.activityGallery).limit(1);
	if (existingGallery.length === 0) {
		for (let i = 0; i < activityGallery.length; i++) {
			const gal = activityGallery[i];
			await db.insert(schema.activityGallery).values({
				id: gal.id,
				title: gal.title,
				category: gal.category,
				date: gal.date,
				image: gal.image,
				description: gal.description,
				sortOrder: i + 1,
				status: 'published'
			});
		}
		console.log(`✅ Seeded ${activityGallery.length} gallery items`);
	}

	// 8. News
	const existingNews = await db.select().from(schema.news).limit(1);
	if (existingNews.length === 0) {
		for (let i = 0; i < newsArticles.length; i++) {
			const n = newsArticles[i];
			await db.insert(schema.news).values({
				id: n.slug,
				slug: n.slug,
				title: n.title,
				date: n.date,
				category: n.category,
				summary: n.summary,
				content: n.content,
				image: n.image,
				readTime: n.readTime,
				authorName: n.author.name,
				authorRole: n.author.role,
				authorAvatar: n.author.avatar ?? null,
				featured: n.featured ?? false,
				tags: n.tags ?? [],
				status: 'published'
			});
		}
		console.log(`✅ Seeded ${newsArticles.length} news items`);
	}

	// 9. PPDB Settings
	const existingPPDB = await db.select().from(schema.ppdb).limit(1);
	if (existingPPDB.length === 0) {
		await db.insert(schema.ppdb).values({
			id: 'default',
			status: ppdbData.status,
			academicYear: ppdbData.academicYear,
			currentWave: ppdbData.currentWave,
			deadline: ppdbData.deadline,
			consultationWa: ppdbData.consultationWa,
			whatsappUrl: ppdbData.whatsappUrl,
			registrationUrl: ppdbData.registrationUrl,
			quotaTotal: ppdbData.quotaTotal,
			description: null,
			waves: ppdbData.waves,
			requirements: ppdbData.requirements,
			steps: ppdbData.steps,
			fees: ppdbData.fees,
			faq: ppdbData.faqs
		});
		console.log('✅ PPDB data seeded');
	}

	// 10. Site Settings
	const existingSiteSettings = await db.select().from(schema.siteSettings).limit(1);
	if (existingSiteSettings.length === 0) {
		await db.insert(schema.siteSettings).values({
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
		});
		console.log('✅ Site settings seeded');
	}

	console.log('🎉 Seeding complete!');
	process.exit(0);
}

seed().catch((err) => {
	console.error('❌ Seeding failed:', err);
	process.exit(1);
});
