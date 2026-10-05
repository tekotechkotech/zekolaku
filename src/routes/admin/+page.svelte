<script lang="ts">
	import {
		Newspaper,
		Calendar,
		Trophy,
		GraduationCap,
		FileSignature,
		PlusCircle,
		ArrowRight,
		ExternalLink,
		CheckCircle2,
		Sparkles,
		Clock,
		Building2,
		Eye,
		Palette
	} from 'lucide-svelte';

	let { data } = $props();

	// Format Indonesian date
	const todayDate = new Intl.DateTimeFormat('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date());

	let metrics = $derived(data.metrics);
	let recentNews = $derived(data.recentNews);
	let recentActivities = $derived(data.recentActivities);
</script>

<div class="space-y-6">
	<!-- Welcome Banner -->
	<div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
		<div class="absolute right-0 top-0 -mt-10 -mr-10 size-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
		<div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
			<div>
				<div class="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30 mb-3">
					<Sparkles class="size-3.5" />
					<span>{todayDate}</span>
				</div>
				<h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
					Selamat Datang, {data.user?.name || 'Administrator'}!
				</h1>
				<p class="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
					Panel pengelolaan konten madani global. Semua data tersinkronisasi langsung ke sistem pendaftaran dan halaman publik.
				</p>
			</div>

			<!-- Quick Live Site Link -->
			<div class="flex items-center gap-3 shrink-0">
				<a
					href="/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-950/40 hover:bg-emerald-500 transition-colors"
				>
					<ExternalLink class="size-4" />
					<span>Lihat Website Utama</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Metric Cards Grid -->
	<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
		<!-- Total Berita -->
		<div class="rounded-2xl bg-white p-4.5 sm:p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all group">
			<div class="flex items-center justify-between mb-3">
				<span class="text-xs font-semibold text-slate-500">Berita & Artikel</span>
				<div class="rounded-xl bg-blue-50 p-2 text-blue-600 group-hover:scale-110 transition-transform">
					<Newspaper class="size-4.5" />
				</div>
			</div>
			<div class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
				{metrics.totalNews}
			</div>
			<p class="text-[11px] text-slate-400 mt-1">Artikel terbit di web</p>
		</div>

		<!-- Total Kegiatan -->
		<div class="rounded-2xl bg-white p-4.5 sm:p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all group">
			<div class="flex items-center justify-between mb-3">
				<span class="text-xs font-semibold text-slate-500">Agenda & Kegiatan</span>
				<div class="rounded-xl bg-indigo-50 p-2 text-indigo-600 group-hover:scale-110 transition-transform">
					<Calendar class="size-4.5" />
				</div>
			</div>
			<div class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
				{metrics.totalActivities}
			</div>
			<p class="text-[11px] text-slate-400 mt-1">Agenda & agenda galeri</p>
		</div>

		<!-- Total Prestasi -->
		<div class="rounded-2xl bg-white p-4.5 sm:p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all group">
			<div class="flex items-center justify-between mb-3">
				<span class="text-xs font-semibold text-slate-500">Prestasi Santri</span>
				<div class="rounded-xl bg-amber-50 p-2 text-amber-600 group-hover:scale-110 transition-transform">
					<Trophy class="size-4.5" />
				</div>
			</div>
			<div class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
				{metrics.totalAchievements}
			</div>
			<p class="text-[11px] text-slate-400 mt-1">Penghargaan nasional & global</p>
		</div>

		<!-- Total Program -->
		<div class="rounded-2xl bg-white p-4.5 sm:p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all group">
			<div class="flex items-center justify-between mb-3">
				<span class="text-xs font-semibold text-slate-500">Program Unggulan</span>
				<div class="rounded-xl bg-emerald-50 p-2 text-emerald-600 group-hover:scale-110 transition-transform">
					<GraduationCap class="size-4.5" />
				</div>
			</div>
			<div class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
				{metrics.totalPrograms}
			</div>
			<p class="text-[11px] text-slate-400 mt-1">Jurusan & kepesantrenan</p>
		</div>

		<!-- Status PPDB -->
		<div class="col-span-2 sm:col-span-1 rounded-2xl bg-white p-4.5 sm:p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all group">
			<div class="flex items-center justify-between mb-3">
				<span class="text-xs font-semibold text-slate-500">Status PPDB</span>
				<div class="rounded-xl bg-emerald-50 p-2 text-emerald-600 group-hover:scale-110 transition-transform">
					<FileSignature class="size-4.5" />
				</div>
			</div>
			<div class="flex items-center gap-2 mt-1">
				<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
					<span class="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
					{metrics.ppdbStatus}
				</span>
			</div>
			<a href="/admin/ppdb" class="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 mt-2.5">
				<span>Kelola PPDB</span>
				<ArrowRight class="size-3" />
			</a>
		</div>
	</div>

	<!-- Quick Action Bar -->
	<div class="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-xs">
		<h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
			Aksi Cepat
		</h2>
		<div class="flex flex-wrap items-center gap-2.5">
			<a
				href="/admin/news?action=new"
				class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-xs"
			>
				<PlusCircle class="size-3.5 text-emerald-400" />
				<span>Tulis Berita Baru</span>
			</a>
			<a
				href="/admin/activities?action=new"
				class="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
			>
				<PlusCircle class="size-3.5 text-indigo-600" />
				<span>Tambah Agenda Kegiatan</span>
			</a>
			<a
				href="/admin/ppdb"
				class="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
			>
				<FileSignature class="size-3.5 text-emerald-600" />
				<span>Edit Gelombang PPDB</span>
			</a>
			<a
				href="/admin/profile"
				class="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
			>
				<Building2 class="size-3.5 text-amber-600" />
				<span>Profil Sekolah & Visi Misi</span>
			</a>
			<a
				href="/admin/theme"
				class="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
			>
				<Palette class="size-3.5 text-teal-600" />
				<span>Tema & Palet Warna</span>
			</a>
			<a
				href="/"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200 ml-auto"
			>
				<Eye class="size-3.5" />
				<span>Lihat Website</span>
			</a>
		</div>
	</div>

	<!-- Two-column Main Dashboard Content -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Left: Recent News (2 cols) -->
		<div class="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
			<div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
				<div>
					<h2 class="text-base font-bold text-slate-900">Berita & Artikel Terbaru</h2>
					<p class="text-xs text-slate-500 mt-0.5">Daftar publikasi artikel terakhir di website</p>
				</div>
				<a
					href="/admin/news"
					class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
				>
					<span>Lihat Semua</span>
					<ArrowRight class="size-3.5" />
				</a>
			</div>

			<div class="divide-y divide-slate-100 flex-1">
				{#if recentNews && recentNews.length > 0}
					{#each recentNews as article}
						<div class="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
							<div class="flex items-start sm:items-center gap-3.5 min-w-0">
								{#if article.image}
									<img
										src={article.image}
										alt={article.title}
										class="size-12 rounded-xl object-cover shrink-0 border border-slate-200"
										loading="lazy"
									/>
								{:else}
									<div class="size-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border border-slate-200">
										<Newspaper class="size-5" />
									</div>
								{/if}
								<div class="min-w-0">
									<div class="flex items-center gap-2 mb-1 flex-wrap">
										<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
											{article.category || 'Berita'}
										</span>
										<span class="text-xs text-slate-400 flex items-center gap-1">
											<Clock class="size-3" />
											{article.date || 'Terbaru'}
										</span>
									</div>
									<h4 class="text-sm font-semibold text-slate-900 truncate">
										{article.title}
									</h4>
								</div>
							</div>

							<div class="flex items-center gap-2 shrink-0">
								<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold
									{article.status === 'draft' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
									{article.status === 'draft' ? 'Draft' : 'Published'}
								</span>
								<a
									href="/admin/news?edit={article.id || article.slug}"
									class="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
								>
									Edit
								</a>
							</div>
						</div>
					{/each}
				{:else}
					<div class="p-8 text-center text-slate-500 text-sm">
						Belum ada artikel yang dipublikasikan.
					</div>
				{/if}
			</div>
		</div>

		<!-- Right: Recent Activities & Status Overview (1 col) -->
		<div class="space-y-6">
			<!-- Recent Activities -->
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
				<div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
					<div>
						<h3 class="text-base font-bold text-slate-900">Agenda Kegiatan</h3>
						<p class="text-xs text-slate-500 mt-0.5">Jadwal kegiatan santri & sekolah</p>
					</div>
					<a
						href="/admin/activities"
						class="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
					>
						Kelola
					</a>
				</div>

				<div class="divide-y divide-slate-100">
					{#if recentActivities && recentActivities.length > 0}
						{#each recentActivities as act}
							<div class="p-4 hover:bg-slate-50/60 transition-colors">
								<div class="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-1">
									<Calendar class="size-3.5" />
									<span>{act.schedule || 'Jadwal Rutin'}</span>
								</div>
								<h4 class="text-sm font-semibold text-slate-900 truncate">
									{act.title}
								</h4>
								<p class="text-xs text-slate-500 mt-1 line-clamp-1">
									{act.description}
								</p>
							</div>
						{/each}
					{:else}
						<div class="p-6 text-center text-slate-500 text-xs">
							Belum ada agenda kegiatan terdaftar.
						</div>
					{/if}
				</div>
			</div>

			<!-- Quick Status Overview -->
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-5">
				<h3 class="text-sm font-bold text-slate-900 mb-3">Status Layanan Website</h3>
				<div class="space-y-2.5 text-xs">
					<div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
						<span class="text-slate-600 font-medium">Status Pendaftaran (PPDB)</span>
						<span class="font-bold text-emerald-600 flex items-center gap-1.5">
							<CheckCircle2 class="size-3.5" />
							{metrics.ppdbStatus}
						</span>
					</div>
					<div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
						<span class="text-slate-600 font-medium">Domain Publik</span>
						<span class="font-mono text-slate-800">zekolaku.faizen.biz.id</span>
					</div>
					<div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
						<span class="text-slate-600 font-medium">Database CMS</span>
						<span class="font-semibold text-emerald-600">MySQL (Connected)</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
