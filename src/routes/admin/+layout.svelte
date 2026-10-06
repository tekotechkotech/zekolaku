<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import ToastContainer from '$lib/components/admin/ToastContainer.svelte';
	import {
		LayoutDashboard,
		School,
		GraduationCap,
		Building2,
		Trophy,
		CalendarCheck2,
		Newspaper,
		FileSignature,
		Settings,
		LogOut,
		ExternalLink,
		Menu,
		X,
		ChevronRight,
		ShieldCheck,
		Palette,
		LayoutTemplate,
		SlidersHorizontal
	} from 'lucide-svelte';

	let { data, children } = $props();

	let isLoginPage = $derived(page.url.pathname === '/admin/login');
	let mobileSidebarOpen = $state(false);

	interface NavSection {
		title: string;
		items: {
			href: string;
			label: string;
			icon: any;
			publicPath?: string;
			publicLabel?: string;
		}[];
	}

	const navSections: NavSection[] = [
		{
			title: 'Ringkasan',
			items: [
				{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard, publicPath: '/', publicLabel: 'Beranda' }
			]
		},
		{
			title: 'Profil & Lembaga',
			items: [
				{ href: '/admin/profile', label: 'Profil Sekolah', icon: School, publicPath: '/tentang', publicLabel: 'Profil Publik' },
				{ href: '/admin/programs', label: 'Program Pendidikan', icon: GraduationCap, publicPath: '/program', publicLabel: 'Program Publik' },
				{ href: '/admin/facilities', label: 'Fasilitas Kampus', icon: Building2, publicPath: '/fasilitas', publicLabel: 'Fasilitas Publik' }
			]
		},
		{
			title: 'Konten & Publikasi',
			items: [
				{ href: '/admin/news', label: 'Berita & Artikel', icon: Newspaper, publicPath: '/berita', publicLabel: 'Kanal Berita' },
				{ href: '/admin/activities', label: 'Agenda & Galeri', icon: CalendarCheck2, publicPath: '/kegiatan', publicLabel: 'Kegiatan Publik' },
				{ href: '/admin/achievements', label: 'Prestasi & Juara', icon: Trophy, publicPath: '/prestasi', publicLabel: 'Prestasi Publik' }
			]
		},
		{
			title: 'Penerimaan Santri',
			items: [
				{ href: '/admin/ppdb', label: 'PPDB Online', icon: FileSignature, publicPath: '/ppdb', publicLabel: 'PPDB Publik' }
			]
		},
		{
			title: 'Tampilan & Konfigurasi',
			items: [
				{ href: '/admin/landing', label: 'Tata Letak Beranda', icon: LayoutTemplate, publicPath: '/', publicLabel: 'Beranda' },
				{ href: '/admin/slides', label: 'Slide Hero Beranda', icon: SlidersHorizontal, publicPath: '/', publicLabel: 'Beranda' },
				{ href: '/admin/theme', label: 'Tema & Warna', icon: Palette, publicPath: '/', publicLabel: 'Live Website' },
				{ href: '/admin/settings', label: 'Pengaturan Website', icon: Settings, publicPath: '/kontak', publicLabel: 'Kontak Publik' }
			]
		}
	];

	function isActive(href: string): boolean {
		if (href === '/admin') {
			return page.url.pathname === '/admin';
		}
		return page.url.pathname.startsWith(href);
	}

	let allNavItems = $derived(navSections.flatMap((s) => s.items));
	let currentNav = $derived(
		allNavItems.find((item) => isActive(item.href)) || { label: 'Admin', href: '/admin', publicPath: '/', publicLabel: 'Website' }
	);
</script>

<svelte:head>
	<title>{currentNav.label} | Admin CMS - Madani Global</title>
</svelte:head>

<ToastContainer />

{#if isLoginPage}
	<div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center">
		{@render children()}
	</div>
{:else}
	<div class="min-h-screen bg-slate-100/80 text-slate-800 flex flex-col antialiased">
		<!-- Mobile Sidebar Overlay Backdrop -->
		{#if mobileSidebarOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
			<div
				class="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
				onclick={() => (mobileSidebarOpen = false)}
			></div>
		{/if}

		<div class="flex flex-1 min-h-screen relative">
			<!-- Sidebar -->
			<aside
				class="fixed top-0 bottom-0 left-0 z-40 w-68 bg-slate-900 text-slate-200 border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0
				{mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
			>
				<!-- Brand Header -->
				<div class="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/40">
					<a href="/admin" class="flex items-center gap-3 group">
						<div class="size-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30 font-black tracking-wider text-base">
							MG
						</div>
						<div class="leading-none">
							<span class="block text-sm font-bold text-white tracking-wide">Madani Global</span>
							<span class="block text-[11px] font-semibold text-emerald-400 mt-1 uppercase tracking-wider">CMS Admin</span>
						</div>
					</a>
					<button
						type="button"
						class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
						onclick={() => (mobileSidebarOpen = false)}
						aria-label="Tutup Menu"
					>
						<X class="size-5" />
					</button>
				</div>

				<!-- Navigation grouped by sections -->
				<div class="flex-1 overflow-y-auto px-3 py-3 space-y-4">
					{#each navSections as section}
						<div class="space-y-1">
							<div class="px-3 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 mb-1">
								{section.title}
							</div>
							{#each section.items as item}
								{@const active = isActive(item.href)}
								<a
									href={item.href}
									onclick={() => (mobileSidebarOpen = false)}
									class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 group relative
									{active
										? 'bg-emerald-500/15 text-emerald-400 font-semibold shadow-inner'
										: 'text-slate-300 hover:bg-slate-800/70 hover:text-white'}"
								>
									<item.icon class="size-4.5 shrink-0 transition-transform group-hover:scale-110 {active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}" />
									<span class="truncate">{item.label}</span>
									{#if active}
										<span class="absolute right-2 size-1.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400"></span>
									{/if}
								</a>
							{/each}
						</div>
					{/each}
				</div>

				<!-- User & Quick Links footer in Sidebar -->
				<div class="p-3 border-t border-slate-800/80 bg-slate-950/30">
					<div class="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
						<div class="size-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
							{data?.user?.name ? data.user.name.charAt(0) : 'A'}
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-xs font-semibold text-white truncate leading-tight">
								{data?.user?.name || 'Administrator'}
							</p>
							<p class="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
								{data?.user?.email || 'admin@zekolaku.sch.id'}
							</p>
						</div>
						<div class="shrink-0" >
							<ShieldCheck class="size-4 text-emerald-400" />
						</div>
					</div>
				</div>
			</aside>

			<!-- Main Container (offset by sidebar on desktop) -->
			<div class="flex-1 flex flex-col min-w-0 lg:pl-68">
				<!-- Top Bar -->
				<header class="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-xs">
					<div class="flex items-center gap-3">
						<button
							type="button"
							class="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
							onclick={() => (mobileSidebarOpen = true)}
							aria-label="Buka Menu"
						>
							<Menu class="size-5" />
						</button>

						<!-- Breadcrumbs / Page Title -->
						<div class="flex items-center gap-2 text-sm">
							<span class="hidden sm:inline font-medium text-slate-400">CMS</span>
							<ChevronRight class="hidden sm:inline size-3.5 text-slate-300" />
							<span class="font-bold text-slate-900 text-base sm:text-sm">{currentNav.label}</span>
						</div>
					</div>

					<!-- Right Controls -->
					<div class="flex items-center gap-2 sm:gap-3">
						<!-- Dynamic Public Content Access Link -->
						{#if currentNav.publicPath}
							<a
								href={currentNav.publicPath}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 shadow-xs"
								title="Buka {currentNav.publicLabel} di tab baru"
							>
								<ExternalLink class="size-3.5 text-emerald-600" />
								<span class="hidden sm:inline">{currentNav.publicLabel}</span>
								<span class="sm:hidden">Publik</span>
							</a>
						{/if}

						<div class="h-5 w-px bg-slate-200 mx-0.5"></div>

						<!-- Admin user info -->
						<div class="flex items-center gap-2.5">
							<div class="hidden sm:flex flex-col text-right">
								<span class="text-xs font-semibold text-slate-900 leading-tight">
									{data?.user?.name || 'Administrator'}
								</span>
								<span class="text-[10px] text-emerald-600 font-medium">Logged in</span>
							</div>
							<div class="size-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
								{data?.user?.name ? data.user.name.charAt(0) : 'A'}
							</div>
						</div>

						<!-- Logout Button -->
						<form method="POST" action="/admin?/logout" use:enhance>
							<button
								type="submit"
								class="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
								title="Keluar / Logout"
								aria-label="Logout"
							>
								<LogOut class="size-4.5" />
							</button>
						</form>
					</div>
				</header>

				<!-- Main Page Content Area -->
				<main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
					{@render children()}
				</main>
			</div>
		</div>
	</div>
{/if}
