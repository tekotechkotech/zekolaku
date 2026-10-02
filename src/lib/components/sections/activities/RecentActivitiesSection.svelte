<script lang="ts">
	import { activitiesData as defaultActivitiesData } from '$lib/data/activities';
	import type { ActivityDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight, Calendar } from 'lucide-svelte';

	interface Props {
		activities?: ActivityDetail[];
		badgeText?: string;
		title?: string;
		description?: string;
	}

	let {
		activities = defaultActivitiesData.slice(0, 3),
		badgeText = 'Dinamika Santri',
		title = 'Kegiatan & Agenda Terbaru',
		description = 'Aktivitas pembelajaran luar kelas, pembentukan karakter kepemimpinan, dan agenda tahunan santri Madani Global.'
	}: Props = $props();
</script>

<!-- 7. Kegiatan Terbaru Showcase -->
<section class="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
	<Container>
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
			<div>
				<Badge variant="emerald" size="md" class="mb-2">{badgeText}</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
					{title}
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					{description}
				</p>
			</div>
			<Button href="/kegiatan" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Kegiatan</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each activities as act}
				<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between">
					<div>
						<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
							<img
								src={act.image}
								alt={act.title}
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
								loading="lazy"
							/>
							<div class="absolute top-3 left-3">
								<Badge variant="emerald" size="sm">{act.category}</Badge>
							</div>
						</div>

						<div class="p-6">
							<div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
								<Calendar class="size-3.5 text-emerald-600" />
								<span>{act.schedule}</span>
							</div>

							<h3 class="text-base font-bold text-navy-950 leading-snug">
								{act.title}
							</h3>

							<p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
								{act.description}
							</p>
						</div>
					</div>

					<div class="p-6 pt-0">
						<a
							href="/kegiatan"
							class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
						>
							<span>Pelajari dinamika asrama</span>
							<ArrowRight class="size-3.5" />
						</a>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>
