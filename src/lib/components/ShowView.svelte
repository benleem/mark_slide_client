<script lang="ts">
    import { convertTime} from "$lib/utils/helpers";
    import type { Show } from "$lib/models/shows";
    import { goto } from '$app/navigation';
    
    export let shows: Show[]
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
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
    }
</style>

<section class="mx-auto grid grid-cols-3 gap-8 max-w-5xl">
    {#each shows as show}
        <div class="h-min aspect-video">
            <button class="relative h-full w-full bg-white rounded-md group" on:click={() => goto(`/shows/${show.id}`)}>
                <p class="w-full px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-black group-hover:opacity-0 group-hover:ease-in-out duration-200">{show.title}</p>
                <p class="w-full px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-black opacity-0 group-hover:opacity-100 group-hover:ease-in-out duration-200">{show.description}</p>
                <div class="absolute right-0 bottom-0 p-2 flex justify-end gap-1">
                    <button class="material-symbols-outlined p-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all">
                        edit
                    </button>
                    <button class="material-symbols-outlined p-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all">
                        delete
                    </button>
                </div>
            </button>
            <div class="pt-0.5 flex justify-between text-gray-300">
                <ul>
                    {#if show.public}
                        <li class="material-symbols-outlined">visibility</li>
                    {:else}
                        <li class="material-symbols-outlined">visibility_off</li>
                    {/if}
                </ul>
                <p class="text-xs">Updated: {convertTime(show.updated_at, {
                    year: "numeric",
                    month: "numeric",
                    day : "2-digit"
                })}</p>
            </div>  
        </div>
    {/each}
</section>
