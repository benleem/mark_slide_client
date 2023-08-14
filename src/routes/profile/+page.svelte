<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
    import ShowView from '$lib/components/ShowView.svelte';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation'
    import ProfileItem from '$lib/components/ProfileItem.svelte';
    import { convertTime } from "$lib/utils/helpers";
    import type { Show } from "$lib/models/shows";
    
    export let data: PageData


    const logout = async() => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/logout`,{
            credentials:"include", 
            headers:{"Authorization":`Bearer ${data.token}`}});
        const responseJson = await response.json();
        if (responseJson.status === "success") {
                goto("/")
        }
    }

    const shows = writable<Show[]>([]);
    const getShows = async () => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/users/${data.user.id}?favorites=false`, {
            credentials: "include",
            headers: { "Authorization": `Bearer ${data.token}` }
        });
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

<section class="h-full w-full flex flex-col items-center justify-center">
    {#if data.user}
        <div class="flex flex-col p-4">
            <div class="pb-1 flex justify-end">
                <button class="text-blue-500" on:click={logout}>Logout</button>
            </div>
            <a href={data.user.profile_url}>
                <img class="w-full max-w-xs aspect-square rounded-xl" src={data.user.avatar_url} alt="profile">
            </a>
            <div class="pt-4">
                <ProfileItem label="Id" value={data.user.id}/>
                <ProfileItem label="Name" value={data.user.name}/>
                <ProfileItem label="Username" value={data.user.username}/>
                <ProfileItem label="Email" value={data.user.email}/>
                <ProfileItem label="Created" value={convertTime(data.user.created_at)}/>
                <ProfileItem label="Updated" value={convertTime(data.user.updated_at)}/>
            </div>
        </div>
    {:else if !data.user || data.error}
        <p class="text-red-500">{data.error}</p>
    {/if}
    <ShowView shows={shows}/>
</section>
