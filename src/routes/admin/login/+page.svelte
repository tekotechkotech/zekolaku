<script lang="ts">
	import { enhance } from '$app/forms';
	import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft, Shield } from 'lucide-svelte';

	let { form } = $props();

	let showPassword = $state(false);
	let loading = $state(false);
	let email = $state('');
	let password = $state('');

	$effect(() => {
		if (form?.email) {
			email = form.email;
		}
	});
</script>

<svelte:head>
	<title>Masuk Admin CMS | Madani Global</title>
</svelte:head>

<div class="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-950 overflow-hidden">
	<!-- Background glow accents -->
	<div class="absolute -top-40 -left-40 size-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>
	<div class="absolute -bottom-40 -right-40 size-96 rounded-full bg-navy-600/20 blur-3xl pointer-events-none"></div>

	<!-- Back link to public site -->
	<a
		href="/"
		class="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800"
	>
		<ArrowLeft class="size-4" />
		<span>Kembali ke Website</span>
	</a>

	<!-- Login Card -->
	<div class="relative w-full max-w-md rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
		<!-- School Brand Header -->
		<div class="text-center mb-8">
			<div class="inline-flex size-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 items-center justify-center text-white shadow-xl shadow-emerald-900/40 mb-4 font-black text-2xl tracking-wider ring-4 ring-emerald-500/20">
				MG
			</div>
			<h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Admin CMS Portal</h1>
			<p class="text-xs sm:text-sm text-slate-400 mt-1.5">
				SMA & Pesantren Terpadu Madani Global
			</p>
		</div>

		<!-- Error Alert -->
		{#if form?.error}
			<div class="mb-6 rounded-xl bg-rose-950/80 border border-rose-500/30 p-3.5 text-xs text-rose-300 flex items-center gap-3 animate-in fade-in">
				<Shield class="size-4 text-rose-400 shrink-0" />
				<p class="flex-1 font-medium">{form.error}</p>
			</div>
		{/if}

		<!-- Login Form -->
		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
			class="space-y-4"
		>
			<!-- Email Input -->
			<div>
				<label for="email" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
					Email Administrator
				</label>
				<div class="relative rounded-xl shadow-xs">
					<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
						<Mail class="size-4.5" />
					</div>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={email}
						required
						autocomplete="email"
						placeholder="admin@zekolaku.sch.id"
						class="w-full rounded-xl bg-slate-800/80 border border-slate-700/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
					/>
				</div>
			</div>

			<!-- Password Input -->
			<div>
				<div class="flex items-center justify-between mb-1.5">
					<label for="password" class="block text-xs font-semibold uppercase tracking-wider text-slate-300">
						Kata Sandi
					</label>
				</div>
				<div class="relative rounded-xl shadow-xs">
					<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
						<Lock class="size-4.5" />
					</div>
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						name="password"
						bind:value={password}
						required
						autocomplete="current-password"
						placeholder="••••••••••••"
						class="w-full rounded-xl bg-slate-800/80 border border-slate-700/80 pl-10 pr-11 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
					/>
					<button
						type="button"
						class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
						onclick={() => (showPassword = !showPassword)}
						aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
					>
						{#if showPassword}
							<EyeOff class="size-4" />
						{:else}
							<Eye class="size-4" />
						{/if}
					</button>
				</div>
			</div>

			<!-- Submit Button -->
			<div class="pt-2">
				<button
					type="submit"
					disabled={loading}
					class="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if loading}
						<Loader2 class="size-4 animate-spin" />
						<span>Memverifikasi akun...</span>
					{:else}
						<span>Masuk ke Dashboard</span>
					{/if}
				</button>
			</div>
		</form>

		<!-- Security footer notice -->
		<div class="mt-6 pt-5 border-t border-slate-800 text-center">
			<p class="text-[11px] text-slate-500">
				Area terproteksi khusus pengurus & administrator sistem Madani Global.
			</p>
		</div>
	</div>
</div>
