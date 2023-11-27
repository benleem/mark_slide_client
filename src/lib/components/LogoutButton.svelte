<script lang="ts">
	import { PUBLIC_API_BASE_URL } from "$env/static/public";
	import { goto } from "$app/navigation";
	import { removeUser } from "$lib/stores/user";

	const logout = async () => {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/logout`, {
			credentials: "include"
		});
		const responseJson = await response.json();
		if (responseJson.status === "success") {
			goto("/", { invalidateAll: true });
			removeUser();
		}
	};
</script>

<button
	class="text-blue-500 hover:text-blue-500 transition-colors duration-200 ease-in-out"
	on:click={logout}
>
	Log Out
</button>
