import type { PageServerLoad } from "./$types";
import { getShowById } from "$lib/utils/api/shows";
import { getShowSlides } from "$lib/utils/api/slides";

export const load: PageServerLoad = async (event) => {
	const { locals, params } = event;

	return {
		user: locals.user,
		show: getShowById(event, params.id),
		slides: getShowSlides(event, params.id)
	};
};
