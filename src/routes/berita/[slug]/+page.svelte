<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import {
		Calendar,
		Clock,
		ArrowLeft,
		User,
		Share2,
		BookOpen,
		ArrowRight,
		ChevronRight,
		Sparkles
	} from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const article = $derived(data.article);
	const relatedArticles = $derived(data.relatedArticles);
</script>

<svelte:head>
	<title>{article.title} - SMA & Pesantren Terpadu Madani Global</title>
	<meta name="description" content={article.summary} />
	<link rel="canonical" href="https://madaniglobal.sch.id/berita/{article.slug}" />
	<meta property="og:title" content="{article.title} - Madani Global" />
	<meta property="og:description" content={article.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://madaniglobal.sch.id/berita/{article.slug}" />
	<meta property="og:image" content={article.image} />
	<meta property="article:published_time" content={article.date} />
	<meta property="article:section" content={article.category} />
	<meta property="article:author" content={article.author.name} />
	<meta name="twitter:title" content="{article.title} - Madani Global" />
	<meta name="twitter:description" content={article.summary} />
	<meta name="twitter:image" content={article.image} />
</svelte:head>

<!-- Article Header & Breadcrumbs -->
<div class="border-b border-slate-200 bg-white py-8">
	<Container>
		<!-- Breadcrumb -->
		<nav class="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6" aria-label="Breadcrumb">
			<a href="/" class="hover:text-emerald-700 transition-colors">Beranda</a>
			<ChevronRight class="size-3.5 text-slate-400" />
			<a href="/berita" class="hover:text-emerald-700 transition-colors">Berita & Artikel</a>
			<ChevronRight class="size-3.5 text-slate-400" />
			<span class="text-slate-800 line-clamp-1 max-w-[200px] sm:max-w-md">{article.title}</span>
		</nav>

		<!-- Back Button Link -->
		<a
			href="/berita"
			class="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-6 group"
		>
			<ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" />
			<span>Kembali ke Semua Berita</span>
		</a>

		<!-- Category & Meta -->
		<div class="flex flex-wrap items-center gap-3 mb-4">
			<Badge variant="emerald" size="md">{article.category}</Badge>
			<span class="flex items-center gap-1 text-xs text-slate-500 font-medium">
				<Calendar class="size-3.5 text-emerald-600" />
				<span>{article.date}</span>
			</span>
			<span class="text-slate-300">•</span>
			<span class="flex items-center gap-1 text-xs text-slate-500 font-medium">
				<Clock class="size-3.5 text-slate-400" />
				<span>{article.readTime}</span>
			</span>
		</div>

		<!-- Title -->
		<h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight max-w-4xl">
			{article.title}
		</h1>

		<!-- Author Information -->
		<div class="mt-6 flex items-center gap-3 pt-6 border-t border-slate-100">
			<div class="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
				<User class="size-5" />
			</div>
			<div>
				<div class="text-sm font-bold text-navy-950">{article.author.name}</div>
				<div class="text-xs text-slate-500">{article.author.role}</div>
			</div>
		</div>
	</Container>
</div>

<!-- Article Content Body -->
<section class="py-12 sm:py-16 bg-slate-50">
	<Container>
		<div class="mx-auto max-w-4xl">
			<!-- Main Featured Image -->
			<div class="overflow-hidden rounded-3xl border border-slate-200 bg-navy-950 shadow-xl mb-12">
				<div class="aspect-16/10 w-full overflow-hidden">
					<img
						src={article.image}
						alt={article.title}
						class="h-full w-full object-cover"
						loading="eager"
					/>
				</div>
				<div class="p-4 bg-white border-t border-slate-100 text-center text-xs text-slate-500 italic">
					Dokumentasi liputan resmi civitas akademika SMA & Pesantren Terpadu Madani Global
				</div>
			</div>

			<!-- Article Paragraphs -->
			<div class="rounded-3xl bg-white p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
				<!-- Lead Summary Callout -->
				<p class="text-base sm:text-lg font-semibold leading-relaxed text-navy-950 border-l-4 border-emerald-600 pl-5 py-1 bg-emerald-50/40 rounded-r-xl">
					{article.summary}
				</p>

				<!-- Body Paragraphs -->
				{#each article.content as paragraph}
					<p class="text-base leading-relaxed text-slate-700">
						{paragraph}
					</p>
				{/each}

				<!-- Tags Section -->
				{#if article.tags && article.tags.length > 0}
					<div class="mt-10 pt-6 border-t border-slate-100">
						<div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
							Topik Terkait:
						</div>
						<div class="flex flex-wrap gap-2">
							{#each article.tags as tag}
								<span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
									#{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- CTA Box Inside Article -->
			<div class="mt-12 rounded-3xl bg-navy-950 p-8 text-white border border-navy-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
				<div>
					<div class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
						<Sparkles class="size-4" />
						<span>Penerimaan Santri Baru 2026/2027</span>
					</div>
					<h3 class="text-xl font-bold">Tertarik Bergabung dengan Madani Global?</h3>
					<p class="mt-1 text-xs sm:text-sm text-slate-300">
						Konsultasikan pendaftaran ananda bersama tim penerimaan santri baru kami.
					</p>
				</div>
				<div class="flex items-center gap-3 shrink-0">
					<Button href="/ppdb" variant="emerald" size="md" class="font-bold">
						<span>Info PPDB Online</span>
						<ArrowRight class="size-4" />
					</Button>
				</div>
			</div>
		</div>

		<!-- Related Articles Section -->
		{#if relatedArticles && relatedArticles.length > 0}
			<div class="mt-20 border-t border-slate-200 pt-16">
				<div class="flex items-center justify-between mb-8">
					<div>
						<span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Rekomendasi Bacaan</span>
						<h2 class="text-2xl font-extrabold text-navy-950">Berita & Informasi Terkait Lainnya</h2>
					</div>
					<Button href="/berita" variant="outline" size="sm" class="font-bold">
						<span>Semua Berita</span>
						<ArrowRight class="size-3.5" />
					</Button>
				</div>

				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each relatedArticles as related}
						<Card hover padding="none" class="overflow-hidden bg-white border-slate-200 flex flex-col justify-between">
							<div>
								<div class="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
									<img
										src={related.image}
										alt={related.title}
										class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
										loading="lazy"
									/>
									<div class="absolute top-3 left-3">
										<Badge variant="navy" size="sm">{related.category}</Badge>
									</div>
								</div>

								<div class="p-5">
									<div class="flex items-center gap-2 text-xs text-slate-400 mb-2">
										<Calendar class="size-3.5" />
										<span>{related.date}</span>
									</div>
									<h3 class="text-sm sm:text-base font-bold text-navy-950 line-clamp-2">
										{related.title}
									</h3>
									<p class="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
										{related.summary}
									</p>
								</div>
							</div>

							<div class="p-5 pt-0">
								<a
									href="/berita/{related.slug}"
									class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
								>
									<span>Baca selengkapnya</span>
									<ArrowRight class="size-3.5" />
								</a>
							</div>
						</Card>
					{/each}
				</div>
			</div>
		{/if}
	</Container>
</section>
