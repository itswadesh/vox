<script lang="ts">
	import '../app.css';
	import Footer from './Footer.svelte';
	import Nav from './Nav.svelte';
</script>

<section class="minimum-width relative flex min-h-screen flex-col bg-white antialiased">
	<div class="h-rem w-full flex-1">
		<Nav />
		<div class="mt-20">
			<slot />
		</div>
	</div>

	<div class="hidden sm:block">
		<Footer />
	</div>
</section>
