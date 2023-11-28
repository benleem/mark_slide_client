<script lang="ts">
	import { user } from "$lib/stores/user";
	import LogoutButton from "./LogoutButton.svelte";
	import LoginLinkButton from "./LoginLinkButton.svelte";
</script>

<header
	class="py-4 mb-8 sticky top-0 right-0 bg-secondary-dark z-99 border-b-2 border-white border-opacity-25"
>
	<nav class="mx-auto flex justify-between max-w-5xl w-full">
		<a class="mr-2" href="/">Home</a>
		<ul class="flex gap-2 justify-end">
			{#if !$user}
				<li>
					<LoginLinkButton />
				</li>
			{:else}
				<li>
					<LogoutButton />
				</li>
				<li>
					<a href="/profile">Profile</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>
