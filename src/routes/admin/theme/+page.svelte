<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import {
		Palette,
		Check,
		Save,
		RotateCcw,
		ExternalLink,
		Sparkles,
		Eye,
		Layers,
		CheckCircle2,
		ShieldCheck,
		Award,
		ArrowRight,
		Sliders
	} from 'lucide-svelte';
	import { generateShades, THEME_PRESETS, defaultTheme } from '$lib/theme';
	import type { ColorShades, ThemeConfig } from '$lib/types';

	let { data, form } = $props();

	let selectedPreset = $state<string>('emerald');
	let currentName = $state<string>('Hijau Pesantren (Emerald)');
	let currentHex = $state<string>('#059669');
	let currentShades = $state<ColorShades>(THEME_PRESETS[0].shades);

	$effect(() => {
		const theme = data.themeConfig || defaultTheme;
		selectedPreset = theme.preset || 'emerald';
		currentName = theme.primaryName || 'Hijau Pesantren (Emerald)';
		currentHex = theme.primaryHex || '#059669';
		currentShades =
			theme.primaryShades ||
			(THEME_PRESETS.find((p) => p.id === theme.preset)?.shades ??
				generateShades(theme.primaryHex || '#059669'));
	});

	let isCustom = $derived(selectedPreset === 'custom');
	let saving = $state(false);
	let resetting = $state(false);

	function selectPreset(presetId: string) {
		const preset = THEME_PRESETS.find((p) => p.id === presetId);
		if (!preset) return;

		selectedPreset = preset.id;
		currentName = preset.name;
		currentHex = preset.primaryHex;
		currentShades = { ...preset.shades };
	}

	function handleCustomColorChange(newHex: string) {
		selectedPreset = 'custom';
		currentName = 'Warna Kustom';
		currentHex = newHex;
		currentShades = generateShades(newHex);
	}

	// Feedback toast
	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Perubahan tema berhasil diterapkan!');
		} else if (form?.error) {
			toast.error(form.error);
		}
	});
</script>

<div class="space-y-8">
	<!-- Page Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<div class="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider mb-1">
				<Palette class="size-4" />
				<span>Tampilan & Desain</span>
			</div>
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">
				Manajemen Tema & Palet Warna
			</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
				Pilih palet warna khas madani atau sesuaikan kode warna kustom (HEX) untuk mengubah identitas visual tombol, aksen, lencana, dan seluruh antarmuka publik secara dinamis.
			</p>
		</div>

		<!-- Action Buttons in Header -->
		<div class="flex items-center gap-3">
			<a
				href="/"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
				title="Lihat tampilan website publik saat ini di tab baru"
			>
				<ExternalLink class="size-4 text-emerald-600" />
				<span>Lihat Halaman Publik</span>
			</a>
		</div>
	</div>

	<!-- Live Simulator Card -->
	<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
			<div class="flex items-center gap-2">
				<div class="size-8 rounded-lg flex items-center justify-center text-white" style="background-color: {currentHex}">
					<Eye class="size-4" />
				</div>
				<div>
					<h3 class="font-bold text-slate-900 text-sm">Pratinjau Komponen Langsung (Live Simulation)</h3>
					<p class="text-xs text-slate-500">
						Visualisasi real-time bagaimana palet warna <strong class="text-slate-800">{currentName}</strong> akan tampil pada website.
					</p>
				</div>
			</div>
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border"
				style="background-color: {currentShades[50]}; color: {currentShades[800]}; border-color: {currentShades[200]}">
				<span class="size-2 rounded-full" style="background-color: {currentHex}"></span>
				<span>{currentName} ({currentHex.toUpperCase()})</span>
			</div>
		</div>

		<!-- Preview Components Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
			<!-- Component 1: Action Card & Buttons -->
			<div class="rounded-xl p-4 border border-slate-200/80 bg-slate-50/50 space-y-3">
				<p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tombol & Aksi Utama</p>
				<div class="flex flex-wrap gap-2.5">
					<button
						type="button"
						class="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm transition-all flex items-center gap-1.5"
						style="background-color: {currentShades[600]}"
					>
						<span>Daftar Sekarang</span>
						<ArrowRight class="size-3.5" />
					</button>

					<button
						type="button"
						class="px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all"
						style="background-color: {currentShades[50]}; color: {currentShades[800]}; border-color: {currentShades[200]}"
					>
						<span>Unduh Brosur</span>
					</button>
				</div>

				<div class="pt-2 flex flex-wrap gap-2">
					<span
						class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
						style="background-color: {currentShades[50]}; color: {currentShades[700]}; border-color: {currentShades[200]}"
					>
						<CheckCircle2 class="size-3" />
						<span>Akreditasi A Unggul</span>
					</span>
					<span
						class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
						style="background-color: {currentShades[100]}; color: {currentShades[800]}; border-color: {currentShades[300]}"
					>
						<Sparkles class="size-3" />
						<span>PPDB 2026 Dibuka</span>
					</span>
				</div>
			</div>

			<!-- Component 2: Stat & Highlight Card -->
			<div class="rounded-xl p-4 border border-slate-200/80 bg-slate-50/50 space-y-2">
				<p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Kartu Metrik & Prestasi</p>
				<div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
					<div
						class="size-10 rounded-xl flex items-center justify-center shrink-0"
						style="background-color: {currentShades[100]}; color: {currentShades[700]}"
					>
						<Award class="size-5" />
					</div>
					<div>
						<div class="text-lg font-black" style="color: {currentShades[800]}">100%</div>
						<div class="text-xs text-slate-500 font-medium">Lulusan Masuk PTN Favorit</div>
					</div>
				</div>

				<div
					class="p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2"
					style="background-color: {currentShades[50]}; border-color: {currentShades[200]}; color: {currentShades[900]}"
				>
					<ShieldCheck class="size-4 shrink-0" style="color: {currentShades[600]}" />
					<span>Kurikulum Terpadu Berbasis Akhlak Mulia</span>
				</div>
			</div>

			<!-- Component 3: Shade Swatch Spectrum -->
			<div class="rounded-xl p-4 border border-slate-200/80 bg-slate-50/50 space-y-2">
				<p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Spektrum Gradasi 50 - 950</p>
				<div class="grid grid-cols-6 gap-1 pt-1">
					{#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
						<div class="text-center group relative">
							<div
								class="h-8 rounded-lg shadow-xs transition-transform group-hover:scale-110 border border-black/5"
								style="background-color: {currentShades[shade as keyof ColorShades]}"
							></div>
							<span class="text-[9px] font-mono text-slate-400 mt-0.5 block">{shade}</span>
						</div>
					{/each}
				</div>
				<p class="text-[11px] text-slate-500 pt-1">
					Semua variasi gradasi di atas diintegrasikan langsung ke CSS Engine Tailwind v4.
				</p>
			</div>
		</div>
	</div>

	<!-- Preset Selection Grid -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-lg font-bold text-slate-900">Pilihan Palet Warna Rekomendasi</h2>
				<p class="text-xs text-slate-500">Kombinasi warna terkurasi dengan filosofi institusi pendidikan & kepesantrenan.</p>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each THEME_PRESETS as preset}
				{@const active = selectedPreset === preset.id}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div
					onclick={() => selectPreset(preset.id)}
					class="cursor-pointer rounded-2xl border-2 p-5 bg-white transition-all hover:shadow-md relative flex flex-col justify-between
					{active ? 'border-slate-900 shadow-md ring-2 ring-slate-900/10' : 'border-slate-200 hover:border-slate-300'}"
				>
					<div>
						<!-- Header & Active Badge -->
						<div class="flex items-center justify-between gap-2 mb-2">
							<div class="flex items-center gap-2">
								<span
									class="size-4.5 rounded-full border border-black/10 shadow-xs"
									style="background-color: {preset.primaryHex}"
								></span>
								<h3 class="font-bold text-slate-900 text-sm">{preset.name}</h3>
							</div>
							{#if active}
								<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">
									<Check class="size-3" />
									<span>Dipilih</span>
								</span>
							{/if}
						</div>

						<p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
							{preset.description}
						</p>
					</div>

					<!-- Swatch Preview Bar -->
					<div class="pt-2 border-t border-slate-100 flex items-center justify-between">
						<div class="flex items-center gap-1">
							{#each [50, 200, 500, 600, 800, 950] as shade}
								<span
									class="size-5 rounded-md border border-black/5"
									style="background-color: {preset.shades[shade as keyof ColorShades]}"
									title="{shade}: {preset.shades[shade as keyof ColorShades]}"
								></span>
							{/each}
						</div>
						<span class="text-[11px] font-mono text-slate-400 font-semibold">{preset.primaryHex}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Custom Color Picker Section -->
	<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
		<div class="flex items-center gap-2">
			<Sliders class="size-5 text-slate-700" />
			<h2 class="text-lg font-bold text-slate-900">Kustomisasi Kode Warna Sendiri (Hex Color Picker)</h2>
		</div>
		<p class="text-xs sm:text-sm text-slate-500 max-w-2xl">
			Ingin menggunakan warna persis sesuai panduan identitas (brand guideline) yayasan atau logo? Pilih warna bebas melalui pemilih warna visual atau ketikkan kode HEX 6 digit di bawah:
		</p>

		<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
			<!-- Color Box Input -->
			<div class="flex items-center gap-3">
				<input
					type="color"
					id="hexPicker"
					value={currentHex}
					oninput={(e) => handleCustomColorChange((e.target as HTMLInputElement).value)}
					class="size-12 rounded-xl border border-slate-300 cursor-pointer p-1 bg-white shadow-xs"
				/>
				<div class="space-y-0.5">
					<label for="hexInput" class="text-xs font-semibold text-slate-700 block">Kode Hex Warna</label>
					<div class="relative">
						<span class="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 font-mono text-xs">#</span>
						<input
							type="text"
							id="hexInput"
							maxlength="7"
							value={currentHex.replace('#', '')}
							oninput={(e) => {
								const val = (e.target as HTMLInputElement).value.trim();
								if (val.length === 6) {
									handleCustomColorChange('#' + val);
								}
							}}
							placeholder="059669"
							class="w-32 rounded-xl border border-slate-300 pl-6 pr-3 py-1.5 font-mono text-sm text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-slate-900"
						/>
					</div>
				</div>
			</div>

			<div class="sm:border-l sm:border-slate-200 sm:pl-4 space-y-1">
				<div class="text-xs font-medium text-slate-500">Status Palet:</div>
				<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold {isCustom ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-700'}">
					{#if isCustom}
						<span>🎨 Mode Kustom Aktif</span>
					{:else}
						<span>📦 Menggunakan Preset {currentName}</span>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Form Actions & Submission Bar -->
	<div class="rounded-2xl bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
		<div class="flex items-center gap-3">
			<div class="size-10 rounded-xl flex items-center justify-center font-bold text-white shadow-inner" style="background-color: {currentHex}">
				<Check class="size-5" />
			</div>
			<div>
				<h4 class="font-bold text-sm text-white">Simpan & Terapkan Tema</h4>
				<p class="text-xs text-slate-400">
					Warna terpilih: <span class="text-white font-semibold">{currentName}</span> ({currentHex}). Perubahan langsung aktif ke seluruh halaman publik.
				</p>
			</div>
		</div>

		<div class="flex items-center gap-3 w-full sm:w-auto justify-end">
			<!-- Reset to Default Button -->
			<form
				method="POST"
				action="?/resetTheme"
				use:enhance={() => {
					resetting = true;
					return async ({ update }) => {
						resetting = false;
						selectPreset('emerald');
						await update();
					};
				}}
			>
				<button
					type="submit"
					disabled={resetting || saving}
					class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
					title="Reset ke pengaturan default Emerald"
				>
					<RotateCcw class="size-3.5 {resetting ? 'animate-spin' : ''}" />
					<span>Reset Default</span>
				</button>
			</form>

			<!-- Save Theme Form -->
			<form
				method="POST"
				action="?/saveTheme"
				use:enhance={() => {
					saving = true;
					return async ({ update }) => {
						saving = false;
						await update();
					};
				}}
			>
				<input type="hidden" name="preset" value={selectedPreset} />
				<input type="hidden" name="primaryName" value={currentName} />
				<input type="hidden" name="primaryHex" value={currentHex} />
				<input type="hidden" name="primaryShades" value={JSON.stringify(currentShades)} />

				<button
					type="submit"
					disabled={saving || resetting}
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-50"
					style="background-color: {currentHex}"
				>
					<Save class="size-4" />
					<span>{saving ? 'Menerapkan Tema...' : 'Terapkan Tema Sekarang'}</span>
				</button>
			</form>
		</div>
	</div>
</div>
