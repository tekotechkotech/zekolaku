<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import Modal from '$lib/components/admin/Modal.svelte';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';
	import {
		Plus,
		Edit,
		Trash2,
		GraduationCap,
		Star,
		Sparkles,
		Layers,
		CheckCircle2,
		Save,
		Loader2,
		Eye,
		ExternalLink
	} from 'lucide-svelte';

	let { data, form } = $props();

	let programs = $derived(data.programs || []);

	// Modal states
	let modalOpen = $state(false);
	let isEditing = $state(false);
	let saving = $state(false);

	// Delete confirmation
	let confirmDeleteOpen = $state(false);
	let deleteId = $state('');
	let deleteName = $state('');
	let deleting = $state(false);

	// Form item state
	let currentItem = $state({
		id: '',
		name: '',
		slug: '',
		category: 'Pendidikan Terpadu',
		badge: 'Unggulan',
		description: '',
		image: '',
		featured: false,
		sortOrder: 1,
		competencies: ['Tahfidz minimal 5 Juz mutqin', 'Kecakapan bahasa Arab & Inggris aktif'],
		prospects: ['Perguruan Tinggi Negeri & Timur Tengah', 'Karier Sains dan Teknologi']
	});

	function openCreateModal() {
		isEditing = false;
		currentItem = {
			id: '',
			name: '',
			slug: '',
			category: 'Pendidikan Terpadu',
			badge: 'Unggulan',
			description: '',
			image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200',
			featured: false,
			sortOrder: programs.length + 1,
			competencies: ['Tahfidz Al-Qur’an mutqin', 'Penguasaan sains modern'],
			prospects: ['Universitas terkemuka dunia / PTN', 'Karier profesional']
		};
		modalOpen = true;
	}

	function openEditModal(prog: any) {
		isEditing = true;
		currentItem = {
			id: prog.id,
			name: prog.name,
			slug: prog.slug || prog.id,
			category: prog.category,
			badge: prog.badge,
			description: prog.description,
			image: prog.image,
			featured: Boolean(prog.featured),
			sortOrder: prog.sortOrder ?? 1,
			competencies: Array.isArray(prog.competencies) && prog.competencies.length > 0
				? [...prog.competencies]
				: ['Kecakapan dasar'],
			prospects: Array.isArray(prog.prospects) && prog.prospects.length > 0
				? [...prog.prospects]
				: ['Prospek studi lanjut']
		};
		modalOpen = true;
	}

	function confirmDelete(id: string, name: string) {
		deleteId = id;
		deleteName = name;
		confirmDeleteOpen = true;
	}

	function addCompetency() {
		currentItem.competencies.push('');
	}

	function removeCompetency(index: number) {
		if (currentItem.competencies.length > 1) {
			currentItem.competencies.splice(index, 1);
		}
	}

	function addProspect() {
		currentItem.prospects.push('');
	}

	function removeProspect(index: number) {
		if (currentItem.prospects.length > 1) {
			currentItem.prospects.splice(index, 1);
		}
	}

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Perubahan berhasil disimpan!');
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
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Program Pendidikan & Kurikulum</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Kelola daftar program studi, konsentrasi peminatan, serta kompetensi santri.
			</p>
		</div>
		<div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
			<a
				href="/program"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
				title="Buka halaman program pendidikan di tab baru"
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
				<span>Tambah Program</span>
			</button>
		</div>
	</div>

	<!-- Programs Table / List -->
	<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse text-sm">
				<thead>
					<tr class="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-xs font-semibold uppercase tracking-wider">
						<th class="py-3.5 pl-6 pr-3">Program</th>
						<th class="py-3.5 px-3">Kategori</th>
						<th class="py-3.5 px-3">Badge Label</th>
						<th class="py-3.5 px-3 text-center">Featured</th>
						<th class="py-3.5 px-3 text-center">Urutan</th>
						<th class="py-3.5 pl-3 pr-6 text-right">Aksi</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					{#each programs as item}
						<tr class="hover:bg-slate-50/60 transition-colors">
							<td class="py-4 pl-6 pr-3">
								<div class="flex items-center gap-3">
									{#if item.image}
										<img
											src={item.image}
											alt={item.name}
											class="size-11 rounded-xl object-cover border border-slate-200 shrink-0"
										/>
									{:else}
										<div class="size-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
											<GraduationCap class="size-5" />
										</div>
									{/if}
									<div class="min-w-0">
										<p class="font-bold text-slate-900 truncate">{item.name}</p>
										<p class="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
									</div>
								</div>
							</td>
							<td class="py-4 px-3 text-xs font-medium text-slate-600">
								{item.category}
							</td>
							<td class="py-4 px-3">
								<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
									{item.badge}
								</span>
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
							<td class="py-4 px-3 text-center text-xs font-mono font-medium text-slate-500">
								{item.sortOrder}
							</td>
							<td class="py-4 pl-3 pr-6 text-right">
								<div class="flex items-center justify-end gap-1.5">
									<a
										href="/program#{item.id}"
										target="_blank"
										rel="noopener noreferrer"
										class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
										title="Lihat Program di Website (Tab Baru)"
									>
										<ExternalLink class="size-4" />
									</a>
									<button
										type="button"
										onclick={() => openEditModal(item)}
										class="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
										title="Edit Program"
									>
										<Edit class="size-4" />
									</button>
									<button
										type="button"
										onclick={() => confirmDelete(item.id, item.name)}
										class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
										title="Hapus Program"
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
</div>

<!-- Modal Create / Edit Program -->
<Modal
	bind:open={modalOpen}
	title={isEditing ? 'Edit Program Pendidikan' : 'Tambah Program Pendidikan Baru'}
	description="Konfigurasi rincian program, foto sampul, dan capaian kompetensi."
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
		class="space-y-4.5"
	>
		<input type="hidden" name="id" value={currentItem.id} />
		<input type="hidden" name="competencies" value={JSON.stringify(currentItem.competencies.filter(c => c.trim().length > 0))} />
		<input type="hidden" name="prospects" value={JSON.stringify(currentItem.prospects.filter(p => p.trim().length > 0))} />

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label for="p-name" class="block text-xs font-semibold text-slate-700 mb-1">
					Nama Program
				</label>
				<input
					type="text"
					id="p-name"
					name="name"
					bind:value={currentItem.name}
					required
					placeholder="cth: Kelas Unggulan Tahfidz & Sains"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="p-category" class="block text-xs font-semibold text-slate-700 mb-1">
					Kategori
				</label>
				<input
					type="text"
					id="p-category"
					name="category"
					bind:value={currentItem.category}
					required
					placeholder="cth: Kepesantrenan & Akademik"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="p-badge" class="block text-xs font-semibold text-slate-700 mb-1">
					Badge / Label
				</label>
				<input
					type="text"
					id="p-badge"
					name="badge"
					bind:value={currentItem.badge}
					required
					placeholder="cth: Unggulan / Favorit"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="p-sort" class="block text-xs font-semibold text-slate-700 mb-1">
					Nomor Urutan Tampil
				</label>
				<input
					type="number"
					id="p-sort"
					name="sortOrder"
					bind:value={currentItem.sortOrder}
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="p-image" class="block text-xs font-semibold text-slate-700 mb-1">
					URL Foto Sampul
				</label>
				<input
					type="text"
					id="p-image"
					name="image"
					bind:value={currentItem.image}
					required
					placeholder="https://images.unsplash.com/..."
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="p-desc" class="block text-xs font-semibold text-slate-700 mb-1">
					Deskripsi Lengkap Program
				</label>
				<textarea
					id="p-desc"
					name="description"
					bind:value={currentItem.description}
					rows="3"
					required
					placeholder="Deskripsi singkat kurikulum dan tujuan program..."
					class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				></textarea>
			</div>

			<div class="md:col-span-2 flex items-center gap-2 pt-1">
				<input
					type="checkbox"
					id="p-featured"
					name="featured"
					bind:checked={currentItem.featured}
					class="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
				/>
				<label for="p-featured" class="text-xs font-medium text-slate-700">
					Tampilkan di Halaman Utama (Featured)
				</label>
			</div>
		</div>

		<!-- Dynamic Competencies -->
		<div class="border-t border-slate-100 pt-3">
			<div class="flex items-center justify-between mb-2">
				<span class="text-xs font-bold uppercase tracking-wider text-slate-700">
					Kompetensi Lulusan (Capaian)
				</span>
				<button
					type="button"
					onclick={addCompetency}
					class="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
				>
					<Plus class="size-3.5" />
					<span>Tambah</span>
				</button>
			</div>
			<div class="space-y-2">
				{#each currentItem.competencies as _, idx}
					<div class="flex items-center gap-2">
						<input
							type="text"
							bind:value={currentItem.competencies[idx]}
							placeholder="Capaian kompetensi..."
							class="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
						<button
							type="button"
							onclick={() => removeCompetency(idx)}
							class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
						>
							<Trash2 class="size-3.5" />
						</button>
					</div>
				{/each}
			</div>
		</div>

		<!-- Dynamic Prospects -->
		<div class="border-t border-slate-100 pt-3">
			<div class="flex items-center justify-between mb-2">
				<span class="text-xs font-bold uppercase tracking-wider text-slate-700">
					Prospek Karir & Studi
				</span>
				<button
					type="button"
					onclick={addProspect}
					class="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
				>
					<Plus class="size-3.5" />
					<span>Tambah</span>
				</button>
			</div>
			<div class="space-y-2">
				{#each currentItem.prospects as _, idx}
					<div class="flex items-center gap-2">
						<input
							type="text"
							bind:value={currentItem.prospects[idx]}
							placeholder="Prospek karir/studi lanjut..."
							class="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
						<button
							type="button"
							onclick={() => removeProspect(idx)}
							class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
						>
							<Trash2 class="size-3.5" />
						</button>
					</div>
				{/each}
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
					<span>Simpan Program</span>
				{/if}
			</button>
		</div>
	</form>
</Modal>

<!-- Delete Confirmation Dialog -->
<ConfirmDialog
	bind:open={confirmDeleteOpen}
	title="Hapus Program Pendidikan"
	message="Apakah Anda yakin ingin menghapus program ini dari daftar kurikulum?"
	itemId={deleteId}
	itemName={deleteName}
	actionUrl="?/delete"
/>
