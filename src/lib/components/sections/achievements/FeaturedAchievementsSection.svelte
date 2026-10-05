<script lang="ts">
	import { achievementsData as defaultAchievementsData } from '$lib/data/achievements';
	import type { AchievementDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight, Trophy, Medal, Award } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		achievements?: AchievementDetail[];
	}

	let {
		template = 'trophy-cards',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'slate',
		itemCount = 4,
		achievements = defaultAchievementsData
	}: Props = $props();

	let displayedAchievements = $derived(
		(achievements && achievements.length > 0 ? achievements : defaultAchievementsData).slice(0, itemCount || 4)
	);

	let activeBgClass = $derived(
		bgStyle === 'white'
			? 'bg-white text-slate-800'
			: bgStyle === 'navy'
			? 'bg-navy-950 text-white'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-b from-slate-50 to-amber-50/30 text-slate-800'
			: 'bg-slate-50 text-slate-800'
	);
</script>

<!-- ACHIEVEMENTS SECTION -->
<section class="py-16 sm:py-24 border-t border-slate-200 {activeBgClass}">
	<Container>
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
			<div>
				<Badge variant="amber" size="md" class="mb-2">
					{badgeText || 'Rekam Jejak Juara'}
				</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
					{customTitle || 'Prestasi Pilihan Santri & Pendidik'}
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					{customSubtitle || "Capaian membanggakan santri dan guru dalam berbagai kompetisi sains, tahfidz Al-Qur'an, dan riset ilmiah di tingkat nasional & dunia."}
				</p>
			</div>
			<Button href="/prestasi" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Prestasi</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		{#if template === 'timeline'}
			<!-- TEMPLATE 2: TIMELINE KRONOLOGIS -->
			<div class="relative max-w-3xl mx-auto border-l-2 border-amber-300 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8 my-4">
				{#each displayedAchievements as ach}
					<div class="relative group">
						<!-- Timeline marker -->
						<div class="absolute -left-[35px] sm:-left-[43px] top-1.5 size-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
							<Trophy class="size-3.5" />
						</div>

						<div class="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all">
							<div class="flex items-center justify-between gap-2 mb-2">
								<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
									Tingkat {ach.level} &bull; {ach.year}
								</span>
								<span class="text-xs font-semibold text-slate-400">{ach.category}</span>
							</div>

							<h3 class="text-base font-bold text-navy-950 leading-snug">{ach.title}</h3>
							<p class="text-xs text-slate-600 mt-1">Peraih: <strong class="text-slate-900">{ach.winner}</strong> ({ach.role})</p>
							<div class="text-[11px] text-slate-400 mt-2">Penyelenggara: {ach.organizer}</div>
						</div>
					</div>
				{/each}
			</div>

		{:else if template === 'compact-grid'}
			<!-- TEMPLATE 3: COMPACT 3-KOLOM -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each displayedAchievements as ach}
					<div class="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex items-start gap-4">
						<div class="size-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
							<Medal class="size-6" />
						</div>
						<div class="min-w-0 flex-1">
							<div class="flex items-center gap-2">
								<span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{ach.level}</span>
								<span class="text-slate-300">&bull;</span>
								<span class="text-[10px] font-mono text-slate-400">{ach.year}</span>
							</div>
							<h4 class="font-bold text-sm text-navy-950 truncate mt-0.5">{ach.title}</h4>
							<p class="text-xs text-slate-600 mt-1">{ach.winner}</p>
						</div>
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: SHOWCASE GRID PIALA EMAS (DEFAULT) -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each displayedAchievements as ach}
					<Card hover padding="lg" class="bg-white border-slate-200 flex flex-col justify-between">
						<div>
							<div class="flex items-center justify-between">
								<Badge variant={(ach.badgeVariant as any) || 'amber'} size="sm">
									Tingkat {ach.level}
								</Badge>
								<span class="text-xs font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">
									{ach.year}
								</span>
							</div>

							<h3 class="mt-4 text-sm sm:text-base font-bold text-navy-950 leading-snug line-clamp-2">
								{ach.title}
							</h3>

							<div class="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs">
								<div class="text-[10px] uppercase font-bold text-slate-400">Penerima ({ach.role})</div>
								<div class="font-bold text-navy-950 mt-0.5 truncate">{ach.winner}</div>
							</div>
						</div>

						<div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
							<span class="font-semibold text-emerald-700 truncate">{ach.category}</span>
							<span class="text-[11px] truncate max-w-[120px]">{ach.organizer}</span>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
