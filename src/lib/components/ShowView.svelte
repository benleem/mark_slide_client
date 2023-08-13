<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import type { PageData } from '../../routes/profile/$types';
    import { goto } from '$app/navigation'
    import { convertTime } from "$lib/utils/helpers";

    export let data: PageData
    const shows = writable([]);
    const getShows = async () => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/users/${data.user.id}?favorites=false`, {
            credentials: "include",
            headers: { "Authorization": `Bearer ${data.token}` }
        });
        const responseJson = await response.json();
        console.log(`HERE:::   ${responseJson.data.shows[1].title}`);
        if (responseJson.status === "success") {
            shows.set(responseJson.data.shows); 
        }
    };
   onMount(getShows);
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

   .tile-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

</style>

<section class="grid grid-cols-3 gap-5">
    {#each $shows as show}
        <div>
            <div class="show-tile" on:click={() => goto(`/shows/${show.id}`)}>
                <h1 class="text-center text-black p-10 hover:font-bold">{show.title}</h1>
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
            <ul class="flex flex-row">
                {#if show.public}
                    <li class="material-symbols-outlined">visibility</li>
                {:else}
                    <li class="material-symbols-outlined">visibility_off</li>
                {/if}
                <li>{convertTime(show.created_at)}</li>
                <li>{convertTime(show.updated_at)}</li>
            </ul>
        </div>
    {/each}
</section>
