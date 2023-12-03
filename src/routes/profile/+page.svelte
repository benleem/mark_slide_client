<script lang="ts">
	import type { PageData } from "./$types";
	import { PUBLIC_API_BASE_URL } from "$env/static/public";
	import ShowView from "$lib/components/ShowView.svelte";
	import { goto } from "$app/navigation";
	import { shows } from "$lib/stores/shows";
	import { convertTime } from "$lib/utils/helpers";
	import LogoutButton from "$lib/components/LogoutButton.svelte";
	import LoginLinkButton from "$lib/components/LoginLinkButton.svelte";

	export let data: PageData;
	const { user, initialShows } = data;
	shows.update((shows) => initialShows.shows);
</script>

<div class="py-8 px-4">
	<section class="pb-8 mx-auto flex w-full border-b-2">
		<a class="aspect-square rounded-full overflow-hidden" href={user.html_url}>
			<img class="w-full max-w-[15rem]" src={user.avatar_url} alt="profile" />
		</a>
		<div class="pl-4 pt-4 w-full flex justify-between items-end">
			<div>
				<h1 class="text-xl">{user.name}</h1>
				<p class="text-gray-400">{user.login}</p>
			</div>
			<LogoutButton />
		</div>
	</section>
	<section class="pt-8">
		<ShowView />
	</section>
</div>
