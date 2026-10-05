<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import Modal from '$lib/components/admin/Modal.svelte';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';
	import {
		Plus,
		Edit,
		Trash2,
		Trophy,
		Medal,
		Filter,
		Star,
		Save,
		Loader2,
		Search,
		Calendar,
		ExternalLink
	} from 'lucide-svelte';

	let { data, form } = $props();

	let rawAchievements = $derived(data.achievements || []);

	// Filter states
	let selectedYear = $state<string>('all');
	let selectedLevel = $state<string>('all');
	let searchQuery = $state<string>('');

	// Get available years for filtering
	let availableYears = $derived(
		Array.from(new Set(rawAchievements.map((a: any) => a.year.toString()))).sort().reverse()
	);

	// Filtered list
	let filteredAchievements = $derived(
		rawAchievements.filter((item: any) => {
			const matchYear = selectedYear === 'all' || item.year.toString() === selectedYear;
			const matchLevel = selectedLevel === 'all' || item.level === selectedLevel;
			const matchSearch =
				searchQuery === '' ||
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.winner.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.organizer.toLowerCase().includes(searchQuery.toLowerCase());
			return matchYear && matchLevel && matchSearch;
		})
	);

	// Modal states
	let modalOpen = $state(false);
	let isEditing = $state(false);
	let saving = $state(false);

	// Delete dialog state
	let confirmDeleteOpen = $state(false);
	let deleteId = $state('');
	let deleteTitle = $state('');

	// Form achievement item
	let currentItem = $state({
		id: '',
		title: '',
		winner: '',
		role: 'Siswa',
		scope: 'Akademik',
		category: 'Sains',
		level: 'Nasional',
		year: new Date().getFullYear(),
		organizer: '',
		description: '',
		badgeVariant: 'emerald',
		image: '',
		featured: false,
		sortOrder: 1
	});

	function openCreateModal() {
		isEditing = false;
		currentItem = {
			id: '',
			title: '',
			winner: '',
			role: 'Siswa',
			scope: 'Akademik',
			category: 'Sains',
			level: 'Nasional',
			year: new Date().getFullYear(),
			organizer: 'Kementerian Pendidikan / Puspresnas',
			description: '',
			badgeVariant: 'emerald',
			image: '',
			featured: false,
			sortOrder: rawAchievements.length + 1
		};
		modalOpen = true;
	}

	function openEditModal(ach: any) {
		isEditing = true;
		currentItem = {
			id: ach.id,
			title: ach.title,
			winner: ach.winner,
			role: ach.role || 'Siswa',
			scope: ach.scope || 'Akademik',
			category: ach.category || 'Sains',
			level: ach.level || 'Nasional',
			year: ach.year || new Date().getFullYear(),
			organizer: ach.organizer || '',
			description: ach.description || '',
			badgeVariant: ach.badgeVariant || 'emerald',
			image: ach.image || '',
			featured: Boolean(ach.featured),
			sortOrder: ach.sortOrder ?? 1
		};
		modalOpen = true;
	}

	function confirmDelete(id: string, title: string) {
		deleteId = id;
		deleteTitle = title;
		confirmDeleteOpen = true;
	}

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Prestasi berhasil disimpan!');
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
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Prestasi & Penghargaan</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Kelola rekam jejak juara santri dan tenaga pendidik tingkat regional, nasional, hingga internasional.
			</p>
		</div>
		<div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
			<a
				href="/prestasi"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
				title="Buka kanal prestasi santri di tab baru"
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
				<span>Catat Prestasi Baru</span>
			</button>
		</div>
	</div>

	<!-- Filter & Search Controls -->
	<div class="rounded-2xl bg-white border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
		<div class="relative flex-1 max-w-md">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
				<Search class="size-4" />
			</div>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Cari kejuaraan, nama peraih, penyelenggara..."
				class="w-full rounded-xl border border-slate-200 pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			/>
		</div>

		<div class="flex items-center gap-2.5 flex-wrap">
			<!-- Filter Level -->
			<div class="flex items-center gap-1.5 text-xs text-slate-500">
				<Filter class="size-3.5 text-slate-400" />
				<select
					bind:value={selectedLevel}
					class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
				>
					<option value="all">Semua Tingkat</option>
					<option value="Internasional">Internasional</option>
					<option value="Nasional">Nasional</option>
					<option value="Provinsi">Provinsi</option>
					<option value="Kabupaten/Kota">Kabupaten/Kota</option>
				</select>
			</div>

			<!-- Filter Year -->
			<div class="flex items-center gap-1.5 text-xs text-slate-500">
				<Calendar class="size-3.5 text-slate-400" />
				<select
					bind:value={selectedYear}
					class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
				>
					<option value="all">Semua Tahun</option>
					{#each availableYears as yr}
						<option value={yr}>{yr}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- Achievements Table -->
	<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse text-sm">
				<thead>
					<tr class="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-xs font-semibold uppercase tracking-wider">
						<th class="py-3.5 pl-6 pr-3">Juara & Prestasi</th>
						<th class="py-3.5 px-3">Penerima / Santri</th>
						<th class="py-3.5 px-3">Tingkat</th>
						<th class="py-3.5 px-3">Bidang</th>
						<th class="py-3.5 px-3 text-center">Tahun</th>
						<th class="py-3.5 pl-3 pr-6 text-right">Aksi</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					{#each filteredAchievements as item}
						<tr class="hover:bg-slate-50/60 transition-colors">
							<td class="py-4 pl-6 pr-3">
								<div class="flex items-start gap-3">
									<div class="size-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
										<Trophy class="size-4.5" />
									</div>
									<div class="min-w-0">
										<p class="font-bold text-slate-900 leading-snug">{item.title}</p>
										<p class="text-xs text-slate-500 mt-0.5">{item.organizer}</p>
									</div>
								</div>
							</td>
							<td class="py-4 px-3">
								<div class="text-xs font-semibold text-slate-800">{item.winner}</div>
								<div class="text-[11px] text-slate-500">{item.role || 'Siswa'}</div>
							</td>
							<td class="py-4 px-3">
								<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
									{item.level === 'Internasional'
										? 'bg-purple-50 text-purple-700 border border-purple-200'
										: item.level === 'Nasional'
											? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
											: 'bg-blue-50 text-blue-700 border border-blue-200'}">
									{item.level}
								</span>
							</td>
							<td class="py-4 px-3 text-xs text-slate-600 font-medium">
								{item.category} ({item.scope})
							</td>
							<td class="py-4 px-3 text-center text-xs font-bold text-slate-700">
								{item.year}
							</td>
							<td class="py-4 pl-3 pr-6 text-right">
								<div class="flex items-center justify-end gap-1.5">
									<a
										href="/prestasi"
										target="_blank"
										rel="noopener noreferrer"
										class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
										title="Lihat Prestasi di Website (Tab Baru)"
									>
										<ExternalLink class="size-4" />
									</a>
									<button
										type="button"
										onclick={() => openEditModal(item)}
										class="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
										title="Edit Prestasi"
									>
										<Edit class="size-4" />
									</button>
									<button
										type="button"
										onclick={() => confirmDelete(item.id, item.title)}
										class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
										title="Hapus Prestasi"
									>
										<Trash2 class="size-4" />
									</button>
								</div>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6" class="py-12 text-center text-slate-500 text-sm">
								Tidak ada data prestasi yang cocok dengan filter yang dipilih.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal Create / Edit Achievement -->
<Modal
	bind:open={modalOpen}
	title={isEditing ? 'Edit Prestasi' : 'Catat Prestasi Baru'}
	description="Masukkan rincian kejuaraan, nama peraih, serta tingkat kompetisi."
	size="xl"
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

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="md:col-span-2">
				<label for="a-title" class="block text-xs font-semibold text-slate-700 mb-1">
					Judul Prestasi / Kejuaraan
				</label>
				<input
					type="text"
					id="a-title"
					name="title"
					bind:value={currentItem.title}
					required
					placeholder="cth: Juara 1 Medali Emas Olimpiade Sains Nasional (OSN) Bidang Fisika"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="a-winner" class="block text-xs font-semibold text-slate-700 mb-1">
					Nama Penerima / Pemenang
				</label>
				<input
					type="text"
					id="a-winner"
					name="winner"
					bind:value={currentItem.winner}
					required
					placeholder="cth: Muhammad Fatih"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="a-role" class="block text-xs font-semibold text-slate-700 mb-1">
					Peran / Kategori Individu
				</label>
				<select
					id="a-role"
					name="role"
					bind:value={currentItem.role}
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
				>
					<option value="Siswa">Siswa</option>
					<option value="Guru">Guru / Pendidik</option>
					<option value="Tim">Tim / Regu</option>
				</select>
			</div>

			<div>
				<label for="a-scope" class="block text-xs font-semibold text-slate-700 mb-1">
					Bidang (Akademik / Non-Akademik)
				</label>
				<select
					id="a-scope"
					name="scope"
					bind:value={currentItem.scope}
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
				>
					<option value="Akademik">Akademik</option>
					<option value="Non-Akademik">Non-Akademik</option>
					<option value="Tahfidz & Agama">Tahfidz & Agama</option>
				</select>
			</div>

			<div>
				<label for="a-category" class="block text-xs font-semibold text-slate-700 mb-1">
					Kategori Mata Pelajaran / Lomba
				</label>
				<input
					type="text"
					id="a-category"
					name="category"
					bind:value={currentItem.category}
					required
					placeholder="cth: Sains, Robotik, Tahfidz 30 Juz"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="a-level" class="block text-xs font-semibold text-slate-700 mb-1">
					Tingkat Kejuaraan
				</label>
				<select
					id="a-level"
					name="level"
					bind:value={currentItem.level}
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
				>
					<option value="Internasional">Internasional</option>
					<option value="Nasional">Nasional</option>
					<option value="Provinsi">Provinsi</option>
					<option value="Kabupaten/Kota">Kabupaten/Kota</option>
				</select>
			</div>

			<div>
				<label for="a-year" class="block text-xs font-semibold text-slate-700 mb-1">
					Tahun Peraihan
				</label>
				<input
					type="number"
					id="a-year"
					name="year"
					bind:value={currentItem.year}
					required
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="a-organizer" class="block text-xs font-semibold text-slate-700 mb-1">
					Penyelenggara Kompetisi
				</label>
				<input
					type="text"
					id="a-organizer"
					name="organizer"
					bind:value={currentItem.organizer}
					required
					placeholder="cth: Pusat Prestasi Nasional Kemdikbudristek RI"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="a-desc" class="block text-xs font-semibold text-slate-700 mb-1">
					Keterangan Singkat / Catatan (Opsional)
				</label>
				<textarea
					id="a-desc"
					name="description"
					bind:value={currentItem.description}
					rows="2"
					placeholder="Detail peraihan skor atau babak final..."
					class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				></textarea>
			</div>

			<div class="flex items-center gap-2">
				<input
					type="checkbox"
					id="a-featured"
					name="featured"
					bind:checked={currentItem.featured}
					class="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
				/>
				<label for="a-featured" class="text-xs font-medium text-slate-700">
					Tampilkan di Halaman Utama (Featured)
				</label>
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
					<span>Simpan Prestasi</span>
				{/if}
			</button>
		</div>
	</form>
</Modal>

<!-- Delete Dialog -->
<ConfirmDialog
	bind:open={confirmDeleteOpen}
	title="Hapus Data Prestasi"
	message="Apakah Anda yakin ingin menghapus catatan prestasi ini?"
	itemId={deleteId}
	itemName={deleteTitle}
	actionUrl="?/delete"
/>
