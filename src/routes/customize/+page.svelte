<script>
	import { onMount } from 'svelte';
	let CustomizerModule;
	onMount(async () => {
		const Customizer = await import('./Customizer.svelte');
		CustomizerModule = Customizer.default;
	});
</script>

<svelte:component this={CustomizerModule} />
