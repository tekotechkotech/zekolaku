<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import {
		LayoutTemplate,
		ArrowUp,
		ArrowDown,
		Eye,
		EyeOff,
		ExternalLink,
		Check,
		Save,
		RotateCcw,
		ChevronDown,
		Sliders,
		Sparkles,
		Layers,
		CheckCircle2,
		Columns,
		ListFilter,
		SquareDashedBottom
	} from 'lucide-svelte';
	import type { LandingSection, SectionBgStyle } from '$lib/types';
	import type { SectionDefinition } from '$lib/landing-config';

	let { data, form } = $props();

	let definitions = $derived<Record<string, SectionDefinition>>(data.sectionDefinitions || {});

	// Clone sections into editable state
	let sections = $state<LandingSection[]>([]);
	let expandedCard = $state<Record<string, boolean>>({});

	function syncSections(rawSections?: LandingSection[]) {
		if (!rawSections) return;
		sections = JSON.parse(JSON.stringify(rawSections)).sort(
			(a: LandingSection, b: LandingSection) => a.sortOrder - b.sortOrder
		);
		if (sections[0] && Object.keys(expandedCard).length === 0) {
			expandedCard[sections[0].id] = true;
		}
	}

	$effect(() => {
		if (data.sections && data.sections.length > 0 && sections.length === 0) {
			syncSections(data.sections);
		}
	});

	let saving = $state(false);
	let resetting = $state(false);

	let activeCount = $derived(sections.filter((s) => s.isEnabled).length);

	function toggleExpand(id: string) {
		expandedCard[id] = !expandedCard[id];
	}

	function moveUp(index: number) {
		if (index <= 0) return;
		const temp = sections[index];
		sections[index] = sections[index - 1];
		sections[index - 1] = temp;
		// Re-assign sortOrder
		sections.forEach((s, idx) => (s.sortOrder = idx + 1));
	}

	function moveDown(index: number) {
		if (index >= sections.length - 1) return;
		const temp = sections[index];
		sections[index] = sections[index + 1];
		sections[index + 1] = temp;
		// Re-assign sortOrder
		sections.forEach((s, idx) => (s.sortOrder = idx + 1));
	}

	function toggleEnable(index: number) {
		sections[index].isEnabled = !sections[index].isEnabled;
	}

	function selectTemplate(index: number, templateId: string) {
		sections[index].template = templateId;
	}

	// Feedback
	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Perubahan tata letak berhasil disimpan!');
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
				<LayoutTemplate class="size-4" />
				<span>Kustomisasi Halaman Beranda</span>
			</div>
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">
				Tata Letak & Template Section Beranda
			</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
				Kelola susunan urutan tampil section, sembunyikan atau aktifkan section tertentu, pilih variasi template desain visual, serta sesuaikan teks judul & gaya latar belakang secara permanen di database.
			</p>
		</div>

		<!-- Action Link to Public Page -->
		<div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
			<a
				href="/"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
				title="Lihat halaman beranda website di tab baru"
			>
				<ExternalLink class="size-4 text-emerald-600" />
				<span>Lihat Halaman Publik</span>
			</a>
		</div>
	</div>

	<!-- Control Stats Bar -->
	<div class="rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-2">
				<span class="size-3 rounded-full bg-emerald-500"></span>
				<span class="text-xs sm:text-sm font-semibold text-slate-700">
					{activeCount} dari {sections.length} Section Aktif
				</span>
			</div>
			<span class="text-slate-300">|</span>
			<span class="text-xs text-slate-500 hidden sm:inline">
				Gunakan tombol naik/turun untuk mengatur alur cerita halaman beranda.
			</span>
		</div>

		<div class="flex items-center gap-2.5 justify-end">
			<!-- Reset to Default Button -->
			<form
				method="POST"
				action="?/resetDefaults"
				use:enhance={() => {
					resetting = true;
					return async ({ update }) => {
						resetting = false;
						await update();
						syncSections(data.sections);
					};
				}}
			>
				<button
					type="submit"
					disabled={resetting || saving}
					class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200 disabled:opacity-50"
					title="Kembalikan semua urutan & template ke standar bawaan"
				>
					<RotateCcw class="size-3.5 {resetting ? 'animate-spin' : ''}" />
					<span>Reset Bawaan</span>
				</button>
			</form>

			<!-- Primary Save Button -->
			<form
				method="POST"
				action="?/saveSections"
				use:enhance={() => {
					saving = true;
					return async ({ update }) => {
						saving = false;
						await update();
					};
				}}
			>
				<input type="hidden" name="sectionsData" value={JSON.stringify(sections)} />
				<button
					type="submit"
					disabled={saving || resetting}
					class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-500 transition-colors disabled:opacity-50"
				>
					<Save class="size-4" />
					<span>{saving ? 'Menyimpan...' : 'Simpan Tata Letak'}</span>
				</button>
			</form>
		</div>
	</div>

	<!-- Sections Draggable/Sortable List -->
	<div class="space-y-4">
		{#each sections as sec, idx}
			{@const def = definitions[sec.sectionKey] || {}}
			{@const isExpanded = !!expandedCard[sec.id]}
			{@const isFirst = idx === 0}
			{@const isLast = idx === sections.length - 1}

			<div class="rounded-2xl border transition-all bg-white shadow-xs overflow-hidden
				{sec.isEnabled ? 'border-slate-200/90' : 'border-slate-200 bg-slate-50/70 opacity-75'}">
				
				<!-- Section Header Row -->
				<div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div class="flex items-center gap-3.5 min-w-0">
						<!-- Reorder Buttons -->
						<div class="flex items-center gap-1 shrink-0 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
							<button
								type="button"
								onclick={() => moveUp(idx)}
								disabled={isFirst}
								class="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
								title="Pindahkan ke atas"
								aria-label="Pindahkan ke atas"
							>
								<ArrowUp class="size-3.5" />
							</button>
							<span class="text-xs font-mono font-bold text-slate-700 px-1">
								{idx + 1}
							</span>
							<button
								type="button"
								onclick={() => moveDown(idx)}
								disabled={isLast}
								class="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
								title="Pindahkan ke bawah"
								aria-label="Pindahkan ke bawah"
							>
								<ArrowDown class="size-3.5" />
							</button>
						</div>

						<!-- Section Info -->
						<div class="min-w-0">
							<div class="flex items-center gap-2">
								<h3 class="font-bold text-slate-900 text-sm sm:text-base truncate">
									{sec.name}
								</h3>
								<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 text-slate-600">
									Template: {sec.template}
								</span>
							</div>
							<p class="text-xs text-slate-500 line-clamp-1 mt-0.5">
								{def.description || 'Section kustom beranda'}
							</p>
						</div>
					</div>

					<!-- Actions (Toggle & Expand) -->
					<div class="flex items-center gap-3 shrink-0 self-end sm:self-auto">
						<!-- Toggle Enable Switch -->
						<button
							type="button"
							onclick={() => toggleEnable(idx)}
							class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all
							{sec.isEnabled
								? 'bg-emerald-50 text-emerald-700 border-emerald-200'
								: 'bg-slate-200 text-slate-600 border-slate-300'}"
							title={sec.isEnabled ? 'Sembunyikan dari beranda' : 'Tampilkan di beranda'}
						>
							{#if sec.isEnabled}
								<Eye class="size-3.5 text-emerald-600" />
								<span>Aktif</span>
							{:else}
								<EyeOff class="size-3.5 text-slate-500" />
								<span>Disembunyikan</span>
							{/if}
						</button>

						<!-- Expand Settings Button -->
						<button
							type="button"
							onclick={() => toggleExpand(sec.id)}
							class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
						>
							<Sliders class="size-3.5 text-slate-500" />
							<span>{isExpanded ? 'Tutup Opsi' : 'Atur Template'}</span>
							<ChevronDown class="size-3.5 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}" />
						</button>
					</div>
				</div>

				<!-- Expandable Section Settings Area -->
				{#if isExpanded}
					<div class="px-5 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-6">
						<!-- 1. Template Variants Selector -->
						<div>
							<span class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
								Pilihan Varian Template Desain
							</span>

							<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
								{#each (def.templates || []) as tpl}
									{@const selected = sec.template === tpl.id}
									<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
									<div
										onclick={() => selectTemplate(idx, tpl.id)}
										class="cursor-pointer rounded-xl border-2 p-3.5 bg-white transition-all hover:shadow-xs flex flex-col justify-between
										{selected ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs' : 'border-slate-200 hover:border-slate-300'}"
									>
										<div>
											<div class="flex items-center justify-between mb-1.5">
												<h4 class="font-bold text-xs sm:text-sm text-slate-900">{tpl.name}</h4>
												{#if selected}
													<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
														<Check class="size-3" />
														<span>Aktif</span>
													</span>
												{/if}
											</div>
											<p class="text-[11px] text-slate-500 leading-relaxed mb-3">
												{tpl.description}
											</p>
										</div>

										<!-- Schematic Mini Visual -->
										<div class="rounded-lg bg-slate-100/80 p-2 border border-slate-200/60 flex items-center justify-center">
											{#if tpl.iconType === 'split'}
												<div class="grid grid-cols-2 gap-1.5 w-full h-8">
													<div class="bg-emerald-200/80 rounded"></div>
													<div class="bg-slate-300 rounded"></div>
												</div>
											{:else if tpl.iconType === 'centered'}
												<div class="flex flex-col items-center justify-center gap-1 w-full h-8">
													<div class="w-16 h-2 bg-emerald-300 rounded"></div>
													<div class="w-24 h-1.5 bg-slate-300 rounded"></div>
													<div class="w-10 h-2 bg-emerald-500 rounded"></div>
												</div>
											{:else if tpl.iconType === 'bento'}
												<div class="grid grid-cols-3 gap-1 w-full h-8">
													<div class="col-span-2 bg-emerald-200 rounded"></div>
													<div class="bg-slate-300 rounded"></div>
												</div>
											{:else if tpl.iconType === 'cards'}
												<div class="grid grid-cols-3 gap-1 w-full h-8">
													<div class="bg-slate-200 rounded"></div>
													<div class="bg-emerald-200 rounded"></div>
													<div class="bg-slate-200 rounded"></div>
												</div>
											{:else if tpl.iconType === 'timeline'}
												<div class="flex items-center gap-1.5 w-full h-8 px-2">
													<div class="size-2 rounded-full bg-emerald-500"></div>
													<div class="h-1 flex-1 bg-slate-200"></div>
													<div class="size-2 rounded-full bg-emerald-500"></div>
													<div class="h-1 flex-1 bg-slate-200"></div>
													<div class="size-2 rounded-full bg-emerald-500"></div>
												</div>
											{:else if tpl.iconType === 'quote'}
												<div class="flex flex-col items-center justify-center gap-1 w-full h-8">
													<div class="w-24 h-2 bg-slate-300 rounded"></div>
													<div class="size-3 rounded-full bg-emerald-400"></div>
												</div>
											{:else if tpl.iconType === 'accordion'}
												<div class="flex flex-col gap-1 w-full h-8 justify-center">
													<div class="w-full h-3 bg-emerald-100 rounded border border-emerald-300"></div>
													<div class="w-full h-3 bg-slate-200 rounded"></div>
												</div>
											{:else if tpl.iconType === 'carousel'}
												<div class="relative flex items-center justify-between w-full h-8 px-2 bg-slate-900/80 rounded overflow-hidden">
													<div class="size-2 rounded-full bg-slate-400"></div>
													<div class="flex flex-col items-center gap-0.5">
														<div class="w-12 h-1.5 bg-emerald-400 rounded"></div>
														<div class="w-16 h-1 bg-slate-300 rounded"></div>
													</div>
													<div class="size-2 rounded-full bg-slate-400"></div>
												</div>
											{:else}
												<div class="w-full h-8 bg-navy-900 rounded flex items-center justify-center">
													<div class="w-16 h-2 bg-emerald-400 rounded"></div>
												</div>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						</div>

						{#if sec.sectionKey === 'hero'}
							<div class="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-950">
								<div class="flex items-center gap-2.5">
									<Sparkles class="size-4 text-emerald-600 shrink-0" />
									<div class="text-xs">
										<p class="font-bold text-slate-900">Manajemen Konten Slide Hero Carousel</p>
										<p class="text-slate-600">Untuk varian Carousel, konten judul, deskripsi, foto latar, dan tombol aksi dikelola dari menu Slide Hero.</p>
									</div>
								</div>
								<a
									href="/admin/slides"
									class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shrink-0 shadow-xs"
								>
									<span>Kelola Slide Hero</span>
									<ExternalLink class="size-3.5" />
								</a>
							</div>
						{/if}

						<!-- 2. Custom Text & Content Overrides -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
							<div>
								<label for="title-{sec.id}" class="block text-xs font-semibold text-slate-700 mb-1">
									Judul Kustom (Headline Override)
								</label>
								<input
									type="text"
									id="title-{sec.id}"
									bind:value={sec.customTitle}
									placeholder="Biarkan kosong untuk judul bawaan"
									class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
							</div>

							<div>
								<label for="badge-{sec.id}" class="block text-xs font-semibold text-slate-700 mb-1">
									Teks Lencana (Badge Label Override)
								</label>
								<input
									type="text"
									id="badge-{sec.id}"
									bind:value={sec.badgeText}
									placeholder="Contoh: PPDB 2026 Dibuka / Program Pilihan"
									class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
							</div>

							<div class="md:col-span-2">
								<label for="sub-{sec.id}" class="block text-xs font-semibold text-slate-700 mb-1">
									Subjudul / Deskripsi Kustom
								</label>
								<textarea
									id="sub-{sec.id}"
									bind:value={sec.customSubtitle}
									rows="2"
									placeholder="Biarkan kosong untuk deskripsi standar"
									class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
								></textarea>
							</div>
						</div>

						<!-- 3. Styling & Item Count Options -->
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-200/60">
							<div>
								<label for="bg-{sec.id}" class="block text-xs font-semibold text-slate-700 mb-1">
									Gaya Warna Latar (Background Style)
								</label>
								<select
									id="bg-{sec.id}"
									bind:value={sec.bgStyle}
									class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
								>
									<option value="default">Bawaan Rekomendasi ({def.defaultBgStyle || 'default'})</option>
									<option value="white">Putih Bersih (White)</option>
									<option value="slate">Abu-abu Lembut (Slate Light)</option>
									<option value="navy">Biru Gelap Elegan (Navy Dark)</option>
									<option value="gradient">Gradien Aksen Halus</option>
								</select>
							</div>

							<div>
								<label for="count-{sec.id}" class="block text-xs font-semibold text-slate-700 mb-1">
									Jumlah Item Ditampilkan
								</label>
								<select
									id="count-{sec.id}"
									bind:value={sec.itemCount}
									class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
								>
									<option value={1}>1 Item (Fokus Tunggal)</option>
									<option value={2}>2 Item</option>
									<option value={3}>3 Item (Ideal 3-Kolom)</option>
									<option value={4}>4 Item (Ideal 4-Kolom)</option>
									<option value={6}>6 Item (Grid Lengkap)</option>
									<option value={8}>8 Item</option>
								</select>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Floating Bottom Save Bar -->
	<div class="sticky bottom-6 z-20 rounded-2xl bg-slate-900/95 text-white p-4.5 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl backdrop-blur-md border border-slate-800">
		<div class="flex items-center gap-3">
			<div class="size-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
				<CheckCircle2 class="size-5" />
			</div>
			<div>
				<h4 class="font-bold text-sm text-white">Simpan Seluruh Pengaturan Beranda</h4>
				<p class="text-xs text-slate-400">
					Perubahan urutan, status aktif/nonaktif, template, dan teks akan langsung diterapkan pada database live.
				</p>
			</div>
		</div>

		<div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
			<form
				method="POST"
				action="?/saveSections"
				use:enhance={() => {
					saving = true;
					return async ({ update }) => {
						saving = false;
						await update();
					};
				}}
			>
				<input type="hidden" name="sectionsData" value={JSON.stringify(sections)} />
				<button
					type="submit"
					disabled={saving || resetting}
					class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors disabled:opacity-50"
				>
					<Save class="size-4" />
					<span>{saving ? 'Menyimpan ke Database...' : 'Simpan Tata Letak Sekarang'}</span>
				</button>
			</form>
		</div>
	</div>
</div>
