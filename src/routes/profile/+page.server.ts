import type { PageServerLoad } from "./$types";
import { getInitialUserShows } from "$lib/utils/api/shows";

export const load: PageServerLoad = async (event) => {
	return {
		user: event.locals.user,
		initialShows: getInitialUserShows(event, event.locals.user.id, false)
	};
};
