import type { Modal, ModalType } from "$lib/models/modal";
import { writable, type Writable } from "svelte/store";
import { getContext, setContext } from "svelte";
import type { Show } from "$lib/models/shows";

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

export const setModalActive = (
	modal: Writable<Modal>,
	type: ModalType,
	data: Show | null
) => {
	if (data === null) {
		modal.set({
			active: true,
			type,
			data: {
				id: "",
				user_id: 0,
				title: "",
				description: "",
				view_code: "",
				public: false,
				created_at: "" as unknown as Date,
				updated_at: "" as unknown as Date
			}
		});
		return;
	}
	modal.set({
		active: true,
		type,
		data
	});
};
