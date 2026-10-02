<script lang="ts">
	import { schoolData, navItems } from '$lib/data/school';
	import Container from '$lib/components/ui/Container.svelte';
	import {
		GraduationCap,
		MapPin,
		Phone,
		Mail,
		Clock,
		ExternalLink
	} from 'lucide-svelte';
</script>

<footer class="mt-auto border-t border-navy-900 bg-navy-950 text-slate-300">
	<!-- Main Footer Content -->
	<div class="py-12 sm:py-16">
		<Container>
			<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
				<!-- Column 1: School Identity (5 cols on lg) -->
				<div class="lg:col-span-4">
					<div class="flex items-center gap-3">
						<div
							class="flex size-11 items-center justify-center rounded-xl bg-navy-900 text-emerald-400 border border-navy-800 shadow-sm"
						>
							<GraduationCap class="size-6 text-emerald-400" />
						</div>
						<div>
							<span class="text-lg font-black tracking-tight text-white">
								MADANI GLOBAL
							</span>
							<p class="text-xs font-semibold text-emerald-400">
								SMA & Pesantren Terpadu
							</p>
						</div>
					</div>

					<p class="mt-4 text-sm leading-relaxed text-slate-300">
						Lembaga pendidikan Islam modern yang mengintegrasikan keimanan, adab Qur'ani, dan keunggulan sains-teknologi untuk melahirkan pemimpin berwawasan global.
					</p>

					<div class="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy-900/90 px-3 py-1.5 border border-navy-800 text-xs">
						<span class="size-2 rounded-full bg-emerald-400"></span>
						<span class="font-medium text-emerald-300">{schoolData.accreditation}</span>
					</div>

					<!-- Social Media Links -->
					<div class="mt-6 flex items-center gap-3 text-xs">
						<a
							href={schoolData.socials.instagram}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Kunjungi Instagram Madani Global (buka tab baru)"
							class="rounded-lg bg-navy-900 px-3 py-1.5 font-medium text-slate-300 transition-colors hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
						>
							Instagram
						</a>
						<a
							href={schoolData.socials.youtube}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Kunjungi YouTube Madani Global (buka tab baru)"
							class="rounded-lg bg-navy-900 px-3 py-1.5 font-medium text-slate-300 transition-colors hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
						>
							YouTube
						</a>
						<a
							href={schoolData.socials.facebook}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Kunjungi Facebook Madani Global (buka tab baru)"
							class="rounded-lg bg-navy-900 px-3 py-1.5 font-medium text-slate-300 transition-colors hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
						>
							Facebook
						</a>
					</div>
				</div>

				<!-- Column 2: Quick Links (2 cols on lg) -->
				<div class="lg:col-span-2">
					<h3 class="text-sm font-bold uppercase tracking-wider text-white">
						Tautan Cepat
					</h3>
					<ul class="mt-4 space-y-2.5 text-sm">
						{#each navItems.slice(0, 5) as item}
							<li>
								<a
									href={item.href}
									class="transition-colors hover:text-emerald-400"
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Column 3: Layanan & Info (2 cols on lg) -->
				<div class="lg:col-span-3">
					<h3 class="text-sm font-bold uppercase tracking-wider text-white">
						Layanan & Informasi
					</h3>
					<ul class="mt-4 space-y-2.5 text-sm">
						<li>
							<a href="/ppdb" class="inline-flex items-center gap-1.5 transition-colors hover:text-emerald-400">
								<span>Penerimaan Santri Baru (PPDB)</span>
								<span class="rounded bg-emerald-600 px-1.5 py-0.2 text-[10px] font-bold text-white">Buka</span>
							</a>
						</li>
						<li>
							<a href="/program" class="transition-colors hover:text-emerald-400">
								Program Beasiswa Tahfidz
							</a>
						</li>
						<li>
							<a href="/kegiatan" class="transition-colors hover:text-emerald-400">
								Agenda & Ekstrakurikuler
							</a>
						</li>
						<li>
							<a href="/berita" class="transition-colors hover:text-emerald-400">
								Berita & Publikasi
							</a>
						</li>
						<li>
							<a href="/kontak" class="transition-colors hover:text-emerald-400">
								Bantuan & FAQ
							</a>
						</li>
					</ul>
				</div>

				<!-- Column 4: Kontak & Kampus (3 cols on lg) -->
				<div class="lg:col-span-3">
					<h3 class="text-sm font-bold uppercase tracking-wider text-white">
						Kontak Kampus
					</h3>
					<ul class="mt-4 space-y-3 text-xs leading-relaxed">
						<li class="flex items-start gap-2.5">
							<MapPin class="mt-0.5 size-4 shrink-0 text-emerald-400" />
							<span>{schoolData.contact.address}, {schoolData.contact.city}, {schoolData.contact.province} {schoolData.contact.postalCode}</span>
						</li>
						<li class="flex items-center gap-2.5">
							<Phone class="size-4 shrink-0 text-emerald-400" />
							<a href="tel:{schoolData.contact.phone}" class="hover:text-emerald-400">
								{schoolData.contact.phone}
							</a>
						</li>
						<li class="flex items-center gap-2.5">
							<Mail class="size-4 shrink-0 text-emerald-400" />
							<a href="mailto:{schoolData.contact.email}" class="hover:text-emerald-400">
								{schoolData.contact.email}
							</a>
						</li>
						<li class="flex items-center gap-2.5">
							<Clock class="size-4 shrink-0 text-emerald-400" />
							<span>{schoolData.contact.hours}</span>
						</li>
					</ul>
				</div>
			</div>
		</Container>
	</div>

	<!-- Sub Footer / Copyright Bar -->
	<div class="border-t border-navy-900/80 bg-navy-950/80 py-6 text-xs text-slate-400">
		<Container>
			<div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
				<p>
					© {new Date().getFullYear()} {schoolData.name}. Seluruh hak cipta dilindungi.
				</p>
				<div class="flex items-center gap-4 text-slate-500">
					<span>NPSN: {schoolData.npsn}</span>
					<span>•</span>
					<span>NSM: {schoolData.nsm}</span>
					<span>•</span>
					<a href="/kontak" class="hover:text-slate-300">Peta Lokasi</a>
				</div>
			</div>
		</Container>
	</div>
</footer>
