import { PUBLIC_API_BASE_URL } from "$env/static/public";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PATCH: RequestHandler = async ({ request, params, cookies }) => {
	const token = cookies.get("token");
	const requestBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/${params.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(requestBody)
		});
		const responseJson = await response.json();
		console.log(responseJson);
		return json(responseJson);
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			return json(error.message);
		}
		return json(error);
	}
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	const token = cookies.get("token");

	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/shows/${params.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		const responseJson = await response.json();
		console.log(responseJson);
		return json(responseJson);
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			return json(error.message);
		}
		return json(error);
	}
};
