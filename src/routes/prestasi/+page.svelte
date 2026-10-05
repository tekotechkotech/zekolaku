<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import { achievementsData } from '$lib/data/achievements';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { Award, Trophy, Star, Medal, Users, GraduationCap, Filter } from 'lucide-svelte';

	// Filters state using Svelte 5 Runes
	let roleFilter = $state<'Semua' | 'Siswa' | 'Guru'>('Semua');
	let scopeFilter = $state<'Semua' | 'Akademik' | 'Non-Akademik'>('Semua');
	let levelFilter = $state<'Semua' | 'Internasional' | 'Nasional' | 'Provinsi'>('Semua');

	// Derived filtered achievements
	const filteredAchievements = $derived(
		achievementsData.filter((item) => {
			const matchRole = roleFilter === 'Semua' || item.role === roleFilter;
			const matchScope = scopeFilter === 'Semua' || item.scope === scopeFilter;
			const matchLevel = levelFilter === 'Semua' || item.level === levelFilter;
			return matchRole && matchScope && matchLevel;
		})
	);

	// Count metrics
	const totalInternational = achievementsData.filter((a) => a.level === 'Internasional').length;
	const totalNational = achievementsData.filter((a) => a.level === 'Nasional').length;
	const totalStudents = achievementsData.filter((a) => a.role === 'Siswa').length;
	const totalTeachers = achievementsData.filter((a) => a.role === 'Guru').length;
</script>

<svelte:head>
	<title>Prestasi Santri & Guru - {schoolData.name}</title>
	<meta
		name="description"
		content="Rekam jejak kejuaraan dan medali prestasi santri dan asatidz Madani Global di tingkat internasional, nasional, dan provinsi pada bidang akademik serta non-akademik."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/prestasi" />
	<meta property="og:title" content="Prestasi Santri & Guru - {schoolData.name}" />
	<meta property="og:description" content="Bukti nyata capaian juara olimpiade sains, hifdzil Qur'an internasional, dan riset santri Madani Global." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/prestasi" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="Prestasi Santri & Guru - {schoolData.name}" />
	<meta name="twitter:description" content="Bukti nyata capaian juara olimpiade sains, hifdzil Qur'an internasional, dan riset santri Madani Global." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<PageHeader
	badge="Prestasi & Penghargaan"
	title="Rekam Jejak Prestasi Santri & Guru"
	description="Bukti nyata kerja keras, bimbingan intensif para asatidz, dan ketekunan santri Madani Global dalam mengharumkan nama agama dan bangsa di berbagai ajang bergengsi."
	currentRouteName="Galeri Prestasi"
/>

<section class="py-16 sm:py-20 bg-slate-50">
	<Container>
		<!-- Highlight Metric Cards -->
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16">
			<div class="rounded-2xl bg-navy-950 p-6 text-white text-center border border-navy-800 shadow-md">
				<Trophy class="size-6 text-amber-400 mx-auto" />
				<div class="mt-2 text-2xl sm:text-3xl font-black">{totalInternational}+</div>
				<div class="text-xs text-slate-300 font-medium mt-0.5">Penghargaan Internasional</div>
			</div>
			<div class="rounded-2xl bg-navy-950 p-6 text-white text-center border border-navy-800 shadow-md">
				<Award class="size-6 text-emerald-400 mx-auto" />
				<div class="mt-2 text-2xl sm:text-3xl font-black">{totalNational}+</div>
				<div class="text-xs text-slate-300 font-medium mt-0.5">Juara Tingkat Nasional</div>
			</div>
			<div class="rounded-2xl bg-navy-950 p-6 text-white text-center border border-navy-800 shadow-md">
				<GraduationCap class="size-6 text-blue-400 mx-auto" />
				<div class="mt-2 text-2xl sm:text-3xl font-black">{totalStudents}+</div>
				<div class="text-xs text-slate-300 font-medium mt-0.5">Penghargaan Santri</div>
			</div>
			<div class="rounded-2xl bg-navy-950 p-6 text-white text-center border border-navy-800 shadow-md">
				<Star class="size-6 text-amber-400 mx-auto" />
				<div class="mt-2 text-2xl sm:text-3xl font-black">{totalTeachers}+</div>
				<div class="text-xs text-slate-300 font-medium mt-0.5">Prestasi Guru & Pembina</div>
			</div>
		</div>

		<!-- Interactive Filter Toolbar -->
		<div class="rounded-3xl bg-white p-5 sm:p-6 border border-slate-200 shadow-xs mb-10">
			<div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
				<Filter class="size-4 text-emerald-600" />
				<span>Filter Galeri Prestasi</span>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<!-- Role Filter: Siswa vs Guru -->
				<div>
					<span class="block text-xs font-semibold text-slate-700 mb-1.5">Penerima Prestasi</span>
					<div role="group" aria-label="Filter Penerima Prestasi" class="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
						{#each (['Semua', 'Siswa', 'Guru'] as const) as role}
							<button
								type="button"
								aria-pressed={roleFilter === role}
								onclick={() => (roleFilter = role)}
								class="flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-bold transition-all {roleFilter === role
									? 'bg-white text-navy-950 shadow-xs'
									: 'text-slate-500 hover:text-slate-900'}"
							>
								{role}
							</button>
						{/each}
					</div>
				</div>

				<!-- Scope Filter: Akademik vs Non-Akademik -->
				<div>
					<span class="block text-xs font-semibold text-slate-700 mb-1.5">Bidang Prestasi</span>
					<div role="group" aria-label="Filter Bidang Prestasi" class="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
						{#each (['Semua', 'Akademik', 'Non-Akademik'] as const) as scope}
							<button
								type="button"
								aria-pressed={scopeFilter === scope}
								onclick={() => (scopeFilter = scope)}
								class="flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-bold transition-all {scopeFilter === scope
									? 'bg-white text-navy-950 shadow-xs'
									: 'text-slate-500 hover:text-slate-900'}"
							>
								{scope}
							</button>
						{/each}
					</div>
				</div>

				<!-- Level Filter: Tingkat Pencapaian -->
				<div>
					<span class="block text-xs font-semibold text-slate-700 mb-1.5">Tingkat Kejuaraan</span>
					<div role="group" aria-label="Filter Tingkat Kejuaraan" class="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
						{#each (['Semua', 'Internasional', 'Nasional', 'Provinsi'] as const) as level}
							<button
								type="button"
								aria-pressed={levelFilter === level}
								onclick={() => (levelFilter = level)}
								class="flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-bold transition-all {levelFilter === level
									? 'bg-white text-navy-950 shadow-xs'
									: 'text-slate-500 hover:text-slate-900'}"
							>
								{level}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Achievement Cards Grid -->
		{#if filteredAchievements.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredAchievements as ach (ach.id)}
					<Card
						hover
						padding="lg"
						class="border-slate-200 bg-white flex flex-col justify-between transition-all hover:shadow-md hover:border-emerald-500/40"
					>
						<div>
							<!-- Header badges: Level & Year & Scope -->
							<div class="flex items-center justify-between gap-2">
								<div class="flex items-center gap-1.5">
									<Badge variant={ach.badgeVariant as any} size="sm">
										{ach.level}
									</Badge>
									<Badge variant="outline" size="sm">
										{ach.scope}
									</Badge>
								</div>
								<span class="text-xs font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
									{ach.year}
								</span>
							</div>

							<!-- Title -->
							<h3 class="mt-4 text-base sm:text-lg font-bold text-navy-950 leading-snug">
								{ach.title}
							</h3>

							<!-- Recipient Box -->
							<div class="mt-4 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
								<div class="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
									<span>Penerima Penghargaan</span>
									<span class="text-emerald-700 font-bold">{ach.role}</span>
								</div>
								<div class="mt-1 text-xs font-bold text-navy-950">
									{ach.winner}
								</div>
							</div>

							<!-- Description snippet if available -->
							{#if ach.description}
								<p class="mt-3 text-xs text-slate-600 leading-relaxed">
									{ach.description}
								</p>
							{/if}
						</div>

						<!-- Footer: Category & Organizer -->
						<div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
							<span class="font-semibold text-emerald-700">{ach.category}</span>
							<span class="truncate max-w-[150px] text-right font-medium text-slate-400" title={ach.organizer}>
								{ach.organizer}
							</span>
						</div>
					</Card>
				{/each}
			</div>
		{:else}
			<div class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
				<Award class="size-12 text-slate-300 mx-auto" />
				<h3 class="mt-4 text-lg font-bold text-navy-950">Tidak Ditemukan Prestasi</h3>
				<p class="mt-1.5 text-xs text-slate-500 max-w-md mx-auto">
					Tidak ada data prestasi yang cocok dengan kombinasi filter yang dipilih. Silakan atur kembali filter di atas.
				</p>
				<button
					type="button"
					onclick={() => {
						roleFilter = 'Semua';
						scopeFilter = 'Semua';
						levelFilter = 'Semua';
					}}
					class="mt-4 inline-flex items-center rounded-xl bg-navy-950 px-4 py-2 text-xs font-bold text-white hover:bg-navy-900"
				>
					Reset Semua Filter
				</button>
			</div>
		{/if}
	</Container>
</section>
