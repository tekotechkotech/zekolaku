<script lang="ts">
	import { programsData as defaultProgramsData } from '$lib/data/programs';
	import type { ProgramDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight, CheckCircle2, GraduationCap } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		programs?: ProgramDetail[];
	}

	let {
		template = 'grid',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'white',
		itemCount = 4,
		programs = defaultProgramsData
	}: Props = $props();

	let displayedPrograms = $derived((programs || defaultProgramsData).slice(0, itemCount || 4));

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

<!-- PROGRAMS SECTION -->
<section class="py-16 sm:py-24 border-t border-slate-200 {activeBgClass}">
	<Container>
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
			<div>
				<Badge variant="navy" size="md" class="mb-2">
					{badgeText || 'Kurikulum Terpadu'}
				</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
					{customTitle || 'Program Pendidikan Unggulan'}
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					{customSubtitle || 'Rancangan kurikulum terpadu yang memadukan kurikulum sains nasional, tahfidz bersanad, dan kurikulum internasional.'}
				</p>
			</div>
			<Button href="/program" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Program</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		{#if template === 'bento'}
			<!-- TEMPLATE 2: BENTO SHOWCASE (1 Besar + Sisanya Kecil) -->
			{#if displayedPrograms.length > 0}
				{@const mainProg = displayedPrograms[0]}
				{@const sideProgs = displayedPrograms.slice(1, 4)}
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<!-- Main Featured Program (Large) -->
					<div class="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md flex flex-col justify-between group">
						<div class="relative h-64 sm:h-72 w-full overflow-hidden bg-navy-950">
							<img
								src={mainProg.image}
								alt={mainProg.name}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div class="absolute top-4 left-4">
								<Badge variant="emerald" size="md">{mainProg.badge}</Badge>
							</div>
						</div>
						<div class="p-6 sm:p-8 flex flex-col justify-between flex-1">
							<div>
								<span class="text-xs font-bold uppercase tracking-wider text-emerald-700">{mainProg.category}</span>
								<h3 class="text-xl sm:text-2xl font-bold text-navy-950 mt-1">{mainProg.name}</h3>
								<p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{mainProg.description}</p>
								<div class="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
									{#each (mainProg.competencies || []).slice(0, 4) as comp}
										<div class="flex items-center gap-2 text-xs text-slate-700">
											<CheckCircle2 class="size-3.5 text-emerald-600 shrink-0" />
											<span class="truncate">{comp}</span>
										</div>
									{/each}
								</div>
							</div>
							<div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
								<a href="/program#{mainProg.id}" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5">
									<span>Rincian Kurikulum & Asrama</span>
									<ArrowRight class="size-3.5" />
								</a>
							</div>
						</div>
					</div>

					<!-- Side Programs (3 Compact) -->
					<div class="lg:col-span-5 flex flex-col gap-4.5 justify-between">
						{#each sideProgs as prog}
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex items-start gap-4">
								{#if prog.image}
									<img
										src={prog.image}
										alt={prog.name}
										class="size-16 rounded-xl object-cover shrink-0 border border-slate-100"
									/>
								{:else}
									<div class="size-16 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
										<GraduationCap class="size-6" />
									</div>
								{/if}
								<div class="min-w-0 flex-1">
									<span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{prog.category}</span>
									<h4 class="font-bold text-sm text-navy-950 truncate">{prog.name}</h4>
									<p class="text-xs text-slate-500 line-clamp-2 mt-1">{prog.description}</p>
									<a href="/program#{prog.id}" class="mt-2 text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1">
										<span>Detail</span>
										<ArrowRight class="size-3" />
									</a>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

		{:else if template === 'minimal-list'}
			<!-- TEMPLATE 3: MINIMALIST HORIZONTAL LIST -->
			<div class="divide-y divide-slate-200 border-y border-slate-200">
				{#each displayedPrograms as prog, idx}
					<div class="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 px-4 rounded-xl transition-colors">
						<div class="flex items-center gap-4">
							<span class="text-2xl font-black text-slate-300 font-mono">0{idx + 1}</span>
							<div>
								<span class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">{prog.category}</span>
								<h3 class="text-base sm:text-lg font-bold text-navy-950">{prog.name}</h3>
								<p class="text-xs text-slate-500 max-w-xl mt-0.5 line-clamp-1">{prog.description}</p>
							</div>
						</div>
						<div class="flex items-center gap-3 shrink-0">
							<Badge variant="emerald" size="sm">{prog.badge}</Badge>
							<a href="/program#{prog.id}" class="p-2 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">
								<ArrowRight class="size-4" />
							</a>
						</div>
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: CARD GRID (DEFAULT) -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each displayedPrograms as prog}
					<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between">
						<div>
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

							<div class="p-5">
								<span class="text-xs font-bold uppercase tracking-wider text-emerald-700">
									{prog.category}
								</span>
								<h3 class="mt-1 text-base font-bold text-navy-950 leading-snug line-clamp-1">
									{prog.name}
								</h3>
								<p class="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
									{prog.description}
								</p>

								<div class="mt-3.5 pt-2.5 border-t border-slate-100 space-y-1">
									{#each (prog.competencies || []).slice(0, 2) as comp}
										<div class="flex items-start gap-1.5 text-xs text-slate-700">
											<CheckCircle2 class="size-3 text-emerald-600 shrink-0 mt-0.5" />
											<span class="line-clamp-1 text-[11px]">{comp}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>

						<div class="p-5 pt-0">
							<a
								href="/program#{prog.id}"
								class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
							>
								<span>Detail kurikulum</span>
								<ArrowRight class="size-3.5" />
							</a>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
