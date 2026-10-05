<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/admin/toast.svelte';
	import {
		Settings,
		MapPin,
		Phone,
		Mail,
		Clock,
		Share2,
		Save,
		Loader2,
		ExternalLink,
		Compass
	} from 'lucide-svelte';

	let { data, form } = $props();

	let settings = $derived(data.settings);
	let saving = $state(false);
	let activeTab = $state<'contact' | 'socials' | 'maps'>('contact');

	$effect(() => {
		if (form?.success) {
			toast.success(form.message || 'Pengaturan berhasil diperbarui!');
		} else if (form?.error) {
			toast.error(form.error);
		}
	});
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Kontak & Website</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1">
				Kelola informasi kontak resmi lembaga, nomor WhatsApp layanan, tautan media sosial, serta koordinat peta.
			</p>
		</div>
		<a
			href="/kontak"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-emerald-700 transition-colors self-start sm:self-auto"
			title="Buka halaman kontak publik di tab baru"
		>
			<ExternalLink class="size-4 text-emerald-600" />
			<span>Lihat Halaman Publik</span>
		</a>
	</div>

	<!-- Form -->
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
		<!-- Tabs -->
		<div class="flex items-center gap-2 border-b border-slate-200 pb-1">
			<button
				type="button"
				onclick={() => (activeTab = 'contact')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all
				{activeTab === 'contact'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<Phone class="size-4" />
				<span>Kontak & Alamat</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'socials')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all
				{activeTab === 'socials'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<Share2 class="size-4" />
				<span>Media Sosial Resmi</span>
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'maps')}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all
				{activeTab === 'maps'
					? 'bg-emerald-600 text-white shadow-sm'
					: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
			>
				<MapPin class="size-4" />
				<span>Google Maps</span>
			</button>
		</div>

		<!-- TAB 1: Kontak & Alamat -->
		{#if activeTab === 'contact'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-5 animate-in fade-in">
				<h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
					Informasi Kontak & Layanan Publik
				</h3>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div class="md:col-span-2">
						<label for="s-addr" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Alamat Lengkap Sekolah / Kampus
						</label>
						<input
							type="text"
							id="s-addr"
							name="address"
							defaultValue={settings.address}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-city" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Kota / Kabupaten
						</label>
						<input
							type="text"
							id="s-city"
							name="city"
							defaultValue={settings.city}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-prov" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Provinsi
						</label>
						<input
							type="text"
							id="s-prov"
							name="province"
							defaultValue={settings.province}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-post" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Kode Pos
						</label>
						<input
							type="text"
							id="s-post"
							name="postalCode"
							defaultValue={settings.postalCode}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-phone" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Nomor Telepon Kantor
						</label>
						<input
							type="text"
							id="s-phone"
							name="phone"
							defaultValue={settings.phone}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-wa" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Nomor WhatsApp Resmi
						</label>
						<input
							type="text"
							id="s-wa"
							name="whatsapp"
							defaultValue={settings.whatsapp}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-email" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Email Resmi
						</label>
						<input
							type="email"
							id="s-email"
							name="email"
							defaultValue={settings.email}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div class="md:col-span-2">
						<label for="s-hours" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Jam Layanan Kantor / Sekretariat
						</label>
						<input
							type="text"
							id="s-hours"
							name="hours"
							defaultValue={settings.hours}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div class="md:col-span-2">
						<label for="s-waurl" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Link Langsung WhatsApp Chat (Click-to-chat)
						</label>
						<input
							type="text"
							id="s-waurl"
							name="whatsappUrl"
							defaultValue={settings.whatsappUrl}
							required
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>
				</div>
			</div>
		{/if}

		<!-- TAB 2: Media Sosial -->
		{#if activeTab === 'socials'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-5 animate-in fade-in">
				<h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
					Akun Media Sosial Resmi
				</h3>

				<div class="space-y-4">
					<div>
						<label for="s-ig" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Instagram URL
						</label>
						<input
							type="text"
							id="s-ig"
							name="instagram"
							defaultValue={settings.instagram}
							placeholder="https://instagram.com/..."
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-yt" class="block text-xs font-semibold text-slate-700 mb-1.5">
							YouTube Channel URL
						</label>
						<input
							type="text"
							id="s-yt"
							name="youtube"
							defaultValue={settings.youtube}
							placeholder="https://youtube.com/@..."
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-fb" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Facebook Fanpage URL
						</label>
						<input
							type="text"
							id="s-fb"
							name="facebook"
							defaultValue={settings.facebook}
							placeholder="https://facebook.com/..."
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-tiktok" class="block text-xs font-semibold text-slate-700 mb-1.5">
							TikTok Profile URL
						</label>
						<input
							type="text"
							id="s-tiktok"
							name="tiktok"
							defaultValue={settings.tiktok}
							placeholder="https://tiktok.com/@..."
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>
				</div>
			</div>
		{/if}

		<!-- TAB 3: Google Maps -->
		{#if activeTab === 'maps'}
			<div class="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-5 animate-in fade-in">
				<h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
					Integrasi Google Maps
				</h3>

				<div class="space-y-4">
					<div>
						<label for="s-maps-url" class="block text-xs font-semibold text-slate-700 mb-1.5">
							Tautan Google Maps Publik (Share Link)
						</label>
						<input
							type="text"
							id="s-maps-url"
							name="googleMapsUrl"
							defaultValue={settings.googleMapsUrl}
							class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>

					<div>
						<label for="s-maps-embed" class="block text-xs font-semibold text-slate-700 mb-1.5">
							URL Iframe Embed Google Maps
						</label>
						<textarea
							id="s-maps-embed"
							name="googleMapsEmbedUrl"
							rows="3"
							defaultValue={settings.googleMapsEmbedUrl}
							class="w-full rounded-xl border border-slate-200 p-3 text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
						></textarea>
					</div>

					{#if settings.googleMapsEmbedUrl}
						<div class="border border-slate-200 rounded-xl overflow-hidden mt-4">
							<iframe
								src={settings.googleMapsEmbedUrl}
								title="Preview Google Maps"
								width="100%"
								height="260"
								style="border:0;"
								allowfullscreen={false}
								loading="lazy"
							></iframe>
						</div>
					{/if}
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
					<span>Menyimpan Pengaturan...</span>
				{:else}
					<Save class="size-4" />
					<span>Simpan Pengaturan</span>
				{/if}
			</button>
		</div>
	</form>
</div>
