<script lang="ts">
	import { page } from "$app/stores";
	import LoginLinkButton from "$lib/components/LoginLinkButton.svelte";
	import { user } from "$lib/stores/user";
</script>

<section class="fixed top-0 left-0 h-full w-full grid place-items-center">
	<div class="text-center">
		<p class="text-red-500">{$page.error?.message}</p>
		{#if $user}
			<a href="/">Home</a> OR <a href="/profile">Profile</a>
		{:else}
			<a href="/">Home</a> OR <LoginLinkButton />
		{/if}
	</div>
</section>
