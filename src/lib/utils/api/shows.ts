import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { Show } from "$lib/models/shows";

export const getAllShows = async () => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
		const responseJson = await response.json();

		console.log(responseJson);

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

export const getUserShows = async (
	userId: number,
	token: string,
	favorites: boolean
) => {
	try {
		const response = await fetch(
			`${PUBLIC_API_BASE_URL}/shows/users/${userId}?favorites=${favorites}`,
			{
				headers: { Authorization: `Bearer ${token}` }
			}
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

// export const getShowById = async () => {
// 	try {
// 		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
// 		const responseJson = await response.json();

// 		if (!responseJson.data) {
// 			return {
// 				error: responseJson.message
// 			};
// 		}

// 		const shows = responseJson.data.shows;
// 		return {
// 			shows
// 		};
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return { error: error.message };
// 		}
// 	}
// };

// export const postShow = async (show: any, token: string) => {
// 	try {
// 		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${}`
// 			},
// 			body: JSON.stringify(show)
// 		});
// 		const responseJson = await response.json();

// 		if (!responseJson.data) {
// 			return {
// 				error: responseJson.message
// 			};
// 		}

// 		const shows = responseJson.data.shows;
// 		return {
// 			shows
// 		};
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return { error: error.message };
// 		}
// 	}
// };

// export const patchShow = async () => {
// 	try {
// 		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
// 		const responseJson = await response.json();

// 		if (!responseJson.data) {
// 			return {
// 				error: responseJson.message
// 			};
// 		}

// 		const shows = responseJson.data.shows;
// 		return {
// 			shows
// 		};
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return { error: error.message };
// 		}
// 	}
// };

// export const deleteShow = async () => {
// 	try {
// 		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
// 		const responseJson = await response.json();

// 		if (!responseJson.data) {
// 			return {
// 				error: responseJson.message
// 			};
// 		}

// 		const shows = responseJson.data.shows;
// 		return {
// 			shows
// 		};
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return { error: error.message };
// 		}
// 	}
// };
