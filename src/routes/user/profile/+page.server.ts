import api from "$lib/server/apiClient";
import type { CustomerRes } from "$lib/types/apiResponse";
import type { UserSession } from "$lib/types/commons";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const session = cookies.get("__tm__session");
	const parsedSession = JSON.parse(session ?? "") as UserSession;

	const me = (await api
		.get("customers/me", {
			credentials: "include",
			headers: {
				Cookie: `connect.sid=${parsedSession.cookieId}`,
			},
		})
		.json()) as CustomerRes;

	return {
		me: me,
	};
}) satisfies PageServerLoad;
