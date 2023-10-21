import api from "$lib/server/apiClient";
import type { ProductRes } from "$lib/types/apiResponse";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { ProductType } from "$lib/types/apiType";

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

	return {
		product,
		related: relatedByCollection,
	};
}) satisfies PageServerLoad;
