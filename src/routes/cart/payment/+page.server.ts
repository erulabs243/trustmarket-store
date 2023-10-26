import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import api from "$lib/server/apiClient";
import type { CartRes, CompleteCartRes } from "$lib/types/apiResponse";
import type { UserSession } from "$lib/types/commons";
import { HTTPError } from "ky";

export const load = (async ({ cookies }) => {
	const cartId = cookies.get("__tm__cart");
	const session = cookies.get("__tm__session");

	if (!cartId || !session) {
		throw redirect(303, "/cart");
	}

	const parsedSession = JSON.parse(session) as UserSession;
	const cart = (await api
		.post(`carts/${cartId}/payment-sessions`, {
			credentials: "include",
		})
		.json()) as CartRes;

	return { cart };
}) satisfies PageServerLoad;

export const actions = {
	complete: async ({ cookies }) => {
		const cartId = cookies.get("__tm__cart");

		if (!cartId) {
			throw redirect(303, "/cart");
		}

		try {
			const cart = (await api
				.post(`carts/${cartId}/complete`, {
					credentials: "include",
				})
				.json()) as CompleteCartRes;

			if (cart.type === "cart") {
				return fail(400, { message: "Impossible de valider votre commande" });
			}

			// FIXME Delete cart from cookies
			cookies.delete("__tm__cart");
			return { success: true };
		} catch (error) {
			if (error instanceof HTTPError) {
				return fail(400, { message: "Une erreur est survenue" });
			} else {
				return fail(400, { message: "Une erreur est survenue" });
			}
		}
	},
} satisfies Actions;
