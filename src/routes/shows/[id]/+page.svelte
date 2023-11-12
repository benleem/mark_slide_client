<script lang="ts">
	import type { PageData } from "./$types";
	import type { Show } from "$lib/models/shows";
	import type { Slide, TestSlide } from "$lib/models/slides";
	import { page } from "$app/stores";
	import { currentShow } from "$lib/stores/currentShow";
	import { currentSlideIndex, showSlides } from "$lib/stores/slides";
	import SlideViewShowHeader from "$lib/components/SlideViewShowHeader.svelte";
	import SlideView from "$lib/components/SlideView.svelte";
	import SlideShowContainer from "$lib/components/SlideShowContainer.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	export let data: PageData;
	const { user, show, slides } = data;

	const initialShow = show.show as Show;
	currentShow.set(initialShow);

	const initialSlides = slides as TestSlide[];
	showSlides.set(initialSlides);

	currentSlideIndex.set(0);

	$: viewMode = $page.url.searchParams.get("viewMode") === "true";

	const toggleViewMode = () => {
		let searchParams = new URLSearchParams($page.url.searchParams.toString());
		searchParams.set("viewMode", `${!viewMode}`);
		goto(`?${searchParams.toString()}`);
	};
</script>

{#if viewMode === false}
	<SlideViewShowHeader {toggleViewMode} />
	<SlideView />
{:else}
	<SlideShowContainer {toggleViewMode} />
{/if}
