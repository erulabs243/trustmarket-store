import api from "$lib/server/apiClient";
import type { UserSession } from "$lib/types/commons";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { HTTPError } from "ky";

export const load = (async ({ cookies }) => {
	const session = cookies.get("__tm__session");
	if (!session) {
		throw redirect(302, "/auth/login");
	}

	const parsedSession = JSON.parse(session) as UserSession;
	const headers = { Cookie: `connect.sid=${parsedSession.cookieId}` };
	try {
		const res = await api.delete("auth", {
			headers: headers,
		});

		cookies.delete("__tm__session", { path: "/" });
		cookies.delete("__tm__cart", { path: "/" });

		return { logged: false, user: null };
	} catch (err) {
		if (err instanceof HTTPError) {
			console.info(err);
		}

		return redirect(301, "/");
	}
	// return { logged: true };
}) satisfies PageServerLoad;

export const actions = {
	delete: async ({ cookies }) => {
		const session = cookies.get("__tm__session");
		if (!session) throw redirect(302, "/auth/login");

		try {
			const parsedSession = JSON.parse(session) as UserSession;
			await api
				.post("customers/me", {
					credentials: "include",
					json: {
						email: `fake-${Date.now()}${parsedSession.email}`,
					},
					headers: {
						Cookie: `connect.sid=${parsedSession.cookieId}`,
					},
				})
				.json();

			await api.delete("auth", {
				headers: {
					Cookie: `connect.sid=${parsedSession.cookieId}`,
				},
			});

			cookies.delete("__tm__session", { path: "/" });
			cookies.delete("__tm__cart", { path: "/" });
			cookies.delete("connect.sid", { path: "/" });

			throw redirect(301, "/");
		} catch (err) {
			console.info(JSON.stringify(err, null, 2));
			throw redirect(302, "/user/profile");
		}
	},
} satisfies Actions;
