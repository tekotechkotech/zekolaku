<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import {
		HeroSection,
		GreetingSection,
		StatsSection,
		PillarsSection,
		FeaturedProgramsSection,
		FeaturedAchievementsSection,
		FeaturedFacilitiesSection,
		RecentActivitiesSection,
		TestimonialsSection,
		FaqSection,
		PpdbCtaSection
	} from '$lib/components/sections';

	let { data } = $props();

	let sections = $derived(data.landingSections || []);
</script>

<svelte:head>
	<title>{schoolData.name} - Beranda</title>
	<meta
		name="description"
		content="{schoolData.tagline}. Lembaga pendidikan Islam terpadu dengan kurikulum nasional, tahfidz, dan sains modern di Bandung."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/" />
	<meta property="og:title" content="{schoolData.name} - Beranda" />
	<meta property="og:description" content="{schoolData.tagline}. Lembaga pendidikan Islam terpadu berasrama unggulan di Bandung." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="{schoolData.name} - Beranda" />
	<meta name="twitter:description" content="{schoolData.tagline}" />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<!-- Dynamic Multi-Template Section Flow -->
{#each sections as sec (sec.id)}
	{#if sec.sectionKey === 'hero'}
		<HeroSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			ppdb={data.ppdb}
			slides={data.heroSlides}
		/>
	{:else if sec.sectionKey === 'greeting'}
		<GreetingSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
		/>
	{:else if sec.sectionKey === 'stats'}
		<StatsSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			stats={data.stats}
		/>
	{:else if sec.sectionKey === 'pillars'}
		<PillarsSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			pillars={data.pillars}
		/>
	{:else if sec.sectionKey === 'programs'}
		<FeaturedProgramsSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			programs={data.featuredPrograms}
		/>
	{:else if sec.sectionKey === 'achievements'}
		<FeaturedAchievementsSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			achievements={data.featuredAchievements}
		/>
	{:else if sec.sectionKey === 'facilities'}
		<FeaturedFacilitiesSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			facilities={data.featuredFacilities}
		/>
	{:else if sec.sectionKey === 'activities'}
		<RecentActivitiesSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			activities={data.recentActivities}
		/>
	{:else if sec.sectionKey === 'testimonials'}
		<TestimonialsSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			testimonials={data.testimonials}
		/>
	{:else if sec.sectionKey === 'faq'}
		<FaqSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			itemCount={sec.itemCount}
			faqs={data.ppdb?.faq || data.ppdb?.faqs || []}
		/>
	{:else if sec.sectionKey === 'ppdb_cta'}
		<PpdbCtaSection
			template={sec.template}
			customTitle={sec.customTitle}
			customSubtitle={sec.customSubtitle}
			badgeText={sec.badgeText}
			bgStyle={sec.bgStyle}
			ppdb={data.ppdb}
		/>
	{/if}
{/each}
