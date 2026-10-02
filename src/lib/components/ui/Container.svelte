<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
		class?: string;
		children?: Snippet;
	}

	let {
		size = 'xl',
		class: className = '',
		children
	}: Props = $props();

	const sizeStyles = {
		sm: 'max-w-3xl',
		md: 'max-w-5xl',
		lg: 'max-w-6xl',
		xl: 'max-w-7xl',
		full: 'max-w-full'
	};
</script>

<div class="mx-auto w-full px-4 sm:px-6 lg:px-8 {sizeStyles[size]} {className}">
	{#if children}
		{@render children()}
	{/if}
</div>
