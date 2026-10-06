<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import Modal from '$lib/components/admin/Modal.svelte';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';
	import {
		SlidersHorizontal,
		Plus,
		Pencil,
		Trash2,
		Eye,
		EyeOff,
		Image as ImageIcon,
		ArrowRight,
		ExternalLink,
		Sparkles,
		Upload,
		Loader2,
		LayoutTemplate
	} from 'lucide-svelte';
	import type { HeroSlide } from '$lib/types';

	let { data, form } = $props();

	let slides = $derived<HeroSlide[]>(data.slides || []);

	// Form Modal State
	let isModalOpen = $state(false);
	let isSaving = $state(false);
	let isUploading = $state(false);

	let currentSlide = $state<Partial<HeroSlide>>({
		id: '',
		title: '',
		subtitle: '',
		badgeText: '',
		image: '',
		primaryCtaText: 'Daftar Santri Baru',
		primaryCtaLink: '/ppdb',
		secondaryCtaText: 'Profil Sekolah',
		secondaryCtaLink: '/tentang',
		sortOrder: 1,
		status: 'published'
	});

	// Delete Dialog State
	let isDeleteDialogOpen = $state(false);
	let deleteTargetId = $state('');
	let deleteTargetTitle = $state('');

	function openCreateModal() {
		currentSlide = {
			id: '',
			title: '',
			subtitle: '',
			badgeText: 'Penerimaan Santri Baru 2026/2027',
			image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
			primaryCtaText: 'Daftar Santri Baru',
			primaryCtaLink: '/ppdb',
			secondaryCtaText: 'Profil Sekolah',
			secondaryCtaLink: '/tentang',
			sortOrder: slides.length + 1,
			status: 'published'
		};
		isModalOpen = true;
	}

	function openEditModal(slide: HeroSlide) {
		currentSlide = { ...slide };
		isModalOpen = true;
	}

	function confirmDelete(id: string, title: string) {
		deleteTargetId = id;
		deleteTargetTitle = title;
		isDeleteDialogOpen = true;
	}

	async function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		const file = target.files[0];
		if (file.size > 5 * 1024 * 1024) {
			toast.error('Ukuran file maksimal 5MB.');
			return;
		}

		isUploading = true;
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});
			const result = await res.json();
			if (result.success && result.url) {
				currentSlide.image = result.url;
				toast.success('Foto slide berhasil diunggah!');
			} else {
				toast.error(result.error || 'Gagal mengunggah gambar.');
			}
		} catch (err: any) {
			console.error('Upload error:', err);
			toast.error('Terjadi kesalahan saat mengunggah gambar.');
		} finally {
			isUploading = false;
		}
	}
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<div class="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider mb-1">
				<SlidersHorizontal class="size-4" />
				<span>Tampilan & Hero Carousel</span>
			</div>
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Slide Hero Beranda</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
				Kelola daftar slide banner foto, judul, deskripsi, dan tombol aksi yang tampil pada varian template Hero Carousel di halaman beranda.
			</p>
		</div>

		<div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
			<a
				href="/admin/landing"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
			>
				<LayoutTemplate class="size-4 text-emerald-600" />
				<span>Pengaturan Template</span>
			</a>

			<button
				type="button"
				onclick={openCreateModal}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-500 transition-colors"
			>
				<Plus class="size-4" />
				<span>Tambah Slide Baru</span>
			</button>
		</div>
	</div>

	<!-- Info Notice Box -->
	<div class="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
		<div class="flex items-start sm:items-center gap-3">
			<Sparkles class="size-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
			<div class="text-xs sm:text-sm text-emerald-950">
				<span class="font-bold">Tips Template Hero:</span> Slide ini akan otomatis tampil berputar saat Hero Section menggunakan salah satu varian Carousel (Sinematik Ken Burns, Horisontal Slide, atau Minimalis) di menu
				<a href="/admin/landing" class="font-bold underline text-emerald-700 hover:text-emerald-800">Tata Letak Beranda</a>.
			</div>
		</div>

		<a
			href="/"
			target="_blank"
			rel="noopener noreferrer"
			class="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 shrink-0"
		>
			<span>Lihat Website</span>
			<ExternalLink class="size-3.5" />
		</a>
	</div>

	<!-- Slides List -->
	{#if slides.length === 0}
		<div class="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
			<div class="mx-auto size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
				<SlidersHorizontal class="size-6" />
			</div>
			<h3 class="text-base font-bold text-slate-900">Belum Ada Slide Hero</h3>
			<p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
				Tambahkan slide pertama untuk menampilkan gambar latar resolusi tinggi dan pesan kunci sekolah Anda.
			</p>
			<button
				type="button"
				onclick={openCreateModal}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
			>
				<Plus class="size-4" />
				<span>Tambah Slide Pertama</span>
			</button>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each slides as slide (slide.id)}
				<div class="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-300">
					<!-- Top: Image Preview & Overlay Badges -->
					<div>
						<div class="relative h-48 w-full bg-slate-900 overflow-hidden">
							<img
								src={slide.image}
								alt={slide.title}
								class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

							<!-- Badges on image -->
							<div class="absolute top-3 left-3 flex items-center gap-2">
								<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-slate-900/80 text-white backdrop-blur-xs border border-white/20">
									#{slide.sortOrder}
								</span>
								{#if slide.badgeText}
									<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-600/90 text-white backdrop-blur-xs">
										{slide.badgeText}
									</span>
								{/if}
							</div>

							<!-- Status badge on image -->
							<div class="absolute top-3 right-3">
								<form
									method="POST"
									action="?/toggleStatus"
									use:enhance={() => {
										return async ({ result, update }) => {
											await update();
											if (result.type === 'success') toast.success('Status slide berhasil diperbarui');
										};
									}}
								>
									<input type="hidden" name="id" value={slide.id} />
									<input type="hidden" name="currentStatus" value={slide.status} />
									<button
										type="submit"
										class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-xs transition-colors shadow-xs {slide.status === 'published' ? 'bg-emerald-500/90 text-white hover:bg-emerald-600' : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'}"
										title="Klik untuk mengubah status"
									>
										{#if slide.status === 'published'}
											<Eye class="size-3" />
											<span>Tayang</span>
										{:else}
											<EyeOff class="size-3" />
											<span>Draft</span>
										{/if}
									</button>
								</form>
							</div>
						</div>

						<!-- Middle: Content Info -->
						<div class="p-4 sm:p-5 space-y-2.5">
							<h3 class="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2">
								{slide.title}
							</h3>
							<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
								{slide.subtitle}
							</p>

							<!-- Buttons Info -->
							<div class="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px]">
								<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60">
									<ArrowRight class="size-3" />
									<span>{slide.primaryCtaText}</span>
								</span>
								{#if slide.secondaryCtaText}
									<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
										<span>{slide.secondaryCtaText}</span>
									</span>
								{/if}
							</div>
						</div>
					</div>

					<!-- Bottom: Action Buttons -->
					<div class="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-end gap-2">
						<button
							type="button"
							onclick={() => openEditModal(slide)}
							class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
						>
							<Pencil class="size-3.5" />
							<span>Edit</span>
						</button>

						<button
							type="button"
							onclick={() => confirmDelete(slide.id, slide.title)}
							class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
						>
							<Trash2 class="size-3.5" />
							<span>Hapus</span>
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- ========================================== -->
<!-- MODAL TAMBAH / EDIT SLIDE HERO -->
<!-- ========================================== -->
<Modal
	bind:open={isModalOpen}
	title={currentSlide.id ? 'Edit Slide Hero' : 'Tambah Slide Hero Baru'}
	description="Sesuaikan judul utama, ringkasan deskripsi, foto latar belakang, dan tombol aksi."
	size="xl"
>
	<form
		method="POST"
		action="?/save"
		use:enhance={() => {
			isSaving = true;
			return async ({ result, update }) => {
				isSaving = false;
				if (result.type === 'success') {
					isModalOpen = false;
					await update();
					toast.success(currentSlide.id ? 'Slide hero berhasil disimpan!' : 'Slide hero baru ditambahkan!');
				} else if (result.type === 'failure') {
					toast.error((result.data as any)?.error || 'Gagal menyimpan slide.');
				}
			};
		}}
		class="space-y-4"
	>
		<input type="hidden" name="id" value={currentSlide.id || ''} />

		<!-- 1. Judul & Lencana -->
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div class="sm:col-span-2">
				<label for="slide-title" class="block text-xs font-bold text-slate-700 mb-1">
					Judul Utama Slide <span class="text-rose-500">*</span>
				</label>
				<input
					type="text"
					id="slide-title"
					name="title"
					bind:value={currentSlide.title}
					required
					placeholder="Contoh: Membentuk Generasi Qur'ani & Unggul Sains"
					class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="slide-badge" class="block text-xs font-bold text-slate-700 mb-1">
					Teks Lencana (Badge)
				</label>
				<input
					type="text"
					id="slide-badge"
					name="badgeText"
					bind:value={currentSlide.badgeText}
					placeholder="Contoh: PPDB 2026/2027 Dibuka"
					class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>
		</div>

		<!-- 2. Subjudul / Deskripsi -->
		<div>
			<label for="slide-subtitle" class="block text-xs font-bold text-slate-700 mb-1">
				Deskripsi / Subjudul Slide <span class="text-rose-500">*</span>
			</label>
			<textarea
				id="slide-subtitle"
				name="subtitle"
				bind:value={currentSlide.subtitle}
				required
				rows="3"
				placeholder="Jelaskan pesan atau keunggulan yang ingin disampaikan pada slide ini..."
				class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
			></textarea>
		</div>

		<!-- 3. Foto Latar Belakang & Upload File -->
		<div class="space-y-2">
			<label for="slide-image" class="block text-xs font-bold text-slate-700">
				URL Foto Latar Belakang <span class="text-rose-500">*</span>
			</label>
			<div class="flex items-center gap-2">
				<input
					type="url"
					id="slide-image"
					name="image"
					bind:value={currentSlide.image}
					required
					placeholder="https://... atau unggah foto di samping"
					class="flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>

				<label
					class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer transition-colors shrink-0"
				>
					{#if isUploading}
						<Loader2 class="size-4 animate-spin text-emerald-600" />
						<span>Mengunggah...</span>
					{:else}
						<Upload class="size-4 text-emerald-600" />
						<span>Unggah Foto</span>
					{/if}
					<input
						type="file"
						accept="image/png,image/jpeg,image/webp"
						class="hidden"
						onchange={handleFileUpload}
						disabled={isUploading}
					/>
				</label>
			</div>

			<!-- Image thumbnail preview -->
			{#if currentSlide.image}
				<div class="relative h-32 w-full rounded-xl overflow-hidden border border-slate-200 mt-2 bg-slate-900">
					<img
						src={currentSlide.image}
						alt="Pratinjau Foto Slide"
						class="w-full h-full object-cover object-center"
					/>
					<span class="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
						Pratinjau Foto
					</span>
				</div>
			{/if}
		</div>

		<!-- 4. Tombol Aksi Utama & Kedua -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
			<!-- Primary CTA -->
			<div class="space-y-2">
				<span class="block text-xs font-bold text-emerald-800 uppercase tracking-wider">Tombol Aksi Utama (Primary CTA)</span>
				<div>
					<label for="primary-cta-text" class="block text-[11px] font-semibold text-slate-600 mb-1">Teks Tombol</label>
					<input
						type="text"
						id="primary-cta-text"
						name="primaryCtaText"
						bind:value={currentSlide.primaryCtaText}
						placeholder="Contoh: Daftar Santri Baru"
						class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
					/>
				</div>
				<div>
					<label for="primary-cta-link" class="block text-[11px] font-semibold text-slate-600 mb-1">Tautan Tujuan</label>
					<input
						type="text"
						id="primary-cta-link"
						name="primaryCtaLink"
						bind:value={currentSlide.primaryCtaLink}
						placeholder="Contoh: /ppdb"
						class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
					/>
				</div>
			</div>

			<!-- Secondary CTA -->
			<div class="space-y-2">
				<span class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tombol Aksi Kedua (Opsional)</span>
				<div>
					<label for="sec-cta-text" class="block text-[11px] font-semibold text-slate-600 mb-1">Teks Tombol</label>
					<input
						type="text"
						id="sec-cta-text"
						name="secondaryCtaText"
						bind:value={currentSlide.secondaryCtaText}
						placeholder="Contoh: Profil Sekolah"
						class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
					/>
				</div>
				<div>
					<label for="sec-cta-link" class="block text-[11px] font-semibold text-slate-600 mb-1">Tautan Tujuan</label>
					<input
						type="text"
						id="sec-cta-link"
						name="secondaryCtaLink"
						bind:value={currentSlide.secondaryCtaLink}
						placeholder="Contoh: /tentang"
						class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
					/>
				</div>
			</div>
		</div>

		<!-- 5. Urutan Sortir & Status -->
		<div class="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
			<div>
				<label for="sort-order" class="block text-xs font-bold text-slate-700 mb-1">Urutan Tampil (Sort Order)</label>
				<input
					type="number"
					id="sort-order"
					name="sortOrder"
					bind:value={currentSlide.sortOrder}
					min="1"
					class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="slide-status" class="block text-xs font-bold text-slate-700 mb-1">Status Publikasi</label>
				<select
					id="slide-status"
					name="status"
					bind:value={currentSlide.status}
					class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
				>
					<option value="published">Tayang (Published)</option>
					<option value="draft">Draft (Disembunyikan)</option>
				</select>
			</div>
		</div>

		<!-- Action Footer -->
		<div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
			<button
				type="button"
				onclick={() => (isModalOpen = false)}
				class="px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
			>
				Batal
			</button>
			<button
				type="submit"
				disabled={isSaving}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-500 transition-colors disabled:opacity-50"
			>
				{#if isSaving}
					<Loader2 class="size-4 animate-spin" />
					<span>Menyimpan...</span>
				{:else}
					<span>Simpan Slide</span>
				{/if}
			</button>
		</div>
	</form>
</Modal>

<!-- Confirm Delete Dialog -->
<ConfirmDialog
	bind:open={isDeleteDialogOpen}
	title="Hapus Slide Hero"
	message={`Apakah Anda yakin ingin menghapus slide "${deleteTargetTitle}"? Data yang dihapus tidak dapat dipulihkan.`}
	actionUrl="?/delete"
	itemId={deleteTargetId}
/>
