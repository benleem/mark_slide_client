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
	import GoogleIcon from "./GoogleIcon.svelte";

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

	const deleteSlide = (slide: TestSlide) => {
		if (selectedSlide === slide) {
			selectedSlide = slide;

			// update currentSlideIndex to the previous slide
			let newCurrentSlide = $showSlides.findIndex(
				(slide) => slide.id === selectedSlide.id
			);
			currentSlideIndex.set(newCurrentSlide === 0 ? 0 : newCurrentSlide - 1);

			showSlides.update((slides) =>
				slides.filter((slide) => slide.id !== selectedSlide.id)
			);

			selectedSlide = $showSlides[$currentSlideIndex];
		} else {
			let currentSlide = selectedSlide;
			selectedSlide = slide;

			showSlides.update((slides) =>
				slides.filter((slide) => slide.id !== selectedSlide.id)
			);

			// update currentSlideIndex to the current slide
			let newCurrentSlideIndex = $showSlides.findIndex(
				(slide) => slide.id === currentSlide.id
			);
			currentSlideIndex.set(newCurrentSlideIndex);

			selectedSlide = $showSlides[$currentSlideIndex];
		}
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
				class="relative"
				role="button"
				tabindex={0}
				aria-label={slide.content}
				animate:flip={{ duration: flipDurationMs }}
			>
				<div
					style={`${
						slide && selectedSlide && slide.id === selectedSlide.id
							? "border-color: #eab308; outline-style: solid; outline-width: 2px; outline-offset: -3px; outline-color: #eab308; "
							: "border-color: white;"
					}`}
					class="relative p-2 mb-2 border-[1px] border-white aspect-video overflow-hidden"
					on:click={() => handleSelectSlide(slide)}
				>
					<div
						class="prose prose-invert w-full prose-table:w-max scale-50 origin-top"
					>
						{@html marked(slide.content)}
					</div>
				</div>
				<button
					class="m-1 absolute bottom-0 right-0 hover:text-red-500 transition-colors ease-in-out duration-200"
					on:click={() => deleteSlide(slide)}
				>
					<GoogleIcon iconType="delete" />
				</button>
			</div>
		{/each}
	</div>
	<button
		class="group w-full p-2 flex justify-center border-dashed border-2 border-white hover:border-blue-500 transition-colors duration-200 ease-in-out"
		on:click={() => createNewSlide()}
	>
		<GoogleIcon
			iconType="add"
			className="text-3xl group-hover:text-blue-500 transition-colors duration-200 ease-in-out"
		/>
	</button>
</div>
