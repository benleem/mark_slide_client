// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib/models/users";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User;
		}
		// interface PageData {}
		// interface Platform {}
	}

	//svelte-dnd-action
	declare type Item = import("svelte-dnd-action").Item;
	declare type DndEvent<ItemType = Item> =
		import("svelte-dnd-action").DndEvent<ItemType>;
	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			"on:consider"?: (
				event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }
			) => void;
			"on:finalize"?: (
				event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }
			) => void;
		}
	}
}

export {};
