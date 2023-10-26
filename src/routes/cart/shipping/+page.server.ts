import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import api from "$lib/server/apiClient";
import type {
	CartRes,
	CustomerRes,
	ShippingOptionsRes,
} from "$lib/types/apiResponse";
import type { UserSession } from "$lib/types/commons";
import { message, superValidate } from "sveltekit-superforms/server";
import { addressSchema } from "$lib/schemas/storeSchema";
import type { CartType } from "$lib/types/apiType";

export const load: PageServerLoad = (async ({ cookies }) => {
	const cartId = cookies.get("__tm__cart");
	const session = cookies.get("__tm__session");

	if (!cartId || !session) {
		throw redirect(303, "/cart");
	}

	const parsedSession = JSON.parse(session) as UserSession;
	const res = await api.get(`carts/${cartId}`);

	let cart = (await res.json()) as CartRes;

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

	const headers = { Cookie: `connect.sid=${parsedSession.cookieId}` };
	const me = (await api
		.get("customers/me?expand=shipping_addresses", {
			credentials: "include",
			headers: headers,
		})
		.json()) as CustomerRes;

	const addresses = me.customer.shipping_addresses;
	const options = (await api
		.get(`shipping-options/${cartId}`, {
			credentials: "include",
		})
		.json()) as ShippingOptionsRes;

	const form = await superValidate(addressSchema);

	return { cart, addresses, options, form };
}) satisfies PageServerLoad;

type Message = {
	status: "error" | "success";
	text: string;
	cart?: CartType;
};

export const actions = {
	add: async ({ request, cookies }) => {
		const form = await superValidate<typeof addressSchema, Message>(
			request,
			addressSchema,
		);

		if (!form.valid) {
			return message(form, { status: "error", text: "Formulaire invalide" });
		}

		const cartId = cookies.get("__tm__cart");
		const session = cookies.get("__tm__session");

		if (!cartId || !session) {
			throw redirect(303, "/cart");
		}

		const parsedSession = JSON.parse(session) as UserSession;

		const res = (await api
			.post(`carts/${cartId}`, {
				json: { shipping_address: form.data },
				credentials: "include",
			})
			.json()) as CartRes;

		if (!res) {
			return message(form, {
				status: "error",
				text: "Erreur lors de l'ajout de votre adresse",
			});
		}

		return { form, success: true, cart: res.cart };
	},
} satisfies Actions;
