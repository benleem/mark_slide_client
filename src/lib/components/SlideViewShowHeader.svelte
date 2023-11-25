<script lang="ts">
	import type { ModalType } from "$lib/models/modal";
	import { currentShow } from "$lib/stores/currentShow";
	import { getModalActive } from "$lib/context/modal";
	import { convertTime } from "$lib/utils/helpers";
	import GoogleIcon from "./GoogleIcon.svelte";
	import { page } from "$app/stores";
	import { PUBLIC_CLIENT_BASE_URL } from "$env/static/public";

	export let toggleViewMode: () => void;

	// viewcode should only be string once database no longer allows nullable viewcode, but for now it can be undefined
	// Also likely this function should be defined elsewhere, but it's here for now 🫣
	async function generateShareUrl(viewcode: string | undefined) {
		let currentUrl = $page.url.pathname;
		const copy_url = `${PUBLIC_CLIENT_BASE_URL}${currentUrl}?viewCode=${viewcode}&viewMode=${true}`;

		if (viewcode != undefined) {
			await navigator.clipboard.writeText(copy_url);
			console.log("Copied Url to clipboard");
		}
	}

	const modal = getModalActive();

	const handleFormOpen = (modelType: ModalType) => {
		$modal.active = true;
		$modal.type = modelType;
		$modal.data = $currentShow;
	};
</script>

{#if $currentShow}
	<section class="bg-blue-600">
		<div class="mx-auto max-w-5xl flex justify-between p-2">
			<div>
				<div class="flex items-end">
					<p class="material-symbols-outlined pr-1">
						{#if $currentShow.public}
							visibility
						{:else}
							visibility_off
						{/if}
					</p>
					<h1 class="text-lg leading-tight font-semibold pr-2">
						{$currentShow.title}
					</h1>
				</div>
				<p class="pt-1 text-xs text-gray-300">
					Updated: {convertTime($currentShow.updated_at, {
						month: "short",
						day: "numeric",
						hour: "numeric",
						minute: "numeric"
					})}
				</p>
			</div>
			<div class="flex items-center">
				<p class="text-sm">{$currentShow.description}</p>
			</div>
			<div class="flex gap-2 items-center text-white">
				<button
					class="flex hover:text-green-500 transition-colors ease-in-out duration-200"
					on:click={async () => await generateShareUrl($currentShow?.view_code)}
				>
					<GoogleIcon iconType="share" className="text-xl" />
				</button>
				<button
					class="flex hover:text-green-500 transition-colors ease-in-out duration-200"
					on:click={() => toggleViewMode()}
				>
					<GoogleIcon iconType="play_arrow" className="text-3xl" />
				</button>
				<button
					class="flex border-white hover:text-yellow-500 transition-colors ease-in-out duration-200"
					on:click={() => handleFormOpen("show-edit-single")}
				>
					<GoogleIcon iconType="edit" />
				</button>
				<button
					class="flex hover:text-red-500 transition-colors ease-in-out duration-200"
					on:click={() => handleFormOpen("show-delete-single")}
				>
					<GoogleIcon iconType="delete" />
				</button>
			</div>
		</div>
	</section>
{/if}
