<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import { newsArticles } from '$lib/data/news';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { Calendar, Clock, ArrowRight, BookOpen, Search, User } from 'lucide-svelte';

	let selectedCategory = $state('Semua');
	let searchQuery = $state('');

	const categories = [
		'Semua',
		'Prestasi Santri',
		'Pengumuman Resmi',
		'Kegiatan Kampus',
		'Sains & Teknologi',
		'Akademik'
	];

	const filteredNews = $derived(
		newsArticles.filter((article) => {
			const matchCategory =
				selectedCategory === 'Semua' || article.category === selectedCategory;
			const matchQuery =
				searchQuery.trim() === '' ||
				article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				article.summary.toLowerCase().includes(searchQuery.toLowerCase());
			return matchCategory && matchQuery;
		})
	);

	const featuredArticle = newsArticles[0];
</script>

<svelte:head>
	<title>Warta Berita & Publikasi - {schoolData.name}</title>
	<meta
		name="description"
		content="Kumpulan warta berita resmi, prestasi santri, publikasi karya ilmiah, dan pengumuman akademik SMA & Pesantren Terpadu Madani Global."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/berita" />
	<meta property="og:title" content="Warta Berita & Publikasi - {schoolData.name}" />
	<meta property="og:description" content="Kumpulan warta berita resmi, liputan kegiatan, dan capaian santri Madani Global." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/berita" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="Warta Berita & Publikasi - {schoolData.name}" />
	<meta name="twitter:description" content="Kumpulan warta berita resmi, liputan kegiatan, dan capaian santri Madani Global." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<PageHeader
	badge="Warta Kampus"
	title="Berita, Prestasi & Publikasi Resmi"
	description="Informasi aktual seputar capaian prestasi santri, agenda akademik, liputan kegiatan asrama, dan publikasi resmi madrasah."
	currentRouteName="Berita & Artikel"
/>

<section class="py-16 sm:py-20 bg-slate-50">
	<Container>
		<!-- Featured Article (Header Hero Highlight) -->
		{#if featuredArticle && selectedCategory === 'Semua' && searchQuery.trim() === ''}
			<div class="mb-14 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
				<div class="grid grid-cols-1 lg:grid-cols-12 items-center">
					<div class="lg:col-span-7 aspect-16/10 lg:aspect-auto lg:h-full w-full overflow-hidden bg-navy-950">
						<a href="/berita/{featuredArticle.slug}">
							<img
								src={featuredArticle.image}
								alt={featuredArticle.title}
								class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
							/>
						</a>
					</div>
					<div class="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
						<div>
							<div class="flex items-center gap-3">
								<Badge variant="emerald" size="sm">{featuredArticle.category}</Badge>
								<span class="text-xs text-slate-500 font-medium">{featuredArticle.date}</span>
							</div>
							<h2 class="mt-4 text-xl sm:text-2xl font-extrabold text-navy-950 leading-snug">
								<a href="/berita/{featuredArticle.slug}" class="hover:text-emerald-700 transition-colors">
									{featuredArticle.title}
								</a>
							</h2>
							<p class="mt-3 text-sm text-slate-600 leading-relaxed">
								{featuredArticle.summary}
							</p>
						</div>

						<div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
							<span class="inline-flex items-center gap-1 font-medium">
								<Clock class="size-3.5 text-slate-400" />
								<span>{featuredArticle.readTime}</span>
							</span>
							<a
								href="/berita/{featuredArticle.slug}"
								class="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group"
							>
								<span>Baca liputan lengkap</span>
								<ArrowRight class="size-3.5 transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Filter and Search Toolbar -->
		<div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
			<!-- Category Tabs -->
			<div class="flex flex-wrap items-center gap-2">
				{#each categories as category}
					<button
						type="button"
						aria-pressed={selectedCategory === category}
						onclick={() => (selectedCategory = category)}
						class="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all {selectedCategory ===
						category
							? 'bg-navy-950 text-emerald-400 shadow-sm ring-2 ring-emerald-500/20'
							: 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}"
					>
						{category}
					</button>
				{/each}
			</div>

			<!-- Search Input -->
			<div class="relative w-full md:w-72">
				<Search class="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Cari berita atau artikel..."
					class="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
				/>
			</div>
		</div>

		<!-- News Grid -->
		{#if filteredNews.length > 0}
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredNews as news (news.slug)}
					<Card
						hover
						padding="none"
						class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between transition-all hover:shadow-md hover:border-emerald-500/40"
					>
						<div>
							<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
								<a href="/berita/{news.slug}">
									<img
										src={news.image}
										alt={news.title}
										class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
										loading="lazy"
									/>
								</a>
								<div class="absolute top-3 left-3">
									<Badge variant="navy" size="sm">{news.category}</Badge>
								</div>
							</div>

							<div class="p-6">
								<div class="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
									<Calendar class="size-3.5 text-emerald-600" />
									<span>{news.date}</span>
									<span>•</span>
									<Clock class="size-3.5 text-slate-400" />
									<span>{news.readTime}</span>
								</div>

								<h3 class="text-base font-bold text-navy-950 leading-snug">
									<a href="/berita/{news.slug}" class="hover:text-emerald-700 transition-colors">
										{news.title}
									</a>
								</h3>

								<p class="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
									{news.summary}
								</p>
							</div>
						</div>

						<div class="p-6 pt-0">
							<a
								href="/berita/{news.slug}"
								class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 hover:text-emerald-800 group"
							>
								<span>Baca selengkapnya</span>
								<ArrowRight class="size-3.5 transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</Card>
				{/each}
			</div>
		{:else}
			<div class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
				<BookOpen class="size-12 text-slate-300 mx-auto" />
				<h3 class="mt-4 text-lg font-bold text-navy-950">Tidak Ada Artikel yang Ditemukan</h3>
				<p class="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
					Tidak ditemukan artikel dengan kata kunci "{searchQuery}" pada kategori ini. Silakan coba kata kunci lain.
				</p>
				<button
					type="button"
					onclick={() => {
						searchQuery = '';
						selectedCategory = 'Semua';
					}}
					class="mt-4 inline-flex items-center rounded-xl bg-navy-950 px-4 py-2 text-xs font-bold text-white hover:bg-navy-900"
				>
					Reset Pencarian
				</button>
			</div>
		{/if}
	</Container>
</section>
