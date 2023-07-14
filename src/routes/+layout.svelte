<script>
    import Header from "$lib/components/Header.svelte"
    import "../app.css"
</script>

<div class="h-full flex flex-col">
    <Header/>
    <main class="flex-1">
        <slot />
    </main>
</div>