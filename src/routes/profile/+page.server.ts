import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	try {
		const token = cookies.get("token");
		const response = await fetch(
			"https://markslide-production.up.railway.app/auth/current_user"
		);
		const responseJson = await response.json();

		if (!responseJson.data) {
			return {
				error: responseJson.message
			};
		}

		const user = responseJson.data.user;
		return {
			user,
			token
		};
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message };
		}
	}
};
