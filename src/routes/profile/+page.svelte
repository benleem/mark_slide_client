<script lang="ts">
    import type { PageData } from './$types';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
    import ShowView from '$lib/components/ShowView.svelte';
    import { goto } from '$app/navigation'
    import { convertTime } from '$lib/utils/helpers';
    import ProfileItem from '$lib/components/ProfileItem.svelte';
	import { getUserShows } from '$lib/utils/api/shows';
    
    export let data: PageData

    const {user, token} = data
    const tokenString = token as string

    const logout = async() => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/logout`,{
            credentials:"include", 
            headers:{"Authorization":`Bearer ${data.token}`}});
        const responseJson = await response.json();
        if (responseJson.status === "success") {
                goto("/")
        }
    }
</script>

<style>
    /* Logout icon */
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
</style>

{#if data.user}
    <section class="pb-8 mx-auto flex max-w-5xl border-b-2">
        <a href={data.user.profile_url}>
            <img class="w-full max-w-[12rem] aspect-square rounded-xl" src={data.user.avatar_url} alt="profile">
        </a>
        <div class="pl-4 pt-4 w-full flex justify-between items-end">
            <div>
                <ProfileItem label="Id" value={data.user.id}/>
                <ProfileItem label="Name" value={data.user.name}/>
                <ProfileItem label="Username" value={data.user.username}/>
                <ProfileItem label="Email" value={data.user.email || "N/A"}/>
                <ProfileItem label="Created" value={convertTime(data.user.created_at)}/>
                <ProfileItem label="Updated" value={convertTime(data.user.updated_at)}/>
            </div>
            <button class="material-symbols-outlined text-blue-600 hover:text-blue-500 transition-colors duration-200 ease-in-out" on:click={logout}>logout</button>
        </div>
    </section>
    <section class="pt-8">
        {#await getUserShows(user.id, tokenString, false)}
            <p class="mx-auto max-w-5xl">Loading</p>
        {:then shows}
            <ShowView shows={shows.shows}/>
        {:catch error}
            <p class="mx-auto max-w-5xl">Something went wrong:{error}</p>
        {/await}
    </section>
{:else if !data.user || data.error}
    <section class="mx-auto max-w-5xl h-full flex items-center justify-center">
        <p class="text-red-500">{data.error}</p>
    </section>
{/if}