import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import api from "$lib/server/apiClient";
import type { CartRes, CustomerRes } from "$lib/types/apiResponse";
import type { UserSession } from "$lib/types/commons";
import { superValidate } from "sveltekit-superforms/server";
import { addressSchema } from "$lib/schemas/storeSchema";

export const load: PageServerLoad = (async ({ cookies }) => {
	const cartId = cookies.get("__tm__cart");
	const session = cookies.get("__tm__session");

	if (!cartId || !session) {
		throw redirect(303, "/cart");
	}

	const parsedSession = JSON.parse(session) as UserSession;

	let cart = (await api.get(`carts/${cartId}`).json()) as CartRes;

	if (!cart.cart.customer_id) {
		cart = (await api
			.post(`carts/${cartId}`, {
				json: {
					customer_id: parsedSession.id,
				},
				credentials: "include",
			})
			.json()) as CartRes;
	}

	const me = (await api
		.get("customers/me?expand=shipping_addresses", {
			credentials: "include",
			headers: { Cookie: `connect.sid=${parsedSession.cookieId}` },
		})
		.json()) as CustomerRes;

	const addresses = me.customer.shipping_addresses;

	const form = await superValidate(addressSchema);

	return { cart, addresses, form };
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const form = await superValidate(request, addressSchema);

		if (!form.valid) {
		}
	},
} satisfies Actions;
