<script lang="ts">
	import type { PageData } from "./$types";
	import { shows } from "$lib/stores/shows";
	import LogoutButton from "$lib/components/LogoutButton.svelte";
	import ShowView from "$lib/components/ShowView.svelte";
	import SearchBar from "$lib/components/SearchBar.svelte";
	import OrderByRadio from "$lib/components/OrderByRadio.svelte";
	import ToggleFavorites from "$lib/components/ToggleFavorites.svelte";
	import { page } from "$app/stores";

	export let data: PageData;
	const { user } = data;
	$: shows.set($page.data.initialShows.shows);
</script>

<div class="py-8 px-4">
	<section class="pb-8 mx-auto flex w-full border-b-2">
		<a
			class="aspect-square rounded-full overflow-hidden"
			href={user.html_url}
			target="_blank"
		>
			<img class="w-full max-w-[15rem]" src={user.avatar_url} alt="profile" />
		</a>
		<div class="pl-4 w-full flex justify-between items-end">
			<div>
				<h1 class="text-xl">{user.name}</h1>
				<p class="text-gray-400">{user.login}</p>
				<LogoutButton />
			</div>
			<div class="flex items-end">
				<ToggleFavorites />
				<OrderByRadio />
			</div>
		</div>
	</section>
	<section class="pt-8">
		<SearchBar />
		<ShowView />
	</section>
</div>
