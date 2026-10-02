<script lang="ts">
	import { page } from '$app/state';
	import { schoolData, navItems } from '$lib/data/school';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import {
		Phone,
		Mail,
		Clock,
		Menu,
		X,
		GraduationCap,
		ArrowRight
	} from '@lucide/svelte';

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function isActive(href: string): boolean {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
	<!-- Top Bar -->
	<div class="hidden border-b border-slate-100 bg-navy-950 text-slate-300 md:block">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
			<div class="flex items-center gap-6">
				<a
					href="tel:{schoolData.contact.phone}"
					class="inline-flex items-center gap-1.5 transition-colors hover:text-emerald-400"
				>
					<Phone class="size-3.5 text-emerald-400" />
					<span>{schoolData.contact.phone}</span>
				</a>
				<a
					href="mailto:{schoolData.contact.email}"
					class="inline-flex items-center gap-1.5 transition-colors hover:text-emerald-400"
				>
					<Mail class="size-3.5 text-emerald-400" />
					<span>{schoolData.contact.email}</span>
				</a>
				<div class="inline-flex items-center gap-1.5 text-slate-400">
					<Clock class="size-3.5 text-slate-400" />
					<span>{schoolData.contact.hours}</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<span class="rounded bg-emerald-950/80 px-2 py-0.5 font-medium text-emerald-400 border border-emerald-800/40">
					{schoolData.accreditation}
				</span>
				<a
					href={schoolData.contact.whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-xs text-emerald-300 font-semibold hover:underline"
				>
					Konsultasi PPDB Online
				</a>
			</div>
		</div>
	</div>

	<!-- Main Navigation Bar -->
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-18 items-center justify-between gap-4">
			<!-- School Brand / Logo -->
			<a
				href="/"
				onclick={closeMobileMenu}
				class="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
			>
				<div
					class="flex size-11 items-center justify-center rounded-xl bg-navy-950 text-emerald-400 shadow-md transition-transform group-hover:scale-105 border border-navy-800"
				>
					<GraduationCap class="size-6 text-emerald-400" />
				</div>
				<div class="flex flex-col">
					<span class="text-base font-extrabold tracking-tight text-navy-950 sm:text-lg">
						MADANI GLOBAL
					</span>
					<span class="text-[11px] font-semibold text-emerald-700 tracking-wide">
						SMA & PESANTREN TERPADU
					</span>
				</div>
			</a>

			<!-- Desktop Nav Links -->
			<nav class="hidden lg:flex items-center gap-1">
				{#each navItems as item}
					<a
						href={item.href}
						class="relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors {isActive(item.href) ? 'text-emerald-700 bg-emerald-50/80' : 'text-slate-700 hover:text-navy-950 hover:bg-slate-100/70'}"
					>
						{item.label}
						{#if item.badge}
							<span
								class="ml-1.5 inline-flex items-center rounded-full bg-emerald-600 px-1.5 py-0.2 text-[10px] font-bold text-white uppercase tracking-wider"
							>
								{item.badge}
							</span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Desktop Action Buttons -->
			<div class="hidden lg:flex items-center gap-3">
				<Button
					href="/ppdb"
					variant="emerald"
					size="sm"
					class="shadow-sm shadow-emerald-700/20 font-bold"
				>
					<span>Daftar PPDB</span>
					<ArrowRight class="size-3.5" />
				</Button>
			</div>

			<!-- Mobile Hamburger Button -->
			<div class="flex items-center gap-2 lg:hidden">
				<Button
					href="/ppdb"
					variant="emerald"
					size="sm"
					class="text-xs px-2.5 py-1.5"
				>
					PPDB
				</Button>
				<button
					type="button"
					onclick={toggleMobileMenu}
					aria-label="Toggle Menu Navigasi"
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-nav-menu"
					class="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 focus:outline-hidden"
				>
					{#if mobileMenuOpen}
						<X class="size-5" />
					{:else}
						<Menu class="size-5" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Drawer Menu -->
	{#if mobileMenuOpen}
		<div id="mobile-nav-menu" class="border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl lg:hidden">
			<nav class="flex flex-col space-y-1">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={closeMobileMenu}
						class="flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-semibold transition-colors {isActive(item.href) ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-50'}"
					>
						<span>{item.label}</span>
						{#if item.badge}
							<Badge variant="emerald" size="sm">
								{item.badge}
							</Badge>
						{/if}
					</a>
				{/each}
			</nav>

			<div class="mt-5 border-t border-slate-100 pt-4">
				<Button
					href="/ppdb"
					variant="emerald"
					size="lg"
					class="w-full text-center justify-center font-bold"
					onclick={closeMobileMenu}
				>
					Daftar PPDB 2026/2027
				</Button>
				<div class="mt-3 text-center text-xs text-slate-500">
					Butuh bantuan? Hubungi WhatsApp Panitia di
					<a
						href={schoolData.contact.whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="font-semibold text-emerald-700 underline"
					>
						{schoolData.contact.whatsapp}
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
