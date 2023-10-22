import api from "$lib/server/apiClient";
import type { CollectionsRes, ProductRes } from "$lib/types/apiResponse";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// TODO Not found or no products managements
export const load = (async ({ params }) => {
	const { slug } = params;

	const collections = (await api
		.get(`collections?handle[]=${slug}`)
		.json()) as CollectionsRes;
	if (collections.collections.length === 0) {
		throw fail(404, { notFound: true });
	}

	const collection = collections.collections[0];

	const products = (await api
		.get(`products?collection_id[]=${collection.id}`)
		.json()) as ProductRes;
	if (products.count === 0) {
		throw fail(404, { noProducts: true });
	}

	return {
		empty: false,
		collection,
		products,
	};
}) satisfies PageServerLoad;
