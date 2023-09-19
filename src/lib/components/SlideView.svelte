<script lang="ts">
    import  type { Slide, UpdateSlideData } from "$lib/models/slides";
    import DragDropList from "./DragDropList.svelte";
    import { marked } from 'marked';
    import { writable } from 'svelte/store';
	import { patchSlide } from '$lib/utils/api/slides';
    
    export let slides: Slide[]
    let renderMarkdown: boolean = true;
    let selectedSlide = writable<Slide>(slides[0]);

    function clickSlideContent(slide: Slide) {
        if (slide.content != "") {
            toggleRenderMarkdown();
        }
        saveChangesToSlide(slide);
    }

    async function saveChangesToSlide(slide: Slide) {
        let editSlideData: UpdateSlideData = { index_number: slide.index_number, content: slide.content }
        await patchSlide(editSlideData, slide.id);    
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
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }

    const textarea = document.getElementById('edit-content-area');
    if (textarea) {
        textarea.addEventListener('input', autoResizeTextarea);
    }

    $: {
        console.log("Selected slide content changed:", $selectedSlide.content);
        autoResizeTextarea();
        if ($selectedSlide.content == "") {
            renderMarkdown = false;
        } else {
            renderMarkdown = true;
        }
    }

</script>

<section>
    <section class="flex">
        <div class="flex-none flex-row p-5 inline">
            {#if slides.length > 0}
                <DragDropList bind:data={slides} {selectedSlide} />
            {/if}
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
