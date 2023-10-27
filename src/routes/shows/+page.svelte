<script lang="ts">
    import type { PageData } from './$types';
    import {shows} from "$lib/stores/shows"
    import ShowView from '$lib/components/ShowView.svelte'

    export let data: PageData
    const { initialShows } = data
    shows.update(shows => initialShows.shows)

    // const loadingTiles = new Array(12);
</script>

<section class="mx-auto w-full max-w-5xl">
    <h1 class="pb-4 text-2xl text-center">Shows</h1>
    <ShowView/>
</section>
<!-- {#await getAllShows()}
    <section class="mx-auto grid grid-cols-3 gap-8 max-w-5xl">
        {#each loadingTiles as tile,i}
            <div class="h-min aspect-video bg-[#121212] rounded-md animate-pulse">
            </div>
        {/each}
    </section>
{:then initialShows}
    <ShowView shows={initialShows.shows}/>
{:catch error}
    <section class="mx-auto grid grid-cols-3 gap-8 h-full max-w-5xl">
            <p>Something went wrong:{error}</p>
    </section>
{/await} -->
