import type { Show } from "./shows";

export type ModalType =
	| "show-add"
	| "show-edit"
	| "show-delete"
	| "show-edit-single"
	| "show-delete-single"
	| null;

export type Modal = {
	active: boolean;
	type: ModalType;
	data: Show | null;
};
