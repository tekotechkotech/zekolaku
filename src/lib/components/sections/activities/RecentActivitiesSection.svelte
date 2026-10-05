<script lang="ts">
	import { activitiesData as defaultActivitiesData } from '$lib/data/activities';
	import type { ActivityDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight, Calendar, Clock, Image as ImageIcon } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		activities?: ActivityDetail[];
	}

	let {
		template = 'dual-grid',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'slate',
		itemCount = 4,
		activities = defaultActivitiesData
	}: Props = $props();

	let displayedActivities = $derived(
		(activities && activities.length > 0 ? activities : defaultActivitiesData).slice(0, itemCount || 4)
	);

	let activeBgClass = $derived(
		bgStyle === 'white'
			? 'bg-white text-slate-800'
			: bgStyle === 'navy'
			? 'bg-navy-950 text-white'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-b from-slate-50 to-white text-slate-800'
			: 'bg-slate-50 text-slate-800'
	);
</script>

<!-- ACTIVITIES SECTION -->
<section class="py-16 sm:py-24 border-t border-slate-200 {activeBgClass}">
	<Container>
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
			<div>
				<Badge variant="emerald" size="md" class="mb-2">
					{badgeText || 'Dinamika Santri'}
				</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
					{customTitle || 'Kegiatan & Agenda Terbaru'}
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					{customSubtitle || 'Aktivitas pembelajaran luar kelas, pembentukan karakter kepemimpinan, dan agenda tahunan santri Madani Global.'}
				</p>
			</div>
			<Button href="/kegiatan" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Kegiatan</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		{#if template === 'calendar-list'}
			<!-- TEMPLATE 2: CALENDAR LIST TERSTRUKTUR -->
			<div class="divide-y divide-slate-200 border-y border-slate-200 max-w-4xl mx-auto">
				{#each displayedActivities as act}
					<div class="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/80 px-4 rounded-xl transition-colors">
						<div class="flex items-start gap-4">
							<div class="size-12 rounded-xl bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center font-bold shrink-0">
								<Calendar class="size-5 text-emerald-600" />
							</div>
							<div>
								<div class="flex items-center gap-2">
									<Badge variant="emerald" size="sm">{act.category}</Badge>
									<span class="text-xs text-slate-500 font-medium">{act.schedule}</span>
								</div>
								<h3 class="text-base font-bold text-navy-950 mt-1">{act.title}</h3>
								<p class="text-xs text-slate-600 mt-0.5 line-clamp-1">{act.description}</p>
							</div>
						</div>
						<a href="/kegiatan" class="text-xs font-semibold text-emerald-700 hover:underline shrink-0 inline-flex items-center gap-1">
							<span>Selengkapnya</span>
							<ArrowRight class="size-3" />
						</a>
					</div>
				{/each}
			</div>

		{:else if template === 'gallery-masonry'}
			<!-- TEMPLATE 3: VISUAL FOTO GRID -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{#each displayedActivities as act}
					<div class="group relative rounded-2xl overflow-hidden aspect-4/3 bg-navy-950 shadow-md">
						<img
							src={act.image}
							alt={act.title}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
							loading="lazy"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
						<div class="absolute bottom-3 left-3 right-3 text-white">
							<span class="text-[10px] font-bold uppercase tracking-wider text-emerald-300">{act.category}</span>
							<h4 class="text-xs sm:text-sm font-bold truncate mt-0.5">{act.title}</h4>
							<span class="text-[10px] text-slate-300 block">{act.schedule}</span>
						</div>
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: DUAL-GRID / CARD GRID (DEFAULT) -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each displayedActivities as act}
					<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between">
						<div>
							<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
								<img
									src={act.image}
									alt={act.title}
									class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
									loading="lazy"
								/>
								<div class="absolute top-2.5 left-2.5">
									<Badge variant="emerald" size="sm">{act.category}</Badge>
								</div>
							</div>

							<div class="p-5">
								<div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
									<Calendar class="size-3.5 text-emerald-600" />
									<span class="truncate">{act.schedule}</span>
								</div>

								<h3 class="text-sm sm:text-base font-bold text-navy-950 leading-snug line-clamp-2">
									{act.title}
								</h3>

								<p class="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
									{act.description}
								</p>
							</div>
						</div>

						<div class="p-5 pt-0">
							<a
								href="/kegiatan"
								class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
							>
								<span>Lihat dokumentasi</span>
								<ArrowRight class="size-3.5" />
							</a>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
