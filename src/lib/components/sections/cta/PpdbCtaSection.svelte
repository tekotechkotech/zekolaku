<script lang="ts">
	import { ppdbSummary as defaultPpdbSummary, schoolData as defaultSchoolData } from '$lib/data/school';
	import type { PPDBInfo, SchoolProfile } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { ArrowRight, Phone, Sparkles, Clock, Users } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		ppdb?: PPDBInfo;
		school?: SchoolProfile;
	}

	let {
		template = 'fullwidth-banner',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'navy',
		ppdb = defaultPpdbSummary,
		school = defaultSchoolData
	}: Props = $props();

	let activeBgClass = $derived(
		bgStyle === 'white'
			? 'bg-white text-slate-800 border-slate-200'
			: bgStyle === 'slate'
			? 'bg-slate-900 text-white border-slate-800'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-r from-emerald-950 via-navy-950 to-navy-900 text-white border-navy-800'
			: 'bg-navy-950 text-white border-navy-900'
	);
</script>

<!-- PPDB CTA SECTION -->
<section class="{activeBgClass} py-16 sm:py-20 border-t relative overflow-hidden">
	<div class="pointer-events-none absolute -right-10 top-0 size-80 rounded-full bg-emerald-600/10 blur-3xl"></div>

	<Container>
		{#if template === 'split-countdown'}
			<!-- TEMPLATE 2: SPLIT COUNTDOWN & INFO GELOMBANG -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
				<div class="lg:col-span-7">
					<Badge variant="emerald" size="md" class="mb-3">
						{badgeText || 'Penerimaan Santri Baru (PPDB)'}
					</Badge>
					<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
						{customTitle || 'Wujudkan Impian Menjadi Generasi Qur’ani & Ilmuwan Beradab'}
					</h2>
					<p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
						{customSubtitle || `Pendaftaran ${ppdb.currentWave} Tahun Ajaran ${ppdb.academicYear} sedang dibuka. Amankan kursi calon santri sebelum kuota terpenuhi.`}
					</p>

					<div class="mt-8 flex flex-wrap items-center gap-4">
						<Button href="/ppdb" variant="emerald" size="lg" class="font-bold shadow-lg shadow-emerald-900/40">
							<span>Daftar Online Sekarang</span>
							<ArrowRight class="size-4" />
						</Button>
						<Button
							href={school.contact?.whatsappUrl || 'https://wa.me/6281234567890'}
							target="_blank"
							rel="noopener noreferrer"
							variant="secondary"
							size="lg"
							class="bg-white/10 text-white hover:bg-white/20 border-white/20 font-semibold"
						>
							<Phone class="size-4" />
							<span>Konsultasi WhatsApp</span>
						</Button>
					</div>
				</div>

				<div class="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
					<div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
						<Sparkles class="size-4" />
						<span>Status Pendaftaran Aktif</span>
					</div>

					<div class="grid grid-cols-2 gap-4 pt-2">
						<div class="p-4 rounded-2xl bg-white/5 border border-white/10">
							<div class="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
								<Clock class="size-3.5" />
								<span>Batas Waktu</span>
							</div>
							<div class="text-base font-bold text-white">{ppdb.deadline}</div>
						</div>

						<div class="p-4 rounded-2xl bg-white/5 border border-white/10">
							<div class="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
								<Users class="size-3.5" />
								<span>Total Kuota</span>
							</div>
							<div class="text-base font-bold text-emerald-400">{ppdb.quotaTotal} Santri</div>
						</div>
					</div>

					<div class="pt-3 border-t border-white/10 text-xs text-slate-300">
						Gelombang aktif: <strong class="text-white">{ppdb.currentWave}</strong> &bull; Tahun Ajaran <strong class="text-white">{ppdb.academicYear}</strong>
					</div>
				</div>
			</div>

		{:else if template === 'floating-card'}
			<!-- TEMPLATE 3: FLOATING GRADIENT BOX -->
			<div class="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-emerald-900/90 to-navy-900/90 p-8 sm:p-12 border border-emerald-500/30 shadow-2xl text-center backdrop-blur-md">
				<Badge variant="emerald" size="md" class="mb-4">
					{badgeText || 'Penerimaan Santri Baru'}
				</Badge>
				<h2 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
					{customTitle || 'Siapkan Masa Depan Gemilang Putra-Putri Anda Bersama Kami'}
				</h2>
				<p class="mt-4 text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
					{customSubtitle || `Kuota terbatas ${ppdb.quotaTotal} santri untuk ${ppdb.currentWave}. Proses pendaftaran mudah dan cepat secara daring.`}
				</p>
				<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
					<Button href="/ppdb" variant="emerald" size="lg" class="font-bold shadow-lg shadow-emerald-950/40">
						Daftar Online Sekarang
					</Button>
					<Button
						href={school.contact?.whatsappUrl || 'https://wa.me/6281234567890'}
						target="_blank"
						rel="noopener noreferrer"
						variant="secondary"
						size="lg"
						class="bg-white/10 text-white hover:bg-white/20 border-white/20 font-semibold"
					>
						Tanya Panitia PPDB
					</Button>
				</div>
			</div>

		{:else}
			<!-- TEMPLATE 1: FULLWIDTH BANNER KONTRAS (DEFAULT) -->
			<div class="rounded-3xl bg-linear-to-r from-navy-900 to-navy-800 p-8 sm:p-12 border border-navy-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
				<div class="max-w-2xl">
					<Badge variant="emerald" size="md" class="mb-3">
						{badgeText || 'Penerimaan Santri Baru (PPDB)'}
					</Badge>
					<h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
						{customTitle || 'Wujudkan Impian Menjadi Generasi Qur’ani & Ilmuwan Beradab'}
					</h2>
					<p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
						{customSubtitle || `Telah dibuka pendaftaran ${ppdb.currentWave} Tahun Ajaran ${ppdb.academicYear}. Kuota terbatas ${ppdb.quotaTotal} santri untuk menjaga rasio mentoring optimal. Batas pendaftaran hingga ${ppdb.deadline}.`}
					</p>
				</div>

				<div class="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
					<Button
						href="/ppdb"
						variant="emerald"
						size="lg"
						class="w-full sm:w-auto font-bold shadow-md shadow-emerald-900/40"
					>
						Daftar Online Sekarang
					</Button>
					<Button
						href={school.contact?.whatsappUrl || 'https://wa.me/6281234567890'}
						target="_blank"
						rel="noopener noreferrer"
						variant="secondary"
						size="lg"
						class="w-full sm:w-auto bg-navy-950 text-white hover:bg-navy-900 border-navy-700 font-semibold"
					>
						Konsultasi via WhatsApp
					</Button>
				</div>
			</div>
		{/if}
	</Container>
</section>
