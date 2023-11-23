<script lang="ts">
	import { page } from "$app/stores";
</script>

<section class="fixed top-0 left-0 h-full w-full grid place-items-center">
	<p class="text-red-500">{$page.error?.message}</p>
</section>
