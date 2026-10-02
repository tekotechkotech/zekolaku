<script lang="ts">
	import { achievementsData as defaultAchievementsData } from '$lib/data/achievements';
	import type { AchievementDetail } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { ArrowRight } from 'lucide-svelte';

	interface Props {
		achievements?: AchievementDetail[];
		badgeText?: string;
		title?: string;
		description?: string;
	}

	let {
		achievements = defaultAchievementsData.filter((a) => a.featured).slice(0, 3),
		badgeText = 'Rekam Jejak Juara',
		title = 'Prestasi Pilihan Santri & Pendidik',
		description = "Capaian membanggakan santri dan guru dalam berbagai kompetisi sains, tahfidz Al-Qur'an, dan riset ilmiah di tingkat nasional & dunia."
	}: Props = $props();
</script>

<!-- 5. Prestasi Pilihan Showcase -->
<section class="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
	<Container>
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
			<div>
				<Badge variant="amber" size="md" class="mb-2">{badgeText}</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
					{title}
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					{description}
				</p>
			</div>
			<Button href="/prestasi" variant="outline" size="sm" class="font-bold self-start md:self-end">
				<span>Lihat Semua Prestasi</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each achievements as ach}
				<Card hover padding="lg" class="bg-white border-slate-200 flex flex-col justify-between">
					<div>
						<div class="flex items-center justify-between">
							<Badge variant={ach.badgeVariant} size="sm">
								Tingkat {ach.level}
							</Badge>
							<span class="text-xs font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
								{ach.year}
							</span>
						</div>

						<h3 class="mt-4 text-base font-bold text-navy-950 leading-snug">
							{ach.title}
						</h3>

						<div class="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs">
							<div class="text-[10px] uppercase font-bold text-slate-400">Penerima ({ach.role})</div>
							<div class="font-bold text-navy-950 mt-0.5">{ach.winner}</div>
						</div>
					</div>

					<div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
						<span class="font-semibold text-emerald-700">{ach.category}</span>
						<span class="text-[11px] truncate max-w-[140px]">{ach.organizer}</span>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>
