<script lang="ts">
	import { marked } from "marked";
	import { showSlides, currentSlideIndex } from "$lib/stores/slides";
	import FullScreenWrapper from "./FullScreenWrapper.svelte";
	import SlideShowNavButton from "./SlideShowNavButton.svelte";
	import { onMount } from "svelte";
	import GoogleIcon from "./GoogleIcon.svelte";
	import { goto } from "$app/navigation";

	export let canEdit: boolean;
	export let toggleViewMode: () => void;

	$: selectedSlide = $showSlides[$currentSlideIndex];

	const previousSlide = () => {
		if ($currentSlideIndex <= 0) {
			currentSlideIndex.set($showSlides.length - 1);
			return;
		}
		currentSlideIndex.update((lastIndex) => lastIndex - 1);
	};

	const nextSlide = () => {
		if ($currentSlideIndex >= $showSlides.length - 1) {
			currentSlideIndex.set(0);
			return;
		}
		currentSlideIndex.update((lastIndex) => lastIndex + 1);
	};
</script>

<section class="flex flex-1 relative w-full">
	{#if $showSlides.length > 0}
		<FullScreenWrapper let:toggleFullscreen>
			<div class="p-4 mx-auto max-w-5xl w-full h-full bg-secondary-dark">
				<div class="max-w-none w-full prose prose-invert overflow-scroll">
					{@html marked(selectedSlide.content)}
				</div>
			</div>
			<div class="w-full p-4 fixed bottom-0 left-0 flex justify-between">
				<div class="flex gap-2">
					<SlideShowNavButton handleClick={() => currentSlideIndex.set(0)}>
						first_page
					</SlideShowNavButton>
					<SlideShowNavButton handleClick={() => previousSlide()}>
						navigate_before
					</SlideShowNavButton>
					<SlideShowNavButton handleClick={() => nextSlide()}>
						navigate_next
					</SlideShowNavButton>
					<SlideShowNavButton
						handleClick={() => currentSlideIndex.set($showSlides.length - 1)}
					>
						last_page
					</SlideShowNavButton>
					<p class="p-1 bg-blue-500 text-white rounded">
						{$currentSlideIndex + 1} / {$showSlides.length}
					</p>
				</div>
				<div class="flex gap-2">
					<SlideShowNavButton handleClick={() => toggleFullscreen()}>
						fullscreen
					</SlideShowNavButton>
					<SlideShowNavButton
						handleClick={() => (canEdit ? toggleViewMode() : goto("/"))}
					>
						close
					</SlideShowNavButton>
				</div>
			</div>
		</FullScreenWrapper>
	{:else}
		<div class="p-2 w-full grid place-items-center">
			<div class="flex items-center">
				{#if canEdit === true}
					<button
						class="flex mr-4 text-blue-500"
						on:click={() => toggleViewMode()}
					>
						<GoogleIcon iconType="arrow_back" />
					</button>
				{/if}
				<h1 class="text-xl">This show has no slides</h1>
			</div>
		</div>
	{/if}
</section>
