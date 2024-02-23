import api from "$lib/server/apiClient";
import type { UserSession } from "$lib/types/commons";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { HTTPError } from "ky";

export const load = (async ({ cookies }) => {
	const session = cookies.get("__tm__session");
	if (!session) {
		return { logged: false, user: null };
	}

	const parsedSession = JSON.parse(session) as UserSession;
	const headers = { Cookie: `connect.sid=${parsedSession.cookieId}` };
	try {
		const res = await api.delete("auth", {
			headers: headers,
		});

		console.info(JSON.stringify(res, null, 2));
		cookies.delete("__tm__session", { path: "/" });
		cookies.delete("__tm__cart", { path: "/" });

		return { logged: false, user: null };
	} catch (err) {
		if (err instanceof HTTPError) {
			console.info(err);
		}

		console.error(err);
		return redirect(301, "/");
	}
	// return { logged: true };
}) satisfies PageServerLoad;
