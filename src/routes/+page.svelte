<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import {
		HeroSection,
		StatsSection,
		PillarsSection,
		FeaturedProgramsSection,
		FeaturedAchievementsSection,
		FeaturedFacilitiesSection,
		RecentActivitiesSection,
		PpdbCtaSection
	} from '$lib/components/sections';
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

<HeroSection />
<StatsSection />
<PillarsSection />
<FeaturedProgramsSection />
<FeaturedAchievementsSection />
<FeaturedFacilitiesSection />
<RecentActivitiesSection />
<PpdbCtaSection />
