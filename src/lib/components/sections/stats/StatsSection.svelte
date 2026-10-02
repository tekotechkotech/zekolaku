<script lang="ts">
	import { schoolStats as defaultSchoolStats } from '$lib/data/school';
	import type { StatItem } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';

	interface Props {
		stats?: StatItem[];
	}

	let {
		stats = defaultSchoolStats
	}: Props = $props();
</script>

<!-- 2. Statistik Singkat -->
<section class="border-y border-slate-200 bg-white py-10 sm:py-14">
	<Container>
		<div class="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each stats as stat}
				<div class="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
					<span class="text-3xl sm:text-4xl font-black tracking-tight text-navy-950">
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
	</Container>
</section>
