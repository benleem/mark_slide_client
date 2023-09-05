<script lang="ts">
    import  type {CreateSlideData, Slide, DeleteSlideParams, UpdateSlideData } from "$lib/models/slides";
    import DragDropList from "./DragDropList.svelte";
    import { marked } from 'marked';
    import { writable } from 'svelte/store';
	import { addSlideToShow, removeSlideFromShow, patchSlide } from '$lib/utils/api/slides';
    
    export let slides: Slide[]
    let renderMarkdown: boolean = true;

    // let selectedSlide: Slide = slides[0];
    let selectedSlide = writable<Slide>(slides[0]);
    // let selectedSlideContent = writable<string>("");

    // function orderSlides(slides: Slide[]): Slide[] {
    //     const orderedSlides = slides.slice().sort((a, b) => a.index_number - b.index_number);
    //     return orderedSlides;
    // }

    function clickSlideContent(slide: Slide) {
        toggleRenderMarkdown();
        saveChangesToSlide(slide);
    }

    function toggleRenderMarkdown() {
        renderMarkdown = !renderMarkdown
        if (!renderMarkdown) {
            setTimeout(() => {
                    const textarea = document.getElementById('edit-content-area');
                    textarea?.focus();
                    autoResizeTextarea();
                }, 0);
        }

    }

    function autoResizeTextarea() {
        const textarea = document.getElementById('edit-content-area');
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height to auto
            textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the content
        }
    }

    // Listen for input changes in the textarea
    const textarea = document.getElementById('edit-content-area');
    if (textarea) {
        textarea.addEventListener('input', autoResizeTextarea);
    }

    function changeSelectedSlide(i: number) {
        selectedSlide.set(slides[i]);
    }

    async function saveChangesToSlide(slide: Slide) {
        let editSlideData: UpdateSlideData = { index_number: slide.index_number, content: slide.content }
        await patchSlide(editSlideData, slide.id);    
    }

    async function saveChangesToAllSlides(slides: Slide[]) {
        for (const [index, slide] of slides.entries()) {
            let editSlideData: UpdateSlideData = { index_number: index, content: slide.content }
            await patchSlide(editSlideData, slide.id);    
        }
    }

    async function createNewSlide() {
        let createSlideBody: CreateSlideData = {show_id: slides[0].show_id, content: "", index_number: slides.length};
        addSlideToShow(createSlideBody);
    }

    async function deleteSelectedSlide() {
        let slide =  $selectedSlide;
        let deleteSelectedSlideParams: DeleteSlideParams = { id: slide.id, user_id: slide.user_id, show_id: slide.show_id };
        await removeSlideFromShow(deleteSelectedSlideParams);
    }

    $: {
        console.log("Selected slide content changed:", $selectedSlide.content);
        autoResizeTextarea();
    }

</script>

<section>
    <ul class="flex  justify-end place-items-end gap-4 p-5">
        <li>
            <button on:click={async () => await deleteSelectedSlide()}>Remove Current Slide: {$selectedSlide.index_number}</button>
        </li>
        <li>|</li>
        <li>
            <button on:click={async () => await saveChangesToAllSlides(slides)}>Save All</button>
        </li>
    </ul>

    <section class="flex">
        <div class="flex-none flex-row p-5 inline">
            {#if slides.length > 0}
            {#each slides as slide, i}
                <div on:click={() => changeSelectedSlide(i)} class="hover:cursor-pointer hover:text-blue-200">
                    <h1>Slide {i} : {slide.index_number}</h1>
                </div>
            {/each}
                <!-- <DragDropList bind:data={slides}/> -->
            {/if}
            <button on:click={async () => await createNewSlide()}>ADD SLIDE</button>
        </div>

        <div class="w-fit ml-auto p-10 flex-grow justify-end">
            <div class="prose max-w-none w-full" >
            {#if renderMarkdown}
                <div on:dblclick={() => clickSlideContent($selectedSlide)}>
                    {@html marked($selectedSlide.content)}
                </div>

                <!-- {@html marked(mdtest)} -->
            {:else}
                <textarea id="edit-content-area" bind:value={$selectedSlide.content} on:blur={() => clickSlideContent($selectedSlide)} class="block p-2.5 w-full h-full text-md text-gray-900 bg-gray-50 overflow-hidden rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"></textarea>
            {/if}
            </div>
        </div>

    </section>
</section>
