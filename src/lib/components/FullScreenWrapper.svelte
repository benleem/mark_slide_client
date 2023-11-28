<script lang="ts">
	import screenfull from "screenfull";

	let fullscreenContainer: HTMLElement;

	const toggleFullscreen = () => {
		if (screenfull.isEnabled) {
			screenfull.toggle(fullscreenContainer);
		}
	};
</script>

<div
	class="bg-main-dark overflow-scroll h-full w-full"
	bind:this={fullscreenContainer}
>
	<slot {toggleFullscreen} />
</div>
