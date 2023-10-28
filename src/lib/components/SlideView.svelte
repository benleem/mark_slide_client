<script lang="ts">
	import type { Slide, TestSlide, UpdateSlideData } from "$lib/models/slides";
	import { marked } from "marked";
	import { patchSlide } from "$lib/utils/api/slides";
	import { currentSlideIndex, showSlides } from "$lib/stores/slides";
	import { slide } from "svelte/transition";
	import DragDropSlides from "./DragDropSlides.svelte";
	import { onMount } from "svelte";

	let selectedSlide = $showSlides[$currentSlideIndex] || 0;
	let markdownInputRef: HTMLTextAreaElement;
	// let markdown : string = selectedSlide && selectedSlide.content ? selectedSlide.content : ""
	let renderMarkdown: boolean = false;

	const toggleRenderMarkdown = () => {
		if (selectedSlide.content === "") {
			return;
		}
		renderMarkdown = !renderMarkdown;
	};

	$: if (renderMarkdown === false && selectedSlide) {
		markdownInputRef?.focus();
	}

	$: if (selectedSlide) {
		const updatedSlides = $showSlides.map((slide) => {
			if (slide.id === selectedSlide.id) {
				slide = selectedSlide;
			}
			return slide;
		});
		showSlides.set(updatedSlides);
	}
</script>

<section class="p-2 flex flex-1 overflow-hidden">
	<DragDropSlides bind:selectedSlide bind:renderMarkdown />
	{#if $showSlides.length < 1}
		<div
			class="w-full grid place-items-center border-dashed border-2 border-white"
		>
			<p>This show has no slides</p>
		</div>
	{:else if renderMarkdown}
		<div
			class="prose prose-invert max-w-none w-full prose-table:w-max overflow-scroll"
			role="button"
			tabindex={0}
			on:dblclick={() => toggleRenderMarkdown()}
		>
			{@html marked(selectedSlide.content)}
		</div>
	{:else}
		<textarea
			class="block p-2.5 w-full h-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
			placeholder="Enter markdown here"
			bind:this={markdownInputRef}
			bind:value={selectedSlide.content}
			on:dblclick={() => toggleRenderMarkdown()}
		/>
	{/if}
</section>
