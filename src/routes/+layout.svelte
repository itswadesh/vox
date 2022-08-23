<script lang="ts">
	import '../app.css';
</script>

<div class="flex flex-col  justify-center">
	<div class=" grid grid-cols-5 py-4 bg-gray-100 shadow-lg">
		<h1><a href="/">Voxo</a></h1>
		<a href="/wishlist">Wishlist</a>
		<a href="/customize">Customize</a>
		<a href="/detail">Detail</a>
		<a href="/login">Login</a>
	</div>
	<div class="h-full">
		<slot />
	</div>
	<div class="bg-gray-300">Footer Links</div>
</div>
