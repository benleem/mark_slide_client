import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = ({ params, cookies }) => {
	const token = cookies.get("token");
	return {
		slug: params.slug,
		token
	};
};
