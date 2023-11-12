import type { TestSlide } from "$lib/models/slides";
import { writable } from "svelte/store";

export const showSlides = writable<TestSlide[]>();
export const currentSlideIndex = writable<number>();
