<script lang="ts">
	import { schoolData } from '$lib/data/school';
	import { contactData } from '$lib/data/contact';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import {
		MapPin,
		Phone,
		Mail,
		Clock,
		Send,
		MessageSquare,
		CheckCircle2,
		ExternalLink,
		Compass,
		Share2
	} from 'lucide-svelte';

	// Client-side form state using Svelte 5 Runes
	let formSubmitted = $state(false);
	let isSubmitting = $state(false);
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		subject: 'Informasi PPDB & Pendaftaran',
		message: ''
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		// Simulate client-side smooth dispatch
		setTimeout(() => {
			isSubmitting = false;
			formSubmitted = true;
		}, 400);
	}

	function resetForm() {
		formSubmitted = false;
		formData = {
			name: '',
			email: '',
			phone: '',
			subject: 'Informasi PPDB & Pendaftaran',
			message: ''
		};
	}
</script>

<svelte:head>
	<title>Hubungi Kami & Lokasi Kampus - {schoolData.name}</title>
	<meta
		name="description"
		content="Alamat kampus Madani Global di Cimenyan Bandung, nomor WhatsApp layanan panitia, email resmi, formulir kontak online, dan navigasi Google Maps."
	/>
	<link rel="canonical" href="https://madaniglobal.sch.id/kontak" />
	<meta property="og:title" content="Hubungi Kami & Lokasi Kampus - {schoolData.name}" />
	<meta property="og:description" content="Saluran komunikasi resmi, jadwal kunjungan kampus, dan formulir konsultasi PPDB Madani Global." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madaniglobal.sch.id/kontak" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" />
	<meta name="twitter:title" content="Hubungi Kami - {schoolData.name}" />
	<meta name="twitter:description" content="Saluran komunikasi resmi dan jadwal kunjungan kampus Madani Global." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" />
</svelte:head>

<PageHeader
	badge="Kanal Layanan Resmi"
	title="Hubungi Kami & Silaturahmi Kampus"
	description="Sekretariat dan panitia PPDB siap melayani pertanyaan, konsultasi pendaftaran santri baru, serta koordinasi agenda kunjungan orang tua ke kampus."
	currentRouteName="Kontak & Lokasi"
/>

<section class="py-16 sm:py-20 bg-slate-50">
	<Container>
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
			<!-- 1. Contact Information Column (5 cols) -->
			<div class="lg:col-span-5 flex flex-col justify-between">
				<div>
					<Badge variant="emerald" size="md" class="mb-3">Informasi Kontak Terpusat</Badge>
					<h2 class="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight leading-snug">
						Kami Senantiasa Menyambut Silaturahmi Anda
					</h2>
					<p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
						Silakan hubungi kami melalui saluran komunikasi resmi di bawah ini atau jadwalkan kunjungan observasi ke kampus asri kami di perbukitan Cimenyan, Bandung.
					</p>

					<!-- Info Cards List -->
					<div class="mt-8 space-y-4">
						<!-- Alamat -->
						<div class="flex items-start gap-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-xs">
							<div class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
								<MapPin class="size-5" />
							</div>
							<div>
								<h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Alamat Kampus</h4>
								<p class="mt-1 text-xs sm:text-sm font-semibold text-navy-950 leading-relaxed">
									{contactData.fullAddress}
								</p>
							</div>
						</div>

						<!-- Telepon & WhatsApp -->
						<div class="flex items-start gap-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-xs">
							<div class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
								<Phone class="size-5" />
							</div>
							<div>
								<h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Telepon & WhatsApp</h4>
								<div class="mt-1 flex flex-col gap-1">
									<a
										href={contactData.whatsappUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-xs sm:text-sm font-bold text-emerald-700 hover:underline inline-flex items-center gap-1.5"
									>
										<span>{contactData.whatsapp} (WhatsApp Panitia)</span>
										<ExternalLink class="size-3" />
									</a>
									<span class="text-xs text-slate-600 font-medium">{contactData.phone} (Kantor Pusat)</span>
								</div>
							</div>
						</div>

						<!-- Email Resmi -->
						<div class="flex items-start gap-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-xs">
							<div class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
								<Mail class="size-5" />
							</div>
							<div>
								<h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Resmi</h4>
								<p class="mt-1 text-xs sm:text-sm font-semibold text-navy-950">
									<a href="mailto:{contactData.email}" class="hover:text-emerald-700 hover:underline transition-colors">
										{contactData.email}
									</a>
								</p>
							</div>
						</div>

						<!-- Jam Layanan -->
						<div class="flex items-start gap-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-xs">
							<div class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
								<Clock class="size-5" />
							</div>
							<div>
								<h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Jam Layanan Kantor</h4>
								<p class="mt-1 text-xs sm:text-sm font-semibold text-navy-950">
									{contactData.officeHours}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Fast WhatsApp Action Box -->
				<div class="mt-8 rounded-2xl bg-emerald-50/80 p-5 border border-emerald-200 shadow-xs">
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-3">
							<MessageSquare class="size-5 text-emerald-700 shrink-0" />
							<div>
								<div class="text-xs font-bold text-navy-950">Respon Cepat WhatsApp</div>
								<div class="text-[11px] text-slate-600">Aktif setiap hari kerja untuk konsultasi wali santri.</div>
							</div>
						</div>
						<Button
							href={contactData.whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							variant="emerald"
							size="sm"
							class="font-bold shrink-0 text-xs"
						>
							Chat WA
						</Button>
					</div>
				</div>
			</div>

			<!-- 2. Interactive Message Form Column (7 cols) -->
			<div class="lg:col-span-7">
				<Card padding="lg" class="border-slate-200 bg-white shadow-sm">
					<div class="mb-6">
						<div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
							<Send class="size-3.5" />
							<span>Formulir Pesan Online</span>
						</div>
						<h3 class="text-xl sm:text-2xl font-bold text-navy-950">Kirimkan Pertanyaan atau Pesan</h3>
						<p class="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
							Tinggalkan pesan di bawah ini, tim humas kami akan segera menghubungi Anda kembali melalui WhatsApp atau email resmi Anda.
						</p>
					</div>

					{#if formSubmitted}
						<div class="rounded-2xl bg-emerald-50 p-8 text-center border border-emerald-200 animate-in fade-in duration-300">
							<div class="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
								<CheckCircle2 class="size-7" />
							</div>
							<h4 class="mt-4 text-xl font-bold text-navy-950">Pesan Berhasil Terkirim!</h4>
							<p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
								Terima kasih, Bapak/Ibu <strong class="text-navy-950">{formData.name}</strong>. Tim sekretariat Madani Global telah menerima pesan Anda dan akan menghubungi nomor <strong class="text-navy-950">{formData.phone}</strong> segera.
							</p>
							<div class="mt-6">
								<button
									type="button"
									onclick={resetForm}
									class="cursor-pointer inline-flex items-center rounded-xl bg-navy-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-900 transition-colors"
								>
									Kirimkan Pertanyaan Lain
								</button>
							</div>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="space-y-4">
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label for="name" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
										Nama Lengkap Orang Tua / Wali
									</label>
									<input
										id="name"
										type="text"
										required
										bind:value={formData.name}
										placeholder="Contoh: H. Ahmad Subagio"
										class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
									/>
								</div>
								<div>
									<label for="phone" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
										Nomor WhatsApp Aktif
									</label>
									<input
										id="phone"
										type="tel"
										required
										bind:value={formData.phone}
										placeholder="0812-xxxx-xxxx"
										class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
									/>
								</div>
							</div>

							<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
										Alamat Email
									</label>
									<input
										id="email"
										type="email"
										required
										bind:value={formData.email}
										placeholder="email@domain.com"
										class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
									/>
								</div>
								<div>
									<label for="subject" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
										Kategori Keperluan
									</label>
									<select
										id="subject"
										bind:value={formData.subject}
										class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-white"
									>
										<option value="Informasi PPDB & Pendaftaran">Informasi PPDB & Pendaftaran Santri Baru</option>
										<option value="Jadwal Kunjungan Kampus">Jadwal Kunjungan Observasi Kampus</option>
										<option value="Konsultasi Beasiswa Tahfidz">Konsultasi Beasiswa Tahfidz / Sains</option>
										<option value="Kemitraan Lembaga / Wakaf">Kemitraan Lembaga / Wakaf</option>
										<option value="Lainnya">Lainnya</option>
									</select>
								</div>
							</div>

							<div>
								<label for="message" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
									Uraian Pesan / Pertanyaan
								</label>
								<textarea
									id="message"
									rows="4"
									required
									bind:value={formData.message}
									placeholder="Tuliskan pertanyaan Anda mengenai kurikulum, asrama, prosedur pendaftaran, atau jadwal silaturahmi..."
									class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
								></textarea>
							</div>

							<Button
								type="submit"
								variant="emerald"
								size="lg"
								disabled={isSubmitting}
								class="w-full justify-center font-bold shadow-md"
							>
								{#if isSubmitting}
									<span>Mengirimkan Pesan...</span>
								{:else}
									<Send class="size-4" />
									<span>Kirimkan Formulir Pesan</span>
								{/if}
							</Button>
						</form>
					{/if}
				</Card>
			</div>
		</div>

		<!-- 3. Google Maps Embed & Petunjuk Arah Lokasi -->
		<div class="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
			<div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div>
					<div class="flex items-center gap-2">
						<span class="size-2 rounded-full bg-emerald-500"></span>
						<h3 class="text-base sm:text-lg font-bold text-navy-950">Peta Navigasi & Lokasi Kampus</h3>
					</div>
					<p class="mt-1 text-xs text-slate-500">
						Kawasan Cimenyan, Kabupaten Bandung, Jawa Barat (sekitar 25 menit dari Gerbang Tol Pasteur)
					</p>
				</div>
				<a
					href={contactData.googleMapsUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-xl bg-navy-950 px-4 py-2 text-xs font-bold text-white hover:bg-navy-900 transition-colors shrink-0"
				>
					<span>Buka Navigasi di Google Maps</span>
					<ExternalLink class="size-3.5" />
				</a>
			</div>

			<!-- Responsive Iframe Container -->
			<div class="h-96 w-full bg-slate-100 relative">
				<iframe
					title="Peta Lokasi Kampus SMA & Pesantren Terpadu Madani Global"
					src={contactData.googleMapsEmbedUrl}
					width="100%"
					height="100%"
					style="border:0;"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	</Container>
</section>
