<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
    import type { PageData } from './$types'
    import { goto } from '$app/navigation'
    import ProfileItem from '$lib/components/ProfileItem.svelte';
    
    export let data: PageData

    const convertTime = (date: Date) => {
        let convertedDate = new Date(date).toLocaleDateString('en-us', {year:"numeric", month:"short", hour:"numeric", minute:"numeric"});
        return convertedDate
    }

    const logout = async() => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/logout`,{credentials:"include", headers:{"Authorization":`Bearer ${data.token}`}});
        const responseJson = await response.json();
        if (responseJson.status === "success") {
            goto("/")
        }
    }
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
</section>