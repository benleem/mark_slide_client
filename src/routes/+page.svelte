<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData
</script>

<div class="h-full w-full grid place-items-center">
  {#if data.loginUrl}
    <a href={data.loginUrl}>Login</a>
  {:else if !data.loginUrl || data.error}
    <p class="text-red-500">{data.error}</p>
  {/if}
</div>