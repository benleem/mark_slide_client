<script lang="ts">
	import type { PageData } from "./$types";
	import type { Show } from "$lib/models/shows";
	import type { Slide } from "$lib/models/slides";
	import { page } from "$app/stores";
	import { currentShow } from "$lib/stores/currentShow";
	import { currentSlideIndex, showSlides } from "$lib/stores/slides";
	import SlideViewShowHeader from "$lib/components/SlideViewShowHeader.svelte";
	import SlideView from "$lib/components/SlideView.svelte";
	import SlideShowContainer from "$lib/components/SlideShowContainer.svelte";
	import { goto } from "$app/navigation";

	export let data: PageData;
	const { show, slides } = data;

	const canEdit: boolean = show.canEdit;
	const initialShow = show.show as Show;
	currentShow.set(initialShow);

	const initialSlides = slides.slides as Slide[];
	showSlides.set(initialSlides);

	currentSlideIndex.set(0);

	$: viewMode = $page.url.searchParams.get("viewMode") === "true";

	const toggleViewMode = () => {
		let searchParams = new URLSearchParams($page.url.searchParams.toString());
		searchParams.set("viewMode", `${!viewMode}`);
		goto(`?${searchParams.toString()}`, { invalidateAll: false });
	};
</script>

{#if viewMode === false && canEdit === true}
	<SlideViewShowHeader {toggleViewMode} />
	<SlideView />
{:else}
	<SlideShowContainer {canEdit} {toggleViewMode} />
{/if}
