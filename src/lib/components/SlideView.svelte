<script lang="ts">
    import type { Slide } from "$lib/models/slides";
    import { marked } from 'marked';
    
    export let slides: Slide[]

    let selectedSlideIdx: number = 0;
    let renderMarkdown: boolean = true;

    function toggleRenderMarkdown() {
        renderMarkdown = !renderMarkdown
        
    }

    function changeSelectedSlide(i: number) {
        selectedSlideIdx = i;
    }
</script>


<section class="flex">
    <div class="flex-none flex-row p-5 inline">
        {#each slides as slide, i}
            <div on:click={() => changeSelectedSlide(i)} class="hover:cursor-pointer hover:text-blue-200">
                <h1>{slide.show_id}</h1>
                <p>{slide.user_id}</p>
                <p>{slide.created_at}</p>
                <p>{slide.updated_at}</p>
             </div>
        {/each}
    </div>

    <div class="w-fit ml-auto p-10 flex-grow justify-end">
        <!-- this button  -->
        <button on:click={toggleRenderMarkdown} class="self-end">
            {renderMarkdown ? 'Hide Markdown' : 'Show Markdown'}
        </button>
        {#if renderMarkdown}
            {@html marked(slides[selectedSlideIdx].content)}
        {:else}
            <p>{slides[selectedSlideIdx].content}</p>
        {/if}
    </div>

</section>
