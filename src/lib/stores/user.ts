import type { GitHubUser } from "$lib/models/users";
import { writable } from "svelte/store";

export const user = writable<GitHubUser | null>(null);

export const initializeUser = (userData: GitHubUser) => {
	user.set(userData);
};

export const removeUser = () => {
	user.set(null);
};
