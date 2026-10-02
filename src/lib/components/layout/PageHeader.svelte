<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { ChevronRight, Home } from 'lucide-svelte';

	interface Props {
		badge?: string;
		title: string;
		description: string;
		currentRouteName?: string;
	}

	let {
		badge,
		title,
		description,
		currentRouteName
	}: Props = $props();
</script>

<div class="relative overflow-hidden bg-navy-950 py-12 sm:py-16 text-white border-b border-navy-900">
	<!-- Subtle Background Accents -->
	<div class="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-emerald-600/10 blur-3xl"></div>
	<div class="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-blue-600/10 blur-3xl"></div>

	<Container>
		<!-- Breadcrumbs -->
		<nav aria-label="Breadcrumb" class="mb-5 flex items-center space-x-2 text-xs font-medium text-slate-300">
			<a href="/" class="flex items-center gap-1 transition-colors hover:text-emerald-400">
				<Home class="size-3.5" />
				<span>Beranda</span>
			</a>
			<ChevronRight class="size-3 text-slate-400" />
			<span class="text-emerald-300 font-semibold">{currentRouteName || title}</span>
		</nav>

		<!-- Content -->
		<div class="max-w-3xl">
			{#if badge}
				<div class="mb-3">
					<Badge variant="emerald" size="sm">
						{badge}
					</Badge>
				</div>
			{/if}

			<h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
				{title}
			</h1>

			<p class="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
				{description}
			</p>
		</div>
	</Container>
</div>
