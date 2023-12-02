import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	const { locals } = event;
	const user = locals.user;

	return {
		user
	};
};
