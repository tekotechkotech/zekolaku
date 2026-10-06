<script lang="ts">
	import { schoolData as defaultSchoolData, ppdbSummary as defaultPpdbSummary } from '$lib/data/school';
	import type { SchoolProfile, PPDBInfo, HeroSlide } from '$lib/types';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import {
		ArrowRight,
		CheckCircle2,
		Sparkles,
		ShieldCheck,
		Award,
		BookOpen,
		GraduationCap,
		Users,
		ChevronLeft,
		ChevronRight,
		ExternalLink
	} from 'lucide-svelte';

	interface Props {
		template?: string;
		customTitle?: string | null;
		customSubtitle?: string | null;
		badgeText?: string | null;
		bgStyle?: string;
		school?: SchoolProfile;
		ppdb?: PPDBInfo;
		slides?: HeroSlide[];
	}

	let {
		template = 'split',
		customTitle = null,
		customSubtitle = null,
		badgeText = null,
		bgStyle = 'navy',
		school = defaultSchoolData,
		ppdb = defaultPpdbSummary,
		slides = []
	}: Props = $props();

	let activeBgClass = $derived(
		bgStyle === 'white'
			? 'bg-white text-slate-900'
			: bgStyle === 'slate'
			? 'bg-slate-900 text-slate-100'
			: bgStyle === 'gradient'
			? 'bg-gradient-to-br from-navy-950 via-slate-900 to-emerald-950 text-white'
			: 'bg-navy-950 text-white'
	);

	const defaultSlides: HeroSlide[] = [
		{
			id: 'default-1',
			title: "Membentuk Generasi Qur'ani & Unggul Sains Modern",
			subtitle: "SMA & Pesantren Terpadu Madani Global mengintegrasikan kurikulum sains nasional, pembinaan adab, tahfidzul Qur'an mutqin bersanad, dan wawasan kepemimpinan global.",
			badgeText: 'Akreditasi A Unggul • Islamic Boarding School',
			image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
			primaryCtaText: 'Daftar Santri Baru',
			primaryCtaLink: '/ppdb',
			secondaryCtaText: 'Profil & Sejarah',
			secondaryCtaLink: '/tentang',
			sortOrder: 1,
			status: 'published'
		},
		{
			id: 'default-2',
			title: 'Penerimaan Santri Baru (PPDB) Tahun Ajaran 2026/2027',
			subtitle: 'Gelombang 1 Early Bird telah dibuka! Dapatkan jalur beasiswa tahfidz 15–30 juz, beasiswa juara sains OSN, serta kuota asrama terbatas.',
			badgeText: 'PPDB 2026/2027 • Gelombang 1 Dibuka',
			image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
			primaryCtaText: 'Daftar PPDB Online',
			primaryCtaLink: '/ppdb',
			secondaryCtaText: 'Konsultasi WhatsApp',
			secondaryCtaLink: 'https://wa.me/6281234567890?text=Halo%20Panitia%20PPDB%20Madani%20Global',
			sortOrder: 2,
			status: 'published'
		},
		{
			id: 'default-3',
			title: 'Prestasi Sains Dunia & Kampus Modern Ramah Lingkungan',
			subtitle: 'Mencetak juara olimpiade sains internasional, hafizh Al-Qur\'an mutqin, dan lulusan yang diterima di perguruan tinggi negeri serta luar negeri terbaik.',
			badgeText: 'Prestasi Internasional & Fasilitas Modern',
			image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80',
			primaryCtaText: 'Jelajahi Fasilitas',
			primaryCtaLink: '/fasilitas',
			secondaryCtaText: 'Lihat Prestasi',
			secondaryCtaLink: '/prestasi',
			sortOrder: 3,
			status: 'published'
		}
	];

	let activeSlides = $derived(slides && slides.length > 0 ? slides : defaultSlides);
	let currentIndex = $state(0);
	let isPaused = $state(false);
	let progress = $state(0);

	// Carousel autoplay timer effect
	$effect(() => {
		if (!template.startsWith('carousel')) return;
		if (activeSlides.length <= 1) return;

		const interval = 50;
		const slideDuration = 6000;
		const increment = (interval / slideDuration) * 100;

		const timer = setInterval(() => {
			if (isPaused) return;

			progress += increment;
			if (progress >= 100) {
				progress = 0;
				currentIndex = (currentIndex + 1) % activeSlides.length;
			}
		}, interval);

		return () => clearInterval(timer);
	});

	function nextSlide() {
		progress = 0;
		currentIndex = (currentIndex + 1) % activeSlides.length;
	}

	function prevSlide() {
		progress = 0;
		currentIndex = (currentIndex - 1 + activeSlides.length) % activeSlides.length;
	}

	function goToSlide(index: number) {
		progress = 0;
		currentIndex = index;
	}
</script>

<!-- ========================================== -->
<!-- 1. TEMPLATE: CAROUSEL KEN BURNS (CINEMATIC) -->
<!-- ========================================== -->
{#if template === 'carousel-kenburns'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class="relative overflow-hidden min-h-[620px] sm:min-h-[680px] lg:min-h-[740px] flex items-center bg-navy-950 text-white"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}
	>
		<!-- Background Slides with Ken Burns Effect -->
		{#each activeSlides as slide, i (slide.id)}
			{@const active = i === currentIndex}
			<div
				class="absolute inset-0 transition-opacity duration-1000 ease-in-out {active ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'}"
				aria-hidden={!active}
			>
				<img
					src={slide.image}
					alt={slide.title}
					class="w-full h-full object-cover object-center transition-transform duration-[6500ms] ease-out {active ? 'scale-105' : 'scale-100'}"
					loading={i === 0 ? 'eager' : 'lazy'}
				/>
				<!-- Multi-layer Gradient Overlays for High Legibility -->
				<div class="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/40"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50"></div>
			</div>
		{/each}

		<!-- Ambient Glow Accents -->
		<div class="pointer-events-none absolute -top-40 right-0 size-96 rounded-full bg-emerald-500/20 blur-3xl"></div>

		<!-- Content Overlay -->
		<Container class="relative z-10 py-20 sm:py-24">
			<div class="max-w-3xl">
				{#each activeSlides as slide, i (slide.id)}
					{#if i === currentIndex}
						<div class="transition-all duration-700 ease-out">
							<!-- Badge -->
							{#if slide.badgeText || badgeText}
								<div class="inline-flex items-center gap-2 rounded-full bg-emerald-950/90 px-4 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-700/60 mb-6 shadow-sm backdrop-blur-md">
									<Sparkles class="size-3.5 text-emerald-400" />
									<span>{badgeText || slide.badgeText}</span>
								</div>
							{/if}

							<!-- Title -->
							<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15] text-white drop-shadow-md">
								{customTitle || slide.title}
							</h1>

							<!-- Subtitle -->
							<p class="mt-6 text-base sm:text-lg leading-relaxed text-slate-200 max-w-2xl drop-shadow-xs">
								{customSubtitle || slide.subtitle}
							</p>

							<!-- CTA Buttons -->
							<div class="mt-8 flex flex-wrap items-center gap-4">
								<Button
									href={slide.primaryCtaLink || '/ppdb'}
									variant="emerald"
									size="lg"
									class="font-bold shadow-xl shadow-emerald-950/50"
								>
									<span>{slide.primaryCtaText || 'Daftar Santri Baru'}</span>
									<ArrowRight class="size-4" />
								</Button>

								{#if slide.secondaryCtaText}
									<Button
										href={slide.secondaryCtaLink || '/tentang'}
										variant="secondary"
										size="lg"
										class="font-semibold bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md"
									>
										{slide.secondaryCtaText}
									</Button>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</Container>

		<!-- Navigation Arrows (Glassmorphic) -->
		{#if activeSlides.length > 1}
			<button
				type="button"
				onclick={prevSlide}
				class="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex size-11 sm:size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all hover:scale-105 active:scale-95 shadow-lg"
				aria-label="Slide Sebelumnya"
			>
				<ChevronLeft class="size-6" />
			</button>

			<button
				type="button"
				onclick={nextSlide}
				class="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex size-11 sm:size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all hover:scale-105 active:scale-95 shadow-lg"
				aria-label="Slide Selanjutnya"
			>
				<ChevronRight class="size-6" />
			</button>

			<!-- Bottom Navigation Bar & Progress Indicator -->
			<div class="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20">
				<Container>
					<div class="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
						<!-- Slide Dots Indicator -->
						<div class="flex items-center gap-2">
							{#each activeSlides as _, i}
								<button
									type="button"
									onclick={() => goToSlide(i)}
									class="transition-all rounded-full {i === currentIndex ? 'w-8 h-2.5 bg-emerald-400' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'}"
									aria-label={`Buka slide ${i + 1}`}
								></button>
							{/each}
						</div>

						<!-- Progress Bar & Counter -->
						<div class="flex items-center gap-3 text-xs font-mono text-slate-300">
							<span class="font-bold text-emerald-400">{String(currentIndex + 1).padStart(2, '0')}</span>
							<div class="w-20 sm:w-28 h-1 bg-white/20 rounded-full overflow-hidden">
								<div class="h-full bg-emerald-400 transition-all duration-75 ease-linear" style="width: {progress}%;"></div>
							</div>
							<span class="text-slate-400">{String(activeSlides.length).padStart(2, '0')}</span>
						</div>
					</div>
				</Container>
			</div>
		{/if}
	</section>

<!-- ========================================== -->
<!-- 2. TEMPLATE: CAROUSEL SLIDE (HORIZONTAL TRACK) -->
<!-- ========================================== -->
{:else if template === 'carousel-slide'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class="relative overflow-hidden bg-navy-950 text-white py-14 sm:py-20 lg:py-24"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}
	>
		<Container>
			<!-- Header Row with Title and Navigation Controls -->
			<div class="flex items-center justify-between mb-8 sm:mb-10">
				<div class="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
					<Sparkles class="size-4" />
					<span>Sorotan Utama & Pembaharuan</span>
				</div>

				{#if activeSlides.length > 1}
					<div class="flex items-center gap-2">
						<span class="text-xs font-mono text-slate-400 mr-2">
							<strong class="text-white">{currentIndex + 1}</strong> / {activeSlides.length}
						</span>
						<button
							type="button"
							onclick={prevSlide}
							class="flex size-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
							aria-label="Slide sebelumnya"
						>
							<ChevronLeft class="size-4" />
						</button>
						<button
							type="button"
							onclick={nextSlide}
							class="flex size-9 items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
							aria-label="Slide selanjutnya"
						>
							<ChevronRight class="size-4" />
						</button>
					</div>
				{/if}
			</div>

			<!-- Slide Card Showcase -->
			<div class="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-900">
				{#each activeSlides as slide, i (slide.id)}
					{@const active = i === currentIndex}
					<div
						class="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[520px] transition-opacity duration-700 {active ? 'block opacity-100' : 'hidden opacity-0'}"
					>
						<!-- Left Side: Content Column -->
						<div class="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10 bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900">
							<div>
								{#if slide.badgeText || badgeText}
									<div class="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-700/50 mb-5">
										<Sparkles class="size-3 text-emerald-400" />
										<span>{badgeText || slide.badgeText}</span>
									</div>
								{/if}

								<h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
									{customTitle || slide.title}
								</h1>

								<p class="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
									{customSubtitle || slide.subtitle}
								</p>
							</div>

							<!-- Action Buttons -->
							<div class="mt-8 flex flex-wrap items-center gap-3.5">
								<Button
									href={slide.primaryCtaLink || '/ppdb'}
									variant="emerald"
									size="md"
									class="font-bold shadow-md shadow-emerald-950/40"
								>
									<span>{slide.primaryCtaText || 'Daftar Sekarang'}</span>
									<ArrowRight class="size-4" />
								</Button>

								{#if slide.secondaryCtaText}
									<Button
										href={slide.secondaryCtaLink || '/tentang'}
										variant="secondary"
										size="md"
										class="font-semibold bg-white/10 text-white hover:bg-white/20 border-white/20"
									>
										{slide.secondaryCtaText}
									</Button>
								{/if}
							</div>
						</div>

						<!-- Right Side: Image Column -->
						<div class="lg:col-span-5 relative overflow-hidden min-h-[260px] lg:min-h-full">
							<img
								src={slide.image}
								alt={slide.title}
								class="w-full h-full object-cover object-center"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-navy-950 via-transparent to-transparent"></div>
						</div>
					</div>
				{/each}

				<!-- Progress Bar -->
				<div class="h-1 w-full bg-white/10">
					<div class="h-full bg-emerald-400 transition-all duration-75" style="width: {progress}%;"></div>
				</div>
			</div>
		</Container>
	</section>

<!-- ========================================== -->
<!-- 3. TEMPLATE: CAROUSEL MINIMAL (CROSSFADE) -->
<!-- ========================================== -->
{:else if template === 'carousel-minimal'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class="relative overflow-hidden min-h-[580px] sm:min-h-[640px] flex items-center bg-navy-950 text-white"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}
	>
		<!-- Background with subtle overlay -->
		{#each activeSlides as slide, i (slide.id)}
			{@const active = i === currentIndex}
			<div
				class="absolute inset-0 transition-opacity duration-700 ease-in-out {active ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'}"
			>
				<img
					src={slide.image}
					alt={slide.title}
					class="w-full h-full object-cover object-center"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-navy-950/70 backdrop-blur-[2px]"></div>
			</div>
		{/each}

		<Container class="relative z-10 py-16">
			<!-- Floating Glass Card Caption -->
			<div class="max-w-2xl rounded-3xl bg-navy-950/90 backdrop-blur-xl p-8 sm:p-12 border border-white/15 shadow-2xl">
				{#each activeSlides as slide, i (slide.id)}
					{#if i === currentIndex}
						<div class="transition-all duration-500">
							{#if slide.badgeText || badgeText}
								<span class="inline-block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
									{badgeText || slide.badgeText}
								</span>
							{/if}

							<h1 class="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
								{customTitle || slide.title}
							</h1>

							<p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
								{customSubtitle || slide.subtitle}
							</p>

							<div class="mt-8 flex flex-wrap items-center gap-3.5">
								<Button
									href={slide.primaryCtaLink || '/ppdb'}
									variant="emerald"
									size="md"
									class="font-bold"
								>
									<span>{slide.primaryCtaText || 'Pelajari Lebih Lanjut'}</span>
									<ArrowRight class="size-4" />
								</Button>

								{#if slide.secondaryCtaText}
									<Button
										href={slide.secondaryCtaLink || '/tentang'}
										variant="secondary"
										size="md"
										class="bg-white/10 text-white hover:bg-white/20 border-white/20"
									>
										{slide.secondaryCtaText}
									</Button>
								{/if}
							</div>
						</div>
					{/if}
				{/each}

				<!-- Controls Bar in Card Footer -->
				{#if activeSlides.length > 1}
					<div class="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
						<div class="flex items-center gap-1.5">
							{#each activeSlides as _, i}
								<button
									type="button"
									onclick={() => goToSlide(i)}
									class="size-2 rounded-full transition-all {i === currentIndex ? 'bg-emerald-400 w-5' : 'bg-white/30 hover:bg-white/50'}"
									aria-label={`Slide ${i + 1}`}
								></button>
							{/each}
						</div>

						<div class="flex items-center gap-2">
							<button
								type="button"
								onclick={prevSlide}
								class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
								aria-label="Sebelumnya"
							>
								<ChevronLeft class="size-4" />
							</button>
							<button
								type="button"
								onclick={nextSlide}
								class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
								aria-label="Selanjutnya"
							>
								<ChevronRight class="size-4" />
							</button>
						</div>
					</div>
				{/if}
			</div>
		</Container>
	</section>

<!-- ========================================== -->
<!-- 4. TEMPLATE: CENTERED MINIMALIST (EXISTING) -->
<!-- ========================================== -->
{:else if template === 'centered'}
	<section class="relative overflow-hidden py-16 sm:py-24 lg:py-28 {activeBgClass}">
		<div class="pointer-events-none absolute -top-40 right-0 size-96 rounded-full bg-emerald-600/15 blur-3xl"></div>
		<div class="pointer-events-none absolute bottom-0 left-10 size-80 rounded-full bg-blue-600/10 blur-3xl"></div>

		<Container>
			<div class="mx-auto max-w-4xl text-center flex flex-col items-center">
				<div class="inline-flex items-center gap-2 rounded-full bg-emerald-950/90 px-4 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-700/50 mb-6 shadow-xs">
					<Sparkles class="size-3.5 text-emerald-400" />
					<span>{badgeText || `PPDB ${ppdb?.academicYear || '2026/2027'} ${ppdb?.currentWave || 'Gelombang 1'}`}</span>
				</div>

				<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
					{#if customTitle}
						{customTitle}
					{:else}
						Membentuk Generasi <span class="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">Qur’ani</span> & Unggul <span class="text-emerald-400">Sains Modern</span>
					{/if}
				</h1>

				<p class="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
					{customSubtitle || `${school.tagline}. Mengintegrasikan kurikulum sains nasional, pembinaan adab, tahfidzul Qur'an mutqin bersanad, dan wawasan global dalam lingkungan asrama yang asri dan aman.`}
				</p>

				<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
					<Button
						href="/ppdb"
						variant="emerald"
						size="lg"
						class="font-bold shadow-lg shadow-emerald-900/40"
					>
						<span>Daftar Santri Baru</span>
						<ArrowRight class="size-4" />
					</Button>
					<Button
						href="/tentang"
						variant="secondary"
						size="lg"
						class="font-semibold bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-xs"
					>
						Pelajari Profil Sekolah
					</Button>
				</div>

				<div class="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-6 text-xs text-slate-300">
					<div class="flex items-center gap-2">
						<ShieldCheck class="size-4 text-emerald-400" />
						<span>{school.accreditation}</span>
					</div>
					<span class="text-slate-600">•</span>
					<div class="flex items-center gap-2">
						<BookOpen class="size-4 text-emerald-400" />
						<span>Tahfidz Mutqin Bersanad</span>
					</div>
					<span class="text-slate-600">•</span>
					<div class="flex items-center gap-2">
						<Award class="size-4 text-emerald-400" />
						<span>Juara Riset & Sains Internasional</span>
					</div>
				</div>
			</div>
		</Container>
	</section>

<!-- ========================================== -->
<!-- 5. TEMPLATE: CARD-FLOAT (EXISTING) -->
<!-- ========================================== -->
{:else if template === 'card-float'}
	<section class="relative overflow-hidden py-16 sm:py-24 lg:py-28 {activeBgClass}">
		<div class="pointer-events-none absolute -top-40 right-0 size-96 rounded-full bg-emerald-600/15 blur-3xl"></div>
		<div class="pointer-events-none absolute bottom-0 left-10 size-80 rounded-full bg-blue-600/10 blur-3xl"></div>

		<Container>
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
				<div class="lg:col-span-7">
					<div class="inline-flex items-center gap-2 rounded-full bg-emerald-950/90 px-4 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-700/50 mb-6 shadow-xs">
						<Sparkles class="size-3.5 text-emerald-400" />
						<span>{badgeText || `Penerimaan Santri Baru TP ${ppdb?.academicYear || '2026/2027'}`}</span>
					</div>

					<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15]">
						{#if customTitle}
							{customTitle}
						{:else}
							Sekolah Islam Unggulan <span class="text-emerald-400">Berdaya Saing Global</span>
						{/if}
					</h1>

					<p class="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl">
						{customSubtitle || `Menyiapkan pemimpin masa depan yang kokoh dalam hafalan Qur'an, luhur dalam akhlakul karimah, serta cakap dalam sains dan teknologi tingkat dunia.`}
					</p>

					<div class="mt-8 flex flex-wrap items-center gap-4">
						<Button
							href="/ppdb"
							variant="emerald"
							size="lg"
							class="font-bold shadow-lg shadow-emerald-900/40"
						>
							<span>Daftar Santri Baru</span>
							<ArrowRight class="size-4" />
						</Button>
						<Button
							href="/program"
							variant="secondary"
							size="lg"
							class="font-semibold bg-white/10 text-white hover:bg-white/20 border-white/20"
						>
							Lihat Program Unggulan
						</Button>
					</div>
				</div>

				<div class="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div class="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15">
						<GraduationCap class="size-8 text-emerald-400 mb-3" />
						<h3 class="font-bold text-white text-base">Kurikulum Terpadu</h3>
						<p class="mt-1 text-xs text-slate-300 leading-relaxed">Kolaborasi kurikulum nasional plus Cambridge & matrikulasi Arab-Inggris.</p>
					</div>

					<div class="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15">
						<BookOpen class="size-8 text-emerald-400 mb-3" />
						<h3 class="font-bold text-white text-base">Tahfidz Bersanad</h3>
						<p class="mt-1 text-xs text-slate-300 leading-relaxed">Target 30 juz mutqin dengan bimbingan syaikh bersanad qira'ah.</p>
					</div>

					<div class="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15">
						<Award class="size-8 text-emerald-400 mb-3" />
						<h3 class="font-bold text-white text-base">Prestasi Internasional</h3>
						<p class="mt-1 text-xs text-slate-300 leading-relaxed">Ratusan medali kejuaraan sains, robotik, dan riset tingkat dunia.</p>
					</div>

					<div class="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15">
						<Users class="size-8 text-emerald-400 mb-3" />
						<h3 class="font-bold text-white text-base">Asrama Terpadu</h3>
						<p class="mt-1 text-xs text-slate-300 leading-relaxed">Lingkungan islami pembiasaan ibadah 24 jam dengan klinik dokter siaga.</p>
					</div>
				</div>
			</div>
		</Container>
	</section>

<!-- ========================================== -->
<!-- 6. TEMPLATE: SPLIT (DEFAULT) -->
<!-- ========================================== -->
{:else}
	<section class="relative overflow-hidden py-16 sm:py-24 lg:py-28 {activeBgClass}">
		<div class="pointer-events-none absolute -top-40 right-0 size-96 rounded-full bg-emerald-600/15 blur-3xl"></div>
		<div class="pointer-events-none absolute bottom-0 left-10 size-80 rounded-full bg-blue-600/10 blur-3xl"></div>

		<Container>
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
				<div class="lg:col-span-7">
					<div class="inline-flex items-center gap-2 rounded-full bg-emerald-950/90 px-4 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-700/50 mb-6 shadow-xs">
						<Sparkles class="size-3.5 text-emerald-400" />
						<span>{badgeText || `Penerimaan Santri Baru TP ${ppdb?.academicYear || '2026/2027'}`}</span>
					</div>

					<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15]">
						{#if customTitle}
							{customTitle}
						{:else}
							Membentuk Generasi <span class="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">Qur’ani</span> & Unggul <span class="text-emerald-400">Sains Modern</span>
						{/if}
					</h1>

					<p class="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl">
						{customSubtitle || `${school.tagline}. Mengintegrasikan kurikulum sains nasional, pembinaan adab, tahfidzul Qur'an mutqin bersanad, dan wawasan global dalam lingkungan asrama yang asri dan aman.`}
					</p>

					<div class="mt-8 flex flex-wrap items-center gap-4">
						<Button
							href="/ppdb"
							variant="emerald"
							size="lg"
							class="font-bold shadow-lg shadow-emerald-900/40"
						>
							<span>Daftar Santri Baru</span>
							<ArrowRight class="size-4" />
						</Button>
						<Button
							href="/tentang"
							variant="secondary"
							size="lg"
							class="font-semibold bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-xs"
						>
							Pelajari Profil Sekolah
						</Button>
					</div>

					<div class="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-xs text-slate-300">
						<div class="flex items-center gap-2">
							<ShieldCheck class="size-4 text-emerald-400" />
							<span>{school.accreditation}</span>
						</div>
						<span class="text-slate-600">•</span>
						<div class="flex items-center gap-2">
							<CheckCircle2 class="size-4 text-emerald-400" />
							<span>Tahfidz 30 Juz Bersanad</span>
						</div>
						<span class="text-slate-600">•</span>
						<div class="flex items-center gap-2">
							<CheckCircle2 class="size-4 text-emerald-400" />
							<span>Bilingual Arab & Inggris</span>
						</div>
					</div>
				</div>

				<div class="lg:col-span-5">
					<div class="relative mx-auto max-w-md lg:max-w-none">
						<div class="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-800 shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
								alt="Santri berprestasi Madani Global"
								class="h-80 sm:h-96 w-full object-cover object-center transition-transform duration-700 hover:scale-105"
								loading="eager"
							/>
						</div>

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
{/if}
