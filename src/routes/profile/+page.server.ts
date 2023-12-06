import type { PageServerLoad } from "./$types";
import { getInitialUserShows } from "$lib/utils/api/shows";
import {
	ascendingString,
	alphabeticString,
	AlphabeticFilter,
	UpdatedFilter
} from "$lib/utils/ordering";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	const { locals, url } = event;
	const user = locals.user;
	const params = url.searchParams;
	const favorites = params.get("favorites") === "true";
	let orderParams = params.get("orderBy")?.split("_");

	orderParams = orderParams == undefined ? ["alph", "asc"] : orderParams;
	let alphabetic = alphabeticString(orderParams[0]);
	let ascending = ascendingString(orderParams[1]);

	const shows = await getInitialUserShows(event, user.id, favorites);
	if (alphabetic) {
		AlphabeticFilter(shows.shows, ascending);
	} else {
		UpdatedFilter(shows.shows, ascending);
	}

	console.log(shows.shows);

	// console.log(event.url.searchParams.get("hi"));
	// $: viewMode = $page.url.searchParams.get("viewMode") === "true";
	//
	//     const toggleViewMode = () => {
	//         let searchParams = new URLSearchParams($page.url.searchParams.toString());
	//         searchParams.set("viewMode", ${!viewMode});
	//         goto(?${searchParams.toString()}, {
	//             invalidateAll: false,
	//             replaceState: false
	//         });
	//     };

	if (!user) {
		throw error(401, "You are not logged in");
	}

	return {
		user,
		initialShows: await getInitialUserShows(event, user.id, favorites)
	};
};
