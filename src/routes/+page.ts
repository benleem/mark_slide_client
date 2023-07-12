import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
	try {
		const response = await fetch("http://localhost:8000/auth/login");
		const responseJson = await response.json();

		if (!responseJson.data) {
			return {
				error: responseJson.message
			};
		}

		const loginUrl = responseJson.data.login_url;
		return {
			loginUrl
		};
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message };
		}
	}
};
