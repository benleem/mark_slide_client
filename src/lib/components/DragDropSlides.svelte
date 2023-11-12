<script lang="ts">
	import type {
		CreateSlideData,
		Slide,
		DeleteSlideParams,
		UpdateSlideData,
		TestSlide
	} from "$lib/models/slides";
	import { v4 as uuidv4 } from "uuid";
	import { page } from "$app/stores";
	import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import {
		addSlideToShow,
		removeSlideFromShow,
		patchSlide
	} from "$lib/utils/api/slides";
	import { slide } from "svelte/transition";
	import { marked } from "marked";
	import { writable } from "svelte/store";
	import { currentSlideIndex, showSlides } from "$lib/stores/slides";
	import { goto } from "$app/navigation";

	const showId = $page.params.id;
	// export let slides: Slide[];

	// export let selectedSlide: Slide;
	export let selectedSlide: TestSlide;
	export let renderMarkdown: boolean;

	const flipDurationMs = 300;

	function handleConsider(event: CustomEvent<DndEvent<TestSlide>>) {
		showSlides.set(event.detail.items);
	}

	function handleFinalize(event: CustomEvent<DndEvent<TestSlide>>) {
		showSlides.set(event.detail.items);

		//setting slide index for slideshow starting point
		let currentSlide = $showSlides.findIndex(
			(slide) => slide.id === selectedSlide.id
		);
		currentSlideIndex.set(currentSlide);
	}

	// async function saveChangesToSlide(slide: Slide) {
	//     let editSlideData: UpdateSlideData = { index_number: slide.index_number, content: slide.content }
	//     await patchSlide(editSlideData, slide.id);
	// }

	// async function deleteSlide(slide: Slide) {
	//     let deleteSelectedSlideParams: DeleteSlideParams = { id: slide.id, user_id: slide.user_id, show_id: slide.show_id };
	//     await removeSlideFromShow(deleteSelectedSlideParams);
	// }

	async function createNewSlide() {
		let createSlideBody: TestSlide = {
			id: uuidv4(),
			content: "",
			index_number: $showSlides.length
		};
		showSlides.update((slides) => [...slides, createSlideBody]);
		selectedSlide = $showSlides[$showSlides.length - 1];
		renderMarkdown = false;

		//setting slide index for slideshow starting point
		currentSlideIndex.set($showSlides.length - 1);

		// addSlideToShow(createSlideBody);
	}

	const handleSelectSlide = (slide: TestSlide) => {
		selectedSlide = slide;

		//setting slide index for slideshow starting point
		let currentSlide = $showSlides.findIndex(
			(slide) => slide.id === selectedSlide.id
		);
		currentSlideIndex.set(currentSlide);
	};

	// function changeSelectedSlide(i: number) {
	//     /// ADD A CHECK FOR WHETHER THERE IS CONTENT IN THE SLIDE, IF NOT MAKE RENDER MARKDOWN = FALSE
	//     selectedSlide.set(data[i]);
	// }
</script>

<div class="h-full overflow-scroll w-full max-w-xs pr-2">
	<div
		aria-label="Slide List"
		use:dndzone={{
			items: $showSlides,
			flipDurationMs,
			type: "columns",
			dropTargetStyle: {}
		}}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
	>
		{#each $showSlides as slide (slide.id)}
			<div
				role="button"
				tabindex={0}
				aria-label={slide.content}
				animate:flip={{ duration: flipDurationMs }}
				on:click={() => handleSelectSlide(slide)}
			>
				<div
					style={`border-color: ${
						slide && selectedSlide && slide.id === selectedSlide.id
							? "#eab308"
							: "white"
					};`}
					class="p-2 mb-2 border-2 border-white aspect-video overflow-hidden"
				>
					<div
						class="prose prose-invert w-full prose-table:w-max scale-50 origin-top"
					>
						{@html marked(slide.content)}
					</div>
				</div>
			</div>
		{/each}
	</div>
	<button
		class="group w-full p-2 border-dashed border-2 border-white hover:border-blue-500 transition-colors duration-200 ease-in-out"
		on:click={() => createNewSlide()}
	>
		<span
			class="material-symbols-outlined text-3xl group-hover:text-blue-500 transition-colors duration-200 ease-in-out"
		>
			add
		</span>
	</button>
</div>
