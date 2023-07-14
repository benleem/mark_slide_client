// @ts-nocheck
import type { PageServerLoad } from "./$types";

export const load = async ({ fetch, cookies }: Parameters<PageServerLoad>[0]) => {
	try {
		const token = cookies.get("token");
		const response = await fetch("http://localhost:8000/auth/current_user");
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
