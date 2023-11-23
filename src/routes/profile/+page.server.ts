import type { PageServerLoad } from "./$types";
import { getInitialUserShows } from "$lib/utils/api/shows";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	const { locals } = event;
	const user = locals.user;

	if (!user) {
		throw error(401, "You are not logged in");
	}

	return {
		user,
		initialShows: getInitialUserShows(event, user.id, false)
	};
};
