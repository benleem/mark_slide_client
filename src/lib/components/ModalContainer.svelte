<script lang="ts">
    import { browser } from "$app/environment";

    export let modal: boolean
    
    // disable scrolling
    $: if(browser){
        if (modal === true) {
            window.document.body.style.overflow = "hidden";
        } else {
            window.document.body.style.overflow = "unset";
        }
    } 
</script>

{#if modal === true}
     <div class="p-4 z-50 fixed left-0 top-0 grid place-items-center h-full w-full bg-black bg-opacity-40 ">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="fixed top-0 left-0 h-full w-full"
            on:click={() => modal = false}
        ></div>
        <div class="relative max-h-[95%] max-w-md w-full p-4 overflow-scroll bg-gray-700 rounded-md">
            <slot/>
        </div>
    </div>
{/if}