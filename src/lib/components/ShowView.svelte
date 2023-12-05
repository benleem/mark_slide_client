<script lang="ts">
	import type { Show } from "$lib/models/shows";
	import type { ModalType } from "$lib/models/modal";
	import { shows } from "$lib/stores/shows";
	import { getModalActive, setModalActive } from "$lib/context/modal";
	import { convertTime } from "$lib/utils/helpers";
	import GoogleIcon from "./GoogleIcon.svelte";

	const modal = getModalActive();
</script>

<section class="mx-auto grid grid-cols-1 gap-8 md:grid-cols-3 sm:grid-cols-2">
	<button
		class="group grid place-items-center h-min aspect-video bg-secondary-dark rounded-md"
		on:click={() => setModalActive(modal, "show-add", null)}
	>
		<GoogleIcon
			iconType="add"
			className="p-1 border-4 border-white text-5xl rounded-full group-hover:scale-110 transition-all ease-in-out duration-200"
		/>
	</button>
	{#each $shows as showItem}
		<div class="h-min aspect-video">
			<div class="relative h-full [&>a]:!text-white">
				<a
					href={`/shows/${showItem.id}`}
					class="block h-full bg-secondary-dark rounded-md group"
				>
					<h2
						class="w-full px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center group-hover:opacity-0 group-hover:ease-in-out duration-200"
					>
						{showItem.title}
					</h2>
					<h2
						class="w-full px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 group-hover:ease-in-out duration-200"
					>
						{showItem.description}
					</h2>
				</a>
				<div class="absolute right-0 bottom-0 p-2 flex justify-end gap-1">
					<button
						on:click={() => setModalActive(modal, "show-edit", showItem)}
						class="p-1 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all"
					>
						<GoogleIcon iconType="edit" />
					</button>
					<button
						on:click={() => setModalActive(modal, "show-delete", showItem)}
						class="p-1 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all"
					>
						<GoogleIcon iconType="delete" />
					</button>
				</div>
			</div>
			<div class="pt-0.5 flex justify-between text-gray-300">
				<GoogleIcon
					iconType={`${showItem.public ? "visibility" : "visibility_off"}`}
					className="text-xl"
				/>
				<p class="text-sm">
					Updated: {convertTime(showItem.updated_at, {
						year: "numeric",
						month: "numeric",
						day: "2-digit"
					})}
				</p>
			</div>
		</div>
	{/each}
</section>
