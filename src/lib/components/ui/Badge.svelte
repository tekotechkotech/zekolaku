<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'navy' | 'emerald' | 'amber' | 'blue' | 'slate' | 'outline';
		size?: 'sm' | 'md';
		class?: string;
		children?: Snippet;
	}

	let {
		variant = 'emerald',
		size = 'md',
		class: className = '',
		children
	}: Props = $props();

	const variantStyles = {
		navy: 'bg-navy-900 text-white border border-navy-800',
		emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold',
		amber: 'bg-amber-50 text-amber-700 border border-amber-200 font-semibold',
		blue: 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold',
		slate: 'bg-slate-100 text-slate-700 border border-slate-200',
		outline: 'bg-transparent text-slate-700 border border-slate-300'
	};

	const sizeStyles = {
		sm: 'px-2 py-0.5 text-[11px] rounded-md tracking-wide',
		md: 'px-3 py-1 text-xs rounded-full font-medium'
	};
</script>

<span
	class="inline-flex items-center justify-center gap-1 transition-colors {variantStyles[variant]} {sizeStyles[size]} {className}"
>
	{#if children}
		{@render children()}
	{/if}
</span>
