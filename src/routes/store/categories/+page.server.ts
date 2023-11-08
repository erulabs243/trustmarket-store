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
		.get("product-categories?expand=products&include_descendants_tree=true")
		.json()) as CategoryRes;

	return { categories };
}) satisfies PageServerLoad;
