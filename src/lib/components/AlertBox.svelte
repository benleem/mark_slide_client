<script lang="ts">
	import { getAlertActive } from "$lib/context/alert";

	const alert = getAlertActive();
</script>

{#if $alert.active === true}
	<section class="w-full fixed bottom-0 left-0 p-2 bg-white animate-slide-up">
		<p class="text-sm font-bold text-blue-500 text-center">
			{$alert.text}
		</p>
	</section>
{/if}
