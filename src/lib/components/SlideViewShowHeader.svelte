<script lang="ts">
import type { Show, ShowFormData } from "$lib/models/shows";
import { writable } from 'svelte/store';
import { patchShow } from "$lib/utils/api/shows";

export let show: Show;

let showTitle = writable<string>(show.title);
let showDescription = writable<string>(show.description);

function toggleContentEditable(event: any) {
    const element = event.target;
    const isEditable = element.getAttribute('contenteditable') === 'true';

    element.setAttribute('contenteditable', !isEditable);
}

async function updateShow() {
    let data: ShowFormData =  {
        title: $showTitle,
        description: $showDescription,
        view_code: show.view_code,
        public: show.public,
    }
    await patchShow(data, show.id);
}

async function handleBlur(event: any) {
    toggleContentEditable(event);
    if (show.title != $showTitle || show.description != $showDescription) {
        console.log("Updating");
        await updateShow();
    }
}

function preventNewline(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
}
</script>

<section>
    <div class="pl-5">
        <h1 class="text-5xl font-bold pb-2 outline-none" 
            on:dblclick={toggleContentEditable} 
            on:blur={handleBlur} 
            on:keydown={preventNewline}>
            {$showTitle}
        </h1>
        <p class="text-md outline-none" 
           on:dblclick={toggleContentEditable}
           on:blur={handleBlur} 
           on:keydown={preventNewline}>
           {$showDescription} 
        </p>
    </div>
</section>

