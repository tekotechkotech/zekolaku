<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		hover?: boolean;
		padding?: 'none' | 'sm' | 'md' | 'lg';
		variant?: 'white' | 'slate' | 'navy' | 'emerald';
		class?: string;
		children?: Snippet;
	}

	let {
		hover = false,
		padding = 'md',
		variant = 'white',
		class: className = '',
		children
	}: Props = $props();

	const variantStyles = {
		white: 'bg-white border border-slate-200/80 shadow-xs text-slate-800',
		slate: 'bg-slate-50 border border-slate-200 text-slate-800',
		navy: 'bg-navy-950 border border-navy-800 text-white shadow-md',
		emerald: 'bg-emerald-900 border border-emerald-800 text-white shadow-md'
	};

	const paddingStyles = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};
</script>

<div
	class="rounded-2xl transition-all duration-200 {variantStyles[variant]} {paddingStyles[padding]} {hover ? 'hover:-translate-y-1 hover:shadow-lg' : ''} {className}"
>
	{#if children}
		{@render children()}
	{/if}
</div>
