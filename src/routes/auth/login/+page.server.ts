import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms/server";
import { fail } from "@sveltejs/kit";
import { loginSchema } from "$lib/schemas/authSchema";
import api from "$lib/apiClient";
import type { CustomerRes } from "$lib/types/apiResponse";
import type { UserSession } from "$lib/types/commons";
import { HTTPError } from "ky";

export const load = (async () => {
	const form = await superValidate(loginSchema);

	return {
		form,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate<typeof loginSchema>(request, loginSchema);

		if (!form.valid) {
			return message(form, {
				status: "error",
				text: "Identifiants incorrects",
			});
		}

		try {
			const res = await api.post("auth", {
				json: {
					email: form.data.username,
					password: form.data.password,
				},
				credentials: "include",
			});

			if (!res) {
				return message(form, {
					status: "error",
					message: "Identifiants incorrects",
				});
			}

			let cookie = res.headers.getSetCookie()[0];
			cookie = cookie.substring(cookie.indexOf("=") + 1, cookie.indexOf(";"));

			const customer = (await res.json()) as CustomerRes;
			const customerCookie = JSON.stringify({
				id: customer.customer.id,
				email: customer.customer.email,
				lastLogged: Date.now().toString(),
				isLogged: String(true),
				cookieId: cookie,
			});

			const userStore: UserSession = {
				id: customer.customer.id,
				email: customer.customer.email,
				lastLogged: Date.now().toString(),
				isLogged: String(true),
				cookieId: cookie,
			};

			cookies.set("__tm__session", customerCookie, {
				path: "/",
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				maxAge: 60 * 60 * 24 * 7,
			});

			//Assign cart to customer
			const cart = cookies.get("__tm__cart");
			if (cart) {
				await api
					.post(`carts/${cart}`, {
						json: { customer_id: customer.customer.id },
					})
					.json();
			}

			return { form, logged: true, user: userStore };
		} catch (error) {
			if (error instanceof HTTPError) {
				if ([400, 401, 404, 409, 422].includes(error.response.status)) {
					return message(form, {
						status: "error",
						message: "Identifiants incorrects",
					});
				} else {
					return message(form, {
						status: "error",
						message: "Impossible de vous connecter",
					});
				}
			} else {
				return fail(400, { message: "Identifiants incorrects" });
			}
		}
	},
} satisfies Actions;
