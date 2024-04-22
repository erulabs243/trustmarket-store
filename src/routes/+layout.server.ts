import api from "$lib/server/apiClient";
import type { AnnoncesRes, CartRes, CategoryRes } from "$lib/types/apiResponse";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const user = cookies.get("__tm__session") ?? "";
	const cartId = cookies.get("__tm__cart");

	let cart: CartRes | null = null;
	const productCategories = (await api
		.get("product-categories?include_descendants_tree=true")
		.json()) as CategoryRes;

	if (cartId) {
		cart = (await api.get(`carts/${cartId}`).json()) as CartRes;
	}

	const annonces = (await api.get("annonces").json()) as AnnoncesRes;

	return {
		user,
		cart,
		categories: productCategories.product_categories,
		annonces: annonces.annonces,
	};
}) satisfies LayoutServerLoad;
