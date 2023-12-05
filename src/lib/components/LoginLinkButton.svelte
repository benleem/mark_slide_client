<script lang="ts">
	import { PUBLIC_API_BASE_URL } from "$env/static/public";
	import { goto } from "$app/navigation";

	let isLoading: boolean = false;
	let isError: boolean = false;

	const getLoginUrl = async () => {
		isLoading = true;
		try {
			const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/login`);
			const responseJson = await response.json();

			if (!responseJson.data) {
				isError = true;
				isLoading = false;
			}

			const loginUrl = responseJson.data.login_url;
			goto(loginUrl);
			isLoading = false;
		} catch (error) {
			if (error instanceof Error) {
				isError = true;
				isLoading = false;
			}
		}
	};
</script>

{#if isLoading === true}
	<!-- <div class="animate-spin h-20 w-20">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="100%"
			viewBox="0 -960 960 960"
			width="100%"
			fill="white"
			><path
				d="M480-80q-84 0-157-31t-127-85q-54-54-85-127T80-480q0-84 31-157t85-127q54-54 127-85t157-31q12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80Z"
			/></svg
		>
	</div> -->
	<p>Loading</p>
{:else if isError === true}
	<button class="text-red-500" on:click={getLoginUrl}>Retry</button>
{:else}
	<button class="text-blue-500" on:click={getLoginUrl}>Login</button>
{/if}
