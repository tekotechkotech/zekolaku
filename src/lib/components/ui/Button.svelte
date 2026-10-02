<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'emerald' | 'outline' | 'ghost' | 'secondary' | 'amber';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		class?: string;
		target?: string;
		rel?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		disabled = false,
		class: className = '',
		target,
		rel,
		children,
		...rest
	}: Props = $props();

	const variantStyles = {
		primary: 'bg-navy-900 text-white hover:bg-navy-800 shadow-sm border border-navy-800 active:scale-[0.98]',
		emerald: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-700/20 active:scale-[0.98]',
		secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200',
		outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-50 active:scale-[0.98]',
		ghost: 'text-slate-700 hover:text-navy-900 hover:bg-slate-100',
		amber: 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm active:scale-[0.98]'
	};

	const sizeStyles = {
		sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
		md: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2',
		lg: 'px-6 py-3.5 text-base font-semibold rounded-xl gap-2.5'
	};
</script>

{#if href}
	<a
		{href}
		{target}
		{rel}
		class="inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 {variantStyles[variant]} {sizeStyles[size]} {className} {disabled ? 'pointer-events-none opacity-50' : ''}"
		{...rest}
	>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button
		{type}
		{disabled}
		class="inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 {variantStyles[variant]} {sizeStyles[size]} {className} {disabled ? 'cursor-not-allowed opacity-50' : ''}"
		{...rest}
	>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}
