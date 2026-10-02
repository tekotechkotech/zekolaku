<script lang="ts">
	import { schoolPillars as defaultSchoolPillars } from '$lib/data/school';
	import type { Pillar } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { BookOpen, Microscope, Globe, ArrowRight } from 'lucide-svelte';

	interface Props {
		pillars?: Pillar[];
		badgeText?: string;
		title?: string;
		description?: string;
	}

	let {
		pillars = defaultSchoolPillars,
		badgeText = 'Sekilas Profil & Keunggulan',
		title = 'Membina Karakter Paripurna Berbasis Tiga Pilar Keunggulan',
		description = 'SMA & Pesantren Terpadu Madani Global memadukan tradisi kedalaman spiritual pesantren dengan keunggulan sains modern dan literasi digital, mempersiapkan generasi siap bersaing di kancah nasional maupun dunia.'
	}: Props = $props();
</script>

<!-- 3. Ringkasan Sekolah & Keunggulan Utama (3 Pilar) -->
<section class="py-16 sm:py-24 bg-slate-50">
	<Container>
		<div class="max-w-3xl mx-auto text-center mb-14">
			<Badge variant="emerald" size="md" class="mb-3">{badgeText}</Badge>
			<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight">
				{title}
			</h2>
			<p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
				{description}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each pillars as pillar}
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
	</Container>
</section>
