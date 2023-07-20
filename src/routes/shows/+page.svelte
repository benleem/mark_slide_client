<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData
</script>
  
<div class="h-full w-full grid place-items-center">
    <p>{data.text}</p>
</div>