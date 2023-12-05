import type { PageServerLoad } from "./$types";
import { getInitialUserShows } from "$lib/utils/api/shows";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	const { locals, url } = event;
	const user = locals.user;
	const params = url.searchParams;
	const favorites = params.get("favorites") === "true";
	const orderBy = params.get("orderBy");

	const shows = await getInitialUserShows(event, user.id, favorites);
	console.log(shows.shows);

	if (!user) {
		throw error(401, "You are not logged in");
	}

	return {
		user,
		initialShows: await getInitialUserShows(event, user.id, favorites)
	};
};
