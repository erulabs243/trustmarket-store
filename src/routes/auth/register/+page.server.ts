import { message, superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { registrationSchema } from "$lib/schemas/authSchema";
import { fail, type Actions } from "@sveltejs/kit";
import { HTTPError } from "ky";
import api from "$lib/server/apiClient";
import type { CustomerRes } from "$lib/types/apiResponse";
import type { UserSession } from "$lib/types/commons";

export const load = (async () => {
	const form = await superValidate(zod(registrationSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registrationSchema));

		if (!form.valid) {
			return message(form, {
				status: "error",
				message: "Données invalides",
			});
		}

		try {
			const res = await api.post("customers", {
				json: {
					first_name: form.data.firstName,
					last_name: form.data.lastName,
					email: form.data.email,
					password: form.data.password,
				},
				credentials: "include",
			});

			if (!res) {
				return message(form, {
					status: "error",
					message: "E-mail indisponible",
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
		} catch (err) {
			if (err instanceof HTTPError) {
				if ([400, 401, 404, 409, 422].includes(err.response.status)) {
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
