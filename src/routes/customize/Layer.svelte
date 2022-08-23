<script>
	import { draggable } from 'svelte-agnostic-draggable';
	import mapTouchToMouseFor from 'svelte-touch-to-mouse';
	mapTouchToMouseFor('.draggable');
	export let width = 200,
		height = 20;
	export let minWidth = 80,
		minHeight = 20;
	let maxWidth = 1000,
		maxHeight = 1000;
	let resizing = false;

	let initialX = 100,
		initialY = 100,
		initialWidth = 0,
		initialHeight = 0;

	let clazz = '';
	let stylez = '';

	export { clazz as class };
	export { stylez as style };

	function onDragMove(Event) {
		if (resizing) {
			width = Math.max(
				minWidth,
				Math.min(maxWidth, initialWidth + (Event.detail.position.left - initialX))
			);
			height = Math.max(
				minHeight,
				Math.min(maxHeight, initialHeight + (Event.detail.position.top - initialY))
			);
		} else {
			initialX = Event.detail.position.left;
			initialWidth = width;
			initialY = Event.detail.position.top;
			initialHeight = height;
			resizing = true;
		}
	}
	function onDragStop() {
		resizing = false;
	}
</script>

<div
	class="Note draggable {clazz}"
	use:draggable={{
		handle: '.Note-Titlebar',
		containment: 'parent',
		cursor: 'grabbing'
	}}
	style=" {stylez}
    width:{width}px; height:{height}px
  "
>
	<div class=" Note-Titlebar">
		<slot />
	</div>
	<div
		class=" Note-ResizeHandle"
		use:draggable={{
			helper: 'clone',
			revert: true
		}}
		on:drag:move={onDragMove}
		on:drag:stop={onDragStop}
	/>
</div>

<style>
	.draggable {
		-webkit-touch-callout: none;
		-ms-touch-action: none;
		touch-action: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.Note {
		display: block;
		position: absolute;
		padding: 40px 0px 0px 0px;
		text-align: center;
	}
	/* 
	.Note {
		display: block;
		position: absolute;
		left: 20px;
		top: 20px;
		width: 200px;
		height: 120px;
		min-width: 200px;
		max-width: 300px;
		min-height: 80px;
		max-height: 300px;
		padding: 40px 0px 0px 0px;
		border: solid 1px lightgray;
		background-color: lightyellow;
		text-align: center;
	} */

	.Note-Titlebar {
		display: block;
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		background-color: palegoldenrod;
		cursor: grab;
	}

	.Note-ResizeHandle {
		display: block;
		position: absolute;
		right: 0px;
		bottom: 0px;
		width: 32px;
		height: 32px;
		background-color: transparent;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAiklEQVRYR+WUwQ3AIAwDm3UzUNZtxQ8hhBpIbGhZIKezsVzkJ4z7ZnaXu6oq/wSorVMMwAHqzNvOQQzQAUY/DWIADjBSXmDSd4AO4FnXb3TAozxlB+gAnsxTDMABVpSH7AAdYEX5mR2IVD5lgA4QmfmUAThApvJXO0AHyFS+ZweQyrsG6ADIzNtbD4OSoCHdTWtaAAAAAElFTkSuQmCC');
		cursor: nwse-resize;
	}

	.Note-ResizeHandle:global(.ui-draggable-helper) {
		visibility: hidden;
	}
</style>
