<script lang="ts">
	import type { PageData } from "./$types";
	import { PUBLIC_API_BASE_URL } from "$env/static/public";
	import ShowView from "$lib/components/ShowView.svelte";
	import { goto } from "$app/navigation";
	import { convertTime } from "$lib/utils/helpers";
	import { shows } from "$lib/stores/shows";

	export let data: PageData;
	const { user, initialShows } = data;
	shows.update((shows) => initialShows.shows);

	const logout = async () => {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/logout`, {
			credentials: "include"
		});
		const responseJson = await response.json();
		if (responseJson.status === "success") {
			goto("/");
		}
	};
</script>

{#if user}
	<section class="pb-8 mx-auto flex w-full max-w-5xl border-b-2">
		<a class="aspect-square rounded-full overflow-hidden" href={user.html_url}>
			<img class="w-full max-w-[15rem]" src={user.avatar_url} alt="profile" />
		</a>
		<div class="pl-4 pt-4 w-full flex justify-between items-end">
			<div>
				<h1 class="text-xl">{user.name}</h1>
				<p class="text-gray-400">{user.login}</p>
			</div>
			<button
				class="material-symbols-outlined text-blue-600 hover:text-blue-500 transition-colors duration-200 ease-in-out"
				on:click={logout}>logout</button
			>
		</div>
	</section>
	<section class="pt-8">
		<ShowView />
	</section>
{:else if !user}
	<section class="mx-auto max-w-5xl h-full flex items-center justify-center">
		<p class="text-red-500">You are not logged in</p>
	</section>
{/if}
