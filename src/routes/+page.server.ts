import api from "$lib/server/apiClient";
import type {
	CollectionsRes,
	ProductRes,
	CategoryRes,
	CustomProductRes,
} from "$lib/types/apiResponse";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	const products = (await api.get("products?limit=96").json()) as ProductRes;
	const collections = (await api
		.get("collections?limit=7")
		.json()) as CollectionsRes;

	const mostSold = (await api
		.get("products/most-sold")
		.json()) as CustomProductRes;

	const arrivals = collections.collections.filter(
		(item) => item.handle === "arrivals",
	);
	const arrivalProducts = (await api
		.get(`products?collection_id[]=${arrivals[0].id}`)
		.json()) as ProductRes;

	const otherCollections = collections.collections.filter(
		(item) => item.handle !== "arrivals",
	);

	const categories = (await api
		.get("product-categories?include_descendants_tree=false")
		.json()) as CategoryRes;

	const parentCategories = categories.product_categories.filter(
		(item) => !item.parent_category_id,
	);

	console.info(JSON.stringify(mostSold, null, 2));

	return {
		products,
		mostSold: mostSold,
		collections: otherCollections,
		arrival: arrivals[0],
		arrivals: arrivalProducts,
		categories: parentCategories,
	};
}) satisfies PageServerLoad;
