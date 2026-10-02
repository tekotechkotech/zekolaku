<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import {
		dailySchedule,
		extracurriculars,
		activitiesData,
		activityGallery
	} from '$lib/data/activities';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import {
		Calendar,
		Clock,
		Sparkles,
		CheckCircle2,
		ArrowRight,
		Camera,
		UserCheck,
		Compass
	} from 'lucide-svelte';

	let activeScheduleTab = $state<'Semua' | 'Pagi' | 'Siang' | 'Sore' | 'Malam'>('Semua');

	const filteredSchedule = $derived(
		activeScheduleTab === 'Semua'
			? dailySchedule
			: dailySchedule.filter((item) => item.period === activeScheduleTab)
	);
</script>

<svelte:head>
	<title>Kegiatan Santri & Ekstrakurikuler - {schoolData.name}</title>
	<meta
		name="description"
		content="Aktivitas 24 jam santri, ragam ekstrakurikuler minat bakat, agenda tahunan akbar, dan dokumentasi galeri kegiatan di SMA & Pesantren Terpadu Madani Global."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/kegiatan" />
	<meta property="og:title" content="Kegiatan Santri & Ekstrakurikuler - {schoolData.name}" />
	<meta property="og:description" content="Keseharian 24 jam, eskul robotik, panahan, silat, dan dokumentasi kegiatan asrama santri Madani Global." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/kegiatan" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="Kegiatan Santri & Ekstrakurikuler - {schoolData.name}" />
	<meta name="twitter:description" content="Keseharian 24 jam, eskul robotik, panahan, silat, dan dokumentasi kegiatan asrama santri Madani Global." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<PageHeader
	badge="Kehidupan Santri"
	title="Kegiatan, Ekstrakurikuler & Dokumentasi"
	description="Dinamika keseharian yang seimbang antara ibadah, akademik sains terpadu, pembinaan bakat olahraga seni, dan persaudaraan santri."
	currentRouteName="Kegiatan Santri"
/>

<!-- 1. Jadwal Rutinitas 24 Jam Santri -->
<section class="py-16 sm:py-20 bg-white">
	<Container>
		<SectionHeader
			badge="Kedisiplinan Asrama"
			badgeVariant="emerald"
			title="Rutinitas 24 Jam Santri Madani"
			description="Manajemen waktu yang terstruktur mendidik santri menghargai setiap detik kehidupan dengan produktivitas ilmiah, adab, dan ibadah."
		/>

		<!-- Schedule Filter Tabs -->
		<div class="flex items-center justify-center gap-2 mt-8 mb-10">
			{#each (['Semua', 'Pagi', 'Siang', 'Sore', 'Malam'] as const) as period}
				<button
					type="button"
					aria-pressed={activeScheduleTab === period}
					onclick={() => (activeScheduleTab = period)}
					class="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all {activeScheduleTab ===
					period
						? 'bg-navy-950 text-emerald-400 shadow-sm ring-2 ring-emerald-500/20'
						: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
				>
					{period}
				</button>
			{/each}
		</div>

		<div class="max-w-4xl mx-auto">
			<div class="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-32 space-y-8 py-4">
				{#each filteredSchedule as item}
					<div class="relative flex items-start group">
						<!-- Time Badge for Desktop -->
						<div class="hidden sm:block absolute -left-32 w-28 text-right pr-4">
							<span class="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
								{item.time}
							</span>
						</div>

						<!-- Timeline dot -->
						<div class="absolute -left-[9px] top-1.5 size-4 rounded-full border-2 border-white bg-emerald-600 group-hover:scale-125 transition-transform shadow-xs"></div>

						<!-- Content Box -->
						<div class="ml-6 sm:ml-8 rounded-2xl bg-slate-50 p-4 sm:p-5 border border-slate-200/80 w-full hover:bg-white hover:shadow-md transition-all">
							<div class="sm:hidden mb-1.5 flex items-center justify-between">
								<span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
									{item.time}
								</span>
								<span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.period}</span>
							</div>
							<h4 class="text-base font-bold text-navy-950">{item.activity}</h4>
							<p class="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>

<!-- 2. Ekstrakurikuler Minat & Bakat -->
<section class="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
	<Container>
		<SectionHeader
			badge="Pengembangan Bakat"
			badgeVariant="navy"
			title="Ekstrakurikuler Minat, Sains & Seni"
			description="Wadah aktualisasi diri santri untuk mengasah kecakapan fisik, kreativitas rekayasa sains, literasi bahasa, dan seni Islam."
		/>

		<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each extracurriculars as eskul}
				<Card hover padding="md" class="border-slate-200 bg-white flex flex-col justify-between transition-all hover:shadow-md">
					<div>
						<div class="flex items-center justify-between gap-2 mb-3">
							<Badge variant="navy" size="sm">
								{eskul.category}
							</Badge>
							<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
								{eskul.badge}
							</span>
						</div>

						<h3 class="text-base font-bold text-navy-950">
							{eskul.name}
						</h3>

						<p class="mt-2 text-xs text-slate-600 leading-relaxed">
							{eskul.desc}
						</p>

						<div class="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
							<div class="flex items-center gap-1.5">
								<Clock class="size-3.5 text-slate-400" />
								<span>{eskul.schedule}</span>
							</div>
							<div class="flex items-center gap-1.5">
								<UserCheck class="size-3.5 text-emerald-600" />
								<span class="truncate">{eskul.instructor}</span>
							</div>
						</div>
					</div>

					<div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
						<CheckCircle2 class="size-3.5" />
						<span>Terbuka Putra & Putri</span>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>

<!-- 3. Agenda Tahunan & Event Akbar -->
<section class="py-16 sm:py-20 bg-white border-t border-slate-200">
	<Container>
		<SectionHeader
			badge="Agenda Akbar"
			badgeVariant="emerald"
			title="Event Tahunan & Program Unggulan"
			description="Rangkaian perhelatan akbar yang menjadi momentum pembuktian kompetensi dan pembinaan kepemimpinan santri."
		/>

		<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each activitiesData as act}
				<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between transition-all hover:shadow-md">
					<div>
						<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
							<img
								src={act.image}
								alt={act.title}
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
								loading="lazy"
							/>
							<div class="absolute top-3 left-3">
								<Badge variant="emerald" size="sm">{act.category}</Badge>
							</div>
						</div>

						<div class="p-5">
							<div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
								<Calendar class="size-3.5 text-emerald-600" />
								<span>{act.schedule}</span>
							</div>

							<h3 class="text-base font-bold text-navy-950 leading-snug">
								{act.title}
							</h3>

							<p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
								{act.description}
							</p>
						</div>
					</div>

					<div class="p-5 pt-0">
						<div class="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
							<CheckCircle2 class="size-3.5" />
							<span>Agenda Resmi Pesantren</span>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>

<!-- 4. Dokumentasi Galeri Foto Kegiatan (Aspect Ratio Seragam) -->
<section class="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
	<Container>
		<div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
			<div>
				<div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
					<Camera class="size-4" />
					<span>Dokumentasi Kampus</span>
				</div>
				<h2 class="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
					Galeri Aktivitas Santri Madani
				</h2>
				<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
					Potret keseharian pembelajaran saintifik, ibadah halaqah, olahraga, dan pengasuhan di lingkungan asrama.
				</p>
			</div>
			<div class="text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 self-start sm:self-end">
				{activityGallery.length} Foto Dokumentasi Terbaru
			</div>
		</div>

		<!-- Aspect ratio seragam: aspect-4/3 -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each activityGallery as photo}
				<div class="group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
					<div class="relative aspect-4/3 w-full overflow-hidden bg-navy-950">
						<img
							src={photo.image}
							alt={photo.title}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							loading="lazy"
						/>
						<div class="absolute top-3 left-3">
							<Badge variant="navy" size="sm">{photo.category}</Badge>
						</div>
						<div class="absolute bottom-3 right-3 rounded-md bg-navy-950/80 backdrop-blur-xs px-2 py-0.5 text-[11px] text-white">
							{photo.date}
						</div>
					</div>
					<div class="p-4">
						<h3 class="text-sm font-bold text-navy-950 leading-snug">
							{photo.title}
						</h3>
						<p class="mt-1 text-xs text-slate-500 leading-relaxed">
							{photo.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</Container>
</section>
