import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { ServerLoadEvent } from "@sveltejs/kit";
import type { RouteParams } from "../../../routes/shows/[id]/$types";
import type {
	CreateSlideData,
	Slide,
	DeleteSlideParams,
	// SlideFormData,
	UpdateSlideData
} from "$lib/models/slides";

export const getShowSlides = async (
	event: ServerLoadEvent<RouteParams, NonNullable<unknown>, string>,
	showId: string
): Promise<{
	slides: Slide[];
	status: string;
}> => {
	try {
		const response = await event.fetch(
			`${PUBLIC_API_BASE_URL}/slides/${showId}`
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

export const addSlideToShow = async (createSlideData: CreateSlideData): Promise<{slides: Slide[] | null; status: string;}> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/slides`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(createSlideData)
		});
		const responseJson = await response.json();
		console.log(responseJson);

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
			slides: null,
			status: error as string
		};
	}
};

export const removeSlideFromShow = async (
	deleteSlideParams: DeleteSlideParams
): Promise<{slides: Slide[] | null; status: string;}> => {
	try {
		const response = await fetch(
			`${PUBLIC_API_BASE_URL}/slides/${deleteSlideParams.id}`,
			{
				method: "DELETE",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(deleteSlideParams)
			}
		);
		const responseJson = await response.json();
		console.log(responseJson);

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
			slides: null,
			status: error as string
		};
	}
};

export const patchSlide = async (
	updateSlideData: UpdateSlideData,
	slideId: string
): Promise<{
	slide: Slide | null;
	status: string;
}> => {
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/slides/${slideId}`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updateSlideData)
		});
		const responseJson = await response.json();

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
