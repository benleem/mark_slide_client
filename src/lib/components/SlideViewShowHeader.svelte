<script lang="ts">
	import type { ModalType } from "$lib/models/modal";
	import { currentShow } from "$lib/stores/currentShow";
	import { getModalActive } from "$lib/context/modal";
	import { convertTime } from "$lib/utils/helpers";

	export let toggleViewMode: () => void;

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
					on:click={() => toggleViewMode()}
				>
					<span class="material-symbols-outlined text-3xl"> play_arrow </span>
				</button>
				<button
					class="flex border-white hover:text-yellow-500 transition-colors ease-in-out duration-200"
					on:click={() => handleFormOpen("show-edit-single")}
				>
					<span class="material-symbols-outlined"> edit </span>
				</button>
				<button
					class="flex hover:text-red-500 transition-colors ease-in-out duration-200"
					on:click={() => handleFormOpen("show-delete-single")}
				>
					<span class="material-symbols-outlined"> delete </span>
				</button>
			</div>
		</div>
	</section>
{/if}
