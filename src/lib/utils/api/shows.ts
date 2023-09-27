import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { ServerLoadEvent, LoadEvent } from "@sveltejs/kit";
import type { RouteParams } from "../../../routes/shows/$types";
import type { Show, ShowFormData } from "$lib/models/shows";

export const getInitialShows = async (
	event: LoadEvent<RouteParams, null, Record<string, unknown>>
): Promise<{
	shows: Show[];
	status: string;
}> => {
	try {
		const response = await event.fetch(`${PUBLIC_API_BASE_URL}/shows`);
		const responseJson = await response.json();
		if (responseJson.status !== "success") {
			return {
				shows: [],
				status: responseJson.message as string
			};
		}
		const shows: Show[] = responseJson.data.shows;
		return {
			shows,
			status: responseJson.status as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				shows: [],
				status: error.message as string
			};
		}
		return {
			shows: [],
			status: error as string
		};
	}
};

// export const getAllShows = async (): Promise<{
// 	shows: Show[];
// 	status: string;
// }> => {
// 	try {
// 		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
// 		const responseJson = await response.json();

// 		if (responseJson.status !== "success") {
// 			return {
// 				shows: [],
// 				status: responseJson.message as string
// 			};
// 		}
// 		const shows: Show[] = responseJson.data.shows;
// 		return {
// 			shows,
// 			status: responseJson.status as string
// 		};
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return {
// 				shows: [],
// 				status: error.message as string
// 			};
// 		}
// 		return {
// 			shows: [],
// 			status: error as string
// 		};
// 	}
// };

export const getInitialUserShows = async (
	event: ServerLoadEvent<RouteParams, NonNullable<unknown>, string>,
	userId: number,
	favorites: boolean
): Promise<{
	shows: Show[];
	status: string;
}> => {
	try {
		const response = await event.fetch(
			`${PUBLIC_API_BASE_URL}/shows/users/${userId}?favorites=${favorites}`
		);
		const responseJson = await response.json();

		if (responseJson.status !== "success") {
			return {
				shows: [],
				status: responseJson.status as string
			};
		}
		const shows: Show[] = responseJson.data.shows;
		return {
			shows,
			status: responseJson.status as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				shows: [],
				status: error.message as string
			};
		}
		return {
			shows: [],
			status: error as string
		};
	}
};

// export const getUserShows = async (
// 	userId: number,
// 	favorites: boolean
// ): Promise<{
// 	shows: Show[];
// 	status: string;
// }> => {
// 	try {
// 		const response = await fetch(
// 			`${PUBLIC_API_BASE_URL}/shows/users/${userId}?favorites=${favorites}`,
// 			{ credentials: "include" }
// 		);
// 		const responseJson = await response.json();

// 		if (responseJson.status !== "success") {
// 			return {
// 				shows: [],
// 				status: responseJson.status as string
// 			};
// 		}
// 		const shows: Show[] = responseJson.data.shows;
// 		return {
// 			shows,
// 			status: responseJson.status as string
// 		};
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return {
// 				shows: [],
// 				status: error.message as string
// 			};
// 		}
// 		return {
// 			shows: [],
// 			status: error as string
// 		};
// 	}
// };

export const getShowById = async (
	event: ServerLoadEvent<RouteParams, NonNullable<unknown>, string>,
	showId: string
): Promise<{
	show: Show | null;
	status: string;
}> => {
	try {
		const response = await event.fetch(
			`${PUBLIC_API_BASE_URL}/shows/${showId}`
		);
		const responseJson = await response.json();
		if (responseJson.status !== "success") {
			return {
				show: null,
				status: responseJson.message as string
			};
		}
		const show: Show = responseJson.data.show;
		return {
			show,
			status: responseJson.message as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				show: null,
				status: error.message as string
			};
		}
		return {
			show: null,
			status: error as string
		};
	}
};

export const postShow = async (
	showFormData: ShowFormData
): Promise<{
	show: Show | null;
	status: string;
}> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(showFormData)
		});
		const responseJson = await response.json();

		if (responseJson.status !== "success") {
			return {
				show: null,
				status: responseJson.message as string
			};
		}
		const show: Show = responseJson.data.show;
		return {
			show,
			status: responseJson.status as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				show: null,
				status: error.message as string
			};
		}
		return {
			show: null,
			status: error as string
		};
	}
};

export const patchShow = async (
	showFormData: ShowFormData,
	showId: string
): Promise<{
	show: Show | null;
	status: string;
}> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/${showId}`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(showFormData)
		});
		const responseJson = await response.json();

		if (responseJson.status !== "success") {
			return {
				show: null,
				status: responseJson.message as string
			};
		}
		const show: Show = responseJson.data.show;
		return {
			show,
			status: responseJson.status as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				show: null,
				status: error.message as string
			};
		}
		return {
			show: null,
			status: error as string
		};
	}
};

export const deleteShow = async (
	showId: string
): Promise<{
	show: string | null;
	status: string;
}> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/${showId}`, {
			method: "DELETE",
			credentials: "include"
		});
		const responseJson = await response.json();

		if (responseJson.status !== "success") {
			return {
				show: null,
				status: responseJson.message as string
			};
		}

		const show: string = responseJson.data.show;
		return {
			show,
			status: responseJson.status as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				show: null,
				status: error.message as string
			};
		}
		return {
			show: null,
			status: error as string
		};
	}
};
