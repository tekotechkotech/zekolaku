<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import Modal from '$lib/components/admin/Modal.svelte';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';
	import {
		Plus,
		Edit,
		Trash2,
		Building2,
		Star,
		CheckCircle2,
		Save,
		Loader2,
		Tag,
		X,
		ExternalLink
	} from 'lucide-svelte';

	let { data, form } = $props();

	let facilities = $derived(data.facilities || []);

	// Modal state
	let modalOpen = $state(false);
	let isEditing = $state(false);
	let saving = $state(false);

	// Delete dialog state
	let confirmDeleteOpen = $state(false);
	let deleteId = $state('');
	let deleteName = $state('');

	// Current facility state
	let currentItem = $state({
		id: '',
		name: '',
		slug: '',
		category: 'Gedung & Kelas',
		description: '',
		image: '',
		featured: false,
		sortOrder: 1,
		specs: ['Kapasitas 32 Siswa', 'AC & Smart Board']
	});

	let newSpecInput = $state('');

	function openCreateModal() {
		isEditing = false;
		currentItem = {
			id: '',
			name: '',
			slug: '',
			category: 'Gedung & Kelas',
			description: '',
			image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200',
			featured: false,
			sortOrder: facilities.length + 1,
			specs: ['Kapasitas 30+ Siswa', 'Pendingin Ruangan (AC)', 'Proyektor Interaktif']
		};
		newSpecInput = '';
		modalOpen = true;
	}

	function openEditModal(fac: any) {
		isEditing = true;
		currentItem = {
			id: fac.id,
			name: fac.name,
			slug: fac.slug || fac.id,
			category: fac.category,
			description: fac.description,
			image: fac.image,
			featured: Boolean(fac.featured),
			sortOrder: fac.sortOrder ?? 1,
			specs: Array.isArray(fac.specs) ? [...fac.specs] : []
		};
		newSpecInput = '';
		modalOpen = true;
	}

	function addSpec() {
		if (newSpecInput.trim()) {
			currentItem.specs.push(newSpecInput.trim());
			newSpecInput = '';
		}
	}

	function removeSpec(idx: number) {
		currentItem.specs.splice(idx, 1);
	}

	function confirmDelete(id: string, name: string) {
		deleteId = id;
		deleteName = name;
		confirmDeleteOpen = true;
	}

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Perubahan fasilitas berhasil disimpan!');
			modalOpen = false;
			confirmDeleteOpen = false;
		} else if (form?.error) {
			toast.error(form.error);
		}
	});
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Fasilitas Sekolah & Asrama</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Kelola sarana dan prasarana penunjang kegiatan belajar mengajar dan kehidupan asrama santri.
			</p>
		</div>
		<div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
			<a
				href="/fasilitas"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
				title="Buka halaman fasilitas publik di tab baru"
			>
				<ExternalLink class="size-4 text-emerald-600" />
				<span>Lihat Halaman Publik</span>
			</a>
			<button
				type="button"
				onclick={openCreateModal}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-500 transition-colors"
			>
				<Plus class="size-4" />
				<span>Tambah Fasilitas</span>
			</button>
		</div>
	</div>

	<!-- Facilities Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each facilities as fac}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden flex flex-col hover:border-slate-300 transition-all group">
				<div class="relative h-44 w-full overflow-hidden bg-slate-100">
					{#if fac.image}
						<img
							src={fac.image}
							alt={fac.name}
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							loading="lazy"
						/>
					{:else}
						<div class="w-full h-full flex items-center justify-center text-slate-400">
							<Building2 class="size-10" />
						</div>
					{/if}
					<div class="absolute top-3 left-3">
						<span class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
							{fac.category}
						</span>
					</div>
					{#if fac.featured}
						<div class="absolute top-3 right-3">
							<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500 text-white shadow-xs">
								<Star class="size-3 fill-white" />
								<span>Featured</span>
							</span>
						</div>
					{/if}
				</div>

				<div class="p-5 flex-1 flex flex-col justify-between">
					<div>
						<h3 class="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
							{fac.name}
						</h3>
						<p class="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
							{fac.description}
						</p>

						<!-- Specs tags -->
						{#if fac.specs && fac.specs.length > 0}
							<div class="flex flex-wrap gap-1.5 mt-3.5">
								{#each fac.specs.slice(0, 3) as spec}
									<span class="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
										{spec}
									</span>
								{/each}
								{#if fac.specs.length > 3}
									<span class="text-[11px] font-semibold text-slate-400">
										+{fac.specs.length - 3} lagi
									</span>
								{/if}
							</div>
						{/if}
					</div>

					<!-- Card footer -->
					<div class="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between">
						<span class="text-xs font-mono text-slate-400">
							Urutan #{fac.sortOrder}
						</span>
						<div class="flex items-center gap-1.5">
							<a
								href="/fasilitas#{fac.id}"
								target="_blank"
								rel="noopener noreferrer"
								class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
								title="Lihat Fasilitas di Website (Tab Baru)"
							>
								<ExternalLink class="size-4" />
							</a>
							<button
								type="button"
								onclick={() => openEditModal(fac)}
								class="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
								title="Edit Fasilitas"
							>
								<Edit class="size-4" />
							</button>
							<button
								type="button"
								onclick={() => confirmDelete(fac.id, fac.name)}
								class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
								title="Hapus Fasilitas"
							>
								<Trash2 class="size-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Modal Create / Edit Facility -->
<Modal
	bind:open={modalOpen}
	title={isEditing ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}
	description="Kelola spesifikasi sarana dan prasarana kampus."
	size="lg"
>
	<form
		method="POST"
		action="?/save"
		use:enhance={() => {
			saving = true;
			return async ({ update }) => {
				saving = false;
				await update();
			};
		}}
		class="space-y-4"
	>
		<input type="hidden" name="id" value={currentItem.id} />
		<input type="hidden" name="specs" value={JSON.stringify(currentItem.specs)} />

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label for="f-name" class="block text-xs font-semibold text-slate-700 mb-1">
					Nama Fasilitas
				</label>
				<input
					type="text"
					id="f-name"
					name="name"
					bind:value={currentItem.name}
					required
					placeholder="cth: Laboratorium Sains Terpadu"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="f-category" class="block text-xs font-semibold text-slate-700 mb-1">
					Kategori Fasilitas
				</label>
				<input
					type="text"
					id="f-category"
					name="category"
					bind:value={currentItem.category}
					required
					placeholder="cth: Akademik / Olahraga / Asrama"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="f-sort" class="block text-xs font-semibold text-slate-700 mb-1">
					Nomor Urutan Tampil
				</label>
				<input
					type="number"
					id="f-sort"
					name="sortOrder"
					bind:value={currentItem.sortOrder}
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="flex items-center gap-2 pt-6">
				<input
					type="checkbox"
					id="f-featured"
					name="featured"
					bind:checked={currentItem.featured}
					class="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
				/>
				<label for="f-featured" class="text-xs font-medium text-slate-700">
					Tampilkan di Beranda (Featured)
				</label>
			</div>

			<div class="md:col-span-2">
				<label for="f-image" class="block text-xs font-semibold text-slate-700 mb-1">
					URL Foto Fasilitas
				</label>
				<input
					type="text"
					id="f-image"
					name="image"
					bind:value={currentItem.image}
					required
					placeholder="https://images.unsplash.com/..."
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="f-desc" class="block text-xs font-semibold text-slate-700 mb-1">
					Deskripsi Fasilitas
				</label>
				<textarea
					id="f-desc"
					name="description"
					bind:value={currentItem.description}
					rows="3"
					required
					placeholder="Penjelasan fungsi, peralatan, dan kapasitas fasilitas..."
					class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				></textarea>
			</div>
		</div>

		<!-- Specifications Tags Editor -->
		<div class="border-t border-slate-100 pt-3">
			<span class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
				Spesifikasi & Fasilitas Ruangan
			</span>
			<div class="flex items-center gap-2 mb-2.5">
				<input
					type="text"
					bind:value={newSpecInput}
					placeholder="Ketik spesifikasi (cth: WiFi 6, 40 PC, dll)..."
					onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSpec(); } }}
					class="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
				<button
					type="button"
					onclick={addSpec}
					class="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
				>
					Tambah Tag
				</button>
			</div>

			<div class="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-slate-50 rounded-xl border border-slate-200/60">
				{#each currentItem.specs as spec, idx}
					<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs">
						<span>{spec}</span>
						<button
							type="button"
							onclick={() => removeSpec(idx)}
							class="text-slate-400 hover:text-rose-600"
						>
							<X class="size-3" />
						</button>
					</span>
				{/each}
				{#if currentItem.specs.length === 0}
					<span class="text-xs text-slate-400 italic">Belum ada spesifikasi ditambahkan.</span>
				{/if}
			</div>
		</div>

		<!-- Form Actions -->
		<div class="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
			<button
				type="button"
				onclick={() => (modalOpen = false)}
				class="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
			>
				Batal
			</button>
			<button
				type="submit"
				disabled={saving}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 disabled:opacity-50"
			>
				{#if saving}
					<Loader2 class="size-3.5 animate-spin" />
					<span>Menyimpan...</span>
				{:else}
					<Save class="size-3.5" />
					<span>Simpan Fasilitas</span>
				{/if}
			</button>
		</div>
	</form>
</Modal>

<!-- Delete Dialog -->
<ConfirmDialog
	bind:open={confirmDeleteOpen}
	title="Hapus Fasilitas"
	message="Apakah Anda yakin ingin menghapus data fasilitas ini?"
	itemId={deleteId}
	itemName={deleteName}
	actionUrl="?/delete"
/>
