<script>
    import { initializeModal } from "$lib/context/modal";
    import Header from "$lib/components/Header.svelte"
    import ModalContainer from "$lib/components/ModalContainer.svelte";
    import "../app.css"

    initializeModal()
</script>


<Header/>
<main class="flex-1">
    <slot/>
</main>
<ModalContainer/>
