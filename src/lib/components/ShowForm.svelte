<script lang="ts">
	import type { Show, ShowFormData } from "$lib/models/shows";
    import { PUBLIC_API_BASE_URL } from "$env/static/public"
	import { goto } from "$app/navigation"
	import TextInput from "./Inputs/TextInput.svelte"
	import RadioInput from "./Inputs/RadioInput.svelte"

    export let mode: "add" | "edit" | "delete" 
    export let modal: boolean
    export let show: Show

    let formLoading = false
    let formError = ""

    let showFormData: ShowFormData = {
        title: show.title ,
        description:  show.description ,
        view_code: show.view_code ,
        public: show.public 
        
    }
    $: showFormData, console.log(showFormData)

    const handleSubmit = async() => {
        formLoading = true

        try {
            const response = await fetch(`/api/shows${mode === "add" ? "" : "/" + show.id}`,{
                method: mode === "add" ? "POST" : "PATCH",
                body: JSON.stringify(showFormData),
            })
            const responseJson = await response.json();
            if (responseJson.message) {
                formError = responseJson.message
            }
            else{
                console.log(responseJson) //update shows array
                modal = false
            }
        } catch (error) {
            if (error instanceof Error) {
                formError = error.message
            }
        }

        formLoading = false
    }

    let handleDelete = async() => {
        formLoading = true

        try {
            const response = await fetch(`/api/shows/${show.id}`,{
                method:"DELETE",
            })
            const responseJson = await response.json()
            console.log(responseJson)
            modal = false
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message) // update shows array
                formError = error.message
            }
        }
        
        formLoading = false
    }
</script>

{#if mode === "delete"}
    <form class="flex flex-col" on:submit|preventDefault={() => handleDelete()}>
        <p>Are you sure you want to delete this show?</p>
        <button class="p-2 mt-2 bg-red-500 hover:bg-red-600 rounded" type="submit">Delete</button>
    </form>
{:else}
     <form class="flex flex-col gap-2" novalidate autocomplete="off" on:submit|preventDefault={() => handleSubmit()}>
        <TextInput label="Title" name="title" bind:value={showFormData.title}/>
        <TextInput label="Description" name="description" bind:value={showFormData.description}/>
        <TextInput label="View Code" name="viewCode" bind:value={showFormData.view_code}/>
        <fieldset>
            Public?<br>
            <RadioInput label="Yes" name="public" value={true} bind:group={showFormData.public}/>
            <RadioInput label="No" name="public" value={false} bind:group={showFormData.public}/>
        </fieldset>
        <button class="p-2 mt-2 bg-green-500 hover:bg-green-600 rounded" type="submit">Submit</button>
    </form>
{/if}

{#if formError}
    <p class="pt-1 text-sm text-red-500">{formError}</p>
{/if}

{#if formLoading}
    <div class="absolute top-0 left-0 h-full w-full grid place-content-center bg-white opacity-40 animate-pulse">
        <p>Loading</p>
    </div>
{/if}
