import type { Show } from "$lib/models/shows";
import { writable } from "svelte/store";

type User = {
	hello: string;
} | null;

export const user = writable<User>(null);

export const shows = writable<Show[]>([]);
