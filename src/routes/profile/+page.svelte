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

{#if data.user}
    <section class="mx-auto flex flex-col p-4 w-max">
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
    </section>
    {#await getUserShows(user.id, tokenString, false)}
        <p>Loading</p>
    {:then shows}
        <ShowView shows={shows.shows}/>
    {:catch error}
        <p>Something went wrong:{error}</p>
    {/await}
{:else if !data.user || data.error}
    <p class="text-red-500">{data.error}</p>
{/if}


