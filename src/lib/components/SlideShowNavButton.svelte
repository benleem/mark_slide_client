<script lang="ts">
    export let handleClick: () => void
</script>

<button 
    class="w-8 h-8 bg-gray-500 rounded-full"
    on:click={() => handleClick()}
    >
    <span class="material-symbols-outlined text-xl">
        <slot/>
    </span>
</button>