<script lang="ts">
    export let label:string
    export let name:string
    export let value:string | boolean
    export let group:string | boolean
</script>

<label class="text-sm">
    <input type="radio" name={name} value={value} bind:group/>
    {label}
</label>


