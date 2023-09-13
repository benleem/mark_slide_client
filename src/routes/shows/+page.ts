import type { PageLoad } from "./$types";
import { getInitialShows } from "$lib/utils/api/shows";

export const load: PageLoad = async (event) => {
	return {
		initialShows: getInitialShows(event)
	};
};
