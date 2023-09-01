import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { CreateSlideData, Slide, DeleteSlideParams, SlideFormData } from "$lib/models/slides";

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

export const addSlideToShow = async (
    createSlideData: CreateSlideData,
) => {
    try {
        const response = await fetch(
            `${PUBLIC_API_BASE_URL}/slides`, 
            {
                method: "POST",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(createSlideData),
                }
        );
        const responseJson = await response.json();
        console.log(responseJson)

        if (responseJson.status !== "success") {
            return {
                slides: null, 
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
                slides: null, 
                status: error.message as string
            };
        }
        return {
            slide: null,
            status: error as string
        };
    }
};

export const removeSlideFromShow = async (
    deleteSlideParams: DeleteSlideParams,
) => {
    try {
        const response = await fetch(
            `${PUBLIC_API_BASE_URL}/slides/${deleteSlideParams.id}`, 
            {
			method: "DELETE",
			credentials: "include",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(deleteSlideParams),
            }
        );
        const responseJson = await response.json();
        console.log(responseJson)

        if (responseJson.status !== "success") {
            return {
                slides: null, 
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
                slides: null, 
                status: error.message as string
            };
        }
        return {
            slide: null,
            status: error as string
        };
    }
};

export const patchSlide = async (
	slideFormData: SlideFormData,
): Promise<{
	slide: Slide | null;
	status: string;
}> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/slides/${slideFormData.id}`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(slideFormData)
		});
		const responseJson = await response.json();
        console.log(responseJson)

		if (responseJson.status !== "success") {
			return {
				slide: null,
				status: responseJson.message as string
			};
		}
		const slide: Slide = responseJson.data.slide;
		return {
			slide,
			status: responseJson.status as string
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				slide: null,
				status: error.message as string
			};
		}
		return {
			slide: null,
			status: error as string
		};
	}
};

