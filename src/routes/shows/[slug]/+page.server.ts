import type { PageServerLoad } from './$types';
export const load: PageServerLoad = ({ params, cookies }) => {
    let token = cookies.get("token");
    return {
        slug: params.slug,
        token,
    };
};


