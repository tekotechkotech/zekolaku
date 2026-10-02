<script lang="ts">
	import { ppdbSummary as defaultPpdbSummary, schoolData as defaultSchoolData } from '$lib/data/school';
	import type { PPDBInfo, SchoolProfile } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	interface Props {
		ppdb?: PPDBInfo;
		school?: SchoolProfile;
		badgeText?: string;
		title?: string;
	}

	let {
		ppdb = defaultPpdbSummary,
		school = defaultSchoolData,
		badgeText = 'Penerimaan Santri Baru (PPDB)',
		title = 'Wujudkan Impian Menjadi Generasi Qur’ani & Ilmuwan Beradab'
	}: Props = $props();
</script>

<!-- 8. CTA PPDB Banner -->
<section class="bg-navy-950 py-16 sm:py-20 text-white border-t border-navy-900 relative overflow-hidden">
	<div class="pointer-events-none absolute -right-10 top-0 size-80 rounded-full bg-emerald-600/10 blur-3xl"></div>
	<Container>
		<div class="rounded-3xl bg-linear-to-r from-navy-900 to-navy-800 p-8 sm:p-12 border border-navy-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
			<div class="max-w-2xl">
				<Badge variant="emerald" size="md" class="mb-3">
					{badgeText}
				</Badge>
				<h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
					{title}
				</h2>
				<p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
					Telah dibuka pendaftaran {ppdb.currentWave} Tahun Ajaran {ppdb.academicYear}. Kuota terbatas {ppdb.quotaTotal} santri untuk menjaga rasio mentoring optimal. Batas pendaftaran hingga {ppdb.deadline}.
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
					href={school.contact.whatsappUrl}
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
	</Container>
</section>
