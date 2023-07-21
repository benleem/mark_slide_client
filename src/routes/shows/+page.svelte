<script lang="ts">
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    import { goto } from '$app/navigation'
    import type { PageData } from './$types'
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    export let data: PageData
    import ShowViewItem from '$lib/components/ShowViewItem.svelte';

    const shows = writable([]);

    const getShows = async () => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
        const responseJson = await response.json();
        console.log(`this::: ${JSON.stringify(responseJson.data.shows)}`);

        if (responseJson.status === "success") {
            shows.set(responseJson.data.shows); 
        }
    };
   onMount(getShows);
</script>
  
<div class="h-full w-full grid place-items-center">
    <p>{data.text}</p>
    <section class="flex-grid">
        {#each $shows as show}
            <div class="pt-4">
                <ShowViewItem label="Title" value={show.title}/>
                <ShowViewItem label="Description" value={show.description}/>
                <ShowViewItem label="Id" value={show.id}/>
                <ShowViewItem label="Public" value={show.public}/>
                <ShowViewItem label="Created" value={show.created_at}/>
                <ShowViewItem label="Updated" value={show.updated_at}/>
                <button on:click={() => goto(`/shows/${show.id}`)}>CLICK ME</button>
            </div>
        {/each}
    </section>
</div>



