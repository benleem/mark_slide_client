import type { Handle, HandleFetch } from "@sveltejs/kit";
import type { User } from "$lib/models/users";
import { getCurrentUser } from "$lib/utils/api/users";

export const handle: Handle = async ({ event, resolve }) => {
	const user = await getCurrentUser(event);
	event.locals.user = user.user as User;
	const response = await resolve(event);
	return response;
};
