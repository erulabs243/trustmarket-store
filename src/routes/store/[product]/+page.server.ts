import api from "$lib/server/apiClient";
import type { ProductRes } from "$lib/types/apiResponse";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import type { ProductType } from "$lib/types/apiType";
import {  addToCartSchema } from "$lib/schemas/storeSchema";

export const load = (async ({ params }) => {
	const slug = params.product;
	const products = (await api
		.get(`products?handle=${slug}`)
		.json()) as ProductRes;

	if (products.count === 0) {
		throw fail(404, { empty: true });
	}

	const product = products.products[0];
	let relatedByCollection: Array<ProductType> = [];

	if (product.collection) {
		const productsFromCollection = (await api
			.get(`products?collection_id[]=${product.collection_id}&limit=6`)
			.json()) as ProductRes;
		if (productsFromCollection.count > 0) {
			relatedByCollection = productsFromCollection.products.filter(
				(item) => item.handle !== slug,
			);
		}
	}

	// Use redis session to store cart
	const form = await superValidate(addToCartSchema)

	return {
		product,
		related: relatedByCollection,
		form,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, addToCartSchema);

		if(!form.valid) {
			return fail(400, { form });
		}

		console.log(form.data.quantity);

		// Create cart if not in sessionstorage

		//Add line item to cart

		return { form };
	}
} satisfies Actions;