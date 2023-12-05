<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import GoogleIcon from "./GoogleIcon.svelte";

	$: favorites = $page.url.searchParams.get("favorites") === "true";

	const toggleFavorites = async () => {
		let searchParams = new URLSearchParams($page.url.searchParams.toString());
		searchParams.set("favorites", `${!favorites}`);
		favorites = !favorites;

		await goto(`?${searchParams.toString()}`, {
			invalidateAll: true
		});
	};
</script>

<button
	class={`${
		favorites ? "favorites-active" : "favorites-inactive"
	} flex items-end gap-1`}
	on:click={() => toggleFavorites()}
>
	<GoogleIcon iconType="star" className="text-3xl" />
</button>

<style>
	.favorites-active,
	.favorites-inactive {
		transition: ease-in-out;
		transition-duration: 200ms;
	}

	.favorites-active {
		color: rgb(252 211 77);
	}
	.favorites-active:hover {
		color: white;
	}

	.favorites-inactive {
		color: white;
	}
	.favorites-inactive:hover {
		color: rgb(252 211 77);
	}
</style>
