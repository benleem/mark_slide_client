import type { PageServerLoad } from "./$types";
import { getShowById } from "$lib/utils/api/shows";
import { getShowSlides } from "$lib/utils/api/slides";
import { error } from "@sveltejs/kit";
import { slide } from "svelte/transition";

export const load: PageServerLoad = async (event) => {
	const { locals, params } = event;

	const show = await getShowById(event, params.id);
	if (show.show === null || show.status !== "success") {
		throw error(404, show.status);
	}

	const slides = await getShowSlides(event, params.id);
	if (slides.slides === null || show.status !== "success") {
		throw error(404, show.status);
	}

	return {
		user: locals.user,
		show,
		slides
	};
};
