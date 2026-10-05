<script lang="ts">
	import { schoolPillars as defaultSchoolPillars } from '$lib/data/school';
	import type { Pillar } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { BookOpen, Microscope, Globe, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		pillars?: Pillar[];
	}

	let {
		template = 'grid',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'slate',
		itemCount = 4,
		pillars = defaultSchoolPillars
	}: Props = $props();

	let displayedPillars = $derived((pillars || []).slice(0, itemCount || 4));
	let activeTab = $state(0);

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

<!-- PILLARS SECTION -->
<section class="py-16 sm:py-24 {activeBgClass}">
	<Container>
		<div class="max-w-3xl mx-auto text-center mb-14">
			<Badge variant="emerald" size="md" class="mb-3">
				{badgeText || 'Sekilas Profil & Keunggulan'}
			</Badge>
			<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
				{customTitle || 'Membina Karakter Paripurna Berbasis Pilar Keunggulan'}
			</h2>
			<p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
				{customSubtitle || 'SMA & Pesantren Terpadu Madani Global memadukan tradisi kedalaman spiritual pesantren dengan keunggulan sains modern dan literasi digital, mempersiapkan generasi siap bersaing di kancah nasional maupun dunia.'}
			</p>
		</div>

		{#if template === 'interactive-list'}
			<!-- TEMPLATE 2: INTERACTIVE TABBED PILLARS -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
				<!-- Left Tab Nav -->
				<div class="lg:col-span-5 space-y-3">
					{#each displayedPillars as pillar, idx}
						<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
						<div
							onclick={() => (activeTab = idx)}
							class="cursor-pointer p-4.5 rounded-2xl border transition-all text-left flex items-center justify-between
							{activeTab === idx
								? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
								: 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'}"
						>
							<div class="flex items-center gap-3.5">
								<div class="size-10 rounded-xl flex items-center justify-center font-bold text-sm
								{activeTab === idx ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">
									0{idx + 1}
								</div>
								<div>
									<h4 class="font-bold text-sm text-slate-900">{pillar.title}</h4>
									<span class="text-xs text-emerald-700 font-semibold">{pillar.highlight}</span>
								</div>
							</div>
							<ArrowRight class="size-4 text-slate-400 {activeTab === idx ? 'text-emerald-600' : ''}" />
						</div>
					{/each}
				</div>

				<!-- Right Detail Card -->
				{#if displayedPillars[activeTab]}
					{@const activePillar = displayedPillars[activeTab]}
					<div class="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
						<div>
							<div class="flex items-center justify-between mb-4">
								<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
									{activePillar.highlight}
								</span>
								<span class="text-xs font-mono font-semibold text-slate-400">Pilar 0{activeTab + 1}</span>
							</div>

							<h3 class="text-2xl font-bold text-navy-950 mb-3">{activePillar.title}</h3>
							<p class="text-sm sm:text-base text-slate-600 leading-relaxed">{activePillar.description}</p>
						</div>

						<div class="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
							<div class="flex items-center gap-2 text-xs text-slate-500">
								<CheckCircle2 class="size-4 text-emerald-600" />
								<span>Terintegrasi Kurikulum Boarding</span>
							</div>
							<a href="/tentang" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800">
								<span>Pelajari Lebih Lengkap</span>
								<ArrowRight class="size-3.5" />
							</a>
						</div>
					</div>
				{/if}
			</div>

		{:else if template === 'compact-row'}
			<!-- TEMPLATE 3: 2x2 BENTO MINIMAL -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{#each displayedPillars as pillar, idx}
					<div class="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between">
						<div>
							<div class="flex items-center justify-between mb-3">
								<span class="text-3xl font-black text-slate-200 font-mono">0{idx + 1}</span>
								<span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">{pillar.highlight}</span>
							</div>
							<h3 class="text-lg font-bold text-navy-950 mb-2">{pillar.title}</h3>
							<p class="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
						</div>
						<div class="mt-4 pt-3 border-t border-slate-100">
							<a href="/tentang" class="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1">
								<span>Selengkapnya</span>
								<ArrowRight class="size-3" />
							</a>
						</div>
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: GRID 3/4-KOLOM (DEFAULT) -->
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each displayedPillars as pillar}
					<Card hover padding="lg" class="flex flex-col justify-between h-full bg-white border-slate-200">
						<div>
							<div class="flex size-13 items-center justify-center rounded-2xl bg-navy-950 text-emerald-400 shadow-sm border border-navy-800">
								{#if pillar.iconName === 'BookOpen'}
									<BookOpen class="size-6" />
								{:else if pillar.iconName === 'Microscope'}
									<Microscope class="size-6" />
								{:else}
									<Globe class="size-6" />
								{/if}
							</div>

							<div class="mt-5">
								<span class="inline-block text-xs font-bold text-emerald-700 uppercase tracking-wider">
									{pillar.highlight}
								</span>
								<h3 class="mt-1 text-xl font-bold text-navy-950">
									{pillar.title}
								</h3>
								<p class="mt-3 text-sm leading-relaxed text-slate-600">
									{pillar.description}
								</p>
							</div>
						</div>

						<div class="mt-6 pt-4 border-t border-slate-100">
							<a
								href="/tentang"
								class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 group"
							>
								<span>Pelajari selengkapnya</span>
								<ArrowRight class="size-3.5 transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
