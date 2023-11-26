import type { Alert } from "$lib/models/alert";
import { writable, type Writable } from "svelte/store";
import { getContext, setContext } from "svelte";

export const initializeAlert = () => {
	const alertActive = writable<Alert>({
		active: false,
		text: null
	});
	setContext("alert-active", alertActive);
};

export const getAlertActive = () => {
	return getContext<Writable<Alert>>("alert-active");
};

export const setAlertActive = (alert: Writable<Alert>, text: string) => {
	alert.set({ active: true, text });
	setTimeout(() => {
		alert.set({ active: false, text: null });
	}, 1500);
};
