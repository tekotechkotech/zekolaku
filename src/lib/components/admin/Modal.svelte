<script lang="ts">
	import type { Snippet } from 'svelte';
	import { X } from 'lucide-svelte';

	interface Props {
		open: boolean;
		title?: string;
		description?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'max';
		children?: Snippet;
		footer?: Snippet;
		onclose?: () => void;
	}

	let {
		open = $bindable(false),
		title = '',
		description = '',
		size = 'lg',
		children,
		footer,
		onclose
	}: Props = $props();

	function close() {
		open = false;
		if (onclose) onclose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			close();
		}
	}

	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-3xl',
		'2xl': 'max-w-4xl',
		max: 'max-w-5xl'
	};
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
			onclick={close}
		></div>

		<!-- Modal Card -->
		<div
			class="relative w-full {sizeClasses[size]} my-8 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-200"
			role="dialog"
			aria-modal="true"
		>
			<!-- Header -->
			<div class="flex items-start justify-between border-b border-slate-100 px-6 py-4.5 bg-slate-50/60">
				<div>
					{#if title}
						<h3 class="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
					{/if}
					{#if description}
						<p class="text-xs text-slate-500 mt-0.5">{description}</p>
					{/if}
				</div>
				<button
					type="button"
					onclick={close}
					class="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors -mr-1"
					aria-label="Tutup modal"
				>
					<X class="size-5" />
				</button>
			</div>

			<!-- Body -->
			<div class="overflow-y-auto px-6 py-5 flex-1">
				{@render children?.()}
			</div>

			<!-- Footer -->
			{#if footer}
				<div class="border-t border-slate-100 bg-slate-50/60 px-6 py-3.5 flex justify-end items-center gap-3">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
