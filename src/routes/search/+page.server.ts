import api from "$lib/server/apiClient";
import type { SearchRes } from "$lib/types/apiResponse";
import type { Actions } from "@sveltejs/kit";

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const query = String(form.get("query"));

		try {
			const res = (await api
				.post("products/search", {
					json: { q: query },
				})
				.json()) as SearchRes;

			return {
				query,
				data: res,
			};
		} catch (err) {
			return {
				query,
				data: {},
			};
		}
	},
} satisfies Actions;
