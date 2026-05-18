<script lang="ts">
	import { Moon, Sun, Zap } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { themeStore } from '$lib/stores/theme.svelte';

	function toggleTheme() {
		themeStore.toggle();
	}
</script>

<Button
	variant="outline"
	size="icon"
	onclick={toggleTheme}
	aria-label="Toggle theme"
	class="transition-all"
>
	{#if themeStore.theme === 'light'}
		<Sun class="h-[1.2rem] w-[1.2rem] text-yellow-500" />
	{:else if themeStore.theme === 'dark'}
		<Moon class="h-[1.2rem] w-[1.2rem] text-blue-400" />
	{:else}
		<Zap class="h-[1.2rem] w-[1.2rem] text-pink-500 animate-pulse" />
	{/if}
</Button>
