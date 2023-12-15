<script lang="ts">
	import type { Show } from "$lib/models/shows";
	import { goto } from "$app/navigation";
	import { shows } from "$lib/stores/shows";
	import { page } from "$app/stores";
	import { getAllContexts, onMount } from "svelte";

	import { AlphabeticFilter, UpdatedFilter } from "$lib/utils/ordering";

	let alphAscOpt: HTMLInputElement;
	let alphDescOpt: HTMLInputElement;
	let updatedAscOpt: HTMLInputElement;
	let updatedDescOpt: HTMLInputElement;
	onMount(() => {
		let dropDownList: HTMLInputElement[] = [
			alphAscOpt,
			alphDescOpt,
			updatedAscOpt,
			updatedDescOpt
		];
		let orderParams = $page.url.searchParams.get("orderBy")?.split("_");
		orderParams = orderParams == undefined ? ["alph", "asc"] : orderParams;
		let targetId = orderParams.join("-");
		dropDownList.forEach((child) => {
			if (child.id == targetId) {
				child.defaultChecked = true;
			}
		});
	});

	// $: orderParams = $page.url.searchParams.get("orderBy")?.split("_");

	function toggleDropdown() {
		var dropdown = document?.getElementById("dropdownDefaultRadio");
		if (dropdown !== null) {
			if (dropdown.style.display === "none" || dropdown.style.display === "") {
				dropdown.style.display = "block";
			} else {
				dropdown.style.display = "none";
			}
		}
	}

	async function selectOption(filtering_mode: string, ascending: boolean) {
		let param = "";
		if (filtering_mode === "Alphabetic") {
			param += "alph";
			param += ascending ? "_asc" : "_desc";
			console.log(param);
			// setCheckedOnElement(param, ascending);
			toggleDropdown();
			let searchParams = new URLSearchParams($page.url.searchParams.toString());
			searchParams.set("orderBy", `${param}`);

			await goto(`?${searchParams.toString()}`, {
				invalidateAll: true
			});
			AlphabeticFilter($shows, ascending);
		}

		if (filtering_mode === "Updated") {
			param += "updated";
			param += ascending ? "_asc" : "_desc";
			console.log(param);
			// setCheckedOnElement(param, ascending);
			toggleDropdown();
			let searchParams = new URLSearchParams($page.url.searchParams.toString());
			searchParams.set("orderBy", `${param}`);

			await goto(`?${searchParams.toString()}`, {
				invalidateAll: true
			});
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
							id="updated-desc"
							bind:this={updatedDescOpt}
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
							id="updated-asc"
							bind:this={updatedAscOpt}
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
							id="alph-asc"
							bind:this={alphAscOpt}
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
							id="alph-desc"
							bind:this={alphDescOpt}
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
