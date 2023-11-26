<script>
	import { page } from "$app/stores";
	import { initializeModal } from "$lib/context/modal";
	import { initializeAlert } from "$lib/context/alert";
	import Header from "$lib/components/Header.svelte";
	import AlertBox from "$lib/components/AlertBox.svelte";
	import ModalContainer from "$lib/components/ModalContainer.svelte";
	import "../app.css";

	initializeModal();
	initializeAlert();
</script>

{#if $page.route.id && $page.route.id !== "/shows/[id]"}
	{#if !$page.error}
		<Header />
	{/if}
	<main>
		<slot />
	</main>
{:else}
	<main class="h-full flex flex-col">
		<slot />
	</main>
{/if}
<ModalContainer />
<AlertBox />
