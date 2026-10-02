<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import { programsData } from '$lib/data/programs';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import {
		CheckCircle2,
		GraduationCap,
		Building2,
		Sparkles,
		ArrowRight,
		BookOpen,
		Target,
		Compass
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title>Program Pendidikan - {schoolData.name}</title>
	<meta
		name="description"
		content="Daftar jurusan & program pendidikan unggulan: Sains Terpadu STEM, Takhassus Tahfidz 30 Juz, Cambridge Bilingual, dan Sosial Humaniora di Madani Global."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/program" />
	<meta property="og:title" content="Program Pendidikan - {schoolData.name}" />
	<meta property="og:description" content="Kurikulum terpadu sains, tahfidz bersanad 30 juz, dan program Cambridge di Madani Global." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/program" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="Program Pendidikan - {schoolData.name}" />
	<meta name="twitter:description" content="Kurikulum terpadu sains, tahfidz bersanad 30 juz, dan program Cambridge di Madani Global." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<PageHeader
	badge="Kurikulum Terpadu"
	title="Program & Jurusan Pendidikan"
	description="Sinergi kurikulum nasional, penguatan tahfidzul Qur'an bersanad, keunggulan sains modern, dan wawasan global untuk membina calon pemimpin masa depan."
	currentRouteName="Program Pendidikan"
/>

<!-- Program List Section -->
<section class="py-16 sm:py-20 bg-slate-50">
	<Container>
		<SectionHeader
			badge="Pilihan Peminatan"
			badgeVariant="emerald"
			title="Kurikulum Dirancang Menuju Masa Depan"
			description="Setiap program dirancang dengan standar kompetensi terukur, fasilitas laboratorium pendukung lengkap, serta pendampingan intensif menuju perguruan tinggi terbaik dunia."
			class="mb-14"
		/>

		<div class="space-y-16 lg:space-y-24">
			{#each programsData as prog, idx}
				<div
					id={prog.id}
					class="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-sm transition-all hover:shadow-md"
				>
					<div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start {idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}">
						<!-- Kolom Visual Foto Program -->
						<div class="lg:col-span-5 {idx % 2 === 1 ? 'lg:col-start-8' : ''}">
							<div class="sticky top-24">
								<div class="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg group">
									<div class="aspect-4/3 w-full overflow-hidden bg-navy-950">
										<img
											src={prog.image}
											alt={prog.name}
											class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
											loading="lazy"
										/>
									</div>
									<div class="absolute top-3.5 left-3.5">
										<Badge variant="emerald" size="md">{prog.badge}</Badge>
									</div>
								</div>

								<!-- Quick Summary Box -->
								<div class="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 text-xs">
									<div class="font-bold text-navy-950 flex items-center gap-1.5 mb-1.5">
										<Target class="size-4 text-emerald-600" />
										<span>Karakteristik Program</span>
									</div>
									<p class="text-slate-600 leading-relaxed">
										Mengkombinasikan jam belajar terstruktur dengan praktikum eksperimen dan mentoring keasramaan.
									</p>
								</div>
							</div>
						</div>

						<!-- Kolom Konten & Spesifikasi (Nama, Deskripsi, Kompetensi, Prospek, Fasilitas) -->
						<div class="lg:col-span-7 {idx % 2 === 1 ? 'lg:col-start-1' : ''}">
							<div class="inline-block">
								<span class="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
									{prog.category}
								</span>
							</div>

							<h2 class="mt-3 text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight leading-snug">
								{prog.name}
							</h2>

							<p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
								{prog.description}
							</p>

							<!-- 3 Poin Utama Sesuai Spesifikasi: Kompetensi Utama, Prospek, Fasilitas Pendukung -->
							<div class="mt-8 space-y-6">
								<!-- 1. Kompetensi Utama -->
								<div class="rounded-2xl bg-slate-50/80 p-5 sm:p-6 border border-slate-200">
									<div class="flex items-center gap-2 mb-3">
										<div class="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
											<CheckCircle2 class="size-4" />
										</div>
										<h3 class="text-sm sm:text-base font-bold text-navy-950">
											Kompetensi Utama Lulusan
										</h3>
									</div>
									<ul class="space-y-2.5 pl-1">
										{#each prog.competencies as comp}
											<li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
												<span class="size-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
												<span>{comp}</span>
											</li>
										{/each}
									</ul>
								</div>

								<!-- 2. Prospek Studi Lanjut & Karir -->
								<div class="rounded-2xl bg-slate-50/80 p-5 sm:p-6 border border-slate-200">
									<div class="flex items-center gap-2 mb-3">
										<div class="flex size-7 items-center justify-center rounded-lg bg-navy-950 text-emerald-400">
											<GraduationCap class="size-4" />
										</div>
										<h3 class="text-sm sm:text-base font-bold text-navy-950">
											Prospek Studi Lanjut & Kiprah
										</h3>
									</div>
									<ul class="space-y-2.5 pl-1">
										{#each prog.prospects as prosp}
											<li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
												<span class="size-1.5 rounded-full bg-navy-800 mt-2 shrink-0"></span>
												<span>{prosp}</span>
											</li>
										{/each}
									</ul>
								</div>

								<!-- 3. Fasilitas Pendukung Program -->
								<div class="rounded-2xl bg-slate-50/80 p-5 sm:p-6 border border-slate-200">
									<div class="flex items-center gap-2 mb-3">
										<div class="flex size-7 items-center justify-center rounded-lg bg-amber-500 text-white">
											<Building2 class="size-4" />
										</div>
										<h3 class="text-sm sm:text-base font-bold text-navy-950">
											Fasilitas Pendukung Khusus
										</h3>
									</div>
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
										{#each prog.facilities as fac}
											<div class="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80">
												<span class="size-1.5 rounded-full bg-amber-500 shrink-0"></span>
												<span class="font-medium">{fac}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Standar Portofolio 4 Pilar Lulusan -->
		<div class="mt-20 rounded-3xl bg-navy-950 p-8 sm:p-12 text-white border border-navy-800 shadow-xl">
			<div class="max-w-3xl">
				<Badge variant="emerald" size="sm" class="mb-3">Standar Kualitas</Badge>
				<h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
					Profil Portofolio Santri Lulusan Madani Global
				</h3>
				<p class="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
					Apapun program peminatan yang dipilih, setiap santri dipastikan memiliki empat pondasi portofolio kelulusan yang seimbang:
				</p>
			</div>

			<div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<div class="rounded-2xl bg-navy-900/90 p-5 border border-navy-800">
					<span class="text-emerald-400 font-black text-xl">01</span>
					<h4 class="mt-2 font-bold text-white text-sm">Shahibul Qur’an</h4>
					<p class="mt-1 text-xs text-slate-300 leading-relaxed">Memiliki hafalan mutqin, beradab luhur, dan istiqamah mengamalkan sunnah harian.</p>
				</div>
				<div class="rounded-2xl bg-navy-900/90 p-5 border border-navy-800">
					<span class="text-emerald-400 font-black text-xl">02</span>
					<h4 class="mt-2 font-bold text-white text-sm">Kompeten Sains</h4>
					<p class="mt-1 text-xs text-slate-300 leading-relaxed">Menguasai nalar sains empiris, metodologi riset ilmiah, dan kecakapan komputasi.</p>
				</div>
				<div class="rounded-2xl bg-navy-900/90 p-5 border border-navy-800">
					<span class="text-emerald-400 font-black text-xl">03</span>
					<h4 class="mt-2 font-bold text-white text-sm">Cakap Multibahasa</h4>
					<p class="mt-1 text-xs text-slate-300 leading-relaxed">Fasih berbahasa Arab syar'i dan Bahasa Inggris saintifik dalam forum akademis.</p>
				</div>
				<div class="rounded-2xl bg-navy-900/90 p-5 border border-navy-800">
					<span class="text-emerald-400 font-black text-xl">04</span>
					<h4 class="mt-2 font-bold text-white text-sm">Kesiapan Studi Global</h4>
					<p class="mt-1 text-xs text-slate-300 leading-relaxed">Portofolio akademik kuat untuk menembus PTN ternama, Timur Tengah, dan kampus dunia.</p>
				</div>
			</div>

			<div class="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-navy-800">
				<span class="text-xs text-slate-400">Pendaftaran santri baru jalur beasiswa prestasi & jalur reguler sedang dibuka.</span>
				<Button href="/ppdb" variant="emerald" size="md" class="font-bold">
					<span>Daftar Santri Baru Sekarang</span>
					<ArrowRight class="size-4" />
				</Button>
			</div>
		</div>
	</Container>
</section>
