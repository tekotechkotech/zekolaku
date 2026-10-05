<script lang="ts">
	import { facilitiesData as defaultFacilitiesData } from '$lib/data/facilities';
	import type { FacilityDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight, Building2 } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		facilities?: FacilityDetail[];
	}

	let {
		template = 'grid-specs',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'white',
		itemCount = 6,
		facilities = defaultFacilitiesData
	}: Props = $props();

	let displayedFacilities = $derived(
		(facilities && facilities.length > 0 ? facilities : defaultFacilitiesData).slice(0, itemCount || 6)
	);

	let activeBgClass = $derived(
		bgStyle === 'slate'
			? 'bg-slate-50 text-slate-800'
			: bgStyle === 'navy'
			? 'bg-navy-950 text-white'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-b from-white to-slate-50 text-slate-800'
			: 'bg-white text-slate-800'
	);
</script>

<!-- FACILITIES SECTION -->
<section class="py-16 sm:py-24 border-t border-slate-200 {activeBgClass}">
	<Container>
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
			<div>
				<Badge variant="navy" size="md" class="mb-2">
					{badgeText || 'Sarana Modern'}
				</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
					{customTitle || 'Fasilitas Kampus Unggulan'}
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					{customSubtitle || 'Dikelola dengan standar kebersihan tinggi dan arsitektur asri berwawasan lingkungan untuk mendukung kenyamanan santri 24 jam.'}
				</p>
			</div>
			<Button href="/fasilitas" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Fasilitas</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		{#if template === 'bento-gallery'}
			<!-- TEMPLATE 2: BENTO GALLERY (1 Utama Besar + 4 Sekunder) -->
			{#if displayedFacilities.length > 0}
				{@const mainFac = displayedFacilities[0]}
				{@const subFacs = displayedFacilities.slice(1, 5)}
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<!-- Main Facility Card -->
					<div class="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md relative group">
						<div class="relative h-80 sm:h-96 w-full overflow-hidden bg-navy-950">
							<img
								src={mainFac.image}
								alt={mainFac.name}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent"></div>
							<div class="absolute top-4 left-4">
								<Badge variant="emerald" size="md">{mainFac.category}</Badge>
							</div>
							<div class="absolute bottom-6 left-6 right-6 text-white">
								<h3 class="text-xl sm:text-2xl font-bold">{mainFac.name}</h3>
								<p class="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">{mainFac.description}</p>
								{#if mainFac.specs && mainFac.specs.length > 0}
									<div class="flex flex-wrap gap-2 mt-3">
										{#each mainFac.specs.slice(0, 3) as spec}
											<span class="text-[10px] font-semibold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-white">
												{spec}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Sub Facilities Grid (4 Cards) -->
					<div class="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
						{#each subFacs as fac}
							<div class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col">
								<div class="relative h-32 w-full overflow-hidden bg-navy-950">
									<img
										src={fac.image}
										alt={fac.name}
										class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
										loading="lazy"
									/>
									<span class="absolute top-2 left-2 text-[10px] font-bold bg-navy-950/80 text-white px-2 py-0.5 rounded-md">
										{fac.category}
									</span>
								</div>
								<div class="p-3.5 flex-1 flex flex-col justify-between">
									<div>
										<h4 class="font-bold text-xs sm:text-sm text-navy-950 line-clamp-1">{fac.name}</h4>
										<p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{fac.description}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

		{:else if template === 'minimal-cards'}
			<!-- TEMPLATE 3: CLEAN LAPANG & RAPI -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each displayedFacilities as fac}
					<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 transition-all flex items-start gap-4">
						<img
							src={fac.image}
							alt={fac.name}
							class="size-20 rounded-xl object-cover shrink-0 border border-slate-100"
						/>
						<div class="min-w-0 flex-1">
							<span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{fac.category}</span>
							<h3 class="font-bold text-sm text-navy-950 truncate mt-0.5">{fac.name}</h3>
							<p class="text-xs text-slate-500 line-clamp-2 mt-1">{fac.description}</p>
							{#if fac.highlight}
								<span class="text-[10px] font-semibold text-emerald-600 block mt-2">{fac.highlight}</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: PHOTO GRID DENGAN SPECS (DEFAULT) -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each displayedFacilities as fac}
					<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between">
						<div>
							<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
								<img
									src={fac.image}
									alt={fac.name}
									class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
									loading="lazy"
								/>
								<div class="absolute top-2.5 left-2.5">
									<Badge variant="navy" size="sm">{fac.category}</Badge>
								</div>
							</div>

							<div class="p-5">
								<h3 class="text-base font-bold text-navy-950 line-clamp-1">
									{fac.name}
								</h3>
								<p class="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
									{fac.description}
								</p>

								{#if fac.specs && fac.specs.length > 0}
									<div class="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
										{#each fac.specs.slice(0, 3) as spec}
											<span class="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
												{spec}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</div>

						<div class="p-5 pt-0">
							<a href="/fasilitas#{fac.id}" class="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1">
								<span>Lihat rincian sarana</span>
								<ArrowRight class="size-3" />
							</a>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
