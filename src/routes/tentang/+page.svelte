<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import {
		CheckCircle2,
		ShieldCheck,
		Award,
		BookOpen,
		Compass,
		GraduationCap,
		Calendar,
		ArrowRight,
		Users,
		HeartHandshake,
		Building2
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title>Tentang Kami - {schoolData.name}</title>
	<meta
		name="description"
		content="Profil lengkap, sejarah, visi misi, sambutan kepala sekolah, legalitas akreditasi A Unggul, dan panca karakter SMA & Pesantren Terpadu Madani Global."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/tentang" />
	<meta property="og:title" content="Tentang Kami - {schoolData.name}" />
	<meta property="og:description" content="Profil lengkap, sejarah, visi misi, dan panca karakter SMA & Pesantren Terpadu Madani Global." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/tentang" />
	<meta property="og:image" content={schoolData.principal.photo} />
	<meta name="twitter:title" content="Tentang Kami - {schoolData.name}" />
	<meta name="twitter:description" content="Profil lengkap, sejarah, visi misi, dan panca karakter SMA & Pesantren Terpadu Madani Global." />
	<meta name="twitter:image" content={schoolData.principal.photo} />
</svelte:head>

<PageHeader
	badge="Tentang Sekolah"
	title="Profil, Sejarah & Visi Peradaban"
	description="Mengenal lebih dekat sejarah, falsafah pendidikan terpadu, dedikasi pembinaan karakter, dan komitmen mutu di SMA & Pesantren Terpadu Madani Global."
	currentRouteName="Tentang Kami"
/>

<!-- Profil & Sambutan Kepala Sekolah -->
<section class="py-16 sm:py-20 bg-white">
	<Container>
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
			<!-- Foto Kepala Sekolah -->
			<div class="lg:col-span-5">
				<div class="relative mx-auto max-w-sm lg:max-w-none">
					<div class="overflow-hidden rounded-3xl bg-navy-950 shadow-2xl border-4 border-white">
						<img
							src={schoolData.principal.photo}
							alt={schoolData.principal.name}
							class="h-96 w-full object-cover object-top"
							loading="eager"
						/>
					</div>
					<div class="mt-4 text-center sm:text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
						<h3 class="text-base sm:text-lg font-bold text-navy-950">{schoolData.principal.name}</h3>
						<p class="text-xs sm:text-sm font-semibold text-emerald-700">{schoolData.principal.title}</p>
					</div>
				</div>
			</div>

			<!-- Sambutan & Profil Sekolah -->
			<div class="lg:col-span-7">
				<div class="inline-flex items-center gap-2 mb-3">
					<Badge variant="emerald" size="md">Sambutan Kepala Sekolah</Badge>
					<Badge variant="outline" size="md">Berdiri Sejak {schoolData.establishedYear}</Badge>
				</div>
				<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight">
					Mempersiapkan Generasi Beradab Menuju Indonesia Emas & Peradaban Dunia
				</h2>
				<blockquote class="mt-6 border-l-4 border-emerald-600 pl-5 text-base italic text-slate-700 leading-relaxed bg-emerald-50/50 py-4 rounded-r-2xl border-y border-r border-emerald-100/60">
					"{schoolData.principal.greeting}"
				</blockquote>
				<p class="mt-6 text-sm sm:text-base leading-relaxed text-slate-600">
					{schoolData.history.summary}
				</p>

				<!-- Legalitas & Akreditasi Badges -->
				<div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
					<div class="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80">
						<div class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
							<ShieldCheck class="size-5" />
						</div>
						<div>
							<div class="text-[11px] font-semibold text-slate-400">Akreditasi BAN-S/M</div>
							<div class="text-xs font-bold text-navy-950">{schoolData.accreditation}</div>
						</div>
					</div>

					<div class="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80">
						<div class="flex size-10 items-center justify-center rounded-xl bg-navy-100 text-navy-900 shrink-0">
							<GraduationCap class="size-5" />
						</div>
						<div>
							<div class="text-[11px] font-semibold text-slate-400">Kemendikbudristek</div>
							<div class="text-xs font-bold text-navy-950">NPSN: {schoolData.npsn}</div>
						</div>
					</div>

					<div class="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80">
						<div class="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shrink-0">
							<Award class="size-5" />
						</div>
						<div>
							<div class="text-[11px] font-semibold text-slate-400">Kemenag RI</div>
							<div class="text-xs font-bold text-navy-950">NSM: {schoolData.nsm}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>

<!-- Sejarah & Perjalanan Sekolah (Timeline Milestones) -->
<section class="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
	<Container>
		<SectionHeader
			badge="Jejak Langkah"
			badgeVariant="navy"
			title="Sejarah & Tonggak Perkembangan"
			description="Perjalanan dedikasi SMA & Pesantren Terpadu Madani Global dari awal pendirian hingga menjadi rujukan pendidikan terpadu unggulan."
		/>

		<div class="mt-12 max-w-4xl mx-auto">
			<div class="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-28 space-y-10 py-4">
				{#each schoolData.history.milestones as milestone}
					<div class="relative flex items-start group">
						<!-- Year badge for desktop -->
						<div class="hidden sm:block absolute -left-28 w-24 text-right pr-4">
							<span class="inline-block text-sm font-black text-white bg-navy-950 px-3 py-1 rounded-xl shadow-xs border border-navy-800">
								{milestone.year}
							</span>
						</div>

						<!-- Dot marker -->
						<div class="absolute -left-[9px] top-1.5 size-4 rounded-full border-2 border-white bg-emerald-600 group-hover:scale-125 transition-transform shadow-xs"></div>

						<!-- Milestone card -->
						<div class="ml-6 sm:ml-8 rounded-2xl bg-white p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all w-full">
							<div class="sm:hidden mb-2">
								<span class="inline-block text-xs font-black text-white bg-navy-950 px-2.5 py-0.5 rounded-lg">
									{milestone.year}
								</span>
							</div>
							<h3 class="text-base sm:text-lg font-bold text-navy-950">
								{milestone.title}
							</h3>
							<p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
								{milestone.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>

<!-- Visi & Misi Lembaga -->
<section class="py-16 sm:py-20 bg-white border-t border-slate-200">
	<Container>
		<SectionHeader
			badge="Arah Kebijakan"
			badgeVariant="emerald"
			title="Visi & Misi Lembaga"
			description="Prinsip dasar dan panduan strategis yang melandasi seluruh kegiatan akademik, asrama, dan manajemen institusi."
		/>

		<div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Card Visi (5 cols) -->
			<div class="lg:col-span-5">
				<Card padding="lg" class="h-full bg-navy-950 text-white border-navy-800 flex flex-col justify-between shadow-lg">
					<div>
						<div class="flex items-center gap-2.5 text-emerald-400">
							<Compass class="size-6" />
							<span class="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Visi Lembaga</span>
						</div>
						<h3 class="mt-5 text-xl sm:text-2xl font-bold leading-snug text-white">
							{schoolData.vision}
						</h3>
					</div>
					<div class="mt-8 pt-6 border-t border-navy-800/80 text-xs text-slate-300 flex items-center gap-2">
						<CheckCircle2 class="size-4 text-emerald-400 shrink-0" />
						<span>Dirumuskan sebagai panduan pembentukan karakter generasi muttaqin unggul.</span>
					</div>
				</Card>
			</div>

			<!-- Card Misi (7 cols) -->
			<div class="lg:col-span-7">
				<Card padding="lg" class="h-full bg-slate-50 border-slate-200 shadow-xs">
					<div class="flex items-center gap-2.5 text-emerald-700">
						<BookOpen class="size-6" />
						<span class="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Misi Utama</span>
					</div>
					<ul class="mt-6 space-y-4">
						{#each schoolData.missions as mission, idx}
							<li class="flex items-start gap-3.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
								<span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
									{idx + 1}
								</span>
								<p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
									{mission}
								</p>
							</li>
						{/each}
					</ul>
				</Card>
			</div>
		</div>
	</Container>
</section>

<!-- Panca Karakter / Nilai Pokok Sekolah -->
<section class="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
	<Container>
		<SectionHeader
			badge="Panca Karakter"
			badgeVariant="navy"
			title="Nilai Karakter & Budaya Sekolah"
			description="Lima nilai inti yang dibiasakan dalam keseharian santri, pendidik, dan segenap keluarga besar Madani Global."
		/>

		<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each schoolData.values as val, idx}
				<Card hover padding="md" class="border-slate-200 bg-white flex flex-col justify-between">
					<div>
						<div class="flex items-center justify-between">
							<span class="flex size-9 items-center justify-center rounded-xl bg-navy-950 text-xs font-black text-emerald-400 shadow-xs">
								0{idx + 1}
							</span>
							<Badge variant="outline" size="sm">Karakter Inti</Badge>
						</div>
						<h3 class="mt-4 text-base sm:text-lg font-bold text-navy-950">{val.title}</h3>
						<p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
							{val.description}
						</p>
					</div>
					<div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
						<CheckCircle2 class="size-3.5" />
						<span>Diterapkan dalam budaya asrama harian</span>
					</div>
				</Card>
			{/each}
		</div>

		<!-- CTA Hubungi / Kunjungan -->
		<div class="mt-16 rounded-3xl bg-navy-950 p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-800">
			<div>
				<h3 class="text-xl sm:text-2xl font-bold">Ingin Berkunjung Langsung ke Kampus Kami?</h3>
				<p class="mt-1.5 text-xs sm:text-sm text-slate-300">
					Kami menyambut silaturahmi calon wali santri untuk observasi sarana, asrama, dan konsultasi pendidikan.
				</p>
			</div>
			<div class="flex items-center gap-3 shrink-0">
				<Button href="/kontak" variant="emerald" size="md" class="font-bold">
					<span>Jadwalkan Kunjungan</span>
					<ArrowRight class="size-4" />
				</Button>
			</div>
		</div>
	</Container>
</section>
