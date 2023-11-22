import type { Slide } from "$lib/models/slides";
import { writable } from "svelte/store";

export const showSlides = writable<Slide[]>();
export const currentSlideIndex = writable<number>();
