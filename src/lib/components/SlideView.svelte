<script lang="ts">
	import type { Slide, TestSlide, UpdateSlideData } from "$lib/models/slides";
	import { marked } from "marked";
	import { patchSlide } from "$lib/utils/api/slides";
	import { currentSlideIndex, showSlides } from "$lib/stores/slides";
	import { slide } from "svelte/transition";
	import DragDropSlides from "./DragDropSlides.svelte";
	import { onMount } from "svelte";
	import MarkDownRenderer from "./MarkDownRenderer.svelte";

	let selectedSlide = $showSlides[$currentSlideIndex] || 0;
	let markdownInputRef: HTMLTextAreaElement;
	// let markdown : string = selectedSlide && selectedSlide.content ? selectedSlide.content : ""
	let renderMarkdown: boolean = false;

	const toggleRenderMarkdown = () => {
		if (selectedSlide.content === "") {
			renderMarkdown = false;
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

<section class="p-4 flex flex-1 overflow-hidden">
	<DragDropSlides bind:selectedSlide bind:renderMarkdown />
	{#if $showSlides.length < 1}
		<div
			class="w-full grid place-items-center border-dashed border-2 border-white"
		>
			<p>This show has no slides</p>
		</div>
	{:else if renderMarkdown}
		<div
			class="w-full h-full bg-secondary-dark rounded-xl px-4 overflow-scroll"
			role="button"
			tabindex={0}
			on:dblclick={() => toggleRenderMarkdown()}
		>
			<div class="py-4">
				<MarkDownRenderer content={selectedSlide.content} />
			</div>
		</div>
	{:else}
		<textarea
			class="block p-2.5 w-full h-full text-md outline-none rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-secondary-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ring-2 resize-none"
			placeholder="Enter markdown here"
			bind:this={markdownInputRef}
			bind:value={selectedSlide.content}
			on:dblclick={() => toggleRenderMarkdown()}
		/>
	{/if}
</section>
