<script lang="ts">
	import { schoolData as defaultSchoolData, ppdbSummary as defaultPpdbSummary } from '$lib/data/school';
	import type { SchoolProfile, PPDBInfo } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import {
		ArrowRight,
		CheckCircle2,
		Sparkles,
		ShieldCheck,
		Award
	} from 'lucide-svelte';

	interface Props {
		school?: SchoolProfile;
		ppdb?: PPDBInfo;
	}

	let {
		school = defaultSchoolData,
		ppdb = defaultPpdbSummary
	}: Props = $props();
</script>

<!-- 1. Hero Section -->
<section class="relative overflow-hidden bg-navy-950 py-16 sm:py-24 lg:py-28 text-white">
	<!-- Ambient glow accents -->
	<div class="pointer-events-none absolute -top-40 right-0 size-96 rounded-full bg-emerald-600/15 blur-3xl"></div>
	<div class="pointer-events-none absolute bottom-0 left-10 size-80 rounded-full bg-blue-600/10 blur-3xl"></div>

	<Container>
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
			<!-- Left Column: Copywriting & CTA -->
			<div class="flex flex-col items-start lg:col-span-7">
				<div class="inline-flex items-center gap-2 rounded-full bg-emerald-950/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-700/50 mb-5 shadow-xs">
					<Sparkles class="size-3.5 text-emerald-400" />
					<span>PPDB {ppdb.academicYear} Telah Dibuka</span>
					<span class="size-1.5 rounded-full bg-emerald-400"></span>
					<span class="text-white/80">{ppdb.currentWave}</span>
				</div>

				<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
					Membentuk Generasi <span class="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">Qur’ani</span> & Unggul <span class="text-emerald-400">Sains Modern</span>
				</h1>

				<p class="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
					{school.tagline}. Mengintegrasikan kurikulum sains nasional, pembinaan adab, tahfidzul Qur'an mutqin bersanad, dan wawasan global dalam lingkungan asrama yang asri dan aman.
				</p>

				<!-- Action Buttons -->
				<div class="mt-8 flex flex-wrap items-center gap-4">
					<Button
						href="/ppdb"
						variant="emerald"
						size="lg"
						class="font-bold shadow-lg shadow-emerald-900/30"
					>
						<span>Daftar Santri Baru</span>
						<ArrowRight class="size-4" />
					</Button>
					<Button
						href="/tentang"
						variant="secondary"
						size="lg"
						class="font-semibold bg-navy-900 text-white hover:bg-navy-800 border-navy-700"
					>
						Pelajari Profil Sekolah
					</Button>
				</div>

				<!-- Trust highlights -->
				<div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-navy-800/80 pt-6 w-full text-xs text-slate-300">
					<div class="flex items-center gap-2">
						<ShieldCheck class="size-4 text-emerald-400 shrink-0" />
						<span>{school.accreditation}</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckCircle2 class="size-4 text-emerald-400 shrink-0" />
						<span>Eco-Pesantren & Boarding</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckCircle2 class="size-4 text-emerald-400 shrink-0" />
						<span>NPSN: {school.npsn} Resmi</span>
					</div>
				</div>
			</div>

			<!-- Right Column: Visual Hero Showcase -->
			<div class="relative lg:col-span-5">
				<div class="relative mx-auto max-w-md lg:max-w-none">
					<!-- Main Hero Photo -->
					<div class="overflow-hidden rounded-3xl border-2 border-navy-800 bg-navy-900 shadow-2xl">
						<img
							src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
							alt="Santri berprestasi Madani Global sedang belajar di perpustakaan digital"
							class="h-80 sm:h-96 w-full object-cover object-center transition-transform duration-700 hover:scale-105"
							loading="eager"
						/>
					</div>

					<!-- Floating Stat Badge Top Right -->
					<div class="absolute -top-4 -right-2 sm:-right-4 rounded-2xl bg-white p-3.5 shadow-xl text-slate-900 border border-slate-100 max-w-[200px]">
						<div class="flex items-center gap-2.5">
							<div class="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
								<Award class="size-5" />
							</div>
							<div>
								<div class="text-base font-extrabold text-navy-950">140+ Santri</div>
								<div class="text-[11px] font-medium text-slate-500">Hafizh 30 Juz Mutqin</div>
							</div>
						</div>
					</div>

					<!-- Floating Badge Bottom Left -->
					<div class="absolute -bottom-5 -left-2 sm:-left-4 rounded-2xl bg-navy-900/95 backdrop-blur-md p-3.5 shadow-xl text-white border border-navy-700 max-w-[220px]">
						<div class="flex items-center gap-2.5">
							<div class="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
								<Sparkles class="size-5" />
							</div>
							<div>
								<div class="text-xs font-bold text-white">Akreditasi A Unggul</div>
								<div class="text-[10px] text-emerald-400">Kemendikbud & Kemenag</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>
