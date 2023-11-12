import type { Modal } from "$lib/models/modal";
import { writable, type Writable } from "svelte/store";
import { getContext, setContext } from "svelte";

export const initializeModal = () => {
	const modalActive = writable<Modal>({
		active: false,
		type: null,
		data: null
	});
	setContext("modal-active", modalActive);
};

export const getModalActive = () => {
	return getContext<Writable<Modal>>("modal-active");
};
