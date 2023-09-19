<script lang="ts">
    import type { Show} from "$lib/models/shows";
    import ShowForm from '$lib/components/ShowForm.svelte';
    import ModalContainer from '$lib/components/ModalContainer.svelte';
	import { convertTime } from "$lib/utils/helpers";
    
    export let show: Show;
    let isModalActive = false
    let mode: "add" | "edit" | "delete" = "add"

    const handleModalOpen = (modelMode:"add" | "edit" | "delete", showItem: Show) => {
        isModalActive = true
        mode = modelMode
        show = showItem
    }
</script>

<style>
    /* Edit Icon */
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"); 
    /* Delete Icon */
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
</style>

<section class="bg-blue-600">
    <div class="mx-auto max-w-5xl flex justify-between p-2">
        <div>
            <div class="flex items-end">
                <p class="material-symbols-outlined pr-1">
                    {#if show.public}
                        visibility
                    {:else}
                        visibility_off
                    {/if}
                </p>
                <h1 class="text-lg leading-tight font-semibold pr-2">
                    {show.title}
                </h1>
            </div>
            <p class="pt-1 text-xs text-gray-300">
                Updated: {convertTime(show.updated_at,{
					month: "short",
                    day:"numeric",
					hour: "numeric",
					minute: "numeric"
                })}
            </p>
        </div>
        <div class="flex items-center">
            <p class="text-sm">{show.description}</p>
        </div>
        <div class="flex items-center text-white">
            <button 
                on:click={() => handleModalOpen("edit", show)} 
                class="material-symbols-outlined mx-2 hover:text-yellow-500 transition-colors ease-in-out duration-200"
            >
                edit
            </button>
            <button 
                on:click={() => handleModalOpen("delete", show)} 
                class="material-symbols-outlined hover:text-red-500 transition-colors ease-in-out duration-200"
            >
                delete
            </button>
        </div>
    </div>  
</section>
<ModalContainer bind:modal={isModalActive}>
    <ShowForm mode={mode} show={show} bind:modal={isModalActive}/>
</ModalContainer>

