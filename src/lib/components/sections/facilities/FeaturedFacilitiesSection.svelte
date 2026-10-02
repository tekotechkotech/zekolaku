<script lang="ts">
	import { facilitiesData as defaultFacilitiesData } from '$lib/data/facilities';
	import type { FacilityDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight } from 'lucide-svelte';

	interface Props {
		facilities?: FacilityDetail[];
		badgeText?: string;
		title?: string;
		description?: string;
	}

	let {
		facilities = defaultFacilitiesData.filter((f) => f.featured).slice(0, 4),
		badgeText = 'Sarana Modern',
		title = 'Fasilitas Kampus Unggulan',
		description = 'Dikelola dengan standar kebersihan tinggi dan arsitektur asri berwawasan lingkungan untuk mendukung kenyamanan santri 24 jam.'
	}: Props = $props();
</script>

<!-- 6. Fasilitas Pilihan Showcase -->
<section class="py-16 sm:py-24 bg-white border-t border-slate-200">
	<Container>
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
			<div>
				<Badge variant="navy" size="md" class="mb-2">{badgeText}</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
					{title}
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					{description}
				</p>
			</div>
			<Button href="/fasilitas" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Fasilitas</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each facilities as fac}
				<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col">
					<!-- Aspect ratio foto konsisten -->
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

					<div class="p-5 flex flex-1 flex-col justify-between">
						<div>
							<h3 class="text-sm font-bold text-navy-950 line-clamp-1">
								{fac.name}
							</h3>
							<p class="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
								{fac.description}
							</p>
						</div>
						{#if fac.highlight}
							<div class="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
								{fac.highlight}
							</div>
						{/if}
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>
