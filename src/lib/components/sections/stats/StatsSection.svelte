<script lang="ts">
	import { schoolStats as defaultSchoolStats } from '$lib/data/school';
	import type { StatItem } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import { Award, Users, BookOpen, GraduationCap } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		stats?: StatItem[];
	}

	let {
		template = 'cards',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'default',
		itemCount = 4,
		stats = defaultSchoolStats
	}: Props = $props();

	let displayedStats = $derived((stats || []).slice(0, itemCount || 4));

	const icons = [Award, Users, BookOpen, GraduationCap];

	let activeBgClass = $derived(
		template === 'dark-counter' || bgStyle === 'navy'
			? 'bg-navy-950 text-white border-navy-800'
			: bgStyle === 'slate'
			? 'bg-slate-100 text-slate-800 border-slate-200'
			: 'bg-white text-slate-800 border-slate-200'
	);
</script>

<!-- STATS SECTION -->
<section class="border-y py-10 sm:py-14 {activeBgClass}">
	<Container>
		{#if customTitle || customSubtitle}
			<div class="text-center mb-8 max-w-2xl mx-auto">
				{#if badgeText}
					<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">{badgeText}</span>
				{/if}
				{#if customTitle}
					<h2 class="text-2xl font-bold tracking-tight">{customTitle}</h2>
				{/if}
				{#if customSubtitle}
					<p class="text-xs sm:text-sm text-slate-500 mt-1">{customSubtitle}</p>
				{/if}
			</div>
		{/if}

		{#if template === 'ribbon'}
			<!-- TEMPLATE 2: CLEAN INLINE RIBBON -->
			<div class="divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 grid grid-cols-2 lg:grid-cols-4 items-center">
				{#each displayedStats as stat}
					<div class="py-4 px-6 text-center">
						<div class="text-3xl sm:text-4xl font-black tracking-tight text-emerald-600">
							{stat.value}
						</div>
						<div class="mt-1 text-xs sm:text-sm font-bold text-slate-800">
							{stat.label}
						</div>
						{#if stat.description}
							<div class="text-[11px] text-slate-400 mt-0.5">
								{stat.description}
							</div>
						{/if}
					</div>
				{/each}
			</div>

		{:else if template === 'dark-counter'}
			<!-- TEMPLATE 3: DARK ACCENT COUNTER -->
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each displayedStats as stat, idx}
					{@const Icon = icons[idx % icons.length]}
					<div class="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center hover:bg-white/10 transition-colors backdrop-blur-xs">
						<div class="size-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
							<Icon class="size-5" />
						</div>
						<span class="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
							{stat.value}
						</span>
						<span class="mt-1 text-sm font-bold text-emerald-400">
							{stat.label}
						</span>
						{#if stat.description}
							<span class="mt-0.5 text-xs text-slate-400">
								{stat.description}
							</span>
						{/if}
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: FLOATING CARDS (DEFAULT) -->
			<div class="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each displayedStats as stat, idx}
					{@const Icon = icons[idx % icons.length]}
					<div class="flex flex-col items-center text-center p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 shadow-xs hover:shadow-md transition-shadow group">
						<div class="size-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
							<Icon class="size-5" />
						</div>
						<span class="text-3xl sm:text-4xl font-black tracking-tight text-navy-950 font-mono">
							{stat.value}
						</span>
						<span class="mt-1 text-sm font-bold text-emerald-700">
							{stat.label}
						</span>
						{#if stat.description}
							<span class="mt-0.5 text-xs text-slate-500">
								{stat.description}
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</Container>
</section>
