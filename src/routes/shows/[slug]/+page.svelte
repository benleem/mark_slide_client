<script lang="ts">
	import { getShowSlides } from '$lib/utils/api/slides';
	import { getShowById } from '$lib/utils/api/shows';
    import SlideViewShowHeader from '$lib/components/SlideViewShowHeader.svelte';
    import SlideView from "$lib/components/SlideView.svelte";
    import type { PageData } from './$types';

    export let data: PageData

</script>

<style>
    .divider {
        border: none;
        border-top: 2px solid #333;
        margin: 20px 0; 
    }
</style>

<section>
    <header class="p-3">
        {#await getShowById(data.slug)}
            {:then response}
            {#if response != undefined && response.show != null}
                <SlideViewShowHeader show={response.show}/>
            {:else}
                <h1>Problem getting show info</h1>
            {/if}
            {:catch error}
                <p>Something went wrong: {error}</p>
        {/await}
    </header>

    <hr class="divider">

    {#await getShowSlides(data.token, data.slug)}
         <p>Loading</p>
        {:then response}
            {#if response.slides.length == 0}
                <p>No slides</p>
            {:else}
                <SlideView slides={response.slides}/>
            {/if}
        {:catch error}
            <p>Something went wrong: {error}</p>
    {/await}
    <!-- {/each} -->
</section>
