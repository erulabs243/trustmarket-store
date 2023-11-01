import api from "$lib/server/apiClient";
import type { CartRes } from "$lib/types/apiResponse";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const user = cookies.get("__tm__session") ?? "";
	const cartId = cookies.get("__tm__cart");

	let cart: CartRes | null = null;

	if (cartId) {
		cart = (await api.get(`carts/${cartId}`).json()) as CartRes;
	}

	return { user, cart };
}) satisfies LayoutServerLoad;
