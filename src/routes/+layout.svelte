<script>
    import { page } from "$app/stores";
    import { initializeModal } from "$lib/context/modal";
    import Header from "$lib/components/Header.svelte"
    import ModalContainer from "$lib/components/ModalContainer.svelte";
    import "../app.css"
    
    initializeModal()
</script>

{#if $page.route.id && $page.route.id !== "/shows/[id]"}
    <Header/>
    <main>
        <slot/>
    </main>
{:else}
    <main class="h-full flex flex-col">
        <slot/>
    </main>
{/if}
<ModalContainer/>

