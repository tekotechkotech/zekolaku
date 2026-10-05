<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import Modal from '$lib/components/admin/Modal.svelte';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';
	import {
		Plus,
		Edit,
		Trash2,
		Calendar,
		Image as ImageIcon,
		Clock,
		Star,
		Save,
		Loader2,
		Camera,
		ExternalLink
	} from 'lucide-svelte';

	let { data, form } = $props();

	let activities = $derived(data.activities || []);
	let gallery = $derived(data.gallery || []);

	// Active tab: 'activities' | 'gallery'
	let activeTab = $state<'activities' | 'gallery'>('activities');

	// Activity modal state
	let activityModalOpen = $state(false);
	let isEditingActivity = $state(false);
	let savingActivity = $state(false);

	let currentActivity = $state({
		id: '',
		title: '',
		slug: '',
		category: 'Karakter & Ibadah',
		schedule: 'Setiap Hari',
		description: '',
		image: '',
		featured: false
	});

	// Gallery modal state
	let galleryModalOpen = $state(false);
	let isEditingGallery = $state(false);
	let savingGallery = $state(false);

	let currentGallery = $state({
		id: '',
		title: '',
		category: 'Kegiatan Santri',
		date: new Date().toISOString().split('T')[0],
		image: '',
		description: ''
	});

	// Delete dialog state
	let confirmDeleteOpen = $state(false);
	let deleteId = $state('');
	let deleteName = $state('');
	let deleteActionUrl = $state('?/deleteActivity');

	function openCreateActivityModal() {
		isEditingActivity = false;
		currentActivity = {
			id: '',
			title: '',
			slug: '',
			category: 'Karakter & Ibadah',
			schedule: 'Setiap Hari / Ba’da Subuh',
			description: '',
			image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200',
			featured: false
		};
		activityModalOpen = true;
	}

	function openEditActivityModal(act: any) {
		isEditingActivity = true;
		currentActivity = {
			id: act.id,
			title: act.title,
			slug: act.slug || act.id,
			category: act.category,
			schedule: act.schedule,
			description: act.description,
			image: act.image,
			featured: Boolean(act.featured)
		};
		activityModalOpen = true;
	}

	function confirmDeleteActivity(id: string, title: string) {
		deleteId = id;
		deleteName = title;
		deleteActionUrl = '?/deleteActivity';
		confirmDeleteOpen = true;
	}

	function openCreateGalleryModal() {
		isEditingGallery = false;
		currentGallery = {
			id: '',
			title: '',
			category: 'Dokumentasi Santri',
			date: new Date().toISOString().split('T')[0],
			image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200',
			description: ''
		};
		galleryModalOpen = true;
	}

	function openEditGalleryModal(item: any) {
		isEditingGallery = true;
		currentGallery = {
			id: item.id,
			title: item.title,
			category: item.category,
			date: item.date,
			image: item.image,
			description: item.description
		};
		galleryModalOpen = true;
	}

	function confirmDeleteGallery(id: string, title: string) {
		deleteId = id;
		deleteName = title;
		deleteActionUrl = '?/deleteGallery';
		confirmDeleteOpen = true;
	}

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Perubahan berhasil disimpan!');
			activityModalOpen = false;
			galleryModalOpen = false;
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
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Kegiatan & Galeri Foto</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Kelola agenda rutin santri, kalender kegiatan akademik, serta dokumentasi galeri visual sekolah.
			</p>
		</div>

		<div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
			<a
				href="/kegiatan"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
				title="Buka agenda dan galeri publik di tab baru"
			>
				<ExternalLink class="size-4 text-emerald-600" />
				<span>Lihat Halaman Publik</span>
			</a>
			<!-- Action button depending on tab -->
			{#if activeTab === 'activities'}
				<button
					type="button"
					onclick={openCreateActivityModal}
					class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-500 transition-colors"
				>
					<Plus class="size-4" />
					<span>Tambah Agenda Kegiatan</span>
				</button>
			{:else}
				<button
					type="button"
					onclick={openCreateGalleryModal}
					class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-500 transition-colors"
				>
					<Camera class="size-4" />
					<span>Upload Foto Galeri</span>
				</button>
			{/if}
		</div>
	</div>

	<!-- Tab Switcher -->
	<div class="flex items-center gap-2 border-b border-slate-200 pb-1">
		<button
			type="button"
			onclick={() => (activeTab = 'activities')}
			class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all
			{activeTab === 'activities'
				? 'bg-emerald-600 text-white shadow-sm'
				: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
		>
			<Calendar class="size-4" />
			<span>Agenda Kegiatan ({activities.length})</span>
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'gallery')}
			class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all
			{activeTab === 'gallery'
				? 'bg-emerald-600 text-white shadow-sm'
				: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
		>
			<ImageIcon class="size-4" />
			<span>Galeri Foto ({gallery.length})</span>
		</button>
	</div>

	<!-- TAB 1: KEGIATAN SEKOLAH -->
	{#if activeTab === 'activities'}
		<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse text-sm">
					<thead>
						<tr class="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-xs font-semibold uppercase tracking-wider">
							<th class="py-3.5 pl-6 pr-3">Kegiatan</th>
							<th class="py-3.5 px-3">Kategori</th>
							<th class="py-3.5 px-3">Jadwal Pelaksanaan</th>
							<th class="py-3.5 px-3 text-center">Featured</th>
							<th class="py-3.5 pl-3 pr-6 text-right">Aksi</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100">
						{#each activities as item}
							<tr class="hover:bg-slate-50/60 transition-colors">
								<td class="py-4 pl-6 pr-3">
									<div class="flex items-center gap-3">
										{#if item.image}
											<img
												src={item.image}
												alt={item.title}
												class="size-11 rounded-xl object-cover border border-slate-200 shrink-0"
											/>
										{:else}
											<div class="size-11 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
												<Calendar class="size-5" />
											</div>
										{/if}
										<div class="min-w-0">
											<p class="font-bold text-slate-900 truncate">{item.title}</p>
											<p class="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
										</div>
									</div>
								</td>
								<td class="py-4 px-3 text-xs font-medium text-slate-600">
									{item.category}
								</td>
								<td class="py-4 px-3 text-xs text-slate-700 font-semibold">
									{item.schedule}
								</td>
								<td class="py-4 px-3 text-center">
									{#if item.featured}
										<span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
											<Star class="size-3.5 fill-amber-500 text-amber-500" />
											<span>Ya</span>
										</span>
									{:else}
										<span class="text-xs text-slate-400">-</span>
									{/if}
								</td>
								<td class="py-4 pl-3 pr-6 text-right">
									<div class="flex items-center justify-end gap-1.5">
										<a
											href="/kegiatan"
											target="_blank"
											rel="noopener noreferrer"
											class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
											title="Lihat Agenda di Website (Tab Baru)"
										>
											<ExternalLink class="size-4" />
										</a>
										<button
											type="button"
											onclick={() => openEditActivityModal(item)}
											class="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
											title="Edit Kegiatan"
										>
											<Edit class="size-4" />
										</button>
										<button
											type="button"
											onclick={() => confirmDeleteActivity(item.id, item.title)}
											class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
											title="Hapus Kegiatan"
										>
											<Trash2 class="size-4" />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<!-- TAB 2: GALERI FOTO -->
	{#if activeTab === 'gallery'}
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
			{#each gallery as photo}
				<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden flex flex-col group hover:border-slate-300 transition-all">
					<div class="relative h-44 w-full bg-slate-100 overflow-hidden">
						{#if photo.image}
							<img
								src={photo.image}
								alt={photo.title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>
						{:else}
							<div class="w-full h-full flex items-center justify-center text-slate-400">
								<ImageIcon class="size-8" />
							</div>
						{/if}
						<div class="absolute top-2.5 left-2.5">
							<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
								{photo.category}
							</span>
						</div>
					</div>

					<div class="p-3.5 flex-1 flex flex-col justify-between">
						<div>
							<h4 class="text-sm font-bold text-slate-900 line-clamp-1">{photo.title}</h4>
							<p class="text-[11px] text-slate-500 mt-1 line-clamp-2">{photo.description}</p>
						</div>

						<div class="border-t border-slate-100 pt-2.5 mt-3 flex items-center justify-between text-xs">
							<span class="text-slate-400 font-medium text-[11px]">{photo.date}</span>
							<div class="flex items-center gap-1">
								<a
									href="/kegiatan"
									target="_blank"
									rel="noopener noreferrer"
									class="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-md"
									title="Lihat Galeri di Website (Tab Baru)"
								>
									<ExternalLink class="size-3.5" />
								</a>
								<button
									type="button"
									onclick={() => openEditGalleryModal(photo)}
									class="p-1 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md"
									title="Edit Foto Galeri"
								>
									<Edit class="size-3.5" />
								</button>
								<button
									type="button"
									onclick={() => confirmDeleteGallery(photo.id, photo.title)}
									class="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
									title="Hapus Foto Galeri"
								>
									<Trash2 class="size-3.5" />
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Modal Activity -->
<Modal
	bind:open={activityModalOpen}
	title={isEditingActivity ? 'Edit Agenda Kegiatan' : 'Tambah Agenda Kegiatan Baru'}
	description="Kelola nama kegiatan, jadwal rutin, serta deskripsi pelaksanaan."
	size="lg"
>
	<form
		method="POST"
		action="?/saveActivity"
		use:enhance={() => {
			savingActivity = true;
			return async ({ update }) => {
				savingActivity = false;
				await update();
			};
		}}
		class="space-y-4"
	>
		<input type="hidden" name="id" value={currentActivity.id} />

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="md:col-span-2">
				<label for="act-title" class="block text-xs font-semibold text-slate-700 mb-1">
					Nama Kegiatan
				</label>
				<input
					type="text"
					id="act-title"
					name="title"
					bind:value={currentActivity.title}
					required
					placeholder="cth: Kajian Adab & Halaqah Al-Qur'an Subuh"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="act-category" class="block text-xs font-semibold text-slate-700 mb-1">
					Kategori Kegiatan
				</label>
				<input
					type="text"
					id="act-category"
					name="category"
					bind:value={currentActivity.category}
					required
					placeholder="cth: Ibadah & Karakter / Sains & Riset"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="act-schedule" class="block text-xs font-semibold text-slate-700 mb-1">
					Jadwal / Waktu Pelaksanaan
				</label>
				<input
					type="text"
					id="act-schedule"
					name="schedule"
					bind:value={currentActivity.schedule}
					required
					placeholder="cth: Setiap Hari Ba'da Subuh / Setiap Sabtu"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="act-image" class="block text-xs font-semibold text-slate-700 mb-1">
					URL Foto Kegiatan
				</label>
				<input
					type="text"
					id="act-image"
					name="image"
					bind:value={currentActivity.image}
					required
					placeholder="https://images.unsplash.com/..."
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="act-desc" class="block text-xs font-semibold text-slate-700 mb-1">
					Deskripsi Kegiatan
				</label>
				<textarea
					id="act-desc"
					name="description"
					bind:value={currentActivity.description}
					rows="3"
					required
					placeholder="Penjelasan sasaran santri, metode pelaksanaan, dan hikmah kegiatan..."
					class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				></textarea>
			</div>

			<div class="flex items-center gap-2">
				<input
					type="checkbox"
					id="act-featured"
					name="featured"
					bind:checked={currentActivity.featured}
					class="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
				/>
				<label for="act-featured" class="text-xs font-medium text-slate-700">
					Tampilkan di Beranda (Featured)
				</label>
			</div>
		</div>

		<div class="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
			<button
				type="button"
				onclick={() => (activityModalOpen = false)}
				class="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
			>
				Batal
			</button>
			<button
				type="submit"
				disabled={savingActivity}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 disabled:opacity-50"
			>
				{#if savingActivity}
					<Loader2 class="size-3.5 animate-spin" />
					<span>Menyimpan...</span>
				{:else}
					<Save class="size-3.5" />
					<span>Simpan Kegiatan</span>
				{/if}
			</button>
		</div>
	</form>
</Modal>

<!-- Modal Gallery -->
<Modal
	bind:open={galleryModalOpen}
	title={isEditingGallery ? 'Edit Foto Galeri' : 'Tambah Foto Galeri Baru'}
	description="Upload atau cantumkan dokumentasi visual santri & sekolah."
	size="md"
>
	<form
		method="POST"
		action="?/saveGallery"
		use:enhance={() => {
			savingGallery = true;
			return async ({ update }) => {
				savingGallery = false;
				await update();
			};
		}}
		class="space-y-4"
	>
		<input type="hidden" name="id" value={currentGallery.id} />

		<div>
			<label for="gal-title" class="block text-xs font-semibold text-slate-700 mb-1">
				Judul Foto / Momen
			</label>
			<input
				type="text"
				id="gal-title"
				name="title"
				bind:value={currentGallery.title}
				required
				placeholder="cth: Praktikum Bioteknologi Santri"
				class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			/>
		</div>

		<div class="grid grid-cols-2 gap-3">
			<div>
				<label for="gal-category" class="block text-xs font-semibold text-slate-700 mb-1">
					Kategori
				</label>
				<input
					type="text"
					id="gal-category"
					name="category"
					bind:value={currentGallery.category}
					required
					placeholder="cth: Akademik"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="gal-date" class="block text-xs font-semibold text-slate-700 mb-1">
					Tanggal / Periode
				</label>
				<input
					type="text"
					id="gal-date"
					name="date"
					bind:value={currentGallery.date}
					required
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>
		</div>

		<div>
			<label for="gal-image" class="block text-xs font-semibold text-slate-700 mb-1">
				URL Foto Dokumentasi
			</label>
			<input
				type="text"
				id="gal-image"
				name="image"
				bind:value={currentGallery.image}
				required
				placeholder="https://images.unsplash.com/..."
				class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			/>
		</div>

		<div>
			<label for="gal-desc" class="block text-xs font-semibold text-slate-700 mb-1">
				Keterangan Foto (Caption)
			</label>
			<textarea
				id="gal-desc"
				name="description"
				bind:value={currentGallery.description}
				rows="2"
				placeholder="Deskripsi singkat foto momen..."
				class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			></textarea>
		</div>

		<div class="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
			<button
				type="button"
				onclick={() => (galleryModalOpen = false)}
				class="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
			>
				Batal
			</button>
			<button
				type="submit"
				disabled={savingGallery}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 disabled:opacity-50"
			>
				{#if savingGallery}
					<Loader2 class="size-3.5 animate-spin" />
					<span>Menyimpan...</span>
				{:else}
					<Save class="size-3.5" />
					<span>Simpan Foto</span>
				{/if}
			</button>
		</div>
	</form>
</Modal>

<!-- Delete Dialog -->
<ConfirmDialog
	bind:open={confirmDeleteOpen}
	title="Hapus Data"
	message="Apakah Anda yakin ingin menghapus data ini?"
	itemId={deleteId}
	itemName={deleteName}
	actionUrl={deleteActionUrl}
/>
