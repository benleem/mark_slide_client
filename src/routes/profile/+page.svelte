<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types'
    
    export let data: PageData

    export const convertTime = (date: Date) => {
        let convertedDate = new Date(date).toLocaleDateString('en-us', {year:"numeric", month:"short", hour:"numeric", minute:"numeric"});
        return convertedDate
    }

    export const logout = async() => {
        const response = await fetch("http://localhost:8000/auth/logout",{credentials:"include", headers:{"Authorization":`Bearer ${data.token}`}});
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
                <button class="text-blue-400" on:click={logout}>Logout</button>
            </div>
            <a href={data.user.profile_url}>
                <img class="w-full max-w-xs aspect-square rounded-xl" src={data.user.avatar_url} alt="profile">
            </a>
            <div class="pt-4 text-white">
                <p><span class="text-gray-400">Id: </span>{data.user.id}</p>
                <p><span class="text-gray-400">Name: </span>{data.user.name}</p>
                <p><span class="text-gray-400">Username: </span>{data.user.username}</p>
                <p><span class="text-gray-400">Email: </span>{data.user.email}</p>
                <p><span class="text-gray-400">Created: </span>{convertTime(data.user.created_at)}</p>
                <p><span class="text-gray-400">Updated: </span>{convertTime(data.user.updated_at)}</p>
            </div>
        </div>
    {:else if !data.user || data.error}
        <p class="text-red-500">{data.error}</p>
    {/if}
</section>