<script lang="ts">
	import type { Show } from "$lib/models/shows";
	import type { ModalType } from "$lib/models/modal";
	import { shows } from "$lib/stores/shows";
	import { getModalActive } from "$lib/context/modal";
	import { convertTime } from "$lib/utils/helpers";

	const modal = getModalActive();

	const handleFormOpen = (modelType: ModalType, showItem: Show) => {
		$modal.active = true;
		$modal.type = modelType;
		$modal.data = showItem;
	};

	function toggleDropdown() {
		var dropdown = document.getElementById("dropdownDefaultRadio");
		if (dropdown !== null) {
			if (dropdown.style.display === "none" || dropdown.style.display === "") {
				dropdown.style.display = "block";
			} else {
				dropdown.style.display = "none";
			}
		}
	}

	function AlphabeticFilter(shows: Show[], ascending: boolean) {
		shows.sort((a, b) => {
			const valueA = a.title.toLowerCase();
			const valueB = b.title.toLowerCase();

			if (ascending) {
				if (valueA < valueB) return -1;
				if (valueA > valueB) return 1;
			} else {
				if (valueA > valueB) return -1;
				if (valueA < valueB) return 1;
			}

			return 0;
		});
	}

	function UpdatedFilter(shows: Show[], ascending: boolean) {
		shows.sort((a, b) => {
			const valueA = new Date(a.updated_at).getTime();
			const valueB = new Date(b.updated_at).getTime();

			if (ascending) {
				if (valueA < valueB) return -1;
				if (valueA > valueB) return 1;
			} else {
				if (valueA > valueB) return -1;
				if (valueA < valueB) return 1;
			}

			return 0;
		});
	}

	function selectOption(filtering_mode: string, ascending: boolean) {
		if (filtering_mode === "Alphabetic") {
			AlphabeticFilter($shows, ascending);
		}

		if (filtering_mode === "Updated") {
			UpdatedFilter($shows, ascending);
		}

		$shows = [...$shows];

		var dropdown = document.getElementById("dropdownDefaultRadio");
		if (dropdown !== null) {
			dropdown.style.display = "none";
		}
	}
</script>

<div class="mx-auto w-full max-w-5xl">
	<div class="mb-8 flex justify-end">
		<button
			id="dropdownRadioButton"
			data-dropdown-toggle="dropdownDefaultRadio"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			type="button"
			on:click={toggleDropdown}
		>
			Order By
			<svg
				class="w-2.5 h-2.5 ml-2.5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 10 6"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="m1 1 4 4 4-4"
				/>
			</svg>
		</button>

		<div
			id="dropdownDefaultRadio"
			class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute"
		>
			<ul
				class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownRadioButton"
			>
				<li>
					<div class="flex items-center">
						<input
							checked
							id="default-radio-1"
							type="radio"
							value=""
							name="default-radio"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
							on:click={() => selectOption("Updated", false)}
						/>
						<label
							for="default-radio-1"
							class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Newest
						</label>
					</div>
				</li>

				<li>
					<div class="flex items-center">
						<input
							id="default-radio-2"
							type="radio"
							value=""
							name="default-radio"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
							on:click={() => selectOption("Updated", true)}
						/>
						<label
							for="default-radio-2"
							class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Oldest
						</label>
					</div>
				</li>

				<li>
					<div class="flex items-center">
						<input
							id="default-radio-3"
							type="radio"
							value=""
							name="default-radio"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
							on:click={() => selectOption("Alphabetic", true)}
						/>
						<label
							for="default-radio-3"
							class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							A-Z
						</label>
					</div>
				</li>
				<li>
					<div class="flex items-center">
						<input
							id="default-radio-3"
							type="radio"
							value=""
							name="default-radio"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
							on:click={() => selectOption("Alphabetic", false)}
						/>
						<label
							for="default-radio-3"
							class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Z-A
						</label>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
<section class="mx-auto grid grid-cols-3 gap-8 max-w-5xl">
	{#each $shows as showItem}
		<div class="h-min aspect-video">
			<div class="relative h-full [&>a]:!text-white">
				<a
					href={`/shows/${showItem.id}`}
					class="block h-full bg-[#121212] rounded-md group"
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
						on:click={() => handleFormOpen("show-edit", showItem)}
						class="material-symbols-outlined p-1 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all"
					>
						edit
					</button>
					<button
						on:click={() => handleFormOpen("show-delete", showItem)}
						class="material-symbols-outlined p-1 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all"
					>
						delete
					</button>
				</div>
			</div>
			<div class="pt-0.5 flex justify-between text-gray-300">
				<li class="material-symbols-outlined">
					{#if showItem.public}
						visibility
					{:else}
						visibility_off
					{/if}
				</li>
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
