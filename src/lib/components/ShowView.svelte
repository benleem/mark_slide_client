<script lang="ts">
    import { convertTime} from "$lib/utils/helpers";
    import type { Show } from "$lib/models/shows";

    import ShowForm from '$lib/components/ShowForm.svelte';
    import ModalContainer from '$lib/components/ModalContainer.svelte';
    
    export let shows: Show[]
    let isModalActive = false
    let mode: "add" | "edit" | "delete" = "add"
    let show: Show = {
        id: "",
        user_id: 0,
        title: "",
        description: "",
        view_code: "",
        public: false,
        created_at: "" as unknown as Date,
        updated_at: "" as unknown as Date,
    }

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
    /* Invisible Icon */
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
    /* Visible Icon */
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

    .material-symbols-outlined {
      font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24,
    }
</style>

<section class="mx-auto grid grid-cols-3 gap-8 max-w-5xl">
    {#each shows as showItem}
        <div class="h-min aspect-video">
            <div class="relative h-full [&>a]:!text-white">
                <a href={`/shows/${showItem.id}`} class="block h-full bg-[#121212] rounded-md group">
                    <h2 class="w-full px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center group-hover:opacity-0 group-hover:ease-in-out duration-200">{showItem.title}</h2>
                    <h2 class="w-full px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 group-hover:ease-in-out duration-200">{showItem.description}</h2>
                </a>
                <div class="absolute right-0 bottom-0 p-2 flex justify-end gap-1">
                    <button 
                        on:click={() => handleModalOpen("edit", showItem)} 
                        class="material-symbols-outlined p-1 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all"
                    >
                        edit
                    </button>
                    <button 
                        on:click={() => handleModalOpen("delete", showItem)} 
                        class="material-symbols-outlined p-1 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all"
                    >
                        delete
                    </button>
                </div>
            </div>
            <div class="pt-0.5 flex justify-between text-gray-300">
                {#if showItem.public}
                    <li class="material-symbols-outlined">visibility</li>
                {:else}
                    <li class="material-symbols-outlined">visibility_off</li>
                {/if}
                <p class="text-sm">Updated: {convertTime(showItem.updated_at, {
                    year: "numeric",
                    month: "numeric",
                    day : "2-digit"
                })}</p>
            </div>  
        </div>
    {/each}
</section>
<ModalContainer bind:modal={isModalActive}>
    <ShowForm mode={mode} show={show} bind:modal={isModalActive}/>
</ModalContainer>
