<script>
	import { draggable } from 'svelte-agnostic-draggable';
	let Width1 = 200,
		Height1 = 20;
	let Width = 200,
		Height = 120;
	let minWidth = 200,
		minHeight = 80;
	let maxWidth = 300,
		maxHeight = 300;

	let resizing = false;
	let initialX, initialY, initialWidth, initialHeight;

	/**** map all touch events to mouse events ****/

	import mapTouchToMouseFor from 'svelte-touch-to-mouse';
	mapTouchToMouseFor('.draggable');

	/**** Svelte Event Handling ****/

	function onDragMove1(Event) {
		if (resizing) {
			Width1 = Math.max(
				minWidth,
				Math.min(maxWidth, initialWidth + (Event.detail.position.left - initialX))
			);
			Height1 = Math.max(
				minHeight,
				Math.min(maxHeight, initialHeight + (Event.detail.position.top - initialY))
			);
		} else {
			initialX = Event.detail.position.left;
			initialWidth = Width1;
			initialY = Event.detail.position.top;
			initialHeight = Height1;
			resizing = true;
		}
	}
	function onDragMove(Event) {
		if (resizing) {
			Width = Math.max(
				minWidth,
				Math.min(maxWidth, initialWidth + (Event.detail.position.left - initialX))
			);
			Height = Math.max(
				minHeight,
				Math.min(maxHeight, initialHeight + (Event.detail.position.top - initialY))
			);
		} else {
			initialX = Event.detail.position.left;
			initialWidth = Width;
			initialY = Event.detail.position.top;
			initialHeight = Height;
			resizing = true;
		}
	}
	function onDragStop() {
		resizing = false;
	}
</script>

<p style="line-height:150%">Drag the note or change its size using the shown handle:</p>

<div
	style="
  display:block; position:relative;
  width:400px; height:400px;
  margin:20px;
  border:solid 1px black
"
>
	<div
		class="Note1 draggable"
		use:draggable={{
			handle: '.Note-Titlebar',
			containment: 'parent',
			cursor: 'grabbing'
		}}
		style="
    width:{Width1}px; height:{Height1}px
  "
	>
		<div class=" Note-Titlebar">welcome text</div>
		<div
			class=" Note-ResizeHandle"
			use:draggable={{
				helper: 'clone',
				revert: true
			}}
			on:drag:move={onDragMove1}
			on:drag:stop={onDragStop}
		/>
	</div>

	<div
		class="Note draggable"
		use:draggable={{
			handle: '.Note-Titlebar',
			containment: 'parent',
			cursor: 'grabbing'
		}}
		style="
    width:{Width}px; height:{Height}px
  "
	>
		<div class=" Note-Titlebar">to web Text</div>
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

	<div
		class="Note draggable"
		use:draggable={{
			handle: '.Note-Titlebar',
			containment: 'parent',
			cursor: 'grabbing'
		}}
		style="
    width:{Width}px; height:{Height}px
  "
	>
		<div class=" Note-Titlebar">
			<img
				src="https://images.pexels.com/photos/12663061/pexels-photo-12663061.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
				alt=""
				width="100%"
				height="100%"
			/>
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

	<div
		class="Note draggable"
		use:draggable={{
			handle: '.Note-Titlebar',
			containment: 'parent',
			cursor: 'grabbing'
		}}
		style="
    width:{Width}px; height:{Height}px
  "
	>
		<div class=" Note-Titlebar">
			<img
				src="https://images.pexels.com/photos/12785681/pexels-photo-12785681.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
				alt=""
				width="100%"
				height="100%"
			/>
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
	.Note1 {
		display: block;
		position: absolute;
		left: 40px;
		top: 280px;
		width: 200px;
		height: 20px;
		min-width: 200px;
		max-width: 300px;
		min-height: 20px;
		max-height: 20px;
		padding: 40px 0px 0px 0px;
		border: solid 1px lightgray;
		background-color: lightyellow;
		text-align: center;
	}

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
	}

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
