import type { Handle, HandleFetch } from "@sveltejs/kit";
import type { GitHubUser } from "$lib/models/users";
import { getCurrentUser } from "$lib/utils/api/users";

export const handle: Handle = async ({ event, resolve }) => {
	const user = await getCurrentUser(event);
	console.log(user);
	event.locals.user = user.user as GitHubUser;
	const response = await resolve(event);
	return response;
};
