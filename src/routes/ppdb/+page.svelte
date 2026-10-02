<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import { ppdbData } from '$lib/data/ppdb';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import {
		Calendar,
		CheckCircle2,
		Sparkles,
		Phone,
		FileText,
		CreditCard,
		HelpCircle,
		ArrowRight,
		Users,
		ShieldCheck,
		ChevronDown
	} from 'lucide-svelte';

	// Accordion state for FAQs
	let openFaqIndex = $state<number | null>(0);

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}
</script>

<svelte:head>
	<title>Penerimaan Santri Baru (PPDB) {ppdbData.academicYear} - {schoolData.name}</title>
	<meta
		name="description"
		content="Pusat informasi resmi PPDB {ppdbData.academicYear} SMA & Pesantren Terpadu Madani Global. Jadwal gelombang, syarat pendaftaran, rincian biaya transparan, beasiswa, dan FAQ."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/ppdb" />
	<meta property="og:title" content="Penerimaan Santri Baru (PPDB) {ppdbData.academicYear} - {schoolData.name}" />
	<meta property="og:description" content="Informasi gelombang seleksi, beasiswa tahfidz 100%, dan panduan pendaftaran santri baru Madani Global." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/ppdb" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="PPDB {ppdbData.academicYear} - {schoolData.name}" />
	<meta name="twitter:description" content="Informasi gelombang seleksi, beasiswa tahfidz 100%, dan panduan pendaftaran santri baru Madani Global." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<PageHeader
	badge="Penerimaan Santri Baru"
	title="Informasi Lengkap PPDB {ppdbData.academicYear}"
	description="Mari bergabung bersama keluarga besar Madani Global untuk mencetak generasi pemimpin muttaqin yang beradab luhur dan unggul dalam penguasaan sains teknologi modern."
	currentRouteName="PPDB Online"
/>

<section class="py-16 sm:py-20 bg-white">
	<Container>
		<!-- 1. Hero Wave Banner -->
		<div class="rounded-3xl bg-linear-to-r from-navy-950 via-navy-900 to-navy-950 p-8 sm:p-12 text-white border border-navy-800 shadow-2xl relative overflow-hidden">
			<div class="pointer-events-none absolute -top-24 right-0 size-80 rounded-full bg-emerald-600/15 blur-3xl"></div>

			<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
				<div class="max-w-2xl">
					<div class="inline-flex items-center gap-2 rounded-full bg-emerald-950/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-700/50 mb-3">
						<span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
						<span>Status: {ppdbData.status}</span>
						<span class="text-white/60">•</span>
						<span>Tahun Ajaran {ppdbData.academicYear}</span>
					</div>

					<h2 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
						{ppdbData.currentWave}
					</h2>

					<p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
						Pendaftaran gelombang pertama dibuka sampai tanggal <strong class="text-white underline decoration-emerald-500/60 underline-offset-4">{ppdbData.deadline}</strong>. Kuota total penerimaan dibatasi <strong class="text-white">{ppdbData.quotaTotal} santri</strong> (putra & putri) guna menjaga rasio pembinaan asrama yang intensif.
					</p>

					<div class="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300">
						<div class="flex items-center gap-1.5">
							<ShieldCheck class="size-4 text-emerald-400" />
							<span>Akreditasi A Unggul</span>
						</div>
						<div class="flex items-center gap-1.5">
							<Users class="size-4 text-emerald-400" />
							<span>Sistem Asrama Terpisah Putra & Putri</span>
						</div>
					</div>
				</div>

				<!-- Conversion CTAs -->
				<div class="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
					<Button
						href={ppdbData.whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						variant="emerald"
						size="lg"
						class="w-full justify-center font-bold shadow-lg shadow-emerald-900/40"
					>
						<Phone class="size-4" />
						<span>Konsultasi Panitia WA</span>
					</Button>
					<Button
						href="/kontak"
						variant="secondary"
						size="lg"
						class="w-full justify-center bg-navy-900 text-white hover:bg-navy-800 border-navy-700 font-semibold"
					>
						Jadwalkan Kunjungan Kampus
					</Button>
				</div>
			</div>
		</div>

		<!-- 2. Jadwal Gelombang Seleksi -->
		<div class="mt-20">
			<SectionHeader
				badge="Jadwal Pendaftaran"
				badgeVariant="navy"
				title="Jadwal Gelombang Penerimaan"
				description="Perhatikan linimasa jadwal setiap gelombang untuk memastikan kelengkapan berkas sebelum kuota terpenuhi."
			/>

			<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each ppdbData.waves as wave}
					<Card hover padding="lg" class="border-slate-200 bg-white flex flex-col justify-between transition-all hover:shadow-md">
						<div>
							<div class="flex items-center justify-between mb-3">
								<Badge
									variant={wave.status === 'Dibuka'
										? 'emerald'
										: wave.status === 'Segera Dibuka'
											? 'amber'
											: 'slate'}
									size="sm"
								>
									{wave.status}
								</Badge>
								<Calendar class="size-4 text-slate-400" />
							</div>

							<h3 class="text-base sm:text-lg font-bold text-navy-950">
								{wave.name}
							</h3>

							<div class="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block">
								{wave.period}
							</div>

							<p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
								{wave.description}
							</p>
						</div>

						<div class="mt-6 pt-4 border-t border-slate-100">
							{#if wave.status === 'Dibuka'}
								<a
									href={ppdbData.whatsappUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
								>
									<span>Daftar gelombang ini</span>
									<ArrowRight class="size-3.5" />
								</a>
							{:else}
								<span class="text-xs text-slate-400 font-medium">Jadwal belum aktif</span>
							{/if}
						</div>
					</Card>
				{/each}
			</div>
		</div>

		<!-- 3. Tahapan Alur Pendaftaran 4 Langkah -->
		<div class="mt-20">
			<SectionHeader
				badge="Prosedur Seleksi"
				badgeVariant="emerald"
				title="Alur Pendaftaran 4 Langkah Mudah"
				description="Proses seleksi transparan yang dapat diikuti secara terpadu baik secara offline maupun online dari seluruh Indonesia."
			/>

			<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each ppdbData.steps as step}
					<Card hover padding="lg" class="border-slate-200 bg-slate-50/70 flex flex-col justify-between">
						<div>
							<span class="text-3xl sm:text-4xl font-black text-emerald-600">
								{step.number}
							</span>
							<h3 class="mt-3 text-base font-bold text-navy-950">
								{step.title}
							</h3>
							<p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
								{step.desc}
							</p>
						</div>
					</Card>
				{/each}
			</div>
		</div>

		<!-- 4. Persyaratan Berkas & Skema Beasiswa -->
		<div class="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Persyaratan Berkas (6 cols) -->
			<div class="lg:col-span-6">
				<Card padding="lg" class="h-full border-slate-200 bg-white">
					<div class="flex items-center gap-2.5 text-navy-950 mb-5">
						<div class="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
							<FileText class="size-5" />
						</div>
						<div>
							<h3 class="text-base sm:text-lg font-bold">Persyaratan Berkas Dokumen</h3>
							<p class="text-xs text-slate-500">Disiapkan dalam bentuk fotokopi atau hasil scan PDF/foto</p>
						</div>
					</div>

					<ul class="space-y-3 text-xs sm:text-sm text-slate-700">
						{#each ppdbData.requirements as req}
							<li class="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
								<CheckCircle2 class="size-4 text-emerald-600 shrink-0 mt-0.5" />
								<span class="leading-relaxed">{req}</span>
							</li>
						{/each}
					</ul>
				</Card>
			</div>

			<!-- Skema Beasiswa Unggulan (6 cols) -->
			<div class="lg:col-span-6">
				<Card padding="lg" class="h-full border-slate-200 bg-emerald-50/40">
					<div class="flex items-center gap-2.5 text-navy-950 mb-5">
						<div class="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
							<Sparkles class="size-5" />
						</div>
						<div>
							<h3 class="text-base sm:text-lg font-bold text-navy-950">Program Beasiswa Unggulan</h3>
							<p class="text-xs text-slate-600">Apresiasi dan dukungan penuh bagi santri berprestasi</p>
						</div>
					</div>

					<div class="space-y-4">
						{#each ppdbData.scholarships as sch}
							<div class="rounded-2xl bg-white p-5 border border-emerald-200/80 shadow-xs">
								<div class="flex items-center justify-between gap-2 mb-1.5">
									<h4 class="text-sm font-bold text-navy-950">{sch.title}</h4>
									<Badge variant="emerald" size="sm">{sch.badge}</Badge>
								</div>
								<p class="text-xs text-slate-600 leading-relaxed">
									{sch.description}
								</p>
							</div>
						{/each}
					</div>
				</Card>
			</div>
		</div>

		<!-- 5. Rincian Biaya & Investasi Pendidikan Transparan -->
		<div class="mt-20">
			<SectionHeader
				badge="Transparansi Investasi"
				badgeVariant="navy"
				title="Rincian Investasi Pendidikan"
				description="Struktur pembiayaan yang transparan, tanpa biaya tersembunyi, untuk menjamin kualitas sarana dan pemenuhan gizi santri."
			/>

			<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each ppdbData.fees as fee}
					<Card hover padding="lg" class="border-slate-200 bg-white flex flex-col justify-between">
						<div>
							<Badge variant={fee.type === 'Bulanan' ? 'emerald' : 'navy'} size="sm" class="mb-3">
								Biaya {fee.type}
							</Badge>

							<h3 class="text-sm sm:text-base font-bold text-navy-950">
								{fee.name}
							</h3>

							<div class="mt-3 text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
								{fee.amount}
							</div>

							<p class="mt-2 text-xs text-slate-600 leading-relaxed">
								{fee.description}
							</p>
						</div>

						<div class="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
							Dapat diangsur sesuai ketentuan panitia
						</div>
					</Card>
				{/each}
			</div>
		</div>

		<!-- 6. Tanya Jawab (FAQ) Accordion -->
		<div class="mt-20">
			<SectionHeader
				badge="Tanya Jawab"
				badgeVariant="emerald"
				title="Pertanyaan yang Sering Diajukan (FAQ)"
				description="Jawaban atas pertanyaan-pertanyaan yang paling sering diajukan oleh para orang tua calon santri."
			/>

			<div class="mt-10 max-w-3xl mx-auto space-y-4">
				{#each ppdbData.faqs as faq, index}
					<div class="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all">
						<button
							type="button"
							id="faq-btn-{index}"
							aria-expanded={openFaqIndex === index}
							aria-controls="faq-panel-{index}"
							onclick={() => toggleFaq(index)}
							class="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 transition-colors"
						>
							<div class="flex items-center gap-3">
								<HelpCircle class="size-5 text-emerald-600 shrink-0" />
								<span class="text-sm sm:text-base font-bold text-navy-950">{faq.q}</span>
							</div>
							<ChevronDown
								class="size-5 text-slate-400 shrink-0 transition-transform duration-300 {openFaqIndex ===
								index
									? 'rotate-180 text-emerald-600'
									: ''}"
							/>
						</button>

						{#if openFaqIndex === index}
							<div
								id="faq-panel-{index}"
								role="region"
								aria-labelledby="faq-btn-{index}"
								class="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed pl-13 border-t border-slate-200/60 bg-white"
							>
								{faq.a}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- 7. Final Conversion Banner -->
		<div class="mt-20 rounded-3xl bg-navy-950 p-8 sm:p-12 text-white border border-navy-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
			<div>
				<Badge variant="emerald" size="sm" class="mb-3">Keluarga Besar Madani Global</Badge>
				<h3 class="text-2xl sm:text-3xl font-extrabold text-white">
					Siap Menjadi Bagian dari Peradaban Gemilang?
				</h3>
				<p class="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl">
					Hubungi panitia penerimaan santri baru untuk berkonsultasi mengenai jalur beasiswa atau panduan pengisian berkas.
				</p>
			</div>
			<div class="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
				<Button
					href={ppdbData.whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					variant="emerald"
					size="lg"
					class="w-full sm:w-auto font-bold"
				>
					<Phone class="size-4" />
					<span>Hubungi Panitia via WA</span>
				</Button>
			</div>
		</div>
	</Container>
</section>
