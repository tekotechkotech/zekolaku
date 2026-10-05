<script lang="ts">
	import type { Testimonial } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { Star, Quote, CheckCircle2 } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		testimonials?: Testimonial[];
	}

	let {
		template = 'cards-grid',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'white',
		itemCount = 3,
		testimonials = []
	}: Props = $props();

	let displayedTestimonials = $derived(
		(testimonials && testimonials.length > 0 ? testimonials : []).slice(0, itemCount || 3)
	);

	let activeBgClass = $derived(
		bgStyle === 'slate'
			? 'bg-slate-50 text-slate-800'
			: bgStyle === 'navy'
			? 'bg-navy-950 text-white'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-b from-white to-emerald-50/40 text-slate-800'
			: 'bg-white text-slate-800'
	);
</script>

<!-- TESTIMONIALS SECTION -->
<section class="py-16 sm:py-24 border-t border-slate-200 {activeBgClass}">
	<Container>
		<div class="max-w-3xl mx-auto text-center mb-14">
			<Badge variant="emerald" size="md" class="mb-3">
				{badgeText || 'Kisah & Pengalaman Nyata'}
			</Badge>
			<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
				{customTitle || 'Apa Kata Orang Tua & Alumni Kami'}
			</h2>
			<p class="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
				{customSubtitle || 'Pengalaman nyata dari para wali santri dan rekam jejak lulusan yang kini berkuliah di berbagai perguruan tinggi favorit.'}
			</p>
		</div>

		{#if template === 'quote-highlight'}
			<!-- TEMPLATE 2: SOROTAN KUTIPAN UTAMA -->
			{#if displayedTestimonials.length > 0}
				{@const mainTesti = displayedTestimonials[0]}
				<div class="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center relative">
					<div class="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6">
						<Quote class="size-7" />
					</div>

					<div class="flex items-center justify-center gap-1 mb-6 text-amber-400">
						{#each Array(mainTesti.rating || 5) as _}
							<Star class="size-5 fill-amber-400" />
						{/each}
					</div>

					<blockquote class="text-lg sm:text-2xl font-medium text-slate-900 leading-relaxed italic mb-8">
						"{mainTesti.content}"
					</blockquote>

					<div class="flex items-center justify-center gap-3 pt-6 border-t border-slate-100">
						{#if mainTesti.avatar}
							<img
								src={mainTesti.avatar}
								alt={mainTesti.name}
								class="size-14 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
							/>
						{/if}
						<div class="text-left">
							<h4 class="font-bold text-base text-navy-950">{mainTesti.name}</h4>
							<p class="text-xs text-emerald-700 font-semibold">{mainTesti.role} &bull; {mainTesti.relation}</p>
						</div>
					</div>
				</div>
			{/if}

		{:else if template === 'minimal-columns'}
			<!-- TEMPLATE 3: MINIMALIST COLUMNS -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each displayedTestimonials as item}
					<div class="flex flex-col justify-between p-6 rounded-2xl border-l-4 border-emerald-500 bg-white shadow-xs">
						<div>
							<div class="flex items-center gap-1 mb-3 text-amber-400">
								{#each Array(item.rating || 5) as _}
									<Star class="size-3.5 fill-amber-400" />
								{/each}
							</div>
							<p class="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
								"{item.content}"
							</p>
						</div>
						<div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
							{#if item.avatar}
								<img src={item.avatar} alt={item.name} class="size-10 rounded-full object-cover" />
							{/if}
							<div>
								<h5 class="text-xs font-bold text-navy-950">{item.name}</h5>
								<span class="text-[11px] text-slate-500">{item.relation}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: CARDS GRID (DEFAULT) -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each displayedTestimonials as item}
					<Card hover padding="lg" class="bg-white border-slate-200 flex flex-col justify-between h-full">
						<div>
							<div class="flex items-center justify-between mb-4">
								<div class="flex items-center gap-1 text-amber-400">
									{#each Array(item.rating || 5) as _}
										<Star class="size-4 fill-amber-400" />
									{/each}
								</div>
								<span class="text-[11px] font-mono text-slate-400 font-semibold">{item.year}</span>
							</div>

							<p class="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
								"{item.content}"
							</p>
						</div>

						<div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3.5">
							{#if item.avatar}
								<img
									src={item.avatar}
									alt={item.name}
									class="size-11 rounded-full object-cover border border-slate-200 shrink-0"
									loading="lazy"
								/>
							{:else}
								<div class="size-11 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-sm">
									{item.name.charAt(0)}
								</div>
							{/if}
							<div class="min-w-0 flex-1">
								<h4 class="font-bold text-xs sm:text-sm text-navy-950 truncate">{item.name}</h4>
								<p class="text-[11px] text-emerald-700 font-medium truncate">{item.role}</p>
								<p class="text-[10px] text-slate-400 truncate">{item.relation}</p>
							</div>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
