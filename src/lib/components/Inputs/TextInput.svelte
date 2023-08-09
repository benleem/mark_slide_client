<script lang="ts">
    export let label:string
    export let name:string
    export let value:string
</script>

<label>
    {label}<br>
    <input class="w-full py-0.5 px-1 text-black rounded outline-none" type="text" name={name} bind:value/>
</label>
