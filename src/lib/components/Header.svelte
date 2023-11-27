<script lang="ts">
	import type { GitHubUser } from "$lib/models/users";
	import type { ModalType } from "$lib/models/modal";
	import { PUBLIC_API_BASE_URL } from "$env/static/public";
	import { goto } from "$app/navigation";
	import { user } from "$lib/stores/user";
	import { getModalActive } from "$lib/context/modal";
	import LogoutButton from "./LogoutButton.svelte";
	import LoginLinkButton from "./LoginLinkButton.svelte";

	const modal = getModalActive();

	const handleFormOpen = (modelType: ModalType) => {
		$modal.active = true;
		$modal.type = modelType;
		$modal.data = {
			id: "",
			user_id: 0,
			title: "",
			description: "",
			view_code: "",
			public: false,
			created_at: "" as unknown as Date,
			updated_at: "" as unknown as Date
		};
	};
</script>

<header class="sticky top-0 right-0 bg-[#292929] z-99">
	<nav class="flex justify-between">
		<a class="m-2" href="/">Home</a>
		<ul class="p-2 flex gap-2 justify-end">
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
				<li>
					<button
						class="text-green-500"
						on:click={() => handleFormOpen("show-add")}>New</button
					>
				</li>
			{/if}
		</ul>
	</nav>
</header>
