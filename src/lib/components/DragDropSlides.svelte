<script lang="ts">
	import type {
		CreateSlideData,
		Slide,
		UpdateSlideData
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

	export let selectedSlide: Slide;
	export let renderMarkdown: boolean;

	const showId = $page.params.id;
	const flipDurationMs = 300;

	$: console.log($showSlides);

	function handleConsider(event: CustomEvent<DndEvent<Slide>>) {
		showSlides.set(event.detail.items);
	}

	function handleFinalize(event: CustomEvent<DndEvent<Slide>>) {
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
		let newSlide = await addSlideToShow({
			show_id: showId,
			content: "",
			index_number: $showSlides.length
		});

		if (newSlide.slide === null || newSlide.status !== "success") {
			console.log("Error has occured");
		} else if (newSlide.slide) {
			showSlides.update((slides) => [...slides, newSlide.slide as Slide]);
			selectedSlide = $showSlides[$showSlides.length - 1];
			renderMarkdown = false;

			//setting slide index for slideshow starting point
			currentSlideIndex.set($showSlides.length - 1);
		}
	}

	const handleSelectSlide = (slide: Slide) => {
		selectedSlide = slide;

		//setting slide index for slideshow starting point
		let currentSlide = $showSlides.findIndex(
			(slide) => slide.id === selectedSlide.id
		);
		currentSlideIndex.set(currentSlide);
	};

	const deleteSlide = async (slide: Slide) => {
		let removedSlide = await removeSlideFromShow(slide.id, {
			show_id: showId,
			slide_index: slide.index_number
		});
		if (removedSlide.slide === null || removedSlide.status !== "success") {
			console.log("Error has occured");
		} else if (removedSlide.slide) {
			if (selectedSlide === slide) {
				selectedSlide = slide;

				// update currentSlideIndex to the previous slide
				let newCurrentSlide = $showSlides.findIndex(
					(slide) => slide.id === selectedSlide.id
				);
				currentSlideIndex.set(newCurrentSlide === 0 ? 0 : newCurrentSlide - 1);

				showSlides.update((slides) => {
					for (let i = slide.index_number; i < slides.length; i++) {
						slides[i].index_number -= 1;
					}
					return slides.filter((slide) => slide.id !== selectedSlide.id);
				});

				selectedSlide = $showSlides[$currentSlideIndex];
			} else {
				let currentSlide = selectedSlide;
				selectedSlide = slide;

				showSlides.update((slides) => {
					for (let i = slide.index_number; i < slides.length; i++) {
						slides[i].index_number -= 1;
					}
					return slides.filter((slide) => slide.id !== selectedSlide.id);
				});

				// update currentSlideIndex to the current slide
				let newCurrentSlideIndex = $showSlides.findIndex(
					(slide) => slide.id === currentSlide.id
				);
				currentSlideIndex.set(newCurrentSlideIndex);

				selectedSlide = $showSlides[$currentSlideIndex];
			}
			console.log($showSlides);
		}
	};

	// function changeSelectedSlide(i: number) {
	//     /// ADD A CHECK FOR WHETHER THERE IS CONTENT IN THE SLIDE, IF NOT MAKE RENDER MARKDOWN = FALSE
	//     selectedSlide.set(data[i]);
	// }
</script>

<div class="h-full overflow-scroll w-full max-w-[15rem] pr-4">
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
							? "border-color: #eab308; outline-style: solid; outline-width: 2px; outline-offset: -3px; outline-color: #eab308;"
							: "border-color: white;"
					}`}
					class="relative p-2 mb-4 border-[1px] backdrop-blur cursor-pointer border-white rounded-lg aspect-video overflow-hidden"
					on:click={() => handleSelectSlide(slide)}
				>
					<div
						class="prose prose-invert w-full prose-table:w-max scale-[40%] origin-top"
					>
						{@html marked(slide.content)}
					</div>
				</div>
				<div
					class="absolute bottom-0 left-0 w-full flex justify-between items-center"
				>
					<span class="text-xs p-2">
						{$showSlides.findIndex((showSlide) => showSlide.id === slide.id) +
							1}
					</span>
					<button
						class="mr-1 flex hover:text-red-500 transition-colors ease-in-out duration-200"
						on:click={() => deleteSlide(slide)}
					>
						<GoogleIcon iconType="delete" className="text-xl" />
					</button>
				</div>
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
