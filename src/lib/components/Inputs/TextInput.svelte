<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: string;
</script>

<label>
	{label}<br />
	<input
		class="w-full mt-1 py-0.5 px-1.5 text-sm text-white rounded bg-[#262626] outline-none focus:outline-white outline-1 transition-all duration-300 ease-in-out"
		type="text"
		{name}
		bind:value
	/>
</label>
