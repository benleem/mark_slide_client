import type { HandleFetch } from "@sveltejs/kit";

export const handleFetch: HandleFetch = ({ event, request, fetch }) => {
	request.headers.set("cookie", event.request.headers.get("cookie") || "");
	return fetch(request);
};
