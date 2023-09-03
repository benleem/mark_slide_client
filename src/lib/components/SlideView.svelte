<script lang="ts">
    import  type {CreateSlideData, Slide, DeleteSlideParams, UpdateSlideData } from "$lib/models/slides";
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

    function toggleRenderMarkdown() {
        renderMarkdown = !renderMarkdown
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
    }

</script>


<style>
    .edit-markdown-box {
        width: 100%;
        height: 100%;
        flex: 1;
        outline: none;
        resize: none;
        overflow: auto;
    }
</style>

<section>
    <ul class="flex  justify-end place-items-end gap-4 p-5">
        <li>
            <button on:click={async () => await deleteSelectedSlide()}>Remove Current Slide: {$selectedSlide.index_number}</button>
        </li>
        <li>|</li>
        <li>
            <button on:click={async () => await saveChangesToSlide($selectedSlide)}>Save Selected</button>
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
            {/if}
            <button on:click={async () => await createNewSlide()}>ADD SLIDE</button>
        </div>

        <div class="w-fit ml-auto p-10 flex-grow justify-end">
            <!-- <button on:click={toggleRenderMarkdown} class="self-end"> -->
            <!--     {renderMarkdown ? 'Hide Markdown' : 'Show Markdown'} -->
            <!-- </button> -->
            <div class="prose" on:dblclick={toggleRenderMarkdown}>
            {#if renderMarkdown}
                {@html marked($selectedSlide.content)}
                <!-- {@html marked(mdtest)} -->
            {:else}
                <textarea bind:value={$selectedSlide.content} class="edit-markdown-box text-black"></textarea>
            {/if}
            </div>
        </div>

    </section>
</section>
