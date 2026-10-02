<script lang="ts">
	import { programsData as defaultProgramsData } from '$lib/data/programs';
	import type { ProgramDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight, CheckCircle2 } from 'lucide-svelte';

	interface Props {
		programs?: ProgramDetail[];
		badgeText?: string;
		title?: string;
		description?: string;
	}

	let {
		programs = defaultProgramsData.slice(0, 3),
		badgeText = 'Kurikulum Terpadu',
		title = 'Program Pendidikan Unggulan',
		description = 'Rancangan kurikulum terpadu yang memadukan kurikulum sains nasional, tahfidz bersanad, dan kurikulum Cambridge.'
	}: Props = $props();
</script>

<!-- 4. Program Unggulan Showcase -->
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
			<Button href="/program" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Program</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each programs as prog}
				<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between">
					<div>
						<!-- Foto dengan aspect ratio konsisten -->
						<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
							<img
								src={prog.image}
								alt={prog.name}
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
								loading="lazy"
							/>
							<div class="absolute top-3 left-3">
								<Badge variant="emerald" size="sm">{prog.badge}</Badge>
							</div>
						</div>

						<div class="p-6">
							<span class="text-xs font-bold uppercase tracking-wider text-emerald-700">
								{prog.category}
							</span>
							<h3 class="mt-1 text-lg font-bold text-navy-950 leading-snug">
								{prog.name}
							</h3>
							<p class="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
								{prog.description}
							</p>

							<!-- Key Competencies snippet -->
							<div class="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
								{#each prog.competencies.slice(0, 2) as comp}
									<div class="flex items-start gap-2 text-xs text-slate-700">
										<CheckCircle2 class="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
										<span class="line-clamp-1">{comp}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<div class="p-6 pt-0">
						<a
							href="/program#{prog.id}"
							class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
						>
							<span>Detail kurikulum & fasilitas</span>
							<ArrowRight class="size-3.5" />
						</a>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>
