import { registrationSchema } from "$lib/schemas/authSchema";
import api from "$lib/server/apiClient";
import type { CustomerRes } from "$lib/types/apiResponse";
import { fail, type Actions } from "@sveltejs/kit";
import { HTTPError } from "ky";

export const actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = form.get("username") as string;
		const password = form.get("password") as string;

		//Try to login
		if (username.length === 0 || password.length === 0) {
			return fail(400, {
				message: "Veuillez saisir l'utilisateur et le mot de passe",
			});
		}

		try {
			const res = await api
				.post("auth", {
					json: {
						email: username,
						password: password,
					},
				})
				.json();

			if (!res) {
				return fail(400, { message: "Identifiants incorrects" });
			}

			const customer = res as CustomerRes;
			const customerCookie = JSON.stringify({
				id: customer.customer.id,
				email: customer.customer.email,
				lastLogged: Date.now().toString(),
				isLogged: String(true),
			});

			cookies.set("__tm__session", customerCookie, {
				path: "/",
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				maxAge: 60 * 60 * 24 * 7,
			});

			return { logged: true };
		} catch (error) {
			if (error instanceof HTTPError) {
				if ([400, 401, 404, 409, 422].includes(error.response.status)) {
					return fail(400, { message: "Identifiants incorrects" });
				} else {
					return fail(400, {
						message: "Impossible de vous connecter",
					});
				}
			} else {
				return fail(400, { message: "Identifiants incorrects" });
			}
		}
	},
	register: async ({ request }) => {
		const form = await request.formData();
		const data = registrationSchema.safeParse(Object.fromEntries(form));

		if(!data.success) {
			const errors = data.error.errors.map(
				(error) => {
					return {
					field: error.path[0],
					message: error.message,
						};
				}
			);

			return fail(400, {error: true, errors});
		}
	},
} satisfies Actions;