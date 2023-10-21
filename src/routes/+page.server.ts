import api from "$lib/server/apiClient";
import type { CollectionsRes, ProductRes } from "$lib/types/apiResponse";
import type { PageData, PageServerLoad } from "./$types";

export const load = (async () => {
	const products = (await api.get("products?limit=6").json()) as ProductRes;
	const collections = (await api
		.get("collections?limit=3")
		.json()) as CollectionsRes;
	return {
		products,
		collections,
	};
}) satisfies PageServerLoad;
