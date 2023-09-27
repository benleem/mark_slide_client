<script lang="ts">
    import type { PageData } from './$types';
	import type { Show } from '$lib/models/shows';
	import type { Slide } from '$lib/models/slides';
    import { currentShow } from '$lib/stores/currentShow';
    import SlideViewShowHeader from '$lib/components/SlideViewShowHeader.svelte';
    import SlideView from "$lib/components/SlideView.svelte";

    export let data: PageData
    const  {user, show, slides} = data
    const initialShow = show.show as Show
    currentShow.update(show => initialShow )
    const initialSlides = slides.slides as Slide[]
</script>

<SlideViewShowHeader/>
<SlideView slides={initialSlides}/>




