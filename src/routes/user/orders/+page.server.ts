import api from "$lib/server/apiClient";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { UserSession } from "$lib/types/commons";

export const load = (async ({ cookies }) => {
	const session = cookies.get("__tm__session");

	if (!session) {
		throw redirect(303, "/");
	}

	const parsedSession = JSON.parse(session) as UserSession;

	console.info(JSON.stringify(parsedSession, null, 2));
	const orders = await api
		.get("customers/me/orders", {
			headers: {
				Cookie: `connect.sid=${parsedSession.cookieId}`,
			},
			credentials: "include",
		})
		.json();

	console.info(JSON.stringify(orders, null, 2));

	return { orders };
}) satisfies PageServerLoad;
