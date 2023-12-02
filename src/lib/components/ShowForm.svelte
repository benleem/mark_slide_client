<script lang="ts">
	import type {
		Show,
		CreateShowFormData,
		EditShowFormData
	} from "$lib/models/shows";
	import type { ModalType } from "$lib/models/modal";
	import { goto } from "$app/navigation";
	import { deleteShow, patchShow, postShow } from "$lib/utils/api/shows";
	import { shows } from "$lib/stores/shows";
	import { currentShow } from "$lib/stores/currentShow";
	import TextInput from "./Inputs/TextInput.svelte";
	import RadioInput from "./Inputs/RadioInput.svelte";
	import { disableModalActive, getModalActive } from "$lib/context/modal";
	import { v4 as uuidv4 } from "uuid";
	import GoogleIcon from "./GoogleIcon.svelte";

	const modal = getModalActive();

	export let mode: ModalType;
	export let show: Show;

	let formLoading = false;
	let formError = "";

	let showFormData: CreateShowFormData | EditShowFormData;

	function isEditData(
		data: CreateShowFormData | EditShowFormData
	): data is EditShowFormData {
		return (data as EditShowFormData).view_code !== undefined;
	}

	if (mode === "show-add") {
		showFormData = {
			title: "",
			description: "",
			public: false
		} as CreateShowFormData;
	} else {
		showFormData = {
			title: show.title,
			description: show.description,
			view_code: false,
			public: show.public
		} as EditShowFormData;
	}

	if (isEditData(showFormData)) {
		showFormData = showFormData as EditShowFormData;
	}

	const handleSubmit = async () => {
		console.log("hello");
		formLoading = true;

		const response =
			mode === "show-add"
				? await postShow(showFormData as CreateShowFormData)
				: await patchShow(showFormData as EditShowFormData, show.id);
		if (response.show === null || response.status !== "success") {
			formError = response.status;
		} else if (response.show) {
			const showResponse = response.show as Show;
			if (mode === "show-add") {
				goto(`/shows/${showResponse.id}`);
			}
			if (mode === "show-edit") {
				shows.update((shows) => {
					shows.forEach((show: Show, i) => {
						if (show.id === showResponse.id) {
							shows[i] = showResponse;
						}
					});
					return shows;
				});
			}
			if (mode === "show-edit-single") {
				currentShow.set(showResponse);
			}
			disableModalActive(modal);
		}
		formLoading = false;
	};

	let handleDelete = async () => {
		formLoading = true;
		const response = await deleteShow(show.id);
		if (response.show === null || response.status !== "success") {
			formError = response.status;
		} else if (response.show) {
			const showId = response.show;
			if (mode === "show-delete") {
				shows.update((shows) => {
					const updatedShows = shows.filter((show: Show) => show.id !== showId);
					return updatedShows;
				});
			}
			if (mode === "show-delete-single") {
				currentShow.set(null);
				goto("/profile");
			}
			disableModalActive(modal);
		}
		formLoading = false;
	};
</script>

{#if mode === "show-delete" || mode === "show-delete-single"}
	<form
		class="p-5 flex flex-col bg-[#030303] rounded-md border-[1px] border-gray-600"
		on:submit|preventDefault={() => handleDelete()}
	>
		<div class="pb-2 flex justify-between border-b-[1px] border-gray-600">
			<h3 class="text-lg">Delete show</h3>
			<button
				class="bg-gray-600 rounded hover:bg-gray-500 transition-colors duration-200 ease-in-out"
				type="button"
				on:click={() =>
					($modal = {
						active: false,
						type: null,
						data: null
					})}
			>
				<GoogleIcon iconType="close" />
			</button>
		</div>
		<p class="pt-2">Are you sure you want to delete this show?</p>
		<p><span class="text-gray-400">Title:</span> {show.title}</p>
		<p><span class="text-gray-400">Description:</span> {show.description}</p>
		<div class="pt-2">
			<button
				type="submit"
				class="w-full p-2 bg-red-500 hover:bg-red-600 rounded">Delete</button
			>
			{#if formError}
				<p class="pt-1 text-sm text-red-500">{formError}</p>
			{/if}
		</div>
	</form>
{:else}
	<form
		class="p-5 flex flex-col gap-2 bg-[#030303] rounded-md border-[1px] border-gray-600"
		novalidate
		autocomplete="off"
		on:submit|preventDefault={() => handleSubmit()}
	>
		<div class="pb-2 flex justify-between border-b-[1px] border-gray-600">
			<h3 class="text-lg">
				{mode === "show-add" ? "Add show" : "Edit show details"}
			</h3>
			<button
				class="bg-gray-600 rounded hover:bg-gray-500 transition-colors duration-200 ease-in-out"
				type="button"
				on:click={() =>
					($modal = {
						active: false,
						type: null,
						data: null
					})}
			>
				<GoogleIcon iconType="close" />
			</button>
		</div>
		<TextInput label="Title" name="title" bind:value={showFormData.title} />
		<TextInput
			label="Description"
			name="description"
			bind:value={showFormData.description}
		/>

		{#if isEditData(showFormData)}
			<label>
				<input type="checkbox" bind:checked={showFormData.view_code} />
				Generate me a new view code
			</label>
		{/if}

		<div class="flex justify-between">
			<fieldset>
				Public?<br />
				<RadioInput
					label="Yes"
					name="public"
					value={true}
					bind:group={showFormData.public}
				/>
				<RadioInput
					label="No"
					name="public"
					value={false}
					bind:group={showFormData.public}
				/>
			</fieldset>
		</div>
		<div>
			<button
				type="submit"
				class="w-full p-2 bg-green-500 hover:bg-green-600 rounded"
				>Submit</button
			>
			{#if formError}
				<p class="pt-1 text-sm text-red-500">{formError}</p>
			{/if}
		</div>
	</form>
{/if}
{#if formLoading}
	<div
		class="absolute top-0 left-0 h-full w-full grid place-content-center bg-white opacity-40 animate-pulse"
	>
		<p>Loading</p>
	</div>
{/if}
