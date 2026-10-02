<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import { facilitiesData } from '$lib/data/facilities';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import {
		Building2,
		ShieldCheck,
		HeartHandshake,
		Sparkles,
		CheckCircle2,
		Layers
	} from 'lucide-svelte';

	// Category filter state with Svelte 5 Runes
	let selectedCategory = $state('Semua');

	const categories = ['Semua', ...Array.from(new Set(facilitiesData.map((f) => f.category)))];

	// Derived filtered facilities
	const filteredFacilities = $derived(
		selectedCategory === 'Semua'
			? facilitiesData
			: facilitiesData.filter((item) => item.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Fasilitas Kampus - {schoolData.name}</title>
	<meta
		name="description"
		content="Sarana dan prasarana lengkap terpadu: Masjid Jami', Laboratorium Sains Digital, Perpustakaan Turats, Asrama Eco-Boarding, dan Gelanggang Olahraga di Madani Global."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/fasilitas" />
	<meta property="og:title" content="Fasilitas Kampus - {schoolData.name}" />
	<meta property="og:description" content="Sarana dan prasarana belajar, ibadah, sains, dan asrama ramah lingkungan di Madani Global Bandung." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/fasilitas" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="Fasilitas Kampus - {schoolData.name}" />
	<meta name="twitter:description" content="Sarana dan prasarana belajar, ibadah, sains, dan asrama ramah lingkungan di Madani Global Bandung." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<PageHeader
	badge="Sarana & Prasarana"
	title="Fasilitas Kampus Terpadu Modern"
	description="Lingkungan belajar asri, modern, dan islami yang didesain secara ergonomis untuk memberikan kenyamanan maksimal, keamanan 24 jam, dan stimulasi intelektual optimal."
	currentRouteName="Fasilitas Kampus"
/>

<section class="py-16 sm:py-20 bg-slate-50">
	<Container>
		<!-- Category Filter Tabs -->
		<div class="flex flex-wrap items-center justify-center gap-2 mb-12">
			{#each categories as category}
				<button
					type="button"
					aria-pressed={selectedCategory === category}
					onclick={() => (selectedCategory = category)}
					class="cursor-pointer rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all {selectedCategory ===
					category
						? 'bg-navy-950 text-emerald-400 shadow-md ring-2 ring-emerald-500/20'
						: 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}"
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Facility Cards Grid - Aspect Ratio Konsisten (aspect-16/10) -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredFacilities as fac (fac.id)}
				<Card
					hover
					padding="none"
					class="overflow-hidden flex flex-col bg-white border-slate-200 transition-all hover:shadow-md"
				>
					<!-- Consistent Aspect Ratio Container -->
					<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
						<img
							src={fac.image}
							alt={fac.name}
							class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
							loading="lazy"
						/>
						<div class="absolute top-3 left-3">
							<Badge variant="navy" size="sm">
								{fac.category}
							</Badge>
						</div>
						{#if fac.highlight}
							<div class="absolute bottom-3 right-3 rounded-lg bg-navy-950/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-emerald-300 border border-navy-700/80">
								{fac.highlight}
							</div>
						{/if}
					</div>

					<!-- Content Box -->
					<div class="flex flex-1 flex-col p-6">
						<h3 class="text-base sm:text-lg font-bold text-navy-950 leading-snug">
							{fac.name}
						</h3>
						<p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 flex-1">
							{fac.description}
						</p>

						{#if fac.specs && fac.specs.length > 0}
							<div class="mt-5 pt-4 border-t border-slate-100">
								<div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
									Fitur Unggulan:
								</div>
								<ul class="space-y-1.5">
									{#each fac.specs as spec}
										<li class="flex items-center gap-2 text-xs text-slate-700">
											<CheckCircle2 class="size-3.5 text-emerald-600 shrink-0" />
											<span>{spec}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</Card>
			{/each}
		</div>

		<!-- Standar Keamanan & Kenyamanan Kampus -->
		<div class="mt-20 rounded-3xl bg-white p-8 sm:p-12 border border-slate-200 shadow-sm">
			<SectionHeader
				badge="Standar Pengelolaan"
				badgeVariant="emerald"
				title="Standar Keamanan, Kebersihan & Kenyamanan"
				description="Menjamin ketenangan orang tua dengan sistem pengelolaan sarana terintegrasi yang menjunjung tinggi kebersihan dan kesehatan lingkungan."
				class="mb-10"
			/>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="flex flex-col items-start p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
					<div class="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-xs">
						<ShieldCheck class="size-6" />
					</div>
					<h4 class="mt-4 font-bold text-navy-950 text-base">Sistem Keamanan 24 Jam</h4>
					<p class="mt-2 text-xs text-slate-600 leading-relaxed">
						Gerbang keamanan satu pintu (one-gate system), patroli sekuriti berkala, serta instalasi kamera CCTV di seluruh koridor publik dan area perimeter kampus.
					</p>
				</div>

				<div class="flex flex-col items-start p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
					<div class="flex size-12 items-center justify-center rounded-2xl bg-navy-100 text-navy-900 shadow-xs">
						<Building2 class="size-6" />
					</div>
					<h4 class="mt-4 font-bold text-navy-950 text-base">Eco-Campus Hijau & Asri</h4>
					<p class="mt-2 text-xs text-slate-600 leading-relaxed">
						Terletak di lereng perbukitan Cimenyan Bandung seluas 4,5 hektar dengan udara sejuk bebas polusi, ruang terbuka hijau asri, dan pemandangan kota Bandung.
					</p>
				</div>

				<div class="flex flex-col items-start p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
					<div class="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-xs">
						<HeartHandshake class="size-6" />
					</div>
					<h4 class="mt-4 font-bold text-navy-950 text-base">Sanitasi & Konsumsi Higienis</h4>
					<p class="mt-2 text-xs text-slate-600 leading-relaxed">
						Air minum olahan filtrasi Reverse Osmosis berstandar SNI serta dapur higienis yang diverifikasi berkala oleh dinas kesehatan dan sertifikasi halal MUI.
					</p>
				</div>
			</div>
		</div>
	</Container>
</section>
