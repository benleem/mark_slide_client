import { PUBLIC_API_BASE_URL } from "$env/static/public";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`, {
		credentials: "omit"
	});
	const responseJson = await response.json();
	return json(responseJson);
};

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {
	const requestBody = await request.json();
	const response = await fetch(`${PUBLIC_API_BASE_URL}/shows`, {
		method: "POST",
		body: JSON.stringify(requestBody),
		credentials: "omit",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookies.get("token")}`
		}
	});
	const responseJson = await response.json();
	return json(responseJson);
};
