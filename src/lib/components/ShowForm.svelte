<script lang="ts">
	import { PUBLIC_API_BASE_URL } from "$env/static/public"
	import { goto } from "$app/navigation"
	import TextInput from "./Inputs/TextInput.svelte"
	import RadioInput from "./Inputs/RadioInput.svelte"

    export let mode: "add" | "edit" | "delete" 
    export let modal: boolean

    let show = {
        title: mode === "edit" ? "First Show": "",
        description: mode === "edit" ? "My first show, wow": "",
        viewCode: mode === "edit" ? "KAJns13n1k2jas": "",
        public: mode === "edit" ? true : false
    }
    $: show, console.log(show)

    let handleSubmit = () => {
        console.log("submitted")
        modal = false
    }

    let handleDelete = () => {
        console.log("deleted")
        modal = false
    }
</script>

{#if mode === "delete"}
     <form class="flex flex-col" on:submit={() => handleDelete()}>
        <p>Are you sure you want to delete this show?</p>
        <button class="p-2 mt-2 bg-red-500 rounded" type="submit">Delete</button>
    </form>
{:else}
     <form class="flex flex-col gap-2" novalidate autocomplete="off" on:submit={() => handleSubmit()}>
        <div>
            <TextInput label="Title" name="title" bind:value={show.title}/>
        </div>
        <TextInput label="Description" name="description" bind:value={show.description}/>
        <TextInput label="View Code" name="viewCode" bind:value={show.viewCode}/>
        <fieldset>
            Public?<br>
            <RadioInput label="Yes" name="public" value={true} bind:group={show.public}/>
            <RadioInput label="No" name="public" value={false} bind:group={show.public}/>
        </fieldset>
        <button class="p-2 mt-2 bg-green-500 rounded" type="submit">Submit</button>
    </form>
{/if}
