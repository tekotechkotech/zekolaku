<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import {
		Home,
		Compass,
		ArrowLeft,
		Search,
		BookOpen,
		Phone,
		Users,
		Sparkles
	} from 'lucide-svelte';

	const is404 = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{page.status} - {is404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kendala'} | SMA Madani Global</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="min-h-[75vh] flex items-center justify-center py-20 bg-slate-50 relative overflow-hidden">
	<!-- Ambient background accents -->
	<div class="pointer-events-none absolute -top-40 right-10 size-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
	<div class="pointer-events-none absolute bottom-10 left-10 size-80 rounded-full bg-navy-500/10 blur-3xl"></div>

	<Container>
		<div class="mx-auto max-w-2xl text-center">
			<!-- Status Code Badge -->
			<div class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200 mb-6">
				<Compass class="size-3.5 text-emerald-700" />
				<span>Kode Status: {page.status}</span>
			</div>

			<!-- Large Display Number -->
			<h1 class="text-7xl sm:text-9xl font-black text-navy-950 tracking-tight select-none">
				{page.status}
			</h1>

			<!-- Heading Title -->
			<h2 class="mt-4 text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
				{#if is404}
					Halaman Tidak Ditemukan
				{:else}
					Terjadi Kendala pada Sistem
				{/if}
			</h2>

			<!-- Description Message -->
			<p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
				{#if is404}
					{page.error?.message || 'Mohon maaf, halaman atau berkas yang Anda tuju tidak tersedia, telah dipindahkan, atau alamat URL yang dimasukkan kurang tepat.'}
				{:else}
					{page.error?.message || 'Terjadi gangguan sementara saat memproses permintaan Anda. Silakan muat ulang halaman atau kembali beberapa saat lagi.'}
				{/if}
			</p>

			<!-- Action Buttons -->
			<div class="mt-8 flex flex-wrap items-center justify-center gap-3.5">
				<Button
					href="/"
					variant="emerald"
					size="lg"
					class="font-bold shadow-md shadow-emerald-900/20"
				>
					<Home class="size-4" />
					<span>Kembali ke Beranda</span>
				</Button>
				<Button
					href="/ppdb"
					variant="secondary"
					size="lg"
					class="font-semibold bg-white text-navy-950 border-slate-300 hover:bg-slate-100"
				>
					<Users class="size-4 text-emerald-600" />
					<span>Pusat PPDB Online</span>
				</Button>
			</div>

			<!-- Helpful Links Box -->
			<div class="mt-14 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-xs text-left">
				<h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
					Tautan Cepat yang Mungkin Anda Cari:
				</h3>
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					<a
						href="/tentang"
						class="flex flex-col items-center p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200/80 transition-colors text-center group"
					>
						<span class="text-xs font-bold text-navy-950 group-hover:text-emerald-700">Profil Sekolah</span>
						<span class="text-[10px] text-slate-500 mt-0.5">Visi & Sejarah</span>
					</a>
					<a
						href="/program"
						class="flex flex-col items-center p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200/80 transition-colors text-center group"
					>
						<span class="text-xs font-bold text-navy-950 group-hover:text-emerald-700">Program Studi</span>
						<span class="text-[10px] text-slate-500 mt-0.5">Kurikulum Unggulan</span>
					</a>
					<a
						href="/berita"
						class="flex flex-col items-center p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200/80 transition-colors text-center group"
					>
						<span class="text-xs font-bold text-navy-950 group-hover:text-emerald-700">Warta Berita</span>
						<span class="text-[10px] text-slate-500 mt-0.5">Kabar & Prestasi</span>
					</a>
					<a
						href="/kontak"
						class="flex flex-col items-center p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200/80 transition-colors text-center group"
					>
						<span class="text-xs font-bold text-navy-950 group-hover:text-emerald-700">Kontak Panitia</span>
						<span class="text-[10px] text-slate-500 mt-0.5">Lokasi & WhatsApp</span>
					</a>
				</div>
			</div>
		</div>
	</Container>
</section>
