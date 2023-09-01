import { PUBLIC_API_BASE_URL } from "$env/static/public";
export const getShowSlides = async (token, showId) => {
    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/slides/${showId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const responseJson = await response.json();
        if (responseJson.status !== "success") {
            return {
                slides: [],
                status: responseJson.status
            };
        }
        const slides = responseJson.data.slides;
        return {
            slides,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                slides: [],
                status: error.message
            };
        }
        return {
            slides: [],
            status: error
        };
    }
};
export const addSlideToShow = async (createSlideData) => {
    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/slides`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createSlideData),
        });
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.status !== "success") {
            return {
                slides: null,
                status: responseJson.status
            };
        }
        const slides = responseJson.data.slides;
        return {
            slides,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                slides: null,
                status: error.message
            };
        }
        return {
            slide: null,
            status: error
        };
    }
};
export const removeSlideFromShow = async (slideId, deleteSlideParams) => {
    try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/slides/${slideId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deleteSlideParams),
        });
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.status !== "success") {
            return {
                slides: null,
                status: responseJson.status
            };
        }
        const slides = responseJson.data.slides;
        return {
            slides,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                slides: null,
                status: error.message
            };
        }
        return {
            slide: null,
            status: error
        };
    }
};
export const patchSlide = async (showFormData, slideId) => {
    try {
        console.log(slideId);
        const response = await fetch(`${PUBLIC_API_BASE_URL}/slides/${slideId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(showFormData)
        });
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.status !== "success") {
            return {
                slide: null,
                status: responseJson.message
            };
        }
        const slide = responseJson.data.slide;
        return {
            slide,
            status: responseJson.status
        };
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                slide: null,
                status: error.message
            };
        }
        return {
            slide: null,
            status: error
        };
    }
};
//# sourceMappingURL=slides.js.map