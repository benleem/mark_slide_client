<script lang="ts">
	import type { Show } from "$lib/models/shows";
	import { goto } from "$app/navigation";
	import { shows } from "$lib/stores/shows";
	import { page } from "$app/stores";

	$: orderType = $page.url.searchParams.get("orderBy");

	const orderBy = () => {
		let searchParams = new URLSearchParams($page.url.searchParams.toString());
		searchParams.set("orderBy", `${orderType}`);
		goto(`?${searchParams.toString()}`, {
			invalidateAll: true
		});
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

<div>
	<div class="ml-4 flex justify-end">
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
