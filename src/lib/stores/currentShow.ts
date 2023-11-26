import type { Show } from "$lib/models/shows";
import { writable } from "svelte/store";

export const currentShow = writable<Show | null>(null);
