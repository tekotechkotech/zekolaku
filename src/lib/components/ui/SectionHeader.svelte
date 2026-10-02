<script lang="ts">
	import Badge from './Badge.svelte';

	interface Props {
		badge?: string;
		badgeVariant?: 'navy' | 'emerald' | 'amber';
		title: string;
		description?: string;
		align?: 'center' | 'left';
		light?: boolean;
		class?: string;
	}

	let {
		badge,
		badgeVariant = 'emerald',
		title,
		description,
		align = 'center',
		light = false,
		class: className = ''
	}: Props = $props();
</script>

<div
	class="flex flex-col {align === 'center' ? 'items-center text-center' : 'items-start text-left'} {className}"
>
	{#if badge}
		<div class="mb-3">
			<Badge variant={badgeVariant} size="md">
				{badge}
			</Badge>
		</div>
	{/if}

	<h2
		class="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl {light ? 'text-white' : 'text-slate-900'}"
	>
		{title}
	</h2>

	{#if description}
		<p
			class="mt-3.5 max-w-2xl text-base sm:text-lg leading-relaxed {light ? 'text-slate-300' : 'text-slate-600'}"
		>
			{description}
		</p>
	{/if}
</div>
