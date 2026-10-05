<script lang="ts">
	import { AlertTriangle, Trash2, Loader2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	interface Props {
		open: boolean;
		title?: string;
		message?: string;
		actionUrl?: string;
		itemId?: string;
		itemName?: string;
		loading?: boolean;
		onconfirm?: () => void;
		oncancel?: () => void;
	}

	let {
		open = $bindable(false),
		title = 'Konfirmasi Hapus Data',
		message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
		actionUrl = '?/delete',
		itemId = '',
		itemName = '',
		loading = $bindable(false),
		onconfirm,
		oncancel
	}: Props = $props();

	function close() {
		open = false;
		if (oncancel) oncancel();
	}
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
			onclick={close}
		></div>

		<!-- Dialog Box -->
		<div
			class="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 animate-in zoom-in-95 duration-200"
			role="alertdialog"
			aria-modal="true"
		>
			<div class="flex items-center gap-3.5 mb-4">
				<div class="rounded-xl bg-rose-100 p-2.5 text-rose-600">
					<AlertTriangle class="size-6" />
				</div>
				<div>
					<h3 class="text-lg font-bold text-slate-900 leading-tight">{title}</h3>
					<p class="text-xs text-slate-500 mt-0.5">Tindakan permanen</p>
				</div>
			</div>

			<p class="text-sm text-slate-600 mb-3 leading-relaxed">
				{message}
			</p>

			{#if itemName}
				<div class="rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-mono text-slate-800 font-semibold mb-5 truncate border border-slate-200/80">
					"{itemName}"
				</div>
			{/if}

			{#if actionUrl && itemId}
				<form
					method="POST"
					action={actionUrl}
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							open = false;
							await update();
						};
					}}
					class="flex items-center justify-end gap-3 mt-4"
				>
					<input type="hidden" name="id" value={itemId} />
					<button
						type="button"
						onclick={close}
						disabled={loading}
						class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50"
					>
						Batal
					</button>
					<button
						type="submit"
						disabled={loading}
						class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-600/25 hover:bg-rose-700 transition-colors disabled:opacity-50"
					>
						{#if loading}
							<Loader2 class="size-4 animate-spin" />
							<span>Menghapus...</span>
						{:else}
							<Trash2 class="size-4" />
							<span>Hapus Data</span>
						{/if}
					</button>
				</form>
			{:else}
				<div class="flex items-center justify-end gap-3 mt-4">
					<button
						type="button"
						onclick={close}
						class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
					>
						Batal
					</button>
					<button
						type="button"
						onclick={() => {
							if (onconfirm) onconfirm();
							open = false;
						}}
						class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-600/25 hover:bg-rose-700 transition-colors"
					>
						<Trash2 class="size-4" />
						<span>Hapus Data</span>
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
