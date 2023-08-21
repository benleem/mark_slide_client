<script lang="ts">
	import { getAllShows } from '$lib/utils/api/shows';
    import ShowView from '$lib/components/ShowView.svelte'

    const loadingTiles = new Array(12);
</script>

<h1 class="pb-4 text-2xl text-center">Shows</h1>
{#await getAllShows()}
    <section class="mx-auto grid grid-cols-3 gap-8 max-w-5xl">
        {#each loadingTiles as tile,i}
            <div class="h-min aspect-video bg-[#121212] rounded-md animate-pulse">
            </div>
        {/each}
    </section>
{:then shows}
    <ShowView shows={shows.shows}/>
{:catch error}
    <section class="mx-auto grid grid-cols-3 gap-8 h-full max-w-5xl">
            <p>Something went wrong:{error}</p>
    </section>
{/await}