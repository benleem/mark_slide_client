// @ts-nocheck
import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load = async ({ fetch, cookies }: Parameters<PageServerLoad>[0]) => {
	try {
		const token = cookies.get("token");
		const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/current_user`);
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
