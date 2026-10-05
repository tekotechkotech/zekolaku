<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { toast } from '$lib/admin/toast.svelte';
	import Modal from '$lib/components/admin/Modal.svelte';
	import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte';
	import {
		Plus,
		Edit,
		Trash2,
		Newspaper,
		Search,
		Filter,
		Clock,
		User,
		Eye,
		EyeOff,
		Save,
		Loader2,
		Sparkles,
		X,
		Tag,
		ExternalLink
	} from 'lucide-svelte';

	let { data, form } = $props();

	let rawNews = $derived(data.news || []);

	// Filtering & Search
	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let selectedStatus = $state('all');

	let availableCategories = $derived(
		Array.from(new Set(rawNews.map((n: any) => n.category))).filter(Boolean)
	);

	let filteredNews = $derived(
		rawNews.filter((item: any) => {
			const matchSearch =
				searchQuery === '' ||
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.authorName?.toLowerCase().includes(searchQuery.toLowerCase());
			const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
			const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
			return matchSearch && matchCategory && matchStatus;
		})
	);

	// Modal State
	let modalOpen = $state(false);
	let isEditing = $state(false);
	let saving = $state(false);

	// Delete Dialog State
	let confirmDeleteOpen = $state(false);
	let deleteId = $state('');
	let deleteTitle = $state('');

	// Current Article State
	let currentItem = $state({
		id: '',
		title: '',
		slug: '',
		category: 'Prestasi',
		date: new Date().toISOString().split('T')[0],
		authorName: 'Redaksi Humas',
		authorRole: 'Biro Komunikasi & Media',
		authorAvatar: '',
		readTime: '3 menit',
		image: '',
		summary: '',
		content: '',
		tags: ['Pendidikan', 'Madani Global'],
		status: 'published',
		featured: false
	});

	let newTagInput = $state('');

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function handleTitleInput(e: Event) {
		if (!isEditing) {
			currentItem.slug = slugify(currentItem.title);
		}
	}

	function openCreateModal() {
		isEditing = false;
		currentItem = {
			id: '',
			title: '',
			slug: '',
			category: 'Akademik',
			date: new Date().toISOString().split('T')[0],
			authorName: 'Redaksi Humas',
			authorRole: 'Biro Komunikasi & Media',
			authorAvatar: '',
			readTime: '3 menit baca',
			image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200',
			summary: '',
			content: '',
			tags: ['Madani Global', 'Pendidikan Islami'],
			status: 'published',
			featured: false
		};
		newTagInput = '';
		modalOpen = true;
	}

	function openEditModal(article: any) {
		isEditing = true;
		currentItem = {
			id: article.id,
			title: article.title,
			slug: article.slug,
			category: article.category,
			date: article.date,
			authorName: article.authorName,
			authorRole: article.authorRole,
			authorAvatar: article.authorAvatar || '',
			readTime: article.readTime,
			image: article.image,
			summary: article.summary,
			content: Array.isArray(article.content) ? article.content.join('\n\n') : article.content,
			tags: Array.isArray(article.tags) ? [...article.tags] : [],
			status: article.status || 'published',
			featured: Boolean(article.featured)
		};
		newTagInput = '';
		modalOpen = true;
	}

	function addTag() {
		if (newTagInput.trim() && !currentItem.tags.includes(newTagInput.trim())) {
			currentItem.tags.push(newTagInput.trim());
			newTagInput = '';
		}
	}

	function removeTag(idx: number) {
		currentItem.tags.splice(idx, 1);
	}

	function confirmDelete(id: string, title: string) {
		deleteId = id;
		deleteTitle = title;
		confirmDeleteOpen = true;
	}

	// Auto check URL query params for ?action=new or ?edit=
	$effect(() => {
		const actionParam = page.url.searchParams.get('action');
		const editParam = page.url.searchParams.get('edit');
		if (actionParam === 'new') {
			openCreateModal();
		} else if (editParam) {
			const target = rawNews.find((n: any) => n.id === editParam || n.slug === editParam);
			if (target) openEditModal(target);
		}
	});

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Artikel berhasil diperbarui!');
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
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Berita, Warta & Artikel</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Publikasi berita sekolah, liputan prestasi, artikel kepesantrenan, dan pengumuman resmi.
			</p>
		</div>
		<div class="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
			<a
				href="/berita"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors"
				title="Buka kanal berita publik di tab baru"
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
				<span>Tulis Artikel Baru</span>
			</button>
		</div>
	</div>

	<!-- Filter & Search Bar -->
	<div class="rounded-2xl bg-white border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
		<div class="relative flex-1 max-w-md">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
				<Search class="size-4" />
			</div>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Cari judul artikel, topik, atau penulis..."
				class="w-full rounded-xl border border-slate-200 pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			/>
		</div>

		<div class="flex items-center gap-2.5 flex-wrap">
			<!-- Filter Category -->
			<div class="flex items-center gap-1.5 text-xs text-slate-500">
				<Filter class="size-3.5 text-slate-400" />
				<select
					bind:value={selectedCategory}
					class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
				>
					<option value="all">Semua Kategori</option>
					{#each availableCategories as cat}
						<option value={cat}>{cat}</option>
					{/each}
				</select>
			</div>

			<!-- Filter Status -->
			<div class="flex items-center gap-1.5 text-xs text-slate-500">
				<select
					bind:value={selectedStatus}
					class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
				>
					<option value="all">Semua Status</option>
					<option value="published">Published</option>
					<option value="draft">Draft</option>
				</select>
			</div>
		</div>
	</div>

	<!-- News Table -->
	<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse text-sm">
				<thead>
					<tr class="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-xs font-semibold uppercase tracking-wider">
						<th class="py-3.5 pl-6 pr-3">Artikel</th>
						<th class="py-3.5 px-3">Kategori</th>
						<th class="py-3.5 px-3">Penulis</th>
						<th class="py-3.5 px-3 text-center">Status</th>
						<th class="py-3.5 px-3 text-center">Tanggal</th>
						<th class="py-3.5 pl-3 pr-6 text-right">Aksi</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					{#each filteredNews as item}
						<tr class="hover:bg-slate-50/60 transition-colors">
							<td class="py-4 pl-6 pr-3">
								<div class="flex items-center gap-3">
									{#if item.image}
										<img
											src={item.image}
											alt={item.title}
											class="size-12 rounded-xl object-cover border border-slate-200 shrink-0"
										/>
									{:else}
										<div class="size-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
											<Newspaper class="size-5" />
										</div>
									{/if}
									<div class="min-w-0 max-w-md">
										<p class="font-bold text-slate-900 truncate leading-snug">{item.title}</p>
										<p class="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.summary}</p>
									</div>
								</div>
							</td>
							<td class="py-4 px-3 text-xs font-medium text-slate-600">
								{item.category}
							</td>
							<td class="py-4 px-3">
								<div class="text-xs font-semibold text-slate-800">{item.authorName}</div>
								<div class="text-[11px] text-slate-400">{item.readTime}</div>
							</td>
							<td class="py-4 px-3 text-center">
								<!-- Quick Toggle Form -->
								<form method="POST" action="?/toggleStatus" use:enhance class="inline-block">
									<input type="hidden" name="id" value={item.id} />
									<input type="hidden" name="currentStatus" value={item.status} />
									<button
										type="submit"
										class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-transform hover:scale-105
										{item.status === 'published'
											? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
											: 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'}"
										title="Klik untuk ubah status publikasi"
									>
										{#if item.status === 'published'}
											<Eye class="size-3 text-emerald-600" />
											<span>Published</span>
										{:else}
											<EyeOff class="size-3 text-slate-400" />
											<span>Draft</span>
										{/if}
									</button>
								</form>
							</td>
							<td class="py-4 px-3 text-center text-xs text-slate-500 font-mono">
								{item.date}
							</td>
							<td class="py-4 pl-3 pr-6 text-right">
								<div class="flex items-center justify-end gap-1.5">
									<a
										href="/berita/{item.slug}"
										target="_blank"
										rel="noopener noreferrer"
										class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
										title="Lihat Artikel di Website (Tab Baru)"
									>
										<ExternalLink class="size-4" />
									</a>
									<button
										type="button"
										onclick={() => openEditModal(item)}
										class="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
										title="Edit Artikel"
									>
										<Edit class="size-4" />
									</button>
									<button
										type="button"
										onclick={() => confirmDelete(item.id, item.title)}
										class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
										title="Hapus Artikel"
									>
										<Trash2 class="size-4" />
									</button>
								</div>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6" class="py-12 text-center text-slate-500 text-sm">
								Tidak ada artikel yang cocok dengan pencarian / filter.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal Create / Edit News -->
<Modal
	bind:open={modalOpen}
	title={isEditing ? 'Edit Artikel Berita' : 'Tulis Berita Baru'}
	description="Kelola naskah artikel, ringkasan, gambar utama, serta tag kategori."
	size="2xl"
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
		<input type="hidden" name="tags" value={JSON.stringify(currentItem.tags)} />

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="md:col-span-2">
				<label for="n-title" class="block text-xs font-semibold text-slate-700 mb-1">
					Judul Artikel
				</label>
				<input
					type="text"
					id="n-title"
					name="title"
					bind:value={currentItem.title}
					oninput={handleTitleInput}
					required
					placeholder="cth: Santri Madani Global Raih Medali Emas Olimpiade Sains Internasional"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
				/>
			</div>

			<div>
				<label for="n-slug" class="block text-xs font-semibold text-slate-700 mb-1">
					Slug URL (Otomatis)
				</label>
				<input
					type="text"
					id="n-slug"
					name="slug"
					bind:value={currentItem.slug}
					required
					placeholder="santri-madani-global-raih-medali-emas"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
				/>
			</div>

			<div>
				<label for="n-category" class="block text-xs font-semibold text-slate-700 mb-1">
					Kategori
				</label>
				<input
					type="text"
					id="n-category"
					name="category"
					bind:value={currentItem.category}
					required
					placeholder="cth: Prestasi / Akademik / Kepesantrenan"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="n-author" class="block text-xs font-semibold text-slate-700 mb-1">
					Nama Penulis / Redaksi
				</label>
				<input
					type="text"
					id="n-author"
					name="authorName"
					bind:value={currentItem.authorName}
					required
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div>
				<label for="n-readtime" class="block text-xs font-semibold text-slate-700 mb-1">
					Estimasi Waktu Baca
				</label>
				<input
					type="text"
					id="n-readtime"
					name="readTime"
					bind:value={currentItem.readTime}
					required
					placeholder="cth: 3 menit baca"
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="n-image" class="block text-xs font-semibold text-slate-700 mb-1">
					URL Gambar Utama (Cover)
				</label>
				<input
					type="text"
					id="n-image"
					name="image"
					bind:value={currentItem.image}
					required
					placeholder="https://images.unsplash.com/..."
					class="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="n-summary" class="block text-xs font-semibold text-slate-700 mb-1">
					Ringkasan Singkat (Lead Paragraph)
				</label>
				<textarea
					id="n-summary"
					name="summary"
					bind:value={currentItem.summary}
					rows="2"
					required
					placeholder="Ringkasan 1-2 kalimat untuk kartu berita dan meta deskripsi..."
					class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
				></textarea>
			</div>

			<div class="md:col-span-2">
				<label for="n-content" class="block text-xs font-semibold text-slate-700 mb-1">
					Isi Naskah Artikel (Pisahkan paragraf dengan baris kosong)
				</label>
				<textarea
					id="n-content"
					name="content"
					bind:value={currentItem.content}
					rows="8"
					required
					placeholder="Tuliskan naskah lengkap berita di sini. Gunakan spasi ganda antar paragraf..."
					class="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
				></textarea>
			</div>

			<!-- Tags Input -->
			<div class="md:col-span-2 border-t border-slate-100 pt-3">
				<span class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
					Tags & Topik
				</span>
				<div class="flex items-center gap-2 mb-2">
					<input
						type="text"
						bind:value={newTagInput}
						placeholder="Ketik tag lalu tekan enter (cth: OSN, Tahfidz)..."
						onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
						class="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
					/>
					<button
						type="button"
						onclick={addTag}
						class="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
					>
						Tambah Tag
					</button>
				</div>
				<div class="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200/60">
					{#each currentItem.tags as tag, idx}
						<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs">
							<span>#{tag}</span>
							<button type="button" onclick={() => removeTag(idx)} class="text-slate-400 hover:text-rose-600">
								<X class="size-3" />
							</button>
						</span>
					{/each}
				</div>
			</div>

			<!-- Status & Featured -->
			<div class="flex items-center gap-6 pt-2">
				<div class="flex items-center gap-2">
					<label for="n-status" class="text-xs font-semibold text-slate-700">Status:</label>
					<select
						id="n-status"
						name="status"
						bind:value={currentItem.status}
						class="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white"
					>
						<option value="published">Terbit (Published)</option>
						<option value="draft">Draf (Draft)</option>
					</select>
				</div>

				<div class="flex items-center gap-2">
					<input
						type="checkbox"
						id="n-featured"
						name="featured"
						bind:checked={currentItem.featured}
						class="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
					/>
					<label for="n-featured" class="text-xs font-medium text-slate-700">
						Featured di Beranda
					</label>
				</div>
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
					<span>Simpan Artikel</span>
				{/if}
			</button>
		</div>
	</form>
</Modal>

<!-- Delete Dialog -->
<ConfirmDialog
	bind:open={confirmDeleteOpen}
	title="Hapus Artikel"
	message="Apakah Anda yakin ingin menghapus artikel berita ini secara permanen?"
	itemId={deleteId}
	itemName={deleteTitle}
	actionUrl="?/delete"
/>
