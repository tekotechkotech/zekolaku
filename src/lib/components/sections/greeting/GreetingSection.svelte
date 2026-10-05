<script lang="ts">
	import { schoolData as defaultSchoolData } from '$lib/data/school';
	import type { SchoolProfile } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Quote, ArrowRight, CheckCircle2, Award } from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		school?: SchoolProfile;
	}

	let {
		template = 'split-photo',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'white',
		school = defaultSchoolData
	}: Props = $props();

	let activeBgClass = $derived(
		bgStyle === 'slate'
			? 'bg-slate-50 text-slate-800'
			: bgStyle === 'navy'
			? 'bg-navy-950 text-white'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-br from-emerald-50 to-slate-50 text-slate-900'
			: 'bg-white text-slate-800'
	);
</script>

<section class="py-16 sm:py-20 border-b border-slate-100 {activeBgClass}">
	<Container>
		{#if template === 'quote-clean'}
			<!-- TEMPLATE 2: QUOTE CARD ELEGAN -->
			<div class="mx-auto max-w-4xl text-center">
				<div class="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6 shadow-xs">
					<Quote class="size-7" />
				</div>

				<h2 class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
					{badgeText || 'Pesan Pimpinan Lembaga'}
				</h2>

				<blockquote class="text-xl sm:text-2xl lg:text-3xl font-serif italic text-slate-900 leading-relaxed max-w-3xl mx-auto">
					"{school.principal?.greeting || 'Mendidik dengan hati, menanamkan adab sebelum ilmu, dan menyiapkan generasi penerus yang teguh memegang Al-Qur\'an di tengah pesatnya perkembangan sains dan teknologi.'}"
				</blockquote>

				<div class="mt-8 flex flex-col items-center">
					{#if school.principal?.photo}
						<img
							src={school.principal.photo}
							alt={school.principal.name}
							class="size-16 rounded-full object-cover border-2 border-emerald-500 shadow-md mb-3"
						/>
					{/if}
					<h3 class="text-base font-bold text-slate-900">{school.principal?.name}</h3>
					<p class="text-xs text-slate-500">{school.principal?.title}</p>
				</div>
			</div>

		{:else}
			<!-- TEMPLATE 1: SPLIT PHOTO & SAMBUTAN (DEFAULT) -->
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
				<!-- Left Column: Photo & Credentials -->
				<div class="lg:col-span-5 flex flex-col items-center lg:items-start">
					<div class="relative max-w-xs sm:max-w-sm">
						<div class="overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-emerald-950">
							<img
								src={school.principal?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600'}
								alt={school.principal?.name}
								class="h-96 w-full object-cover object-top"
							/>
						</div>
						<div class="absolute -bottom-4 -right-4 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100">
							<div class="flex items-center gap-2">
								<Award class="size-5 text-emerald-600" />
								<div>
									<div class="text-xs font-bold text-slate-900">Al-Azhar Kairo</div>
									<div class="text-[10px] text-slate-500">Sanad Qira'ah 'Ashim</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column: Welcome Speech -->
				<div class="lg:col-span-7 flex flex-col items-start">
					<div class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-4 border border-emerald-200">
						<CheckCircle2 class="size-3.5 text-emerald-600" />
						<span>{badgeText || 'Sambutan Kepala Sekolah'}</span>
					</div>

					<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
						{#if customTitle}
							{customTitle}
						{:else}
							Menyiapkan Calon Ulama yang <span class="text-emerald-700">Saintis & Berwawasan Global</span>
						{/if}
					</h2>

					<p class="mt-4 text-xs font-semibold text-slate-500">
						Oleh: <strong class="text-slate-900">{school.principal?.name}</strong> &bull; {school.principal?.title}
					</p>

					<div class="mt-6 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
						<p>
							{customSubtitle || school.principal?.greeting}
						</p>
						<p>
							Kami percaya bahwa pendidikan terbaik tidak memisahkan antara kecerdasan akal, kematangan emosional, dan kesucian spiritual. Di Madani Global, setiap santri dibimbing untuk mencintai Al-Qur'an sekaligus menguasai instrumen sains modern.
						</p>
					</div>

					<div class="mt-8 flex items-center gap-4">
						<Button href="/tentang" variant="outline" size="md" class="border-slate-300 font-semibold">
							<span>Selengkapnya Tentang Lembaga</span>
							<ArrowRight class="size-4" />
						</Button>
					</div>
				</div>
			</div>
		{/if}
	</Container>
</section>
