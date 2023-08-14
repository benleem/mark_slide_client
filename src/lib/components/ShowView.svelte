<script lang="ts">
    import { convertTime, timeSince } from "$lib/utils/helpers";
    import type { Show } from "$lib/models/shows";
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    
    export let shows: writable<Show[]>;
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
   
    .show-tile {
        background-color: white;
        cursor: pointer;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.8s ease-in-out;
    }

    .show-tile:hover {
        border-radius: 12px;
        background-color: red;
    }
</style>

<section class="grid grid-cols-3 gap-5">
    {#each $shows as show}
        <div>
            <div class="show-tile group" on:click={() => goto(`/shows/${show.id}`)}>
                <h1 class="text-center text-black p-10 group-hover:font-bold group-hover:ease-in-out duration-500">{show.title}</h1>
                <h2 class="text-center text-white"> {show.description}</h2>
                <div class="flex justify-end gap-1">
                    <button class="material-symbols-outlined p-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all">
                       edit 
                    </button>
                    <button class="material-symbols-outlined p-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all">
                        delete
                    </button>
                </div>
            </div>
            <ul class="flex flex-row justify-between">
                {#if show.is_public}
                    <li class="material-symbols-outlined">visibility</li>
                {:else}
                    <li class="material-symbols-outlined">visibility_off</li>
                {/if}
                <!-- <li>{(show.created_at)}</li> -->
                <li>last updated {timeSince(show.updated_at)} days ago</li>
            </ul>
        </div>
    {/each}
</section>
