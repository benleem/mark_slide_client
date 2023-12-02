<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: boolean;
</script>

<label>
	<input type="checkbox" {name} bind:checked={value} />
	{label}
</label>
