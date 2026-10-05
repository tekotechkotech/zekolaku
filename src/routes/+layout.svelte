<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { generateCssVariables } from '$lib/theme';

	let { data, children } = $props();

	let isAdmin = $derived(page.url.pathname.startsWith('/admin'));
	let themeCss = $derived(generateCssVariables(data?.siteSettings?.themeConfig));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:site_name" content="SMA & Pesantren Terpadu Madani Global" />
	<meta property="og:locale" content="id_ID" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="theme-color" content="#030712" />
	{@html `<style id="dynamic-theme">${themeCss}</style>`}
</svelte:head>

{#if isAdmin}
	{@render children()}
{:else}
	<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased">
		<Navbar />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}
