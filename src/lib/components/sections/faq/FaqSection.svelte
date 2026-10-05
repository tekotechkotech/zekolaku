<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		itemCount?: number;
		faqs?: { q: string; a: string }[];
	}

	let {
		template = 'accordion-2col',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'slate',
		itemCount = 6,
		faqs = []
	}: Props = $props();

	const defaultFaqs = [
		{
			q: 'Bagaimana kurikulum pembelajaran di SMA Madani Global?',
			a: 'Kami mengintegrasikan Kurikulum Nasional Kemendikbud, kurikulum kepesantrenan dengan fokus tahfidz Al-Qur\'an bersanad, serta pengayaan sains modern berbasis laboratorium dan Cambridge Science.'
		},
		{
			q: 'Apakah santri diperbolehkan membawa gawai (gadget/laptop)?',
			a: 'Untuk santri baru di asrama, penggunaan gawai diatur secara terarah hanya pada jam literasi digital dan pembelajaran komputer di laboratorium demi menjaga fokus ibadah dan adab.'
		},
		{
			q: 'Bagaimana sistem asrama dan pendampingan santri 24 jam?',
			a: 'Setiap asrama dibimbing oleh Musyrif/Musyrifah (pembina asrama) dengan rasio 1 pembina untuk 15 santri. Pendampingan meliputi shalat berjamaah, halaqah tahfidz, makan bersama, dan bimbingan kepribadian.'
		},
		{
			q: 'Apakah ada program beasiswa bagi santri berprestasi?',
			a: 'Ya, kami menyediakan beasiswa jalur Tahfidz (minimal 10 juz mutqin) dan Beasiswa Juara Olimpiade Sains Nasional/Internasional berupa pemotongan uang pangkal hingga 100%.'
		},
		{
			q: 'Bagaimana prosedur dan jadwal pendaftaran santri baru (PPDB)?',
			a: 'Pendaftaran dilakukan secara daring melalui website resmi kami. Calon santri akan mengikuti tes observasi baca Al-Qur\'an, tes potensi akademik dasar, dan wawancara orang tua.'
		},
		{
			q: 'Bagaimana penanganan kesehatan santri di lingkungan asrama?',
			a: 'Kami memiliki fasilitas Pos Kesehatan Pesantren (Poskestren) dengan tenaga medis siaga dan bekerja sama dengan rumah sakit rujukan terdekat untuk penanganan darurat 24 jam.'
		}
	];

	let displayedFaqs = $derived(
		(faqs && faqs.length > 0 ? faqs : defaultFaqs).slice(0, itemCount || 6)
	);

	let openItems = $state<Record<number, boolean>>({ 0: true, 1: true });

	function toggleItem(index: number) {
		openItems[index] = !openItems[index];
	}

	let activeBgClass = $derived(
		bgStyle === 'white'
			? 'bg-white text-slate-800'
			: bgStyle === 'navy'
			? 'bg-navy-950 text-white'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-b from-slate-50 to-white text-slate-800'
			: 'bg-slate-50 text-slate-800'
	);
</script>

<!-- FAQ SECTION -->
<section class="py-16 sm:py-24 border-t border-slate-200 {activeBgClass}">
	<Container>
		<div class="max-w-3xl mx-auto text-center mb-14">
			<Badge variant="emerald" size="md" class="mb-3">
				{badgeText || 'Pusat Informasi'}
			</Badge>
			<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
				{customTitle || 'Pertanyaan yang Sering Diajukan (FAQ)'}
			</h2>
			<p class="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
				{customSubtitle || 'Temukan jawaban cepat seputar kurikulum, sistem kehidupan asrama santri, beasiswa, dan pendaftaran santri baru.'}
			</p>
		</div>

		{#if template === 'card-grid'}
			<!-- TEMPLATE 2: CARD GRID (OPEN CARDS) -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
				{#each displayedFaqs as faq}
					<div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
						<div>
							<div class="size-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
								<HelpCircle class="size-4.5" />
							</div>
							<h3 class="font-bold text-sm text-navy-950 mb-2 leading-snug">{faq.q}</h3>
							<p class="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
						</div>
					</div>
				{/each}
			</div>

		{:else}
			<!-- TEMPLATE 1: ACCORDION 2-KOLOM (DEFAULT) -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
				{#each displayedFaqs as faq, idx}
					{@const isOpen = !!openItems[idx]}
					<div class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors">
						<button
							type="button"
							onclick={() => toggleItem(idx)}
							class="w-full p-5 text-left flex items-start justify-between gap-4 font-bold text-sm text-navy-950 hover:text-emerald-700 transition-colors"
						>
							<span class="leading-snug">{faq.q}</span>
							<ChevronDown class="size-4.5 shrink-0 text-slate-400 transition-transform duration-200 mt-0.5 {isOpen ? 'rotate-180 text-emerald-600' : ''}" />
						</button>
						{#if isOpen}
							<div class="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
								{faq.a}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Help Center Footer CTA -->
		<div class="mt-12 text-center">
			<p class="text-xs text-slate-500 mb-3">Punya pertanyaan lain yang belum terjawab?</p>
			<Button href="/kontak" variant="outline" size="sm" class="font-semibold">
				<MessageCircle class="size-4 text-emerald-600" />
				<span>Hubungi Layanan Konsultasi</span>
			</Button>
		</div>
	</Container>
</section>
