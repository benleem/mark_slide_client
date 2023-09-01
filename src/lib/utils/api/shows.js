import { PUBLIC_API_BASE_URL } from "$env/static/public";
export const getAllShows = async () => {
    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`);
        const responseJson = await response.json();
        if (responseJson.status !== "success") {
            return {
                shows: [],
                status: responseJson.message
            };
        }
        const shows = responseJson.data.shows;
        return {
            shows,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                shows: [],
                status: error.message
            };
        }
        return {
            shows: [],
            status: error
        };
    }
};
export const getUserShows = async (userId, token, favorites) => {
    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/users/${userId}?favorites=${favorites}`, {
            credentials: "include"
        });
        const responseJson = await response.json();
        if (responseJson.status !== "success") {
            return {
                shows: [],
                status: responseJson.status
            };
        }
        const shows = responseJson.data.shows;
        return {
            shows,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                shows: [],
                status: error.message
            };
        }
        return {
            shows: [],
            status: error
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
export const postShow = async (showFormData) => {
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
                status: responseJson.message
            };
        }
        const show = responseJson.data.show;
        return {
            show,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                show: null,
                status: error.message
            };
        }
        return {
            show: null,
            status: error
        };
    }
};
export const patchShow = async (showFormData, showId) => {
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
                status: responseJson.message
            };
        }
        const show = responseJson.data.show;
        return {
            show,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                show: null,
                status: error.message
            };
        }
        return {
            show: null,
            status: error
        };
    }
};
export const deleteShow = async (showId) => {
    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/${showId}`, {
            method: "DELETE",
            credentials: "include"
        });
        const responseJson = await response.json();
        if (responseJson.status !== "success") {
            return {
                show: null,
                status: responseJson.message
            };
        }
        const show = responseJson.data.show;
        return {
            show,
            status: responseJson.message
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                show: null,
                status: error.message
            };
        }
        return {
            show: null,
            status: error
        };
    }
};
//# sourceMappingURL=shows.js.map