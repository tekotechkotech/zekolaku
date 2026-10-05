<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import {
		FileSignature,
		Calendar,
		Users,
		Phone,
		DollarSign,
		HelpCircle,
		Save,
		Plus,
		Trash2,
		Loader2,
		Link as LinkIcon,
		Layers,
		ExternalLink
	} from 'lucide-svelte';

	let { data, form } = $props();

	let ppdb = $derived(data.ppdb);

	let saving = $state(false);
	let activeTab = $state<'general' | 'waves' | 'fees' | 'faq'>('general');

	// Editable reactive states
	let waves = $state<any[]>([]);
	let fees = $state<any[]>([]);
	let faq = $state<any[]>([]);

	$effect(() => {
		if (ppdb && waves.length === 0) {
			waves = Array.isArray(ppdb.waves) ? [...ppdb.waves] : [];
			fees = Array.isArray(ppdb.fees) ? [...ppdb.fees] : [];
			faq = Array.isArray(ppdb.faq) ? [...ppdb.faq] : [];
		}
	});

	function addWave() {
		waves.push({
			name: `Gelombang ${waves.length + 1}`,
			period: '1 - 30 Bulan Tahun',
			status: 'Segera Dibuka',
			description: 'Jalur umum & reguler'
		});
	}

	function removeWave(idx: number) {
		waves.splice(idx, 1);
	}

	function addFee() {
		fees.push({
			name: 'Komponen Biaya Baru',
			amount: 'Rp 1.000.000',
			type: 'Pangkal',
			description: 'Keterangan peruntukan biaya'
		});
	}

	function removeFee(idx: number) {
		fees.splice(idx, 1);
	}

	function addFaq() {
		faq.push({
			q: 'Pertanyaan baru seputar PPDB?',
			a: 'Jawaban dan penjelasan rinci untuk calon santri atau orang tua.'
		});
	}

	function removeFaq(idx: number) {
		faq.splice(idx, 1);
	}

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Konfigurasi PPDB berhasil disimpan!');
		} else if (form?.error) {
			toast.error(form.error);
		}
	});
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Penerimaan Peserta Didik Baru (PPDB)</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Kelola status pembukaan pendaftaran santri baru, gelombang seleksi, rincian biaya, dan FAQ.
			</p>
		</div>
		<a
			href="/ppdb"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors self-start sm:self-auto"
			title="Buka halaman informasi PPDB publik di tab baru"
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
		<!-- Hidden JSON inputs -->
		<input type="hidden" name="waves" value={JSON.stringify(waves)} />
		<input type="hidden" name="fees" value={JSON.stringify(fees)} />
		<input type="hidden" name="faq" value={JSON.stringify(faq)} />

		<!-- Tabs Bar -->
		<div class="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
			<button
				type="button"
				onclick={() => (activeTab = 'general')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'general'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<FileSignature class="size-4" />
				<span>Status & Kuota</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'waves')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'waves'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<Layers class="size-4" />
				<span>Gelombang Pendaftaran ({waves.length})</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'fees')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'fees'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<DollarSign class="size-4" />
				<span>Rincian Biaya ({fees.length})</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'faq')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0
				{activeTab === 'faq'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<HelpCircle class="size-4" />
				<span>Tanya Jawab (FAQ) ({faq.length})</span>
			</button>
		</div>

		<!-- TAB 1: General & Quota -->
		{#if activeTab === 'general'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-5 animate-in fade-in">
				<h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
					Status Operasional & Periode PPDB
				</h3>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					<div>
						<label for="p-status" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Status Pendaftaran
						</label>
						<select
							id="p-status"
							name="status"
							defaultValue={ppdb.status}
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
						>
							<option value="Dibuka">Dibuka (Menerima Pendaftaran)</option>
							<option value="Segera Dibuka">Segera Dibuka</option>
							<option value="Ditutup">Ditutup</option>
						</select>
					</div>

					<div>
						<label for="p-year" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Tahun Ajaran
						</label>
						<input
							type="text"
							id="p-year"
							name="academicYear"
							defaultValue={ppdb.academicYear}
							required
							placeholder="cth: 2025/2026"
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="p-currwave" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Gelombang Aktif
						</label>
						<input
							type="text"
							id="p-currwave"
							name="currentWave"
							defaultValue={ppdb.currentWave}
							required
							placeholder="cth: Gelombang 1 (Early Bird)"
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="p-deadline" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Batas Waktu Pendaftaran
						</label>
						<input
							type="text"
							id="p-deadline"
							name="deadline"
							defaultValue={ppdb.deadline}
							required
							placeholder="cth: 31 Maret 2025"
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="p-quota" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Total Kuota Santri Baru
						</label>
						<input
							type="number"
							id="p-quota"
							name="quotaTotal"
							defaultValue={ppdb.quotaTotal}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="p-wa" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Nomor Konsultasi WhatsApp
						</label>
						<input
							type="text"
							id="p-wa"
							name="consultationWa"
							defaultValue={ppdb.consultationWa}
							required
							placeholder="+62 812-3456-7890"
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div class="md:col-span-2">
						<label for="p-waurl" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Direct Link WhatsApp PPDB
						</label>
						<input
							type="text"
							id="p-waurl"
							name="whatsappUrl"
							defaultValue={ppdb.whatsappUrl}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
						/>
					</div>

					<div>
						<label for="p-regurl" class="block text-xs font-semibold text-slate-700 mb-1.5">
							URL / Formulir Registrasi Online
						</label>
						<input
							type="text"
							id="p-regurl"
							name="registrationUrl"
							defaultValue={ppdb.registrationUrl}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div class="md:col-span-3">
						<label for="p-desc" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Pengumuman / Deskripsi PPDB
						</label>
						<textarea
							id="p-desc"
							name="description"
							rows="3"
							defaultValue={ppdb.description}
							class="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
						></textarea>
					</div>
				</div>
			</div>
		{/if}

		<!-- TAB 2: Waves Editor -->
		{#if activeTab === 'waves'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-4 animate-in fade-in">
				<div class="flex items-center justify-between border-b border-slate-100 pb-3">
					<div>
						<h3 class="text-base font-bold text-slate-900">Jadwal Gelombang Pendaftaran</h3>
						<p class="text-xs text-slate-500">Atur periode dan status masing-masing gelombang pendaftaran.</p>
					</div>
					<button
						type="button"
						onclick={addWave}
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
					>
						<Plus class="size-3.5" />
						<span>Tambah Gelombang</span>
					</button>
				</div>

				<div class="space-y-3">
					{#each waves as wave, idx}
						<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
							<div class="flex-1">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Nama Gelombang</span>
								<input
									type="text"
									bind:value={wave.name}
									placeholder="cth: Gelombang 1"
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
								/>
							</div>
							<div class="flex-1">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Periode Waktu</span>
								<input
									type="text"
									bind:value={wave.period}
									placeholder="cth: 1 Okt - 31 Des 2024"
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
							</div>
							<div class="w-36">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Status</span>
								<select
									bind:value={wave.status}
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								>
									<option value="Dibuka">Dibuka</option>
									<option value="Segera Dibuka">Segera Dibuka</option>
									<option value="Ditutup">Ditutup</option>
								</select>
							</div>
							<div class="flex-1">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Keterangan</span>
								<input
									type="text"
									bind:value={wave.description}
									placeholder="cth: Beasiswa potongan 50%"
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
							</div>
							<div class="sm:pt-4 flex justify-end">
								<button
									type="button"
									onclick={() => removeWave(idx)}
									disabled={waves.length <= 1}
									class="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 disabled:opacity-30"
									title="Hapus gelombang"
								>
									<Trash2 class="size-4" />
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- TAB 3: Fees Editor -->
		{#if activeTab === 'fees'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-4 animate-in fade-in">
				<div class="flex items-center justify-between border-b border-slate-100 pb-3">
					<div>
						<h3 class="text-base font-bold text-slate-900">Rincian Investasi Pendidikan</h3>
						<p class="text-xs text-slate-500">Kelola komponen uang pangkal, SPP syahriah bulanan, seragam, dll.</p>
					</div>
					<button
						type="button"
						onclick={addFee}
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
					>
						<Plus class="size-3.5" />
						<span>Tambah Komponen</span>
					</button>
				</div>

				<div class="space-y-3">
					{#each fees as fee, idx}
						<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
							<div class="flex-1">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Nama Komponen</span>
								<input
									type="text"
									bind:value={fee.name}
									placeholder="cth: Uang Pangkal / Pembangunan"
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
								/>
							</div>
							<div class="w-40">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Nominal</span>
								<input
									type="text"
									bind:value={fee.amount}
									placeholder="cth: Rp 15.000.000"
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-emerald-700 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
							</div>
							<div class="w-32">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Tipe</span>
								<select
									bind:value={fee.type}
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								>
									<option value="Pangkal">Pangkal</option>
									<option value="Bulanan">Bulanan</option>
									<option value="Tahunan">Tahunan</option>
									<option value="Opsional">Opsional</option>
								</select>
							</div>
							<div class="flex-1">
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Keterangan / Rincian</span>
								<input
									type="text"
									bind:value={fee.description}
									placeholder="cth: Termasuk kasur, lemari, fasilitas asrama"
									class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
							</div>
							<div class="sm:pt-4 flex justify-end">
								<button
									type="button"
									onclick={() => removeFee(idx)}
									disabled={fees.length <= 1}
									class="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 disabled:opacity-30"
									title="Hapus biaya"
								>
									<Trash2 class="size-4" />
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- TAB 4: FAQ Editor -->
		{#if activeTab === 'faq'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-4 animate-in fade-in">
				<div class="flex items-center justify-between border-b border-slate-100 pb-3">
					<div>
						<h3 class="text-base font-bold text-slate-900">Tanya Jawab Seputar PPDB</h3>
						<p class="text-xs text-slate-500">Pertanyaan umum dari calon wali santri beserta panduannya.</p>
					</div>
					<button
						type="button"
						onclick={addFaq}
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
					>
						<Plus class="size-3.5" />
						<span>Tambah FAQ</span>
					</button>
				</div>

				<div class="space-y-4">
					{#each faq as item, idx}
						<div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
							<div class="flex items-start justify-between gap-3">
								<div class="flex-1">
									<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Pertanyaan</span>
									<input
										type="text"
										bind:value={item.q}
										placeholder="cth: Apakah tersedia beasiswa prestasi?"
										class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
									/>
								</div>
								<button
									type="button"
									onclick={() => removeFaq(idx)}
									disabled={faq.length <= 1}
									class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 mt-4 disabled:opacity-30"
									title="Hapus FAQ"
								>
									<Trash2 class="size-4" />
								</button>
							</div>
							<div>
								<span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Jawaban Lengkap</span>
								<textarea
									bind:value={item.a}
									rows="2"
									placeholder="Jawaban penjelasan..."
									class="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
								></textarea>
							</div>
						</div>
					{/each}
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
					<span>Menyimpan Konfigurasi...</span>
				{:else}
					<Save class="size-4" />
					<span>Simpan Konfigurasi PPDB</span>
				{/if}
			</button>
		</div>
	</form>
</div>
