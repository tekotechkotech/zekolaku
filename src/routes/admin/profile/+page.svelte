<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import {
		School,
		Compass,
		BookOpen,
		UserCheck,
		Save,
		Plus,
		Trash2,
		Loader2,
		CheckCircle2,
		Image as ImageIcon,
		ExternalLink
	} from 'lucide-svelte';

	let { data, form } = $props();

	let profile = $derived(data.profile);

	// Tabs state
	let activeTab = $state<'identity' | 'vision' | 'history' | 'principal'>('identity');
	let saving = $state(false);

	// Dynamic missions list
	let missions = $state<string[]>([]);

	$effect(() => {
		if (profile?.missions && profile.missions.length > 0 && missions.length === 0) {
			missions = [...profile.missions];
		}
	});

	function addMission() {
		missions.push('');
	}

	function removeMission(index: number) {
		if (missions.length > 1) {
			missions.splice(index, 1);
		}
	}

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Profil berhasil disimpan!');
		} else if (form?.error) {
			toast.error(form.error);
		}
	});
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Profil Lembaga & Sekolah</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Kelola informasi identitas, legalitas, visi misi, serta sambutan pimpinan sekolah.
			</p>
		</div>
		<a
			href="/tentang"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors self-start sm:self-auto"
			title="Buka halaman profil sekolah publik di tab baru"
		>
			<ExternalLink class="size-4 text-emerald-600" />
			<span>Lihat Halaman Publik</span>
		</a>
	</div>

	<!-- Main Form -->
	<form
		method="POST"
		use:enhance={() => {
			saving = true;
			return async ({ update }) => {
				saving = false;
				await update();
			};
		}}
		class="space-y-6"
	>
		<!-- Hidden input for stringified missions -->
		<input type="hidden" name="missions" value={JSON.stringify(missions.filter(m => m.trim().length > 0))} />

		<!-- Tabs Bar -->
		<div class="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
			<button
				type="button"
				onclick={() => (activeTab = 'identity')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'identity'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<School class="size-4" />
				<span>Identitas & Legalitas</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'vision')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'vision'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<Compass class="size-4" />
				<span>Visi & Misi</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'history')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'history'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<BookOpen class="size-4" />
				<span>Sejarah & Nilai</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'principal')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'principal'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<UserCheck class="size-4" />
				<span>Kepala Sekolah</span>
			</button>
		</div>

		<!-- Tab Content: Identitas Sekolah -->
		{#if activeTab === 'identity'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-5 animate-in fade-in">
				<h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
					Identitas Lembaga Pendidikan
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div>
						<label for="name" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Nama Lengkap Sekolah / Lembaga
						</label>
						<input
							type="text"
							id="name"
							name="name"
							defaultValue={profile.name}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="shortName" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Nama Singkat / Brand
						</label>
						<input
							type="text"
							id="shortName"
							name="shortName"
							defaultValue={profile.shortName}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="type" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Tipe / Jenjang Institusi
						</label>
						<input
							type="text"
							id="type"
							name="type"
							defaultValue={profile.type}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="tagline" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Motto / Tagline
						</label>
						<input
							type="text"
							id="tagline"
							name="tagline"
							defaultValue={profile.tagline}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="npsn" class="block text-xs font-semibold text-slate-700 mb-1.5">
							NPSN (Nomor Pokok Sekolah Nasional)
						</label>
						<input
							type="text"
							id="npsn"
							name="npsn"
							defaultValue={profile.npsn}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="nsm" class="block text-xs font-semibold text-slate-700 mb-1.5">
							NSM / Nomor Statistik Madrasah / Pesantren
						</label>
						<input
							type="text"
							id="nsm"
							name="nsm"
							defaultValue={profile.nsm}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="accreditation" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Status Akreditasi
						</label>
						<input
							type="text"
							id="accreditation"
							name="accreditation"
							defaultValue={profile.accreditation}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="establishedYear" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Tahun Berdiri
						</label>
						<input
							type="number"
							id="establishedYear"
							name="establishedYear"
							defaultValue={profile.establishedYear}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>
				</div>
			</div>
		{/if}

		<!-- Tab Content: Visi & Misi -->
		{#if activeTab === 'vision'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-6 animate-in fade-in">
				<div>
					<label for="vision" class="block text-xs font-semibold text-slate-700 mb-1.5">
						Visi Sekolah & Pesantren
					</label>
					<textarea
						id="vision"
						name="vision"
						rows="4"
						defaultValue={profile.vision}
						required
						class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
					></textarea>
				</div>

				<div class="border-t border-slate-100 pt-5">
					<div class="flex items-center justify-between mb-3">
						<div>
							<h4 class="text-sm font-bold text-slate-900">Misi Lembaga</h4>
							<p class="text-xs text-slate-500">Daftar butir misi yang dijalankan institusi</p>
						</div>
						<button
							type="button"
							onclick={addMission}
							class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
						>
							<Plus class="size-3.5" />
							<span>Tambah Misi</span>
						</button>
					</div>

					<div class="space-y-3">
						{#each missions as mission, idx}
							<div class="flex items-start gap-2.5">
								<span class="mt-2.5 size-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
									{idx + 1}
								</span>
								<input
									type="text"
									bind:value={missions[idx]}
									placeholder="Tuliskan butir misi..."
									class="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
								<button
									type="button"
									onclick={() => removeMission(idx)}
									disabled={missions.length <= 1}
									class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
									title="Hapus butir misi"
								>
									<Trash2 class="size-4" />
								</button>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<!-- Tab Content: Sejarah -->
		{#if activeTab === 'history'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-5 animate-in fade-in">
				<h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
					Sejarah Singkat & Nilai Dasar
				</h3>
				<div>
					<label for="historySummary" class="block text-xs font-semibold text-slate-700 mb-1.5">
						Ringkasan Sejarah Berdirinya Sekolah
					</label>
					<textarea
						id="historySummary"
						name="historySummary"
						rows="6"
						defaultValue={profile.historySummary}
						required
						class="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
					></textarea>
				</div>
			</div>
		{/if}

		<!-- Tab Content: Sambutan Kepala Sekolah -->
		{#if activeTab === 'principal'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-5 animate-in fade-in">
				<h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
					Profil & Sambutan Kepala Sekolah
				</h3>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div>
						<label for="principalName" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Nama Kepala Sekolah
						</label>
						<input
							type="text"
							id="principalName"
							name="principalName"
							defaultValue={profile.principalName}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="principalTitle" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Gelar / Jabatan
						</label>
						<input
							type="text"
							id="principalTitle"
							name="principalTitle"
							defaultValue={profile.principalTitle}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div class="md:col-span-2">
						<label for="principalPhoto" class="block text-xs font-semibold text-slate-700 mb-1.5">
							URL Foto Kepala Sekolah
						</label>
						<div class="flex items-center gap-3">
							<input
								type="text"
								id="principalPhoto"
								name="principalPhoto"
								defaultValue={profile.principalPhoto}
								required
								class="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
							/>
							{#if profile.principalPhoto}
								<img
									src={profile.principalPhoto}
									alt="Preview Foto"
									class="size-11 rounded-xl object-cover border border-slate-200 shrink-0"
								/>
							{/if}
						</div>
					</div>

					<div class="md:col-span-2">
						<label for="principalGreeting" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Naskah Sambutan Kepala Sekolah
						</label>
						<textarea
							id="principalGreeting"
							name="principalGreeting"
							rows="5"
							defaultValue={profile.principalGreeting}
							required
							class="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
						></textarea>
					</div>
				</div>
			</div>
		{/if}

		<!-- Submit Action Footer -->
		<div class="flex items-center justify-end gap-3 pt-2">
			<button
				type="submit"
				disabled={saving}
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-500 transition-all disabled:opacity-50"
			>
				{#if saving}
					<Loader2 class="size-4 animate-spin" />
					<span>Menyimpan...</span>
				{:else}
					<Save class="size-4" />
					<span>Simpan Perubahan Profil</span>
				{/if}
			</button>
		</div>
	</form>
</div>
