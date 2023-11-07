import api from "$lib/server/apiClient";
import type {
	CategoryRes,
	CollectionsRes,
	ProductCategoryRes,
	ProductRes,
} from "$lib/types/apiResponse";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// TODO Not found or no products managements
export const load = (async ({ params }) => {
	const { slug } = params;

	const categories = (await api
		.get(`product-categories?handle=${slug}`)
		.json()) as CategoryRes;
	if (categories.count === 0) {
		throw fail(404, { notFound: true });
	}

	const category = categories.product_categories[0];

	const products = (await api
		.get(`products?category_id[]=${category.id}`)
		.json()) as ProductRes;

	console.log(products);
	if (products.count === 0) {
		throw fail(404, { noProducts: true });
	}

	return {
		empty: false,
		category,
		products,
	};
}) satisfies PageServerLoad;
