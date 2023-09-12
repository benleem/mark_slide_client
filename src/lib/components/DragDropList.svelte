<script lang="ts">
    import { flip } from "svelte/animate";
    import { writable } from 'svelte/store';
	import { addSlideToShow, removeSlideFromShow, patchSlide } from '$lib/utils/api/slides';
    import  type {CreateSlideData, Slide, DeleteSlideParams, UpdateSlideData } from "$lib/models/slides";

    // Define the types for your properties and local variables
    export let data: Slide[] = []; 
    export let removesItems: boolean = true;
    export let selectedSlide = writable<Slide>(undefined);

    let ghost: HTMLDivElement | undefined;
    let grabbed: HTMLDivElement | undefined;

    let lastTarget: HTMLElement | undefined;

    let mouseY: number = 0;
    let offsetY: number = 0;
    let layerY: number = 0;


    async function saveChangesToSlide(slide: Slide) {
        let editSlideData: UpdateSlideData = { index_number: slide.index_number, content: slide.content }
        await patchSlide(editSlideData, slide.id);    
    }

    async function deleteSlide(slide: Slide) {
        let deleteSelectedSlideParams: DeleteSlideParams = { id: slide.id, user_id: slide.user_id, show_id: slide.show_id };
        await removeSlideFromShow(deleteSelectedSlideParams);
    }

    async function createNewSlide() {
        let createSlideBody: CreateSlideData = {show_id: data[0].show_id, content: "", index_number: data.length};
        addSlideToShow(createSlideBody);
    }

    function changeSelectedSlide(i: number) {
        /// ADD A CHECK FOR WHETHER THERE IS CONTENT IN THE SLIDE, IF NOT MAKE RENDER MARKDOWN = FALSE
        selectedSlide.set(data[i]);
    }


    function grab(clientY: number, element: HTMLDivElement) {
        // modify grabbed element
        grabbed = element;
        grabbed.dataset.grabY = clientY.toString();

        // modify ghost element (which is actually dragged)
        ghost.innerHTML = grabbed.innerHTML;

        // record offset from cursor to top of element
        // (used for positioning ghost)
        offsetY = grabbed.getBoundingClientRect().y - clientY;
        drag(clientY);
    }

    function drag(clientY: number) {
        if (grabbed) {
          mouseY = clientY;
          layerY = ghost.parentNode.getBoundingClientRect().y;
        }
    }

    function touchEnter(ev: TouchEvent) {
        drag(ev.touches[0].clientY);
        // trigger dragEnter the first time the cursor moves over a list item
        let target = document.elementFromPoint(ev.touches[0].clientX, ev.touches[0].clientY).closest(".item");
        if (target && target != lastTarget) {
          lastTarget = target;
          dragEnter(ev, target);
        }
    }

    function dragEnter(ev: TouchEvent, target: HTMLElement | null) {
        // swap items in data
        if (grabbed && target && target != grabbed && target.classList.contains("item")) {
          moveDatum(parseInt(grabbed.dataset.index!), parseInt(target.dataset.index!));
        }
    }

    function moveDatum(from: number, to: number) {
        let temp = data[from];
        temp.index_number = to;
        data[to].index_number = from;
        saveChangesToSlide(temp);
        saveChangesToSlide(data[to]);
        data = [...data.slice(0, from), ...data.slice(from + 1)];
        data = [...data.slice(0, to), temp, ...data.slice(to)];
    }

    function release(ev: MouseEvent | TouchEvent) {
        grabbed = undefined;
    }

    function removeDatum(index: number) {
        deleteSlide(data[index]);
        data = [...data.slice(0, index), ...data.slice(index + 1)];
    }
</script>


<style>
    main {
        position: relative;
    }

    .list {
        cursor: grab;
        z-index: 5;
        display: flex;
        flex-direction: column;
        color: black;
    }

    .item {
        box-sizing: border-box;
        display: inline-flex;
        width: 100%;
        min-height: 3em;
        margin-bottom: 0.5em;
        background-color: rgb(140, 140, 140);
        border: 1px solid rgb(140, 140, 140);
        border-radius: 10px;
        user-select: none;
    }

    .item:last-child {
        margin-bottom: 0;
    }

    .item:not(#grabbed):not(#ghost) {
        z-index: 10;
    }

    .item > * {
        margin: auto;
    }

    .buttons {
        width: 32px;
        min-width: 32px;
        margin: auto 0;
        display: flex;
        flex-direction: column;
    }

    .buttons button {
        cursor: pointer;
        width: 18px;
        height: 18px;
        margin: 0 auto;
        padding: 0;
        border: 1px solid rgba(0, 0, 0, 0);
        background-color: inherit;
    }

    .buttons button:focus {
        border: 1px solid black;
    }

    .delete {
        width: 32px;
    }

    #grabbed {
        opacity: 0.0;
    }

    #ghost {
        pointer-events: none;
        z-index: -5;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.0;
    }

    #ghost * {
        pointer-events: none;
    }

    #ghost.haunting {
        z-index: 20;
        opacity: 1.0;
    }
</style>

<!-- All the documentation has to go up here, sorry.
     (otherwise it conflicts with the HTML or svelte/animate) 
     The .list has handlers for pointer movement and pointer up/release/end.
     Each .item has a handler for pointer down/click/start, which assigns that
     element as the item currently being "grabbed".  They also have a handler
     for pointer enter (the touchmove handler has extra logic to behave like the
     no longer extant 'touchenter'), which swaps the entered element with the
     grabbed element when triggered.
     You'll also find reactive styling below, which keeps it from being directly
     part of the imperative javascript handlers. -->
<main class="dragdroplist">
    <div 
        bind:this={ghost}
        id="ghost"
        class={grabbed ? "item haunting" : "item"}
        style={"top: " + (mouseY + offsetY - layerY) + "px"}><p></p></div>
    <div 
        class="list"
        on:mousemove={function(ev) {ev.stopPropagation(); drag(ev.clientY);}}
        on:touchmove={function(ev) {ev.stopPropagation(); drag(ev.touches[0].clientY);}}
        on:mouseup={function(ev) {ev.stopPropagation(); release(ev);}}
        on:touchend={function(ev) {ev.stopPropagation(); release(ev.touches[0]);}}>
        {#each data as datum, i (datum.id ? datum.id : JSON.stringify(datum))}
            <div 
                id={(grabbed && (datum.id ? datum.id : JSON.stringify(datum)) == grabbed.dataset.id) ? "grabbed" : ""}
                class="item"
                data-index={i}
                data-id={(datum.id ? datum.id : JSON.stringify(datum))}
                data-grabY="0"
                on:mousedown={function(ev) {grab(ev.clientY, this);}}
                on:touchstart={function(ev) {grab(ev.touches[0].clientY, this);}}
                on:mouseenter={function(ev) {ev.stopPropagation(); dragEnter(ev, ev.target);}}
                on:touchmove={function(ev) {ev.stopPropagation(); ev.preventDefault(); touchEnter(ev.touches[0]);}}
                on:click={() => changeSelectedSlide(i)} 
                animate:flip|local={{duration: 200}}>
                <div class="buttons">
                    <button 
                        class="up" 
                        style={"visibility: " + (i > 0 ? "" : "hidden") + ";"}
                        on:click={function(ev) {moveDatum(i, i - 1)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg>
                    </button>
                    <button 
                        class="down" 
                        style={"visibility: " + (i < data.length - 1 ? "" : "hidden") + ";"}
                        on:click={function(ev) {moveDatum(i, i + 1)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                    </button>
                </div>

                <div class="content">
                    <p>Slide: {datum.index_number}</p>
                </div>

                <div class="buttons delete">
                    {#if removesItems}
                        <button
                            on:click={function(ev) {removeDatum(i);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
        <button class="rounded-lg text-center p-2 bg-white font-bold hover:bg-black hover:text-white ease-in-out duration-200" on:click={async () => await createNewSlide()}>+</button>
    </div>

</main>
