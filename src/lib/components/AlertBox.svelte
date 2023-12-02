<script lang="ts">
	import { getAlertActive } from "$lib/context/alert";
	import GoogleIcon from "./GoogleIcon.svelte";

	const alert = getAlertActive();
</script>

{#if $alert.active === true}
	<section
		class="w-full h-full absolute bottom-0 left-0 p-2 grid place-items-center bg-blue-600 animate-fade-in-out"
	>
		<div class="flex items-center">
			<GoogleIcon iconType="info" />
			<p class="pl-2 text-xs text-white text-center">
				{$alert.text}
			</p>
		</div>
	</section>
{/if}
