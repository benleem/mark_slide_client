<script lang="ts">
	export let className: string = "";
	export let iconType: string;
</script>

<span class={`material-symbols-outlined flex ${className}`}>
	{iconType}
</span>
