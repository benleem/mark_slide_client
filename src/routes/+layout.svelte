<script lang="ts">
	import type { LayoutData } from "./$types";
	import { page } from "$app/stores";
	import { initializeModal } from "$lib/context/modal";
	import { initializeAlert } from "$lib/context/alert";
	import { user } from "$lib/stores/user";
	import Header from "$lib/components/Header.svelte";
	import AlertBox from "$lib/components/AlertBox.svelte";
	import ModalContainer from "$lib/components/ModalContainer.svelte";
	import "../app.css";

	export let data: LayoutData;
	const userData = data.user;
	user.set(userData);

	initializeModal();
	initializeAlert();
</script>

{#if $page.route.id && $page.route.id !== "/shows/[id]"}
	{#if !$page.error && $page.route.id === "/"}
		<Header />
	{/if}
	<main class="mx-auto max-w-5xl w-full">
		<slot />
	</main>
{:else}
	<main class="h-full flex flex-col">
		<slot />
	</main>
{/if}
<ModalContainer />
<AlertBox />
