<script lang="ts">
    import screenfull from 'screenfull';

    let fullscreenContainer: HTMLElement

    const toggleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle(fullscreenContainer);
        }
    }
</script>

<div class="bg-[#292929] overflow-scroll" bind:this={fullscreenContainer}>
    <slot {toggleFullscreen}/>
</div>