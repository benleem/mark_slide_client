<script lang="ts">
    import  type { Slide, UpdateSlideData } from "$lib/models/slides";
    import DragDropList from "./DragDropList.svelte";
    import { marked } from 'marked';
    import { writable } from 'svelte/store';
	import { patchSlide } from '$lib/utils/api/slides';
    
    export let slides: Slide[]
    let selectedSlide = slides[0]
    let markdownInputRef : HTMLTextAreaElement
    let markdown : string = selectedSlide && selectedSlide.content ? selectedSlide.content : ""
    let renderMarkdown: boolean = false

    const toggleRenderMarkdown = () => {
        if (markdown === "") {
            return
        }
        renderMarkdown = !renderMarkdown
    }

    // auto focus on text area
    $: if (renderMarkdown === false) {
        markdownInputRef?.focus()
    }

    // update text area height
    $: if (markdownInputRef && markdown) {
        markdownInputRef.style.height = 'auto';
        markdownInputRef.style.height = markdownInputRef.scrollHeight + "px";
    }

    // function clickSlideContent(slide: Slide) {
    //     if (slide.content != "") {
    //         toggleRenderMarkdown();
    //     }
    //     saveChangesToSlide(slide);
    // }

    // async function saveChangesToSlide(slide: Slide) {
    //     let editSlideData: UpdateSlideData = { index_number: slide.index_number, content: slide.content }
    //     await patchSlide(editSlideData, slide.id);    
    // }

    // $: {
    //     console.log("Selected slide content changed:", $selectedSlide.content);
    //     autoResizeTextarea();
    //     if ($selectedSlide.content == "") {
    //         renderMarkdown = false;
    //     } else {
    //         renderMarkdown = true;
    //     }
    // }
</script>

<!-- <section class="flex">
    <div class="flex-none flex-row p-5 inline">
        <DragDropList bind:data={slides} {selectedSlide} />
    </div>
    <div class="w-fit ml-auto p-10 flex-grow justify-end">
        <div class="prose max-w-none w-full" >
        {#if renderMarkdown}
            <div on:dblclick={() => clickSlideContent($selectedSlide)}>
                {@html marked($selectedSlide.content)}
            </div>
        {:else}
            <textarea id="edit-content-area" bind:value={$selectedSlide.content} on:blur={() => clickSlideContent($selectedSlide)} class="block p-2.5 w-full h-full text-md text-gray-900 bg-gray-50 overflow-hidden rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"/>
        {/if}
        </div>
    </div>
</section> -->

<section class="flex">
    {#if renderMarkdown}
        <div class="prose prose-invert max-w-none w-full prose-table:w-max" on:dblclick={() => toggleRenderMarkdown()} role="button" tabindex={0}>
            {@html marked(markdown)}
        </div>
    {:else}
        <textarea bind:this={markdownInputRef} bind:value={markdown} on:blur={() => toggleRenderMarkdown()} placeholder="Enter markdown here" class="block p-2.5 w-full h-full text-md text-gray-900 bg-gray-50 overflow-hidden rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"/>
    {/if}
</section>
