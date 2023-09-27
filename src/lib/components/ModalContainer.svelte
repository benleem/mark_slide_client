<script lang="ts">
    import { browser } from "$app/environment"
    import { getModalActive } from "$lib/context/modal";
    import ShowForm from "./ShowForm.svelte";

    const modal = getModalActive()

    // disable scrolling
    $: if(browser){
        if ($modal.active === true) {
            window.document.body.style.overflow = "hidden"
        } else {
            window.document.body.style.overflow = "unset"
        }
    }
</script>

{#if $modal.active === true}
    <div class="p-4 z-50 fixed left-0 top-0 grid place-items-center h-full w-full bg-black bg-opacity-40 ">
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="fixed top-0 left-0 h-full w-full"
            on:click={() => $modal = {
                active:false, 
                type:null, 
                data:null
            }}
        />
        <div class="relative max-h-[95%] max-w-md w-full overflow-scroll">
            {#if ($modal.type && $modal.type.includes("show") && $modal.data)}
                <ShowForm mode={$modal.type} show={$modal.data}/>
            {:else}
                <p>This modal type is not handled</p>
            {/if}
        </div>
    </div>
{/if}