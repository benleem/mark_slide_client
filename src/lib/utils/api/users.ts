import type { GitHubUser } from "$lib/models/users";
import type { RequestEvent } from "@sveltejs/kit";
import { PUBLIC_API_BASE_URL } from "$env/static/public";

export const getCurrentUser = async (
	event: RequestEvent<Partial<Record<string, string>>, string | null>
): Promise<{
	user: GitHubUser | null;
	status: string;
}> => {
	try {
		const response = await event.fetch(
			`${PUBLIC_API_BASE_URL}/auth/current_user`
		);
		const responseJson = await response.json();

		if (responseJson.status !== "success") {
			return {
				user: null,
				status: responseJson.message as string
			};
		}
		const user: GitHubUser = responseJson.data.user;

		return {
			user,
			status: responseJson.status as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				user: null,
				status: error.message as string
			};
		}
		return {
			user: null,
			status: error as string
		};
	}
};
