<script>
	import { onMount } from 'svelte';
	let CustomizerModule, ResizerModule;
	onMount(async () => {
		const Customizer = await import('./Customizer.svelte');
		CustomizerModule = Customizer.default;

		const Resizer = await import('./Resizer.svelte');
		ResizerModule = Resizer.default;
	});
</script>

<!-- <svelte:component this={ResizerModule} /> -->
<svelte:component this={CustomizerModule} />
