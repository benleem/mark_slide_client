<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
    import type { PageData } from './$types'
    import ShowView from '$lib/components/ShowView.svelte';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import type { Show } from "$lib/models/shows";

    export let data: PageData;

    const shows = writable<Show[]>([]);
    const getShows = async () => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
        const responseJson = await response.json();
        if (responseJson.status === "success") {
            const showData = responseJson.data.shows; 

            const mappedShows: Show[] = showData.map(show => ({
                id: show.id,
                user_id: show.user_id,
                title: show.title,
                description: show.description,
                view_code: show.view_code,
                is_public: show.public,
                created_at: new Date(show.created_at),
                updated_at: new Date(show.updated_at)
            }));
            
            shows.set(mappedShows);
        }
    };
   onMount(getShows);

</script>
  
<section class="h-full w-full grid place-items-center">
    <!-- <p>{data.text}</p> -->

    <ShowView shows={shows}/>
</section>



