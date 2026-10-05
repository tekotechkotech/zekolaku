<script lang="ts">
	import { toast } from '$lib/admin/toast.svelte';
	import { CheckCircle2, AlertCircle, Info, X } from 'lucide-svelte';
</script>

<div
	class="fixed bottom-5 right-5 z-50 flex max-w-sm w-full flex-col gap-2.5 pointer-events-none px-4 sm:px-0"
	aria-live="polite"
>
	{#each toast.toasts as item (item.id)}
		<div
			class="pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0
			{item.type === 'success'
				? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/20'
				: item.type === 'error'
					? 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-950/20'
					: 'bg-navy-950/90 border-navy-500/40 text-slate-100 shadow-navy-950/20'}"
			role="alert"
		>
			<div class="mt-0.5 shrink-0">
				{#if item.type === 'success'}
					<CheckCircle2 class="size-5 text-emerald-400" />
				{:else if item.type === 'error'}
					<AlertCircle class="size-5 text-rose-400" />
				{:else}
					<Info class="size-5 text-sky-400" />
				{/if}
			</div>

			<div class="flex-1 text-sm">
				{#if item.title}
					<h4 class="font-semibold leading-tight text-white mb-0.5">{item.title}</h4>
				{/if}
				<p class="opacity-90 leading-snug break-words">{item.message}</p>
			</div>

			<button
				type="button"
				class="shrink-0 rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
				onclick={() => toast.remove(item.id)}
				aria-label="Tutup notifikasi"
			>
				<X class="size-4" />
			</button>
		</div>
	{/each}
</div>
