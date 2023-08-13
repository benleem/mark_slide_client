<script lang="ts">
    import type { PageData } from './$types'
    import ShowView from '$lib/components/ShowView.svelte';

    export let data: PageData


</script>
  
<section class="h-full w-full grid place-items-center">
    <!-- <p>{data.text}</p> -->

    <ShowView data={data}/>
</section>



