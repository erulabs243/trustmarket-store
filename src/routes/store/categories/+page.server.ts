import api from "$lib/server/apiClient";
import type {
	CategoryRes,
	CollectionsRes,
	ProductRes,
} from "$lib/types/apiResponse";
import type { ExpandedCollection } from "$lib/types/apiType";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	const categories = (await api
		.get("product-categories?expand=products")
		.json()) as CategoryRes;

	return { categories };

	let expandedCollections: Array<ExpandedCollection> = [];
	if (collections.collections.length > 0) {
		for (const collection of collections.collections) {
			const products = (await api
				.get(`products?collection_id[]=${collection.id}&limit=6`)
				.json()) as ProductRes;
			if (products.count > 0) {
				expandedCollections.push({
					collection: collection,
					products: products.products,
				});
			}
		}
	}

	return {
		collections: expandedCollections,
	};
}) satisfies PageServerLoad;
