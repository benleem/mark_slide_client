<script lang="ts">
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    import type { PageData } from './$types';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import SlideViewItem from '$lib/components/ShowViewItem.svelte';
    import { marked } from 'marked';

    export let data: PageData

    const slides = writable([]);

    const getSlides = async () => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/slides/${data.slug}`, {
            credentials: "include",
            headers: { "Authorization": `Bearer ${data.token}` }
        });
        const responseJson = await response.json();
        console.log(`this::: ${JSON.stringify(responseJson.data.slides)}`);

        if (responseJson.status === "success") {
            slides.set(responseJson.data.slides); 
        }
    };
   onMount(getSlides);
</script>

<section class="flex-grid">
    {#each $slides as slide}
        <div class="pt-4">
            <SlideViewItem label="ShowID" value={slide.show_id}/>

            {@html marked(slide.content)}
            <!-- <SlideViewItem label="Content" value={slide.content}/> -->
            <SlideViewItem label="Id" value={slide.id}/>
            <SlideViewItem label="UserID" value={slide.user_id}/>
            <SlideViewItem label="Created" value={slide.created_at}/>
            <SlideViewItem label="Updated" value={slide.updated_at}/>
        </div>
    {/each}
</section>
