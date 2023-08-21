import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { Slide } from "$lib/models/slides";

export const getShowSlides = async (
    token: string,
    showId: number,
) => {
    try {
        const response = await fetch(
            `${PUBLIC_API_BASE_URL}/slides/${showId}`, 
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        const responseJson = await response.json();

        if (responseJson.status !== "success") {
            return {
                slides: [],
                status: responseJson.status as string
            };
        }
        const slides: Slide[] = responseJson.data.slides;
        return {
            slides, 
            status: responseJson.status as string
        };
    } catch (error) {
    if (error instanceof Error) {
            return {
                slides: [],
                status: error.message as string
            };
        }
        return {
            slides: [],
            status: error as string
        };
    }
};
