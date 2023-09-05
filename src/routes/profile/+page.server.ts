import type { PageServerLoad } from "./$types";
import { PUBLIC_API_BASE_URL } from "$env/static/public";

export const load: PageServerLoad = async ({ fetch, cookies, locals }) => {
	console.log(locals.user);

	return {
		user: locals.user
	};
};
