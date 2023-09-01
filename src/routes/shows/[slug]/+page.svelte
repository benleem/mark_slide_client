<script lang="ts">
	import { getShowSlides } from '$lib/utils/api/slides';
    import SlideView from "$lib/components/SlideView.svelte";
    import type { PageData } from './$types';

    export let data: PageData

   //  const slides = writable([]);
   //
   //  const getSlides = async () => {
   //      const response = await fetch(`${PUBLIC_API_BASE_URL}/slides/${data.slug}`, {
   //          credentials: "include",
   //          headers: { "Authorization": `Bearer ${data.token}` }
   //      });
   //      const responseJson = await response.json();
   //      console.log(`this::: ${JSON.stringify(responseJson.data.slides)}`);
   //
   //      if (responseJson.status === "success") {
   //          slides.set(responseJson.data.slides); 
   //      }
   //  };
   // onMount(getSlides);
</script>

<section>
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
