<script lang="ts">
	import type { SearchShowFormData } from "$lib/models/shows";
	import { getUserShowsLike } from "$lib/utils/api/shows";
	import { shows } from "$lib/stores/shows";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	let user_id = $page.data.user.id;
	let searchParams = $page.url.searchParams;
	$: favorites = $page.url.searchParams.get("favorite") === "true";
	$: like_query = $page.url.searchParams.get("like_query") as string;

	let searchFormData: SearchShowFormData = {
		like_query: like_query
	};

	let noResults: boolean | null;
	const handleSearch = async () => {
		if (searchFormData.like_query != "") {
			console.log("Within search");
			let got_shows = await getUserShowsLike(
				user_id,
				favorites,
				searchFormData.like_query
			);

			if (got_shows.status == "success") {
				noResults = false;
				shows.set(got_shows.shows);
			} else {
				noResults = true;
			}
		}
	};

	const handleSubmit = async () => {
		searchParams.set("like_query", `${searchFormData.like_query}`);
		goto(`?${searchParams.toString()}`, {
			invalidateAll: false,
			replaceState: false
		});
		await handleSearch();
	};

	const resetSearch = async () => {
		searchParams.delete("like_query");
		goto(`?${searchParams.toString()}`, {
			invalidateAll: false,
			replaceState: false
		});
		searchFormData.like_query = "";
		shows.set($page.data.initialShows.shows);
		noResults = null;
	};
</script>

<form autocomplete="off" on:submit|preventDefault={() => handleSubmit()}>
	<label
		for="default-search"
		class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
		>Search</label
	>
	<div class="flex flex-row gap-2 justify-end mb-4">
		{#if noResults == true}
			<h1 class="self-center text-red-400">No Results</h1>
		{:else if noResults == false}
			<button
				on:click={() => resetSearch()}
				class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Reset</button
			>
		{/if}
		<div class="relative">
			<div
				class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
			>
				<svg
					class="w-4 h-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="search"
				id="default-search"
				class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search Shows..."
				name="like_query"
				bind:value={searchFormData.like_query}
				required
			/>
		</div>
		<button
			type="submit"
			class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Search</button
		>
	</div>
</form>
