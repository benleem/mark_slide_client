<script lang="ts">
    import type { PageData } from './$types';
    import SlideViewShowHeader from '$lib/components/SlideViewShowHeader.svelte';
    import SlideView from "$lib/components/SlideView.svelte";
	import { slide } from 'svelte/transition';
	import type { Show } from '$lib/models/shows';
	import type { Slide } from '$lib/models/slides';

    export let data: PageData
    const  {user, show, slides} = data
    const currentShow = show.show as Show
    const initialSlides = slides.slides as Slide[]
</script>

<SlideViewShowHeader show={currentShow}/>
{#if initialSlides.length < 0}
    <SlideView slides={initialSlides}/>
{:else}
    <p>This show has no slides</p>    
{/if}


